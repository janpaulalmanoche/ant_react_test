import { Breadcrumb, Table, Button, Space } from "antd";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
const User = () => {
  const [users, setUsers] = useState([]);

  const dataSource = users.map((user, idx) => ({
    key: idx,
    id: user.id,
    name: user.name,
    address: user.address,
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
      dataIndex: "role",
      key: "role",
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


  useEffect( ()=>{

  },[]);

  return (
    <MainLayout>
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Dashboard</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>User's </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Table dataSource={dataSource} columns={columns} className="user_table" />
    </MainLayout>
  );
};

export default User;
