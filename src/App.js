
import './App.css';
import React, { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUpForm from './pages/Form';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';



function App() {
  return (
    <Router>
  
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path='/' component={Home} />
          <Route path="/register">
            <SignUpForm />
          </Route>
         
        </Switch>

    </Router>
  );
} 

export default App;
