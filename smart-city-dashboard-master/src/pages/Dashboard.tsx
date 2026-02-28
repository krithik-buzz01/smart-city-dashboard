import { motion } from "framer-motion";
import { MOCK_ISSUES, MOCK_DEPARTMENTS } from "@/lib/mockData";
import { 
  AlertTriangle, CheckCircle, Clock, Users, TrendingUp, 
  MapPin, Zap, ArrowUpRight, Activity
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const stats = [
  { label: "Active Issues", value: MOCK_ISSUES.filter(i => i.status !== "resolved").length, icon: AlertTriangle, color: "text-accent" },
  { label: "Resolved Today", value: 14, icon: CheckCircle, color: "text-success" },
  { label: "Avg Resolution", value: "18h", icon: Clock, color: "text-info" },
  { label: "Active Workers", value: 7, icon: Users, color: "text-primary" },
];

const recentIssues = MOCK_ISSUES.slice(0, 5);

const priorityColor = {
  low: "bg-primary/20 text-primary",
  medium: "bg-accent/20 text-accent",
  high: "bg-destructive/20 text-destructive",
  critical: "bg-destructive/30 text-destructive",
};

const statusColor = {
  reported: "bg-muted text-muted-foreground",
  assigned: "bg-info/20 text-info",
  "in-progress": "bg-accent/20 text-accent",
  resolved: "bg-success/20 text-success",
  escalated: "bg-destructive/20 text-destructive",
};

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold">
          <span className="gradient-text">Smart City</span> Command Center
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Real-time AI-powered civic issue management</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="stat-card"
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Recent Issues */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 glass-card p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              Recent Reports
            </h2>
            <button onClick={() => navigate("/issues")} className="text-xs text-primary hover:underline">View all →</button>
          </div>
          <div className="space-y-3">
            {recentIssues.map((issue) => (
              <div key={issue.id} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <div className={`w-2 h-2 rounded-full ${issue.priority === "critical" ? "priority-critical" : issue.priority === "high" ? "priority-high" : issue.priority === "medium" ? "priority-medium" : "priority-low"}`} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{issue.title}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <MapPin className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{issue.location.name}</span>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${priorityColor[issue.priority]}`}>
                  {issue.priority}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${statusColor[issue.status]}`}>
                  {issue.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions + Top Depts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          {/* Quick Actions */}
          <div className="glass-card p-5">
            <h2 className="font-semibold mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              Quick Actions
            </h2>
            <div className="space-y-2">
              <button onClick={() => navigate("/report")} className="w-full py-2.5 rounded-lg text-sm font-medium text-primary-foreground transition-all hover:opacity-90" style={{ background: "var(--gradient-primary)" }}>
                + Report New Issue
              </button>
              <button onClick={() => navigate("/map")} className="w-full py-2.5 rounded-lg text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all">
                View Live Map
              </button>
            </div>
          </div>

          {/* Top Departments */}
          <div className="glass-card p-5">
            <h2 className="font-semibold mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Top Departments
            </h2>
            <div className="space-y-2.5">
              {MOCK_DEPARTMENTS.sort((a, b) => b.satisfactionScore - a.satisfactionScore).slice(0, 4).map((dept, i) => (
                <div key={dept.name} className="flex items-center gap-2">
                  <span className="text-xs font-mono text-muted-foreground w-4">#{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium truncate">{dept.name}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-semibold text-primary">{dept.satisfactionScore}</span>
                    <span className="text-[10px] text-muted-foreground">/ 5</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* AI Features Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-5 glow-border"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: "var(--gradient-primary)" }}>
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold">AI-Powered Features Active</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Auto-classification • Image detection • Voice complaints (Tamil) • Crowd validation • Auto-escalation • Blockchain ledger
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
