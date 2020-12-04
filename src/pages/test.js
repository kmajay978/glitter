import React, { useState, useEffect } from "react";
import {  useHistory } from 'react-router';
import axios from "axios";
import { Button,  makeStyles, createStyles, Theme, Typography, TextField, Grid, Container, Autocomplete,Select, MenuItem, InputLabel,  NativeSelect  } from '@material-ui/core';

import countries_data from '../components/Countries';

class Login extends React.Component{


    propTypes : {
        onSelect: React.PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            tag: null,
        };
        this.onSelect = this.onSelect.bind(this);
    }

    onSelect(val) {
      console.log("values selected are:", val);
      //you can handle options selected here.
    }
    render(){
        return(
        
           <Grid item xs={12}>
                 <section className="signup-wrapper">
        <img className="bg-mask" src="/assets/images/mask-bg.png" alt="Mask" />
        <div className="signup-page">
          <header>
            
              <Container>
              <div className="row">
                <div className="col">
                  <nav className="navbar text-center">
                    <a className="navbar-brand mx-auto" href="javascript:void(0)">
                      <img src="/assets/images/glitters.png" alt="Glitters.png" />
                    </a>
                  </nav>
                </div>
              </div>
             </Container>
          </header>
          
          <div className="container">
            <div className="row justify-content-center align-items-center">
              <div className="col-md-4 mx-auto">
                <div className="signup-wrapper__slider">
                  <div className="owl-carousel owl-theme login-carousel">
                    <div className="item text-center">
                      <figure>
                        <img src="/assets/images/dating-app-login.png" alt="Dating App" />
                      </figure>
                      <div className="signup-slider__content">
                        <h4 className="theme-txt">Dating App</h4>
                        <p>Mutual sympathy. Do not waste time and write to her</p>
                      </div>
                    </div>
                    <div className="item text-center">
                      <figure>
                        <img src="/assets/images/find-friend-login.png" alt="Find Best Friend" />
                      </figure>
                      <div className="signup-slider__content">
                        <h4 className="theme-txt">Find Best Friend</h4>
                        <p>Mutual sympathy. Do not waste time and write to her</p>
                      </div>
                    </div>
                    <div className="item text-center">
                      <figure>
                        <img src="/assets/images/live-login.png" alt="Live and Get Fan" />
                      </figure>
                      <div className="signup-slider__content">
                        <h4 className="theme-txt">Find Best Friend</h4>
                        <p>Mutual sympathy. Do not waste time and write to her</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
           
              <div className="col-md-4 mx-auto">
                <form action="#" method="post">
                  <div className="signup-wrapper__form">
                    <div className="signup-form text-center">
                      {/* First Tab */}
                      <div className="signup-inner" id="login-tab-1">
                        <div className="signup-header">
                        <Typography variant="h4" component="h4" className="theme-txt"> Glad to see you!</Typography>
                        <Typography variant="p" component="p" >Hello there, sign in to continue!</Typography>
                          {/* <h4 className="theme-txt">Glad to see you!</h4> */}
                          {/* <p>Hello there, sign in to continue!</p> */}
                        </div>
                        <div className="form-group">
                          <div className="country text-left">
                          
                           {/* <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value="test"
                              onChange=""
                            >
                                <MenuItem value="None" >Select Country</MenuItem>
                              {countries_data.map(function(d, key){
                                    return (<MenuItem value={d.code} >{d.label}</MenuItem>)
                                        // console.log(d.code)
                                  })}
                              
                              
                            </Select> */}

               


                          </div>
                          <TextField id="outlined-basic" className="form-control" name="phone-number" label="Enter Phone Number"  value="{this.state.captcha}" onChange="{this.handleChange}"  />
                          {/* <input className="form-control" name="phone-number" type="text" placeholder="Enter Phone Number" /> */}
                        </div>
                        <Typography variant="p" component="p" >You'll receive a verification code</Typography>
                        <a className="btn bg-grd-clr d-block mb-4 btn-countinue-1" href="javascript:void(0)">Continue</a>
                        <p>Continue with</p>
                        <ul className="social-login">
                          <li>
                            <a className="bg-grd-clr" href="javascript:void(0)"><i className="fab fa-facebook-f" /></a>
                          </li>
                          <li>
                            <a className="bg-grd-clr" href="javascript:void(0)"><i className="fab fa-google" /></a>
                          </li>
                          <li>
                            <a className="bg-grd-clr" href="javascript:void(0)"><i className="fab fa-twitter" /></a>
                          </li>                                        
                        </ul>
                        <div className="accept-field d-flex justify-content-center align-items-center mt-4">
                          <input type="checkbox" name="agree" id="accept-field" />
                          <label htmlFor="accept-field" />
                          <span>Agree to our Terms and Data Policy.</span>
                        </div>
                      </div>
                      
                      {/* Second Tab */}
                      <div className="signup-inner" id="login-tab-2">
                        <div className="signup-header">
                          <a href="javascript:void(0)" className="login-back-1 btn-back"><i className="fas fa-chevron-left" /></a>
                          <h4 className="theme-txt">Enter Code</h4>
                          <p>Enter 4 digit verification code you<br /> received on +1 7462 462 321</p>
                        </div>
                        <div className="form-group otp-field">
                          <input className="form-control" name type="text" placeholder={1} />
                          <input className="form-control" name type="text" placeholder={2} />
                          <input className="form-control" name type="text" placeholder={6} />
                          <input className="form-control" name type="text" placeholder={8} />
                        </div>
                        <a className="btn bg-grd-clr d-block mb-2 btn-countinue-2" href="javascript:void(0)">Verify</a>
                        <a className="btn btn-trsp d-block" href="javascript:void(0)">Resend</a>
                      </div>
                      {/* Third Tab */}
                      <div className="signup-inner" id="login-tab-3">
                        <div className="signup-header mb-5">
                          <a href="javascript:void(0)" className="login-back-2 btn-back"><i className="fas fa-chevron-left" /></a>
                          <h4 className="theme-txt">Your Information</h4>
                        </div>
                        <div className="form-group">
                          <input className="form-control bg-trsp" name="date-birth" type="text" placeholder="Your Date of birth" />
                        </div>
                        <div className="form-group">
                          <input className="form-control bg-trsp" name="first-name" type="text" placeholder="First Name" />
                        </div>
                        <div className="form-group">
                          <input className="form-control bg-trsp" name="last-name" type="text" placeholder="Last Name" />
                        </div>
                        <div className="choose-gender d-flex my-4">
                          <div className="form-group">
                            <input type="radio" id="female" name="gender" placeholder="Female" />
                            <label htmlFor="female">Female</label>
                          </div>
                          <div className="form-group">
                            <input type="radio" id="male" name="gender" placeholder="Male" />
                            <label htmlFor="male">Male</label>
                          </div>
                          <div className="form-group">
                            <input type="radio" id="more" name="gender" />
                            <label htmlFor="more">More</label>
                          </div>
                        </div>
                        <a className="btn bg-grd-clr d-block mb-4 btn-countinue-3" href="javascript:void(0)">Next</a>
                      </div>
                      {/* Fourth Tab */}
                      <div className="signup-inner" id="login-tab-4">
                        <div className="signup-header">
                          <a href="javascript:void(0)" className="login-back-3 btn-back"><i className="fas fa-chevron-left" /></a>
                          <h4 className="theme-txt">Gender Identity</h4>
                        </div>
                        <a className="btn bg-grd-clr d-block mb-4 btn-countinue-4" href="javascript:void(0)">Prefer Not to say</a>
                        <a className="btn btn-trsp d-block" href="javascript:void(0)">Non-Binary</a>
                      </div>
                      {/* Fifth Tab */}
                      <div className="signup-inner" id="login-tab-5">
                        <div className="signup-header">
                          <a href="javascript:void(0)" className="login-back-4 btn-back"><i className="fas fa-chevron-left" /></a>
                          <h4 className="theme-txt">Upload Profile Photo</h4>
                        </div>
                        <div className="form-group upload-field mb-5">
                          <label htmlFor="profile-photo" />
                          <input type="file" id="profile-photo" name="profile-photo" accept="image/*" />
                          <span className="camera-icon">
                            <img src="/assets/images/Icon%20feather-camera.png" alt="Camera" />
                          </span>
                        </div>
                        <a className="btn bg-grd-clr d-block mb-4 btn-countinue-5" href="signup-completed.html">Next</a>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>       
        </div>
      </section>
       </Grid>
        )
    }
}

export default Login;