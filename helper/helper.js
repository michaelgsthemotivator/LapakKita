function currencyFormat(value) {
    value = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    }).format(value);

    return value
}

module.exports = currencyFormat