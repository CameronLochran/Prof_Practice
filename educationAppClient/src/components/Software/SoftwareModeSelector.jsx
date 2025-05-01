import React from 'react'; // Importing React library to use JSX and React features
import { Link } from 'react-router-dom'; // Importing Link component for navigation between pages
import ScoreCard from '../ScoreCard'; // Importing the ScoreCard component to display score information
import './SoftwareModeSelect.css'; // Importing the CSS styles for this component

// Functional component for selecting quiz modes (Normal or Hard) in the Software Quiz
const SoftwareModeSelector = () => {
  return (
    <div className='software-mode-selector'>
        {/* Heading of the page */}
        <h1 className="software-h1">Select Software Quiz Mode</h1>
        
        {/* Line breaks for spacing */}
        <br /><br />
        
        <div className="software-mode-buttons">
            {/* Link to Normal Mode quiz page */}
            <Link to="/softwarequiz">
                <button className="software-mode-button">Normal Mode</button> {/* Button for Normal Mode */}
            </Link>
            
            {/* Adding line breaks for spacing between buttons */}
            <br /><br /><br />
            
            {/* Link to Hard Mode quiz page */}
            <Link to="/softwarequizhard">
                <button className="software-mode-button">Hard Mode</button> {/* Button for Hard Mode */}
            </Link>
            
            {/* Adding line breaks for spacing between buttons */}
            <br /><br /><br />
        </div>
        
        {/* Displaying the ScoreCard component */}
        <div className="score-row">
            <ScoreCard 
                data={{
                    latest: localStorage.getItem("softwareLatestScore"), // Fetching the latest score from localStorage
                    best: localStorage.getItem("softwareBestScore") // Fetching the best score from localStorage
                }} 
                className="software-score" // Adding custom class for styling
            />
        </div>
        
        {/* Link to navigate back to category selection page */}
        <Link to="/categorySelection">
            <button className="back-button">Back to Categories</button> {/* Button to navigate back */}
        </Link>
    </div>
  )
}

export default SoftwareModeSelector; // Exporting the component for use in other parts of the application
