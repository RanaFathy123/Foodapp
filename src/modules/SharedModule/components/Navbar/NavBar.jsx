import React from "react";
import adminImg from "../../../../assets/images/avatar.png";

export default function NavBar({ loginData }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-0 mb-3 fixed-top">
      <div className="container-fluid">
        <button
          className="navbar-toggler ms-auto "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav  ms-auto mb-2 mb-lg-0 d-flex align-items-center px-4">
            <li className="nav-item p-1">
              <img
                src={adminImg}
                className="nav-link active"
                aria-current="page"
              />
            </li>
            <li className="nav-item  p-1">
              <a className="nav-link active" aria-current="page" href="#">
                {loginData?.userName}
              </a>
            </li>
            <li className="nav-item p-1">
              <i className="fa-solid fa-bell" />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
