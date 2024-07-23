import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { RiArrowDropDownFill, RiArrowDropUpFill } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import logo from "../../assets/logo.svg";
import { NavbarLinks } from "../../../Data/navbar-links";
import CheckRole from "../../services/CheckRole";

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const profileMenuRef = useRef();
    const sideMenuRef = useRef();
    const role = CheckRole();

    const [isProfileDropDownOpen, setIsProfileDropDownOpen] = useState(false);
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    useEffect(() => {
        const handler = (e) => {
            if (!profileMenuRef.current?.contains(e.target)) {
                 setIsProfileDropDownOpen(false);
            }
            if (!sideMenuRef.current?.contains(e.target)) {
                setIsSideMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    });

    useEffect(() => {
        setIsProfileDropDownOpen(false);
        setIsSideMenuOpen(false);
    }, [location]);

    return (
        <div className={"bg-[#1B4D30] p-4"}>
            <div className="flex items-center justify-between sm:px-4 md:px-8 lg:px-16">
                <div className="flex items-center justify-start md:w-1/3">
                    <Link to={role ? "/home" : "/"}>
                        <img
                            src={logo}
                            alt="HarvestHub"
                            className="w-48 sm:w-72"
                            loading="lazy"
                        />
                    </Link>
                </div>

                {role && (
                    <div className="hidden items-center justify-center gap-4 md:flex md:w-1/3 lg:gap-6">
                        {NavbarLinks.map((item, index) => (
                            <div key={index}>
                                <div className="group relative h-fit w-fit">
                                    <Link
                                        to={item.path}
                                        className="block px-4 py-1 text-base font-semibold text-[#FDF0E4] md:text-xl"
                                    >
                                        {item.title}
                                    </Link>
                                    <span
                                        className={`absolute left-0 right-0 h-1 origin-left ${location.pathname !== item.path ? "scale-x-0" : ""} rounded-full bg-[#FF6334] transition-transform duration-300 ease-out group-hover:scale-x-100`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="hidden items-center justify-end md:flex md:w-1/3">
                    {role && role ? (
                        <div className="flex gap-5">
                            <div>
                                <Link to="/favourites" className="flex">
                                    <FaHeart color="white" size={32} />
                                </Link>
                            </div>
                            <div
                                className="relative flex flex-col items-center rounded-lg"
                                ref={profileMenuRef}
                            >
                                <button
                                    className="flex items-center justify-center"
                                    onClick={() => {
                                        setIsProfileDropDownOpen(
                                            !isProfileDropDownOpen,
                                        );
                                    }}
                                >
                                    <CgProfile color="white" size={32} />
                                    {isProfileDropDownOpen ? (
                                        <RiArrowDropUpFill
                                            color="white"
                                            size={32}
                                        />
                                    ) : (
                                        <RiArrowDropDownFill
                                            color="white"
                                            size={32}
                                        />
                                    )}
                                </button>
                                {isProfileDropDownOpen && (
                                    <div className="absolute right-0 top-10 z-[100] flex w-64 flex-col items-start rounded-lg bg-[rgb(255,255,255)] p-2 shadow-lg">
                                        <Link
                                            to="/profile"
                                            className="flex w-full cursor-pointer justify-start rounded-r-lg border-l-4 border-l-transparent px-4 py-2 hover:border-l-[#DDDDDD] hover:bg-gray-100"
                                        >
                                            <h3 className="text-2xl font-normal">
                                                Profile
                                            </h3>
                                        </Link>
                                        <div className="h-[1px] w-full bg-gray-300"></div>
                                        {role && role === "admin" && (
                                            <Link
                                                to="/admin-dashboard/moderators"
                                                className="flex w-full cursor-pointer justify-start rounded-r-lg border-l-4 border-l-transparent px-4 py-2 hover:border-l-[#DDDDDD] hover:bg-gray-100"
                                            >
                                                <h3 className="text-2xl font-normal">
                                                    Dashboard
                                                </h3>
                                            </Link>
                                        )}

                                        {role && role === "moderator" && (
                                            <Link
                                                to="/moderator-dashboard"
                                                className="flex w-full cursor-pointer justify-start rounded-r-lg border-l-4 border-l-transparent px-4 py-2 hover:border-l-[#DDDDDD] hover:bg-gray-100"
                                            >
                                                <h3 className="text-2xl font-normal">
                                                    Dashboard
                                                </h3>
                                            </Link>
                                        )}
                                        <div className="h-[1px] w-full bg-gray-300"></div>
                                        <div
                                            onClick={() => handleLogout()}
                                            className="flex w-full cursor-pointer justify-start rounded-r-lg border-l-4 border-l-transparent px-4 py-2 hover:border-l-[#DDDDDD] hover:bg-gray-100"
                                        >
                                            <h3 className="text-2xl font-normal">
                                                Logout
                                            </h3>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="flex gap-5">
                                <div className="group relative h-fit w-fit">
                                    <Link
                                        to="/about"
                                        className="relative block px-6 py-2 text-center text-xl font-semibold text-[#FDF0E4]"
                                    >
                                        About Us
                                    </Link>
                                    <span
                                        className={`absolute left-0 right-0 h-1 origin-left ${location.pathname !== "/about" ? "scale-x-0" : ""} rounded-full bg-[#FF6334] transition-transform duration-300 ease-out group-hover:scale-x-100`}
                                    />
                                </div>
                                <button
                                    className="hidden rounded-full bg-[#FDF0E4] px-6 py-2 text-xl font-bold text-[#540E00] md:block"
                                    onClick={() => {
                                        navigate("/login");
                                    }}
                                >
                                    Login
                                </button>
                            </div>
                        </>
                    )}
                </div>
                <button className="p-2 md:hidden">
                    <GiHamburgerMenu
                        size={28}
                        onClick={() => setIsSideMenuOpen(true)}
                        color="white"
                    />
                </button>

                <div
                    className={`fixed right-0 top-0 z-[100] h-full w-full bg-black/50 backdrop-blur-sm md:hidden ${isSideMenuOpen ? "-translate-x-0" : "translate-x-full"}`}
                >
                    <div
                        className="absolute right-0 top-0 z-[100] flex h-full w-64 flex-col rounded-lg bg-white p-8"
                        ref={sideMenuRef}
                    >
                        <RxCross2
                            size={28}
                            onClick={() => setIsSideMenuOpen(false)}
                            className="absolute left-4 top-4 cursor-pointer"
                        />
                        <div className="h-6"></div>
                        {role && (
                            <>
                                <Link
                                    to="/profile"
                                    className="w-full p-3 hover:bg-gray-100"
                                >
                                    <p className="text-lg font-bold">
                                        Profile
                                    </p>
                                </Link>
                                <div className="h-[1px] w-full bg-gray-300"></div>
                            </>
                        )}

                        <Link
                            to="/about"
                            className="w-full p-3 hover:bg-gray-100"
                        >
                            <p className="text-lg font-bold">About Us</p>
                        </Link>
                        <div className="h-[1px] w-full bg-gray-300"></div>

                        {role && (
                            <>
                                <Link
                                    to="/blogs"
                                    className="w-full p-3 hover:bg-gray-100"
                                >
                                    <p className="text-lg font-bold">
                                        Blogs
                                    </p>
                                </Link>
                                <div className="h-[1px] w-full bg-gray-300"></div>
                            </>
                        )}
                        {role && role === "admin" && (
                            <>
                                <Link
                                    to="/admin-dashboard"
                                    className="w-full p-3 hover:bg-gray-100"
                                >
                                    <p className="text-lg font-bold">
                                        Dashboard
                                    </p>
                                </Link>
                                <div className="h-[1px] w-full bg-gray-300"></div>
                            </>
                        )}
                        {role && role === "moderator" && (
                            <>
                                <Link
                                    to="/moderator-dashboard"
                                    className="w-full p-3 hover:bg-gray-100"
                                >
                                    <p className="text-lg font-bold">
                                        Dashboard
                                    </p>
                                </Link>
                                <div className="h-[1px] w-full bg-gray-300"></div>
                            </>
                        )}
                        {!role && (
                            <>
                                <Link
                                    to="/login"
                                    className="w-full p-3 hover:bg-gray-100"
                                >
                                    <p className="text-lg font-bold">
                                        Login
                                    </p>
                                </Link>
                                <div className="h-[1px] w-full bg-gray-300"></div>
                            </>
                        )}
                        {role && (
                            <>
                                <button
                                    onClick={() => handleLogout()}
                                    className="flex w-full items-center justify-start p-3 hover:bg-gray-100"
                                >
                                    <p className="text-lg font-bold">
                                        Logout
                                    </p>
                                </button>
                                <div className="h-[1px] w-full bg-gray-300"></div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
