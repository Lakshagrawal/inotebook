import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import { Route, Routes } from "react-router-dom";
import NoteState from "./context/notes/NoteState";


function App() {
  return (
    <div className="App">
      <NoteState>
        <Navbar></Navbar>
        <div className="continer">
          <Routes>
            <Route exact path="/" element={<Home></Home>}></Route>
            <Route exact path="/about" element={<About></About>}></Route>
          </Routes>
        </div>
      </NoteState>
    </div >
  );
}

export default App;
