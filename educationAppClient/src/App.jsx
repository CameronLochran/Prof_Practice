import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import StartPage from "./components/StartPage"
import QuizCategoryAndDifficulty from "./components/quizCategoryAndDifficulty"
import SoftwareQuiz from "./components/SoftwareQuiz"
import MathsQuiz from "./components/MathsQuiz"
import EnglishQuiz from "./components/English"
import PcComponents from "./components/PcComponents"
import AdminPage from "./components/AdminPage"
import AdminLogin from "./components/AdminLogin"
import SoftwareQuizHard from "./components/SoftwareHard"
import MathsQuizHard from "./components/MathsQuizHard"
import PcComponentsQuizHard from "./components/PcComponentsHard"
import EnglishQuizHard from "./components/EnglishQuizHard"

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
            <Route path="/englishquiz" element={<EnglishQuiz/>}/>
            <Route path="/pccomponents" element={<PcComponents/>}/>
            <Route path="/admin" element={<AdminLogin/>}/>
            <Route path="/admindetails" element={<AdminPage/>}/>
            <Route path="/softwarequizhard" element={<SoftwareQuizHard/>}/>
            <Route path="/mathsquizhard" element={<MathsQuizHard/>}/>
            <Route path="/englishquizhard" element={<EnglishQuizHard/>}/>
            <Route path="/pccomponentshard" element={<PcComponentsQuizHard/>}/>
          </Routes>
        </Router>
      </center>
    </>
  )
}

export default App
