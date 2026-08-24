import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import { AuthLayout, GuestLayout } from "./Pages/Layout";
import AuthPage from "./Pages/AuthPages";
import Home from "./Pages/Home";
import BuilderPage from "./Pages/BuilderPage";
import PreviewPage from "./Pages/PreviewPages";

const App = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<GuestLayout />}>
        <Route index element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/register" element={<AuthPage mode="register" />} />
      </Route>

      {/* Protected/application routes */}
      <Route element={<AuthLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/builder/:id" element={<BuilderPage />} />
        <Route path="/preview/:id" element={<PreviewPage />} />
      </Route>

      {/* Unknown routes */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;