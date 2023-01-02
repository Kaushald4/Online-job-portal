import app from "./app.js";
import { config } from "./config/index.js";
import { connectDB } from "./config/db.js";

connectDB().then(() => {
    const onListen = () => {
        console.log(`Server is running on port at ${config.PORT}`);
    };

    app.listen(config.PORT, onListen);
});
