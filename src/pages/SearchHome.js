
import React, { useState, useEffect } from "react";
import $ from 'jquery';
import {  useHistory } from 'react-router';
import axios from "axios";
import NavLinks from '../components/Nav';
import FilterSide from '../components/Filter';
import { FRIENDLIST_API , GET_STATUS} from '../components/Api';
import {Modal, ModalBody , Dropdown} from 'react-bootstrap';
import OwlCarousel from 'react-owl-carousel2';

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

 const [showLive,setShowLive] = useState(false);

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
        setFriendlist(response.data.data);
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
//  console.log(friendList);
//   console.log(fetchedProfile);

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
              <div class="add__status" onClick={() => setShowLive(true)}>+</div>
      
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

<Modal className ="theme-modal edit-payment-modal" id="live-modal" show={showLive} onHide={() => setShowLive(false)} backdrop="static" keyboard={false}>
      {/* Modal start here */}
{/* <div className="theme-modal" id="live-modal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> */}
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-body p-0">
        <div className="live-wrapper">
          <div className="live__leftblk">
            <div className="live_info d-flex">
              <div className="live_img">
                <img src="/assets/images/go-live.jpg" alt="live user" />
                <span>change cover</span>
              </div>
              <div className="live_title">
                <h5>Add a title to chat</h5>
              </div>
            </div>
            <div className="live_share">
              <span>Share to</span>
              <ul>
                <li><a href="javascript:void(0)"><i className="fab fa-facebook-f" /></a></li>
                <li><a href><i className="fab fa-instagram" /></a></li>
              </ul>
            </div>
            <div className="block_countries">
              <div className="block_countries__list">
                <img src="/assets/images/add-countries.svg" alt="add countries" />
              </div>
              <div className="block_countries__list">
                <img src="/assets/images/india-flag.svg" alt="india" />
                <div className="block_countries__info">
                  <span>India</span>
                  <a href="javascript:void(0)" className="del-country"><img src="/assets/images/country-close.svg" alt="close" /></a>
                </div>                                    
              </div>
              <div className="block_countries__list">
                <img src="/assets/images/nigeria.svg" alt="nigeria" />
                <div className="block_countries__info">
                  <span>India</span>
                  <a href="javascript:void(0)" className="del-country"><img src="/assets/images/country-close.svg" alt="close" /></a>
                </div>                                    
              </div>
            </div>
          </div>
          <div className="live_rightblk  text-center">
            <h5 className="mb-4">Select Tag</h5>
            <div className="tags">   
              <div className="live-tags">
                <input type="checkbox" defaultValue id="tag-1" />
                <label htmlFor="tag-1">Make friends</label>
              </div>
              <div className="live-tags">
                <input type="checkbox" defaultValue id="tag-2" />
                <label htmlFor="tag-2">Meet People</label>
              </div>
              <div className="live-tags">
                <input type="checkbox" defaultValue id="tag-3" />
                <label htmlFor="tag-3">Enjoy</label>
              </div>
              <div className="live-tags">
                <input type="checkbox" defaultValue id="tag-4" />
                <label htmlFor="tag-4">Naughty</label>
              </div>
              <div className="live-tags">
                <input type="checkbox" defaultValue id="tag-5" />
                <label htmlFor="tag-5">Lovense Lush On</label>
              </div>
              <div className="live-tags">
                <input type="checkbox" defaultValue id="tag-6" />
                <label htmlFor="tag-6">Wet Show</label>
              </div>
              <div className="live-tags">
                <input type="checkbox" defaultValue id="tag-7" />
                <label htmlFor="tag-7">Sing Show</label>
              </div>
              <div className="live-tags">
                <input type="checkbox" defaultValue id="tag-8" />
                <label htmlFor="tag-8">Modeling</label>
              </div>
              <div className="live-tags">
                <input type="checkbox" defaultValue id="tag-9" />
                <label htmlFor="tag-9">Talk About Cultures</label>
              </div>
              <div className="live-tags">
                <input type="checkbox" defaultValue id="tag-10" />
                <label htmlFor="tag-10">Spin Wheel</label>
              </div>
            </div>
          </div>
          <div className="live-option w-100 text-center">
            <button className="btn bg-grd-clr">Go live</button>
            <div className="live-type mt-4">
              <span className="active">Group Chat Live</span>
              <span>Live</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  
  </div>
{/* </div> */}
{/* End Modal start here */}
      
           <a href="javascript:void(0)" className="modal-close" onClick={() => setShowLive(false)}><img src="/assets/images/btn_close.png" /></a>
    </Modal>


</section>


    )
}
export default SearchHome;



