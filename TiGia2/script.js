const exchangeRatesEl = document.getElementById('exchange-rates');
const lastUpdatedEl = document.getElementById('last-updated');

function displayExchangeRates(data) {
  // Clear previous data
  exchangeRatesEl.innerHTML = '';

  // Display each currency
  data.forEach(currency => {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const buyCashCell = document.createElement('td');
    const buyTransferCell = document.createElement('td');
    const sellCell = document.createElement('td');
    nameCell.textContent = currency.currencyCode;
    buyCashCell.textContent = currency.buyCash;
    buyTransferCell.textContent = currency.buyTransfer;
    sellCell.textContent = currency.sell;
    row.appendChild(nameCell);
    row.appendChild(buyCashCell);
    row.appendChild(buyTransferCell);
    row.appendChild(sellCell);
    exchangeRatesEl.appendChild(row);
  });
}

function displayLastUpdated(data) {
  const timestamp = new Date(data.createDate);
  lastUpdatedEl.textContent = `Last updated: ${timestamp.toLocaleString()}`;
}

function fetchExchangeRates() {
  const url = 'https://your-proxy-server-url.com/vietcombank-exchange-rates';

  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayExchangeRates(data.exchangeRates);
      displayLastUpdated(data);
    })
    .catch(error => console.error(error));
}

// Fetch exchange rates on page load
fetchExchangeRates();
