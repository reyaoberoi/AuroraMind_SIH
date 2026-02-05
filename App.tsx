// src/App.tsx

import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage"; // ✅ matches file/component
import MedicalDashboard from "./pages/MedicalDashboard";
import Music from "./pages/Music";
import Counselling from "./pages/Counselling";
import Chatbot from "./pages/Chatbot";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";
import AIStudio from "./pages/AIStudio.tsx";
import AdminAnalytics from "./pages/AdminAnalytics";
import Community from "./pages/Community";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ Keep auth state in sync with sessionStorage
  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  // Called after login/signup to mark user as authenticated
  const handleAuth = () => {
    setIsAuthenticated(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Protected routes */}
            <Route
              path="/"
              element={isAuthenticated ? <Index /> : <Navigate to="/login" />}
            />
            <Route
              path="/medical"
              element={isAuthenticated ? <MedicalDashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/music"
              element={isAuthenticated ? <Music /> : <Navigate to="/login" />}
            />
            <Route
              path="/counselling"
              element={isAuthenticated ? <Counselling /> : <Navigate to="/login" />}
            />
            <Route
              path="/chatbot"
              element={isAuthenticated ? <Chatbot /> : <Navigate to="/login" />}
            />
            <Route
              path="/blog"
              element={isAuthenticated ? <Blog /> : <Navigate to="/login" />}
            />
            <Route
              path="/ai"
              element={isAuthenticated ? <AIStudio /> : <Navigate to="/login" />}
            />
            <Route
              path="/admin"
              element={isAuthenticated ? <AdminAnalytics /> : <Navigate to="/login" />}
            />
            <Route
              path="/community"
              element={isAuthenticated ? <Community /> : <Navigate to="/login" />}
            />

            {/* Public routes */}
            <Route path="/login" element={<LoginPage onAuth={handleAuth} />} />
            <Route path="/signup" element={<SignupPage onAuth={handleAuth} />} />

            {/* Fallback route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;