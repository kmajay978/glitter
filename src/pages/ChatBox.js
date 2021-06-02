import React, { useState, useEffect, useRef } from "react";
import $ from 'jquery';
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import NavLinks from '../components/Nav';
import { GIFT_LIST_API, GIFT_PURCHASE_API, LIKED_LIST, VISITOR_LIST_API, FRIENDLIST_API, GET_USERPROFILE_API, VIDEOCALL_API, ACCEPT_REQUEST_API } from '../components/Api';
import { SOCKET } from '../components/Config';
import { v4 as uuidv4 } from 'uuid';
import { css } from "@emotion/core";
import { BarLoader, SyncLoader } from "react-spinners";
import Logo from '../components/Logo';
import { selectUser, userProfile, videoCall, audioCall } from "../features/userSlice";
import { NotificationManager } from 'react-notifications';
import useToggle, { removeDublicateFrds } from '../components/CommonFunction';
import { useHistory } from "react-router-dom";
import { addDefaultSrc, openNewWindow, returnDefaultImage, useForceUpdate } from "../commonFunctions";
import { setWeekYear } from "date-fns";
import { Modal } from 'react-bootstrap';
import { checkIfIamBusy } from "../api/videoApi";

let checkLastFrdsMsgInterval, my_friends_list = [];

// import stringLimit from '../components/CommonFunction';

const override = css`
  display: block;
  margin: 10px auto;
  border-radius: 50px !important;
  width: 95%;
`;



let messageList = [], receiver_id, userData, myInterval;
let allBaseImages = [];
const scrollToBottom = () => {
    var div = document.getElementById('chat-body');
    if (!!div)
        div.scroll({ top: div.scrollHeight, behavior: 'smooth' });
}

