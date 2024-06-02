import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Header() {
  const { theme, toggleTheme } = useContext(UserContext); // Accessing theme and toggleTheme from context
  const navigate = useNavigate(); // Initializing navigate function for navigation

  return (
    <nav className={`navbar ${theme}`}>
      {/* Logo section with navigation to home page */}
      <div
        className="navbar-logo"
        onClick={() => {
          navigate("/");
        }}
      >
        <img src="images/logo.png" alt="PokeAPI Logo" />
        {/* Logo image */}
      </div>
      <div className="navbar-title-container">
        <div className="navbar-title">PokéSwipe</div> {/* Title of the app */}
      </div>
        {/* Theme switcher */}
        <div className="theme-switch">
          {theme === "dark" ? (
            <svg className="icon moon">
              <use href="#icon_moon"></use>
            </svg>
          ) : (
            <svg className="icon sun">
              <use href="#icon_sun"></use>
            </svg>
          )}
          <label>
            {/* Checkbox to toggle theme */}
            <input
              type="checkbox"
              onChange={toggleTheme}
              checked={theme === "dark"}
            />
            <span className="slider round"></span>
          </label>
      </div>
    </nav>
  );
}

export default Header;
