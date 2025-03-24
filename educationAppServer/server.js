const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Example quiz data
const questions = [
  {
    id: 1,
    difficulty: "Normal",
    question: "What is the Purpose of a compiler",
    options: ["To execute code directly", "To translate code from one language to another", "To compile code without errors", "To test the code for performance"],
    correctAnswer: "To translate code from one language to another"
  },
  {
    id: 2,
    difficulty: "Normal",
    question: "Which of the following is an eexample of a high level programming language?",
    options: ["Assembly", "C", "Java", "Machine Code"],
    correctAnswer: "Java"
  },
  {
    id: 3,
    difficulty: "Normal",
    question: "What does OOP stand for?",
    options: ["Object-Oriented Programming", "Online Operations Program", "Open Option Programming", " Operational Object Protocol"],
    correctAnswer: "Object-Oriented Programming"
  },
  {
    id: 4,
    difficulty: "Normal",
    question: "Which planet is known Which of the following is NOT one of the four main principles of Object-Oriented Programming (OOP)?",
    options: ["Inheritance", "Encapsulation", "Polymorphism", "Compilation"],
    correctAnswer: "Compilation"
  },
  {
    id: 5,
    difficulty: "Normal",
    question: "Which keyword is used to define a class in Java?",
    options: ["Function", "Class", "Object", "Define"],
    correctAnswer: "Class"
  },
  {
    id: 6,
    difficulty: "Normal",
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars"
  },{
    id: 7,
    difficulty: "Normal",
    question: "Which of the following is a JavaScript data type?",
    options: ["Integer", "String", "ArrayList", "Decimal"],
    correctAnswer: "String"
  },{
    id: 8,
    difficulty: "Normal",
    question: "Which operator is used to compare equality in JavaScript?",
    options: ["=", "==", "!==", "==="],
    correctAnswer: "=="
  },{
    id: 9,
    difficulty: "Normal",
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars"
  },{
    id: 10,
    difficulty: "Normal",
    question: "What does a loop do in programming?",
    options: ["It stops the program", "It repeats a block of code", "It calculates values", "It initializes variables"],
    correctAnswer: "It repeats a block of code"
  },{
    id: 11,
    difficulty: "Normal",
    question: "What is the purpose of the return keyword in JavaScript functions?",
    options: ["To end a loop", "To specify the functions output", "To declare a variable", "To define a class"],
    correctAnswer: "To specify the functions output"
  },{
    id: 12,
    difficulty: "Normal",
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars"
  },{
    id: 13,
    difficulty: "Normal",
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars"
  },{
    id: 14,
    difficulty: "Normal",
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars"
  },{
    id: 15,
    difficulty: "Normal",
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars"
  },{
    id: 16,
    difficulty: "Normal",
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars"
  },{
    id: 17,
    difficulty: "Normal",
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars"
  },{
    id: 18,
    difficulty: "Normal",
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars"
  },{
    id: 19,
    difficulty: "Normal",
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars"
  },{
    id: 20,
    difficulty: "Normal",
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars"
  },
];

// Endpoint to get all questions
app.get('/api/questions', (req, res) => {
  res.json(questions);
});

// Endpoint to check the answer
app.post('/api/answer', (req, res) => {
  const { questionId, userAnswer } = req.body;

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