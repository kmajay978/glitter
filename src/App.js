import './App.css';
import './components/jqueryfile.js';
import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { BrowserRouter as Router, Switch, Route, withRouter, useParams, useHistory } from 'react-router-dom';
// Importing all pages from index.js 
import { Home, Login, ChatBox, SearchHome, AnswerCalling, SignupCompleted, Profile, SingleProfile, RecentCall, VideoChat, LiveVideoChat, SearchProfile, Dummy, SearchHomeBkp, SearchProfileAudio, AudioChat } from './pages'
import ProtectedRoute from "./protected.route";
import axios from "axios";
import createBrowserHistory from 'history/createBrowserHistory';
import { GET_LOGGEDPROFILE_API } from "./components/Api";
import { userProfile, videoCall } from "./features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { profile, userAuth } from './features/userSlice';
import { SOCKET } from "./components/Config";
import { checkLiveDomain } from './commonFunctions';

let userData;
const history = createBrowserHistory({ forceRefresh: true });
const ProfileData = async (dispatch, sessionId) => {
  const bodyParameters = {
    session_id: sessionId,
  };
  const { data: { data } } = await axios.post(GET_LOGGEDPROFILE_API, bodyParameters);
  dispatch(
    profile({
      profile: data
    })
  );
}
const stripePromise = loadStripe('pk_test_51HYm96CCuLYI2aV0fK3RrIAT8wXVzKScEtomL2gzY9XCMrgBa4KMPmhWmsCorW2cqL2MLSJ45GKAAZW7WxEmytDs009WzuDby2');
function App(props) {
  //  const {latitude, longitude, error} = usePosition();
  const new_history = useHistory();
  const [currentPathname, setCurrentPathname] = useState(null);
  const [currentSearch, setCurrentSearch] = useState(null);

  const dispatch = useDispatch();
  const is_auth = useSelector(userAuth); //using redux useSelector here
  // console.log(is_auth, "is_auth....")0000000000
  userData = useSelector(userProfile).user.profile; //using redux useSelector here
  useEffect(() => {
    SOCKET.connect();
    const sessionId = localStorage.getItem("session_id");
    if ((window.location.pathname !== "/profile") && !!sessionId) {
      ProfileData(dispatch, sessionId)
    }
    SOCKET.on('pick_video_call', (data) => {
      // console.log(data.user_to_id, userData.user_id, "checkkkkkkkkkkkkkkkk")
      if (!!userData && (data.user_to_id == userData.user_id)) { // check one-to-one data sync
        localStorage.setItem("receiverDetails", JSON.stringify(data))
        const page = checkLiveDomain() ? "/glitter-web/answer-calling" : "/answer-calling"
        history.push(page)
      }
    })
    SOCKET.on('receiver_decline_video_call', (data) => {
      localStorage.removeItem("videoCallPageRefresh");
      // SOCKET.disconnect();
      dispatch(videoCall(null))
      const page = checkLiveDomain() ? "/glitter-web/chat" : "/chat"
      if (!!userData && (data.user_from_id == userData.user_id)) { // check one-to-one data sync
        alert("receiver declined your call...")
        history.push(page)
      }
      if (!!userData && (data.user_to_id == userData.user_id)) { // check one-to-one data sync
        history.push(page)
      }
    })
    SOCKET.on('sender_decline_video_call', (data) => {
      localStorage.removeItem("videoCallPageRefresh");
      // SOCKET.disconnect();
      dispatch(videoCall(null))
      const page = checkLiveDomain() ? "/glitter-web/chat" : "/chat"
      if (!!userData && (data.user_to_id == userData.user_id)) { // check one-to-one data sync
        alert("sender declined the call...")
        history.push(page)
      }
      if (!!userData && (data.user_from_id == userData.user_id)) { // check one-to-one data sync
        history.push(page)
      }
    })
    SOCKET.on('call_not_picked_receiver_hide_page_video_call', (data) => {
      localStorage.removeItem("videoCallPageRefresh");
      // SOCKET.disconnect();
      dispatch(videoCall(null))
      if (!!userData && (data.user_from_id == userData.user_id)) { // check one-to-one data sync
        alert("receiver not accepted your call... maybe the user is offline. We have send the notification..")
        const page = checkLiveDomain() ? "/glitter-web/chat" : "/chat"
        history.push(page)
      }
      if (!!userData && (data.user_to_id == userData.user_id)) { // check one-to-one data sync
        if (window.location.pathname === "/answer-calling") {
          const page = checkLiveDomain() ? "/glitter-web" : "/"
          history.push(page)
        }
      }
    })
    SOCKET.on('call_malfunctioned_in_between_receiver_call_video_call', (data) => {
      localStorage.removeItem("videoCallPageRefresh");
      // SOCKET.disconnect();
      dispatch(videoCall(null))
      if (!!userData && (data.user_to_id == userData.user_id)) { // check one-to-one data sync
        if (window.location.pathname === "/answer-calling") {
          const page = checkLiveDomain() ? "/glitter-web" : "/"
          history.push(page)
        }
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

 
  useEffect(() => {

    $(document).ready(function() {
      function disableBack() { window.history.forward() }

      window.onload = disableBack();
      window.onpageshow = function(evt) { if (evt.persisted) disableBack() }
  });
    // // Anything in here is fired on component mount. Component did mount
    // const { history } = props;
    // history.listen((newLocation, action) => {
    //   if (action === "PUSH") {
    //     if (
    //       newLocation.pathname !== currentPathname ||
    //       newLocation.search !== currentSearch
    //     ) {
    //       currentPathname = newLocation.pathname;
    //       currentSearch = newLocation.search;
    //       history.push({
    //         pathname: newLocation.pathname,
    //         search: newLocation.search
    //       });
    //     }
    //   } else {
    //     history.go(1);
    //   }
    // });
    // return () => {
    //     // Anything in here is fired on component unmount. component will mount 
    //     window.onpopstate = null;
    // }
}, [])

  return (
    <Router>
      <Switch>
        <Elements stripe={stripePromise}>
          <Route exact path="/login" component={Login} />
          <Route exact path='/signup-completed' component={SignupCompleted} />
          <Route exact path='/dummy' component={Dummy} />
          {/* Private routes */}
          <ProtectedRoute exact path='/' component={Home} />
          <ProtectedRoute exact path='/profile' component={Profile} />
          <ProtectedRoute exact path="/answer-calling" component={AnswerCalling} />
          <ProtectedRoute exact path='/chat' component={ChatBox} />
          <ProtectedRoute exact path='/searching-profile' component={SearchProfile} />
          <ProtectedRoute exact path='/searching-profile-call' component={SearchProfileAudio} />
          <ProtectedRoute exact path='/search-home' component={SearchHome} />
          <ProtectedRoute exact path='/single-profile' component={SingleProfile} />
          <ProtectedRoute exact path='/recent-call' component={RecentCall} />
         
          <ProtectedRoute exact path='/status' component={SearchHomeBkp} />
          <ProtectedRoute exact path='/:receiver/:user_from_id/:user_to_id/:channel_id/:channel_name/video-chat' component={VideoChat} />
          <ProtectedRoute exact path='/:receiver/:user_from_id/:user_to_id/:channel_id/:channel_name/audio-chat' component={AudioChat} />
          <ProtectedRoute exact path='/:user_id/:channel_id/:channel_name/live-video-chat' component={LiveVideoChat} />
        </Elements>
      </Switch>
    </Router>
  );
}
export default withRouter(App);