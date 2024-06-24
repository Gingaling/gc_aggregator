export function sortTable(n) {
	const table = document.getElementById('cardTable');
	const rows = Array.from(table.rows); // Convert HTMLCollection to array

	// Remove header row
	const headerRow = rows.shift(); // Remove and store the first element (header)

	// Sort rows based on content of column n
	rows.sort((rowA, rowB) => {
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
