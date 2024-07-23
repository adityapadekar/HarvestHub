import { createAsyncThunk } from "@reduxjs/toolkit";

import { ModeratorEndPoints } from "./apis";
import { AdminEndPoints } from "./apis";

const { GET_ALL_MODERATORS } = ModeratorEndPoints;

const { DELETE_MODERATOR_ADMIN, UPDATE_MODERATOR_ADMIN } = AdminEndPoints;

const id = Number(JSON.parse(localStorage.getItem('user')).id);
// console.log("Mod id" , id);

const token = JSON.parse(localStorage.getItem("token"));

const getAllModerators = createAsyncThunk(
    "getAllModerators",
    async (payload) => {
        
        const response = await fetch(GET_ALL_MODERATORS, {
            method: "GET",
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
        return response.json();
    },
);

const deleteModerator = createAsyncThunk("deleteModerator", async (payload) => {
    const id = payload;
    // console.log("id", id);
    const response = await fetch(`${DELETE_MODERATOR_ADMIN}/${id}`, {
        method: "DELETE",
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
    return response.json();
});

const updateModerator = createAsyncThunk("updateModerator", async (payload) => {
   
    const { operation, searchValue } = payload;
    console.log("update mod",payload);

    // const moderatorId = payload.updateModeratorData?.id;
    const operation_id= (operation.value);
    const marketId = Number(searchValue.value);

    const response = await fetch(`${UPDATE_MODERATOR_ADMIN}`, {
        method: "PATCH",
        headers: {
            authorization: `Bearer ${token}`,
        },
       
        body: JSON.stringify({
            moderatorId:id,
            marketId,
            operation:operation_id,
        }),
    });
    return response.json();
});

// get moderator data by id
const getModeratorData = createAsyncThunk(
    "getModeratorData",
    async (payload) => {
        const id = payload;
        console.log("id", id);
        // const response = await fetch(`${UPDATE_MODERATOR_ADMIN}/${id}`, {
        //     method: "PUT",
        //     headers: {
        //         authorization: `Bearer ${token}`,
        //     },
        //     body:JSON.stringify({

        //     })
        // });
        // return response.json();
    },
);

export { getAllModerators, deleteModerator, updateModerator, getModeratorData };
