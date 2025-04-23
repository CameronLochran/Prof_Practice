import React from 'react'
import { Link } from 'react-router-dom'

const SoftwareModeSelector = () => {
  return (
    <div className='software-mode-selector'>
        <h1 className="software-h1">Select Software Quiz Mode</h1>
        <div className="software-mode-buttons">
            <Link to="/softwarequiz">
            <button className="software-mode-button">Normal Mode</button>
            </Link>
            <Link to="/softwarequizhard">
            <button className="software-mode-button">Hard Mode</button>
            </Link>
        </div>
        <Link to="/categorySelection">
            <button className="back-button">Back to Categories</button>
        </Link>
    </div>
  )
}

export default SoftwareModeSelector