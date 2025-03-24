import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import StartPage from "./components/StartPage"
import QuizCategoryAndDifficulty from "./components/quizCategoryAndDifficulty"
import './App.css'

function App() {
  

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<StartPage/>}/>
          <Route path="/categorySelection" element={<QuizCategoryAndDifficulty/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
