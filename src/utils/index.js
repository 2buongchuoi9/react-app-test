const getKeyFromValue = (value, object) => {
    for (const key in object) {
        if (object[key] == value) {
            return key
        }
    }
    return null
}
export { getKeyFromValue }
