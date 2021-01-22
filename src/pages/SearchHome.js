
import React, { useState, useEffect } from "react";
import $ from 'jquery';
import {  useHistory } from 'react-router';
import axios from "axios";
import NavLinks from '../components/Nav';
import FilterSide from '../components/Filter';
import { FRIENDLIST_API} from '../components/Api';
import {Modal, ModalBody , Dropdown} from 'react-bootstrap';

let isMouseClick = false, startingPos = [], glitterUid;
const SearchHome = () =>{
  const history = useHistory();
  const [fetchedProfile, setFilterUser] = useState('');
 const [ friendList  , setFriendlist] = useState([]);

 const [Click, setClick] = useState(false);
 const [StartPosition, setStartPosition] = useState([])
 const [showStatus , setShowStatus] = useState(false);

 const handleStatus = () => setShowStatus(true);

  const handleFriendList = async() => {
    const bodyParameters ={
      session_id : localStorage.getItem('session_id')
    }
    const {data :{data}}= await axios.post(FRIENDLIST_API,bodyParameters)
    setFriendlist(data); 
    
  }
 
  useEffect (() => {
    handleFriendList();
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
    },[])

  useEffect (() => {
    if (Click) {
      history.push({
                    pathname: '/single-profile',
                    userId: glitterUid // Your userId
                  })
  }
  },[Click])
 console.log(friendList);
  console.log(fetchedProfile);
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
              <div className="owl-carousel owl-theme users-listing__slider">
                <div className="users-listing__slider__items">
                  <div className="users-listing__slider__items__image users-listing__slider__items-grey">
                    <img src="/assets/images/marlene_user.jpg" alt="marlene" />
                  </div>
                </div>
                <div className="users-listing__slider__items" onClick={handleStatus}>
                  <div className="users-listing__slider__items__image">
                    <img src="/assets/images/marlene_user.jpg" alt="marlene" />
                  </div>
                  <span className="live">Live</span>
                </div>
                <div className="users-listing__slider__items">
                  <div className="users-listing__slider__items__image">
                    <img src="/assets/images/marlene_user.jpg" alt="marlene" />
                    <span className="circle-shape" />
                  </div>
                </div>
                <div className="users-listing__slider__items">
                  <div className="users-listing__slider__items__image">
                    <img src="/assets/images/marlene_user.jpg" alt="marlene" />
                  </div>
                  <span className="circle-shape" />
                </div>
                <div className="users-listing__slider__items">
                  <div className="users-listing__slider__items__image">
                    <img src="/assets/images/marlene_user.jpg" alt="marlene" />
                  </div>
                  <span className="circle-shape" />
                </div>
                <div className="users-listing__slider__items">
                  <div className="users-listing__slider__items__image">
                    <img src="/assets/images/marlene_user.jpg" alt="marlene" />
                  </div>
                  <span className="circle-shape" />
                </div>
                <div className="users-listing__slider__items">
                  <div className="users-listing__slider__items__image">
                    <img src="/assets/images/marlene_user.jpg" alt="marlene" />
                  </div>
                  <span className="circle-shape" />
                </div>
                <div className="users-listing__slider__items">
                  <div className="users-listing__slider__items__image">
                    <img src="/assets/images/marlene_user.jpg" alt="marlene" />
                  </div>
                  <span className="circle-shape" />
                </div>
                <div className="users-listing__slider__items">
                  <div className="users-listing__slider__items__image">
                    <img src="/assets/images/marlene_user.jpg" alt="marlene" />
                  </div>
                  <span className="circle-shape" />
                </div>
                <div className="users-listing__slider__items">
                  <div className="users-listing__slider__items__image">
                    <img src="/assets/images/marlene_user.jpg" alt="marlene" />
                  </div>
                </div>
                <div className="users-listing__slider__items">
                  <div className="users-listing__slider__items__image">
                    <img src="/assets/images/marlene_user.jpg" alt="marlene" />
                  </div>
                  <span className="circle-shape" />
                </div>
                <div className="users-listing__slider__items">
                  <div className="users-listing__slider__items__image">
                    <img src="/assets/images/marlene_user.jpg" alt="marlene" />
                  </div>
                  <span className="circle-shape" />
                </div>
                <div className="users-listing__slider__items">
                  <div className="users-listing__slider__items__image">
                    <img src="/assets/images/marlene_user.jpg" alt="marlene" />
                  </div>
                  <span className="live">Live</span>
                </div>
                <div className="users-listing__slider__items">
                  <div className="users-listing__slider__items__image">
                    <img src="/assets/images/marlene_user.jpg" alt="marlene" />
                  </div>
                  <span className="circle-shape" />
                </div>
                <div className="users-listing__slider__items">
                  <div className="users-listing__slider__items__image">
                    <img src="/assets/images/marlene_user.jpg" alt="marlene" />
                  </div>
                  <span className="live">Live</span>
                </div>
                <div className="users-listing__slider__items">
                  <div className="users-listing__slider__items__image">
                    <img src="/assets/images/marlene_user.jpg" alt="marlene" />
                  </div>
                  <span className="circle-shape" />
                </div>
                <div className="users-listing__slider__items">
                  <div className="users-listing__slider__items__image">
                    <img src="/assets/images/marlene_user.jpg" alt="marlene" />
                  </div>
                  <span className="live">Live</span>
                </div>
                <div className="users-listing__slider__items">
                  <div className="users-listing__slider__items__image">
                    <img src="/assets/images/marlene_user.jpg" alt="marlene" />
                  </div>
                  <span className="circle-shape" />
                </div>
                <div className="users-listing__slider__items">
                  <div className="users-listing__slider__items__image">
                    <img src="/assets/images/marlene_user.jpg" alt="marlene" />
                  </div>
                  <span className="circle-shape" />
                </div>
                <div className="users-listing__slider__items">
                  <div className="users-listing__slider__items__image">
                    <img src="/assets/images/marlene_user.jpg" alt="marlene" />
                  </div>
                  <span className="circle-shape" />
                </div>
                <div className="users-listing__slider__items">
                  <div className="users-listing__slider__items__image">
                    <img src="/assets/images/marlene_user.jpg" alt="marlene" />
                  </div>
                  <span className="circle-shape" />
                </div>
              </div>
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
  <Modal className =" status-modal"   show={showStatus} onHide={() => setShowStatus(false)}   aria-labelledby="example-modal-sizes-title-sm">
  </Modal>
</section>


    )
}
export default SearchHome;



