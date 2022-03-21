import React from "react";
import CageService from "../services/cage.service"


 function  CatStatistics() {
    var catStatistics
    CageService.getStatistics(2).then(
      response => {
        catStatistics = response.data.data
     
        console.log(catStatistics)
      },
      error => {
       catStatistics  =
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
      
      }
    );
    return (
        <div>
            { catStatistics ?(

            <span>
            Total  cages for cats are {catStatistics.total_spaces} <br />
            Total  empty cages for cats are {catStatistics.total_spaces_available} <br />
            Total  occupied cages for cats are {catStatistics.ocupy_spaces}
            </span>): <span>Loading data ...</span> 
            }
        </div>
    )
  }

 function DogsStatistics(){
     var dogsStatistics ;
     CageService.getStatistics(1).then(
      response => {
       
          dogsStatistics = response.data.data
        console.log(dogsStatistics)
      },
      error => {
          dogsStatistics =
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
      }
    );
    console.log(dogsStatistics)
    return (
        <div>
            {dogsStatistics ?(

            <span>
            Total Number of cages for dog are {dogsStatistics.total_spaces} <br />
              Total Number of empty cages for dog are {dogsStatistics.total_spaces_available}<br />
           Total Number of occupied cages for dog are {dogsStatistics.ocupy_spaces}
            </span>): <span>Loading data ...</span> 
            }
        </div>
    )
  }

  export {DogsStatistics, CatStatistics};