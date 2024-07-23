import React, { useState } from "react";
import keyIcon from "../assets/password-key-icon.svg";
import { BsArrowLeft } from "react-icons/bs";

import { forgotPassword } from "../operations/auth";
import { useDispatch } from "react-redux";
export default function ForgotPassword() {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const handelForgotPasswordLink = async (e) => {
        e.preventDefault();
        const res = await dispatch(forgotPassword(email));
    };

    return (
        <div className="  flex  flex-col items-center justify-center text-center">
            <img src={keyIcon} alt="key icon" className="mb-10"></img>
            <h1 className=" font-inter text-2xl font-semibold">
                Forgot Password ?
            </h1>
            <p className=" font-inter text-base">
                No worries, we’ll send you reset instructions.
            </p>

            <form
                className=" flex flex-col items-center justify-center gap-4"
                onSubmit={handelForgotPasswordLink}
            >
                <div className=" relative my-5">
                    <label
                        htmlFor="email"
                        className=" absolute -top-[13px] left-4 bg-white font-poppins text-xl text-[#A448FF]"
                    >
                        Email
                    </label>
                    <input
                        required
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        className=" h-[45px] w-[250px] rounded-lg border-2 border-[#A448FF] bg-transparent"
                    />
                </div>

                <button
                    type="submit"
                    className=" rounded-lg bg-[#A448FF] px-3 py-2 font-inter text-xs font-bold text-white"
                >
                    Send Link
                </button>
            </form>

            <p
                onClick={() => {
                    navigate("/login");
                }}
                className=" mt-4 flex items-center justify-center font-inter text-sm font-semibold"
            >
                {" "}
                <span>
                    <BsArrowLeft />
                </span>{" "}
                Back to log in
            </p>
        </div>
    );
}
