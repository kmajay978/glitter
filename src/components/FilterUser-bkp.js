
import React, { useState, useEffect ,useMemo } from "react";
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

const alreadyRemoved = []
const FilterUser = ({fetchedProfile}) =>{
  
  const history = useHistory();
  const [lastDirection, setLastDirection] = useState();
  const [characters, setCharacters] = useState();
  const [allData , setAllData] = useState([]);
  const [CurrentId, setCurrentUid] = useState('');
  const [mouseIsClicked , setmouseIsClicked] = useState('false');

  
   const handleUserData = async() => {
   const bodyParameters ={
   session_id : localStorage.getItem("session_id")
   };
   const{data :{data}} =await axios.post(GETALLUSER_API ,bodyParameters)
   setAllData(data);
  
   }

  

   const childRefs = useMemo(() => Array(allData.length).fill(0).map(i => React.createRef()), [])

    const swiped = (direction, userId) => 
    {

      if(direction=='left')
      {
        const bodyParameters = 
        {
          session_id : localStorage.getItem("session_id"), 
          user_id : userId
          }
          axios.post(DISLIKE_USER , bodyParameters) 
        .then((response) => {
        if(response.status==200) {
        alert("dislike succesfully")
        console.log(direction);
        console.log('removing: ' + userId)
        alreadyRemoved.push(userId);
       }
     },(error) =>{
 
     });
      }
     else if(direction=='right')
     {
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
    },
    (error) => {}
  );
swipe(dir);
  nextUser();
};

// Like function
const handleLike = ( dir, userId ) => {
  console.log("Liked user id", userId);
  console.log(dir);
  const bodyParameters = {
    session_id: SessionId,
    user_id: userId,
  };

  axios.post(LIKE_USER, bodyParameters).then(
    (response) => {
      if (response.status == 200) {
        alert("Liked succesfully");
      }
    },
    (error) => {}
  );
  nextUser();
};

// Getting next user id
const nextUser = () => {
  var count = "";
  if (count < allData.length) {
    count = count + 1;
  }
  setCurrentUser(allData[count]);
  console.log("current user", currentUser);
};

useEffect(() => {
  if (allData.length) {
    // Setting last element of array using slice -1 
    setCurrentUser(allData.slice(-1)[0]);
  }
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

                      </div>
                     
                      <div className="stackedcards--animatable stackedcards-overlay top"><img src="https://image.ibb.co/m1ykYS/rank_army_star_2_3x.png" width="auto" height="auto" /></div>
                      <div className="stackedcards--animatable stackedcards-overlay right"><img src="/assets/images/accept-icon.png" width="auto" height="auto" /></div>
                      <div className="stackedcards--animatable stackedcards-overlay left"><img src="https://image.ibb.co/heTxf7/20_status_close_3x.png" width="auto" height="auto" /></div>
                    </div>
                   
                    <div className="action-tray global-actions d-flex flex-wrap justify-content-center align-items-center">
                   
                    <button onClick={()=>handleDislike("left",currentUser.user_id)}>Swipe left!</button>
                    <button onClick={()=>handleLike("right",currentUser.user_id)}>swipe right</button>
                   
                      {/* <div className="close-btn tray-btn-s">
                        <a className="left-action" href="javascript:void(0)" onClick={swiped} >×</a>
                       
                      </div>
                      <div className="like-profile tray-btn-s">
                        <a className="right-action" href="javascript:void(0)" onClick={swiped} >
                      
                          <i className="fas fa-heart" />
                        </a>
                      </div> */}
                      
                    </div>
                  </div>
                 
                 
                
    )
}
export default FilterUser;



