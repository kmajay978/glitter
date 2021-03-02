import React, { useState, useEffect } from "react";
import Stories from 'react-insta-stories';
import $ from 'jquery';
import {  useHistory } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import NavLinks from '../components/Nav';
import FilterSide from '../components/Filter';
import { ADD_STATUS , FRIENDLIST_API , GET_STATUS , VIEW_LIKE_STATUS} from '../components/Api';
import {Modal, ModalBody , Dropdown} from 'react-bootstrap';
import OwlCarousel from 'react-owl-carousel2';
import {SOCKET} from '../components/Config';
import {useDispatch, useSelector} from "react-redux";
import {userProfile} from "../features/userSlice";
import {generateLiveVideoChatToken} from "../api/videoApi";
import {addDefaultSrc, returnDefaultImage} from "../commonFunctions";
import useToggle from '../components/CommonFunction';
import SyncLoader from "react-spinners/SyncLoader";
import { css } from "@emotion/core";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {friendStatus} from '../features/userSlice'
import StatusUser from "../pages/StatusUser";
import { Link } from "react-router-dom";

let isMouseClick = false, startingPos = [], glitterUid, friendLists = [], userData= null, checkOnlineFrdsInterval;

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

const SearchHome = () =>
{
    const history = useHistory();
    const dispatch = useDispatch();
    
    const [statusModel, setStatusModel] = useState(false);
    const [randomNumber, setRandomNumber] = useState('');
    const [fetchedProfile, setFilterUser] = useState('');
    const [ friendList  , setFriendlist] = useState([]);
    const [isOn, toggleIsOn] = useToggle(false);
    const [Click, setClick] = useState(false);
    const [StartPosition, setStartPosition] = useState([])
    const [statusData , setStatusData] = useState({});
    const [storyData , setStoryData] = useState([]);
    const [ friendId , setFriendId] = useState('');
    const [statusId , setStatusId] = useState([]);
    const [statusLength , setStatusLength] = useState("");
    const [showLive,setShowLive] = useState(false);
    const [showPencil , setShowPencil] = useState(false);
    const [pencilData , setPencilData] = useState('')
    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState(null);
    const [FileName , setFileName] = useState(null);
    const [videoData, setVideoData] = useState(null);
    const [video, setVideo] = useState(null);
    const [showUploadStatus,setUploadStatus] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    userData = useSelector(userProfile).user.profile; //using redux useSelector here
 const options = {
  loop: false,
  margin: 20,
  items: 13,
  nav: false,
  autoplay: true
};

const storyContent = {
  width: '100%',
  maxWidth: '100%',
  maxHeight: '468px',
  margin: 'auto'
}

const stories = !!storyData ? storyData : [];
console.log(stories, "stories...")

// console.log(storyData, "yuyuyuyu")
  
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


const SingleProfileView = (id) =>{
  console.log(id,"idssss...");
  history.push({
    pathname: '/'+id+'/single-profile'
  })
}

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
    setIsLoaded(true);
    const bodyParameters ={
      session_id : localStorage.getItem('session_id')
    }
   axios.post(FRIENDLIST_API,bodyParameters)
    .then((response) => {
      // if(response.error=="bad_request")
      // {
      //   localStorage.removeItem("session_id");
      //   history.push('/login');
      // }
      if (response.status === 200 ) {
        setIsLoaded(false);
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
  if (error.toString().match("403")) {
    localStorage.removeItem("session_id");
    history.push('/login');
  }
  friendLists = []
  setFriendlist('');
  setIsLoaded(true);

});
  }
  //Like view status api
  const ViewStatus =() =>{

  }

  const handleStatus = () =>
  {
    setIsLoaded(true);
    const bodyParameters = {
      user_id: friendId,
    };
    axios.post(GET_STATUS,bodyParameters)
    .then((response) => {
      setIsLoaded(false);
      if (response.status === 200 && !response.status.error) {
      
        if (!!response.data && !!response.data.result && response.data.result.length > 0 ) {
          // $('#modal').show(); 
          setStatusData(response.data);


          setStoryData(response.data.result);
          toggleIsOn(true)
        }
        else {
          setStatusData({});
        setStoryData([]);
        toggleIsOn(false)
        setFriendId('');
      }
    }
      else {
        setStatusData({});
        setIsLoaded(false);
        setFriendId('');
      }

 }, (error) => {
    setStatusData({});
    setIsLoaded(false);
    setFriendId('');
});
  }

  useEffect  (() => {
    handleStatus();
    console.log(friendId,"hhhhhfriendId....")
   },[friendId])
 
// console.log(statusData);
//  console.log(storyData);

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
   dispatch(friendStatus({friendStatus: []}));
   setStatusModel(false);
   setFriendId('');
 }

