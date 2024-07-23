import { createSlice } from "@reduxjs/toolkit";
import {
    getAllModerators,
    deleteModerator,
    updateModerator,
} from "../../operations/moderator";

import { toast } from "react-toastify";

const moderatorSlice = createSlice({
    name: "moderator",
    initialState: {
        allModerators: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllModerators.fulfilled, (state, action) => {
            if (action.payload.success) {
                console.log("data", action.payload.result);
                toast.success("Moderators Fetched Successfully");
                state.allModerators = action?.payload?.result;
              
            } else toast.error(action.payload.message);
        });

        builder.addCase(deleteModerator.fulfilled, (state, action) => {});

        builder.addCase(updateModerator.fulfilled, (state, action) => {});
    },
});

export default moderatorSlice.reducer;
