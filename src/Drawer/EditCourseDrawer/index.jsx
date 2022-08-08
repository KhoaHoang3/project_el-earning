import React, { memo, useEffect, useState } from 'react';
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
import {
  getCourseDetailEdit,
  getUserList,
} from '../../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { http } from '../../axios/config';
import { getCourseListURL } from '../../axios/apiURL';
import { toast } from 'react-toastify';
import {
  getUserListAction,
  updateCourseAction,
  uploadCourseImageAction,
} from '../../redux/thunk/actions';

function EditCourseDrawer({ visible, closeDrawer }) {
  const { courseDetail } = useSelector(getCourseDetailEdit);
  const [course, setCourse] = useState([]);
  const { users } = useSelector(getUserList);
  console.log(users);
  const dispatch = useDispatch();

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
  }, [dispatch]);

  const {
    tenKhoaHoc,
    hinhAnh,
    moTa,
    ngayTao,
    nguoiTao,
    maNhom,
    maKhoaHoc,
    danhMucKhoaHoc,
    biDanh,
  } = courseDetail;
  console.log('courseDetail', courseDetail);
  const { taiKhoan, hoTen } = nguoiTao;
  const { maDanhMucKhoaHoc, tenDanhMucKhoaHoc } = danhMucKhoaHoc;
  const oldImage = hinhAnh;

  const submitCourseInfo = (values) => {
    console.log(values);
    const { tenKhoaHoc, nguoiTao, moTa, hinhAnh, ngayTao } = values;
    const formData = new FormData();
    formData.append('tenKhoaHoc', tenKhoaHoc);
    formData.append('File', values.hinhAnh);

    // const action = uploadCourseImageAction(formData);
    // dispatch(action);

    const actionUpdate = updateCourseAction(values);
    dispatch(actionUpdate);
  };

  const getFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
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
              taiKhoanNguoiTao: taiKhoan,
              moTa: moTa,
              biDanh: biDanh,
              // maDanhMucKhoaHoc: maDanhMucKhoaHoc,
              maDanhMucKhoaHoc: tenDanhMucKhoaHoc,
            }}
          >
            <Form.Item label="Mã nhóm" name={'maNhom'}>
              <Input
                name="maNhom"
                disabled
                style={{ fontWeight: 'bold' }}
              />
            </Form.Item>

            <Form.Item label="Mã khóa học" name={'maKhoaHoc'}>
              <Input name="maKhoaHoc" />
            </Form.Item>

            <Form.Item label="Bí danh" name={'biDanh'}>
              <Input name="biDanh" />
            </Form.Item>
            <Form.Item label="Tên khóa học" name={'tenKhoaHoc'}>
              <Input name="tenKhoaHoc" />
            </Form.Item>
            <Form.Item
              label="Loại khóa học"
              name={'maDanhMucKhoaHoc'}
            >
              <Select
                defaultValue={maDanhMucKhoaHoc}
                options={course.map((item) => {
                  return {
                    label: item.tenDanhMuc,
                    value: item.maDanhMuc,
                  };
                })}
                name="maDanhMucKhoaHoc"
              ></Select>
            </Form.Item>
            <Form.Item label="Mô tả khóa học" name={'moTa'}>
              <ReactQuill />
            </Form.Item>
            <Form.Item label="Ngày tạo" name={'ngayTao'}>
              <DatePicker format={'DD/MM/YYYY'} />
            </Form.Item>
            <Form.Item label="Người tạo" name={'taiKhoanNguoiTao'}>
              <Select
                options={users
                  .filter((user) => user.maLoaiNguoiDung === 'GV')
                  .map((user) => {
                    return {
                      label: user.hoTen,
                      value: user.taiKhoan,
                    };
                  })}
              ></Select>
            </Form.Item>

            <Form.Item
              valuePropName="fileList"
              getValueFromEvent={getFile}
              label="Hình ảnh"
              name={'hinhAnh'}
            >
              <Upload
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

export default memo(EditCourseDrawer);
