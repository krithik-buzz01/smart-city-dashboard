export interface Issue {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: "low" | "medium" | "high" | "critical";
  status: "reported" | "assigned" | "in-progress" | "resolved" | "escalated";
  location: { name: string; lat: number; lng: number };
  reportedAt: string;
  department: string;
  upvotes: number;
  imageDetected?: boolean;
  blockchainHash?: string;
  assignedWorker?: string;
  estimatedCost?: number;
}

export interface Worker {
  id: string;
  name: string;
  department: string;
  location: { lat: number; lng: number };
  status: "available" | "on-task" | "offline";
  activeIssues: number;
}

export interface Department {
  name: string;
  resolvedCount: number;
  avgResolutionTime: number;
  satisfactionScore: number;
  activeIssues: number;
  trend: "up" | "down" | "stable";
}

export const CATEGORIES = [
  "Water Supply", "Road Damage", "Garbage", "Street Lights", 
  "Drainage", "Tree Fallen", "Noise Complaint", "Illegal Construction",
  "Traffic Signal", "Public Safety"
];

export const DEPARTMENTS = [
  "Municipal Water Dept", "Roads & Bridges", "Solid Waste Management",
  "Electrical Dept", "Drainage Board", "Parks & Gardens",
  "Traffic Police", "Building Regulation", "Public Safety"
];

// Smart City map coordinates (normalized 0-100 grid)
export const MOCK_ISSUES: Issue[] = [
  { id: "SC-001", title: "Water leaking near bus stand", description: "Major water pipe leak causing road flooding", category: "Water Supply", priority: "high", status: "assigned", location: { name: "Central Bus Stand", lat: 35, lng: 52 }, reportedAt: "2026-02-26T10:30:00", department: "Municipal Water Dept", upvotes: 23, blockchainHash: "0xabc1...f3d2", assignedWorker: "W-003" },
  { id: "SC-002", title: "Pothole on Main Road", description: "Large pothole causing accidents", category: "Road Damage", priority: "critical", status: "escalated", location: { name: "MG Road Junction", lat: 48, lng: 35 }, reportedAt: "2026-02-20T08:15:00", department: "Roads & Bridges", upvotes: 47, blockchainHash: "0xdef4...a1b2", estimatedCost: 15000 },
  { id: "SC-003", title: "Garbage pile near school", description: "Uncollected garbage for 3 days near govt school", category: "Garbage", priority: "high", status: "in-progress", location: { name: "Govt Higher Secondary School", lat: 62, lng: 68 }, reportedAt: "2026-02-25T14:00:00", department: "Solid Waste Management", upvotes: 34, imageDetected: true, assignedWorker: "W-001" },
  { id: "SC-004", title: "Street light not working", description: "Dark stretch on Anna Nagar 3rd street", category: "Street Lights", priority: "medium", status: "reported", location: { name: "Anna Nagar 3rd Street", lat: 28, lng: 72 }, reportedAt: "2026-02-27T19:45:00", department: "Electrical Dept", upvotes: 12 },
  { id: "SC-005", title: "Drainage overflow", description: "Sewage water overflowing onto road", category: "Drainage", priority: "critical", status: "assigned", location: { name: "T. Nagar Market", lat: 55, lng: 45 }, reportedAt: "2026-02-21T06:30:00", department: "Drainage Board", upvotes: 56, blockchainHash: "0x789e...c4d5", assignedWorker: "W-005" },
  { id: "SC-006", title: "Fallen tree blocking road", description: "Large banyan tree fell after storm", category: "Tree Fallen", priority: "high", status: "in-progress", location: { name: "Park Road", lat: 72, lng: 28 }, reportedAt: "2026-02-27T04:00:00", department: "Parks & Gardens", upvotes: 18, imageDetected: true, estimatedCost: 8000, assignedWorker: "W-002" },
  { id: "SC-007", title: "Broken traffic signal", description: "Signal stuck on green, causing accidents", category: "Traffic Signal", priority: "critical", status: "assigned", location: { name: "Central Cross Road", lat: 45, lng: 50 }, reportedAt: "2026-02-27T11:00:00", department: "Traffic Police", upvotes: 41, assignedWorker: "W-004" },
  { id: "SC-008", title: "Illegal dumping in vacant lot", description: "Construction debris dumped illegally", category: "Garbage", priority: "medium", status: "reported", location: { name: "Industrial Area Block 5", lat: 18, lng: 38 }, reportedAt: "2026-02-26T16:20:00", department: "Solid Waste Management", upvotes: 8, imageDetected: true },
  { id: "SC-009", title: "Water contamination", description: "Yellow colored water from taps", category: "Water Supply", priority: "high", status: "in-progress", location: { name: "Residential Block C", lat: 40, lng: 78 }, reportedAt: "2026-02-25T07:00:00", department: "Municipal Water Dept", upvotes: 29, assignedWorker: "W-006" },
  { id: "SC-010", title: "Noise from construction site", description: "Construction at night violating rules", category: "Noise Complaint", priority: "low", status: "reported", location: { name: "New Tower Site, Phase 2", lat: 82, lng: 55 }, reportedAt: "2026-02-27T23:00:00", department: "Building Regulation", upvotes: 5 },
  { id: "SC-011", title: "Road cave-in near metro", description: "Road sinking near metro construction", category: "Road Damage", priority: "critical", status: "escalated", location: { name: "Metro Station Exit B", lat: 50, lng: 60 }, reportedAt: "2026-02-19T12:00:00", department: "Roads & Bridges", upvotes: 67, blockchainHash: "0xfed9...b8a7", estimatedCost: 250000 },
  { id: "SC-012", title: "Stray dog menace", description: "Pack of aggressive strays near park", category: "Public Safety", priority: "medium", status: "assigned", location: { name: "Children's Park", lat: 65, lng: 40 }, reportedAt: "2026-02-26T08:30:00", department: "Public Safety", upvotes: 15, assignedWorker: "W-007" },
];

