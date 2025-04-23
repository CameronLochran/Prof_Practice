import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../styles/QuizCategory.css';

const QuizCategoryAndDifficulty = () => {
  const [scores, setScores] = useState({
    software: { latest: null, best: null },
    maths: { latest: null, best: null },
    english: { latest: null, best: null },
    pccomponents: { latest: null, best: null },
  });

  const navigate = useNavigate();

  useEffect(() => {
    const loadScores = (prefix) => {
      const latest = localStorage.getItem(`${prefix}LatestScore`);
      const best = localStorage.getItem(`${prefix}BestScore`);
      return {
        latest: latest !== null ? Number(latest) : null,
        best: best !== null ? Number(best) : null,
      };
    };

    // Ensure all prefix keys are consistent with how they're saved in other quiz files
    setScores({
      software: loadScores("software"),
      maths: loadScores("maths"),
      english: loadScores("english"),
      pccomponents: loadScores("pccomponents"),
    });
  }, []);

  const ScoreCard = ({ title, data }) => (
    <div className="score-card">
      <h3>{title}</h3>
      <p><strong>Previous Score:</strong> {data.latest !== null ? data.latest : '-'}</p>
      <p><strong>Best Score:</strong> {data.best !== null ? data.best : '-'}</p>
    </div>
  );
  


  return (
    <main>
      <div className='quizcategory'>
        <h1 className='heading'>Select Quiz and Difficulty</h1>
        <br /><br />

        <div className="scores-for-subjects">
          <div className="score-row">
            <ScoreCard title="Software" data={scores.software} />
            <ScoreCard title="Maths" data={scores.maths} />
            <ScoreCard title="English" data={scores.english} />
            <ScoreCard title="PC Components" data={scores.pccomponents} />
          </div>
        </div>

        <section className="content">
          <Link to="/softwarequizmode">
            <button className="software-button">Software</button>
          </Link><br /><br />
          <Link to="/mathsquizmode">
            <button className="maths-button">Maths</button>
          </Link><br /><br />
          <Link to="/englishquizmode">
            <button className="english-button">English</button>
          </Link><br /><br />
          <Link to="/pccomponentsmode">
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
