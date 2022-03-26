import axios from "axios";

//const API_URL = "http://localhost:5000/api/user/";

//production
const API_URL = "https://project-petcare-api.herokuapp.com/api/user/"

class AuthService {
  
  login(email, password) {
    return axios.post(API_URL + "login", {
        email,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(fullnames,phone,email,password) {
    return axios.post(API_URL + "register", {
     fullnames,phone,email,password 
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
