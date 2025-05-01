import React from 'react'
import { Link } from 'react-router-dom'
import ScoreCard from '../ScoreCard'
import './EnglishModeSelect.css'

const EnglishModeSelector = () => {
  return (
    <div className='english-mode-selector'>
        <h1 className="english-mode-h1">Select English Quiz Mode</h1>
        <br /><br />
        <div className="english-mode-buttons">
            <Link to="/englishquiz">
            <button className="english-mode-button">Normal Mode</button>
            </Link>
            <br /><br /><br />
            <Link to="/englishquizhard">
            <button className="english-mode-button">Hard Mode</button>
            </Link><br /><br /><br />
        </div>
        <div className="score-row">
            <ScoreCard data={{ latest: localStorage.getItem("englishLatestScore"), best: localStorage.getItem("englishBestScore") }} className="software-score"/>
        </div>
        <Link to="/categorySelection">
            <button className="back-button">Back to Categories</button>
        </Link>
    </div>
  )
}

export default EnglishModeSelector