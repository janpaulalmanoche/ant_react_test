import axios from "axios";

let request = axios.create({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer` + localStorage.getItem("token"),
  },
});

let url = "http://127.0.0.1:8000/" + "api";

export const login = (email, password) => {
  return request.post(url + "/login", {
    email: email,
    password: password,
  });
};

// roles routes
export const roles = () => {
  return request.get(url + "/roles");
};

export const create_role_ = (role, guard_name) => {
  return request.post(url + "/roles", {
    name: role,
    guard_name: guard_name,
  });
};

export const update_role = (role_id, role) => {
  return request.patch(url + "/roles/" + role_id, {
    name: role,
  });
};

export const removed_permission_ = (role_id, permission_id_) => {
  return request.post(url + "/remove-permission", {
    role_id: role_id,
    permission_id: permission_id_,
  });
};

export const assign_permission = (role_id, permission_id) => {
  return request.post(url + "/assign-permission/", {
    role_id: role_id,
    permission_id: permission_id,
  });
};

// permission routes

export const fetch_permission_ = () => {
  return request.get(url + "/permissions");
};
