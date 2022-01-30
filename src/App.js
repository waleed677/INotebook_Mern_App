import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/noteState";
import Login from "./components/Login";
import Register from "./components/Register";
import Alert from "./components/Alert";
import { useState } from "react";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
   
    <NoteState>
      <Router>
        <Navbar />
        <Alert content={alert} />
        <div className="container">
        <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert} />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/login" element={<Login showAlert={showAlert} />} />
          <Route exact path="/register" element={<Register showAlert={showAlert} /> } />
        </Routes>
        </div>
      </Router>
      </NoteState>
  
  );
}

export default App;
