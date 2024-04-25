import React, { useEffect, useState } from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./modules/HomeModule/components/Dashboard/Dashboard";
import NotFound from "./modules/SharedModule/components/Notfound/NotFound";
import MasterLayout from "./modules/SharedModule/components/MasterLayout/MasterLayout";
import ReciepesList from "./modules/ReciepesModule/components/reciepeslist/ReciepesList";
import CategoriesList from "./modules/CategoriesModule/components/categorieslist/CategoriesList";
import UsersList from "./modules/UsersModule/components/userlist/UsersList";
import AuthenticationLayout from "./modules/SharedModule/components/AuthenticationLayout/AuthenticationLayout";
import Login from "./modules/AuthenticationModule/components/login/Login";
import Register from "./modules/AuthenticationModule/components/register/Register";
import ForgetPassword from "./modules/AuthenticationModule/components/forgetpassword/ForgetPassword";
import ResetPassword from "./modules/AuthenticationModule/components/resetpassword/ResetPassword";
import ChangePassword from "./modules/AuthenticationModule/components/changepassword/ChangePassword";
import { ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "./modules/SharedModule/components/ProtectedRoute/ProtectedRoute";
import AuthProtectedRoute from "./modules/SharedModule/components/ProtectedRoute/AuthProtectedRoute";

function App() {
  const [loginData, setLoginData] = useState(null);
  let saveLoginData = () => {
    let encodedData = localStorage.getItem("token");
    let decodedDeata = jwtDecode(encodedData);
    setLoginData(decodedDeata);
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveLoginData();
    }
  }, []);
  const routes = createBrowserRouter([
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute loginData={loginData}>
          <MasterLayout setLoginData={setLoginData} />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "reciepes", element: <ReciepesList /> },
        { path: "categories", element: <CategoriesList /> },
        { path: "users", element: <UsersList /> },
      ],
    },
    {
      path: "/",
      element: (
        <AuthProtectedRoute loginData={loginData}>
          <AuthenticationLayout />
        </AuthProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login saveLoginData={saveLoginData} /> },
        { path: "login", element: <Login saveLoginData={saveLoginData} /> },
        { path: "register", element: <Register /> },
        { path: "forgetpass", element: <ForgetPassword /> },
        { path: "resetpass", element: <ResetPassword /> },
        { path: "changepass", element: <ChangePassword /> },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
