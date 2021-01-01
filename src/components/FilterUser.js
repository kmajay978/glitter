
import React, { useState, useEffect ,useMemo} from "react";
import {  useHistory } from 'react-router';
import axios from "axios";
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import { FILTER_LIST_API , LIKE_USER , DISLIKE_USER} from './Api';
import Image from 'react-bootstrap/Image'
import { CardHeader , card} from "@material-ui/core";
import {Card, CardImg, CardText, CardBody,CardTitle} from 'reactstrap';
import {GETALLUSER_API} from '../components/Api';
import GlitterCard from 'react-tinder-card'
import Swipe from "./Swipe";

const FilterUser = ({fetchedProfile}) =>{
  const alreadyRemoved = []

  const [allData , setAllData] = useState([]);
  
  

    const handleUserData = async() => {
    const bodyParameters ={
     session_id : localStorage.getItem("session_id")
    };
    const{data :{data}} =await axios.post(GETALLUSER_API ,bodyParameters)
    setAllData(data);
    
  }

  const dislikeUser =(userid , dir) => {
    const cardsLeft = allData.filter(userid => !alreadyRemoved.includes())
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
                       
                      <div className="tinderCards_cardContainer">
                      {allData.map((item ,index) => (
                      <GlitterCard className="swipe" key={item.index} preventSwipe={["up", "down"]}>
                      <div className="card" >
                      <div className="card-image" >
                      <Image src={item.profile_images} alt={item.first_name} width="100%" height="100%"/>
                      </div>
                     <div className="card-titles"> 
                     <h3>{item.first_name}, {item.age}</h3>
                     <span>{item.distance},{item.occupation}</span>
                   </div>
                   </div>
                   </GlitterCard>
                     ))}
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



