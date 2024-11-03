// Navbar.js
import React,{useState} from 'react';
import styles from './Navbar.module.css'; // Import the CSS module

function Navbar() {

    // State to manage the visibility of the nav links
    const [isNavVisible, setNavVisible] = useState(false);

    // Function to toggle the visibility of the nav links
    const toggleNav = () => {
        setNavVisible(!isNavVisible);
    };


    return (
        <header>
            <nav className={styles.nav}>
                <a href="/" className={styles.logo}>
                    SRMS
                </a>

                <div className={styles.hamburger} onClick={toggleNav}>
                    <span className={styles.line}></span>
                    <span className={styles.line}></span>
                    <span className={styles.line}></span>
                </div>

                <div className={`${styles.nav__link} ${isNavVisible ? '' : styles.hide}`}>
                    <a href="/">Home</a>
                    <a href="/register">PID</a>
                    <a href="/tid">TID</a>
                    <a href="jcLogin">JC Panel</a>
                    <a href="/admin">Admin</a>
                    <a href="/barcode">Scan ID</a>
                    <a href="/logout">Log Out</a>

                    
                    <input type="text" name="pid" placeholder="Print PID" />
                   
                </div>
            </nav>
        </header>
    );
}

export default Navbar;