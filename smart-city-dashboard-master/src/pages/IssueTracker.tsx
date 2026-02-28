import { useState } from "react";
import { motion } from "framer-motion";
import { MOCK_ISSUES } from "@/lib/mockData";
import { Search, Filter, MapPin, Clock, ThumbsUp, Shield } from "lucide-react";

const priorityColor: Record<string, string> = {
  low: "bg-primary/20 text-primary",
  medium: "bg-accent/20 text-accent",
  high: "bg-destructive/20 text-destructive",
  critical: "bg-destructive/30 text-destructive",
};

const statusColor: Record<string, string> = {
  reported: "bg-muted text-muted-foreground",
  assigned: "bg-info/20 text-info",
  "in-progress": "bg-accent/20 text-accent",
  resolved: "bg-success/20 text-success",
  escalated: "bg-destructive/20 text-destructive",
};

export default function IssueTracker() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = MOCK_ISSUES.filter(i => {
    const matchSearch = i.title.toLowerCase().includes(search.toLowerCase()) || i.category.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || i.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const getTimeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="space-y-4">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold">Issue Tracker</h1>
        <p className="text-sm text-muted-foreground mt-1">Track, filter, and manage all reported issues</p>
      </motion.div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search issues..."
            className="w-full pl-9 pr-4 py-2 bg-secondary/50 rounded-lg text-sm border border-border focus:border-primary outline-none"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {["all", "reported", "assigned", "in-progress", "escalated", "resolved"].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${statusFilter === s ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
            >
              {s === "all" ? "All" : s}
            </button>
          ))}
        </div>
      </div>

      {/* Issue List */}
      <div className="space-y-2">
        {filtered.map((issue, i) => (
          <motion.div
            key={issue.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-4 hover:border-primary/30 transition-all"
          >
            <div className="flex items-start gap-3">
              <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${issue.priority === "critical" ? "priority-critical" : issue.priority === "high" ? "priority-high" : issue.priority === "medium" ? "priority-medium" : "priority-low"}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono text-muted-foreground">{issue.id}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${priorityColor[issue.priority]}`}>{issue.priority}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${statusColor[issue.status]}`}>{issue.status}</span>
                  {issue.imageDetected && <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-info/20 text-info">📷 CV</span>}
                  {issue.blockchainHash && <Shield className="w-3 h-3 text-primary" />}
                </div>
                <h3 className="text-sm font-medium mt-1">{issue.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{issue.description}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{issue.location.name}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{getTimeAgo(issue.reportedAt)}</span>
                  <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" />{issue.upvotes}</span>
                  {issue.upvotes >= 10 && <span className="text-primary font-medium">✓ Crowd Validated</span>}
                </div>
              </div>
              <div className="text-xs text-right shrink-0">
                <div className="text-muted-foreground">{issue.category}</div>
                <div className="text-muted-foreground mt-0.5">{issue.department}</div>
                {issue.estimatedCost && <div className="text-accent mt-0.5">₹{issue.estimatedCost.toLocaleString()}</div>}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground text-sm">No issues found</div>
      )}
    </div>
  );
}
