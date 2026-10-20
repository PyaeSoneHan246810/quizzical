import { useState } from 'react'
import { decode } from 'he'
import './App.css'
import IntroPage from './IntroPage'
import QuestionsPage from './QuestionsPage'

function App() {
  const [questions, setQuestions] = useState(null)

  function getQuestions() {
    fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple")
      .then(response => response.json())
      .then(data => {
        const questions = data['results'].map(result => {
          const question = decode(result['question'])
          const incorrectAnswers = result['incorrect_answers']
          const correctAnswer = result['correct_answer']
          const allAnswers = [...incorrectAnswers]
          const randomIndex = Math.floor(Math.random() * (allAnswers.length + 1));
          allAnswers.splice(randomIndex, 0, correctAnswer);
          console.log(allAnswers)
          return {
            question: question,
            allAnswers: allAnswers.map(answer => decode(answer)),
            correctAnswer: decode(correctAnswer)
          }
        })
        setQuestions(questions)
      });
  }

  return (
    <main>
      {
        questions === null || questions.length <= 0 ?
          <IntroPage
            onStart={getQuestions}
          /> :
          <QuestionsPage
            questions={questions}
            onPlayAgain={() => setQuestions(null)}
          />
      }
    </main>
  )
}

export default App
