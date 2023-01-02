import JWT from "jsonwebtoken";
import asyncHandler from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import { config } from "../config/index.js";
import User from "../models/User.js";

const isLoggedIn = asyncHandler(async (req, res, next) => {
    let token = req.cookies?.token || req.headers.authorization?.token;
    if (!token) {
        return next(new AppError("No Authorization Headers Provided", 405));
    }

    token = token.split(" ")[1];

    if (!token) {
        return next(new AppError("Invalid Token!", 400));
    }

    const decoded = JWT.verify(token, config.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (user.passwordChangedAfter(decoded.iat)) {
        return next(new AppError("Password Changed recently Login again!", 400));
    }

    req.user = user;
    next();
});

export default isLoggedIn;
