import { useState } from "react";
import styles from "./Options.module.css";
import { useQuiz } from "../context/QuizContext";

function Options() {
  const { questions, questionIndex, answer, hasAnswered } = useQuiz();

  const options = questions[questionIndex].options;

  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);

  const handleOptionClick = (index) => {
    if (!hasAnswered) {
      setSelectedOptionIndex(index === selectedOptionIndex ? null : index);
    }
  };

  return (
    <ol type="A" className={styles.options}>
      {options.map((option, index) => {
        const isClicked = index === options.indexOf(answer);
        const isSelected = index === selectedOptionIndex;

        return (
          <button
            className={`${styles.option} 
            ${isSelected || isClicked ? styles.selected : ""}

            `}
            key={index}
            disabled={hasAnswered}
            onClick={() => handleOptionClick(index)}
          >
            <div className={styles.optionLetterContainer}>
              <div className={styles.optionLetter}>
                {String.fromCharCode(65 + index)}
              </div>
            </div>

            <div className={styles.optionTextContainer}>
              <div className={styles.optionText}>{option}</div>
            </div>
          </button>
        );
      })}
    </ol>
  );
}

export default Options;
