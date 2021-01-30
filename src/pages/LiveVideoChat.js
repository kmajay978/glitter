import React, { useState, useEffect } from "react";
import {  useHistory, useParams } from 'react-router';
import axios from "axios";
import Logo from '../components/Logo';
import {SOCKET} from '../components/Config';
import NavLinks from '../components/Nav';
import { joinChannel, leaveEventAudience, leaveEventHost } from "../components/VideoComponent";
import {useSelector, useDispatch} from "react-redux";
import {userProfile, liveVideoCall, liveVideoCallUser} from "../features/userSlice";

let videoCallStatus = 0, videoCallParams, interval;

const clearChatState = (dispatch) => {
    dispatch(liveVideoCall(null))
}

const LiveVideoChat = () =>{
    const params = useParams();
    const [user, setUserData] = useState(null);
    const history = useHistory();
    const dispatch = useDispatch();
    const videoCallState = !!localStorage.getItem("liveVideoProps") ? JSON.parse(localStorage.getItem("liveVideoProps")) : null; //using redux useSelector here

    const [isExpired, setIsExpired] = useState(false);

    const userData = useSelector(userProfile).user.profile; //using redux useSelector here
    console.log(userData, "userdata..")
    const componentWillUnmount = () => {
        if (videoCallStatus == 4) {
            console.log(videoCallParams, "videoCallParams... test")
            SOCKET.emit("unauthorize_live_video_call", {
                user_id: Number(videoCallParams.user_id),
                channel_name: videoCallParams.channel_name,
                type: 1,
                status: 4
            });
            videoCallStatus = 0;
        }
        localStorage.removeItem("videoCallLivePageRefresh");
        clearChatState(dispatch);
        history.push("/search-home");
    }
    useEffect(() =>{
        if (!!userData) {
            setUserData(userData)
        }
    }, [userData])
    useEffect(() => {
        if (!params.channel_name) {
            // componentWillUnmount()
        } else {
            const getPageRefresh = localStorage.getItem("videoCallLivePageRefresh");
            alert(getPageRefresh)
            videoCallParams = {
                user_id: params.user_id,
                channel_id: params.channel_id,
                channel_name: params.channel_name,
                channel_token: null
            }
            if (!getPageRefresh) {
                // dispatch(liveVideoCall(videoCallParams))
                // }
                localStorage.setItem("videoCallLivePageRefresh", "1");
            } else {
                videoCallStatus = 4
                componentWillUnmount()
            }
            // check with backend + socket if this channel exist...
            console.log(videoCallParams, "videoCallParams...")
            console.log(userData, "ffffff")
            SOCKET.emit("authenticate_live_video_call", {
                host_id: Number(videoCallParams.user_id),
                user_id: userData.user_id,
                channel_name: videoCallParams.channel_name,
                type: 1,
                is_host: Number(videoCallParams.user_id) === userData.user_id,
                // videoCallProps: Number(videoCallParams.user_id) === userData.user_id ?
            });

            SOCKET.on('unauthorize_live_video_call', (data) => {
                if (data.is_host) {

                }
                else { // audience..
                    // if (data.user_id === userData.user_id) {
                    //     SOCKET.emit("change_live_video_call_status", {
                    //         host_id: Number(videoCallParams.user_id),
                    //         user_id: userData.user_id,
                    //         channel_name: videoCallParams.channel_name,
                    //         type: 1,
                    //         is_host: Number(videoCallParams.user_id) === userData.user_id,
                    //         status: 4
                    //     });
                    //     componentWillUnmount()
                    // }
                }
            });

            SOCKET.on('authorize_live_video_call', (data) => {
                if (data.is_host) {
                    alert("here")
                    // opnen host camera
                    const option = {
                        appID: "52cacdcd9b5e4b418ac2dca58f69670c",
                        channel: videoCallState.channel_name,
                        uid: 0,
                        token: videoCallState.channel_token,
                        key: '',
                        secret: ''
                    }
                    console.log(videoCallState, "videoCallState...")
                    joinChannel('host', option)
                }
                else { // audience..
                    if (data.user_id === userData.user_id) {
                        // open audience camera...

                    }
                }
            });


            //     SOCKET.on('sender_show_video_call', (data) => {
            //         if ((data.user_from_id == videoCallParams.user_from_id && data.user_to_id == videoCallParams.user_to_id)
            //             ||
            //             (data.user_from_id == videoCallParams.user_to_id && data.user_to_id == videoCallParams.user_from_id)
            //         ) { // check one-to-one data sync
            //             if (!!userData && (data.user_from_id == userData.user_id)) {
            //                 const option = {
            //                     appID: "52cacdcd9b5e4b418ac2dca58f69670c",
            //                     channel: videoCallState.channel_name,
            //                     uid: 0,
            //                     token: videoCallState.channel_token,
            //                     key: '',
            //                     secret: ''
            //                 }
            //                 joinChannel('audience', option)
            //                 interval = window.setInterval(() => {
            //                     var list = document.getElementById("local_stream");   // Get the <ul> element with id="myList"
            //                     if (!!list) {
            //                         list.remove() // Remove <ul>'s first child node (index 0)
            //                         clearInterval(interval)
            //                     }
            //                 }, 1000)
            //             }
            //         }
            //     })
            //     SOCKET.on('authorize_video_call', (data) => {
            //         if ((data.user_from_id == videoCallParams.user_from_id && data.user_to_id == videoCallParams.user_to_id)
            //             ||
            //             (data.user_from_id == videoCallParams.user_to_id && data.user_to_id == videoCallParams.user_from_id)
            //         ) { // check one-to-one data sync
            //
            //             // change backend status === 1 if loggedIn user is "user_to"
            //
            //             if (!!userData && (data.user_to_id == userData.user_id)) {
            //                 SOCKET.emit("acknowledged_video_call", {
            //                     sender: {user_from_id: videoCallParams.user_from_id, session_id: localStorage.getItem("session_id")},
            //                     reciever_id: videoCallParams.user_to_id,
            //                     channel_name: videoCallParams.channel_name,
            //                     type: 0,
            //                     status: 1
            //                 });
            //                 // initate video call for receiver...
            //                 const option = {
            //                     appID: "52cacdcd9b5e4b418ac2dca58f69670c",
            //                     channel: data.videoCallState.channel_name,
            //                     uid: 0,
            //                     token: data.videoCallState.channel_token,
            //                     key: '',
            //                     secret: ''
            //                 }
            //                 joinChannel('audience', option);
            //                 joinChannel('host', option);
            //                 interval = window.setInterval(() => {
            //                     var list = document.getElementById("remote_video_");
            //                     if (!!list) {
            //                         list.removeChild(list.childNodes[0]);
            //                         clearInterval(interval)// Remove <ul>'s first child node (index 0)
            //                     }
            //                 }, 1000)
            //
            //                 // add timer... after 1 min to detect the expire of the link
            //
            //                 SOCKET.emit("timeCounter_video_call", {
            //                     sender: {user_from_id: videoCallParams.user_from_id, session_id: localStorage.getItem("session_id")},
            //                     reciever_id: videoCallParams.user_to_id,
            //                     channel_name: videoCallParams.channel_name,
            //                     type: 0,
            //                     status: 1
            //                 });
            //             }
            //             else {
            //                 // initate video call for sender...
            //                 const option = {
            //                     appID: "52cacdcd9b5e4b418ac2dca58f69670c",
            //                     channel: videoCallState.channel_name,
            //                     uid: 0,
            //                     token: videoCallState.channel_token,
            //                     key: '',
            //                     secret: ''
            //                 }
            //                 joinChannel('host', option)
            //             }
            //         }
            //     });
            // }, [])
            //
            // const endCall = () => {
            //     if (params.receiver == "false") {
            //         SOCKET.emit("sender_decline_video_call", {
            //             sender: {user_from_id: videoCallParams.user_from_id},
            //             reciever_id: videoCallParams.user_to_id,
            //             channel_name: videoCallParams.channel_name,
            //             type: 0,
            //             status: 2
            //         });
            //     }
            //     else {
            //         SOCKET.emit("receiver_decline_video_call", {
            //             sender: {user_from_id: videoCallParams.user_from_id},
            //             reciever_id: videoCallParams.user_to_id,
            //             channel_name: videoCallParams.channel_name,
            //             type: 0,
            //             status: 2
            //         });
            //     }
            // }
        }
    }, [])
    return(
        <section className="home-wrapper">
            <img className="bg-mask" src="/assets/images/mask-bg.png" alt="Mask" />
            <div className="header-bar">
                <div className="container-fluid p-0">
                    <div className="row no-gutters">
                        <div className="col-lg-5 p-3">
                            <div className="d-flex flex-wrap align-items-center">
                                <div className="logo-tab d-flex justify-content-between align-items-start">
                                    <a href="javascript:void(0)">
                                        <img src="/assets/images/glitters.png" alt="Glitters" />
                                    </a>
                                </div>
                                <div className="vc-head-title d-flex flex-wrap align-items-center ml-5">
                                    <div className="vc-user-name d-flex flex-wrap align-items-center">
                                        <figure>
                                            {
                                                !user &&
                                                <img src={"http://167.172.209.57/glitter-101/public/profile_images/1611574536_download.jpg"} alt="placeholder"/>
                                            }
                                            {
                                                !!user &&
                                                <img src={user.profile_images[0]} alt="Augusta Castro" />
                                            }
                                        </figure>
                                        {
                                            !!user &&
                                            <div className="name ml-2">{user.first_name} <span className="age">{user.age}</span></div>
                                        }
                                        {
                                            !user &&
                                            <div className="name ml-2"> <span className="age"> </span></div>
                                        }
                                    </div>
                                    <div className="remaining-coins ml-4">
                                        <img src="/assets/images/diamond-coin.png" alt="Coins" />
                                        <span>152</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                        </div>

                        <div className="col-lg-7 p-3">
                            <div className="tab-top d-flex flex-wrap-wrap align-items-center">
                                <div className="vc-action-tab ml-auto mr-4 position-relative">
                                    <div className="vc-action-btn">
                                        <span />
                                        <span />
                                        <span />
                                    </div>
                                    <ul className="action-menu">
                                        <li>
                                            <a href="javascript:void(0)">Report</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)">Block</a>
                                        </li>
                                        <li>
                                            {/*<a href="javascript:void(0)" onClick={endCall}>End Video</a>*/}
                                        </li>
                                    </ul>
                                </div>
                                <NavLinks />
                                {/*<a href="javascript:void(0)" className="end-video bg-grd-clr" onClick={endCall}>End Video</a>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="vc-screen-wrapper">
                <div className="vc-screen">
                    <div id="local_stream" className="local_stream" style={{ width: "400px", height: "400px" }}></div>
                    <div
                        id="remote_video_"
                        style={{ width: "400px", height: "400px" }}
                    />
                    <img src="/assets/images/video-chat-bg.jpg" alt="Video Calling"/>
                </div>
                <div className="charges-reminder-txt">
                    <p>After 25 Seconds, you will be charged 120 coins per minute</p>
                </div>
                <div className="vc-timer-box text-center">
                    <div className="timer">
                        <i className="far fa-clock"></i>
                        <span>25 Sec</span>
                    </div>
                    <div className="vc-sppiner">
                        <a className="sppiner bg-grd-clr" href="javascript:void(0)">
                            <img src="/assets/images/sppiner.png" alt="Sppiner"/>
                        </a>
                    </div>
                </div>
                <div className="vc-option-block d-flex flex-wrap align-items-end">
                    <div className="vc-options">
                        <ul>
                            <li>
                                <a className="btn-round bg-grd-clr" href="javascript:void(0)">
                                    <img src="/assets/images/magic-stick.png" alt="Magic"/>
                                </a>
                            </li>
                            <li>
                                <a className="btn-round bg-grd-clr" href="javascript:void(0)">
                                    <img src="/assets/images/chat.png" alt="Chat"/>
                                </a>
                            </li>
                            <li>
                                <a className="btn-round bg-grd-clr" href="javascript:void(0)">
                                    <img src="/assets/images/gift.png" alt="Gift"/>
                                </a>
                            </li>
                            <li>
                                <a className="btn btn-nxt bg-grd-clr" href="javascript:void(0)">Next</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>


    )
}
export default LiveVideoChat;



