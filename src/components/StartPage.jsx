import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/StartPage.css';

const StartPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event) => {
      const isCtrlOrCmd = event.ctrlKey || event.metaKey;
      if (isCtrlOrCmd && event.key.toLowerCase() === 'a') {
        event.preventDefault();
        navigate('/admin');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  return (
    <main className="welcome">
      <section className="welcometext">
        <h1>WFLS PRESENTS!!!</h1>
        <a className="enter-link" href="/categorySelection">
          Press to enter
        </a>
      </section>
    </main>
  );
};

export default StartPage;
