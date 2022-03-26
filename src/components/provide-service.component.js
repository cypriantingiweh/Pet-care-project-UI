import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import PetServicesService from "../services/pet-services.service";


export default class ProvideService extends Component {

  constructor(props) {
    super(props);

    const search = this.props.location.search;
    this.state = {
      pet_cage_id:new URLSearchParams(search).get('pet_cage_id'),
      number_oftimes_per_day:undefined,
      pet_type:new URLSearchParams(search).get('pet_type'),
      wieght:new URLSearchParams(search).get('wieght'),
      requst:[],
      services_id:"",
      extra_service:"",
      extraWashing:"",
      placeValue:[]
    };

    
    this.handleChangeShaving = this.handleChangeShaving.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeWashing = this.handleChangeWashing.bind(this);
    this.onChangeNumberOftimesperdays = this.onChangeNumberOftimesperdays.bind(this);
    this.getAllPetServicesService();

  }

  async getAllPetServicesService() {
    await PetServicesService.getAllPetServices(this.state.pet_type).then(
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
      this.servicescAddition();
    PetServicesService.addProvidePetServices( 
      this.state.requst
      ).then(
      response => {

       if(response.message ==="Services successfully added"){
            this.props.history.push("/pets");      
       }
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
  

    handleChangeWashing(event) {
        this.setState({extraWashing: event.target.value});
    }
    
    onChangeNumberOftimesperdays(e){
      const values = this.state.placeValue;
         console.log(this.state.extraWashing)
        this.setState({number_oftimes_per_day: e.target.value});
        if(this.state.extraWashing ==='YES'){
          console.log(values)
          console.log(values.find(obj => {return obj.name==="Extra Washing"}))
          this.state.requst.push({
            services_id: values.find(obj => {return obj.name==="Extra Washing"}).id,
              extra_service: true,
              number_oftimes_per_day:+e.target.value,
              pet_cage_id:+this.state.pet_cage_id
            } ) 
            }
    }

    handleChangeShaving(event) {
        const values = this.state.placeValue;
        this.setState({sharving: event.target.value});
        if(event.target.value ==='YES'){
            this.state.requst.push({
                services_id: values.find(obj => {return obj.name==="Sharving"}).id,
                extra_service: false,
                number_oftimes_per_day:0,
                pet_cage_id:+this.state.pet_cage_id
            } ) 
        }
    }

    servicescAddition(){
        const values = this.state.placeValue;
        if(this.state.placeValue[0].pet_type_id === 1){
            if(this.state.wieght > 40){
                this.state.requst.push({
                    services_id: values.find(obj => {return obj.name==="Dogs above 40kg";}).id,
                    extra_service: false,
                    number_oftimes_per_day:0,
                    pet_cage_id:+this.state.pet_cage_id
                } )
            } else if(this.state.wieght < 20){
                this.state.requst.push({
                    services_id: values.find(obj => {return obj.name==="Dogs between 40kg and 20kg"}).id,
                    extra_service: false,
                    number_oftimes_per_day:0,
                    pet_cage_id:+this.state.pet_cage_id
                } )
            }else{
                this.state.requst.push({
                    services_id: values.find(obj => {return obj.name==="Dogs below 20kg"}).id,
                    extra_service: false,
                    number_oftimes_per_day:0,
                    pet_cage_id:+this.state.pet_cage_id
                } )
            }   
        }else{
            this.state.requst.push({
                    services_id: values.find(obj => {return obj.name==="Cat Services"}).id,
                    extra_service: false,
                    number_oftimes_per_day:0,
                    pet_cage_id:this.state.pet_cage_id
                } )  
          }
        
    }
  
    
  render() {
    console.log(this.state.placeValue)
    return ( 
      <div className ="container mt-4">
        <h1>Thanks alot! Let's continue </h1>
        {this.state.placeValue ?(
            <Form onSubmit={this.handleSubmit}ref={c => {this.form = c;}}>
              <div>
              {this.state.pet_type === "1" ?
                (<div className="form-group">
                  <label htmlFor="PetType" > Do you want your Pet sharved?
                     <select className="form-control" value={this.state.value} onChange={this.handleChangeShaving}>
                        <option  value="">Select option</option>
                        <option value="YES">Yes</option>
                        <option value="No">No</option>
                    </select>
                  </label>
                </div>):null
              }  

                <div className="form-group">
                  <label htmlFor="PetType" > Do want Extra washing of your pet?
                     <select className="form-control" value={this.state.value} onChange={this.handleChangeWashing}>
                        <option  value="">Select option</option>
                        <option value="YES">Yes</option>
                        <option value="No">No</option>
                    </select>
                  </label>
                </div>

                <div className="form-group">
                  <label htmlFor="number_of_days">How many times per day?</label>
                  <Input
                    type="number"
                    className="form-control"
                    name="number_of_days"
                    value={this.state.number_oftimes_per_day}
                    onChange={this.onChangeNumberOftimesperdays}
                  />
                </div>
                <div className="form-group">
                  <button className="btn btn-primary btn-block">Submit</button>
                </div>
              </div>
          </Form>
        ): <span>Loading Form data...</span> }
      
      </div>); 
  }
}
