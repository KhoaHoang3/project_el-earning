import React, { useEffect, useState } from 'react';
import Footer from '../../Component/Footer';
import Header from '../../Component/Header';
import {
  LikeOutlined,
  MessageOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { Avatar, List, Space, Breadcrumb } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  courseBaseOnCode,
  getCourseCode,
} from '../../redux/selectors';
import { getListBaseOnCourseAction } from '../../redux/thunk/actions';
import { COURSE, maNhom } from '../../axios/config';
import { NavLink } from 'react-router-dom';
import { getCourseDetail } from '../../redux/reducers/CourseDetailSlice';

export default function Course() {
  const dispatch = useDispatch();

  // use for render UI
  const { course } = useSelector(courseBaseOnCode);
  const { courseCode } = useSelector(getCourseCode);
  const { courseName } = useSelector(getCourseCode); // use for breadcrumb

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

        <button className="bg-sky-400 text-white font-semibold py-[5px] px-[10px] rounded-md">
          Đăng ký khóa học{' '}
        </button>
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
