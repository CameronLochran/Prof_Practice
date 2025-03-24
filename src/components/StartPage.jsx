import React from 'react'
import QuizCategoryAndDifficulty from './quizCategoryAndDifficulty'
import "../styling/StartPage.css"

const StartPage = () => {

    return(
        <>
            <h1>WFLS PRESENTS!!!</h1>
            <a href= "/categorySelection" className='enter-link'>Press to enter{QuizCategoryAndDifficulty}</a>
        </>
    )
    
}

export default StartPage