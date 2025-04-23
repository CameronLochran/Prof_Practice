import React from 'react'
import { Link } from 'react-router-dom'
import './MathsModeSelect.css'

const MathsModeSelector = () => {
  return (
    <div className='maths-mode-selector'>
        <h1 className="maths-mode-h1">Select Maths Quiz Mode</h1>
        <div className="maths-mode-buttons">
            <Link to="/mathsquiz">
            <button className="maths-mode-button">Normal Mode</button>
            </Link>
            <br /><br /><br />
            <Link to="/mathsquizhard">
            <button className="maths-mode-button">Hard Mode</button>
            </Link>
        </div>
        <Link to="/categorySelection">
            <button className="back-button">Back to Categories</button>
        </Link>
    </div>
  )
}

export default MathsModeSelector