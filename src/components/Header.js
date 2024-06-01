import React, { useContext } from "react";
import UserContext from "../context/UserContext";

function Header() {
  const { theme, toggleTheme } = useContext(UserContext);
  return (
    <nav className="navbar">
      <div>Welcome</div>
      <div className="node-switch">
        <label>
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
