import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import About from "./pages/About"
import Projects from "./pages/Projects"
import Home from "./pages/Home"
import Cool from "./pages/Cool"
import Ai from "./pages/Ai"
import Savie from "./pages/Savie"
import Translate from "./pages/Translate"
import Spellcheck from "./pages/Spellcheck"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/projects' element={<Projects/>} />
        <Route path='/cool' element={<Cool/>} />
        <Route path='/ai' element={<Ai/>} />
        <Route path='/savie' element={<Savie/>} />
        <Route path='/translate' element={<Translate/>} />
        <Route path='/spellcheck' element={<Spellcheck/>} />
      </Routes>
    </Router>
  );
}

export default App;
