
import React, { useState, useEffect } from "react";
import $ from 'jquery';
import { useHistory, useParams } from 'react-router';
import axios from "axios";
import Logo from '../components/Logo';
import { SOCKET } from '../components/Config';
import NavLinks from '../components/Nav';
import { css } from "@emotion/core";
import { joinChannel, leaveEventAudience, leaveEventHost } from "../components/VideoComponent";
import { useSelector, useDispatch } from "react-redux";
import { userProfile, videoCall, videoCallUser } from "../features/userSlice";
import { addDefaultSrc, changeGiftLinkDomain, changeImageLinkDomain, checkLiveDomain, returnDefaultImage } from "../commonFunctions";
import BarLoader from "react-spinners/BarLoader";
import useToggle from "../components/CommonFunction";
import { GIFT_LIST_API } from "../components/Api";

let videoCallStatus = 0, videoCallParams, interval, callType = 0,
  messageList = [], allGifts = [], removeGiftInterval,
  manageCoinsTimeViewsInterval, manageCoinsTimeViewsCounter = 0, manageTimeInterval, hostCallCheck = true

const clearChatState = (dispatch) => {
  dispatch(videoCall(null))
}

const override = css`
  display: block;
  margin: 10px auto;
  border-radius: 50px !important;
  width: 95%;
`;


