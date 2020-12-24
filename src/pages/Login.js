import { format } from 'date-fns';
import React, { useState, useEffect } from "react";
import DateFnsUtils from '@date-io/date-fns';
import {  useHistory } from 'react-router'
import axios from "axios";
import { Button,  makeStyles, createStyles, Theme, Typography, TextField, Grid, Container, Autocomplete,Select, MenuItem, InputLabel,  NativeSelect, Checkbox, FormControl, Link, Input} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import countries_data from '../components/Countries';
import LoginSidebar from '../components/LoginSidebar'; 

import { SENDOTP_API, VERIFY_API, SIGNUP_API } from '../components/Api';
import $ from 'jquery';


 
// Working on login functional component
const Login = (setUserDetail) => {

  const history = useHistory();
//  const config = {  
//     headers: { Authorization: `Bearer ${token}` }
//   };

   const [phoneNumber, setPhone] = useState('');   //For past users
  const [cntCode, setCntCode] = useState('');   //For past users


// Only numbers allowed
   const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setPhone(value);
  };

console.log(phoneNumber);
  // OTP fields in state
  const [otp_1,setOtp1] = useState('');
  const [otp_2,setOtp2] = useState('');
  const [otp_3,setOtp3] = useState('');
  const [otp_4,setOtp4] = useState('');

  // All form fields
    const [Dob, setDob] = useState(''); 
    const [FirstName, setFirst] = useState(''); 
    const [LastName, setLast] = useState(''); 
    const [genderName, setGender] = useState('');  
    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState(null);
    const [phoneErr, setPhoneErr] = useState({});

    const [auth, setAuth] = useState({loggedIn : false})
    const [hidden, setHidden] = useState(false);

  {/* { divToggle ? "signup-inner" : "signup-inner active-tab-2"} */}

