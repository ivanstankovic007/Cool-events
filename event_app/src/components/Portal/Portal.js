import React from "react";
import { Route } from "react-router-dom";
import { Events } from "../Events/Events";
import { NewEvent } from "../NewEvent/NewEvent";
import { EditEvent } from "../EditEvent/EditEvent";

export class Portal extends React.Component {
  render() {
    return (
      <section id="portal">
        <Route path="/events" component={Events} />
        <Route path="/newevent" component={NewEvent} />
        <Route path="/editevent" component={EditEvent} />
      </section>
    );
  }
}
