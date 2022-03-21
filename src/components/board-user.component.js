import React, { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import './board-user.component.css'


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
        content:response.data
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
         <div className ="">
            <h1 id='title'>List of Pet Owners</h1>
            <div class="container">
              <div class="accordion">
                {this.renderAccordion()}
            </div>
          </div>
        </div>
      )
   }
   
}
