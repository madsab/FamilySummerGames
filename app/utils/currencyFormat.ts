
function currencyFormat(value?: number): string | undefined {
    if (!value) {
        return undefined
    }
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

export default currencyFormat;