import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../operations/auth";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [signUpState, setSignUpState] = useState({
        name: "",
        email: "",
        userName: "",
        password: "",
    });

    const handelSignUpStates = (e) => {
        const { name, value } = e.target;
        setSignUpState({
            ...signUpState,
            [name]: value,
        });
    };

    const handelSignUp = (e) => {
        try {
            e.preventDefault();
            dispatch(signUpUser(signUpState));
            setSignUpState({
                name: "",
                email: "",
                userName: "",
                password: "",
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="my-16 flex w-full items-center justify-center">
            <div className="mx-4 flex w-full items-center justify-center rounded-lg bg-[#EEE] p-4 sm:w-[600px] md:p-8 lg:p-12">
                <form
                    onSubmit={handelSignUp}
                    className="w-full text-center text-black"
                >
                    <h1 className="mb-4 p-4 text-4xl font-bold md:pt-0 md:text-5xl">
                        Sign Up
                    </h1>

                    <div className="mt-3 flex flex-col items-start justify-center px-4">
                        <label
                            htmlFor="name"
                            className="px-1 text-lg font-semibold lg:text-xl"
                        >
                            Name
                        </label>
                        <input
                            className="w-full rounded-lg border border-[#1B4D30] p-2 text-lg"
                            type="text"
                            name="name"
                            value={signUpState.name}
                            placeholder="Harvest Hub"
                            required
                            onChange={handelSignUpStates}
                        />
                    </div>
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
                            name="userName"
                            value={signUpState.userName}
                            placeholder="Username"
                            onChange={(e) => {
                                handelSignUpStates(e);
                            }}
                            required
                        />
                    </div>
                    <div className="mt-3 flex flex-col items-start justify-center px-4">
                        <label
                            htmlFor="name"
                            className="px-1 text-lg font-semibold lg:text-xl"
                        >
                            Email
                        </label>
                        <input
                            className="w-full rounded-lg border border-[#1B4D30] p-2 text-lg"
                            type="email"
                            name="email"
                            value={signUpState.email}
                            placeholder="harvesthub@gmail.com"
                            onChange={(e) => {
                                handelSignUpStates(e);
                            }}
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
                            value={signUpState.password}
                            placeholder="Password"
                            onChange={(e) => {
                                handelSignUpStates(e);
                            }}
                            required
                        />
                    </div>

                    <div className="mx-4 mt-6 flex flex-col items-center justify-center rounded-lg bg-[#1B4D30] p-2">
                        <button
                            type="submit"
                            className="w-full text-2xl font-bold text-white"
                        >
                            Sign Up
                        </button>
                    </div>

                    <div className="mx-auto mt-2  w-16 border border-[#1B4D30]"></div>

                    <div className="mt-3 flex items-center justify-center px-4 text-base">
                        Already have account?&nbsp;{" "}
                        <Link to="/login" className="text-[#0000EE] underline">
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
