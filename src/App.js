import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/noteState";

function App() {
  return (
    <div className="container">
    <NoteState>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
        </Routes>
      </Router>
      </NoteState>
    </div>
  );
}

export default App;
