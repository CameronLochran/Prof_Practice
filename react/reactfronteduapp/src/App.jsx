import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import QuestionCard from './components/questionCard'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<StartPage/>}/>
          <Route path="questionscard" element={<QuestionCard/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
