import { useState } from "react";
import { motion } from "framer-motion";
import { MOCK_ISSUES, MOCK_WORKERS } from "@/lib/mockData";
import { MapPin, Users, AlertTriangle, Wrench, Eye } from "lucide-react";

const priorityColors: Record<string, string> = {
  low: "#14b8a6",
  medium: "#f59e0b",
  high: "#ef4444",
  critical: "#dc2626",
};

const workerColor = "#3b82f6";

// Simple SVG city map
export default function MapView() {
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "issues" | "workers">("all");

  const selected = MOCK_ISSUES.find(i => i.id === selectedIssue);

  return (
    <div className="space-y-4">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold">
          <span className="gradient-text">Live</span> City Map
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Real-time view of reported issues and field workers</p>
      </motion.div>

      {/* Filters */}
      <div className="flex gap-2">
        {(["all", "issues", "workers"] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
          >
            {f === "all" ? "All" : f === "issues" ? "🔴 Issues" : "🔵 Workers"}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 glass-card p-4 relative"
        >
          <div className="relative w-full" style={{ paddingBottom: "70%" }}>
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full rounded-lg overflow-hidden" style={{ background: "hsl(220, 18%, 8%)" }}>
              {/* River - Adyar River flowing through */}
              <path d="M0 72 C15 70, 25 75, 40 73 C55 71, 65 76, 80 74 C90 73, 95 71, 100 72 L100 78 C95 77, 90 79, 80 80 C65 82, 55 77, 40 79 C25 81, 15 76, 0 78 Z" fill="hsl(200, 50%, 12%)" stroke="hsl(200, 50%, 22%)" strokeWidth="0.3" />
              <path d="M5 74 C15 73, 30 76, 50 74 C70 72, 85 76, 95 74" fill="none" stroke="hsl(200, 60%, 25%)" strokeWidth="0.15" opacity="0.6" />
              <text x="50" y="76" textAnchor="middle" fontSize="1.8" fill="hsl(200, 60%, 35%)" fontStyle="italic">Adyar River</text>

              {/* Small canal */}
              <path d="M85 5 C84 15, 86 25, 85 35 C84 45, 86 55, 85 65" fill="none" stroke="hsl(200, 50%, 18%)" strokeWidth="1.2" />
              <path d="M85 5 C84 15, 86 25, 85 35 C84 45, 86 55, 85 65" fill="none" stroke="hsl(200, 60%, 25%)" strokeWidth="0.2" opacity="0.5" />
              <text x="88" y="35" fontSize="1.3" fill="hsl(200, 50%, 30%)" transform="rotate(88, 88, 35)">Buckingham Canal</text>

              {/* Main roads */}
              <g stroke="hsl(35, 20%, 22%)" fill="none">
                {/* Major horizontal roads */}
                <line x1="3" y1="20" x2="82" y2="20" strokeWidth="0.8" />
                <line x1="3" y1="35" x2="82" y2="35" strokeWidth="0.5" />
                <line x1="3" y1="50" x2="82" y2="50" strokeWidth="0.9" />
                <line x1="3" y1="65" x2="82" y2="65" strokeWidth="0.5" />
                <line x1="3" y1="85" x2="82" y2="85" strokeWidth="0.6" />
                {/* Major vertical roads */}
                <line x1="15" y1="5" x2="15" y2="70" strokeWidth="0.5" />
                <line x1="30" y1="5" x2="30" y2="70" strokeWidth="0.5" />
                <line x1="50" y1="5" x2="50" y2="70" strokeWidth="0.8" />
                <line x1="70" y1="5" x2="70" y2="70" strokeWidth="0.5" />
                {/* Below river */}
                <line x1="30" y1="80" x2="30" y2="97" strokeWidth="0.4" />
                <line x1="50" y1="80" x2="50" y2="97" strokeWidth="0.5" />
                <line x1="70" y1="80" x2="70" y2="97" strokeWidth="0.4" />
                {/* Minor roads */}
                <line x1="22" y1="10" x2="22" y2="65" strokeWidth="0.2" stroke="hsl(35, 15%, 16%)" />
                <line x1="40" y1="10" x2="40" y2="65" strokeWidth="0.2" stroke="hsl(35, 15%, 16%)" />
                <line x1="60" y1="10" x2="60" y2="65" strokeWidth="0.2" stroke="hsl(35, 15%, 16%)" />
                <line x1="5" y1="28" x2="82" y2="28" strokeWidth="0.2" stroke="hsl(35, 15%, 16%)" />
                <line x1="5" y1="42" x2="82" y2="42" strokeWidth="0.2" stroke="hsl(35, 15%, 16%)" />
                <line x1="5" y1="57" x2="82" y2="57" strokeWidth="0.2" stroke="hsl(35, 15%, 16%)" />
              </g>

              {/* Road labels */}
              <text x="42" y="19" textAnchor="middle" fontSize="1.6" fill="hsl(35, 20%, 35%)" fontWeight="500">Anna Salai (Mount Road)</text>
              <text x="42" y="49" textAnchor="middle" fontSize="1.6" fill="hsl(35, 20%, 35%)" fontWeight="500">GST Road</text>
              <text x="42" y="84" textAnchor="middle" fontSize="1.4" fill="hsl(35, 20%, 30%)">Velachery Main Rd</text>

              {/* Area blocks with houses */}
              {/* Anna Nagar */}
              <g>
                <rect x="5" y="8" width="23" height="10" rx="1" fill="hsl(220, 14%, 11%)" stroke="hsl(220, 14%, 16%)" strokeWidth="0.2" />
                {/* Houses */}
                <rect x="7" y="10" width="2" height="1.5" rx="0.3" fill="hsl(220, 14%, 15%)" stroke="hsl(220, 12%, 20%)" strokeWidth="0.15" />
                <rect x="10" y="10" width="2" height="1.5" rx="0.3" fill="hsl(220, 14%, 15%)" stroke="hsl(220, 12%, 20%)" strokeWidth="0.15" />
                <rect x="13" y="10" width="2" height="1.5" rx="0.3" fill="hsl(220, 14%, 15%)" stroke="hsl(220, 12%, 20%)" strokeWidth="0.15" />
                <rect x="7" y="13" width="3" height="2" rx="0.3" fill="hsl(220, 14%, 14%)" stroke="hsl(220, 12%, 20%)" strokeWidth="0.15" />
                <rect x="12" y="13" width="3" height="2" rx="0.3" fill="hsl(220, 14%, 14%)" stroke="hsl(220, 12%, 20%)" strokeWidth="0.15" />
                <rect x="17" y="10" width="4" height="3" rx="0.3" fill="hsl(220, 14%, 13%)" stroke="hsl(170, 30%, 20%)" strokeWidth="0.2" />
                <text x="16" y="7.5" textAnchor="middle" fontSize="2.2" fill="hsl(170, 60%, 50%)" fontWeight="700">Anna Nagar</text>
              </g>

              {/* Vadapalani */}
              <g>
                <rect x="32" y="8" width="16" height="10" rx="1" fill="hsl(220, 14%, 11%)" stroke="hsl(220, 14%, 16%)" strokeWidth="0.2" />
                <rect x="34" y="10" width="2.5" height="2" rx="0.3" fill="hsl(220, 14%, 15%)" stroke="hsl(220, 12%, 20%)" strokeWidth="0.15" />
                <rect x="37.5" y="10" width="2.5" height="2" rx="0.3" fill="hsl(220, 14%, 15%)" stroke="hsl(220, 12%, 20%)" strokeWidth="0.15" />
                <rect x="41" y="10" width="2.5" height="2" rx="0.3" fill="hsl(220, 14%, 15%)" stroke="hsl(220, 12%, 20%)" strokeWidth="0.15" />
                <rect x="34" y="13.5" width="4" height="2.5" rx="0.3" fill="hsl(30, 20%, 14%)" stroke="hsl(30, 30%, 22%)" strokeWidth="0.2" />
                <text x="38" y="14.5" textAnchor="middle" fontSize="0.9" fill="hsl(30, 30%, 35%)">Temple</text>
                <text x="40" y="7.5" textAnchor="middle" fontSize="2.2" fill="hsl(170, 60%, 50%)" fontWeight="700">Vadapalani</text>
              </g>

              {/* T. Nagar */}
              <g>
                <rect x="32" y="37" width="16" height="11" rx="1" fill="hsl(220, 14%, 11%)" stroke="hsl(220, 14%, 16%)" strokeWidth="0.2" />
                <rect x="34" y="39" width="2" height="1.5" rx="0.2" fill="hsl(220, 14%, 15%)" stroke="hsl(220, 12%, 20%)" strokeWidth="0.12" />
                <rect x="37" y="39" width="2" height="1.5" rx="0.2" fill="hsl(220, 14%, 15%)" stroke="hsl(220, 12%, 20%)" strokeWidth="0.12" />
                <rect x="40" y="39" width="2" height="1.5" rx="0.2" fill="hsl(220, 14%, 15%)" stroke="hsl(220, 12%, 20%)" strokeWidth="0.12" />
                <rect x="34" y="42" width="5" height="3" rx="0.3" fill="hsl(38, 15%, 13%)" stroke="hsl(38, 20%, 20%)" strokeWidth="0.15" />
                <text x="36.5" y="44" textAnchor="middle" fontSize="0.9" fill="hsl(38, 30%, 35%)">Market</text>
                <rect x="40" y="42" width="3" height="3" rx="0.3" fill="hsl(220, 14%, 14%)" stroke="hsl(220, 12%, 20%)" strokeWidth="0.12" />
                <text x="40" y="36" textAnchor="middle" fontSize="2" fill="hsl(170, 60%, 50%)" fontWeight="700">T. Nagar</text>
              </g>

              {/* Adyar */}
              <g>
                <rect x="52" y="52" width="16" height="11" rx="1" fill="hsl(220, 14%, 11%)" stroke="hsl(220, 14%, 16%)" strokeWidth="0.2" />
                <rect x="54" y="54" width="2.5" height="2" rx="0.3" fill="hsl(220, 14%, 15%)" stroke="hsl(220, 12%, 20%)" strokeWidth="0.15" />
                <rect x="57.5" y="54" width="2.5" height="2" rx="0.3" fill="hsl(220, 14%, 15%)" stroke="hsl(220, 12%, 20%)" strokeWidth="0.15" />
                <rect x="61" y="54" width="2.5" height="2" rx="0.3" fill="hsl(220, 14%, 15%)" stroke="hsl(220, 12%, 20%)" strokeWidth="0.15" />
                <rect x="54" y="57" width="3" height="2.5" rx="0.3" fill="hsl(200, 20%, 14%)" stroke="hsl(200, 25%, 22%)" strokeWidth="0.2" />
                <text x="55.5" y="58.5" textAnchor="middle" fontSize="0.8" fill="hsl(200, 30%, 35%)">IIT</text>
                <text x="60" y="51" textAnchor="middle" fontSize="2.2" fill="hsl(170, 60%, 50%)" fontWeight="700">Adyar</text>
              </g>

              {/* Pallavaram (below river) */}
              <g>
                <rect x="20" y="82" width="18" height="13" rx="1" fill="hsl(220, 14%, 11%)" stroke="hsl(220, 14%, 16%)" strokeWidth="0.2" />
                <rect x="22" y="84" width="2.5" height="2" rx="0.3" fill="hsl(220, 14%, 15%)" stroke="hsl(220, 12%, 20%)" strokeWidth="0.15" />
                <rect x="25.5" y="84" width="2.5" height="2" rx="0.3" fill="hsl(220, 14%, 15%)" stroke="hsl(220, 12%, 20%)" strokeWidth="0.15" />
                <rect x="29" y="84" width="2.5" height="2" rx="0.3" fill="hsl(220, 14%, 15%)" stroke="hsl(220, 12%, 20%)" strokeWidth="0.15" />
                <rect x="22" y="87.5" width="3.5" height="2.5" rx="0.3" fill="hsl(220, 14%, 14%)" stroke="hsl(220, 12%, 20%)" strokeWidth="0.12" />
                <rect x="27" y="87.5" width="4" height="3" rx="0.3" fill="hsl(150, 15%, 12%)" stroke="hsl(150, 20%, 20%)" strokeWidth="0.15" />
                <text x="29" y="89.5" textAnchor="middle" fontSize="0.8" fill="hsl(150, 30%, 30%)">AFB</text>
                <text x="29" y="81" textAnchor="middle" fontSize="2.2" fill="hsl(170, 60%, 50%)" fontWeight="700">Pallavaram</text>
              </g>

              {/* More city blocks */}
              {/* Egmore area */}
              <g>
                <rect x="52" y="22" width="16" height="11" rx="1" fill="hsl(220, 14%, 11%)" stroke="hsl(220, 14%, 16%)" strokeWidth="0.2" />
                <rect x="54" y="24" width="3" height="2" rx="0.3" fill="hsl(220, 14%, 14%)" stroke="hsl(220, 12%, 20%)" strokeWidth="0.15" />
                <rect x="58" y="24" width="3" height="2" rx="0.3" fill="hsl(220, 14%, 14%)" stroke="hsl(220, 12%, 20%)" strokeWidth="0.15" />
                <rect x="62" y="24" width="3" height="2" rx="0.3" fill="hsl(220, 14%, 14%)" stroke="hsl(220, 12%, 20%)" strokeWidth="0.15" />
                <rect x="54" y="27.5" width="5" height="3" rx="0.3" fill="hsl(0, 15%, 14%)" stroke="hsl(0, 20%, 22%)" strokeWidth="0.2" />
                <text x="56.5" y="29.5" textAnchor="middle" fontSize="0.8" fill="hsl(0, 25%, 35%)">Museum</text>
                <text x="60" y="21.5" textAnchor="middle" fontSize="1.8" fill="hsl(170, 50%, 45%)" fontWeight="600">Egmore</text>
              </g>

              {/* Mylapore */}
              <g>
                <rect x="72" y="37" width="11" height="11" rx="1" fill="hsl(220, 14%, 11%)" stroke="hsl(220, 14%, 16%)" strokeWidth="0.2" />
                <rect x="73.5" y="39" width="2" height="1.5" rx="0.2" fill="hsl(220, 14%, 15%)" stroke="hsl(220, 12%, 20%)" strokeWidth="0.12" />
                <rect x="76" y="39" width="2" height="1.5" rx="0.2" fill="hsl(220, 14%, 15%)" stroke="hsl(220, 12%, 20%)" strokeWidth="0.12" />
                <rect x="73.5" y="42" width="4" height="3" rx="0.3" fill="hsl(30, 20%, 14%)" stroke="hsl(30, 30%, 22%)" strokeWidth="0.2" />
                <text x="75.5" y="44" textAnchor="middle" fontSize="0.8" fill="hsl(30, 30%, 35%)">Temple</text>
                <text x="77.5" y="36.5" textAnchor="middle" fontSize="1.8" fill="hsl(170, 50%, 45%)" fontWeight="600">Mylapore</text>
              </g>

              {/* Nungambakkam */}
              <g>
                <rect x="17" y="37" width="11" height="11" rx="1" fill="hsl(220, 14%, 11%)" stroke="hsl(220, 14%, 16%)" strokeWidth="0.2" />
                <rect x="19" y="39" width="2" height="1.5" rx="0.2" fill="hsl(220, 14%, 15%)" stroke="hsl(220, 12%, 20%)" strokeWidth="0.12" />
                <rect x="22" y="39" width="2" height="1.5" rx="0.2" fill="hsl(220, 14%, 15%)" stroke="hsl(220, 12%, 20%)" strokeWidth="0.12" />
                <rect x="19" y="42" width="3" height="2.5" rx="0.3" fill="hsl(220, 14%, 14%)" stroke="hsl(220, 12%, 20%)" strokeWidth="0.12" />
                <text x="22.5" y="36" textAnchor="middle" fontSize="1.5" fill="hsl(170, 50%, 45%)" fontWeight="600">Nungambakkam</text>
              </g>

              {/* Guindy */}
              <g>
                <rect x="17" y="52" width="11" height="11" rx="1" fill="hsl(220, 14%, 11%)" stroke="hsl(220, 14%, 16%)" strokeWidth="0.2" />
                <rect x="19" y="54" width="2.5" height="2" rx="0.3" fill="hsl(220, 14%, 15%)" stroke="hsl(220, 12%, 20%)" strokeWidth="0.12" />
                <rect x="22.5" y="54" width="2.5" height="2" rx="0.3" fill="hsl(220, 14%, 15%)" stroke="hsl(220, 12%, 20%)" strokeWidth="0.12" />
                <text x="22.5" y="51" textAnchor="middle" fontSize="1.8" fill="hsl(170, 50%, 45%)" fontWeight="600">Guindy</text>
              </g>

              {/* Velachery (below river) */}
              <g>
                <rect x="45" y="82" width="16" height="13" rx="1" fill="hsl(220, 14%, 11%)" stroke="hsl(220, 14%, 16%)" strokeWidth="0.2" />
                <rect x="47" y="84" width="2.5" height="2" rx="0.3" fill="hsl(220, 14%, 15%)" stroke="hsl(220, 12%, 20%)" strokeWidth="0.15" />
                <rect x="50.5" y="84" width="2.5" height="2" rx="0.3" fill="hsl(220, 14%, 15%)" stroke="hsl(220, 12%, 20%)" strokeWidth="0.15" />
                <rect x="54" y="84" width="2.5" height="2" rx="0.3" fill="hsl(220, 14%, 15%)" stroke="hsl(220, 12%, 20%)" strokeWidth="0.15" />
                <text x="53" y="81" textAnchor="middle" fontSize="1.8" fill="hsl(170, 50%, 45%)" fontWeight="600">Velachery</text>
              </g>

              {/* Park - Guindy National Park */}
              <rect x="5" y="60" width="10" height="8" rx="2" fill="hsl(150, 30%, 11%)" stroke="hsl(150, 30%, 20%)" strokeWidth="0.3" />
              <circle cx="8" cy="63" r="1" fill="hsl(150, 40%, 16%)" />
              <circle cx="11" cy="64" r="0.8" fill="hsl(150, 40%, 16%)" />
              <circle cx="9" cy="65.5" r="1.2" fill="hsl(150, 40%, 16%)" />
              <text x="10" y="59.5" textAnchor="middle" fontSize="1.2" fill="hsl(150, 40%, 35%)">Guindy Park</text>

              {/* Children's Park in T.Nagar */}
              <rect x="32" y="52" width="8" height="6" rx="1.5" fill="hsl(150, 25%, 11%)" stroke="hsl(150, 25%, 18%)" strokeWidth="0.2" />
              <circle cx="35" cy="55" r="0.7" fill="hsl(150, 35%, 15%)" />
              <circle cx="37" cy="54.5" r="0.5" fill="hsl(150, 35%, 15%)" />
              <text x="36" y="53" textAnchor="middle" fontSize="0.9" fill="hsl(150, 40%, 35%)">Park</text>

              {/* Lake */}
              <ellipse cx="75" cy="88" rx="8" ry="6" fill="hsl(200, 45%, 11%)" stroke="hsl(200, 45%, 22%)" strokeWidth="0.3" />
              <ellipse cx="75" cy="87.5" rx="5" ry="3" fill="none" stroke="hsl(200, 50%, 18%)" strokeWidth="0.2" />
              <text x="75" y="89" textAnchor="middle" fontSize="1.5" fill="hsl(200, 55%, 35%)" fontStyle="italic">Nanmangalam Lake</text>

              {/* Bridges over river */}
              <rect x="29" y="71.5" width="2" height="7" rx="0.3" fill="hsl(35, 20%, 18%)" stroke="hsl(35, 20%, 25%)" strokeWidth="0.2" />
              <rect x="49" y="71.5" width="2.5" height="7" rx="0.3" fill="hsl(35, 20%, 18%)" stroke="hsl(35, 20%, 25%)" strokeWidth="0.2" />
              <rect x="69" y="71.5" width="2" height="7" rx="0.3" fill="hsl(35, 20%, 18%)" stroke="hsl(35, 20%, 25%)" strokeWidth="0.2" />

              {/* Issue markers */}
              {(filter === "all" || filter === "issues") && MOCK_ISSUES.map((issue) => (
                <g key={issue.id} onClick={() => setSelectedIssue(issue.id)} className="cursor-pointer">
                  <circle
                    cx={issue.location.lng}
                    cy={issue.location.lat}
                    r={selectedIssue === issue.id ? 2.5 : 1.8}
                    fill={priorityColors[issue.priority]}
                    opacity={0.9}
                    stroke="hsl(220, 20%, 7%)"
                    strokeWidth="0.4"
                  />
                  {issue.priority === "critical" && (
                    <circle cx={issue.location.lng} cy={issue.location.lat} r="3" fill="none" stroke={priorityColors.critical} strokeWidth="0.3" opacity="0.5">
                      <animate attributeName="r" from="2" to="5" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite" />
                    </circle>
                  )}
                  {selectedIssue === issue.id && (
                    <text x={issue.location.lng} y={issue.location.lat - 4} textAnchor="middle" fontSize="2" fill="hsl(210, 20%, 92%)" fontWeight="600">
                      {issue.title.slice(0, 25)}
                    </text>
                  )}
                </g>
              ))}

              {/* Worker markers */}
              {(filter === "all" || filter === "workers") && MOCK_WORKERS.map((worker) => (
                <g key={worker.id}>
                  <rect
                    x={worker.location.lng - 1.2}
                    y={worker.location.lat - 1.2}
                    width="2.4"
                    height="2.4"
                    rx="0.5"
                    fill={workerColor}
                    opacity={worker.status === "available" ? 0.6 : 0.9}
                    stroke="hsl(220, 20%, 7%)"
                    strokeWidth="0.3"
                  />
                </g>
              ))}
            </svg>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground flex-wrap">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-destructive" /> Critical</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full" style={{ background: priorityColors.high }} /> High</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-accent" /> Medium</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-primary" /> Low</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-info" /> Worker</span>
          </div>
        </motion.div>

        {/* Side panel */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-3">
          {selected ? (
            <div className="glass-card p-4 glow-border">
              <h3 className="font-semibold text-sm mb-2">{selected.title}</h3>
              <p className="text-xs text-muted-foreground mb-3">{selected.description}</p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between"><span className="text-muted-foreground">Category</span><span className="text-primary font-medium">{selected.category}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Priority</span><span className={`font-medium ${selected.priority === "critical" || selected.priority === "high" ? "text-destructive" : "text-accent"}`}>{selected.priority}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Status</span><span className="font-medium">{selected.status}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Location</span><span>{selected.location.name}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Upvotes</span><span className="text-primary">{selected.upvotes} citizens</span></div>
                {selected.assignedWorker && <div className="flex justify-between"><span className="text-muted-foreground">Worker</span><span>{MOCK_WORKERS.find(w => w.id === selected.assignedWorker)?.name}</span></div>}
              </div>
              <button onClick={() => setSelectedIssue(null)} className="w-full mt-3 py-1.5 rounded text-xs bg-secondary text-secondary-foreground">Close</button>
            </div>
          ) : (
            <div className="glass-card p-4">
              <p className="text-xs text-muted-foreground text-center">Click on a marker to view details</p>
            </div>
          )}

          {/* Stats */}
          <div className="glass-card p-4 space-y-3">
            <h3 className="font-semibold text-sm flex items-center gap-2"><Eye className="w-3.5 h-3.5 text-primary" /> Map Stats</h3>
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-muted-foreground"><AlertTriangle className="w-3 h-3" /> Active Issues</span>
              <span className="font-semibold">{MOCK_ISSUES.length}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-muted-foreground"><Users className="w-3 h-3" /> Field Workers</span>
              <span className="font-semibold">{MOCK_WORKERS.length}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-muted-foreground"><Wrench className="w-3 h-3" /> On Task</span>
              <span className="font-semibold text-primary">{MOCK_WORKERS.filter(w => w.status === "on-task").length}</span>
            </div>
          </div>

          {/* Nearby Workers */}
          <div className="glass-card p-4">
            <h3 className="font-semibold text-sm mb-2 flex items-center gap-2"><Users className="w-3.5 h-3.5 text-info" /> Field Workers</h3>
            <div className="space-y-2">
              {MOCK_WORKERS.slice(0, 5).map(w => (
                <div key={w.id} className="flex items-center gap-2 text-xs">
                  <div className={`w-2 h-2 rounded-full ${w.status === "on-task" ? "bg-accent" : w.status === "available" ? "bg-success" : "bg-muted-foreground"}`} />
                  <span className="flex-1">{w.name}</span>
                  <span className="text-muted-foreground">{w.status}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
