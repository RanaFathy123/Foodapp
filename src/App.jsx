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
import PrivateRoute from "./modules/SharedModule/components/PrivateRoute/PrivateRoute";
import axios from "axios";
import ReciepeData from "./modules/ReciepesModule/components/reciepedata/ReciepeData";
import EditRecipeData from "./modules/ReciepesModule/components/editreciepedata/EditRecipeData";
import VerfiyAccount from "./modules/AuthenticationModule/components/verifyaccount/VerfiyAccount";
import Favorites from "./modules/FavoritesModule/Favorites.jsx";

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
          <MasterLayout setLoginData={setLoginData} loginData={loginData} />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "reciepes", element: <ReciepesList loginData={loginData}  /> },
        { path: "reciepedata", element: <ReciepeData /> },
        { path: "favorites", element: <Favorites /> },
        { path: "editreciepe/:recipeId", element: <EditRecipeData /> },
        {
          path: "categories",
          element:
            loginData?.userGroup == "SuperAdmin" ? (
              <CategoriesList loginData={loginData} />
            ) : (
              <NotFound />
            ),
        },
        { path: "users", element: <UsersList /> },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
    {
      path: "/",
      element: (
        <PrivateRoute loginData={loginData}>
          <AuthenticationLayout />
        </PrivateRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login saveLoginData={saveLoginData} /> },
        { path: "login", element: <Login saveLoginData={saveLoginData} /> },
        { path: "register", element: <Register /> },
        { path: "verifyaccount", element: <VerfiyAccount /> },
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
