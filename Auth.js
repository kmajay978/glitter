import React, { useState, useEffect } from "react";
import axios from "axios";
import { SENDOTP_API, VERIFY_API, SIGNUP_API } from './Api';

export function SendOtp(bodyParameters, callback, errorcallback){
    axios.post(SENDOTP_API, bodyParameters)
    .then(res => {
      //do something
      if(callback != null){
         callback(res);
      }
    })
    .catch(err => {
      // catch error
      if(errorcallback != null){
         errorcallback(err);
      }
    })
}