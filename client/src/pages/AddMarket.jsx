import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMarketAdmin } from "../operations/admin";
import Map from "react-map-gl";

export default function AddMarket() {
    const dispatch = useDispatch();

    const [marketState, setMarketState] = useState({
        marketName: "",
        address: "",
        contactNumber: "",
        latitude: "",
        longitude: "",
        image: null,
    });

    const handelMarketChange = (e) => {
        const { name, value } = e.target;
        setMarketState({
            ...marketState,
            [name]: value,
        });
    };

    const handelImage = (e) => {
        setMarketState({
            ...marketState,
            image: e.target.files[0],
        });
    };

    const handelAddMarket = async (e) => {
        e.preventDefault();
        if (marketState.latitude && marketState.longitude) {
            const data = await dispatch(addMarketAdmin(marketState));
        } else {
            alert("allow location");
        }
    };

    const handelLocation = () => {
        console.log("location", navigator.geolocation);
    };
    return (
        <div className="flex items-center justify-center  ">
            <form
                onSubmit={handelAddMarket}
                className="m-10 flex w-full flex-col items-center justify-center gap-3 rounded-sm border bg-slate-100 pb-2  sm:w-2/3"
            >
                <h1 className="w-full border bg-green-700 py-2 text-center text-2xl font-semibold">
                    Add Market
                </h1>

                <div className="flex flex-col gap-2 p-2 sm:w-1/2 sm:text-center ">
                    <label htmlFor="product name">Market Name</label>
                    <input
                        type="text"
                        name="marketName"
                        value={marketState?.marketName}
                        className="rounded-md border px-2 py-1 text-gray-400 outline-none sm:text-center"
                        placeholder="Enter Market Name"
                        onChange={handelMarketChange}
                        required
                    />
                </div>

                <div className="flex flex-col gap-2 p-2 sm:w-1/2 sm:text-center ">
                    <label htmlFor="product name">Market Address</label>
                    <textarea
                        name="address"
                        value={marketState?.address}
                        className="rounded-md border px-2 py-1 text-gray-400 outline-none sm:text-center"
                        placeholder="Enter Market Address"
                        onChange={handelMarketChange}
                        required
                        cols="30"
                        rows="2"
                    ></textarea>
                </div>

                <div className="flex flex-col gap-2 p-2 sm:w-1/2 sm:text-center ">
                    <label htmlFor="product name">Market Contact</label>
                    <input
                        type="tel"
                        name="contactNumber"
                        value={marketState?.contactNumber}
                        className="rounded-md border px-2 py-1 text-gray-400 outline-none sm:text-center"
                        placeholder="Enter contactNumber"
                        onChange={handelMarketChange}
                        required
                    />
                </div>

                <div className="flex flex-col gap-2 p-2 sm:w-1/2 sm:text-center ">
                    <label htmlFor="product Image">Market Image</label>
                    <input
                        type="file"
                        name="image"
                        className="rounded-md py-1  text-gray-400 outline-none sm:text-center"
                        onChange={handelImage}
                        required
                    />
                </div>

                <div className="flex items-center justify-center">
                    {/* <Map
                        mapLib={import("mapbox-gl")}
                        initialViewState={{
                            longitude: -100,
                            latitude: 40,
                            zoom: 3.5,
                        }}
                        style={{ width: 600, height: 400 }}
                        mapStyle="mapbox://styles/mapbox/streets-v9"
                    /> */}
                    
                    <button
                        onClick={handelLocation}
                        className="rounded-md border bg-blue-600 px-10 py-1 text-white "
                    >
                        Allow Location
                    </button>
                </div>

                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="rounded-md border bg-green-600 px-10 py-1 text-white "
                    >
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
}
