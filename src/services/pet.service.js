import axios from 'axios';
import authHeader from './auth-header';

//const API_URL = "http://localhost:5000/api/pet/";

//production
const API_URL = "https://project-petcare-api.herokuapp.com/api/pet/"

class PetService{

    addPets(name,wieght,date_of_birth,pet_type_id,note,Users_id) {
        return axios.post(API_URL + "register", {
            name,wieght,date_of_birth,pet_type_id,note,Users_id
        }, { headers: authHeader() })
        .then(response => {
            return response.data;
        });
    }

  updatePets(name,wieght,date_of_birth,pet_type_id,note,id) {
    return axios.put(API_URL + id, {
       name,wieght,date_of_birth,pet_type_id,note,id
      }, { headers: authHeader() })
      .then(response => {
        return response.data;
      });
  }

    deletePets(id) {
    return axios.delete(API_URL + id, {
        id
      }, { headers: authHeader() })
      .then(response => {
        return response.data;
      });
  }

    cageInPets(Pet_id,cage_id,number_of_days,leaving_date) {
        return axios.post(API_URL + "cage_in", {
            Pet_id,cage_id,number_of_days,leaving_date
        }, { headers: authHeader() })
        .then(response => {
            return response.data;
         });
    }
///api/pet/out/:id
       cageOutPets(id) {
        return axios.post(API_URL + "out/" + id, {
            id
        }, { headers: authHeader() })
        .then(response => {
            return response.data;
         });
    }

   getAllSignInPetOfType(pet_type_id) {
    return axios.get(API_URL + pet_type_id, { headers: authHeader() });
  }
    
}

export default new PetService();