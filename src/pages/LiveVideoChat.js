import React, { useState, useEffect } from "react";
import {  useHistory, useParams } from 'react-router';
import axios from "axios";
import Logo from '../components/Logo';
import {SOCKET} from '../components/Config';
import NavLinks from '../components/Nav';
import { joinChannel, leaveEventAudience, leaveEventHost } from "../components/VideoComponent";
import {useSelector, useDispatch} from "react-redux";
import {userProfile, liveVideoCall, liveVideoCallUser} from "../features/userSlice";
import {func} from "prop-types";
import {addDefaultSrc, checkLiveDomain, returnDefaultImage} from "../commonFunctions";

let videoCallStatus = 0, videoCallParams, interval, userData;

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
    const[UserMessage, setuserMessage] = useState('');

    const sessionId = localStorage.getItem('session_id');

    userData = useSelector(userProfile).user.profile; //using redux useSelector here
   
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
        localStorage.removeItem("liveVideoProps");
        clearChatState(dispatch);
        window.location.href = checkLiveDomain() ? "/glitter-web/search-home" : "/search-home";
    }
    useEffect(() =>{
        if (!!userData) {
            setUserData(userData)
        }
    }, [userData])
    useEffect(() => {
        console.log(videoCallState, "check..")
        if (!params.channel_name) {
            // componentWillUnmount()
        } else {
            const getPageRefresh = localStorage.getItem("videoCallLivePageRefresh");
            videoCallParams = {
                user_id: params.user_id,
                channel_id: params.channel_id,
                channel_name: params.channel_name,
                channel_token: null
            }
            if (!getPageRefresh) {
                // dispatch(liveVideoCall(videoCallParams))
                // }
                // localStorage.setItem("videoCallLivePageRefresh", "1");
            } else {
                videoCallStatus = 4
                componentWillUnmount()
            }
            // check with backend + socket if this channel exist...
            SOCKET.connect()
            SOCKET.emit("authenticate_live_video_call", {
                host_id: Number(videoCallParams.user_id),
                user_id: videoCallState.user_id,
                channel_name: videoCallParams.channel_name,
                type: 1,
                is_host: Number(videoCallParams.user_id) === videoCallState.user_id,
                // videoCallProps: Number(videoCallParams.user_id) === userData.user_id ?
            });

            SOCKET.on('end_live_video_call_host', (data) => {
                if (data.channel_name == videoCallParams.channel_name) {
                    // alert("channel is closing....")
                    componentWillUnmount();
                }
            })

            SOCKET.on('end_live_video_call_audience', (data) => {
                if (data.user_id === videoCallState.user_id) {
                    if (Number(videoCallParams.user_id) === data.user_id) {
                        // alert("host")

                    }
                    else { // audience..
                        // alert("decline audience with id:"+ data.user_id);
                        componentWillUnmount();
                    }
                }
            })

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
                if (data.user_id === videoCallState.user_id) {
                if (Number(videoCallParams.user_id) === data.user_id) {
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
                    // open audience camera...
                    const option = {
                        appID: "52cacdcd9b5e4b418ac2dca58f69670c",
                        channel: videoCallState.channel_name,
                        uid: 0,
                        token: videoCallState.channel_token,
                        key: '',
                        secret: ''
                    }
                    console.log(option, "jkjk...")
                    joinChannel('audience', option)
                }
                }
            });
        }
        const modal = document.getElementsByClassName("modal-backdrop")[0]
        if (!!modal) {
            modal.remove()
        }
        const remoteVideo = document.getElementById("remote_video_");
        if (!!remoteVideo) {
            remoteVideo.remove()
        }

        SOCKET.on('message_data_live_video', (messages) => {
            let messagesList = messageList;
            if (!!messages) {

                if ((messages.obj.user_from_id === userData.user_id && messages.obj.user_to_id === receiver_id)
                    ||
                    (messages.obj.user_from_id === receiver_id && messages.obj.user_to_id === userData.user_id)
                ) { // check one-to-one data sync

                    if (!!messages.obj.warningMessage) {
                    
                        setWarningMessage(messages.obj.warningMessage);
                        //alert(messages.obj.warningMessage)
                    }
                    else {
                        setWarningMessage('');
                    messagesList.push(messages.obj);
                    messageList = messagesList;
                    console.log(messagesList, "messageList...")
                    setMessages(messagesList);
                    setRandomNumber(Math.random());
                    scrollToBottom()
                    }
                }
            }
        });
    }, [])

    const endCall = () => {
        if (Number(videoCallParams.user_id) === videoCallState.user_id) { // host
            SOCKET.emit("end_live_video_call_host", {
                host_id: Number(videoCallParams.user_id),
                user_id: videoCallState.user_id,
                channel_name: videoCallParams.channel_name,
                type: 1,
                is_host: true
            })
        }
        else { // audience
            SOCKET.emit("end_live_video_call_audience", {
                host_id: Number(videoCallParams.user_id),
                user_id: videoCallState.user_id,
                channel_name: videoCallParams.channel_name,
                type: 1,
                is_host: false
            })
        }
    }

    const CheckTextInputIsEmptyOrNot = (e) =>  {
        e.preventDefault()
        if ( UserMessage != '') {
            var message = { "user_id": videoCallState.user_id, "message": UserMessage, "channel": videoCallParams.channel_name }
            SOCKET.emit("send_message_live_video", message);
            setuserMessage(''); //Empty user input here
        } else {
            console.log("Please enter message")
        }
    }

    const changeInput = (e) => {
        setuserMessage(e.target.value)
        SOCKET.emit("typing_live_video", {
            user_id: videoCallState.user_id,
            typing_user: userData.first_name + " " + userData.last_name
        })
    }

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
                                                <img onError={(e) => addDefaultSrc(e)} src={!!user ? user.profile_images[0] : returnDefaultImage()} alt="Augusta Castro" />
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
                                <a href="javascript:void(0)" className="end-video bg-grd-clr" onClick={endCall}>End Video</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="vc-screen-wrapper image-auto">
                <div className="vc-screen d-flex h-100">
                    <div className="col-md-9 p-0">
                    <div id="local_stream" className="local_stream" style={{ width: "400px", height: "400px" }}></div>
                    <div
                        id="remote_video_"
                        className="video_live"
                        style={{ width: "400px", height: "400px" }}
                    />
                    {/* <img src="/assets/images/video-chat-bg.jpg" alt="Video Calling"/> */}
                
                
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
                <div class="col-md-3 live__comments_bg p-4">
            <div class="live__comments">
                <form onSubmit={CheckTextInputIsEmptyOrNot}>
                    <div class="live__comments__items">
                        <span class="comment_username">Andrew :</span> followed this host 
                    </div>
                </form>
            </div>   
            
            <div class="write-comments">
            <div class="write-comments__fields position-relative">
                <input type="text" name="comments" id="Message" placeholder="Message..." value={UserMessage} onChange={e => changeInput(e)}/>
                <button type="submit" class="send-message-button bg-grd-clr"><i class="fas fa-paper-plane"></i></button>   
            
            </div>
            </div>
            </div>
            </div>
            </div>
        </section>
    )
}
export default LiveVideoChat;