export const MOCK_WORKERS: Worker[] = [
  { id: "W-001", name: "Ravi Kumar", department: "Solid Waste Management", location: { lat: 60, lng: 65 }, status: "on-task", activeIssues: 2 },
  { id: "W-002", name: "Priya Sharma", department: "Parks & Gardens", location: { lat: 70, lng: 30 }, status: "on-task", activeIssues: 1 },
  { id: "W-003", name: "Arun Prakash", department: "Municipal Water Dept", location: { lat: 33, lng: 55 }, status: "on-task", activeIssues: 1 },
  { id: "W-004", name: "Lakshmi Devi", department: "Traffic Police", location: { lat: 47, lng: 48 }, status: "on-task", activeIssues: 1 },
  { id: "W-005", name: "Suresh Babu", department: "Drainage Board", location: { lat: 53, lng: 43 }, status: "on-task", activeIssues: 1 },
  { id: "W-006", name: "Deepa Rajan", department: "Municipal Water Dept", location: { lat: 42, lng: 75 }, status: "on-task", activeIssues: 1 },
  { id: "W-007", name: "Karthik V", department: "Public Safety", location: { lat: 63, lng: 42 }, status: "on-task", activeIssues: 1 },
  { id: "W-008", name: "Meena S", department: "Electrical Dept", location: { lat: 25, lng: 60 }, status: "available", activeIssues: 0 },
  { id: "W-009", name: "Rajesh M", department: "Roads & Bridges", location: { lat: 55, lng: 55 }, status: "available", activeIssues: 0 },
];

