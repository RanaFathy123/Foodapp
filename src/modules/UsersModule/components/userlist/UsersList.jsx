import React, { useEffect, useState } from "react";
import userHeaderImg from "../../../../assets/images/header.png";
import Header from "../../../SharedModule/components/Header/Header";
import axios from "axios";
import NoData from "../../../SharedModule/components/NoData/NoData";
import noDataImg from "../../../../assets/images/no-data.png";
export default function UsersList({ title, description, imgUrl }) {
  const [usersList, setUsersList] = useState([]);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [group, setGroup] = useState("");
  const [pageNumbers, setPageNumbers] = useState([]);

  const getUsersList = async (
    userName,
    email,
    country,
    groups,
    pageSize = 20,
    pageNumber
  ) => {
    try {
      const response = await axios.get(
        `https://upskilling-egypt.com:3006/api/v1/Users/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          params: {
            userName: userName,
            email: email,
            country: country,
            groups: groups,
          },
        }
      );
      setPageNumbers(
        Array(response.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
      setUsersList(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getUserNameValue = (input) => {
    setUserName(input.target.value);
    getUsersList(input.target.value, email, country, group);
  };
  const getUserEmailValue = (input) => {
    setEmail(input.target.value);
    getUsersList(userName, input.target.value, country, group);
  };
  const getUserCountryValue = (input) => {
    setCountry(input.target.value);
    getUsersList(userName, email, input.target.value, group);
  };
  const getUserRole = (select) => {
    console.log(select.target.value);
    setGroup(select.target.value);
    getUsersList(userName, email, country, select.target.value);
  };
  useEffect(() => {
    getUsersList("", "", "", "", 20, 1);
  }, []);

  return (
    <div>
      <Header
        title={"Users List"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={userHeaderImg}
      />
      <div className="container-fluid mt-3 mb-2 px-2 w-100">
        <div className="d-flex flex-wrap justify-content-between  align-items-center container">
          <div>
            <h4>Users Table Details</h4>
            <p>You can check all details</p>
          </div>
          <div>
            <button className="btn btn-success px-5">Add New Item</button>
          </div>
        </div>
      </div>
      <div className="container my-3">
        <div className="row">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search By userName"
              onChange={getUserNameValue}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search By email"
              onChange={getUserEmailValue}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search By country"
              onChange={getUserCountryValue}
            />
          </div>
          <div className="col-md-3">
            <select
              name=""
              id=""
              className="form-select"
              onChange={getUserRole}
            >
              <option value="">User Role</option>
              <option value="1">admin</option>
              <option value="2">user</option>
            </select>
          </div>
        </div>
      </div>
      <div className="table-responsive  px-3 border-none ">
        <table className="table align-middle mb-0 rounded p-5 w-100 table-borderless">
          <thead className="bg-primary text-white bg-info h-100 table-secondary  p-5">
            <tr>
              <th className="p-4 ">userName</th>
              <th className="py-4">Image</th>
              <th className="py-4">email</th>
              <th className="py-4">Group</th>
              <th className="py-4">Phone Number</th>
              <th className="py-4">Country</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="px-5">
            {usersList.length > 0 &&
              usersList.map((user) => (
                <tr key={user.id}>
                  <td>
                    <p className="fw-normal mb-1">{user.userName}</p>
                  </td>
                  <td>
                    {user.imagePath ? (
                      <img
                        className="rounded border border-1"
                        style={{ width: "56px", height: "56px" }}
                        src={`https://upskilling-egypt.com:3006/${user.imagePath}`}
                        alt="user"
                      />
                    ) : (
                      <img
                        src={noDataImg}
                        className="rounded border border-1"
                        style={{ width: "56px", height: "56px" }}
                        alt="no reciepe"
                      />
                    )}
                  </td>
                  <td>
                    <p className="fw-normal mb-1">{user.email}</p>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">{user.group.name}</p>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="ms-3">
                        {user.phoneNumber != "undefined"
                          ? user.phoneNumber
                          : "No Phone"}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="ms-3">{user.country}</div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex gap-3 align-items-center ">
                      <i className="fa fa-eye text-primary "></i>
                      <i className="fa fa-edit text-warning"></i>
                      <i className="fa fa-trash text-danger"></i>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {usersList.length == 0 && <NoData />}
        <nav
          aria-label="Page navigation example "
          style={{ display: "flex", justifyContent: "end" }}
        >
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">«</span>
              </a>
            </li>
            {pageNumbers.map((pageNo, index) => (
              <li
                className="page-item"
                key={index}
                onClick={() =>
                  getUsersList(userName, email, country, group, 20, pageNo)
                }
              >
                <a className="page-link">{pageNo}</a>
              </li>
            ))}

            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">»</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
