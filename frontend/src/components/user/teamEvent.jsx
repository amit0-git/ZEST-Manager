import React, { useEffect, useState } from 'react';
import styles from "./teamEvent.module.css";
import axios from "axios"



const CreateTeam = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [selectEvent, setSelectEvent] = useState("");
  const [events, setEvents] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [pid, setPid] = useState('');

  const [members, setMembers] = useState([]);
  const [pids, setPids] = useState([]);


  const [errorMessage, setErrorMessage] = useState('');

  const [errorMessageLast, setErrorMessageLast] = useState('');


  //GET THe team events to display from the database 
  async function getTeamEvents() {
    try {
      const response = await axios.post("/api/events/getTeamEvents");

      setEvents(response.data);

      console.log(response.data)

    } catch (error) {
      setError("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getTeamEvents();
  }, [])


  //functionto chk pid exists and add in the table
  async function checkPID(pid) {
    try {
      const response = await axios.post("/api/events/checkPid", { pid: pid });
      console.log(response.data)
      return response.data;

    }

    catch (error) {
      console.log("Pid Not Foubd", error)

      setErrorMessage(error.response.data.message);
      return null;
    }
  }

  const handleAddMember = async () => {
    if (pid) {
      const pidData = await checkPID(pid);
      if (pidData) {
        const memberExists = members.some(member => member.pid === pidData.data.pid);

        if (memberExists) {
          setErrorMessage('Member already exists in the team');
        }

        else {
          setMembers([...members, pidData.data]); // Add the new member
          setPid(''); // Optionally clear the input field
          console.log("Members:", [...members, pidData.data]); // Log the updated members

        }
      }




    }

    else {
      setErrorMessage('Please enter a PID');
    }

  };

  const handleDeleteMember = (pidToDelete) => {
    setMembers(members.filter(member => member.pid !== pidToDelete));
  };


  useEffect(() => {
    if (members.length > 0) {
      const updatedPids = members.map(member => member.pid);
      setPids(updatedPids);
    }
  }, [members]);
  //save the team 

  const handleSubmit = async () => {
    // Handle team saving logic here
    try {
      //check if the team name is taken 
      if (!teamName) {
        setErrorMessageLast('Please enter a team name');
      }

      //chk if atleast 1 memeber is selected

      if (members.length === 0) {
        setErrorMessageLast('Please Add Members!');
      }

      //chk if the event is selected

      if (!selectEvent) {
        setErrorMessageLast('Please select an event');
      }

      //save team

     

      const response = await axios.post("/api/events/saveTeam", {
        name: teamName,
        event: selectEvent,
        members: pids
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      }, { withCredentials: true })



      
      const data=response.data;
      console.log(data.message);
      setErrorMessageLast(data.message);


    }


    catch (error) {
      console.log(error);
    }

  };




  //status 
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;


  return (
    <div className="teamWrapper">
      <div className="upper1">
        <table>
          <tbody>
            <tr>
              <td>Create Team</td>
              <td>{selectEvent}</td>
            </tr>
            <tr>
              <td>Select Event</td>
              <td>
                <select
                  name="eventSelect"

                  onChange={(e) => setSelectEvent(e.target.value)}
                >
                  <option value="">Select an Event</option>
                  {events.map((event, index) => (
                    <option key={index} value={event.event}>{event.event}</option> // Assuming event has id and name
                  ))}
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
                  required
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

      {errorMessageLast && <div className="errorStatus">{errorMessageLast}</div>}
      <button onClick={handleSubmit}>Save Team</button>
    </div>
  );
};

export default CreateTeam;