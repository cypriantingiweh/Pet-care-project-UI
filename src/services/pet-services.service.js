import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:5000/api/";

//production
//const API_URL = "https://project-petcare-api.herokuapp.com/api/"

class PetServicesService{

    addPetServices(name,description,cost,pet_type_id) {
        return axios.post(API_URL + "normal_services/register", {
            name,description,cost,pet_type_id
        }, { headers: authHeader() })
        .then(response => {
            return response.data;
        });
    }

    updatePetServices(name,description,cost,pet_type_id,id) {
    return axios.put(API_URL + "normal_services/"+ id, {
       name,description,cost,pet_type_id,id
      }, { headers: authHeader() })
      .then(response => {
        return response.data;
      });
  }

    deletePetServices(id) {
    return axios.delete(API_URL + "normal_services/"+ id, {
        id
      }, { headers: authHeader() })
      .then(response => {
        return response.data;
      });
  }

   getAllPetServices(pet_type_id) {
    return axios.get(API_URL + "normal_services/" + pet_type_id, { headers: authHeader() });
  }

    getAllServices() {
    return axios.get(API_URL + "normal_services/", { headers: authHeader() });
  }
  

    addProvidePetServices(services_id,pet_cage_id,extra_service,number_oftimes_per_day) {
        return axios.post(API_URL + "provide/service", 
          {services_id,pet_cage_id,extra_service,number_oftimes_per_day}
        ,{ headers: authHeader() })
        .then(response => {
            return response.data;
        })
    }

     getAllPetServicesBills(id) {
    return axios.get(API_URL + "provide/service_cost/"+ id, { headers: authHeader() });
  } 
    
}

export default new PetServicesService();