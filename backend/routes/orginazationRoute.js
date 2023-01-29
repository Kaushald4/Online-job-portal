import express from "express";
import multer from "multer";
const router = express.Router();
const upload = multer();

import isLoggedIn from "../middleware/isLoggedIn.js";
import {
    createOrginazation,
    getMyOrginazations,
    getOrginazation,
} from "../controllers/orginazationController.js";

router.post(
    "/orginazation",
    isLoggedIn,
    upload.fields([
        { name: "cover", maxCount: 1 },
        { name: "photo", maxCount: 1 },
    ]),
    createOrginazation
);
router.get("/orginazation", isLoggedIn, getMyOrginazations);
router.get("/orginazation/:orginazationID", isLoggedIn, getOrginazation);

export default router;
