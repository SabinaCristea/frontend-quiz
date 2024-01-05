import { useQuiz } from "../context/QuizContext";
import QuizType from "./QuizType";
import Switcher from "./Switcher";

import styles from "./Header.module.css";

function Header() {
  const { quizTitle } = useQuiz();

  return (
    <div className={styles.header}>
      {quizTitle ? <QuizType /> : <></>}
      <div style={{ marginLeft: "auto" }}>
        <Switcher />
      </div>
    </div>
  );
}

export default Header;
