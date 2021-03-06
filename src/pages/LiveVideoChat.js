import React, { useState, useEffect } from "react";
import $ from "jquery";
import { useHistory, useParams } from 'react-router';
import axios from "axios";
import Logo from '../components/Logo';
import { SOCKET } from '../components/Config';
import NavLinks from '../components/Nav';
import { joinChannel } from "../components/VideoComponent";
import { useSelector, useDispatch } from "react-redux";
import { css } from "@emotion/core";
import BarLoader from "react-spinners/BarLoader";
import { userProfile, liveVideoCall, liveVideoCallUser } from "../features/userSlice";
import { func } from "prop-types";
import { addDefaultSrc, checkLiveDomain, returnDefaultImage } from "../commonFunctions";
import { GIFT_LIST_API, GIFT_PURCHASE_API, TARGET_DEVICE_API } from "../components/Api";
import useToggle from "../components/CommonFunction";
import { changeImageLinkDomain, changeGiftLinkDomain } from "../commonFunctions"
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
        window.location.href = "/search-home";
    }
    useEffect(() => {
        if (!!userData) {
            setUserData(userData)
        }
    }, [userData])
    useEffect(() => {
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
            // SOCKET.connect() qwert
            setLoading(true);
            SOCKET.emit("authenticate_live_video_call", {
                host_id: Number(videoCallParams.user_id),
                user_id: videoCallState.user_id,
                channel_name: videoCallParams.channel_name,
                type: 1,
                is_host: Number(videoCallParams.user_id) === videoCallState.user_id,
                // videoCallProps: Number(videoCallParams.user_id) === userData.user_id ?
            });
            SOCKET.emit("authenticate_live_video_message", {
                sender_id: Number(videoCallParams.user_id),
                user_id: Number(videoCallState.user_id),
                channel_name: videoCallParams.channel_name
            });

            SOCKET.off('end_live_video_call_host').on('end_live_video_call_host', (data) => {
                if (data.channel_name == videoCallParams.channel_name) {
                    // alert("channel is closing....")
                    componentWillUnmount();
                }
            })

            SOCKET.off('end_live_video_call_host_warning').on('end_live_video_call_host_warning', (data) => {
                if (data.channel_name == videoCallParams.channel_name) {
                    alert("Live video call is closing soon. Something went wrong...")
                    SOCKET.emit("end_live_video_call_host", {
                        host_id: Number(videoCallParams.user_id),
                        user_id: Number(videoCallParams.user_id),
                        channel_name: videoCallParams.channel_name,
                        type: 1,
                        is_host: true
                    })
                }
            })

            SOCKET.off('end_live_video_call_audience').on('end_live_video_call_audience', (data) => {
                if (data.user_id === videoCallState.user_id && data.channel_name == videoCallParams.channel_name) {
                    if (Number(videoCallParams.user_id) === data.user_id) {
                        // alert("host")

                    }
                    else { // audience..
                        // alert("decline audience with id:"+ data.user_id);
                        componentWillUnmount();
                    }
                }
            })
            SOCKET.off('end_live_video_call_audience_warning').on('end_live_video_call_audience_warning', (data) => {
                if (data.user_id === videoCallState.user_id && data.channel_name == videoCallParams.channel_name) {
                    if (Number(videoCallParams.user_id) === data.user_id) {
                        // alert("host")

                    }
                    else { // audience..
                        // alert("decline audience with id:"+ data.user_id);
                        alert(data.msg)
                        SOCKET.emit("end_live_video_call_audience", {
                            host_id: Number(videoCallParams.user_id),
                            user_id: Number(data.user_id),
                            channel_name: videoCallParams.channel_name,
                            type: 1,
                            is_host: false
                        })
                    }
                }
            })



            SOCKET.off('live_video_manage_coins_time_views').on('live_video_manage_coins_time_views', (data) => {
                if (data.channel_name === videoCallState.channel_name && videoCallState.user_id == data.user_id) {
                    if (data.msg === "") {
                        setTotalCoinsLeft(data.coins);
                    }
                    else {
                        alert(data.msg)
                    }
                }
            })



            SOCKET.off('unauthorize_live_video_call').on('unauthorize_live_video_call', (data) => {
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

            SOCKET.off('authorize_live_video_call').on('authorize_live_video_call', (data) => {
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
                        joinChannel('audience', option)
                    }
                }
            });

            function animate(elem, style, unit, from, to, time) {
                if (!elem) return;
                var start = new Date().getTime(),
                    timer = setInterval(function () {
                        var step = Math.min(1, (new Date().getTime() - start) / time);
                        elem.style[style] = (from + step * (to - from)) + unit;
                        if (step == 1) clearInterval(timer);
                    }, 25);
                elem.style[style] = from + unit;
            }


            SOCKET.off('live_video_manage_time').on('live_video_manage_time', (data) => {
                if (data.channel_name == videoCallState.channel_name) {
                    setTotalTimeLeft(data.time)
                }
            })

            SOCKET.off('live_video_manage_views').on('live_video_manage_views', (data) => {
                if (data.channel_name == videoCallState.channel_name) {
                    setTotalViews(data.views)
                }
            })



            SOCKET.off('send_live_video_item').on('send_live_video_item', (message) => {
                let messagesList = messageList;

                if (
                    // message.sender_id == videoCallParams.user_id &&
                    // message.user_id == videoCallState.user_id &&
                    videoCallParams.channel_name == message.channel_name) { //check one-to-one data sync
                    if (!!message.message.message) {
                        if (message.sender_id == videoCallParams.user_id &&
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
                            setMessages(messagesList);
                            setRandomNumber(Math.random());
                            scrollToBottom()
                        }
                        if (message.message.chat_type === 1) {
                            const gift = {
                                user: changeImageLinkDomain() + message.message.userImage,
                                gift: changeGiftLinkDomain() + message.message.giftImage,
                                f_name: message.message.user_first_name,
                                l_name: message.message.user_last_name,
                                gift_name: message.message.giftName,
                                dateTime: new Date()
                            }
                            let newGift = friendGift;
                            newGift.unshift(gift);
                            setFriendGift(newGift);
                            allGifts = newGift;
                            setRandomNumberGift(Math.random());
                        }
                        if (message.message.chat_type === 2) {
                            let count = 0;
                            let heartInterval = window.setInterval(() => {
                                if (count < 5) {

                                    document.getElementById("next").click();
                                    count++;
                                }
                                else {
                                    clearInterval(heartInterval)
                                }
                            }, 500)
                            // animate heart
                        }
                        if (message.message.chat_type === 3) {
                            const gift = {
                                user: message.message.sender_image,
                                gift: "/assets/images/lush.jpg",
                                f_name: message.message.message_sender_name,
                                l_name: "",
                                gift_name: "Lush - (Lovense APP is offline!)",
                                dateTime: new Date()
                            }
                            let newGift = friendGift;
                            newGift.unshift(gift);
                            setFriendGift(newGift);
                            allGifts = newGift;
                            setRandomNumberGift(Math.random());
                        }
                    }
                }
            });

            SOCKET.off('get_messages_live_video').on('get_messages_live_video', (messages) => { // only one time
                if (messages.sender_id == videoCallParams.user_id &&
                    messages.user_id == videoCallState.user_id &&
                    videoCallParams.channel_name == messages.channel_name) {
                    setLoading(false);
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

            SOCKET.off('typing_live_video_message').on('typing_live_video_message', (typing) => { // only one time
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

        $("#next").on("click", function () {
            var b = Math.floor((Math.random() * 100) + 1);
            var d = ["flowOne", "flowTwo", "flowThree"];
            var a = ["colOne", "colTwo", "colThree", "colFour", "colFive", "colSix"];
            var c = (Math.random() * (1.6 - 1.2) + 1.2).toFixed(1);
            $('<div class="heart part-' + b + " " + a[Math.floor((Math.random() * 6))] + '" style="font-size:' + Math.floor(Math.random() * (50 - 22) + 22) + 'px;"><i class="fa fa-heart"></i></div>').appendTo(".hearts").css({
                animation: "" + d[Math.floor((Math.random() * 3))] + " " + c + "s linear"
            });
            $(".part-" + b).show();
            setTimeout(function () {
                $(".part-" + b).remove()
            }, c * 900)
        });

        // return () => { SOCKET.removeAllListeners()}
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
                "firstName": userData.first_name,
                "lastName": userData.last_name,
                "user_id": Number(videoCallState.user_id),
                "text_message": UserMessage,
                "channel_name": videoCallParams.channel_name,
                "sender_id": Number(videoCallParams.user_id),
                "type": 0,
                "gift_id": null,
                "is_send_heart": 0,
                "coins": 0,
                "message_sender_name": userData.first_name + " " + userData.last_name,
                "lovesense": false
            }
            SOCKET.emit("send_live_video_item", message);
            setuserMessage(''); //Empty user input here
        } else {
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

    const sendHeart = () => {
        var message = {
            "user_id": Number(videoCallState.user_id),
            "text_message": "",
            "channel_name": videoCallParams.channel_name,
            "sender_id": Number(videoCallParams.user_id),
            "type": 2,
            "gift_id": null,
            "is_send_heart": 1,
            "coins": 0,
            "message_sender_name": userData.first_name + " " + userData.last_name,
            "lovesense": false
        }
        SOCKET.emit("send_live_video_item", message);
    }

    const lovesenseSend = () => {
        var obj_data = {
            "user_id": Number(videoCallState.user_id),
            "text_message": "",
            "channel_name": videoCallParams.channel_name,
            "sender_id": Number(videoCallParams.user_id),
            "type": 3, // lovesense
            "gift_id": null,
            "is_send_heart": 0,
            "coins": 0,
            "lovesense": true,
            "message_sender_name": userData.first_name + " " + userData.last_name,
            "sender_image": userData.profile_images.length > 0 ? userData.profile_images[0] : ""
        }
        SOCKET.emit("send_live_video_item", obj_data);
    }

    const lovesenseHer = async () => {
        const bodyParameters = { session_id: localStorage.getItem("session_id"), to_user_id: Number(videoCallParams.user_id)}
        const { data: { message, status, error } } = await axios.post(TARGET_DEVICE_API, bodyParameters)
        if (status == 200 && !error) {
            lovesenseSend()
        }
        else {
            if (message == "Lovense APP is offline!") {
                lovesenseSend()
            }
            else {
                alert(!!message ? message : "Something went wrong!!")
            }
        }
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
            "message_sender_name": userData.first_name + " " + userData.last_name,
            "lovesense": false
        }

        SOCKET.emit('send_live_video_item', message);
        setGivenGift('');
        //  setLoading(true);
        toggleIsOn(false);
    }

    useEffect(() => {
        //   Listing gift here
        SOCKET.off('gift_send').on('gift_send', (messages) => {
            setGivenGift(messages.obj.media)
        });
    }, [])

    if (!!givenGift) {
    }
    return (
        <section className="home-wrapper">
            {/* <div class="hearts"></div> */}
            <img className="bg-mask" src="/assets/images/mask-bg.png" alt="Mask" />
            <div className="header-bar" style={{zIndex: 99999}}>
                <div className="container-fluid p-0">
                    <div className="row no-gutters">
                        <div className="col-lg-5 p-3">
                            <div className="d-flex flex-wrap align-items-center">
                                <div className="logo-tab d-flex justify-content-between align-items-start">
                                    <a href="javascript:void(0)" style={{ cursor: "default" }}>
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
                                            <div className="name ml-2">
                                                {user.first_name}
                                                <span className="age"> {user.age}</span>
                                                <span className="d-block small">{totalTimeLeft}</span>
                                                {
                                                    (!!userData && userData.user_id == params.user_id) &&
                                                    <span className="small">
                                                        <img src="/assets/images/eye-icon.svg" /> {totalViews}</span>
                                                }

                                            </div>

                                        }
                                        {
                                            !user &&
                                            <div className="name ml-2">

                                                <span className="age"> </span>
                                                <span className="d-block small"> </span>
                                                {
                                                    (!!userData && userData.user_id == params.user_id) &&
                                                    <span className="small">
                                                        <img src="/assets/images/eye-icon.svg" /> </span>
                                                }

                                            </div>

                                        }

                                    </div>
                                    <div className="remaining-coins ml-4">
                                        <><img src="/assets/images/diamond-coin.png" alt="Coins" /> </>
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
                            <div className="video-live tab-top d-flex flex-wrap-wrap align-items-center">
                                <div className="vc-action-tab ml-auto mr-4 position-relative">
                                    {/* <div className="vc-action-btn">
                                        <span />
                                        <span />
                                        <span />
                                    </div> */}
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
                                            <h6>{item.f_name + " " + item.l_name}</h6>
                                            <span className={item.gift_name.match("Lush") ? "lush-class" : ""}>Sent a {item.gift_name}</span>
                                        </div>
                                        <div className="gifter__media">
                                            <img style={{ borderRadius: "25px" }} src={item.gift} alt="gift" />
                                        </div>
                                    </div>
                                ))

                            }

                        </div>

                        {
                            (!!userData && userData.user_id != params.user_id) &&
                            <div className="charges-reminder-txt">
                                <p>After 25 Seconds, you will be charged 120 coins per minute</p>
                            </div>
                        }
                        <div className="vc-timer-box text-center">
                            {/* <div className="timer">
                                <i className="far fa-clock"></i>
                                <span>{totalTimeLeft}</span>
                            </div> */}
                            {/* <div className="vc-sppiner">
                                <a className="sppiner bg-grd-clr" href="javascript:void(0)">
                                    <img src="/assets/images/sppiner.png" alt="Sppiner" />
                                </a>
                            </div> */}
                        </div>
                        <div className="vc-option-block d-flex flex-wrap align-items-end" style={{ right: "15px" }}>
                            <div className="vc-options">
                                <ul>
                                    {/* <li>
                                        <a className="btn-round bg-grd-clr" href="javascript:void(0)">
                                            <img src="/assets/images/magic-stick.png" alt="Magic" />
                                        </a>
                                    </li>
                                    <li>
                                        <a className="btn-round bg-grd-clr" href="javascript:void(0)">
                                            <img src="/assets/images/chat.png" alt="Chat" />
                                        </a>
                                    </li> */}
                                    {
                                        (!!userData && userData.user_id != params.user_id) &&
                                        <li>
                                            <a className="btn-round bg-grd-clr" href="javascript:void(0)" onClick={handleGift}>
                                                <img src="/assets/images/gift.png" alt="Gift" />
                                            </a>
                                        </li>
                                    }

                                    <li style={{ display: "none" }}>
                                        <a id="next" className="btn btn-nxt bg-grd-clr" href="javascript:void(0)">Next</a>
                                    </li>
                                    {
                                        <li className="send-heart">
                                            <div class="hearts" style={{ left: (!!userData && userData.user_id != params.user_id) ? "0px" : "-50px" }}></div>
                                            {
                                                (!!userData && userData.user_id != params.user_id) &&
                                                <a className="btn-round bg-grd-clr" href="javascript:void(0)" id="heart" onClick={sendHeart}><i class="fa fa-heart"></i></a>
                                            }
                                        </li>
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3 live__comments_bg p-4">
                        <div class="live__comments__wrap">
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
                                <div class="live__comments__items live__comments" id="chat-body">
                                    {
                                        CompleteMessageList.map((data, i) => (
                                            <>
                                                <span class="comment_username">{data.message_sender_name} :</span> {data.message} <br />
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
                        <a href="javascript:void(0)" style={{zIndex: 999999}} className="close-gift-btn modal-close" onClick={toggleIsOn}><img src="/assets/images/btn_close.png" /></a>
                        <div className="all-gift-header d-flex flex-wrap align-items-center mb-3">
                            <h5 className="mb-0 mr-4">Send Gift</h5>
                            <div className="remaining-coins">
                                <img src="/assets/images/diamond-coin.png" alt="Coins" />
                                <span> {totalCoinsLeft !== null && totalCoinsLeft}</span>
                                <img className="lush" src="/assets/images/lush.jpg" onClick={lovesenseHer} />
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
