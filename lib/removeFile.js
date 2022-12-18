
// import package
import fs from 'fs';

// import lib
import config from '../config';

export const removeKycReqFile = (files, type = '') => {
    for (const [key, value] of Object.entries(files)) {
        if (type == 'id' && ['frontImage', 'backImage', 'selfiImage'].includes(key)) {
            removeKycImageFromPath(value[0].path)
        } else if (type == 'address' && ['addressProofFrontImg','frontImageAddress'].includes(key)) {
            removeKycImageFromPath(value[0].path)
        } else if (type == '' && value && value[0]) {
            removeKycImageFromPath(value[0].path)
        }
    }
}

export const removeKycImageFromPath = (path) => {
    try {
        fs.unlinkSync(__dirname + '/../' + path);
        return true
    }
    catch (err) {
        return false
    }
}

export const removeKycDbFile = (files) => {
    for (const [key, value] of Object.entries(files)) {
        if (key == 'frontImage' && files[key] != '') {
            removeKycImageFromPath(config.IMAGE.KYC_PATH + '/' + files[key])
        }

        if (key == 'backImage' && files[key] != '') {
            removeKycImageFromPath(config.IMAGE.KYC_PATH + '/' + files[key])
        }

        if (key == 'selfiImage' && files[key] != '') {
            removeKycImageFromPath(config.IMAGE.KYC_PATH + '/' + files[key])
        }

        if (key == 'idProofImg' && files[key] != '') {
            removeKycImageFromPath(config.IMAGE.KYC_PATH + '/' + files[key])
        }
    }
}