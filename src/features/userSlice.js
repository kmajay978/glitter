import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {GET_LOGGEDPROFILE_API} from "../components/Api";

const videoInitState = {
    user_from_id: null,
    user_to_id: null,
    channel_id: null,
    channel_name: null,
    channel_token: null
};

export const userSlice = createSlice({ 
    name: "user", 
    initialState: { 
        user: null,
        profile: null,
        filterData: [],
        is_authanticated: !!localStorage.getItem("session_id") ? true : false,
        video: videoInitState
    }, 
    reducers: { 
        login: (state, action) =>{ 
            console.log(state, "ggg")
            state.user = action.payload;
            state.is_authanticated = true;
        },
        logout: (state) =>{
            state.user = null;
            state.is_authanticated = false;
        },
        profile: (state, action) =>{ 
            console.log(state, "state,,,,")
            state.profile = action.payload.profile; 
        },
        filterData: (state , action) => {
            state.filterData = action.payload.filterData;
        },
        videoCall: (state , action) => {
            state.video = !!action.payload ? {...action.payload, ...state.video} : videoInitState;
        }
    }
});
export const { login, logout, profile , filterData, videoCall} = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const userProfile = (state) => state;
export const userAuth = (state) => state.user.is_authanticated;
export const filterDataUser = (state) => state.user.filterData;
export const videoCallUser = (state) => state.user.video;
export default userSlice.reducer;