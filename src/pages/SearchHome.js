
import React, { useState, useEffect } from "react";
import $ from 'jquery';
import {  useHistory } from 'react-router';
import axios from "axios";
import NavLinks from '../components/Nav';
import FilterSide from '../components/Filter';
import { FRIENDLIST_API , GET_STATUS} from '../components/Api';
import {Modal, ModalBody , Dropdown} from 'react-bootstrap';
import OwlCarousel from 'react-owl-carousel2';
import {SOCKET} from '../components/Config';
import {useSelector} from "react-redux";
import {userProfile} from "../features/userSlice";

let isMouseClick = false, startingPos = [], glitterUid;
const SearchHome = () =>
{
  const history = useHistory();
  const [fetchedProfile, setFilterUser] = useState('');
 const [ friendList  , setFriendlist] = useState([]);

 const [Click, setClick] = useState(false);
 const [StartPosition, setStartPosition] = useState([])
 const [statusData , setStatusData] = useState({});
 const [storyData , setStoryData] = useState([]);
 const[ friendId , setFriendId] = useState('');
 const [statusLength , setStatusLength] = useState("");

    const userData = useSelector(userProfile).user.profile; //using redux useSelector here

 const options = {
  loop: false,
  margin: 20,
  items: 13,
  nav: false,
  autoplay: true
};

const statusoptions = {
  loop: false,
  slideSpeed: 3000,
  dots:true,
  margin: 0,
  items: 1,
  smartSpeed: 1000,
  nav: false,
  autoplay: true,
  autoplayTimeout: 3000,
   

};

  const handleFriendList = () => {
    const bodyParameters ={
      session_id : localStorage.getItem('session_id')
    }
   axios.post(FRIENDLIST_API,bodyParameters)
    .then((response) => {
      if (response.status === 200 ) {
          let friendList = response.data.data;
          console.log(friendList, "friendList...")
          for (let i in friendList) {
              friendList[i].is_live = false;
          }
        setFriendlist(friendList);
        setStatusLength(response.data.data.statuses);
      }
 }, (error) => {
  setFriendlist('');
});
  }
   console.log(statusLength);
  useEffect  (() => {
   handleStatus();
  },[friendId])

  console.log(friendId);
  const handleStatus = () =>
  {
    const bodyParameters = {
      user_id: friendId,
    };
    axios.post(GET_STATUS,bodyParameters)
    .then((response) => {
      if (response.status === 200 && !response.status.error) {
        setStatusData(response.data);
        setStoryData(response.data.result);
      }
      else {
        setStatusData('');
      }

 }, (error) => {
    setStatusData('');
});
  }
console.log(statusData);
 console.log(storyData);

 const componentWillUnmount = () => {
     alert("stop")
     SOCKET.emit('stop_check_friend_list_live', () => {
         console.log("stop checking friend list live...")
     });
 }
  useEffect (() => {
    SOCKET.connect();
      SOCKET.emit("authenticate_friend_list_live", {
          session_id: localStorage.getItem("session_id")
      });
    handleFriendList();

    SOCKET.on('live_friends', (data) => {
        console.log(data, "data...")
    });

    window.setTimeout(() => {
       $(".main")
    .mousedown(function (evt) {
      isMouseClick = true;
      glitterUid =  $(".main")

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
           setClick(isMouseClick)
        } else {
          isMouseClick = true
           setClick(isMouseClick)
        }
        startingPos = [];
        setStartPosition(startingPos)
    });
    }, 1000);

    return () => componentWillUnmount()
    },[])

  useEffect (() => {
    if (Click) {
      history.push({
                    pathname: '/single-profile',
                    userId: glitterUid // Your userId
                  })
  }
  },[Click])

    // useEffect(() => {
    //     if (!!userData) {
    //
    //     }
    // }, [userData])
