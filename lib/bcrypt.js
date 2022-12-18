// import package
import bcrypt from 'bcrypt';

export const generatePassword = (password) => {
    try {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);

        return {
            "passwordStatus": true,
            hash
        }
    }
    catch (err) {
        return {
            "passwordStatus": false
        }
    }
}

export const comparePassword = (password, hashPassword) => {
    try {
        let comparePwd = bcrypt.compareSync(password, hashPassword);

        return {
            "passwordStatus": comparePwd
        }
    }
    catch (err) {
        return {
            "passwordStatus": false
        }
    }
}
