import { useState } from "react";
import { useQuiz } from "../context/QuizContext";
import styles from "./Options.module.css";

function Options() {
  const { questions, questionIndex, dispatch, answer, hasAnswered } = useQuiz();
  const [isSelected, setIsSelected] = useState(false);

  const options = questions[questionIndex].options;
  const correctAnswer = questions[questionIndex].answer;

  console.log(options, answer, correctAnswer);

  const handleOptionClick = (option) => {
    setIsSelected(!isSelected);
  };

  const handleOptionClicktomove = (option) => {
    if (!hasAnswered) {
      dispatch({ type: "answerQuestion", payload: option });
    }
  };

  return (
    <ol type="A" className={styles.options}>
      {options.map((option, index) => {
        const isClicked = index === options.indexOf(answer);
        const isCorrect = option === correctAnswer;
        const isWrong = hasAnswered && isClicked && !isCorrect;

        return (
          <button
            className={`${styles.option} 
            ${isClicked && !hasAnswered ? styles.selected : ""}
            ${isClicked && hasAnswered && isCorrect ? styles.correct : ""}
            ${isClicked && hasAnswered && isWrong ? styles.wrong : ""}
            ${isSelected ? styles.selected : ""}
            `}
            key={index}
            disabled={hasAnswered}
            onClick={() => handleOptionClick(option)}
          >
            <div className={styles.optionLetterContainer}>
              <div className={styles.optionLetter}>
                {String.fromCharCode(65 + index)}
              </div>
            </div>

            <div className={styles.optionTextContainer}>
              <div className={styles.optionText}>{option}</div>
            </div>

            {hasAnswered && option === correctAnswer && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="none"
                viewBox="0 0 40 40"
                className={styles.correctIcon}
              >
                <path
                  fill="#26D782"
                  d="M20 5a15 15 0 1 1 0 30 15 15 0 0 1 0-30Zm0 2.5a12.5 12.5 0 1 0 0 25 12.5 12.5 0 0 0 0-25Zm-1.875 15.105L25.3 15.41a1.25 1.25 0 0 1 1.915 1.593l-.145.174-8.06 8.08a1.25 1.25 0 0 1-1.595.148l-.175-.145-4.375-4.375a1.25 1.25 0 0 1 1.595-1.913l.175.143 3.49 3.49Z"
                />
              </svg>
            )}
            {hasAnswered && isClicked && option !== correctAnswer && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="none"
                viewBox="0 0 40 40"
                className={styles.correctIcon}
              >
                <path
                  fill="#EE5454"
                  d="M20 5a15 15 0 1 1 0 30 15 15 0 0 1 0-30Zm0 2.5a12.5 12.5 0 1 0 0 25 12.5 12.5 0 0 0 0-25Zm-5.402 7.415.142-.175a1.25 1.25 0 0 1 1.595-.143l.175.143L20 18.233l3.49-3.493a1.25 1.25 0 0 1 1.595-.143l.175.143a1.25 1.25 0 0 1 .142 1.595l-.142.175L21.767 20l3.493 3.49a1.25 1.25 0 0 1 .142 1.595l-.142.175a1.25 1.25 0 0 1-1.595.142l-.175-.142L20 21.767l-3.49 3.493a1.25 1.25 0 0 1-1.595.142l-.175-.142a1.25 1.25 0 0 1-.143-1.595l.143-.175L18.233 20l-3.493-3.49a1.25 1.25 0 0 1-.143-1.595Z"
                />
              </svg>
            )}
          </button>
        );
      })}
    </ol>
  );
}

export default Options;
