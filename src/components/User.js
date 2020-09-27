import { Breadcrumb, Table, Button, Space,Modal } from "antd";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import {PlusOutlined} from '@ant-design/icons'
import { fetch_users, create_users, update_users } from "../Services/Url";
const User = () => {
  const [users, setUsers] = useState([]);

  const [selectUser,setSelectedUser] = useState({});

  const [visible,setVisible] = useState(false);
  const [loading,setLoding] = useState(false);
  const dataSource = users.map((user, idx) => ({
    key: idx,
    id: user.id,
    name: user.name,
    address: user.address,
    roles: user.roles,
    contact_no: user.contact_no,
  }));

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Role",
      dataIndex: "roles",
      key: "roles",
      render: (text, record) => (
        <Space size="middle">
          {record.roles.map((r, idx) => (
            <p>{r.name}</p>
          ))}
        </Space>
      ),
    },
    {
      title: "Contact No.",
      dataIndex: "contact_no",
      key: "contact_no",
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button type="secondary">View Details</Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetch_users().then((r) => {
      setUsers(r.data.users);
    });
  }, []);

  const handleOk = () => {
    setLoding(!loading)
    setTimeout(() => {
      setVisible(!visible);
      setLoding(!loading);
    }, 3000);
  };
  return (
    <MainLayout>
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Dashboard</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>User's </Breadcrumb.Item>
          <Breadcrumb.Item> <a onClick={()=>setVisible(!visible)}> Add User <PlusOutlined/> </a></Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Table dataSource={dataSource} columns={columns} className="user_table" />

      <Modal
          visible={visible}
          title="Title"
          onOk={()=>setLoding(!loading)}
          onCancel={()=>setVisible(!visible)}
          footer={[
            <Button key="back" onClick={()=>setVisible(!visible)}>
              Return
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={()=>handleOk()}>
              Submit
            </Button>,
          ]}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>


    </MainLayout>
  );
};

export default User;
