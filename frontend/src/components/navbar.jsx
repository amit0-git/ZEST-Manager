// // Navbar.js
// import React,{useState} from 'react';
// import styles from './Navbar.module.css'; // Import the CSS module
// //dheerendra

// function Navbar() {

//     // State to manage the visibility of the nav links
//     const [isNavVisible, setNavVisible] = useState(false);

//     // Function to toggle the visibility of the nav links
//     const toggleNav = () => {
//         setNavVisible(!isNavVisible);
//     };


//     return (
//         <header>
//             <nav className={styles.nav}>
//                 <a href="/" className={styles.logo}>
//                     SRMS
//                 </a>

//                 <div className={styles.hamburger} onClick={toggleNav}>
//                     <span className={styles.line}></span>
//                     <span className={styles.line}></span>
//                     <span className={styles.line}></span>
//                 </div>

//                 <div className={`${styles.nav__link} ${isNavVisible ? '' : styles.hide}`}>
//                     <a href="/">Home</a>
//                     <a href="/register">PID</a>
//                     <a href="/tid">TID</a>
//                     <a href="jcLogin">JC Panel</a>
//                     <a href="/admin">Admin</a>
//                     <a href="/barcode">Scan ID</a>
//                     <a href="/logout">Log Out</a>

                    
//                     <input type="text" name="pid" placeholder="Print PID" />
                   
//                 </div>
//             </nav>
//         </header>
//     );
// }

// export default Navbar;
// Navbar.js


// Navbar.js
// Navbar.js
// Navbar.js
// Navbar.js


import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  TextField,
  Divider,
  useMediaQuery,
  Button,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles'; // Import useTheme

function Navbar() {
  const theme = useTheme(); // Get the theme
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const navLinks = [
    { text: 'Home', path: '/' },
    { text: 'PID', path: '/register' },
    { text: 'TID', path: '/tid' },
    { text: 'JC Panel', path: '/jcLogin' },
    { text: 'Admin', path: '/admin' },
    { text: 'Scan ID', path: '/barcode' },
    { text: 'Log Out', path: '/logout' },
  ];

  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Use the theme for breakpoints

  return (
    <header>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            SRMS
          </Typography>
          {isMobile ? (
            <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          ) : (
            <Box display="flex" alignItems="center">
              {navLinks.map((link, index) => (
                <Button key={index} color="inherit" href={link.path}>
                  {link.text}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <div
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {navLinks.map((link, index) => (
              <ListItem button key={index} component="a" href={link.path}>
                <ListItemText primary={link.text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Print PID"
            style={{ margin: '16px' }}
          />
        </div>
      </Drawer>
    </header>
  );
}

export default Navbar;