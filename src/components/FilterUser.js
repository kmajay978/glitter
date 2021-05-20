import React, { useState, useEffect, useMemo, useRef, createRef } from "react";
import $ from 'jquery';
import { useSelector } from "react-redux"
import { useHistory } from "react-router";
import { filterDataUser } from "../features/userSlice"
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
import TinderCardTest from "./TinderCard";
import useToggle, { removeDublicateFrds } from '../components/CommonFunction';
import SyncLoader from "react-spinners/SyncLoader";
import { NotificationManager } from 'react-notifications';
import { css } from "@emotion/core";
const alreadyRemoved = [];
let isMouseClick = false, startingPos = [], glitterUid, childRefs = [];

const override = css`
text-align: center;
width: 95%;
position: absolute;
left: 0;
right: 0;
margin: 0 auto;
top: 50%;
-webkit-transform: translateY(-50%);
-moz-transform: translateY(-50%);
transform: translateY(-50%);

`;

const FilterUser = ({fetchedProfile}) => {
  const history = useHistory();
  const [lastDirection, setLastDirection] = useState();
  const [characters, setCharacters] = useState();
  const [allData, setAllData] = useState([]);
  // const [mouseIsClicked, setmouseIsClicked] = useState("false");
  const [cardClick, setCardClick] = useState(false);
  const [cardStartPosition, setStartPosition] = useState([])
  const [userData, setUserData] = useState([]);
  const [showAccept, setShowAccept] = useState(false);
  const [isOn, toggleIsOn] = useToggle(false);
  const [liked_clicked, setLiked] = useState(false);
  const [disliked_clicked, setDislike] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const filters = useSelector(filterDataUser); //using redux useSelector here
  console.log(filters , " filters...");

  const handleUserData = () => {
    setIsLoaded(true);
    const bodyParameters = {
      session_id: localStorage.getItem("session_id"),
    };
    axios.post(GETALLUSER_API, bodyParameters)
      .then((response) => {
        setIsLoaded(false);
        if (response.status == 200) {
          setUserData(removeDublicateFrds(response.data.data));
        }
      },
        (error) => {
          if (error.toString().match("403")) {
            localStorage.removeItem("session_id");
            history.push('/login');
          }
          setIsLoaded(false);

        }
      );

  };

  // Click here
  const handleUserId = (e, userId) => {

  }


  const swiped = (direction, userId) => {
    if (direction == "left") {
      setDislike(true);
      const bodyParameters = {
        session_id: localStorage.getItem("session_id"),
        user_id: userId,
      };
      axios.post(DISLIKE_USER, bodyParameters)
        .then(
          (response) => {
            setDislike(false);
            if (response.status == 200) {
              alreadyRemoved.push(userId);
            }
          },
          (error) => {
            NotificationManager.error(error.message, "", 2000, () => { return 0 }, true);
            setDislike(false);

          }
        );
    } else if (direction == "right") {
      setLiked(true);
      const bodyParameters = {
        session_id: localStorage.getItem("session_id"),
        user_id: userId,
      };
      axios.post(LIKE_USER, bodyParameters).then(
        (response) => {
          setLiked(false)
          if (response.status == 200) {
            alreadyRemoved.push(userId);
            setTimeout(() => {
              setLiked(false)
            }, 2);
          }
        },
        (error) => {
          NotificationManager.error(error.message, "", 2000, () => { return 0 }, true);
          setLiked(false)
        }
      );
    }
  };
 
  console.log(allData , "allData...");
  // const childRefs = userData;
  // let childRefs = allData.length > 0 ? useRef(allData) : useRef([])
  childRefs = useRef(filters);

  const swipe = (dir, userId) => {
    // if (allData.length > 0) {
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
        }
      }
    // }
    // else {
    //   const cardsLeft = userData.filter(
    //     (currentUser) => !alreadyRemoved.includes(currentUser.user_id)
    //   );
    //   if (cardsLeft.length) {
    //     const toBeRemoved = cardsLeft[cardsLeft.length - 1].user_id; // Find the card object to be removed
    //     const index = userData
    //       .map((person) => person.user_id)
    //       .indexOf(toBeRemoved); // Find the index of which to make the reference to
    //     alreadyRemoved.push(toBeRemoved); // Make sure the next card gets removed next time if this card do not have time to exit the screen
    //     if (!!childRefs && childRefs[index]) {
    //       childRefs[index].current.swipe(dir); // Swipe the card!
    //     } else {
    //     }
    //   }
    // }
  };