const SearchProfile = () => {
  const [user, setUserData] = useState(null);
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const videoCallState = useSelector(videoCallUser); //using redux useSelector here

  const [isExpired, setIsExpired] = useState(false);
  const [totalCoinsLeft, setTotalCoinsLeft] = useState(null);
  const [totalTimeLeft, setTotalTimeLeft] = useState(null);
  const [chatTyping, setChatTyping] = useState("");
  const [CompleteMessageList, setMessages] = useState([]);

  let [loading, setLoading] = useState(false);
  const [UserMessage, setuserMessage] = useState('');
  const [friendGift, setFriendGift] = useState([]);
  const [randomNumberGift, setRandomNumberGift] = useState('');
  const [randomNumber, setRandomNumber] = useState('');
  const [isOn, toggleIsOn] = useToggle();
  const [GiftData, setGiftData] = useState([]);
  const [givenGift, setGivenGift] = useState();
  const [reRenderGifts, setReRenderGifts] = useState('');


  const userData = useSelector(userProfile).user.profile; //using redux useSelector here
  console.log(userData, "userdata..")
  const componentWillUnmount = () => {
    if (videoCallStatus == 3) {
      console.log(videoCallParams, "videoCallParams... test")
      SOCKET.emit("unauthorize_video_call", {
        sender: { user_from_id: videoCallParams.user_from_id, session_id: localStorage.getItem("session_id") },
        reciever_id: videoCallParams.user_to_id,
        channel_name: videoCallParams.channel_name,
        type: callType,
        status: 3
      });
      videoCallStatus = 0;
    }
    localStorage.removeItem("videoCallPageRefresh");
    clearChatState(dispatch);
    clearInterval(removeGiftInterval);
    clearInterval(manageCoinsTimeViewsInterval);
    clearInterval(manageTimeInterval);
    window.location.href = "/chat";
  }
  useEffect(() => {
    if (!!userData) {
      setUserData(userData)
    }
  }, [userData])
  useEffect(() => {
    if (!params.channel_name) {
      componentWillUnmount()
    }
    else {
      const getPageRefresh = localStorage.getItem("videoCallPageRefresh");
      videoCallParams = {
        user_from_id: params.user_from_id,
        user_to_id: params.user_to_id,
        channel_id: params.channel_id,
        channel_name: params.channel_name,
        channel_token: null,
        user_to_image: null
      }

      document.getElementsByClassName("vc-screen")[0]
        .setAttribute("id", (params.receiver == "false" ? "video-sender" : "video-receiver"))


      if (!getPageRefresh) {
        // SOCKET.connect();
        // if (params.receiver == "true") {
        console.log(params, "params...");
        dispatch(videoCall(videoCallParams))
        // }
        localStorage.setItem("videoCallPageRefresh", "1");
      }
      else {
        videoCallStatus = 3
         componentWillUnmount()
      }
      // check with backend + socket if this channel exist...
      if (params.receiver == "false") {
        console.log(videoCallState, "test..")
      }
      console.log(videoCallParams, "videoCallParams...")
      setLoading(true);
      SOCKET.emit("authenticate_video_call", {
        sender: { user_from_id: videoCallParams.user_from_id, session_id: localStorage.getItem("session_id") },
        reciever_id: videoCallParams.user_to_id,
        channel_name: videoCallParams.channel_name,
        type: callType,
        videoCallState: params.receiver == "false" ? videoCallState : null
      });
      SOCKET.emit("authenticate_one_to_one_video_message", {
        sender_id: Number(videoCallParams.user_from_id),
        user_id: Number(userData.user_id),
        channel_name: videoCallParams.channel_name
    });
    }
    SOCKET.on('unauthorize_video_call', (data) => {
      if ((data.user_from_id == videoCallParams.user_from_id && data.user_to_id == videoCallParams.user_to_id)
        ||
        (data.user_from_id == videoCallParams.user_to_id && data.user_to_id == videoCallParams.user_from_id)
      ) { // check one-to-one data sync.
        componentWillUnmount()
      }
    });

    SOCKET.on('end_one_to_one_video_call_no_coin_warning', (data) => {
      if (data.channel_name == videoCallParams.channel_name) {
        if (Number(userData.user_id) === data.user_id) {
          alert("No coins Left")
          endCall(false)
        }
        else { // audience..
          alert("Your friend is left with no coins. Sorry the call is declining.")
          endCall(false)
        }
      }
    })

    SOCKET.on('end_one_to_one_video_call_warning', (data) => {
      if (data.channel_name == videoCallParams.channel_name) {
        if (Number(userData.user_id) === data.user_id) {
          alert(data.msg)
          endCall(false)
        }
        else { // audience..
          alert(data.msg)
          endCall(false)
        }
      }
    })

    SOCKET.on('send_one_to_one_video_item', (message) => {
      let messagesList = messageList;
      console.log(message, "messages...test")

      if (
          // message.sender_id == videoCallParams.user_id &&
          // message.user_id == videoCallState.user_id &&
          videoCallParams.channel_name == message.channel_name) { //check one-to-one data sync
          if (!!message.message.message) {
              if (message.sender_id == videoCallParams.user_from_id &&
                  message.user_id == userData.user_id) {
                  alert(message.message.message)
              }
          }
          else {
              if (message.message.chat_type === 0) {
                  const new_message = {
                      message: message.message.text_message,
                      message_sender_name: message.message.message_sender_name,
                      receiver_id: userData.user_id,
                      user_id: videoCallParams.user_from_id
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
                      gift: changeGiftLinkDomain() + message.message.giftImage,
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
              }
          }

      }

  });

    SOCKET.on('get_messages_one_to_one_video', (messages) => { // only one time
      if (messages.sender_id == videoCallParams.user_from_id &&
          messages.user_id == userData.user_id &&
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

  SOCKET.on('typing_one_to_one_video_message', (typing) => { // only one time
      if (videoCallParams.channel_name == typing.channel_name) {
          if (typing.user_id !== userData.user_id) {
              setChatTyping(typing.typing_user)
              window.setTimeout(() => {
                  setChatTyping("")
              }, 2000)
          }
      }
  })

    SOCKET.on('one_to_one_video_manage_coins_time_views', (data) => {
      if (data.channel_name === videoCallParams.channel_name && userData.user_id == data.user_id) {
        if (data.msg === "") {
          setTotalCoinsLeft(data.coins);
        }
        else {
          alert(data.msg)
        }
      }
    })

    SOCKET.on('one_to_one_video_manage_time', (data) => {
      if (data.channel_name == videoCallParams.channel_name) {
        setTotalTimeLeft(data.time)
      }
    })

    SOCKET.on('timeCounter_video_call', (data) => {
      if ((data.user_from_id == videoCallParams.user_from_id && data.user_to_id == videoCallParams.user_to_id)
        ||
        (data.user_from_id == videoCallParams.user_to_id && data.user_to_id == videoCallParams.user_from_id)
      ) { // check one-to-one data sync
        if (data.isExpired) {
          componentWillUnmount()
        }
      }
    });

    SOCKET.on('sender_show_video_call', (data) => {
      if ((data.user_from_id == videoCallParams.user_from_id && data.user_to_id == videoCallParams.user_to_id)
        ||
        (data.user_from_id == videoCallParams.user_to_id && data.user_to_id == videoCallParams.user_from_id)
      ) { // check one-to-one data sync
        if (!!userData && (data.user_from_id == userData.user_id)) {
          const option = {
            appID: "52cacdcd9b5e4b418ac2dca58f69670c",
            channel: videoCallState.channel_name,
            uid: 0,
            token: videoCallState.channel_token,
            key: '',
            secret: ''
          }
          joinChannel('audience', option)
          interval = window.setInterval(() => {
            var list = document.getElementById("local_stream");   // Get the <ul> element with id="myList"
            if (!!list) {
              list.remove() // Remove <ul>'s first child node (index 0)
              clearInterval(interval)
            }
          }, 1000)
        }
      }
    })

    const liveVideoManageCoinsTimeViews = () => {
      SOCKET.emit("one_to_one_video_manage_coins_time_views", {
        channel_name: videoCallParams.channel_name,
        user_id: userData.user_id,
        sender_id: videoCallParams.user_from_id,
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

    SOCKET.on('authorize_video_call', (data) => {
      if ((data.user_from_id == videoCallParams.user_from_id && data.user_to_id == videoCallParams.user_to_id)
        ||
        (data.user_from_id == videoCallParams.user_to_id && data.user_to_id == videoCallParams.user_from_id)
      ) { // check one-to-one data sync

        // change backend status === 1 if loggedIn user is "user_to"

        if (!!userData && (data.user_to_id == userData.user_id)) {
          manageLiveAudienceHostDetails()
          SOCKET.emit("acknowledged_video_call", {
            sender: { user_from_id: videoCallParams.user_from_id, session_id: localStorage.getItem("session_id") },
            reciever_id: videoCallParams.user_to_id,
            channel_name: videoCallParams.channel_name,
            type: callType,
            status: 1
          });
          // initate video call for receiver...
          const option = {
            appID: "52cacdcd9b5e4b418ac2dca58f69670c",
            channel: data.videoCallState.channel_name,
            uid: 0,
            token: data.videoCallState.channel_token,
            key: '',
            secret: ''
          }
          joinChannel('audience', option);
          joinChannel('host', option);
          interval = window.setInterval(() => {
            var list = document.getElementById("remote_video_");
            console.log("host video attached1")
            if (!!list) {
              console.log("host video attached2", list)
              if (list.childNodes.length > 1) {
                list.removeChild(list.childNodes[0]);
              }
              clearInterval(interval)// Remove <ul>'s first child node (index 0)
            }
          }, 1000)

          // add timer... after 1 min to detect the expire of the link

          SOCKET.emit("timeCounter_video_call", {
            sender: { user_from_id: videoCallParams.user_from_id, session_id: localStorage.getItem("session_id") },
            reciever_id: videoCallParams.user_to_id,
            channel_name: videoCallParams.channel_name,
            type: callType,
            status: 1
          });
        }
        else {
          // initate video call for sender...
          if (hostCallCheck) {
            manageLiveAudienceHostDetails()
            manageTimeInterval = window.setInterval(() => {
              SOCKET.emit("one_to_one_video_manage_time", {
                channel_name: videoCallState.channel_name
              })
            }, 1000)
            const option = {
              appID: "52cacdcd9b5e4b418ac2dca58f69670c",
              channel: videoCallState.channel_name,
              uid: 0,
              token: videoCallState.channel_token,
              key: '',
              secret: ''
            }
            joinChannel('host', option);
            hostCallCheck = false;
          }

          interval = window.setInterval(() => {
            var list = document.getElementById("remote_video_");
            var list_local = document.getElementById("local_stream");   // Get the <ul> element with id="myList"
            console.log("host video attached3")
            if (!!list) {
              console.log("host video attached4", list)
              if (list.childNodes.length === 3) {
                list.removeChild(list.childNodes[1]);
              }
              // clearInterval(interval)// Remove <ul>'s first child node (index 0)
            }
            if (!!list_local) {
              if (list_local.childNodes.length > 1) {
                list_local.removeChild(list_local.childNodes[1]);
              }
              // Remove <ul>'s first child node (index 0)
              // clearInterval(interval)
            }
          }, 1000)
        }
      }
    });

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

  const endCall = (showMsg) => {
    if (params.receiver == "false") {
      SOCKET.emit("sender_decline_video_call", {
        sender: { user_from_id: videoCallParams.user_from_id },
        reciever_id: videoCallParams.user_to_id,
        channel_name: videoCallParams.channel_name,
        showMsg,
        type: callType,
        status: 2
      });
    }
    else {
      SOCKET.emit("receiver_decline_video_call", {
        sender: { user_from_id: videoCallParams.user_from_id },
        reciever_id: videoCallParams.user_to_id,
        channel_name: videoCallParams.channel_name,
        showMsg,
        type: callType,
        status: 2
      });
    }
  }

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

  const CheckTextInputIsEmptyOrNot = (e) => {
    e.preventDefault()
    if (UserMessage != '') {
        var message = {
            "firstName": userData.first_name,
            "lastName": userData.last_name,
            "user_id": Number(userData.user_id),
            "text_message": UserMessage,
            "channel_name": videoCallParams.channel_name,
            "sender_id": Number(videoCallParams.user_from_id),
            "type": 0,
            "gift_id": null,
            "is_send_heart": 0,
            "coins": 0,
            "message_sender_name": userData.first_name + " " + userData.last_name
        }
        SOCKET.emit("send_one_to_one_video_item", message);
        setuserMessage(''); //Empty user input here
    } else {
        console.log("Please enter message")
    }
}
const changeInput = (e) => {
  setuserMessage(e.target.value)
  SOCKET.emit("typing_one_to_one_video_message", {
      user_id: userData.user_id,
      typing_user: userData.first_name + " " + userData.last_name,
      channel_name: videoCallParams.channel_name
  })
}

useEffect(() => {
  scrollToBottom();
}, [randomNumber])

useEffect(() => {
  scrollToTop();
}, [randomNumberGift])


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
      "user_id": Number(userData.user_id),
      "text_message": "",
      "channel_name": videoCallParams.channel_name,
      "sender_id": Number(userData.user_id) === Number(videoCallParams.user_from_id) ? Number(videoCallParams.user_to_id) : Number(videoCallParams.user_from_id),
      "type": 1,
      "gift_id": giftId,
      "is_send_heart": 0,
      "coins": 0,
      "message_sender_name": userData.first_name + " " + userData.last_name
  }

  SOCKET.emit('send_one_to_one_video_item', message);
  setGivenGift('');
  //  setLoading(true);
  toggleIsOn(false);
}
  return (
    <section className="home-wrapper">
      <img className="bg-mask" src="/assets/images/mask-bg.png" alt="Mask" />
      <div className="header-bar">
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
                      {
                        !user &&
                        <img src={changeImageLinkDomain() + "1611574536_download.jpg"} alt="placeholder" />
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
              <div className="tab-top d-flex flex-wrap-wrap align-items-center">
                <div className="vc-action-tab ml-auto mr-4 position-relative">
                  {/* <div className="vc-action-btn">
                <span />
                <span />
                <span />
              </div> */}
                  {/* <ul className="action-menu">
                <li>
                  <a href="javascript:void(0)">Report</a>
                </li>
                <li>
                  <a href="javascript:void(0)">Block</a>
                </li>
                <li>
                  <a href="javascript:void(0)" onClick={endCall}>End Video</a>
                </li>
              </ul> */}
                </div>
                <NavLinks />
                <a href="javascript:void(0)" className="end-video bg-grd-clr" onClick={() => endCall(true)}>End Video</a>
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
              style={{ width: "100%", height: "100%" }}
            />
        
        <div class="gift-sender" id="giftSender">
                            {
                                friendGift.map((item, index) => (
                                    <div className="gifter" id={item.gift}>
                                        <img src={item.user} alt="gifter" />
                                        <div className="gifter__info">
                                            <h6>{item.f_name + " " + item.l_name}</h6>
                                            <span>Sent a {item.gift_name}</span>
                                        </div>
                                        <div className="gifter__media">
                                            <img src={item.gift} alt="gift" />
                                        </div>
                                    </div>
                                ))

                            }

                        </div>

          {
            (!!userData && !!videoCallParams && userData.user_id == videoCallParams.user_from_id) &&
            <div className="charges-reminder-txt">
              <p>After 25 Seconds, you will be charged 120 coins per minute</p>
            </div>
          }
          <div className="vc-timer-box text-center">
            <div className="timer">
              <i className="far fa-clock"></i>
              <span>{totalTimeLeft}</span>
            </div>
            {/* <div className="vc-sppiner">
           <a className="sppiner bg-grd-clr" href="javascript:void(0)">
             <img src="/assets/images/sppiner.png" alt="Sppiner"/>
           </a>
         </div> */}
          </div>
          <div className="vc-option-block d-flex flex-wrap align-items-end">
         <div className="vc-options">
           <ul>
             {/* <li>
               <a className="btn-round bg-grd-clr" href="javascript:void(0)">
                 <img src="/assets/images/magic-stick.png" alt="Magic"/>
               </a>
             </li>
             <li>
               <a className="btn-round bg-grd-clr" href="javascript:void(0)">
                 <img src="/assets/images/chat.png" alt="Chat"/>
               </a>
             </li> */}
             <li>
               <a className="btn-round bg-grd-clr" href="javascript:void(0)" onClick={handleGift}>
                 <img src="/assets/images/gift.png" alt="Gift"/>
               </a>
             </li>
             {/* <li>
               <a className="btn btn-nxt bg-grd-clr" href="javascript:void(0)">Next</a>
             </li> */}
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
                        <a href="javascript:void(0)" className="close-gift-btn modal-close" onClick={toggleIsOn}><img src="/assets/images/btn_close.png" /></a>
                        <div className="all-gift-header d-flex flex-wrap align-items-center mb-3">
                            <h5 className="mb-0 mr-4">Send Gift</h5>
                            <div className="remaining-coins">
                                <img src="/assets/images/diamond-coin.png" alt="Coins" />
                                <span> {totalCoinsLeft !== null && totalCoinsLeft}</span>
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
export default SearchProfile;



