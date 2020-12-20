
import React, { useState, useEffect } from "react";
import {  useHistory } from 'react-router';
import axios from "axios";
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import { FILTER_LIST_API } from './Api';

const FilterUser = ({selectedMode}) =>{
 // console.log("=====>"+{selectedMode})
  const jki = Object.values(selectedMode);
  console.log(jki);

  return(
                  <div className="stage">
                    <div id="stacked-cards-block" className="stackedcards stackedcards--animatable init">
                      <div className="stackedcards-container">
                        <div className="card">
                          <div className="card-content">
                            <div className="card-image"><img src="/assets/images/profile-card.png" alt="Emma" width="100%" height="100%" /></div>
                            <div className="card-titles">
                              <h3>Emma, 22</h3>
                              <span>72km, Lawyer</span>
                            </div>
                          </div>
                        </div>
                        <div className="card">
                          <div className="card-content">
                            <div className="card-image"><img src="/assets/images/profile-card.png" alt="Emma" width="100%" height="100%" /></div>
                            <div className="card-titles">
                              <h3>Emma, 22</h3>
                              <span>72km, Lawyer</span>
                            </div>  
                          </div>
                        </div>
                        <div className="card">
                          <div className="card-content">
                            <div className="card-image"><img src="/assets/images/profile-card.png" alt="Emma" width="100%" height="100%" /></div>
                            <div className="card-titles">
                              <h3>Emma, 22</h3>
                              <span>72km, Lawyer</span>
                            </div> 
                          </div>
                        </div>
                        <div className="card">
                          <div className="card-content">
                            <div className="card-image"><img src="/assets/images/profile-card.png" alt="Emma" width="100%" height="100%" /></div>
                            <div className="card-titles">
                              <h3>Emma, 22</h3>
                              <span>72km, Lawyer</span>
                            </div> 
                          </div>
                        </div>
                        <div className="card">
                          <div className="card-content">
                            <div className="card-image"><img src="/assets/images/profile-card.png" alt="Emma" width="100%" height="100%" /></div>
                            <div className="card-titles">
                              <h3>Emma, 22</h3>
                              <span>72km, Lawyer</span>
                            </div> 
                          </div>
                        </div>
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
     
    )
}
export default FilterUser;



