import React from "react";
import { useDispatch } from "react-redux";
import { deleteModerator, updateModerator } from "../../operations/moderator";


export default function ModeratorAdminCard({
    address,
    contact_number,
    email,
    name,
    username,
    id,
    setUpdateModel,
    setUpdateModerator,
}) {
    const disptch = useDispatch();
    const handelDeleteModerator = async (moderatorId) => {
        const data = await disptch(deleteModerator(moderatorId));
    };
    return (

        <div className="flex flex-col  items-start justify-center gap-2 rounded-md border bg-green-100 p-2 pb-4 text-gray-500">
            <div className="flex flex-col gap-2  p-2 text-2xl sm:flex-row">
                <div className="flex gap-2 border-b border-green-500 p-2 ">
                    <p>Name </p>
                    <p className="text-black">
                        {name ? name : "No Name Provided"}
                    </p>
                </div>
                <div className="flex gap-2 border-b border-blue-500 p-2">
                    <p>UserName </p>
                    <p className="text-black">
                        {username ? username : "No Username Provided"}
                    </p>
                </div>
            </div>

            <div className="flex flex-col justify-center sm:w-full sm:items-center">
                <div className="flex gap-2 border-b p-2">
                    <p>Email : </p>
                    <p className="text-black">
                        {email ? email : "No Email Provided"}
                    </p>
                </div>
                <div className="flex gap-2 border-b p-2">
                    <p>Address : </p>
                    <p className="text-black">
                        {address ? address : "No Address Provided"}
                    </p>
                </div>
                <div className="flex gap-2 border-b p-2">
                    <p>Contact Number : </p>
                    <p className="text-black">
                        {contact_number
                            ? contact_number
                            : "No Contact Number Provided"}
                    </p>
                </div>
            </div>

            <div className="flex w-full items-center justify-center gap-4  rounded-xl border bg-white px-2 py-1 shadow-md">
                <button
                    onClick={() => {
                        setUpdateModel(true);
                        setUpdateModerator({
                            id,
                            name,
                            email,
                            address,
                            contact_number,
                            username,
                        });
                    }}
                    className="rounded-md bg-orange-500 px-2  py-1 text-white"
                >
                    Update
                </button>
                <button
                    onClick={() => handelDeleteModerator(updateModerator?.id)}
                    className="rounded-md bg-red-500 px-2  py-1 text-white"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
