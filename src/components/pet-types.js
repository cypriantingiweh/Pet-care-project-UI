import React, {Component} from "react";

import PetTypeService from "../services/pet-type.service"
import { Link } from "react-router-dom";
import moment from 'moment';

export default class PetTypes extends Component {


    constructor(props) {
    super(props);


    this.state = {
      value:[],
    };
    this.componentDidMount();
  }

  async componentDidMount() {
   await  PetTypeService.getAllPetType().then(
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

    return this.state.value.map((pettype, index) => {
        const {id,type_name,created_at} = pettype;  
        return (
           <div className="row" key={id}>
                <div className ="col-lg-12 col-sm-12">
                  <div className="option">
                    <input type="checkbox" id= {id} className="toggle" />
                     <label className="title" for= {id}>
                        <span className ="col-lg-1 col-sm-1">{index +1}.</span>
                        <span className ="col-lg-6 col-sm-6"> {type_name} </span>
                        <span className ="col-lg-3 col-sm-3">{  moment.utc(created_at).format("MMM Do, YYYY")}</span>
                     </label>
                      <div className="content">
                        
                      </div>
                   </div>
                  </div>
              </div>
          )
        
        });
   }

  render() {
    
    return (
      <div className= "container">
        <div className="row" style={{marginBottom:'-30px'}}>
          <div className="col-lg-10 col-sm-10 mt-3">
              <h1 id='title'> List of Pet Types</h1>
          </div>
          <div className="col-lg-2 col-sm-2 mt-5 mb-3">
              <Link to={"/pet-type/add"} className="nav-link btn-success form-control" data-toggle="pill" role="tab" aria-controls="tab5" aria-selected="false">
                <i className="mdi mdi-coin"></i> Add Pet-type
              </Link>
          </div>
        </div>
        
        {this.state.value ? (
            <div style={{marginTop:'-50px'}}>
               {this.state.value.length ? (
              <div class="accordion">
                {this.renderAccordion()}
              </div>): <span>No Pet Found</span>}
            </div>) : <span>Loading pet types ...</span>
        }
    </div>);
  }

}