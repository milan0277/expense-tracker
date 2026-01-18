import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Budget from "../components/pages/Budget";
import Report from "../components/pages/Report";
import Home from "../components/pages/Home";
import LoginPage from "../components/auth/Login";
import SignupPage from "../components/auth/Signin";
import ProtectedRoutes from "../components/auth/ProtectedRoutes";

const Routees = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signin" element={<SignupPage />} />
      <Route element={<ProtectedRoutes />}>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/report" element={<Report />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Routees;
