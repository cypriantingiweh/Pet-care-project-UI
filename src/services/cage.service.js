import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:4000/api/cage/";

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
      return axios.get("http://localhost:4000/api/statistics/"+ pet_type_id, { headers: authHeader() });
  }
}

export default new CageService();