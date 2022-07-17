import React, { memo, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DownOutlined } from '@ant-design/icons';
import { Button, Drawer } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCourseList,
  getUserLoginData,
} from '../../redux/selectors';
import { Avatar, Collapse } from 'antd';
import { getCourseListAction } from '../../redux/thunk/actions';
import { ACCESSTOKEN, USERINFO } from '../../axios/config';
const { Panel } = Collapse;

function Header() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const showDrawer = () => {
    setOpenDrawer(true);
  };
  const closeDrawer = () => {
    setOpenDrawer(false);
  };
  const dispatch = useDispatch();
  const { courseList } = useSelector(getCourseList);
  useEffect(() => {
    dispatch(getCourseListAction());
  }, [dispatch]);

  // const { userData } = useSelector(getUserLoginData);
  // const { hoTen } = userData;
  let userInfo = {};
  if (localStorage.getItem(USERINFO)) {
    userInfo = JSON.parse(localStorage.getItem(USERINFO));
  }
  const { hoTen } = userInfo;

  const renderUI = () => {
    if (localStorage.getItem(ACCESSTOKEN)) {
      return (
        <div className="header__user  pr-[5px] relative hidden 965screen:flex leading-leading-more-loose text-1.2 font-semibold decoration-pink-600">
          <span className="pr-2 relative bottom-1">
            <Avatar src={`https://joeschmoe.io/api/v1/${hoTen}`} />
          </span>
          <span className="inline-block pr-2 mr-2 text-black transition-all cursor-pointer">
            {hoTen}
            <i className="fa-solid fa-caret-down pl-2"></i>
            <div className="header__user__edit absolute left-0 w-[250px]">
              <ul className="divide-y-[2px] bg-white shadow-xl shadow-sky-200">
                <li className="hover:bg-sky-300 px-5">
                  Cập nhật thông tin
                </li>
                <li className="hover:bg-sky-300 px-5">ĐĂNG XUẤT</li>
              </ul>
            </div>
          </span>

          {/* <span className="hover:text-sky-400 transition-all cursor-pointer">
            ĐĂNG XUẤT
          </span> */}
        </div>
      );
    } else {
      return (
        <div className="header__login hidden 965screen:block">
          <NavLink to={'/register'}>
            <button className="register mr-3 py-3 px-6 text-1.2 font-medium bg-sky-400 rounded-full text-white hover:bg-sky-500 transition-all">
              ĐĂNG KÝ
            </button>
          </NavLink>
          <NavLink to={'/login'}>
            <button className="login mr-3 py-3 px-6 text-1.2 font-medium bg-sky-400 rounded-full text-white hover:bg-sky-500 transition-all">
              ĐĂNG NHẬP
            </button>
          </NavLink>
        </div>
      );
    }
  };

  const renderUIMobile = () => {
    if (localStorage.getItem(ACCESSTOKEN)) {
      return (
        <div className="nav__mobile flex flex-col text-center relative">
          <div className="user__login ">
            <Collapse defaultActiveKey={['1']}>
              <Panel
                header={
                  <div className="">
                    <span className="pr-2 relative bottom-1">
                      <Avatar
                        src={`https://joeschmoe.io/api/v1/${hoTen}`}
                      />
                    </span>
                    <span className=" relative left-[35px] inline-block pr-2 mr-2 text-black transition-all font-semibold text-1.2">
                      {hoTen}
                    </span>
                  </div>
                }
                key="1"
              >
                <h1 className="text-1.2 font-semibold cursor-pointer hover:text-sky-400 transition-all duration-0.5">
                  CẬP NHẬT THÔNG TIN
                </h1>
              </Panel>
            </Collapse>
          </div>
          <a
            className="mt-[1.2rem] text-1.2 text-black font-medium hover:text-sky-400 transition-all"
            href=""
          >
            TRANG CHỦ
          </a>
          <a
            className=" mt-[1.2rem] text-1.2 text-black font-medium hover:text-sky-400 transition-all"
            href=""
          >
            KHÓA HỌC
          </a>
          <a
            className="mb-[1.2rem] mt-[1.2rem] text-1.2 text-black font-medium  hover:text-sky-400 transition-all"
            href=""
          >
            LIÊN HỆ
          </a>

          <button className="login mt-5 w-full py-3 px-6 text-1.2 font-medium bg-sky-400 rounded-full text-white hover:bg-sky-500 transition-all">
            ĐĂNG XUẤT
          </button>
        </div>
      );
    } else {
      return (
        <div className="nav__mobile flex flex-col text-center relative">
          <a
            className="text-1.2 text-black font-medium hover:text-sky-400 transition-all"
            href=""
          >
            TRANG CHỦ
          </a>
          <a
            className=" mt-[1.2rem] text-1.2 text-black font-medium hover:text-sky-400 transition-all"
            href=""
          >
            KHÓA HỌC
          </a>
          <a
            className="mb-[1.2rem] mt-[1.2rem] text-1.2 text-black font-medium  hover:text-sky-400 transition-all"
            href=""
          >
            LIÊN HỆ
          </a>
          <NavLink to={'/register'}>
            <button className="register  w-full py-3 px-6 text-1.2 font-medium bg-sky-400 rounded-full text-white hover:bg-sky-500 transition-all">
              ĐĂNG KÝ
            </button>
          </NavLink>

          <NavLink to={'/login'}>
            <button className="login mt-5 w-full py-3 px-6 text-1.2 font-medium bg-sky-400 rounded-full text-white hover:bg-sky-500 transition-all">
              ĐĂNG NHẬP
            </button>
          </NavLink>
        </div>
      );
    }
  };

  return (
    <div className="header__section fixed w-full z-50 animate__animated animate__fadeInDown py-[1.5rem] mx-auto flex justify-between space-x-4 bg-white shadow-slate-500">
      {/* HEADER LOGO  */}
      <div className="header__logo pl-[1.5rem]">
        <h1 className="font-medium">E-LEARNING</h1>
      </div>

      {/* HEADER NAV AND LOGIN SECTION */}
      <div className="header__nav__login flex  pr-[1.5rem]">
        {/* NAVBAR ON DESKTOP SCREEN */}
        <div className="header__nav mr-[2rem] hidden 965screen:flex leading-leading-more-loose">
          <a
            className=" text-1.2 h-0 text-black font-medium hover:text-sky-400 transition-all"
            href="/"
          >
            TRANG CHỦ
          </a>
          <a className="course h-0 relative ml-[1.5rem] text-1.2 text-black font-medium hover:text-sky-400 transition-all">
            KHÓA HỌC
            <i className="fa-solid fa-caret-down pl-2"></i>
            <div className="list">
              <ul className="absolute shadow-xl shadow-sky-200 bg-white text-black w-[300px] text-center divide-y-[2px] left-[-94px] z-50">
                {courseList.map((item, index) => {
                  return (
                    <li
                      className="hover:bg-sky-200 duration-75 transition-colors"
                      key={index}
                    >
                      {item.tenDanhMuc}
                    </li>
                  );
                })}
              </ul>
            </div>
          </a>

          <a
            className="ml-[1.5rem] h-0 text-1.2 text-black font-medium  hover:text-sky-400 transition-all"
            href=""
          >
            LIÊN HỆ
          </a>
        </div>
        {/* LOGIN/REGISTER ON DESKTOP SCREEN */}
        {renderUI()}

        {/* NAVBAR ON MOBILE */}
        <div className="header__nav__mobile">
          <i
            onClick={() => {
              showDrawer();
            }}
            className=" fa fa-bars hidden text-2 relative top-[16px]"
          ></i>
          <Drawer
            placement="right"
            onClose={closeDrawer}
            visible={openDrawer}
          >
            {renderUIMobile()}
            {/* <div className="nav__mobile flex flex-col text-center relative">
              <a
                className="text-1.2 text-black font-medium hover:text-sky-400 transition-all"
                href=""
              >
                TRANG CHỦ
              </a>
              <a
                className=" mt-[1.2rem] text-1.2 text-black font-medium hover:text-sky-400 transition-all"
                href=""
              >
                KHÓA HỌC
              </a>
              <a
                className="mb-[1.2rem] mt-[1.2rem] text-1.2 text-black font-medium  hover:text-sky-400 transition-all"
                href=""
              >
                LIÊN HỆ
              </a>
              <NavLink to={'/register'}>
                <button className="register  w-full py-3 px-6 text-1.2 font-medium bg-sky-400 rounded-full text-white hover:bg-sky-500 transition-all">
                  ĐĂNG KÝ
                </button>
              </NavLink>

              <NavLink to={'/login'}>
                <button className="login mt-5 w-full py-3 px-6 text-1.2 font-medium bg-sky-400 rounded-full text-white hover:bg-sky-500 transition-all">
                  ĐĂNG NHẬP
                </button>
              </NavLink>
            </div> */}
          </Drawer>
        </div>
      </div>
    </div>
  );
}

export default memo(Header);
