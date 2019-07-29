import React from "react";
import "./Register.css";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";

export class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      phone: "",
      password: ""
    };

    this.HandleFieldsChange = this.HandleFieldsChange.bind(this);
    this.RegisterUser = this.RegisterUser.bind(this);
  }

  RegisterUser() {
    let data = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      username: this.state.username,
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.password
    };

    fetch("http://localhost:3000/register", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => console.log("REGISTER RESULT: ", res))
      .then(() => this.props.history.push("/"))
      .catch(err => console.error(err));
  }

  HandleFieldsChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
    
      <section id="register">
        <div className="logo_evn">
        <img
              src={logo}
              alt="logo"
              className="image_logo"
            />
        </div>
        
        <div className="center add_margin">
          <div className="login">
            <div className="login_form">
              <label htmlFor="fname">First Name</label>
              <input
                name="firstname"
                value={this.state.firstname}
                onChange={this.HandleFieldsChange}
                type="text"
              />

              <label htmlFor="lname">Last Name</label>
              <input
                name="lastname"
                value={this.state.lastname}
                onChange={this.HandleFieldsChange}
                type="text"
              />

              <label htmlFor="username">Username</label>
              <input
                name="username"
                value={this.state.username}
                onChange={this.HandleFieldsChange}
                type="text"
              />

              <label htmlFor="email">E-mail</label>
              <input
                name="email"
                value={this.state.email}
                onChange={this.HandleFieldsChange}
                type="email"
              />

              <label htmlFor="phone">Phone</label>
              <input
                name="phone"
                value={this.state.phone}
                onChange={this.HandleFieldsChange}
                type="number"
              />

              <label htmlFor="password">Password</label>
              <input
                name="password"
                value={this.state.password}
                onChange={this.HandleFieldsChange}
                type="password"
              />

              <button onClick={this.RegisterUser} className="signin">
                register
              </button>
            </div>
            <p>
            Already have an account?
              <NavLink className="paragraph_register" to="/">
                Log in
              </NavLink>
            </p>
          </div>
        </div>
      </section>
    );
  }
}
