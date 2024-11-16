import React, { useState ,useEffect} from 'react';
import styles from "./userLogin.module.css"
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";

import { Helmet } from 'react-helmet';
function UserLogin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [captchaValue, setCaptchaValue] = useState(null); // State for captcha value

    const navigate = useNavigate();


    // Function to handle CAPTCHA change
    const onCaptchaChange = (value) => {
        setCaptchaValue(value); // Update captcha value state
        console.log("Login Captcha :", value);
    };


    // This function can be used to update the message based on login status
    const handleLogin = async (e) => {

        e.preventDefault();

        try {
            const response = await axios.post('/api/users/login', { email, password, captchaValue }, { withCredentials: true });

            console.log(response.data)

            //if successfull login
            //redirect to student register page 
            if (response.data) {

                    navigate("/profile")
            }

          
            setMessage('Logged in successfully!');

        } catch (error) {
            console.log(error);
            const message = error.response && error.response.data ? error.response.data.message : 'An error occurred';
            setMessage(message);

        }
    };


       //clear messgae after 10 sec

       useEffect(() => {
        let timer;
        if (message) {
          timer = setTimeout(() => {
            setMessage('');
          }, 10000); // 20 seconds
        }
        return () => clearTimeout(timer); // Cleanup the timer on unmount or when errorMessage changes
      }, [message]);

    return (
        
        <div id={styles.wrapper}>
              <Helmet>
                <title>Sign In</title>
             
            </Helmet>
            <div id={styles.formWrapper}>
                <img src="/assets/user.png" alt="" id={styles.user} />
                <h1>User Login</h1>

                <form onSubmit={handleLogin}>
                    <label htmlFor="username">Email</label>
                    <input type="email" name="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />


                    <ReCAPTCHA
                        sitekey="6LfA1XMqAAAAAMyb8tNCQraolBom5ZlxmflnYoDZ" // Replace with your site key
                        onChange={onCaptchaChange}
                    />
                    <button type="submit">Login</button>
                </form>


                <div><NavLink className={styles.createAcc} to="/signup" >Don't have an account? Register here</NavLink></div>
            </div>

            {message && (
                <div className={styles.errorMessage}>
                    {message}
                </div>
            )}
        </div>
    );

}

export default UserLogin;