import React, { useState, useEffect } from "react";
import { useHistory, useParams } from 'react-router';
import axios from "axios";
import NavLinks from '../components/Nav';
import { ARCHIVE_STORIES, GIFT_LIST_API, GIFT_PURCHASE_API, DISLIKE_USER, LIKE_USER, GET_USERPROFILE_API, BLOCK_USER_API, REPORT_USER_API } from '../components/Api';
import { Modal } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import Logo from '../components/Logo';
import useToggle from '../components/CommonFunction';
import moment from 'moment'
import { addDefaultSrc, returnDefaultImage } from "../commonFunctions";
import { NotificationManager } from 'react-notifications';
import { useSelector } from "react-redux";
import { userProfile } from '../features/userSlice';

const SingleProfile = (props) => {
  const params = useParams();
  const [userData, setUser] = useState(null);
  const [checkUid, setUserId] = useState(params.userId);
  // const [blk, setBlock] = useState(false);
  const [smShow, setSmShow] = useState(false);
  // const [showGift, setShowGift] = useState(false);
  const [form, setForm] = useState({ report: "" })
  const [GiftData, setGiftData] = useState([]);
  const [blockData, setBlockData] = useState(false);
  const [isOn, toggleIsOn] = useToggle();
  const [showStatus, setShowStatus] = useState(false);
  const [random, setRandom] = useState(0);

  const [archiveStory, setArchiveStory] = useState([]);
  const [archieveStoryCount, setArchiveStoryCount] = useState(0);
  const [demoArchieves, setDemoArchieves] = useState([]);
  const [warningMessage, setWarningMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const showAllStatus = () => {
    setShowStatus(true);
  }
  const showAllGift = () => toggleIsOn(true);
  const history = useHistory()

  const profileData = useSelector(userProfile).user.profile; //using redux useSelector here

  const handleBack = () => {
    history.goBack();
  }


  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleStatus = async () => {

    const bodyParameters = {
      session_id: localStorage.getItem('session_id'),
      second_user_id: checkUid,
    };
    axios.post(ARCHIVE_STORIES, bodyParameters)
      .then((response) => {

        if (response.status == 200 && response.data.success == true) {
          let stories = response.data.result;
          let storiesCount = 0;
          let demoStoties = [];
          stories.forEach((data) => {
            const dataStories = data.status_list;
            storiesCount += dataStories.length;
            dataStories.forEach((data_second) => {
              demoStoties.push(data_second)
            })
          })
          setArchiveStoryCount(storiesCount);
          setDemoArchieves(demoStoties);
          setArchiveStory(stories);
          setWarningMessage("");
        }
        else {
          setWarningMessage(response.data.message)
          setArchiveStory([]);
          setArchiveStoryCount(0);
        }

      },

        (error) => {

          setArchiveStory([]);
          setArchiveStoryCount(0)
          if (error.toString().match("403")) {
            localStorage.removeItem("session_id");
            history.push('/login');
          }


        }
      );
  }

  const getUser = () => {
    const bodyParameters = {
      user_id: checkUid,
      session_id: localStorage.getItem('session_id'),
    };
    axios.post(GET_USERPROFILE_API, bodyParameters)
      .then((response) => {
        if (response.status === 200 && !response.status.error) {
          if (response.data.data.is_reported_message != "") {
            form.report = response.data.data.is_reported_message
          }
          else {
            form.report = "more"
          }
          setUser(response.data.data);
        }
      }, (error) => {
        NotificationManager.error(error.message, "", 2000, () => { return 0 }, true);
      });
  }

  //all gift
  const handleGift = async () => {

    const bodyParameters = {
      session_id: localStorage.getItem('session_id'),
    }
    const { data: { result, status } } = await axios.post(GIFT_LIST_API, bodyParameters)
    if (status == 200) {
      setGiftData(result);

    }
  }

  //send single  gift item
  const getGiftItem = async (Uid) => {
    const bodyParameters = {
      session_id: localStorage.getItem('session_id'),
      gift_id: Uid,
      given_to: checkUid
    }
    const { data: { message, error } } = await axios.post(GIFT_PURCHASE_API, bodyParameters)
    if (error == "false") {
      NotificationManager.success(message, "", 2000, () => { return 0 }, true);
    }
    else {
      NotificationManager.error(message, "", 2000, () => { return 0 }, true);
    }
  }

  // block the user 
  const handleblock = async () => {
    const bodyParameters = {
      session_id: localStorage.getItem('session_id'),
      blocked_user: checkUid,
    }
    axios.post(BLOCK_USER_API, bodyParameters)
      .then((response) => {

        if (response.status == 200 && !response.error) {
          userData.is_blocked = !!response.data.block_status ? 0 : 1
          setUser(userData);
          setRandom(Math.random());
          NotificationManager.success(response.data.message, "", 2000, () => { return 0 }, true);


        }
        else {
          // setBlockData(false);
        }
      }, (error) => {

        NotificationManager.error(error.message, "", 2000, () => { return 0 }, true);
      });
  }

  const handleReport = () => {
    setIsLoading(true);
    const bodyParameters = {
      session_id: localStorage.getItem('session_id'),
      report_user: checkUid,
      report_message: form.report
    }
    axios.post(REPORT_USER_API, bodyParameters)
      .then((response) => {

        if (response.status == 200 && response.data.error == false) {
          NotificationManager.success("report send successfully", "", 2000, () => { return 0 }, true);
          setSmShow(false);
          setIsLoading(false);
        }
        else {
          setIsLoading(false);
          NotificationManager.error(response.data.error_message, "", 1500, () => { return 0 }, true);
        }
      }, (error) => {
        setIsLoading(false);
        NotificationManager.error(error.message, "", 2000, () => { return 0 }, true);
      });

  };

  // const handleLike =() => {
  //    const bodyParameters ={
  //     session_id  : localStorage.getItem('session_id'),
  //     user_id : checkUid
  //     }
  //     axios.post(LIKE_USER, bodyParameters).then(
  //       (response) => {   
  //         if(response.error=="bad_request")
  //         {
  //           localStorage.removeItem("session_id");
  //           history.push('/login');
  //         }
  //       },
  //       (error) => {
  //         if (error.toString().match("403")) {
  //         localStorage.removeItem("session_id");
  //         history.push('/login');
  //       }
  //     }
  //     );
  // }

  // const handleDislike = () => {
  //   const bodyParameters ={
  //     session_id : localStorage.getItem('session_id'),
  //     user_id : checkUid
  //   }
  //   axios.post(DISLIKE_USER, bodyParameters).then(
  //     (response) => {
  //       if(response.error=="bad_request")
  //        {
  //       localStorage.removeItem("session_id");
  //       history.push('/login');
  //      }
  //     },
  //     (error) => {

  //   }
  //   );
  // }

  useEffect(() => {
    getUser();
    handleStatus();
    handleGift();
  }, [])

  return (
    <section className="home-wrapper">
      <img className="bg-mask" src="/assets/images/mask-bg.png" alt="Mask" />
      <div className="header-bar">
        <div className="container-fluid p-0">
          <div className="row no-gutters">
            <div className="col-lg-3 p-3">
              <div className="logo-tab d-flex justify-content-between align-items-start">
                <a href="javascript:void(0)">
                  <Logo />
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
                <a className="btn-back" href="javascript:void(0)" onClick={handleBack}><i className="fas fa-chevron-left" /></a>
                <span className="theme-txt">Back</span>
              </div>
            </div>
            <div className="col-md-7">
              <div className="report-tab d-flex flex-wrap align-items-center justify-content-end ml-auto">
                <span className="block-cta">
                  <a className="theme-txt" href="javascript:void(0)" onClick={handleblock}>{!!userData && userData.is_blocked == 1 ? "unblock" : "block"}</a>
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
                  {!!userData ? <span className="d-inline-block">{userData.first_name}</span> : ""}
                  <span className="d-inline-block">ID:2837289739</span>
                </div>
                <div className="photo-count">
                  <i className="far fa-image mr-1" />
                  <span className="d-inline-block">
                    {!!userData && userData.profile_images.length} Photos
              </span>
                </div>
              </div>
              {/* <div className="owl-carousel owl-theme profile-carousel"> */}
              <Carousel id="images_crousal" className="profile-carousel">
                <Carousel.Item interval={900}>

                  <div className="items">
                    {userData && userData.profile_images.map((item, index) => {
                      return <figure>
                        <img onError={(e) => addDefaultSrc(e)} src={!!item ? item : returnDefaultImage()} alt="Marlene" />
                      </figure>
                    })}
                    <div className="sp-meta-info">
                      <div className="meta-info-data">
                        {
                          !!userData &&
                          <>
                            <h5>{userData.first_name + " " + userData.last_name}, {userData.age}</h5>
                            <span>{userData.distance}{!!userData.occupation ? "," : ""} {userData.occupation}</span>
                          </>
                        }
                        {
                          <>
                            <h4>  </h4>
                            <span>  </span>
                          </>
                        }

                      </div>
                      <span className="liked"><i className="fas fa-heart" /> {!!userData && userData.likes != 0 ? userData.likes : "0"}</span>
                    </div>
                  </div>

                </Carousel.Item>
              </Carousel>
              {/* </div> */}
              {/* <div className="action-tray d-flex flex-wrap justify-content-center align-items-center">
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
          </div> */}
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

                    {!!userData && Object.keys(userData.interest_hobbies).length > 1 ?
                      <>
                        {Object.keys(userData.interest_hobbies).map((key) => (
                          <span> {userData.interest_hobbies[key]} </span>
                        ))}
                      </>
                      : ""}
                  </div>
                </div>
                <div className="bio-basics">
                  <h5 className="mb-3">Basic Profile</h5>
                  <ul>
                    <li>
                      <div className="theme-txt">Height:</div>
                      <div>{!!userData && userData.height != "" ? `${userData.height} cm` : ""}</div>
                    </li>
                    <li>
                      <div className="theme-txt">Weight:</div>
                      <div>{!!userData ? userData.weight : ""}</div>
                    </li>
                    <li>
                      <div className="theme-txt">Relationship status:</div>
                      <div>
                        {!!userData &&
                          <>
                            {userData.relationship_status == '1' ? "Single"
                              : userData.relationship_status == '2' ? "Married"
                                : userData.relationship_status == '2' ? "Unmarried"
                                  : ""}
                          </>}
                      </div>
                    </li>
                    <li>
                      <div className="theme-txt">join date:</div>

                      <div>{!!userData ? moment(userData.joined_date.date).format('MMM DD , YYYY') : ""}</div>

                    </li>
                  </ul>
                </div>
                <div className="bio-stories">
                  <div className="flex-wrapper d-flex align-items-center mb-3">
                    <h5 className="mb-0">Archived Stories</h5>

                    <span className="see-all ml-5">
                      {!!archiveStory && archieveStoryCount > 4 ? <a href="javascript:void(0)" onClick={showAllStatus} className="theme-txt">See All</a> : ""}
                    </span>
                  </div>
                  <div className="archived-stories d-flex flex-wrap stories-grid">
                    {/* <div className="single-stories locked">
                  <i className="fas fa-lock" />
                </div> */}
                    {!!archiveStory &&
                      <>
                        {demoArchieves.slice(0, 4).map((story, i) => {
                          return <div className="single-stories">
                              <figure>
                              {story.status_type==1 ?
                              (story.paid_status==true ?  
                                <>
                              <img src={story.file} alt="Archived Story" />
                              <small className="story__time"><i class="far fa-clock"></i> {moment(story.created_at).format('LT')}</small>
                             </>
                              :
                              <img src="/assets/images/blur.png" alt="seeStory"/> )
                            :
                            (
                              story.paid_status==true ?  
                                <>
                              <video className="video-archieve" autoPlay loop><source src={story.file} type="video/mp4" /></video>
                              <small className="story__time"><i class="far fa-clock"></i> {moment(story.created_at).format('LT')}</small>
                              </>:
                               <img src="/assets/images/blur.png" alt="seeStory"/>)
                            }
                                {/* {(item.file.split(".")[item.file.split(".").length - 1] !== "mp4" && item.file.split(".")[item.file.split(".").length - 1] !== "MP4" && item.file.split(".")[item.file.split(".").length - 1] !== "mov" && item.file.split(".")[item.file.split(".").length - 1] !== "MOV") ? <img src={item.file} alt="Archived Story" /> : <video className="video-archieve" autoPlay loop><source src={item.file} type="video/mp4" /></video>} */}
                                {/* <small className="story__time"><i class="far fa-clock"></i> {moment(item.created_at).format('LT')}</small> */}
                              </figure>
                          </div>
                        })}  </>
                    }

                  </div>
                  {
                    !!warningMessage ?
                      <h6 className="">
                        {warningMessage}
                      </h6>
                      :
                      ""
                  }
                </div>
                <div className="bio-gift">
                  <div className="flex-wrapper d-flex align-items-center mb-3">
                    <h5 className="mb-0">Gifts</h5>
                    <span className="see-all ml-5">
                      <a href="javascript:void(0)" className="theme-txt all-gift-btn" onClick={showAllGift}>Send Gifts</a>

                    </span>
                  </div>

                  <div className="gifts-wrapper d-flex flex-wrap">
                    {GiftData.slice(0, 4).map((item, index) => (
                      <div className="gift-box" onClick={() => getGiftItem(item.id)}>
                        <figure>
                          <img src={item.image} alt={item.name} />
                        </figure>
                        <div className="gift-price mt-2"><span className="star"><i className="fas fa-star" /></span> {item.coins}</div>
                      </div>
                    ))}

                  </div>

                </div>
                <div className="bio-looking">
                  <h5 className="mb-3">Looking For</h5>
                  <div className="looking-for">
                    {!!userData && userData.looking_for.length != "" ?
                      <span className="d-inline-block">
                        {userData.looking_for == '1' ? "Men"
                          : userData.looking_for == '2' ? "Women"
                            : userData.looking_for == '2' ? "Both"
                              : ""}
                      </span>
                      : ""}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal className="status-modal" show={showStatus} onHide={() => setShowStatus(false)} backdrop="static" keyboard={false} aria-labelledby="example-modal-sizes-title-sm">
        <div className="bio-stories">
          <div className="flex-wrapper d-flex align-items-center mb-3">
            <h5 className="mb-0">Archived Stories</h5>

          </div>
          {!!archiveStory &&
            <>
              {archiveStory.map((item, i) => (
                <div class="stories-grid-wrapper mt-3">
                  <h6 className="theme-txt ">{moment(item.status_date).fromNow()}</h6>
                  <div className="archived-stories d-flex flex-wrap stories-grid">
                    {item.status_list.map((story, index) => (
                      <div className="single-stories">
                          <figure>
                          {story.status_type==1 ?
                              (story.paid_status==true ?  
                                <>
                              <img src={story.file} alt="Archived Story" />
                              <small className="story__time"><i class="far fa-clock"></i> {moment(story.created_at).format('LT')}</small>
                             </>
                              :
                              <img src="/assets/images/blur.png" alt="seeStory"/> )
                            :
                            (
                              story.paid_status==true ?  
                                <>
                              <video className="video-archieve" autoPlay loop><source src={story.file} type="video/mp4" /></video>
                              <small className="story__time"><i class="far fa-clock"></i> {moment(story.created_at).format('LT')}</small>
                              </>:
                               <img src="/assets/images/blur.png" alt="seeStory"/>)
                            }
                            {/* {story.status_type==1 &&
                              story.paid_status==true ?  
                                <>
                              <img src={story.file} alt="Archived Story" />
                              <small className="story__time"><i class="far fa-clock"></i> {moment(story.created_at).format('LT')}</small>
                             </>
                              :
                              <img src="/assets/images/blur.png" alt="seeStory"/>
                            }
                            {
                              story.paid_status==true ?  
                                <>
                              <video className="video-archieve" autoPlay loop><source src={story.file} type="video/mp4" /></video>
                              <small className="story__time"><i class="far fa-clock"></i> {moment(story.created_at).format('LT')}</small>
                              </>:
                             <img src="/assets/images/blur.png" alt="seeStory"/>
                            } */}
                            {/* {(story.file.split(".")[story.file.split(".").length - 1] !== "mp4" && story.file.split(".")[story.file.split(".").length - 1] !== "MP4" && story.file.split(".")[story.file.split(".").length - 1] !== "mov" && story.file.split(".")[story.file.split(".").length - 1] !== "MOV") ? <img src={story.file} alt="Archived Story" /> : <video className="video-archieve" autoPlay loop><source src={story.file} type="video/mp4" /></video>}
                            <small className="story__time"><i class="far fa-clock"></i> {moment(story.created_at).format('LT')}</small> */}
                          </figure>
                      
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>}
        </div>
        <a href="javascript:void(0)" className="modal-close" onClick={() => setShowStatus(false)}><img src="/assets/images/btn_close.png" /></a>
      </Modal>

      <Modal className="report-modal" show={smShow} onHide={() => setSmShow(false)} backdrop="static" keyboard={false} aria-labelledby="example-modal-sizes-title-sm">
        <div className="edit-profile-modal__inner">

          <h4 className="theme-txt text-center mb-4 ">Report a problem</h4>

          <form>

            <div className="choose-report d-flex flex-wrap">
              <div className="form-group">
                <input type="radio" name="report" value="it's spam" id="first-option" onChange={handleChange} checked={form.report == "it's spam" ? "checked" : ""} />
                <label for="first-option"></label>
                <span>it's Spam</span>
              </div>
              <div className="form-group">
                <input type="radio" name="report" value="Fake user" id="second-option" onChange={handleChange} checked={form.report == "Fake user" ? "checked" : ""} />
                <label for="second-option"></label>
                <span>Fake User</span>
              </div>

              <div className="form-group">
                <input type="radio" name="report" value="more" id="third-option" onChange={handleChange} checked={form.report == "more" ? "checked" : ""} />
                <label for="third-option"></label>
                <span>Other</span>
              </div>
            </div>
            <a className={!!isLoading ? "btn bg-grd-clr d-block btn-countinue-3 disabled" : "btn bg-grd-clr d-block btn-countinue-3"} id="edit-second-step" href="javascript:void(0)" onClick={handleReport}>{!!isLoading ? "Processing" : "send"}</a>
          </form>
        </div>
        <a href="javascript:void(0)" className="modal-close" onClick={() => setSmShow(false)}><img src="/assets/images/btn_close.png" /></a>
      </Modal>

      <div className={isOn ? 'all-gifts-wrapper active' : 'all-gifts-wrapper '} >
        <div className="all-gift-inner">
          <a href="javascript:void(0)" className="close-gift-btn modal-close" onClick={toggleIsOn}><img src="/assets/images/btn_close.png" /></a>
          <div className="all-gift-header d-flex flex-wrap align-items-center mb-3">
            <h5 className="mb-0 mr-4">Send Gift</h5>
            <div className="remaining-coins">
              <img src="/assets/images/diamond-coin.png" alt="Coins" />
              <span>{!!profileData ? profileData.coins : "0"}</span>
            </div>
          </div>
          <div className="all-gift-body">
            <ul className="d-flex flex-wrap text-center gift__items">
              {GiftData.map((items, i) => {
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