//  console.log(friendList);
//   console.log(fetchedProfile);
    const makeMeLive = () => {

    }

    return(
  <section className="home-wrapper">
  <img className="bg-mask" src="/assets/images/mask-bg.png" alt="Mask" />
  <div className="home-inner">
    <div className="container-fluid p-0">
      <div className="row no-gutters">
        <div className="col-lg-3 option-bar p-3 vh-100 position-fixed">
          <div className="logo-tab mb-5 d-flex justify-content-between align-items-start">
            <a href="javascript:void(0)">
              <img src="/assets/images/glitters.png" alt="Glitters" />
            </a>
            <span className="chat-point">
              <a href="javascript:void(0)">
                <i className="fas fa-comment" />
              </a>
            </span>
          </div>
         <FilterSide setFilterUser={setFilterUser}/>
        </div>
        <div className="col-lg-9 main-bar p-3" style={{marginLeft: '25%'}}>
          <div className="tab-top d-flex flex-wrap-wrap">
            <div className="live-icon">
              <img src="/assets/images/live.png" alt="Live" />
            </div>
            <NavLinks />
          </div>
          <div className="search-section-wrapper mt-4 px-4">
            <div className="users-listing">
              <div class="add__status" onClick={makeMeLive}>+</div>

        <OwlCarousel  options={options}  >
        {friendList.map((item, i) =>(
        // (statusLength.error=="") ?
         <div className="users-listing__slider__items" onClick={() =>  setFriendId(item.user_id)} id={item.user_id}  >
            <div className="users-listing__slider__items__image"  data-toggle="modal" data-target="#status-modal" >
           {!!friendList ? <img src={item.profile_images} alt="marlene" /> : ""}
              <span className="circle-shape" />
            </div>
          </div>
          // : ""
         ))}

        </OwlCarousel>



      </div>
            <div className="search-people-row">
              <div className="row">
                {friendList.map((item,i) => {
               return <div className=" main col-md-3" id={item.user_id}  >
                  <div className="sp-singular">
                    <a href="javascript:void(0)">
                      <figure>
                        <img src={item.profile_images} alt="Marlene" />
                      </figure>
                      <div className="sp-singular-content">
                      {item.online == '0'? <div className="status offline">Offline</div>: <div className="status online">Online</div>}

                        <h4>{item.first_name + ' ' + item.last_name} <span className="age">{item.age}</span></h4>
                        <div className="info">{item.distance}, {item.occupation}</div>
                      </div>
                    </a>
                  </div>
                </div>
                })}
                <div className="col-md-3">
                  <div className="sp-singular">
                    <a href="javascript:void(0)">
                      <figure>
                        <img src="/assets/images/marlene.png" alt="Marlene" />
                      </figure>
                      <div className="sp-singular-content">
                        <div className="status online">Online</div>
                        <h4>Marlene, <span className="age">21</span></h4>
                        <div className="info">55km, Art. Director</div>
                      </div>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="modal fade" id="status-modal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">

  <div className="modal-dialog" role="document">

         <div className="modal-body p-0">
        <div className="status-info">
          <div className="status_image">
            <img src="/assets/images/marlene_user.jpg" alt="user" />
          </div>
          <div className="status_heading">
            <h6>{statusData.first_name}• {statusData.age}</h6>
            <span className="timer d-block">9 Seconds</span>

            <span className="status_view"><img src="/assets/images/eye-icon.svg" alt="eye" /></span>

           </div>
        </div>
        <OwlCarousel  options={statusoptions} id="status-bar">
     {!!storyData && <>
     {storyData.map((items ,i) => {
       return <div className="status-bar__items">
         {items.statuses_type==1 ?  <img src={items.file} alt="status" /> : <video src={items.file} alt="status" />}

          </div>
        })}
        </>
     }
        {
          <></>
        }


        </OwlCarousel>



      </div>

    <div className="status_footer">
      <div className="status_like">
        <span><img src="/assets/images/heart-icon.svg" alt="like status" /> 2,190</span>
      </div>
      <div className="user_connect ml-auto">
        <ul>
          <li className="bg-grd-clr"><img src="/assets/images/message.svg" alt="message" /></li>
          <li className="bg-grd-clr"><img src="/assets/images/call-answer.svg" alt="call" /></li>
          <li className="bg-grd-clr"><img src="/assets/images/video-call.svg" alt="video call" /></li>
          <li className="bg-grd-clr"><img src="/assets/images/gift.svg" alt="gift" /></li>
          <li className="bg-grd-clr"><img src="/assets/images/dots-icon.svg" alt="gift" /></li>
        </ul>
      </div>
    </div>
  </div>

</div>

</section>


    )
}
export default SearchHome;



