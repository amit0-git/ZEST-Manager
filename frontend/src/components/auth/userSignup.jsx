import React, { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import styles from "./userLogin.module.css"

function UserSignup() {

    const [message, setMessage] = useState('Logged In');

    const [otpStatus, setOtpStatus] = useState(true);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [captchaValue, setCaptchaValue] = useState(null); // State for captcha value



     // Function to handle CAPTCHA change
     const onCaptchaChange = (value) => {
        setCaptchaValue(value); // Update captcha value state
        console.log("Captcha value:", value);
    };


    //fn to signup user
    const signupUser = async (email, password, otp) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, otp, captchaValue })
            });

            const data = await response.json();

            setMessage(data.message);
            setOtpStatus(false);

            console.log(data);

        }
        catch (error) {
            console.error(error);


        }


    }

    //fn to send otp
    const sendOtp = async (email) => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/users/sendOtp', {
                email: email
            });
            console.log("Response from sendOtp:", response.data); // Log the response data
            return response.data; // Return the data
        } catch (error) {

            console.log("Error sending OTP:", error);
            setMessage(error.response.data.message);
        }
    };

    // This function can be used to update the message based on login status
    const handleLogin = async (event) => {
        event.preventDefault();

        if (otpStatus === true) {
            //send  otp to  user
            console.log("OTP Send logic", otpStatus)

            const sendOtp1 = await sendOtp(email);
           

            if (sendOtp1) {

                setMessage(sendOtp1.message);

                setOtpStatus(false);
                console.log("OTP Status Updated:", otpStatus);
            }

        }
        //send signup request

        else {

            //chk if both password match
            if (password !== confirmPassword) {
                setMessage("Password don't match!")
            }

            const signup = await signupUser(email, password, otp);
        }

    };


    return (

        <div id={styles.wrapper}>
            <div id={styles.formWrapper}>
                <img src="/assets/user.png" alt="" id={styles.user} />
                <h1>Create Account</h1>

                <form onSubmit={handleLogin}>
                    <label htmlFor="username">Email</label>
                    <input type="email" name="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} /><br />

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} /><br />

                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" name="password" placeholder="Confirm Password" required onChange={(e) => setConfirmPassword(e.target.value)} /><br />

                    {

                        otpStatus ? "" : <><label htmlFor="otp">Enter OTP</label><input type="number" name="otp" placeholder="Enter OTP" required onChange={(e) => setOtp(e.target.value)} /><br /></>
                    }


                    <br />

                    <ReCAPTCHA
                        sitekey="6LfA1XMqAAAAAMyb8tNCQraolBom5ZlxmflnYoDZ" // Replace with your site key
                        onChange={onCaptchaChange}
                    />
                    <button type="submit">{otpStatus ? "Send OTP" : "Sign Up"}</button>
                </form>
            </div>

            {message && (
                <div className={styles.errorMessage}>
                    {message}
                </div>
            )}
        </div>
    );
}

export default UserSignup;