import nodemailer from "nodemailer";
import { config } from "./index.js";

const transporter = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: config.SMTP_PORT,
    auth: {
        user: config.SMTP_USER,
        pass: config.SMTP_PASS,
    },
});

export default transporter;
