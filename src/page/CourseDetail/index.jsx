import React from 'react';
import Footer from '../../Component/Footer';
import Header from '../../Component/Header';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCourseCode,
  getCourseDetail,
  getUserAccountInfo,
} from '../../redux/selectors';
import {
  ExclamationCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';
import { USERINFO } from '../../axios/config';
import { useNavigate } from 'react-router-dom';
import { assignCourseAction } from '../../redux/thunk/actions';
import parse from 'html-react-parser';
const { confirm } = Modal;

export default function CourseDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseName } = useSelector(getCourseCode);
  const { courseDetail } = useSelector(getCourseDetail);
  const { hinhAnh, luotXem, moTa, tenKhoaHoc, maKhoaHoc } =
    courseDetail;
  const { userAccountInfo } = useSelector(getUserAccountInfo);
  const { chiTietKhoaHocGhiDanh } = userAccountInfo;

  const showConfirm = () => {
    confirm({
      title: 'Bạn phải đăng nhập để đăng ký khóa học !',
      icon: <ExclamationCircleOutlined />,
      okText: 'Đồng ý',
      cancelText: 'Hủy',

      onOk() {
        navigate('/login');
      },

      onCancel() {},
    });
  };

  const showAssign = (maKhoaHoc, taiKhoan) => {
    confirm({
      title: 'Bạn có muốn đăng ký khóa học này ?',
      icon: <CheckCircleOutlined style={{ color: 'green' }} />,
      okText: 'Đồng ý',
      cancelText: 'Hủy',

      onOk() {
        const action = assignCourseAction({ maKhoaHoc, taiKhoan });
        dispatch(action);
      },

      onCancel() {},
    });
  };

  const renderButton = () => {
    let userInfo = {};
    if (localStorage.getItem(USERINFO)) {
      userInfo = JSON.parse(localStorage.getItem(USERINFO));
      let code = chiTietKhoaHocGhiDanh.find(
        (item) => item.maKhoaHoc === maKhoaHoc
      );
      if (code) {
        return (
          <button className="bg-gray-400 text-1 415screen:text-1.2 mt-[20px] rounded-lg text-white font-semibold  376screen:px-[30px] py-[20px] w-[100%] 1025screen:w-[50%] cursor-no-drop">
            Khóa học đã đăng ký
          </button>
        );
      }
      return (
        <button
          onClick={() => {
            showAssign(maKhoaHoc, userInfo.taiKhoan);
          }}
          className="bg-sky-400 text-1 415screen:text-1.2 mt-[20px] rounded-lg text-white font-semibold  376screen:px-[30px] py-[20px] w-[100%] 1025screen:w-[50%]"
        >
          Đăng ký khóa học
        </button>
      );
    } else {
      return (
        <button
          onClick={() => {
            showConfirm();
          }}
          className="bg-sky-400 text-1 415screen:text-1.2 mt-[20px] rounded-lg text-white font-semibold  376screen:px-[30px] py-[20px] w-[100%] 1025screen:w-[50%]"
        >
          Đăng ký khóa học
        </button>
      );
    }
  };
  return (
    <>
      <section className="header">
        <Header />
      </section>
      <section className="course__detail min-h-[80vh] pt-[12rem] mb-[30px] 1025screen:mb-[0px]">
        <div className="max-w-[70%] animate__animated animate__zoomIn mx-auto flex flex-col-reverse 1025screen:flex 1025screen:flex-row justify-around rounded-lg border-4 border-sky-400 shadow-teal-200 shadow-lg py-[30px] px-[30px] ">
          <div className="course__description mt-[2rem] w-[100%]">
            <h1 className="text-1 415screen:text-1.5">
              TÊN KHÓA HỌC: {tenKhoaHoc}{' '}
            </h1>
            <p className="text-1 415screen:text-1.5">
              MÔ TẢ KHÓA HỌC: {parse(moTa)}{' '}
            </p>
            {renderButton()}
          </div>
          <div className="course__image w-[100%] 1025screen:w-[60%] h-[60%] 1025screen:ml-[20px] ">
            <img
              className=" w-[100%] h-[70%] rounded-md"
              src={`${hinhAnh}`}
              alt=""
            />
          </div>
        </div>
      </section>
      <section className="footer">
        <Footer />
      </section>
    </>
  );
}
