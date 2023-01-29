import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import crypto from "crypto";
import { UserRole } from "../utils/userRole.js";
import { config } from "../config/index.js";
const { ObjectId } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            maxLength: [80, "First Name can not be more than 80 char long"],
            trim: true,
        },
        lastName: {
            type: String,
            maxLength: [80, "Last Name can not be more than 80 char long"],
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            required: [true, "Email is required!"],
            unique: true,
        },
        phoneNo: {
            type: String,
            trim: true,
            max: [10, "can't be more than 10 digits long"],
        },
        password: {
            type: String,
            required: true,
            select: false,
            minLength: 8,
        },
        role: {
            type: String,
            enum: Object.values(UserRole),
            default: UserRole.EMPLOYEE,
        },
        orginazationId: {
            type: ObjectId,
            ref: "Orginazation",
        },
        forgotPasswordToken: String,
        forgotPasswordExpDate: Date,
        passwordChangedAt: Date,
    },
    { timestamps: true }
);

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    this.passwordChangedAt = new Date(Date.now() - 1000);
    return next();
});

UserSchema.methods = {
    comparePassword: async function (plainPassword) {
        return await bcrypt.compare(plainPassword, this.password);
    },

    generateJwtToken: function () {
        const token = JWT.sign({ id: this._id }, config.JWT_SECRET, {
            expiresIn: config.JWT_EXPIRE,
        });
        return token;
    },

    generateForgotPasswordToken: function () {
        const forgotToken = crypto.randomBytes(10).toString("hex");
        const encryptedForgotToken = crypto.createHash("sha256").update(forgotToken).digest("hex");
        this.forgotPasswordToken = encryptedForgotToken;
        this.forgotPasswordExpDate = new Date(Date.now() + 2 * 60 * 60 * 1000);
        return forgotToken;
    },

    passwordChangedAfter: function (jwtTimestamp) {
        if (this.passwordChangedAt) {
            const changedTimestamp = Math.floor(this.passwordChangedAt.getTime() / 1000);
            return changedTimestamp > jwtTimestamp;
        }
        return false;
    },
};

export default mongoose.model("User", UserSchema);
