import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure to import axios for API calls
import styles from "./participationDash.module.css";

const ParticipationSummary = () => {
  const [individualEvents, setIndividualEvents] = useState([]); // State for individual event participation
  const [teamEvents, setTeamEvents] = useState([]); // State for team event participation

  
  //get the email from the localstorage 
  const email=localStorage.getItem("userEmail");
  const pid=localStorage.getItem("pid");


  // Fetch individual event participation
  useEffect(() => {


    const fetchIndividualEvents = async () => {
      try {
        const response = await axios.post('/api/events/individualParticipation', {email:email},{ withCredentials: true });
        console.log("response:",response.data.data.events)
        //set the events array from  the response
  
        setIndividualEvents(response.data.data.events); // Assuming response.data is an array of individual events

      } catch (error) {
        console.error('Error fetching individual events:', error);
      }
    };





    fetchIndividualEvents();
  }, []); // Empty dependency array means this runs once on component mount

  // Fetch team event participation
  useEffect(() => {
    const fetchTeamEvents = async () => {
      try {
        const response = await axios.post('/api/events/teamParticipation', {email:email},{ withCredentials: true });
        console.log(response.data.data)
       
        setTeamEvents(response.data.data); // Assuming response.data is an array of team events

      } catch (error) {
        console.error('Error fetching team events:', error);
      }
    };

    fetchTeamEvents();
  }, []); // Empty dependency array means this runs once on component mount

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
            {individualEvents.map((item,index) => (
              <tr key={index}>
                <td>{pid}</td><td>{item}</td>
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
                <td>{item.name}</td>
                <td>{item.actual_members.join(', ')}</td> {/* Assuming members is an array */}
                <td>
                  <button onClick={() => handleDelete(item.tid)}>X</button>
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