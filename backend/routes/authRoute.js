import express from "express";
const router = express.Router();

import {
    changePassword,
    forgotPassword,
    getProfile,
    login,
    logout,
    renderForgotPasswordFrom,
    resetPassword,
    signup,
} from "../controllers/authController.js";
import isLoggedIn from "../middleware/isLoggedIn.js";
import { signupValidation } from "../validators/signupValidator.js";
import { loginValidation } from "../validators/loginValidators.js";

router.post("/auth/signup", ...signupValidation, signup);
router.post("/auth/login", ...loginValidation, login);
router.put("/auth/password/change", isLoggedIn, changePassword);

router.post("/auth/password/forgot", forgotPassword);
router.get("/auth/password/forgot/:token", renderForgotPasswordFrom);
router.post("/auth/password/reset", resetPassword);

router.get("/auth/logout", logout);
router.get("/auth/profile", isLoggedIn, getProfile);

export default router;
