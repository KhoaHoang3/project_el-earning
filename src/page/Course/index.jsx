import React, { useEffect, useState } from 'react';
import Footer from '../../Component/Footer';
import Header from '../../Component/Header';
import { Avatar, List, Space, Breadcrumb, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  courseBaseOnCode,
  getCourseCode,
  getUserAccountInfo,
  getUserLoginData,
} from '../../redux/selectors';
import { getListBaseOnCourseAction } from '../../redux/thunk/actions';
import { COURSE, maNhom, USERINFO } from '../../axios/config';
import { NavLink, useNavigate } from 'react-router-dom';
import { getCourseDetail } from '../../redux/reducers/CourseDetailSlice';
import {
  ExclamationCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import {
  assignCourseAction,
  getAccountInfoAction,
} from '../../redux/thunk/actions.js';

const { confirm } = Modal;

export default function Course() {
  const dispatch = useDispatch();

  // use for render UI
  const { course } = useSelector(courseBaseOnCode);
  const { courseCode } = useSelector(getCourseCode);
  const { courseName } = useSelector(getCourseCode); // use for breadcrumb
  const { userData } = useSelector(getUserLoginData);
  const { taiKhoan } = userData;
  const { userAccountInfo } = useSelector(getUserAccountInfo);
  const { chiTietKhoaHocGhiDanh } = userAccountInfo;

  const navigate = useNavigate();

  useEffect(() => {
    const action = getListBaseOnCourseAction(courseCode, maNhom);
    dispatch(action);
  }, [dispatch, courseCode]);

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
      cancelText: 'Hủy',
      okText: 'Đồng ý',

      onOk() {
        const action = assignCourseAction(
          { maKhoaHoc, taiKhoan },
          courseCode
        );
        dispatch(action);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      },

      onCancel() {},
    });
  };

  const renderButton = (courseCode) => {
    let userInfo = {};
    if (localStorage.getItem(USERINFO)) {
      userInfo = JSON.parse(localStorage.getItem(USERINFO));
      let code = chiTietKhoaHocGhiDanh.find(
        (item) => item.maKhoaHoc === courseCode
      );
      if (code) {
        return (
          <button className="bg-gray-400 text-white font-bold py-[5px] px-[10px] rounded-md cursor-no-drop">
            Khóa học đã đăng ký
          </button>
        );
      }
      return (
        <button
          onClick={() => {
            console.log(courseCode, userInfo.taiKhoan);
            showAssign(courseCode, userInfo.taiKhoan);
          }}
          className="bg-sky-400 text-white font-semibold py-[5px] px-[10px] rounded-md"
        >
          Đăng ký khóa học{' '}
        </button>
      );
    } else {
      return (
        <button
          onClick={() => {
            showConfirm();
          }}
          className="bg-sky-400 text-white font-semibold py-[5px] px-[10px] rounded-md"
        >
          Đăng ký khóa học{' '}
        </button>
      );
    }
  };

  const data = course.map((item) => ({
    key: `${item.maKhoaHoc}`,
    image: (
      <img
        className="w-[200px] h-[150px] rounded-md"
        src={`${item.hinhAnh}`}
      ></img>
    ),
    title: (
      <h1 className="text-1.2">Tên khóa học: {item.tenKhoaHoc}</h1>
    ),
    description: (
      <h1 className="text-1.2">Người xem: {item.luotXem}</h1>
    ),
    content: (
      <div>
        <p className="text-1">
          <span className="font-semibold">Mô tả khóa học:</span>{' '}
          {item.moTa}
        </p>

        {renderButton(item.maKhoaHoc)}
      </div>
    ),
  }));

  return (
    <>
      <section className="header">
        <Header />
      </section>

      <section className="course__info min-h-[105vh] pt-[9rem] w-[90%] mx-auto animate__animated animate__zoomIn">
        <div className="">
          <Breadcrumb>
            <Breadcrumb.Item className="text-1.2">
              Khóa học
            </Breadcrumb.Item>

            <Breadcrumb.Item className="text-1.2">
              {courseName}
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="bg-white p-[10px] rounded-md shadow-lg shadow-sky-200">
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              pageSize: 5,
            }}
            dataSource={data}
            renderItem={(item) => (
              <List.Item key={item.key} extra={item.image}>
                <List.Item.Meta
                  title={<a href={item.href}>{item.title}</a>}
                  description={item.description}
                />
                {item.content}
              </List.Item>
            )}
          />
        </div>
      </section>

      <section className="footer">
        <Footer />
      </section>
    </>
  );
}
