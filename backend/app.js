import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { errorHandler } from "./controllers/errorController.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//app middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//view engine
app.set("view engine", "ejs");

//routes import
import authRoute from "./routes/authRoute.js";

//routes middleware
app.use("/api/v1/", authRoute);

// global error handler
app.use(errorHandler);

export default app;
