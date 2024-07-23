import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";
import { GoHeart } from "react-icons/go";

export default function MarketAdminCards({  }) {
    
    return (
        <div className="flex w-[170px] flex-col rounded-lg border-2 border-[#3BAF3D] md:w-[250px]">
            <img
                src="https://source.unsplash.com/random?fruits?"
                alt="products"
                className=" h-[155px] w-full rounded-t-md sm:h-[200px]"
            />

            <div className="flex  flex-col items-center justify-center sm:px-2">
                <h1 className="p-2 text-center font-poppins text-xl font-semibold sm:text-3xl">
                    Carrots
                </h1>
                <div className="flex items-center  gap-2 px-[1px] text-center sm:gap-3  ">
                    <div className="">
                        <h3 className="  font-poppins text-sm sm:text-xl ">
                            Reays Market
                        </h3>
                        <p className="font-poppins text-gray-500">Market</p>
                    </div>
                    <hr className="  h-10 w-[2px] bg-gray-300" />
                    <div>
                        <h3 className=" font-poppins text-sm sm:text-xl  ">
                            250-300
                        </h3>
                        <p className="font-poppins text-gray-500">Price</p>
                    </div>
                </div>
                <div className="flex w-full items-center justify-around px-2 py-4">
                    <button
                        // onClick={handelDetail}
                        className="rounded-3xl  border-2 border-[#3BAF3D] px-3 py-1 font-poppins text-sm  font-medium text-[#3BAF3D] sm:text-base "
                    >
                        Details
                    </button>

                    <div className="flex  sm:gap-2">
                        <AiOutlineDelete
                            fill="#3BAF3D"
                            className=" h-[20px] w-[20px]"
                        />
                        <MdOutlineEdit
                            fill="#3BAF3D"
                            className="h-[20px] w-[20px]"
                        />
                        <GoHeart fill="#3BAF3D" className="h-[20px] w-[20px]" />
                    </div>
                </div>
            </div>
        </div>
    );
}
