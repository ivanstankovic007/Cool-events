import React from "react";
import Axios from "axios";
import logo from "../../assets/images/logo.png";
import "../EditEvent/EditEvent.css"

export class EditEvent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      eventname: "",
      eventdate: "",
      eventdescription: "",
      eventlocation: "",
      event: this.props.location.state.event
    }

    this.EditEvent = this.EditEvent.bind(this);
    this.handleField = this.handleField.bind(this);
  }

  EditEvent() {
    const access_token = localStorage.getItem('access_token')

    Axios.patch('http://localhost:3000/editevent/' + this.state.event._id, this.state.event, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Access-Control-Allow-Origin': '*',
        'mode': 'cors'
      }
    })
      .then(res => {

        this.props.history.push('/events')
      })
      .catch(err => console.log(err))

  }


  handleField(e) {
    let newEditEvent = { ...this.state.event, [e.target.name]: e.target.value };
    this.setState({
      event: newEditEvent
    })
  }


  render() {
    var event = this.state.event
    return (
      <section id="newEvent_section">
        <div>
          <h1 className="title">Edit Event</h1>
          <div className="middle_center">
            <div className="login middle_left">
              <div className="product_form">
                <label htmlFor="fname">Event Name</label>
                <input
                  name="eventname"
                  value={event.eventname}
                  onChange={this.handleField}
                  type="text"
                />

                <label htmlFor="eventdate">Event Date</label>
                <input
                  name="eventdate"
                  value={event.eventdate}
                  onChange={this.handleField}
                  type="date"
                />

                <label htmlFor="eventdescription">Event Description</label>
                <input
                  name="eventdescription"
                  value={event.eventdescription}
                  onChange={this.handleField}
                  type="text"
                />

                <label htmlFor="eventlocation">Event Location</label>
                <input
                  name="eventlocation"
                  value={event.eventlocation}
                  onChange={this.handleField}
                  type="text"
                />
            
                
                <button onClick={this.EditEvent} className="signin">
                  edit event
                </button>
              </div>
            </div>
            <div className="middle_right">
              <span className="event_label">
                <img
                  src={logo}
                  alt="logo"
                  className="logo_circle"
                />
              </span>
              <p id="event_paragraph">You are editing the event</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
