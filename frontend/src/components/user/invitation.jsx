import React, { useState, useEffect } from 'react';
import axios from "axios";
import styles from "./invitation.module.css";

const TeamInvitation = () => {
    const email = localStorage.getItem("userEmail") || "Not Found";
    const [invitations, setInvitations] = useState([]); // State to hold invitation data
    const [status, setStatus] = useState("");


    // Placeholder functions for handling acceptance and rejection
    const handleAccept = async (tid, pid) => {
        //on accept update the verified members and add the pid 
        try {

            const response = await axios.post("/api/events/addVerifiedMember", {
                tid: tid,
                pid: pid
            }, { withCredentials: true })

            console.log("ddd", response.data)
            setStatus(response.data.message)

        }

        catch (error) {
            console.log(error);
            setStatus(error.response.data.message)
        }


    };


    
    const handleReject = async (tid,pid) => {
        // Logic to handle rejection of the invitation
        //on reject simply delete the invitation from the table 
        try {
            const response = await axios.post("/api/events/delInvitation", {
                pid: pid,
                tid:tid
            }, { withCredentials: true })

            console.log(response.data)
            setStatus(response.data.message)

        }
        catch (error) {
            console.log(error)
            setStatus(error.response.data.message)
        }
    };



    // Load data of the invitation sent from the invitation table 
    async function getInvitation(email) {
        try {
            const response = await axios.post("/api/events/getInvitation", {
                email: email
            }, {
                withCredentials: true
            });

            console.log(response.data);
            setInvitations(response.data); // Update state with the fetched data

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getInvitation(email);
    }, [email]); // Ensure to include email in the dependency array

    return (
        <div className="invitationWrap">
            <h1>Team Invitation</h1>
            <div>Email: {email}</div>
            <br />
            <table>
                <thead>
                    <tr>
                        <th>TID</th>
                        <th>Event</th>
                        <th>Team Name</th>
                        <th>Accept</th>
                        <th>Reject</th>
                    </tr>
                </thead>
                <tbody>
                    {invitations.length > 0 ? (
                        invitations.map((invitation) => (
                            <tr key={invitation.tid}>
                                <td>{invitation.tid}</td>
                                <td>{invitation.event}</td>
                                <td>{invitation.team_name}</td>
                                <td>
                                    <button onClick={() => handleAccept(invitation.tid, invitation.pid)}>Y</button>
                                </td>
                                <td>
                                    <button onClick={() => handleReject(invitation.tid, invitation.pid)}>N</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No invitations found.</td>
                        </tr>
                    )}
                </tbody>
            </table>



            {status && (
                <div className={styles.errorMessage}>
                    {status}
                </div>
            )}

        </div>
    );
};



export default TeamInvitation;