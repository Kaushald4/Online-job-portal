import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/auth/loginPage";
import SignUpPage from "./pages/auth/signupPage";
import ForgotPasswordPage from "./pages/auth/forgotPasswordPage";
import HomePage from "./pages/homePage";

const MyRoutes = () => {
    return (
        <Routes>
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/signup" element={<SignUpPage />} />
            <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/" element={<HomePage />} />
        </Routes>
    );
};

export default MyRoutes;
