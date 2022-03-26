import React, { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import './board-user.component.css'
import { Link } from "react-router-dom";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: []
    };
  }

  componentDidMount() {
    UserService.getUserBoard().then(
      response => {
         this.setState({
        content:response.data.filter( (ele, ind) => ind === response.data.findIndex( elem => elem.fullnames === ele.fullnames && elem.email === ele.email))
      })
      },
      error => {
        this.setState({
          content:(error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }

   renderAccordion(){

    return this.state.content.map((users, index) => {
        const { id, fullnames, email, phone,pet_name,pet_weight,petdatOfBirth,pettype} = users;  
        return (
          <div class="option">
                <input type="checkbox" id= {id} className="toggle" />
                 <label class="title" for= {id}>{index +1}. {fullnames}
                  </label>
                  <div class="content">
                    <p>Email: {email}  </p>
                    <p> Phone: {phone} </p>
                    <p> Pet name: {pet_name} </p> 
                    <p> Role : Pet Owner </p>
                    <p> Pet type: {pettype} </p>
                    <p> Pet Birth date: {petdatOfBirth} </p>
                    <p> Pet weight: {pet_weight}Kg</p> 
                  </div>
          </div>)
        
        });
   }

      render() {
      return (
          <div className ="container">
            <div className="row" style={{marginBottom:'-30px'}}>
              <div className="col-lg-10 col-sm-10 mt-3">
                  <h1 id='title'> List of pet Owners </h1>
              </div>
              <div className="col-lg-2 col-sm-2 mt-3">
                  <Link to={"/pet-owner/add"} className="nav-link btn-success form-control" data-toggle="pill" role="tab" aria-controls="tab5" aria-selected="false">
                    <i className="mdi mdi-coin"></i>New pet-owner
                  </Link>
              </div>
            </div>
            
            <div class="accordion">
                {this.renderAccordion()}
            </div>
          
        </div>
      )
   }
   
}
