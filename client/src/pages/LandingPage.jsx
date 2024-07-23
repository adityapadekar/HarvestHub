import React from "react";
import LandingPagePerson from "../assets/LandingPagePerson.svg";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import book_reading from "../assets/book.svg";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center pb-16 pt-6">
            {/* hero section */}
            <div className="flex w-full flex-col-reverse items-center justify-evenly md:flex-row">
                <div className="flex h-full w-full flex-col items-start justify-start px-8 py-6 sm:w-[80%]  md:w-auto md:pr-0">
                    <div className="px-2 text-4xl sm:px-4 sm:text-5xl md:px-0 lg:text-6xl">
                        <p>
                            GET THE{" "}
                            <span className="text-[#FF4D00]">FRESHEST</span>
                        </p>
                        <p>
                            PRICE ON{" "}
                            <span className="text-[#FF4D00]">HARVEST</span>
                        </p>
                    </div>
                    <p className="mt-3 px-2 text-[#1B4D30] sm:px-4 md:text-base lg:text-lg">
                        Your Go-To Source for Profitable Produce!
                    </p>
                    <button
                        className="mt-3 flex items-center justify-center gap-4 rounded-full bg-[#1B4D30] px-6 py-3 text-xl font-semibold text-white"
                        onClick={() => {
                            navigate("/signup");
                        }}
                    >
                        Sign <FaArrowRightLong />
                    </button>
                </div>
                <div className="px-8 py-6 md:pl-0">
                    <img
                        src={LandingPagePerson}
                        alt="Hero Image"
                        className="w-96 drop-shadow-lg"
                    />
                </div>
            </div>

            <div className="my-6 w-full border-[1px] border-black p-4 sm:w-[80%] md:w-auto">
                <h1 className="mb-2 p-2 text-center text-3xl md:text-4xl">
                    Why to choose us ?
                </h1>
                <div className="flex w-full flex-col items-start justify-center gap-1">
                    <p className="flex items-center justify-center p-1 text-sm md:text-base">
                        <IoCheckmarkCircleOutline size={24} className="mr-2" />
                        Maximize Your Harvest, Minimize Your Hassle: Know Your
                        Market Prices!
                    </p>
                    <p className="flex items-center justify-center p-1 text-sm md:text-base">
                        <IoCheckmarkCircleOutline size={24} className="mr-2" />
                        Harvest Your Best Deal: Empowering Farmers with Market
                        Insights!
                    </p>
                    <p className="flex items-center justify-center p-1 text-sm md:text-base">
                        <IoCheckmarkCircleOutline size={24} className="mr-2" />
                        Empowering Farmers, Nurturing Markets: Know Your
                        Produce&apos;s Worth!
                    </p>
                    <p className="flex items-center justify-center p-1 text-sm md:text-base">
                        <IoCheckmarkCircleOutline size={24} className="mr-2" />
                        Smart Harvest, Savvy Sales: Navigate Markets with
                        Precision Pricing!
                    </p>
                    <p className="flex items-center justify-center p-1 text-sm md:text-base">
                        <IoCheckmarkCircleOutline size={24} className="mr-2" />
                        Gain the Market Edge: Strategic Pricing for Prosperous
                        Harvests!
                    </p>
                    <p className="flex items-center justify-center p-1 text-sm md:text-base">
                        <IoCheckmarkCircleOutline size={24} className="mr-2" />
                        Fresh Insights, Better Profits: Stay Ahead with
                        Market-Wise Farming!
                    </p>
                    <p className="flex items-center justify-center p-1 text-sm md:text-base">
                        <IoCheckmarkCircleOutline size={24} className="mr-2" />
                        Optimize Your Yield, Maximize Your Profit: Market
                        Intelligence for Farmers!
                    </p>
                </div>
            </div>

            <div className="mx-auto flex w-full flex-wrap items-center justify-center rounded-[30px] border-2 border-[#D3D56D] bg-[#FEFFC2] px-16 py-10 md:w-[70%]">
                <div className="min-w-[280px] flex-1">
                    <h1 className="font-inter text-3xl font-semibold text-[#096A4F]">
                        Stay home and access information with a single tap!
                    </h1>
                    <p className="py-4 font-inter text-2xl">
                        Subscribe now to get notifications via email
                    </p>
                    <div className="relative w-full md:w-[90%]">
                        <input
                            type="email"
                            className="w-full rounded-full border border-[#096A4F] px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                        ></input>
                        <button className="absolute right-0 top-0 rounded-full border border-[#096A4F] bg-[#096A4F] px-3 py-2 text-white">
                            Subscribe
                        </button>
                    </div>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <img
                        src={book_reading}
                        alt="book reading"
                        className="min-w-[350px]"
                    />
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
