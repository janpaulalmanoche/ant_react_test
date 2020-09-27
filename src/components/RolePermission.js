import React, { useState, useEffect } from "react";
import {
  Table,
  Tag,
  Collapse,
  Breadcrumb,
  Space,
  Button,
  message,
  Modal,
  Divider,
  notification,
  Input,
} from "antd";
import { Link } from "react-router-dom";
import {
  roles,
  create_role_,
  fetch_permission_,
  assign_permission,
  removed_permission_,
} from "../Services/Url";
import { AppstoreAddOutlined } from "@ant-design/icons";
import axios from "axios";
const RolePermission = () => {
  const { Panel } = Collapse;
  const [permissions__, setPermission] = useState([]);
  const [roles_, setRoles] = useState([
    // {
    //   id: 1,
    //   name: "loading",
    //   permissions: [
    //     {
    //       id: 1,
    //       name: "loading",
    //     },
    //   ],
    // },
  ]);

  const [modal_, setModal] = useState(false);

  const [roleInput, setRoleInput] = useState("");

  const create_role = () => {
    create_role_(roleInput, "web").then((r) => {
      fetch();
      remove_permission_notif("new role was successfully created");
    }).catch((e)=>{
      error_(e.response.data.message);
    });
    setModal(false);

  };

  const [selectedRoleInPanel, setSelectedRole] = useState({
    id: 0,
    name: "empty",
  });

  const colors = () => {
    const colors = [
      "magenta",
      "red",
      "volcano",
      "orange",
      "gold",
      "lime",
      "green",
      "cyan",
      "blue",
      "geekblue",
      "purple",
      "pink",
      "yellow",
    ];

    const random = Math.floor(Math.random() * colors.length);
    return colors[random];
  };

  const panel_ = () => {
    return roles_.map((role_, idx) => (
      <Panel header={role_.name} key={idx}>
        <div className="permission_div">
          {role_.permissions.length <= 0 ? (
            <div> NO PERMISSIONS.... </div>
          ) : (
            <div>
              {role_.permissions.map((permission_, idx) => (
                <Tag
                  closable
                  color={colors()}
                  key={idx}
                  onClose={() => remove_permission(role_.id, permission_.id)}
                  style={{
                    marginTop: "5px",
                    marginBottom: "5px",
                    marginRight: "5px",
                  }}
                >
                  {permission_.name}
                </Tag>
              ))}
            </div>
          )}
        </div>
      </Panel>
    ));
  };

  const remove_permission_notif = (message) => {
    notification.open({
      message: "Message",
      description: message,
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  function callback(key) {
    if (key.length > sessionStorage.getItem("past_count")) {
      // console.log(key);
      // console.log("fetch");
      let key_length = key.length;
      if (key_length == 1) {
        console.log(roles_[key].name);
        setSelectedRole(roles_[key]);
      } else {
        setSelectedRole(roles_[key[key_length - 1]]);
        console.log(roles_[key[key_length - 1]].name);
        sessionStorage.setItem("past_count", key.length);
      }
      sessionStorage.setItem("past_count", key.length);
    } else {
      console.log("dont fetchs");
      sessionStorage.setItem("past_count", key.length);
    }
  }

  const columns = [
    {
      title: "Permission",
      dataIndex: "permission",
      key: "permission",
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Action",
      key: "action",
      render: (text, permission) => (
        <Space size="middle">
          {selectedRoleInPanel.id == 0 ? (
            <Button disabled type="success">
              Assign Permission
            </Button>
          ) : (
            <Button
              type="success"
              onClick={() => assign_permission_to_role(permission.id)}
            >
              Assign Permission
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const dataSource = permissions__.map((per_, idex) => ({
    key: idex,
    id: per_.id,
    permission: per_.name,
  }));

  const fetch = () => {
    roles().then((r) => {
      setRoles(r.data.roles);
    }).catch((e)=>{
      // error_(e.response.data.message);
    });
  };

  const fetch_permission = () => {
    fetch_permission_().then((r) => {
      setPermission(r.data.permissions);
    });
  };

  const remove_permission = (role_id, permission_id) => {
    removed_permission_(role_id, permission_id).then((r) => {
      remove_permission_notif(r.data.message);
      fetch();
    });
  };

  const error_ = (message_) => {
    message.error(message_);
  };

  const assign_permission_to_role = (permissioID) => {
    assign_permission(selectedRoleInPanel.id, permissioID)
      .then((r) => {
        remove_permission_notif(r.data.message);
        fetch();
      })
      .catch((e) => {
        console.log(e.response.data.message);
        error_(e.response.data.message);
      });
  };

  useEffect(() => {
    fetch();
    fetch_permission();
    sessionStorage.setItem("past_count", 0);
  }, []);

  return (
    <div>
      <Modal
        title="Create New Role"
        style={{ top: 40 }}
        okButtonProps={false}
        visible={modal_}
        key="00809809"
        footer={[
          <div>
            <Button
              key="back"
              onClick={() => {
                setModal(false);
              }}
            >
              Close
            </Button>

            {roleInput.length <= 0 ? (
              <Button key="submit_me" disabled>
                Submit
              </Button>
            ) : (
              <Button key="submit_me" onClick={() => create_role()}>
                Submit
              </Button>
            )}
          </div>,
        ]}
      >
        <Input
          prefix="Role:"
          onChange={(e) => setRoleInput(e.target.value)}
          placeholder="enter role name"
          style={{ marginTop: "15px" }}
        />
      </Modal>

      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            {" "}
            <Link to="/">Dashboard</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Role's & Permission's </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="box_containter">
        <div style={{ marginTop: "20px" }} className="roles">
          <div className="head_">
            <div className="hh">Role's & Permission's</div>

            <div className="ll">
              <Button type="success" onClick={() => setModal(true)}>
                {" "}
                <AppstoreAddOutlined />
                Add{" "}
              </Button>
            </div>
          </div>
      <Collapse onChange={callback}>{roles_.length <= 0 ?
      <span> No Roles </span> : panel_()}</Collapse>
        </div>
        <div style={{ marginTop: "20px" }} className="user_">
          {selectedRoleInPanel.name == "empty" ? (
            <div className="head_">Permission's</div>
          ) : (
            <div className="head_" style={{ backgroundColor: "#ff0000a8" }}>
              Assign Permission's to{" "}
              <span
                style={{
                  // color: "#1c33e794",
                  paddingRight: "7px",
                  paddingLeft: "7px",
                  textTransform: "uppercase",
                  fontWeight: "bolder",
                }}
              >
                {selectedRoleInPanel.name}
              </span>{" "}
              Role
            </div>
          )}

          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={{ pageSize: 8 }}
          />
        </div>
      </div>
    </div>
  );
};

export default RolePermission;
