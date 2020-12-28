import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from 'styled-components'
import Carousel from "react-elastic-carousel";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 600, itemsToShow: 1 },
  { width: 1000, itemsToShow: 1 },
];

// Working on login functional component
const LoginSidebar = () => {
 

        return(
            <>
                <div className="signup-wrapper__slider">
                   <div className=" ">
                    <Carousel breakPoints={breakPoints}>
                    <div className="item text-center">
                      <figure>
                        <img src="/assets/images/dating-app-login.png" alt="Dating App" />
                      </figure>
                      <div className="signup-slider__content">
                        <h4 className="theme-txt">Dating App</h4>
                        <p>Mutual sympathy. Do not waste time and write to her</p>
                      </div>
                    </div>

                    <div className="item text-center">
                      <figure>
                        <img src="/assets/images/find-friend-login.png" alt="Find Best Friend" />
                      </figure>
                      <div className="signup-slider__content">
                        <h4 className="theme-txt">Find Best Friend</h4>
                        <p>Mutual sympathy. Do not waste time and write to her</p>
                      </div>
                    </div>

                    <div className="item text-center">
                      <figure>
                        <img src="/assets/images/live-login.png" alt="Live and Get Fan" />
                      </figure>
                      <div className="signup-slider__content">
                        <h4 className="theme-txt">Find Best Friend</h4>
                        <p>Mutual sympathy. Do not waste time and write to her</p>
                      </div>
                    </div>
                  </Carousel>
                    </div>
                </div>
          </>
             
        )
    
}

export default LoginSidebar;