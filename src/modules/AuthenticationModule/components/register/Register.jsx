import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../../../assets/images/logo.svg";
import { toast } from "react-toastify";
import axios from "axios";
import { axiosInstance } from "../../../../axiosConfig/axiosInstance";
export default function Register() {
  const [checkShowPassword, setCheckShowPassword] = useState(false);
  const [checkShowConfirmPassword, setCheckShowConfirmPassword] =
    useState(false);
  const [fileInputContent, setFileInputContent] = useState(
    "Drag & Drop or Choose a Item Image to Upload"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();

  const handleInputContent = () => {
    setFileInputContent("File Uploaded Successfully");
  };
  const appendToFormData = (data) => {
    let formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("country", data.country);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("profileImage", data.profileImage[0]);
    return formData;
  };
  const onSubmit = async (data) => {
    let resgiterFormData = appendToFormData(data);
    try {
      const response = await axiosInstance.post(
        "/Users/Register",
        resgiterFormData
      );
      console.log(response);
      toast.success(response.data.message);
      navigate("/verifyaccount");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const showPassword = () => {
    setCheckShowPassword(!checkShowPassword);
  };
  const showConfirmPassword = () => {
    setCheckShowConfirmPassword(!checkShowConfirmPassword);
  };
  return (
    <>
      <div className="auth-bg ">
        <div className="container-fluid bg-overlay">
          <div className="row min-vh-100 h-100 justify-content-center align-items-center">
            <div className="col-md-9 bg-white p-5 border rounded border-2 form-body">
              <div className="text-center">
                <img src={logo} alt="" className="w-50" />
              </div>
              <div className="form-content p-3">
                <h3>Register</h3>
                <p className="text-muted">
                  Welcome Back! Please enter your details
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="input-group mb-3 ">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="fa fa-envelope"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control border-start border-secondary"
                          placeholder="UserName"
                          {...register("userName", {
                            required: "userName is Required",
                            pattern: {
                              value:
                                /^[A-Za-z]+\d+$/,
                              message: "The userName must contain characters and end with numbers",
                            },
                          })}
                        />
                      </div>
                      {errors.userName && (
                        <div className="text-danger mb-4">
                          {errors.userName.message}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <div className="input-group mb-3 ">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="fa fa-envelope"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control border-start border-secondary"
                          placeholder="Enter Your E-mail"
                          {...register("email", {
                            required: "Email is Required",
                            pattern: {
                              value:
                                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                              message: "Email is Invalid",
                            },
                          })}
                        />
                      </div>
                      {errors.email && (
                        <div className="text-danger mb-4">
                          {errors.email.message}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="fa fa-key"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control border-start border-secondary"
                          placeholder="country"
                          {...register("country", {
                            required: "country is Required",
                          })}
                        />
                      </div>
                      {errors.country && (
                        <div className="text-danger mb-4">
                          {errors.country.message}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <div className="input-group mb-3 ">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="fa fa-key"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control border-start border-secondary"
                          placeholder="PhoneNumber"
                          {...register("PhoneNumber", {
                            required: "PhoneNumber is Required",
                          })}
                        />
                      </div>
                      {errors.PhoneNumber && (
                        <div className="text-danger mb-4">
                          {errors.PhoneNumber.message}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="input-group mb-3">
                        <span className="input-group-text " id="basic-addon1">
                          <i className="fa fa-key"></i>
                        </span>
                        <input
                          type={checkShowPassword ? "text" : "password"}
                          className="form-control border-start border-secondary"
                          placeholder="Password"
                          {...register("password", {
                            required: "Password is Required",
                            minLength: {
                              value: 6,
                              message: "Password Must Be 6 Character",
                            },
                            pattern: {
                              value:
                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                              message:
                                "Password must include at least one lowercase letter, one uppercase letter, one number, and one special character",
                            },
                          })}
                        />
                        <span className="input-group-text" id="basic-addon1">
                          {checkShowPassword ? (
                            <i
                              className="fa-solid fa-eye"
                              onClick={showPassword}
                            ></i>
                          ) : (
                            <i
                              className="fa-solid fa-eye-slash"
                              onClick={showPassword}
                            ></i>
                          )}
                        </span>
                      </div>
                      {errors.password && (
                        <div className="text-danger mb-4">
                          {errors.password.message}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="fa fa-key"></i>
                        </span>
                        <input
                          type={checkShowConfirmPassword ? "text" : "password"}
                          className="form-control border-start border-secondary"
                          placeholder="Confirm Password"
                          {...register("confirmPassword", {
                            required: "Confirm Password is Required",
                            minLength: {
                              value: 6,
                              message: "Password Must Be 6 Character",
                            },
                            pattern: {
                              value:
                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                              message:
                                "Confirm Password must include at least one lowercase letter, one uppercase letter, one number, and one special character",
                            },
                            validate: (value) =>
                              watch("password") == value ||
                              "Password do not match",
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
                        <div className="text-danger mb-4">
                          {errors.confirmPassword.message}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-3">
                    <label htmlFor="uploadFile" className="file-lable">
                      <div className="d-flex w-100 flex-column  justify-content-center  align-items-center ">
                        <i className="fa fa-upload "></i>
                        <div className="m-2 fw-bold">{fileInputContent}</div>
                      </div>
                      <input
                        type="file"
                        accept=".jpg,.png"
                        id="uploadFile"
                        {...register("profileImage", {
                          required: "profileImage is Required",
                        })}
                        onChange={handleInputContent}
                      />
                    </label>
                  </div>
                  {errors.profileImage && (
                    <div className="text-danger mt-3">
                      {errors.profileImage.message}
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
                  <button className="btn btn-success  w-100 fw-bold ">
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
