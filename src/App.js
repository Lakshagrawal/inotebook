import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import { Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">

      <Navbar></Navbar>
      <Routes> 
        <Route exact path='/' element= {<Home></Home>}></Route>
        <Route exact path='/about' element= {<About></About>}></Route>
      </Routes>

    </div>
  );
}

export default App;
