"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ADD_STATUS_API = exports.VISITOR_API = exports.GET_LIVE_USER_TOKEN_API = exports.ENDLIVE_API = exports.TOKEN_AGORA_FORLIVE_API = exports.TOKEN_AGORA_API = exports.ACCEPT_REQUEST_API = exports.CHECK_CALLSTATUS_API = exports.CALL_ACTION_API = exports.VIEW_LIKE_STATUS = exports.RECEIVED_GIFT_LIST = exports.COIN_HISTORY = exports.ACTIVATE_COIN_PACKAGE = exports.GET_ALL_COIN_PACKAGE = exports.ACTIVATE_STRIPE_PACKAGE = exports.GET_STRIPE_PACKAGE = exports.VIDEO_CALL_START = exports.INTEREST_HOBBIES_LIST = exports.GET_STATUS = exports.ADD_STATUS = exports.GET_SINGLE_STATUS = exports.GET_ALL_CALL = exports.GIFT_PURCHASE_API = exports.GET_GIFT_API = exports.GIFT_LIST_API = exports.REPORT_USER_API = exports.BLOCK_USER_API = exports.VIDEOCALL_API = exports.DISLIKE_USER = exports.GET_LOGGEDPROFILE_API = exports.FILTER_LIST_API = exports.VISITOR_LIST_API = exports.BLOCK_USERLIST_API = exports.FRIENDLIST_API = exports.LIKED_LIST = exports.LIKE_USER = exports.EDITPROFILE_API = exports.GET_USERPROFILE_API = exports.GETALLUSER_API = exports.LOGOUT_API = exports.VERIFY_API = exports.SENDOTP_API = exports.SIGNUP_API = exports.LOGIN_API = exports.getApiUrl = exports.API_BASE_URL = void 0;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var API_BASE_URL = "http://167.172.209.57/glitter-101/api/";
exports.API_BASE_URL = API_BASE_URL;

var getApiUrl = function getApiUrl(endpoint) {
  return API_BASE_URL + endpoint;
};

