import './App.css';
import './components/jqueryfile.js';
import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { BrowserRouter as Router, Switch, Route, withRouter, useParams, useHistory } from 'react-router-dom';
// Importing all pages from index.js 
import { Home, Login, ChatBox, SearchHome, AnswerCalling, SignupCompleted, Profile, SingleProfile, RecentCall, VideoChat, LiveVideoChat, SearchProfile, SearchProfileAudio, AudioChat } from './pages'
import ProtectedRoute from "./protected.route";
import axios from "axios";
import createBrowserHistory from 'history/createBrowserHistory';
import { GET_LOGGEDPROFILE_API } from "./components/Api";
import { userProfile, videoCall } from "./features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { profile, userAuth } from './features/userSlice';
import { SOCKET } from "./components/Config";
import { checkLiveDomain } from './commonFunctions';
import NotificationContainer from 'react-notifications/lib/NotificationContainer';
import 'react-notifications/lib/notifications.css';

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
  console.log("check live")
  //  const {latitude, longitude, error} = usePosition();
  const new_history = useHistory();
  const [currentPathname, setCurrentPathname] = useState(null);
  const [currentSearch, setCurrentSearch] = useState(null);
  

  const dispatch = useDispatch();
  const is_auth = useSelector(userAuth); //using redux useSelector here
  userData = useSelector(userProfile).user.profile; //using redux useSelector here
  useEffect(() => {
    SOCKET.connect();
    const sessionId = localStorage.getItem("session_id");
    if ((window.location.pathname !== "/profile") && !!sessionId) {
      ProfileData(dispatch, sessionId)
    }
    SOCKET.on('pick_video_call', (data) => {
      if (!!userData && (data.user_to_id == userData.user_id)) { // check one-to-one data sync
        localStorage.setItem("receiverDetails", JSON.stringify(data))
        const page = "/answer-calling"
        window.open('http://localhost:3000'+page,'PoP_Up','directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=1024,height=768')
        // history.push(page)
      }
    })
    SOCKET.on('receiver_decline_video_call', (data) => {
      localStorage.removeItem("videoCallPageRefresh");
      // SOCKET.disconnect();
      dispatch(videoCall(null))
      const page = "/chat"
      if (!!userData && (data.user_from_id == userData.user_id)) { // check one-to-one data sync
        if (data.showMsg) {
          alert("receiver declined your call...")
        }
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
      const page = "/chat"
      if (!!userData && (data.user_to_id == userData.user_id)) { // check one-to-one data sync
        if (data.showMsg) {
          alert("sender declined the call...")
        }
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
        const page = "/chat"
        history.push(page)
      }
      if (!!userData && (data.user_to_id == userData.user_id)) { // check one-to-one data sync
        if (window.location.pathname === "/answer-calling") {
          const page = "/"
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
          const page = "/"
          history.push(page)
        }
      }
    })
  }, [])
  
//   var ctrlKeyDown = false;
//  const handleRefresh = (e) =>{
//   document.addEventListener('keydown', (e) => {
//     e = e || window.event;
//     if( ((e.which || e.keyCode) == 116)|| ((e.which || e.keyCode) == 82  && ctrlKeyDown) ){
//         e.preventDefault();
//     }
//    else if ((e.which || e.keyCode) == 17) {
//         // Pressing  only Ctrl
//         ctrlKeyDown = true;
//     }
// });

//  }


  useEffect(() => {
  
    // handleRefresh();
    
    // window.onbeforeunload = function(e) {
    //   return confirm("confirm refresh")
    // };
    // window.location.hash = "no-back-button";

    // // Again because Google Chrome doesn't insert
    // // the first hash into the history
    // window.location.hash = "Again-No-back-button"; 

    // window.onhashchange = function(){
    //     window.location.hash = "no-back-button";
    // }

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
    //       history.pushState({
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
          {/* Private routes */}
          <ProtectedRoute exact path='/' component={Home} />
          <ProtectedRoute  path='/profile' component={Profile} />
          <ProtectedRoute  path="/answer-calling" component={AnswerCalling} />
          <ProtectedRoute  path='/chat' component={ChatBox} />
          <ProtectedRoute  path='/searching-profile' component={SearchProfile} />
          <ProtectedRoute  path='/searching-profile-call' component={SearchProfileAudio} />
          <ProtectedRoute  path='/search-home' component={SearchHome} />
          <ProtectedRoute  path='/:userId/single-profile' component={SingleProfile} />
          <ProtectedRoute  path='/recent-call' component={RecentCall} />
          <ProtectedRoute  path='/:receiver/:user_from_id/:user_to_id/:channel_id/:channel_name/video-chat' component={VideoChat} />
          <ProtectedRoute  path='/:receiver/:user_from_id/:user_to_id/:channel_id/:channel_name/audio-chat' component={AudioChat} />
          <ProtectedRoute  path='/:user_id/:channel_id/:channel_name/live-video-chat' component={LiveVideoChat} />
        </Elements>
      </Switch>
        <NotificationContainer 
        />
        
    </Router>
  );
}
export default withRouter(App);
