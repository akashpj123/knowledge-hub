import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Shownow from './controller/Shownow';
import App from "./App";
import SignupForm from './auth/admin/SignupForm';
import LoginForm from './auth/admin/LoginForm';
import Logingust from './auth/user/Logingust';
import Signupgust from './auth/user/Signupgust';
import UserProfileCard from './controller/profile/UserProfileCard';
import Adddet from './controller/profile/Adddet';
import ArticlesTable from './controller/adminuse/ArticlesTable';
import Create from './controller/curd/Create';
import Crud from './controller/curd/Crud';
import Createedit from './controller/curd/Createedit';
import Editprofile from './controller/profile/Editprofile';
const router = createBrowserRouter([
    { path: "/", element: <App /> },
    { path: "/shownow", element: <Shownow /> },
    { path: "/signup", element: <SignupForm /> },
    { path: "/login", element: <LoginForm /> },
    { path: "/logingust", element: <Logingust /> },
    { path: "/signupgust", element: <Signupgust /> },
    { path: "/profile", element: <UserProfileCard /> },
    { path: "/addbooking", element: <Adddet /> },
    { path: "/articles", element: <ArticlesTable /> },
    { path: "/create", element: <Create /> },
    { path: "/crud", element: <Crud /> },
    { path: "/crud/edit/:id", element: <Createedit /> },
    { path: "/:id", element: <Editprofile /> },

]);


export default router;
