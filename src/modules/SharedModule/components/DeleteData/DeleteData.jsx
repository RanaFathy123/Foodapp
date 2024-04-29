import React from "react";
import deleteImg from "../../../../assets/images/no-data.png";

const DeleteData = ({ title }) => {
  return (
    <div className="text-center ">
      <img src={deleteImg} alt="delete"  />
      <h3 className="mt-3">Delete This {title}</h3>
      <p className="mt-3">
        are you sure you want to delete this item ? if you are sure just click
        on delete it
      </p>
    </div>
  );
};

export default DeleteData;
