import moment from 'moment'

export const diffBtwDates = (startDateTime, endDateTIme, type = 'milliseconds') => {
    let duration = moment.duration(moment(endDateTIme).diff(moment(startDateTime)));
    if (type == 'minutes') return duration.minutes()
    if (type == 'asMinutes') return duration.asMinutes()
    return duration.asMilliseconds()
}