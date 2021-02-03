
import React, { useState, useEffect } from "react";
import $ from 'jquery';
import {  useHistory } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import NavLinks from '../components/Nav';
import FilterSide from '../components/Filter';
import { ADD_STATUS , FRIENDLIST_API , GET_STATUS} from '../components/Api';
import {Modal, ModalBody , Dropdown} from 'react-bootstrap';
import OwlCarousel from 'react-owl-carousel2';
import {SOCKET} from '../components/Config';
import {useDispatch, useSelector} from "react-redux";
import {userProfile} from "../features/userSlice";
import {generateLiveVideoChatToken} from "../api/videoApi";

let isMouseClick = false, startingPos = [], glitterUid, friendLists = [], userData= null;
const SearchHome = () =>
{
    const history = useHistory();
    const dispatch = useDispatch();
    const[randomNumber, setRandomNumber] = useState('');
    const [fetchedProfile, setFilterUser] = useState('');
    const [ friendList  , setFriendlist] = useState([]);

    const [Click, setClick] = useState(false);
    const [StartPosition, setStartPosition] = useState([])
    const [statusData , setStatusData] = useState({});
    const [storyData , setStoryData] = useState([]);
    const[ friendId , setFriendId] = useState('');
    const [statusLength , setStatusLength] = useState("");
    const [showLive,setShowLive] = useState(false);
    const [showPencil , setShowPencil] = useState(false);
    const[pencilData , setPencilData] = useState('')
    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState(null);
    const[FileName , setFileName] = useState(null);
    const [videoData, setVideoData] = useState(null);
    const [video, setVideo] = useState(null);
    const [showUploadStatus,setUploadStatus] = useState(false);

    userData = useSelector(userProfile).user.profile; //using redux useSelector here
    console.log(userData, "test")
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

const handleFileChange = e => {
  var data = e.target.files[0];
  const filename =  e.target.files[0];
  const fileName = data.name.split(".");
  const imageFormat = fileName[fileName.length - 1];
   if (e.target.files[0]) {

     if (imageFormat === "png" || imageFormat === "jpg" || imageFormat === "jpeg" ||
     imageFormat==="SVG"||imageFormat==="svg"||imageFormat === "PNG" || imageFormat === "JPG" || imageFormat === "JPEG") 
     {
       console.log("picture: ", e.target.files[0]);
       setPicture(e.target.files[0]);
       const reader = new FileReader();
       reader.addEventListener("load", () => {
         setImgData(reader.result); 
         setVideoData('image');
        console.log(fileName ,"fileName...");
       });
       reader.readAsDataURL(e.target.files[0]);
     }
     else if(imageFormat === "mp4" || imageFormat === "MP4")
     {
       console.log("video_file: ", e.target.files[0]);
       setPicture(e.target.files[0]);
       const reader = new FileReader();
       reader.addEventListener("load", () => {
         setImgData(reader.result); 
         setVideoData('video');
       });
       reader.readAsDataURL(e.target.files[0]);
     }
     else
     {
       console.log("Invlid format");
     }
    }
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
          friendLists = friendList;
        setFriendlist(friendList);
        setStatusLength(response.data.data.statuses);
      }
 }, (error) => {
  friendLists = []
  setFriendlist('');
});
  }
   console.log(statusLength ,"...statuslength" );
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

 const handlePencil = () => {
  setShowPencil(true);
  setVideoData('text');
  setPicture(null);
 }
 
 const modelClose= () => {
   setUploadStatus(false);
   setShowPencil(false);
   setPicture(null);
   setVideoData(null);
   setPencilData('');
 }

const config = {
 headers : {
           Accept: "application/json",
           "Content-Type": "multipart/form-data",
       }
 }

const handleUploadStatus =() => 
{
  if (videoData=='image')
  {
  const bodyParameters =new FormData();
  bodyParameters.append("session_id", "" + localStorage.getItem('session_id'));
  bodyParameters.append("status", picture);
  bodyParameters.append("status_type", "" + 1);
  axios.post(ADD_STATUS , bodyParameters , config)
  .then((response)=> {
   setUploadStatus(false);
   setPicture('');
 } ,(error) => {
 });
  }
  else if (videoData=='video'){
   const bodyParameters =new FormData();
   bodyParameters.append("session_id", "" + localStorage.getItem('session_id'));
   bodyParameters.append("status", picture);
   bodyParameters.append("status_type", "" + 2);
   axios.post(ADD_STATUS , bodyParameters , config)
   .then((response)=> {
    setUploadStatus(false);
  } ,(error) => {
 });
  }
  else if (videoData=='text'){
   const bodyParameters =new FormData();
   bodyParameters.append("session_id", "" + localStorage.getItem('session_id'));
   bodyParameters.append("status", pencilData);
   bodyParameters.append("status_type", "" + 3);
   axios.post(ADD_STATUS , bodyParameters , config)
   .then((response)=> {
    setUploadStatus(false);
    setPencilData('');
    setShowPencil(false);
  } ,(error) => {
 });
  }
 }
console.log(picture);