export const MOCK_DEPARTMENTS: Department[] = [
  { name: "Municipal Water Dept", resolvedCount: 156, avgResolutionTime: 18, satisfactionScore: 4.2, activeIssues: 8, trend: "up" },
  { name: "Roads & Bridges", resolvedCount: 89, avgResolutionTime: 48, satisfactionScore: 3.1, activeIssues: 12, trend: "down" },
  { name: "Solid Waste Management", resolvedCount: 234, avgResolutionTime: 12, satisfactionScore: 4.5, activeIssues: 5, trend: "up" },
  { name: "Electrical Dept", resolvedCount: 178, avgResolutionTime: 8, satisfactionScore: 4.7, activeIssues: 3, trend: "up" },
  { name: "Drainage Board", resolvedCount: 67, avgResolutionTime: 36, satisfactionScore: 3.4, activeIssues: 9, trend: "stable" },
  { name: "Parks & Gardens", resolvedCount: 45, avgResolutionTime: 24, satisfactionScore: 3.8, activeIssues: 4, trend: "up" },
  { name: "Traffic Police", resolvedCount: 203, avgResolutionTime: 6, satisfactionScore: 4.1, activeIssues: 7, trend: "stable" },
  { name: "Building Regulation", resolvedCount: 34, avgResolutionTime: 72, satisfactionScore: 2.9, activeIssues: 6, trend: "down" },
  { name: "Public Safety", resolvedCount: 112, avgResolutionTime: 14, satisfactionScore: 4.0, activeIssues: 4, trend: "up" },
];

// AI Classification simulation
export function classifyIssue(text: string): { category: string; location: string; priority: "low" | "medium" | "high" | "critical"; department: string; confidence: number } {
  const lower = text.toLowerCase();
  
  let category = "General";
  let department = "Public Safety";
  let priority: "low" | "medium" | "high" | "critical" = "medium";
  let confidence = 0.85;

  if (lower.includes("water") || lower.includes("leak") || lower.includes("pipe") || lower.includes("tap")) {
    category = "Water Supply"; department = "Municipal Water Dept"; confidence = 0.94;
  } else if (lower.includes("road") || lower.includes("pothole") || lower.includes("cave") || lower.includes("crack")) {
    category = "Road Damage"; department = "Roads & Bridges"; confidence = 0.91;
  } else if (lower.includes("garbage") || lower.includes("waste") || lower.includes("dump") || lower.includes("trash")) {
    category = "Garbage"; department = "Solid Waste Management"; confidence = 0.96;
  } else if (lower.includes("light") || lower.includes("lamp") || lower.includes("electric") || lower.includes("power")) {
    category = "Street Lights"; department = "Electrical Dept"; confidence = 0.89;
  } else if (lower.includes("drain") || lower.includes("sewage") || lower.includes("flood")) {
    category = "Drainage"; department = "Drainage Board"; confidence = 0.92;
  } else if (lower.includes("tree") || lower.includes("branch") || lower.includes("park")) {
    category = "Tree Fallen"; department = "Parks & Gardens"; confidence = 0.88;
  } else if (lower.includes("traffic") || lower.includes("signal") || lower.includes("accident")) {
    category = "Traffic Signal"; department = "Traffic Police"; confidence = 0.90;
  } else if (lower.includes("noise") || lower.includes("construction") || lower.includes("building")) {
    category = "Noise Complaint"; department = "Building Regulation"; confidence = 0.83;
  }

  // Priority detection
  if (lower.includes("days") || lower.includes("week") || lower.includes("dangerous") || lower.includes("accident") || lower.includes("emergency")) {
    priority = "high";
  }
  if (lower.includes("urgent") || lower.includes("critical") || lower.includes("life") || lower.includes("collapse")) {
    priority = "critical";
  }
  if (lower.includes("minor") || lower.includes("small") || lower.includes("slight")) {
    priority = "low";
  }

  // Location extraction (simple keyword matching)
  let location = "Unknown Area";
  const locationKeywords = ["near", "at", "on", "beside", "behind", "front of", "opposite"];
  for (const kw of locationKeywords) {
    const idx = lower.indexOf(kw);
    if (idx !== -1) {
      const after = text.substring(idx + kw.length).trim();
      const words = after.split(/[,.!?]/)[ 0].trim();
      if (words.length > 2) {
        location = words.charAt(0).toUpperCase() + words.slice(1);
        break;
      }
    }
  }

  return { category, location, priority, department, confidence };
}
