import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import PokemonDetails from "./pages/PokemonDetails/PokemonDetails";
import NotFound from "./pages/NotFound/NotFound";
import Compare from "./pages/Compare/Compare";
import Header from "./components/Header/Header";

function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/pokemon/:name" element={<PokemonDetails />} />
        <Route path="/comparisionPage" element={<Compare />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
