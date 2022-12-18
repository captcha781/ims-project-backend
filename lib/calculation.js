// import lib
import isEmpty from './isEmpty';

export const percentageCalculation = (price, percentage) => {
    price = parseFloat(price);
    percentage = parseFloat(percentage)

    if (!isEmpty(price)) {
        return price - (price * (percentage / 100))
    }
    return 0
}

export const commissionFeeCalculate = (actualAmount, amount) => {
    actualAmount = parseFloat(actualAmount);
    amount = parseFloat(amount)
    let respData = {
        'commissionFee': 0,
        amount
    }

    if (!isEmpty(actualAmount) && !isEmpty(amount)) {
        respData['commissionFee'] = actualAmount - amount;
    }
    return respData;
}

export const precentConvetPrice = (price, percentage) => {
    price = parseFloat(price);
    percentage = parseFloat(percentage)

    if (!isEmpty(price)) {
        return price * (percentage / 100)
    }
    return 0
}

export const interestByDays = (price, rate, days) => {
    price = parseFloat(price);
    rate = parseFloat(rate)
    days = parseFloat(days);

    if (!isEmpty(price) && !isEmpty(rate) && !isEmpty(days)) {
        return ((price * (rate / 100)) / days)
    }
    return 0
}

/** 
 * Calculate Without Service Fee
*/
export const withoutServiceFee = ({
    price,
    serviceFee
}) => {
    price = parseFloat(price)
    serviceFee = parseFloat(serviceFee)
    return price - (price * (serviceFee / 100))
}

/** 
 * Calculate Service Fee
*/
export const calculateServiceFee = ({
    price,
    serviceFee
}) => {
    price = parseFloat(price)
    serviceFee = parseFloat(serviceFee)
    return (price * (serviceFee / 100))
}