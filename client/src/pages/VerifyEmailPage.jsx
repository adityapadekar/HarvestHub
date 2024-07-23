import React from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { VerifyEmail } from "../operations/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import email from "../assets/email.svg";
export default function VerifyEmailPage() {
    const { pathname } = useLocation();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    let token = pathname.split("/")[2];

    const handelVerifyEmail = async () => {
        const data = await dispatch(VerifyEmail(token));

        if (data?.payload?.status === true) {
            navigate("/login");
        }
    };
    return (
        <div className="flex flex-col flex-wrap items-center justify-center gap-2 p-6">
            <img className="h-[200px] w-[200px]" src={email} alt="email icon" />
            <h3 className="text-3xl font-bold text-green-700">
                Email Verification
            </h3>
            <p className="text-center">
                Youve entered <span className="font-bold">xyz@gmail.com</span>{" "}
                as the email address for your acount.
            </p>
            <p className="text-center">
                Please verify this email address by clicking button below.
            </p>
            <button
                onClick={handelVerifyEmail}
                className="rounded-md bg-green-500 px-10 py-1 text-white hover:text-black"
            >
                Verify
            </button>
            <Link to="/">Need help?</Link>
            <p className="text-center">
                Contact our support team at{" "}
                <Link to="/">Support@company.com</Link>{" "}
            </p>
        </div>
    );
}
