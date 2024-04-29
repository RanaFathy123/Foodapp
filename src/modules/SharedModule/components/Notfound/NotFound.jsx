import React from "react";
import logo from "../../../../assets/images/notfound-logo.png";
import notfound from "../../../../assets/images/notfound.png";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  const gotToHome = () => {
    navigate("/dashboard");
  };
  return (
    <div className="notfound-bg">
      <div className="container">
        <img src={logo} alt="logo" />
        <div className="row align-items-center  vh-100 ">
          <div className="col-md-6">
            <h1 className="mb-3">Oops.</h1>
            <h4 className="text-success mb-3">Page not found</h4>
            <p
              className="mb-4"
              style={{ height: "39.61px", width: "302.36px" }}
            >
              This Page doesn’t exist or was removed! We suggest you back to
              home
            </p>
            <button
              className="btn btn-success p-2 text-center"
              onClick={gotToHome}
            >
              <i className="fa fa-arrow-left m-3" aria-hidden="true" />
              Back To Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
