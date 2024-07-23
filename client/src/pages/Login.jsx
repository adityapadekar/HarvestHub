import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { LoginUser } from "../operations/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const [loginState, setLoginState] = useState({
        username: null,
        password: null,
    });

    const usernameRegex = /^[a-zA-Z0-9._]{5,}$/;
    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{8,}$/;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [validateState, setValidateState] = useState({
        username: false,
        password: true,
    });
        
    const handelLoginStates = (e) => {
        const { name, value } = e.target;

        if (name === "username" && !usernameRegex.test(value)) {
            setValidateState({
                ...validateState,
                username: false,
            });
        } else {
            setValidateState({
                ...validateState,
                username: true,
            });
        }

        if (name === "password" && !passwordRegex.test(value)) {
            setValidateState({
                ...validateState,
                password: false,
            });
        } else {
            setValidateState({
                ...validateState,
                password: true,
            });
        }

        setLoginState({
            ...loginState,
            [name]: value,
        });
    };

    const handelLogin = async (e) => {
        e.preventDefault();
        console.log(loginState);
        const data = await dispatch(LoginUser(loginState));
       
        if (data?.payload?.success === true) {
            console.log("token");
            localStorage.setItem("token",JSON.stringify(data?.payload?.result?.token));
            navigate("/home");
        }
    };

    return (
        <>
            <div className="my-16 flex w-full items-center justify-center">
                <div className="mx-4 flex w-full items-center justify-center rounded-lg bg-[#EEE] p-4 sm:w-[600px] md:p-8 lg:p-12">
                    <form
                        onSubmit={handelLogin}
                        className="w-full text-center text-black"
                    >
                        <h1 className="mb-4 p-4 text-4xl font-bold md:pt-0 md:text-5xl">
                            Login
                        </h1>

                        <div className="mt-3 flex flex-col items-start justify-center px-4">
                            <label
                                htmlFor="name"
                                className="px-1 text-lg font-semibold lg:text-xl"
                            >
                                Username
                            </label>
                            <input
                                className="w-full rounded-lg border border-[#1B4D30] p-2 text-lg"
                                type="text"
                                name="username"
                                value={loginState.username}
                                placeholder="UserName"
                                onChange={(e) => {
                                    handelLoginStates(e);
                                }}
                                required
                            />
                        </div>
                        <div className="mt-3 flex flex-col items-start justify-center px-4">
                            <label
                                htmlFor="name"
                                className="px-1 text-lg font-semibold lg:text-xl"
                            >
                                Password
                            </label>
                            <input
                                className="w-full rounded-lg border border-[#1B4D30] p-2 text-lg"
                                type="password"
                                name="password"
                                value={loginState.password}
                                placeholder="Password"
                                onChange={(e) => {
                                    handelLoginStates(e);
                                }}
                                required
                            />
                        </div>

                        <div className="mt-3 flex flex-col items-end justify-center px-4 text-base text-[#0000EE]">
                            <Link to="/forgot-password">Forgot Password?</Link>
                        </div>

                        <div className="mx-4 mt-3 flex flex-col items-center justify-center rounded-lg bg-[#1B4D30] p-2">
                            <button
                                type="submit"
                                className="w-full text-2xl font-bold text-white"
                            >
                                Login
                            </button>
                        </div>

                        <div className="mx-auto mt-2  w-16 border border-[#1B4D30]"></div>

                        <div className="mt-3 flex items-center justify-center px-4 text-base">
                            Not registered yet?&nbsp;{" "}
                            <Link
                                to="/signup"
                                className="text-[#0000EE] underline"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
