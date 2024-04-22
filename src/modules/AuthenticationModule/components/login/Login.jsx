import React from "react";
import logo from "../../../../assets/images/logo.svg";

export default function Login() {
  return (
    <div className="auth-bg ">
      <div className="container-fluid bg-overlay">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-md-9 bg-white p-5 border rounded border-2 form-body">
            <div className="text-center">
              <img src={logo} alt="" className="w-25" />
            </div>
            <div className="form-content">
              <h3>Log In</h3>
              <p className="text-muted">
                Welcome Back! Please enter your details
              </p>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa fa-envelope"></i>
                </span>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Your E-mail"
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa fa-key"></i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
              </div>
              <div className="links d-flex justify-content-between my-4">
                <a>Register Now?</a>
                <a>Forgot Password?</a>
              </div>
              <button className="btn btn-success  w-100">Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
