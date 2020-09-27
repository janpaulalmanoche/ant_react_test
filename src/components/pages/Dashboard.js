import React, { useState,useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import RolePermission from "../RolePermission";
import { notification } from 'antd';

const Dashboard = () => {

  useEffect ( ()=>{
  },[])

  return <MainLayout>
     <RolePermission/>
      </MainLayout>;
};

export default Dashboard;
