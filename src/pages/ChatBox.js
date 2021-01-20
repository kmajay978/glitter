import React, { useState, useEffect } from "react";
import {useSelector} from 'react-redux';
import axios from "axios";
import NavLinks from '../components/Nav';
import { LIKED_LIST, VISITOR_LIST_API ,FRIENDLIST_API, GET_USERPROFILE_API ,VIDEOCALL_API} from '../components/Api';
import {SOCKET} from '../components/Config';
import  $ from 'jquery';
import { css } from "@emotion/core";
import BarLoader from "react-spinners/BarLoader";
import Logo from '../components/Logo';
import {selectUser, userProfile} from "../features/userSlice";
import {NotificationContainer, NotificationManager} from 'react-notifications';

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

const ChatBox = () =>{
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

    let [loading, setLoading] = useState(false);
    const[recording, setRecording] = useState(false);
    const [dummyMediaRc, setDummyMediaRc] = useState(null)
    const [chatTyping, setChatTyping] = useState("")

// console.log(UserMessage);
    const[GetActivity, setActivity] = useState(0);

    userData = useSelector(userProfile).user.profile; //using redux useSelector here


    console.log(CompleteMessageList, "nowwww")
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
        const { data: {data} } = await axios.post(LIKED_LIST,bodyParameters)
        setLikes(data);
    }

    const getVisitors = async () => {  // Visitors here
        setActivity(1);
        const { data: {result} } = await axios.post(VISITOR_LIST_API,bodyParameters)
        setVisitors(result);

    }

    const getFriend = async() => { //Friends here
        setActivity(2);
        const {data:{data}}= await axios.post(FRIENDLIST_API,bodyParameters)
        setFriendlist(!!data ? data : []);
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
    const handleCall =() =>{
        const bodyParameters = {
            session_id: localStorage.getItem('session_id'),
            user_id :FriendUserId,
            type : 'audio',
            room_id : '1'
        }
        axios.post(VIDEOCALL_API , bodyParameters)
            .then((response) => {
                if(response.status==200)
                {
                    alert("call made successfully");
                }
            }, (error) => {

            });
    }

    const createNotification = (type) => {
        return () => {
          switch (type) {
            case 'info':
              NotificationManager.info('Info message');
              break;
            case 'success':
              NotificationManager.success('Success message', 'Title here');
              break;
            case 'warning':
              NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
              break;
            case 'error':
              NotificationManager.error('Error message', 'Click me!', 5000, () => {
                alert('callback');
              });
              break;
          }
        };
      };

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
        console.log(messages.message_list,"messages.message_list....")

    }


    useEffect(() => {
        scrollToBottom();
    }, [randomNumber])

