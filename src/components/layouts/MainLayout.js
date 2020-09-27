import React, { useState } from "react";
import { Layout } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,

} from '@ant-design/icons';
import SideNav from "./Sidenav";


const MainLayout = ({ children }) => {

  const { Header, Content } = Layout;

  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="container_">
      <SideNav/>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
          {children}
          </Content>
        </Layout>
      </Layout>
  );
}

export default MainLayout;
