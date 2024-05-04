import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import toogler from "../../../../assets/images/3.png";

import Modal from "react-bootstrap/Modal";
import ChangePassword from "../../../AuthenticationModule/components/changepassword/ChangePassword";

export default function SideBar({ setLoginData, loginData }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [show, setShow] = useState(false);

  const toggle = () => {
    setIsCollapsed(!isCollapsed);
  };
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token");
    setLoginData(null);
    navigate("/login");
  };
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <ChangePassword logOut={logOut} />
        </Modal.Body>
      </Modal>
      <div className="sidebar-container p-0 h-100 min-vh-100 ">
        <Sidebar
          collapsed={isCollapsed}
          breakPoint="lg"
          onBackdropClick={() => setToggled(false)}
          toggled={toggled}
          width="243px"
          className="h-100"
        >
          <Menu>
            <MenuItem
              className=" mt-3 toggle-img "
              onClick={toggle}
              width="100"
              icon={
                <img
                  style={{ width: "170px", padding: "15px" }}
                  className="m-5"
                  src={toogler}
                  alt="toogle img"
                />
              }
            ></MenuItem>
            <MenuItem
              icon={<i className="fa fa-home"></i>}
              component={<Link to="/dashboard" />}
            >
              Home
            </MenuItem>
            {loginData?.userGroup == "SuperAdmin" ? (
              <MenuItem
                icon={<i className="fa fa-user"></i>}
                component={<Link to="/dashboard/users" />}
              >
                Users
              </MenuItem>
            ) : (
              ""
            )}
            <MenuItem
              icon={<i className="fa-solid fa-table" />}
              component={<Link to="/dashboard/reciepes" />}
            >
              Recipes
            </MenuItem>
            { loginData?.userGroup == "SuperAdmin"?<MenuItem
              icon={<i className="fa-solid fa-calendar-days" />}
              component={<Link to="/dashboard/categories" />}
            >
              Categories
            </MenuItem>:''}
            {loginData?.userGroup == "SystemUser" ?<MenuItem
              icon={<i className="fa-regular fa-heart"></i>}
              component={<Link to="/dashboard/favorites" />}
            >
              Favorites
            </MenuItem>:''}
            <MenuItem
              onClick={handleShow}
              icon={<i className="fa-solid fa-lock-open" />}
            >
              Change Password
            </MenuItem>
            <MenuItem
              icon={<i className="fa-solid fa-right-from-bracket" />}
              onClick={logOut}
            >
              Logout
            </MenuItem>
          </Menu>
        </Sidebar>

        <i
          className="fa-solid fa-bars btn btn-dark"
          onClick={() => setToggled(!toggled)}
        ></i>

        {/* <button onClick={logOut} className='btn btn-danger'>LogOut</button> */}
      </div>
    </>
  );
}
