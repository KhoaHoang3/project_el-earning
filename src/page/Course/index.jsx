import React, { useEffect } from 'react';
import Footer from '../../Component/Footer';
import Header from '../../Component/Header';
import {
  LikeOutlined,
  MessageOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { Avatar, List, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  courseBaseOnCode,
  getCourseCode,
} from '../../redux/selectors';
import { getListBaseOnCourseAction } from '../../redux/thunk/actions';
import { COURSE, maNhom } from '../../axios/config';

export default function Course() {
  const dispatch = useDispatch();
  const course = JSON.parse(localStorage.getItem(COURSE));
  const { courseCode } = useSelector(getCourseCode);
  console.log('code', courseCode);
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
    content: <p className="text-1">{item.moTa}</p>,
  }));

  useEffect(() => {
    const action = getListBaseOnCourseAction(courseCode, maNhom);
    dispatch(action);
  }, [dispatch, courseCode]);

  return (
    <>
      <section className="header">
        <Header />
      </section>

      <section className="course__info min-h-screen pt-[9rem] w-[90%] mx-auto">
        <div className="bg-white p-[30px] rounded-md shadow-lg shadow-sky-200">
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
