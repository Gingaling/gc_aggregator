export function sortTable(n) {
	const table = document.getElementById('cardTable');

	// Check if table exists and has rows
	if (!table || !table.rows.length) {
		return; // Do nothing if table is empty
	}

	const rows = Array.from(table.rows); // Convert HTMLCollection to array

	// Remove header row
	const headerRow = rows.shift(); // Remove and store the first element (header)

	// Validate n value (assuming columns start from 0)
	if (n < 0 || n >= table.rows[0].cells.length) {
		console.error('Invalid column index for sorting');
		return; // Handle invalid n or prevent sorting
	}

	// Sort rows based on content of column n
	rows.sort((rowA, rowB) => {
		// Check if cell exists before accessing textContent
		if (!rowA.cells[n]) {
			return 1; // Place rows with missing cells at the end (customizable)
		}
		if (!rowB.cells[n]) {
			return -1; // Place rows with missing cells at the beginning (customizable)
		}

		const cellA = rowA.cells[n].textContent.trim(); // Remove leading/trailing whitespace

		// Handle different data types
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
