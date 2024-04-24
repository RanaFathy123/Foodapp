import React from "react";
import logo from "../../../../assets/images/notfound-logo.png";
import notfound from "../../../../assets/images/notfound.png";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  const gotToHome = () => {
    navigate("/");
  };
  return (
    <div className="container-fluid notfound-bg vh-100 p-3">
      <img src={logo} className="m-2" />
      <div className="container-fluid">
        <div className="row  align-items-center w-100 p-5">
          <div className="col-md-7">
            <h1 className="mb-3">Oops.</h1>
            <h3 className="text-success mb-3">Page not found</h3>
            <p
              className="mb-4"
              style={{ height: "39.61px", width: "302.36px" }}
            >
              This Page doesn’t exist or was removed! We suggest you back to
              home
            </p>
            <button
              className="btn btn-success "
              style={{ height: "60.68px", width: "302.36px" }}
              onClick={gotToHome}
            >
              <i className="fa fa-arrow-left m-3" aria-hidden="true" />
              Back To Home
            </button>
          </div>
          <div className="col-md-2">
            <img src={notfound} className="m-3 " />
          </div>
        </div>
      </div>
    </div>
  );
}
