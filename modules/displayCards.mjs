export function displayCards(cards) {
	console.log(cards);
	const tableBody = document.getElementById('cardData');
	tableBody.innerHTML = '';

	for (const card of cards) {
		const row = document.createElement('tr');
		row.innerHTML = `
					<td>${card.Price}</td>
                    <td>${card.Manufacturer}</td>
					<td>${card.Model}</td>
                    <td>${card.BestFor}</td>
					<td>${card.VRAM}</td>
                    <td>${card.Features}</td>
					<td>${card.AffiliateLink}</td>
                `;
		tableBody.appendChild(row);
	}
}
