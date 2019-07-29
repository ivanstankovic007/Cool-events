import React from "react";
import "./Login.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/images/logo.png";


export class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.HandleFieldsChange = this.HandleFieldsChange.bind(this);
    this.logIn = this.logIn.bind(this);
  }


  logIn(e) {
    e.preventDefault()
    axios.post('http://localhost:3000/', {
      email: this.state.email,
      password: this.state.password
    }
    ).then(res => {
      localStorage.setItem("access_token", res.data.access_token)
      this.props.history.push("/events")
    })
      .catch(err => {
        localStorage.removeItem("access_token")
        this.props.history.push("/")
      })
  }

  HandleFieldsChange(e) {
    this.setState({
        [e.target.name]: e.target.value
    })
}

  render() {
    return (
      <section id="login">
        <div className="logo_evn">
        <img
              src={logo}
              alt="logo"
              className="image_logo"
            />
        </div>
        <div className="center">
          <div>
            <form className="login_form">
            <label htmlFor="email">E-mail</label>
              <input name="email" onChange={e => this.HandleFieldsChange(e)} value={this.state.email} id="email" type="email" className="input" />

              <label htmlFor="password">Password</label>
              <input name="password" onChange={e => this.HandleFieldsChange(e)} value={this.state.password} id="password" type="password" />

              <button onClick={this.logIn} className="signin">log in</button>
            </form>
            <p>
              Or if you don't have an account,
              <NavLink className="paragraph_register" to="/Register">
                Register
              </NavLink>
            </p>
          </div>
        </div>
      </section>
    );
  }
}
