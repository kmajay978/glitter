import React, { useState, useEffect, useRef } from "react";
import {  useHistory } from 'react-router';
import axios from "axios";
import NavLinks from '../components/Nav';
import {BLOCK_USER_API , COIN_HISTORY , GET_ALL_COIN_PACKAGE , INTEREST_HOBBIES_LIST ,RECEIVED_GIFT_LIST , GET_GIFT_API , GET_LOGGEDPROFILE_API , EDITPROFILE_API , BLOCK_USERLIST_API , LOGOUT_API, GET_STRIPE_PACKAGE,ACTIVATE_STRIPE_PACKAGE } from '../components/Api';
import useToggle from '../components/CommonFunction';
import {removeStorage} from '../components/CommonFunction';
import Login from '../pages/Login'
import { useDispatch , useSelector } from 'react-redux';
import {logout, profile, ProfileData, stripePlanId ,stripeCoinPlanId , userProfile} from '../features/userSlice';
import {Modal, ModalBody , Dropdown} from 'react-bootstrap';
import $ from 'jquery';
import Logo from '../components/Logo';
import PrivacyPolicy from '../components/PrivacyPolicy';
import AboutGlitter from '../components/AboutGlitter';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { EmailIcon, FacebookIcon,  TelegramIcon, TwitterIcon, WhatsappIcon,EmailShareButton,FacebookShareButton,TelegramShareButton,WhatsappShareButton, TwitterShareButton,} from "react-share";
import StripeForm from '../components/StripeForm';
import DatePicker from 'react-date-picker';
import moment from 'moment'
import SyncLoader from "react-spinners/SyncLoader";
import { css } from "@emotion/core";
import {addDefaultSrc, returnDefaultImage} from "../commonFunctions";

const override = css`
    
text-align: center;
width: 95%;
position: absolute;
left: 0;
right: 0;
margin: 0 auto;
padding-top:60px;
top: 50%;
-webkit-transform: translateY(-50%);
-moz-transform: translateY(-50%);
transform: translateY(-50%);

`;

const Profile = (props) =>{

   //Adding class to body and removing the class
  // addBodyClass('no-bg')('login-body')
 
  const history = useHistory();
  const dispatch = useDispatch();
  const [packageList,setPackage] = useState([]);
  const [profileData, setProfile] = useState('');  
  const [blockData, setBlockData] = useState([]);
  const [blockId , setBlockId] = useState('');
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);
  const [GiftData , setGiftData] =useState([]);
  const [step, setStep] = useState(1);
  const [show, setShow] = useState(false);
  const [showBlock , setShowBlock] = useState(false);
  const [showSetting ,setShowSetting] = useState(false);
  const [showPrivacy ,setShowPrivacy] = useState(false);
  const [showAbout , setShowAbout] = useState(false);
  const [showShare , setShowShare] = useState(false); // state for show share glitter model
  const [showCoins , setShowCoin] = useState(false);
  const [showBuyCoins , setShowBuyCoins] = useState(false);
  const [showGift , setShowGift] = useState(false);
  const [showImage , setShowImage] = useState(false); //state for edit profile image model
  const [interestData , showInterestData] = useState([]);
  const [hobbies , setHobbies] = useState([]);
  const [selectedCheck , setSlelected] = useState([]);
  const [coinPackage , setCoinPackage] = useState([]);
  const [coinHistory , setCoinHistory] = useState([]);
  const [coinSpend , setCoinSpend] = useState('');
  const [Dob, setDob] = useState(''); 
  const [isLoaded, setIsLoaded] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  

  const [showStripe , setShowStripe] = useState(false);
  const [showChecked , setMycheckbox] = useState(false);

  const [curentStripePlan , setStripPlan] = useState();
  
  const [isOn, toggleIsOn] = useToggle();
  const [isProfile, toggleProfile] = useToggle();
  const handleShow = () => setShow(true); // show Edit model
  const handleSettingShow = () => setShowSetting(true); //show Setting Model
  
  const handleImage =() => setShowImage(true);
  const handlePrivacy =() => {setShowSetting(false); setShowPrivacy(true);}
  const handleAbout = () => {setShowSetting(false); setShowAbout(true);}
  const handleShare =() => {setShowSetting(false); setShowShare(true);} // show share glitter model
  
  const userData = useSelector(userProfile).user.profile; //using redux useSelector here

  const dates = moment(Dob).format('YYYY/M/D');
  console.log(Dob , "...dob");
  // Getting form value here
  const [form , setForm] = useState({
    
    firstName:"",
    lastName:"",
    dob:"",
    gender:"",
    aboutMe:"",
    height:"",
    weight:"",
    relationStatus:"",
    looking_for:"",
    interests_hobbie :""
  });

  // console.log(form, "form...");
  
  const handleChange = e => { 
    setForm({
      ...form,
      [e.target.name]: e.target.value,

    }) 
}

