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
export const VIDEOCALL_API=getApiUrl("make_call");
export const CALL_ACTION_API=getApiUrl("call_action");
export const CHECK_CALLSTATUS_API=getApiUrl("fetch_action");
export const LIKE_USER=getApiUrl("like_user");
export const LIKED_LIST=getApiUrl("liked_list");
export const ACCEPT_REQUEST_API=getApiUrl("accept_friend_like");
export const FRIENDLIST_API=getApiUrl("friendList");
export const BLOCK_USER_API=getApiUrl("block_user");
export const BLOCK_USERLIST_API=getApiUrl("blocked_users");
export const TOKEN_AGORA_API=getApiUrl("generateToken");
export const TOKEN_AGORA_FORLIVE_API=getApiUrl("liveUserToken");
export const ENDLIVE_API=getApiUrl("disconnectLive");
export const GET_LIVE_USER_TOKEN_API=getApiUrl("getLiveUserToken");
export const VISITOR_API=getApiUrl("view");
export const VISITOR_LIST_API=getApiUrl("getVisitorList");
export const FILTER_LIST_API=getApiUrl("filter_user");



