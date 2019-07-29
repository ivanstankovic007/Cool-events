import React from "react";
import "./NewEvent.css";
import logo from "../../assets/images/logo.png";
import { NavLink } from "react-router-dom";

export class NewEvent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      eventname: "",
      eventdate: "",
      eventdescription: "",
      eventlocation: ""
    };

    this.HandleFieldsChange = this.HandleFieldsChange.bind(this);
    this.AddEvent = this.AddEvent.bind(this);
  }

  AddEvent() {
    let newevent = {
      eventname: this.state.eventname,
      eventdate: this.state.eventdate,
      eventdescription: this.state.eventdescription,
      eventlocation: this.state.eventlocation
    };

    fetch("http://localhost:3000/newevent", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newevent)
    })
      .then(res => console.log("EVENT RESULT: ", res))
      .then((res) => window.location.reload(res))
      .catch(err => console.error(err));
  }

  HandleFieldsChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <section id="newEvent_section">
        <div>
          <h1 className="title">New Event</h1>
          <div className="middle_center">
            <div className="login middle_left">
              <div className="product_form">
                <label htmlFor="eventname">Event Name</label>
                <input
                  name="eventname"
                  value={this.state.eventname}
                  onChange={this.HandleFieldsChange}
                  type="text"
                />

                <label htmlFor="eventdate">Event Date</label>
                <input
                  name="eventdate"
                  value={this.state.eventdate}
                  onChange={this.HandleFieldsChange}
                  type="date"
                />

                <label htmlFor="eventdescription">Event Description</label>
                <input
                  name="eventdescription"
                  value={this.state.eventdescription}
                  onChange={this.HandleFieldsChange}
                  type="text"
                />

                <label htmlFor="eventlocation">Event Location</label>
                <input
                  name="eventlocation"
                  value={this.state.eventlocation}
                  onChange={this.HandleFieldsChange}
                  type="text"
                />

                <button onClick={this.AddEvent} className="signin">
                  create event
                </button>
              </div>
            </div>
            <div className="middle_right">
              <span className="product_label">
              <img
              src={logo}
              alt="logo"
              className="logo_circle"
            />
              </span>
              <p id="product_paragraph">You are creating a new event</p>

              <button className="backevents">
            <NavLink id="link_np" to="/events">
            Go back to events
            </NavLink>
          </button>
            </div>
           
          </div>
        </div>
      </section>
    );
  }
}
