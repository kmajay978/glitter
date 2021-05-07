import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router';
import axios from "axios";
import { GET_USERPROFILE_API } from '../components/Api';

const MessageBox = (props) => {

  const [UserId, setUserId] = useState('');
  const [ChatUserData, setUserData] = useState('');

  const bodyParameters = {
    session_id: localStorage.getItem('session_id'),
    user_id: UserId,
  };
  const userProfile = async () => {
    const { data: { data } } = await axios.post(GET_USERPROFILE_API, bodyParameters)
    setUserData(data);
  }

  useEffect(() => {
    userProfile();
    setUserId(props.userid);
  }, [UserId])



  return (
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
              <h5 className="mb-0 name">mandy</h5>
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
  )
}

export default MessageBox;