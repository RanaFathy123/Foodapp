import React, { useState } from "react";
import SideBar from "./../SideBar/SideBar";
import NavBar from "./../Navbar/NavBar";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

export default function MasterLayout({ setLoginData, loginData }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="container-fluid p-0">
      <div className="d-flex">
        <div>
          <SideBar
            setLoginData={setLoginData}
            loginData={loginData}
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />
        </div>
        <div
          className={
            isCollapsed
              ? "w-100  px-5 mx-4 left-side-collapsed"
              : "w-100 left-side-not-collapsed mx-4"
          }
        >
          <NavBar loginData={loginData} />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
