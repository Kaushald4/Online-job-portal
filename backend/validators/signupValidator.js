import { check } from "express-validator";

export const signupValidation = [
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
    check("firstName")
        .not()
        .isEmpty()
        .withMessage("First Name is required")
        .isLength({ min: 4 })
        .withMessage("First Name can not be less than 4 chars"),
    check("lastName")
        .not()
        .isEmpty()
        .withMessage("Last Name is required")
        .isLength({ min: 4 })
        .withMessage("Last Name can not be less than 4 chars"),
];
