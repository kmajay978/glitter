
import React, { useState, useEffect ,useMemo } from "react";
import {  useHistory } from 'react-router';
import axios from "axios";
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'react-bootstrap/Image'
import { CardHeader , card} from "@material-ui/core";
import {Card, CardImg, CardText, CardBody,CardTitle} from 'reactstrap';
import { GETALLUSER_API } from '../components/Api';
import GlitterCard from 'react-tinder-card'

const Dummy = () =>{

  const [allData , setAllData] = useState([]);
  const history = useHistory();
  const handleId = (userId) =>{
      history.push({
                    pathname: '/single-profile',
                    userId: userId // Your userId
                  })
  }

   const handleUserData = async() => {
   const bodyParameters ={
   session_id : localStorage.getItem("session_id")
   };
   const{data :{data}} =await axios.post(GETALLUSER_API ,bodyParameters)
   setAllData(data);
  
   }
   

useEffect(()=> {
    handleUserData();
     },[])

 
  return(
     
    <section className="home-wrapper">
  <img className="bg-mask" src="/assets/images/mask-bg.png" alt="Mask" />
  <div className="home-inner">
    <div className="container-fluid p-0">
      <div className="row no-gutters">
        <div className="col-lg-3 option-bar p-3 vh-100">
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
          <div className="filter-tab">
            <h4 className="mb-4">Filter</h4>
            <form action="#" method="post">
              <div className="show-gender ft-block d-flex flex-wrap">
                <div className="tab-title">
                  <h5>Show Me</h5>
                </div>
                <div className="form-group">
                  <input type="checkbox" defaultChecked name="man" id="man" />
                  <label htmlFor="man">Man</label>
                </div>
                <div className="form-group">
                  <input type="checkbox" name="woman" id="woman" />
                  <label htmlFor="woman">Woman</label>
                </div>
                <div className="form-group">
                  <input type="checkbox" defaultChecked name="both" id="both" />
                  <label htmlFor="both">Both</label>
                </div>
              </div>
              <div className="age-group ft-block">
                <div className="tab-title">
                  <h5>Age</h5>
                </div>
                <input type="text" className="two-range" id="age" readOnly />
                <div id="age-range" />
              </div>
              <div className="distance-group ft-block">
                <div className="tab-title">
                  <h5>Distance</h5>
                </div>
                <div className="range-slider">
                  <output className="range-output">
                    <span className="text-bold output" />
                    <span className="text-bold">miles</span>
                  </output>
                  <input type="range" min={1} max={20} step={1} defaultValue={10} />
                </div>
              </div>
              <div className="height-group ft-block">
                <div className="tab-title">
                  <h5>Height</h5>
                  {/*                                    <span class="point-calcu">1.60-1.78m</span>*/}
                </div>
                <input type="text" className="two-range" id="height" readOnly />
                <div id="height-range" />
              </div>
              <div className="weight-group ft-block">
                <div className="tab-title">
                  <h5>Weight</h5>
                  {/*                                    <span class="point-calcu">50-65kg</span>*/}
                </div>
                <input type="text" className="two-range" id="weight" readOnly />
                <div id="weight-range" />
              </div>
              <div className="btns-group d-flex justify-content-between flex-wrap my-5">
                <button className="btn bg-grd-clr" type="submit">Done</button>
                <button className="btn bg-grd-clr" type="reset">Reset</button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-lg-9 main-bar p-3">
          <div className="tab-top d-flex flex-wrap-wrap">
            <div className="live-icon">
              <img src="/assets/images/live.png" alt="Live" />
            </div>
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
          <div className="profile-swipe-wrapper">
            <div className="stage">
          

                 {allData.map((currentUser, index) =>
                 <a href="javascript:void(0)"onClick={() => handleId(currentUser.user_id)}>
                  <div className="card">
                    <div className="card-content">
                      <div className="card-image"><img src={currentUser.profile_images} alt="Emma" width="100%" height="100%"  /></div>
                      <div className="card-titles">
                        <h3>Emma, 22</h3>
                        <span>72km, Lawyer</span>
                      </div>
                    </div>
                  </div>
                  </a>
                 )}
                  </div>
                
                <div className="stackedcards--animatable stackedcards-overlay top"><img src="https://image.ibb.co/m1ykYS/rank_army_star_2_3x.png" width="auto" height="auto" /></div>
                <div className="stackedcards--animatable stackedcards-overlay right"><img src="/assets/images/accept-icon.png" width="auto" height="auto" /></div>
                <div className="stackedcards--animatable stackedcards-overlay left"><img src="https://image.ibb.co/heTxf7/20_status_close_3x.png" width="auto" height="auto" /></div>
              </div>
              <div className="action-tray global-actions d-flex flex-wrap justify-content-center align-items-center">
                <div className="close-btn tray-btn-s">
                  <a className="left-action" href="javascript:void(0)">×</a>
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
                  <a className="right-action" href="javascript:void(0)">
                    <i className="fas fa-heart" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
   
</section>


    )

}

export default Dummy;
