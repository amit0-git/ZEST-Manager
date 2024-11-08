import React from 'react';
import styles from "./participationDash.module.css"


const ParticipationSummary = () => {
  // Sample data for demonstration
  const individualEvents = [
    { pid: 'P123', event: 'Solo Dance' },
    { pid: 'P123', event: 'Solo Dance' },
    { pid: 'P123', event: 'Solo Dance' },
    { pid: 'P123', event: 'Solo Dance' },
  ];

  const teamEvents = [
    { tid: 'T123', event: 'Group Dance', teamName: 'Michel', members: 'P123, P145, P46' },
    { tid: 'T124', event: 'Group Dance', teamName: 'Michel', members: 'P123, P145, P46' },
    { tid: 'T125', event: 'Group Dance', teamName: 'Michel', members: 'P123, P145, P46' },
  ];

  return (
    <div className="participationWrapper">
      <h1>Total Participation</h1>

      <div className="individual">
        <h2>Individual Event</h2>
        <table>
          <thead>
            <tr>
              <th>PID</th>
              <th>Event</th>
            </tr>
          </thead>
          <tbody>
            {individualEvents.map((item, index) => (
              <tr key={index}>
                <td>{item.pid}</td>
                <td>{item.event}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="team">
        <h2>Team Event</h2>
        <table>
          <thead>
            <tr>
              <th>TID</th>
              <th>Event</th>
              <th>Team Name</th>
              <th>Members</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {teamEvents.map((item, index) => (
              <tr key={index}>
                <td>{item.tid}</td>
                <td>{item.event}</td>
                <td>{item.teamName}</td>
                <td>{item.members}</td>
                <td>
                  <button>X</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ParticipationSummary;