import React, { useState, useEffect } from "react";
import $ from "jquery";
import { useHistory, useParams } from 'react-router';
import axios from "axios";
import Logo from '../components/Logo';
import { SOCKET } from '../components/Config';
import NavLinks from '../components/Nav';
import { joinChannel, leaveEventAudience, leaveEventHost } from "../components/VideoComponent";
import { useSelector, useDispatch } from "react-redux";
import { css } from "@emotion/core";
import BarLoader from "react-spinners/BarLoader";
import { userProfile, liveVideoCall, liveVideoCallUser } from "../features/userSlice";
import { func } from "prop-types";
import { addDefaultSrc, checkLiveDomain, returnDefaultImage } from "../commonFunctions";
import { GIFT_LIST_API, GIFT_PURCHASE_API } from "../components/Api";
import useToggle from "../components/CommonFunction";
import {changeImageLinkDomain, changeGiftLinkDomain} from "../commonFunctions"
import { Number } from "core-js";

let videoCallStatus = 0, videoCallParams, interval, userData, 
messageList = [], receiver_id, removeGiftInterval, allGifts = [],

manageCoinsTimeViewsInterval, manageCoinsTimeViewsCounter = 0, manageTimeInterval, 
manageViewsInterval

const override = css`
  display: block;
  margin: 10px auto;
  border-radius: 50px !important;
  width: 95%;
`;

const clearChatState = (dispatch) => {
    dispatch(liveVideoCall(null))
}

