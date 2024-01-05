import { useState } from "react";

const useSwitcher = () => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleSwitch = () => {
    setIsChecked((prevChecked) => !prevChecked);
  };

  return { isChecked, toggleSwitch };
};

export default useSwitcher;
