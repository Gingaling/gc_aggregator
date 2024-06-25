import { displayCards } from './modules/displayCards.mjs';
import { displayHeaders } from './modules/displayHeaders.mjs';
import { sortTable } from './modules/sortTable.mjs';

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

const searchInput = document.getElementById('searchInput');
const tableBody = document.getElementById('cardTable');
const headerRow = document.getElementById('headerRow');

searchInput.addEventListener('keyup', (event) => {
	const searchTerm = event.target.value.toLowerCase();
	const tableRows = tableBody.querySelectorAll('tr');

	for (const row of tableRows) {
		const tableData = row.querySelectorAll('td');
		let isVisible = false;

		for (const data of tableData) {
			const textContent = data.textContent.toLowerCase();
			if (textContent.indexOf(searchTerm) !== -1) {
				isVisible = true;
				break;
			}
		}
		headerRow.style.display = '';
		row.style.display = isVisible ? '' : 'none';
	}
});

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
