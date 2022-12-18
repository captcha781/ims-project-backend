// import lib
import isEmpty from './isEmpty';

export const toFixed = (item, type = 2) => {
    try {
        if (!isEmpty(item) && !isNaN(item)) {
            item = parseFloat(item)
            item = item.toFixed(type)
            return parseFloat(item)
        }
        return ''
    } catch (err) {
        return ''
    }
}