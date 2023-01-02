import { check } from "express-validator";

export const loginValidation = [
    check("email")
        .not()
        .isEmpty()
        .withMessage("Email is required!")
        .isEmail()
        .withMessage("Invalid Email"),
    check("password")
        .not()
        .isEmpty()
        .withMessage("Password is required!")
        .isLength({ min: 8 })
        .withMessage("Password can not be less than 8 chars"),
];
