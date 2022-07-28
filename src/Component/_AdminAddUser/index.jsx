import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { toast } from 'react-toastify';
import { http, maNhom } from '../../axios/config';
import { getTypeOfUserURL } from '../../axios/apiURL';
import { addUserAction } from '../../redux/thunk/actions';
import { useDispatch } from 'react-redux';

export default function AdminAddUser() {
  const [userType, setUserType] = useState([]);
  const dispatch = useDispatch();
  const submitUserInfo = (values) => {
    console.log(values);
    const action = addUserAction({ ...values, maNhom });
    dispatch(action);
  };

  useEffect(() => {
    async function callAPI() {
      try {
        const result = await http.get(getTypeOfUserURL);
        console.log(result);
        setUserType(result.data);
      } catch (error) {
        toast.error(error.response.data, {
          position: 'top-center',
          autoClose: 1000,
        });
      }
    }
    callAPI();
  }, []);
  return (
    <>
      <Form
        onFinish={submitUserInfo}
        size="large"
        style={{ marginTop: '150px' }}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
      >
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Hãy nhập tài khoản',
            },
          ]}
          label="Tài khoản"
          name={'taiKhoan'}
        >
          <Input name="taiKhoan" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Hãy nhập mật khẩu',
            },
          ]}
          label="Mật khẩu"
          name={'matKhau'}
        >
          <Input.Password name="matKhau" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Hãy nhập họ tên',
            },
          ]}
          label="Họ tên"
          name={'hoTen'}
        >
          <Input name="hoTen" />
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
              message: 'Hãy nhập email',
              type: 'email',
            },
          ]}
          label="Email"
          name={'email'}
        >
          <Input name="email" />
        </Form.Item>

        <Form.Item label="Số điện thoại" name={'soDt'}>
          <Input name="soDt" />
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
              message: 'Hãy chọn loại người dùng',
            },
          ]}
          label="Loại người dùng"
          name={'maLoaiNguoiDung'}
        >
          <Select
            options={userType.map((item) => {
              return {
                label: item.tenLoaiNguoiDung,
                value: item.maLoaiNguoiDung,
              };
            })}
          />
        </Form.Item>

        <Form.Item label="Thao tác">
          <Button type="primary" htmlType="submit">
            Thêm người dùng
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
