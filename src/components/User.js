import {
  Breadcrumb,
  Table,
  Button,
  Space,
  Modal,
  Input,
  Select,
  message,
} from "antd";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { PlusOutlined } from "@ant-design/icons";
import {
  fetch_users,
  create_users,
  update_users,
  roles,
  fetch_user,
} from "../Services/Url";
const User = () => {
  const [users, setUsers] = useState([]);

  const [selectUser, setSelectedUser] = useState({
    name: "",
    address: "",
  });

  const [mode, setMode] = useState("");

  const [visible, setVisible] = useState(false);
  const [loading, setLoding] = useState(false);

  const [roles_, setRoles] = useState([]);

  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact_no, setContactNo] = useState("");

  const [role_toggle, setRoleToggle] = useState(false);

  const [user_id, setUserId] = useState("");
  const fetch = () => {
    roles()
      .then((r) => {
        setRoles(r.data.roles);
      })
      .catch((e) => {
        // error_(e.response.data.message);
      });
  };

  const dataSource = users.map((user, idx) => ({
    key: idx,
    id: user.id,
    email: user.email,
    name: user.name,
    address: user.address,
    roles: user.roles,
    contact_no: user.contact_no,
  }));

  const { Option } = Select;

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
            <p key={idx}>{r.name}</p>
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
          <Button type="secondary" onClick={() => fetch_single_user(record.id)}>
            View Details {record.id}
          </Button>
        </Space>
      ),
    },
  ];

  const fetch_users_ = () => {
    fetch_users().then((r) => {
      setUsers(r.data.users);
    });
  };

  useEffect(() => {
    fetch_users_();
  }, []);
  useEffect(() => {
    fetch();
  }, []);

  const handleOk = () => {
    setLoding(!loading);

    if (mode == "Add User") {
      // setTimeout(() => {
      create_users(name, email, password, address, contact_no, role).then(
        (r) => {
          fetch_users_();
          success("New user was successfully created");
          setName("");
          setEmail("");
          setPassword("");
          setAddress("");
          setContactNo("");
        }
      );
      setVisible(!visible);
      setLoding(!loading);
      // }, 1000);
    } else {
      // setTimeout(() => {
      update_users(
        user_id,
        name,
        email,
        password,
        address,
        contact_no,
        role
      ).then((r) => {
        fetch_users_();
        success(" user was successfully updated");
        setName("");
        setEmail("");
        setPassword("");
        setAddress("");
        setContactNo("");
      });
      setVisible(!visible);
      setLoding(false);
      // }, 1000);
    }
  };

  const option_roles = () => {
    return roles_.map((role, idx) => (
      <Option value={role.id} key={idx}>
        {role.name}
      </Option>
    ));
  };

  function handleChange(value) {
    setRole(value);
  }

  const fetch_single_user = (user_id) => {
    setUserId(user_id);
    fetch_user(user_id).then((r) => {
      setName(r.data.users.name);
      setEmail(r.data.users.email);
      setPassword(r.data.users.password);
      setAddress(r.data.users.address);
      setRole(r.data.users.roles[0].name)
      setContactNo(r.data.users.contact_no);
      setVisible(!visible);
      setMode("Edit User");
      setRoleToggle(true)
    });
  };

  const success = (message_) => {
    message.success(message_);
  };

  const add_user = () => {
    setVisible(!visible);
    setMode("Add User");
    setRoleToggle(false)
  };
  return (
    <MainLayout>
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Dashboard</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>User's </Breadcrumb.Item>
          <Breadcrumb.Item>
            {" "}
            <a onClick={() => add_user()}>
              {" "}
              Add User <PlusOutlined />{" "}
            </a>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Table dataSource={dataSource} columns={columns} className="user_table" />

      <Modal
        afterClose={() =>
          setSelectedUser({
            name: "",
            address: "",
          })
        }
        visible={visible}
        title={mode}
        onOk={() => setLoding(!loading)}
        onCancel={() => setVisible(!visible)}
        footer={[
          <div>
            <Button key="back" onClick={() => setVisible(!visible)}>
              Return
            </Button>
            {name.length <= 0 || contact_no <= 0 ? (
              <Button key="submit" type="primary" disabled>
                {mode == "Add User" ? <p> Create</p> : <p> Update</p>}
              </Button>
            ) : (
              <Button
                key="submit"
                type="primary"
                loading={loading}
                onClick={() => handleOk()}
              >
                {mode == "Add User" ? <p> Create</p> : <p> Update</p>}
              </Button>
            )}
          </div>,
        ]}
      >
        <div className="input_u">
          <Input
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input_u">
          <Input
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input_u">
          <Input.Password
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input_u">
          <p>
            {" "}
            Role :{" "}
            {role_toggle ? (
              <p>{role} </p>
            ) : (
              <Select
                defaultValue="Select Role"
                style={{ width: 120 }}
                onChange={handleChange}
              >
                {option_roles()}
              </Select>
            )}
          </p>
        </div>
        <div className="input_u">
          <Input
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="input_u">
          <Input
            value={contact_no}
            placeholder="Contact No"
            onChange={(e) => setContactNo(e.target.value)}
          />
        </div>
      </Modal>
      {selectUser.name}
    </MainLayout>
  );
};

export default User;
