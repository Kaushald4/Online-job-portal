import app from "./app.js";
import { config } from "./config/index.js";
import { connectDB } from "./config/db.js";
import { setupCloudinary } from "./config/cloudinary.js";

connectDB().then(() => {
    const onListen = () => {
        console.log(`Server is running on port at ${config.PORT}`);
    };
    setupCloudinary();

    app.listen(config.PORT, onListen);
});
