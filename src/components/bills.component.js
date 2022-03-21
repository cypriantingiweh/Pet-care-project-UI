import React, { Component } from "react";
import PetServicesService from "../services/pet-services.service"


export default class PetBills extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
        value:undefined,
        id:this.props.match.params.id
        };
        this.getBillsforPet();
       
     }

    getBillsforPet() {
        PetServicesService.getAllPetServicesBills(this.state.id).then(
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

     renderTableData() {
      return this.state.value.services.map((services, index) => {
         const { service_name, number_oftimes_per_day, cost, total } = services 
         return (
            <tr key={index}>

               <td>{index}</td>
               <td>{service_name}</td>
               {number_oftimes_per_day !==0 ? <td>{number_oftimes_per_day}</td>: <td> regular </td>}
               
               <td>{cost}</td>
               <td> {this.state.value.number_of_days} </td>
               <td>{total}</td>
            </tr>
         )
      })
   }

   renderHeader(){
     return(<tr>
            <th>SN</th>
            <th>service name</th>
            <th>Number of times/day</th>
            <th>Cost</th>
            <th>Number of day</th>
            <th>Total cost</th>
          </tr>)
   }

     render() {
         return(
            <div className = "container">
                 <h1  >Pet Bills</h1>
                {this.state.value ?
                (
                <div >
                    <p> Pet Name: {this.state.value.Pet_name}</p>
                    <p> Pet Type: {this.state.value.type_name}</p>
                    <p> Pet Birth date: {this.state.value.date_of_birth}</p>
                    <p> Pet weight: {this.state.value.wieght}</p>
                    <p> Number of days: {this.state.value.number_of_days} </p>
                    <p> Enter Date : {this.state.value.enter_date}</p>
                    <p> leaving_date: {this.state.value.leaving_date}</p>
                     <hr />
                     <h4> Services provided to your {this.state.value.type_name} </h4>
                     <table>
                     <thead>
                       {this.renderHeader()}  
                     </thead>
                     <tbody>
                        {this.renderTableData()} 
                     </tbody>
                 </table>
                 <br />
                 <p style ={{fontStyle:'italic'}} >Total services charged for Keeping your {this.state.value.type_name} = {this.state.value.total_service_charge} frs CFA</p>
                 <br />
                </div>): <span>Loading Bills...</span>
                 }   
             </div>
             )
     }
}