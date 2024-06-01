import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = (props) => {
  const [isDarkMode, setisDarkMode] = useState(false);
  const [cards, setcards] = useState([]);
  const [selectedCards, setselectedCards] = useState([]);

  const toggleTheme = () => {
    setisDarkMode((prev) => !prev);
  };
  const theme = isDarkMode ? "dark" : "light";
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <UserContext.Provider value={{ isDarkMode, toggleTheme, theme, cards, setcards, selectedCards, setselectedCards }}>
      {props.children}
    </UserContext.Provider>
  );
};
export default UserContext;
