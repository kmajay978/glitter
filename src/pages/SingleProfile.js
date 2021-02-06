import React, { useState, useEffect } from "react";
import {  useHistory } from 'react-router';
import axios from "axios";
import NavLinks from '../components/Nav';
import {GET_SINGLE_STATUS , GIFT_LIST_API , GET_GIFT_API , DISLIKE_USER , LIKE_USER, GET_USERPROFILE_API , BLOCK_USER_API , REPORT_USER_API } from '../components/Api';
import {Modal, ModalBody , Dropdown} from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import Logo from '../components/Logo';
import useToggle from '../components/CommonFunction';
import moment from 'moment'
import {addDefaultSrc, returnDefaultImage} from "../commonFunctions";

const SingleProfile = (props) =>{
    const [userData, setUser] = useState(null);
   
    const [count, setCount] = useState('0');
    const [checkUid, setUserId] = useState(props.location.userId);
    const [blk, setBlock ]= useState(false);
    const [smShow, setSmShow] = useState(false);
    const [showGift , setShowGift] = useState(false);
    const[ form, setForm] =useState({ report :""})
    const [GiftData , setGiftData] =useState([]);
    const [blockData , setBlockData] = useState(false);
    const [statusData , setStatusData] = useState([]);
    const [isOn, toggleIsOn] = useToggle();
    const [ showStatus , setShowStatus] =useState(false);
    
    const showAllStatus = () => setShowStatus(true);
    const history = useHistory()
   
    const handleBack = () => {
      history.push("/");
    }

    const handleChat = () => {
      history.push("/chat");
    }
    
    const handleVideo =() => {
      history.push("/searching-profile");
    }
      const handleChange = e => { 
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      }) 
  }
  
    const handleStatus = async() =>{
      const bodyParameters = {
        user_id: checkUid,
      };
    const {data :{result}} = await  axios.post(GET_SINGLE_STATUS,bodyParameters)
        setStatusData(result);
    }
    console.log(statusData);
      const getUser=()=> {
        const bodyParameters = {
            user_id: checkUid,
            session_id: localStorage.getItem('session_id'),
          };
            axios.post(GET_USERPROFILE_API,bodyParameters)
            .then((response) => {
              if (response.status === 200 && !response.status.error) {
            setUser(response.data.data);
            console.log(response.data.data, "jjjj")
              }
         }, (error) => {
        });
        }

          //all gift
       const handleGift = async() =>{
       toggleIsOn(true);
       const bodyParameters = {
       session_id :  localStorage.getItem('session_id'),
       }
       const {data:{result}} = await axios.post(GIFT_LIST_API , bodyParameters)
       setGiftData(result);
       }

   //get single  gift item
      const getGiftItem = async(Uid) => {
      const bodyParameters ={
      session_id :  localStorage.getItem('session_id') ,
      gift_id : Uid
      }
       const {data : {result}} = await axios.post(GET_GIFT_API , bodyParameters)
      
        }
 
        const handleblock = async() => {
          const bodyParameters={
            session_id : localStorage.getItem('session_id'),
            blocked_user: checkUid,
          }
          axios.post(BLOCK_USER_API , bodyParameters)
          .then((response)=>
          {
          if(response.status==200 && !response.error) {
            setBlockData(true);
          alert("block successfully")
          }
          else {
            setBlockData(false);
          }
          }, (error) =>{
            setBlockData(false);
          });
        }

      const handleReport =() =>{
         const bodyParameters ={
          session_id: localStorage.getItem('session_id') ,
          report_user :checkUid ,
          report_message: form.report
         }
         axios.post(REPORT_USER_API , bodyParameters)
         .then((response) => {
          if(response.status==200)
          { 
           setSmShow(false) }
         } ,(error) => {

         });
        };

        const handleLike =() => {
           const bodyParameters ={
            session_id  : localStorage.getItem('session_id'),
            user_id : checkUid
            }
            axios.post(LIKE_USER, bodyParameters).then(
              (response) => {   
              },
              (error) => {}
            );
        }

        const handleDislike = () => {
          const bodyParameters ={
            session_id : localStorage.getItem('session_id'),
            user_id : checkUid
          }
          axios.post(DISLIKE_USER, bodyParameters).then(
            (response) => {
            },
            (error) => {}
          );
        }
   useEffect(() =>{
    getUser();
    handleStatus();
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
             <Logo/>
            </a>
          </div>
        </div>
        <div className="col-lg-9 p-3">
          <div className="tab-top d-flex flex-wrap-wrap">
          <NavLinks />
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
            <a className="btn-back" href="javascript:void(0)" onClick={handleBack}><i className="fas fa-chevron-left"  /></a>
            <span className="theme-txt">Back</span>
          </div>
        </div>
        <div className="col-md-7">
          <div className="report-tab d-flex flex-wrap align-items-center justify-content-end ml-auto">
            <span className="block-cta">
              <a className="theme-txt" href="javascript:void(0)" onClick={handleblock}>{blockData ?'unblock':'block'}</a>
          
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
            <div className="photo-count">
              <i className="far fa-image" />
              <span className="d-inline-block"> 
               {/* {setCount(count+1)} */}4
              </span>
            </div>
          </div>
          {/* <div className="owl-carousel owl-theme profile-carousel"> */}
          <Carousel id="images_crousal" >
          <Carousel.Item interval={900}>
            <div className="items">
           
              <figure>

                  <img onError={(e) => addDefaultSrc(e)} src={!!userData ? userData.profile_images : returnDefaultImage()} alt="Marlene" />

              
              </figure>
      
              <div className="sp-meta-info">
                <div className="meta-info-data">
                  {
                    !!userData &&
                    <>
                      <h4>{userData.first_name}, {userData.age}</h4>
                      <span>{userData.distance}, {userData.occupation}</span>
                    </>
                  }
                  {
                    <>
                      <h4>  </h4>
                      <span>  </span>
                  </>
                  }
                  
                </div>
                <span className="liked"><i className="fas fa-heart" /> {!!userData ? userData.likes : ""}</span>
             </div>
            </div>
            </Carousel.Item>
            </Carousel>
          {/* </div> */}
          <div className="action-tray d-flex flex-wrap justify-content-center align-items-center">
            <div className="close-btn tray-btn-s">
              <a href="javascript:void(0)" onClick={handleDislike}>×</a>
            </div>
            <div className="chat tray-btn-l">
              <a href="javascript:void(0)" onClick={handleChat}>
                <i className="fas fa-comment" />
              </a>
            </div>
            <div className="video-chat tray-btn-l">
              <a href="javascript:void(0)" onClick={handleVideo}>
                <i className="fas fa-video" />
              </a>
            </div>
            <div className="like-profile tray-btn-s">
              <a href="javascript:void(0)" onClick={handleLike}>
                <i className="fas fa-heart" />
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-7 pl-5">
          <div className="profile-bio-inner my-3">
            <div className="bio-about">
              <h5 className="mb-3">About me</h5>
              <p className="mb-0">{!!userData ? userData.about_me : ""}</p>
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
              <div>{!!userData ? userData.height: ""}</div>
                </li>
                <li>
                  <div className="theme-txt">Weight:</div>
                  <div>{!!userData ? userData.weight : ""}</div>
                </li>
                <li>
                  <div className="theme-txt">Relationship status:</div>
                  <div>{!!userData ? userData.occupation : ""}</div>
                </li>
                <li>
                  <div className="theme-txt">join date:</div>

                  <div>{!!userData ? moment(userData.joined_date.date).format('YYYY/M/D') : ""}</div>
                 
                </li>
              </ul>
            </div>
            <div className="bio-stories">
              <div className="flex-wrapper d-flex align-items-center mb-3">
                <h5 className="mb-0">Archived Stories</h5>
                <span className="see-all ml-5">
                  <a href="javascript:void(0)" onClick={showAllStatus} className="theme-txt">See All</a>
                </span>
              </div>
            <div className="archived-stories d-flex flex-wrap">
            <div className="single-stories locked">
                  <i className="fas fa-lock" />
                </div>
                
                {statusData.slice(0, 3).map((item, i) => {
             return   <div className="single-stories">
                  <figure>
                  {item.status_type==1 ?<img src={item.file} alt="Archived Story" />:<video src={item.file} alt="Archived Story" />}
                  </figure>
                </div>
                  })}  
              </div>
            
            </div>
            <div className="bio-gift">
              <div className="flex-wrapper d-flex align-items-center mb-3">
                <h5 className="mb-0">Gifts</h5>
                <span className="see-all ml-5">
                  <a href="javascript:void(0)" className="theme-txt all-gift-btn"onClick={handleGift}>Send Gifts</a>
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
                <span className="d-inline-block">
                 {!!userData &&
                 <>
                {userData.looking_for == '1' ? "Men" 
                : userData.looking_for == '2'  ? "Women" 
                : "Both"}
                 </>}
                 { <> </>}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <Modal className ="status-modal"   show={showStatus} onHide={() => setShowStatus(false)}   aria-labelledby="example-modal-sizes-title-sm"> 
  <div className="bio-stories">
              <div className="flex-wrapper d-flex align-items-center mb-3">
                <h5 className="mb-0">Archived Stories</h5>

              </div>
            <div className="archived-stories d-flex flex-wrap">
            <div className="single-stories locked">
                  <i className="fas fa-lock" />
                </div>
                
                {statusData.map((item, i) => {
             return   <div className="single-stories">
                  <figure>
                  {item.status_type==1 ?<img src={item.file} alt="Archived Story" />:<video src={item.file} alt="Archived Story" />}
                  </figure>
                </div>
                  })}  
              </div>
            
            </div>
  </Modal>
 
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
        return <li onClick={() => getGiftItem(items.id)}>
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
        </ul>
      </div>
    </div>
  </div>
</section>


    )
}
export default SingleProfile;