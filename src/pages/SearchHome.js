import React, { useState, useEffect, useRef } from "react";
import Stories from 'react-insta-stories';
import $ from 'jquery';
import { useHistory } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import NavLinks from '../components/Nav';
import FilterSide from '../components/Filter';
import { ADD_STATUS, FRIENDLIST_API, GET_STATUS, VIEW_LIKE_STATUS, DETUCT_THOUSAND_COIN } from '../components/Api';
import { Modal } from 'react-bootstrap';
import OwlCarousel from 'react-owl-carousel2';
import { SOCKET } from '../components/Config';
import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "../features/userSlice";
import { generateLiveVideoChatToken } from "../api/videoApi";
import { addDefaultSrc, openNewWindow, returnDefaultImage } from "../commonFunctions";
import useToggle, { removeDublicateFrds } from '../components/CommonFunction';
import { SyncLoader, ClipLoader } from "react-spinners";
import { css } from "@emotion/core";
import { NotificationManager } from 'react-notifications';
import { friendStatus } from '../features/userSlice'
import StatusUser from "../pages/StatusUser";
import { Link } from "react-router-dom";
import Select from 'react-dropdown-select';
import { getCountries } from '../components/Countries';
import { FacebookIcon, FacebookShareButton } from "react-share";

let isMouseClick = false, startingPos = [], glitterUid, friendLists = [], userData = null, checkOnlineFrdsInterval;

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

const statusOverride = css`
text-align: center;
width: 20px;
height:20px;
position: absolute;
left: 0;
right: 0;
margin: 0 auto;
top: 30%;
-webkit-transform: translateY(-30%);
-moz-transform: translateY(-30%);
transform: translateY(-30%);
`;

