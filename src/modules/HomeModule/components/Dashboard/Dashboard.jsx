import React from "react";
import Header from "../../../SharedModule/components/Header/Header";
import homeHeaderImg from "../../../../assets/images/home-avatar.svg";
import { ReciepeListHeader } from "../../../SharedModule/components/ReciepeListHeader/ReciepeListHeader";

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
         <ReciepeListHeader/>
    </div>
  );
}
