import {
  ACCESSTOKEN,
  COURSE,
  http,
  maNhom,
  USERINFO,
} from '../../axios/config';
import {
  getCourseListURL,
  getCourseURL,
  getListBaseOnCourseURL,
  loginURL,
  registerURL,
} from '../../axios/apiURL';
import { userRegister } from '../reducers/userRegisterSlice';
import { toast } from 'react-toastify';
import { userLoginData } from '../reducers/userLoginSlice';
import { getCourseList } from '../reducers/getCourseListSlice';
import { getCourse } from '../reducers/getCourseSlice';
import { courseBaseOnCode } from '../reducers/CourseSlice';

export const userRegisterAction = (userData, maNhom, navigate) => {
  return async (dispatch) => {
    try {
      const result = await http.post(registerURL, {
        ...userData,
        maNhom,
      });
      const { taiKhoan } = result.data;
      dispatch(userRegister(taiKhoan));
      toast.success('Đăng ký tài khoản thành công', {
        position: 'top-center',
        autoClose: 1000,
      });

      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      toast.error(error.response.data, {
        position: 'top-center',
        autoClose: 1000,
      });
    }
  };
};

export const userLoginAction = (userData, navigate) => {
  return async (dispatch) => {
    try {
      const result = await http.post(loginURL, userData);
      dispatch(userLoginData(result.data));
      toast.success('Đăng nhập thành công', {
        position: 'top-center',
        autoClose: 1000,
      });
      localStorage.setItem(USERINFO, JSON.stringify(result.data));
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      toast.error(error.response.data, {
        position: 'top-center',
        autoClose: 1000,
      });
    }
  };
};

export const getCourseListAction = () => {
  return async (dispatch) => {
    try {
      const result = await http.get(getCourseListURL);
      dispatch(getCourseList(result.data));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data, {
        position: 'top-center',
        autoClose: 1000,
      });
    }
  };
};

export const getCourseAction = () => {
  return async (dispatch) => {
    try {
      const result = await http.get(
        `${getCourseURL}?MaNhom=${maNhom}`
      );
      const action = getCourse(result.data);
      dispatch(action);
    } catch (error) {
      toast.error(error.response.data, {
        position: 'top-center',
        autoClose: 1000,
      });
    }
  };
};

// get list base on course
export const getListBaseOnCourseAction = (course, maNhom) => {
  return async (dispatch) => {
    try {
      const result = await http.get(
        `${getListBaseOnCourseURL}?maDanhMuc=${course}&MaNhom=${maNhom}`
      );
      console.log(result);
      dispatch(courseBaseOnCode(result.data));
      localStorage.setItem(COURSE, JSON.stringify(result.data));
    } catch (error) {
      toast.error(error.response.data, {
        position: 'top-center',
        autoClose: 1000,
      });
    }
  };
};
