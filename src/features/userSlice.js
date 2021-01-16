
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {GET_LOGGEDPROFILE_API} from "../components/Api";

export const userSlice = createSlice({ 
    name: "user", 
    initialState: { 
        user: null,
        profile: null
    }, 
    reducers: { 
        login: (state, action) =>{ 
            state.user = action.payload; 
        },
        logout: (state) =>{
            state.user = null;
        },
        profile: (state, action) =>{
            console.log(action, "action....")
            state.profile = action.payload.profile;
        },

    }
});

export const { login, logout, profile } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const userProfile = (state) => state;

export default userSlice.reducer;

