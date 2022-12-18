// import package
import axios from 'axios';

// import config
import config from '../config'

export const validation = async (mobileNumber) => {
    try {
        let respData = await axios({
            'url': `http://apilayer.net/api/validate`,
            'method': 'post',
            'params': {
                'access_key': config.NUM_VERIFY.API_KEY,
                'number': mobileNumber
            }
        });
        return {
            valid: respData.data.valid,
        }
    }
    catch (err) {
        return {
            valid: false
        }
    }
}
