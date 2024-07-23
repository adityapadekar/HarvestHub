import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../../operations/auth";

const Setting = () => {
    const dispatch = useDispatch();

    const updateProfile = async (e) => {
        e.preventDefault();
        console.log("Update profile", updateProfileData);
        await dispatch(updateUserProfile(updateProfileData));
    };

    const [updateProfileData, setUpdateProfileData] = useState({
        name: "",
        email: "",
        mobile: "",
        address: "",
    });

    const handelChange = (e) => {
        const { name, value } = e.target;
        console.log("hits");
        setUpdateProfileData((prevData) => {
            return {
                ...prevData,
                [name]: value,
            };
        });
    };
    return (
        <div className=" flex  h-full min-w-[324px] flex-col items-center justify-center rounded-lg border p-2 shadow-md">
            <h1 className="text-center font-poppins text-2xl font-bold">
                Settings
            </h1>
            <form onSubmit={updateProfile} className="flex flex-col gap-2">
                <div className="flex flex-col ">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={updateProfileData.name}
                        required
                        onChange={handelChange}
                        placeholder="Name"
                        className="rounded-md border p-1 text-center shadow-sm outline-none"
                    />
                </div>
                {/* <div className="flex flex-col ">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        onChange={handelChange}
                        name="email"
                        value={updateProfileData.email}
                        className="rounded-md border p-1 text-center shadow-sm outline-none"
                    />
                </div> */}
                <div className="flex flex-col ">
                    <label htmlFor="mobile">Phone Number</label>
                    <input
                        type="tel"
                        onChange={handelChange}
                        name="mobile"
                        required
                        value={updateProfileData.mobile}
                        placeholder="Mobile"
                        className="rounded-md border p-1 text-center shadow-sm outline-none"
                    />
                </div>
                <div className="flex flex-col ">
                    <label htmlFor="address">Address</label>
                    <textarea
                        name="address"
                        value={updateProfileData.address}
                        required
                        onChange={handelChange}
                        id=""
                        cols="30"
                        rows="3"
                        className="rounded-md border p-1 text-center shadow-sm outline-none"
                    ></textarea>
                </div>

                <button className="bg-[#DAFFE9] px-4 py-2" type="submit">
                    Update
                </button>
            </form>
        </div>
    );
};

export default Setting;
