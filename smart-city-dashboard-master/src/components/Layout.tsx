import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, MapPin, FileText, Trophy, PlusCircle, 
  Shield, Activity, Menu, X, Zap
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/report", icon: PlusCircle, label: "Report Issue" },
  { to: "/map", icon: MapPin, label: "Live Map" },
  { to: "/issues", icon: FileText, label: "Issue Tracker" },
  { to: "/leaderboard", icon: Trophy, label: "Leaderboard" },
  { to: "/blockchain", icon: Shield, label: "Blockchain Ledger" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-3 px-5 py-5 border-b border-sidebar-border">
            <div>
              <h1 className="text-lg font-bold text-sidebar-accent-foreground">Smart City</h1>
              <p className="text-xs text-muted-foreground">AI-Powered Governance</p>
            </div>
          </div>

          <nav className="flex-1 p-3 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-sidebar-accent text-primary glow-border"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`
                }
              >
                <item.icon className="w-4.5 h-4.5" />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="p-4 mx-3 mb-3 glass-card">
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-foreground">System Status</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="pulse-dot" />
              <span className="text-xs text-muted-foreground">All systems operational</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-background/80 backdrop-blur-xl border-b border-border lg:px-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg text-muted-foreground hover:bg-secondary lg:hidden"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="text-sm text-muted-foreground hidden lg:block">
            {navItems.find(n => n.to === location.pathname)?.label || "Smart City"}
          </div>
          <div className="flex items-center gap-3">
            <div className="text-xs text-muted-foreground font-mono">v2.0 Beta</div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-primary text-primary-foreground">
              SC
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
