import React, {Component} from "react";

import PetTypeService from "../services/pet-type.service"
import PetServicesService from "../services/pet-services.service"
import { Link } from "react-router-dom";
import moment from 'moment';

export default class Services extends Component {

    constructor(props) {
    super(props);


    this.state = {
      value:[],
      petType:[],
      placeValue:[],
    };
    this.componentDidMount();
    this.updatepetType = this.updatepetType.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

 async componentDidMount() {
   await  PetTypeService.getAllPetType().then(
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

  await  PetServicesService.getAllServices().then(
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
  }

  renderAccordion(){

    return this.state.value.map((pets, index) => {
        const {id,name,description,cost,created_at} = pets;  
        return (
           <div className="row" key={id}>
                <div className ="col-lg-12 col-sm-12">
                  <div className="option">
                    <input type="checkbox" id= {id} className="toggle" />
                     <label className="title" for= {id}>
                        <table>
                          <tbody>
                            <tr>
                              <td style={{border:'none'}} >{index+1}.</td>
                              <td style={{border:'none'}}  > {name} </td>
                              <td style={{border:'none'}}  >{cost}frs CFA</td>
                              <td  style={{border:'none'}} > {description} </td>
                              <td style={{border:'none'}} >{  moment.utc(created_at).format("MMM Do, YYYY")}</td>
                            </tr>
                          </tbody>     
                        </table>
                     </label>
                      <div className="content">
                      </div>
                   </div>
                  </div>
              </div>
          )
        
        });
   }

  handleSubmit(event) {
    PetServicesService.getAllPetServices(this.state.petType).then(
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
               <h1 id='title'> List of Services </h1>
          </div>
          <div className="col-lg-2 col-sm-2 mt-5">
              <Link to={"/services/add"} className="nav-link btn-success form-control" data-toggle="pill" role="tab" aria-controls="tab5" aria-selected="false">
                <i className="mdi mdi-coin"></i>New services
              </Link>
          </div>
        </div>
        
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className ="col-lg-10 col-sm-10 mt-3">
              <label>
            Filter By pet type 
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
      <div>
        {}
        {this.state.value ? (
            <div style={{marginTop:'-50px'}}>
               {this.state.value.length ? (
              <div class="accordion">
                {this.renderAccordion()}
              </div>): <span>No Services under the pet type</span>}
            </div>) : null
        }
      </div>
    </div>);
  }
}