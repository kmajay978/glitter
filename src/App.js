
import './App.css';
import React, { useState , useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route, useParams } from 'react-router-dom';
// Importing all pages from index.js 
import {Home,Login,ChatBox,SearchHome,AnswerCalling,SignupCompleted,Profile,SingleProfile,RecentCall,VideoChat,SearchProfile,Dummy} from './pages'

import  ProtectedRoute  from "./protected.route";
import axios from "axios";
import {GET_LOGGEDPROFILE_API} from "./components/Api";
import {login} from "./features/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {profile, userAuth} from './features/userSlice';
import moment from "moment";

let is_auth = false;

const  ProfileData = async(dispatch, sessionId) => {
  const bodyParameters = {
    session_id: sessionId,
  };
  const {data: {data}} = await axios.post(GET_LOGGEDPROFILE_API, bodyParameters);
  dispatch(
      profile({
        profile: data
      })
  );
}

function App() {
  //  const {latitude, longitude, error} = usePosition();
  const dispatch = useDispatch();
    const is_auth = useSelector(userAuth); //using redux useSelector here
    // console.log(is_auth, "is_auth....")

  useEffect(() => {

    const sessionId = localStorage.getItem("session_id");
    if ((window.location.pathname !== "/profile") && !!sessionId) {
      ProfileData(dispatch, sessionId)
    }
  }, [])

   useEffect(() => {
     if (is_auth) { 
       // logic to handle 10 min location time interval....
      //  window.setInterval(() => {
         
      //  }, 600000);
     }
  }, [is_auth])

  return (
    <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path='/signup-completed' component={SignupCompleted} />
       
       
          {/* Private routes */}
          <Route exact path='/' component={Home} />
          <Route exact path='/profile' component={Profile} />
          <Route exact path="/answer-calling" component={AnswerCalling} />
          <Route exact path='/chat' component={ChatBox} />
          <Route exact path='/searching-profile' component={SearchProfile} />
          <Route exact path='/search-home' component={SearchHome} />
          <Route exact path='/single-profile' component={SingleProfile} />
          <Route exact path='/recent-call' component={RecentCall} />
          <Route exact path='/dummy' component={Dummy} />
           <Route exact path='/:receiver/:user_from_id/:user_to_id/:channel_id/:channel_name/video-chat' component={VideoChat} />
           
           
        </Switch>

    </Router>
  );
} 

export default App;
