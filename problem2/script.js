async function getTokenPrices() {
    try {
        const response = await fetch('https://interview.switcheo.com/prices.json');
        const data = await response.json();

        const pricesMap = {};
        data.forEach(entry => {
            pricesMap[entry.currency] = entry.price;
        });

        console.log('Formatted Prices:', pricesMap);
        return pricesMap;
    } catch (error) {
        console.error('Error fetching prices:', error);
        return {};
    }
}

async function calculateSwap() {
    const amount = parseFloat(document.getElementById('input-amount').value);
    const fromToken = document.getElementById('from-token').value;
    const toToken = document.getElementById('to-token').value;
    const errorMessage = document.getElementById('error-message');
    const resultInput = document.getElementById('output-amount');

    if (isNaN(amount) || amount <= 0) {
        errorMessage.textContent = 'Please enter a valid amount.';
        resultInput.value = '';
        return;
    }

    errorMessage.textContent = '';

    const prices = await getTokenPrices();

    console.log('Selected From Token:', fromToken);
    console.log('Selected To Token:', toToken);

    const fromPrice = prices[fromToken];
    const toPrice = prices[toToken];

    console.log('From Token Price:', fromToken, fromPrice);
    console.log('To Token Price:', toToken, toPrice);

    if (fromPrice && toPrice) {
        const result = (amount * fromPrice) / toPrice;
        resultInput.value = result.toFixed(6);
    } else {
        errorMessage.textContent = 'Price data unavailable for one or more tokens.';
        resultInput.value = '';
    }
}

document.getElementById('confirm-button').addEventListener('click', function() {
    calculateSwap();
});

document.getElementById('input-amount').addEventListener('input', calculateSwap);
document.getElementById('from-token').addEventListener('change', calculateSwap);
document.getElementById('to-token').addEventListener('change', calculateSwap);