const config = {
 headers : {
           Accept: "application/json",
           "Content-Type": "multipart/form-data",
       }
 }

 const closeDialog = () => {
  toggleIsOn(false);
  setIsLoaded(false);
  setFriendId("")
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
    // if(response.error=="bad_request")
    // {
    //   localStorage.removeItem("session_id");
    //   history.push('/login');
    // }
  if(response.status==200){
   createNotification('sucess');
   setTimeout(() => {
    setUploadStatus(false);
  }, 1500);
   setPicture('');
  }
 } ,(error) => {
  if (error.toString().match("403")) {
    localStorage.removeItem("session_id");
    history.push('/login');
  }
 });
  }
  else if (videoData=='video'){
   const bodyParameters =new FormData();
   bodyParameters.append("session_id", "" + localStorage.getItem('session_id'));
   bodyParameters.append("status", picture);
   bodyParameters.append("status_type", "" + 2);
   axios.post(ADD_STATUS , bodyParameters , config)
   .then((response)=> {
    // if(response.error=="bad_request")
    // {
    //   localStorage.removeItem("session_id");
    //   history.push('/login');
    // }
     if(response.status==200){
    createNotification('sucess');
    setTimeout(() => {
      setUploadStatus(false);
    }, 1500);
  }
  } ,(error) => {
    if (error.toString().match("403")) {
      localStorage.removeItem("session_id");
      history.push('/login');
    }
 });
  }
  else if (videoData=='text'){

        //Converting text to image here
       var tCtx = document.getElementById('textCanvas').getContext('2d'),
          imageElem = document.getElementById('image');

          // tCtx.canvas.width = tCtx.measureText(pencilData).width;
          // tCtx.fillText(pencilData, 10, 50);
    
          tCtx.canvas.width = 375;
          tCtx.canvas.height = 460;

      //     tCtx.fillStyle = "#fff";
      //     tCtx.font = '20px san-serif';
      //     tCtx.canvas.setAttribute('style', 'background-color:#fff');
      //     var textString = pencilData,
      //         textWidth = tCtx.measureText(textString ).width;
      // tCtx.fillText(textString , (tCtx.canvas.width/2) - (textWidth / 2), 100);

// here
// var canvas = document.createElement('canvas');
// var ctx    = canvas.getContext('2d');
// canvas.style.border = "1px solid black";
// document.body.appendChild(canvas);

function todo(ctx, text, fontSize, fontColor) {
    var max_width  = 375;
    var fontSize   =  12;
    var lines      =  new Array();
    var width = 0, i, j;
    var result;
    var color = fontColor || "white";

    // Font and size is required for ctx.measureText()
    ctx.font   = fontSize + "px Arial";

    
    // Start calculation
    while ( text.length ) {
    	for( i=text.length; ctx.measureText(text.substr(0,i)).width > max_width; i-- );
    
    	result = text.substr(0,i);
    
    	if ( i !== text.length )
    		for( j=0; result.indexOf(" ",j) !== -1; j=result.indexOf(" ",j)+1 );
    	
    	lines.push( result.substr(0, j|| result.length) );
    	width = Math.max( width, ctx.measureText(lines[ lines.length-1 ]).width );
    	text  = text.substr( lines[ lines.length-1 ].length, text.length );
    }
    
    
    // Calculate canvas size, add margin
    ctx.canvas.width  = 14 + width;
    ctx.canvas.height =  8 + ( fontSize + 5 ) * lines.length;
    ctx.font   = fontSize + "px Arial";

    // Render
    ctx.fillStyle = color;
    for ( i=0, j=lines.length; i<j; ++i ) {
    	ctx.fillText( lines[i], 8, 5 + fontSize + (fontSize+5) * i );
    }
}

todo(tCtx, pencilData, 12, "white");
$('canvas').remove();
document.getElementById("image").remove()
// Working here end
          imageElem.src = tCtx.canvas.toDataURL();

          const bodyParameters =new FormData();
          bodyParameters.append("session_id", "" + localStorage.getItem('session_id'));
          bodyParameters.append("status", imageElem.src);
          bodyParameters.append("status_type", "" + 3);

   axios.post(ADD_STATUS , bodyParameters , config)
   .then((response)=> {
   
     if(response.status==200){
    createNotification('sucess');
    setTimeout(() => {
      setUploadStatus(false);
    }, 1500);
    
    setPencilData('');
    setShowPencil(false);
  }
  } ,(error) => {
    if (error.toString().match("403")) {
      localStorage.removeItem("session_id");
      history.push('/login');
    }
 });
  }
 }
