import mongoose from "mongoose";
import { config } from "./index.js";

export const connectDB = async () => {
    try {
        const ref = await mongoose.connect(config.DB_URL, { dbName: "jobportal" });
        console.log(`DB Connected ${ref.connection.db.namespace}`);
    } catch (error) {
        console.log(`DB Connection Failed ${error.message}`);
        process.exit(1);
    }
};
