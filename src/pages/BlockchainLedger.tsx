import { motion } from "framer-motion";
import { MOCK_ISSUES } from "@/lib/mockData";
import { Shield, Link, Clock, CheckCircle, Hash } from "lucide-react";

const ledgerEntries = MOCK_ISSUES.filter(i => i.blockchainHash).map(issue => ({
  ...issue,
  blocks: [
    { action: "Complaint Filed", timestamp: issue.reportedAt, hash: issue.blockchainHash! },
    { action: "Assigned to Department", timestamp: new Date(new Date(issue.reportedAt).getTime() + 3600000).toISOString(), hash: "0x" + Math.random().toString(16).slice(2, 10) + "..." },
    { action: "Status: " + issue.status, timestamp: new Date(new Date(issue.reportedAt).getTime() + 7200000).toISOString(), hash: "0x" + Math.random().toString(16).slice(2, 10) + "..." },
  ]
}));

export default function BlockchainLedger() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Shield className="w-6 h-6 text-primary" /> Blockchain Complaint Ledger
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Tamper-proof governance transparency system — every action is immutably recorded</p>
      </motion.div>

      {/* Info banner */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4 glow-border">
        <div className="flex items-start gap-3">
          <Link className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold">Immutable Record Chain</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Each complaint, status update, and resolution is stored as a block. Citizens can verify any action taken — ensuring zero tampering and full accountability.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Ledger entries */}
      <div className="space-y-4">
        {ledgerEntries.map((entry, i) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className="glass-card p-5"
          >
            <div className="flex items-center gap-2 mb-3">
              <Hash className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold">{entry.id}: {entry.title}</span>
              <span className="ml-auto text-xs font-mono text-muted-foreground">{entry.blockchainHash}</span>
            </div>

            {/* Chain visualization */}
            <div className="relative pl-6">
              <div className="absolute left-2.5 top-0 bottom-0 w-px bg-border" />
              {entry.blocks.map((block, bi) => (
                <div key={bi} className="relative mb-4 last:mb-0">
                  <div className="absolute -left-[14px] top-1 w-3 h-3 rounded-full bg-primary border-2 border-background" />
                  <div className="bg-secondary/30 rounded-lg p-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-medium flex items-center gap-1.5">
                        <CheckCircle className="w-3 h-3 text-success" />
                        {block.action}
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground">{block.hash}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-[10px] text-muted-foreground">
                      <Clock className="w-2.5 h-2.5" />
                      {new Date(block.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
