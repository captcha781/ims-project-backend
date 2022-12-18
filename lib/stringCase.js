// import lib
import isEmpty from './isEmpty';

export const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

export const firstCapitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
}

export const emailFormat = (email) => {
    try {
        if (!isEmpty(email)) {
            let domain = email.substring(email.indexOf('@'), email.indexOf('.'))
            domain = domain.substring(domain.length - 2, domain.length)
            return email.substring(0, 3) + "....@..." + domain + email.substring(email.indexOf('.'), email.length)
        }
        return ''
    } catch (err) {
        return ''
    }
}

export const cnvtBoolean = value => {
    if (typeof value === 'boolean' && value == true) return true;
    if (typeof value === 'boolean' && value == false) return false;
    if (typeof value === 'string' && value == 'true') return true;
    if (typeof value === 'string' && value == 'false') return false;
}