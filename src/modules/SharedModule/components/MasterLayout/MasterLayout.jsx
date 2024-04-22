import React from "react";
import SideBar from "./../SideBar/SideBar";
import NavBar from "./../Navbar/NavBar";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

export default function MasterLayout() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <SideBar />
        </div>
        <div className="col-md-9">
          <NavBar />
          <Header />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
