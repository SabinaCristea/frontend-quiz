import styles from "./Options.module.css";
import { useQuiz } from "../context/QuizContext";

function Options({
  selectedOptionIndex,
  handleOptionClick,
  submitButtonClicked,
}: {
  selectedOptionIndex: number | null;
  handleOptionClick: (index: number) => void;
  submitButtonClicked: boolean;
}) {
  const { questions, questionIndex, answer, hasAnswered } = useQuiz();

  console.log(selectedOptionIndex);

  const correctAnswer = questions[questionIndex].answer;
  const options = questions[questionIndex].options;

  return (
    <ol type="A" className={styles.options}>
      {options.map((option: string, index: number) => {
        const isSelected = index === selectedOptionIndex;
        const isClicked = isSelected && submitButtonClicked;
        const isCorrect = hasAnswered && isSelected && answer === correctAnswer;
        const isWrong = hasAnswered && isSelected && answer !== correctAnswer;

        return (
          <button
            className={`${styles.option} 
            ${isSelected ? styles.selected : ""}
            ${isCorrect ? styles.correct : ""}
            ${isWrong ? styles.wrong : ""}
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
