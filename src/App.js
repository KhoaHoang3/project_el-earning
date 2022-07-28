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
import Admin from './page/_Admin';
import AdminCourseList from './Component/_AdminCourseList';
import CourseList from './Component/CourseList';
import AdminCreateCourse from './Component/_AdminCreateCourse';
import AdminUserList from './Component/_AdminUserList';
import AdminAddUser from './Component/_AdminAddUser';

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
        <Route exact path="/admin" element={<Admin />}>
          <Route
            exact
            path="/admin/course-list"
            element={<AdminCourseList />}
          />
          <Route
            exact
            path="/admin/create-course"
            element={<AdminCreateCourse />}
          />
          <Route
            exact
            path="/admin/user-list"
            element={<AdminUserList />}
          />

          <Route
            exact
            path="/admin/add-user"
            element={<AdminAddUser />}
          />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
