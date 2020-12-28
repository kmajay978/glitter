
import React, { useState, useEffect } from "react";
import {  useHistory } from 'react-router';
import axios from "axios";
import NavLinks from '../components/Nav';
import { GET_LOGGEDPROFILE_API , EDITPROFILE_API} from '../components/Api';

const Profile = () =>{

  const history = useHistory();
  const [profileData, setProfile] = useState('');  

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
    editProfile:"",
      
  });

  //console.log(form);
  
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
     setProfile(data);
  
       }
  console.log(profileData);
   

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
    localStorage.removeItem("session_id");
    history.push('/login');
   }

useEffect(() =>{
  ProfileData();
 
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
                    <img src="/assets/images/vc-user.png" alt="Augusta Castro" />
                  </figure>
                  <div className="name ml-2">Augusta Castro <span className="age">20</span></div>
                </div>
                <div className="remaining-coins ml-4">
                  <img src="/assets/images/diamond-coin.png" alt="Coins" />
                  <span>152</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7 p-3">
            <div className="tab-top d-flex flex-wrap-wrap align-items-center">
              <div className="vc-action-tab ml-auto mr-4 position-relative">
                <div className="vc-action-btn">
                  <span />
                  <span />
                  <span />
                </div>
                <ul className="action-menu">
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
              <img src="/assets/images/user-img.png" alt="user" className="user-profile__image" />
                 {/* {profileData.profile_images } */}
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
                  <span className="user-profile__status__counter d-block">218</span>
                </li>
                <li><span className="user-profile__status__heading d-block text-uppercase">Story</span>
                  <span className="user-profile__status__counter d-block">0</span>
                </li>
                <li><span className="user-profile__status__heading d-block text-uppercase">Coins</span>
                  <span className="user-profile__status__counter d-block">152</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="user-profile__options becomevip-wrapper__innerblock">
            <ul>
              <li><a href="javascript:void(0)" id="gift-modal"><img src="/assets/images/gift-icon.png" alt="gifts" />
                  <h6>Gifts</h6> <i className="fas fa-chevron-right" />
                </a></li>
              <li><a href="javascript:void(0)" id="edit-profile"><img src="/assets/images/edit-profile.png" alt="Edit Profile" />
                  <h6>Edit Profile</h6> <i className="fas fa-chevron-right" />
                </a></li>
              <li><a href="javascript:void(0)" id="coin-spend"><img src="/assets/images/diamond-coin.png" alt="Coins" />
                  <h6>Coins</h6> <i className="fas fa-chevron-right" />
                </a></li>
            </ul>
          </div>
          <div className="user-profile__options becomevip-wrapper__innerblock">
            <ul>
              <li><a href="javascript:void(0)" id="blacklist">
                  <h6><img src="/assets/images/blacklist-icon.png" alt="Blacklist" />Blacklist</h6> <i className="fas fa-chevron-right" />
                </a></li>
              <li><a href="javascript:void(0)" id="setting">
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

  <div class="edit-profile-modal modal-wrapper">
        <div class="edit-profile-modal__inner">
            <h4 class="theme-txt text-center mb-4">Your Information</h4>
            <form>
            <div className="edit-profile-form">
                <div className="edit-first-step"><label for="">Gender</label>
                    <div className="form-group">
                        <label for="">First Name</label>
                      <input className="form-control bg-trsp" name="firstName" type="text" value={form.firstName} onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                    <label for="">Last name</label>
                        <input className="form-control bg-trsp" name="lastName" type="text" value={form.lastName} onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label for="">DOB</label>
                        <input className="form-control bg-trsp" name="dob" type="text" value={form.dob} onChange={handleChange} />
                    </div>

                   <div className="choose-gender d-flex my-4">
                                  <div className="form-group">
                                    <input type="radio" id="female" name="gender" value={1}  onChange={ handleChange }  placeholder="Female" />
                                    <label htmlFor="female">Female</label>
                                  </div>
                                  <div className="form-group">
                                    <input type="radio" id="male" name="gender" value={2} onChange={ handleChange } placeholder="Male" />
                                    <label htmlFor="male">Male</label>
                                  </div>
                                    
                                  <div className="form-group">
                                    <input type="radio" id="more" value={3} onChange={ handleChange }  name="gender" />
                                    <label htmlFor="more">More</label>
                                </div>
                                </div>
                    <div className="form-group">
                        <label for="">About Me</label>
                        <textarea name="aboutMe" id="" cols="30" rows="10" onChange={handleChange}>{form.aboutMe}</textarea>
                    </div>

                    <a className="btn bg-grd-clr d-block btn-countinue-3" id="edit-first-step" href="javascript:void(0)">Next</a>
                </div>

                <div className="edit-second-step">
                    

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
                            <input type="checkbox" checked="" name="man" id="man"/>
                            <label for="man">Man</label>
                        </div>
                        <div className="form-group">
                            <input type="checkbox" name="woman" id="woman"/>
                            <label for="woman">Woman</label>
                        </div>
                        <div className="form-group">
                            <input type="checkbox" checked="" name="both" id="both"/>
                            <label for="both">Both</label>
                        </div>
                    </div>

                    <a className="btn bg-grd-clr d-block btn-countinue-3" id="edit-second-step" href="javascript:void(0)" onClick={updateProfile}>Update</a>

                </div>
            </div>
            </form>


        </div>
        <a href="javascript:void(0)" className="modal-close"><img src="assets/images/btn_close.png"/></a>
    </div>


  <div className="coin-spend-modal modal-wrapper">
    <div className="edit-profile-modal__inner">
      <h4 className="theme-txt text-center mb-4">Coin Spend</h4>
      <h4 className="total-coins-spend text-center mb-4">152,922</h4>
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
    <a href="javascript:void(0)" className="modal-close"><img src="/assets/images/btn_close.png" /></a>
  </div>
  <div className="blacklist-modal modal-wrapper">
    <div className="edit-profile-modal__inner">
      <h4 className="theme-txt text-center mb-4">Blacklist</h4>
      <div className="coin-spend">
        <div className="coin-spend__hostimg">
          <img src="/assets/images/host.png" alt="host" />
        </div>
        <div className="coins-spend__hostname">
          <span>Charlotte Marie</span> <span className="counter">20</span>
          <div className="coin-spend__total"><img src="/assets/images/diamond-sm.png" /> 75</div>
        </div>
      </div>
    </div>
    <a href="javascript:void(0)" className="modal-close"><img src="/assets/images/btn_close.png" /></a>
  </div>
  <div className="setting-modal modal-wrapper">
    <div className="edit-profile-modal__inner">
      <h4 className="theme-txt text-center mb-4">Setting</h4>
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
    <a href="javascript:void(0)" className="modal-close"><img src="/assets/images/btn_close.png" /></a>
  </div>
  <div className="all-gifts-wrapper">
    <div className="all-gift-inner">
      <div className="all-gift-header d-flex flex-wrap align-items-center mb-3">
        <h5 className="mb-0 mr-4">Send Gift</h5>
        <div className="remaining-coins">
          <img src="/assets/images/diamond-coin.png" alt="Coins" />
          <span>152</span>
        </div>
      </div>
      <div className="all-gift-body">
        <ul className="d-flex flex-wrap text-center">
          <li>
            <a href="javascript:void(0)">
              <div>
                <figure>
                  <img src="/assets/images/rose-pink.png" alt="Rose" />
                </figure>
                <div className="gift-price">
                  <img src="/assets/images/diamond-coin.png" alt="Coins" />
                  <span>50</span>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <div>
                <figure>
                  <img src="/assets/images/lips-red.png" alt="Lips" />
                </figure>
                <div className="gift-price">
                  <img src="/assets/images/diamond-coin.png" alt="Coins" />
                  <span>75</span>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <div>
                <figure>
                  <img src="/assets/images/gift-3.png" alt="Gift" />
                </figure>
                <div className="gift-price">
                  <img src="/assets/images/diamond-coin.png" alt="Coins" />
                  <span>100</span>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <div>
                <figure>
                  <img src="/assets/images/heart-balloons.png" alt="Hearts" />
                </figure>
                <div className="gift-price">
                  <img src="/assets/images/diamond-coin.png" alt="Coins" />
                  <span>150</span>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <div>
                <figure>
                  <img src="/assets/images/cheese.png" alt="Cheese" />
                </figure>
                <div className="gift-price">
                  <img src="/assets/images/diamond-coin.png" alt="Coins" />
                  <span>200</span>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <div>
                <figure>
                  <img src="/assets/images/heart-gift.png" alt="Heart" />
                </figure>
                <div className="gift-price">
                  <img src="/assets/images/diamond-coin.png" alt="Coins" />
                  <span>250</span>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <div>
                <figure>
                  <img src="/assets/images/coffee.png" alt="Coffee" />
                </figure>
                <div className="gift-price">
                  <img src="/assets/images/diamond-coin.png" alt="Coins" />
                  <span>300</span>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <div>
                <figure>
                  <img src="/assets/images/teddy-bear.png" alt="Teddy" />
                </figure>
                <div className="gift-price">
                  <img src="/assets/images/diamond-coin.png" alt="Coins" />
                  <span>400</span>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <div>
                <figure>
                  <img src="/assets/images/lipstick.png" alt="Lipstick" />
                </figure>
                <div className="gift-price">
                  <img src="/assets/images/diamond-coin.png" alt="Coins" />
                  <span>500</span>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <div>
                <figure>
                  <img src="/assets/images/girl-heel.png" alt="Heels" />
                </figure>
                <div className="gift-price">
                  <img src="/assets/images/diamond-coin.png" alt="Coins" />
                  <span>600</span>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <div>
                <figure>
                  <img src="/assets/images/juice.png" alt="Juice" />
                </figure>
                <div className="gift-price">
                  <img src="/assets/images/diamond-coin.png" alt="Coins" />
                  <span>750</span>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <div>
                <figure>
                  <img src="/assets/images/shampion.png" alt="Shampion" />
                </figure>
                <div className="gift-price">
                  <img src="/assets/images/diamond-coin.png" alt="Coins" />
                  <span>900</span>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <div>
                <figure>
                  <img src="/assets/images/gift-4.png" alt="Gift" />
                </figure>
                <div className="gift-price">
                  <img src="/assets/images/diamond-coin.png" alt="Coins" />
                  <span>1000</span>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <div>
                <figure>
                  <img src="/assets/images/perfume.png" alt="perfume" />
                </figure>
                <div className="gift-price">
                  <img src="/assets/images/diamond-coin.png" alt="Coins" />
                  <span>1500</span>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <div>
                <figure>
                  <img src="/assets/images/locket.png" alt="Locket" />
                </figure>
                <div className="gift-price">
                  <img src="/assets/images/diamond-coin.png" alt="Coins" />
                  <span>2000</span>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <div>
                <figure>
                  <img src="/assets/images/shop-bag.png" alt="Shopping Bag" />
                </figure>
                <div className="gift-price">
                  <img src="/assets/images/diamond-coin.png" alt="Coins" />
                  <span>2500</span>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <div>
                <figure>
                  <img src="/assets/images/diamond.png" alt="Diamond" />
                </figure>
                <div className="gift-price">
                  <img src="/assets/images/diamond-coin.png" alt="Coins" />
                  <span>3000</span>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <div>
                <figure>
                  <img src="/assets/images/rings.png" alt="Rings" />
                </figure>
                <div className="gift-price">
                  <img src="/assets/images/diamond-coin.png" alt="Coins" />
                  <span>3500</span>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <div>
                <figure>
                  <img src="/assets/images/bouquet.png" alt="Bouquet" />
                </figure>
                <div className="gift-price">
                  <img src="/assets/images/diamond-coin.png" alt="Coins" />
                  <span>4000</span>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <div>
                <figure>
                  <img src="/assets/images/crown.png" alt="Crow" />
                </figure>
                <div className="gift-price">
                  <img src="/assets/images/diamond-coin.png" alt="Coins" />
                  <span>5000</span>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <div>
                <figure>
                  <img src="/assets/images/dress.png" alt="Dress" />
                </figure>
                <div className="gift-price">
                  <img src="/assets/images/diamond-coin.png" alt="Coins" />
                  <span>6000</span>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <div>
                <figure>
                  <img src="/assets/images/aeroplane.png" alt="Aeroplane" />
                </figure>
                <div className="gift-price">
                  <img src="/assets/images/diamond-coin.png" alt="Coins" />
                  <span>7500</span>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <div>
                <figure>
                  <img src="/assets/images/undergarments.png" alt="Undergarments" />
                </figure>
                <div className="gift-price">
                  <img src="/assets/images/diamond-coin.png" alt="Coins" />
                  <span>10.000</span>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <div>
                <figure>
                  <img src="/assets/images/gift-5.png" alt="Gift" />
                </figure>
                <div className="gift-price">
                  <img src="/assets/images/diamond-coin.png" alt="Coins" />
                  <span>15.000</span>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <div>
                <figure>
                  <img src="/assets/images/bike.png" alt="Bike" />
                </figure>
                <div className="gift-price">
                  <img src="/assets/images/diamond-coin.png" alt="Coins" />
                  <span>20.000</span>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <div>
                <figure>
                  <img src="/assets/images/car.png" alt="Car" />
                </figure>
                <div className="gift-price">
                  <img src="/assets/images/diamond-coin.png" alt="Coins" />
                  <span>30.000</span>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <div>
                <figure>
                  <img src="/assets/images/rocket.png" alt="Rocket" />
                </figure>
                <div className="gift-price">
                  <img src="/assets/images/diamond-coin.png" alt="Coins" />
                  <span>40.000</span>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <div>
                <figure>
                  <img src="/assets/images/color-fan.png" alt="Color Fan" />
                </figure>
                <div className="gift-price">
                  <img src="/assets/images/diamond-coin.png" alt="Coins" />
                  <span>50.000</span>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <div>
                <figure>
                  <img src="/assets/images/boat.png" alt="Boat" />
                </figure>
                <div className="gift-price">
                  <img src="/assets/images/diamond-coin.png" alt="Coins" />
                  <span>75.000</span>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <div>
                <figure>
                  <img src="/assets/images/building.png" alt="Building" />
                </figure>
                <div className="gift-price">
                  <img src="/assets/images/diamond-coin.png" alt="Coins" />
                  <span>100.000</span>
                </div>
              </div>
            </a>
          </li>
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



