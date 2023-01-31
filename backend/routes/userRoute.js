import express from "express";
import multer from "multer";
const router = express.Router();
const upload = multer();

import isLoggedIn from "../middleware/isLoggedIn.js";
import {
    updateUser
} from "../controllers/userController.js";

router.put(
    "/user/update",
    isLoggedIn,
    upload.fields([
        { name: "cover", maxCount: 1 },
        { name: "photo", maxCount: 1 },
    ]),
    updateUser
);

export default router;
