// Import necessary tools from React Router for handling page routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import main start and category selection pages
import StartPage from "./components/StartPage";
import QuizCategoryAndDifficulty from "./components/QuizCategoryAndDifficulty";

// Import Normal Mode quiz components
import SoftwareQuiz from "./components/Software/SoftwareQuiz";
import MathsQuiz from "./components/Maths/MathsQuiz";
import EnglishQuiz from "./components/English/English";
import PcComponents from "./components/PCComponents/PcComponents";

// Import Admin-related components
import AdminLogin from "./components/AdminLogin";
import AdminPage from "./components/AdminPage";

// Import Hard Mode quiz components
import SoftwareQuizHard from "./components/Software/SoftwareHard";
import MathsQuizHard from "./components/Maths/MathsQuizHard";
import EnglishQuizHard from "./components/English/EnglishQuizHard";
import PcComponentsQuizHard from "./components/PCComponents/PcComponentsHard";

// Import Mode Selector components for each quiz
import EnglishModeSelector from "./components/English/EnglishModeSelector";
import SoftwareModeSelector from "./components/Software/SoftwareModeSelector";
import MathsModeSelector from "./components/Maths/MathsModeSelector";
import PcComponentsSelector from "./components/PCComponents/PcComponentsSelector";

function App() {
  return (
    <>
      <center>
        <Router>
          {/* Define all the possible routes in the app */}
          <Routes>
            {/* Home / Landing page */}
            <Route path="/" element={<StartPage />} />

            {/* Page for selecting quiz category and difficulty */}
            <Route path="/categorySelection" element={<QuizCategoryAndDifficulty />} />

            {/* Routes for each normal difficulty quiz */}
            <Route path="/softwarequiz" element={<SoftwareQuiz />} />
            <Route path="/mathsquiz" element={<MathsQuiz />} />
            <Route path="/englishquiz" element={<EnglishQuiz />} />
            <Route path="/pccomponents" element={<PcComponents />} />

            {/* Admin pages for login and admin panel */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admindetails" element={<AdminPage />} />

            {/* Routes for each hard difficulty quiz */}
            <Route path="/softwarequizhard" element={<SoftwareQuizHard />} />
            <Route path="/mathsquizhard" element={<MathsQuizHard />} />
            <Route path="/englishquizhard" element={<EnglishQuizHard />} />
            <Route path="/pccomponentshard" element={<PcComponentsQuizHard />} />

            {/* Mode selection screens for each quiz topic */}
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
