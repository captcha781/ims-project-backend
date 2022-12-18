const isJsonParse = (value) => {
    try {
        return JSON.parse(value)
    } catch (err) {
        return false
    }
}

export default isJsonParse;