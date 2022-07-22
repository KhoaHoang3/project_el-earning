import React, { useState } from 'react';
import Footer from '../../Component/Footer';
import Header from '../../Component/Header';
import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAccountInfo } from '../../redux/selectors';
import {
  cancelCourseAction,
  userUpdateInfoAction,
} from '../../redux/thunk/actions';
import { Avatar, List, Space, Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  LikeOutlined,
  MessageOutlined,
  StarOutlined,
} from '@ant-design/icons';
const { TabPane } = Tabs;
const { confirm } = Modal;

export default function UpdateInfo() {
  const { userAccountInfo } = useSelector(getUserAccountInfo);
  const {
    email,
    hoTen,
    matKhau,
    soDT,
    taiKhoan,
    maLoaiNguoiDung,
    maNhom,
    chiTietKhoaHocGhiDanh,
  } = userAccountInfo;
  console.log(userAccountInfo);
  const [userInfo, setUserInfo] = useState({
    hoTen: hoTen,
    email: email,
    soDT: soDT,
    matKhau: matKhau,
    taiKhoan: taiKhoan,
    maLoaiNguoiDung: maLoaiNguoiDung,
    maNhom: maNhom,
  });
  const [type, setType] = useState('password');
  const [eye, setEye] = useState(
    <i className="fa-solid fa-eye-slash absolute top-[35px] right-[32px] text-1.2 text-gray-500 hover:text-black cursor-pointer"></i>
  );
  const dispatch = useDispatch();
  const handleChangeType = () => {
    if (type === 'password') {
      setType('text');
      setEye(
        <i className="fa-solid fa-eye absolute top-[35px] right-[32px] text-1.2 text-gray-500 hover:text-black cursor-pointer"></i>
      );
    } else {
      setType('password');
      setEye(
        <i className="fa-solid fa-eye-slash absolute top-[35px] right-[32px] text-1.2 text-gray-500 hover:text-black cursor-pointer"></i>
      );
    }
  };
  const handleChangeInput = (e) => {
    let { id, value } = e.target;
    setUserInfo({
      ...userInfo,
      [id]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const action = userUpdateInfoAction(userInfo);
    dispatch(action);
  };

  const data = chiTietKhoaHocGhiDanh.map((item) => ({
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
        <button
          onClick={() => {
            console.log(item);
            showConfirm(item.maKhoaHoc);
          }}
          className="bg-red-500 py-[10px] px-[20px] text-white text-1 font-semibold rounded-md"
        >
          Hủy khóa học
        </button>
      </div>
    ),
  }));
  const showConfirm = (maKhoaHoc) => {
    confirm({
      title: 'Bạn vẫn muốn xóa khóa học này ? ',
      icon: <ExclamationCircleOutlined />,

      onOk() {
        const action = cancelCourseAction(maKhoaHoc);
        dispatch(action);
      },

      onCancel() {},
    });
  };
  return (
    <>
      <section className="header">
        <Header />
      </section>

      <section className="update__info min-h-[75vh]">
        <div className="pt-[8rem] w-[80%] mx-auto relative">
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Thông tin tài khoản" key="1">
              <form onSubmit={handleSubmit} action="">
                {/* NAME */}
                <div className="text-field flex flex-col rounded bg-gray-200 mb-[1.2rem] w-[40%] mx-auto mt-[10px] ">
                  <label
                    htmlFor="hoTen"
                    className="text-gray-700 font-bold text-1.2 mb-2 pl-3 pt-3"
                  >
                    Họ tên
                  </label>
                  <input
                    onChange={handleChangeInput}
                    value={userInfo.hoTen}
                    id="hoTen"
                    className="bg-gray-200 text-gray-700 pl-3 text-1.2 rounded w-full focus:outline-none border-b-4 border-gray-300 focus:border-blue-500 transition-all duration-300"
                    type="text"
                  />
                </div>
                {/* EMAIL */}
                <div className="text-field flex flex-col rounded bg-gray-200 mb-[1.2rem] w-[40%] mx-auto mt-[10px] ">
                  <label
                    htmlFor="email"
                    className="text-gray-700 font-bold text-1.2 mb-2 pl-3 pt-3"
                  >
                    Email
                  </label>
                  <input
                    onChange={handleChangeInput}
                    value={userInfo.email}
                    id="email"
                    className="bg-gray-200 text-gray-700 pl-3 text-1.2 rounded w-full focus:outline-none border-b-4 border-gray-300 focus:border-blue-500 transition-all duration-300"
                    type="text"
                  />
                </div>

                {/* PASSWORD */}
                <div className="text-field relative flex flex-col rounded bg-gray-200 mb-[1.2rem] w-[40%] mx-auto mt-[10px] ">
                  <label
                    htmlFor="matKhau"
                    className="text-gray-700 font-bold text-1.2 mb-2 pl-3 pt-3"
                  >
                    Mật khẩu
                  </label>
                  <input
                    onChange={handleChangeInput}
                    value={userInfo.matKhau}
                    id="matKhau"
                    className="bg-gray-200 text-gray-700 pl-3 text-1.2 rounded w-full focus:outline-none border-b-4 border-gray-300 focus:border-blue-500 transition-all duration-300"
                    type={type}
                  />
                  <span
                    onClick={() => {
                      handleChangeType();
                    }}
                  >
                    {eye}
                  </span>
                </div>
                {/* PHONE NUMBER */}
                <div className="text-field flex flex-col rounded bg-gray-200 mb-[1.2rem] w-[40%] mx-auto mt-[10px] ">
                  <label
                    htmlFor="soDT"
                    className="text-gray-700 font-bold text-1.2 mb-2 pl-3 pt-3"
                  >
                    Số điện thoại
                  </label>
                  <input
                    onChange={handleChangeInput}
                    value={userInfo.soDT}
                    id="soDT"
                    className="bg-gray-200 text-gray-700 pl-3 text-1.2 rounded w-full focus:outline-none border-b-4 border-gray-300 focus:border-blue-500 transition-all duration-300"
                    type="text"
                  />
                </div>

                <button
                  type="submit"
                  className="update w-[40%] absolute left-[50%] translate-x-[-50%] mt-3 py-6 px-6 text-1.2 font-medium bg-sky-400 rounded-full text-white hover:bg-sky-500 transition-all"
                >
                  CẬP NHẬT
                </button>
              </form>
            </TabPane>
            <TabPane tab="Khóa học đăng ký" key="2">
              <div className="p-[10px] mb-[20px]">
                <List
                  itemLayout="vertical"
                  size="large"
                  pagination={{
                    pageSize: 3,
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
            </TabPane>
          </Tabs>
        </div>
      </section>

      <section className="footer">
        <Footer />
      </section>
    </>
  );
}
