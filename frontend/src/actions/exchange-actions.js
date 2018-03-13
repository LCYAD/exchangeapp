export function updateCurrencyList (currency_list) {
    return {
        type: 'UPDATE_CURRENCY_LIST',
        payload: currency_list,
    }
}