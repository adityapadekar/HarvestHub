import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";
import { GoHeart } from "react-icons/go";
export default function DetailPage() {
    return (
        <div className="my-10 flex flex-col items-center  justify-center gap-6 rounded-md p-4  sm:flex-row sm:items-start  border-none shadow-none md:shadow-lg md:border">
            <div className="flex gap-6  p-6  shadow-lg border md:shadow-none border-none">
                <div className="flex flex-col rounded-md p-1">
                    <img
                        src="https://source.unsplash.com/random?fruits?"
                        alt="products"
                        className=" h-[170px] rounded-t-md sm:h-[200px]"
                    />
                    <div className="flex items-center justify-between py-2">
                        <h1 className="text-center text-2xl font-bold">
                            Carrots
                        </h1>
                        <div className="flex gap-2">
                            <GoHeart fill="#3BAF3D"  className="" />
                            <AiOutlineDelete
                                fill="#3BAF3D"
                                className=""
                            />
                            <MdOutlineEdit
                                fill="#3BAF3D"
                                className=""
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p>Market - Reays Market</p>
                        <p>City - Pune</p>
                        <p>State - Maharashtra</p>
                        <p>Price - 250 to 350</p>
                    </div>
                </div>


            </div>

            <div className="rounded-md  p-2 shadow-lg border md:shadow-none border-none ">
                <div className="mb-4 flex flex-col gap-3">
                    <p>Manager - Manager Name</p>
                    <p>Contact No. - 8743895335</p>
                    <p>Location</p>
                </div>
                <div>
                    <img
                        // height={300}
                        // width={400}
                        className="w-[600px] h-[300px] border-3 border-[#ACACAC]"
                        src="https://tse1.mm.bing.net/th?id=OIP.yvauclQ-ruJZlVLQBwSYPAHaHa&pid=Api&P=0&h=180"
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
}
