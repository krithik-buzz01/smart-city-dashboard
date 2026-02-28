import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import ReportIssue from "./pages/ReportIssue";
import MapView from "./pages/MapView";
import IssueTracker from "./pages/IssueTracker";
import Leaderboard from "./pages/Leaderboard";
import BlockchainLedger from "./pages/BlockchainLedger";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/report" element={<ReportIssue />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/issues" element={<IssueTracker />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/blockchain" element={<BlockchainLedger />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
