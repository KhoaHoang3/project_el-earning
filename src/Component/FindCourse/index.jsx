import React, { memo, useEffect, useState } from 'react';
import { Select, Form, Button, Input, Checkbox } from 'antd';
import { useSelector } from 'react-redux';
import { getCourseList } from '../../redux/selectors';
const { Option } = Select;

function FindCourse() {
  const { courseList } = useSelector(getCourseList);
  const [form] = Form.useForm();

  console.log('findCourse', courseList);
  const onFinish = (values) => {
    console.log(values);
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

            <Form.Item name={'course'}>
              <Select
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

            <Form.Item name={'subject'}>
              <Select
                style={{ width: '100%' }}
                size="large"
                placeholder={
                  <h2 className="text-gray-300 font-semibold relative top-[0px]">
                    Chọn môn học
                  </h2>
                }
                optionFilterProp="children"
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="tom">Tom</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <button
                type="submit"
                className="find__course__button text-white bg-sky-400 rounded-lg w-full font-semibold text-1.5 py-[20px] hover:bg-sky-500 transition-transform duration-75"
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