const uploadImage = () => {
 // Click event for status uplaod screen
 $(document).on("click", "#upload__media", function () {
   $('#upload_fle').trigger("click");
 });

 $(document).on("click", "#upload_fle", function (e) {
   e.stopPropagation();
   //some code
});

}
 const componentWillUnmount = () => {
     // alert("stop")
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

      SOCKET.on('sendAudienceToLiveVideo', (data) => {
        console.log(userData, data, "kkkkkk")
          if (userData.user_id === data.user_id) {
              // $('#live-modal').hide();
              // setShowLive(false)
              var newState = {};
              newState.user_id = data.user_id;
              newState.call_type = 2;
              newState.channel_id = data.channel_id;
              newState.channel_name = data.channel_name;
              newState.channel_token = data.channel_token;
              localStorage.setItem("liveVideoProps", JSON.stringify(newState))
              history.push('/'+data.host_id+ '/' + uuidv4() +'/'+ data.channel_name + '/live-video-chat')
          }
      })

    SOCKET.on('live_friends', (data) => {
        let frdList = friendLists;
        console.log(frdList, "mmmm")
        const totalLiveFrds = data;
        console.log(totalLiveFrds, "totalLiveFrds...")
        for (let i in frdList) {
            for (let j in totalLiveFrds) {
                if (totalLiveFrds[j].user_id === frdList[i].user_id) {
                    frdList[i].is_live = true;
                    frdList[i].channel_id = uuidv4();
                    frdList[i].channel_name = totalLiveFrds[j].channel_name;
                    frdList[i].channel_token = totalLiveFrds[j].channel_token;
                }
            }
        }
        setFriendlist(frdList);
        setRandomNumber(Math.random());
        console.log(frdList, "data test")
    });
      SOCKET.on('start_your_live_video_now', (data) => {
          console.log(data, userData, "start live video link...");
          if ((data.user_id == userData.user_id) && data.channel_id && data.channel_name) {
              // $('#live-modal').hide();
              // setShowLive(false)
              history.push(data.user_id+ '/' + data.channel_id +'/'+ data.channel_name + '/live-video-chat')
          }
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
    uploadImage();
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
        const bodyParameters ={
            session_id: localStorage.getItem("session_id"),
            user_id: userData.user_id,
            type: 1
        }
        const call_type = 1, user_id = userData.user_id;
        generateLiveVideoChatToken(dispatch, bodyParameters, call_type, user_id, uuidv4(), SOCKET);

    }
    const makeMeAudience = (item) => {
        setFriendId(item.user_id);
        if (item.is_live) {
            SOCKET.emit("addAudienceToLiveVideo", {
                user_id: userData.user_id,
                channel_name: item.channel_name,
                channel_token: item.channel_token,
                is_host: false
            })
        }
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
              <img src="/assets/images/live.png" style={{cursor: "pointer"}} onClick={makeMeLive} alt="Live" />
            </div>
            <NavLinks />
          </div>
          <div className="search-section-wrapper mt-4 px-4">
            <div className="users-listing">
                <div className="add__status" onClick={() =>setUploadStatus(true)}>+</div>

                <div className="status__slider">
        <OwlCarousel  options={options}  >
        {friendList.map((item, i) =>(
        // (statusLength.error=="") ?
         <div className="users-listing__slider__items" onClick={() =>  makeMeAudience(item)} id={item.user_id}  >
            <div className="users-listing__slider__items__image"  data-toggle="modal" data-target="#status-modal" >
           {!!friendList ? <img src={item.profile_images} alt="marlene" /> : ""}
              <span className="circle-shape" />
            </div>
             {
                 item.is_live === true &&
                 <span className="live">Live</span>
             }
          </div>
          // : ""
         ))}

        </OwlCarousel>
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
                      {item.online == ''? <div className="status offline">Offline</div>: <div className="status online">Online</div>}

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
<Modal className ="theme-modal" id="upload-media-modal" show={showUploadStatus} onHide={() => setUploadStatus(false)} backdrop="static" keyboard={false}>
          {/* Modal start here */}
          {/* <div className="theme-modal" id="live-modal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> */}
         
          <form action="" id="glitter_status" >
                  <div className="modal-body p-0">
                    <div className="upload__status__opt text-center">
                    <h2>Upload Status</h2>
                    <div className="upload-status d-flex justify-content-center mt-5">
                      <a id="upload__media" className="upload__media bg-grd-clr"  href="javascript:void(0)">
                      <i className="fas fa-camera"></i>
                      <input type="file"  name="file" value="" id="upload_fle" className="d-none" onChange={handleFileChange} accept="image/* , video/*"  />
                      
                      </a>
                      <a className="upload__text bg-grd-clr" href="javascript:void(0)" onClick={handlePencil}>
                        <i className="fas fa-pencil-alt"></i>
                        </a>
                      
                        </div>
                        {!!picture && videoData=='image' ?
                      
                        <div className="preview">
                        
                        <img  id="PreviewPicture" src={imgData} />
                        </div>
                        : videoData == 'video' ?
                        <div className="preview">
                             
                           <video id="video_preview" src={imgData} width="300" height="300" controls></video>
                            
                           </div>
                           : videoData == 'text' ?
                           <div className="text__status">
                           {!!showPencil ?<textarea className="form-control" name="upload_text"  value={pencilData} onChange={e => setPencilData(e.target.value)} placeholder="write text" /> : ""} 
                            </div>
    
                           :""
                          }
                         
                       
                        <a className="btn bg-grd-clr btn-small mt-4" onClick={handleUploadStatus}>Publish Status</a>

                    </div>
                    
                        
                    </div>
             </form>
            
          {/* </div> */}
          {/* End Modal start here */}
          <a href="javascript:void(0)" className="modal-close" onClick={modelClose}><img src="/assets/images/btn_close.png" /></a>
      </Modal>

</section>


    )
}
export default SearchHome;



