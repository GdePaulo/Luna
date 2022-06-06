import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import About from "./pages/About"
import Home from "./pages/Home"
import Cool from "./pages/Cool"
import Ai from "./pages/Ai"
import Savie from "./pages/Savie"
import Translate from "./pages/Translate"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/cool' element={<Cool/>} />
        <Route path='/ai' element={<Ai/>} />
        <Route path='/savie' element={<Savie/>} />
        <Route path='/translate' element={<Translate/>} />
      </Routes>
    </Router>
  );
}

export default App;
