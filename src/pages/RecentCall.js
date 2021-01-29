
import React, { useState, useEffect } from "react";
import moment from 'moment'
import {  useHistory } from 'react-router';
import axios from "axios";
import NavLinks from '../components/Nav';
import Logo from '../components/Logo';
import {GET_ALL_CALL} from '../components/Api';

const RecentCall = () =>{
const[allcalls , setAllCall] =  useState([]);

const handleAllCall = async() => {
  const bodyParameters ={
    session_id : localStorage.getItem('session_id')
  }
const {data :{result}} = await axios.post(GET_ALL_CALL , bodyParameters)
setAllCall(result);
}
console.log(allcalls,"allcalls....");
useEffect(() => {
handleAllCall();
} , [])
    
return(                                               
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
              <a className="btn-back" href="javascript:void(0)"><i className="fas fa-chevron-left" /></a>
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
              <span>152</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="rcall-wrapper">
    <ul id="tabs" className="nav rcall-tabs mb-4" role="tablist">
      <li className="nav-item">
        <a id="tab-all-call" href="#rcall-all" className="nav-link active" data-toggle="tab" role="tab" onClick={handleAllCall}>All</a>
      </li>
      <li className="nav-item">
        <a id="tab-missed-call" href="#rcall-missed" className="nav-link" data-toggle="tab" role="tab">Missed</a>
      </li>
      <li className="nav-item">
        <a id="tab-matched-call" href="#rcall-matched" className="nav-link" data-toggle="tab" role="tab">Matched</a>
      </li>
    </ul>
    <div id="content" className="tab-content rcall-history" role="tablist">
      <div id="rcall-all" className="tab-pane fade show active" role="tabpanel" aria-labelledby="tab-all-call">
    
    {/* all Calls here */}
        {allcalls.map((item,i) =>{
        return <div className="rc-history-card d-flex flex-wrap align-items-center">
          <figure className="rc-user-avtar mb-0 mr-3">
            <img src={!!item ? item.from_user_profile_image:""} alt="Augugsta Castro" />
          </figure>
          <div className="rc-user-details d-flex flex-wrap">
            <div className="rcu-name mr-3">
              <h5 className="mb-1">{!!item ? item.from_user_data:""} <span className="age">20</span></h5>
              <div className="rcu-date-time">
                <span className="time">{!!item ? item.time:""} </span>
                <span className="date">{ moment(!!item ? item.date:"").format('l')}</span>
              </div>
            </div>
            <div className="rcu-call-time">{!!item ? item.time:""}</div>
          </div>
          <div className="rcu-call-type ml-auto">
            <figure className="mb-0 bg-grd-clr">
              <img src="/assets/images/missed-call-icon.png" alt="audio" />
            </figure>
          </div>
        </div>
        })}
      </div>

{/* Missed Calls here */}
      <div id="rcall-missed" className="tab-pane fade" role="tabpanel" aria-labelledby="tab-missed-call">
      {allcalls.map((item,i) =>{
        return item.type === "Missed Call"? <div className="rc-history-card d-flex flex-wrap align-items-center">
          <figure className="rc-user-avtar mb-0 mr-3">
            <img src={!!item ? item.from_user_profile_image:""} alt="Augugsta Castro" />
          </figure>
          <div className="rc-user-details d-flex flex-wrap">
            <div className="rcu-name mr-3">
              <h5 className="mb-1">{!!item ? item.from_user_data:""} <span className="age">20</span></h5>
              <div className="rcu-date-time">
                <span className="time">{!!item ? item.time:""} </span>
                <span className="date">{ moment(!!item ? item.date:"").format('l')}</span>
              </div>
            </div>
            <div className="rcu-call-time">{!!item ? item.time:""}</div>
          </div>
          <div className="rcu-call-type ml-auto">
            <figure className="mb-0 bg-grd-clr">
              <img src="/assets/images/missed-call-icon.png" alt="audio" />
            </figure>
          </div>
        </div>:""
 })}
      </div>

{/* Matched Calls here */}
      <div id="rcall-matched" className="tab-pane fade" role="tabpanel" aria-labelledby="tab-matched-call">
      {allcalls.map((item,i) =>{
        
        return item.type === "Received Call"? <div className="rc-history-card d-flex flex-wrap align-items-center">
         <figure className="rc-user-avtar mb-0 mr-3">
            <img src={!!item ? item.from_user_profile_image:""} alt="Augugsta Castro" />
          </figure>
          <div className="rc-user-details d-flex flex-wrap">
            <div className="rcu-name mr-3">
              <h5 className="mb-1">{!!item ? item.from_user_data:""} <span className="age">20</span></h5>
              <div className="rcu-date-time">
                <span className="time">{!!item ? item.time:""} </span>
                <span className="date">{ moment(!!item ? item.date:"").format('l')}</span>
              </div>
            </div>
            <div className="rcu-call-time">{!!item ? item.time:""}</div>
          </div>
          <div className="rcu-call-type ml-auto">
            <figure className="mb-0 bg-grd-clr">
            <img src="/assets/images/video-icon.png" alt="Video" />
            </figure>
          </div>
        </div> :""
       })} 
      </div>
    </div>
  </div>
</section>


    )
}
export default RecentCall;



