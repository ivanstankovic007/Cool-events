import React from "react";
import "../Table/Table.css";
import moment from "moment";


export class Table extends React.Component {
 render() {
    return (
      <section id="table_section">
        <div className="table">
          <table className="table_head">
            <tr>
              <th>Event Name</th>
              <th>Event Date</th>
              <th>Event Description</th>
              <th>Event Location</th>
              <th>Edit/Delete</th>
            </tr>

            {this.props.events.map(event => (
              <tr key={event._id}>
                <td>{event.eventname}</td>
                <td>{moment(event.eventdate).format('DD MMM YYYY')}</td>
                <td>{event.eventdescription}</td>
                <td>{event.eventlocation}</td>
                <td className="buttons_rows">
                  <button onClick={this.props.toEditEvent(event)} className="edit">
                  </button>&nbsp;&nbsp;
                  <button onClick={() => this.props.toggleAlert(event._id)} className="trash" />
                </td>
              </tr>
            ))}
          </table>
        </div>
      </section>
    );
  }
}
