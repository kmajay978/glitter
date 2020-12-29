
import React, { useState, useEffect } from "react";
import {  useHistory } from 'react-router';
import axios from "axios";
import NavLinks from '../components/Nav';
import FilterSide from '../components/Filter';

const SearchHome = () =>{
  const [fetchedProfile, setFilterUser] = useState('')
 
  console.log(fetchedProfile);
    return(
  <section className="home-wrapper">
  <img className="bg-mask" src="/assets/images/mask-bg.png" alt="Mask" />
  <div className="home-inner">
    <div className="container-fluid p-0">
      <div className="row no-gutters">
        <div className="col-lg-3 option-bar p-3 vh-100 position-fixed">
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
         <FilterSide setFilterUser={setFilterUser}/>
        </div>
        <div className="col-lg-9 main-bar p-3" style={{marginLeft: '25%'}}>
          <div className="tab-top d-flex flex-wrap-wrap">
            <div className="live-icon">
              <img src="/assets/images/live.png" alt="Live" />
            </div>
            <NavLinks />
          </div>
          <div className="search-section-wrapper mt-4 px-4">
            <div className="users-listing">
              <div className="owl-carousel owl-theme users-listing__slider">
                <div className="users-listing__slider__items">
                  <div className="users-listing__slider__items__image users-listing__slider__items-grey">
                    <img src="/assets/images/marlene_user.jpg" alt="marlene" />
                  </div>
                </div>
                <div className="users-listing__slider__items">
                  <div className="users-listing__slider__items__image">
                    <img src="/assets/images/marlene_user.jpg" alt="marlene" />
                  </div>
                  <span className="live">Live</span>
                </div>
                <div className="users-listing__slider__items">
                  <div className="users-listing__slider__items__image">
                    <img src="/assets/images/marlene_user.jpg" alt="marlene" />
                    <span className="circle-shape" />
                  </div>
                </div>
                <div className="users-listing__slider__items">
                  <div className="users-listing__slider__items__image">
                    <img src="/assets/images/marlene_user.jpg" alt="marlene" />
                  </div>
                  <span className="circle-shape" />
                </div>
                <div className="users-listing__slider__items">
                  <div className="users-listing__slider__items__image">
                    <img src="/assets/images/marlene_user.jpg" alt="marlene" />
                  </div>
                  <span className="circle-shape" />
                </div>
                <div className="users-listing__slider__items">
                  <div className="users-listing__slider__items__image">
                    <img src="/assets/images/marlene_user.jpg" alt="marlene" />
                  </div>
                  <span className="circle-shape" />
                </div>
                <div className="users-listing__slider__items">
                  <div className="users-listing__slider__items__image">
                    <img src="/assets/images/marlene_user.jpg" alt="marlene" />
                  </div>
                  <span className="circle-shape" />
                </div>
                <div className="users-listing__slider__items">
                  <div className="users-listing__slider__items__image">
                    <img src="/assets/images/marlene_user.jpg" alt="marlene" />
                  </div>
                  <span className="circle-shape" />
                </div>
                <div className="users-listing__slider__items">
                  <div className="users-listing__slider__items__image">
                    <img src="/assets/images/marlene_user.jpg" alt="marlene" />
                  </div>
                  <span className="circle-shape" />
                </div>
                <div className="users-listing__slider__items">
                  <div className="users-listing__slider__items__image">
                    <img src="/assets/images/marlene_user.jpg" alt="marlene" />
                  </div>
                </div>
                <div className="users-listing__slider__items">
                  <div className="users-listing__slider__items__image">
                    <img src="/assets/images/marlene_user.jpg" alt="marlene" />
                  </div>
                  <span className="circle-shape" />
                </div>
                <div className="users-listing__slider__items">
                  <div className="users-listing__slider__items__image">
                    <img src="/assets/images/marlene_user.jpg" alt="marlene" />
                  </div>
                  <span className="circle-shape" />
                </div>
                <div className="users-listing__slider__items">
                  <div className="users-listing__slider__items__image">
                    <img src="/assets/images/marlene_user.jpg" alt="marlene" />
                  </div>
                  <span className="live">Live</span>
                </div>
                <div className="users-listing__slider__items">
                  <div className="users-listing__slider__items__image">
                    <img src="/assets/images/marlene_user.jpg" alt="marlene" />
                  </div>
                  <span className="circle-shape" />
                </div>
                <div className="users-listing__slider__items">
                  <div className="users-listing__slider__items__image">
                    <img src="/assets/images/marlene_user.jpg" alt="marlene" />
                  </div>
                  <span className="live">Live</span>
                </div>
                <div className="users-listing__slider__items">
                  <div className="users-listing__slider__items__image">
                    <img src="/assets/images/marlene_user.jpg" alt="marlene" />
                  </div>
                  <span className="circle-shape" />
                </div>
                <div className="users-listing__slider__items">
                  <div className="users-listing__slider__items__image">
                    <img src="/assets/images/marlene_user.jpg" alt="marlene" />
                  </div>
                  <span className="live">Live</span>
                </div>
                <div className="users-listing__slider__items">
                  <div className="users-listing__slider__items__image">
                    <img src="/assets/images/marlene_user.jpg" alt="marlene" />
                  </div>
                  <span className="circle-shape" />
                </div>
                <div className="users-listing__slider__items">
                  <div className="users-listing__slider__items__image">
                    <img src="/assets/images/marlene_user.jpg" alt="marlene" />
                  </div>
                  <span className="circle-shape" />
                </div>
                <div className="users-listing__slider__items">
                  <div className="users-listing__slider__items__image">
                    <img src="/assets/images/marlene_user.jpg" alt="marlene" />
                  </div>
                  <span className="circle-shape" />
                </div>
                <div className="users-listing__slider__items">
                  <div className="users-listing__slider__items__image">
                    <img src="/assets/images/marlene_user.jpg" alt="marlene" />
                  </div>
                  <span className="circle-shape" />
                </div>
              </div>
            </div>
            <div className="search-people-row">
              <div className="row">
                <div className="col-md-3">
                  <div className="sp-singular">
                    <a href="javascript:void(0)">
                      <figure>
                        <img src="/assets/images/marlene.png" alt="Marlene" />
                      </figure>
                      <div className="sp-singular-content">
                        <div className="status online">Online</div>
                        <h4>Marlene, <span className="age">21</span></h4>
                        <div className="info">55km, Art. Director</div>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="sp-singular">
                    <a href="javascript:void(0)">
                      <figure>
                        <img src="/assets/images/eva.png" alt="Eva" />
                      </figure>
                      <div className="sp-singular-content">
                        <div className="status online">Online</div>
                        <h4>Eva, <span className="age">21</span></h4>
                        <div className="info">75km, Musician</div>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="sp-singular">
                    <a href="javascript:void(0)">
                      <figure>
                        <img src="/assets/images/marlene-2.png" alt="Marlene" />
                      </figure>
                      <div className="sp-singular-content">
                        <div className="status online">Online</div>
                        <h4>Marlene, <span className="age">21</span></h4>
                        <div className="info">55km, Art. Director</div>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="sp-singular">
                    <a href="javascript:void(0)">
                      <figure>
                        <img src="/assets/images/marlene.png" alt="Marlene" />
                      </figure>
                      <div className="sp-singular-content">
                        <div className="status online">Online</div>
                        <h4>Marlene, <span className="age">21</span></h4>
                        <div className="info">55km, Art. Director</div>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="sp-singular">
                    <a href="javascript:void(0)">
                      <figure>
                        <img src="/assets/images/eva.png" alt="Eva" />
                      </figure>
                      <div className="sp-singular-content">
                        <div className="status online">Online</div>
                        <h4>Marlene, <span className="age">21</span></h4>
                        <div className="info">55km, Art. Director</div>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="sp-singular">
                    <a href="javascript:void(0)">
                      <figure>
                        <img src="/assets/images/jessica.png" alt="Jessica" />
                      </figure>
                      <div className="sp-singular-content">
                        <div className="status online">Online</div>
                        <h4>Jessica, <span className="age">25</span></h4>
                        <div className="info">12km, Student</div>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="sp-singular">
                    <a href="javascript:void(0)">
                      <figure>
                        <img src="/assets/images/adrianne.png" alt="Adrianne" />
                      </figure>
                      <div className="sp-singular-content">
                        <div className="status online">Online</div>
                        <h4>Adrianne, <span className="age">21</span></h4>
                        <div className="info">47km, Fashion Model</div>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="sp-singular">
                    <a href="javascript:void(0)">
                      <figure>
                        <img src="/assets/images/mia.png" alt="Mia" />
                      </figure>
                      <div className="sp-singular-content">
                        <div className="status online">Online</div>
                        <h4>Mia, <span className="age">26</span></h4>
                        <div className="info">12km, Lawyer Student</div>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="sp-singular">
                    <a href="javascript:void(0)">
                      <figure>
                        <img src="/assets/images/jessica.png" alt="Jessica" />
                      </figure>
                      <div className="sp-singular-content">
                        <div className="status online">Online</div>
                        <h4>Jessica, <span className="age">25</span></h4>
                        <div className="info">12km, Student</div>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="sp-singular">
                    <a href="javascript:void(0)">
                      <figure>
                        <img src="/assets/images/adrianne.png" alt="Adrianne" />
                      </figure>
                      <div className="sp-singular-content">
                        <div className="status online">Online</div>
                        <h4>Adrianne, <span className="age">21</span></h4>
                        <div className="info">47km, Fashion Model</div>
                      </div>
                    </a>
                  </div>
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
export default SearchHome;



