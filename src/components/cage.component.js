import React, { Component } from "react";

import PetTypeService from "../services/pet-type.service"
import { Link } from "react-router-dom";

import CageService from "../services/cage.service";

export default class Cage extends Component {
  constructor(props) {
    super(props);


    this.state = {
      value:undefined,
      petType:[],
      placeValue:[]
    };
    this.componentDidMount();
    this.updatepetType = this.updatepetType.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
     PetTypeService.getAllPetType().then(
      response => {
         this.setState({
        placeValue:response.data.data
      })
      },
      error => {
        this.setState({
          pettypes:(error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  renderAccordion(){

    return this.state.value.map((cages, index) => {
        const {id,name,address,height,width,length,capacity,available} = cages;  
        return (
           <div className="row" key={id}>
                <div className ="col-lg-12 col-sm-12">
                  <div className="option">
                    <input type="checkbox" id= {id} className="toggle" />
                     <label className="title" for= {id}>{index +1}. {name}
                     </label>
                      <div className="content">
                        <p style ={{marginLeft:'20px'}}> Cage Name:{name}</p>
                        <p style ={{marginLeft:'20px'}}> Cage address: {address} </p>
                        <p style ={{marginLeft:'20px'}}> Cage Hieght:{height }cm </p>
                        <p style ={{marginLeft:'20px'}}> Cage length: {length}cm</p>
                        <p style ={{marginLeft:'20px'}}> Cage Width: {width}cm</p>
                        <p style ={{marginLeft:'20px'}}> Cage capacity: {capacity}</p>
                        <p style ={{marginLeft:'20px'}}> Available: {available} </p>
                      </div>
                   </div>
                  </div>
              </div>
          )
        
        });
   }

  handleSubmit(event) {
    CageService.getAllCageOfPetType(this.state.petType).then(
      response => {
         this.setState({
        value:response.data.data
      })
      },
      error => {
        this.setState({
          pettypes:(error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
    //alert('A name was submitted: ' + this.state.petType);
    event.preventDefault();
  }

   updatepetType(e) {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.petType = e.target.value;
    return this.setState(stateCopy);
  }

  render() {
    const petType =  this.state.placeValue;
    
    return (
      <div className= "container">
        <div className="row" style={{marginBottom:'-30px'}}>
          <div className="col-lg-10 col-sm-10 mt-3">
            { this.state.value ?
               <h1 id='title'>List of Cages</h1> :  <h1 id='title'>Please select the Cage Type </h1>
            }
          </div>
          <div className="col-lg-2 col-sm-2 mt-5">
              <Link to={"/pet-owner/add"} className="nav-link btn-success form-control" data-toggle="pill" role="tab" aria-controls="tab5" aria-selected="false">
                <i className="mdi mdi-coin"></i> Add Pet
              </Link>
          </div>
        </div>
        
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className ="col-lg-10 col-sm-10 mt-3">
              <label htmlFor="PetType">
              Please Select Pet Type  
            <select className="form-control" onChange={this.updatepetType}>
              {petType.map((item) => {
                return (<option key={item.id} value={item.id}>{item.type_name}</option>);
              })}
            </select>
            </label>
            </div>
            <div className ="col-lg-2 col-sm-2"> 
            <input className="form-control  mt-5" type="submit" value="Submit" /></div>
          </div>
      </form>
        {this.state.value ? (
            <div style={{marginTop:'-50px'}}>
              <div class="accordion">
                {this.renderAccordion()}
              </div>
            </div>) : null
        }
    </div>);
  }
}
