import { displayCards } from './modules/displayCards.mjs';
import { displayHeaders } from './modules/displayHeaders.mjs';
import { sortTable } from './modules/sortTable.mjs';

const parsedRecords = []; // Declare the array globally
const searchInput = document.getElementById('searchInput');
const tableBody = document.getElementById('cardTable');
const headerRow = document.getElementById('headerRow');

// Function to handle file selection
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {
        const fileContent = event.target.result; // Use event.target.result for file content
        console.log('File content:', fileContent); // Log for debugging

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

        console.log('Parsed records:', parsedRecords); // Log for debugging

        function createCheckboxes() {
            // Ensure checkboxes are created after data is parsed and headers are displayed
            if (!parsedRecords.length || !headerRow.textContent) {
                return; // Exit if no data or headers yet
            }

            const manufacturerField = 'Manufacturer'; // Replace with the actual field name in your data

            for (const row of tableBody.querySelectorAll('tr')) {
                const record = parsedRecords[row.rowIndex];

                if (!record) {
                    continue; // Skip rows without corresponding data
                }

                const checkboxId = `checkbox-${record[manufacturerField]}`;

                // Create checkbox element
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = checkboxId;
                checkbox.value = record[manufacturerField]; // Optional: Set checkbox value

                // Add event listener for checkbox change (if needed)
                checkbox.addEventListener('change', handleCheckboxChange);

                // Append checkbox to the appropriate cell or location within the row
                const cellToAppendTo = row.querySelector('td'); // Assuming checkboxes are in table cells
                if (cellToAppendTo) {
                    cellToAppendTo.appendChild(checkbox);
                    console.log(
                        'Checkbox appended to row:',
                        row.rowIndex,
                        'with value:',
                        checkbox.value
                    );
                } else {
                    // Handle cases where there's no suitable cell (add logic here)
                    console.warn(
                        'No suitable cell found for checkbox in row',
                        row.rowIndex
                    );
                }
            }
        }

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (
                    mutation.addedNodes.length > 0 &&
                    parsedRecords.length === tableBody.querySelectorAll('tr').length
                ) {
                    createCheckboxes();
                    observer.disconnect(); // Stop observing after checkboxes are created
                }
            });
        });

        observer.observe(tableBody, { childList: true });

        console.log('Creating checkboxes...'); // Remove the reference to checkBox
        displayCards(parsedRecords);
        displayHeaders(headerFields);
        sortTable();
    };

    reader.onerror = function (error) {
        console.error('Error reading file:', error);
        // Handle file reading errors (e.g., display an error message to the user)
    };

    // Call filter functions after data is loaded and checkboxes are created (within .then block)
    return new Promise((resolve) => {
       reader.readAsText(file); // Use readAsText for UTF-8 encoded files (common)
    if (observer) {
        observer.observe(tableBody, { childList: true });
        observer.disconnect = () => {
            resolve(); // Resolve the Promise when checkboxes are created
        };
    } else {
        resolve(); // Resolve if observer is not used
    }
});

// Filter records by manufacturer (called within handleFileSelect's Promise)
function filterByManufacturer(filterTerm) {
    const tableRows = tableBody.querySelectorAll('tr');

    for (const row of tableRows) {
        let isVisible = false; // Show only if a checkBox is checked (adjust as needed)

        // Assuming checkboxes have a unique identifier (e.g., id)
        const manufacturerField = 'Manufacturer'; // Replace with the actual field name in your data

        if (parsedRecords.length > row.rowIndex && parsedRecords[row.rowIndex]) {
            const record = parsedRecords[row.rowIndex];

            // Check if a checkbox with the same identifier is checked
            const checkBoxId = `checkbox-${record[manufacturerField]}`; // Construct checkbox ID
            const checkBox = document.getElementById(checkBoxId);

            // Handle missing checkboxes (decide on behavior)
            if (!checkBox) {
                isVisible = false; // Hide if checkbox is missing (adjust as needed)
            } else {
                isVisible = checkBox.checked; // Use checkbox selection for visibility
            }

            console.log(
                `Row ${row.rowIndex}: isVisible=${isVisible}, checkBox checked: ${
                    checkBox ? checkBox.checked : 'not found'
                }`
            );

            // Apply additional filtering based on search term (if any)
            if (filterTerm) {
                isVisible =
                    isVisible &&
                    record[manufacturerField].toLowerCase().indexOf(filterTerm) !== -1;
            }

            // Set row visibility based on isVisible flag
            headerRow.style.display = '';
            row.style.display = isVisible ? '' : 'none';
        }
    }
}

// Filter records by search term (can be called on search input change)
function filterByName(searchTerm) {
    const tableRows = tableBody.querySelectorAll('tr');

    for (const row of tableRows) {
        let isVisible = false;
        const tableData = row.querySelectorAll('td');

        // Search all data cells in the row (or adjust for specific fields)
        for (const data of tableData) {
            const textContent = data.textContent.toLowerCase();
            if (textContent.indexOf(searchTerm.toLowerCase()) !== -1) {
                isVisible = true; // Mark row visible if search term found
                break; // Exit loop if a match is found (optional optimization)
            }
        }

        headerRow.style.display = '';
        row.style.display = isVisible ? '' : 'none';
    }

    const noSearchResults = document.getElementById('no-search-results');
    noSearchResults.style.display = allHidden ? 'block' : 'none'; // Assuming 'allHidden' variable is defined elsewhere
    tableBody.style.display = allHidden ? 'none' : 'block';
}

// Call filter functions within handleFileSelect's Promise (.then block)
handleFileSelect(event)
    .then(() => {
        filterByManufacturer('');
        filterByName(''); // Assuming search functionality is triggered elsewhere
    })
    .catch((error) => {
        console.error('Error handling file:', error);
    });

document
    .getElementById('fileInput')
    .addEventListener('change', handleFileSelect);

// Event listener for search input (optional, can be placed elsewhere)
searchInput.addEventListener('keyup', (event) => {
    const searchTerm = event.target.value.toLowerCase();
    filterByName(searchTerm);
});

// Event listeners for checkboxes can be added within createCheckboxes function

// Your existing collapsible content handling code (if needed)

// ... other scripts (if any)
