import { config } from "../config/index.js";
import transporter from "../config/email.js";

const sendMail = async (to, subject, message) => {
    return new Promise(async (resolve, reject) => {
        try {
            await transporter.sendMail({
                from: `Kaushal Mehta <${config.EMAIL_FROM}>`,
                to: to,
                subject: subject, // Subject line
                text: message, // plain text body
            });
            resolve("Mail Sent");
        } catch (error) {
            reject(error);
        }
    });
};

export default sendMail;
