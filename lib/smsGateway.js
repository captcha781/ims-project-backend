// import package
import twilio from 'twilio';

// import lib
import config from '../config';

// export const initialize = () => {
//     return twilio(
//         config.smsGateway.TWILIO_ACCOUT_SID,
//         config.smsGateway.TWILIO_AUTH_TOKEN,
//     )
// }
const client = twilio(
    config.smsGateway.TWILIO_ACCOUT_SID,
    config.smsGateway.TWILIO_AUTH_TOKEN,
)

export const sentSms = async ({ to, body = '' }) => {
    console.log(to,'to')
    console.log(body,'body')
    const client = twilio(
        config.smsGateway.TWILIO_ACCOUT_SID,
        config.smsGateway.TWILIO_AUTH_TOKEN,
    )

    try {
        // await new initialize().messages.create({
        //     from: config.smsGateway.TWILIO_PHONE_NUMBER,
        //     to,
        //     body
        // })
        await client.messages.create({
            from: config.smsGateway.TWILIO_PHONE_NUMBER,
            to,
            body
        })

        console.log("SMS Successfully")
        return {
            'smsStatus': true
        }
    }
    catch (err) {
        console.log(err)
        console.log("SMS Error", err.toString())
        return {
            'smsStatus': false
        }
    }
}


export const sentOtp = async (to) => {
    try {
        // return false;
      const smsStatus=  await client.verify.services(config.smsGateway.TWILIO_SERVICE_SID).verifications.create({ to: to, channel: "sms" })
      console.log("sma Status", smsStatus)
     
        console.log("sms otp sent sucessfully")
        return {smsStatus: true};
    } catch (err) {
        console.log("SMS Error", err.toString());
        return {smsStatus: false};
    }
};

// let to = `+${"91"}${"7397636240"}`;


export const verifyOtpCode = async (to,otp) => {
    try {

        let verification_check = await client.verify.services(config.smsGateway.TWILIO_SERVICE_SID).verificationChecks.create({to:to, code:otp});
        console.log("OTP Status", verification_check);
        if(!verification_check.valid){
            return {smsStatus: false, verification:{}};
        }
        return {smsStatus: true, verification:verification_check};
    } catch (err) {
        console.log("SMS Error", err.toString());
        return {smsStatus: false, verification:{}};
    }
};