import React, { useState, useEffect } from "react";
import {  useHistory } from 'react-router';
import axios from "axios";
import NavLinks from '../components/Nav';
import { GET_USERPROFILE_API , BLOCK_USER_API , REPORT_USER_API } from '../components/Api';
import {Modal, ModalBody , Dropdown} from 'react-bootstrap';

const SingleProfile = (props) =>{
    const [userData, setUser] = useState('');
    const [count, setCount] = useState('0');
    const [blk, setBlock ]= useState(false);
    const [smShow, setSmShow] = useState(false);

    const[ form, setForm] =useState({ report :""})

    const handleChange = e => { 
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      }) 
  }
    var userId = props.location.user_id;
    //  var result=profile_image.length();
      const getUser=()=> {
        const bodyParameters = {
            user_id: 4,
            session_id: localStorage.getItem('session_id'),
          };
            axios.post(GET_USERPROFILE_API,bodyParameters)
            .then((response) => {
            console.log(response);
            setUser(response.data.data);
         }, (error) => {
        });
        }
        const handleblock = async() => {
          const bodyParameters={
            session_id : localStorage.getItem('session_id'),
            blocked_user: 2,
          }
          axios.post(BLOCK_USER_API , bodyParameters)
          .then((response)=>
          {
          if(response.status==200 ) {
          alert("block successfully")
         
          }
       
          
          }, (error) =>{
  
          });
        }

      const handleReport =() =>{
         const bodyParameters ={
          session_id: localStorage.getItem('session_id') ,
          report_user :4 ,
          report_message: form.report
         }
         axios.post(REPORT_USER_API , bodyParameters)
         .then((response) => {
          if(response.status==200)
          { alert("report successfully")
           setSmShow(false) }
         } ,(error) => {

         });
        };

   useEffect(() =>{
    getUser();
    },[])
    return(
       <section className="home-wrapper">
  <img className="bg-mask" src="/assets/images/mask-bg.png" alt="Mask" />
  <div className="header-bar">
    <div className="container-fluid p-0">
      <div className="row no-gutters">
        <div className="col-lg-3 p-3">
          <div className="logo-tab d-flex justify-content-between align-items-start">
            <a href="javascript:void(0)">
              <img src="/assets/images/glitters.png" alt="Glitters" />
            </a>
          </div>
        </div>
        <div className="col-lg-9 p-3">
          <div className="tab-top d-flex flex-wrap-wrap">
            <ul className="feature-menu ml-auto">
              <li className="active">
                <a href="javascript:void(0)">
                  <i className="fas fa-compass" />
                  <span>Discover</span>
                </a>
              </li>
              <li>
                <a href="javascript:void(0)">
                  <i className="fas fa-video" />
                  <span>Video Chat</span>
                </a>
              </li>
              <li>
                <a href="javascript:void(0)">
                  <i className="fas fa-layer-group" />
                  <span>Activity</span>
                </a>
              </li>
              <li>
                <a href="javascript:void(0)">
                  <i className="fas fa-user" />
                  <span>Profile</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="sprofile-inner">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-5">
          <div className="back-bar d-flex align-items-center">
            <a className="btn-back" href="javascript:void(0)"><i className="fas fa-chevron-left" /></a>
            <span className="theme-txt">Back</span>
          </div>
        </div>
        <div className="col-md-7">
          <div className="report-tab d-flex flex-wrap align-items-center justify-content-end ml-auto">
            <span className="block-cta">
              <a className="theme-txt" href="javascript:void(0)" onClick={handleblock}>{blk ?'unblock':'Block'}</a>
            </span>
            <span className="report-cta">
              <a className="theme-txt" href="javascript:void(0)" onClick={() => setSmShow(true)}>Report</a>
            </span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-5">
          <div className="p-title-info d-flex flex-wrap align-items-center justify-content-between my-3">
            <div className="profile-id">
              <span className="d-inline-block">maerineiw</span>
              <span className="d-inline-block">ID:2837289739</span>
            </div>
            <div className="pphoto-count">
              <i className="far fa-image" />
              <span className="d-inline-block"> 
               {/* {setCount(count+1)} */}
              </span>
            </div>
          </div>
          <div className="owl-carousel owl-theme profile-carousel">
            <div className="item">
              <figure>
                <img src={userData.profile_images} alt="Marlene" />
              </figure>
              <div className="sp-meta-info">
                <div className="meta-info-data">
                  <h4>{userData.first_name}, {userData.age}</h4>
                  <span>{userData.distance}, {userData.occupation}</span>
                </div>
                <span className="liked"><i className="fas fa-heart" /> {userData.likes}</span>
             </div>
            </div>
          </div>
          <div className="action-tray d-flex flex-wrap justify-content-center align-items-center">
            <div className="close-btn tray-btn-s">
              <a href="javascript:void(0)">×</a>
            </div>
            <div className="chat tray-btn-l">
              <a href="javascript:void(0)">
                <i className="fas fa-comment" />
              </a>
            </div>
            <div className="video-chat tray-btn-l">
              <a href="javascript:void(0)">
                <i className="fas fa-video" />
              </a>
            </div>
            <div className="like-profile tray-btn-s">
              <a href="javascript:void(0)">
                <i className="fas fa-heart" />
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-7 pl-5">
          <div className="profile-bio-inner my-3">
            <div className="bio-about">
              <h5 className="mb-3">About me</h5>
              <p className="mb-0">{userData.about_me}</p>
            </div>
            <div className="bio-interest">
              <h5 className="mb-3">Interests</h5>
              <div className="interest-tags">
                <span>Fitness</span>
                <span>Beauty</span>
                <span>Dogs</span>
                <span>Laundry</span>
                <span>Cats</span>
              </div>
            </div>
            <div className="bio-basics">
              <h5 className="mb-3">Basic Profile</h5>
              <ul>
                <li>
                  <div className="theme-txt">Height:</div>
              <div>{userData.height}</div>
                </li>
                <li>
                  <div className="theme-txt">Weight:</div>
                  <div>{userData.weight}</div>
                </li>
                <li>
                  <div className="theme-txt">Relationship status:</div>
                  <div>{userData.occupation}</div>
                </li>
                <li>
                  <div className="theme-txt">dob:</div>
                  <div>{userData.dob}</div>
                </li>
              </ul>
            </div>
            <div className="bio-stories">
              <div className="flex-wrapper d-flex align-items-center mb-3">
                <h5 className="mb-0">Archived Stories</h5>
                <span className="see-all ml-5">
                  <a href="javascript:void(0)" className="theme-txt">See All</a>
                </span>
              </div>
              <div className="archived-stories d-flex flex-wrap">
                <div className="single-stories locked">
                  <i className="fas fa-lock" />
                </div>
                <div className="single-stories">
                  <figure>
                    <img src="/assets/images/archived-stories-1.png" alt="Archived Story" />
                  </figure>
                </div>
                <div className="single-stories">
                  <figure>
                    <img src="/assets/images/archived-stories-2.png" alt="Archived Story" />
                  </figure>
                </div>
                <div className="single-stories">
                  <figure>
                    <img src="/assets/images/archived-stories-3.png" alt="Archived Story" />
                  </figure>
                </div>
              </div>
            </div>
            <div className="bio-gift">
              <div className="flex-wrapper d-flex align-items-center mb-3">
                <h5 className="mb-0">Gifts</h5>
                <span className="see-all ml-5">
                  <a href="javascript:void(0)" className="theme-txt all-gift-btn">Send Gifts</a>
                </span>
              </div>
              <div className="gifts-wrapper d-flex flex-wrap">
                <div className="gift-box">
                  <figure>
                    <img src="/assets/images/rose.png" alt="rose" />
                  </figure>
                  <div className="gift-price mt-2"><span className="star"><i className="fas fa-star" /></span> 12</div>
                </div>
                <div className="gift-box">
                  <figure>
                    <img src="/assets/images/heart-cake.png" alt="Heart Cake" />
                  </figure>
                  <div className="gift-price mt-2"><span className="star"><i className="fas fa-star" /></span> 2929</div>
                </div>
                <div className="gift-box">
                  <figure>
                    <img src="/assets/images/heart-balloons.png" alt="Heart Balloons" />
                  </figure>
                  <div className="gift-price mt-2"><span className="star"><i className="fas fa-star" /></span> 2929</div>
                </div>
                <div className="gift-box">
                  <figure>
                    <img src="/assets/images/cake.png" alt="Cake" />
                  </figure>
                  <div className="gift-price mt-2"><span className="star"><i className="fas fa-star" /></span> 2929</div>
                </div>
              </div>
            </div>
            <div className="bio-looking">
              <h5 className="mb-3">Looking For</h5>
              <div className="looking-for">
                <span className="d-inline-block">{userData.looking_for}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <Modal className =" report-modal"   show={smShow} onHide={() => setSmShow(false)}   aria-labelledby="example-modal-sizes-title-sm">
        <div className="edit-profile-modal__inner">
        <Modal.Header  id="example-modal-sizes-title-sm">
        <Modal.Title> <h4 className="theme-txt text-center mb-4 ">Report a problem</h4>
          </Modal.Title>
        </Modal.Header>
        <form>
      
        <div className="choose-report d-flex flex-wrap">
                            <div className="form-group">
                              <input type="radio"  name="report" value="it's spam" id="first-option"  onChange={ handleChange } />
                              <label for="first-option"></label>
                              <span>it's Spam</span>  
                            </div>
                            <div className="form-group">
                              <input type="radio"  name="report" value="Fake user"  id="second-option" onChange={ handleChange }  />
                              <label for="second-option"></label>
                              <span>Fake User</span>
                            </div>
                              
                            <div className="form-group">
                              <input type="radio" name="report" value="more"  id="third-option" onChange={ handleChange }  />
                              <label for="third-option"></label>
                              <span>Other</span>  
                          </div>
                          </div>
                          <a className="btn bg-grd-clr d-block btn-countinue-3 "  id="edit-second-step" href="javascript:void(0)" onClick={handleReport}>Send</a>
          </form>
           </div>
       
    </Modal>
  
</section>


    )
}
export default SingleProfile;