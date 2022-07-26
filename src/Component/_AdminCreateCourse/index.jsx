import React, { useState } from 'react';
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Upload,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { maNhom } from '../../axios/config';
import ReactQuill from 'react-quill';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { uploadCourseAction } from '../../redux/thunk/actions';

export default function AdminCreateCourse() {
  const getFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.file;
  };

  const dispatch = useDispatch();

  const submitCourseInfo = (values) => {
    console.log(values);
    const { ngayTao, hinhAnh } = values;
    const newNgayTao = moment(ngayTao).format('DD/MM/YYYY');
    const formData = new FormData();
    for (let key in values) {
      if (key === 'ngayTao') {
        formData.append('ngayTao', newNgayTao);
      } else if (key !== 'hinhAnh') {
        formData.append(key, values[key]);
      } else {
        formData.append('File', hinhAnh);
      }
    }
    console.log('mota', formData.get('moTa'));
    const action = uploadCourseAction(formData);
    dispatch(action);
  };
  return (
    <>
      <Form
        onFinish={submitCourseInfo}
        style={{ marginTop: '150px' }}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        size="large"
        initialValues={{
          maNhom: maNhom,
        }}
      >
        <Form.Item label="Mã nhóm" name={'maNhom'}>
          <Input
            name="maNhom"
            disabled
            style={{ fontWeight: 'bold' }}
          />
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
              message: 'Hãy nhập tên khóa học',
            },
          ]}
          label="Tên khóa học"
          name={'tenKhoaHoc'}
        >
          <Input name="tenKhoaHoc" />
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
              message: 'Hãy nhập mô tả khóa học',
            },
          ]}
          label="Mô tả khóa học"
          name={'moTa'}
        >
          <ReactQuill style={{ backgroundColor: 'white' }} />
        </Form.Item>

        <Form.Item label="Ngày tạo" name={'ngayTao'}>
          <DatePicker name="ngayTao" format={'DD/MM/YYYY'} />
        </Form.Item>

        <Form.Item label="Hình ảnh" name={'hinhAnh'}>
          <Upload
            name="hinhAnh"
            status={'done'}
            openFileDialogOnClick
            getValueFromEvent={getFile}
            accept=".png,.jpeg,.jpg,.doc"
            listType="picture"
            beforeUpload={(file) => {
              return false;
            }}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Tải hình lên</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="Thao tác">
          <Button htmlType="submit" type="primary">
            Thêm khóa học
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
