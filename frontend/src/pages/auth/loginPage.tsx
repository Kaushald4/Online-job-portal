import React from "react";
import { Card, Label, Checkbox, Button } from "flowbite-react";
import { Link, Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import TextInput from "../../components/TextInput";
import { useGetUserQuery } from "../../features/auth/authSlice";

const LoginPage = () => {
    const {
        handleAuthDetailsChange,
        login,
        togglePassVisibility,
        showPassword,
        loginError,
        loginDetails,
        loginLoading,
        loginResult,
    } = useAuth();

    const { isLoading, error, data, isFetching } = useGetUserQuery<any>();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!error) {
        return <Navigate to={"/"} replace />;
    }

    let errorMessage: any =
        loginError && "data" in loginError ? loginError.data : "";
    let emailError = "";
    let passwordError = "";
    if (errorMessage.message?.includes("Email")) {
        emailError = errorMessage.message;
    } else {
        passwordError = errorMessage.message;
    }

    return (
        <div className="bg-gray-100 min-h-[100vh] dark:bg-gray-800">
            <nav className="h-[10vh]"></nav>
            <div className="shadow-sm max-w-[1240px] mx-auto">
                <div className="max-w-[400px] mx-auto">
                    <Card>
                        <div>
                            <h1 className="text-[28px] font-bold">Sign in</h1>
                            <p className="text-[14px] m-0 p-0 font-200">
                                Stay updated on your professional world
                            </p>
                        </div>
                        <form
                            className="flex flex-col gap-4"
                            onSubmit={login}
                            method="POST"
                        >
                            <TextInput
                                name="email"
                                onChange={handleAuthDetailsChange("login")}
                                type="email"
                                label="Email"
                                disabled={loginLoading}
                                value={loginDetails.email}
                                labelFor="Email"
                                errorMessage={emailError}
                                placeholder="name@example.com"
                                required={true}
                            />
                            <TextInput
                                name="password"
                                onChange={handleAuthDetailsChange("login")}
                                type={showPassword ? "text" : "password"}
                                required={true}
                                label="Password"
                                labelFor="Password"
                                value={loginDetails.password}
                                disabled={loginLoading}
                                placeholder="Password"
                                errorMessage={passwordError}
                                rightIcon={
                                    showPassword ? <p>Hide</p> : <p>Show</p>
                                }
                                rightIconOnClick={togglePassVisibility}
                            />
                            <div className="mt-1">
                                <Link
                                    to="/auth/forgot-password"
                                    className="text-sky-800 font-bold text-[15px]"
                                >
                                    Forgot Password?
                                </Link>
                            </div>

                            <div className="flex items-center gap-2">
                                <Checkbox id="remember" />
                                <Label htmlFor="remember">Remember me</Label>
                            </div>

                            <Button type="submit" disabled={loginLoading}>
                                Sign in
                            </Button>
                            <div className="text-center">
                                <p>OR</p>
                                <button>Continue with google</button>
                                <div className="mt-4">
                                    <p className="text-[14px]">
                                        New to JobPost{" "}
                                        <Link
                                            to="/auth/signup"
                                            className="text-blue-800 font-bold"
                                        >
                                            Join Now
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

export default LoginPage;
