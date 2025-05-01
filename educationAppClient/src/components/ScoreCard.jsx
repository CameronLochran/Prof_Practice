import React from 'react'

// Functional component to display a score card with previous and best scores
const ScoreCard = ({ title, data }) => (
  <div className="score-card">
    {/* Title of the score card (e.g., Software, Maths, etc.) */}
    <h3>{title}</h3>
    
    {/* Displaying the previous score */}
    <p>
      <strong>Previous Score:</strong> 
      {/* If a previous score exists, show it; otherwise, display '-' */}
      {data.latest !== null ? data.latest : '-'}
    </p>
    
    {/* Displaying the best score */}
    <p>
      <strong>Best Score:</strong> 
      {/* If a best score exists, show it; otherwise, display '-' */}
      {data.best !== null ? data.best : '-'}
    </p>
  </div>
);

export default ScoreCard;
