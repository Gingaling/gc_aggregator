import { sortTable } from './sortTable.mjs';

export function displayHeaders(headerNames) {
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
