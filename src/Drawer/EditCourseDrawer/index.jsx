import React, { useState } from 'react';
import {
  Button,
  Drawer,
  Space,
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
import ReactQuill from 'react-quill';
import { getCourseDetailEdit } from '../../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { updateCourseInfoAction } from '../../redux/thunk/actions';

export default function EditCourseDrawer({ visible, closeDrawer }) {
  const { courseDetail } = useSelector(getCourseDetailEdit);
  const dispatch = useDispatch();
  const {
    tenKhoaHoc,
    hinhAnh,
    moTa,
    ngayTao,
    nguoiTao,
    maNhom,
    maKhoaHoc,
  } = courseDetail;
  const { taiKhoan, hoTen } = nguoiTao;
  const oldImage = hinhAnh;
  console.log('courseDetail', courseDetail);
  const submitCourseInfo = (values) => {
    console.log(values);
    const { tenKhoaHoc, nguoiTao, moTa, hinhAnh, ngayTao } = values;
    const formData = new FormData();
    for (let key in values) {
      if (key !== 'hinhAnh') {
        formData.append(key, values[key]);
      } else if (values.hinhAnh === undefined) {
        formData.append('hinhAnh', oldImage);
      } else {
        formData.append('File', hinhAnh);
      }
    }
    const action = updateCourseInfoAction(formData);
    dispatch(action);
  };

  const getFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.file;
  };
  return (
    <div>
      <Drawer
        title={
          <h1 className=" relative top-[5px] text-1.2">
            Chỉnh sửa thông tin khóa học
          </h1>
        }
        placement="right"
        size={'large'}
        onClose={() => {
          closeDrawer(false);
        }}
        visible={visible}
        extra={
          <Space>
            <Button
              onClick={() => {
                closeDrawer(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                closeDrawer(false);
              }}
              type="primary"
            >
              OK
            </Button>
          </Space>
        }
      >
        {/* FORM */}
        <div className="mx-auto w-[100%]">
          <Form
            onFinish={submitCourseInfo}
            style={{ width: '800px' }}
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
              maKhoaHoc: maKhoaHoc,
              tenKhoaHoc: tenKhoaHoc,
              ngayTao: moment(ngayTao),
              nguoiTao: taiKhoan,
              moTa: moTa,
            }}
          >
            <Form.Item label="Mã khóa học" name={'maKhoaHoc'}>
              <Input
                name="maKhoaHoc"
                disabled
                style={{ fontWeight: 'bold' }}
              />
            </Form.Item>

            <Form.Item label="Mã nhóm" name={'maNhom'}>
              <Input
                name="maNhom"
                disabled
                style={{ fontWeight: 'bold' }}
              />
            </Form.Item>
            <Form.Item label="Tên khóa học" name={'tenKhoaHoc'}>
              <Input name="tenKhoaHoc" />
            </Form.Item>
            <Form.Item label="Mô tả khóa học" name={'moTa'}>
              <ReactQuill />
            </Form.Item>
            <Form.Item label="Ngày tạo" name={'ngayTao'}>
              <DatePicker name="ngayTao" format={'YYYY/MM/DD'} />
            </Form.Item>
            <Form.Item label="Người tạo" name={'nguoiTao'}>
              <Input name="nguoiTao" />
            </Form.Item>

            <Form.Item label="Hình ảnh" name={'hinhAnh'}>
              <Upload
                status={'done'}
                openFileDialogOnClick
                getValueFromEvent={getFile}
                accept=".png,.jpeg,.jpg,.doc"
                listType="picture"
                beforeUpload={(file) => {
                  console.log(file);
                  return false;
                }}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>
                  Tải hình lên
                </Button>
              </Upload>
            </Form.Item>

            <Form.Item label="Thao tác">
              <Button htmlType="submit" type="primary">
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Drawer>
    </div>
  );
}