console.log(picture);

const createNotification = (type) => {
  
  switch (type) {
      case 'sucess':
        NotificationManager.success('status upload Successfully ', 'status');
        break;
    case 'error':
      NotificationManager.error('Error message', 'Click me!', 5000, () => {
        
      });
      break; 
};
};


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
    clearInterval(checkOnlineFrdsInterval)
 }
  useEffect (() => {
    handleFriendList();
    window.setTimeout(() => {
      $(".main-status")
   .mousedown(function (evt) {
     isMouseClick = true;
     glitterUid =  $(".main-status")

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
          setClick(isMouseClick);
       } else {
         isMouseClick = true;
          setClick(isMouseClick);
       }
       startingPos = [];
       setStartPosition(startingPos)
   });
   }, 1000);

    SOCKET.connect();
      checkOnlineFrdsInterval = window.setInterval(() => {
          console.log("interval started....")
          SOCKET.emit("authenticate_friend_list_live", {
              session_id: localStorage.getItem("session_id")
          });
      }, 5000)
 
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
        const totalLiveFrds = data.live;
        const onlineUsers = data.online;
        console.log(totalLiveFrds, "totalLiveFrds...")
        for (let i in frdList) {
            frdList[i].is_live = false;
            frdList[i].online = false;
            for (let k in onlineUsers) {
              if (frdList[i].user_id == onlineUsers[k].user_id) {
                 frdList[i].online = true
              }
            }
            for (let j in totalLiveFrds) {
                if (totalLiveFrds[j].user_id == frdList[i].user_id) {
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


//  console.log(friendList);
//   console.log(fetchedProfile);

    const makeMeLive = () => {
        const bodyParameters ={
            session_id: localStorage.getItem("session_id"),
            user_id: userData.user_id,
            type: 3
        }
        const call_type = 1, user_id = userData.user_id;
        generateLiveVideoChatToken(dispatch, history, bodyParameters, call_type, user_id, uuidv4(), SOCKET);

    }
    const makeMeAudience = ( item ) => {
        setFriendId(item.user_id);
        // if(!!item.result.status_id){
        //  item.result.map((item , index)=>{
        //   setStatusId(item.status_id);
        //  })
        // }
        if (item.is_live) {
            SOCKET.emit("addAudienceToLiveVideo", {
                user_id: userData.user_id,
                channel_name: item.channel_name,
                channel_token: item.channel_token,
                is_host: false
            })
        }
    }
console.log(statusId);
    const convertToHtml = (data) => {
       const convertedHtml =  {__html: data};
      return <div dangerouslySetInnerHTML={convertedHtml} />
    }
    
    const playVideo = (video) => {
      window.setTimeout(() => {
        console.log(document.getElementById(video), "kkkkk")
          document.getElementById(video).play();
      }, 1000)
      return <video id= {video} src={video} alt="status" />
    }
    return(
  <section className="home-wrapper">
  <img className="bg-mask" src="/assets/images/mask-bg.png" alt="Mask" />
  <div className="home-inner">
    <div className="container-fluid p-0">
      <div className="row no-gutters">
        <div className="col-lg-3 option-bar p-3 vh-100 position-fixed">
          <div className="logo-tab mb-5 d-flex justify-content-between align-items-start">
            <Link to="/">
              <img src="/assets/images/glitters.png" alt="Glitters" />
            </Link>
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
           (item.statuses.length > 0 ||  item.is_live === true ) ?
          
         <div className="users-listing__slider__items" onClick={() =>  makeMeAudience(item )} id={item.user_id}  >
         
            <div className="users-listing__slider__items__image" id="modal" data-toggle="modal" >
           {!!friendList ? <img onError={(e) => addDefaultSrc(e)} src={!!item.profile_images ? item.profile_images : returnDefaultImage()} alt="marlene" /> : ""}
            
              
                 <span className="circle-shape" style={{background: item.online ? '#00FF31' : '#f5473bec'}}  />
             
            </div>
             {
                 item.is_live === true &&
                 <span className="live">Live</span>
             }
          </div>
          :""
         ))}

        </OwlCarousel>
                </div>



      </div>
            <div className="search-people-row">
              <div className="row">
                {!!friendList&&
                <> 
                {friendList.map((item,i) => {
               return <div className=" main col-md-3" id={item.user_id} onClick = {() =>SingleProfileView(item.user_id)}>
                  <div className="sp-singular">
                    <a href="javascript:void(0)">
                      <figure>
                        <img onError={(e) => addDefaultSrc(e)} src={!!item.profile_images ? item.profile_images : returnDefaultImage()} alt="Marlene" />
                      </figure>
                      <div className="sp-singular-content">
                      {!item.online? <div className="status offline">Offline</div>: <div className="status online">Online</div>}

                        <h4>{item.first_name + ' ' + item.last_name} <span className="age">{item.age}</span></h4>
                        <div className="info">{item.distance}, {item.occupation}</div>
                      </div>
                    </a>
                    {item.packages.length>0?  <span className="vip-user bg-grd-clr"><img src="/assets/images/level-img.png" alt="profile level"/></span> :""}       
                  </div>
                </div>
                })}
                </>
                }

              </div>
              <SyncLoader color={"#fcd46f"} loading={isLoaded} css={override} size={20} />
            </div>
          </div>
        </div>

      </div>
    
    </div>
  </div>
  <div className={isOn ? 'all-gifts-wrapper active': 'all-gifts-wrapper'} >
    <div className="status-modal">
    <a href="javascript:void(0)" className="close-gift-btn modal-close" onClick={closeDialog}><img src="/assets/images/btn_close.png" /></a>
      <div className="all-gift-body">
      
      {
  stories.length > 0 &&
  
  <Stories
      stories={stories}
      defaultInterval={3000}
      storyStyles={storyContent}
      width={377}
      height={468}
     
     
  />      
}
      </div>
      
    </div>
  </div>
  {/* <div className={isOn ? 'all-gifts-wrapper active': 'all-gifts-wrapper '} >
    <div className="all-gift-inner">
    <a href="javascript:void(0)" className="close-gift-btn modal-close" onClick={closeDialog}><img src="/assets/images/btn_close.png" /></a>
      <div className="all-gift-body">
      
      {
  stories.length > 0 &&
  
  <Stories
      stories={stories}
      defaultInterval={3000}
      width={332}
      height={468}
     
  />      
}
      </div>
      
    </div>
  </div> */}
       

{/* <div className="modal fade" id="status-modal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">

  <div className="modal-dialog" role="document">

<div className="modal-body p-0"> */}
        {/* <div className="status-info">
          <div className="status_image">
            <img src={statusData.profile_images} alt="user" />
          </div>
          <div className="status_heading">
            <h6>{statusData.first_name}• {statusData.age}</h6>
            <span className="timer d-block">9 Seconds</span>

            <span className="status_view"><img src="/assets/images/eye-icon.svg" alt="eye" /></span>

           </div>
        </div> */}
    
        {/* <OwlCarousel  options={statusoptions} id="status-bar">
     {storyData.map((items ,i) => {
       return <div className="status-bar__items">
            {items.statuses_type==1 ?
             <img onError={(e) => addDefaultSrc(e)} src={!!items.file ? items.file : returnDefaultImage()} alt="status" /> :
              (items.statuses_type == 2 ? playVideo(items.file) : 
              convertToHtml(`<p>${items.file.replace("http://167.172.209.57/glitter-101/public/profile_images/", "")}</p>`))
             } </div>
        })}
        </OwlCarousel> */}

      {/* </div> */}

    {/* <div className="status_footer">
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
    </div> */}
  {/* </div> */}

{/* </div> */}
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
                        
                        <img  onError={(e) => addDefaultSrc(e)} id="PreviewPicture" src={!!imgData ? imgData : returnDefaultImage()
                        } />
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
                        <NotificationContainer/>
                    </div>
                    
                        
                    </div>
             </form>
           
          {/* </div> */}
          {/* End Modal start here */}
          <a href="javascript:void(0)" className="modal-close" onClick={modelClose}><img src="/assets/images/btn_close.png" /></a>
      </Modal>
      <canvas id='textCanvas' height={465} width={380} />
            <img id='image' />
</section>


    )
}
export default SearchHome;