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
          return setErrorMessage('Member already exists in the team');
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
        return setErrorMessageLast('Please enter a team name');
      }

      //chk if atleast 1 memeber is selected

      if (members.length === 0) {
        return setErrorMessageLast('Please Add Members!');
      }

      //chk if the event is selected

      if (!selectEvent) {
        return setErrorMessageLast('Please select an event');
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
      console.log("team: ",data.message);
      setErrorMessageLast(data.message);


    }


    catch (error) {
      console.log(error);
      setErrorMessageLast(error.response.data.message);
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


// import React, { useEffect, useState } from 'react';
// import {
//   Button,
//   TextField,
//   Select,
//   MenuItem,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   CircularProgress,
//   Snackbar,
//   Paper,
//   AppBar,
//   Toolbar,
//   IconButton,
//   Container,
//   Grid,
// } from '@mui/material';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import CloseIcon from '@mui/icons-material/Close';
// import axios from "axios";

// // Create a custom theme
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#1976d2', // Blue
//     },
//     secondary: {
//       main: '#f50057', // Pink
//     },
//     error: {
//       main: '#d32f2f', // Red
//     },
//   },
// });

// const CreateTeam = () => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectEvent, setSelectEvent] = useState("");
//   const [events, setEvents] = useState([]);
//   const [teamName, setTeamName] = useState('');
//   const [pid, setPid] = useState('');
//   const [members, setMembers] = useState([]);
//   const [pids, setPids] = useState([]);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [errorMessageLast, setErrorMessageLast] = useState('');
//   const [snackbarOpen, setSnackbarOpen] = useState(false);

//   // GET the team events to display from the database 
//   async function getTeamEvents() {
//     try {
//       const response = await axios.post("/api/events/getTeamEvents");
//       setEvents(response.data);
//     } catch (error) {
//       setError("Failed to fetch events");
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     getTeamEvents();
//   }, []);

//   // Function to check if PID exists and add in the table
//   async function checkPID(pid) {
//     try {
//       const response = await axios.post("/api/events/checkPid", { pid });
//       return response.data;
//     } catch (error) {
//       setErrorMessage(error.response.data.message);
//       return null;
//     }
//   }

//   const handleAddMember = async () => {
//     if (pid) {
//       const pidData = await checkPID(pid);
//       if (pidData) {
//         const memberExists = members.some(member => member.pid === pidData.data.pid);
//         if (memberExists) {
//           return setErrorMessage('Member already exists in the team');
//         } else {
//           setMembers([...members, pidData.data]); // Add the new member
//           setPid(''); // Optionally clear the input field
//         }
//       }
//     } else {
//       setErrorMessage('Please enter a PID');
//     }
//   };

//   const handleDeleteMember = (pidToDelete) => {
//     setMembers(members.filter(member => member.pid !== pidToDelete));
//   };

//   useEffect(() => {
//     if (members.length > 0) {
//       const updatedPids = members.map(member => member.pid);
//       setPids(updatedPids);
//     }
//   }, [members]);

//   // Save the team 
//   const handleSubmit = async () => {
//     try {
//       if (!teamName) {
//         return setErrorMessageLast('Please enter a team name');
//       }
//       if (members.length === 0) {
//         return setErrorMessageLast('Please Add Members!');
//       }
//       if (!selectEvent) {
//         return setErrorMessageLast('Please select an event');
//       }

//       const response = await axios.post("/api/events/saveTeam", {
//         name: teamName,
//         event: selectEvent,
//         members: pids
//       }, {
//         headers: {
//           'Content-Type ': 'application/json',
//         },
//       });

//       const data = response.data;
//       setErrorMessageLast(data.message);
//       setSnackbarOpen(true);
//     } catch (error) {
//       setErrorMessageLast(error.response.data.message);
//     }
//   };

//   // Status 
//   if (loading) return <CircularProgress />;
//   if (error) return <Typography color="error">{error}</Typography>;

//   return (
//     <ThemeProvider theme={theme}>
//       <Container component={Paper} elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
//         <AppBar position="static">
//           <Toolbar>
//             <Typography variant="h6" style={{ flexGrow: 1 }}>
//               Create Team
//             </Typography>
//           </Toolbar>
//         </AppBar>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <TextField
//               select
//               label="Select Event"
//               value={selectEvent}
//               onChange={(e) => setSelectEvent(e.target.value)}
//               fullWidth
//               margin="normal"
//               variant="outlined"
//               color="primary"
//             >
//               <MenuItem value="">
//                 <em>Select an Event</em>
//               </MenuItem>
//               {events.map((event, index) => (
//                 <MenuItem key={index} value={event.event}>
//                   {event.event}
//                 </MenuItem>
//               ))}
//             </TextField>
//             <TextField
//               label="Team Name"
//               value={teamName}
//               onChange={(e) => setTeamName(e.target.value)}
//               fullWidth
//               margin="normal"
//               variant="outlined"
//               required
//               color="primary"
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <Typography variant="h6" color="primary">Add Members to Your Team</Typography>
//             <TextField
//               label="Add PID"
//               value={pid}
//               onChange={(e) => setPid(e.target.value)}
//               placeholder="PID"
//               margin="normal"
//               variant="outlined"
//               color="primary"
//               fullWidth
//             />
//             <Button variant="contained" color="secondary" onClick={handleAddMember} style={{ marginTop: '10px' }}>
//               Add
//             </Button>

//             {errorMessage && <Typography color="error">{errorMessage}</Typography>}

//             <TableContainer>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>PID</TableCell>
//                     <TableCell>Name</TableCell>
//                     <TableCell>Branch</TableCell>
//                     <TableCell>Delete</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {members.map((member, index) => (
//                     <TableRow key={index}>
//                       <TableCell>{member.pid}</TableCell>
//                       <TableCell>{member.name}</TableCell>
//                       <TableCell>{member.branch}</TableCell>
//                       <TableCell>
//                         <Button variant="outlined" color="error" onClick={() => handleDeleteMember(member.pid)}>
//                           X
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Grid>

//           {errorMessageLast && <Typography color="error">{errorMessageLast}</Typography>}
//           <Grid item xs={12}>
//             <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: '20px', width: '100%' }}>
//               Save Team
//             </Button>
//           </Grid>
//         </Grid>

//         <Snackbar
//           open={snackbarOpen}
//           autoHideDuration={6000}
//           onClose={() => setSnackbarOpen(false)}
//           message={errorMessageLast}
//           action={
//             <IconButton size="small" aria-label="close" color="inherit" onClick={() => setSnackbarOpen(false)}>
//               <CloseIcon fontSize="small" />
//             </IconButton>
//           }
//         />
//       </Container>
//     </ThemeProvider>
//   );
// };

// export default CreateTeam;