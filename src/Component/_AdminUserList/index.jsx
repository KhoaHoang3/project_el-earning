import React, { useState, useRef } from 'react';
import Highlighter from 'react-highlight-words';
import {
  SearchOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Button, Input, Space, Table, Tag, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getUserList } from '../../redux/selectors';
import EditUserDrawer from '../../Drawer/EditUserDrawer';
import { getUserInfo } from '../../redux/reducers/getUserListSlice';
import { deleteUserAction } from '../../redux/thunk/actions';
const { confirm } = Modal;

export default function AdminUserList() {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const dispatch = useDispatch();
  const { users } = useSelector(getUserList);

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
      title: 'Họ tên',
      dataIndex: 'hoTen',
      key: 'hoTen',
      width: '30%',
      align: 'center',

      ...getColumnSearchProps('hoTen'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '20%',
      align: 'center',

      ...getColumnSearchProps('email'),
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'soDt',
      key: 'soDt',
      align: 'center',

      ...getColumnSearchProps('soDT'),
    },

    {
      title: 'Loại người dùng',
      dataIndex: 'maLoaiNguoiDung',
      key: 'maLoaiNguoiDung',
      align: 'center',
      ...getColumnSearchProps('maLoaiNguoiDung'),

      render: (text, record, index) => {
        {
          return record.maLoaiNguoiDung === 'HV' ? (
            <Tag
              style={{ fontSize: '1.2rem', padding: '10px' }}
              color="green"
            >
              Học viên
            </Tag>
          ) : (
            <Tag
              style={{ fontSize: '1.2rem', padding: '10px' }}
              color="blue"
            >
              Giáo vụ
            </Tag>
          );
        }
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
                setIsModalVisible(true);
                dispatch(getUserInfo(record));
              }}
              className="bg-sky-400 py-[10px] px-[15px] rounded-md mr-[1rem]"
            >
              <i className="fa-solid fa-pen-to-square text-white font-light text-1.5"></i>
            </button>

            <button
              onClick={() => {
                showConfirm(record.taiKhoan);
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showConfirm = (taiKhoan) => {
    confirm({
      title: 'Bạn vẫn muốn xóa người dùng này ?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Đồng ý',
      cancelText: 'Hủy',

      onOk() {
        const action = deleteUserAction(taiKhoan);
        dispatch(action);
      },

      onCancel() {},
    });
  };
  return (
    <>
      <Table rowKey={'hoTen'} columns={columns} dataSource={users} />
      {isModalVisible && (
        <EditUserDrawer
          visible={isModalVisible}
          closeModal={setIsModalVisible}
        />
      )}
    </>
  );
}
