// import package
import crypto from 'crypto';

export const randomByte = async (byte) => {
    try {
        return await crypto.randomBytes(byte).toString('hex');
    } catch (err) {
        return ''
    }
}

export const createHash = (algo) => {
    return crypto.createHash(algo)
}

export const createHmac = (algo, secretKey) => {
    return crypto.createHmac(algo, secretKey)
}