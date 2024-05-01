import React from "react";
import { useNavigate } from "react-router-dom";

export const ReciepeListHeader = () => {
    const navigate = useNavigate()
    const goToReciepeList = ()=>{
        navigate('/dashboard/reciepes')
    }
  return (
    <div
      className="p-4 m-3"
      style={{ background: " rgba(240, 255, 239, 1)", width: "95%" }}
    >
      <div className="d-flex flex-wrap justify-content-between  align-items-center container">
        <div>
          <h2>
            Fill the <span className="text-success">Recipes !</span>
          </h2>
          <p>
            you can now fill the meals easily using the table and form , click
            here and sill it with the table !
          </p>
        </div>
        <div>
          <button onClick={goToReciepeList} className="btn btn-success">
            Fill Reciepes <i className="fa fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
