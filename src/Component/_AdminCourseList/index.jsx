import React, { useState, useRef, useEffect } from 'react';
import {
  SearchOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Button, Input, Space, Table, Modal } from 'antd';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteCourseAction,
  getCourseAction,
} from '../../redux/thunk/actions';
import { getCourse } from '../../redux/selectors';
import EditCourseDrawer from '../../Drawer/EditCourseDrawer';
import { getCourseDetailEdit } from '../../redux/reducers/courseDetailEditSlice';
const { confirm } = Modal;

export default function AdminCourseList() {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const dispatch = useDispatch();
  const { course } = useSelector(getCourse);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const action = getCourseAction();
    dispatch(action);
  }, []);
  const showConfirm = (maKhoaHoc) => {
    confirm({
      title: 'Bạn vẫn muốn xóa khóa học này?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Đồng ý',
      cancelText: 'Hủy',

      onOk() {
        const action = deleteCourseAction(maKhoaHoc);
        dispatch(action);
      },

      onCancel() {},
    });
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys, confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'Mã khóa học',
      dataIndex: 'maKhoaHoc',
      key: 'maKhoaHoc',
      width: '30%',
      align: 'center',
      render: (text, record, index) => {
        return <h1 className="text-1.2">{text}</h1>;
      },

      ...getColumnSearchProps('maKhoaHoc'),
    },
    {
      title: 'Tên khóa học',
      dataIndex: 'tenKhoaHoc',
      key: 'tenKhoaHoc',
      width: '20%',
      align: 'center',

      ...getColumnSearchProps('tenKhoaHoc'),
    },
    {
      title: 'Lượt xem',
      dataIndex: 'luotXem',
      key: 'luotXem',
      align: 'center',

      ...getColumnSearchProps('address'),
    },

    {
      title: 'Hình ảnh',
      dataIndex: 'hinhAnh',
      key: 'hinhAnh',
      align: 'center',
      width: '10%',
      render: (text, record, index) => {
        return (
          <img
            style={{ borderRadius: '10px' }}
            height={150}
            width={'100%'}
            src={record.hinhAnh}
          ></img>
        );
      },
    },

    {
      title: 'Thao tác',
      dataIndex: 'thaoTac',
      key: 'thaoTac',
      align: 'center',
      render: (text, record, index) => {
        return (
          <>
            <button
              onClick={() => {
                setVisible(true);
                dispatch(getCourseDetailEdit(record));
                console.log(record);
              }}
              className="bg-sky-400 py-[10px] px-[15px] rounded-md mr-[1rem]"
            >
              <i className="fa-solid fa-pen-to-square text-white font-light text-1.5"></i>
            </button>

            <button
              onClick={() => {
                showConfirm(record.maKhoaHoc);
              }}
              className="bg-red-400 py-[10px] px-[15px] rounded-md"
            >
              <i className="fa-solid fa-trash-can text-white font-light text-1.5"></i>
            </button>
          </>
        );
      },
    },
  ];
  return (
    <>
      <Table
        style={{ fontSize: '2rem' }}
        rowKey="maKhoaHoc"
        columns={columns}
        dataSource={course}
      />

      {visible && (
        <EditCourseDrawer
          visible={visible}
          closeDrawer={setVisible}
        />
      )}
    </>
  );
}
