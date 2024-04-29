import React from "react";
import noDataImg from "../../../../assets/images/no-data.png";
export default function NoData() {
  return (
    <div className="d-flex flex-column gap-2 justify-content-center  align-items-center mt-4">
      <img src={noDataImg} alt="" />
      <h3>NoData</h3>
      <p className="text-center">are you sure you want to delete this item ? if you are sure just click on delete it</p>
    </div>
  );
}
