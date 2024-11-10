import React, { useState, useEffect } from 'react';
import axios from "axios";
import styles from "./profile.module.css";

const UserProfile = () => {
  const userEmail = localStorage.getItem('userEmail');
  console.log(userEmail);

  const [data, setData] = useState({
    email: "",
    pid: "",
    rollno: "",
    name: "",
    phone: "",
    address: "",
    college: "",
    branch: "",
    year: ""
  });

  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState(null); // To manage error state

  const fetchData = async (email) => {
    try {
      const response = await axios.post("/api/users/getData", { email: email }, {
        withCredentials: true
      });


      console.log(response.data);
      setData(response.data.data);


    } catch (error) {


      console.log(error);
      setError("Failed to fetch user data."); // Set error message


    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    // Fetch data from backend
    if (userEmail) {
      fetchData(userEmail);
    } else {
      setLoading(false); // If no email, stop loading
      setError("No email found in localStorage."); // Set error message
    }
  }, [userEmail]); // Dependency array includes userEmail

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  return (
    <div className={styles.wrapper}>
      <h1>Your PID is {data.pid || "Not Available"}</h1>
      <div className={styles.tableWrapper}>
        <table>
          <tbody>
            <tr>
              <td>Email</td>
              <td>{data.email || "Not Available"}</td>
            </tr>
            <tr>
              <td>Roll No</td>
              <td>{data.rollno || "Not Available"}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>{data.name || "Not Available"}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>{data.phone || "Not Available"}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>{data.address || "Not Available"}</td>
            </tr>
            <tr>
              <td>College</td>
              <td>{data.college || "Not Available"}</td>
            </tr>
            <tr>
              <td>Branch</td>
              <td>{data.branch || "Not Available"}</td>
            </tr>
            <tr>
              <td>Year</td>
              <td>{data.year || "Not Available"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h1>Participate In</h1>

      <div className={styles.buttonWrap}>
        <button>Edit</button>
        <button>Individual Event</button>
        <button>Team Event</button>
      </div>
    </div>
  );
};

export default UserProfile;