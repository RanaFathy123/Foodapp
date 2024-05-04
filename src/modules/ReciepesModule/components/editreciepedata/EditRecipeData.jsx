import React, { useEffect, useState } from "react";
import { ReciepeListHeader } from "../../../SharedModule/components/ReciepeListHeader/ReciepeListHeader";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function EditRecipeData() {
  const [recipe, setReciepe] = useState({});
  const [categoriesList, setCategoriesList] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm();

  const { recipeId } = useParams();
  const handleEditSora=(input)=>{
console.log(input.target.value);
  }

  const getReciepe = async () => {
    try {
      const response = await axios.get(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/${recipeId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response.data);
      setReciepe(response.data);
      reset({
        name: response.data.name,
        price: response.data.price,
        description: response.data.description,
        tag: response.data.tag,
        category:response.data.category[0].name,
        imagePath:response.data.imagePath,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const appendToFormData = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("tagId", data.tagId);
    formData.append("categoriesIds", data.categoriesIds);
    formData.append("recipeImage", data.recipeImage[0]);
    return formData;
  };

  const onSubmit = async (data) => {
    let recipeFormData = appendToFormData(data);

    try {
      const response = await axios.put(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/${recipeId}`,
        recipeFormData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response);
      toast.success('Reciepe Edited Successfully');
      navigate("/dashboard/reciepes");
    } catch (err) {
      console.log(err);
    }
  };
  const getTags = async () => {
    try {
      const response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/tag",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setTagsList(response.data);
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
  useEffect(() => {
    getCategories();
    getTags();
    getReciepe();
  }, []);

  return (
    <>
      <ReciepeListHeader />
      <div className="p-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control "
              placeholder="Recipe Name"
              {...register("name", {
                required: "name  is Required",
              })}
            />
          </div>
          {errors.name && (
            <div className="text-danger m-4">{errors.name.message}</div>
          )}
          <div className="input-group mb-3">
            <select
              className="form-select"
              aria-label="Default select example"
              {...register("tagId", {
                required: "tag is Required",
              })}
            >
              <option defaultValue value={recipe?.tag?.id}>
                {" "}
                {recipe?.tag?.name}
              </option>

              {tagsList.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Price"
              {...register("price", {
                required: "price is Required",
              })}
            />
          </div>
          {errors.price && (
            <div className="text-danger m-4">{errors.price.message}</div>
          )}
          <div className="input-group mb-3">
            <select
              className="form-select"
              aria-label="Default select example"
              {...register("categoriesIds", {
                required: "Category is Required",
              })}
            >
              <option
                defaultValue
                value={
                  recipe?.category && recipe.category.length > 0
                    ? recipe.category[0]?.id
                    : ""
                }
              >
                {recipe?.category && recipe.category.length > 0
                  ? recipe.category[0]?.name
                  : ""}
              </option>
              {categoriesList.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          {errors.categoriesIds && (
            <div className="text-danger m-4">
              {errors.categoriesIds.message}
            </div>
          )}
          <div className="input-group mb-3">
            <textarea
              className="form-control"
              {...register("description", {
                required: "description is Required",
              })}
            />
          </div>
          {errors.description && (
            <div className="text-danger m-4">{errors.description.message}</div>
          )}
          <div>
            <label htmlFor="uploadFile" className="file-lable">
              <div className="d-flex w-100 flex-column  justify-content-center  align-items-center ">
                <i className="fa fa-upload "></i>
                <div className="m-2 fw-bold">{recipe?.imagePath}</div>
              </div>
              <input
                type="file"
                accept=".jpg,.png"
                id="uploadFile"
                {...register("recipeImage", {
                  required: "recipeImage is Required",
                })}
             onChange={handleEditSora}
              />
            </label>
          </div>
          {errors.recipeImage && (
            <div className="text-danger mt-2">{errors.recipeImage.message}</div>
          )}
          <div className="text-end">
            <button className="btn btn-danger text-left m-3">Cancel</button>
            <button className="btn btn-success text-left">Save</button>
          </div>
        </form>
      </div>
    </>
  );
}
