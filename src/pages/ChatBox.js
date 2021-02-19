import React, { useState, useEffect } from "react";
import  $ from 'jquery';
import {useSelector, useDispatch} from 'react-redux';
import axios from "axios";
import NavLinks from '../components/Nav';
import { GIFT_LIST_API , GIFT_PURCHASE_API ,LIKED_LIST, VISITOR_LIST_API ,FRIENDLIST_API, GET_USERPROFILE_API ,VIDEOCALL_API, ACCEPT_REQUEST_API} from '../components/Api';
import {SOCKET} from '../components/Config';
import { v4 as uuidv4 } from 'uuid';
import { css } from "@emotion/core";
import BarLoader from "react-spinners/BarLoader";
import Logo from '../components/Logo';
import {selectUser, userProfile, videoCall, audioCall} from "../features/userSlice";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import useToggle from '../components/CommonFunction';
import { useHistory } from "react-router-dom";
import {addDefaultSrc, returnDefaultImage} from "../commonFunctions";
// import stringLimit from '../components/CommonFunction';

const override = css`
  display: block;
  margin: 10px auto;
  border-radius: 50px !important;
  width: 95%;
`;
// app id: bd7c4ac2265f496dbaa84d9837960c78
// app secret: 40082f25ff2a4b88ac1358f7e863cba6
// channel: test
// token: 006bd7c4ac2265f496dbaa84d9837960c78IAAq1GZbv3moec3u6pFg67UZMEm0pzTuHT21ki9gqV9EXQx+f9gAAAAAEAAH/YchlRMJYAEAAQCYEwlg

let messageList = [], receiver_id, userData;

const scrollToBottom = () => {
    var div = document.getElementById('chat-body');
    if (!!div)
        div.scroll({ top: div.scrollHeight, behavior: 'smooth' });
}

