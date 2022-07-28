import React, { memo, useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  Upload,
  Modal,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getUserList } from '../../redux/selectors';
import { http, maNhom } from '../../axios/config';
import { getTypeOfUserURL } from '../../axios/apiURL';
import { updateUserInfoAction } from '../../redux/thunk/actions';
import { toast } from 'react-toastify';

function EditUserDrawer({ visible, closeModal }) {
  const { userInfo } = useSelector(getUserList);
  const { taiKhoan, soDt, email, hoTen, maLoaiNguoiDung } = userInfo;
  const [userType, setUserType] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    async function callAPI() {
      try {
        const result = await http.get(getTypeOfUserURL);
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
  const submitUserInfo = (values) => {
    const action = updateUserInfoAction({ ...values, maNhom });
    dispatch(action);
  };
  console.log('userinfo', userInfo);
  return (
    <>
      <Modal
        style={{ width: '800px' }}
        footer={null}
        title="Chỉnh sửa thông người dùng"
        visible={visible}
        onOk={() => {
          closeModal(false);
        }}
        onCancel={() => {
          closeModal(false);
        }}
      >
        <Form
          onFinish={submitUserInfo}
          size="large"
          style={{ width: '700px' }}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          initialValues={{
            hoTen: hoTen,
            taiKhoan: taiKhoan,
            email: email,
            soDt: soDt,
            maLoaiNguoiDung: maLoaiNguoiDung,
          }}
        >
          <Form.Item label="Tài khoản" name={'taiKhoan'}>
            <Input name="taiKhoan" />
          </Form.Item>
          <Form.Item label="Họ tên" name={'hoTen'}>
            <Input name="hoTen" />
          </Form.Item>

          <Form.Item label="Email" name={'email'}>
            <Input name="email" />
          </Form.Item>

          <Form.Item label="Số điện thoại" name={'soDt'}>
            <Input name="soDt" />
          </Form.Item>

          <Form.Item label="Loại người dùng" name={'maLoaiNguoiDung'}>
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
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default memo(EditUserDrawer);
