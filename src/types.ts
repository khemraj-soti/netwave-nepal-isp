export interface FiberPlan {
  id: string;
  name: string;
  speedMbps: number;
  badge?: string;
  popular?: boolean;
  category: 'home' | 'combo' | 'sme' | 'enterprise';
  prices: {
    monthly: number;
    quarterly: number; // 3 months
    semiAnnual: number; // 6 months
    annual: number; // 12 months
  };
  features: string[];
  specs: {
    uploadSpeed: string;
    downloadSpeed: string;
    routerType: string;
    fupLimit: string;
    ottApps?: string[];
    tvChannels?: number;
    staticIp?: boolean;
    sla?: string;
  };
  targetAudience: string;
}

export interface TVChannel {
  id: string;
  name: string;
  category: 'Nepali' | 'Sports' | 'Movies' | 'Entertainment' | 'News' | 'Kids' | 'Infotainment' | 'Music';
  resolution: 'HD' | '4K' | 'SD';
  logoText: string;
  popular?: boolean;
  catchUpAvailable: boolean;
  language: string;
}

export interface CoverageRegion {
  id: string;
  province: string;
  district: string;
  city: string;
  status: 'active' | 'expanding' | 'planned';
  coveragePercentage: number;
  fiberNodes: number;
  availableSpeeds: string;
  areas: string[];
}

export interface BranchInfo {
  id: string;
  city: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  isHeadOffice?: boolean;
  coordinates: { lat: number; lng: number };
}

export interface BillRecord {
  id: string;
  customerId: string;
  customerName: string;
  username: string;
  planName: string;
  speedMbps: number;
  billingPeriod: string;
  amount: number;
  vatAmount: number;
  totalAmount: number;
  status: 'paid' | 'unpaid' | 'overdue';
  dueDate: string;
  expiryDate: string;
  invoiceNumber: string;
}

export interface SupportTicket {
  id: string;
  customerId: string;
  customerName: string;
  phone: string;
  subject: string;
  category: 'Slow Speed' | 'No Internet / Red LOS' | 'WiFi Issue' | 'Billing & Recharge' | 'NetWave TV Issue' | 'Shift / Relocation';
  priority: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Resolved';
  createdAt: string;
  lastUpdated: string;
  description: string;
  technicianAssigned?: string;
}

export interface SpeedTestResult {
  id: string;
  timestamp: string;
  server: string;
  pingMs: number;
  jitterMs: number;
  downloadMbps: number;
  uploadMbps: number;
  packetLoss: number;
  isp: string;
}
