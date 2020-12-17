
import React, { useState, useEffect } from "react";
import {  useHistory } from 'react-router';
import axios from "axios";
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import { FILTER_LIST_API } from './Api';


const useStyles = makeStyles({
  root: {
    width: 300,
  },
});
function valuetextAge(value) {
  return '${valueAge}°C';
}

function valuetextHeight(value) {
  return '${valueHeight}°C';
}



function valuetextWidth(value) {
  return '${valueWidth}°C';
}
const SideFilter = () =>{


  
  
  const [valueHeight, setValueHeight] = useState([20, 37]);
  const handleChangeHeight = (event, newValue) => {
    setValueHeight(newValue);
  };

    
    const [valueWidth, setValueWidth] = useState([25, 30]);
    const handleChangeWidth = (event, newValue) => {
      setValueWidth(newValue);
    };

    const [valueAge, setValueAge] = useState([34,45]);
    const handleChangeAge = (event, newValue) => {
      setValueAge(newValue);
     
    };
   

    const [valueDistance, setValueDistance] = useState(30);
    const handleChangeDistance = (event, newValue) => {
    setValueDistance(newValue);
  
  };

  // Radio button value
 const [valueGender, setGender] = useState(3);
  const radioHandle = (e) =>{
        setGender(e.target.value);
  }

  const filterHandle = (e) =>{
        e.preventDefault();

  const bodyParameters = {
     session_id: localStorage.getItem('session_id'),
     age_from: valueAge[0],
     show:valueGender,
     age_to: valueAge[1],
     distance: valueDistance,
     height_from:valueHeight[0],
     height_to:valueHeight[1],
     weight_from:valueWidth[0],
     weight_to:valueWidth[1],
     latitude:30.7,
     longitude:76.0,
   

   };

     axios.post(FILTER_LIST_API,bodyParameters)
 .then((response) => { 

     console.log(response);
   
 
 }, (error) => {
   
    localStorage.clear();
 });
}

  return(

        <div className="filter-tab">
                  <h4 className="mb-4">Filter</h4>
                  <form action="#" method="post">
                    <div className="show-gender ft-block d-flex flex-wrap" onChange={radioHandle}>
                      <div className="tab-title">
                        <h5>Show Me</h5>
                      </div>
                      <div className="form-group">
                        <input type="radio" defaultChecked name="gender" value={1} id="man" />
                        <label htmlFor="man">Man</label>
                      </div>
                      <div className="form-group">
                        <input type="radio" name="gender" value={2} id="woman" />
                        <label htmlFor="woman">Woman</label>
                      </div>
                      <div className="form-group">
                        <input type="radio" defaultChecked name="gender" value={3} id="both" />
                        <label htmlFor="both">Both</label>
                      </div>
                    </div>
                    <div className="age-group ft-block">
                      <div className="tab-title">
                        <h5>Age</h5>
                      </div>
                      <input type="text" className="two-range" id="age" readOnly />
                      <Slider value={valueAge} onChange={handleChangeAge} valueLabelDisplay="auto"
            aria-labelledby="range-slider" getAriaValueText={valuetextAge}/>
                    </div>

                    <div className="distance-group ft-block">
                      <div className="tab-title"> 
                        <h5>Distance</h5> 
                      </div>
                      <div className="range-slider">
                      <Slider value={valueDistance} onChange={handleChangeDistance} valueLabelDisplay="auto"
            aria-labelledby="range-slider" aria-labelledby="continuous-slider" />
                      </div>
                    </div>
                    <div className="height-group ft-block">
                      <div className="tab-title">
                        <h5>Height</h5>
                        {/*                                    <span class="point-calcu">1.60-1.78m</span>*/}
                      </div>
                      <Slider value={valueHeight} onChange={handleChangeHeight} valueLabelDisplay="auto"
        aria-labelledby="range-slider" getAriaValueText={valuetextHeight}/>

                    </div>
                    <div className="weight-group ft-block">
                      <div className="tab-title">
                        <h5>Weight</h5>
                        {/*                                    <span class="point-calcu">50-65kg</span>*/}
                      </div>
                      <Slider value={valueWidth} onChange={handleChangeWidth} valueLabelDisplay="auto"
        aria-labelledby="range-slider" getAriaValueText={valuetextWidth}/>
                    </div>
                    <div className="btns-group d-flex justify-content-between flex-wrap my-5">
                      <button className="btn bg-grd-clr" type="submit" onClick={filterHandle}>Done</button>
                      <button className="btn bg-grd-clr" type="reset">Reset</button>
                    </div>
                  </form>
                </div>

    )
}
export default SideFilter;



