import { config } from "../config/index.js";

export const cookieOptions = {
    expires: new Date(Date.now() + config.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    secure: config.NODE_ENV === "development" ? false : true,
    sameSite: "none",
};
