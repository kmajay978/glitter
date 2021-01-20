import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {GET_LOGGEDPROFILE_API} from "../components/Api";
export const userSlice = createSlice({ 
    name: "user", 
    initialState: { 
        user: null,
        profile: null,
        is_authanticated: !!localStorage.getItem("session_id") ? true : false
    }, 
    reducers: { 
        login: (state, action) =>{ 
            state.user = action.payload;
            state.is_authanticated = true;
        },
        logout: (state) =>{
            state.user = null;
            state.is_authanticated = false;
        },
        profile: (state, action) =>{
            state.profile = action.payload.profile;
        },
    }
});
export const { login, logout, profile } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const userProfile = (state) => state;
export const userAuth = (state) => state.user.is_authanticated;
export default userSlice.reducer;