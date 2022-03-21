import React, { Component } from "react";
import {DogsStatistics, CatStatistics} from "./statistic.component" 

import "./home.component.css"

export default class Home extends Component {

  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      dogsStatistics:undefined,
      catStatistics: undefined
    };

    // this.getStatisticsDog();
    //  this.getStatisticsCat();
  }

  

  renderCatStatistics(){
      return(   <div className="description">
            <h1>About Our Cat Services</h1>
            <h2>Our door are open for cats to come and enjoy</h2>
            <CatStatistics />
          </div>)
  }

  renderdogsStatistics(){
    return (
      <div className="description">
            <h1>About Our Dog services</h1>
            <h2>Our door are open for dogs to come and enjoy</h2>
               <DogsStatistics />
            </div>
    )
  }

  render() {
    return (

     <div className = "container mt-5">
      
       <div>
         <h1 style = {{textAlign:'center'}} className ="mb-3" > Welcome to Our Pet Care center. </h1>
       </div>
        <div>
          <div className="blog-card">
          <div className="meta">
            <div className="photo divCatStyles" ></div>
            <ul className="details">
              <li className="author">The services only for dog</li>
              <li className="date">Aug. 24, 2015</li>
              <li className="tags">
                <ul>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </li>
            </ul>
          </div>
            {this.renderCatStatistics()}
        </div>
        <div className="blog-card alt">
          <div className="meta">
            <div className="photo divDogStyles" ></div>
            <ul className="details">
              <li className="author">Services only for Dogs</li>
              <li className="date">July. 15, 2015</li>
              <li className="tags">
                <ul>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </li>
            </ul>
          </div>
            {this.renderdogsStatistics()}
          </div>
        </div>
      </div>
      )
  }
}
