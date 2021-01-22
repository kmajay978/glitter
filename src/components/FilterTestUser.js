
import React, { useState, useEffect ,useMemo } from "react";
import {  useHistory } from 'react-router';
import axios from "axios";
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import { FILTER_LIST_API , LIKE_USER , DISLIKE_USER} from './Api';
import Image from 'react-bootstrap/Image'
import { CardHeader , card} from "@material-ui/core";
import {Card, CardImg, CardText, CardBody,CardTitle} from 'reactstrap';
import {GETALLUSER_API} from '../components/Api';
import GlitterCard from 'react-tinder-card'

const FilterTestUser = ({fetchedProfile}) =>{
  
                return(
            
<div className="tinder">
  <div className="tinder--status">
    <i className="fa fa-remove" />
    <i className="fa fa-heart" />
  </div>
  <div className="tinder--cards">
    <div className="tinder--card">
      <img src="/assets/images/find-friend-login.png" />
      <div className="profile__info">
        <h3>Demo card 1</h3>
        <p>This is a demo for Tinder like swipe cards</p>
      </div>      
    </div>
    <div className="tinder--card">
      <img src="/assets/images/find-friend-login.png" />
      <div className="profile__info">
        <h3>Demo card 2</h3>
        <p>This is a demo for Tinder like swipe cards</p>
      </div>
    </div>
    <div className="tinder--card">
      <img src="/assets/images/find-friend-login.png" />
      <div className="profile__info">
        <h3>Demo card 3</h3>
        <p>This is a demo for Tinder like swipe cards</p>
      </div>
    </div>
    <div className="tinder--card">
      <img src="/assets/images/find-friend-login.png" />
      <div className="profile__info">
        <h3>Demo card 4</h3>
        <p>This is a demo for Tinder like swipe cards</p>
      </div>
    </div>
    <div className="tinder--card">
      <img src="/assets/images/find-friend-login.png" />
      <div className="profile__info">
        <h3>Demo card 5</h3>
        <p>This is a demo for Tinder like swipe cards</p>
      </div>
    </div>
  </div>
  <div className="tinder--buttons">
    <button id="nope"><i className="fa fa-remove" /></button>
    <button id="love"><i className="fa fa-heart" /></button>
  </div>
</div>

                      
    )
}
export default FilterTestUser;



