// import lib
import isEmpty from './isEmpty';

export const randomStartEnd = (start, end) => {
    if (!isEmpty(start) && !isEmpty(end)) {
        start = parseFloat(start)
        end = parseFloat(end)
        return Math.random() * (start - end) + end;
    }
}

export const makeQueryString = query => {
    return Object.keys(query).reduce((a, key) => {
        if (Array.isArray(query[key])) {
            query[key].forEach(v => {
                a.push(key + "=" + encodeURIComponent(v))
            })
        } else if (query[key] !== undefined) {
            a.push(key + "=" + encodeURIComponent(query[key]));
        }
        return a;
    }, []).join("&");
}
