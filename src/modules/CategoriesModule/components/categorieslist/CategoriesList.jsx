import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import categoriesHeaderImg from "../../../../assets/images/header.png";
import DeleteData from "../../../SharedModule/components/DeleteData/DeleteData";
import Header from "../../../SharedModule/components/Header/Header";
import NoData from "../../../SharedModule/components/NoData/NoData";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

export default function CategoriesList() {
  const [categoriesList, setCategoriesList] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const [mode, setMode] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [show, setShow] = useState(false);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [disableInput,setDisableInput]=useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleShow = (data, iconClass) => {
    console.log(data, iconClass);
    if (data.target) {
      reset({ name: "" });
      setShow(true);
      setMode("addMode");
      setModalTitle("Add New Category");
      setDisableInput(false)  
    } else if (iconClass == "fa-edit") {
      reset({ name: "" });
      setShow(true);
      setMode("updateMode");
      setModalTitle("Update Category");
      reset({ name: data.name });
      setDisableInput(false)  
      setCategoryId(data.id);
    }else if(iconClass == "fa-eye"){
      reset({ name: "" });
      setShow(true)
      setMode('ShowMode')
      setModalTitle("Category Details");
      reset({ name: data.name });
      setDisableInput(true)  
    } else {
      setShow(true);
      setMode("deleteMode");
      setModalTitle("");
      setCategoryId(data);
      setDisableInput(false)  
    }
  };
  const handleClose = () => {
    setShow(false);
  };

  const getCategories = async (name, pageSize = 20, pageNumber) => {
    try {
      const response = await axios.get(
        `https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          params: {
            name: name,
          },
        }
      );
      setPageNumbers(
        Array(response.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
      setCategoriesList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getCategoryValue = (input) => {
    setCategoryName(input.target.value);
    getCategories(input.target.value, 20, 1);
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
        console.log(response);
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
        console.log(response);
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
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    getCategories();
    handleClose();

    toast.error("category Deleted");
  };
  useEffect(() => {
    getCategories("", "20", "1");
  }, []);

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
                  className="form-control mt-5 mb-4 "
                  disabled={disableInput}
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
      <div className="container my-3">
        <div className="row">
          <div className="col-md-12">
            <input
              type="text"
              className="form-control"
              placeholder="Search By Category"
              onChange={getCategoryValue}
            />
          </div>
        </div>
      </div>
      <div className="table-responsive  px-3 border-none ">
        <table className="table align-middle mb-0 rounded py-5 w-100 table-borderless">
          <thead className="bg-primary text-white bg-info h-100 table-secondary   py-5">
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
                          {format(
                            new Date(category.creationDate),
                            "dd/MM/yyyy"
                          )}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="text-muted mb-0">
                      {format(
                        new Date(category.modificationDate),
                        "dd/MM/yyyy"
                      )}
                    </p>
                  </td>
                  <td>
                    <div className="d-flex gap-3 align-items-center ">
                      <i className="fa fa-eye text-primary" onClick={(e) =>
                          handleShow(category, e.target.classList[1])
                        }></i>
                      <i
                        className="fa fa-edit text-warning"
                        onClick={(e) =>
                          handleShow(category, e.target.classList[1])
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
              <li className="page-item" key={index} onClick={()=>getCategories(categoryName,20,pageNo)}>
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
    </>
  );
}
