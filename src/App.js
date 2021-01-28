import './App.css';
import React, { useState , useEffect } from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {BrowserRouter as Router, Switch, Route, withRouter, useParams } from 'react-router-dom';
// Importing all pages from index.js 
import {Home,Login,ChatBox,SearchHome,AnswerCalling,SignupCompleted,Profile,SingleProfile,RecentCall,VideoChat,SearchProfile,Dummy} from './pages'
import  ProtectedRoute  from "./protected.route";
import axios from "axios";
import createBrowserHistory from 'history/createBrowserHistory';
import {GET_LOGGEDPROFILE_API} from "./components/Api";
import {login, userProfile} from "./features/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {profile, userAuth} from './features/userSlice';
import {SOCKET} from "./components/Config";
let is_auth = false, userData;

const history = createBrowserHistory({forceRefresh: true});
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

const stripePromise = loadStripe('pk_test_51HYm96CCuLYI2aV0fK3RrIAT8wXVzKScEtomL2gzY9XCMrgBa4KMPmhWmsCorW2cqL2MLSJ45GKAAZW7WxEmytDs009WzuDby2');
function App() {
  //  const {latitude, longitude, error} = usePosition();
  const dispatch = useDispatch();
  const is_auth = useSelector(userAuth); //using redux useSelector here
  // console.log(is_auth, "is_auth....")
  userData = useSelector(userProfile).user.profile; //using redux useSelector here
  useEffect(() => {
    SOCKET.connect();
    const sessionId = localStorage.getItem("session_id");
    if ((window.location.pathname !== "/profile") && !!sessionId) {
      ProfileData(dispatch, sessionId)
    }
    SOCKET.on('pick_video_call', (data) => {
      if (!!userData && (data.user_to_id == userData.user_id)) { // check one-to-one data sync
        console.log(data.receiver_details, "hhhh")
        localStorage.setItem("receiverDetails", JSON.stringify({...data.receiver_details, ...{link: data.link}}))
        history.push("/answer-calling")
      }
    })
  }, [])
  useEffect(() => {
    if (is_auth) {
      // logic to handle 10 min location time interval....
      //  window.setInterval(() => {
      //  }, 600000);
    }
  }, [is_auth])
  return (
    <Elements stripe={stripePromise}>
      <Router>
        <Switch>
        
          <Route exact path="/login" component={Login} />
          <Route exact path='/signup-completed' component={SignupCompleted} />
          {/* Private routes */}
          <ProtectedRoute exact path='/' component={Home} />
          <ProtectedRoute exact path='/profile' component={Profile} />
          <ProtectedRoute exact path="/answer-calling" component={AnswerCalling} />
          <ProtectedRoute exact path='/chat' component={ChatBox} />
          <ProtectedRoute exact path='/searching-profile' component={SearchProfile} />
          <ProtectedRoute exact path='/search-home' component={SearchHome} />
          <ProtectedRoute exact path='/single-profile' component={SingleProfile} />
          <ProtectedRoute exact path='/recent-call' component={RecentCall} />
          <ProtectedRoute exact path='/dummy' component={Dummy} />
          <ProtectedRoute exact path='/:receiver/:user_from_id/:user_to_id/:channel_id/:channel_name/video-chat' component={VideoChat} />
    
        </Switch>
      </Router>
      </Elements>
  );
}
export default withRouter(App);