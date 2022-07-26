import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import Item from 'antd/lib/list/Item';
import EditCourseDrawer from '../../Drawer/EditCourseDrawer';
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

export default function Admin() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={'250'}
      >
        <Menu
          theme="dark"
          defaultSelectedKeys={['/admin/course-list']}
          mode="inline"
          items={[
            // COURSE LIST
            {
              key: '/admin/course-list',
              icon: <i className="fa-solid fa-book"></i>,
              label: 'Danh sách khóa học',
              onClick: () => {
                navigate('/admin/course-list');
              },
            },

            {
              key: '/admin/create-course',
              icon: <i className="fa-solid fa-circle-plus"></i>,
              label: 'Thêm khóa học',
              onClick: () => {
                navigate('/admin/create-course');
              },
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          <h1 className="text-white text-center font-semibold text-1.5">
            E-LEARNING
          </h1>
        </Header>
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Outlet />
         
        </Content>
      </Layout>
    </Layout>
  );
}
