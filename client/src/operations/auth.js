import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthEndPoints } from "./apis";

const {
    SIGNUP_API,
    LOGIN_API,
    FORGOT_PASSWORD_API,
    VERIFY_EMAIL_API,
    RESET_PASSWORD_API,
    UPDATE_PROFILE_API,
} = AuthEndPoints;

const signUpUser = createAsyncThunk("signUpUser", async (body) => {
    const { name, userName, email, password } = body;

    const response = await fetch(SIGNUP_API, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            username: userName,
            email,
            password,
        }),
    });
    return response.json();
});

const VerifyEmail = createAsyncThunk("VerifyEmail", async (body) => {
    const token = body;

    const response = await fetch(`${VERIFY_EMAIL_API}?token=${token}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response.json();
});

const LoginUser = createAsyncThunk("LoginUser", async (body) => {
    const { username, password } = body;
    const response = await fetch(LOGIN_API, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
        }),
    });

    return response.json();
});

const forgotPassword = createAsyncThunk("forgotPassword", async (email) => {
    const response = await fetch(FORGOT_PASSWORD_API, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
        }),
    });

    return response.json();
});

const resetPassword = createAsyncThunk("resetPassword", async (body) => {
    const { newPassword, token } = body;
    console.log("body for reset password", body);
    const response = await fetch(`${RESET_PASSWORD_API}?token=${token}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            newPassword,
        }),
    });

    return response.json();
});

const updateUserProfile = createAsyncThunk(
    "updateUserProfile",
    async (body) => {
        const { name, mobile, address } = body;
        // console.log("update profile body",body)
        const response = await fetch(UPDATE_PROFILE_API, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "getSetCookie": "",
            },
            credentials: "include",
            body: JSON.stringify({
                name,
                contactNumber: mobile,
                address,
            }),
        });

        return response.json();
    },
);

export {
    signUpUser,
    LoginUser,
    forgotPassword,
    VerifyEmail,
    resetPassword,
    updateUserProfile,
};
