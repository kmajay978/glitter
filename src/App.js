
import './App.css';
import React, { useState , useEffect } from 'react';
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
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import  ProtectedRoute  from "./protected.route";
import {SOCKET} from './components/Config';

function App() {

// initializing socket here 

  useEffect(() =>{
 SOCKET.connect();
    SOCKET.on('connect', function () {
      console.log('connected to socket server');
    });
    SOCKET.on('event', function (data) {
      console.log('Event Data', data);
    });
    //socket.emit(‘Test’, ‘world’);
    SOCKET.on('connect_error', (err) => {
      console.log(err)
    });
    SOCKET.on('disconnect', function () {
      console.log('Disconnected from Socket Server');
    });
  })



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
           
           
        </Switch>

    </Router>
  );
} 

export default App;
