const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.use(cors())

// Load questions from JSON file
const loadQuestions = () => {
  try {
    console.log('Loading questions...'); // Debugging log
    const data = fs.readFileSync(path.join(__dirname, 'questions.json'), 'utf-8');
    console.log('Questions file read successfully'); // Debugging log
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading questions file:', error);
    return [];
  }
};


app.get('/api/questions', (req, res) => {
  const questions = loadQuestions();
  console.log("Sending questions:", questions); // Debugging
  res.json(questions);
});


// Endpoint to check the answer
app.post('/api/answer', (req, res) => {
  const { questionId, userAnswer } = req.body;
  const questions = loadQuestions();

  // Find the question by ID
  const question = questions.find(q => q.id === questionId);

  if (!question) {
    return res.status(404).send({ error: 'Question not found' });
  }

  // Check if the user's answer is correct
  const isCorrect = question.correctAnswer === userAnswer;

  res.json({
    isCorrect,
    correctAnswer: question.correctAnswer
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});