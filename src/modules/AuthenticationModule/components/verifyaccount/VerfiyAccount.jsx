import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../../../assets/images/logo.svg";

export default function VerfiyAccount() {
  const [checkShowPassword, setCheckShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    setIsLoading(true);
    try {
      const response = await axios.put(
        "https://upskilling-egypt.com:3006/api/v1/Users/verify",
        data
      );
      console.log(response);
      toast.success(response.data.message)
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="auth-bg">
        <div className="container-fluid bg-overlay">
          <div className="row min-vh-100 h-100 justify-content-center align-items-center">
            <div className="col-md-9 bg-white p-5 border rounded border-2 form-body">
              <div className="text-center">
                <img src={logo} alt="" className="w-50" />
              </div>
              <div className="form-content p-3">
                <h3>Verify Account</h3>
                <p className="text-muted">
                  Welcome Back! Please enter your details
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-group mb-3">
                    <span className="input-group-text " id="basic-addon1">
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
                  <div className="input-group mb-3 ">
                    <span className="input-group-text " id="basic-addon1">
                      <i className="fa fa-key"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control border-start border-secondary"
                      placeholder="code"
                      {...register("code", {
                        required: "code is Required",
                      })}
                    />
                  </div>
                  {errors.code && (
                    <div className="text-danger mb-4">
                      {errors.code.message}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-success w-100 fw-bold"
                  >
                    {isLoading ? (
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      "Verify"
                    )}
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
