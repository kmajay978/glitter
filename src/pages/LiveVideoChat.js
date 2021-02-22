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
import { GIFT_LIST_API, GIFT_PURCHASE_API } from "../components/Api";
import useToggle from "../components/CommonFunction";
import { Number } from "core-js";

let videoCallStatus = 0, videoCallParams, interval, userData;

const clearChatState = (dispatch) => {
    dispatch(liveVideoCall(null))
}

const LiveVideoChat = () =>{
    const params = useParams();
    const [user, setUserData] = useState(null);
    const [GiftData,setGiftData] = useState([]);
    const [isOn, toggleIsOn] = useToggle();
    const [givenGift, setGivenGift] = useState();
    

   
    const history = useHistory();
    const dispatch = useDispatch();
    const videoCallState = !!localStorage.getItem("liveVideoProps") ? JSON.parse(localStorage.getItem("liveVideoProps")) : null; //using redux useSelector here

    const [isExpired, setIsExpired] = useState(false);

    userData = useSelector(userProfile).user.profile; //using redux useSelector here
    const sessionId = localStorage.getItem('session_id');
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
        const modal = document.getElementsByClassName("modal-backdrop")[0]
        if (!!modal) {
            modal.remove()
        }
        if (Number(videoCallParams.user_id) == videoCallState.user_id) {
            // sender
            const remoteVideo = document.getElementById("remote_video_");
            if (!!remoteVideo) {
                remoteVideo.remove()
            }
        }
        else {
            // receiver
            const local_stream = document.getElementById("local_stream");
            if (!!local_stream) {
                local_stream.remove()
            }
        }
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

      //all gift
      const handleGift = async() =>{
        toggleIsOn(true);
        
        const bodyParameters = {
            session_id :  localStorage.getItem('session_id'),
            }
            const {data:{result , status}} = await axios.post(GIFT_LIST_API , bodyParameters)
            
             if(status==200){
             setGiftData(result);
             }
             }

             //get single  gift item
           const getGiftItem = async(giftId) => {
            const bodyParameters ={
            session_id:sessionId,
            gift_id : giftId ,
            given_to : Number(videoCallParams.user_id)
            }
             const {data : {giftStatus}} = await axios.post(GIFT_PURCHASE_API , bodyParameters)
                 // alert(giftStatus.get_gifts.image);
 
                 if(!!giftStatus)
                 {
                 toggleIsOn(false);
                 var msg = {};
                 msg.file = giftStatus.get_gifts.image;
                 msg.fileName = "abc_image";
                 msg.sessionId = sessionId;
                 msg.reciever_id = Number(videoCallParams.user_id);
                 SOCKET.emit('gift_send', msg);
                 setGivenGift('');
                //  setLoading(true);
                 }
                 else
                 {
                     toggleIsOn(false);
                     
                 }
              }

              useEffect(() => {
                  //   Listing gift here
              SOCKET.on('gift_send',(messages) =>{
                console.log(messages,"message_gift....");
                setGivenGift(messages.obj.media)
            });
              }, [])
           
    if(!!givenGift)
    {
        console.log(givenGift,"givenGif....");
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
                                        <span>{!!userData&& userData.coins!=0 ?  userData.coins :  "0" }</span>
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
            <div className="vc-screen-wrapper">
                <div className="vc-screen">
                    <div id="local_stream" className="local_stream" style={{ width: "400px", height: "400px" }}></div>
                    <div
                        id="remote_video_"
                        className="video_live"
                        style={{ width: "400px", height: "400px" }}
                    />
                    {/* <img src="/assets/images/video-chat-bg.jpg" alt="Video Calling"/> */}
                </div>

                <div className="gifter">
                    <img src="/assets/images/vc-self.png" alt="gifter" />
                    <div className="gifter__info">
                         <h6>Steve Barnet</h6>                
                          <span>Sent a gift</span>  
                    </div>
                    <div className="gifter__media">
                    <img src="/assets/images/heart-balloons.png" alt="gift" />
                        </div>                    
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
                                <a className="btn-round bg-grd-clr" href="javascript:void(0)"  onClick={handleGift}>
                                    <img src="/assets/images/gift.png" alt="Gift"/>
                                </a>
                            </li>
                            <li>
                                <a className="btn btn-nxt bg-grd-clr" href="javascript:void(0)">Next</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={isOn ? 'video-streaming-gift all-gifts-wrapper active': 'all-gifts-wrapper video-streaming-gift'} >
                            <div className="all-gift-inner">
                                <a href="javascript:void(0)" className="close-gift-btn modal-close" onClick={toggleIsOn}><img src="/assets/images/btn_close.png" /></a>
                                <div className="all-gift-header d-flex flex-wrap align-items-center mb-3">
                                    <h5 className="mb-0 mr-4">Send Gift</h5>
                                    <div className="remaining-coins">
                                        <img src="/assets/images/diamond-coin.png" alt="Coins" />
                                        <span>{!!userData&& userData.coins!=0 ?  userData.coins :  "0" }</span>
                                    </div>
                                </div>
                                <div className="all-gift-body">

                                    <ul className="d-flex flex-wrap text-center gift__items">
                                        {GiftData.map((items , i) => {
                                            return <li onClick={() => getGiftItem(items.id)}>
                                                <a href="javascript:void(0)" >
                                                    <div>
                                                        <figure>
                                                            <img onError={(e) => addDefaultSrc(e)} src={!!items.image ? items.image : returnDefaultImage()} alt={items.name} />
                                                        </figure>
                                                        <div className="gift-price">
                                                            <img src="/assets/images/diamond-coin.png" alt="Coins" />
                                                            <span>{items.coins}</span>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                        })}
                                        <li>
                                        </li>
                                        <li>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

            </div>
        </section>
    )
}
export default LiveVideoChat;



