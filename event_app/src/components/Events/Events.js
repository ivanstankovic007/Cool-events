import React from "react";
import "./Events.css";
import { NavLink } from "react-router-dom";
import { Table } from "../Table/Table";
import logo from "../../assets/images/logo.png";

export class Events extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      error: {
        show: false,
        errorMsg: ""
      },
      isHidden: true,
      selectedId: {}
    };

    this.FetchEvents = this.FetchEvents.bind(this);
    this.DeleteEvent = this.DeleteEvent.bind(this);
    this.toggleAlert = this.toggleAlert.bind(this);
    this.toEditEvent = this.toEditEvent.bind(this);
    this.eventFilter = this.eventFilter.bind(this);
  }

  componentDidMount() {
    this.FetchEvents();
  }

  FetchEvents() {
    var access_token = localStorage.getItem("access_token")
    if (!access_token) {
      this.props.history.push("/")
    }

    fetch("http://localhost:3000/events", {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Access-Control-Allow-Origin': '*',
        'mode': 'no-cors'
      }
    })
      .then(res => {
        return res.json();
      })
      .then(res => this.setState({
        events: res
      }))
      .catch(err => {
        this.setState(state => {
          return {
            error: {
              ...state.error,
              show: true,
              errorMsg: err
            }
          };
        });
      });
  }


  toEditEvent = (event) => () => {
    this.props.history.push('/editevent', { event });
  }


  toggleAlert(id) {
    this.setState(
      state => {
        return {
          isHidden: !state.isHidden,
          selectedId: id
        };
      },
      () => {
        console.log("IS HIDDEN: ", this.state.isHidden);
      }
    );
  }


  DeleteEvent(id) {
    fetch("http://localhost:3000/events/" + id, {
      method: "DELETE"
    })
      .then(res => {
        return res.json();
      })
      .then(res => {

        this.setState({
          product: res,
          isHidden: true
        });

      })
      .then((res) => window.location.reload(res))
      .catch(err => {
        this.setState(state => {
          return {
            error: {
              ...state.error,
              show: true,
              errorMsg: err
            }
          };
        });
      });
  }

  eventFilter(e) {
    var type = e.target.value;
    var events = this.state.events;


    if (type === "latestPurchase") {
      this.setState({
        events: events.sort((x, y) => {
          if (x.eventdate >= y.eventdate) {
            return -1;
          } else {
            return 1;
          }
        })
      })
    }
  }

  render() {
    console.log(this.state);
    return (
      <section id="events_section">
        <div className="logo_evn">
          <img
            src={logo}
            alt="logo"
            className="image_logo"
          />
        </div>
        <div className="logoutdiv">
        <button className="logout" onClick={() => {
            localStorage.removeItem("access_token")
            this.props.history.push("/");

          }}>LOG OUT</button>
        </div>
        <div className="product_top">
          <div>
            <h1 className="title">Events</h1>
          </div>

          <div className="filter_events">
            <select className="select_events" onChange={this.eventFilter}>
              <option value="0"></option>
              <option value="latestPurchase">Latest Events</option>
            </select>
          </div>
          <p className="filter">Filter by:</p>
        </div>
        <Table events={this.state.events} toggleAlert={this.toggleAlert} toEditEvent={this.toEditEvent} />

        <div className="buttons_bottom">
          <button className="new_product">
            <NavLink id="link_np" to="/newevent">
              Add new Event
            </NavLink>
          </button>
        </div>

        {!this.state.isHidden ? (
          <div className="alert">
            <div className="white_box">
              <h1>Delete Event</h1>
              <p>
                You are about to delete this event. Are you sure you wish to
                continue?
              </p>
              <br />
              <div className="buttons_alert">
                <button onClick={this.toggleAlert} className="cancel">
                  cancel
                </button>
                <button
                  onClick={() => this.DeleteEvent(this.state.selectedId)}
                  className="delete"
                >
                  delete
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    );
  }
}