const SearchHome = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const inputFile = useRef(null);
  const inputVideoFile = useRef(null);

  const [statusModel, setStatusModel] = useState(false);
  const [randomNumber, setRandomNumber] = useState('');
  const [fetchedProfile, setFilterUser] = useState('');
  const [friendList, setFriendlist] = useState([]);
  const [isOn, toggleIsOn] = useToggle(false);
  const [statusData, setStatusData] = useState({});
  const [storyData, setStoryData] = useState([]);
  const [friendId, setFriendId] = useState('');
  const [statusId, setStatusId] = useState([]);
  const [statusLength, setStatusLength] = useState("");
  const [showLive, setShowLive] = useState(false);
  const [showPencil, setShowPencil] = useState(false);
  const [pencilData, setPencilData] = useState('')
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);
  const [video, setVideo] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [FileName, setFileName] = useState(null);
  const [videoData, setVideoData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [video, setVideo] = useState(null);
  const [showLivePopup, setLivePopup] = useState(false);
  const [showUploadStatus, setUploadStatus] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [LiveModel, setLiveModel] = useState({ modal: false, item: null });
  const [audLive, setAudLive] = useState(false)
  const [viewStory, setViewStory] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [countrieBlock, setCountrieBlock] = useState([]);
  const [statusPrice, setStatusPrice] = useState("0")
  // const [statusId , setStatusId] = useState("")
  userData = useSelector(userProfile).user.profile; //using redux useSelector here
  const countries = getCountries();
  console.log(statusPrice);

  const shareUrl = 'https://glittersapp.com/';
  const title = 'glitter-app';

  console.log(countrieBlock, "countries");
  const option = {
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

  const customCollapsedComponent = ({ totalviews, status_id }) => {
    return <>
      {/* 
      <div className="status_heading">
        <span className="status_view"><img src="/assets/images/eye-icon.svg" alt="eye" />{totalviews}</span>
      </div> */}

      <div className="status_footer">
        <span className="status_view"><img src="/assets/images/eye-icon.svg" alt="eye" />{totalviews}</span>
        <div className="status_like" onClick={() => alert(status_id)}>
          <span ><img src="/assets/images/heart-icon.svg" alt="like status" /> 2,190</span>
        </div>
      </div>
    </>
  }

  useEffect(() => {
    if (!!storyData) {
      for (let i in storyData) {
        console.log(storyData[i]);
        storyData[i].header.heading = storyData[i].header.heading + " - " + storyData[i].header.age
        storyData[i].header.subheading = storyData[i].header.subheading.replace("Posted: ", "")
      }
    }
  }, [storyData])

  if (!!storyData) {
    for (let i in storyData) {
      console.log(storyData[i]);
      if(storyData[i].type=="image")
      {
        if(storyData[i].paid_status==false ){
          storyData[i].url = "/assets/images/heart-icon.svg"
      }
      }
      else{
        if(storyData[i].paid_status==false ){
          storyData[i].url = "/assets/images/heart-icon.svg"
      }
      }
      storyData[i].seeMore = () => customCollapsedComponent(storyData[i]);
      storyData[i].seeMoreCollapsed = () => customCollapsedComponent(storyData[i]);
    }
  }

  const stories =
    !!storyData ? storyData : []

  const statusoptions = {
    loop: false,
    slideSpeed: 3000,
    dots: true,
    margin: 0,
    items: 1,
    smartSpeed: 1000,
    nav: false,
    autoplay: true,
    autoplayTimeout: 3000,
  };

  const SingleProfileView = (id) => {
    history.push({
      pathname: `/${id}/single-profile`
    })
  }

  const handleFileChange = e => {
    var data = e.target.files[0];
    // const filename =  e.target.files[0];
    const fileName = data.name.split(".");
    const imageFormat = fileName[fileName.length - 1];
    if (e.target.files[0]) {

      if (imageFormat === "png" || imageFormat === "jpg" || imageFormat === "jpeg" ||
        imageFormat === "SVG" || imageFormat === "svg" || imageFormat === "PNG" || imageFormat === "JPG" || imageFormat === "JPEG") {
        setPicture(e.target.files[0]);
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          setImgData(reader.result);
          setVideoData('image');
        });
        reader.readAsDataURL(e.target.files[0]);
      }
      else {
        NotificationManager.error("Only .png, .jpg, .jpeg image formats supported.", "", 2000, () => { return 0 }, true);
      }
    }
  };

  const handleVideoChange = e => {
    var data = e.target.files[0];
    const fileName = data.name.split(".");
    const imageFormat = fileName[fileName.length - 1];
    if (imageFormat === "mp4" || imageFormat === "MP4" || imageFormat === "mov" || imageFormat === "MOV") {
      if (data.size < 5000024) {
        setVideo(data);
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          setVideoFile(reader.result);
          setVideoData('video');

        });
        reader.readAsDataURL(e.target.files[0]);
      }
      else {

        NotificationManager.error("maximum upload video limit is 5 mb", "", 2000, () => { return 0 }, true);
        setVideoData('');
      }
    }
    else {
      NotificationManager.error("please , Select the video", "", 2000, () => { return 0 }, true);
    }
  }

  // const handleVideoChange = e => {
  //   var data = e.target.files[0];
  //   const fileName = data.name.split(".");
  //   const imageFormat = fileName[fileName.length - 1];
  //   if(imageFormat === "mp4" || imageFormat === "MP4")
  //    {
  //      setPicture(e.target.files[0]);
  //      const reader = new FileReader();
  //      reader.addEventListener("load", () => {
  //        setImgData(reader.result); 
  //        setVideoData('video');
  //      });
  //      reader.readAsDataURL(e.target.files[0]);
  //    }
  //    else
  //    {
  //     alert("invadi format")
  //    }
  // } 

  const handleFriendList = () => {
    setIsLoaded(true);
    const bodyParameters = {
      session_id: localStorage.getItem('session_id')
    }
    axios.post(FRIENDLIST_API, bodyParameters)
      .then((response) => {
        if (response.status === 200) {
          setIsLoaded(false);
          let friendList = response.data.data;

          for (let i in friendList) {
            friendList[i].is_live = false;
          }
          friendLists = friendList;
          setFriendlist(removeDublicateFrds(friendList));
          setStatusLength(response.data.data.statuses);
        }
        else {
          friendLists = []
          setFriendlist('');
          setIsLoaded(true);
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
  const ViewStatus = () => {

  }




  const handleStatus = (user_id) => {
    setStatusLoading(true);
    const bodyParameters = {
      user_id
    };
    axios.post(GET_STATUS, bodyParameters)
      .then((response) => {

        if (response.status === 200 && !response.status.error) {
          setViewStory(true);
          if (!!response.data && !!response.data.result && response.data.result.length > 0) {
            // $('#modal').show(); 
            setStatusData(response.data);
            setStoryData(response.data.result);
            // toggleIsOn(true)

          }
          else {
            setStatusData({});
            setStoryData([]);
            // toggleIsOn(false)
            setFriendId('');

          }
          setStatusLoading(false);
        }
        else {
          setStatusData({});
          setStatusLoading(false);
          setFriendId('');
        }

      }, (error) => {

        setStatusData({});
        setStatusLoading(false);
        setFriendId('');
      });
  }

  useEffect(() => {
    if (!!friendId) {
      handleStatus(friendId);
    }
  }, [friendId])

  const handleVideo = () => {
    inputVideoFile.current.click();
    setVideoData('');
  }



  const modelClose = () => {
    setUploadStatus(false);
    setLivePopup(false)
    setPicture(null);
    setVideoData(null);
    setStatusPrice("0");
    dispatch(friendStatus({ friendStatus: [] }));
    setStatusModel(false);
    setFriendId('');
  }

  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    }
  }

  const closeDialog = () => {
    setViewStory(false);
    setIsLoaded(false);
    setFriendId("");
  }

  const handleUploadStatus = (e) => {
    e.preventDefault();
    if (videoData == "image" || videoData == "video" || videoData == "text") {
      if (videoData == 'image') {
        setIsLoading(true);
        const bodyParameters = new FormData();
        bodyParameters.append("session_id", "" + localStorage.getItem('session_id'));
        bodyParameters.append("status", picture);
        bodyParameters.append("status_type", "" + 1);
        bodyParameters.append("coins", "" + statusPrice);
        axios.post(ADD_STATUS, bodyParameters, config)
          .then((response) => {
            if (response.status == 200) {
              NotificationManager.success(response.data.message, "", 2000, () => { return 0 }, true);
              setIsLoading(false);
              setUploadStatus(false);
              setVideoData('');
              setStatusPrice("0");
            }

          }, (error) => {
            NotificationManager.error(error.message, "", 2000, () => { return 0 }, true);
            setIsLoading(false);
            if (error.toString().match("403")) {
              localStorage.removeItem("session_id");
              history.push('/login');
            }
          });

      }
      else if (videoData == 'video') {
        setIsLoading(true);
        const bodyParameters = new FormData();
        bodyParameters.append("session_id", "" + localStorage.getItem('session_id'));
        bodyParameters.append("status", video);
        bodyParameters.append("status_type", "" + 2);
        bodyParameters.append("coins", "" + statusPrice);
        axios.post(ADD_STATUS, bodyParameters, config)
          .then((response) => {
            if (response.status == 200) {
              NotificationManager.success(response.data.message, "", 2000, () => { return 0 }, true);
              setIsLoading(false);
              setUploadStatus(false);
              setVideoData('');
              setStatusPrice("0");
            }
          }, (error) => {
            NotificationManager.error(error.message, "", 2000, () => { return 0 }, true);
            setIsLoading(false);
            if (error.toString().match("403")) {
              localStorage.removeItem("session_id");
              history.push('/login');
              setIsLoading(false);
            }
          });
      }
      else if (videoData == 'text') {
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
          var max_width = 375;
          var fontSize = 12;
          var lines = new Array();
          var width = 0, i, j;
          var result;
          var color = fontColor || "white";

          // Font and size is required for ctx.measureText()
          ctx.font = fontSize + "px Arial";

          // Start calculation
          while (text.length) {
            for (i = text.length; ctx.measureText(text.substr(0, i)).width > max_width; i--);

            result = text.substr(0, i);

            if (i !== text.length)
              for (j = 0; result.indexOf(" ", j) !== -1; j = result.indexOf(" ", j) + 1);

            lines.push(result.substr(0, j || result.length));
            width = Math.max(width, ctx.measureText(lines[lines.length - 1]).width);
            text = text.substr(lines[lines.length - 1].length, text.length);
          }


          // Calculate canvas size, add margin
          ctx.canvas.width = 14 + width;
          ctx.canvas.height = 8 + (fontSize + 5) * lines.length;
          ctx.font = fontSize + "px Arial";

          // Render
          ctx.fillStyle = color;
          for (i = 0, j = lines.length; i < j; ++i) {
            ctx.fillText(lines[i], 8, 5 + fontSize + (fontSize + 5) * i);
          }
        }

        todo(tCtx, pencilData, 12, "white");
        $('canvas').remove();
        document.getElementById("image").remove()
        // Working here end
        imageElem.src = tCtx.canvas.toDataURL();

        const bodyParameters = new FormData();
        bodyParameters.append("session_id", "" + localStorage.getItem('session_id'));
        bodyParameters.append("status", imageElem.src);
        bodyParameters.append("status_type", "" + 3);

        axios.post(ADD_STATUS, bodyParameters, config)
          .then((response) => {
            if (response.status == 200) {
              NotificationManager.success(response.data.message, "", 2000, () => { return 0 }, true);

              setUploadStatus(false);

              setShowPencil(false);
            }
          }, (error) => {
            NotificationManager.error(error.message, "", 2000, () => { return 0 }, true);
            if (error.toString().match("403")) {
              localStorage.removeItem("session_id");
              history.push('/login');
            }
          });
      }
    }
    else {
      NotificationManager.error("please select image or video", "", 2000, () => { return 0 }, true);
    }
  }

  useEffect(() => {
    $(".show-filter").click(function () {
      $(".option-bar").toggleClass("filter-active");
    });
  }, [])


  // const uploadImage = () => {
  //  // Click event for status uplaod screen
  //  $(document).on("click", "#upload__media", function () {
  //    $('#upload_fle').trigger("click");
  //  });

  //  $(document).on("click", "#upload_fle", function (e) {
  //    e.stopPropagation();
  //    //some code
  // });

  // }
  const openFileUploder = () => {
    inputFile.current.click();
    setVideoData('');
  }

  const componentWillUnmount = () => {
    clearInterval(checkOnlineFrdsInterval)
  }

  useEffect(() => {
    handleFriendList();
    SOCKET.connect();
    checkOnlineFrdsInterval = window.setInterval(() => {
      SOCKET.emit("authenticate_friend_list_live", {
        session_id: localStorage.getItem("session_id")
      });
    }, 1000)

    SOCKET.on('sendAudienceToLiveVideo', (data) => {

      setAudLive(false)
      if (userData.user_id === data.user_id) {
        // $('#live-modal').hide();
        // setShowLive(false)
        var newState = {};
        newState.user_id = data.user_id;
        newState.call_type = 2;
        newState.channel_id = data.channel_id;
        newState.channel_name = data.channel_name;
        newState.channel_token = data.channel_token;
        localStorage.setItem("liveVideoProps", JSON.stringify(newState));
        const page = '/' + data.host_id + '/' + uuidv4() + '/' + data.channel_name + '/live-video-chat';
        openNewWindow(page)
        // history.push('/'+data.host_id+ '/' + uuidv4() +'/'+ data.channel_name + '/live-video-chat')
      }
    })

    SOCKET.on('live_friends', (data) => {
      let frdList = friendLists;
      const totalLiveFrds = data.live;
      const onlineUsers = data.online;
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
    });
    SOCKET.on('start_your_live_video_now', (data) => {
      if ((data.user_id == userData.user_id) && data.channel_id && data.channel_name) {
        // $('#live-modal').hide();
        // setShowLive(false)
        // history.push(data.user_id+ '/' + data.channel_id +'/'+ data.channel_name + '/live-video-chat')
        const page = '/' + data.user_id + '/' + data.channel_id + '/' + data.channel_name + '/live-video-chat'
        openNewWindow(page)
      }
    });

    // uploadImage();
    return () => componentWillUnmount()
  }, [])

  const makeMeLive = () => {
    const bodyParameters = {
      session_id: localStorage.getItem("session_id"),
      user_id: userData.user_id,
      type: 3
    }
    const call_type = 1, user_id = userData.user_id;
    generateLiveVideoChatToken(dispatch, history, bodyParameters, call_type, user_id, uuidv4(), SOCKET);

  }

  const watchLive = () => {
    if (!audLive) {
      const audDetails = LiveModel;
      const bodyParameters = {
        session_id: localStorage.getItem("session_id"),
        live_user_id: audDetails.item.user_id,
        channel_name: audDetails.item.channel_name
      }
      setAudLive(true)
      axios.post(DETUCT_THOUSAND_COIN, bodyParameters)
        .then((response) => {
          if (response.data.status_code == 200 && response.data.error == "false") {
            if (!!audDetails && audDetails.item.is_live) {
              SOCKET.emit("addAudienceToLiveVideo", {
                user_id: userData.user_id,
                channel_name: audDetails.item.channel_name,
                channel_token: audDetails.item.channel_token,
                is_host: false
              })
            }
          }
          else {
            NotificationManager.error(response.data.message, "", 2000, () => { return 0 }, true);
            setAudLive(false)
          }
        }, (err) => {
          NotificationManager.error(err.message, "", 2000, () => { return 0 }, true);
          setAudLive(false)
        });
    }

  }

  const makeMeAudience = (item) => {
    setLiveModel({ modal: true, item });
  }


  // const convertToHtml = (data) => {
  //    const convertedHtml =  {__html: data};
  //   return <div dangerouslySetInnerHTML={convertedHtml} />
  // }

  // const playVideo = (video) => {
  //   window.setTimeout(() => {
  //       document.getElementById(video).play();
  //   }, 1000)
  //   return <video id= {video} src={video} alt="status" />
  // }


  return (
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
                <a className="show-filter" href="javascript:void(0)"><img src="/assets/images/Filter.png" alt="filter" /></a>
                <span className="chat-point position-relative">
                  <a href="javascript:void(0)">
                    <i className="fas fa-comment" />
                  </a>
                </span>
              </div>
              <FilterSide setFilterUser={setFilterUser} />
            </div>
            <div className="col-lg-9 main-bar p-3" style={{ marginLeft: '25%' }}>
              <div className="tab-top d-flex flex-wrap-wrap">
                <div className="live-icon">
                  <img src="/assets/images/live.png" style={{ cursor: "pointer" }} onClick={() => setLivePopup(true)} alt="Live" />
                  {/* makeMeLive */}
                </div>
                <NavLinks />
              </div>
              <div className="search-section-wrapper mt-4 px-4">
                <div className="users-listing">
                  <div className="add__status" onClick={() => setUploadStatus(true)}>+</div>
                  <div className="status__slider">
                    <OwlCarousel options={option}  >
                      {friendList.map((item, i) => (
                        (item.statuses.length > 0 || item.is_live === true) ?

                          <div className="users-listing__slider__items" id={item.user_id}>

                            <div className="users-listing__slider__items__image" id="modal" data-toggle="modal" onClick={() => setFriendId(item.user_id)}>
                              {!!friendList ? <img onError={(e) => addDefaultSrc(e)} src={!!item.profile_images ? item.profile_images : returnDefaultImage()} alt="marlene" /> : ""}
                              <ClipLoader color={"#fff"} loading={friendId == item.user_id ? statusLoading : false} css={statusOverride} />

                              <span className="circle-shape" style={{ background: item.online ? '#00FF31' : '#f5473bec' }} />

                            </div>
                            {
                              item.is_live === true &&
                              <span style={{ cursor: "pointer" }} onClick={() => makeMeAudience(item)} className="live">Live</span>
                            }
                          </div>
                          : ""
                      ))}

                    </OwlCarousel>

                  </div>
                </div>
                <div className="search-people-row">
                  <div className="row">
                    {!!friendList &&
                      <>
                        {friendList.map((item, i) => {
                          return <div className=" main col-md-3" id={item.user_id} onClick={() => SingleProfileView(item.user_id)}>
                            <div className="sp-singular">
                              <a href="javascript:void(0)">
                                <figure className="mb-0">
                                  <img onError={(e) => addDefaultSrc(e)} src={!!item.profile_images ? item.profile_images : returnDefaultImage()} alt="Marlene" />
                                </figure>
                                <div className="sp-singular-content">
                                  {!item.online ? <div className="status offline">Offline</div> : <div className="status online">Online</div>}

                                  <h4>{item.first_name + ' ' + item.last_name} <span className="age">{item.age}</span></h4>
                                  <div className="info">{item.distance}, {item.occupation}</div>
                                </div>
                              </a>
                              {item.packages.length > 0 ? <span className="vip-user bg-grd-clr"><img src="/assets/images/level-img.png" alt="profile level" /></span> : ""}
                            </div>
                          </div>
                        })}
                      </>
                    }

                  </div>

                </div>
                <SyncLoader color={"#fcd46f"} loading={isLoaded} css={override} size={20} />
              </div>
            </div>

          </div>

        </div>
      </div>

      <Modal id="status-modal" show={viewStory} onHide={() => setViewStory(false)} backdrop="static" keyboard={false}>
        {/* <div className="status-modal"> */}
        <div className="story-modal" style={{ position: "relative" }}>
          <a href="javascript:void(0)" className="close-gift-btn modal-close" onClick={closeDialog}><img src="/assets/images/btn_close.png" /></a>
          {
            stories.length > 0 &&
            <>
              <Stories
                stories={stories}
                defaultInterval={3000}
                storyStyles={storyContent}
                width={377}
                height={468}
                onAllStoriesEnd={() => setViewStory(false)}
              />
            </>
          }
          {/* </div> */}
        </div>
      </Modal>

      {/* <div className={isOn ? 'all-gifts-wrapper active': 'all-gifts-wrapper'} >
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
  </div> */}

      {/* <div className="modal fade" id="status-modal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">

      <div className="modal-body p-0">
      <div className="status-info">
          <div className="status_image">
            <img src={statusData.profile_images} alt="user" />
          </div>
          <div className="status_heading">
            <h6>{statusData.first_name}• {statusData.age}</h6>
            <span className="timer d-block">9 Seconds</span>
            <span className="status_view"><img src="/assets/images/eye-icon.svg" alt="eye" /></span>
           </div>
        </div>

      <OwlCarousel  options={statusoptions} id="status-bar">
     {storyData.map((items ,i) => {
       return <div className="status-bar__items">
            {items.statuses_type==1 ?
             <img onError={(e) => addDefaultSrc(e)} src={!!items.file ? items.file : returnDefaultImage()} alt="status" /> :
              (items.statuses_type == 2 ? playVideo(items.file) : 
              convertToHtml(`<p>${items.file.replace("http://167.172.209.57/glitter-101/public/profile_images/", "")}</p>`))
             } </div>
        })}
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
       </div>  */}


      <Modal className="modal fade" id="group-live-modal" show={LiveModel.modal} onHide={() => setLiveModel({ modal: false, item: null })} backdrop="static" keyboard={false}>

        <div className="modal-dialog" role="document">
          <div className="modal-content" style={{ border: "none" }}>
            <div className="modal-body p-0">
              <div className="group-live">
                <div className="group-live__header">
                  <img src="/assets/images/diamond-sm.png" alt="balance" /> Balance : {!!userData && userData.coins}
                </div>

                <div className="group-live__content text-center">
                  <div className="total_coins d-flex align-items-center justify-content-center py-3">
                    <div className="diamong__icon"><img src="/assets/images/diamond-coin.png" alt="balance" /></div>
                    <h5>1000 Coins</h5>
                  </div>
                  <p>Pay 1000 coins to enter , they will also see what he is going to see inside the broadcaster room .</p>

                  <div className="watch-live d-flex">
                    <a href="javascript:void(0)" style={{ cursor: (audLive ? "default" : "pointer") }} className="btn btn-trsp" onClick={() => { if (!audLive) { setLiveModel({ modal: false, item: null }) } }}>Cancel</a>
                    <a href="javascript:void(0)" style={{ cursor: (audLive ? "default" : "pointer") }} className="btn bg-grd-clr" onClick={watchLive}>{audLive ? "Wait..." : "Watch"}</a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>


      </Modal>
      <Modal className="theme-modal" id="upload-media-modal" show={showUploadStatus} onHide={() => setUploadStatus(false)} backdrop="static" keyboard={false}>
        {/* Modal start here */}
        {/* <div className="theme-modal" id="live-modal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> */}

        <form id="glitter_status" >
          <div className="modal-body p-0">
            <div className="upload__status__opt text-center">
              <h4 className="theme-txt">Upload Status</h4>
              <div className="upload-status d-flex justify-content-center mt-5">
                <a id="upload__media" className="upload__media bg-grd-clr" href="javascript:void(0)" onClick={openFileUploder}>
                  <i className="fas fa-camera"></i>
                  <input type="file" name="file" value="" ref={inputFile} id="upload_fle" className="d-none" onChange={handleFileChange} accept="image/* " />

                </a>
                <a className="upload__text bg-grd-clr" href="javascript:void(0)" onClick={handleVideo}>
                  <i className="fas fa-video"></i>
                  <input type="file" name="file" value="" ref={inputVideoFile} id="upload_fle" onChange={handleVideoChange} className="d-none" accept=" video/*" />
                </a>

              </div>
              {!!picture && videoData == 'image' ?

                <div className="preview">

                  <img onError={(e) => addDefaultSrc(e)} id="PreviewPicture" src={!!imgData ? imgData : returnDefaultImage()
                  } />
                </div>
                : videoData == 'video' ?
                  <div className="preview">

                    <video id="video_preview" src={videoFile} width="300" height="300" controls></video>

                  </div>
                  : ""
              }
              {(!!picture && videoData == "image") || videoData == "video" ?
                <>
                  <h6>Put Price</h6>
                  <div className="image-coins d-flex">
                    <div className="coin-price">
                      <input type="radio" id="coin-value1" name="coin" value={0} onChange={(e) => setStatusPrice(e.target.value)} checked={statusPrice == 0 ? "checked" : ""} />
                      <label for="coin-value1">0 coins</label>

                    </div>

                    <div className="coin-price">
                      <input type="radio" id="coin-value2" name="coin" value={50} onChange={(e) => setStatusPrice(e.target.value)} checked={statusPrice == 50 ? "checked" : ""} />
                      <label for="coin-value2">50 coins</label>

                    </div>

                    <div className="coin-price">
                      <input type="radio" id="coin-value3" name="coin" value={100} onChange={(e) => setStatusPrice(e.target.value)} checked={statusPrice == 100 ? "checked" : ""} />
                      <label for="coin-value3">100 coins</label>

                    </div>

                    <div className="coin-price">
                      <input type="radio" id="coin-value4" name="coin" value={250} onChange={(e) => setStatusPrice(e.target.value)} checked={statusPrice == 250 ? "checked" : ""} />
                      <label for="coin-value4">250 coins</label>

                    </div>
                  </div>
                </>
                : ""}

              <a className={!!isLoading ? "status-upload btn bg-grd-clr btn-small mt-4 disabled" : "status-upload btn bg-grd-clr btn-small mt-4"} onClick={handleUploadStatus}>{!!isLoading ? "Processing..." : " Publish Status"}</a>

            </div>


          </div>
        </form>

        {/* </div> */}
        {/* End Modal start here */}
        <a href="javascript:void(0)" className="modal-close" onClick={modelClose}><img src="/assets/images/btn_close.png" /></a>
      </Modal>

      {/* Live video screen Pop up */}
      <Modal className="theme-modal" id="upload-media-modal" id="live-modal" show={showLivePopup} onHide={() => setLivePopup(false)} backdrop="static" keyboard={false} style={{ display: 'block', paddingLeft: '17px' }}>
        {/* <div className="modal-dialog" role="document"> 
        <div className="modal-content">
        <div className="modal-body p-0">*/}
        <div className="live-wrapper">
          <div className="live__leftblk">
            <div className="live_info d-flex">
              <div className="live_img">
                <img onError={(e) => addDefaultSrc(e)} src={!!userData ? userData.profile_images : returnDefaultImage()} alt="live user" />
                <span>change cover</span>
              </div>
              <div className="live_title">
                <h5>Add a title to chat</h5>
                {/* <input type="text" name="live_title" className="live-title" id="live-title" /> */}
              </div>
            </div>
            <div className="live_share">
              <span>Share to</span>
              <ul>
                <FacebookShareButton size={13} url={shareUrl} quote={title} >
                  <FacebookIcon round />
                </FacebookShareButton>

                <li><a href="javascript:void(0)"><i className="fab fa-facebook-f" /></a></li>
                <li><a href="javascript:void(0)"><i className="fab fa-instagram" /></a></li>
              </ul>
            </div>
            <div className="block_countries">
              <div className="block_countries__list">
                <img src="/assets/images/add-countries.svg" alt="add countries" />
              </div>

              {/* <div className="block_countries__list">
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
              </div> */}
            </div>
            <Select
              multi
              options={countries}
              placeholder="select countries"
              onChange={(value) => setCountrieBlock(value)}
              style={{ color: "#6c757d" }}
            />
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
            <button className="btn bg-grd-clr" onClick={makeMeLive}>Go live</button>
            <div className="live-type mt-4">
              <span className="active">Group Chat Live</span>
              <span>Live</span>
            </div>
          </div>
          <a href="javascript:void(0)" className="modal-close" onClick={modelClose}><img src="/assets/images/btn_close.png" /></a>
        </div>

        {/*  </div>
     </div> */}
        {/* <div className="modal-close">
      <img src="/assets/images/btn_close.png" alt="close popup" onClick={() => setLivePopup(false)} />
    </div> */}
        {/* </div> */}


      </Modal>
      {/* End live video screen */}
      {/* <canvas id='textCanvas' height={465} width={380} />
            <img id='image' /> */}
    </section>


  )
}
export default SearchHome;