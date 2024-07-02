import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home, Activity, User } from "lucide-react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./layouts/sidebar"; // Use the sidebar layout
import Index from "./pages/Index.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Workouts from "./pages/Workouts.jsx";
import Profile from "./pages/Profile.jsx";
import LogWorkout from "./pages/LogWorkout.jsx";
import ProgressTracking from "./pages/ProgressTracking.jsx";

const queryClient = new QueryClient();

export const navItems = [
  {
    title: "Dashboard",
    to: "/dashboard",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Log Workout",
    to: "/log-workout",
    icon: <Activity className="h-4 w-4" />,
  },
  {
    title: "Progress Tracking",
    to: "/progress-tracking",
    icon: <Activity className="h-4 w-4" />,
  },
];

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="workouts" element={<Workouts />} />
              <Route path="profile" element={<Profile />} />
              <Route path="log-workout" element={<LogWorkout />} />
              <Route path="progress-tracking" element={<ProgressTracking />} />
            </Route>
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;