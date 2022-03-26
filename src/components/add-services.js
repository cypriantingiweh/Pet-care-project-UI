import React, {Component} from "react";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { isEmail } from "validator";
import AuthService from "../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const fullnames = value => {
  if (value.length < 3 || value.length > 30) {
    return (
      <div className="alert alert-danger" role="alert">
        The fullnames must be between 3 and 20 characters.
      </div>
    );
  }
};

const phone = value => {
  if (value.length < 9 || value.length > 12) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export default class AddServices extends Component {
    constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeFullnames = this.onChangeFullnames.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);

    this.state = {
      fullnames: "",
      email: "",
      phone: "",
      successful: false,
      message: "",
      insertedId: undefined
    };
  }

  onChangeFullnames(e) {
    this.setState({
      fullnames: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePhone(e) {
    this.setState({
      phone: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();
    const password = this.state.phone;

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(this.state.fullnames,this.state.phone,this.state.email,password).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true,
            insertedId:response.data.data.insertId
          });
            this.props.history.push(`/pet/add?userId=${this.state.insertedId}&message=${this.state.message}&successful=${this.state.successful}`);
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage,
            insertedId:error.response.data.data.id
          });
          if(this.state.message ==="Pet Owner details already Exist.Go ahead to add Pet(s)") {
             this.props.history.push(`/pet/add?userId=${this.state.insertedId}&message=${this.state.message}&successful=${this.state.successful}`);
            }
        }
      );
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="container">
           
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />
         <h1 id='title'>Please add Pet Owner Details</h1>
          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="fullnames">FullNames</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="fullnames"
                    value={this.state.fullnames}
                    onChange={this.onChangeFullnames}
                    validations={[required, fullnames]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <Input
                    type="number"
                    className="form-control"
                    name="phone"
                    value={this.state.phone}
                    onChange={this.onChangePhone}
                    validations={[required, phone]}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Next</button>
                </div>
              </div>
            )}
          </Form>
        </div>
      </div>
    );
  }

}