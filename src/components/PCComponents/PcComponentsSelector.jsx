import React from 'react'
import { Link } from 'react-router-dom'

const PcComponentsSelector = () => {
  return (
    <div className='pc-components-mode-selector'>
        <h1 className="pc-components-mode-h1">Select PC Components Quiz Mode</h1>
        <div className="pc-components-mode-buttons">
            <Link to="/pccomponents">
            <button className="pc-components-mode-button">Normal Mode</button>
            </Link>
            <Link to="/pccomponentshard">
            <button className="pc-components-mode-button">Hard Mode</button>
            </Link>
        </div>
        <Link to="/categorySelection">
            <button className="back-button">Back to Categories</button>
        </Link>
    </div>
  )
}

export default PcComponentsSelector