import React, { useEffect } from "react";
// import { useDispatch ,useSelector} from "react-redux";
// import { fetchVegetables } from "../redux/slices/Vegetables";
import getLocationCoordinates from "../services/getLocationCoordinates";
import Cards from "../components/common/Cards";
export default function Vegetables() {
    // const dispatch=useDispatch();
    // // const state=useSelector((state)=>state);

    // // get location coordintes

    // // fecth products
    // // const longitude, latitude, pageNumber
    // // 1)73.8567  2)18.5204

    // const location=getLocationCoordinates();

    // console.log("location",location);

    // const getVegetables=async()=>{

    //     const data= await dispatch(fetchVegetables({longitude:location.longitude, latitude:location.latitude,pageNumber:1}));
    // };

    // useEffect(()=>{
    //     getVegetables();
    // },[location]);

    const vegiData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <>
            <div className="flex items-center flex-col justify-center w py-4">
            <div className="hidden sm:flex rounded-md  p-1 m-4 w-[84%] bg-[#D4FFD5] items-center justify-between">
                    <div className="flex w-[50%]" >
                        <input type="text" placeholder="Search" className=" w-[80%] bg-white rounded-l-md  text-green-300 text-xl font-poppins font-semibold p-1"/>
                        <div className=" bg-[#3BAF3D] rounded-r-md p-1 flex items-center justify-center">Logo</div>
                    </div>
                    <div className="flex gap-6 w-[50%]  items-center justify-end px-4">
                        <p>||</p>
                        <p>=</p>
                        <p>+</p>
                        <p>...</p>
                    </div>
                </div>

                <div className="flex gap-2 flex-col sm:hidden rounded-md  p-1 m-4   items-center justify-between">
                    <div className="flex bg-[#D4FFD5] p-[2px] rounded-md" >
                        <input type="text" placeholder="Search" className="  bg-white rounded-l-md  text-green-300 text-xl font-poppins font-semibold p-1"/>
                        <div className=" bg-[#3BAF3D] rounded-r-md p-1 flex items-center justify-center">Logo</div>
                    </div>
                    <div className="bg-[#D4FFD5] w-full flex gap-6   items-center justify-end px-4">
                        <p>||</p>
                        <p>=</p>
                        <p>+</p>
                        <p>...</p>
                    </div>
                   
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-4">
                    {vegiData.map((item, index) => (
                        <Cards id={item} key={index} />
                    ))}
                </div>
            </div>
        </>
    );
}
