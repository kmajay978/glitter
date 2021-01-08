
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
<<<<<<< HEAD
      id: 4,
      name: 'ABC 3'
=======
      const bodyParameters = {
        session_id : localStorage.getItem("session_id"), 
        user_id : userId
       }
       axios.post(LIKE_USER , bodyParameters) 
       .then((response) => {
       if(response.status==200){
  
       alert("liked succesfully")
       console.log(direction)
       console.log('removing: ' + userId)
       alreadyRemoved.push(userId)
      }
      }, (error) =>{
 
     }); 
     }
    }

  
      const swipe = (dir, userId) => {

      // const cardsLeft = allData.filter(person => !alreadyRemoved.includes(person.user_id))
      // if(dir=='left')
      // {
      //   console.log(dir)
        
      // }
      // else if(dir=='right')
      // {
      //   console.log(dir);
      // }
     
      const cardsLeft = allData.filter(currentUser => !alreadyRemoved.includes(currentUser.user_id))

      if (cardsLeft.length) 
      {
        const toBeRemoved = cardsLeft[cardsLeft.length - 1].user_id ;// Find the card object to be removed
        const index = allData.map(person => person.user_id).indexOf(toBeRemoved); // Find the index of which to make the reference to
        alreadyRemoved.push(toBeRemoved); // Make sure the next card gets removed next time if this card do not have time to exit the screen
        childRefs[index].current.swipe(dir); // Swipe the card!
      }
      }
 // Setting current user from all data 
 const [currentUser, setCurrentUser] = useState([])
// Session id from local storage
    const SessionId = localStorage.getItem("session_id");

 //console.log(currentUser);
// Dislike function
const handleDislike = ( dir, userId ) => {
  console.log("Disliked user id", userId);
 
  const bodyParameters = {
    session_id: SessionId,
    user_id: userId,
  };

  axios.post(DISLIKE_USER, bodyParameters).then(
    (response) => {
      if (response.status == 200) {
        alert("dislike succesfully");
      }
>>>>>>> f3265099ae2a76b83e9fdac5ee444eef0cd3ccb9
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
<<<<<<< HEAD
=======
}, [allData]);


   
    useEffect(()=> {
    handleUserData();
     },[])

          //console.log(fetchedProfile);
                return(
                
                       <div className="stage">
                      
                      <div id="stacked-cards-block" className="stackedcards stackedcards--animatable init">
                  
                    <div className="stackedcards-container">
                       
                    <div className='cardContainer'>
                    {allData.map((currentUser, index) =>
                    <GlitterCard ref={childRefs[index]} className='swipe' key={currentUser.user_id} onSwipe={(dir) => swiped(dir, currentUser.user_id)} >
                  
                    <div className="card" >
                    <img src={currentUser.profile_images} alt={currentUser.first_name} width="100%" height="100%"/>
                     <h3>{currentUser.first_name}, {currentUser.age}</h3>
                     <h4>{currentUser.distance},{currentUser.occupation}</h4>
              
                  
                   </div>
           
                    </GlitterCard>
                    )}
                    </div>
                      
                        {/* <div className="card" >
                          <div className="card-content">
                          <div className="card-image">
                              
                            <Image src={item.profile_images} alt={item.first_name} width="100%" height="100%"/>
                             </div>
                            <div className="card-titles">
                             <h3>{item.first_name}, {item.age}</h3>
                            <span>{item.distance},{item.occupation}</span>
                           </div>  
                          </div>
                        </div> */}
                    
                  {/* })} */}
>>>>>>> f3265099ae2a76b83e9fdac5ee444eef0cd3ccb9

 
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



