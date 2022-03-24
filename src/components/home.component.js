import React, { Component } from "react";

import CageService from "../services/cage.service";
import getAllPetServices from "../services/pet-services.service";

import "./home.component.css";

export default class Home extends Component {

  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      dogsStatistics:undefined,
      catStatistics: undefined,
      catServices:undefined,
      dogServices:undefined
    };

    this.CatStatistics();
    this.DogsStatistics();

  }

  async  CatStatistics() {
    await CageService.getStatistics(2).then(
      response => {
          this.setState({
              catStatistics:response.data.data
          })
      },
      error => {
          this.setState({
       catStatistics:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
          })
      
      }
    );
  await getAllPetServices.getAllPetServices(2).then(
      response => {
          this.setState({
              catServices:response.data.data
          })
          console.log(response.data.data)
      },
      error => {
          this.setState({
       catServices:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
          })
      
      }
    );
  }

 async DogsStatistics(){

    await CageService.getStatistics(1).then(
      response => {
       
        this.setState({
              dogsStatistics:response.data.data
          })
      
      },
      error => {
          this.setState({
          dogsStatistics :
            (error.response && error.response.data) ||
            error.message ||
            error.toString()})
      }
    );
  await getAllPetServices.getAllPetServices(1).then(
      response => {
          this.setState({
              dogServices:response.data.data
          })
           console.log(response.data.data)
      },
      error => {
          this.setState({
          dogServices:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
          })
      
      }
    );

  }
  

  renderCatStatistics(){
      return(   <div className="description">
                  <h1>About Our Cat Spaces and Services</h1>
                  <h2>Our door are open for cats to come and enjoy</h2>
                  <div>
                    <h4>Cages Statistics</h4>
                    <p> Total  cages for cats are {this.state.catStatistics.total_spaces} </p> 
                    <p> Total  empty cages for cats are {this.state.catStatistics.total_spaces_available} </p>
                    <p>Total  occupied cages for cats are {this.state.catStatistics.ocupy_spaces} </p>
                  </div>

                  <div>
                     <h4> Services</h4>
                      {this.state.catServices ?(
                           <table>
                      <thead>
                        <tr>
                          <th>SN</th>
                          <th>service name</th>
                          <th>description</th>
                          <th>Cost</th>
                        </tr> 
                      </thead>
                      <tbody>
                         {
                         this.state.catServices.map((services, index) => {
                          const { name, description, cost } = services;
                          return (
                              <tr key={index}>
                              <td>{index+1}</td>
                              <td>{name}</td>
                              <td>{cost}</td>
                              <td>{description}</td>
                              </tr>
                          );})
                        }
                      </tbody>
                    </table>
                      ): <p> Services Loading ...</p>  }
                  </div>
                  
              </div>)
  }

  renderdogsStatistics(){
    return (
          <div className="description">
            <h1>About Our Dog spaces and services</h1>
            <h2>Our door are open for dogs to come and enjoy</h2>
           
            <div>
               <h4>Cages Statistics</h4>
              <p>Total Number of cages for dog are {this.state.dogsStatistics.total_spaces } </p>
              <p>Total Number of empty cages for dog are {this.state.dogsStatistics.total_spaces_available}</p>
              <p>Total Number of occupied cages for dog are {this.state.dogsStatistics.ocupy_spaces}</p>
            </div>
              <div>
                <h4> Services</h4>
                  {this.state.dogServices ?(
                <table>
                      <thead>
                        <tr>
                          <th>SN</th>
                          <th>service name</th>
                          <th>description</th>
                          <th>Cost</th>
                        </tr> 
                      </thead>
                      <tbody>
                         {
                         this.state.dogServices.map((services, index) => {
                          const { name, description, cost } = services;
                          return (
                              <tr key={index}>
                              <td>{index+1}</td>
                              <td>{name}</td>
                              <td>{cost}</td>
                              <td>{description}</td>
                              </tr>
                          );})
                        }
                      </tbody>
                    </table>
                      ): <p> Services Loading ...</p>  }
                  </div>
          </div>
    )
  }

  render() {
    return (

     <div className = "container mt-5">
      
       <div>
         <h1 style = {{textAlign:'center'}} className ="mb-3" > Welcome to Our Pet Care center. </h1>
       </div>
     { this.state.dogsStatistics &&  this.state.catStatistics ?
        (<div>
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
        </div>): <span>Loading page...</span>
                 } 
      </div>)
  }
}
