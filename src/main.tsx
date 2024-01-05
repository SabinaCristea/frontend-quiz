import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import { QuizProvider } from "./context/QuizContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QuizProvider>
      <App />
    </QuizProvider>
  </React.StrictMode>
);
