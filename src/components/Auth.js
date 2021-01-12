import React, { useState, useEffect } from "react";
import axios from "axios";
import { SENDOTP_API, VERIFY_API, SIGNUP_API } from '../components/Api';

import { apiGet, apiPost, setUserData, clearUserData } from "../components/Utils";

const { dispatch } = store;
export function login(data) {
  return new Promise((resolve, reject) => {
    apiPost(LOGIN_API, data)
      .then(res => {
        if (res.status_code == 200) {
          dispatch({
            type: types.LOGIN,
            payload: res.profile,
          });
          setUserData(res.profile);
          resolve(res);
        } else {
          resolve(res);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}
export function signUp(data) {
  return new Promise((resolve, reject) => {
    apiPost(SIGNUP_API, data)
      .then(res => {
        console.log(res)
        if (res.status_code == 200) {
          dispatch({
            type: types.LOGIN,
            payload: res.profile,
          });
          setUserData(res.profile);
          resolve(res);
        } else {
          resolve(res);
        }

      })
      .catch(error => {
        reject(error);
      });
  });
}

export function forgotPassword(data) {
  return new Promise((resolve, reject) => {
    apiPost(FORGOT_PASSWORD, data)
      .then(res => {
        console.log(res)
        console.log('---->>>')
        if (res.status_code == 200) {
          // dispatch({
          //   type: types.FORGOT_PASSWORD,
          //   payload: res.profile,
          // });
          //setUserData(res.profile);
          resolve(res);
        } else {
          resolve(res);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function addLocation(data) {
  return new Promise((resolve, reject) => {
    apiPost(LOCATION_API, data)
      .then(res => {
        if (res.status_code == 200) {
          // dispatch({
          //   type: types.LOGIN,
          //   payload: res.profile,
          // });
          // setUserData(res.profile);
          resolve(res);
        } else {
          resolve(res);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function checkEmail(data) {
  return new Promise((resolve, reject) => {
    apiPost(CHECKEMAIL_API, data)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}
export function newsList(data) {
  return new Promise((resolve, reject) => {
    apiGet(NEWS_LIST, data)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function videoList(data) {
  return new Promise((resolve, reject) => {
    apiGet(VIDEO_LIST, data)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function serviceList(data) {
  return new Promise((resolve, reject) => {
    apiGet(SERVICE_LIST, data)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function workshopList(data) {
  return new Promise((resolve, reject) => {
    apiGet(WORKSHOP_LIST, data)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function logOut(data) {
  return new Promise((resolve, reject) => {
    apiPost(LOG_OUT, data)
      .then(res => {
        console.log(res)
        console.log("===-=-=-=-=-=-=-=lklkll")
        if (res.status_code == 200) {
          dispatch({
            type: types.LOG_OUT,
            payload: res.profile,
          });
          //setUserData(res.profile);
         // logout();
          resolve(res);
        } else {
          resolve(res);
        }

      })
      .catch(error => {
        reject(error);
      });
  });
}

export function changePassword(data) {
  return new Promise((resolve, reject) => {
    apiPost(CHANGE_PASSWORD, data)
      .then(res => {
        console.log(res)
        if (res.status_code == 200) {
          dispatch({
            type: types.LOG_OUT,
            payload: res.profile,
          });
          //setUserData(res.profile);
          //logout();
          resolve(res);
        } else {
          resolve(res);
        }

      })
      .catch(error => {
        reject(error);
      });
  });
}

export function stateList(data) {
  return new Promise((resolve, reject) => {
    apiGet(STATE_LIST, data)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function vendorList(data) {
  return new Promise((resolve, reject) => {
    apiGet(VENDOR_LIST, data)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}


export function locationList(data) {
  return new Promise((resolve, reject) => {
    apiPost(LOCATION_LIST, data)
      .then(res => {
        if (res.status_code == 200) {
          dispatch({
            type: types.LOG_OUT,
            payload: res.profile,
          });
          //setUserData(res.profile);
         // logout();
          resolve(res);
        } else {
          resolve(res);
        }
    
      })
      .catch(error => {
        reject(error);
      });
  });  
}

export function searchApi(data){
  return new Promise((resolve, reject) => {
    apiPost(SEARCH_API, data)
      .then(res => {
        if (res.status_code == 200) {
        //   dispatch({
        //     type: types.LOG_OUT,
        //     payload: res.profile,
        //   });
        //   //setUserData(res.profile);
        //   logout();
           resolve(res);
         } else {
           resolve(res);
         }
    
      })
      .catch(error => {
        reject(error);
      });
  });  
}

// export function signUp(data){
//     return apiPost(SIGNUP_API,data);

// }
export function logout() {
  dispatch({ type: types.CLEAR_REDUX_STATE });
  clearUserData()
}

export function forgotpassword() {
  dispatch({ type: types.FORGET_PASSWORD });
}
