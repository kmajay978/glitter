
import React, { useState, useEffect } from "react";
import {  useHistory } from 'react-router';
import axios from "axios";
import NavLinks from '../components/Nav';

const ChatBox = () =>{
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
                <img src="/assets/images/glitters.png" alt="Glitters" />
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
              <a id="tab-like" href="#like" className="nav-link active" data-toggle="tab" role="tab">Like</a>
            </li>
            <li className="nav-item">
              <a id="tab-visitors" href="#visitors" className="nav-link" data-toggle="tab" role="tab">Visitors</a>
            </li>
            <li className="nav-item">
              <a id="tab-chat" href="#chat" className="nav-link" data-toggle="tab" role="tab">Chat</a>
            </li>
          </ul>
          <div className="tab-content" role="tablist">
            <div id="like" className="contacts-outter-wrapper tab-pane fade show active" role="tabpanel" aria-labelledby="tab-like">
              <div className="contacts-outter">
                <ul className="nav contacts" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link" href="#chat-field" data-toggle="tab" role="tab">
                      <img alt="Mia" className="img-circle medium-image" src="/assets/images/vc-user.png" />
                      <div className="contacts_info">
                        <div className="user_detail">
                          <span className="message-time">55 min</span>
                          <h5 className="mb-0 name">Mia</h5>
                          <div className="message-count">2</div>
                        </div>
                        <div className="vcentered info-combo">
                          <p>Yep, I'm new in town and I wanted</p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#chat-field" data-toggle="tab" role="tab">
                      <img alt="Mia" className="img-circle medium-image" src="/assets/images/vc-user.png" />
                      <div className="contacts_info">
                        <div className="user_detail">
                          <span className="message-time">55 min</span>
                          <h5 className="mb-0 name">Mia</h5>
                          <div className="message-count">2</div>
                        </div>
                        <div className="vcentered info-combo">
                          <p>Yep, I'm new in town and I wanted</p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#chat-field" data-toggle="tab" role="tab">
                      <img alt="Mia" className="img-circle medium-image" src="/assets/images/vc-user.png" />
                      <div className="contacts_info">
                        <div className="user_detail">
                          <span className="message-time">55 min</span>
                          <h5 className="mb-0 name">Mia</h5>
                          <div className="message-count">2</div>
                        </div>
                        <div className="vcentered info-combo">
                          <p>Yep, I'm new in town and I wanted</p>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div id="visitors" className="contacts-outter-wrapper tab-pane fade" role="tabpanel" aria-labelledby="tab-visitors">
              <div className="contacts-outter">
                <ul className="nav contacts" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link" href="#chat-field" data-toggle="tab" role="tab">
                      <img alt="Mia" className="img-circle medium-image" src="/assets/images/vc-user.png" />
                      <div className="contacts_info">
                        <div className="user_detail">
                          <span className="message-time">55 min</span>
                          <h5 className="mb-0 name">Mia</h5>
                          <div className="message-count">2</div>
                        </div>
                        <div className="vcentered info-combo">
                          <p>Yep, I'm new in town and I wanted</p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#chat-field" data-toggle="tab" role="tab">
                      <img alt="Mia" className="img-circle medium-image" src="/assets/images/vc-user.png" />
                      <div className="contacts_info">
                        <div className="user_detail">
                          <span className="message-time">55 min</span>
                          <h5 className="mb-0 name">Mia</h5>
                          <div className="message-count">2</div>
                        </div>
                        <div className="vcentered info-combo">
                          <p>Yep, I'm new in town and I wanted</p>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div id="chat" className="contacts-outter-wrapper tab-pane fade" role="tabpanel" aria-labelledby="tab-chat">
              <div className="contacts-outter">
                <ul className="nav contacts" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link" href="#chat-field" data-toggle="tab" role="tab">
                      <img alt="Mia" className="img-circle medium-image" src="/assets/images/vc-user.png" />
                      <div className="contacts_info">
                        <div className="user_detail">
                          <span className="message-time">55 min</span>
                          <h5 className="mb-0 name">Mia</h5>
                          <div className="message-count">2</div>
                        </div>
                        <div className="vcentered info-combo">
                          <p>Yep, I'm new in town and I wanted</p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#chat-field" data-toggle="tab" role="tab">
                      <img alt="Mia" className="img-circle medium-image" src="/assets/images/vc-user.png" />
                      <div className="contacts_info">
                        <div className="user_detail">
                          <span className="message-time">55 min</span>
                          <h5 className="mb-0 name">Mia</h5>
                          <div className="message-count">2</div>
                        </div>
                        <div className="vcentered info-combo">
                          <p>Yep, I'm new in town and I wanted</p>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
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
                <img alt="Mia" className="img-circle medium-image" src="/assets/images/vc-user.png" />
                <div className="chat-user-info ml-2">
                  <h5 className="mb-0 name">Mia</h5>
                  <div className="info">Art. Director, 21</div>
                </div>
              </div>
              <div className="chat-call-opt">
                <a className="bg-grd-clr" href="javascript:void(0)">
                  <i className="fas fa-phone-alt" />
                </a>
              </div>
            </div>
            <div className="chat-date text-center my-2">Today</div>
            <div className="message-chat">
              <div className="chat-body">
                <div className="message info">
                  <div className="message-body">
                    <div className="message-text">
                      <p>Lorem ipsum dolor</p>
                    </div>
                  </div>
                </div>
                <div className="message my-message">
                  <div className="message-body">
                    <div className="message-body-inner">
                      <div className="message-text">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="message info">
                  <div className="message-body">
                    <div className="message-text">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="chat-footer">
                <label className="upload-file">
                  <div>
                    <input type="file" required />
                    <i className="far fa-image" />
                  </div>
                </label>
                <textarea className="send-message-text" placeholder="Message..." defaultValue={""} />
                <label className="gift-message bg-grd-clr">
                  <a href="javascript:void(0)">
                    <i className="fas fa-gift" />
                  </a>
                </label>
                <label className="record-message">
                  <a href="javascript:void(0)">
                    <i className="fas fa-microphone" />
                  </a>
                </label>
                <button type="button" className="send-message-button bg-grd-clr"><i className="fas fa-paper-plane" /></button>
              </div>
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



