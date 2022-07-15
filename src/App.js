import logo from './logo.svg';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Homescreen from './page/Homescreen';
import Register from './page/Register';
import Login from './page/Login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Homescreen />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
