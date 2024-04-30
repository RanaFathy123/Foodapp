import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import categoriesHeaderImg from "../../../../assets/images/header.png";
import NoData from "../../../SharedModule/components/NoData/NoData";
import Header from "../../../SharedModule/components/Header/Header";
import { toast } from "react-toastify";
import DeleteData from "../../../SharedModule/components/DeleteData/DeleteData";

export default function CategoriesList() {
  const [categoriesList, setCategoriesList] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const [mode, setMode] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleShow = (data, iconClass) => {
    if (data.target) {
      reset({ name: "" });
      setShow(true);
      setMode("addMode");
      setModalTitle("Add New Category");
    } else if (iconClass == "fa-edit") {
      setShow(true);
      setMode("updateMode");
      setModalTitle("Update Category");
      setCategoryId(data);
      getCategory(categoryId);
    } else {
      setShow(true);
      setMode("deleteMode");
      setModalTitle("");
      setCategoryId(data);
    }
  };
  const handleClose = () => {
    setShow(false);
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
  };
  const getCategory = async (id) => {
    try {
      const response = await axios.get(
        `https://upskilling-egypt.com:3006/api/v1/Category/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response.data);
      if (response.data) {
        reset({ name: response?.data.name });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setCategoriesList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    if (mode == "addMode") {
      try {
        const response = await axios.post(
          "https://upskilling-egypt.com:3006/api/v1/Category/",
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
      getCategories();
      reset({ name: "" });
      handleClose();
      toast.success("Category Add Successfully");
    } else {
      try {
        const response = await axios.put(
          `https://upskilling-egypt.com:3006/api/v1/Category/${categoryId}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
      getCategories();
      handleClose();
      toast.success("Category Edited Successfully");
    }
  };

  const deleteCategory = async () => {
    try {
      const response = await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Category/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
    getCategories();
    handleClose();
    toast.error("category Deleted");
  };
  useEffect(() => {
    getCategories();
  }, []);
  useEffect(() => {
    if (mode != "addMode") {
      getCategory(categoryId);
    }
  }, [categoryId, mode]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h3>{modalTitle}</h3>
        </Modal.Header>
        <Modal.Body>
          {mode != "deleteMode" ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="d-flex flex-column ">
                <input
                  type="text"
                  className="form-control mt-5 mb-4"
                  placeholder={
                    mode == "addMode" ? "Enter Category" : "Loading.."
                  }
                  {...register("name", {
                    required: "Name is Required",
                  })}
                />
                {errors.name && (
                  <div className="text-danger m-4">{errors.name.message}</div>
                )}
              </div>
              <button className="btn btn-success ms-auto d-block ">
                Save Changes
              </button>
            </form>
          ) : (
            <>
              <DeleteData title={"Category"} />
              <button
                onClick={deleteCategory}
                className="btn btn-danger ms-auto d-block "
              >
                Delete
              </button>
            </>
          )}
        </Modal.Body>
      </Modal>
      <Header
        title={"Categories Items"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={categoriesHeaderImg}
      />
      <div className="container-fluid mt-3 mb-2 px-2 w-100">
        <div className="d-flex flex-wrap justify-content-between  align-items-center container">
          <div>
            <h4>Categories Table Details</h4>
            <p>You can check all details</p>
          </div>
          <div>
            <button className="btn btn-success" onClick={(e) => handleShow(e)}>
              Add New Category
            </button>
          </div>
        </div>
      </div>
      <div className="table-responsive  px-3 border-none ">
        <table className="table align-middle mb-0 rounded p-5 w-100 table-borderless">
          <thead className="bg-primary text-white bg-info h-100 table-secondary  p-5">
            <tr>
              <th className="p-4 ">Name</th>
              <th className="py-4"></th>
              <th className="py-4"></th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="p-4">
            {categoriesList.length > 0 &&
              categoriesList.map((category) => (
                <tr key={category.id}>
                  <td>
                    <p className="fw-normal mb-1">{category.name}</p>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="ms-3">
                        <p className="text-muted mb-0">
                          {category.creationDate}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="text-muted mb-0">
                      {category.modificationDate}
                    </p>
                  </td>
                  <td>
                    <div className="d-flex gap-3 align-items-center ">
                      <i className="fa fa-eye text-primary "></i>
                      <i
                        className="fa fa-edit text-warning"
                        onClick={(e) =>
                          handleShow(category.id, e.target.classList[1])
                        }
                      ></i>
                      <i
                        className="fa fa-trash text-danger "
                        onClick={(e) =>
                          handleShow(category.id, e.target.classList[1])
                        }
                      ></i>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {categoriesList.length == 0 && <NoData />}
      </div>
    </>
  );
}
