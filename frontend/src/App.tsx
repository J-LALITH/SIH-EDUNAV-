import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Aptitude from "./pages/Aptitude";
import CareerFlow from "./pages/CareerFlow";
import Colleges from "./pages/Colleges";
import Learning from "./pages/Learning";
import Alumni from "./pages/Alumni";
import Scholarships from "./pages/Scholarships";
import Updates from "./pages/Updates";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="aptitude" element={<Aptitude />} />
            <Route path="career-flow" element={<CareerFlow />} />
            <Route path="colleges" element={<Colleges />} />
            <Route path="learning" element={<Learning />} />
            <Route path="alumni" element={<Alumni />} />
            <Route path="scholarships" element={<Scholarships />} />
            <Route path="updates" element={<Updates />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
