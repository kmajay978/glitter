
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
  const [lastDirection, setLastDirection] = useState()
  const [characters, setCharacters] = useState()
  const [allData , setAllData] = useState([]);
  const [currentId, setCurrentUid] = useState('');


  
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

    const handleClick = (currentId) => {
     console.log(currentId);
    //  history.push({
    //   pathname: '/single-profile',
    //   user_id: currentId // your data array of objects
    // })

     }
    
      const swipe = (dir,userId) => {
      
      const cardsLeft = allData.filter(person => !alreadyRemoved.includes(person.user_id))
      if (cardsLeft.length) {
        const toBeRemoved = cardsLeft[cardsLeft.length - 1].user_id // Find the card object to be removed
        const index = allData.map(person => person.user_id).indexOf(toBeRemoved) // Find the index of which to make the reference to
        alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
        childRefs[index].swipe(dir) // Swipe the card!
      }
      }
 

    console.log(allData);
    useEffect(()=> {
    handleUserData();
     },[])

     useEffect(()=>{
       handleClick();
     },[currentId])
          //console.log(fetchedProfile);
                return(
                
                       <div className="stage">
                      
                      <div id="stacked-cards-block" className="stackedcards stackedcards--animatable init">
                  
                    <div className="stackedcards-container">
                       
                    <div className='cardContainer'>
                    {allData.map((character, index) =>
                    <GlitterCard ref={childRefs[index]} className='swipe' key={character.user_id} onSwipe={(dir) => swiped(dir, character.user_id)} onClick={() => setCurrentUid(character.user_id)}>
                  
                    <div className="card" >
                    <img src={character.profile_images} alt={character.first_name} width="100%" height="100%"/>
                     
                    
                     <h3>{character.first_name}, {character.age}</h3>
                     <h4>{character.distance},{character.occupation}</h4>
              
                  
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
                   
                    <button onClick={() => swipe('left' )}>Swipe left!</button>
                    <button onClick={() => swipe('right')}>swipe right</button>
                   
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



