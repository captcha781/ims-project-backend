// import package
import { compareSync } from 'bcrypt';
import CryptoJS from 'crypto-js';

// import lib
import config from '../config';
import isEmpty from './isEmpty';
export const encryptJs = (encryptValue) => {
    try {
        encryptValue = JSON.stringify(encryptValue);
        let key = CryptoJS.enc.Latin1.parse('1234567812345678');
        let iv = CryptoJS.enc.Latin1.parse('1234567812345678');

        let encrypted = CryptoJS.AES.encrypt(encryptValue, key, {
            iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding
        });
        console.log(encrypted,'encrypted',encryptValue);
        return encrypted.toString();
    }
    catch (err) {
        return ''
    }
}

export const decryptJs = (decryptValue) => {
    try {
        let key = CryptoJS.enc.Latin1.parse('1234567812345678');
        let iv = CryptoJS.enc.Latin1.parse('1234567812345678');
        let bytes = CryptoJS.AES.decrypt(decryptValue, key, {
            iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7
        });
        let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        console.log(decryptedData,'decryptedDAta')
        return decryptedData
    }
    catch (err) {
        return ''
    }
}

export const replaceSpecialCharacter = (value, type) => {
    try {
        let textValue = value;
        if (!isEmpty(textValue)) {
            if (type == 'encrypt') {
                // textValue = textValue.toString().replace('+', 'xMl3Jk').replace('/', 'Por21Ld').replace('=', 'Ml32');
                textValue = textValue.toString().replace(/\+/g, 'xMl3Jk').replace(/\//g, 'Por21Ld').replace(/\=/g, 'Ml32');
            } else if (type == 'decrypt') {
                // textValue = textValue.replace('xMl3Jk', '+').replace('Por21Ld', '/').replace('Ml32', '=');
                textValue = textValue.replace(/\xMl3Jk/g, '+').replace(/\Por21Ld/g, '/').replace(/\Ml32/g, "=");
            }
        }
        return textValue
    } catch (err) {
        return ''
    }
}

export const encryptString = (encryptValue, isSpecialCharacters = false) => {
    try {
        encryptValue = encryptValue.toString()
        let ciphertext = CryptoJS.AES.encrypt(encryptValue, config.cryptoSecretKey).toString();
        if (isSpecialCharacters) {
            return replaceSpecialCharacter(ciphertext, 'encrypt')
        }
        return ciphertext
    }
    catch (err) {
        return ''
    }
}

export const decryptString = (decryptValue, isSpecialCharacters = false) => {
    try {
        if (isSpecialCharacters) {
            decryptValue = replaceSpecialCharacter(decryptValue, 'decrypt')
        }

        let bytes = CryptoJS.AES.decrypt(decryptValue, config.cryptoSecretKey);
        let originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText
    }
    catch (err) {
        console.log(err)
        return ''
    }
}

export const encryptObject = (encryptValue) => {
    try {
        let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(encryptValue), config.cryptoSecretKey).toString();
        return ciphertext
    }
    catch (err) {
        return ''
    }
}

export const decryptObject = (decryptValue) => {
    try {
        let bytes = CryptoJS.AES.decrypt(decryptValue, config.cryptoSecretKey);
        let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData
    }
    catch (err) {
        return ''
    }
}