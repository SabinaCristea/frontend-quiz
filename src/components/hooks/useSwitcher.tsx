import { useState } from "react";

const useSwitcher = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSwitch = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      // Update the class on the root element
      document.documentElement.classList.toggle("dark", newMode);
      return newMode;
    });
  };

  return { isDarkMode, toggleSwitch };
};

export default useSwitcher;
