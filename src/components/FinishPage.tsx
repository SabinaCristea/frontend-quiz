import { useQuiz } from "../context/QuizContext";
// import BackgroundPattern from "./BackgroundPattern";
import styles from "./FinishPage.module.css";
import QuizType from "./QuizType";

function FinishPage() {
  const { numQuestions, correctAnswerCount, dispatch } = useQuiz();
  return (
    <>
      {/* <BackgroundPattern /> */}
      <div className={styles.finishPageContainer}>
        <div className={styles.headingContainer}>
          <h1 className={styles.title}>Quiz completed</h1>
          <h1 className={styles.subtitle}>You scored...</h1>
        </div>
        <div className={styles.scoreContainer}>
          <div className={styles.scoreCard}>
            <QuizType />
            <div className={styles.score}>{correctAnswerCount}</div>
            <div className={styles.maxScore}>out of {numQuestions}</div>
          </div>
          <button
            className={styles.resetBtn}
            onClick={() => dispatch({ type: "playAgain" })}
          >
            Play Again
          </button>
        </div>
      </div>
    </>
  );
}

export default FinishPage;
