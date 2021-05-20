import React, { Component, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router'
import { selectUser } from '../features/userSlice';
import NavLinks from '../components/Nav';
import Loader from '../components/Loader';
import axios from 'axios';
import Logo from '../components/Logo';
import $ from 'jquery';
import * as GlitterCard from "react-tinder-card";
import useToggle, { removeDublicateFrds } from '../components/CommonFunction';
import SyncLoader from "react-spinners/SyncLoader";
import { NotificationManager } from 'react-notifications';
import { css } from "@emotion/core";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Typography, Slider } from '@material-ui/core';
import { FILTER_LIST_API, LIKE_USER, DISLIKE_USER } from '../components/Api';
import { filterData } from '../features/userSlice';
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


const useStyles = makeStyles({
  root: {
    backgroundcolor: '#f4c862',
    height: 5,
  },
});

const PrettoSlider = withStyles({
  root: {
    color: '#707070',
    height: 5,
    padding: 0,
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: '#fff',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 5,
    backgroundColor: '#f4c862',
    borderRadius: 4,
  },
  rail: {
    height: 5,
    borderRadius: 4,
  },
})(Slider);

const Home = (props) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUser); //using redux useSelector here
  const [fetchedProfile, setFilterUser] = useState([]);

  // const [mouseIsClicked, setmouseIsClicked] = useState("false");
  const [cardClick, setCardClick] = useState(false);
  const [cardStartPosition, setStartPosition] = useState([])
  const [userData, setUserData] = useState([]);
  // const [isOn, toggleIsOn] = useToggle(false);
  const [liked_clicked, setLiked] = useState(false);
  const [disliked_clicked, setDislike] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  // const filters = useSelector(filterDataUser); //using redux useSelector here
  // console.log(filters , " filters...");

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
          // if (error.toString().match("403")) {
          //   localStorage.removeItem("session_id");
          //   history.push('/login');
          // }
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
          setLiked(false);
        }
      );
    }
  };

  useEffect(() => {
    childRefs = Array(fetchedProfile.length).fill(0).map(i => React.createRef()), []
  }, [fetchedProfile])
 
  const swipe = (direction) => {
    const cardsLeft = fetchedProfile.filter(
      (currentUser) => !alreadyRemoved.includes(currentUser.user_id)
    );
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].user_id; // Find the card object to be removed
      const index = fetchedProfile
        .map((person) => person.user_id)
        .indexOf(toBeRemoved); // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved); // Make sure the next card gets removed next time if this card do not have time to exit the screen
      if (!!childRefs && childRefs[index] && !!childRefs[index].current) {
        childRefs[index].current.swipe(direction); // Swipe the card!
        console.log( childRefs[index].current , "direction..")
      } else {
        alert("no child ref")
      }
    }
  };
 
  useEffect(() => {
    if (!!cardClick) {
      history.push('/' + glitterUid + '/single-profile')
    }
  }, [cardClick])

  useEffect(() => {
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
            setCardClick(isMouseClick);
          } else {
            isMouseClick = true;
            setCardClick(isMouseClick);
          }
          startingPos = [];
          setStartPosition(startingPos);
        });
    }, 1000);
  }, [fetchedProfile]);

  function valuetextHeight(value) {
    return '${valueHeight}°C';
  }

  function valuetextAge(value) {
    return '${valueAge}°C';
  }

  function valuetextweight(value) {
    return '${valueweight}°C';
  }
  const filter = {
    gender: 2,
    age: { from: 18, to: 25 },
    distance: 5,
    height: { from: 100, to: 170 },
    weight: { from: 30, to: 60 }
  };
  const [valueHeight, setValueHeight] = useState([filter.height.from, filter.height.to]);
  const handleChangeHeight = (event, newValue) => {
    // setLoading('true');
    setValueHeight(newValue);
  };


  const [valueweight, setValueweight] = useState([filter.weight.from, filter.weight.to]);
  const handleChangeweight = (event, newValue) => {
    setValueweight(newValue);
  };

  const [valueAge, setValueAge] = useState([filter.age.from, filter.age.to]);
  const handleChangeAge = (event, newValue) => {
    setValueAge(newValue);
  };


  const [valueDistance, setValueDistance] = useState(filter.distance);
  const handleChangeDistance = (event, newValue) => {
    setValueDistance(newValue);

  };

  // Radio button value
  const [valueGender, setGender] = useState(filter.gender);
  const radioHandle = (e) => {
    setGender(e.target.value);
  }

  const [isLoading, setLoading] = useState();
  const [path, setPath] = useState('');

  const handleReset = (e) => {
    setGender(filter.gender);
    setValueDistance(filter.distance);
    setValueAge([filter.age.from, filter.age.to]);
    setValueHeight([filter.height.from, filter.height.to]);
    setValueweight([filter.weight.from, filter.weight.to]);
  }

  const filterHandle = (e) => {
    if (!!e)
      e.preventDefault();
    setLoading(true);
    const bodyParameters = {
      session_id: localStorage.getItem('session_id'),
      age_from: valueAge[0],
      show: valueGender.toString(),
      age_to: valueAge[1],
      distance: valueDistance,
      height_from: valueHeight[0],
      height_to: valueHeight[1],
      weight_from: valueweight[0],
      weight_to: valueweight[1],
      latitude: 30.70,
      longitude: 76.71
    };
    axios.post(FILTER_LIST_API, bodyParameters)
      .then((response) => {
        setLoading(false);
        if (response.status == 200) {
          setFilterUser(removeDublicateFrds(response.data.data));
          dispatch(
            filterData({
              filterData: removeDublicateFrds(response.data.data)
            })
          );
          setTimeout(() => {
          }, 600);
        } else {
        }
      }, (error) => {
        setLoading(false);
        NotificationManager.error(error.message, "", 2000, () => { return 0 }, true);
        localStorage.clear();
      });
  }

  const handleButton = () => {
    const pathname = window.location.pathname;
    setPath(pathname);
  }
  useEffect(() => {
    filterHandle();
    handleButton();
  }, [])

  const handleChat = () => {
    history.push("/search-home");
  }
  useEffect(() => {
    $(".show-filter").click(function () {
      $(".option-bar").toggleClass("filter-active");
    });
  }, [])
  return (
    <section className="home-wrapper">
      {/* <Loader isLoading={isLoading} />  */}

      <div className="home-inner">
        <div className="container-fluid p-0">
          <div className="row no-gutters">
            <div className="col-lg-3 option-bar p-3 vh-100 position-fixed">
              <div className="logo-tab mb-5 d-flex justify-content-between align-items-start">
                <Logo />
                <a className="show-filter" href="javascript:void(0)"><img src="/assets/images/Filter.png" alt="filter" /></a>
                <span className="chat-point position-relative">
                  <a href="javascript:void(0)" onClick={handleChat}>
                    <i className="fas fa-comment" />
                  </a>
                </span>
              </div>

              {/* Sidebar filter */}

              <div className="filter-tab">

                {/* <Loader isLoading={isLoading} /> */}
                <h4 className="mb-4">Filter</h4>
                <form action="#" method="post" className="form" >
                  <div className="tab-title">
                    <h5>Show Me</h5>
                  </div>
                  <div className="show-gender ft-block d-flex flex-wrap justify-content-between" onChange={radioHandle}>
                    <div className="form-group">
                      <input type="radio" name="gender" value={1} id="man" />
                      <label htmlFor="man">Man</label>
                    </div>
                    <div className="form-group">
                      <input type="radio" defaultChecked name="gender" value={2} id="woman" />
                      <label htmlFor="woman">Woman</label>
                    </div>
                    <div className="form-group">
                      <input type="radio" name="gender" value={"1,2"} id="both" />
                      <label htmlFor="both">Both</label>
                    </div>
                  </div>
                  <div className="age-group ft-block">
                    <div className="tab-title">
                      <h5>Age</h5>
                    </div>

                    <Typography id="age" className="two-range"  >
                      {`+${valueAge[0]} - ${valueAge[1]}`}
                    </Typography>
                    <PrettoSlider value={valueAge} min={18} max={50} onChange={handleChangeAge} valueLabelDisplay="auto"
                      aria-labelledby="range-slider" getAriaValueText={valuetextAge} />

                  </div>

                  <div className="distance-group ft-block">
                    <div className="tab-title">
                      <h5>Distance</h5>
                    </div>
                    <div className="range-slider">
                      <Typography id="distance" className="two-range"  >
                        {`${valueDistance} miles`}
                      </Typography>
                      <PrettoSlider value={valueDistance} max={10} onChange={handleChangeDistance} valueLabelDisplay="auto"
                        aria-labelledby="range-slider" aria-labelledby="continuous-slider" />
                    </div>
                  </div>
                  <div className="height-group ft-block">
                    <div className="tab-title">
                      <h5>Height</h5>
                      {/*                                    <span class="point-calcu">1.60-1.78m</span>*/}
                    </div>
                    <Typography id="Height" className="two-range"  >
                      {`${valueHeight[0]} - ${valueHeight[1]} cm`}
                    </Typography>

                    <PrettoSlider value={valueHeight} min={130} max={200} onChange={handleChangeHeight} valueLabelDisplay="auto"
                      aria-labelledby="range-slider" getAriaValueText={valuetextHeight} />

                  </div>
                  <div className="weight-group ft-block">
                    <div className="tab-title">
                      <h5>Weight</h5>
                      {/*                                    <span class="point-calcu">50-65kg</span>*/}
                    </div>
                    <Typography id="weight" className="two-range"  >
                      {`${valueweight[0]} - ${valueweight[1]} kg`}
                    </Typography>

                    <PrettoSlider value={valueweight} onChange={handleChangeweight} valueLabelDisplay="auto"
                      aria-labelledby="range-slider" min={30}
                      max={100} getAriaValueText={valuetextweight} />
                  </div>
                  <div className="btns-group d-flex justify-content-between flex-wrap my-5">
                    {path == "/" ? <> <button className="btn bg-grd-clr" id="done-filter" type="submit" onClick={filterHandle}>Done</button>
                      <button className="btn bg-grd-clr" type="reset" onClick={handleReset}>Reset</button></>

                      : path == "/search-home" ? <> <button className="unknown-home btn bg-grd-clr" type="submit" disabled>Done</button>
                        <button className="unknown-home btn bg-grd-clr" type="reset" disabled>Reset</button></>

                        : <> <button className="unknown-home btn bg-grd-clr" type="submit" onClick={filterHandle}>Done</button>
                          <button className="unknown-home btn bg-grd-clr" type="reset" onClick={handleReset}>Reset</button></>}
                  </div>
                </form>
              </div>

              {/* End filter here */}
            </div>
            <div className="col-lg-9 main-bar p-3" style={{ marginLeft: '25%' }}>
              <div className="tab-top d-flex flex-wrap">
                {/* <div className="live-icon">
                    <img src="/assets/images/live.png" alt="Live" />
                  </div> */}
                <NavLinks />
              </div>
              <div className="profile-swipe-wrapper">
                <div className="cardContainer">
                  {fetchedProfile.map((currentUser, index) => (
                    <div className="main_wrapper" id={currentUser.user_id}>
                      <GlitterCard
                        ref={childRefs[index]}
                        className="swipe"
                        key={currentUser.user_id}
                        onSwipe={(dir) => swiped(dir, currentUser.user_id)} >
                        <div className="user__card position-relative">
                          {liked_clicked ? <div className="accept__user"><img src="/assets/images/accept-icon.png" width="auto" height="auto" /></div> : ""}
                          {disliked_clicked ? <div class="accept__user"><img src="/assets/images/country-close.svg" width="auto" height="auto" /></div> : ""}
                          <img src={currentUser.profile_images} alt={currentUser.name} width="100%" />
                          <div className="card-titles">
                            <h3>
                              {currentUser.name}, {currentUser.age}
                            </h3>
                            <span>
                              {currentUser.distance}{currentUser.occupation != "" ? " , " : ""}{currentUser.occupation}
                            </span>
                          </div>
                        </div>

                      </GlitterCard>

                    </div>
                  ))}
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

              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )

}

export default Home;
