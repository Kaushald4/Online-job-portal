import { v2 as cloudinary } from "cloudinary";
import { config } from "./index.js";

export const setupCloudinary = () => {
    cloudinary.config({
        api_key: config.CLOUDINARY_API,
        cloud_name: config.CLOUDINARY_NAME,
        api_secret: config.CLOUDINARY_SECRET,
        secure: true,
    });
};
