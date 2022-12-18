//import package
import nodemailer from "nodemailer";
import { set, get } from "../controllers/redis.controller";
// import lib
import config from "../config";
import smtpConfig from "../config/smtpConfig.json";
// import SendinBlue from "../config/sendinBlue.json";

const SibApiV3Sdk = require("sib-api-v3-sdk");
let defaultClient = SibApiV3Sdk.ApiClient.instance;
let apiKey = defaultClient.authentications["api-key"];
// apiKey.apiKey = SendinBlue.apiKey;
// let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
// let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
export const sendEmail = async (to, content) => {
  try {
    // let Redis = await get("SMTP");
    // let Type = JSON.parse(Redis);
    // console.log(Type, "Type");

    // if (Type.mailType == "sendinBlue") {
    //   console.log("SEND IN BLUE-----------------------------");
    //   const { subject, template } = content;
    //   sendSmtpEmail.subject = subject;
    //   sendSmtpEmail.htmlContent = template;
    //   sendSmtpEmail.sender = { name: SendinBlue.name, email: SendinBlue.email };
    //   sendSmtpEmail.to = [{ email: to, name: to }];
    //   sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
    //   apiInstance.sendTransacEmail(sendSmtpEmail).then(
    //     function (data) {
    //       console.log("Message sent: %s" + JSON.stringify(data));
    //     },
    //     function (error) {
    //       return console.log(error, "-----errrrrr");
    //     }
    //   );
    // } else if (Type.mailType == "nodeMailer") {
    //   console.log("NODE MAILER-----------------------------");
    //   const { subject, template } = content;
    //   let transporter = nodemailer.createTransport(smtpConfig.nodemailer);
    //   let info = await transporter.sendMail({
    //     from: smtpConfig.fromMail,
    //     to,
    //     subject,
    //     html: template,
    //   });
    //   console.log("Message sent: %s", info.messageId);
    // }
    
    const { subject, template } = content;
    let transporter = nodemailer.createTransport(smtpConfig.nodemailer);
    await transporter.sendMail({
      from: smtpConfig.fromMail,
      to,
      subject,
      html: template,
    });

  } catch (err) {
    console.log("-----err", err);
  }
};

// sendEmail(
//     "testuser01 @yopmail.com",
//     {
//         subject: 'test',
//         template: '<h1>Test</h1>',
//     }
// )
