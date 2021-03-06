import logo from './logo.svg';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Homescreen from './page/Homescreen';
import Register from './page/Register';
import Login from './page/Login';
import Course from './page/Course';
import { WOW } from 'wowjs';
import CourseDetail from './page/CourseDetail';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { USERINFO } from './axios/config';
import { getAccountInfoAction } from './redux/thunk/actions';
import UpdateInfo from './page/UpdateInfo';

function App() {
  var wow = new WOW({
    live: false,
  });
  wow.init();
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem(USERINFO)) {
      const action = getAccountInfoAction();
      dispatch(action);
    }
  }, [dispatch]);
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Homescreen />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/course/:id" element={<Course />}></Route>
        <Route
          exact
          path="/course-detail/:id"
          element={<CourseDetail />}
        />
        <Route exact path="/update-info" element={<UpdateInfo />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
