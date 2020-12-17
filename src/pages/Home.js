import React, {Component} from 'react';
import FilterSide from '../components/Filter';
import NavLinks from '../components/Nav';
import Loader from '../components/Loader';

const Home = () =>{
    return(
          <section className="home-wrapper">
          {/* <Loader isLoading={isLoading} /> */}
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
                
                {/* Sidebar filter */}

              <FilterSide/>
                {/* End filter here */}
              </div>
              <div className="col-lg-9 main-bar p-3">
                <div className="tab-top d-flex flex-wrap-wrap">
                  <div className="live-icon">
                    <img src="/assets/images/live.png" alt="Live" />
                  </div>
                 <NavLinks/>
                </div>
                <div className="profile-swipe-wrapper">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )

}

export default Home;
