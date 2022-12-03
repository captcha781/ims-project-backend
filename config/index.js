const dotenv = require("dotenv").config()

let key = {};

if (process.env.NODE_ENV === "production") {
  console.log("\x1b[35m%s\x1b[0m", `Production Server`);

  const API_URL = "imsproject.netlify.app";
  const PORT = process.env.PORT
  key = {
    SITE_NAME: "IMS - PROJECT",
    secretOrKey: process.env.SECRET_OR_KEY,
    PORT: PORT,
    STUDENT_URL: "https://imsproject.netlify.app",
    TEACHER_URL: "https://imsproject.netlify.app/teacher",
    INSTITUTE_ADMIN_URL: "https://imsproject.netlify.app/institute",
    SITE_ADMIN_URL: "https://imsproject.netlify.app/siteadmin",
    SERVER_URL: `${API_URL}:${PORT}`,
    IMAGE_URL: `${API_URL}`,
    // RECAPTCHA_SECRET_KEY: "6Ld398cgAAAAADKLqsd_P4-zCnkGvnQ0k7mqmBpn",
    // NUM_VERIFY: {
    //   API_KEY: "c90239275a3246e0c6abfc8ad4b87a2f",
    // },
    // Cors_Possible: "https://technsnet.alwin.io",
    // //Sms Gateway
    // smsGateway: {
    //     TWILIO_ACCOUT_SID: 'AC1796c212376ccebe5289a1c40c910469',
    //     TWILIO_AUTH_TOKEN: 'd731f1f7c893cd3f6e9b0405eeba8ac2',
    //     TWILIO_PHONE_NUMBER: "+12055094319",
    //     TWILIO_SERVICE_SID:  "MG89f24d3fd05830232cfd7ca94e463622"
    // },
    IMAGE: {
      
    },
  };
} else {
  console.log("\x1b[35m%s\x1b[0m", `Development Server`);

  const API_URL = "http://localhost";
  const PORT = process.env.PORT;
  key = {
    SITE_NAME: "IMS - PROJECT",
    secretOrKey: process.env.SECRET_OR_KEY,
    PORT: PORT,
    STUDENT_URL: "http://localhost:3000",
    TEACHER_URL: "http://localhost:3001",
    INSTITUTE_ADMIN_URL: "http://localhost:3002",
    SITE_ADMIN_URL: "http://localhost:3003",
    SERVER_URL: `${API_URL}:${PORT}`,
    IMAGE_URL: `${API_URL}:${PORT}`,
    // RECAPTCHA_SECRET_KEY: "6Ld9F-QcAAAAAKF6sXAceH7uk4OX2Y9V7Nlzqklr",
    // NUM_VERIFY: {
    //   API_KEY: "c90239275a3246e0c6abfc8ad4b87a2f",
    // },
    Cors_Possible: "*",
    //Sms GateWay
    // smsGateway: {
    //   TWILIO_ACCOUT_SID: "AC5a094978a9ff68dd8effaa412957f399",
    //   TWILIO_AUTH_TOKEN: "f74e855ab507a9a756b1d0ba6dae4eee",
    //   TWILIO_PHONE_NUMBER: "+19473334197",
    //   TWILIO_SERVICE_SID: "VA6aae3f445c84cd8d73e6908fe54b5240",
    // // },
    // smsGateway: {
    //   TWILIO_ACCOUT_SID: "AC1796c212376ccebe5289a1c40c910469",
    //   TWILIO_AUTH_TOKEN: "d731f1f7c893cd3f6e9b0405eeba8ac2",
    //   TWILIO_PHONE_NUMBER: "+12055094319",
    //   TWILIO_SERVICE_SID: "VA65359d137adc698da3eefe5517edf255",
    // },
 
    // smsGateway: {
    //   TWILIO_ACCOUT_SID: "AC521b12ccb31ed113485671b0f1eadb00",
    //   TWILIO_AUTH_TOKEN: "e6ca8844f7957f19e3219bd3db974a76",
    //   TWILIO_PHONE_NUMBER: "+17178040876",
    //   TWILIO_SERVICE_SID: "VAd76d9902d3f48ea3c1f86bbcbc51b58e",
    // },
    // emailGateway: {
    //     SENDGRID_API_KEY: 'G2_6DHfmSaWcrRQ1RxTHrQ',
    //     fromMail: "support@alwin.com",
    //     nodemailer: {
    //         host: "smtp.gmail.com",
    //         port: 587,
    //         secure: false, // true for 465, false for other ports
    //         auth: {
    //             user: 'ajith@britisheducationonline.org', // generated ethereal user
    //             pass: 'Ajith@97', // generated ethereal password
    //         },
    //     }
    // },
    IMAGE: {
      
    },
    // NODE_TWOFA: {
    //   NAME: "Dopamine",
    //   QR_IMAGE:
    //     "https://chart.googleapis.com/chart?chs=166x166&chld=L|0&cht=qr&chl=",
    // },
  };
}

/**
 * export default key
 */
module.exports = {
  ...key
};