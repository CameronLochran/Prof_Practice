import React from 'react'
import QuizCategoryAndDifficulty from './quizCategoryAndDifficulty'
import '../styles/StartPage.css';

const StartPage = () => {

    return(
        <main>
            <body class= "welcome">
                
            
        <section class="welcometext">  
        
            <h1>WFLS PRESENTS!!!</h1>

            <a class="enterbutton" href= "/categorySelection" className='enter-link'>Press to enter{QuizCategoryAndDifficulty}</a>

        </section>
        
            </body>
        </main>
    )
    
}

export default StartPage