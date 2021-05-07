
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Logo from '../components/Logo';
import NavLinks from '../components/Nav';
import { VIDEO_CALL_START } from "../components/Api";
import { videoCall, videoCallUser } from "../features/userSlice";
import { generateVideoChatToken } from "../api/videoApi";
import GlitterCard from "react-tinder-card";
import { userProfile } from "../features/userSlice";

const SearchProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [user_to, setUserTo] = useState({ image: "" });
  // let videoCallState = useSelector(videoCallUser); //using redux useSelector here
  let videoCallState = JSON.parse(localStorage.getItem("video_call"))
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
        type: 1
      }
      generateVideoChatToken(history, dispatch, bodyParameters, videoCallState)
    }
  }, [])

  const goToChat = () => {
    dispatch(videoCall(null))
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
                    <div className="name ml-2"><img src="/assets/images/clockwise.png" className="mr-3" alt="video chat" />video chat</div>
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
                          <img src={!!user_to.image ? user_to.image : "/assets/images/profile-card.png"} alt="Emma" width="100%" />
                        </div>

                      </GlitterCard>

                    </div>
                    <div className="daily-matches">
                      <span className="daily-matches__counter">Match: 1280 - Success: 34 - Score: 100</span>
                      <p className="daily-matches__txt">You have 1000 daily matches. Win 10 extra matches for each success. You will earn 5 points for each video chat</p>
                    </div>

                    <div className="stackedcards--animatable stackedcards-overlay top"><img src="https://image.ibb.co/m1ykYS/rank_army_star_2_3x.png" width="auto" height="auto" /></div>
                    <div className="stackedcards--animatable stackedcards-overlay right"><img src="/assets/images/accept-icon.png" width="auto" height="auto" /></div>
                    <div className="stackedcards--animatable stackedcards-overlay left"><img src="https://image.ibb.co/heTxf7/20_status_close_3x.png" width="auto" height="auto" /></div>
                  </div>
                  <div className="action-tray global-actions d-flex flex-wrap justify-content-center align-items-center">
                    <div className="close-btn tray-btn-s">
                      <a className="left-action" href="javascript:void(0)">×</a>
                    </div>
                    <div className="chat tray-btn-l">
                      <a href="javascript:void(0)">
                        <i className="fas fa-comment" />
                      </a>
                    </div>
                    <div className="video-chat tray-btn-l">
                      <a href="javascript:void(0)">
                        <i className="fas fa-video" />
                      </a>
                    </div>
                    <div className="like-profile tray-btn-s">
                      <a className="right-action" href="javascript:void(0)">
                        <i className="fas fa-heart" />
                      </a>
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



