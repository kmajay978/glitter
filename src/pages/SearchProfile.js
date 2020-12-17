
import React, { useState, useEffect } from "react";
import {  useHistory } from 'react-router';
import axios from "axios";

const SearchProfile = () =>{
    return(
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
                  <img src="/assets/images/glitters.png" alt="Glitters" />
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
                <span>152</span>
              </div>
            </div>
          </div>
          <div className="col-lg-4 p-3">
            <div className="tab-top d-flex flex-wrap align-items-center justify-content-end">
              <ul className="feature-menu">
                <li>
                  <a href="javascript:void(0)">
                    <i className="fas fa-compass" />
                    <span>Discover</span>
                  </a>
                </li>
                <li className="active">
                  <a href="javascript:void(0)">
                    <i className="fas fa-video" />
                    <span>Video Chat</span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <img src="/assets/images/Album.png" alt="album" />
                    <span>Activity</span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <i className="fas fa-user" />
                    <span>Profile</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="home-inner">
      <div className="container-fluid p-0">
        <div className="row no-gutters">
          <div className="col-lg-9 main-bar p-3 searching-profile-wrapper">
            <div className="profile-swipe-wrapper">
              <div className="stage">
                <div id="stacked-cards-block" className="stackedcards stackedcards--animatable init">
                  <div className="pulse">
                    <span className="searching-label">
                      Searching
                    </span>
                    <div className="one" />
                    <div className="two" />
                    <div className="three" />
                  </div>
                  <div className="cancel-call">
                    Cancel
                  </div>   
                  <div className="stackedcards-container">
                    <div className="card">
                      <div className="card-content">
                        <div className="card-image"><img src="/assets/images/profile-card.png" alt="Emma" width="100%" height="100%" /></div>
                        {/*
                                          <div class="card-titles">
                                              <h3>Emma, 22</h3>
                                              <span>72km, Lawyer</span>
                                          </div>
*/}
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-content">
                        <div className="card-image"><img src="/assets/images/profile-card.png" alt="Emma" width="100%" height="100%" /></div>
                        {/*
                                          <div class="card-titles">
                                              <h3>Emma, 22</h3>
                                              <span>72km, Lawyer</span>
                                          </div>
*/}
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-content">
                        <div className="card-image"><img src="/assets/images/profile-card.png" alt="Emma" width="100%" height="100%" /></div>
                        {/*
                                          <div class="card-titles">
                                              <h3>Emma, 22</h3>
                                              <span>72km, Lawyer</span>
                                          </div>
*/}
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-content">
                        <div className="card-image"><img src="/assets/images/profile-card.png" alt="Emma" width="100%" height="100%" /></div>
                        <div className="card-titles">
                          <h3>Emma, 22</h3>
                          <span>72km, Lawyer</span>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-content">
                        <div className="card-image"><img src="/assets/images/profile-card.png" alt="Emma" width="100%" height="100%" /></div>
                        {/*
                                          <div class="card-titles">
                                              <h3>Emma, 22</h3>
                                              <span>72km, Lawyer</span>
                                          </div>
*/}
                      </div>
                    </div>
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
                <div className="daily-matches">
                  <span className="daily-matches__counter">Match: 1280 - Success: 34 - Score: 100</span>
                  <p className="daily-matches__txt">You have 1000 daily matches. Win 10 extra matches for each success. You will earn 5 points for each video chat</p>
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


