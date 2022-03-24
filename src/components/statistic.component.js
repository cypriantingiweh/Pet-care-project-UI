import React,{Component} from "react";
import CageService from "../services/cage.service"


export default class StatisticsComponent extends Component {

  constructor(props) {
        super(props);

        this.state = {
        catStatistics:undefined,
        dogsStatistics:undefined
        };
        this.CatStatistics();
        this.DogsStatistics();
     }


  async  CatStatistics() {
    await CageService.getStatistics(2).then(
      response => {
          this.setState({
              catStatistics:response.data.data
          })
      },
      error => {
          this.setState({
       catStatistics:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
          })
      
      }
    );
  }

 async DogsStatistics(){

    await CageService.getStatistics(1).then(
      response => {
       
        this.setState({
              dogsStatistics:response.data.data
          })
      
      },
      error => {
          this.setState({
          dogsStatistics :
            (error.response && error.response.data) ||
            error.message ||
            error.toString()})
      }
    );

  }
  renderDogStatistics(){
        return (
        <div><div>
            Total Number of cages for dog are {this.state.dogsStatistics.total_spaces } <br />
            Total Number of empty cages for dog are {this.state.dogsStatistics.total_spaces_available}<br />
            Total Number of occupied cages for dog are {this.state.dogsStatistics.ocupy_spaces}
            </div>
        </div>

        )
    }

  renderCatStatistics(){
         return (
        <div>
            <div>
            Total  cages for cats are {this.state.catStatistics.total_spaces} <br />
            Total  empty cages for cats are {this.state.catStatistics.total_spaces_available} <br />
            Total  occupied cages for cats are {this.state.catStatistics.ocupy_spaces}
            </div>
        </div>
    )
  }

   render() {
         return(
            <div>
                
          { this.state.dogsStatistics &&  this.state.catStatistics ?
                (<div >
                 {this.renderCatStatistics()}
                 {this.renderDogStatistics()}
                </div>): <span>Loading Bills...</span>
                 }   
             </div>
        )
     }
}