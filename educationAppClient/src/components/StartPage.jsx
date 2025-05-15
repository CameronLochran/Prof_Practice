import React, { useEffect } from 'react';  // Importing React and useEffect hook
import { useNavigate } from 'react-router-dom';  // Importing useNavigate for navigation
import '../styles/StartPage.css';  // Importing custom CSS for styling
import wflslogo from '../../public/wflslogo.png';  // Importing logo image

const StartPage = () => {
  // Initializing the navigate function from the 'react-router-dom' library
  const navigate = useNavigate();

  useEffect(() => {
    // Function to handle keydown events, specifically for 'Ctrl + A' or 'Cmd + A'
    const handleKeyDown = (event) => {
      // Check if the 'Ctrl' or 'Cmd' key is pressed, and if the 'A' key is pressed
      const isCtrlOrCmd = event.ctrlKey || event.metaKey;
      if (isCtrlOrCmd && event.key.toLowerCase() === 'a') {
        event.preventDefault();  // Prevents the default action (selecting all text)
        navigate('/admin');  // Navigates to the admin page
      }
    };

    // Adding the keydown event listener to the window object
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);  // Empty dependency array ensures this effect runs once when the component mounts

  return (
    <main className="welcome">  {/* Main container for the welcome page */}
      <section className="welcometext">
        <center><img src={wflslogo} alt="WFLS Logo" width="400px" height="auto"/></center>
        <br /><br />
          {/* Section for the welcome text */}
        <h1 className='wfls-presents'>WFLS PRESENTS!!!</h1>  {/* Main heading */}
        <a className="enter-link" href="/categorySelection">
          Click here to play  {/* Link to navigate to category selection */}
        </a>
      </section>
    </main>
  );
};

export default StartPage;
