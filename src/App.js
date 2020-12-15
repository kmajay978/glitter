
import './App.css';
import React, { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import ChatBox from './pages/ChatBox';
import SearchHome from './pages/SearchHome';
import SearchProfile from './pages/SearchProfile';
import AnswerCalling from './pages/AnswerCalling';
import SignupCompleted from './pages/SignupCompleted';
import Profile from './pages/Profile';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import  ProtectedRoute  from "./protected.route";


function App() {


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

          
           
        </Switch>

    </Router>
  );
} 

export default App;
