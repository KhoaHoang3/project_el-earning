import React from 'react';
import Footer from '../../Component/Footer';
import Header from '../../Component/Header';
import { useSelector } from 'react-redux';
import {
  getCourseCode,
  getCourseDetail,
} from '../../redux/selectors';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';
import { USERINFO } from '../../axios/config';
import { useNavigate } from 'react-router-dom';
const { confirm } = Modal;

export default function CourseDetail() {
  const navigate = useNavigate();
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
  const { courseName } = useSelector(getCourseCode);
  const { courseDetail } = useSelector(getCourseDetail);
  const { hinhAnh, luotXem, moTa, tenKhoaHoc } = courseDetail;
  const renderButton = () => {
    if (localStorage.getItem(USERINFO)) {
      return (
        <button className="bg-sky-400 text-1 415screen:text-1.2 mt-[20px] rounded-lg text-white font-semibold  376screen:px-[30px] py-[20px] w-[100%] 1025screen:w-[50%]">
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
              MÔ TẢ KHÓA HỌC: {moTa}{' '}
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
