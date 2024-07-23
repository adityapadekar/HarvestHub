import React from "react";

import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import home_left from "../assets/home_left.svg";
import { CardsData } from "../../Data/HomePage";
import home_last from "../assets/home_last.svg";
export default function Home() {
    const navigate = useNavigate();

    return (
        <>
            <div className="p-6 m-4 rounded-md bg-[#E5FFE6] ">
                <div className="border-2 border-white rounded-md  flex items-center justify-center flex-col lg:flex-row h-[500px]  ">
                    <div className=" lg:w-1/2 h-full flex items-center justify-center overflow-hidden">
                        <img
                            className="lg:w-[80%] scale-90 lg:scale-100 lg:object-cover lg:relative lg:top-[90px] lg:right-20"
                            src={home_left}
                            alt=""
                        />
                    </div>
                    <div className="hidden lg:block lg:w-1/2 h-full  overflow-hidden">
                        <div className="h-full bg-green-400 relative top-0 rounded-lg lg:left-[220px] xl:left-[380px] rotate-[27deg]"></div>
                    </div>
                </div>
            </div>

            {/* cards */}

            <div className=" flex items-center justify-center flex-wrap gap-4 my-10">
                {CardsData.map((item , index) => {
                    return (
                            <Card key={index}
                                link={item.link}
                                image={item.image}
                                name={item.name}
                                backcolor={item.backcolor}
                                textColor={item.textColor}
                            />
                    );
                })}
            </div>

            {/* dummy about */}
            <div className="m-6 flex  flex-col-reverse  md:flex-row items-center justify-center gap-4 md:h-[300px] rounded-md bg-[#FEFFC2] p-4">
                <div>
                    <p>Stay Home and Acess Information With A Single Tap !</p>
                    <p>Dont Miss Any Opportunity.</p>
                </div>
                <img className="h-[280px]" src={home_last} alt="" />
            </div>
        </>
    );
}
