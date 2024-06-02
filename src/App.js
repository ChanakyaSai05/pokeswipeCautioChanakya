import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { UserProvider } from "./context/UserContext";
import Pokemon from "./pages/Pokemon";
import Header from "./components/Header";
import SelectedCards from "./pages/SelectedCards";

function App() {
  return (
    // Wrapping the app with UserProvider to provide global state
    <UserProvider>
      {/* Setting up the router for the app */}
      <BrowserRouter>
        {/* Including the Header component */}
        <Header />
        {/* Defining the routes for the app */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Route for Home page */}
          <Route path="/pokemon" element={<Pokemon />} />{" "}
          {/* Route for Pokemon page */}
          <Route path="/liked-pokemon" element={<SelectedCards />} />{" "}
          {/* Route for LikedPokemon page */}
          <Route path="*" element={<Home />} />{" "}
          {/* Fallback route for undefined paths */}
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
