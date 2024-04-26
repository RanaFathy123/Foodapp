import React from 'react'
import userHeaderImg from "../../../../assets/images/header.png";
import Header from '../../../SharedModule/components/Header/Header';
export default function UsersList({title,description,imgUrl}) {
  return (
    <div>
      <Header
        title={"Users List"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={userHeaderImg}
      />
    </div>
  )
}
