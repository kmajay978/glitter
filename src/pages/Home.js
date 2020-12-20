import React, {Component, useState} from 'react';
import FilterSide from '../components/Filter';
import NavLinks from '../components/Nav';
import Loader from '../components/Loader';
import FilterUser from '../components/FilterUser'; 

const Home = () =>{
  const [selectedMode, setSelectedMode] = useState('work')
    return(
          <section className="home-wrapper">
          {/* <Loader isLoading={isLoading} /> */}
        <img className="bg-mask" src="/assets/images/mask-bg.png" alt="Mask" />
        <div className="home-inner">
          <div className="container-fluid p-0">
            <div className="row no-gutters">
              <div className="col-lg-3 option-bar p-3 vh-100">
                <div className="logo-tab mb-5 d-flex justify-content-between align-items-start">
                  <a href="javascript:void(0)">
                    <img src="/assets/images/glitters.png" alt="Glitters" />
                  </a>
                  <span className="chat-point">
                    <a href="javascript:void(0)">
                      <i className="fas fa-comment" /> 
                    </a>    
                  </span>                            
                </div>
                
                {/* Sidebar filter */}

              <FilterSide setSelectedMode={setSelectedMode} />
                {/* End filter here */}
              </div>
              <div className="col-lg-9 main-bar p-3">
                <div className="tab-top d-flex flex-wrap-wrap">
                  <div className="live-icon">
                    <img src="/assets/images/live.png" alt="Live" />
                  </div>
                 <NavLinks/>
                </div>
                <div className="profile-swipe-wrapper">
                  <FilterUser selectedMode={selectedMode} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )

}

export default Home;
