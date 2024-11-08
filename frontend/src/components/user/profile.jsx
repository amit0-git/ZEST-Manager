import React from 'react';
import styles from "./profile.module.css"


const UserProfile = () => {
  return (
    
    <div className="wrapper">
      <h1>Your PID is Pxyz</h1>
      <div className="tableWrapper">
        <table>
          <tbody>
            <tr>
              <td>Email</td>
              <td>root.avanti@gmail.com</td>
            </tr>
            <tr>
              <td>Roll No</td>
              <td>2100140100014</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>Amit Verma</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>7505574391</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>Barkhera</td>
            </tr>
            <tr>
              <td>College</td>
              <td>SRMS CET</td>
            </tr>
            <tr>
              <td>Branch</td>
              <td>CSE</td>
            </tr>
            <tr>
              <td>Year</td>
              <td>4</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h1>Participate In</h1>

      <div className="buttonWrap">
        <button>Edit</button>
        <button>Individual Event</button>
        <button>Team Event</button>
      </div>
    </div>
  );
};

export default UserProfile;