const ChatBox = (props) => {
    const forceUpdate = useForceUpdate();
    const inputFile = useRef(null);
    const dispatch = useDispatch();
    const history = useHistory()
    // window.setTimeout()
    const [Likes, setLikes] = useState([]);
    const [Visitors, setVisitors] = useState([]);
    const [FriendList, setFriendlist] = useState([]);
    const [FriendUserId, setFriendId] = useState('');
    const [AllData, setData] = useState('');
    const [CompleteMessageList, setMessages] = useState([]);
    const [UserMessage, setuserMessage] = useState('');
    const [randomNumber, setRandomNumber] = useState('');
    const [lastMessageRandomNumber, setLastMessageRandomNumberRandomNumber] = useState('');
    const [isOn, toggleIsOn] = useToggle();
    const [uploadImage, setUploadImage] = useState('');
    const [GiftData, setGiftData] = useState([]);
    const [previewData, setPreviewData] = useState([]);
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [myFiles, setMyFiles] = useState([]);
    const [myUrls, setUrls] = useState([]);
    const [baseMultipleImage, setbase64] = useState([]);


    let [loading, setLoading] = useState(false);
    const [recording, setRecording] = useState(false);
    const [dummyMediaRc, setDummyMediaRc] = useState(null)
    const [chatTyping, setChatTyping] = useState("");
    const [threeMessageWarning, setWarningMessage] = useState("");
    const [imageFullSize, setImageFull] = useState({ open: false, media: null });

    // const createNotificationCustom = (type) => {

    //     switch (type) {
    //       case 'success':
    //         NotificationManager.success('Send successfull', 'Gift');
    //         break;
    //       case 'error':
    //         NotificationManager.error('Please recharge and try again', 'Insufficient Balance!');
    //         break; 
    //   };
    //   };

    const [GetActivity, setActivity] = useState(0);

    userData = useSelector(userProfile).user.profile; //using redux useSelector here

    const sessionId = localStorage.getItem('session_id');

    const bodyParameters = {
        session_id: sessionId,
    };

    // Fetching details of user initial time
    const getAllDetails = async () => {
        const likes = await axios.post(LIKED_LIST, bodyParameters)
        setLikes(removeDublicateFrds(likes.data.data));

        // // Destructing response and getting data part
        // const visitor = await axios.post(VISITOR_LIST_API, bodyParameters)
        // setVisitors(removeDublicateFrds(visitor.data.result));

        const friend = await axios.post(FRIENDLIST_API, bodyParameters)
        const data = friend.data.data;
        let friendList = !!data ? data : [];
        setFriendlist(removeDublicateFrds(friendList));
    }

    // Onclick button, getting LIkes, Visitor and friends list

    const getLikes = async () => {  //Likes here
        setActivity(0);
        try {
            const { data: { data, status_code, error } } = await axios.post(LIKED_LIST, bodyParameters)
            if (status_code == 200) {
                setLikes(removeDublicateFrds(data));
            }
        }
        catch (err) {
            if (err.toString().match("403")) {
                localStorage.removeItem("session_id");
                history.push('/login');
            }
        }

    }

    const getVisitors = async () => {  // Visitors here
        setActivity(1);
        try {
            const response = await axios.post(VISITOR_LIST_API, bodyParameters)
            let response_data = response.data.result;
            for (let i in response_data) {
                response_data[i]['user_id'] = response_data[i]['id']
            }
            if (response.status == 200 && !response.status.error) {
                setVisitors(removeDublicateFrds(response_data));
            }
        }
        catch (err) {
            if (err.toString().match("403")) {
                localStorage.removeItem("session_id");
                history.push('/login');
            }
        }
    }

    const getFriend = async () => { //Friends here
        setActivity(2);
        try {
            const { data: { data, status_code, error } } = await axios.post(FRIENDLIST_API, bodyParameters)

            if (status_code == 200) {
                let friendList = !!data ? data : [];
                let friends_list = [];
                my_friends_list = removeDublicateFrds(friendList)
                for (let i in friendList) {
                    friends_list.push({ user_id: friendList[i].user_id })
                }
                checkLastFrdsMsgInterval = window.setInterval(() => {
                    // if (!!userData && userData.user_id !== null && userData.user_id !== undefined && friendList.length > 0) {

                    //     SOCKET.emit("get_frds_last_messages", {
                    //         user_id: userData.user_id,
                    //         friends_list
                    //     })
                    // }
                }, 1000)
                setFriendlist(my_friends_list);

            }
        }
        catch (err) {
            if (err.toString().match("403")) {
                localStorage.removeItem("session_id");
                history.push('/login');
            }
        }
    }

    // fetching friends according to userID
    const getFriendDetails = async () => {
        const bodyParameters = {
            session_id: localStorage.getItem('session_id'),
            user_id: FriendUserId,
        };

        const { data: { data } } = await axios.post(GET_USERPROFILE_API, bodyParameters)
        setData(data);
    }
    // // onclick profile image open single profile
    // const handleOpenImage = () => {
    //     history.push(`/${FriendUserId}/single-profile`)
    // }


    const AcceptUserRequest = (LikedUserId) => {

        const bodyParameters = {
            session_id: sessionId,
            id: LikedUserId
        }
        axios.post(ACCEPT_REQUEST_API, bodyParameters)
            .then((response) => {
                if (response.status == 200) {
                    NotificationManager.success(response.data.message, "", 2000, () => { return 0 }, true);
                    getLikes();
                }
            }, (error) => {
                if (error.toString().match("403")) {
                    NotificationManager.error("Something went wrong", "", 2000, () => { return 0 }, true);
                    localStorage.removeItem("session_id");
                    history.push('/login');
                }
            });

    }
    // onclick vistior list then open single profile 
    const handleVistior = (userId) => {
        history.push({
            pathname: '/' + userId + '/single-profile',

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
        const bodyParameters = {
            session_id: localStorage.getItem('session_id'),
            gift_id: giftId,
            given_to: FriendUserId
        }
        const { data: { giftStatus } } = await axios.post(GIFT_PURCHASE_API, bodyParameters)
        // alert(giftStatus.get_gifts.image);

        if (!!giftStatus) {
            toggleIsOn(false);
            var msg = {};
            msg.file = giftStatus.get_gifts.image;
            msg.fileName = "abc_image";
            msg.sessionId = sessionId;
            msg.reciever_id = receiver_id;
            SOCKET.emit('gift_send', msg);
            setLoading(true);
        }
        else {
            toggleIsOn(false);
            NotificationManager.error('Please recharge and try again', 'Insufficient Balance!');
        }
    }

    //  On change getting image files 
    const handleFileChange = e => {
        const data = e.target.files[0];
        const fileName = data.name.split(".");
        const imageFormat = fileName[fileName.length - 1];
        if (imageFormat === "png" || imageFormat === "jpg" || imageFormat === "jpeg" ||
            imageFormat === "PNG" || imageFormat === "JPG" || imageFormat === "JPEG") {
            const files = [...myFiles];
            files.push(...e.target.files);
            setMyFiles(files);
            setFileUrls(files)

            // Pusing inform with base64
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                allBaseImages.push(reader.result);
                setbase64(allBaseImages);
            });
            reader.readAsDataURL(e.target.files[0]);
            if (allBaseImages.length < 3) {
                document.getElementById("image-media").style.display = "block"
            }
            else {
                document.getElementById("image-media").style.display = "none"
            }
        }
        else {
            NotificationManager.error("Only .png, .jpg, .jpeg image formats supported.", "", 2000, () => { return 0 }, true);
        }
    };

    //    Setting urls for displaying here
    const setFileUrls = (files) => {
        const urls = files.map((file) => URL.createObjectURL(file));
        if (myUrls.length > 0) {
            myUrls.forEach((url) => URL.revokeObjectURL(url));
        }

        setUrls(urls);
    }


    const convertBlobTobase64 = () => {
        let count = 0;
        if (!!baseMultipleImage &&
            baseMultipleImage.length > 0) {
            const imageMedia = document.getElementById("image-media");

            let photoInterval = window.setInterval(() => {
                
                if (count > baseMultipleImage.length - 1) {
                    clearPhotoState()
                    clearInterval(photoInterval);

                }
                else {
                    var msg = {};
                    msg.file = baseMultipleImage[count];
                    msg.fileName = "test";
                    msg.sessionId = sessionId;
                    msg.reciever_id = receiver_id;
                    SOCKET.emit('media_file', msg);
                    setLoading(true);
                    count += 1;
                }
            }, 2000)
        }
        else {
            NotificationManager.warning("select atlease one image..")
        }
    }

    // returning in html form to display 
    const displayUploadedFiles = (urls) => {
        return urls.map((url, i) => <div className="media-box"><img key={i} src={url} /></div>);
    }




    const stringLimit = (string, counts) => {
        var text = string;
        var count = counts;
        var result = text.slice(0, count)
        // + (text.length > count ? "*********" : "");
        for (var i = 0; i <= text.length; i++) {
            // text.replace(text.substr(1,text.length-3));
            var result = text.slice(0, count) + (text.length > count ? "*******" : "");
        }
        return result;
    }
    /************************************* Working here socket *******************************************************/

    function readThenSendFile(data) {

        var reader = new FileReader()
        reader.onload = function (evt) {

            //     var msg ={};
            //     msg.file = evt.target.result;
            //     msg.fileName = data.name;
            //     msg.sessionId = sessionId;
            //     msg.reciever_id = receiver_id;
            //     SOCKET.emit('media_file', msg);
            //     setLoading(true);

        };
        reader.readAsDataURL(data);


    }


    // const CheckBase64Type = (media) =>{
    //     const body = {profilepic:media};
    //     let mimeType = body.profilepic.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0];

    //     if(mimeType == "image/png")
    //     {
    //         return <img onError={(e) => addDefaultSrc(e)} src={!!media ? media : returnDefaultImage()}/>
    //     }
    //     else
    //     {
    //         return <video id="video_preview" onError={(e) => addDefaultSrc(e)} src={!!media ? media : returnDefaultImage()} width="300" height="300" controls></video>
    //     }

    //     // return mimeType;
    // }

    // Authenicating user here
    const DetermineUser = () => {
        var secondUserDataId = FriendUserId;
        SOCKET.emit("authenticate", {
            session_id: sessionId,
            reciever_id: secondUserDataId
        });
    }

    // Socket Methods
    const CheckTextInputIsEmptyOrNot = (e) => {
        e.preventDefault();
        if (UserMessage != '') {
            var secondUserDataId = FriendUserId;
            var message = { "session_id": sessionId, "reciever_id": secondUserDataId, "message": UserMessage }
            SOCKET.emit("send_message", message);
            setuserMessage(''); //Empty user input here
        } else {
        }
    }
    // Get all messages here
    const GetAllMessages = (messages) => {

    }

    const componentWillUnmount = () => {
        clearInterval(checkLastFrdsMsgInterval)
    }

    useEffect(() => {
        scrollToBottom();
        forceUpdate(); // force re-render
    }, [randomNumber])

    useEffect(() => {
        document.getElementById("tab-chat").click()
        // window.setTimeout(() => {
        //     $(document).on('change', '#uploadfile', function(e) {

        //         var data = e.originalEvent.target.files[0]; 
        //         var imageData = e.target.files;
        //         const fileName = data.name.split(".");
        //         const imageFormat = fileName[fileName.length - 1];
        //         if (imageFormat === "png" || imageFormat === "jpg" || imageFormat === "jpeg" ||
        //             imageFormat === "PNG" || imageFormat === "JPG" || imageFormat === "JPEG") {  
        //             readThenSendFile(imageData); 
        //         }

        //         else {
        //             alert("Only .png, .jpg, .jpeg image formats supported.")
        //         }
        //     })
        // }, 1000);



        getAllDetails();

        SOCKET.off('get_frds_last_messages').on('get_frds_last_messages', (data) => {
            const last_messages = data.friends_list;
            if (!!userData && data.user_id == userData.user_id) {
                
                for (let i in my_friends_list) {
                    if (my_friends_list[i].user_id == last_messages[i].user_id) {
                        my_friends_list[i].last_message = last_messages[i].message;
                        my_friends_list[i].last_message_type = last_messages[i].type
                    }
                }
                setFriendlist(my_friends_list)
                setLastMessageRandomNumberRandomNumber(Math.random())
            }
        })

        // Checking the typing user
        SOCKET.off('typing').on('typing', (typing) => {
            if (!!typing) {
                if ((typing.user_id === userData.user_id && typing.reciever_id === receiver_id)
                    ||
                    (typing.user_id === receiver_id && typing.reciever_id === userData.user_id)
                ) { // check one-to-one data sync

                    if (typing.user_id !== userData.user_id) {
                        setChatTyping(typing.typing_user)
                        window.setTimeout(() => {
                            setChatTyping("")
                        }, 2000)
                    }
                }
            }
        })
        SOCKET.off('message_data').on('message_data', (messages) => {
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
                        setMessages(messagesList);
                        setRandomNumber(Math.random());
                        forceUpdate();
                        scrollToBottom()
                    }
                }
            }
        });

        SOCKET.off('media_file').on('media_file', (messages) => {
            let messagesList = messageList;
            if (!!messages) {
                if ((messages.obj.user_from_id === userData.user_id && messages.obj.user_to_id === receiver_id)
                    ||
                    (messages.obj.user_from_id === receiver_id && messages.obj.user_to_id === userData.user_id)
                ) {
                    if (!!messages.obj.warningMessage) {

                        setWarningMessage(messages.obj.warningMessage);
                        //alert(messages.obj.warningMessage)
                        setLoading(false);
                    }
                    else {
                        setWarningMessage('');
                        messagesList.push(messages.obj);
                        messageList = messagesList;
                        setMessages(messagesList);
                        setuserMessage(''); //Empty user input here
                        setLoading(false);
                        setRandomNumber(Math.random());
                        scrollToBottom()
                    }
                }
            }
        });

        SOCKET.off('gift_send').on('gift_send', (messages) => {
            let messagesList = messageList;
            if (!!messages) {
                if ((messages.obj.user_from_id === userData.user_id && messages.obj.user_to_id === receiver_id)
                    ||
                    (messages.obj.user_from_id === receiver_id && messages.obj.user_to_id === userData.user_id)
                ) {
                    if (!!messages.obj.warningMessage) {

                        setWarningMessage(messages.obj.warningMessage);
                        //alert(messages.obj.warningMessage)
                        setLoading(false);
                    }
                    else {
                        setWarningMessage('');
                        messagesList.push(messages.obj);
                        messageList = messagesList;

                        setMessages(messagesList);
                        setLoading(false);
                        setRandomNumber(Math.random());
                        scrollToBottom();
                    }
                }
            }
        });

        SOCKET.off('voice').on('voice', function (arrayBuffer) {
            let messagesList = messageList;
            if (!!arrayBuffer) {
                if ((arrayBuffer.obj.user_from_id === userData.user_id && arrayBuffer.obj.user_to_id === receiver_id)
                    ||
                    (arrayBuffer.obj.user_from_id === receiver_id && arrayBuffer.obj.user_to_id === userData.user_id)
                ) {
                    if (!!arrayBuffer.obj.warningMessage) {
                        setWarningMessage(arrayBuffer.obj.warningMessage);

                    }
                    else {
                        setWarningMessage('');
                        messagesList.push(arrayBuffer.obj);
                        messageList = messagesList;
                        setMessages(messagesList);
                        setuserMessage(''); //Empty user input here
                        setRandomNumber(Math.random());
                        scrollToBottom()
                    }
                }
            }
            // src= window.URL.createObjectURL(blob);

        });
        return () => { componentWillUnmount() }

    }, [])

    // On text typing value
    const changeInput = (e) => {
        setuserMessage(e.target.value)
        SOCKET.emit("typing", {
            user_id: userData.user_id,
            typing_user: userData.first_name + " " + userData.last_name,
            reciever_id: receiver_id
        })
    }

    useEffect(() => {
        if (GetActivity === 2) {
            // SOCKET.connect(); qwert
            // checkLastFrdsMsgInterval = window.setInterval(() => {
            //     SOCKET.emit("get_frds_last_messages", {
            //         user_id: userData.user_id,
            //         friends_list: 
            //     });
            // }, 1000)
        }
        else {
            setFriendId('')
            componentWillUnmount()
            // SOCKET.disconnect();
        }
    }, [GetActivity])

    useEffect(() => {

        if (GetActivity === 2) {
            setMessages([]);
            messageList = [];
            getFriendDetails();
            SOCKET.off('getMessage').on('getMessage', (messages) => { // only one time
                setLoading(false);

                setMessages(messages.message_list);
                messageList = messages.message_list;

            });
        }
        if (!!FriendUserId) {
            setData('');
            messageList = []
            setMessages([]);
            clearPhotoState()
            receiver_id = FriendUserId;
            setWarningMessage('');
            DetermineUser();
            setLoading(true);
            //  GetAllMessages();
            //  OnReceivedMessage();

        }
        // get messagesfrom socket...

    }, [FriendUserId])

    var blobToBase64 = function (blob, callback) {
        var reader = new FileReader();
        reader.onload = function () {
            var dataUrl = reader.result;
            var base64 = dataUrl.split(',')[1];
            return callback(base64);
        };
        reader.readAsDataURL(blob);
    };

    useEffect(() => {
    }, [recording])
    const sendVoiceNote = () => {
        if (!dummyMediaRc) {
            var constraints = { audio: true };
            let recordAudio = false;
            if (!!navigator.mediaDevices) {
                navigator.mediaDevices.getUserMedia(constraints).then(function (mediaStream) {
                    recordAudio = true;
                    var mediaRecorder = new MediaRecorder(mediaStream);

                    mediaRecorder.onstart = function (e) {
                        setDummyMediaRc(mediaRecorder);
                        this.chunks = [];
                    };
                    mediaRecorder.ondataavailable = function (e) {
                        this.chunks.push(e.data);
                    };
                    mediaRecorder.onstop = function (e) {
                        var blob = new Blob(this.chunks,);
                        blobToBase64(blob, (output) => {
                            SOCKET.emit('radio', { blob: 'data:audio/mp3;base64,' + output, sessionId, reciever_id: FriendUserId });
                        })
                    };

                    // Start recording
                    mediaRecorder.start();
                }).catch(function (err) {
                    NotificationManager.error('err.message', 'Click me!', 5000, () => {

                    });
                    NotificationManager.error(err.message);
                })
            }
            else {
                NotificationManager.info("You need a secure https connection in order to record voice");

            }
        }
        else {
            dummyMediaRc.stop();
            setDummyMediaRc(null);
        }
    }
    useEffect(() => {

        scrollToBottom()
    }, [CompleteMessageList])

    /*=============================== Video Call ========================================================*/

    const handleVideo = (image) => {
        const handleCallBtn = document.getElementById("handlecall");
        const handleVideoBtn = document.getElementById("handlevideo");
        handleCallBtn.style.pointerEvents = "none";
        handleVideoBtn.style.pointerEvents = "none";
        const bodyParameters = {user_id: userData.user_id}
        checkIfIamBusy(bodyParameters, (iAmAvailable) => {
            handleCallBtn.style.pointerEvents = "all";
            handleVideoBtn.style.pointerEvents = "all";
            if (iAmAvailable) {
        var secondUserDataId = FriendUserId;
        const video_data = {
            user_from_id: userData.user_id,
            user_to_id: secondUserDataId,
            user_to_image: image,
            channel_id: uuidv4(),
            channel_name: null,
            channel_token: null
        }
        localStorage.setItem("video_call", JSON.stringify(video_data))
        dispatch(
            videoCall(video_data)
        );
        openNewWindow("/searching-profile")
        // history.push("/searching-profile");
            }
        })
    }


    const handleCall = (image) => {
        const handleCallBtn = document.getElementById("handlecall");
        const handleVideoBtn = document.getElementById("handlevideo");
        handleCallBtn.style.pointerEvents = "none";
        handleVideoBtn.style.pointerEvents = "none";
        const bodyParameters = {user_id: userData.user_id}
        checkIfIamBusy(bodyParameters, (iAmAvailable) => {
            handleCallBtn.style.pointerEvents = "all";
            handleVideoBtn.style.pointerEvents = "all";
            if (iAmAvailable) {
                var secondUserDataId = FriendUserId;
                const audio_data = {
                    user_from_id: userData.user_id,
                    user_to_id: secondUserDataId,
                    user_to_image: image,
                    channel_id: uuidv4(),
                    channel_name: null,
                    channel_token: null
                }
                localStorage.setItem("audio_call", JSON.stringify(audio_data))
                dispatch(
                    audioCall(audio_data)
                );
                openNewWindow("/searching-profile-call")
                // history.push("/searching-profile-call");
            }
        });
    }


    const openFileHandler = () => {
        if (baseMultipleImage.length < 4) {
            inputFile.current.click();
        }
        else {
            NotificationManager.error("You can upload max 4 images at a time..");
        }
    };

    const clearPhotoState = () => {
        allBaseImages = []
        setbase64([])
        setMyFiles([])
        setUrls([])
        setUploadImage(false);
    }
    return (

        <section className="home-wrapper">
            <img className="bg-mask" src="/assets/images/mask-bg.png" alt="Mask" />
            <div className="header-bar">
                <div className="container-fluid p-0">
                    <div className="row no-gutters align-items-center">
                        <div className="col-lg-3 p-3">
                            <div className="d-flex flex-wrap align-items-center">
                                <div className="logo-tab d-flex justify-content-between align-items-start">
                                    <a href="javascript:void(0)">
                                        <Logo />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="rcall-head text-center">
                                <h4>Activity</h4>
                            </div>
                        </div>
                        <div className="col-lg-5 p-3">
                            <div className="tab-top d-flex flex-wrap-wrap align-items-center">
                                {!!userData &&
                                    <>
                                        {userData.packages.length > 0 ?
                                            <div className="vc-action-tab ml-auto vip-icon-top">
                                                <span>
                                                    <img src="/assets/images/013-crown.png" />
                                                    {/* <i className="fas fa-crown" /> */}
                                                </span>
                                                <span className="member-type ml-2">VIP</span>
                                            </div>
                                            : ""}
                                    </>
                                }

                                <NavLinks />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="chat-box-wrapper">
                <div className="container">
                    <div className="row panel messages-panel">
                        <div className="contacts-list col-md-4">
                            <ul className="nav inbox-categories d-flex flex-wrap mb-3" role="tablist">
                                <li className="nav-item">
                                    <a id="tab-like" href="#like" className="nav-link active" data-toggle="tab" role="tab" onClick={getLikes} >Like</a>
                                </li>
                                <li className="nav-item">
                                    <a id="tab-visitors" href="#visitors" className="nav-link" data-toggle="tab" role="tab" onClick={getVisitors} >Visitors</a>
                                </li>
                                <li className="nav-item">
                                    <a id="tab-chat" href="#chat" className="nav-link" onClick={getFriend} data-toggle="tab" role="tab">Chat</a>
                                </li>
                            </ul>
                            <div className="tab-content" role="tablist">
                                <div id="like" className="contacts-outter-wrapper tab-pane fade show active" role="tabpanel" aria-labelledby="tab-like">
                                    <div className="contacts-outter">
                                        <ul className="nav contacts" role="tablist">

                                            {Likes.map((item, i) => (
                                                (!!userData && userData.packages.length > 0 ?
                                                    <li className="nav-item  w-100">
                                                        <a className="nav-link" href="#chat-field" data-toggle="tab" data-id={item.like_id} role="tab" onClick={() => AcceptUserRequest(item.like_id)}>

                                                            <img alt={item.first_name} className="img-circle medium-image" src={item.profile_images} />
                                                            <div className="contacts_info">
                                                                <div className="user_detail">
                                                                    <span className="message-time">{item.created_at}</span>
                                                                    <h6 className="mb-0 name">{item.name} .{" " + item.age}</h6>
                                                                    {/* <div className="message-count">2</div> */}
                                                                </div>
                                                                <div className="vcentered info-combo">
                                                                    <p>{item.liked_at}</p>
                                                                </div>
                                                            </div>
                                                        </a>

                                                    </li>

                                                    :
                                                    <li className="nav-item w-100">
                                                        <a className="nav-link" href="#chat-field" style={{ cursor: "default" }} data-toggle="tab" data-id={item.like_id} role="tab">
                                                            <div className="chat__user__img">
                                                                <i className="fas fa-lock"></i>
                                                                <img alt={item.first_name} className="img-circle medium-image" src={item.profile_images} /></div>
                                                            <div className="contacts_info">
                                                                <div className="user_detail">
                                                                    <span className="message-time">{item.created_at}</span>
                                                                    <h6 className="mb-0 name">{stringLimit(item.name, 3) + " "}.{" " + item.age}</h6>
                                                                    {/* <div className="message-count">2</div> */}
                                                                </div>
                                                                <div className="vcentered info-combo">
                                                                    <p>{item.liked_at}</p>
                                                                </div>
                                                            </div>
                                                        </a>

                                                    </li>)

                                            ))}
                                        </ul>

                                    </div>

                                </div>
                                <div id="visitors" className="contacts-outter-wrapper tab-pane fade" role="tabpanel" aria-labelledby="tab-visitors">
                                    <div className="contacts-outter">
                                        <ul className="nav contacts" role="tablist">

                                            {Visitors.map((item, i) => (
                                                (!!userData && userData.packages.length > 0 ?
                                                    <li className="nav-item w-100">
                                                        <a className="nav-link" href="#chat-field" data-toggle="tab" role="tab" onClick={() => handleVistior(item.id)} >
                                                            <img alt={item.full_name} className="img-circle medium-image" src={item.profile_images} />
                                                            <div className="contacts_info">
                                                                <div className="user_detail">
                                                                    {/* <span className="message-time">{item.created_at}</span> */}
                                                                    <h6 className="mb-0 name">{item.full_name}.{" " + item.age}</h6>
                                                                    {/* {/* <div className="message-count">2</div> */}
                                                                </div>
                                                                <div className="vcentered info-combo">
                                                                    <p>{item.visited_at}</p>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    :
                                                    <li className="nav-item w-100">
                                                        <a className="nav-link" href="#chat-field" style={{ cursor: "default" }} data-toggle="tab" role="tab" >
                                                            <div className="chat__user__img">
                                                                <i className="fas fa-lock"></i>
                                                                <img alt={item.full_name} className="img-circle medium-image" src={item.profile_images} />
                                                            </div>
                                                            <div className="contacts_info">
                                                                <div className="user_detail">
                                                                    {/* <span className="message-time">{item.created_at}</span> */}
                                                                    <h6 className="mb-0 name">{item.full_name}.{" " + item.age}</h6>
                                                                    {/* {/* <div className="message-count">2</div> */}
                                                                </div>
                                                                <div className="vcentered info-combo">
                                                                    <p>{item.visited_at}</p>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </li>)

                                            ))}

                                        </ul>
                                    </div>
                                </div>
                                <div id="chat" className="contacts-outter-wrapper tab-pane fade" role="tabpanel" aria-labelledby="tab-chat">
                                    <div className="contacts-outter">
                                        <ul className="nav contacts" role="tablist">

                                            {FriendList.map((item, i) => {
                                                return <li className="nav-item w-100">
                                                    <a className="nav-link" href="#chat-field" data-toggle="tab" data-id={item.user_id} role="tab" onClick={() => setFriendId(item.user_id)}>

                                                        <img alt="Mia" className="img-circle medium-image" src={item.profile_images} />
                                                        <div className="contacts_info">
                                                            <div className="user_detail">
                                                                <span className="message-time">{item.created_at}</span>
                                                                <h6 className="mb-0 name">{item.name}</h6>
                                                                {/* <div className="message-count">2</div> */}
                                                            </div>
                                                            <div className="vcentered info-combo">
                                                                {
                                                                    item.last_message_type === 0 &&
                                                                    <div className="chat-text">
                                                                        <p>{item.last_message}</p>
                                                                    </div>
                                                                }
                                                                {
                                                                    (item.last_message_type === 1 || item.last_message_type === 3) &&
                                                                    <div className="chat-media">
                                                                        <i class="fas fa-image"></i>
                                                                    </div>
                                                                }
                                                                {
                                                                    item.last_message_type === 2 &&
                                                                    <div className="chat-audio">
                                                                        <i class="fas fa-music"></i>
                                                                    </div>
                                                                }

                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Chat box here */}
                        {GetActivity === 2 ?
                            <div className="col-md-8 tab-content chat-block" role="tablist">
                                <div className="nothing-to-see text-center active">
                                    <figure>
                                        <img src="/assets/images/message-circle.png" alt="Message" />
                                        <figcaption>Nothing To See</figcaption>
                                    </figure>
                                </div>


                                <div className="tab-pane tab-pane fade" id="chat-field">
                                    <div className="message-top d-flex flex-wrap align-items-center justify-content-between">
                                        {

                                            !loading &&
                                            <div className="chat-header-info d-flex align-items-center">
                                                {!!AllData ? <img alt="Mia" style={{ cursor: "pointer" }} className="img-circle medium-image" onClick={() => history.push(`/${FriendUserId}/single-profile`)} src={AllData.profile_images} /> : ""}
                                                <div className="chat-user-info ml-2">
                                                    {!!AllData ? <h5 className="mb-0 name">{AllData.first_name}</h5> : <h5>  </h5>}
                                                    <div className="info">
                                                        {!!AllData &&
                                                            <>{AllData.occupation}{AllData.occupation != "" && AllData.age != "" ? " ," : ""} {AllData.age} </>
                                                        }
                                                        {<>  </>}
                                                    </div>
                                                </div>
                                            </div>
                                        }

                                        {/* Video call */}
                                        {
                                            !loading &&
                                            <div className="chat-call-opt d-flex">
                                                <a className="bg-grd-clr mr-3" id="handlecall" onClick={() => handleCall(AllData.profile_images[0])} href="javascript:void(0)">

                                                    <i className="fas fa-phone-alt" /></a>
                                                <a className="bg-grd-clr" id="handlevideo" onClick={() => handleVideo(AllData.profile_images[0])} href="javascript:void(0)">

                                                    <i className="fas fa-video" />

                                                </a>
                                            </div>
                                        }
                                    </div>

                                    {/*<div className="chat-date text-center my-2">Today</div>*/}
                                    <div className="message-chat">

                                        <div className="chat-body" id={"chat-body"}>
                                            {
                                                CompleteMessageList.map((data, i) => (
                                                    <div>
                                                        {
                                                            (data.user_from_id === FriendUserId) ?
                                                                <div className="message info">
                                                                    <div className="message-body">
                                                                        {
                                                                            !!data.media &&
                                                                            <div className="media-socket">
                                                                                <img style={{ cursor: "pointer" }} onClick={() => setImageFull({ open: true, media: (!!data.media ? data.media : returnDefaultImage()) })} onError={(e) => addDefaultSrc(e)} src={!!data.media ? data.media : returnDefaultImage()} />
                                                                            </div>
                                                                        }


                                                                        {
                                                                            !!data.message &&
                                                                            <div className="message-text">
                                                                                <p>{data.message}</p>
                                                                            </div>
                                                                        }
                                                                        {
                                                                            !!data.audio &&
                                                                            <div className="audio-socket">
                                                                                <audio controls src={data.audio} className="audio-left" />
                                                                            </div>
                                                                        }

                                                                    </div>
                                                                </div>
                                                                :
                                                                <div className="message my-message ">
                                                                    <div className="message-body">
                                                                        {
                                                                            !!data.media &&
                                                                            <div className="media-socket">
                                                                                <img style={{ cursor: "pointer" }} onClick={() => setImageFull({ open: true, media: (!!data.media ? data.media : returnDefaultImage()) })} onError={(e) => addDefaultSrc(e)} src={!!data.media ? data.media : returnDefaultImage()} />
                                                                            </div>
                                                                        }


                                                                        {
                                                                            !!data.message &&
                                                                            <div className="message-text">
                                                                                <p>{data.message}</p>
                                                                            </div>
                                                                        }
                                                                        {
                                                                            !!data.audio &&
                                                                            <div>
                                                                                <audio controls src={data.audio} className="audio-right" />
                                                                            </div>
                                                                        }

                                                                    </div>
                                                                </div>
                                                        }
                                                    </div>
                                                ))
                                            }
                                            {

                                                !!threeMessageWarning &&
                                                <div className="message-text warning-msg" >
                                                    <p>{threeMessageWarning}</p>
                                                </div>
                                            }
                                        </div>
                                        <form onSubmit={CheckTextInputIsEmptyOrNot}>

                                            <div className="chat-footer">
                                                {uploadImage ?
                                                    <div className="send-photos-modal">
                                                        <a href="javascript:void(0)" className="theme-txt done-media" onClick={convertBlobTobase64}>Done</a>
                                                        <a href="javascript:void(0)" onClick={(() => clearPhotoState())} className="close-image-btn"><span className="close-image-btn "><img src="/assets/images/btn_msg_close.png" /></span></a>
                                                        <h6 className="text-center">Send Photos</h6>

                                                        <div className="send-photos-listing d-flex my-4">
                                                            <div id="image-media" className="media-box add-media">
                                                                <a id="upload__media" href="javascript:void(0)" onClick={openFileHandler}>
                                                                    <img src="/assets/images/add-media.svg" alt="add media" />
                                                                    <input id="uploadfile" type="file" className="d-none" ref={inputFile} onChange={handleFileChange} multiple="true" accept=".png, .jpg, .jpeg, .PNG, .JPG, .JPEG" />
                                                                </a>
                                                            </div>

                                                            {/* Displaying image here */}
                                                            {myUrls.length > 0 &&
                                                                <>
                                                                    {displayUploadedFiles(myUrls)}
                                                                </>
                                                            }

                                                        </div>

                                                        {/* <h6>Put Price</h6>
                                            <div className="image-coins d-flex">
                                            <div className="coin-price">
                                                <input type="radio" id="coin-value1" name="coin" />
                                                <label for="coin-value1">0 coins</label>
                                                
                                            </div>
                                            
                                            <div className="coin-price">
                                                <input type="radio" id="coin-value2" name="coin"/>
                                                <label for="coin-value2">50 coins</label>
                                                
                                            </div>
                                            
                                            <div className="coin-price">
                                                <input type="radio" id="coin-value3" name="coin"/>
                                                <label for="coin-value3">100 coins</label>
                                                
                                            </div>
                                            
                                            <div className="coin-price">
                                                <input type="radio" id="coin-value4" name="coin"/>
                                                <label for="coin-value4">250 coins</label>
                                                
                                            </div>
                                            </div> */}
                                                    </div>

                                                    : ""}

                                                <div className="sweet-loading">
                                                    <BarLoader color={"#fcd46f"} loading={loading} css={override} size={1000} />
                                                </div>
                                                <label className="upload-file">
                                                    <div>
                                                        <a href="javascript:void(0)" onClick={() => setUploadImage(!uploadImage)} >
                                                            {/* <input id="uploadfile" type="file" accept=".png, .jpg, .jpeg, .PNG, .JPG, .JPEG" /> */}
                                                            <img src="/assets/images/msg-icon.png" alt="add media" />
                                                            {/* <i className="far fa-image" /> */}
                                                        </a>
                                                    </div>
                                                </label>
                                                {/* <textarea className="send-message-text" placeholder="Message..." defaultValue={UserMessage} /> */}
                                                <input className="send-message-text" autoComplete={false} name="Message" id="Message" type="text" placeholder="Message..." value={UserMessage} onChange={e => changeInput(e)} />
                                                <label className="gift-message bg-grd-clr">
                                                    <a href="javascript:void(0)" onClick={handleGift} >
                                                        <i className="fas fa-gift" />
                                                    </a>
                                                </label>
                                                <label className="record-message">
                                                    <a onClick={sendVoiceNote}>
                                                        {
                                                            dummyMediaRc &&
                                                            <i className="fas fa-microphone-slash" />
                                                        }
                                                        {
                                                            !dummyMediaRc &&
                                                            <i className="fas fa-microphone" />
                                                        }

                                                    </a>
                                                </label>
                                                <button type="submit" className="send-message-button bg-grd-clr"><i className="fas fa-paper-plane" /></button>

                                            </div>
                                            {
                                                !!chatTyping &&
                                                <div>{chatTyping} is typing...</div>
                                            }
                                        </form>
                                    </div>

                                </div>

                            </div>
                            : <div className="nothing-to-see text-center active">
                                <figure>
                                    <img src="/assets/images/message-circle.png" alt="Message" />
                                    <figcaption>Nothing To See</figcaption>
                                </figure>
                            </div>}

                        {/* End chat box here */}

                        <Modal className="fullSize-image-modal" show={imageFullSize.open} onHide={() => setImageFull({ open: false, media: null })} backdrop="static" keyboard={false}>

                            <img onError={(e) => addDefaultSrc(e)} src={imageFullSize.media} />

                            <a href="javascript:void(0)" className="modal-close" onClick={() => setImageFull({ open: false, media: null })}><img src="/assets/images/btn_close.png" /></a>
                        </Modal>



                        <div className={isOn ? 'all-gifts-wrapper active' : 'all-gifts-wrapper '} >
                            <div className="all-gift-inner">
                                <a href="javascript:void(0)" className="close-gift-btn modal-close" onClick={toggleIsOn}><img src="/assets/images/btn_close.png" /></a>
                                <div className="all-gift-header d-flex flex-wrap align-items-center mb-3">
                                    <h5 className="mb-0 mr-4">Send Gift</h5>
                                    <div className="remaining-coins">
                                        <img src="/assets/images/diamond-coin.png" alt="Coins" />
                                        <span>152</span>
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
                </div>
            </div>
        </section>
    )
}
export default ChatBox;