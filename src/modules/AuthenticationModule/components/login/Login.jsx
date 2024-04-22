import React, { useRef, useState } from "react";
import logo from "../../../../assets/images/logo.svg";
import { useForm } from "react-hook-form";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const password = useRef();
  const [checkShowPassword,setCheckShowPassword]=useState(false)
  const onSubmit = (data) => {
    console.log(data);
  };
  const showPassword = () => {
    if(password.current.type == 'password'){
      password.current.type ='text'
    }else{
      password.current.type ='password'
    }
    setCheckShowPassword(!checkShowPassword)
  };
  return (
    <div className="auth-bg ">
      <div className="container-fluid bg-overlay">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-md-9 bg-white p-5 border rounded border-2 form-body">
            <div className="text-center">
              <img src={logo} alt="" className="w-25" />
            </div>
            <div className="form-content p-3">
              <h3>Log In</h3>
              <p className="text-muted">
                Welcome Back! Please enter your details
              </p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa fa-envelope"></i>
                  </span>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Your E-mail"
                    {...register("email", {
                      required: "Email is Required",
                      pattern: {
                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                        message: "Email is Invalid",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <div className="text-danger m-4">{errors.email.message}</div>
                )}
                <div className="input-group mb-3">
                  <span className="input-group-text " id="basic-addon1">
                    <i className="fa fa-key"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is Required",
                      minLength: {
                        value: 6,
                        message: "Password Must Be 6 Character",
                      },
                    })}
                    ref={password}
                  />
                  <span className="input-group-text" id="basic-addon1">
                  {checkShowPassword?<i className="fa-solid fa-eye" onClick={showPassword}></i>:<i className="fa-solid fa-eye-slash" onClick={showPassword}></i>}
                  </span>
                </div>
                {errors.password && (
                  <div className="text-danger m-4">
                    {errors.password.message}
                  </div>
                )}
                <div className="links d-flex justify-content-between my-4">
                  <a>Register Now?</a>
                  <a className="text-success text-decoration-none ">
                    Forgot Password?
                  </a>
                </div>
                <button className="btn btn-success  w-100">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
