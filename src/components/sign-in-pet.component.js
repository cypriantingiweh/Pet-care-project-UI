import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import CageService from "../services/cage.service"
import PetService from "../services/pet.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const leaving_date = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid leaving date.
      </div>
    );
  }
};

const number_of_days = value => {
  if (value.length < 0) {
    return (
      <div className="alert alert-danger" role="alert">
        The Number of days must be greater than 0
      </div>
    );
  }
};

export default class SignInPet extends Component {

  constructor(props) {
    super(props);

    const search = this.props.location.search;
    this.state = {
      Pet_id:new URLSearchParams(search).get('Pet_id'),
      number_of_days:"",
      leaving_date:"",
      pet_type:new URLSearchParams(search).get('pet_type'),
      wieght: new URLSearchParams(search).get('wieght'),
      cage:[],
      placeValue:[],
      message:new URLSearchParams(search).get('message'),

    };

    console.log(this.state.wieght)
    this.getAllCages();

    this.updatepetType = this.updatepetType.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangnumberofdays = this.onChangnumberofdays.bind(this);

  }

  onChangnumberofdays(e) {
    this.setState({
      number_of_days: e.target.value
    });
  }

  updatepetType(e) {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.cage = e.target.value;
    return this.setState(stateCopy);
  }

  getAllCages() {
    CageService.getAllCageOfPetTypeForEmpty(this.state.pet_type).then(
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

  handleSubmit(event) {
    PetService.cageInPets( 
      this.state.Pet_id,this.state.cage,this.state.number_of_days,this.state.leaving_date
      ).then(
      response => {
       if(response.message ==="Pet already cage in"){
        this.props.history.push(`/pet/provide?pet_cage_id=${response.data.id}&wieght=${this.state.wieght}&pet_type=${this.state.pet_type}`);      
       }else{
          this.props.history.push(`/pet/provide?pet_cage_id=${response.data.id}&wieght=${this.state.wieght}&pet_type=${this.state.pet_type}`);      
       }
    },error => {
       console.log(error)
        this.setState({
          message:(error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      });
    event.preventDefault();
  }
  
    
  render() {

    const petType =  this.state.placeValue;
    return ( 
      <div className ="container mt-4">
          {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful==="true"
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
        <h1>Please provide us with your pet information</h1>

        <Form onSubmit={this.handleSubmit}ref={c => {this.form = c;}}>
              <div>
                <div className="form-group">
                  <label htmlFor="number_of_days">How many days do you want your pet to spent here?</label>
                  <Input
                    type="number"
                    className="form-control"
                    name="number_of_days"
                    value={this.state.number_of_days}
                    onChange={this.onChangnumberofdays}
                    validations={[required, number_of_days]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="PetType" > The cage you love for your Pet 
                    <select className="form-control" onChange={this.updatepetType}>
                      <option value="">Select Cage</option>)
                      {petType.map((item) => {
                        return (<option key={item.id} value={item.id}>{item.name}, {item.address} of capacity {item.capacity}cm3 </option>);
                        })}
                    </select>
                  </label>
                </div>

                <div className="form-group">
                  <label htmlFor="date_of_birth">Leaving date</label>
                  <input className="form-control" validations={[required, leaving_date]} type="date" onChange={(event) => this.setState({leaving_date: event.target.value})}/>
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Next</button>
                </div>
              </div>
          </Form>
      </div>); 
  }
}



