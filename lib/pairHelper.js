export const splitPair = (pair) => {

    switch (pair) {
        case "BTCUSDT": {
            return {
                'firstCurrency': "BTC",
                'secondCurrency': "USDT",
            }
        }
        case "XRPUSDT": {
            return {
                'firstCurrency': "XRP",
                'secondCurrency': "USDT",
            }
        }
        case "ETHUSDT": {
            return {
                'firstCurrency': "ETH",
                'secondCurrency': "USDT",
            }
        }
        default: {
            return {
                'firstCurrency': "",
                'secondCurrency': "",
            }
        }
    }
}

export const replacePair = (currencySymbol) => {
    switch (currencySymbol) {
        case "USD": return "USDT"
        default: return currencySymbol
    }
}