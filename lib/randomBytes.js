// import package
import randomBytes from 'randombytes'

export const randomNumber = async (type = 6) => {
    try {
        let randomNo = randomBytes(type).toString();
        return {
            'randomStatus': true,
            'otp': randomNo
        }
    }
    catch (err) {
        return {
            'randomStatus': false
        }
    }
}