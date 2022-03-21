import React, { Component, Suspense } from "react";
import {DogsStatistics, CatStatistics} from "./statistic.component" 

import "./home.component.css"
import { form } from "react-validation/build/form";

//import UserService from "../services/user.service";

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
             {/* <Suspense fallback={<h1>Loading Statistics...</h1>}>
              <p>Total Number of cages for cats are {data.catsStatistics.total_spaces}</p>
              <p>Total Number of empty cages for cats are {data.catsStatistics.total_spaces_available}</p>
              <p>Total Number of occupied cages for cats are {data.catsStatistics.ocupy_spaces}</p>
            </Suspense> */}
            <CatStatistics />
          </div>)
  }

  renderdogsStatistics(){
    return (
      <div className="description">
            <h1>About Our Dog services</h1>
            <h2>Our door are open for dogs to come and enjoy</h2>
            
              {/* <p>Total Number of cages for dog are {data.dogsStatistics.total_spaces}</p>
              <p>Total Number of empty cages for dog are {data.dogsStatistics.total_spaces_available}</p>
              <p>Total Number of occupied cages for dog are {data.dogsStatistics.ocupy_spaces}</p>
               */}
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
              <li className="author"><a >John Doe</a></li>
              <li className="date">Aug. 24, 2015</li>
              <li className="tags">
                <ul>
                  <li><a>Learn</a></li>
                  <li><a >Code</a></li>
                  <li><a >HTML</a></li>
                  <li><a >CSS</a></li>
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
              <li className="author"><a href="#">Jane Doe</a></li>
              <li className="date">July. 15, 2015</li>
              <li className="tags">
                <ul>
                  <li><a >Learn</a></li>
                  <li><a >Code</a></li>
                  <li><a >JavaScript</a></li>
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
