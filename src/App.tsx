
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Cantina from "./pages/Cantina";
import Viva from "./pages/Viva";
import CantinaInventory from "./pages/CantinaInventory";
import VivaInventory from "./pages/VivaInventory";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/cantina/*" element={<Cantina />} />
          <Route path="/viva/*" element={<Viva />} />
          <Route path="/cantina-inventory" element={<CantinaInventory />} />
          <Route path="/viva-inventory" element={<VivaInventory />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
