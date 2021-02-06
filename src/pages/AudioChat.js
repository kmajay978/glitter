
import React, { useState, useEffect } from "react";
import {  useHistory, useParams } from 'react-router';
import axios from "axios";
import Logo from '../components/Logo';
import {SOCKET} from '../components/Config';
import NavLinks from '../components/Nav';
import { joinChannelAudio, leaveEventAudience, leaveEventHost } from "../components/VideoComponent";
import {useSelector, useDispatch} from "react-redux";
import {userProfile, audioCall, audioCallUser} from "../features/userSlice";
import {returnDefaultImage} from "../commonFunctions";

let videoCallStatus = 0, videoCallParams, interval, callType = 1;

const clearChatState = (dispatch) => {
  dispatch(audioCall(null))
}

const AudioChat = () =>{
  const [user, setUserData] = useState(null);
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const videoCallState = useSelector(audioCallUser); //using redux useSelector here

  const [isExpired, setIsExpired] = useState(false);

  const userData = useSelector(userProfile).user.profile; //using redux useSelector here
console.log(userData, "userdata..")
  const componentWillUnmount = () => {
    if (videoCallStatus == 3) {
      console.log(videoCallParams, "videoCallParams... test")
      SOCKET.emit("unauthorize_video_call", {
        sender: {user_from_id: videoCallParams.user_from_id, session_id: localStorage.getItem("session_id")},
        reciever_id: videoCallParams.user_to_id,
        channel_name: videoCallParams.channel_name,
        type: callType,
        status: 3
      });
      videoCallStatus = 0;
    }
    // localStorage.removeItem("videoCallPageRefresh");
    clearChatState(dispatch);
    window.location.href = "/chat";
  }
  useEffect(() =>{
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
          dispatch(audioCall(videoCallParams))
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
      SOCKET.emit("authenticate_video_call", {
        sender: {user_from_id: videoCallParams.user_from_id, session_id: localStorage.getItem("session_id")},
        reciever_id: videoCallParams.user_to_id,
        channel_name: videoCallParams.channel_name,
        type: callType,
        videoCallState: params.receiver == "false" ? videoCallState : null
      });
    }
    SOCKET.on('unauthorize_video_call', (data) => {
        if ((data.user_from_id == videoCallParams.user_from_id && data.user_to_id == videoCallParams.user_to_id)
            ||
            (data.user_from_id == videoCallParams.user_to_id && data.user_to_id == videoCallParams.user_from_id)
        ) { // check one-to-one data sync
          componentWillUnmount()
        }
    });

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
          joinChannelAudio('audience', option)
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
          SOCKET.on('authorize_video_call', (data) => {
      if ((data.user_from_id == videoCallParams.user_from_id && data.user_to_id == videoCallParams.user_to_id)
          ||
          (data.user_from_id == videoCallParams.user_to_id && data.user_to_id == videoCallParams.user_from_id)
      ) { // check one-to-one data sync

        // change backend status === 1 if loggedIn user is "user_to"

        if (!!userData && (data.user_to_id == userData.user_id)) {
          document.getElementById("audioCallingPic").setAttribute("src", "http://167.172.209.57/glitter-101/public/profile_images/"+data.users_detail[1].profilePics)
          SOCKET.emit("acknowledged_video_call", {
            sender: {user_from_id: videoCallParams.user_from_id, session_id: localStorage.getItem("session_id")},
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
          joinChannelAudio('audience', option);
          joinChannelAudio('host', option);
          interval = window.setInterval(() => {
            var list = document.getElementById("remote_video_");
            if (!!list) {
              if (list.childNodes.length > 1) {
                list.removeChild(list.childNodes[0]);
              }
              clearInterval(interval)// Remove <ul>'s first child node (index 0)
            }
          }, 1000)

          // add timer... after 1 min to detect the expire of the link

          SOCKET.emit("timeCounter_video_call", {
            sender: {user_from_id: videoCallParams.user_from_id, session_id: localStorage.getItem("session_id")},
            reciever_id: videoCallParams.user_to_id,
            channel_name: videoCallParams.channel_name,
            type: callType,
            status: 1
          });
        }
        else {
          document.getElementById("audioCallingPic").setAttribute("src", "http://167.172.209.57/glitter-101/public/profile_images/"+data.users_detail[0].profilePics)
          // initate video call for sender...
          const option = {
            appID: "52cacdcd9b5e4b418ac2dca58f69670c",
            channel: videoCallState.channel_name,
            uid: 0,
            token: videoCallState.channel_token,
            key: '',
            secret: ''
          }
          joinChannelAudio('host', option)
        }
      }
    });
  }, [])

  const endCall = () => {
    if (params.receiver == "false") {
      SOCKET.emit("sender_decline_video_call", {
        sender: {user_from_id: videoCallParams.user_from_id},
        reciever_id: videoCallParams.user_to_id,
        channel_name: videoCallParams.channel_name,
        type: callType,
        status: 2
      });
    }
    else {
      SOCKET.emit("receiver_decline_video_call", {
        sender: {user_from_id: videoCallParams.user_from_id},
        reciever_id: videoCallParams.user_to_id,
        channel_name: videoCallParams.channel_name,
        type: callType,
        status: 2
      });
    }
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
                  <a href="javascript:void(0)" onClick={endCall}>End Audio</a>
                </li>
              </ul>
            </div>
           <NavLinks />
            <a href="javascript:void(0)" className="end-video bg-grd-clr" onClick={endCall}>End Audio</a>
          </div>
        </div>
      </div>
    </div>
  </div> 
     <div className="vc-screen-wrapper">
       <div className="vc-screen audio-one-to-one">
       <div className="audio-calling">
         <div className="circle-ripple">
                <img id="audioCallingPic" style={{borderRadius: "50%"}} src={returnDefaultImage()} />
         </div>
           </div>

         <div id="local_stream" className="local_stream" style={{ width: "400px", height: "400px" }}></div>
         <div
             id="remote_video_"
             style={{ width: "100%", height: "100%" }}
         />

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
export default AudioChat;