const handleCheck = (e) => {
  const target = e.target;
  var value = target.value;
  
  if(target.checked){
    let selectedArray = selectedCheck;
    selectedArray.push(value)
    setSlelected(selectedArray)
  }else{
    let selectedArray = selectedCheck;
    var index = selectedArray.indexOf(value); 
    selectedArray.splice(index,1);
    setSlelected(selectedArray)
  }
  
}

    const shareUrl = 'http://localhost:3000/';
    const title = 'glitter-app';


  // Fetching profile Data
  var sessionId = localStorage.getItem("session_id")
  const ProfileData = async() =>{

    const bodyParameters = {
      session_id: sessionId,
      };
     const {data:{data}}= await axios.post(GET_LOGGEDPROFILE_API,bodyParameters)
     console.log(moment(data.dob).format('ddd MMM DD YYYY   h:mm:ss') , "...hhhhhh");
      
    //  Setting data variable to state object 
      form.firstName = data.first_name
      form.lastName = data.last_name
      form.dob = moment(data.dob).format('ddd MMM DD YYYY   h:mm:ss');
      form.aboutMe = data.about_me
      form.height = data.height
      form.weight = data.weight
      form.gender = data.gender
      form.looking_for = data.looking_for
      form.relationStatus = data.relationship_status
      form.interests_hobbie = data.interest_hobbies

      var obj = [...Object.values(Object.keys(form.interests_hobbie))]
      setHobbies(obj);

       setProfile(data);
       dispatch(
            profile({
                profile: data
            })
        );
        var obj = [...Object.values(Object.keys(form.interests_hobbie))]
        setHobbies(obj);
       }
    

    // console.log(hobbies);
      
  // console.log(hobbies,"hobbies......")
     //update profile data
      
     const updateProfile = (e) =>{
     
      const config = {
        headers : {
                  Accept: "application/json",
                  "Content-Type": "multipart/form-data",
              }
        }

      const bodyParameters = new FormData();
        bodyParameters.append("session_id", "" + sessionId);
        bodyParameters.append("device_token", "uhydfdfghdertyt445t6y78755t5jhyhyy");
        bodyParameters.append("device_type", "" + 0);
        bodyParameters.append("first_name", "" + form.firstName);
        bodyParameters.append("last_name", "" + form.lastName);
        bodyParameters.append("dob", "" + dates);
        bodyParameters.append("gender", "" + form.gender);
        bodyParameters.append("aboutMe", "" + form.aboutMe);
        bodyParameters.append("height", "" + form.height);
        bodyParameters.append("weight", "" + form.weight);
        bodyParameters.append('looking_for', form.looking_for);
        bodyParameters.append("relationship_status", "" + form.relationStatus);
        bodyParameters.append('interests_hobbies[]', selectedCheck.join(","));
        

   axios.post(EDITPROFILE_API , bodyParameters, config) 
   .then((response) => {
   
   if(response.status==200  && !response.status.error){
   Notification('update');
 
   }
   }, (error) =>{
    if (error.toString().match("403")) {
      localStorage.removeItem("session_id");
      history.push('/login');
    }
   Notification('error');
   });
   }

   const config = {
    headers : {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
          }
    }
   const updateImage = (e) => {
    const bodyParameters = new FormData();
      bodyParameters.append("session_id", "" + sessionId);
      bodyParameters.append("device_token", "" + "uhydfdfghdertyt445t6y78755t5jhyhyy" );
      bodyParameters.append("device_type", "" + 0);
      bodyParameters.append("first_name", "" + form.firstName);
      bodyParameters.append("last_name", form.lastName);
      bodyParameters.append("dob", "" + form.dob);
      bodyParameters.append("gender", "" + form.gender);
      bodyParameters.append("aboutMe", "" +  form.aboutMe);
      bodyParameters.append("height",  form.height);
      bodyParameters.append("weight",  form.weight);
      bodyParameters.append("interest", "" + form.interest);
      bodyParameters.append('profile_photo[]', picture);
      console.log(picture,"picture.....");
      bodyParameters.append("relationship_status", form.relationStatus);
    
    axios.post(EDITPROFILE_API , bodyParameters , config) 
   .then((response) => {
   
   if(response.status==200  && !response.status.error){
    Notification('update');
    setTimeout(() => {
      setShowImage(false);
    }, 1500);
   
    // setShowImage(false);
    ProfileData();
   }
   }, (error) =>{

   });
   }

  const handleLogout = () =>{

  const bodyParameters= {
  session_id : sessionId
 };
 axios.post(LOGOUT_API , bodyParameters)
 .then((response) => { 
   localStorage.removeItem("session_id");
   history.push('/login');
   dispatch(logout());
   dispatch(profile({profile: null}));

    }, (error) =>{

    });
   }

   //block list
   const handleBlockList = async() => {
     setShowBlock(true);
   const bodyParameters ={
    session_id: sessionId,
   };
   try {
    const{data : {data,status_code, error}} = await axios.post(BLOCK_USERLIST_API ,bodyParameters)
  
    if(status_code==200){
      setBlockData(data);
      }
}
catch (err) {
    if (err.toString().match("403")) {
        localStorage.removeItem("session_id");
        history.push('/login');
      }
}
   }
   
   const handleBlock = async() => {
    const bodyParameters={
      session_id : localStorage.getItem('session_id'),
      blocked_user: blockId,
    
    }
    axios.post(BLOCK_USER_API , bodyParameters)
    .then((response)=>
    {
    //   if(response.error=="bad_request")
    // {
    //   localStorage.removeItem("session_id");
    //   history.push('/login');
    // }
    if(response.status==200 && !response.error) {
      createNotification('unblock');
      setTimeout(() => {
        setShowBlock(false);
      }, 1500);
    }
    }, (error) =>{
      if (error.toString().match("403")) {
        localStorage.removeItem("session_id");
        history.push('/login');
      }
    });
    
  }
