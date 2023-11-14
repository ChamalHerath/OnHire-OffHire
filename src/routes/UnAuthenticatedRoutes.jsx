import React from "react";
import { Route } from "react-router-dom";
import Login from "../components/auth/Login";

const UnAuthenticatedRoutes = () => {
  return (
    <>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
    </>
  );
};

export default UnAuthenticatedRoutes;
