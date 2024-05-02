import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import toogler from "../../../../assets/images/3.png";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import logo from '../../../../assets/images/logo.svg'
import { toast } from "react-toastify";
import axios from "axios";

export default function SideBar({ setLoginData }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [show, setShow] = useState(false);
  const [checkShowPassword, setCheckShowPassword] = useState(false);
  const [checkShowConfirmPassword, setCheckShowConfirmPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

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
  const showPassword = () => {
    setCheckShowPassword(!checkShowPassword);
  };
  const showConfirmPassword = () => {
    setCheckShowConfirmPassword(!checkShowConfirmPassword);
  };
  const onSubmit = async(data) => {
    console.log(data);
    try {
      const response = await axios.put(
        "https://upskilling-egypt.com:3006/api/v1/Users/ChangePassword",
        data,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response);
      toast.success("Login Successfully");
    
   
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="form-content p-3">
            <img src={logo} alt="logo"  className="w-75 mx-auto d-block mb-3"/>
            <h3>Change Your Password</h3>
            <p className="text-muted">
            Enter your details below
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group mb-3">
                <span className="input-group-text " id="basic-addon1">
                  <i className="fa fa-key"></i>
                </span>
                <input
                  type={checkShowPassword ? "text" : "password"}
                  className="form-control border-start border-secondary"
                  placeholder="oldPassword"
                  {...register("oldPassword", {
                    required: "oldPassword is Required",
                    minLength: {
                      value: 6,
                      message: "oldPassword Must Be 6 Character",
                    },
                  })}
                />
                <span className="input-group-text" id="basic-addon1">
                  {checkShowPassword ? (
                    <i className="fa-solid fa-eye" onClick={showPassword}></i>
                  ) : (
                    <i
                      className="fa-solid fa-eye-slash"
                      onClick={showPassword}
                    ></i>
                  )}
                </span>
              </div>
              {errors.oldPassword && (
                <div className="text-danger m-4">{errors.oldPassword.message}</div>
              )}
            
              <div className="input-group mb-3">
                <span className="input-group-text " id="basic-addon1">
                  <i className="fa fa-key"></i>
                </span>
                <input
                  type={checkShowPassword ? "text" : "password"}
                  className="form-control border-start border-secondary"
                  placeholder="newPassword"
                  {...register("newPassword", {
                    required: "newPassword is Required",
                    minLength: {
                      value: 6,
                      message: "newPassword Must Be 6 Character",
                    },
                  })}
                />
                <span className="input-group-text" id="basic-addon1">
                  {checkShowPassword ? (
                    <i className="fa-solid fa-eye" onClick={showPassword}></i>
                  ) : (
                    <i
                      className="fa-solid fa-eye-slash"
                      onClick={showPassword}
                    ></i>
                  )}
                </span>
              </div>
              {errors.newPassword && (
                <div className="text-danger m-4">{errors.newPassword.message}</div>
              )}
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa fa-key"></i>
                </span>
                <input
                  type={checkShowConfirmPassword ? "text" : "password"}
                  className="form-control border-start border-secondary"
                  placeholder="Confirm New Password"
                  {...register("confirmNewPassword", {
                    required: "Confirm New Password is Required",
                    minLength: {
                      value: 6,
                      message: "Password Must Be 6 Character",
                    },
                    validate: (value) =>
                      watch("newPassword") == value || "New Password do not match",
                  })}
                />
                <span className="input-group-text" id="basic-addon1">
                  {checkShowConfirmPassword ? (
                    <i
                      className="fa-solid fa-eye"
                      onClick={showConfirmPassword}
                    ></i>
                  ) : (
                    <i
                      className="fa-solid fa-eye-slash"
                      onClick={showConfirmPassword}
                    ></i>
                  )}
                </span>
              </div>
              {errors.confirmPassword && (
                <div className="text-danger m-4">
                  {errors.confirmPassword.message}
                </div>
              )}
              <div className="links d-flex justify-content-end my-4">
               
                <Link
                  to="/login"
                  className="text-success text-decoration-none "
                >
                  Login?
                </Link>
              </div>
              <button className="btn btn-success  w-100" onClick={logOut}>Change Password</button>
            </form>
          </div>
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
            <MenuItem
              icon={<i className="fa fa-user"></i>}
              component={<Link to="/dashboard/users" />}
            >
              Users
            </MenuItem>
            <MenuItem
              icon={<i className="fa-solid fa-table" />}
              component={<Link to="/dashboard/reciepes" />}
            >
              Recipes
            </MenuItem>
            <MenuItem
              icon={<i className="fa-solid fa-calendar-days" />}
              component={<Link to="/dashboard/categories" />}
            >
              Categories
            </MenuItem>
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
