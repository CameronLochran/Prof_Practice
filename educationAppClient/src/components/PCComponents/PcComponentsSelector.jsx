import React from 'react';
import { Link } from 'react-router-dom';
import ScoreCard from '../ScoreCard'; // Reusable component to display latest & best scores
import "./PcComponentsSelect.css";    // Styles specific to this selector page

// Functional component for selecting the quiz mode for PC Components category
const PcComponentsSelector = () => {
  return (
    <div className='pc-components-mode-selector'>
        {/* Main Heading */}
        <h1 className="pc-components-mode-h1">Select PC Components Quiz Mode</h1>

        {/* Mode Selection Buttons */}
        <div className="pc-components-mode-buttons">
            {/* Normal Mode Link */}
            <Link to="/pccomponents">
              <button className="pc-components-mode-button">Normal Mode</button>
            </Link>
            <br /><br /><br />

            {/* Hard Mode Link */}
            <Link to="/pccomponentshard">
              <button className="pc-components-mode-button">Hard Mode</button>
            </Link>
            <br /><br /><br />
        </div>

        {/* ScoreCard showing latest and best score */}
        <div className="score-row">
            <ScoreCard 
              data={{ 
                latest: localStorage.getItem("pccomponentsLatestScore"), 
                best: localStorage.getItem("pccomponentsBestScore") 
              }} 
              className="pccomponents-score"
            />
        </div>

        {/* Back Button to return to the main category selection */}
        <Link to="/categorySelection">
            <button className="back-button">Back to Categories</button>
        </Link>
    </div>
  );
};

export default PcComponentsSelector;