// console.log(FriendUserId);
    useEffect(()=>{
    // initialize  agora
//         var client = AgoraRTC.createClient({mode: 'live', codec: "h264"});
//
//         client.init(<APPID>, function () {
//             console.log("AgoraRTC client initialized");
//         }, function (err) {
//             console.log("AgoraRTC client init failed", err);
//         });
//
//
//             // enableVideo
//             localStream.init(function() {
//                 console.log("getUserMedia successfully");
//                 localStream.play('agora_local');
//             }, function (err) {
//                 console.log("getUserMedia failed", err);
//             });
//
//
// // -------------------------------------------------------
//             //join channel
//             client.join(<TOKEN_OR_KEY>, <CHANNEL_NAME>, <UID>, function(uid) {
//                 console.log("User " + uid + " join channel successfully");
//             }, function(err) {
//                 console.log("Join channel failed", err);
//             });
//
//                 //publish local stream
//                 client.publish(localStream, function (err) {
//                     console.log("Publish local stream error: " + err);
//                 });
//
//                 client.on('stream-published', function (evt) {
//                     console.log("Publish local stream successfully");
//                 });
//
//                 //subscribe remote stream
//                 client.on('stream-added', function (evt) {
//                     var stream = evt.stream;
//                     console.log("New stream added: " + stream.getId());
//                     client.subscribe(stream, function (err) {
//                     console.log("Subscribe stream failed", err);
//                 });
//                 });
//
//                 client.on('stream-subscribed', function (evt) {
//                     var remoteStream = evt.stream;
//                     console.log("Subscribe remote stream successfully: " + remoteStream.getId());
//                     remoteStream.play('agora_remote' + remoteStream.getId());
//                 })
// /* -------------------------------------------- */
//                 //leave channel
//
//
//                 client.leave(function () {
//                     console.log("Leave channel successfully");
//                 }, function (err) {
//                     console.log("Leave channel failed");
//                 });
//


                window.setTimeout(() => {
            $('#uploadfile').bind('change', function(e){
                var data = e.originalEvent.target.files[0];
                const fileName = data.name.split(".");
                const imageFormat = fileName[fileName.length - 1];
                if (imageFormat === "png" || imageFormat === "jpg" || imageFormat === "jpeg" ||
                    imageFormat === "PNG" || imageFormat === "JPG" || imageFormat === "JPEG") {
                    readThenSendFile(data);
                }
                else {
                    createNotification('error')
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
            console.log(messageList, "CompleteMessageList")
            let messagesList = messageList;
            if (!!messages) {

                if ((messages.obj.user_from_id === userData.user_id && messages.obj.user_to_id === receiver_id)
                    ||
                    (messages.obj.user_from_id === receiver_id && messages.obj.user_to_id === userData.user_id)
                ) { // check one-to-one data sync
                    messagesList.push(messages.obj);
                    messageList = messagesList;
                    console.log(messagesList, "messageList...")
                    setMessages(messagesList);
                    setRandomNumber(Math.random());
                    scrollToBottom()
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
        });
        SOCKET.on('voice', function(arrayBuffer) {
            let messagesList = messageList;
            console.log(messageList, "CompleteMessageList")
            if (!!arrayBuffer) {
                if ((arrayBuffer.obj.user_from_id === userData.user_id && arrayBuffer.obj.user_to_id === receiver_id)
                    ||
                    (arrayBuffer.obj.user_from_id === receiver_id && arrayBuffer.obj.user_to_id === userData.user_id)
                ) {
                    messagesList.push(arrayBuffer.obj);
                    messageList = messagesList;
                    console.log(messagesList, "messageList... pic")
                    setMessages(messagesList);
                    setuserMessage(''); //Empty user input here
                    setRandomNumber(Math.random());
                    scrollToBottom()
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
            SOCKET.disconnect();
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
                                <div className="vc-action-tab ml-auto mr-4">
              <span>
                <i className="fas fa-crown" />
              </span>
                                    <span className="member-type">VIP</span>
                                </div>
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

                                            { Likes.map((item, i) => {
                                                return   <li className="nav-item">
                                                    <a className="nav-link" href="#chat-field" data-toggle="tab" role="tab">
                                                        <img alt={item.liked_user_name} className="img-circle medium-image" src={item.liked_user_pic} />
                                                        <div className="contacts_info">
                                                            <div className="user_detail">
                                                                <span className="message-time">{item.created_at}</span>
                                                                <h5 className="mb-0 name">{item.liked_user_name}</h5>
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
                                        {/* } */}
                                    </div>
                                </div>
                                <div id="visitors" className="contacts-outter-wrapper tab-pane fade" role="tabpanel" aria-labelledby="tab-visitors">
                                    <div className="contacts-outter">
                                        <ul className="nav contacts" role="tablist">

                                            { Visitors.map((item, i) => {
                                                return <li className="nav-item">
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
                                            })}

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
                                        <img alt="Mia" className="img-circle medium-image" src={AllData.profile_images}/>
                                        <div className="chat-user-info ml-2">
                                            <h5 className="mb-0 name">{AllData.first_name}</h5>
                                            <div className="info">{AllData.occupation},  {AllData.age}</div>
                                        </div>
                                    </div>
                                    <div className="chat-call-opt">
                                        <a className="bg-grd-clr" onClick = {handleCall} href="javascript:void(0)">
                                            <i className="fas fa-phone-alt" />
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
                                                                            <img src={data.media}/>
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
                                                                            <img src={data.media}/>
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
                                                <a href="javascript:void(0)">
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
                        {/* End chat box here */}
                    </div>
                </div>
            </div>
        </section>
    )
}
export default ChatBox;