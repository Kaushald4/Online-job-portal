import { v2 as cloudinary } from "cloudinary";
import DataUriParser from "datauri/parser.js";
import path from "path";

const bufferToBase64 = (file) => {
    const parser = new DataUriParser();
    return parser.format(path.extname(file.originalname).toString(), file.buffer).content;
};

export const uploadImage = async (file, folder) => {
    return new Promise(async (resolve, reject) => {
        try {
            const options = {
                use_filename: true,
                unique_filename: false,
                overwrite: true,
                folder,
            };
            const result = await cloudinary.uploader.upload(bufferToBase64(file), options);
            const { secure_url, public_id } = result;
            resolve({ secure_url, public_id });
        } catch (error) {
            reject(error);
        }
    });
};
