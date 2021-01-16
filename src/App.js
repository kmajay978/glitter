
import './App.css';
import React, { useState , useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route, useParams } from 'react-router-dom';
// import {useLocation} from "react-router-dom"
import Home from './pages/Home';
import Login from './pages/Login';
import ChatBox from './pages/ChatBox';
import SearchHome from './pages/SearchHome';
import SearchProfile from './pages/SearchProfile'; 
import AnswerCalling from './pages/AnswerCalling';
import SignupCompleted from './pages/SignupCompleted';
import Profile from './pages/Profile';
import SingleProfile from './pages/SingleProfile';
import RecentCall from './pages/RecentCall';
import Dummy from './pages/Dummy';
import  ProtectedRoute  from "./protected.route";
import axios from "axios";
import {GET_LOGGEDPROFILE_API} from "./components/Api";
import {login} from "./features/userSlice";
import {useDispatch} from "react-redux";
import {profile} from './features/userSlice';
// import {SOCKET} from './components/Config';

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
  console.log("testing git...")
  const dispatch = useDispatch();
  useEffect(() => {
    const sessionId = localStorage.getItem("session_id");
    if ((window.location.pathname !== "/profile") && !!sessionId) {
      ProfileData(dispatch, sessionId)
    }
  }, [])
  return (
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
           
           
        </Switch>

    </Router>
  );
} 

export default App;
