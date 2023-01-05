import React, { useState, ChangeEvent, FormEvent } from "react";

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

    const [showPassword, setShowPassword] = useState(false);

    const handleAuthDetailsChange = (authType: authType) => (e: ChangeEvent<HTMLInputElement>) => {
        if (authType === "signup") {
            setSignupDetails({ ...signupDetails, [e.target.name]: e.target.value });
        } else {
            setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
        }
    };

    const togglePassVisibility = () => {
        setShowPassword(!showPassword);
    };

    const signUp = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(signupDetails);
    };

    const login = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(loginDetails);
    };

    return { handleAuthDetailsChange, signUp, login, togglePassVisibility, showPassword };
};

export default useAuth;