exports.getApiUrl = getApiUrl;
var LOGIN_API = getApiUrl("/api/login");
exports.LOGIN_API = LOGIN_API;
var SIGNUP_API = getApiUrl("register");
exports.SIGNUP_API = SIGNUP_API;
var SENDOTP_API = getApiUrl("send_otp");
exports.SENDOTP_API = SENDOTP_API;
var VERIFY_API = getApiUrl("verify_otp");
exports.VERIFY_API = VERIFY_API;
var LOGOUT_API = getApiUrl("logout");
exports.LOGOUT_API = LOGOUT_API;
var GETALLUSER_API = getApiUrl("get_initial_users");
exports.GETALLUSER_API = GETALLUSER_API;
var GET_USERPROFILE_API = getApiUrl("user_profile");
exports.GET_USERPROFILE_API = GET_USERPROFILE_API;
var EDITPROFILE_API = getApiUrl("edit_profile");
exports.EDITPROFILE_API = EDITPROFILE_API;
var LIKE_USER = getApiUrl("like_user");
exports.LIKE_USER = LIKE_USER;
var LIKED_LIST = getApiUrl("liked_list");
exports.LIKED_LIST = LIKED_LIST;
var FRIENDLIST_API = getApiUrl("friendList");
exports.FRIENDLIST_API = FRIENDLIST_API;
var BLOCK_USERLIST_API = getApiUrl("blocked_users");
exports.BLOCK_USERLIST_API = BLOCK_USERLIST_API;
var VISITOR_LIST_API = getApiUrl("getVisitorList");
exports.VISITOR_LIST_API = VISITOR_LIST_API;
var FILTER_LIST_API = getApiUrl("filter_user");
exports.FILTER_LIST_API = FILTER_LIST_API;
var GET_LOGGEDPROFILE_API = getApiUrl("logged_profile");
exports.GET_LOGGEDPROFILE_API = GET_LOGGEDPROFILE_API;
var DISLIKE_USER = getApiUrl("dislike_user");
exports.DISLIKE_USER = DISLIKE_USER;
var VIDEOCALL_API = getApiUrl("makGET_ALL_STATUSe_call");
exports.VIDEOCALL_API = VIDEOCALL_API;
var BLOCK_USER_API = getApiUrl("block_user");
exports.BLOCK_USER_API = BLOCK_USER_API;
var REPORT_USER_API = getApiUrl("report_user");
exports.REPORT_USER_API = REPORT_USER_API;
var GIFT_LIST_API = getApiUrl("all_gifts");
exports.GIFT_LIST_API = GIFT_LIST_API;
var GET_GIFT_API = getApiUrl("single_gift");
exports.GET_GIFT_API = GET_GIFT_API;
var GIFT_PURCHASE_API = getApiUrl("purchaseGifts");
exports.GIFT_PURCHASE_API = GIFT_PURCHASE_API;
var GET_ALL_CALL = getApiUrl("all_calls");
exports.GET_ALL_CALL = GET_ALL_CALL;
var GET_SINGLE_STATUS = getApiUrl("all_status");
exports.GET_SINGLE_STATUS = GET_SINGLE_STATUS;
var ADD_STATUS = getApiUrl("add_status");
exports.ADD_STATUS = ADD_STATUS;
var GET_STATUS = getApiUrl("limit_status");
exports.GET_STATUS = GET_STATUS;
var INTEREST_HOBBIES_LIST = getApiUrl("interests_hobbies");
exports.INTEREST_HOBBIES_LIST = INTEREST_HOBBIES_LIST;
var VIDEO_CALL_START = getApiUrl("video_call");
exports.VIDEO_CALL_START = VIDEO_CALL_START;
var GET_STRIPE_PACKAGE = getApiUrl("packages_list");
exports.GET_STRIPE_PACKAGE = GET_STRIPE_PACKAGE;
var ACTIVATE_STRIPE_PACKAGE = getApiUrl("activate_package");
exports.ACTIVATE_STRIPE_PACKAGE = ACTIVATE_STRIPE_PACKAGE;
var GET_ALL_COIN_PACKAGE = getApiUrl("all_coin_packages");
exports.GET_ALL_COIN_PACKAGE = GET_ALL_COIN_PACKAGE;
var ACTIVATE_COIN_PACKAGE = getApiUrl("purchaseCoins");
exports.ACTIVATE_COIN_PACKAGE = ACTIVATE_COIN_PACKAGE;
var COIN_HISTORY = getApiUrl("coinsCommonHistory");
exports.COIN_HISTORY = COIN_HISTORY;
var RECEIVED_GIFT_LIST = getApiUrl("received-gifts");
exports.RECEIVED_GIFT_LIST = RECEIVED_GIFT_LIST;
var VIEW_LIKE_STATUS = getApiUrl("view_like_statuses"); // Not done yet

exports.VIEW_LIKE_STATUS = VIEW_LIKE_STATUS;
var CALL_ACTION_API = getApiUrl("call_action");
exports.CALL_ACTION_API = CALL_ACTION_API;
var CHECK_CALLSTATUS_API = getApiUrl("fetch_action");
exports.CHECK_CALLSTATUS_API = CHECK_CALLSTATUS_API;
var ACCEPT_REQUEST_API = getApiUrl("accept_friend_like");
exports.ACCEPT_REQUEST_API = ACCEPT_REQUEST_API;
var TOKEN_AGORA_API = getApiUrl("generateToken");
exports.TOKEN_AGORA_API = TOKEN_AGORA_API;
var TOKEN_AGORA_FORLIVE_API = getApiUrl("liveUserToken");
exports.TOKEN_AGORA_FORLIVE_API = TOKEN_AGORA_FORLIVE_API;
var ENDLIVE_API = getApiUrl("disconnectLive");
exports.ENDLIVE_API = ENDLIVE_API;
var GET_LIVE_USER_TOKEN_API = getApiUrl("getLiveUserToken");
exports.GET_LIVE_USER_TOKEN_API = GET_LIVE_USER_TOKEN_API;
var VISITOR_API = getApiUrl("view");
exports.VISITOR_API = VISITOR_API;
var ADD_STATUS_API = getApiUrl("add_status");
exports.ADD_STATUS_API = ADD_STATUS_API;