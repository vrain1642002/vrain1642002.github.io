function getExchangeRates() {
  // Make a request to the API
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://www.vietcombank.com.vn/exchangerates/ExrateXML.aspx', true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      // Parse the response as XML
      var parser = new DOMParser();
      var xml = parser.parseFromString(xhr.responseText, 'text/xml');
      // Update the exchange rates on the page
      updateExchangeRates(xml);
    }
  };
  xhr.send();
}

function updateExchangeRates(xml) {
  var tbody = document.getElementById('exchange-rates');
  tbody.innerHTML = '';
  var currencies = xml.getElementsByTagName('Exrate');
  for (var i = 0; i < currencies.length; i++) {
    var currency = currencies[i];
    var name = currency.getAttribute('CurrencyName');
    var buy = currency.getAttribute('Buy');
    var transfer = currency.getAttribute('Transfer');
    var sell = currency.getAttribute('Sell');
    var row = '<tr>';
    row += '<td>' + name + '</td>';
    row += '<td>' + buy + '</td>';
    row += '<td>' + transfer + '</td>';
    row += '<td>' + sell + '</td>';
    row += '</tr>';
    tbody.innerHTML += row;
  }
}

// Call getExchangeRates() immediately to update the exchange rates on page load
getExchangeRates();

// Call getExchangeRates() every hour to update the exchange rates
setInterval(getExchangeRates, 3600000); // 1 hour = 3600000 milliseconds
