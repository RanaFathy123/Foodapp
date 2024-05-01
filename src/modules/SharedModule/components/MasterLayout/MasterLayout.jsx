import React from "react";
import SideBar from "./../SideBar/SideBar";
import NavBar from "./../Navbar/NavBar";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

export default function MasterLayout({setLoginData,loginData}) {
  return (
    <div className="container-fluid p-0">
      <div className="d-flex">
        <div >
          <SideBar setLoginData={setLoginData} />
        </div>
        <div className="w-100" >
          <NavBar loginData={loginData}/>
         
          <Outlet />
        </div>
      </div>
    </div>
  );
}
