import React from 'react'
import ReactDOM from "react-dom";
import { Link } from 'react-router-dom';
import {addDefaultSrc} from "../commonFunctions";
const Logo = () =>{
    return (
          <Link to="/">
                    <img src="/assets/images/glitters.png" alt="Glitters" />
          </Link>
    )  
}

export default Logo;