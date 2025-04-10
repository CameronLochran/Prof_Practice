import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import '../styles/QuizCategory.css';

const QuizCategoryAndDifficulty = () => {
  const [softwareScores, setSoftwareScores] = useState({ latest: null, best: null });
  const [mathsScores, setMathsScores] = useState({ latest: null, best: null });
  const [englishScores, setEnglishScores] = useState({ latest: null, best: null });
  const [pcComponentsScores, setPcComponentsScores] = useState({latest: null, best: null});

  useEffect(() => {
    // Load scores for each category from localStorage
    const loadScores = (prefix) => {
      const latest = localStorage.getItem(`${prefix}LatestScore`);
      const best = localStorage.getItem(`${prefix}BestScore`);
      return {
        latest: latest !== null ? Number(latest) : null,
        best: best !== null ? Number(best) : null,
      };
    };

    setSoftwareScores(loadScores("software"));
    setMathsScores(loadScores("maths"));
    setEnglishScores(loadScores("english"));
    setPcComponentsScores(loadScores("pccomponents"))
  }, []);

  return (
    <main>
      <div className='quizcategory'>
        <h1 className='heading'>Select Quiz and Difficulty</h1>
        <br /><br /><br />

        <div className="scores-for-subjects">
          <div className="score-display">
            
            <div style={{ marginLeft: '35px' }}>
            {softwareScores.latest !== null && <p><strong>Previous Score:</strong> {softwareScores.latest}</p>}
            {softwareScores.best !== null && <p><strong>Best Score:</strong> {softwareScores.best}</p>}
            <br />
            </div>
            
            <div style={{ marginLeft: '217px' }}>
            {mathsScores.latest !== null && <p><strong>Previous Score:</strong> {mathsScores.latest}</p>}
            {mathsScores.best !== null && <p><strong>Best Score:</strong> {mathsScores.best}</p>}
            <br />
            </div>
            
            <div style={{ marginLeft: '225px' }}>
            {englishScores.latest !== null && <p><strong>Previous Score:</strong> {englishScores.latest}</p>}
            {englishScores.best !== null && <p><strong>Best Score:</strong> {englishScores.best}</p>}
            </div>

            <div style={{ marginLeft: '200px'}}>
            {pcComponentsScores.latest !== null && <p><strong>Previous Score:</strong> {pcComponentsScores.latest}</p>}
            {pcComponentsScores.best !== null && <p><strong>Best Score:</strong> {pcComponentsScores.best}</p>}
            </div>
          </div>
        </div>

        <section className="content">
          <Link to="/softwarequiz">
            <button className="software-button">Software</button>
          </Link><br /><br />
          <Link to="/mathsquiz">
            <button className="maths-button">Maths</button>
          </Link><br /><br />
          <Link to="/englishquiz">
            <button className="english-button">English</button>
          </Link><br /><br />
          <Link to="/pccomponents">
            <button className="pccomponents-button">PC Components</button>
          </Link><br /><br />
        </section>

        <Link to="/">
          <button className="back-button">Back</button>
        </Link>
      </div>
    </main>
  );
};

export default QuizCategoryAndDifficulty;
