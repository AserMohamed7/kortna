import React, { useState, useEffect } from 'react';
import style from './quiz.module.css';

const QuizList = ({ quizzes, onSelectQuiz }) => (
  <div id="quiz-list" className={style.quizList}>
    {quizzes.map((quiz, index) => (
      <div key={index} className={style.quizItem}>
        <h2>{quiz.name}</h2>
        <img src={quiz.image} alt={quiz.name} className={style.quizImage} />
        <p>{quiz.description}</p>
        <button onClick={() => onSelectQuiz(index)} className={style.quizButton}>
          Take Quiz
        </button>
      </div>
    ))}
  </div>
);

const QuizDetails = ({ quiz, onAnswerChange, onSubmitQuiz }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    onAnswerChange(currentQuestionIndex, answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === '') {
      alert('Please select an answer before proceeding.');
      return;
    }
    if (currentQuestionIndex < quiz.items.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedAnswer('');
    }
  };

  return (
    <div className={style.QuizDetails}>
      <h2>{quiz.name}</h2>
      <img src={quiz.image} alt={quiz.name} className={style.quizImage} />
      <div>
        <p>{quiz.items[currentQuestionIndex].question}</p>
        {quiz.items[currentQuestionIndex].answers.map((answer, i) => (
          <button
            key={i}
            onClick={() => handleAnswerClick(answer)}
            className={`${style.answerButton} ${selectedAnswer === answer ? style.selected : ''}`}
          >
            {answer}
          </button>
        ))}
        <div className={style.navigationButtons}>
          {currentQuestionIndex < quiz.items.length - 1 ? (
            <button 
              onClick={handleNextQuestion} 
              className={style.nextButton}
            >
              Next Question
            </button>
          ) : (
            <button 
              onClick={onSubmitQuiz} 
              className={style.submitButton}
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const quizzesPerPage = 2;

  useEffect(() => {
    fetch('/quiz.json')
      .then(response => response.json())
      .then(data => setQuizzes(data.quizzes))
      .catch(error => console.error('Error fetching quizzes:', error));
  }, []);

  const handleSelectQuiz = (index) => {
    // Calculate the actual index in the quizzes array
    const actualIndex = (currentPage - 1) * quizzesPerPage + index;
    if (quizzes[actualIndex]) {
      setSelectedQuiz(quizzes[actualIndex]);
      setAnswers(Array(quizzes[actualIndex].items.length).fill(null)); // Reset answers
      setScore(null); // Reset score
    }
  };

  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers(prevAnswers => {
      const newAnswers = [...prevAnswers];
      newAnswers[questionIndex] = answer;
      return newAnswers;
    });
  };

  const handleSubmitQuiz = () => {
    if (!selectedQuiz) return;

    const userScore = selectedQuiz.items.reduce((score, item, index) => (
      answers[index] === item.correct_answer ? score + 1 : score
    ), 0);

    setScore(userScore);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(quizzes.length / quizzesPerPage);
  const startIndex = (currentPage - 1) * quizzesPerPage;
  const currentQuizzes = quizzes.slice(startIndex, startIndex + quizzesPerPage);

  const getScoreMessage = (score, totalQuestions) => {
    const percentage = (score / totalQuestions) * 100;

    if (percentage >= 90) {
        return "Great! You are a legend!";
    } else if (percentage >= 75) {
        return "Well done! You know a lot!";
    } else if (percentage >= 50) {
        return "Not bad! Keep practicing!";
    } else if (percentage >= 25) {
        return "Try harder! You can do it!";
    } else {
        return "You are not a footballer.";
    }
};


  return (
    <div className={style.App}>
      {selectedQuiz ? (
        score !== null ? (
          <div className={style.scoreDisplay}>
            <h2>Your Score</h2>
            <p>{score} / {selectedQuiz.items.length}</p>
            <p>{getScoreMessage(score, selectedQuiz.items.length)}</p>
            <button onClick={() => setSelectedQuiz(null)} className={style.returnButton}>
              Back to Quiz List
            </button>
          </div>
        ) : (
          <QuizDetails 
            quiz={selectedQuiz} 
            onAnswerChange={handleAnswerChange} 
            onSubmitQuiz={handleSubmitQuiz}
          />
        )
      ) : (
        <>
          <QuizList quizzes={currentQuizzes} onSelectQuiz={handleSelectQuiz} />
          <div className={style.pagination}>
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={currentPage === i + 1 ? style.activePage : ''}
              >
                {i + 1}
              </button>
            ))}
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
