import React, { useState } from 'react';
import styles from "./teamEvent.module.css";

const CreateTeam = () => {
  const [event, setEvent] = useState('Event1');
  const [teamName, setTeamName] = useState('');
  const [pid, setPid] = useState('');
  const [members, setMembers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddMember = () => {
    if (pid) {
      // Example: Add member with hardcoded name and branch
      const newMember = {
        pid: pid,
        name: 'Amit Verma', // In a real application, you would fetch this data
        branch: 'CSE', // Example branch
      };
      setMembers([...members, newMember]);
      setPid('');
      setErrorMessage('Successfully Added');
    } else {
      setErrorMessage('Please enter a PID');
    }
  };

  const handleDeleteMember = (pidToDelete) => {
    setMembers(members.filter(member => member.pid !== pidToDelete));
  };

  const handleSubmit = () => {
    // Handle team saving logic here
    console.log('Team saved with the following members:', members);
  };

  return (
    <div className="teamWrapper">
      <div className="upper1">
        <table>
          <tbody>
            <tr>
              <td>Create Team</td>
            </tr>
            <tr>
              <td>Select Event</td>
              <td>
                <select
                  name="eventSelect"
                  value={event}
                  onChange={(e) => setEvent(e.target.value)}
                >
                  <option value="Event1">Event 1</option>
                  <option value="Event2">Event 2</option>
                  <option value="Event3">Event 3</option>
                  <option value="Event4">Event 4</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Team Name</td>
              <td>
                <input
                  type="text"
                  name="team_name"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="upper2">
        <h3>Add Members in Your Team</h3>
        <label htmlFor="">Add PID</label><br />
        <input
          type="text"
          value={pid}
          onChange={(e) => setPid(e.target.value)}
          placeholder="PID"
        />
        <button onClick={handleAddMember}>Add</button>

        {errorMessage && <div className="errorStatus">{errorMessage}</div>}

        <table>
          <thead>
            <tr>
              <th>PID</th>
              <th>Name</th>
              <th>Branch</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={index}>
                <td>{member.pid}</td>
                <td>{member.name}</td>
                <td>{member.branch}</td>
                <td>
                  <button onClick={() => handleDeleteMember(member.pid)}>X</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={handleSubmit}>Save Team</button>
    </div>
  );
};

export default CreateTeam;