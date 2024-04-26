import React from 'react'
import Header from '../../../SharedModule/components/Header/Header'
import categoriesHeaderImg from "../../../../assets/images/header.png";

export default function CategoriesList() {
  return (
    <div>
    <Header
      title={"Categories Items"}
      description={
        "You can now add your items that any user can order it from the Application and you can edit"
      }
      imgUrl={categoriesHeaderImg}
    />
  </div>
  )
}
