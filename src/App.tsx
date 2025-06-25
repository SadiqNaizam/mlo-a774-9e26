import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import AccountSettingsPage from "./pages/AccountSettingsPage";
import AppEditorPage from "./pages/AppEditorPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
        <Routes>


          <Route path="/" element={<DashboardPage />} />
          <Route path="/account-settings" element={<AccountSettingsPage />} />
          <Route path="/app-editor" element={<AppEditorPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          {/* catch-all */}
          <Route path="*" element={<NotFound />} />


        </Routes>
    </BrowserRouter>
    </TooltipProvider>
</QueryClientProvider>
);

export default App;
