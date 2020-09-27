import { Breadcrumb, Table, Button ,Space} from "antd";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
const User = () => {
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

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
