
import React, { useState, useEffect } from "react";
import {  useHistory } from 'react-router';
import axios from "axios";

const SearchHome = () =>{
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
        <div className="col-lg-9 main-bar p-3" style={{marginLeft: '25%'}}>
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



