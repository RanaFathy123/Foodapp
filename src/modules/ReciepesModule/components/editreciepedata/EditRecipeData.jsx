import React, { useEffect, useState } from "react";
import { ReciepeListHeader } from "../../../SharedModule/components/ReciepeListHeader/ReciepeListHeader";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function EditRecipeData() {
  const [recipe, setReciepe] = useState({});
  const [categoriesList, setCategoriesList] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { recipeId } = useParams();
  console.log(recipeId);

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
    } catch (err) {
      console.log(err);
    }
  };
  const appendToFormData = (data) => {
    console.log(data);
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
      toast.success(response.data.message);
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
              defaultValue={recipe ? recipe?.name : ""}
              className="form-control "
              /*      placeholder="Recipe Name"
              {...register("name", {
                required: "name  is Required",
              })} */
            />
          </div>
          {/*   {errors.name && (
            <div className="text-danger m-4">{errors.name.message}</div>
          )} */}
          <div className="input-group mb-3">
            <select
              className="form-select"
              aria-label="Default select example"
              {...register("tagId", {
                required: "tag is Required",
              })}
            >
              {tagsList.map((tag) => (
                <option
                  defaultValue={recipe ? recipe.tag?.name : ""}
                  key={tag.id}
                  value={tag.id}
                >
                  {tag.name}
                </option>
              ))}
            </select>
          </div>
          {/*     {errors.tagId && (
            <div className="text-danger m-4">{errors.tagId.message}</div>
          )} */}
          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control"
              defaultValue={recipe ? recipe?.price : ""}
              /*     placeholder="Price"
              {...register("price", {
                required: "price is Required",
              })} */
            />
          </div>
          {errors.price && (
            <div className="text-danger m-4">{errors.price.message}</div>
          )}
          <div className="input-group mb-3">
            <select
              className="form-select"
              aria-label="Default select example"
              /*   {...register("categoriesIds", {
                required: "Category is Required",
              })} */
            >
              {categoriesList.map((category) => (
                <option
                  key={category.id}
               
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          {/*     {errors.categoriesIds && (
            <div className="text-danger m-4">
              {errors.categoriesIds.message}
            </div>
          )} */}
          <div className="input-group mb-3">
            <textarea
              className="form-control"
              defaultValue={recipe ? recipe?.description : ""}
              /*      {...register("description", {
                required: "description is Required",
              })} */
            />
          </div>
          {errors.description && (
            <div className="text-danger m-4">{errors.description.message}</div>
          )}
          <div className="input-group mb-3">
            <input
              type="file"
            
              className="form-control file-input"
              /*     {...register("recipeImage", {
                required: "recipeImage is Required",
              })} */
            />
          </div>
          {/*     {errors.recipeImage && (
            <div className="text-danger m-4">{errors.recipeImage.message}</div>
          )} */}
          <button className="btn btn-danger text-left m-3">Cancel</button>
          <button className="btn btn-success text-left">Save</button>
        </form>
      </div>
    </>
  );
}
