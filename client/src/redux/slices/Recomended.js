import { createSlice } from "@reduxjs/toolkit";



const RecomendedSlice = createSlice({
    name: "recomended",
    initialState: {
        allRecomended: [],
        isLoading: false,
        isError: false,
    },
    
    extraReducers: (builder) => {
     
    },
});

export default RecomendedSlice.reducer;
