import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useSignupMutation, useLoginMutation, useGetUserQuery } from "../features/auth/authSlice";

interface SignupState {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

interface LoginState {
    email: string;
    password: string;
}

type authType = "login" | "signup";

const useAuth = () => {
    // auth states
    const [signupDetails, setSignupDetails] = useState<SignupState>({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
    });
    const [loginDetails, setLoginDetails] = useState<LoginState>({
        email: "",
        password: "",
    });

    // state for pasword visibility feedback
    const [showPassword, setShowPassword] = useState(false);

    // signup & login api slice
    const [signUpUser, result] = useSignupMutation();
    const [loginUser, loginResult] = useLoginMutation();

    const navigate = useNavigate();

    const handleAuthDetailsChange = (authType: authType) => (e: ChangeEvent<HTMLInputElement>) => {
        if (authType === "signup") {
            result.reset();
            setSignupDetails({ ...signupDetails, [e.target.name]: e.target.value });
        } else {
            loginResult.reset();
            setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
        }
    };

    const togglePassVisibility = () => {
        setShowPassword(!showPassword);
    };

    const signUp = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        signUpUser(signupDetails)
            .unwrap()
            .then(() => {
                navigate("/", { replace: true });
            });
    };

    const login = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        loginUser(loginDetails)
            .unwrap()
            .then(() => {
                navigate("/", { replace: true });
            });
    };

    return {
        handleAuthDetailsChange,
        signUp,
        login,
        togglePassVisibility,
        showPassword,
        isLoading: result.isLoading,
        error: result.error,
        signupDetails,
        loginDetails,
        loginError: loginResult.error,
        loginLoading: loginResult.isLoading,
        loginResult,
        result,
    };
};

export default useAuth;
