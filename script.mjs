import { displayCards } from './modules/displayCards.mjs';

document
	.getElementById('fileInput')
	.addEventListener('change', handleFileSelect);

const parsedRecords = []; // Declare the array globally

var coll = document.getElementsByClassName('collapsible');
var i;

for (i = 0; i < coll.length; i++) {
	coll[i].addEventListener('click', function (event) {
		event.stopPropagation(); // Prevent bubbling up
		this.classList.toggle('active');
		var content = this.nextElementSibling;
		if (content.style.display === 'block') {
			content.style.display = 'none';
		} else {
			content.style.display = 'block';
		}
	});
}

function handleFileSelect(event) {
	const file = event.target.files[0];
	if (!file) return;
	const reader = new FileReader();
	reader.onload = function (event) {
		const fileContent = event.target.result;
		console.log(fileContent);

		// Split the file contents into individual records
		const records = fileContent.split('\n');

		// Parse the header row to get the correct order of fields

		const headerRow = records[0];
		const headerFields = headerRow.split(';');

		// Process each record
		for (let i = 1; i < records.length; i++) {
			const fields = records[i].split(';');

			// Create an object (hash) for each record
			const recordObj = {};
			for (let j = 0; j < headerFields.length; j++) {
				recordObj[headerFields[j]] = fields[j];
			}
			parsedRecords.push(recordObj);
		}

		// Now you have an array of parsed records (including the header line)
		console.log(parsedRecords);
		displayCards(parsedRecords);
		displayHeaders(headerFields);
		sortTable();
	};
	reader.readAsText(file);
}

function displayTableOnConsole() {
	const table = document.getElementById('cardTable');
	console.log(table);
}

function displayHeaders(headerNames) {
	const headerRow = document.getElementById('headerRow');
	headerRow.innerHTML = '';

	for (let j = 0; j < headerNames.length; j++) {
		const th = document.createElement('th');
		th.textContent = headerNames[j];
		th.addEventListener('click', (event) => {
			event.stopPropagation(); // Prevent bubbling up
			sortTable(j); // Access j directly within arrow function
		});
		headerRow.appendChild(th);
	}
}

function sortTable(n) {
	console.log('Sorting by column:', n);
	const table = document.getElementById('cardTable');
	const rows = Array.from(table.rows); // Convert HTMLCollection to array

	console.log(table);

	// Remove header row
	const headerRow = rows.shift(); // Remove and store the first element (header)

	// Sort rows based on content of column n

	rows.sort((rowA, rowB) => {
		const cellA = rowA.cells[n].textContent.trim(); // Remove leading/trailing whitespace

		// Handle different data types here
		if (!isNaN(cellA) && !isNaN(rowB.cells[n].textContent.trim())) {
			// Numbers
			return parseFloat(cellA) - parseFloat(rowB.cells[n].textContent.trim());
		} else {
			// Strings (default)
			return cellA
				.toLowerCase()
				.localeCompare(rowB.cells[n].textContent.trim().toLowerCase());
		}
	});

	// Update table body with sorted rows
	table.innerHTML = '';
	table.appendChild(headerRow); // Add the header back after sorting
	rows.forEach((row) => table.appendChild(row));
}
