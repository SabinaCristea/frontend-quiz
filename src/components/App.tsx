import { QuizProvider, useQuiz } from "../context/QuizContext";
import "./App.module.css";
import FinishPage from "./FinishPage";
import Header from "./Header";
import Main from "./Main";
import Question from "./Question";
import StarterPage from "./StarterPage";
import "../components/colors/styles.css";

function App() {
  const { status } = useQuiz();

  return (
    <QuizProvider>
      <Header />
      <Main>
        {status === "ready" && <StarterPage />}
        {(status === "activeHTML" ||
          status === "activeCSS" ||
          status === "activeJavaScript" ||
          status === "activeAccessibility") && <Question />}
        {status === "finished" && <FinishPage />}
      </Main>
    </QuizProvider>
  );
}

export default App;
