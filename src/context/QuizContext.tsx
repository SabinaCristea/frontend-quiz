import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";

interface Quiz {
  title: string;
  icon: string;
  questions: Question[];
}

interface Question {
  question: string;
  options: string[];
  answer: string;
  [key: string]: string | string[];
}

interface QuizState {
  quizzes: Quiz[];
  questions: Question[];
  question: string;
  options: string[];
  status:
    | "loading"
    | "ready"
    | "error"
    | "activeHTML"
    | "activeCSS"
    | "activeJavaScript"
    | "activeAccessibility"
    | "finished";
  quizTitle: "" | "HTML" | "CSS" | "JavaScript" | "Accessibility";
  questionIndex: number;
  answer: string | null;
  selectedOptionIndex: number | null;
  progress: number;
  correctAnswerCount: number;
}

type QuizAction =
  | { type: "dataReceived"; payload: Quiz[] }
  | { type: "dataFailed" }
  | { type: "startHTML" }
  | { type: "startCSS" }
  | { type: "startJavaScript" }
  | { type: "startAccessibility" }
  | { type: "answerQuestion"; payload: string }
  | { type: "submitAnswer" }
  | { type: "finish" }
  | { type: "playAgain" };

const initialState: QuizState = {
  quizzes: [],
  questions: [],
  question: "",
  options: [],
  status: "loading",
  quizTitle: "",
  questionIndex: 0,
  answer: null,
  progress: 1,
  correctAnswerCount: 0,
};

function reducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "dataReceived": {
      return {
        ...state,
        quizzes: action.payload,
        status: "ready",
      };
    }

    case "dataFailed":
      return {
        ...state,
        status: "error",
      };

    case "startHTML": {
      const questions = state.quizzes[0];
      console.log(questions.questions);
      return {
        ...state,
        questions: questions.questions,
        status: "activeHTML",
        quizTitle: "HTML",
      };
    }

    case "startCSS": {
      const questions = state.quizzes[1];
      console.log(questions.questions);

      return {
        ...state,
        questions: questions.questions,
        status: "activeCSS",
        quizTitle: "CSS",
      };
    }

    case "startJavaScript": {
      const questions = state.quizzes[2];
      console.log(questions.questions);

      return {
        ...state,
        questions: questions.questions,
        status: "activeJavaScript",
        quizTitle: "JavaScript",
      };
    }

    case "startAccessibility": {
      const questions = state.quizzes[3];
      console.log(questions.questions);

      return {
        ...state,
        questions: questions.questions,
        status: "activeAccessibility",
        quizTitle: "Accessibility",
      };
    }

    case "answerQuestion":
      return {
        ...state,
        answer: action.payload,
      };

    case "submitAnswer": {
      const currentQuiz = state.quizzes.find(
        (quiz) => quiz.title === state.quizTitle
      );

      if (!currentQuiz) {
        return state;
      }

      const currentQuestion = currentQuiz.questions[state.questionIndex];
      const isCorrect = state.answer === currentQuestion.answer;

      return {
        ...state,
        answer: null,
        questionIndex: state.questionIndex + 1,
        progress: state.progress + 1,
        correctAnswerCount: isCorrect
          ? state.correctAnswerCount + 1
          : state.correctAnswerCount,
      };
    }

    case "finish":
      // const question = state.quizzes.questions.at(state.index);
      return {
        ...state,
        status: "finished",
        // correctAnswerCount: ,
      };

    case "playAgain": {
      const selectedQuiz = state.quizzes.find(
        (quiz) => quiz.title === state.quizTitle
      );

      if (!selectedQuiz) {
        return state;
      }

      return {
        ...initialState,
        quizzes: state.quizzes,
        questions: selectedQuiz.questions,
        status: "ready",
        quizTitle: "",
        questionIndex: 0,
        answer: null,
        progress: 0,
      };
    }

    default:
      throw new Error("Action unknown");
  }
}

interface QuizContextProps {
  quizzes: QuizState;
  questions: Question;
  status: string;
  quizTitle: string;
  questionIndex: number;
  numQuestions: number;
  answer: string;
  hasAnswered: boolean;
  correctAnswer: string;
  dispatch: React.Dispatch<QuizAction>;
  correctAnswerCount: number;
}

const QuizContext = createContext<QuizContextProps | undefined>(undefined);

interface QuizProviderProps {
  children: ReactNode;
}

function QuizProvider({ children }: QuizProviderProps) {
  const [
    {
      quizzes,
      questions,
      status,
      quizTitle,
      questionIndex,
      answer,
      progress,
      correctAnswerCount,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = quizzes.length > 0 ? quizzes[0].questions.length : 0;

  const hasAnswered = answer !== null;

  useEffect(function () {
    fetch("../data.json")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data.quizzes }))
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <QuizContext.Provider
      value={{
        quizzes,
        questions,
        status,
        quizTitle,
        questionIndex,
        answer,
        progress,
        correctAnswerCount,
        numQuestions,
        hasAnswered,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);

  if (context === undefined)
    throw new Error("QuizContext was used outside of the QuizProvider");

  return context;
}

export { QuizProvider, useQuiz };
