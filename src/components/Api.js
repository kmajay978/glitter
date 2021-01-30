import React, {Component} from 'react';


export const API_BASE_URL="http://167.172.209.57/glitter-101/api/";
export const getApiUrl=(endpoint)=>API_BASE_URL+endpoint;
export const LOGIN_API=getApiUrl("/api/login");
export const SIGNUP_API=getApiUrl("register");
export const SENDOTP_API=getApiUrl("send_otp");
export const VERIFY_API=getApiUrl("verify_otp");
export const LOGOUT_API=getApiUrl("logout");
export const GETALLUSER_API=getApiUrl("get_initial_users");
export const GET_USERPROFILE_API=getApiUrl("user_profile");
export const EDITPROFILE_API=getApiUrl("edit_profile");
export const LIKE_USER=getApiUrl("like_user");
export const LIKED_LIST=getApiUrl("liked_list");
export const FRIENDLIST_API=getApiUrl("friendList");
export const BLOCK_USERLIST_API=getApiUrl("blocked_users");
export const VISITOR_LIST_API=getApiUrl("getVisitorList");
export const FILTER_LIST_API=getApiUrl("filter_user");
export const GET_LOGGEDPROFILE_API=getApiUrl("logged_profile");
export const DISLIKE_USER=getApiUrl("dislike_user");
export const VIDEOCALL_API=getApiUrl("makGET_ALL_STATUSe_call");
export const BLOCK_USER_API=getApiUrl("block_user");
export const REPORT_USER_API = getApiUrl("report_user");
export const GIFT_LIST_API = getApiUrl("all_gifts");
export const GET_GIFT_API = getApiUrl("single_gift");
export const GET_ALL_CALL = getApiUrl("all_calls");
export const GET_SINGLE_STATUS = getApiUrl("all_status"); 
export const GET_STATUS = getApiUrl("limit_status");  
export const INTEREST_HOBBIES_LIST = getApiUrl("interests_hobbies"); 
export const VIDEO_CALL_START = getApiUrl("video_call");
export const GET_STRIPE_PACKAGE = getApiUrl("packages_list");
export const ACTIVATE_STRIPE_PACKAGE = getApiUrl("activate_package");
export const GET_ALL_COIN_PACKAGE = getApiUrl("all_coin_packages");
export const GET_COIN_PACKAGE = getApiUrl("purchaseCoins");

 
// Not done yet
export const CALL_ACTION_API=getApiUrl("call_action");
export const CHECK_CALLSTATUS_API=getApiUrl("fetch_action");
export const ACCEPT_REQUEST_API=getApiUrl("accept_friend_like");
export const TOKEN_AGORA_API=getApiUrl("generateToken");
export const TOKEN_AGORA_FORLIVE_API=getApiUrl("liveUserToken");
export const ENDLIVE_API=getApiUrl("disconnectLive");
export const GET_LIVE_USER_TOKEN_API=getApiUrl("getLiveUserToken");
export const VISITOR_API=getApiUrl("view");
export const ADD_STATUS_API=getApiUrl("add_status");


