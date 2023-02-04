import React from "react";
import { Card, Label, Checkbox, Button } from "flowbite-react";
import { Link, Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import TextInput from "../../components/TextInput";
import { useGetUserQuery } from "../../features/auth/authSlice";

const SignupPage = () => {
    const {
        handleAuthDetailsChange,
        signUp,
        togglePassVisibility,
        showPassword,
        isLoading,
        signupDetails,
        error,
    } = useAuth();

    const {
        isLoading: isProfileLoading,
        data,
        error: profileError,
    } = useGetUserQuery();

    if (isProfileLoading) {
        return <div>Loading...</div>;
    }

    if (!profileError) {
        return <Navigate to={"/"} replace />;
    }

    let errorMessage: any = error && "data" in error ? (error.data as any) : "";
    let emailError = "";
    let lastNameError = "";
    let firstNameError = "";
    let passwordError = "";

    if (errorMessage.message) {
        for (let key in errorMessage.message) {
            if (key === "email") {
                emailError = errorMessage.message[key][0].message;
            } else if (key === "password") {
                passwordError = errorMessage.message[key][0].message;
            } else if (key === "firstName") {
                firstNameError = errorMessage.message[key][0].message;
            } else if (key === "lastName") {
                lastNameError = errorMessage.message[key][0].message;
            }
        }
    }

    return (
        <div className="bg-gray-100 min-h-[100vh] dark:bg-gray-800 ">
            <div className="shadow-sm max-w-[1240px] mx-auto">
                <div className="text-center py-9">
                    <h1 className="text-[29px]">
                        Make the most of your professional life
                    </h1>
                </div>
                <div className="max-w-[500px] mx-auto flex justify-center items-center h-[70vh]">
                    <Card>
                        <form
                            className="flex flex-col gap-y-5"
                            onSubmit={signUp}
                            method="POST"
                        >
                            <div className="flex gap-x-2">
                                <TextInput
                                    placeholder="First Name"
                                    type="text"
                                    label="FirstName"
                                    name="firstName"
                                    labelFor="FirstName"
                                    value={signupDetails.firstName}
                                    onChange={handleAuthDetailsChange("signup")}
                                    required={true}
                                    disabled={isLoading}
                                    errorMessage={firstNameError}
                                />
                                <TextInput
                                    placeholder="Last Name"
                                    type="text"
                                    value={signupDetails.lastName}
                                    label="LastName"
                                    name="lastName"
                                    labelFor="LastName"
                                    onChange={handleAuthDetailsChange("signup")}
                                    required={true}
                                    disabled={isLoading}
                                    errorMessage={lastNameError}
                                />
                            </div>
                            <TextInput
                                name="email"
                                onChange={handleAuthDetailsChange("signup")}
                                type="email"
                                label="Email"
                                labelFor="Email"
                                value={signupDetails.email}
                                placeholder="name@example.com"
                                required={true}
                                errorMessage={emailError}
                                disabled={isLoading}
                            />
                            <TextInput
                                name="password"
                                onChange={handleAuthDetailsChange("signup")}
                                type={showPassword ? "text" : "password"}
                                required={true}
                                value={signupDetails.password}
                                label="Password"
                                labelFor="Password"
                                placeholder="Password"
                                errorMessage={passwordError}
                                rightIcon={
                                    showPassword ? <p>Hide</p> : <p>Show</p>
                                }
                                rightIconOnClick={togglePassVisibility}
                                disabled={isLoading}
                            />
                            <div className="flex items-center gap-2">
                                <Checkbox id="remember" />
                                <Label htmlFor="remember">Remember me</Label>
                            </div>
                            <div>
                                <p className="text-[12px] text-gray-600 text-center">
                                    By clicking Agree & Join, you agree to the
                                    JobPost{" "}
                                    <span className="font-bold text-blue-700">
                                        User Agreement,
                                    </span>
                                    <span className="font-bold text-blue-700">
                                        Privacy Policy,
                                    </span>
                                    <span className="mx-1">and</span>
                                    <span className="font-bold text-blue-700">
                                        Cookie Policy.
                                    </span>
                                </p>
                            </div>
                            <Button type="submit" disabled={isLoading}>
                                Join Now
                            </Button>
                            <div className="text-center">
                                <p>OR</p>
                                <button>Continue with google</button>
                                <div className="mt-4">
                                    <p className="text-[14px]">
                                        Already on JobPost{" "}
                                        <Link
                                            to="/auth/login"
                                            className="text-blue-800 font-bold"
                                        >
                                            Sign in
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
