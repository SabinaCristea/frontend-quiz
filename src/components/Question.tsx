import { useQuiz } from "../context/QuizContext";
import BackgroundPattern from "./BackgroundPattern";
import Options from "./Options";
import ProgressBar from "./ProgressBar";

import styles from "./Question.module.css";
import { useEffect, useState } from "react";

function Question() {
  const {
    questionIndex,
    numQuestions,
    questions,
    dispatch,
    correctAnswerCount,
    hasAnswered,
  } = useQuiz();

  const currentQuestion = questions[questionIndex].question;

  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);

  useEffect(() => {
    setSubmitButtonClicked(false);
  }, [questionIndex]);

  console.log(currentQuestion, correctAnswerCount);

  const hasntAnsweredMessage = (
    <div className={styles.hasntAnsweredMsg}>
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          fill="none"
          viewBox="0 0 40 40"
        >
          <path
            fill="#EE5454"
            d="M20 5a15 15 0 1 1 0 30 15 15 0 0 1 0-30Zm0 2.5a12.5 12.5 0 1 0 0 25 12.5 12.5 0 0 0 0-25Zm-5.402 7.415.142-.175a1.25 1.25 0 0 1 1.595-.143l.175.143L20 18.233l3.49-3.493a1.25 1.25 0 0 1 1.595-.143l.175.143a1.25 1.25 0 0 1 .142 1.595l-.142.175L21.767 20l3.493 3.49a1.25 1.25 0 0 1 .142 1.595l-.142.175a1.25 1.25 0 0 1-1.595.142l-.175-.142L20 21.767l-3.49 3.493a1.25 1.25 0 0 1-1.595.142l-.175-.142a1.25 1.25 0 0 1-.143-1.595l.143-.175L18.233 20l-3.493-3.49a1.25 1.25 0 0 1-.143-1.595Z"
          />
        </svg>
      </span>
      <p>Please select an answer</p>
    </div>
  );

  // const handleSubmitAnswer = () => {
  //   if (questionIndex === numQuestions - 1) {
  //     dispatch({ type: "finish" });
  //   }
  //   if (!hasAnswered) {
  //     setSubmitButtonClicked(true);
  //     return;
  //   }
  //   dispatch({ type: "submitAnswer" });
  // };

  const handleNextQuestion = () => {
    if (questionIndex === numQuestions - 1) {
      dispatch({ type: "finish" });
    }
    // if (!hasAnswered) {
    //   setSubmitButtonClicked(true);
    //   return;
    // }
    dispatch({ type: "submitAnswer" });
  };

  return (
    <>
      <BackgroundPattern />

      <div className={styles.quizContainer}>
        <div className={styles.questionContainer}>
          <div className={styles.questionNumber}>
            Question {questionIndex + 1} of {numQuestions}
          </div>
          <div className={styles.questionProgress}>
            <div className={styles.quizQuestion}>{currentQuestion}</div>
            <ProgressBar />
          </div>
        </div>
        <div className={styles.optionsContainer}>
          <Options />
          <button className={styles.submitBtn} onClick={handleNextQuestion}>
            {!hasAnswered ? "Submit Answer" : "Next Question"}
          </button>

          {submitButtonClicked && !hasAnswered && hasntAnsweredMessage}
        </div>
      </div>
    </>
  );
}

export default Question;
