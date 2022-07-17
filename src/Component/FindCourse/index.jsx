import React, { memo, useEffect } from 'react';
import { Select, Form } from 'antd';
import WOW from 'wowjs';
const { Option } = Select;

function FindCourse() {
  useEffect(() => {
    new WOW.WOW().init();
  }, []);
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className="find__course__section animate__animated wow animate__slideInUp flex flex-col w-[90%] 1367screen:w-[75%] 1367screen:flex-row justify-center align-middle mx-auto 890screen:mx-auto">
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
          <Form>
            <div className="course">
              <h1 className="text-1.5 font-light">Khóa học</h1>
              <Form.Item>
                <Select
                  style={{ width: '100%' }}
                  size="large"
                  placeholder={
                    <h2 className="text-gray-300 font-semibold relative top-[3px]">
                      Chọn khóa học
                    </h2>
                  }
                  optionFilterProp="children"
                  onChange={onChange}
                >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
                </Select>
              </Form.Item>
            </div>
            <div className="subject mt-6">
              <h1 className="text-1.5 font-light">Môn học</h1>
              <Form.Item>
                <Select
                  style={{ width: '100%' }}
                  size="large"
                  placeholder={
                    <h2 className="text-gray-300 font-semibold relative top-[3px]">
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
            </div>
            <button className="find__course__button text-white bg-sky-400 rounded-lg w-full font-semibold text-1.5 py-[20px] hover:bg-sky-500 transition-transform duration-75">
              TÌM KHÓA HỌC
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
export default memo(FindCourse);
