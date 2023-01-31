import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/auth/loginPage";
import SignUpPage from "./pages/auth/signupPage";
import ForgotPasswordPage from "./pages/auth/forgotPasswordPage";
import HomePage from "./pages/homePage";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateJobPage from "./pages/CreateJobPage";
import OrginazationListPage from "./pages/orginazationPage/OrginazationListPage";
import OrginazationViewPage from "./pages/orginazationPage/OrginazationViewPage";
import ProfilePage from "./pages/ProfilePage";

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/signup" element={<SignUpPage />} />
      <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orginazation"
        element={
          <ProtectedRoute>
            <OrginazationListPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orginazation/:orginazationID"
        element={
          <ProtectedRoute>
            <OrginazationViewPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/job/create"
        element={
          <ProtectedRoute>
            <CreateJobPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default MyRoutes;
