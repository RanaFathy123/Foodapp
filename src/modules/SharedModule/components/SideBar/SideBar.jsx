import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function SideBar() {
  const navigate = useNavigate()
  const logOut = ()=>{
    localStorage.removeItem('token')
    navigate('/login')
  }
  return (
    <div>
      <div>Sidebar</div>
      <button onClick={logOut} className='btn btn-danger'>LogOut</button>
    </div>
  )
}
