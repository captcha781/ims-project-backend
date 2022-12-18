export const transactionStatus = (status) => {
    status = parseInt(status);
    switch (status) {
        case 1: return 'New';
        case 2: return 'Pending';
        case 3: return 'Completed';
        case 4: return 'Cancel';
        case 5: return 'Rejected';
        default: return 'New';
    }
}

export const transactionColor = (status) => {
    status = parseInt(status);
    switch (status) {
        case 1: return '';
        case 2: return 'yellow';
        case 3: return 'green';
        case 4: return '';
        case 5: return '';
        default: return '';
    }
}

export const paymentStatus = (status) => {
    status = parseInt(status);
    switch (status) {
        case 1: return 'Deposit';
        case 2: return 'Withdraw';
        case 3: return 'Deposit';
        case 4: return 'Withdraw';
        default: return '';
    }
}

export const kycStatus = (status) => {
    switch (status) {
        case 2: return "Pending";
        case 3: return "Verified";
        case 4: return "Rejected";
        default: return "New"
    }
}

export const idProofName = (type, status) => {
    let typeValue = type;
    if (status == 1) {
        typeValue = ''
    }
    switch (typeValue) {
        case 1: return "Passport";
        case 2: return "Driving Licence";
        case 3: return "National Security Card";
        default: return ""
    }
}

export const addressProofName = (type, status) => {
    let typeValue = type;
    if (status == 1) {
        typeValue = ''
    }
    switch (typeValue) {
        case 1: return "Bank Passbook";
        case 2: return "National Card";
        case 3: return "Passport";
        default: return ""
    }
}

export const bankProofName = (type, status) => {
    let typeValue = type;
    if (status == 1) {
        typeValue = ''
    }
    switch (typeValue) {
        case 1: return "Bank Passbook";
        case 2: return "Bank statement";
        default: return ""
    }
}

export const tire2 = (status) => {
    switch (status) {
        case true: return "Verified";
        case false: return "Not Verified";
        default: return "Not Verified"
    }
}