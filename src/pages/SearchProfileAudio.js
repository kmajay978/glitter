
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Logo from '../components/Logo';
import NavLinks from '../components/Nav';
import { VIDEO_CALL_START } from "../components/Api";
import { audioCall, audioCallUser, userProfile } from "../features/userSlice";
import { generateAudioChatToken } from "../api/videoApi";
import GlitterCard from "react-tinder-card";
import { addDefaultSrc, returnDefaultImage } from "../commonFunctions";

const SearchProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [user_to, setUserTo] = useState({ image: "" });
  // let videoCallState = useSelector(audioCallUser); //using redux useSelector here
  let videoCallState = JSON.parse(localStorage.getItem("audio_call")) //using redux useSelector here

  const userData = useSelector(userProfile).user.profile; //using redux useSelector here
  useEffect(() => {
    document.getElementById("stacked-cards-block").classList.remove("init");
    // call api to post data...
    if (!videoCallState.user_from_id && !videoCallState.user_to_id) {
      // redirect..
      //history.push("/chat");
    }
    else {
      setUserTo({ image: videoCallState.user_to_image })
      // const bodyParameters = videoCallState;
      const bodyParameters = {
        session_id: localStorage.getItem("session_id"),
        user_id: videoCallState.user_to_id,
        type: 2
      }
      generateAudioChatToken(history, dispatch, bodyParameters, videoCallState)
    }
  }, [])

  const goToChat = () => {
    dispatch(audioCall(null))
    history.push("/chat")
  }
  return (
    <div>
      <section className="home-wrapper">
        <img className="bg-mask" src="/assets/images/mask-bg.png" alt="Mask" />
        <div className="header-bar">
          <div className="container-fluid p-0">
            <div className="row no-gutters">
              <div className="col-lg-4 p-3">
                <div className="d-flex flex-wrap align-items-center">
                  <div className="logo-tab d-flex justify-content-between align-items-start">
                    <a href="javascript:void(0)">
                      <Logo />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mx-auto align-self-center">
                <div className="vc-head-title d-flex flex-wrap align-items-center ml-5">
                  <div className="vc-user-name d-flex flex-wrap align-items-center">
                    <div className="name ml-2"><img src="/assets/images/clockwise.png" className="mr-3" alt="audio chat" />Audio chat</div>
                  </div>
                  <div className="remaining-coins ml-5">
                    <img src="/assets/images/diamond-coin.png" alt="Coins" />
                    <span>{!!userData ? userData.coins : "0"}</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 p-3">
                <div className="tab-top d-flex flex-wrap align-items-center justify-content-end">
                  <NavLinks />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="home-inner">
          <div className="container-fluid p-0">
            <div className="row no-gutters">
              <div className="col-lg-9 main-bar p-3 searching-profile-wrapper mx-auto">
                <div className="profile-swipe-wrapper">
                  <div id="stacked-cards-block" className="stackedcards stackedcards--animatable init">
                    <div className="pulse">
                      <span className="searching-label">
                        Connecting
                    </span>
                      <div className="one" />
                      <div className="two" />
                      <div className="three" />
                    </div>
                    {/* <div className="cancel-call">
                    <a href="javascript:void(0)" onClick={goToChat} style={{color:"#F3C661"}}>
                      Cancel
                    </a>

                  </div>    */}

                    <div className="cardContainer">

                      <GlitterCard className="swipe"   >
                        <div className="user__card position-relative">
                          <img onError={(e) => addDefaultSrc(e)} src={!!user_to.image ? user_to.image : returnDefaultImage()} alt="Emma" width="100%" />
                        </div>

                      </GlitterCard>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="screen-recorder-modal">
        <h4>You can’t screen Capture or record</h4>
        <img src="/assets/images/record-screen.png" className="my-4 d-block mx-auto" alt="record-screen" />
        <a href="javascript:void(0)" className="btn bg-grd-clr mb-4">Got It</a>
        <p>Activate their ID in our moderation system they can take Screen record or video record the screen for security purpose . </p>
      </div>
    </div>


  )
}
export default SearchProfile;



