

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure to import axios for API calls
import styles from './participationDash.module.css';
import { Helmet } from 'react-helmet';


const ParticipationSummary = () => {
  const [individualEvents, setIndividualEvents] = useState([]); // State for individual event participation
  const [teamEvents, setTeamEvents] = useState([]); // State for team event participation

  const email = localStorage.getItem("userEmail");
  const pid = localStorage.getItem("pid");

  // Fetch individual event participation
  useEffect(() => {
    const fetchIndividualEvents = async () => {
      try {
        const response = await axios.post('/api/events/individualParticipation', { email }, { withCredentials: true });
        setIndividualEvents(response.data.data.events); // Assuming response.data is an array of individual events
      } catch (error) {
        console.error('Error fetching individual events:', error);
      }
    };

    fetchIndividualEvents();
  }, [email]); // Fetch data when the email changes

  // Fetch team event participation
  useEffect(() => {
    const fetchTeamEvents = async () => {
      try {
        const response = await axios.post('/api/events/teamParticipation', { email }, { withCredentials: true });
        setTeamEvents(response.data.data); // Assuming response.data is an array of team events
      } catch (error) {
        console.error('Error fetching team events:', error);
      }
    };

    fetchTeamEvents();
  }, [email]); // Fetch data when the email changes

  return (
    <div className={styles.participationWrapper}>
        <Helmet>
                <title>Participation</title>
              
            </Helmet>
      <h1 className={styles.title}>Total Participation</h1>

      {/* Individual Events Section */}

      <div className={styles.cardTitle}>Individual Event</div>
      <div className={styles.cardWrapper}>
        <div className={styles.card}>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>PID</th>
                <th>Event</th>
              </tr>
            </thead>
            <tbody>
              {individualEvents.length > 0 ? (
                individualEvents.map((item, index) => (
                  <tr key={index}>
                    <td>{pid}</td>
                    <td>{item}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No individual events found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Team Events Section */}
      <div className={styles.cardTitle}>Team Event</div>
      <div className={styles.cardWrapper}>
        <div className={styles.card}>
         
          <table className={styles.table}>
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
              {teamEvents.length > 0 ? (
                teamEvents.map((item, index) => (
                  <tr key={index}>
                    <td>{item.tid}</td>
                    <td>{item.event}</td>
                    <td>{item.name}</td>
                    <td>{item.actual_members.join(', ')}</td>
                    <td>
                      <button className={styles.deleteBtn} onClick={() => handleDelete(item.tid)}>
                        X
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No team events found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ParticipationSummary;
