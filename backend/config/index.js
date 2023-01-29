import dotenv from "dotenv";

dotenv.config();

export const config = {
    DB_URL: process.env.DB_URL,
    PORT: process.env.PORT,

    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRE: process.env.JWT_EXPIRE,
    COOKIE_EXPIRE: process.env.COOKIE_EXPIRE,

    CLOUDINARY_API: process.env.CLOUDINARY_API,
    CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,

    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    EMAIL_FROM: process.env.EMAIL_FROM,
};
