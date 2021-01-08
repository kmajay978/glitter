
import React, { useState, useEffect } from "react";
import {  useHistory } from 'react-router';
import axios from "axios";
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import { GETALLUSER_API, 
    DISLIKE_USER, 
    LIKE_USER 
  } from '../components/Api';
import Image from 'react-bootstrap/Image';
let count = 0
const FilterUser = ({fetchedProfile}) =>{

  const dummy = [
    {
      id: 1,
      name: 'XYZ'
    },
    {
      id: 2,
      name: 'ABC'
    },
    {
      id: 3,
      name: 'ABC 2'
    },
     {
      id: 4,
      name: 'ABC 3'
    },
     {
      id: 5,
      name: 'ABC 4'
    }
  ]


  
  const [currentUser, setCurrentUser] = useState(dummy[0])
  
  console.log('feched',fetchedProfile);

  async function handleDislikes(id){
    console.log('user id', id)
    // const res = await axios.post(DISLIKE_USER, id)
    // console.log('res', res)
    nextUser()
  }
  async function handleLikes(id){
    console.log('user id', id)
    // const res = await axios.post(LIKE_USER, id)
    // console.log('like res', res)
    nextUser()  
  }
  function nextUser(){
    if(count < dummy.length) {
      count = count+1
    }
    console.log('count', count, dummy[count])
    setCurrentUser(dummy[count])
    console.log('current user', currentUser)
  }

 
  return(
          <div className="stage">
          <div id="stacked-cards-block" className="stackedcards stackedcards--animatable init">
            <div className="stackedcards-container">

              {/* Cards here */}
              {dummy.map((currentUser, index) =>
              <div className="card">
                <div className="card-content">
                  <div className="card-image">
                  <Image src="/assets/images/profile-card.png" alt="Emma" width="100%" height="100%"/>
                  </div>
                  <div className="card-titles">
                    <h3>{currentUser.name}</h3>
                    <span>72km, Lawyer</span>
                  </div>  
                </div>
              </div>
              )}

            {/* End cards here */}
            </div>
            <div className="stackedcards--animatable stackedcards-overlay top"><img src="https://image.ibb.co/m1ykYS/rank_army_star_2_3x.png" width="auto" height="auto" /></div>
            <div className="stackedcards--animatable stackedcards-overlay right"><img src="/assets/images/accept-icon.png" width="auto" height="auto" /></div>
            <div className="stackedcards--animatable stackedcards-overlay left"><img src="https://image.ibb.co/heTxf7/20_status_close_3x.png" width="auto" height="auto" /></div>
          </div>
          <div className="action-tray global-actions d-flex flex-wrap justify-content-center align-items-center">
            <div className="close-btn tray-btn-s">
              <a 
                className="left-action" 
                href="javascript:void(0)"
                onClick={()=>handleDislikes(currentUser.id)}
              >
                ×
              </a>
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
              <a 
                className="right-action" 
                href="javascript:void(0)"
                onClick={()=>handleLikes(currentUser.id)}
              >
                <i className="fas fa-heart" />
              </a>
            </div>
          </div>
      </div>
  )
}
export default FilterUser;



