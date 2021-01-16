import React, { useState, useEffect, useMemo } from "react";
import $ from 'jquery';
import { useHistory } from "react-router";
import axios from "axios";
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";
import { FILTER_LIST_API, LIKE_USER, DISLIKE_USER } from "./Api";
import Image from "react-bootstrap/Image";
import { CardHeader, card } from "@material-ui/core";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";
import { GETALLUSER_API } from "../components/Api";
import GlitterCard from "react-tinder-card";
import Swipe from "./Swipe";
const alreadyRemoved = [];
let isMouseClick = false, startingPos = [], glitterUid;

const FilterUser = ({ fetchedProfile }) => {
  const history = useHistory();
  const [lastDirection, setLastDirection] = useState();
  const [characters, setCharacters] = useState();
  const [allData, setAllData] = useState([]);
  const [mouseIsClicked, setmouseIsClicked] = useState("false");
  const [cardClick, setCardClick] = useState(false);
  const [cardStartPosition, setStartPosition] = useState([])

  const handleUserData = async () => {
    const bodyParameters = {
      session_id: localStorage.getItem("session_id"),
    };
    const { data: { data }} = await axios.post(GETALLUSER_API, bodyParameters);
    setAllData(data);
  };

//   fetchedProfile =[
// { user_id :1 ,first_name:"sandeep" , age: 20, distance: 30, weight : "49", gender:"female"},
// { user_id :2 ,first_name:"oishee" , age: 25, distance: 40, weight : "55" , gender:"female"}
//   ]

  // Click here
const handleUserId = (e, userId) =>{

}
console.log(fetchedProfile)


  const childRefs = allData;
  const swiped = (direction, userId) => {
    if (direction == "left") {
      const bodyParameters = {
        session_id: localStorage.getItem("session_id"),
        user_id: userId,
      };
      axios.post(DISLIKE_USER, bodyParameters).then(
        (response) => {
          if (response.status == 200) {
            console.log(direction);
            console.log("removing: " + userId);
            alreadyRemoved.push(userId);
          }
        },
        (error) => {}
      );
    } else if (direction == "right") {
      const bodyParameters = {
        session_id: localStorage.getItem("session_id"),
        user_id: userId,
      };
      axios.post(LIKE_USER, bodyParameters).then(
        (response) => {
          if (response.status == 200) {
            console.log(direction);
            console.log("removing: " + userId);
            alreadyRemoved.push(userId);
          }
        },
        (error) => {}
      );
    }
  };

  const swipe = (dir, userId) => {
    const cardsLeft = allData.filter(
      (currentUser) => !alreadyRemoved.includes(currentUser.user_id)
    );
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].user_id; // Find the card object to be removed
      const index = allData
        .map((person) => person.user_id)
        .indexOf(toBeRemoved); // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved); // Make sure the next card gets removed next time if this card do not have time to exit the screen
      if (!!childRefs && childRefs[index]) {
        childRefs[index].current.swipe(dir); // Swipe the card!
      } else {
        console.log("child ref error", childRefs, "childRefs");
      }
    }
  };

 useEffect(() => {
   console.log(cardClick, isMouseClick, "test...");
   if (cardClick) {
      history.push({
                    pathname: '/single-profile',
                    userId: glitterUid // Your userId
                  })
  }
 }, [cardClick])

  useEffect(() => {
    handleUserData();
    window.setTimeout(() => {
       $(".main_wrapper")
    .mousedown(function (evt) {
      isMouseClick = true;
      glitterUid =  $(".main_wrapper")
        // setCardClick(isMouseClick)
        startingPos = [evt.pageX, evt.pageY]
        glitterUid = evt.currentTarget.id
        // setStartPosition(startingPos);
    })
    .mousemove(function (evt) {
        if (!(evt.pageX === startingPos[0] && evt.pageY === startingPos[1])) {
            isMouseClick = false;
        }
    })
    .mouseup(function () {
        if (!isMouseClick) {
           setCardClick(isMouseClick)
        } else {
          isMouseClick = true
           setCardClick(isMouseClick)
        }
        startingPos = [];
        setStartPosition(startingPos)
    });
    }, 1000); 
  }, []);

  const handleComment =() => {
    history.push ({
      pathname: '/chat',
     })
  }
  
  const handleVideo =() => {
    history.push ({
      pathname: '/searching-profile',
     })
  }


  return (
    <div className="stage">
      <div id=""  className="swipe__card_layout">              
            {allData.reverse().map((currentUser, index) => (
              <div className="main_wrapper" id={currentUser.user_id}>
              <GlitterCard
                ref={childRefs[index]}
                className="swipe"
                key={currentUser.user_id}
                onSwipe={(dir) => swiped(dir, currentUser.user_id)}
               
              >
                <div className="card">
                  <img
                    src={currentUser.profile_images}
                    alt={currentUser.first_name}
                    width="100%"
                    
                  />
                  <h3>
                    {currentUser.first_name}, {currentUser.age}
                  </h3>
                  <h4>
                    {currentUser.distance},{currentUser.occupation}
                  </h4>
                </div>
                
              </GlitterCard>
              </div>
            ))}
          
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
      <div className="action-tray global-actions d-flex flex-wrap justify-content-center align-items-center">
           
        <div class="close-btn tray-btn-s">
            <a class="left-action" href="javascript:void(0)" onClick={() => swipe("left")}>×</a>
        </div>
        <div class="chat tray-btn-l">
            <a href="javascript:void(0)" onClick={handleComment}>
                <i class="fas fa-comment"></i>
            </a>
        </div>
        <div class="video-chat tray-btn-l">
            <a href="javascript:void(0)" onClick={handleVideo}>
                <i class="fas fa-video"></i>
            </a>
        </div>
        <div class="like-profile tray-btn-s">
            <a class="right-action" href="javascript:void(0)" onClick={() => swipe("right")}>
                <i class="fas fa-heart"></i>
            </a>
        </div>
      
     
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
  );
};
export default FilterUser;
