

import styles from "./individualEvent.module.css"
import { Link } from "react-router-dom";
import axios from "axios"
import React, { useEffect, useState } from 'react';

const SoloEvents = () => {

  //get data to fill the events from events table
  const [events, setEvents] = useState([{ event: "", type: "" }]);
  useEffect(async() => {
    try {
      const response=await axios.post("/api/users")
    }

    catch (error) {
      console.log(error);
    }
  }, [])



  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  // State for selected checkboxes
  const [selectedOptions, setSelectedOptions] = useState([]);


  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setSelectedOptions((prevSelected) => {
      if (prevSelected.includes(value)) {
        return prevSelected.filter((option) => option !== value); // Uncheck
      } else {
        return [...prevSelected, value]; // Check
      }
    });
  };

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