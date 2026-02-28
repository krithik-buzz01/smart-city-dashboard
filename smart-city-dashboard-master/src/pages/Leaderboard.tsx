import { motion } from "framer-motion";
import { MOCK_DEPARTMENTS } from "@/lib/mockData";
import { Trophy, TrendingUp, TrendingDown, Minus, Clock, Star, CheckCircle } from "lucide-react";

const sorted = [...MOCK_DEPARTMENTS].sort((a, b) => b.satisfactionScore - a.satisfactionScore);

const trendIcon = { up: TrendingUp, down: TrendingDown, stable: Minus };
const trendColor = { up: "text-success", down: "text-destructive", stable: "text-muted-foreground" };
const medalColors = ["text-accent", "text-muted-foreground", "text-amber-700"];

export default function Leaderboard() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Trophy className="w-6 h-6 text-accent" /> Department Leaderboard
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Performance ranking based on resolution time & citizen satisfaction</p>
      </motion.div>

      {/* Top 3 podium */}
      <div className="grid grid-cols-3 gap-3">
        {sorted.slice(0, 3).map((dept, i) => (
          <motion.div
            key={dept.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className={`glass-card p-5 text-center ${i === 0 ? "glow-border" : ""}`}
          >
            <div className={`text-3xl font-bold mb-1 ${medalColors[i] || "text-foreground"}`}>#{i + 1}</div>
            <h3 className="text-sm font-semibold mb-2">{dept.name}</h3>
            <div className="text-2xl font-bold text-primary mb-1">{dept.satisfactionScore}</div>
            <div className="text-xs text-muted-foreground">/ 5.0 rating</div>
            <div className="flex items-center justify-center gap-1 mt-2 text-xs">
              {(() => { const TIcon = trendIcon[dept.trend]; return <TIcon className={`w-3 h-3 ${trendColor[dept.trend]}`} />; })()}
              <span className={trendColor[dept.trend]}>{dept.trend}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Full ranking */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card overflow-hidden">
        <div className="grid grid-cols-6 gap-2 p-3 text-xs font-medium text-muted-foreground border-b border-border">
          <div>Rank</div>
          <div className="col-span-2">Department</div>
          <div className="text-center">Resolved</div>
          <div className="text-center">Avg Time</div>
          <div className="text-center">Rating</div>
        </div>
        {sorted.map((dept, i) => (
          <div key={dept.name} className="grid grid-cols-6 gap-2 p-3 text-sm items-center hover:bg-secondary/30 transition-colors border-b border-border/50 last:border-0">
            <div className={`font-bold ${i < 3 ? medalColors[i] : "text-muted-foreground"}`}>#{i + 1}</div>
            <div className="col-span-2">
              <div className="font-medium text-xs">{dept.name}</div>
              <div className="text-[10px] text-muted-foreground">{dept.activeIssues} active issues</div>
            </div>
            <div className="text-center flex items-center justify-center gap-1 text-xs">
              <CheckCircle className="w-3 h-3 text-success" />{dept.resolvedCount}
            </div>
            <div className="text-center flex items-center justify-center gap-1 text-xs">
              <Clock className="w-3 h-3 text-info" />{dept.avgResolutionTime}h
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-xs">
                <Star className="w-3 h-3 text-accent" />
                <span className="font-semibold">{dept.satisfactionScore}</span>
              </div>
              {/* Progress bar */}
              <div className="w-full h-1 bg-secondary rounded-full mt-1">
                <div className="h-1 rounded-full bg-primary" style={{ width: `${(dept.satisfactionScore / 5) * 100}%` }} />
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
