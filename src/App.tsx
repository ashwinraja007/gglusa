import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ScrollToTop } from "./components/common/ScrollToTop";
import About from "./pages/About";
import AdminPage from "./pages/Admin";
import Contact from "./pages/Contact";
import DynamicRouteResolver from "./pages/DynamicRouteResolver";
import GlobalPresence from "./pages/GlobalPresence";
import HomeDynamic from "./pages/HomeDynamic";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Services from "./pages/Services";
import TermsOfUse from "./pages/TermsOfUse";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomeDynamic />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/global-presence" element={<GlobalPresence />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsOfUse />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<DynamicRouteResolver />} />
          </Routes>
          <Toaster />
          <Sonner />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
