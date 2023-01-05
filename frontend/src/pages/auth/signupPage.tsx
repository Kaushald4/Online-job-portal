import React from "react";
import { Card, Label, Checkbox, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import TextInput from "../../components/TextInput";

const SignupPage = () => {
    const { handleAuthDetailsChange, signUp, togglePassVisibility, showPassword } = useAuth();

    return (
        <div className="bg-gray-100 min-h-[100vh] dark:bg-gray-800">
            <div className="shadow-sm max-w-[1240px] mx-auto">
                <div className="text-center py-9">
                    <h1 className="text-[29px]">Make the most of your professional life</h1>
                </div>
                <div className="max-w-[500px] mx-auto">
                    <Card>
                        <form className="flex flex-col gap-y-2" onSubmit={signUp} method="POST">
                            <div className="flex gap-x-2">
                                <TextInput
                                    placeholder="First Name"
                                    type="text"
                                    label="FirstName"
                                    name="firstName"
                                    labelFor="FirstName"
                                    onChange={handleAuthDetailsChange("signup")}
                                    required={true}
                                />
                                <TextInput
                                    placeholder="Last Name"
                                    type="text"
                                    label="LastName"
                                    name="lastName"
                                    labelFor="LastName"
                                    onChange={handleAuthDetailsChange("signup")}
                                    required={true}
                                />
                            </div>
                            <TextInput
                                name="email"
                                onChange={handleAuthDetailsChange("signup")}
                                type="email"
                                label="Email"
                                labelFor="Email"
                                placeholder="name@example.com"
                                required={true}
                            />
                            <TextInput
                                name="password"
                                onChange={handleAuthDetailsChange("signup")}
                                type={showPassword ? "text" : "password"}
                                required={true}
                                label="Password"
                                labelFor="Password"
                                placeholder="Password"
                                rightIcon={showPassword ? <p>Hide</p> : <p>Show</p>}
                                rightIconOnClick={togglePassVisibility}
                            />
                            <div className="flex items-center gap-2">
                                <Checkbox id="remember" />
                                <Label htmlFor="remember">Remember me</Label>
                            </div>
                            <div>
                                <p className="text-[12px] text-gray-600 text-center">
                                    By clicking Agree & Join, you agree to the JobPost{" "}
                                    <span className="font-bold text-blue-700">User Agreement,</span>
                                    <span className="font-bold text-blue-700">Privacy Policy,</span>
                                    <span className="mx-1">and</span>
                                    <span className="font-bold text-blue-700">Cookie Policy.</span>
                                </p>
                            </div>
                            <Button type="submit">Join Now</Button>
                            <div className="text-center">
                                <p>OR</p>
                                <button>Continue with google</button>
                                <div className="mt-4">
                                    <p className="text-[14px]">
                                        Already on JobPost{" "}
                                        <Link to="/auth/login" className="text-blue-800 font-bold">
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
