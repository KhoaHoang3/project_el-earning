import {
  ACCESSTOKEN,
  COURSE,
  http,
  maNhom,
  USERINFO,
} from '../../axios/config';
import {
  assignCourseURL,
  cancelCourseURL,
  deleteCourseURL,
  getAccountInfoURL,
  getCourseListURL,
  getCourseURL,
  getListBaseOnCourseURL,
  loginURL,
  registerURL,
  updateCourseInfoURL,
  uploadCourseURL,
  userUpdateInfoURL,
} from '../../axios/apiURL';
import { userRegister } from '../reducers/userRegisterSlice';
import { toast } from 'react-toastify';
import { userLoginData } from '../reducers/userLoginSlice';
import { getCourseList } from '../reducers/getCourseListSlice';
import { getCourse } from '../reducers/getCourseSlice';
import { courseBaseOnCode } from '../reducers/CourseSlice';
import { getUserAccountInfo } from '../reducers/userAccountInfoSlice';

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
      dispatch(courseBaseOnCode(result.data));
      // localStorage.setItem(COURSE, JSON.stringify(result.data));
    } catch (error) {}
  };
};

// account information
export const getAccountInfoAction = () => {
  return async (dispatch) => {
    try {
      const result = await http.post(getAccountInfoURL);
      dispatch(getUserAccountInfo(result.data));
    } catch (error) {}
  };
};

// assign course
export const assignCourseAction = (info, biDanh) => {
  return async (dispatch) => {
    try {
      const result = await http.post(assignCourseURL, info);

      // await dispatch(getListBaseOnCourseAction(biDanh, maNhom));
      dispatch(getAccountInfoAction());
      toast.success('Đăng ký khóa học thành công', {
        position: 'top-center',
        autoClose: 1000,
      });
    } catch (error) {
      toast.error(error.response.data, {
        position: 'top-center',
        autoClose: 1000,
      });
    }
  };
};

// user update infomation
export const userUpdateInfoAction = (info) => {
  return async (dispatch) => {
    try {
      const result = await http.put(userUpdateInfoURL, info);
      console.log(result);
      toast.success(
        'Cập nhật thông tin thành công, đăng nhập lại để thấy sự thay đổi',
        {
          position: 'top-center',
          autoClose: 2000,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const cancelCourseAction = (info) => {
  return async (dispatch) => {
    try {
      const result = await http.post(cancelCourseURL, info);

      dispatch(getAccountInfoAction());
      toast.success('Hủy khóa học thành công', {
        position: 'top-center',
        autoClose: 1500,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateCourseInfoAction = (formData) => {
  return async (dispatch) => {
    try {
      const result = await http.post(updateCourseInfoURL, formData);
      console.log(result);
      dispatch(getCourseAction());
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteCourseAction = (courseCode) => {
  return async (dispatch) => {
    try {
      const result = await http.delete(
        `${deleteCourseURL}?MaKhoaHoc=${courseCode}`
      );
      dispatch(getCourseAction());
      toast.success('Xóa khóa học thành công', {
        position: 'top-center',
        autoClose: 1000,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const uploadCourseAction = (formData) => {
  return async (dispatch) => {
    try {
      const result = await http.post(uploadCourseURL, formData);
      console.log(result);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.content, {
        position: 'top-center',
        autoClose: 1000,
      });
    }
  };
};
