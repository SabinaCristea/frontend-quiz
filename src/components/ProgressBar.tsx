import { useQuiz } from "../context/QuizContext";

import styles from "./ProgressBar.module.css";

function ProgressBar() {
  const { numQuestions, progress } = useQuiz();

  return (
    <div className={styles.progress}>
      <progress max={numQuestions} value={progress}></progress>
    </div>
  );
}

export default ProgressBar;
