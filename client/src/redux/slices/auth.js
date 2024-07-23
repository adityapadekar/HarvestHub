import { createSlice } from "@reduxjs/toolkit";
import {
    signUpUser,
    LoginUser,
    forgotPassword,
    VerifyEmail,
    resetPassword,
    updateUserProfile,
} from "../../operations/auth";
import { toast } from "react-toastify";

const authSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {},
    extraReducers: (builder) => {
        // signup user

        builder.addCase(signUpUser.fulfilled, (state, action) => {
            if (action.payload.status) toast.success("Signup Sucessfully");
            else toast.error("Signup Uncessfull");
        });

        builder.addCase(signUpUser.rejected, (state, action) => {
            toast.error(action.payload.message);
        });

        builder.addCase(LoginUser.fulfilled, (state, action) => {
            console.log("payload",action.payload);
            if (action.payload.success) {
                localStorage.setItem(
                    "user",
                    JSON.stringify(action.payload.result.user),
                );
            } else toast.error(action.payload.message);
        });

        builder.addCase(LoginUser.rejected, (state, action) => {
            toast.error("rejected");
        });

        // verify email
        builder.addCase(VerifyEmail.fulfilled, (state, action) => {
            if (action.payload.status) toast.success(action.payload.message);
            else toast.error(action.payload.message);
        });

        //forgot password

        builder.addCase(forgotPassword.fulfilled, (state, action) => {
            if (action.payload.status) toast.success(action.payload.message);
            else toast.error(action.payload.message);
        });

        builder.addCase(forgotPassword.rejected, () => {
            toast.error("rejected");
        });

        // reset password

        builder.addCase(resetPassword.fulfilled, (state, action) => {
            if (action.payload.status) toast.success(action.payload.message);
            else toast.error(action.payload.message);
        });

        // update user profile
        builder.addCase(updateUserProfile.fulfilled, (state, sction) => {
            console.log("updated");
        });
    },
});

export default authSlice.reducer;

export const { setUser } = authSlice.actions;
