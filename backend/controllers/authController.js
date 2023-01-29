import { validationResult } from "express-validator";
import User from "../models/User.js";
import asyncHandler from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import { cookieOptions } from "../utils/cookieOptions.js";
import groupErrors from "../utils/groupValidationErrors.js";
import sendMail from "../services/sendMail.js";
import { UserRole } from "../utils/userRole.js";

/**************************************************
 * @SIGNUP
 * @REQUEST_TYPE POST
 * @route /auth/signup
 * @description route for creating user account
 * @params email, firstName, lastName, password
 * @return User Object with token
 **************************************************/
export const signup = asyncHandler(async (req, res, next) => {
    const { email, firstName, lastName, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = groupErrors(errors);
        return res.status(400).json({ success: false, message: error });
    }

    let user = await User.findOne({ email });
    if (user) {
        return next(new AppError("User already exist", 409));
    }

    user = await User.create({
        email,
        password,
        firstName,
        lastName,
    });

    const token = user.generateJwtToken();
    user.password = undefined;
    res.status(201)
        .cookie("token", `Bearer ${token}`, cookieOptions)
        .json({ success: true, data: { ...user._doc, token } });
});

/**************************************************
 * @LOGIN
 * @REQUEST_TYPE POST
 * @route /auth/login
 * @description route for user login
 * @params email, password
 * @return User Object with token
 **************************************************/
export const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = groupErrors(errors);
        return res.status(400).json({ success: false, message: error });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new AppError("Email not registered!", 404));
    }

    const isPassValid = await user.comparePassword(password);
    if (!isPassValid) {
        return next(new AppError("Invalid credentials!", 401));
    }

    const token = user.generateJwtToken();
    user.password = undefined;
    res.status(200)
        .cookie("token", `Bearer ${token}`, cookieOptions)
        .json({ success: true, data: { ...user._doc, token } });
});

/**************************************************
 * @LOGOUT
 * @REQUEST_TYPE GET
 * @route /auth/logout
 * @description route for logout
 * @params none
 * @return success message
 **************************************************/
export const logout = asyncHandler(async (req, res, next) => {
    res.clearCookie();
    res.status(200).json({ success: true, message: "Logged out successfully" });
});

/**************************************************
 * @GET_PROFILE
 * @REQUEST_TYPE GET
 * @route /auth/profile
 * @description route for fetching logged in user
 * @params none
 * @return User Object
 **************************************************/
export const getProfile = asyncHandler(async (req, res, next) => {
    const { user } = req;
    return res.status(200).json({ success: true, data: user });
});

/**************************************************
 * @CHANGE_USER_ROLE
 * @REQUEST_TYPE GET
 * @route /auth/profile/role
 * @description route for changing user role from employee to employer
 * @params none
 * @return User Object
 **************************************************/
export const changeUserRole = asyncHandler(async (req, res, next) => {
    User.findOneAndUpdate(
        { _id: req.user._id },
        { $set: { role: UserRole.EMPLOYER } },
        { new: true },
        (error, updatedUser) => {
            if (error) {
                return next(new AppError("Failed to update user try again!", 400));
            }
            //TODO: remove password field from updatedUser
            return res.status(200).json({ success: true, data: updatedUser });
        }
    );
});

/**************************************************
 * @CHANGE_PASSWORD
 * @REQUEST_TYPE PUT
 * @route /auth/password/change
 * @description route for changing currently logged in user
 * @params previousPassword, newPassword, confirmNewPassword
 * @return User Object & success message
 **************************************************/
export const changePassword = asyncHandler(async (req, res, next) => {
    const { prevPassword, newPassword, confirmNewPassword } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = groupErrors(errors);
        return res.status(400).json({ success: false, message: error });
    }

    const user = await User.findById(req.user._id).select("+password");

    const isPrevPassValid = await user.comparePassword(prevPassword);
    if (!isPrevPassValid) {
        return res.status(400).json({ success: false, message: "Previous Password is Invalid!" });
    }

    if (newPassword !== confirmNewPassword) {
        return res.status(400).json({ success: false, message: "password doses not match" });
    }

    user.password = newPassword;

    const token = user.generateJwtToken();

    await user.save();
    user.password = undefined;

    return res.status(200).json({
        success: true,
        message: "Password changed successfully",
        data: { ...user._doc, token },
    });
});

/**************************************************
 * @FORGOT_PASSWORD
 * @REQUEST_TYPE PUT
 * @route /auth/password/forgot
 * @description route for forgot password
 * @params email
 * @return forgot password link
 **************************************************/
export const forgotPassword = asyncHandler(async (req, res, next) => {
    const { email } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = groupErrors(errors);
        return res.status(400).json({ success: false, message: error });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new AppError("Email does not exist!", 400));
    }

    const forgotPassToken = user.generateForgotPasswordToken();

    const url = `${req.protocol}://${req.get("host")}/api/v1/password/forgot/${forgotPassToken}`;

    await sendMail(user.email, "Password reset Link", url);

    return res.status(200).json({
        success: true,
        message: "Mail Sent Successfully",
    });
});

/**************************************************
 * @FORGOT_PASSWORD_RENDER_FORM
 * @REQUEST_TYPE GET
 * @route /auth/password/forgot/:token
 * @description route for rendering form
 * @params
 * @return
 **************************************************/
export const renderForgotPasswordFrom = asyncHandler(async (req, res, next) => {
    res.render("forgotpass");
});

/**************************************************
 * @RESET_PASSWORD
 * @REQUEST_TYPE POST
 * @route /auth/password/reset
 * @description route for resetting user password
 * @params password, confirmPassword
 * @return success message
 **************************************************/
export const resetPassword = asyncHandler(async (req, res, next) => {
    const { password, confirmPassword } = req.body;

    console.log(password, confirmPassword);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = groupErrors(errors);
        console.log(errors);
        return res.status(400).json({ success: false, message: error });
    }
});
