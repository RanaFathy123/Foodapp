import React from "react";
import Header from "../../../SharedModule/components/Header/Header";
import homeHeaderImg from "../../../../assets/images/home-avatar.svg";

export default function Dashboard() {
  return (
    <div>
      <Header
        title={"Welcome Upskilling"}
        description={
          "is a welcoming screen for the entry of the application , you can now see the options"
        }
        imgUrl={homeHeaderImg}
      />
      <div
        className="container mt-3 mx-auto p-3 px-4 "
        style={{ background: " rgba(240, 255, 239, 1)",width:'95%' }}
      >
        <div className="d-flex flex-wrap justify-content-between  align-items-center container"  >
          <div>
            <h2>Fill the <span className="text-success">Recipes !</span></h2>
            <p>
              you can now fill the meals easily using the table and form , click
              here and sill it with the table !
            </p>
          </div>
          <div>
            <button className="btn btn-success ">Fill Reciepes</button>
          </div>
        </div>
      </div>
    </div>
  );
}