//  Setting value here radio button
   const handleChange = e => { 
        setGender(e.target.value);
    }
 

  const handleFileChange = e => {
    if (e.target.files[0]) {
      // console.log("picture: ", e.target.files);
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

// Managing token here 
const tokencheck = () =>{

 const token = localStorage.getItem('session_id');
        if(token!=null)
        {
            history.push("/");
        }
        else
        {
          localStorage.removeItem('session_id');
        }
}
 useEffect(() => {
    tokencheck();
  });


// Send OTP handle
  const sendHandle = (e) =>{
    e.preventDefault();

  
    const isValid = formValidation();
    if(isValid)
    {
   
    const bodyParameters = {
      phone: phoneNumber,
      country_code: '+'+cntCode
    };

      axios.post(SENDOTP_API,bodyParameters)
  .then((response) => {
    
    // setHidden(false);
    // history.push("/dashboard");
  }, (error) => {
    
    // setHidden(true);
  // localStorage.removeItem('token');
  });

    }
  

   }

   const formValidation = () =>{
     const phoneErr = {};
     let isValid = true;

     if(phoneNumber.length == "")
     {
       phoneErr.phoneShort = "Phone number is Empty";
       isValid = false;
     }

     setPhoneErr(phoneErr);
     return isValid;
   }

 var otp = otp_1+otp_2+otp_3+otp_4;
  // Verify OTP Function 
const verifyHandle = () =>{

   const bodyParameters = {
      phone: phoneNumber,
      country_code: '+'+cntCode,
      otp: otp,
      device_type:0,
      device_token:"",
    };

      axios.post(VERIFY_API,bodyParameters)
  .then((response) => { 

      
    if(response.data.data != null)
    {
       setUserDetail(response);
          let id = response.data.data.session_id;
          setAuth( {loggedIn : true});
          setHidden(true);
         localStorage.setItem('session_id', response.data.data.session_id);
         history.push("/");
    }
    else
    {
    localStorage.clear();
     setAuth( {loggedIn : false});
    setHidden(false);
    }
  
  }, (error) => {
    
     localStorage.clear();
  });
}
  // End verify otp 

  // Register user here
      const config = {
      headers : {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            }
      }


    
  // Verify OTP Function 
const registerHandle = (e) =>{

     const bodyParameters = new FormData();
        bodyParameters.append("first_name", "" + FirstName);
        bodyParameters.append("last_name", LastName);
        bodyParameters.append("dob", "" + Dob);
        bodyParameters.append("gender", "" + genderName);
        bodyParameters.append("device_token", "" + "null");
        bodyParameters.append("device_type", "" + 0);
        bodyParameters.append("country_code", "+"+cntCode);
        bodyParameters.append("phone", "" + phoneNumber);
        bodyParameters.append("latitude", "" + "30.704649");
        bodyParameters.append("longitude", "" + "76.717873");
        bodyParameters.append('profile_photo', picture);

      axios.post(SIGNUP_API,bodyParameters, config)
        .then((response) => { 
        
        // Setting session id in local storage
         
          localStorage.setItem('session_id', response.data.data.session_id);
          history.push({
                    pathname: '/signup-completed',
                    mypicture: imgData // your data array of objects
                  })
        
        }, (error) => {
          localStorage.removeItem('session_id');
        });
}
  // End here 


  useEffect(() => {
  
  // Jquery code here 
 function countryDropdown(seletor) {
    var Selected = $(seletor);
    var Drop = $(seletor + '-drop');
    var DropItem = Drop.find('li');

    Selected.click(function () {
        Selected.toggleClass('open');
        Drop.toggle();
    });

    Drop.find('li').click(function () {
        Selected.removeClass('open');
        Drop.hide();

        var item = $(this);
        Selected.html(item.html());
    });

    DropItem.each(function () {
        var code = $(this).attr('data-code');

        if (code != undefined) {
            var countryCode = code.toLowerCase();
            $(this).find('i').addClass('flagstrap-' + countryCode);
        }
    });
}

countryDropdown('#country');

  }, []);


        return(
            <section className="signup-wrapper">
        <img className="bg-mask" src="/assets/images/mask-bg.png" alt="Mask" />
        <div className="signup-page">
          <header>
            <div className="container">
              <div className="row">
                <div className="col">
                  <nav className="navbar text-center">
                    <a className="navbar-brand mx-auto" href="javascript:void(0)">
                      <img src="/assets/images/glitters.png" alt="Glitters.png" />
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </header>
          <div className="container">
            <div className="row justify-content-center align-items-center">
              <div className="col-md-4 mx-auto">
               <LoginSidebar/>
              </div>
              <div className="col-md-4 mx-auto">
                <form action="#" method="post" id="login_form" enctype="multipart/form-data" >
                  <div className="signup-wrapper__form">
                    <div className="signup-form text-center">
                      {/* First Tab */}
                      <div className="signup-inner" id="login-tab-1">
                        <div className="signup-header">
                        <h4>Glad to see you!</h4>
                         <p>Hello there, sign in to continue!</p>
                        </div>
                        <div className="form-group">
                          <div className="country text-left">
                           <div id="country" className="select" ><img src="https://flagcdn.com/16x12/af.png" />+93</div>
                            <div id="country-drop" className="dropdown">
                              <ul>
                                 {countries_data.map((country, index) => (
                                       <li onClick={e => setCntCode(e.target.getAttribute("data-cid"))} data-code={country.code.toLowerCase()} data-name={country.label} data-cid={country.phone}><img src= {"https://flagcdn.com/16x12/"+country.code.toLowerCase()+".png"} />+{country.phone}</li>
                                    ))}
                              </ul>
                            </div>
                          </div>
                             <input className="form-control" name="phone_number" id="phone_number" type="text" placeholder="Enter Phone Number" value={phoneNumber} onChange={handlePhoneChange} />
                      { Object.keys(phoneErr).map((key) => {
                          return <div style={{color : "red"}}>{phoneErr[key]}</div>
                        }) }
                        </div>
                       <p>You'll receive a verification code</p>
                        <a className="btn bg-grd-clr d-block mb-4 btn-countinue-1" href="javascript:void(0)" onClick={sendHandle} >Continue</a>
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
                           <span> to our Terms and Data Policy.</span>
                        </div>
                      </div>
                      {/* Second Tab */}
                      <div className="signup-inner" id="login-tab-2">
                          <div className="cont_screen">
                              <div className="signup-header">
                                <a href="javascript:void(0)" className="login-back-1 btn-back"><i className="fas fa-chevron-left" /></a>
                             <h4>Enter Code</h4>
                               <p>Enter 4 digit verification code you<br /> received on +1 7462 462 321</p>
                              </div>
                              <div className="form-group otp-field">
                                <input className="form-control" name="otp_1" value={otp_1} onChange={e => setOtp1(e.target.value)} type="text"  />
                                <input className="form-control" name="otp_2" value={otp_2}   onChange={e => setOtp2(e.target.value)} type="text"  />
                                <input className="form-control" name="otp_3" value={otp_3}  onChange={e => setOtp3(e.target.value)} type="text"  />
                                <input className="form-control" name="otp_4" value={otp_4}  onChange={e => setOtp4(e.target.value)} type="text"  />
                              </div>
                              
                              <a className="btn bg-grd-clr d-block mb-2 btn-countinue-2" href="javascript:void(0)" onClick={verifyHandle}>Verify</a>
                              <a className="btn btn-trsp d-block" href="javascript:void(0)">Resend</a>
                        </div>
                        
                   
                     </div>
                    
                      {/* Third Tab */}
                      <div className="signup-inner" id="login-tab-3" >
                      

                      <div className="another_test">
                            <div className="signup-header mb-5">
                              <a href="javascript:void(0)" className="login-back-2 btn-back"><i className="fas fa-chevron-left" /></a>
                            <h4>Your Information</h4>
                            </div>
                            <div className="form-group">
                             <input className="form-control bg-trsp" name="date-birth" value={Dob} onChange={e => setDob(e.target.value)} type="text" placeholder="Your Date of birth" /> 
                            </div>
                            <div className="form-group">
                              <input className="form-control bg-trsp" name="first-name" value={FirstName} onChange={e => setFirst(e.target.value)} id="first_name" type="text" placeholder="First Name" />
                            </div>
                            <div className="form-group">
                              <input className="form-control bg-trsp" name="last-name" value={LastName} onChange={e => setLast(e.target.value)} type="text" placeholder="Last Name" />
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
                        <a className="btn bg-grd-clr d-block mb-4 btn-countinue-3" href="javascript:void(0)">Next</a>
                      </div>
                    


                      </div>
                      {/* Fourth Tab */}
                      <div className="signup-inner" id="login-tab-4">
                        <div className="signup-header">
                          <a href="javascript:void(0)" className="login-back-3 btn-back"><i className="fas fa-chevron-left" /></a>
                        <h4>Gender Identity</h4>
                        </div>
                        <a className="btn bg-grd-clr d-block mb-4 btn-countinue-4" href="javascript:void(0)">Prefer Not to say</a>
                        <a className="btn btn-trsp d-block" href="javascript:void(0)">Non-Binary</a>
                      </div>
                      {/* Fifth Tab */}
                      <div className="signup-inner" id="login-tab-5">
                        <div className="signup-header">
                          <a href="javascript:void(0)" className="login-back-4 btn-back"><i className="fas fa-chevron-left" /></a>
                        <h4>Upload Profile Photo</h4>
                        </div>
                        <div className="form-group upload-field mb-5">
                          <label htmlFor="profile-photo" id="PreviewPicture" style={{ backgroundImage: `url("${imgData}")` }}   />
                          <input type="file" id="profile-photo" name="profile-photo" id="profile-photo" onChange={handleFileChange} accept="image/*" />
                          <span className="camera-icon">
                            <img src="/assets/images/Icon%20feather-camera.png" alt="Camera" />
                          </span>
                        </div>
                        <a className="btn bg-grd-clr d-block mb-4 btn-countinue-5" href="javascript:void(0)" onClick={registerHandle} >Next</a>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
        )
    
}

export default Login;