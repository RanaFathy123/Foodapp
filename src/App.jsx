import React from "react";
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

function App() {
  const routes = createBrowserRouter([
    {
      path: "/dashboard",
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children: [
        { path: "", element: <Dashboard /> },
        { path: "reciepes", element: <ReciepesList /> },
        { path: "categories", element: <CategoriesList /> },
        { path: "users", element: <UsersList /> },
      ],
    },
    {
      path: "/",
      element: <AuthenticationLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
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
  return <RouterProvider router={routes}></RouterProvider>;
}

export default App;
