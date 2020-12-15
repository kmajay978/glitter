
import React, { useState, useEffect } from "react";
import {  useHistory } from 'react-router';
import axios from "axios";

const SideFilter = () =>{
    return(

        <div className="filter-tab">
                  <h4 className="mb-4">Filter</h4>
                  <form action="#" method="post">
                    <div className="show-gender ft-block d-flex flex-wrap">
                      <div className="tab-title">
                        <h5>Show Me</h5>
                      </div>
                      <div className="form-group">
                        <input type="checkbox" defaultChecked name="man" id="man" />
                        <label htmlFor="man">Man</label>
                      </div>
                      <div className="form-group">
                        <input type="checkbox" name="woman" id="woman" />
                        <label htmlFor="woman">Woman</label>
                      </div>
                      <div className="form-group">
                        <input type="checkbox" defaultChecked name="both" id="both" />
                        <label htmlFor="both">Both</label>
                      </div>
                    </div>
                    <div className="age-group ft-block">
                      <div className="tab-title">
                        <h5>Age</h5>
                      </div>
                      <input type="text" className="two-range" id="age" readOnly />
                      <div id="age-range" />
                    </div>
                    <div className="distance-group ft-block">
                      <div className="tab-title">
                        <h5>Distance</h5>
                      </div>
                      <div className="range-slider">
                        <output className="range-output">
                          <span className="text-bold output" />
                          <span className="text-bold">miles</span>
                        </output>
                        <input type="range" min={1} max={20} step={1} defaultValue={10} />
                      </div>
                    </div>
                    <div className="height-group ft-block">
                      <div className="tab-title">
                        <h5>Height</h5>
                        {/*                                    <span class="point-calcu">1.60-1.78m</span>*/}
                      </div>
                      <input type="text" className="two-range" id="height" readOnly />
                      <div id="height-range" />
                    </div>
                    <div className="weight-group ft-block">
                      <div className="tab-title">
                        <h5>Weight</h5>
                        {/*                                    <span class="point-calcu">50-65kg</span>*/}
                      </div>
                      <input type="text" className="two-range" id="weight" readOnly />
                      <div id="weight-range" />
                    </div>
                    <div className="btns-group d-flex justify-content-between flex-wrap my-5">
                      <button className="btn bg-grd-clr" type="submit">Done</button>
                      <button className="btn bg-grd-clr" type="reset">Reset</button>
                    </div>
                  </form>
                </div>

    )
}
export default SideFilter;



