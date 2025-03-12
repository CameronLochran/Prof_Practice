import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import QuestionCard from './questionCard'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<StartPage/>}></Route>
          <Route path='/questionscard' element={<QuestionCard/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
