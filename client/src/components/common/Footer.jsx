import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdMail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FooterLinks } from "../../../Data/FooterData";
import logo from "../../assets/logo.svg";
import CheckRole from "../../services/CheckRole";

export default function Footer() {
    const role = CheckRole();

    return (
        <>
            <div className="mt-auto w-full bg-[#1B4D30] p-6 ">
                <div className="flex w-full flex-col items-center justify-between sm:flex-row sm:px-4 md:px-8 lg:px-12">
                    <div className="flex w-full flex-col items-start justify-center sm:w-1/2">
                        <div className="my-2">
                            <img src={logo} className="w-72" alt="Logo" />
                        </div>
                        <p className="font-base p-2 max-w-[300px] text-start text-sm text-[#FDF0E4] md:max-w-[370px] md:text-lg">
                            A platform where you can get to know the{" "}
                            <span className="text-orange-400">best price</span>{" "}
                            for your harvest.
                        </p>
                    </div>
                    <div className="mt-4 flex w-full flex-col items-start justify-center sm:mt-0 sm:w-1/4">
                        <h4 className="p-1 text-2xl font-semibold text-white">
                            Quick Links
                        </h4>
                        <div className="flex flex-col items-start justify-center p-2 text-sm font-thin text-white underline md:text-lg">
                            {FooterLinks &&
                                FooterLinks.map((item, index) => {
                                    if (item.name === "Home" && role) {
                                        return (
                                            <Link
                                                className="my-0.5"
                                                key={index}
                                                to="/home"
                                            >
                                                {item?.name}
                                            </Link>
                                        );
                                    } else {
                                        return (
                                            <Link
                                                className="my-0.5"
                                                key={index}
                                                to={item?.url}
                                            >
                                                {item?.name}
                                            </Link>
                                        );
                                    }
                                })}
                        </div>
                    </div>

                    <div className="mt-4 flex w-full flex-col items-start justify-center sm:mt-0 sm:w-1/4">
                        <h4 className="p-1 text-2xl font-semibold text-white">
                            Contacts
                        </h4>
                        <div className="flex flex-col items-start justify-center p-1 text-sm font-thin text-white md:text-lg">
                            <div className="flex flex-row items-center justify-start p-1">
                                <FaPhoneAlt
                                    size={18}
                                    color="white"
                                    className="pr-1"
                                />
                                <p>+918756456789</p>
                            </div>
                            <div className="flex flex-row items-center justify-start p-1">
                                <MdMail
                                    size={20}
                                    color="white"
                                    className="pr-1"
                                />
                                <p>harvetshub@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
