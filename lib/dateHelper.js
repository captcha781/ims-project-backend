import isEmpty from "./isEmpty";

export const dateFormat = (dateTime, format = 'YYYY-MM-DD') => {
    try {
        if (!isEmpty(dateTime)) {
            dateTime = new Date(dateTime);
            let year = dateTime.getFullYear(),
                month = dateTime.getMonth() + 1,
                day = dateTime.getDate();
            return format.replace('YYYY', year).replace('MM', month).replace('DD', day)
        }
    } catch (err) {
        return dateTime;
    }
}

export const timeFormat = (dateTime, format = 'HH:MM:SS') => {
    try {
        if (!isEmpty(dateTime)) {
            dateTime = new Date(dateTime);

            let hour = dateTime.getHours(),
                minute = dateTime.getMinutes(),
                second = dateTime.getSeconds();

            return format.replace('HH', hour).replace('MM', minute).replace('SS', second)
        }
    } catch (err) {
        return ''
    }
}

export const dateTimeFormat = (dateTime, format = 'YYYY-MM-DD HH:MM:SS') => {
    try {
        if (!isEmpty(dateTime)) {
            format = format.split(' ');
            return dateFormat(dateTime, format[0]) + ' ' + timeFormat(dateTime, format[1])
        }
    } catch (err) {
        return ''
    }
}

/** 
 * Find Between Dates Time
*/
export const findBtwDates = (startDateTime, endDateTIme, type = 'milliseconds', isNegative = false) => {
    try {
        let roundTime = 1;
        switch (type) {
            case 'milliseconds': roundTime = 1; break;
            case 'seconds': roundTime = 1000; break;
            case 'minutes': roundTime = 1000 * 60; break;
            case 'hours': roundTime = 1000 * 60 * 60; break;
            case 'days': roundTime = 1000 * 60 * 60 * 24; break;
            default: roundTime = 1; break
        }

        if (isNegative) {
            return Math.ceil((new Date(endDateTIme) - new Date(startDateTime)) / roundTime)
        } else {
            return Math.ceil(Math.abs(new Date(endDateTIme) - new Date(startDateTime)) / roundTime);
        }
    } catch (err) {
        return null
    }
}
export const nowDateInUTC = () => {
    try {
        let newDate = new Date();
        return new Date(`${newDate.getUTCFullYear()}-${('0' + newDate.getUTCMonth()).slice(-2)}-${('0' + newDate.getUTCDate()).slice(-2)}T${('0' + newDate.getUTCHours()).slice(-2)}:${('0' + newDate.getUTCMinutes()).slice(-2)}:${('0' + newDate.getUTCSeconds()).slice(-2)}.${('00' + newDate.getUTCMilliseconds()).slice(-3)}Z`)
    } catch (err) {
        return new Date();
    }
}

export const extraUnixTimeUTC = (type = '+', extraType = 'minute', extraTime = 5) => {
    try {
        let nowUTCDate = nowDateInUTC();
        if (extraType == 'minute') {
            return Math.round(new Date(nowUTCDate.setMinutes(nowUTCDate.getMinutes() + extraTime)).getTime() / 1000);
        }
    } catch (err) {
        return ''
    }
}

export const extraTimeUTC = (type = '+', extraType = 'minute', extraTime = 5) => {
    try {
        let nowUTCDate = nowDateInUTC();
        if (extraType == 'minute') {
            return new Date(nowUTCDate.setMinutes(nowUTCDate.getMinutes() + extraTime))
        }
    } catch (err) {
        return ''
    }
}

export const unixTimeUTC = () => {
    try {
        let nowUTCDate = nowDateInUTC();
        return Math.round(new Date(nowUTCDate.setMinutes(nowUTCDate.getMinutes())).getTime() / 1000);
    } catch (err) {
        return ''
    }
}

/** 
 * Extra Time (eg) ...-1,0.1...
 * option{timeStamp}
*/
export const getTimeStamp = (type = 'current', extraTime = 5, option = {}) => {
    if (type == 'current') {
        return new Date().getTime()
    } else if (type == 'zeroMS') {
        let nowDate = new Date()
        nowDate.setMilliseconds(0)
        return nowDate.getTime();
    } else if (type == 'extraMinuteZeroMS') {
        let nowDate = new Date()
        nowDate.setMilliseconds(0)
        return (nowDate.getTime() + (extraTime * 60000));
    } else if (type == 'dateExtraMinuteZeroMS') {
        let nowDate = new Date(option.timeStamp)
        nowDate.setMilliseconds(0)
        return (nowDate.getTime() + (extraTime * 60000));
    } else if (type == 'startTime') {
        let nowDate = new Date();
        let year = nowDate.getFullYear(),
            month = nowDate.getMonth() + 1,
            day = nowDate.getDate();
        month = month > 9 ? month : `0${month}`
        day = day > 9 ? day : `0${day}`
        return new Date(`${year}-${month}-${day}T00:00:00.000Z`).getTime()
    } else if (type == 'endTime') {
        let nowDate = new Date();
        let year = nowDate.getFullYear(),
            month = nowDate.getMonth() + 1,
            day = nowDate.getDate();
        month = month > 9 ? month : `0${month}`
        day = day > 9 ? day : `0${day}`
        return new Date(`${year}-${month}-${day}T23:59:59.999Z`).getTime()
    }
}