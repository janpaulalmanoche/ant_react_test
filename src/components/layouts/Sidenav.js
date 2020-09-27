import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
const SideNav = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { Sider, Header } = Layout;

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["2"]}
        className="menu_"
      >
        <Menu.Item
          key="1"
          onClick={() => setCollapsed(!collapsed)}
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        >
          Collapse
        </Menu.Item>

        <Menu.Item key="2" icon={<UserOutlined />}>
          <Link to="/">Role's & Permission's</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<UserOutlined />}>
          <Link to="/users">User</Link>
        </Menu.Item>

        <Menu.Item key="4" icon={<UploadOutlined />}>
          <Link to="/products">Product</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideNav;
