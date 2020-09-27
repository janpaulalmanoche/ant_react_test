import React, { useState } from "react";
import { Layout, Menu ,Image } from "antd";
import { Link } from "react-router-dom";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { MenuUnfoldOutlined, MenuFoldOutlined,LogoutOutlined  } from "@ant-design/icons";
import {logout} from '../../Services/Url'
import history from '../../history'
const SideNav = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const { Sider, Header } = Layout;

  const logout_=()=>{
    logout().then( (r)=>{
      localStorage.removeItem("token")
    })
  }

  console.log(props)
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
          disabled={true}
          className="first"
        >    <Image
        width={150}
        className="profile_pic"
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      />
    <p>{localStorage.getItem("user_email")}</p>
        </Menu.Item>

        <Menu.Item key="2" icon={<UserOutlined />}>
           Role's & Permission's 
        </Menu.Item>
        <Menu.Item key="3" icon={<UserOutlined />} onClick={()=>history.push('/users')}  >
        <Link to="/users">  User </Link>
        </Menu.Item>

        <Menu.Item key="4" icon={<UploadOutlined />}>
        Product 
        </Menu.Item>

        <Menu.Item key="5" icon={<LogoutOutlined />} onClick={()=>logout_()}>
       Product 
        </Menu.Item>

      </Menu>
    </Sider>
  );
};

export default SideNav;
