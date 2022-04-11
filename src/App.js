import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import About from "./pages/About"
import Home from "./pages/Home"
import Cool from "./pages/Cool"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/cool' element={<Cool/>} />
      </Routes>
    </Router>
  );
}

export default App;