// console.log(blockId);
  useEffect(() => {
     handleBlock();
  }, [blockId])

   // coin package
   const handleBuyCoins = () => {
     setIsLoaded(true);
     setShowBuyCoins(true);
     axios.get(GET_ALL_COIN_PACKAGE)
     .then((response) => { 
    //   if(response.error=="bad_request")
    // {
    //   localStorage.removeItem("session_id");
    //   history.push('/login');
    // }
       if(response.status==200){
      setCoinPackage(response.data.coin_list);
      setIsLoaded(false);
       }
       }, (error) =>{
        if (error.toString().match("403")) {
          localStorage.removeItem("session_id");
          history.push('/login');
        }
        setIsLoaded(true);
       }); 
    }
 
    // console.log(coinPackage , "packages...");

    //coin history 
    const handleCoinHistory = () => {
      setIsLoaded(true);
      setShowCoin(true);
      const bodyParameters ={
        session_id :sessionId,
      }
      axios.post(COIN_HISTORY , bodyParameters)
      .then((response) =>{
        console.log(response,"workingadsfadsfasdf....")
       
        if(response.data.status_code == 200 && response.data.status == true)
        {
          setIsLoaded(false);
          setCoinHistory(response.data.result);
          setCoinSpend(response.data.count_coins);
          setWarningMessage('');
        }
        else
        {
          setIsLoaded(false);
          setWarningMessage(response.data.message);
          createNotification('error' , response.data.message);
        }

      }, (error)=> {
        setIsLoaded(false);
        if (error.toString().match("403")) {
          localStorage.removeItem("session_id");
          createNotification('error' , error.message);
          history.push('/login');
        }
        
      });
    }
    
   //all gift
   const handleGift = async() =>{
    toggleIsOn(true);
     const bodyParameters = {
       session_id : sessionId,
     }

     const {data:{result , status}} = await axios.post(RECEIVED_GIFT_LIST,bodyParameters);
      setGiftData(result);
   }

   //get single  gift item
   const getGiftItem = async(Uid) => {
    const bodyParameters ={
      session_id : sessionId ,
      gift_id : Uid
    }
    const {data : {result}} = await axios.post(GET_GIFT_API , bodyParameters)
   console.log(result);
   }
 
   //get interest hobbies
   const handleInterest = () =>
   {
     axios.get(INTEREST_HOBBIES_LIST)
     .then((response) => { 
    
       if(response.status==200){
      showInterestData(response.data);
       }
    
   
       }, (error) =>{
        if (error.toString().match("403")) {
          localStorage.removeItem("session_id");
          history.push('/login');
        }
       });
    
   }
   
   const handleFileChange = e => {
    if (e.target.files[0]) 
    {
      console.log("picture: ", e.target.files[0]);
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result); 
     
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const uploadImage = () => {
    // Click event for status uplaod screen
    $(document).on("click", ".image-uploader  a", function () {
     // var image_name = $('#profile-photo').val().replace("C:\\fakepath\\", "");
     // $(".custom-file-upload").html(image_name);
      
      $('#profile-photo').trigger("click");
    });

    $(document).on("change", "#profile-photo", function () {
      var image_name1 = $(this).val().replace("C:\\fakepath\\", "");
      $(".custom-file-upload").html(image_name1);
    });
   
    $(document).on("click", "#profile-photo", function (e) {
      e.stopPropagation();
      //some code
   });
   
   }

  // ------------------------------ Stipe payment module -----------------------------------------------//

  const GetStipePackage = async() =>{
    try {
      const {data:{plan_list, status_code , error}} = await axios.get(GET_STRIPE_PACKAGE)
     
      if(status_code==200){
        setPackage(plan_list);
        }
  }
  catch (err) {
      if (err.toString().match("403")) {
          localStorage.removeItem("session_id");
          history.push('/login');
        }
  }

  }

  const CheckedItem = (id) => {
    let checkId = false;
    for (let i in hobbies) {
      if (hobbies[i] == id) {
        checkId = true
      }
    }
    if (checkId) {
      return "checked"
    }
    else {
     return ""
    }
  }
  // Get id of current plan 

  const Stripehandler = (id) =>{
    dispatch(
      stripePlanId({
        stripePlanId: id
      })
  );
    setShowStripe(true);
    
  }
 
  const StripeCoinHandler =(id) =>
  {
    dispatch(
      stripeCoinPlanId({
        stripeCoinPlanId: id
      })
    );
    setShowStripe(true);
    setShowBuyCoins(false);
  }
 
  const closeStripeModel = () =>
  {
    setShowStripe(false);
    dispatch(stripePlanId({stripePlanId: null}));
    dispatch(stripeCoinPlanId({stripeCoinPlanId: null}));
  }

    useEffect(() =>{
    GetStipePackage();
    ProfileData(dispatch)
    handleInterest();
    uploadImage();
  //handleBlock();
  },[])

  const Notification = (type) => {
  
    switch (type) {
      case 'update':
        NotificationManager.success('update Successfully ', 'profile');
        break;
      case 'error':
        NotificationManager.error('Error message', 'Click me!', 5000, () => {
        });
        break; 
  };
  };

 const createNotification = (type , message) => {
  
    switch (type) {
        case 'unblock':
          NotificationManager.success('unblock Successfully ', 'unblock');
          break;
      case 'error':
        NotificationManager.error(message ,'Error message')
        break; 
  };
  };

   const tabScreen = () =>{
    switch(step) {
      case 1:
        return (
          
          <div className="edit-first-step">
             <div className="d-flex align-items-center"> <h4 className="theme-txt text-center mb-4 ml-3">Your Information</h4>
          </div>
              <div className="form-group">
                  <label className="d-block">First Name</label>
                <input className="form-control bg-trsp" name="firstName" type="text" value={form.firstName}  onChange={handleChange}/>
              </div>
              <div className="form-group">
              <label className="d-block">Last name</label>
                  <input className="form-control bg-trsp" name="lastName" type="text" value={form.lastName} onChange={handleChange}/>
              </div>
              <div className="form-group dob-field">
                  <label className="d-block">DOB</label>
                  <DatePicker  className="bg-trsp" name="dob"  value={Dob} selected={Dob} required={true} onChange={date => setDob(date)} />
                 
                  {/* <input className="form-control bg-trsp" name="dob" type="text" value={form.dob} onChange={handleChange}  /> */}
              </div>

             <div className="choose-gender d-flex my-4">
                            <div className="form-group">
                            {form.gender == 1 }
                              <input type="radio" id="female" name="gender" value={1} checked={form.gender == 1 ? "checked" : ""} onChange={ handleChange }  placeholder="Female" />
                              <label htmlFor="female">Female</label>
                            </div>
                            <div className="form-group">
                              <input type="radio" id="male" name="gender" value={2} checked={form.gender == 2 ? "checked" : ""}  onChange={ handleChange } placeholder="Male" />
                              <label htmlFor="male">Male</label>
                            </div>
                              
                            <div className="form-group">
                              <input type="radio" id="more" value={3}  checked={form.gender == 3 ? "checked" : ""} onChange={ handleChange }  name="gender" />
                              <label htmlFor="more">More</label>
                          </div>
                          </div>
              <div className="form-group">
              <label for="">About Me</label>
              <input className="form-control bg-trsp" name="aboutMe" type="text" value={form.aboutMe} onChange={handleChange} />
              </div>

              <a className="btn bg-grd-clr d-block btn-countinue-3" id="edit-first-step" href="javascript:void(0)" onClick={() => setStep(step + 1)}>Next</a>
             </div>
            
        );
        case 2:
        return (
          
          <div className="edit-second-step">
              <div className="d-flex align-items-center"> <a href="javascript:void(0)" className="login-back-2 btn-back position-relative mb-4" onClick={() => setStep(step - 1)} ><i className="fas fa-chevron-left" /></a> <h4 className="theme-txt text-center mb-4 ml-3">Your Information</h4>
          </div>
          <div className="form-group">
              <label for="">Height</label>
              <input className="form-control bg-trsp" name="height" type="text" value={form.height} onChange ={handleChange}/>
          </div>

          <div className="form-group">
              <label for="">Weight</label>
              <input className="form-control bg-trsp" name="weight" type="text" value={form.weight} onChange ={handleChange}/>
          </div>

          <div className="form-group">
              <label for="">Relationship status</label>
              <select name="relationStatus" id="" value={form.relationStatus} onChange ={handleChange}>
                  <option value={1}>Single</option>
                  <option value={2}>Married</option>
                  <option value={3}>UnMarried</option>
              </select>
          </div>
         

          <div className="choose-gender ft-block d-flex flex-wrap">
              
              <div className="tab-title">
                  <label>Looking For</label>
              </div>
                            <div className="form-group">
                        
                              <input type="radio" id="female" name="looking_for" value={1} checked={form.looking_for == 1 ? "checked" : ""} onChange={ handleChange }  placeholder="Female" />
                              <label htmlFor="female">Men</label>
                            </div>
                            <div className="form-group">
                              <input type="radio" id="male" name="looking_for" value={2} checked={form.looking_for == 2 ? "checked" : ""}  onChange={ handleChange } placeholder="Male" />
                              <label htmlFor="male">Women</label>
                            </div>
                              
                            <div className="form-group">
                              <input type="radio" id="more" value={3}  checked={form.looking_for == 3 ? "checked" : ""} onChange={ handleChange }  name="looking_for" />
                              <label htmlFor="more">Both</label>
                          </div>                
          </div>
        
         <div className="choose-intersest ft-block d-flex flex-wrap"  >
         <div className="tab-title">
         <label>Interest hobbies</label>
           </div>
          {interestData.map((item , i) => (
            // checked={CheckedItem(item.id)}
          <div className="form-group">
              <input type="checkbox" id={"interests_hobbie"+i}  onClick={handleCheck} name="interests_hobbie" value={item.id}/>
            <label for={"interests_hobbie"+i}>  {item.interests_or_hobbies}</label>
            </div>
          ))}
         </div>

       
          <a className="btn bg-grd-clr d-block btn-countinue-3" id="edit-second-step" href="javascript:void(0)" onClick={updateProfile}>Update</a>
          <NotificationContainer/>
     
      </div>
  
        );
             default:
        return 'foo';
    }

  }
// console.log(profileData);
  return(
   <div>
  <section className="home-wrapper">
    <img className="bg-mask" src="/assets/images/mask-bg.png" alt="Mask" />
    <div className="header-bar">
      <div className="container-fluid p-0">
        <div className="row no-gutters">
          <div className="col-lg-5 p-3">
            <div className="d-flex flex-wrap align-items-center">
              <div className="logo-tab d-flex justify-content-between align-items-start">
                <a href="javascript:void(0)">
                 <Logo/>
                </a>
              </div>
              {/* <div className="vc-head-title d-flex flex-wrap align-items-center ml-5">
                <div className="vc-user-name d-flex flex-wrap align-items-center">
                  <figure>
                    <img onError={(e) => addDefaultSrc(e)} src={!!profileData.profile_images ? profileData.profile_images : returnDefaultImage()} alt="Augusta Castro"  />
                  </figure>
                  <div className="name ml-2">{profileData.first_name +' '+ profileData.last_name }  <span className="age">{profileData.age}</span></div>
                </div>
                <div className="remaining-coins ml-4">
                  <img src="/assets/images/diamond-coin.png" alt="Coins" />
                  <span> {!!userData&& userData.coins!=0 ?  userData.coins :  "0" }</span>
                </div>
              </div> */}
            </div>
          </div>
          <div className="col-lg-7 p-3">
            <div className="tab-top d-flex flex-wrap-wrap align-items-center">
            
            <NavLinks />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="container becomevip-wrapper">
      <div className="row">
        <div className="col-md-4 border-rt">
          <div className="user-profile becomevip-wrapper__innerblock p-0">
            <div className="user-profile__details text-center">
            < img onError={(e) => addDefaultSrc(e)} src={!!profileData.profile_images ? profileData.profile_images : returnDefaultImage()} alt="user" className="user-profile__image img-circle medium-image" onClick={handleImage}/>
           
              <div className="user-profile__details__data">
                <h5 className="user-profile__name">{profileData.first_name +' '+ profileData.last_name } </h5>
                <div className="user-profile__level d-inline-block">
                {!!userData&&
                            <>
                             {userData.packages.length>0 ? 
                              <span className="d-block"><img src="/assets/images/level-img.png" alt="profile level" />Premium, vip</span>
                            : ""}
                            </>
                            }
                 
                  <span className="d-block"><img src="/assets/images/diamond-sm.png" alt="balance" />Balance: {!!userData&& userData.coins!=0 ?  userData.coins :  "0" }</span>
                </div>
              </div>
            </div>
            <div className="user-profile__status">
              <ul className="d-flex flex-wrap justify-content-center">
                <li><span className="user-profile__status__heading d-block text-uppercase">Liked</span>
                  <span className="user-profile__status__counter d-block">  
                   {!!profileData &&
                    <>
                    {profileData.likes!=0 ?  profileData.likes :  "" }
                    </>}{<p>0</p>}</span>
                </li>
                <li><span className="user-profile__status__heading d-block text-uppercase">Story</span>
                  <span className="user-profile__status__counter d-block">{!!userData ? userData.statuses.length :""}</span>
                </li>
                <li><span className="user-profile__status__heading d-block text-uppercase">Coins</span>
                  <span className="user-profile__status__counter d-block">
                    {!!userData &&
                    <>
                    {userData.coins!=0 ?  userData.coins :  "" }
                    </>}
             
                    </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="user-profile__options becomevip-wrapper__innerblock">
            <ul>
           
              <li><a href="javascript:void(0)" id="gift-modal" onClick={handleGift}><img src="/assets/images/gift-icon.png" alt="gifts" />
                  <h6>Gifts</h6> <i className="fas fa-chevron-right"/>
                </a></li>
              <li><a href="javascript:void(0)" id="edit-profile" onClick={handleShow}><img src="/assets/images/edit-profile.png" alt="Edit Profile" />
                  <h6>Edit Profile</h6> <i className="fas fa-chevron-right" />
                </a></li>
              <li><a href="javascript:void(0)" id="coin-spend" onClick={handleCoinHistory}><img src="/assets/images/diamond-coin.png" alt="Coins" />
                  <h6>Coins</h6> <i className="fas fa-chevron-right" />
                </a></li>
            </ul>
          </div>
          <div className="user-profile__options becomevip-wrapper__innerblock">
            <ul>
              <li><a href="javascript:void(0)" id="blacklist" onClick={handleBlockList}>
                  <h6><img src="/assets/images/blacklist-icon.png" alt="Blacklist" />Blacklist</h6> <i className="fas fa-chevron-right" />
                </a></li>
              <li><a href="javascript:void(0)" id="setting" onClick={handleSettingShow}>
                  <h6><img src="/assets/images/setting-icon.png" alt="setting" />Settings</h6> <i className="fas fa-chevron-right" />
                </a></li>
                <li><a href="javascript:void(0)" id="coin-spend" onClick={handleBuyCoins}><img src="/assets/images/diamond-coin.png" alt="Coins" />
                  <h6>Buy Coins</h6> <i className="fas fa-chevron-right" />
                </a></li>
               
            </ul>
          </div>
          <div className="user-profile__logout becomevip-wrapper__innerblock text-center">
            <a href="javascript:void(0)" className="text-white signout-btn" onClick={handleLogout}>Sign out</a>
          </div>
        </div>
        <div className="col-md-4">
          <div className="membership-plans">
          {!!userData&&
                            <>
                             {userData.packages.length>0 ? 
                             ""
                            : <h5 className="text-white text-uppercase"><img src="/assets/images/Crown-white.png" alt="crown" /> Become vip</h5>}
                            </>
                            }
          

          {packageList.map((item,i) =>(
           (!!item && item.duration === "12") ?
     
            <div className="membership-plans__block active mt-5">
            <a href="javascript:void(0)" key={i} onClick={(e) => Stripehandler(item.plan_id)}>
              <span className="membership-discount">{`save ${item.save}`}</span>
              <h5 className="text-white text-uppercase mb-0">{item.name}</h5>
              <div className="membership-plans__price">
                <span>{`$${item.rate}.00`} </span>
                <span>{`${item.per_monthRate}`}</span>
              </div>
            </a>
          </div>
          : <div className="membership-plans__block" key={i} onClick={(e) => Stripehandler(item.plan_id)}>
          <a href="javascript:void(0)">
            <h5 className="text-uppercase mb-0">{item.name}</h5>
            <div className="membership-plans__price">
              <span>{`$${item.rate}.00`}</span>
              <span>{`${!!item.per_monthRate ? item.per_monthRate : ""}`}</span>
            </div>
          </a>
        </div>
            
         ))}

          </div>
        </div>
      
        <div className="col-md-4">
          <div className="user-actions">
            <div className="becomevip-wrapper__innerblock">
              <ul>
                <li><a href>
                    <span><img src="/assets/images/more-views.png" alt="gifts" /></span>
                    <h6 className="mb-0">More Views </h6>
                  </a></li>
                <li><a href>
                    <span><img src="/assets/images/text-msg.png" alt="Edit Profile" /></span>
                    <h6 className="mb-0">Unlimited text messages </h6>
                  </a></li>
                <li><a href>
                    <span><img src="/assets/images/like-profile.png" alt="Coins" /></span>
                    <h6 className="mb-0">See who likes my profile</h6>
                  </a></li>
                <li><a href>
                    <span><img src="/assets/images/top-streamer.png" alt="Coins" /></span>
                    <h6 className="mb-0">View top streamers on the search Criteria first</h6>
                  </a></li>
                <li><a href>
                    <span><img src="/assets/images/turnoff-ads.png" alt="Coins" /></span>
                    <h6 className="mb-0">Turn Off Ads</h6>
                  </a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <Modal className =" edit-payment-modal" show={showStripe} onHide={() => setShowStripe(false)} backdrop="static" keyboard={false}>
        <div className="edit-payment-modal__inner">
        
          <div className="d-flex align-items-center">
            <h4 className="theme-txt text-center mb-4 ml-3">Your Card details</h4>
          </div>
        
          <StripeForm />

           </div>
           <a href="javascript:void(0)" className="modal-close" onClick={closeStripeModel}><img src="/assets/images/btn_close.png" /></a>
    </Modal>

<Modal className="Image-model" show={showImage}  onHide= {() => setShowImage(false)}>
<form>
<h6>Upload File</h6>
  <div className="image-uploader position-relative">
   <label className="custom-file-upload"></label>
   <a href="javascript:void(0)"  className="btn bg-grd-clr">Select Photo</a>
   
  <input type="file" id="profile-photo" name="profile-photo" onChange={handleFileChange} className="d-none" accept="image/*" />


{/* <button onClick={updateImage}>Upload</button> */}
</div>
<a href="javascript:void(0)" onClick={updateImage} className="btn bg-grd-clr">Publish Photo</a>
<NotificationContainer/>
</form>
</Modal>
   {/* <div class="edit-profile-modal modal-wrapper"> */}
   <Modal className =" edit-profile-modal" show={show} onHide={() => setShow(false)} backdrop="static" keyboard={false}>
        <div className="edit-profile-modal__inner">
        
         
      
        <form>
      
          {tabScreen()}
         
          </form>
           </div>
           <a href="javascript:void(0)" className="modal-close" onClick={() => setShow(false)}><img src="/assets/images/btn_close.png" /></a>
    </Modal>
  
    <Modal className ="coin-spend-modal" show={showCoins} onHide={() => setShowCoin(false)} backdrop="static" keyboard={false}>
    <div className="edit-profile-modal__inner">
          <h4 className="theme-txt text-center mb-4 ">Coin Spend</h4>
          <h4 className="total-coins-spend text-center mb-4">{coinSpend}</h4>
      {coinHistory.map((item , index)=> {
     return  <div className="coin-spend">
        <div className="coin-spend__host">
          <img src={item.receiver_image} alt="host" />
        </div>
        <div className="coins-spend__hostname">
          <span>{item.receiver_name}</span> <span className="counter">{item.receiver_age}</span>
          <div className="coin-spend__total"><img src="/assets/images/diamond-sm.png" />{item.coins}</div>
        </div>
        <div className="coin-spend__gift">
          <img src={item.gift_image} alt="gift" />
        </div>
      </div>
     })} 
     {
       !!warningMessage ?
       <h6 className="text-center">
         {warningMessage}
       </h6>
       :
       ""
     }
     
      <SyncLoader color={"#fcd46f"} loading={isLoaded} css={override} size={18} />
    </div>
    <a href="javascript:void(0)" className="modal-close" onClick={() => setShowCoin(false)}><img src="/assets/images/btn_close.png" /></a>
  </Modal>
 
  <Modal className ="blacklist-modal " show={showBlock} onHide={()=> setShowBlock(false)} backdrop="static" keyboard={false}>
    <div className="edit-profile-modal__inner">
    <h4 className="theme-txt text-center mb-4 ">Blacklist</h4>
         
    {!!blockData&&
    <>
    {blockData.map((item, i) => {
  
    return <div className="coin-spend">
     <div className="coin-spend__host">
       <img src={item.profile_images} alt="host" />
     </div>
     <div className="coins-spend__hostname">
       <span>{item.first_name}</span> <span className="counter">{item.age}</span>
       <div className="coin-spend__total" > 
           <a className="theme-txt" href="javascript:void(0)" onClick={() => setBlockId(item.user_id)}>Unblock</a>
           <NotificationContainer/>
         </div>
         
     </div>
  
   </div>
 })}</>} 

    </div>
   
    <a href="javascript:void(0)" className="modal-close" onClick={() => setShowBlock(false)}><img src="/assets/images/btn_close.png" /></a>
   
 </Modal>

  <Modal className ="setting-modal" show={showSetting} onHide={() => setShowSetting(false)} backdrop="static" keyboard={false}>
    <div className="edit-profile-modal__inner">
    <Modal.Header>
          <Modal.Title> <h4 className="theme-txt text-center mb-4 ">Settings</h4>
          </Modal.Title>
      </Modal.Header>
      <div className="user-profile__options becomevip-wrapper__innerblock">
        <ul>
          <li><a href="javascript:void(0)">
              <h6>Notification</h6>
              <i className="fas fa-chevron-right" />
            </a>
          </li>
          <li><a href="javascript:void(0)" onClick={handlePrivacy}>
               <h6>Privacy</h6>
              <i className="fas fa-chevron-right" />
            </a></li>

          <li><a href="javascript:void(0)">
              <h6>General</h6>
              <i className="fas fa-chevron-right" />
            </a>
          </li>
        </ul>
      </div>
      <div className="user-profile__options becomevip-wrapper__innerblock">
        <ul>
          <li><a href="javascript:void(0)">
              <h6>Help Center</h6>
              <i className="fas fa-chevron-right" />
            </a>
          </li>
          <li><a href="javascript:void(0)" onClick={handleAbout}>
              <h6>About Glitters</h6>
              <i className="fas fa-chevron-right" />
            </a>
          </li>
          <li><a href="javascript:void(0)" onClick={handleShare}>
              <h6>Share Glitters</h6>
              <i className="fas fa-chevron-right" />
            </a>
          </li>
        </ul>
      </div>
      <div className="user-profile__options becomevip-wrapper__innerblock custom-checkbox">
        <ul>
          <li>
            <h6>Lovsense</h6>
            <div className="custom-checkbox__status">
              <span className="checkbox-state">Active</span>
              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="slider" />
              </label>
            </div>
          </li>
          <li>
            <h6>Spin Wheel</h6>
            <div className="custom-checkbox__status">
              <span className="checkbox-state">Inactive</span>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider" />
              </label>
            </div>
          </li>
          <li>
            <h6>Do Not Disturb</h6>
            <div className="custom-checkbox__status">
              <span className="checkbox-state">Inactive</span>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider" />
              </label>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <a href="javascript:void(0)" className="modal-close" onClick={() => setShowSetting(false)}><img src="/assets/images/btn_close.png" /></a>
   
  </Modal>
  
  <Modal className="buy-coin-model" show={showBuyCoins} onHide={() => setShowBuyCoins(false)} >
      <div className="edit-profile-modal__inner">
      <h4 className="theme-txt text-center mb-4 ">Get coins</h4>
    
      <div className="membership-plans">
        {coinPackage.map((item , i) => (
          <div className="membership-plans__block  active mt-2">
              <a href="javascript:void(0)" className="justify-content-start" onClick={(e) => StripeCoinHandler(item.id)}>
                <div className="buy-gifts__image">
                <img src="/assets/images/diamond-sm.png" alt="diamond" />
                </div>
        
                <div className="buy-gifts_price text-white">
                <h5 className="mb-0">{`${item.coins}coins`}</h5>
                <span className="rate">{`$${item.rates}.00`}</span>
                </div>        
                {!!item.tags ? <span className='gift__discount'>{item.tags}</span> :""}
               
               </a>
          </div>
          ))} 
        <SyncLoader color={"#fcd46f"} loading={isLoaded} css={override} size={18} />
       </div>
       <a href="javascript:void(0)" className="modal-close" onClick={() => setShowBuyCoins(false)}><img src="/assets/images/btn_close.png" /></a>
      
           </div>
          
</Modal>

  <Modal className="about-model" show={showAbout} onHide={() => setShowAbout(false)} >
  <Modal.Header closeButton >
    <Modal.Title>
  <h2>About Glitter</h2>
  </Modal.Title>
      </Modal.Header> 
      <AboutGlitter/>
  </Modal>

  <Modal className="privacy-model" show={showPrivacy} onHide={() => setShowPrivacy(false)} >
  <Modal.Header closeButton >
    <Modal.Title>
  <h2>Privacy policy</h2>
  </Modal.Title>
      </Modal.Header> 
      <PrivacyPolicy/>
  </Modal>

  <Modal className="share-model" show={showShare} onHide={() => setShowShare(false)} >
  <Modal.Header closeButton >
    <Modal.Title>
  <h4 className="theme-txt">Share Glitter</h4>
  </Modal.Title>
      </Modal.Header> 
        <div className="share__icons">

        
        <div className="some-network">
          <FacebookShareButton url={shareUrl} quote={title} className="share-button" >
            <FacebookIcon  round />
          </FacebookShareButton>
          </div>
        
        <div className="some-network">
          <TwitterShareButton url={shareUrl} title={title} className="share-button" >
            <TwitterIcon  round />
          </TwitterShareButton>
        </div>

        <div className="some-network">
          <TelegramShareButton url={shareUrl} title={title} className="share-button">
            <TelegramIcon round />
          </TelegramShareButton>
        </div>
         
         <div className="some-network">
          <EmailShareButton url={shareUrl} subject={title} body="body" className="share-button">
            <EmailIcon round />
          </EmailShareButton>
        </div>


        <div className="some-network">
          <WhatsappShareButton url={shareUrl} title={title} separator=":: " className="share-button">
            <WhatsappIcon round />
          </WhatsappShareButton>
        </div>

        </div>
  </Modal>

  <div className={isOn ? 'all-gifts-wrapper active': 'all-gifts-wrapper '} >
    <div className="all-gift-inner">
    <a href="javascript:void(0)" className="close-gift-btn modal-close" onClick={toggleIsOn}><img src="/assets/images/btn_close.png" /></a>
      <div className="all-gift-header d-flex flex-wrap align-items-center mb-3">
        <h5 className="mb-0 mr-4">Send Gift</h5>
        <div className="remaining-coins">
          <img src="/assets/images/diamond-coin.png" alt="Coins" />
          <span>152</span>
        </div>
      </div>
      <div className="all-gift-body">
        
        <ul className="d-flex flex-wrap text-center ">
        {GiftData.map((items , i) => {
        return<li onClick={() => getGiftItem(items.id)}>
            <a href="javascript:void(0)" >
              <div>
                <figure>
                  <img src={items.gift_image} alt={items.gift_name} />
                </figure>
                <div className="gift-price">
                  <img src="/assets/images/diamond-coin.png" alt="Coins" />
                  <span>{items.gift_coins}</span>
                </div>
              </div>
            </a>
          </li>
           })}
         
        </ul>
      </div>
    </div>
  </div>
</div>


    )
}
export default Profile;



