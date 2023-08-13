import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
    name:"userData",
    initialState:{
        currentUserId:0, 
        currentUserName:null, 
        currentUserFirstName:null, 
        currentUserLastName:null, 
        userLoggedIn:false},
    reducers: {
        loginUser: (state, action) => {
            state.currentUserId = action.payload.currentUserId;
            state.currentUserName = action.payload.currentUserName;
            state.currentUserFirstName = action.payload.currentUserFirstName
            state.currentUserLastName = action.payload.currentUserLastName
            state.userLoggedIn = true;
        },
        logoutUser: (state, action) => {
            state.currentUserId = 0;
            state.currentUserName =null;
            state.currentUserFirstName = null;
            state.currentUserLastName = null;
            state.userLoggedIn = false;
        },
    }

});

export const actions = userDataSlice.actions;
export default userDataSlice;