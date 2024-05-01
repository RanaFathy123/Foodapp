import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import reciepeHeaderImg from "../../../../assets/images/header.png";
import noDataImg from "../../../../assets/images/no-data.png";
import DeleteData from "../../../SharedModule/components/DeleteData/DeleteData";
import Header from "../../../SharedModule/components/Header/Header";
import NoData from "../../../SharedModule/components/NoData/NoData";

export default function ReciepesList() {
  const [reciepesList, setReciepesList] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [recipeId, setReciepeId] = useState("");
  const navigate = useNavigate();

  const goToReciepeData = () => {
    navigate("/dashboard/reciepedata");
  };

  const handleShowDelete = (id) => {
    setShowDelete(true);
    setReciepeId(id);
  };
  const handleCloseDelete = () => {
    setShowDelete(false);
  };

  const getReciepes = async () => {
    try {
      const response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=10&pageNumber=1",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response.data.data);
      setReciepesList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteReciepe = async () => {
    try {
      const response = await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/${recipeId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
    getReciepes();
    handleCloseDelete();
    toast.error("recipe Deleted");
  };
  useEffect(() => {
    getReciepes();
  }, []);
  return (
    <>
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <DeleteData title={"Recipe"} />
          <button
            onClick={deleteReciepe}
            className="btn btn-danger ms-auto d-block "
          >
            Delete
          </button>
        </Modal.Body>
      </Modal>

      <Header
        title={"Recipes Items"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={reciepeHeaderImg}
      />
      <div className="container-fluid mt-3 mb-2 px-2 w-100">
        <div className="d-flex flex-wrap justify-content-between  align-items-center container">
          <div>
            <h4>Recipe Table Details</h4>
            <p>You can check all details</p>
          </div>
          <div>
            <button className="btn btn-success" onClick={goToReciepeData}>
              Add New Item
            </button>
          </div>
        </div>
      </div>
      <div className="table-responsive  px-3 border-none ">
        <table className="table align-middle mb-0 rounded p-5 w-100 table-borderless">
          <thead className="bg-primary text-white bg-info h-100 table-secondary  p-5">
            <tr>
              <th className="p-4 ">Name</th>
              <th className="py-4">Image</th>
              <th className="py-4">Price</th>
              <th className="py-4">Description</th>
              <th className="py-4">tag</th>
              <th className="py-4">Category</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="px-5">
            {reciepesList.length > 0 &&
              reciepesList.map((reciepe) => (
                <tr key={reciepe.id}>
                  <td>
                    <p className="fw-normal mb-1">{reciepe.name}</p>
                  </td>
                  <td>
                    {reciepe.imagePath ? (
                      <img
                        className="rounded border border-1"
                        style={{ width: "56px", height: "56px" }}
                        src={`https://upskilling-egypt.com:3006/${reciepe.imagePath}`}
                        alt="reciepe"
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
                    <p className="fw-normal mb-1">{reciepe.price}</p>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">{reciepe.description}</p>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="ms-3">
                        <p className="text-muted mb-0">{reciepe.tag.name}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    {
                      <p className="text-muted mb-0">
                        {reciepe.category[0]?.name
                          ? reciepe.category[0]?.name
                          : "No Category"}
                      </p>
                    }
                  </td>
                  <td>
                    <div className="d-flex gap-3 align-items-center ">
                      <i className="fa fa-eye text-primary "></i>
                      <Link to={`/dashboard/editreciepe/${reciepe.id}`}>
                        <i className="fa fa-edit text-warning"></i>
                      </Link>

                      <i
                        className="fa fa-trash text-danger"
                        onClick={() => handleShowDelete(reciepe.id)}
                      ></i>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {reciepesList.length == 0 && <NoData />}
      </div>
    </>
  );
}
