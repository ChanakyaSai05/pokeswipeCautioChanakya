import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { UserProvider } from "./context/UserContext";
import Pokemon from "./pages/Pokemon";
import Header from "./components/Header";
import SelectedCards from "./pages/SelectedCards";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon" element={<Pokemon />} />
          <Route path="/selected-pokemon" element={<SelectedCards />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