const ChatBox = (props) =>{
    const dispatch = useDispatch();
    const history = useHistory()
    // window.setTimeout()
    const[Likes, setLikes] = useState([]);
    const[Visitors, setVisitors] = useState([]);
    const[FriendList, setFriendlist] = useState([]);
    const[isLoaded, setIsLoaded] = useState(false);
    const[FriendUserId, setFriendId] = useState('');
    const[AllData, setData] = useState('');
    const[CompleteMessageList, setMessages] = useState([]);
    const[UserMessage, setuserMessage] = useState('');
    const[randomNumber, setRandomNumber] = useState('');
    const [isOn, toggleIsOn] = useToggle();
    const [uploadImage , setUploadImage] = useState('');
    const [GiftData , setGiftData] =useState([]);
    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState(null);
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
   

    let [loading, setLoading] = useState(false);
    const[recording, setRecording] = useState(false);
    const [dummyMediaRc, setDummyMediaRc] = useState(null)
    const [chatTyping, setChatTyping] = useState("");
    const [threeMessageWarning, setWarningMessage] = useState("");

    const createNotificationCustom = (type) => {
  
        switch (type) {
          case 'success':
            NotificationManager.success('Send successfull', 'Gift');
            break;
          case 'error':
            NotificationManager.error('Please recharge and try again', 'Insufficient Balance!', 5000, () => {
            });
            break; 
      };
      };

 console.log(threeMessageWarning,"threeMessageWarning....");
    const[GetActivity, setActivity] = useState(0);

    userData = useSelector(userProfile).user.profile; //using redux useSelector here

    // console.log(userData);
    // console.log(CompleteMessageList, "nowwww")
    const sessionId = localStorage.getItem('session_id');

    const bodyParameters = {
        session_id: sessionId,
    };

    // Fetching details of user initial time
    const getAllDetails = async () => {
        const likes = await axios.post(LIKED_LIST,bodyParameters)
        setLikes(likes.data.data);

        // Destructing response and getting data part
        const visitor = await axios.post(VISITOR_LIST_API,bodyParameters)
        setVisitors(visitor.data.result);

        const friend= await axios.post(FRIENDLIST_API,bodyParameters)
        console.log(friend.data, "friend")
        const data = friend.data.data;
        setFriendlist(!!friend ? friend.data.data : []);
    }

// Onclick button, getting LIkes, Visitor and friends list

    const getLikes = async () => {  //Likes here
        setActivity(0);
        try {
            const { data: {data , status_code,error } } = await axios.post(LIKED_LIST,bodyParameters)
            if(status_code==200){
                setLikes(data);
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
            const { data: {result, error , status_code} } = await axios.post(VISITOR_LIST_API,bodyParameters)
           
            if(status_code==200){
            setVisitors(result);
            }
        }
        catch (err) {
            if (err.toString().match("403")) {
                localStorage.removeItem("session_id");
                history.push('/login');
              }
        }
    }

    const getFriend = async() => { //Friends here
        setActivity(2);
        try {
            const {data:{data ,status_code, error}}= await axios.post(FRIENDLIST_API,bodyParameters)
           
            if(status_code==200){
                setFriendlist(!!data ? data : []);
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
    const getFriendDetails = async() => {
        const bodyParameters = {
            session_id: localStorage.getItem('session_id'),
            user_id: FriendUserId,
        };

        const {data:{data}}= await axios.post(GET_USERPROFILE_API,bodyParameters)
        setData(data);
    }

    // Adding call functionality here
    // const handleCall =() =>{
    //     const bodyParameters = {
    //         session_id: localStorage.getItem('session_id'),
    //         user_id :FriendUserId,
    //         type : 'audio',
    //         room_id : '1'
    //     }
    //     axios.post(VIDEOCALL_API , bodyParameters)
    //         .then((response) => {
    //             if(response.status==200)
    //             {
    //                 createNotification('sucess');
    //                 alert("call made successfully");
    //             }
    //         }, (error) => {

    //         });
    // }

    const AcceptUserRequest = (LikedUserId) =>{
        const bodyParameters = {
            session_id : sessionId,
            id : LikedUserId
        }
        axios.post(ACCEPT_REQUEST_API , bodyParameters)
            .then((response) => {
                // if(response.error=="bad_request")
                //  {
                //   localStorage.removeItem("session_id");
                //   history.push('/login');
                //  }
                if(response.status==200)
                {
                    createNotification('accept');
                }
            }, (error) => {
                if (error.toString().match("403")) {
                    localStorage.removeItem("session_id");
                    history.push('/login');
                  }
            });

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
           session_id :  localStorage.getItem('session_id') ,
           gift_id : giftId ,
           given_to : FriendUserId
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
                msg.reciever_id = receiver_id;
                SOCKET.emit('gift_send', msg);
                setLoading(true);
                }
                else
                {
                    toggleIsOn(false);
                    createNotificationCustom('error');       
                }
             }
            const fileObj = [];
           const fileArray = [];
             const handleFileChange = e => {
                // var data = e.target.files[0];
                // const filename =  e.target.files[0];
                // const fileName = data.name.split(".");
                // const imageFormat = fileName[fileName.length - 1];
                // const fileList = Array.from(e.target.files);
                //  if (e.target.files[0]) { 
                //    if (imageFormat === "png" || imageFormat === "jpg" || imageFormat === "jpeg" ||
                //    imageFormat==="SVG"||imageFormat==="svg"||imageFormat === "PNG" || imageFormat === "JPG" || imageFormat === "JPEG") 
                //    {
                    fileObj.push(e.target.files)
                    for (let i = 0; i < fileObj[0].length; i++) {
                        fileArray.push(URL.createObjectURL(fileObj[0][i]))
                    }
                    setFiles({ file: fileArray })
            //         setFiles(fileList); 

            //         const mappedFiles = fileList.map((file) => ({
            //        ...file,
            //        preview: URL.createObjectURL(file),
            //       }));
  
            //    setPreviews(mappedFiles);
                    //  setPicture(e.target.files[0]);
                    //  const reader = new FileReader();
                    //  reader.addEventListener("load", () => {
                    //    setImgData(reader.result);     
                    //  });
                    //  reader.readAsDataURL(e.target.files[0]);
                
                //    }
                //    else if(imageFormat === "mp4" || imageFormat === "MP4")
                //    {
                //      console.log("video_file: ", e.target.files[0]);
                //      setPicture(e.target.files[0]);
                //      const reader = new FileReader();
                //      reader.addEventListener("load", () => {
                //        setImgData(reader.result); 
                      
                //      });
                //      reader.readAsDataURL(e.target.files[0]);
                //    }
                //    else
                //    {
                //      console.log("Invlid format");
                //    }
                //   }
               };
               console.log(files ,"fileName...");

               
               const handleSendFile =() => {
                setUploadImage(false);
                setPreviews('');
               }

            const  stringLimit = (string , counts)=>{
                var text = string;
                var count = counts;
                var result = text.slice(0, count) 
                // + (text.length > count ? "*********" : "");
                for(var i=0 ; i<=text.length ; i++){
                    // text.replace(text.substr(1,text.length-3));
                    var result = text.slice(0, count)+ (text.length > count ? "*********" : "");
                } 
                return result;
            }
    /************************************* Working here socket *******************************************************/


    function readThenSendFile(data){
        var reader = new FileReader();
        reader.onload = function(evt){
            var msg ={};
            msg.file = evt.target.result;
            msg.fileName = data.name;
            msg.sessionId = sessionId;
            msg.reciever_id = receiver_id;
            console.log(msg, "msg...")
            SOCKET.emit('media_file', msg);
            setLoading(true);
        };
        reader.readAsDataURL(data);
    }


    // Authenicating user here
    const DetermineUser = () => {
        var secondUserDataId = FriendUserId;
        SOCKET.emit("authenticate", {
            session_id: sessionId,
            reciever_id: secondUserDataId
        });
    }

    // Socket Methods
    const CheckTextInputIsEmptyOrNot = (e) =>  {
        e.preventDefault()
        if ( UserMessage != '') {
            var secondUserDataId = FriendUserId;
            var message = { "session_id": sessionId, "reciever_id": secondUserDataId, "message": UserMessage }
            console.log('sent>>>> Data', message);
            SOCKET.emit("send_message", message);
            setuserMessage(''); //Empty user input here
        } else {
            console.log("Please enter message")
        }
    }
    // Get all messages here
    const GetAllMessages = (messages) => {
        console.log(messages.message_list,"messages.message_list....");

    }

    useEffect(() => {
        scrollToBottom();
    }, [randomNumber])
// console.log(FriendUserId);
    useEffect(()=>{
        window.setTimeout(() => {
            $(document).on('change', '#uploadfile', function(e) {
               
                var data = e.originalEvent.target.files[0]; 
                const fileName = data.name.split(".");
                const imageFormat = fileName[fileName.length - 1];
                if (imageFormat === "png" || imageFormat === "jpg" || imageFormat === "jpeg" ||
                    imageFormat === "PNG" || imageFormat === "JPG" || imageFormat === "JPEG") {  
                    readThenSendFile(data);
                }
                else {
                    alert("Only .png, .jpg, .jpeg image formats supported.")
                }
            })
        }, 1000);

        getAllDetails();

        // Checking the typing user
        SOCKET.on('typing', (typing) => {
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

        SOCKET.on('message_data', (messages) => {
            // console.log(messages, "test..");
            // console.log(messageList, "CompleteMessageList")
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
        SOCKET.on('media_file', (messages) => {
            console.log(messageList, "CompleteMessageList")
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
                    console.log(messagesList, "messageList... pic")
                    setMessages(messagesList);
                    setuserMessage(''); //Empty user input here
                    setLoading(false);
                    setRandomNumber(Math.random());
                    scrollToBottom()
                    }
                }
            }
        });

        SOCKET.on('gift_send',(messages) =>{
            console.log(messages,"message_gift....");
           let messagesList = messageList;
            if(!!messages)
            {
                if ((messages.obj.user_from_id === userData.user_id && messages.obj.user_to_id === receiver_id)
                    ||
                    (messages.obj.user_from_id === receiver_id && messages.obj.user_to_id === userData.user_id)
                )
                {
                    if (!!messages.obj.warningMessage) {
                    
                        setWarningMessage(messages.obj.warningMessage);
                        //alert(messages.obj.warningMessage)
                        setLoading(false);
                    }
                    else {
                        setWarningMessage('');
                    messagesList.push(messages.obj);
                    messageList = messagesList;
                    console.log(messagesList,"messageList_gift_send ........ ");
                    setMessages(messagesList);
                    setLoading(false);
                    setRandomNumber(Math.random());
                    scrollToBottom();
                    }
                }
            }
        });

        SOCKET.on('voice', function(arrayBuffer) {
            let messagesList = messageList;
            console.log(messageList, "CompleteMessageList")
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
                    console.log(messagesList, "messageList... pic")
                    setMessages(messagesList);
                    setuserMessage(''); //Empty user input here
                    setRandomNumber(Math.random());
                    scrollToBottom()
                    }
                }
            }
            // src= window.URL.createObjectURL(blob);

        });


    },[])

    // On text typing value
    const changeInput = (e) => {
        setuserMessage(e.target.value)
        SOCKET.emit("typing", {
            user_id: userData.user_id,
            typing_user: userData.first_name + " " + userData.last_name,
            reciever_id: receiver_id
        })
    }

    useEffect(()=>{
        if (GetActivity === 2) {
            console.log("connect socket")

            SOCKET.connect();
        }
        else {
            // SOCKET.disconnect();
        }
    },[GetActivity])

    useEffect(()=>{

        if (GetActivity === 2) {
            setMessages([]);
            messageList = [];
            getFriendDetails();
            SOCKET.on('getMessage', (messages) => { // only one time
                setLoading(false);
                console.log(messages, "messages..")
                console.log(messages, "hahahaha")
              
                    setMessages(messages.message_list);
                    messageList = messages.message_list;
                
            });
        }
        if (!!FriendUserId) {
            receiver_id = FriendUserId;
            setWarningMessage('');
            DetermineUser();
            setLoading(true);
            //  GetAllMessages();
            //  OnReceivedMessage();

        }
        // get messagesfrom socket...

    },[FriendUserId])

    var blobToBase64 = function(blob, callback) {
        var reader = new FileReader();
        reader.onload = function() {
            var dataUrl = reader.result;
            var base64 = dataUrl.split(',')[1];
            return callback(base64);
        };
        reader.readAsDataURL(blob);
    };

    useEffect(() => {
        console.log(recording, "record....")
    }, [recording])
    const sendVoiceNote = () => {
        console.log(recording, "recordddddddd")
        if (!dummyMediaRc) {
            var constraints = {audio: true};
            let recordAudio = false;
            if ( !!navigator.mediaDevices) {
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
                        console.log(blob, "blob.....")
                        blobToBase64(blob, (output) => {
                            SOCKET.emit('radio', {blob: 'data:audio/mp3;base64,' + output, sessionId, reciever_id: FriendUserId});
                        })
                    };

                    // Start recording
                    mediaRecorder.start();
                }).catch(function (err) {
                    createNotification('error-message')
                    alert(err.message)
                })
            }
            else {
                alert("You need a secure https connection in order to record voice")
            }
        }
        else {
            console.log(dummyMediaRc, "media rec...")
            dummyMediaRc.stop();
            setDummyMediaRc(null);
        }
    }
    useEffect( () => {
        console.log(CompleteMessageList.length, "CompleteMessageList length...")
        scrollToBottom()
    }, [CompleteMessageList])

    /*=============================== Video Call ========================================================*/

    const handleVideo = (image) =>{
        var secondUserDataId = FriendUserId;
        dispatch(
            videoCall({
                user_from_id: userData.user_id,
                user_to_id: secondUserDataId,
                user_to_image: image,
                channel_id: uuidv4(),
                channel_name: null,
                channel_token: null
            })
        );
        history.push("/searching-profile");
    }


    const handleCall = (image) =>{
        var secondUserDataId = FriendUserId;
        dispatch(
            audioCall({
                user_from_id: userData.user_id,
                user_to_id: secondUserDataId,
                user_to_image: image,
                channel_id: uuidv4(),
                channel_name: null,
                channel_token: null
            })
        );
        history.push("/searching-profile-call");
    }

    const createNotification = (type) => {
        return () => {
            switch (type) {
                case 'accept':
                    NotificationManager.success('Like sucessfully', 'Like');
                    break;
                case 'success':
                    NotificationManager.success('Success message', 'Title here');
                    break;
                case 'error-secure':
                    NotificationManager.error('err.message', 'Click me!', 5000, () => {
                    });
                case 'error-message':
                    NotificationManager.error('err.message', 'Click me!', 5000, () => {

                    });
                    break;
            }
        };
    };
    return(

        <section className="home-wrapper">
            <img className="bg-mask" src="/assets/images/mask-bg.png" alt="Mask" />
            <div className="header-bar">
                <div className="container-fluid p-0">
                    <div className="row no-gutters align-items-center">
                        <div className="col-lg-3 p-3">
                            <div className="d-flex flex-wrap align-items-center">
                                <div className="logo-tab d-flex justify-content-between align-items-start">
                                    <a href="javascript:void(0)">
                                        <Logo/>
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
                            {!!userData&&
                            <>
                             {userData.packages.length>0 ? 
                             <div className="vc-action-tab ml-auto vip-icon-top">
                             <span>
                                 <img src="/assets/images/013-crown.png"/>
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

                                        {/* { isLoaded && */}
                                        <ul className="nav contacts" role="tablist">

                                            { Likes.map((item, i) => (
                                                (!!userData && userData.packages.length>0 ?
                                                    <li className="nav-item">
                                                    <a className="nav-link" href="#chat-field" data-toggle="tab" data-id={item.like_id} role="tab" onClick = {() =>AcceptUserRequest(item.like_id)}>
                                                  
                                                   <img alt={item.first_name} className="img-circle medium-image" src={item.profile_images} />
                                                        <div className="contacts_info">
                                                            <div className="user_detail">
                                                                <span className="message-time">{item.created_at}</span>
                                                                <h5 className="mb-0 name">{item.first_name}</h5>
                                                                {/* <div className="message-count">2</div> */}
                                                            </div>
                                                            <div className="vcentered info-combo">
                                                                <p>Yep, I'm new in town and I wanted</p>
                                                            </div>
                                                        </div>
                                                    </a>

                                                </li>
                                                    : 
                                                    <li className="nav-item w-100">
                                                    <a className="nav-link" href="#chat-field" data-toggle="tab" data-id={item.like_id} role="tab">
                                                   <div className="chat__user__img">
                                                   <i className="fas fa-lock"></i>
                                                   <img alt={item.first_name} className="img-circle medium-image" src={item.profile_images} /></div> 
                                                        <div className="contacts_info">
                                                            <div className="user_detail">
                                                                <span className="message-time">{item.created_at}</span>
                                                                <h5 className="mb-0 name">{stringLimit(item.first_name , 3)  +" "}.{" " + item.age}</h5>
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
                                        {/* } */}
                                        <NotificationContainer/>
                                    </div>
                                </div>
                                <div id="visitors" className="contacts-outter-wrapper tab-pane fade" role="tabpanel" aria-labelledby="tab-visitors">
                                    <div className="contacts-outter">
                                        <ul className="nav contacts" role="tablist">

                                            { Visitors.map((item, i) => (
                                                 (!!userData && userData.packages.length>0 ? 
                                            <li className="nav-item">
                                                    <a className="nav-link" href="#chat-field" data-toggle="tab" role="tab" >
                                                        <img alt={item.full_name} className="img-circle medium-image" src={item.profile_images}/>
                                                        <div className="contacts_info">
                                                            <div className="user_detail">
                                                                <span className="message-time">{item.created_at}</span>
                                                                <h5 className="mb-0 name">{item.full_name}</h5>
                                                                {/* {/* <div className="message-count">2</div> */}
                                                            </div>
                                                            <div className="vcentered info-combo">
                                                                <p>Yep, I'm new in town and I wanted</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                                : 
                                                <li className="nav-item">
                                                <a className="nav-link" href="#chat-field" data-toggle="tab" role="tab" >
                                                <div className="chat__user__img">
                                               <i className="fas fa-lock"></i>
                                                    <img alt={item.full_name} className="img-circle medium-image" src={item.profile_images}/>
                                                    </div>
                                                    <div className="contacts_info">
                                                        <div className="user_detail">
                                                            <span className="message-time">{item.created_at}</span>
                                                            <h5 className="mb-0 name">{item.full_name}</h5>
                                                            {/* {/* <div className="message-count">2</div> */}
                                                        </div>
                                                        <div className="vcentered info-combo">
                                                            <p>Yep, I'm new in town and I wanted</p>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li> )
                                            ))}

                                        </ul>
                                    </div>
                                </div>
                                <div id="chat" className="contacts-outter-wrapper tab-pane fade" role="tabpanel" aria-labelledby="tab-chat">
                                    <div className="contacts-outter">
                                        <ul className="nav contacts" role="tablist">

                                            { FriendList.map((item, i) => {
                                                return <li className="nav-item">
                                                    <a className="nav-link" href="#chat-field" data-toggle="tab" data-id={item.user_id} role="tab" onClick={() =>  setFriendId(item.user_id)}>

                                                        <img alt="Mia" className="img-circle medium-image" src={item.profile_images} />
                                                        <div className="contacts_info">
                                                            <div className="user_detail">
                                                                <span className="message-time">{item.created_at}</span>
                                                                <h5 className="mb-0 name">{item.first_name}</h5>
                                                                {/* <div className="message-count">2</div> */}
                                                            </div>
                                                            <div className="vcentered info-combo">
                                                                <p>Yep, I'm new in town and I wanted</p>
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
                                        <div className="chat-header-info d-flex align-items-center">
                                            {!!AllData ? <img alt="Mia" className="img-circle medium-image" src={AllData.profile_images}/> : ""}
                                            <div className="chat-user-info ml-2">
                                                {!!AllData ? <h5 className="mb-0 name">{AllData.first_name}</h5> : <h5>  </h5> }
                                                <div className="info">
                                                    {!!AllData &&
                                                    <>{AllData.occupation},  {AllData.age} </>
                                                    }
                                                    {<>  </>}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Video call */}
                                        <div className="chat-call-opt d-flex">
                                        <a className="bg-grd-clr mr-3" onClick = {() => handleCall(AllData.profile_images[0])} href="javascript:void(0)">
                                                <NotificationContainer/>
                                                <i className="fas fa-phone-alt" /></a>
                                            <a className="bg-grd-clr" onClick = {() => handleVideo(AllData.profile_images[0])} href="javascript:void(0)">
                                                <NotificationContainer/>
                                                <i className="fas fa-video" />

                                            </a>
                                        </div>
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
                                                                                <img onError={(e) => addDefaultSrc(e)} src={!!data.media ? data.media : returnDefaultImage()}/>
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
                                                                            <div  className="audio-socket">
                                                                                <audio controls src={data.audio} className="audio-left"/>
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
                                                                                <img onError={(e) => addDefaultSrc(e)} src={!!data.media ? data.media : returnDefaultImage()}/>
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
                                                                                <audio controls src={data.audio} className="audio-right"/>
                                                                            </div>
                                                                        }

                                                                    </div>
                                                                </div>
                                                        }
                                                    </div>
                                                ))
                                            }
                                            <NotificationContainer/>
                                            {
                                                
                                                    !!threeMessageWarning &&
                                                    <div className="message-text warning-msg" >
                                                    <p>{threeMessageWarning}</p>
                                                </div>
                                                }
                                        </div>
                                        <form onSubmit={CheckTextInputIsEmptyOrNot}>

                                            <div className="chat-footer">
                                                <div className="sweet-loading">
                                                    <BarLoader color={"#fcd46f"} loading={loading} css={override} size={1000} />
                                                </div>
                                                <label className="upload-file">
                                                    <div>
                                                        <input id="uploadfile" type="file" accept=".png, .jpg, .jpeg, .PNG, .JPG, .JPEG" />
                                                        <i className="far fa-image" />
                                                    </div>
                                                </label>
                                                {/* <textarea className="send-message-text" placeholder="Message..." defaultValue={UserMessage} /> */}
                                                <input className="send-message-text" name="Message" id="Message" type="text" placeholder="Message..." value={UserMessage} onChange={e => changeInput(e)} />
                                                <label className="gift-message bg-grd-clr">
                                                    <a href="javascript:void(0)" onClick={handleGift} >
                                                        <i className="fas fa-gift" />
                                                    </a>
                                                </label>
                                                <label className="record-message">
                                                    <a  onClick={sendVoiceNote}>
                                                        {
                                                            dummyMediaRc &&
                                                            <i className="fas fa-microphone-slash"/>
                                                        }
                                                        {
                                                            !dummyMediaRc &&
                                                            <i className="fas fa-microphone" />
                                                        }

                                                    </a>
                                                    <NotificationContainer/>
                                                </label>
                                                <button type="submit" className="send-message-button bg-grd-clr"><i className="fas fa-paper-plane" /></button>
                                                {
                                                    !!chatTyping &&
                                                    <div>{chatTyping} is typing...</div>
                                                }
                                            </div>
                                        </form>
                                    </div>

                                </div>

                            </div>
                            :<div className="nothing-to-see text-center active">
                                <figure>
                                    <img src="/assets/images/message-circle.png" alt="Message" />
                                    <figcaption>Nothing To See</figcaption>
                                </figure>
                            </div> }

                        {/* End chat box here */}

   
             
              
                            
                        <div className={isOn ? 'all-gifts-wrapper active': 'all-gifts-wrapper '} >
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
                </div>
            </div>
        </section>
    )
}
export default ChatBox;