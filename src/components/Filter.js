
import React, { useState, useEffect } from "react";
import {  useHistory } from 'react-router';
import axios from "axios";
import Slider from '@material-ui/core/Slider';
import { makeStyles , withStyles } from '@material-ui/core/styles';
import { FILTER_LIST_API } from './Api';
import Loader from '../components/Loader';
import {Typography} from '@material-ui/core';
import {filterData, profile, logout} from '../features/userSlice';
import useToggle, { removeDublicateFrds }from '../components/CommonFunction';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles({
  root: {
    backgroundcolor: '#f4c862',
    height: 5,

    
  },
});

const PrettoSlider = withStyles({
  root: {
    color: '#707070',
    height: 5,
        padding:0,
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: '#fff',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 5,
    backgroundColor: '#f4c862',
    borderRadius: 4,
  },
  rail: {
    height: 5,
    borderRadius: 4,
  },
})(Slider);



const SideFilter = ({setFilterUser}) =>{

  const history = useHistory();
  const dispatch = useDispatch();
  function valuetextHeight(value) {
  return '${valueHeight}°C';
}

function valuetextAge(value) {
  return '${valueAge}°C';
}

function valuetextweight(value) {
  return '${valueweight}°C';
}
 const filter ={
   gender: 2,
   age: {from: 18, to: 25},
   distance: 5,
   height: {from: 100, to: 170},
   weight: {from: 30, to: 60}
 };
  const [valueHeight, setValueHeight] = useState([filter.height.from, filter.height.to]);
  const handleChangeHeight = (event, newValue) => {
    // setLoading('true');
    setValueHeight(newValue);
  };

    
    const [valueweight, setValueweight] = useState([filter.weight.from, filter.weight.to]);
    const handleChangeweight = (event, newValue) => {
      setValueweight(newValue);
    };

    const [valueAge, setValueAge] = useState([filter.age.from, filter.age.to]);
    const handleChangeAge = (event, newValue) => {
      setValueAge(newValue);
    };


    const [valueDistance, setValueDistance] = useState(filter.distance);
    const handleChangeDistance = (event, newValue) => {
    setValueDistance(newValue);
  
  };
 
  // Radio button value
 const [valueGender, setGender] = useState(filter.gender);
  const radioHandle = (e) =>{
        setGender(e.target.value);
  }

  const [isLoading ,setLoading]= useState();
  const [path , setPath] = useState('');
  
  const handleReset =(e) => {
    setGender(filter.gender);
    setValueDistance(filter.distance);
    setValueAge([filter.age.from, filter.age.to]);
    setValueHeight([filter.height.from, filter.height.to]);
    setValueweight([filter.weight.from, filter.weight.to]);
  }

  const filterHandle = (e) =>{
    if (!!e)
        e.preventDefault();

  const bodyParameters = {
     session_id: localStorage.getItem('session_id'),
     age_from: valueAge[0],
     show:valueGender.toString(),
     age_to: valueAge[1],
     distance: valueDistance,
     height_from:valueHeight[0],
     height_to:valueHeight[1],
     weight_from:valueweight[0],
     weight_to:valueweight[1],
     latitude:30.70 ,
     longitude:76.71 
   };

     axios.post(FILTER_LIST_API,bodyParameters)
  .then((response) => { 
    // if(response.error=="bad_request")
    // {
    //   localStorage.removeItem("session_id");
    //   history.push('/login');
    // }
   if (response.status == 200) {
    setLoading(true);
    setFilterUser(removeDublicateFrds(response.data.data));
    dispatch(
      filterData({
        filterData: removeDublicateFrds(response.data.data)
      })
  );
   setTimeout(() => {
   
    setLoading(false);
        }, 600);
} else {
}
 
 }, (error) => {
  if (error.toString().match("403")) {
    localStorage.removeItem("session_id");
    history.push('/login');
  }
    localStorage.clear();
 });
}

const handleButton =() => {
  const pathname = window.location.pathname;
   setPath(pathname);
}
useEffect(()=>{
   filterHandle();
    handleButton();
},[])

  return(
   
        <div className="filter-tab">
           
         {/* <Loader isLoading={isLoading} /> */}
                  <h4 className="mb-4">Filter</h4>
                  <form action="#" method="post"  className="form">
                  <div className="tab-title">
                        <h5>Show Me</h5>
                      </div>
                    <div className="show-gender ft-block d-flex flex-wrap justify-content-between" onChange={radioHandle}>                      
                      <div className="form-group">
                        <input type="radio" name="gender" value={1} id="man" />
                        <label htmlFor="man">Man</label>
                      </div>
                      <div className="form-group">
                        <input type="radio" defaultChecked name="gender" value={2} id="woman" />
                        <label htmlFor="woman">Woman</label>
                      </div>
                      <div className="form-group">
                        <input type="radio" name="gender" value={"1,2"} id="both" />
                        <label htmlFor="both">Both</label>
                      </div>
                    </div>
                    <div className="age-group ft-block">
                      <div className="tab-title">
                        <h5>Age</h5>
                      </div>
                     
                      <Typography  id="age" className="two-range"  >
                         {`+${valueAge[0]} - ${valueAge[1]}`}
                    </Typography>
                      <PrettoSlider value={valueAge}   min={18} max={50} onChange={handleChangeAge} valueLabelDisplay="auto"
                       aria-labelledby="range-slider" getAriaValueText={valuetextAge}/>

                    </div>

                    <div className="distance-group ft-block">
                      <div className="tab-title"> 
                        <h5>Distance</h5> 
                      </div>
                      <div className="range-slider">
                      <Typography  id="distance" className="two-range"  >
                      {`${valueDistance} miles`}
                      </Typography>
                      <PrettoSlider value={valueDistance} max={10} onChange={handleChangeDistance} valueLabelDisplay="auto"
                       aria-labelledby="range-slider" aria-labelledby="continuous-slider" />
                      </div>
                    </div>
                    <div className="height-group ft-block">
                      <div className="tab-title">
                        <h5>Height</h5>
                        {/*                                    <span class="point-calcu">1.60-1.78m</span>*/}
                      </div>
                      <Typography  id="Height" className="two-range"  >
                      {`${valueHeight[0]} - ${valueHeight[1]} cm`} 
                    </Typography>
                      
                      <PrettoSlider value={valueHeight} min={130} max={200} onChange={handleChangeHeight}  valueLabelDisplay="auto"
                       aria-labelledby="range-slider" getAriaValueText={valuetextHeight}/>

                    </div>
                    <div className="weight-group ft-block">
                      <div className="tab-title">
                        <h5>Weight</h5>
                        {/*                                    <span class="point-calcu">50-65kg</span>*/}
                      </div>
                      <Typography  id="weight" className="two-range"  >
                      {`${valueweight[0]} - ${valueweight[1]} kg`}
                    </Typography>
                      
                      <PrettoSlider value={valueweight} onChange={handleChangeweight} valueLabelDisplay="auto" 
                      aria-labelledby="range-slider"  min={30}
                      max={100} getAriaValueText={valuetextweight}/>
                    </div>
                    <div className="btns-group d-flex justify-content-between flex-wrap my-5">
                     {path=="/" ? <> <button className="btn bg-grd-clr" id="done-filter" type="submit" onClick={filterHandle}>Done</button>
                      <button className="btn bg-grd-clr" type="reset" onClick={handleReset}>Reset</button></>
                  
                  : path=="/search-home" ? <> <button className="unknown-home btn bg-grd-clr" type="submit" onClick={filterHandle} disabled>Done</button>
                   <button className="unknown-home btn bg-grd-clr" type="reset" onClick={handleReset} disabled>Reset</button></>
                   
                   :  <> <button className="unknown-home btn bg-grd-clr" type="submit" onClick={filterHandle}>Done</button>
                    <button className="unknown-home btn bg-grd-clr" type="reset" onClick={handleReset}>Reset</button></>}
                    </div>
                  </form>
                </div>

    )
}
export default SideFilter;



