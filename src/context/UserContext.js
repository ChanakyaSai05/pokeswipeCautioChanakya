import { createContext, useEffect, useMemo, useState } from "react";

const UserContext = createContext(); // Creating a new context for user data

export const UserProvider = ({ children }) => {
  const [isDarkMode, setisDarkMode] = useState(false); // State for dark mode toggle
  const [cards, setcards] = useState([]); // State to store Pokémon api data
  const [selectedCards, setselectedCards] = useState([]); // State to store liked Pokémon cards
  const [currentIndex, setCurrentIndex] = useState(0); // State to track the current index of displayed card
  const [nextUrl, setnextUrl] = useState(null); // State to store the URL for the next set of cards

  // Function to toggle between dark and light theme
  const toggleTheme = () => {
    setisDarkMode((prev) => !prev);
  };

  // Determine the current theme based on isDarkMode state
  const theme = isDarkMode ? "dark" : "light";

  // Effect to apply the selected theme to the document
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Memoizing the context value to avoid unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      isDarkMode,
      toggleTheme,
      theme,
      cards,
      setcards,
      selectedCards,
      setselectedCards,
      currentIndex,
      setCurrentIndex,
      nextUrl,
      setnextUrl,
    }),
    [isDarkMode, theme, cards, selectedCards, currentIndex, nextUrl]
  );

  return (
    // Providing the context value to the children components
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
export default UserContext;
