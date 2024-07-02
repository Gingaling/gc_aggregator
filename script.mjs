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
	  headerRow.style.display = '';
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

    console.log(parsedRecords);
    for (const tableRow of tableRows) {
      const tableData = tableRow.querySelectorAll('td');
      let isVisible = false;
      for (const data of tableData) {
        if (data && data.textContent) {
          // Check if data is defined and has textContent
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
  console.log(filterInputs);
//   const tableRows = tableBody.querySelectorAll('tr');
//   console.log("tableRows is: " + tableRows);

filterInputs.forEach(filterInput => {
	filterInput.addEventListener('change', () => {
	  const selectedFilters = [];
	  for (const filterInput of filterInputs) { 
		if (filterInput.checked) {
		  selectedFilters.push(filterInput.value.toLowerCase());
		}
	  }
	  const tableRows = tableBody.querySelectorAll('tr'); // Query tableRows inside the loop
  
	  for (const tableRow of tableRows) { // Iterate through newly queried tableRows
		let isVisible = false;
		const tableData = tableRow.querySelectorAll('td');
		for (const data of tableData) {
		  if (data && data.textContent) {
			if (selectedFilters.some(filterTerm => data.textContent.toLowerCase().indexOf(filterTerm) !== -1)) {
			  isVisible = true;
			  break;
			}
		  }
		}
		headerRow.style.display = '';
		tableRow.style.display = isVisible ? '' : 'none';
	  }
	});
  });                                                                                                      

  // Show header row initially
}
)();