console.log(childRefs , "childref..")
  useEffect(() => {
    if (!!cardClick) {
      history.push('/' + glitterUid + '/single-profile')
    }
  }, [cardClick])

  useEffect(() => {
    // handleUserData();
  }, [])

  console.log(allData, "nnnnnnn")
 
  useEffect(() => {
    if (!!fetchedProfile) {
      setIsLoaded(false);
      setAllData(fetchedProfile);
    }
    window.setTimeout(() => {
      $(".main_wrapper")
        .mousedown(function (evt) {
          isMouseClick = true;
          glitterUid = $(".main_wrapper")
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
  }, [fetchedProfile]);

  // useEffect(() => {

  //     document.getElementById("done-filter").click()


  // }, []) 

  return (
    <>
      {/* {allData.length> 0 ?  set: ""} */}
      <div className="cardContainer">
        {/* {allData.length > 0 ? <> */}
          {allData.map((currentUser, index) => (
            <div className="main_wrapper" id={currentUser.user_id}>
              <GlitterCard
                ref={childRefs[index]}
                className="swipe"
                key={currentUser.user_id}
                onSwipe={(dir) => swiped(dir, currentUser.user_id)} >
                <div className="user__card position-relative">
                  {liked_clicked ? <div className="accept__user"><img src="/assets/images/accept-icon.png" width="auto" height="auto" /></div> : ""}
                  {disliked_clicked ? <div class="accept__user"><img src="/assets/images/country-close.svg" width="auto" height="auto" /></div> : ""}
                  <img src={currentUser.profile_images} alt={currentUser.first_name} width="100%" />
                  <div className="card-titles">
                    <h3>
                      {currentUser.first_name}, {currentUser.age}
                    </h3>
                    <span>
                      {currentUser.distance}{currentUser.occupation != "" ? " , " : ""}{currentUser.occupation}
                    </span>
                  </div>
                </div>

              </GlitterCard>

            </div>
          ))}
        {/* </> :
          <>
            {userData.map((currentUser, index) => (
              <div className="main_wrapper" id={currentUser.user_id}>
                <GlitterCard ref={childRefs[index]} className="swipe" key={currentUser.user_id} onSwipe={(dir) => swiped(dir, currentUser.user_id)} >
                  <div className="user__card position-relative">
                    {liked_clicked ? <div className="accept__user"><img src="/assets/images/accept-icon.png" width="auto" height="auto" /></div> : ""}
                    {disliked_clicked ? <div class="accept__user"><img src="/assets/images/country-close.svg" width="auto" height="auto" /></div> : ""}
                    <img src={currentUser.profile_images} alt={currentUser.first_name} width="100%" />
                    <div className="card-titles">

                      <h3>
                        {currentUser.first_name}, {currentUser.age}
                      </h3>
                      <span>
                        {currentUser.distance},{currentUser.occupation}
                      </span>
                    </div>

                  </div>

                </GlitterCard>

              </div>
            ))} </>} */}

        <SyncLoader color={"#fcd46f"} loading={isLoaded} css={override} size={18} />

      </div>

      {
        !isLoaded &&
        <div className="action-tray global-actions d-flex flex-wrap justify-content-center align-items-center mt-3">
          <div className="close-btn tray-btn-s">
            <a className="left-action" href="javascript:void(0)" onClick={() => swipe("left")}>×</a>
          </div>
          {/* <div className="chat tray-btn-l">
            <a href="javascript:void(0)" onClick={handleComment}>
                <i className="fas fa-comment"></i>
            </a>
        </div>
        <div className="video-chat tray-btn-l">
            <a href="javascript:void(0)" onClick={handleVideo}>
                <i className="fas fa-video"></i>
            </a>
        </div> */}
          <div className="like-profile tray-btn-s">
            <a className="right-action" href="javascript:void(0)" onClick={() => swipe("right")}>
              <i className="fas fa-heart"></i>
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
      }

    </>



  );
};
export default FilterUser;
