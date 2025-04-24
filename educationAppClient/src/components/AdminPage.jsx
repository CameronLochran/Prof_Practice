import React, { useState, useEffect } from 'react';

function App() {
  // State for questions, filter criteria, and new question
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    id: null,
    category: '',
    difficulty: '',
    question: '',
    options: ['', '', '', ''],
    answer: ''
  });
  const [categoryFilter, setCategoryFilter] = useState('');//
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [editingQuestion, setEditingQuestion] = useState(null);  // State for editing

  // Fetch questions from questions.json file
  useEffect(() => {
    fetch("http://localhost:3000/api/questions")  // File in the public folder
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
        setFilteredQuestions(data);  // Initially, all questions are shown
      })
      .catch((error) => console.error('Error fetching questions:', error));
  }, []);

  // Filter function based on category and difficulty
  const filterQuestions = () => {
    let filtered = [...questions];
    if (categoryFilter) {
      filtered = filtered.filter((q) => q.category === categoryFilter);
    }
    if (difficultyFilter) {
      filtered = filtered.filter((q) => q.difficulty === difficultyFilter);
    }
    setFilteredQuestions(filtered);
  };

  // Handle category and difficulty change
  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
    filterQuestions();
  };

  const handleDifficultyChange = (e) => {
    setDifficultyFilter(e.target.value);
    filterQuestions();
  };

  // Create: Add new question
  const addQuestion = () => {
    const questionToAdd = { ...newQuestion, id: questions.length + 1 };
  
    fetch("http://localhost:3000/api/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(questionToAdd),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to add question: ${response.status} - ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        const updatedQuestions = [...questions, data];
        setQuestions(updatedQuestions);
        setFilteredQuestions(updatedQuestions);
        setNewQuestion({
          id: null,
          category: '',
          difficulty: '',
          question: '',
          options: ['', '', '', ''],
          answer: ''
        });
      })
      .catch((error) => {
        console.error("Error posting new question:", error);
      });  
  };

  // Update: Modify an existing question by ID
  const updateQuestion = (id, updatedData) => {
    const updatedQuestions = questions.map(q =>
      q.id === id ? { ...q, ...updatedData } : q
    );
    setQuestions(updatedQuestions);
    setFilteredQuestions(updatedQuestions);  // Update filtered questions as well
    setEditingQuestion(null);  // Exit edit mode
  };

  // Start editing an existing question
  const startEditing = (question) => {
    setEditingQuestion({ ...question });  // Set the question details in editing state
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingQuestion(null);  // Exit edit mode
  };

  // Delete: Remove question by ID
  const deleteQuestion = (id) => {
    const updatedQuestions = questions.filter(q => q.id !== id);
    setQuestions(updatedQuestions);
    setFilteredQuestions(updatedQuestions);  // Update filtered questions as well
  };

  return (
    <div>
      <br /><br />
      <h1>Welcome Admin</h1>
      {/* Filters Section */}
      <br /><br />
      <div>
        <h2>Filter Questions</h2>
        <select onChange={handleCategoryChange} value={categoryFilter}>
          <option value="">All</option>
          <option value="Software Dev">Software Dev</option>
          <option value="Maths">Maths</option>
          <option value="English">English</option>
          <option value="pccomponents">PC Components</option>
        </select>
        <select onChange={handleDifficultyChange} value={difficultyFilter}>
          <option value="">Any</option>
          <option value="Normal">Normal</option>
          <option value="Hard">Hard</option>
        </select>
      </div>
      {/* Create new question form */}
      <br /><br />
      <div>
        <h2>{editingQuestion ? 'Edit Question' : 'Add a New Question'}</h2>
        <label htmlFor="category">Category:</label>
        <input
          id="category"
          type="text"
          placeholder="Category"
          value={editingQuestion ? editingQuestion.category : newQuestion.category}
          onChange={(e) => {
            if (editingQuestion) {
              setEditingQuestion({ ...editingQuestion, category: e.target.value });
            } else {
              setNewQuestion({ ...newQuestion, category: e.target.value });
            }
          }}
        />
        <label htmlFor="difficulty">Difficulty:</label>
        <input
          id="difficulty"
          type="text"
          placeholder="Difficulty"
          value={editingQuestion ? editingQuestion.difficulty : newQuestion.difficulty}
          onChange={(e) => {
            if (editingQuestion) {
              setEditingQuestion({ ...editingQuestion, difficulty: e.target.value });
            } else {
              setNewQuestion({ ...newQuestion, difficulty: e.target.value });
            }
          }}
        />
        <label htmlFor="question">Question:</label>
        <input
          id="question"
          type="text"
          placeholder="Question"
          value={editingQuestion ? editingQuestion.question : newQuestion.question}
          onChange={(e) => {
            if (editingQuestion) {
              setEditingQuestion({ ...editingQuestion, question: e.target.value });
            } else {
              setNewQuestion({ ...newQuestion, question: e.target.value });
            }
          }}
        />
        <div>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index}>
              <label htmlFor={`option-${index}`}>Option {index + 1}:</label>
              <input
                id={`option-${index}`}
                type="text"
                placeholder={`Option ${index + 1}`}
                value={editingQuestion ? editingQuestion.options[index] : newQuestion.options[index]}
                onChange={(e) => {
                  const options = editingQuestion ? [...editingQuestion.options] : [...newQuestion.options];
                  options[index] = e.target.value;
                  if (editingQuestion) {
                    setEditingQuestion({ ...editingQuestion, options });
                  } else {
                    setNewQuestion({ ...newQuestion, options });
                  }
                }}
              />
            </div>
          ))}
        </div>
        <label htmlFor="answer">Answer:</label>
        <input
          id="answer"
          type="text"
          placeholder="Answer"
          value={editingQuestion ? editingQuestion.answer : newQuestion.answer}
          onChange={(e) => {
            if (editingQuestion) {
              setEditingQuestion({ ...editingQuestion, answer: e.target.value });
            } else {
              setNewQuestion({ ...newQuestion, answer: e.target.value });
            }
          }}
        />
        <button
          onClick={() => {
            if (editingQuestion) {
              updateQuestion(editingQuestion.id, editingQuestion);  // Save changes to question
            } else {
              addQuestion();  // Add new question
            }
          }}
        >
          {editingQuestion ? 'Save Changes' : 'Add Question'}
        </button>
        {editingQuestion && (
          <button onClick={cancelEditing}>Cancel</button>
        )}
      </div>
      {/* Read: Display filtered questions */}
      <div>
        <h2>Questions List</h2>
        {filteredQuestions.map((q) => (
          <div key={q.id} style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0' }}>
            <h3>{q.question}</h3>
            <p><strong>Category:</strong> {q.category} | <strong>Difficulty:</strong> {q.difficulty}</p>
            <p><strong>Options:</strong> {q.options.join(', ')}</p>
            <p><strong>Answer:</strong> {q.answer}</p>
            <button onClick={() => startEditing(q)}>Edit</button>
            <button onClick={() => deleteQuestion(q.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;