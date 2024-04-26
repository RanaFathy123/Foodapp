import React from 'react'
import Header from '../../../SharedModule/components/Header/Header'
import reciepeHeaderImg from "../../../../assets/images/header.png";


export default function ReciepesList() {
  return (
    <div>
      <Header
        title={"Recipes Items"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={reciepeHeaderImg}
      />
    </div>
  )
}
