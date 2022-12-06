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
    TEACHER_URL: "https://teacher-ims.netlify.app",
    INSTITUTE_ADMIN_URL: "https://institute-ims.netlify.app",
    SITE_ADMIN_URL: "https://siteadmin-ims.netlify.app",
    SERVER_URL: `${API_URL}:${PORT}`,
    IMAGE_URL: `${API_URL}`,
    // RECAPTCHA_SECRET_KEY: "6Ld398cgAAAAADKLqsd_P4-zCnkGvnQ0k7mqmBpn",
    // NUM_VERIFY: {
    //   API_KEY: "c90239275a3246e0c6abfc8ad4b87a2f",
    // },
    CORS_POSSIBLE: ["https://imsproject.netlify.app", "https://teacher-ims.netlify.app", "https://institute-ims.netlify.app", "https://siteadmin-ims.netlify.app"],
    // //Sms Gateway
    // smsGateway: {
    //     TWILIO_ACCOUT_SID: '',
    //     TWILIO_AUTH_TOKEN: '',
    //     TWILIO_PHONE_NUMBER: "",
    //     TWILIO_SERVICE_SID:  ""
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
    // RECAPTCHA_SECRET_KEY: "",
    // NUM_VERIFY: {
    //   API_KEY: "",
    // },
    CORS_POSSIBLE: "*",

    // smsGateway: {
    //   TWILIO_ACCOUT_SID: "",
    //   TWILIO_AUTH_TOKEN: "",
    //   TWILIO_PHONE_NUMBER: "",
    //   TWILIO_SERVICE_SID: "",
    // },
    // emailGateway: {
    //     SENDGRID_API_KEY: '',
    //     fromMail: "",
    //     nodemailer: {
    //         host: "smtp.gmail.com",
    //         port: 587,
    //         secure: false, // true for 465, false for other ports
    //         auth: {
    //             user: '',
    //             pass: '',
    //         },
    //     }
    // },
    IMAGE: {
      
    },
  };
}

/**
 * export default key
 */
module.exports = {
  ...key
};