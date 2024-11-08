

import styles from "./individualEvent.module.css"

import React from 'react';

const SoloEvents = () => {
  return (
    <div className="wrapper">
      <h1>Solo Events</h1>
      <table>
        <tbody>
          <tr>
            <td>Email</td>
            <td>root.avanti@gmail.com</td>
          </tr>
          <tr>
            <td>PID</td>
            <td>Pxyz</td>
          </tr>
        </tbody>
      </table>
      <div className="eventsSection">
        <table>
          <tbody>
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                <td>
                  <input
                    type="checkbox"
                    id={`option${rowIndex * 2 + 1}`}
                    name="options"
                    value={`Option ${rowIndex * 2 + 1}`}
                  />
                  <label htmlFor={`option${rowIndex * 2 + 1}`}>Option {rowIndex * 2 + 1}</label>
                </td>
                <td>
                  <input
                    type="checkbox"
                    id={`option${rowIndex * 2 + 2}`}
                    name="options"
                    value={`Option ${rowIndex * 2 + 2}`}
                  />
                  <label htmlFor={`option${rowIndex * 2 + 2}`}>Option {rowIndex * 2 + 2}</label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="errorStatus">Successfully Registered!</div>
      <button onClick={() => alert('Successfully Registered!')}>Save</button>
    </div>
  );
};

export default SoloEvents;