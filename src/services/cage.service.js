import axios from 'axios';
import authHeader from './auth-header';

//local dev
const API_URL = "http://localhost:5000/api/cage/";
const API_Secd = "http://localhost:5000/api/statistics/"

//production
//const API_URL = "https://project-petcare-api.herokuapp.com/api"

class CageService{

    addCage(name,address,height,width,length,pet_type_id) {
        return axios.post(API_URL + "register", {
            name,address,height,width,length,pet_type_id
        }, { headers: authHeader() })
        .then(response => {
            return response.data;
        });
    }

    updateCage(name,address,height,width,length,pet_type_id,id) {
    return axios.put(API_URL + id, {
       name,address,height,width,length,pet_type_id,id
      }, { headers: authHeader() })
      .then(response => {
        return response.data;
      });
  }

    deleteCage(id) {
    return axios.delete(API_URL + id, {
        id
      }, { headers: authHeader() })
      .then(response => {
        return response.data;
      });
  }

   getAllCageOfPetType(pet_type_id) {
    return axios.get(API_URL + pet_type_id, { headers: authHeader() });
  }

  getAllCageOfPetTypeForEmpty(pet_type_id) {
      return axios.get(API_URL + "cage_in-pet/"+  pet_type_id, { headers: authHeader() });
  }

   getStatistics(pet_type_id) {
      return axios.get(API_Secd + pet_type_id, { headers: authHeader() });
  }
}

export default new CageService();