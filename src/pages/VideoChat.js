
import React, { useState, useEffect } from "react";
import {  useHistory, useParams } from 'react-router';
import axios from "axios";
import Logo from '../components/Logo';
import {SOCKET} from '../components/Config';
import NavLinks from '../components/Nav';
import { joinChannel, leaveEventAudience, leaveEventHost } from "../components/VideoComponent";
import {useSelector, useDispatch} from "react-redux";
import {userProfile, videoCall, videoCallUser} from "../features/userSlice";

let videoCallStatus = 0, videoCallParams;

const clearChatState = (dispatch) => {
  dispatch(videoCall(null))
}

const SearchProfile = () =>{
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const videoCallState = useSelector(videoCallUser); //using redux useSelector here

  const [isExpired, setIsExpired] = useState(false);

  const userData = useSelector(userProfile).user.profile; //using redux useSelector here

  const componentWillUnmount = () => {
    if (videoCallStatus == 3) {
      alert(3333)
      SOCKET.emit("unauthorize_video_call", {
        sender: {user_from_id: videoCallParams.user_from_id, session_id: localStorage.getItem("session_id")},
        reciever_id: videoCallParams.user_to_id,
        channel_name: params.channel_name,
        type: 0,
        status: 3
      });
    }
    localStorage.removeItem("videoCallPageRefresh");
    clearChatState(dispatch);
    history.push("/chat");
  }

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
      if (!getPageRefresh) {
        // SOCKET.connect();
        // if (params.receiver == "true") {
        alert("no page refreshg")
        console.log(params, "params...");
          dispatch(videoCall(videoCallParams))
        // }
        localStorage.setItem("videoCallPageRefresh", "1");
      }
      else {
        alert("change status...")
        videoCallStatus = 3
         componentWillUnmount(videoCallStatus)
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
        type: 0,
        videoCallState: params.receiver == "false" ? videoCallState : null
      });
    }
    SOCKET.on('unauthorize_video_call', (data) => {
        if ((data.user_from_id == videoCallParams.user_from_id && data.user_to_id == videoCallParams.user_to_id)
            ||
            (data.user_from_id == videoCallParams.user_to_id && data.user_to_id == videoCallParams.user_from_id)
        ) { // check one-to-one data sync
          alert("leaving...")
          componentWillUnmount()
          alert("unauthorize...");
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
        if (data.user_from_id == userData.user_id) {
          const option = {
            appID: "52cacdcd9b5e4b418ac2dca58f69670c",
            channel: videoCallState.channel_name,
            uid: 0,
            token: videoCallState.channel_token,
            key: '',
            secret: ''
          }
          alert("sender receive acjnowledged connection....")
          joinChannel('audience', option)
        }
      }
    })
          SOCKET.on('authorize_video_call', (data) => {
      if ((data.user_from_id == videoCallParams.user_from_id && data.user_to_id == videoCallParams.user_to_id)
          ||
          (data.user_from_id == videoCallParams.user_to_id && data.user_to_id == videoCallParams.user_from_id)
      ) { // check one-to-one data sync

        // change backend status === 1 if loggedIn user is "user_to"

        if (data.user_to_id == userData.user_id) {
          SOCKET.emit("acknowledged_video_call", {
            sender: {user_from_id: videoCallParams.user_from_id, session_id: localStorage.getItem("session_id")},
            reciever_id: videoCallParams.user_to_id,
            channel_name: videoCallParams.channel_name,
            type: 0,
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
          alert("receiver")
          joinChannel('audience', option);
          joinChannel('host', option);

          // add timer... after 1 min to detect the expire of the link

          SOCKET.emit("timeCounter_video_call", {
            sender: {user_from_id: videoCallParams.user_from_id, session_id: localStorage.getItem("session_id")},
            reciever_id: videoCallParams.user_to_id,
            channel_name: videoCallParams.channel_name,
            type: 0,
            status: 1
          });
        }
        else {
          // initate video call for sender...
          const option = {
            appID: "52cacdcd9b5e4b418ac2dca58f69670c",
            channel: videoCallState.channel_name,
            uid: 0,
            token: videoCallState.channel_token,
            key: '',
            secret: ''
          }
          alert("sender")
          joinChannel('host', option)
        }
      }
    });
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
                  <img src="/assets/images/vc-user.png" alt="Augusta Castro" />
                </figure>
                <div className="name ml-2">Augusta Castro <span className="age">20</span></div>
              </div>
              <div className="remaining-coins ml-4">
                <img src="/assets/images/diamond-coin.png" alt="Coins" />
                <span>152</span>
              </div>
            </div>
          </div>
        </div>
        <div>
            <button onClick={() => joinChannel('host')}>Join Channel as Host</button>
            <button onClick={() => joinChannel('audience')}>Join Channel as Audience</button>
            <button onClick={() => leaveEventHost('host')}>Leave Event Host</button>
            <button onClick={() => leaveEventAudience('audience')}>Leave Event Audience</button>
            <div id="local_stream" className="local_stream" style={{ width: "400px", height: "400px" }}></div>
            <div
                id="remote_video_"
                style={{ width: "400px", height: "400px" }}
            />
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
                  <a href="javascript:void(0)">End Video</a>
                </li>
              </ul>
            </div>
           <NavLinks />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="vc-screen-wrapper">
    <div className="vc-screen">
      <img src="/assets/images/video-chat-bg.jpg" alt="Video Calling" />
    </div>
    <div className="charges-reminder-txt">
      <p>After 25 Seconds, you will be charged 120 coins per minute</p>
    </div>
    <div className="vc-timer-box text-center">
      <div className="timer">
        <i className="far fa-clock" />
        <span>25 Sec</span>
      </div>
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
          <li>
            <a className="btn-round bg-grd-clr" href="javascript:void(0)">
              <img src="/assets/images/gift.png" alt="Gift" />
            </a>
          </li>
          <li>
            <a className="btn btn-nxt bg-grd-clr" href="javascript:void(0)">Next</a>
          </li>
        </ul>
      </div>
      <div className="self-video ml-3">
        <img src="/assets/images/vc-self.png" alt="Me" />
      </div>
    </div>
  </div>
</section>


    )
}
export default SearchProfile;



