
import React, { useState, useEffect, useRef } from "react";
import {  useHistory } from 'react-router';
import axios from "axios";
import NavLinks from '../components/Nav';
import { GET_GIFT_API , GIFT_LIST_API , GET_LOGGEDPROFILE_API , EDITPROFILE_API , BLOCK_USERLIST_API , LOGOUT_API, BLOCK_USER_API} from '../components/Api';
import useToggle from '../components/CommonFunction';
import {removeStorage} from '../components/CommonFunction';
import Login from '../pages/Login'
import { useDispatch } from 'react-redux';
import {login} from '../features/userSlice';
import {Modal, ModalBody , Dropdown} from 'react-bootstrap';
// import {addBodyClass} from '../components/CommonFunction'; 
   

const Profile = () =>{

   //Adding class to body and removing the class
  // addBodyClass('no-bg')('login-body')

  const history = useHistory();
  const dispatch = useDispatch();
  const [profileData, setProfile] = useState('');  
  const [blockData, setBlockData] = useState([]);
  const [GiftData , setGiftData] = useState([]);
  const [step, setStep] = useState(1);
  const [show, setShow] = useState(false);
  const [showBlock , setShowBlock] = useState(false);
  const [showSetting ,setShowSetting] = useState(false);
  const [showCoins , setShowCoin] = useState(false);
  const [showGift , setShowGift] = useState(false);
  const [isOn, toggleIsOn] = useToggle();
  const [isProfile, toggleProfile] = useToggle();
  const handleShow = () => setShow(true); // show Edit model
  const handleSettingShow = () => setShowSetting(true); //show Setting Model
  const handleCoinsShow = () => setShowCoin(true); //show coins model
  
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
    interest:"",
      
  });

