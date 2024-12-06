import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { navItems } from "./nav-items";
import ProtectedRoute from "@/components/ProtectedRoute";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import OTPVerification from "@/pages/OTPVerification";
import React from "react";
import { authenticationService } from "./services/authenticationService";
import ForgotPassword from "./pages/ForgotPassword";

const queryClient = new QueryClient();

const App = () => {
  const isAuthenticated = authenticationService.isAuthenticated();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/register"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Register />
                )
              }
            />
            <Route
              path="/verify-otp"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <OTPVerification />
                )
              }
            />
            <Route 
              path="/forgot-password"
              element={<ForgotPassword/>}
            />

            {/* Protected routes */}
            {navItems.map(({ to, page }) => (
              <Route
                key={to}
                path={to}
                element={<ProtectedRoute>{page}</ProtectedRoute>}
              />
            ))}

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;