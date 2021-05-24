
import React, { useState, useEffect } from "react";
import moment from 'moment'
import { useHistory } from 'react-router';
import axios from "axios";

import Logo from '../components/Logo';
import { GET_ALL_CALL } from '../components/Api';
import { useSelector } from "react-redux";
import { userProfile } from '../features/userSlice'

const RecentCall = () => {
  const history = useHistory();
  const [allcalls, setAllCall] = useState([]);
  const [callType, setCallType] = useState("");

  const userData = useSelector(userProfile).user.profile; // using redux

  const handleAllCall = async (type) => {
    const bodyParameters = {
      type,
      session_id: localStorage.getItem('session_id')
    }
    const { data: { list } } = await axios.post(GET_ALL_CALL, bodyParameters)
    setAllCall(list);
  }
  useEffect(() => {
    setAllCall([])
    handleAllCall(callType);
  }, [callType])

  return (
    <section className="home-wrapper">
      <img className="bg-mask" src="/assets/images/mask-bg.png" alt="Mask" />
      <div className="header-bar">
        <div className="container-fluid p-0">
          <div className="row no-gutters align-items-center">
            <div className="col-lg-4 p-3">
              <div className="d-flex flex-wrap align-items-center">
                <div className="logo-tab d-flex justify-content-between align-items-start">
                  <Logo />
                </div>
                <div className="back-bar d-flex align-items-center ml-5">
                  <a className="btn-back" href="javascript:void(0)" onClick={() => history.goBack()}><i className="fas fa-chevron-left" /></a>
                  <span className="theme-txt">Back</span>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="rcall-head text-center">
                <h4>Recent</h4>
              </div>
            </div>
            <div className="col-lg-4 p-3">
              <div className="tab-top d-flex flex-wrap-wrap align-items-center">
                <div className="remaining-coins ml-auto">
                  <img src="/assets/images/diamond-coin.png" alt="Coins" />
                  <span>{!!userData && userData.coins}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="rcall-wrapper">
        <ul id="tabs" className="nav rcall-tabs mb-4" role="tablist">
          <li className="nav-item">
            <a id="tab-all-call" href="#rcall-all" className="nav-link active" data-toggle="tab" role="tab" onClick={() => setCallType("")}>All</a>
          </li>
          <li className="nav-item">
            <a id="tab-missed-call" href="#rcall-missed" className="nav-link" data-toggle="tab" role="tab" onClick={() => setCallType(5)}>Missed</a>
          </li>
          <li className="nav-item">
            <a id="tab-matched-call" href="#rcall-matched" className="nav-link" data-toggle="tab" role="tab" onClick={() => setCallType(3)}>Matched</a>
          </li>
        </ul>
        <div id="content" className="tab-content rcall-history" role="tablist">
          <div id="rcall-all" className="tab-pane fade show active" role="tabpanel" aria-labelledby="tab-all-call">

            {/* all Calls here */}
            {allcalls.map((item, i) => {
              return <div className="rc-history-card d-flex flex-wrap align-items-center">
                <figure className="rc-user-avtar mb-0 mr-3">
                  <img src={!!item ? item.profile_file : ""} alt={item.name} />
                </figure>
                <div className="rc-user-details d-flex flex-wrap">
                  <div className="rcu-name mr-3">
                    <h5 className="mb-1">{!!item ? item.name : ""} <span className="age">{item.age}</span></h5>
                    <div className="rcu-date-time">
                      <span className="time">{!!item ? item.time : ""} </span>
                      <span className="date">{!!item.call_created_date ? moment(!!item ? item.call_created_date : "").format('l') : ""}</span>
                    </div>
                  </div>
                  <div className="rcu-call-time">{!!item ? item.time : ""}</div>
                </div>
                <div className="rcu-call-type ml-auto">
                  <figure className="mb-0 bg-grd-clr">
                    <img src={item.call_status == 5 ? "/assets/images/missed-call-icon.png" : (item.call_type == 0 ? "/assets/images/video-icon.png": "/assets/images/audio.png")} alt="audio" />
                  </figure>
                </div>
              </div>
            })}
          </div>

          {/* Missed Calls here */}
          <div id="rcall-missed" className="tab-pane fade" role="tabpanel" aria-labelledby="tab-missed-call">
            {allcalls.map((item, i) => {
              return  <div className="rc-history-card d-flex flex-wrap align-items-center">
                <figure className="rc-user-avtar mb-0 mr-3">
                  <img src={!!item ? item.profile_file : ""} alt="Augugsta Castro" />
                </figure>
                <div className="rc-user-details d-flex flex-wrap">
                  <div className="rcu-name mr-3">
                    <h5 className="mb-1">{!!item ? item.name : ""} <span className="age">{item.age}</span></h5>
                    <div className="rcu-date-time">
                      <span className="time">{!!item ? item.time : ""} </span>
                      <span className="date">{!!item.call_created_date ? moment(!!item ? item.call_created_date : "").format('l') : ""}</span>
                    </div>
                  </div>
                  <div className="rcu-call-time">{!!item ? item.time : ""}</div>
                </div>
                <div className="rcu-call-type ml-auto">
                  <figure className="mb-0 bg-grd-clr">
                    <img src="/assets/images/missed-call-icon.png" alt="audio" />
                  </figure>
                </div>
              </div> 
            })}
          </div>

          {/* Matched Calls here */}
          <div id="rcall-matched" className="tab-pane fade" role="tabpanel" aria-labelledby="tab-matched-call">
            {allcalls.map((item, i) => {

              return<div className="rc-history-card d-flex flex-wrap align-items-center">
                <figure className="rc-user-avtar mb-0 mr-3">
                  <img src={!!item ? item.profile_file : ""} alt="Augugsta Castro" />
                </figure>
                <div className="rc-user-details d-flex flex-wrap">
                  <div className="rcu-name mr-3">
                    <h5 className="mb-1">{!!item ? item.name : ""} <span className="age">{item.age}</span></h5>
                    <div className="rcu-date-time">
                      <span className="time">{!!item ? item.time : ""} </span>
                      <span className="date">{!!item.call_created_date ? moment(!!item ? item.call_created_date : "").format('l') : ""}</span>
                    </div>
                  </div>
                  <div className="rcu-call-time">{!!item ? item.time : ""}</div>
                </div>
                <div className="rcu-call-type ml-auto">
                  <figure className="mb-0 bg-grd-clr">
                    <img src="/assets/images/love.svg" alt="Video" />
                  </figure>
                </div>
              </div>
            })}
          </div>
        </div>
      </div>
    </section>


  )
}
export default RecentCall;



