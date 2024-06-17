document
	.getElementById('fileInput')
	.addEventListener('change', handleFileSelect);
function handleFileSelect(event) {
	const file = event.target.files[0];
	if (!file) return;
	const reader = new FileReader();
	reader.onload = function (event) {
		const fileContent = event.target.result;

		const cards = parseDescriptions(fileContent);
		displayCards(cards);
	};
	reader.readAsText(file);
}

function parseDescriptions(content) {
	const lines = content.split('\n');
	const cards = [];
	for (const line of lines) {
		const [name, bestFor, features] = line.split(';');
		cards.push({ name, bestFor, features });
	}

	return cards;
}

function displayCards(cards) {
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
