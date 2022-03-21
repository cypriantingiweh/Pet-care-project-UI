import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:4000/api/normal_services";
const API_Secd  = "http://localhost:4000/api/provide/"

class PetServicesService{

    addPetServices(name,description,cost,pet_type_id) {
        return axios.post(API_URL + "/register", {
            name,description,cost,pet_type_id
        }, { headers: authHeader() })
        .then(response => {
            return response.data;
        });
    }

    updatePetServices(name,description,cost,pet_type_id,id) {
    return axios.put(API_URL + "/"+ id, {
       name,description,cost,pet_type_id,id
      }, { headers: authHeader() })
      .then(response => {
        return response.data;
      });
  }

    deletePetServices(id) {
    return axios.delete(API_URL + "/"+ id, {
        id
      }, { headers: authHeader() })
      .then(response => {
        return response.data;
      });
  }

   getAllPetServices(pet_type_id) {
    return axios.get(API_URL + "/" + pet_type_id, { headers: authHeader() });
  }


    addProvidePetServices(services_id,pet_cage_id,extra_service,number_oftimes_per_day) {
        return axios.post(API_Secd + "service", 
          {services_id,pet_cage_id,extra_service,number_oftimes_per_day}
        ,{ headers: authHeader() })
        .then(response => {
            return response.data;
        })
    }

     getAllPetServicesBills(id) {
    return axios.get(API_Secd + "service_cost/"+ id, { headers: authHeader() });
  } 
    
}

export default new PetServicesService();