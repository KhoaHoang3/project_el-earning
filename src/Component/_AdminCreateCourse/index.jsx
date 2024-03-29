import React, { useEffect, useState } from 'react';
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
import { http, maNhom } from '../../axios/config';
import ReactQuill from 'react-quill';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import parse from 'html-react-parser';
import {
  getUserListAction,
  uploadCourseAction,
} from '../../redux/thunk/actions';
import { getCourseListURL, getUserListURL } from '../../axios/apiURL';
import { toast } from 'react-toastify';
import { getUserList } from '../../redux/selectors';

export default function AdminCreateCourse() {
  const getFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const dispatch = useDispatch();
  const [desc, setDesc] = useState('');
  const [course, setCourse] = useState([]);
  const { users } = useSelector(getUserList);

  useEffect(() => {
    async function callAPI() {
      try {
        const result = await http.get(getCourseListURL);
        setCourse(result.data);
      } catch (error) {
        toast.error(error.response.data, {
          position: 'top-center',
          autoClose: 1000,
        });
      }
    }
    callAPI();
    const action = getUserListAction();
    dispatch(action);
  }, []);

  const submitCourseInfo = (values) => {
    const {
      danhGia,
      HINHANH,
      luotXem,
      maDanhMucKhoaHoc,
      maKhoaHoc,
      maNhom,
      moTa,
      NGAYTAO,
      taiKhoanNguoiTao,
      tenKhoaHoc,
      biDanh,
    } = values;
    const ngayTao = moment(NGAYTAO).format('DD/MM/YYYY');

    let hinhAnh = '';
    for (let index = 0; index < HINHANH.length; index++) {
      hinhAnh = HINHANH[index].name;
    }
    const action = uploadCourseAction({
      tenKhoaHoc,
      biDanh,
      danhGia,
      hinhAnh,
      luotXem,
      maDanhMucKhoaHoc,
      maKhoaHoc,
      maNhom,
      moTa,
      ngayTao,
      taiKhoanNguoiTao,
    });
    dispatch(action);
  };

  const handelSetDesc = (e) => {
    setDesc(e);
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
              message: 'Hãy nhập mã khóa học',
            },
          ]}
          label="Mã khóa học"
          name={'maKhoaHoc'}
        >
          <Input name="maKhoaHoc" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Hãy nhập bí danh khóa học',
            },
          ]}
          label="Bí danh khóa học"
          name={'biDanh'}
        >
          <Input name="biDanh" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Hãy chọn loại khóa học',
            },
          ]}
          label="Loại khóa học"
          name={'maDanhMucKhoaHoc'}
        >
          <Select
            name="maDanhMucKhoaHoc"
            options={course.map((item) => {
              return {
                label: item.tenDanhMuc,
                value: item.maDanhMuc,
              };
            })}
          ></Select>
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
              message: 'Hãy chọn người tạo',
            },
          ]}
          label="Người tạo"
          name={'taiKhoanNguoiTao'}
        >
          <Select
            name="taiKhoanNguoiTao"
            options={users
              .filter((user) => user.maLoaiNguoiDung === 'GV')
              .map((user) => {
                return { label: user.hoTen, value: user.taiKhoan };
              })}
          ></Select>
        </Form.Item>
        <Form.Item label="Lượt xem" name={'luotXem'}>
          <InputNumber name="luotXem"></InputNumber>
        </Form.Item>

        <Form.Item label="Đánh giá" name={'danhGia'}>
          <InputNumber name="danhGia"></InputNumber>
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
          initialValue=""
        >
          <ReactQuill
            value={desc}
            onChange={handelSetDesc}
            style={{ backgroundColor: 'white' }}
          />
        </Form.Item>

        <Form.Item label="Ngày tạo" name={'NGAYTAO'}>
          <DatePicker name="NGAYTAO" format={'DD/MM/YYYY'} />
        </Form.Item>

        <Form.Item
          valuePropName="fileList"
          label="Hình ảnh"
          name={'HINHANH'}
          getValueFromEvent={getFile}
        >
          <Upload
            name="HINHANH"
            status={'done'}
            openFileDialogOnClick
            accept=".png,.jpeg,.jpg,.doc"
            listType="picture"
            beforeUpload={(file) => {
              console.log(file);
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
