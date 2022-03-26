import React, {Component} from "react";

import PetService from "../services/pet.service";
import PetTypeService from "../services/pet-type.service"
import { Link } from "react-router-dom";

export default class CageOutPets extends Component {

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

    return this.state.value.map((pets, index) => {
        const {id,pet_id,name,wieght,date_of_birth,note,cage,enter_date,number_of_days,leaving_date,pet_type} = pets;  
        return (
           <div className="row" key={id}>
                <div className ="col-lg-10 col-sm-10 mt-2">
                  <div className="option">
                    <input type="checkbox" id= {id} className="toggle" />
                     <label className="title" for= {id}>{index +1}. {name}
                     </label>
                      <div className="content">
                        <p style ={{marginLeft:'20px'}}> Pet Name:{name}</p>
                        <p style={{marginLeft:'20px'}}> Pet Type: {pet_type} </p>
                        <p style ={{marginLeft:'20px'}}> Pet Cage: {cage} </p>
                        <p style ={{marginLeft:'20px'}}> Pet Birth date:{date_of_birth } </p>
                        <p style ={{marginLeft:'20px'}}> Pet weight: {wieght}Kg</p>
                        <p style ={{marginLeft:'20px'}}> Number of days: {number_of_days} </p>
                        <p style ={{marginLeft:'20px'}}> Enter Date : {enter_date}</p>
                        <p style ={{marginLeft:'20px'}}> leaving_date: {leaving_date} </p>
                        <p style ={{marginLeft:'20px'}}> Note: {note} </p> 
                      </div>
                   </div>
                  </div>
                 <div className ="col-lg-2 col-sm-2 mt-5"> 
                  <Link to={`/pets/bills/${pet_id}/${id}`} className="nav-link btn-success form-control" data-toggle="pill" role="tab" aria-controls="tab5" aria-selected="false">
                     Get Bills
                  </Link>
                </div>
              </div>
          )
        
        });
   }

  handleSubmit(event) {
    PetService.getAllSignInPetOfType(this.state.petType).then(
      response => {
         this.setState({
        value:response.data.data
      })
      },error => {
        this.setState({
          pettypes:(error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });});
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
               <h1 id='title'>List of {this.state.value.legth ?<span>{this.state.value[0].pet_type}</span>:<span>pet</span> } </h1> :  <h1 id='title'>Please select the Pets you want to view </h1>
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
              <label>
              Please Select Pet Type  
            <select className="form-control" onChange={this.updatepetType}>
              <option  value="">Select specie</option>
              {petType.map((item) => {
                return (<option key={item.id} value={item.id}>{item.type_name}</option>);
              })}
            </select>
            </label>
            </div>
            <div className ="col-lg-2 col-sm-2"> <input className="form-control  mt-5" type="submit" value="Submit" /></div>
          </div>
      </form>
        {this.state.value ? (
            <div style={{marginTop:'-50px'}}>
               {this.state.value.length ? (
              <div class="accordion">
                {this.renderAccordion()}
              </div>): <span>No Pet Found</span>}
            </div>) : null
        }
    </div>);
  }
}