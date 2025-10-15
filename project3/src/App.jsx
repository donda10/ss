import React, { useReducer, useRef, useMemo, useCallback, useEffect, useState } from 'react';

const questions = [
  {
    question: "Who is Manchester United’s all-time top scorer?",
    options: ["Cristiano Ronaldo", "Wayne Rooney", "Ryan Giggs", "Paul Scholes"],
    answer: "Wayne Rooney"
  },
  {
    question: "Which year did Manchester United win the first treble (Premier League, FA Cup, Champions League)?",
    options: ["1999", "2008", "1995", "2013"],
    answer: "1999"
  },
  {
    question: "Who was the manager of Manchester United for 26 years?",
    options: ["Jose Mourinho", "Alex Ferguson", "Ole Gunnar Solskjaer", "Louis van Gaal"],
    answer: "Alex Ferguson"
  },
  {
    question: "Which stadium is Manchester United’s home ground?",
    options: ["Anfield", "Old Trafford", "Etihad Stadium", "Wembley"],
    answer: "Old Trafford"
  },
  {
    question: "Which player scored the winning goal in the 1999 Champions League final?",
    options: ["David Beckham", "Ryan Giggs", "Ole Gunnar Solskjaer", "Teddy Sheringham"],
    answer: "Ole Gunnar Solskjaer"
  },
  {
    question: "Who is Manchester United’s current captain (as of 2025)?",
    options: ["Harry Maguire", "Bruno Fernandes", "David de Gea", "Marcus Rashford"],
    answer: "Harry Maguire"
  }

];
const quizReducer = (state, action) => {
  switch(action.type) {
    case 'ANSWER_SELECTED':
      const isCorrect = action.payload === questions[state.currentQuestion].answer;
      return {
        ...state,
        score: isCorrect ? state.score + 1 : state.score,
        answered: true
      };
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        answered: false
      };
    case 'RESET':
      return {
        currentQuestion: 0,
        score: 0,
        answered: false
      };
    default:
      return state;
  }
};

export default function QuizApp() {
  const [state, dispatch] = useReducer(quizReducer, {
    currentQuestion: 0,
    score: 0,
    answered: false
  });

  const [quizOver, setQuizOver] = useState(false);
  const [time, setTime] = useState(0);

  const timerRef = useRef(null); 


  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timerRef.current); 
  }, []);


  const handleAnswerSelect = useCallback((option) => {
    if (!state.answered) {
      dispatch({ type: 'ANSWER_SELECTED', payload: option });
    }
  }, [state.answered]);

  
  const handleNextQuestion = () => {
    if (state.currentQuestion + 1 < questions.length) {
      dispatch({ type: 'NEXT_QUESTION' });
    } else {
      setQuizOver(true);
      clearInterval(timerRef.current); 
    }
  };

  
  const handleResetQuiz = useCallback(() => {
    dispatch({ type: 'RESET' });
    setQuizOver(false);
    setTime(0);
    timerRef.current = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);
  }, []);

  
  const finalScore = useMemo(() => {
    if (quizOver) return state.score;
  }, [quizOver, state.score]);

  if (quizOver) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>Quiz Over!</h1>
        <p>Final Score: {finalScore} / {questions.length}</p>
        <p>Time Taken: {time} seconds</p>
        <button onClick={handleResetQuiz}>Reset Quiz</button>
      </div>
    );
  }

  const currentQ = questions[state.currentQuestion];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Question {state.currentQuestion + 1} of {questions.length}</h2>
      <p>{currentQ.question}</p>
      <div>
        {currentQ.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(option)}
            disabled={state.answered}
            style={{ display: 'block', margin: '5px 0' }}
          >
            {option}
          </button>
        ))}
      </div>
      {state.answered && (
        <button onClick={handleNextQuestion} style={{ marginTop: '10px' }}>
          {state.currentQuestion + 1 < questions.length ? "Next Question" : "Finish Quiz"}
        </button>
      )}
      <p>Time: {time} seconds</p>
      <p>Score: {state.score}</p>
    </div>
  );
}