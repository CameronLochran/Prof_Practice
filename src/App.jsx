import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./components/StartPage";
import QuizCategoryAndDifficulty from "./components/QuizCategoryAndDifficulty";

// Normal Mode Components
import SoftwareQuiz from "./components/Software/SoftwareQuiz";
import MathsQuiz from "./components/Maths/MathsQuiz";
import EnglishQuiz from "./components/English/English";
import PcComponents from "./components/PCComponents/PcComponents";

// Admin Components
import AdminLogin from "./components/AdminLogin";
import AdminPage from "./components/AdminPage";

// Hard Mode Components
import SoftwareQuizHard from "./components/Software/SoftwareHard";
import MathsQuizHard from "./components/Maths/MathsQuizHard";
import EnglishQuizHard from "./components/English/EnglishQuizHard";
import PcComponentsQuizHard from "./components/PCComponents/PcComponentsHard";

// Mode Selectors
import EnglishModeSelector from "./components/English/EnglishModeSelector";
import SoftwareModeSelector from "./components/Software/SoftwareModeSelector";
import MathsModeSelector from "./components/Maths/MathsModeSelector";
import PcComponentsSelector from "./components/PCComponents/PcComponentsSelector";

function App() {
  return (
    <>
      <center>
        <Router>
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/categorySelection" element={<QuizCategoryAndDifficulty />} />
            <Route path="/softwarequiz" element={<SoftwareQuiz />} />
            <Route path="/mathsquiz" element={<MathsQuiz />} />
            <Route path="/englishquiz" element={<EnglishQuiz />} />
            <Route path="/pccomponents" element={<PcComponents />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admindetails" element={<AdminPage />} />
            <Route path="/softwarequizhard" element={<SoftwareQuizHard />} />
            <Route path="/mathsquizhard" element={<MathsQuizHard />} />
            <Route path="/englishquizhard" element={<EnglishQuizHard />} />
            <Route path="/pccomponentshard" element={<PcComponentsQuizHard />} />
            <Route path="/softwarequizmode" element={<SoftwareModeSelector />} />
            <Route path="/mathsquizmode" element={<MathsModeSelector />} />
            <Route path="/englishquizmode" element={<EnglishModeSelector />} />
            <Route path="/pccomponentsmode" element={<PcComponentsSelector />} />
          </Routes>
        </Router>
      </center>
    </>
  );
}

export default App;
