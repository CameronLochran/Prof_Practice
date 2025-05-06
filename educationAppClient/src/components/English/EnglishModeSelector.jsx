// Import necessary libraries and components
import React from 'react';
import { Link } from 'react-router-dom'; // Used for navigation between routes
import ScoreCard from '../ScoreCard'; // Component to display the latest and best score
import './EnglishModeSelect.css'; // Import CSS for styling this component

// Functional component for selecting the English quiz mode
const EnglishModeSelector = () => {
  return (
    <div className='english-mode-selector'> {/* Container with background and layout styling */}
      
      {/* Heading for the quiz mode selection page */}
      <h1 className="english-mode-h1">Select English Quiz Mode</h1>
      <br /><br />

      {/* Buttons to select between Normal and Hard quiz modes */}
      <div className="english-mode-buttons">
        <Link to="/englishquiz">
          <button className="english-mode-button">Normal Mode</button>
        </Link>
        <br /><br /><br />
        <Link to="/englishquizhard">
          <button className="english-mode-button">Hard Mode</button>
        </Link>
        <br /><br /><br />
      </div>

      {/* Display of the latest and best scores using ScoreCard component */}
      <div className="score-row">
        <ScoreCard
          data={{
            latest: localStorage.getItem("englishLatestScore"),
            best: localStorage.getItem("englishBestScore")
          }}
          className="software-score" // (Optional) Class name used for styling this specific score display
        />
      </div>

      {/* Link to return to the category selection page */}
      <Link to="/categorySelection">
        <button className="back-button">Back to Categories</button>
      </Link>
    </div>
  );
}

// Export the component to be used in the app
export default EnglishModeSelector;
