import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import Pets from "./components/pets.component";
import Cage from "./components/cage.component";
import AddPets from "./components/add-pet.component";
import PetBills from "./components/bills.component";
import SignInPet from "./components/sign-in-pet.component"
import AddPetOwner from "./components/add-pet-owner";
import ProvideService from "./components/provide-service.component";

import pic from "./assets/images/pet-log.jpg"

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.role === "SUPER",
        showAdminBoard: user.role ==="SUPER",
      });
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            <img src ={pic} alt ="logo" width ="20px" height ="25px" />
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.user.email}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>


    <div className="ml-5 mr-5">
      <div className="row">
       {currentUser ? (<div className="col-lg-2 mt-5">
            <div className="nav nav-pills faq-nav" id="faq-tabs" role="tablist" aria-orientation="vertical">
                <Link  to={"/home"}  className="nav-link active" data-toggle="pill" role="tab" aria-controls="tab1" aria-selected="true">
                    <i className="mdi mdi-help-circle"></i> Home
                </Link>
                <Link to={"/profile"} className="nav-link" data-toggle="pill" role="tab" aria-controls="tab2" aria-selected="false">
                    <i className="mdi mdi-account"></i> Profile
                </Link>
                <Link to={"/user"}  className="nav-link" data-toggle="pill" role="tab" aria-controls="tab3" aria-selected="false">
                    <i className="mdi mdi-account-settings"></i> Pet Owners
                </Link>
                <Link to={"/cage"} className="nav-link" data-toggle="pill" role="tab" aria-controls="tab4" aria-selected="false">
                    <i className="mdi mdi-heart"></i>All Cages
                </Link>
                <Link to={"/pets"} className="nav-link" data-toggle="pill" role="tab" aria-controls="tab5" aria-selected="false">
                    <i className="mdi mdi-coin"></i> Pets
                </Link>
                {/* to be remove when flow adjusted */}
                <Link to={"/pet-owner/add"} className="nav-link" data-toggle="pill" role="tab" aria-controls="tab5" aria-selected="false">
                    <i className="mdi mdi-coin"></i> Add pet Owner
                </Link>
              </div>
            </div>):null}
            { !currentUser ? 
            (<div className="container" >
              <Switch>
                <Route exact path={["/", "/home"]} component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
              </Switch>
            </div> ) :
            (<div className="col-lg-10 col-sm-12">
              <div className="tab-content" id="faq-tab-content">
                  <div className="tab-pane show active">
                    <div className="accordion" id="accordion-tab-1">
                        <div className="card">
                                <Switch>
                                  <Route exact path={["/", "/home"]} component={Home} />
                                  <Route exact path="/profile" component={Profile} />
                                  <Route path="/user" component={BoardUser} />
                                  <Route exact path="/pets" component={Pets} />
                                  <Route path="/cage" component={Cage} />
                                  <Route path="/pet/add" component={AddPets} />
                                  <Route path ="/pets/bills/:id" component ={PetBills} />
                                  <Route path ="/pet-owner/add" component = {AddPetOwner} />
                                  <Route path ="/pet/signin" component = {SignInPet} />
                                  <Route path ="/pet/provide" component = {ProvideService} />
                                </Switch>
                        </div>
                      </div>
                    </div>
              </div>
            </div>)
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;