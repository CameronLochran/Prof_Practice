import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import StartPage from "./components/StartPage"
import QuizCategoryAndDifficulty from "./components/quizCategoryAndDifficulty"
import SoftwareQuiz from "./components/SoftwareQuiz"
import MathsQuiz from "./components/MathsQuiz"

function App() {
  

  return (
    <>
    <center>
      
      <Router>
        <Routes>
          <Route path="/" element={<StartPage/>}/>
          <Route path="/categorySelection" element={<QuizCategoryAndDifficulty/>}/>
          <Route path="/softwarequiz" element={<SoftwareQuiz/>}/>
          <Route path="/mathsquiz" element={<MathsQuiz/>}/>
        </Routes>
      </Router>
      </center>
    </>
  )
}

export default App
