// script.js

document
	.getElementById('fileInput')
	.addEventListener('change', handleFileSelect);

const parsedRecords = []; // Declare the array globally

function handleFileSelect(event) {
	const file = event.target.files[0];
	if (!file) return;
	const reader = new FileReader();
	reader.onload = function (event) {
		const fileContent = event.target.result;
		console.log(fileContent);

		// Split the file contents into individual records
		const records = fileContent.split('\n');

		// Assuming the first record contains field names (header line)
		const fieldNames = ['name', 'bestFor', 'features'];

		// Process each record
		for (const record of records) {
			const fields = record.split(';'); // Split by semicolon

			// Create an object (hash) for each record
			const recordObj = {};
			for (let i = 0; i < fieldNames.length; i++) {
				recordObj[fieldNames[i]] = fields[i];
			}
			parsedRecords.push(recordObj);
		}

		// Now you have an array of parsed records (including the header line)
		console.log(parsedRecords);
		displayCards(parsedRecords);
	};
	reader.readAsText(file);
}

// function parseDescriptions(content) {
// 	const lines = content.split('\n');
// 	const cards = [];
// 	for (const line of lines) {
// 		const [name, bestFor, features] = line.split(';');
// 		cards.push({ name, bestFor, features });
// 	}

// 	return cards;
// }

function displayCards(cards) {
	console.log(cards);
	const tableBody = document.getElementById('cardData');
	tableBody.innerHTML = '';

	for (const card of cards) {
		const row = document.createElement('tr');
		row.innerHTML = `
                    <td>${card.name}</td>
                    <td>${card.bestFor}</td>
                    <td>${card.features}</td>
                `;
		tableBody.appendChild(row);
	}
}
