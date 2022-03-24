import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:5000/api/pet_type";

//production
//const API_URL = "https://project-petcare-api.herokuapp.com/api"

class PetTypeService{

    addPetType(type_name) {
        return axios.post(API_URL + "/register", {
            type_name
        }, { headers: authHeader() })
        .then(response => {
            return response.data;
        });
    }

    updatePetType(type_name,id) {
    return axios.put(API_URL + "/"+ id, {
       type_name
      }, { headers: authHeader() })
      .then(response => {
        return response.data;
      });
  }

    deletePetType(id) {
    return axios.delete(API_URL + "/"+ id, {
        id
      }, { headers: authHeader() })
      .then(response => {
        return response.data;
      });
  }

   getAllPetType() {
    return axios.get(API_URL, { headers: authHeader() });
  }
}
export default new PetTypeService();