const LiveVideoChat = () => {
    const params = useParams();
    const [user, setUserData] = useState(null);
    const [GiftData, setGiftData] = useState([]);
    const [isOn, toggleIsOn] = useToggle();
    const [givenGift, setGivenGift] = useState();
    const [CompleteMessageList, setMessages] = useState([]);
    const [randomNumber, setRandomNumber] = useState('');
    const [randomNumberGift, setRandomNumberGift] = useState('');
    const [reRenderGifts, setReRenderGifts] = useState('');
    let [loading, setLoading] = useState(false);



    const history = useHistory();
    const dispatch = useDispatch();
    const videoCallState = !!localStorage.getItem("liveVideoProps") ? JSON.parse(localStorage.getItem("liveVideoProps")) : null; //using redux useSelector here

    const [isExpired, setIsExpired] = useState(false);
    const [UserMessage, setuserMessage] = useState('');

    const sessionId = localStorage.getItem('session_id');
    const [chatTyping, setChatTyping] = useState("");
    const [friendGift, setFriendGift] = useState([]);

    const [totalCoinsLeft, setTotalCoinsLeft] = useState(null);
    const [totalViews, setTotalViews] = useState(null);
    const [totalTimeLeft, setTotalTimeLeft] = useState(null);


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
        clearInterval(removeGiftInterval);
        clearInterval(manageCoinsTimeViewsInterval);
        clearInterval(manageTimeInterval);
        clearInterval(manageViewsInterval);
        window.location.href = checkLiveDomain() ? "/glitter-web/search-home" : "/search-home";
    }
    useEffect(() => {
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
            setLoading(true);
            SOCKET.emit("authenticate_live_video_call", {
                host_id: Number(videoCallParams.user_id),
                user_id: videoCallState.user_id,
                channel_name: videoCallParams.channel_name,
                type: 1,
                is_host: Number(videoCallParams.user_id) === videoCallState.user_id,
                // videoCallProps: Number(videoCallParams.user_id) === userData.user_id ?
            });
            console.log({
                sender_id: videoCallParams.user_id,
                user_id: videoCallState.user_id,
                channel_name: videoCallParams.channel_name
            }, "test...")
            SOCKET.emit("authenticate_live_video_message", {
                sender_id: Number(videoCallParams.user_id),
                user_id: Number(videoCallState.user_id),
                channel_name: videoCallParams.channel_name
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

            SOCKET.on('live_video_manage_coins_time_views', (data) => {
                if (data.channel_name === videoCallState.channel_name && videoCallState.user_id == data.user_id) {
                   if (data.msg === "") {
                        setTotalCoinsLeft(data.coins);
                   }
                   else {
                       alert(data.msg)
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

            const liveVideoManageCoinsTimeViews = () => {
                SOCKET.emit("live_video_manage_coins_time_views", {
                    channel_name: videoCallState.channel_name,
                    user_id: videoCallState.user_id,
                    sender_id: videoCallParams.user_id,
                    counter: manageCoinsTimeViewsCounter
                })
            }

            const manageLiveAudienceHostDetails = () => {
                liveVideoManageCoinsTimeViews()
                manageCoinsTimeViewsInterval = window.setInterval(() => {
                    liveVideoManageCoinsTimeViews()
                    manageCoinsTimeViewsCounter = manageCoinsTimeViewsCounter + 10
                }, 10000)
            }

            SOCKET.on('authorize_live_video_call', (data) => {
                if (data.user_id === videoCallState.user_id) {
                    if (Number(videoCallParams.user_id) === data.user_id) {
                        manageLiveAudienceHostDetails()
                        manageTimeInterval = window.setInterval(() => {
                        SOCKET.emit("live_video_manage_time", {
                            channel_name: videoCallState.channel_name
                        })
                    }, 1000)

                    manageViewsInterval = window.setInterval(() => {
                        SOCKET.emit("live_video_manage_views", {
                            channel_name: videoCallState.channel_name
                        })
                    }, 1000)
                    
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
                        manageLiveAudienceHostDetails()
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

            function animate(elem,style,unit,from,to,time) {
                if( !elem) return;
                var start = new Date().getTime(),
                    timer = setInterval(function() {
                        var step = Math.min(1,(new Date().getTime()-start)/time);
                        elem.style[style] = (from+step*(to-from))+unit;
                        if( step == 1) clearInterval(timer);
                    },25);
                elem.style[style] = from+unit;
            }


            SOCKET.on('live_video_manage_time', (data) => {
               if (data.channel_name == videoCallState.channel_name) {
                   setTotalTimeLeft(data.time)
               }
            })

            SOCKET.on('live_video_manage_views', (data) => {
                if (data.channel_name == videoCallState.channel_name) {
                    setTotalViews(data.views)
                }
             })
            
             

            SOCKET.on('send_live_video_item', (message) => {
                let messagesList = messageList;
                console.log(message, "messages...test")
    
                if (
                    // message.sender_id == videoCallParams.user_id &&
                    // message.user_id == videoCallState.user_id &&
                    videoCallParams.channel_name == message.channel_name) { //check one-to-one data sync
                    if (!!message.message.message) {
                        if ( message.sender_id == videoCallParams.user_id &&
                            message.user_id == videoCallState.user_id) {
                                alert(message.message.message)
                            }
                    }
                    else {
                        if (message.message.chat_type === 0) {
                            const new_message = {
                                message: message.message.text_message,
                                message_sender_name: message.message.message_sender_name,
                                receiver_id: videoCallState.user_id,
                                user_id: videoCallParams.user_id
                            }
                            messagesList.push(new_message);
                            messageList = messagesList;
                            console.log(messagesList, "messageList...")
                            setMessages(messagesList);
                            setRandomNumber(Math.random());
                            scrollToBottom()
                        }
                        if (message.message.chat_type === 1) {
                            const gift = {
                                user: changeImageLinkDomain() + message.message.userImage,
                                gift: changeGiftLinkDomain() +message.message.giftImage,
                                f_name: message.message.user_first_name,
                                l_name: message.message.user_last_name,
                                gift_name: message.message.giftName,
                                dateTime: new Date()
                            }
                            let newGift = friendGift; 
                            newGift.unshift(gift);
                            console.log(newGift, "hiiiiiiiiiiiii")
                            setFriendGift(newGift);
                            allGifts = newGift;
                            setRandomNumberGift(Math.random());
                        //     const gifters = !!document.querySelectorAll(".gifter") ? document.querySelectorAll(".gifter") : [];
                        //     gifters.forEach((item, index) => {
                        //         // document.getElementsByClassName("gifter")[index].classList.remove("new")
                        //     })
                        //   console.log(document.getElementsByClassName("gifter")[document.getElementsByClassName("gifter").length - 1], "check.....")
                        //   window.setTimeout(() => {
                        //     document.getElementsByClassName("gifter")[0].style.animation = "gifter 1s ease-in-out";
                        //   }, 1000)  
                          

                        //         // document.getElementsByClassName("gifter")[0].classList.add("new")
                        
                            
                        }
                        if (message.message.chat_type === 2) {
                            // animate heart
                           }
                    }
    
                }
    
            });
    
            SOCKET.on('get_messages_live_video', (messages) => { // only one time
                if (messages.sender_id == videoCallParams.user_id &&
                    messages.user_id == videoCallState.user_id &&
                    videoCallParams.channel_name == messages.channel_name) {
                    setLoading(false);
                    console.log(messages, "messages..")
                    console.log(messages, "hahahaha")
                    let all_messages = [];
                    const socket_messages = messages.messages;
                    for (let i in socket_messages) {
                        all_messages.push({
                            message: socket_messages[i].message,
                            message_sender_name: socket_messages[i].message_sender_name,
                            receiver_id: socket_messages[i].receiver_id,
                            user_id: socket_messages[i].user_id
                        })
                    }
                    setMessages(all_messages);
                    messageList = all_messages;
                }
            });
    
            SOCKET.on('typing_live_video_message', (typing) => { // only one time
                if (videoCallParams.channel_name == typing.channel_name) {
                    if (typing.user_id !== userData.user_id) {
                        setChatTyping(typing.typing_user)
                        window.setTimeout(() => {
                            setChatTyping("")
                        }, 2000)
                    }
                }
            })
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

        removeGiftInterval = window.setInterval(() => {
            const current_time = new Date();
                for (let i in allGifts) {
                    const startDate = allGifts[i].dateTime;
                    const seconds = (current_time.getTime() - startDate.getTime()) / 1000;
                    if (seconds > 10) {
                        allGifts.splice(i, 1)
                    }
                }  
                setFriendGift(allGifts);
                setReRenderGifts(Math.random())
        }, 250)

    }, [])

    const scrollToBottom = () => {
        var div = document.getElementById('chat-body');
        if (!!div)
            div.scroll({ top: div.scrollHeight, behavior: 'smooth' });
    }

    const scrollToTop = () => {
        // $('body, html, #giftSender').scrollTop(0);
        $('body, html, #giftSender').animate({
            scrollTop: 0
        }, 1000);
    }

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

    useEffect(() => {
        scrollToBottom();
    }, [randomNumber])

    useEffect(() => {
        scrollToTop();
    }, [randomNumberGift])

    const CheckTextInputIsEmptyOrNot = (e) => {
        e.preventDefault()
        if (UserMessage != '') {
            var message = {
                "user_id": Number(videoCallState.user_id),
                "text_message": UserMessage,
                "channel_name": videoCallParams.channel_name,
                "sender_id": Number(videoCallParams.user_id),
                "type": 0,
                "gift_id": null,
                "is_send_heart": 0,
                "coins": 0,
                "message_sender_name": userData.first_name + " " + userData.last_name
            }
            SOCKET.emit("send_live_video_item", message);
            setuserMessage(''); //Empty user input here
        } else {
            console.log("Please enter message")
        }
    }

    const changeInput = (e) => {
        setuserMessage(e.target.value)
        SOCKET.emit("typing_live_video_message", {
            user_id: videoCallState.user_id,
            typing_user: userData.first_name + " " + userData.last_name,
            channel_name: videoCallParams.channel_name
        })
    }

    //all gift
    const handleGift = async () => {
        toggleIsOn(true);

        const bodyParameters = {
            session_id: localStorage.getItem('session_id'),
        }
        const { data: { result, status } } = await axios.post(GIFT_LIST_API, bodyParameters)

        if (status == 200) {
            setGiftData(result);
        }
    }

    //get single  gift item
    const getGiftItem = async (giftId) => {
            var message = {
                "user_id": Number(videoCallState.user_id),
                "text_message": "",
                "channel_name": videoCallParams.channel_name,
                "sender_id": Number(videoCallParams.user_id),
                "type": 1,
                "gift_id": giftId,
                "is_send_heart": 0,
                "coins": 0,
                "message_sender_name": userData.first_name + " " + userData.last_name
            }

            SOCKET.emit('send_live_video_item', message);
            setGivenGift('');
            //  setLoading(true);
            toggleIsOn(false);
    }

    useEffect(() => {
        //   Listing gift here
        SOCKET.on('gift_send', (messages) => {
            console.log(messages, "message_gift....");
            setGivenGift(messages.obj.media)
        });
    }, [])

    if (!!givenGift) {
        console.log(givenGift, "givenGif....");
    }
    console.log(userData, userData.user_id ,params.user_id, "test...")
    return (
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
                                            <div class="name ml-2">
                                                {user.first_name} 
                                                <span class="age">{user.age}</span>
                                                <span class="d-block small">{totalTimeLeft}</span>
                                                <span class="small">
                                                    <img src="/assets/images/eye-icon.svg"/> {totalViews}</span>
                                                    </div>
                                            
                                        }
                                        {
                                            !user &&
                                            <div class="name ml-2">
                                                
                                                <span class="age"> </span>
                                                <span class="d-block small"> </span>
                                                <span class="small">
                                                    <img src="/assets/images/eye-icon.svg"/> </span>
                                                    </div>
                                        }
                                    </div>
                                    <div className="remaining-coins ml-4">
                                        <><img src="/assets/images/diamond-coin.png" alt="Coins" /></>
                                        {
                                            <span>{totalCoinsLeft !== null && totalCoinsLeft}</span>
                                        }
                                       
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
                        <div class="gift-sender" id="giftSender">
                        {
                            friendGift.map((item, index) => (
                                <div className="gifter" id={item.gift}>
                                <img src={item.user} alt="gifter" />
                                <div className="gifter__info">
                                    <h6>{item.f_name +" "+ item.l_name}</h6>                
                                    <span>Sent a {item.gift_name}</span>  
                                </div>
                                    <div className="gifter__media">
                                    <img src={item.gift} alt="gift" />
                                </div>     
                            </div>
                                )) 
                               
                        }

                      </div>              


                        <div className="charges-reminder-txt">
                            <p>After 25 Seconds, you will be charged 120 coins per minute</p>
                        </div>
                        <div className="vc-timer-box text-center">
                            {/* <div className="timer">
                                <i className="far fa-clock"></i>
                                <span>{totalTimeLeft}</span>
                            </div> */}
                            <div className="vc-sppiner">
                                <a className="sppiner bg-grd-clr" href="javascript:void(0)">
                                    <img src="/assets/images/sppiner.png" alt="Sppiner" />
                                </a>
                            </div>
                        </div>
                        <div className="vc-option-block d-flex flex-wrap align-items-end">
                            <div className="vc-options">
                                <ul>
                                    <li>
                                        <a className="btn-round bg-grd-clr" href="javascript:void(0)">
                                            <img src="/assets/images/magic-stick.png" alt="Magic" />
                                        </a>
                                    </li>
                                    <li>
                                        <a className="btn-round bg-grd-clr" href="javascript:void(0)">
                                            <img src="/assets/images/chat.png" alt="Chat" />
                                        </a>
                                    </li>
                                    {
                                        (!!userData && userData.user_id != params.user_id) &&
                                        <li>
                                        <a className="btn-round bg-grd-clr" href="javascript:void(0)" onClick={handleGift}>
                                            <img src="/assets/images/gift.png" alt="Gift" />
                                        </a>
                                    </li>
                                    }
                                   
                                    <li>
                                        <a className="btn btn-nxt bg-grd-clr" href="javascript:void(0)">Next</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                    <div class="col-md-3 live__comments_bg p-4">
                        <div class="live__comments" id="chat-body">
                            <form onSubmit={CheckTextInputIsEmptyOrNot}>
                                {
                                    !loading && CompleteMessageList.length === 0 &&
                                    <div className="nothing-to-see text-center active">
                                        <figure>
                                            <img src="/assets/images/message-circle.png" alt="Message" />
                                            <figcaption>Nothing To See</figcaption>
                                        </figure>
                                    </div>
                                }
                                <div class="live__comments__items">
                                    {
                                        CompleteMessageList.map((data, i) => (
                                            <>
                                                <span class="comment_username">{data.message_sender_name} :</span> {data.message} <br/>
                                            </>
                                        ))
                                    }



                                </div>

                                <div class="write-comments">
                                    <div className="sweet-loading">
                                        <BarLoader color={"#fcd46f"} loading={loading} css={override} size={1000} />
                                    </div>
                                    <div class="write-comments__fields position-relative">
                                        <input type="text" name="comments" id="Message" placeholder="Message..." value={UserMessage} onChange={e => changeInput(e)} />
                                        <button type="submit" class="send-message-button bg-grd-clr"><i class="fas fa-paper-plane"></i></button>
                                        {
                                            !!chatTyping &&
                                            <div>{chatTyping} is typing...</div>
                                        }
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>


                <div className={isOn ? 'video-streaming-gift all-gifts-wrapper active' : 'all-gifts-wrapper video-streaming-gift'} >
                    <div className="all-gift-inner">
                        <a href="javascript:void(0)" className="close-gift-btn modal-close" onClick={toggleIsOn}><img src="/assets/images/btn_close.png" /></a>
                        <div className="all-gift-header d-flex flex-wrap align-items-center mb-3">
                            <h5 className="mb-0 mr-4">Send Gift</h5>
                            <div className="remaining-coins">
                                <img src="/assets/images/diamond-coin.png" alt="Coins" />
                                <span>{totalCoinsLeft !== null && totalCoinsLeft}</span>
                            </div>
                        </div>
                        <div className="all-gift-body">

                            <ul className="d-flex flex-wrap text-center gift__items">
                                {GiftData.map((items, i) => {
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
