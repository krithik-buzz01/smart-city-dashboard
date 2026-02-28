import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { classifyIssue } from "@/lib/mockData";
import { 
  Send, Mic, MicOff, Camera, Loader2, CheckCircle, 
  MapPin, Tag, AlertTriangle, Building, Brain, Upload, Sparkles
} from "lucide-react";
import { toast } from "sonner";

export default function ReportIssue() {
  const [text, setText] = useState("");
  const [isClassifying, setIsClassifying] = useState(false);
  const [classification, setClassification] = useState<ReturnType<typeof classifyIssue> | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [imageAnalysis, setImageAnalysis] = useState<{ type: string; severity: string; cost: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleClassify = async () => {
    if (!text.trim()) return;
    setIsClassifying(true);
    setClassification(null);
    // Simulate AI processing
    await new Promise(r => setTimeout(r, 1500));
    const result = classifyIssue(text);
    setClassification(result);
    setIsClassifying(false);
  };

  const handleVoice = () => {
    if (isRecording) {
      setIsRecording(false);
      // Simulate Tamil speech-to-text
      setTimeout(() => {
        setText("பேருந்து நிலையம் அருகில் தண்ணீர் கசிவு 2 நாட்களாக - Water leaking near bus stand for 2 days");
        toast.success("Tamil speech converted to text!");
      }, 500);
    } else {
      setIsRecording(true);
      toast.info("🎤 Recording... Speak in Tamil or English");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageFile(url);
      // Simulate CV analysis
      setTimeout(() => {
        setImageAnalysis({ type: "Garbage Pile", severity: "High", cost: "₹5,000 - ₹8,000" });
        toast.success("🤖 Image analyzed by AI Vision!");
      }, 2000);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    toast.success("Issue reported! Blockchain hash: 0x7fa3...d91e");
  };

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: "var(--gradient-primary)" }}>
          <CheckCircle className="w-8 h-8 text-primary-foreground" />
        </div>
        <h2 className="text-xl font-bold mb-2">Issue Reported Successfully!</h2>
        <p className="text-sm text-muted-foreground mb-1">Complaint ID: <span className="font-mono text-primary">SC-013</span></p>
        <p className="text-xs text-muted-foreground mb-4">Blockchain Hash: <span className="font-mono">0x7fa3...d91e</span></p>
        <div className="glass-card p-4 max-w-sm w-full text-left space-y-2 mb-6">
          <div className="text-xs text-muted-foreground">Auto-Escalation Timeline:</div>
          <div className="text-xs">48h → Senior Officer • 5d → Commissioner • 7d → Public Dashboard</div>
        </div>
        <button onClick={() => { setSubmitted(false); setText(""); setClassification(null); setImageFile(null); setImageAnalysis(null); }} className="px-6 py-2 rounded-lg text-sm font-medium text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
          Report Another
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold">Report an Issue</h1>
        <p className="text-sm text-muted-foreground mt-1">AI auto-classifies your complaint — just describe the problem</p>
      </motion.div>

      {/* Text Input */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-5">
        <label className="text-sm font-medium mb-2 block">Describe the Issue</label>
        <textarea
          value={text}
          onChange={e => { setText(e.target.value); setClassification(null); }}
          placeholder='e.g. "Water leaking near bus stand for 2 days" or speak in Tamil...'
          className="w-full h-28 bg-secondary/50 rounded-lg p-3 text-sm resize-none border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground"
        />
        <div className="flex gap-2 mt-3">
          <button
            onClick={handleClassify}
            disabled={!text.trim() || isClassifying}
            className="flex-1 py-2.5 rounded-lg text-sm font-medium text-primary-foreground disabled:opacity-50 flex items-center justify-center gap-2 transition-all hover:opacity-90"
            style={{ background: "var(--gradient-primary)" }}
          >
            {isClassifying ? <Loader2 className="w-4 h-4 animate-spin" /> : <Brain className="w-4 h-4" />}
            {isClassifying ? "AI Analyzing..." : "AI Classify"}
          </button>
          <button
            onClick={handleVoice}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${isRecording ? "bg-destructive text-destructive-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
        </div>
        {isRecording && (
          <div className="flex items-center gap-2 mt-2 text-xs text-destructive">
            <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
            Recording... supports Tamil & English
          </div>
        )}
      </motion.div>

      {/* AI Classification Result */}
      <AnimatePresence>
        {classification && (
          <motion.div
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-card p-5 glow-border"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-sm">AI Classification Result</h3>
              <span className="ml-auto text-xs font-mono text-primary">{(classification.confidence * 100).toFixed(0)}% confidence</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-secondary/50 rounded-lg p-3">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1"><Tag className="w-3 h-3" /> Category</div>
                <div className="text-sm font-semibold text-primary">{classification.category}</div>
              </div>
              <div className="bg-secondary/50 rounded-lg p-3">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1"><MapPin className="w-3 h-3" /> Location</div>
                <div className="text-sm font-semibold">{classification.location}</div>
              </div>
              <div className="bg-secondary/50 rounded-lg p-3">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1"><AlertTriangle className="w-3 h-3" /> Priority</div>
                <div className={`text-sm font-semibold ${classification.priority === "critical" ? "text-destructive" : classification.priority === "high" ? "text-destructive" : classification.priority === "medium" ? "text-accent" : "text-primary"}`}>
                  {classification.priority.toUpperCase()}
                </div>
              </div>
              <div className="bg-secondary/50 rounded-lg p-3">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1"><Building className="w-3 h-3" /> Department</div>
                <div className="text-sm font-semibold">{classification.department}</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Upload */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-5">
        <label className="text-sm font-medium mb-2 block flex items-center gap-2">
          <Camera className="w-4 h-4 text-primary" />
          Image Detection (Computer Vision)
        </label>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
        {!imageFile ? (
          <button
            onClick={() => fileRef.current?.click()}
            className="w-full py-8 rounded-lg border-2 border-dashed border-border hover:border-primary/50 flex flex-col items-center gap-2 transition-all text-muted-foreground hover:text-foreground"
          >
            <Upload className="w-6 h-6" />
            <span className="text-sm">Upload image of issue</span>
            <span className="text-xs text-muted-foreground">AI detects: type, severity, estimated cost</span>
          </button>
        ) : (
          <div className="space-y-3">
            <img src={imageFile} alt="Issue" className="w-full h-48 object-cover rounded-lg" />
            {imageAnalysis && (
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-secondary/50 rounded-lg p-2 text-center">
                  <div className="text-[10px] text-muted-foreground">Type</div>
                  <div className="text-xs font-semibold text-primary">{imageAnalysis.type}</div>
                </div>
                <div className="bg-secondary/50 rounded-lg p-2 text-center">
                  <div className="text-[10px] text-muted-foreground">Severity</div>
                  <div className="text-xs font-semibold text-destructive">{imageAnalysis.severity}</div>
                </div>
                <div className="bg-secondary/50 rounded-lg p-2 text-center">
                  <div className="text-[10px] text-muted-foreground">Est. Cost</div>
                  <div className="text-xs font-semibold text-accent">{imageAnalysis.cost}</div>
                </div>
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Submit */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <button
          onClick={handleSubmit}
          disabled={!text.trim()}
          className="w-full py-3 rounded-lg text-sm font-semibold text-primary-foreground disabled:opacity-50 flex items-center justify-center gap-2 transition-all hover:opacity-90"
          style={{ background: "var(--gradient-primary)" }}
        >
          <Send className="w-4 h-4" /> Submit Report (Blockchain Logged)
        </button>
      </motion.div>
    </div>
  );
}
