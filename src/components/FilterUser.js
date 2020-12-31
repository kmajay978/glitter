
import React, { useState, useEffect ,useMemo} from "react";
import {  useHistory } from 'react-router';
import axios from "axios";
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import { FILTER_LIST_API , LIKE_USER , DISLIKE_USER} from './Api';
import Image from 'react-bootstrap/Image'
import Cards, { Card } from 'react-swipe-card'
import {GETALLUSER_API} from '../components/Api'
import Swipe from '../components/Swipe'
import TinderCard from 'react-tinder-card'

const FilterUser = ({fetchedProfile}) =>{
  const alreadyRemoved = []

  const [allData , setAllData] = useState([]);;
  const [lastDirection, setLastDirection] = useState()
  const childRefs = useMemo(() => Array(allData.length).fill(0).map(i => React.createRef()), [])
  
  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
    alreadyRemoved.push(nameToDelete)
  }
  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
    // charactersState = charactersState.filter(character => character.name !== name)
    // setCharacters(charactersState)
  }

  const swipe = (dir) => {
    const cardsLeft = allData.filter(person => !alreadyRemoved.includes())
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].name // Find the card object to be removed
      const index = allData.map(person => person.name).indexOf(toBeRemoved) // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir) // Swipe the card!
    }
  } 
  
    const handleUserData = async() => {
    const bodyParameters ={
     session_id : localStorage.getItem("session_id")
    };
    const{data :{data}} =await axios.post(GETALLUSER_API ,bodyParameters)
    setAllData(data);
    
  }

  const dislikeUser =(userid , dir) => {
    const cardsLeft = allData.filter(person => !alreadyRemoved.includes())
    const bodyParameters = {
    session_id : localStorage.getItem("session_id"), 
    user_id : userid
    }
  axios.post(DISLIKE_USER , bodyParameters) 
  .then((response) => {
    if(response.status==200) {
      alert("dislike succesfully")
    }
  },(error) =>{
 
  });
  }

  const likeedUser =(userid) => {
    const bodyParameters = {
   session_id : localStorage.getItem("session_id"), 
   user_id : userid
    }
  axios.post(LIKE_USER , bodyParameters) 
  .then((response) => {
  if(response.status==200){
   
   alert("liked succesfully")
  }
  }, (error) =>{

  });
  }

 

    console.log(allData);
    useEffect(()=> {
    handleUserData();
     },[])

          //console.log(fetchedProfile);
                return(
                
                       <div className="stage">
                      
                      <div id="stacked-cards-block" className="stackedcards stackedcards--animatable init">
                  
                       <div className="stackedcards-container">
                       <div className='cardContainer'>
                       {allData.map((item, i) =>{
                       return <TinderCard  className='swipe' onSwipe={(dir) => swiped(dir, item.first_name)} onCardLeftScreen={() => outOfFrame(item.first_name)}>
                      <div className="card-image">
                               
                              <Image src={item.profile_images} alt={item.first_name} width="100%" height="100%"/>
                               </div>
                              <div className="card-titles">
                               <h3>{item.first_name}, {item.age}</h3>
                              <span>{item.distance},{item.occupation}</span>
                             </div>
                 </TinderCard>
                })}
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

                      </div>
                     
                      <div className="stackedcards--animatable stackedcards-overlay top"><img src="https://image.ibb.co/m1ykYS/rank_army_star_2_3x.png" width="auto" height="auto" /></div>
                      <div className="stackedcards--animatable stackedcards-overlay right"><img src="/assets/images/accept-icon.png" width="auto" height="auto" /></div>
                      <div className="stackedcards--animatable stackedcards-overlay left"><img src="https://image.ibb.co/heTxf7/20_status_close_3x.png" width="auto" height="auto" /></div>
                    </div>
                   
                    <div className="action-tray global-actions d-flex flex-wrap justify-content-center align-items-center">
                      <div className="close-btn tray-btn-s">
                        <a className="left-action" href="javascript:void(0)" onClick={dislikeUser.bind(this, 5)} >×</a>
                       
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
                        <a className="right-action" href="javascript:void(0)" onClick={likeedUser.bind(this, 5)} >
                      
                          <i className="fas fa-heart" />
                        </a>
                      </div>
                      
                    </div>
                  </div>
                 
                 
                
    )
}
export default FilterUser;



