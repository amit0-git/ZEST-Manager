import styles from "./individualEvent.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from 'react';

const SoloEvents = () => {


  const userEmail = localStorage.getItem('userEmail');
  const pid = localStorage.getItem("pid");
  console.log(userEmail, pid);


  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [resStatus, setResponse] = useState("");


  //get all the individual events and display on the page 
  const fetchEvents = async () => {
    try {
      const response = await axios.post("/api/events/getSoloEvents");
      setEvents(response.data);

      console.log(response.data)

    } catch (error) {
      setError("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    //load individual elements and display on the page
    fetchEvents();
  }, []);


  //get solo events and fill the checkbox for participated events 


  async function getParticipatedEvents() {
    try {

      const email = localStorage.getItem("userEmail");

      const response = await axios.post("/api/events/individualParticipation", {
        email: email
      }, {
        withCredentials: true
      })

      console.log("already participated:", response.data.data.events)
      //set the checkbox if the user has already participated in the event
      setSelectedOptions(response.data.data.events);

    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getParticipatedEvents()
  }, [])






  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((option) => option !== value)
        : [...prevSelected, value]
    );
  };


  //save individual events to  database
  async function saveIndividualEvents() {
    try {

      const response = await axios.post("/api/events/saveSoloEvents", {
        data: selectedOptions
      }, { withCredentials: true })
      console.log(response.data)
      setResponse(response.data.message);
      alert("Events saved successfully");

    }
    catch (error) {
      console.log(error)
      setResponse(error.response.data.message)

    }
  }


  const handleSubmit = async () => {
    await saveIndividualEvents();

  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="wrapper">
      <h1>Solo Events</h1>
      <table>
        <tbody>
          <tr>
            <td>Email</td>
            <td>{userEmail}</td>
          </tr>
          <tr>
            <td>PID</td>
            <td>{pid}</td>
          </tr>
        </tbody>
      </table>
      <div className="eventsSection">
        <table>
          <tbody>
            {events.map((event, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    id={`option${index}`}
                    name="options"
                    value={event.event} // Unique value
                    checked={selectedOptions.includes(event.event)} // Check against the unique value
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor={`option${index}`}>{event.event}</label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="errorStatus">{resStatus}</div>
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
};

export default SoloEvents;