import { displayCards } from './modules/displayCards.mjs';
import { displayHeaders } from './modules/displayHeaders.mjs';
import { sortTable } from './modules/sortTable.mjs';

(function () {
	const fileInput = document.getElementById('fileInput'); // Get fileInput element

  fileInput.addEventListener('change', handleFileSelect);

	const parsedRecords = []; // Private variable

	function handleFileSelect(event) {
		parsedRecords.length = 0; // Clear array before parsing new file

		const file = event.target.files[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = function (event) {
			const fileContent = event.target.result;
			const records = fileContent.split('\n');
			const headers = records[0].split(';');
			displayHeaders(headers);
			for (let i = 1; i < records.length; i++) {
				const record = records[i].split(';');
				const card = {};
				for (let j = 0; j < headers.length; j++) {
					card[headers[j]] = record[j];
				}
				parsedRecords.push(card);
			}
			displayCards(parsedRecords);
			sortTable();
			
		};
	reader.readAsText(file);
}


const searchInput = document.getElementById('searchInput');
const tableBody = document.getElementById('cardTable');
const headerRow = document.getElementById('headerRow');

searchInput.addEventListener('keyup', (event) => {
	const searchTerm = event.target.value.toLowerCase();
	const tableRows = tableBody.querySelectorAll('tr');
	
	for (const tableRow of tableRows) {
		const tableData = tableRow.querySelectorAll('td');
		let isVisible = false;
		for (const data of tableData) {
			if (data && data.textContent) { // Check if data is defined and has textContent
				if (data.textContent.toLowerCase().indexOf(searchTerm) !== -1) {
					isVisible = true;
					break;
				}
			}
		}
		// Set header display only once
		if (headerRow.style.display !== '') {
			headerRow.style.display = '';
		}
		tableRow.style.display = isVisible ? '' : 'none';
	}
});

const coll = document.getElementsByClassName('collapsible');

for (let i = 0; i < coll.length; i++) {
	coll[i].addEventListener('click', function (event) {
		event.stopPropagation(); // Prevent bubbling up
		this.classList.toggle('active');
		let content = this.nextElementSibling;
		if (content.style.display === 'block') {
			content.style.display = 'none';
		} else {
			content.style.display = 'block';
		}
	});
}

	const filterInputs = document.querySelectorAll('.filter');
	
	for (const filterInput of filterInputs) {
		filterInput.addEventListener('change', function (event) {
			// Update selectedFilters based on checkbox selection
			const selectedFilters = []; // Array to store selected filter terms
			const filterTerm = filterInput.value.toLowerCase();
			if (filterInput.checked) {
				selectedFilters.push(filterTerm);
			} else {
				const index = selectedFilters.indexOf(filterTerm);
				if (index !== -1) {
					selectedFilters.splice(index, 1);
				}
			}

			let isVisible = false; // Assuming row is visible by default
			const tableData = tableRow.querySelectorAll('td');
			isVisible = tableData.some((data) => {
				if (data && data.textContent) { // Check if data is defined and has textContent
					// Check if any data cell matches a filter
					return selectedFilters.some(
					  (term) => data.textContent.toLowerCase().indexOf(term) !== -1
					);
				  }
				  return false; // Default to not visible if data is undefined
				});
				tableRow.style.display = isVisible ? '' : 'none';
				// Set header display only once
				if (headerRow.style.display !== '') {
				  headerRow.style.display = '';
				}
			}, tableRow); // Pass tableRow as second argument
			}
		}
// // **Access parsedRecords after processing is complete**
// fileInput.addEventListener('change', () => {
// // This function fires after the file is processed
// console.log(parsedRecords); // Access parsedRecords directly within the IIFE
// });
)();