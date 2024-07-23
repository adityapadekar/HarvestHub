import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addModeratorAdmin } from "../operations/admin";
export default function AddModerator() {
    const dispatch = useDispatch();

    const [moderatorState, setModeratorState] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
    });

    const handelModeratorChange = (e) => {
        const { name, value } = e.target;
        setModeratorState({
            ...moderatorState,
            [name]: value,
        });
    };

    const handelAddModerator = async (e) => {
        e.preventDefault();
        const data = await dispatch(addModeratorAdmin(moderatorState));
    };
    return (
        <div className="flex items-center justify-center  ">
            <form
                onSubmit={handelAddModerator}
                className="m-10 flex w-full flex-col items-center justify-center gap-3 rounded-sm border bg-slate-100 pb-2  sm:w-2/3"
            >
                <h1 className="w-full border bg-green-700 py-2 text-center text-2xl font-semibold">
                    Add Moderator
                </h1>

                <div className="flex flex-col gap-2 p-2 sm:w-1/2 sm:text-center ">
                    <label htmlFor="product name">Moderator Name</label>
                    <input
                        type="text"
                        name="name"
                        value={moderatorState?.name}
                        className="rounded-md border px-2 py-1 text-gray-400 outline-none sm:text-center"
                        placeholder="Enter Moderator Name"
                        onChange={handelModeratorChange}
                        required
                    />
                </div>

                <div className="flex flex-col gap-2 p-2 sm:w-1/2 sm:text-center ">
                    <label htmlFor="product name">Moderator UserName</label>
                    <input
                        type="text"
                        name="username"
                        value={moderatorState?.username}
                        className="rounded-md border px-2 py-1 text-gray-400 outline-none sm:text-center"
                        placeholder="Enter Moderator UserName"
                        onChange={handelModeratorChange}
                        required
                    />
                </div>

                <div className="flex flex-col gap-2 p-2 sm:w-1/2 sm:text-center ">
                    <label htmlFor="product name">Moderator Email</label>
                    <input
                        type="email"
                        name="email"
                        value={moderatorState?.email}
                        className="rounded-md border px-2 py-1 text-gray-400 outline-none sm:text-center"
                        placeholder="Enter Moderator Email"
                        onChange={handelModeratorChange}
                        required
                    />
                </div>

                <div className="flex flex-col gap-2 p-2 sm:w-1/2 sm:text-center ">
                    <label htmlFor="product name">Moderator Password</label>
                    <input
                        type="password"
                        name="password"
                        value={moderatorState?.password}
                        className="rounded-md border px-2 py-1 text-gray-400 outline-none sm:text-center"
                        placeholder="Enter Password"
                        onChange={handelModeratorChange}
                        required
                    />
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
