// src/Routes.jsx
import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import CleanStreetLandingPage from "pages/clean-street-landing-page";
import AboutUs from "pages/about-us";
import Login from "pages/login";
import Register from "pages/register";
import ReportIssue from "pages/report-issue";
import Feedback from "pages/feedback";
import NotFound from "pages/NotFound";

// Import components
import UserDashboard from "./pages/user-dashboard";
import AdminDashboard from "./pages/admin-dashboard";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Public Routes */}
          <Route path="/" element={<CleanStreetLandingPage />} />
          <Route path="/clean-street-landing-page" element={<CleanStreetLandingPage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/feedback" element={<Feedback />} />

          {/* Protected Routes - require authentication */}
          <Route element={<ProtectedRoute />}>
             <Route path="/report-issue/:id" element={<ReportIssue />} />
             {/* User Dashboard - requires authentication */}
             <Route path="/user/dashboard" element={<UserDashboard />} />
          </Route>

          {/* Admin Protected Routes - require ADMIN role */}
           <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
             <Route path="/admin/dashboard" element={<AdminDashboard />} />
           </Route>

          {/* Catch-all route for 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;