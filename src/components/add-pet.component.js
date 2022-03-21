import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import PetService from "../services/pet.service";
import PetTypeService from "../services/pet-type.service"

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const name = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid name.
      </div>
    );
  }
};

const wieght = value => {
  if (value.length <0 ) {
    return (
      <div className="alert alert-danger" role="alert">
        The Weight must be greater than 0
      </div>
    );
  }
};

const note = value => {
  if (value.length < 15 || value.length > 99) {
    return (
      <div className="alert alert-danger" role="alert">
        The Note must be between 15 and 99 characters.
      </div>
    );
  }
};

const date_of_birth = value => {
  if (value) {
    return (
      <div className="alert alert-danger" role="alert">
       The Date of birth must be a valid date and must be in the passed
      </div>
    );
  }
};

export default class AddPets extends Component {

  constructor(props) {
    super(props);

    const search = this.props.location.search;
    this.state = {
      name:"",
      wieght:undefined,
      date_of_birth:undefined,
      note:"",
      successful: new URLSearchParams(search).get('successful'),
      message: new URLSearchParams(search).get('message'),
      Users_id:new URLSearchParams(search).get('userId'),
      petType:[],
      placeValue:[],
      insertedId:undefined
    };

    this.componentDidMount();
    this.updatepetType = this.updatepetType.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeNote = this.onChangeNote.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeWieght = this.onChangeWieght.bind(this);
    this.onChangeDateOfBirth = this.onChangeDateOfBirth.bind(this);

  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeWieght(e) {
    this.setState({
      wieght: e.target.value
    });
  }

  onChangeDateOfBirth(e) {
    this.setState({
      date_of_birth: e.target.value
    });
  }

  onChangeNote(e) {
    this.setState({
      note: e.target.value
    });
  }

  updatepetType(e) {
    const stateCopy = Object.assign({}, this.state);
    stateCopy.petType = e.target.value;
    // this.setState({
    //   pet_type_id:e.target.value
    // })
    return this.setState(stateCopy);
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

 
  handleSubmit(event) {
    
    PetService.addPets( 
      this.state.name,this.state.wieght,this.state.date_of_birth,this.state.petType,this.state.note,this.state.Users_id
      ).then(
      response => {
         this.setState({
        message:response.message,   
        insertedId:response.data.insertId
      })
      if(response.message ==="Pet successfully added"){
        this.props.history.push(`/pet/signin?Pet_id=${response.data.insertId}&pet_type=${this.state.petType}&wieght=${this.state.wieght}`);
      }},error => {
        this.setState({
          insertedId:error.response.data.data.id,
          message:(error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()});
            console.log(this.state.message)
            if(this.state.message ==="Pet Name already exist!"){
              this.props.history.push(`/pet/signin?Pet_id=${this.state.insertedId}&pet_type=${this.state.petType}&wieght=${this.state.wieght}`); 
            }
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
                  <label htmlFor="name">name</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChangeName}
                    validations={[required, name]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="PetType" >Please Select Pet Type  
                    <select className="form-control" onChange={this.updatepetType}>
                      {petType.map((item) => {
                        return (<option key={item.id} value={item.id}>{item.type_name}</option>);
                        })}
                    </select>
                  </label>
                </div>

                <div className="form-group">
                  <label htmlFor="wieght">Wieght in Kg</label>
                  <Input
                    type="number"
                    className="form-control"
                    name="wieght"
                    value={this.state.wieght}
                    onChange={this.onChangeWieght}
                    validations={[required, wieght]}
                  />
                </div>
                  
                <div className="form-group">
                  <label htmlFor="date_of_birth">Pet Date of birth</label>
                  <input className="form-control" validations={[required, date_of_birth]} type="date" onChange={(event) => this.setState({date_of_birth: event.target.value})}/>
                </div>

                <div className="form-group">
                  <label htmlFor="note">Small discription about your pet</label>
                  <textarea
                    type="text"
                    className="form-control"
                    name="note"
                    value={this.state.note}
                    onChange={this.onChangeNote}
                    validations={[required, note]}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Next</button>
                </div>
              </div>
          </Form>

      </div>
        
    )
     
  }
}
