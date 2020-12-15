
import React, { useState, useEffect } from "react";
import {  useHistory } from 'react-router';
import axios from "axios";
import NavLinks from '../components/Nav';
const AnswerCalling = () =>{
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
    <div className="vc-incoming-wrapper active">
      <div className="vc-incoming-inner">
        <span className="btn-close">×</span>
        <div className="vc-ic-user text-center">
          <figure>
            <img src="/assets/images/incoming-answer.png" alt="Robert" />
            <figcaption>
              <h4>Robert, 25</h4>
              <span>65km, Coach</span>
            </figcaption>
          </figure>
        </div>
        <div className="vc-cta-btns d-flex flex-wrap align-items-center justify-content-between mt-5">
          <a className="btn bg-grd-clr cta-accept" href="javascript:void(0)">Accept</a>
          <a className="btn btn-trsp cta-reject" href="javascript:void(0)">Reject</a>
        </div>
      </div>
    </div>
  </div>
</section>


    )
}
export default AnswerCalling;



