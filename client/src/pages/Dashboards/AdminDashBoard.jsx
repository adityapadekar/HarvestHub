import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function AdminDashBoard({ children }) {
    const navigate = useNavigate();

    const location = useLocation();
    const matchRoute = (path) => {
        return location.pathname.split("/")[2] == path;
    };

    const path = location.pathname.split("/")[2];

    const handelAddNavigation = () => {
        switch (path) {
            case "moderators": {
                navigate("/addModerator");
                break;
            }

            case "markets": {
                navigate("/addMarket");
                break;
            }

            case "products": {
                navigate("/addProduct");
                break;
            }

            default:
                break;
        }
    };

    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="mt-20  flex  flex-wrap items-center gap-2 px-4 sm:justify-between ">
                <div className="flex items-center justify-center gap-4 ">
                    <button
                        onClick={() => navigate("/admin-dashboard/moderators")}
                        className={`rounded-3xl border border-green-700 px-2 py-1 text-center text-green-700 hover:shadow-md ${matchRoute("moderators") ? " bg-green-500 font-bold  text-white" : "bg-none"} `}
                    >
                        Moderators
                    </button>

                    <button
                        onClick={() => navigate("/admin-dashboard/markets")}
                        className={`rounded-3xl border border-green-700 px-3 py-1 text-center text-green-700 hover:shadow-md ${matchRoute("markets") ? " bg-green-500 font-bold text-white" : ""} `}
                    >
                        Markets
                    </button>

                    <button
                        onClick={() => navigate("/admin-dashboard/products")}
                        className={`rounded-3xl border border-green-700 px-3 py-1 text-center text-green-700 hover:shadow-md ${matchRoute("products") ? " bg-green-500 font-bold text-white" : ""} `}
                    >
                        Products
                    </button>
                </div>
                <div className="flex items-center justify-end  ">
                    <button
                        className="rounded-3xl border border-green-700  px-3 py-1 text-center text-green-700 hover:shadow-md"
                        onClick={handelAddNavigation}
                    >
                        Add+
                    </button>
                </div>
            </div>

            <div className=" flex items-center  justify-between rounded-md    bg-[#F7F7F7] p-1 sm:m-4">
                <div className="flex items-center  justify-end gap-2 px-4 sm:gap-6">
                    <p>||</p>
                    <p>=</p>
                    <p>+</p>
                    <p>...</p>
                </div>

                <div className="flex  justify-end">
                    <input
                        type="text"
                        placeholder="Search"
                        className="  w-1/2 rounded-l-md bg-white  px-2 py-1 font-poppins text-xl font-semibold text-green-300 "
                    />
                    <div className=" flex items-center justify-center rounded-r-md bg-[#3BAF3D] px-2 py-1">
                        Logo
                    </div>
                </div>
            </div>

            <div className="flex p-2">{children}</div>
        </div>
    );
}
