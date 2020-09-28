import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, Alert, message,notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router-dom";
import {login} from '../../Services/Url';
import history from '../../history'
const Login = () => {
  const [isLoading, setLoading] = useState(false);
  const [errorMsg, setErrMsg] = useState();
  const [displayError, setDisplayError] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const openNotification = (title,message) => {
    notification.open({
      message: title,
      description:message,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };


  const onFinish = (values) => {
    // history.push('/')
    login(email,password).then( (r)=>{
    openNotification("Hi!","Your'e signed in. Welcome!!")
     window.location = "/";
    localStorage.setItem("token", r.data.access_token);
    localStorage.setItem("user_email", r.data.user.email);
    }).catch( (e)=>{
      message.error('Invalid Credentials, Please Try Again');
    });
  };



  return (
    <div className="login_wrapper">
      <div className="login">
        {displayError && (
          <div className="login__alert">
            <Alert
              message="Error"
              description={errorMsg}
              type="error"
              showIcon
            />
          </div>
        )}
        <div className="login__container">
          <center>
            <h1>Legna Logo</h1>
          </center>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please input valid email",
                },
              ]}
            >
              <Input
                size="large"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  min: 5,
                  message: "Password length should be more than 5",
                },
              ]}
            >
              <Input
                size="large"
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                size="large"
                style={{ marginRight: "9px" }}
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={isLoading}
              >
                Log in
              </Button>
              Or <a href="">register now!</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