//  console.log(form);
  
  const handleChange = e => { 
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    }) 
}



  // Fetching profile Data
  var sessionId = localStorage.getItem("session_id")
  const ProfileData = async() =>{
    const bodyParameters = {
      session_id: sessionId,
      };
     const {data:{data}}= await axios.post(GET_LOGGEDPROFILE_API,bodyParameters)

    //  Setting data variable to state object 
      form.firstName = data.first_name
      form.lastName = data.last_name
      form.dob = data.dob
      form.aboutMe = data.about_me
      form.height = data.height
      form.weight = data.weight
      form.gender = data.gender
      form.interest = data.interest
      form.relationStatus = data.relationship_status
       setProfile(data);
       }

       console.log(profileData);
   
     //update profile data
     const updateProfile = (e) =>{
     console.log("working");
     const bodyParameters ={
    session_id : sessionId,
    device_token : "uhydfdfghdertyt445t6y78755t5jhyhyy",
    device_type : 0 ,
    first_name : form.firstName,
    last_name : form.lastName,
    dob : form.dob,
    gender :form.gender,
    aboutMe : form.aboutMe,
    height : form.height,
    weight : form.weight,
    interest:form.interest,
    relationship_status :form.relationStatus
   };
   axios.post(EDITPROFILE_API , bodyParameters) 
   .then((response) => {
   if(response.status==200){
    
    alert("update succesfully")
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
      removeStorage('session_id');
      history.push('/login');
      alert("logout successfully")
    }, (error) =>{

    });
   }

   //block list
   const handleBlock = async() => {
     setShowBlock(true);
   const bodyParameters ={
    session_id: sessionId,
   };
   const{data : {data}} = await axios.post(BLOCK_USERLIST_API ,bodyParameters)
   setBlockData(data);
   
   }

 

   //all gift
   const handleGift = async() =>{
    toggleIsOn(true);
     const bodyParameters = {
       session_id : sessionId,
     }
    const {data:{result}} = await axios.post(GIFT_LIST_API , bodyParameters)
      setGiftData(result);
   }

   //get gift item
   const getGiftItem = async(Id) => {
    const bodyParameters ={
      session_id : sessionId ,
      gift_id : Id
    }
    const {data : {result}} = await axios.post(GET_GIFT_API , bodyParameters)
   console.log(result);
   }
  // console.log(blockData);

   const tabScreen = () =>{
    
    switch(step) {
      case 1:
        return (
          
          <div className="edit-first-step">
              <div className="form-group">
                  <label for="">First Name</label>
                <input className="form-control bg-trsp" name="firstName" type="text" value={form.firstName}  onChange={handleChange}/>
              </div>
              <div className="form-group">
              <label for="">Last name</label>
                  <input className="form-control bg-trsp" name="lastName" type="text" value={form.lastName} onChange={handleChange}/>
              </div>
              <div className="form-group">
                  <label for="">DOB</label>
                  <input className="form-control bg-trsp" name="dob" type="text" value={form.dob} onChange={handleChange}  />
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
             <a href="javascript:void(0)" className="login-back-2 btn-back" onClick={() => setStep(step - 1)} ><i className="fas fa-chevron-left" /></a>
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


          <div className="show-gender ft-block d-flex flex-wrap">
              <div className="tab-title">
                  <label>Looking For</label>
              </div>

              <div className="form-group">
                  <input type="checkbox"  name="interest" id="man" value={1} onChange={handleChange} />
                  <label for="man">Man</label>
              </div>
              <div className="form-group">
                  <input type="checkbox" name="interest" id="woman" value={2} onChange={handleChange} />
                  <label for="woman">Woman</label>
              </div>
              <div className="form-group">
                  <input type="checkbox" name="interest" id="both" value={3} onChange={handleChange} />
                  <label for="both">Both</label>
              </div>

              
              
          </div>

          <a className="btn bg-grd-clr d-block btn-countinue-3" id="edit-second-step" href="javascript:void(0)" onClick={updateProfile}>Update</a>

      </div>
  
        );
             default:
        return 'foo';
    }

  }

  useEffect(() =>{
  ProfileData();
  //handleBlock();

  },[])


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
                  <img src="/assets/images/glitters.png" alt="Glitters" />
                </a>
              </div>
              <div className="vc-head-title d-flex flex-wrap align-items-center ml-5">
                <div className="vc-user-name d-flex flex-wrap align-items-center">
                  <figure>
                    <img src={profileData.profile_images} alt="Augusta Castro"  />
                  </figure>
                  <div className="name ml-2">{profileData.first_name +' '+ profileData.last_name }  <span className="age">{profileData.age}</span></div>
                </div>
                <div className="remaining-coins ml-4">
                  <img src="/assets/images/diamond-coin.png" alt="Coins" />
                  <span>{profileData.coins}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7 p-3">
            <div className="tab-top d-flex flex-wrap-wrap align-items-center">
              <div className="vc-action-tab ml-auto mr-4 position-relative">
              
                <div className="vc-action-btn" onClick={toggleProfile}>
                  <span/>
                  <span/>
                  <span/>
                </div>
                <ul className={isProfile ? 'action-menu active': 'action-menu'}>
                  <li>
                    <a href="javascript:void(0)">Report</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">Block</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">End Video</a>
                  </li>
                </ul>
              </div>
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
            
              <img src={profileData.profile_images} alt="user" className="user-profile__image img-circle medium-image" />
                 
              <div className="user-profile__details__data">
                <h5 className="user-profile__name">{profileData.first_name +' '+ profileData.last_name } </h5>
                <div className="user-profile__level d-inline-block">
                  <span className="d-block"><img src="/assets/images/level-img.png" alt="profile level" />Premium, vip</span>
                  <span className="d-block"><img src="/assets/images/diamond-sm.png" alt="balance" />Balance: 152</span>
                </div>
              </div>
            </div>
            <div className="user-profile__status">
              <ul className="d-flex flex-wrap justify-content-center">
                <li><span className="user-profile__status__heading d-block text-uppercase">Liked</span>
                  <span className="user-profile__status__counter d-block">{profileData.likes}</span>
                </li>
                <li><span className="user-profile__status__heading d-block text-uppercase">Story</span>
                  <span className="user-profile__status__counter d-block">0</span>
                </li>
                <li><span className="user-profile__status__heading d-block text-uppercase">Coins</span>
                  <span className="user-profile__status__counter d-block">{profileData.coins}</span>
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
              <li><a href="javascript:void(0)" id="coin-spend" onClick={handleCoinsShow}><img src="/assets/images/diamond-coin.png" alt="Coins" />
                  <h6>Coins</h6> <i className="fas fa-chevron-right" />
                </a></li>
            </ul>
          </div>
          <div className="user-profile__options becomevip-wrapper__innerblock">
            <ul>
              <li><a href="javascript:void(0)" id="blacklist" onClick={handleBlock}>
                  <h6><img src="/assets/images/blacklist-icon.png" alt="Blacklist" />Blacklist</h6> <i className="fas fa-chevron-right" />
                </a></li>
              <li><a href="javascript:void(0)" id="setting" onClick={handleSettingShow}>
                  <h6><img src="/assets/images/setting-icon.png" alt="setting" />Setting</h6> <i className="fas fa-chevron-right" />
                </a></li>
            </ul>
          </div>
          <div className="user-profile__logout becomevip-wrapper__innerblock text-center">
            <a href="javascript:void(0)" className="text-white signout-btn" onClick={handleLogout}>Sign out</a>
          </div>
        </div>
        <div className="col-md-4">
          <div className="membership-plans">
            <h5 className="text-white text-uppercase"><img src="/assets/images/Crown-white.png" alt="crown" /> Become vip</h5>
            <div className="membership-plans__block active mt-5">
              <a href="javascript:void(0)">
                <span className="membership-discount">save 57%</span>
                <h5 className="text-white text-uppercase mb-0">12 months</h5>
                <div className="membership-plans__price">
                  <span>$50.00</span>
                  <span>then $4.16/Month</span>
                </div>
              </a>
            </div>
            <div className="membership-plans__block">
              <a href="javascript:void(0)">
                <h5 className="text-uppercase mb-0">6 months</h5>
                <div className="membership-plans__price">
                  <span>$30.00</span>
                  <span>$5 per month</span>
                </div>
              </a>
            </div>
            <div className="membership-plans__block">
              <a href="javascript:void(0)">
                <h5 className="text-uppercase mb-0">3 months</h5>
                <div className="membership-plans__price">
                  <span>$20.00</span>
                  <span>$6.66 per month</span>
                </div>
              </a>
            </div>
            <div className="membership-plans__block">
              <a href="javascript:void(0)">
                <h5 className="text-uppercase mb-0">1 month</h5>
                <div className="membership-plans__price">
                  <span>$5.00</span>
                  <span>10$ renew automatically.</span>
                </div>
              </a>
            </div>
            <div className="membership-plans__block">
              <a href="javascript:void(0)">
                <h5 className="text-uppercase mb-0">1 Day vip pass</h5>
                <div className="membership-plans__price">
                  <span>$1.00</span>
                </div>
              </a>
            </div>
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

   {/* <div class="edit-profile-modal modal-wrapper"> */}
   <Modal className =" edit-profile-modal" show={show} onHide={() => setShow(false)} backdrop="static" keyboard={false}>
        <div className="edit-profile-modal__inner">
        <Modal.Header closeButton >
          <Modal.Title> <h4 className="theme-txt text-center mb-4 ">Your Information</h4>
          </Modal.Title>
        </Modal.Header>
        <form>
      
          {tabScreen()}
         
          </form>
           </div>
       
    </Modal>
  
    <Modal className ="coin-spend-modal" show={showCoins} onHide={() => setShowCoin(false)} backdrop="static" keyboard={false}>
    <div className="edit-profile-modal__inner">
    <Modal.Header closeButton >
          <Modal.Title> <h4 className="theme-txt text-center mb-4 ">Coin Spend</h4>
          <h4 className="total-coins-spend text-center mb-4">152,922</h4>
          </Modal.Title>
        </Modal.Header>
      <div className="coin-spend">
        <div className="coin-spend__hostimg">
          <img src="/assets/images/host.png" alt="host" />
        </div>
        <div className="coins-spend__hostname">
          <span>Charlotte Marie</span> <span className="counter">20</span>
          <div className="coin-spend__total"><img src="/assets/images/diamond-sm.png" /> 75</div>
        </div>
        <div className="coin-spend__gift">
          <img src="/assets/images/lips-red.png" alt="gift" />
        </div>
      </div>
      <div className="coin-spend">
        <div className="coin-spend__hostimg">
          <img src="/assets/images/host.png" alt="host" />
        </div>
        <div className="coins-spend__hostname">
          <span>Charlotte Marie</span> <span className="counter">20</span>
          <div className="coin-spend__total"><img src="/assets/images/diamond-sm.png" /> 75</div>
        </div>
        <div className="coin-spend__gift">
          <img src="/assets/images/lips-red.png" alt="gift" />
        </div>
      </div>
      <div className="coin-spend">
        <div className="coin-spend__hostimg">
          <img src="/assets/images/host.png" alt="host" />
        </div>
        <div className="coins-spend__hostname">
          <span>Charlotte Marie</span> <span className="counter">20</span>
          <div className="coin-spend__total"><img src="/assets/images/diamond-sm.png" /> 75</div>
        </div>
        <div className="coin-spend__gift">
          <img src="/assets/images/lips-red.png" alt="gift" />
        </div>
      </div>
      <div className="coin-spend">
        <div className="coin-spend__hostimg">
          <img src="/assets/images/host.png" alt="host" />
        </div>
        <div className="coins-spend__hostname">
          <span>Charlotte Marie</span> <span className="counter">20</span>
          <div className="coin-spend__total"><img src="/assets/images/diamond-sm.png" /> 75</div>
        </div>
        <div className="coin-spend__gift">
          <img src="/assets/images/lips-red.png" alt="gift" />
        </div>
      </div>
      <div className="coin-spend">
        <div className="coin-spend__hostimg">
          <img src="/assets/images/host.png" alt="host" />
        </div>
        <div className="coins-spend__hostname">
          <span>Charlotte Marie</span> <span className="counter">20</span>
          <div className="coin-spend__total"><img src="/assets/images/diamond-sm.png" /> 75</div>
        </div>
        <div className="coin-spend__gift">
          <img src="/assets/images/lips-red.png" alt="gift" />
        </div>
      </div>
    </div>
   
  </Modal>
 
  <Modal className ="blacklist-modal " show={showBlock} onHide={()=> setShowBlock(false)} backdrop="static" keyboard={false}>
    <div className="edit-profile-modal__inner">
    <Modal.Header closeButton >
          <Modal.Title> <h4 className="theme-txt text-center mb-4 ">Blacklist</h4>
          </Modal.Title>
      </Modal.Header>
     
    
    {blockData.map((item, i) => {
  
     return <div className="coin-spend">
        <div className="coin-spend__host">
          <img src={item.profile_images} alt="host" />
        </div>
        <div className="coins-spend__hostname">
          <span>{item.first_name}</span> <span className="counter">{item.age}</span>
          <div className="coin-spend__total" > 
              <a className="theme-txt" href="javascript:void(0)">Unblock</a>
            </div>
        </div>
     
      </div>
    })}
    </div>
     
 </Modal>

  <Modal className ="setting-modal " show={showSetting} onHide={() => setShowSetting(false)} backdrop="static" keyboard={false}>
    <div className="edit-profile-modal__inner">
    <Modal.Header closeButton >
          <Modal.Title> <h4 className="theme-txt text-center mb-4 ">Setting</h4>
          </Modal.Title>
      </Modal.Header>
      <div className="user-profile__options becomevip-wrapper__innerblock">
        <ul>
          <li><a href="javascript:void(0)">
              <h6>Notification</h6>
              <i className="fas fa-chevron-right" />
            </a>
          </li>
          <li><a href="javascript:void(0)">
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
          <li><a href="javascript:void(0)">
              <h6>About Glitters</h6>
              <i className="fas fa-chevron-right" />
            </a>
          </li>
          <li><a href="javascript:void(0)">
              <h6>Share Gilitters</h6>
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
        
        <ul className="d-flex flex-wrap text-center">
      {GiftData.map((items , i) => {
        return <li>
            <a href="javascript:void(0)" >
              <div>
                <figure>
                  <img src={items.image} alt={items.name} />
                </figure>
                <div className="gift-price">
                  <img src="/assets/images/diamond-coin.png" alt="Coins" />
                  <span>{items.coins}</span>
                </div>
              </div>
            </a>
          </li>
        })}
          <li>
          </li>
          <li>                                                    
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>


    )
}
export default Profile;



