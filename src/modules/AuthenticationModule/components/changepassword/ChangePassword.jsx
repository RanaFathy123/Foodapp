import React, { useState } from "react";
import { useForm } from "react-hook-form";
import logo from "../../../../assets/images/logo.svg";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ChangePassword({ logOut }) {
  const [checkShowPassword, setCheckShowPassword] = useState(false);
  const [checkShowConfirmPassword, setCheckShowConfirmPassword] =
    useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const showPassword = () => {
    setCheckShowPassword(!checkShowPassword);
  };
  const showConfirmPassword = () => {
    setCheckShowConfirmPassword(!checkShowConfirmPassword);
  };
  const onSubmit = async (data) => {
    try {
      const response = await axios.put(
        "https://upskilling-egypt.com:3006/api/v1/Users/ChangePassword",
        data,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response);
      logOut();
      toast.success(response.data.message);

      navigate("/login");
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.message); 
    }
  };
  return (
    <div className="form-content p-3">
      <img src={logo} alt="logo" className="w-75 mx-auto d-block mb-3" />
      <h3>Change Your Password</h3>
      <p className="text-muted">Enter your details below</p>
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
              <i className="fa-solid fa-eye-slash" onClick={showPassword}></i>
            )}
          </span>
        </div>
        {errors.oldPassword && (
          <div className="text-danger mb-3">{errors.oldPassword.message}</div>
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
              <i className="fa-solid fa-eye-slash" onClick={showPassword}></i>
            )}
          </span>
        </div>
        {errors.newPassword && (
          <div className="text-danger mb-3">{errors.newPassword.message}</div>
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
              <i className="fa-solid fa-eye" onClick={showConfirmPassword}></i>
            ) : (
              <i
                className="fa-solid fa-eye-slash"
                onClick={showConfirmPassword}
              ></i>
            )}
          </span>
        </div>
        {errors.confirmNewPassword && (
          <div className="text-danger mb-3">
            {errors.confirmNewPassword.message}
          </div>
        )}

        <button className="btn btn-success w-100">
          Change Password
        </button>
      </form>
    </div>
  );
}
