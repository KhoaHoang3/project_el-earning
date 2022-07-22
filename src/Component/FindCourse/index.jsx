import React, { memo, useEffect, useState } from 'react';
import { Select, Form, Button, Input, Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseList } from '../../redux/selectors';
import {
  getListBaseOnCourseURL,
  getSubjectDetailURL,
} from '../../axios/apiURL';
import { maNhom, http } from '../../axios/config';
import { useNavigate } from 'react-router-dom';
import { getCourseDetail } from '../../redux/reducers/CourseDetailSlice';
import { toast } from 'react-toastify';
const { Option } = Select;

function FindCourse() {
  const { courseList } = useSelector(getCourseList);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [subject, setSubject] = useState([]);
  const [subjectDetail, setSubjectDetail] = useState({});
  console.log('subject', subject);
  console.log('subjectdetail', subjectDetail);

  const getSubjectBaseOnCourse = (value) => {
    async function callAPI() {
      try {
        const result = await http.get(
          `${getListBaseOnCourseURL}?maDanhMuc=${value}&MaNhom=${maNhom}`
        );
        setSubject(result.data);
      } catch (error) {
        toast.error(error.response.data, {
          position: 'top-center',
          autoClose: 1000,
        });
      }
    }
    callAPI();
  };

  const getSubjectDetail = (value) => {
    async function callAPI() {
      try {
        const result = await http.get(
          `${getSubjectDetailURL}?maKhoaHoc=${value}`
        );
        setSubjectDetail(result.data);
      } catch (error) {
        toast.error(error.response.data, {
          position: 'top-center',
          autoClose: 1000,
        });
      }
    }
    callAPI();
  };

  const onFinish = (values) => {
    const { course, subjectCode } = values;
    dispatch(getCourseDetail(subjectDetail));
    navigate(`/course-detail/${subjectCode}`);
  };

  return (
    <div className="find__course__section animate__animated animate__slideInUp wow slideInUp flex flex-col w-[90%] 1367screen:w-[75%] 1367screen:flex-row justify-center align-middle mx-auto 890screen:mx-auto">
      <div className="find__course__intro w-[100%] mx-auto 1367screen:mr-[150px] ">
        <h1 className="text-1.5 text-center 1367screen:text-left">
          CHÀO MỪNG BẠN ĐẾN VỚI E-LEARNING
        </h1>
        <h1 className="text-1.5 font-light text-center 1367screen:text-left">
          Bạn có thể tìm khóa học của chúng tôi ngay tại đây
        </h1>
      </div>
      <div className="find__course__select border mx-auto rounded-lg w-[90%] 1367screen:w-[100%]  border-sky-200 bg-white shadow-md shadow-sky-200 pl-[30px] pr-[30px] py-[30px]">
        <div className="">
          <h1 className="text-1.5">TÌM KIẾM KHÓA HỌC</h1>

          <Form form={form} onFinish={onFinish}>
            <h1 className="text-1.5 font-light">Khóa học</h1>

            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Hãy chọn khóa học',
                },
              ]}
              name={'course'}
            >
              <Select
                onChange={(value) => {
                  console.log(value);
                  getSubjectBaseOnCourse(value);
                }}
                style={{ width: '100%' }}
                size="large"
                placeholder={
                  <h2 className="text-gray-300 font-semibold relative top-[0px]">
                    Chọn khóa học
                  </h2>
                }
                optionFilterProp="children"
                options={courseList.map((item) => {
                  return {
                    label: item.tenDanhMuc,
                    value: item.maDanhMuc,
                  };
                })}
              ></Select>
            </Form.Item>
            <h1 className="text-1.5 font-light">Môn học</h1>

            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Hãy chọn môn học',
                },
              ]}
              name={'subjectCode'}
            >
              <Select
                onChange={(value) => {
                  getSubjectDetail(value);
                }}
                options={subject?.map((item) => {
                  return {
                    label: item.tenKhoaHoc,
                    value: item.maKhoaHoc,
                  };
                })}
                style={{ width: '100%' }}
                size="large"
                placeholder={
                  <h2 className="text-gray-300 font-semibold relative top-[0px]">
                    Chọn môn học
                  </h2>
                }
              ></Select>
            </Form.Item>

            <Form.Item>
              <button
                type="submit"
                className="find__course__button mt-[10px] text-white bg-sky-400 rounded-lg w-full font-semibold text-1.5 py-[20px] hover:bg-sky-500 transition-transform duration-75"
              >
                TÌM KHÓA HỌC
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
export default memo(FindCourse);
