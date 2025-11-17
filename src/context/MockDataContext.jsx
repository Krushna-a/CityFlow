import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

const MockDataContext = createContext();

export function MockDataProvider({ children }) {
  // ============ USERS DATABASE ============
  const [users, setUsers] = useState([
    {
      id: "U-001",
      name: "Rajesh Kumar",
      email: "rajesh.kumar@email.com",
      password: "password123",
      role: "citizen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh",
      joinDate: "2024-01-15",
      reports: 5,
    },
    {
      id: "U-002",
      name: "Dr. Priya Sharma",
      email: "priya.sharma@email.com",
      password: "password123",
      role: "expert",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
      joinDate: "2023-06-20",
      expertise: "Urban Hydrology",
      approvals: 24,
    },
    {
      id: "U-003",
      name: "Govind Desai",
      email: "govind.desai@email.com",
      password: "password123",
      role: "government",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Govind",
      joinDate: "2023-08-10",
      department: "Municipal Corporation",
      region: "Eastern Zone",
    },
    {
      id: "U-004",
      name: "Amit Patel",
      email: "amit.patel@email.com",
      password: "password123",
      role: "field-worker",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit",
      joinDate: "2023-09-05",
      zone: "Central Zone",
      tasksCompleted: 12,
    },
    {
      id: "U-005",
      name: "Sarah Chen",
      email: "sarah.chen@email.com",
      password: "password123",
      role: "expert",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      joinDate: "2023-07-12",
      expertise: "AI/ML for Climate",
      approvals: 31,
    },
  ]);

  // ============ CLUSTERS DATABASE ============
  const [clusters, setClusters] = useState([
    {
      id: "C-4821",
      name: "Bandra Link Road Cluster",
      location: "Bandra Link Road, Mumbai",
      lat: 19.0596,
      lng: 72.8295,
      severity: "High",
      severityScore: 8.5,
      status: "Under Review",
      reports: 6,
      waterDepth: 2.4,
      riskScore: 0.92,
      rainfallMM: 85.5,
      affectedArea: 2500,
      lastUpdated: "2024-01-15T14:30:00Z",
      firstReported: "2024-01-10T08:00:00Z",
      solutions: ["S-001", "S-002"],
      cases: ["CASE-001"],
      images: [
        "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=500",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500",
      ],
      notes: "Major waterlogging in monsoon season. Drainage blocked due to debris.",
      drainageIssue: true,
      affectedPoIs: ["School", "Market", "Hospital"],
    },
    {
      id: "C-4798",
      name: "Saki Naka Junction",
      location: "Saki Naka, Mumbai",
      lat: 19.1136,
      lng: 72.8697,
      severity: "Medium",
      severityScore: 6.2,
      status: "Pending",
      reports: 4,
      waterDepth: 1.8,
      riskScore: 0.68,
      rainfallMM: 62.3,
      affectedArea: 1800,
      lastUpdated: "2024-01-14T11:15:00Z",
      firstReported: "2024-01-09T09:30:00Z",
      solutions: ["S-003"],
      cases: ["CASE-002"],
      images: [
        "https://images.unsplash.com/photo-1559330007-ff4e58539c15?w=500",
      ],
      notes: "Flooding in low-lying areas near junction. Temporary water accumulation.",
      drainageIssue: false,
      affectedPoIs: ["Residential", "Commercial"],
    },
    {
      id: "C-4755",
      name: "Andheri Subway",
      location: "Andheri East Subway, Mumbai",
      lat: 19.1136,
      lng: 72.8475,
      severity: "High",
      severityScore: 7.8,
      status: "In Progress",
      reports: 5,
      waterDepth: 2.1,
      riskScore: 0.85,
      rainfallMM: 78.9,
      affectedArea: 2200,
      lastUpdated: "2024-01-15T10:45:00Z",
      firstReported: "2024-01-08T14:00:00Z",
      solutions: ["S-004", "S-005"],
      cases: ["CASE-003"],
      images: [
        "https://images.unsplash.com/photo-1584707980336-c27d89a87dbd?w=500",
      ],
      notes: "Subway accumulating water during heavy rainfall. Poor ventilation.",
      drainageIssue: true,
      affectedPoIs: ["Transport Hub"],
    },
    {
      id: "C-4722",
      name: "Powai Lake Road",
      location: "Powai, Mumbai",
      lat: 19.1148,
      lng: 72.9042,
      severity: "Low",
      severityScore: 3.5,
      status: "Completed",
      reports: 2,
      waterDepth: 0.8,
      riskScore: 0.42,
      rainfallMM: 35.2,
      affectedArea: 900,
      lastUpdated: "2024-01-12T16:20:00Z",
      firstReported: "2024-01-06T10:00:00Z",
      solutions: ["S-006"],
      cases: ["CASE-004"],
      images: [],
      notes: "Minor flooding resolved with drainage cleanup.",
      drainageIssue: false,
      affectedPoIs: ["Park"],
    },
    {
      id: "C-4701",
      name: "Lower Parel Area",
      location: "Lower Parel, Mumbai",
      lat: 19.0176,
      lng: 72.8194,
      severity: "Critical",
      severityScore: 9.2,
      status: "Pending",
      reports: 8,
      waterDepth: 3.1,
      riskScore: 0.98,
      rainfallMM: 102.5,
      affectedArea: 3500,
      lastUpdated: "2024-01-15T15:00:00Z",
      firstReported: "2024-01-11T06:00:00Z",
      solutions: ["S-007", "S-008"],
      cases: ["CASE-005"],
      images: [
        "https://images.unsplash.com/photo-1518656306912-67b685b0b06e?w=500",
      ],
      notes: "Critical waterlogging. Major infrastructure damage. Immediate intervention required.",
      drainageIssue: true,
      affectedPoIs: ["Industrial", "Residential", "Commercial"],
    },
  ]);

  // ============ REPORTS DATABASE ============
  const [reports, setReports] = useState([
    {
      id: "R-001",
      userId: "U-001",
      clusterId: "C-4821",
      timestamp: "2024-01-15T14:20:00Z",
      location: "Bandra Link Road",
      lat: 19.0596,
      lng: 72.8295,
      severity: "High",
      waterDepth: 2.4,
      image:
        "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=500",
      description: "Heavy waterlogging blocking traffic. Unable to pass.",
      status: "Processed",
      aiAnalysis: {
        severity: "High",
        waterDepth: 2.4,
        confidence: 0.94,
        features: ["Standing Water", "Traffic Jam", "Road Damage"],
      },
    },
    {
      id: "R-002",
      userId: "U-001",
      clusterId: "C-4798",
      timestamp: "2024-01-14T11:10:00Z",
      location: "Saki Naka",
      lat: 19.1136,
      lng: 72.8697,
      severity: "Medium",
      waterDepth: 1.8,
      image:
        "https://images.unsplash.com/photo-1559330007-ff4e58539c15?w=500",
      description: "Water accumulation in low area.",
      status: "Processed",
      aiAnalysis: {
        severity: "Medium",
        waterDepth: 1.8,
        confidence: 0.87,
        features: ["Low Area Flooding", "Drainage Issue"],
      },
    },
  ]);

  // ============ SOLUTIONS DATABASE ============
  const [solutions, setSolutions] = useState([
    {
      id: "S-001",
      clusterId: "C-4821",
      title: "Emergency Drainage Enhancement",
      description: "Install temporary pumping units and clear drainage blockages",
      status: "Approved",
      severity: "High",
      estimatedCost: 150000,
      timeline: "5 days",
      resources: ["Pump Unit", "Labor Force", "Cleaning Equipment"],
      expertId: "U-002",
      createdAt: "2024-01-12T10:00:00Z",
      aiGenerated: true,
      confidence: 0.91,
      notes: "Expert review approved. Implementation starting soon.",
    },
    {
      id: "S-002",
      clusterId: "C-4821",
      title: "Permanent Drainage System Upgrade",
      description: "Redesign and upgrade the entire drainage system in the area",
      status: "Pending",
      severity: "High",
      estimatedCost: 850000,
      timeline: "45 days",
      resources: ["Civil Engineers", "Heavy Machinery", "Materials"],
      expertId: "U-005",
      createdAt: "2024-01-13T14:30:00Z",
      aiGenerated: true,
      confidence: 0.88,
      notes: "Long-term solution awaiting approval.",
    },
    {
      id: "S-003",
      clusterId: "C-4798",
      title: "Storm Drain Cleaning & Maintenance",
      description: "Regular maintenance and cleaning of storm drains",
      status: "In Progress",
      severity: "Medium",
      estimatedCost: 45000,
      timeline: "3 days",
      resources: ["Labor", "Cleaning Equipment"],
      expertId: "U-002",
      createdAt: "2024-01-14T09:00:00Z",
      aiGenerated: true,
      confidence: 0.85,
      notes: "Currently underway.",
    },
  ]);

  // ============ CASES DATABASE ============
  const [cases, setCases] = useState([
    {
      id: "CASE-001",
      clusterId: "C-4821",
      title: "Bandra Link Road Waterlogging",
      status: "Under Review",
      severity: "High",
      createdAt: "2024-01-10T08:00:00Z",
      assignedTo: "U-003",
      solutions: ["S-001", "S-002"],
      workDone: [
        {
          date: "2024-01-13T10:00:00Z",
          description: "Initial survey completed",
          image: null,
        },
        {
          date: "2024-01-14T14:00:00Z",
          description: "Temporary pumps installed",
          image:
            "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500",
        },
      ],
      priority: 1,
    },
    {
      id: "CASE-002",
      clusterId: "C-4798",
      title: "Saki Naka Junction Drainage",
      status: "Pending",
      severity: "Medium",
      createdAt: "2024-01-09T09:30:00Z",
      assignedTo: "U-003",
      solutions: ["S-003"],
      workDone: [],
      priority: 2,
    },
    {
      id: "CASE-003",
      clusterId: "C-4755",
      title: "Andheri Subway Waterlogging",
      status: "In Progress",
      severity: "High",
      createdAt: "2024-01-08T14:00:00Z",
      assignedTo: "U-003",
      solutions: ["S-004", "S-005"],
      workDone: [
        {
          date: "2024-01-12T08:30:00Z",
          description: "Subway inspection completed",
          image: null,
        },
      ],
      priority: 1,
    },
    {
      id: "CASE-004",
      clusterId: "C-4722",
      title: "Powai Lake Road Clearing",
      status: "Completed",
      severity: "Low",
      createdAt: "2024-01-06T10:00:00Z",
      assignedTo: "U-003",
      solutions: ["S-006"],
      workDone: [
        {
          date: "2024-01-12T14:00:00Z",
          description: "Drainage cleared and tested",
          image: null,
        },
      ],
      priority: 3,
    },
    {
      id: "CASE-005",
      clusterId: "C-4701",
      title: "Lower Parel Critical Intervention",
      status: "Pending",
      severity: "Critical",
      createdAt: "2024-01-11T06:00:00Z",
      assignedTo: "U-003",
      solutions: ["S-007", "S-008"],
      workDone: [],
      priority: 0,
    },
  ]);

  // ============ EXPERT TASKS DATABASE ============
  const [expertTasks, setExpertTasks] = useState([
    {
      id: "TASK-E-001",
      expertId: "U-002",
      clusterId: "C-4821",
      title: "Validate Cluster Data for C-4821",
      description: "Review AI predictions and validate cluster boundaries",
      status: "Completed",
      dueDate: "2024-01-14T23:59:00Z",
      completedAt: "2024-01-14T15:30:00Z",
      priority: "High",
    },
    {
      id: "TASK-E-002",
      expertId: "U-002",
      clusterId: "C-4755",
      title: "Design Solution for Andheri Subway",
      description: "Create drainage improvement plan",
      status: "In Progress",
      dueDate: "2024-01-16T23:59:00Z",
      completedAt: null,
      priority: "High",
    },
    {
      id: "TASK-E-003",
      expertId: "U-005",
      clusterId: "C-4701",
      title: "Emergency Response Plan - Lower Parel",
      description: "Develop immediate intervention strategy",
      status: "In Progress",
      dueDate: "2024-01-15T23:59:00Z",
      completedAt: null,
      priority: "Critical",
    },
  ]);

  // ============ FIELD WORKER TASKS DATABASE ============
  const [fieldTasks, setFieldTasks] = useState([
    {
      id: "TASK-F-001",
      workerId: "U-004",
      caseId: "CASE-001",
      title: "Install Temporary Pumps",
      description: "Install emergency pumping units at Bandra Link Road",
      status: "Completed",
      dueDate: "2024-01-14T18:00:00Z",
      completedAt: "2024-01-13T17:30:00Z",
      location: "Bandra Link Road",
      workPhotos: [
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500",
      ],
    },
    {
      id: "TASK-F-002",
      workerId: "U-004",
      caseId: "CASE-003",
      title: "Clear Subway Drainage",
      description: "Clean and remove blockages from Andheri subway drainage",
      status: "In Progress",
      dueDate: "2024-01-16T18:00:00Z",
      completedAt: null,
      location: "Andheri Subway",
      workPhotos: [],
    },
  ]);

  // ============ ACTION PLAN DATABASE ============
  const [actionPlans, setActionPlans] = useState([
    {
      id: "AP-001",
      caseId: "CASE-001",
      clusterId: "C-4821",
      title: "Bandra Link Road Waterlogging Resolution",
      status: "Active",
      createdAt: "2024-01-12T10:00:00Z",
      actions: [
        {
          order: 1,
          action: "Install temporary pumping units",
          status: "Completed",
          completedAt: "2024-01-13T17:30:00Z",
          assignedTo: "U-004",
        },
        {
          order: 2,
          action: "Clear drainage system",
          status: "In Progress",
          completedAt: null,
          assignedTo: "U-004",
        },
        {
          order: 3,
          action: "Permanent drainage upgrade",
          status: "Pending",
          completedAt: null,
          assignedTo: "U-002",
        },
      ],
    },
    {
      id: "AP-002",
      caseId: "CASE-005",
      clusterId: "C-4701",
      title: "Lower Parel Emergency Response",
      status: "Pending",
      createdAt: "2024-01-15T06:00:00Z",
      actions: [
        {
          order: 1,
          action: "Emergency evacuation preparation",
          status: "Pending",
          completedAt: null,
          assignedTo: "U-003",
        },
        {
          order: 2,
          action: "Deploy mobile pumping stations",
          status: "Pending",
          completedAt: null,
          assignedTo: "U-004",
        },
      ],
    },
  ]);

  // ============ ANALYTICS DATA ============
  const [analytics] = useState({
    totalReports: 47,
    totalClusters: 5,
    activeClusters: 4,
    highSeverityClusters: 2,
    averageResponseTime: "4.2 hours",
    resolutionRate: "68%",
    totalCitizens: 234,
    totalExperts: 12,
    totalGovWorkers: 45,
    monthlyRainfall: 385.5,
    avoidedDisasters: 8,
    lastUpdated: "2024-01-15T15:30:00Z",
    chartData: {
      daily: [
        { date: "Jan 10", reports: 8, clusters: 2 },
        { date: "Jan 11", reports: 12, clusters: 3 },
        { date: "Jan 12", reports: 6, clusters: 1 },
        { date: "Jan 13", reports: 15, clusters: 4 },
        { date: "Jan 14", reports: 10, clusters: 2 },
        { date: "Jan 15", reports: 14, clusters: 3 },
      ],
      severityBreakdown: [
        { name: "Critical", value: 1 },
        { name: "High", value: 2 },
        { name: "Medium", value: 1 },
        { name: "Low", value: 1 },
      ],
    },
  });

  // ============ CURRENT USER STATE ============
  const [currentUser, setCurrentUser] = useState(null);

  // Load persisted store on mount (if present)
  useEffect(() => {
    try {
      const raw = localStorage.getItem("mockData");
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (!parsed) return;

      if (parsed.users) setUsers(parsed.users);
      if (parsed.clusters) setClusters(parsed.clusters);
      if (parsed.reports) setReports(parsed.reports);
      if (parsed.solutions) setSolutions(parsed.solutions);
      if (parsed.cases) setCases(parsed.cases);
      if (parsed.expertTasks) setExpertTasks(parsed.expertTasks);
      if (parsed.fieldTasks) setFieldTasks(parsed.fieldTasks);
      if (parsed.actionPlans) setActionPlans(parsed.actionPlans);
      if (parsed.comments) setComments(parsed.comments);
      if (parsed.recommendations) setRecommendations(parsed.recommendations);
      if (parsed.analytics) ; // analytics considered read-only demo data
      if (parsed.currentUser) setCurrentUser(parsed.currentUser);
    } catch (err) {
      // if parse fails, ignore and continue with defaults
      console.warn("Failed to load mockData from localStorage:", err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ============ TOAST NOTIFICATIONS STATE ============
  const [notifications, setNotifications] = useState([]);

  // ============ AUTH FUNCTIONS ============
  const login = useCallback((email, password) => {
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      setCurrentUser({ ...user });
      return { success: true, user: { ...user } };
    }
    return { success: false, error: "Invalid email or password" };
  }, [users]);

  const logout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  const register = useCallback(
    (name, email, password, role = "citizen") => {
      const exists = users.find((u) => u.email === email);
      if (exists) {
        return { success: false, error: "Email already registered" };
      }

      const newUser = {
        id: `U-${String(users.length + 1).padStart(3, "0")}`,
        name,
        email,
        password,
        role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
        joinDate: new Date().toISOString().split("T")[0],
        reports: 0,
      };

      setUsers([...users, newUser]);
      setCurrentUser(newUser);
      return { success: true, user: newUser };
    },
    [users]
  );

  // ============ REPORT FUNCTIONS ============
  // simple haversine distance (meters)
  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (v) => (v * Math.PI) / 180;
    const R = 6371000; // metres
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const submitReport = useCallback(
    (reportData) => {
      // if caller requests force create, skip attaching
      if (reportData.forceCreate) {
        const lat = Number(reportData.lat ?? reportData.latitude ?? reportData.latlng?.lat);
        const lng = Number(reportData.lng ?? reportData.longitude ?? reportData.latlng?.lng ?? reportData.long);
        const newClusterId = `C-${Date.now()}`;
        const severity = reportData.aiAnalysis?.severity || "Medium";
        const newCluster = {
          id: newClusterId,
          name: reportData.caption ? `Reported: ${reportData.caption.slice(0, 40)}` : `Incident ${newClusterId}`,
          location: reportData.location || "Unknown",
          lat,
          lng,
          severity,
          severityScore: severity === "Critical" ? 9 : severity === "High" ? 7 : severity === "Medium" ? 5 : 3,
          status: "Pending",
          reports: 1,
          waterDepth: reportData.aiAnalysis?.waterDepth || 0,
          riskScore: 0.5,
          rainfallMM: null,
          affectedArea: null,
          lastUpdated: new Date().toISOString(),
          firstReported: new Date().toISOString(),
          solutions: [],
          cases: [],
          images: reportData.photo ? [reportData.photo] : [],
          notes: reportData.caption || "",
          drainageIssue: false,
          affectedPoIs: [],
        };

        const newReport = {
          id: `R-${String(reports.length + 1).padStart(3, "0")}`,
          userId: currentUser?.id || null,
          timestamp: new Date().toISOString(),
          status: "Processed",
          clusterId: newClusterId,
          lat,
          lng,
          ...reportData,
        };

        setClusters([...clusters, newCluster]);
        setReports([...reports, newReport]);

        return { type: "created", clusterId: newClusterId, report: newReport };
      }
      // Ensure numeric lat/lng
      const lat = Number(reportData.lat ?? reportData.latitude ?? reportData.latlng?.lat);
      const lng = Number(reportData.lng ?? reportData.longitude ?? reportData.latlng?.lng ?? reportData.long);

      // radius to consider same incident (meters)
      const RADIUS_METERS = 150;

      // find nearest cluster within radius
      let best = null;
      let bestDist = Infinity;
      clusters.forEach((c) => {
        if (typeof c.lat !== 'number' || typeof c.lng !== 'number') return;
        const d = haversineDistance(lat, lng, c.lat, c.lng);
        if (d < bestDist) {
          bestDist = d;
          best = c;
        }
      });

      if (best && bestDist <= RADIUS_METERS) {
        // attach to existing cluster
        const newReport = {
          id: `R-${String(reports.length + 1).padStart(3, "0")}`,
          userId: currentUser?.id || null,
          timestamp: new Date().toISOString(),
          status: "Processed",
          clusterId: best.id,
          lat,
          lng,
          ...reportData,
        };

        setReports([...reports, newReport]);

        // update cluster counts and metadata
        setClusters(
          clusters.map((c) =>
            c.id === best.id
              ? {
                  ...c,
                  reports: (c.reports || 0) + 1,
                  lastUpdated: new Date().toISOString(),
                  waterDepth: Math.max(c.waterDepth || 0, reportData.aiAnalysis?.waterDepth || 0),
                }
              : c
          )
        );

        return { type: "attached", clusterId: best.id, report: newReport };
      }

      // create new cluster (demo-friendly id)
      const newClusterId = `C-${Date.now()}`;
      const severity = reportData.aiAnalysis?.severity || "Medium";
      const newCluster = {
        id: newClusterId,
        name: reportData.caption ? `Reported: ${reportData.caption.slice(0, 40)}` : `Incident ${newClusterId}`,
        location: reportData.location || "Unknown",
        lat,
        lng,
        severity,
        severityScore: severity === "Critical" ? 9 : severity === "High" ? 7 : severity === "Medium" ? 5 : 3,
        status: "Pending",
        reports: 1,
        waterDepth: reportData.aiAnalysis?.waterDepth || 0,
        riskScore: 0.5,
        rainfallMM: null,
        affectedArea: null,
        lastUpdated: new Date().toISOString(),
        firstReported: new Date().toISOString(),
        solutions: [],
        cases: [],
        images: reportData.photo ? [reportData.photo] : [],
        notes: reportData.caption || "",
        drainageIssue: false,
        affectedPoIs: [],
      };

      const newReport = {
        id: `R-${String(reports.length + 1).padStart(3, "0")}`,
        userId: currentUser?.id || null,
        timestamp: new Date().toISOString(),
        status: "Processed",
        clusterId: newClusterId,
        lat,
        lng,
        ...reportData,
      };

      setClusters([...clusters, newCluster]);
      setReports([...reports, newReport]);

      return { type: "created", clusterId: newClusterId, report: newReport };
    },
    [reports, clusters, currentUser]
  );

  const updateClusterFromReport = useCallback(
    (clusterId, reportData) => {
      setClusters(
        clusters.map((c) => {
          if (c.id === clusterId) {
            return {
              ...c,
              reports: c.reports + 1,
              lastUpdated: new Date().toISOString(),
              waterDepth: Math.max(c.waterDepth, reportData.waterDepth || c.waterDepth),
            };
          }
          return c;
        })
      );
    },
    [clusters]
  );

  // ============ SOLUTION FUNCTIONS ============
  const createSolution = useCallback(
    (clusterId, solutionData) => {
      const newSolution = {
        id: `S-${String(solutions.length + 1).padStart(3, "0")}`,
        clusterId,
        createdAt: new Date().toISOString(),
        aiGenerated: true,
        confidence: 0.85 + Math.random() * 0.1,
        ...solutionData,
      };

      setSolutions([...solutions, newSolution]);
      return newSolution;
    },
    [solutions]
  );

  const updateSolutionStatus = useCallback(
    (solutionId, status) => {
      setSolutions(
        solutions.map((s) => (s.id === solutionId ? { ...s, status } : s))
      );
    },
    [solutions]
  );

  // ============ CASE FUNCTIONS ============
  const updateCaseStatus = useCallback(
    (caseId, status) => {
      setCases(
        cases.map((c) => (c.id === caseId ? { ...c, status } : c))
      );
    },
    [cases]
  );

  const addCaseWorkDone = useCallback(
    (caseId, workEntry) => {
      setCases(
        cases.map((c) => {
          if (c.id === caseId) {
            return {
              ...c,
              workDone: [
                ...c.workDone,
                {
                  ...workEntry,
                  date: new Date().toISOString(),
                },
              ],
            };
          }
          return c;
        })
      );
    },
    [cases]
  );

  // ============ CLUSTER FUNCTIONS ============
  const updateClusterNotes = useCallback(
    (clusterId, notes) => {
      setClusters(
        clusters.map((c) =>
          c.id === clusterId
            ? { ...c, notes, lastUpdated: new Date().toISOString() }
            : c
        )
      );
    },
    [clusters]
  );

  const updateClusterSeverity = useCallback(
    (clusterId, severity, severityScore) => {
      setClusters(
        clusters.map((c) =>
          c.id === clusterId
            ? { ...c, severity, severityScore, lastUpdated: new Date().toISOString() }
            : c
        )
      );
    },
    [clusters]
  );

  // ============ EXPERT TASK FUNCTIONS ============
  const completeExpertTask = useCallback(
    (taskId) => {
      setExpertTasks(
        expertTasks.map((t) =>
          t.id === taskId
            ? { ...t, status: "Completed", completedAt: new Date().toISOString() }
            : t
        )
      );
    },
    [expertTasks]
  );

  // ============ FIELD TASK FUNCTIONS ============
  const completeFieldTask = useCallback(
    (taskId, workPhotos = []) => {
      setFieldTasks(
        fieldTasks.map((t) =>
          t.id === taskId
            ? {
                ...t,
                status: "Completed",
                completedAt: new Date().toISOString(),
                workPhotos: [...(t.workPhotos || []), ...workPhotos],
              }
            : t
        )
      );
    },
    [fieldTasks]
  );

  const updateFieldTaskPhotos = useCallback(
    (taskId, photoUrl) => {
      setFieldTasks(
        fieldTasks.map((t) =>
          t.id === taskId
            ? {
                ...t,
                workPhotos: [...(t.workPhotos || []), photoUrl],
              }
            : t
        )
      );
    },
    [fieldTasks]
  );

  // ============ ACTION PLAN FUNCTIONS ============
  const updateActionPlanStatus = useCallback(
    (planId, actionOrder, status) => {
      setActionPlans(
        actionPlans.map((p) => {
          if (p.id === planId) {
            return {
              ...p,
              actions: p.actions.map((a) =>
                a.order === actionOrder
                  ? {
                      ...a,
                      status,
                      completedAt: status === "Completed" ? new Date().toISOString() : null,
                    }
                  : a
              ),
            };
          }
          return p;
        })
      );
    },
    [actionPlans]
  );

    // ============ COMMENTS (DISCUSSION THREAD) ============
    const [comments, setComments] = useState([]);

    const addComment = useCallback(
      (clusterId, userId, text, role = "citizen") => {
        const newComment = {
          id: `COM-${String(comments.length + 1).padStart(4, "0")}`,
          clusterId,
          userId,
          text,
          role,
          createdAt: new Date().toISOString(),
        };
        setComments([...comments, newComment]);
        return newComment;
      },
      [comments]
    );

    const getCommentsForCluster = useCallback(
      (clusterId) => comments.filter((c) => c.clusterId === clusterId),
      [comments]
    );

    // ============ RECOMMENDATIONS (RULE-BASED) ============
    const [recommendations, setRecommendations] = useState([]);

    const generateRecommendations = useCallback(
      (cluster) => {
        // simple rule-based suggestions based on severity and waterDepth
        const recs = [];
        const sev = (cluster.severity || "Medium").toLowerCase();
        const depth = Number(cluster.waterDepth || 0);

        if (depth >= 2 || sev === "critical" || sev === "high") {
          recs.push({ id: `REC-${Date.now()}-1`, clusterId: cluster.id, source: "rule", text: "Deploy temporary pumps and clear nearby drains.", priority: "High" });
          recs.push({ id: `REC-${Date.now()}-2`, clusterId: cluster.id, source: "rule", text: "Block access to the most affected road segments to prevent accidents.", priority: "Medium" });
        } else if (depth > 0.8) {
          recs.push({ id: `REC-${Date.now()}-3`, clusterId: cluster.id, source: "rule", text: "Schedule drain cleaning and monitor water level hourly.", priority: "Medium" });
        } else {
          recs.push({ id: `REC-${Date.now()}-4`, clusterId: cluster.id, source: "rule", text: "Monitor the area during rainfall and advise residents to avoid low-lying spots.", priority: "Low" });
        }

        // save into recommendations store and return
        setRecommendations((prev) => [...prev, ...recs]);
        return recs;
      },
      []
    );

    const getRecommendationsForCluster = useCallback(
      (clusterId) => recommendations.filter((r) => r.clusterId === clusterId),
      [recommendations]
    );

    // ============ MERGE CLUSTERS (ADMIN/EXPERT ACTION) ============
    const mergeClusters = useCallback(
      (sourceClusterId, targetClusterId) => {
        if (sourceClusterId === targetClusterId) return null;

        // move reports
        const movedReports = reports.map((r) =>
          r.clusterId === sourceClusterId ? { ...r, clusterId: targetClusterId } : r
        );

        // update cluster counts and remove source
        const source = clusters.find((c) => c.id === sourceClusterId);
        const target = clusters.find((c) => c.id === targetClusterId);
        if (!source || !target) return null;

        const targetUpdated = {
          ...target,
          reports: (target.reports || 0) + (source.reports || 0),
          lastUpdated: new Date().toISOString(),
          waterDepth: Math.max(target.waterDepth || 0, source.waterDepth || 0),
        };

        setReports(movedReports);
        setClusters(clusters.filter((c) => c.id !== sourceClusterId).map((c) => (c.id === targetClusterId ? targetUpdated : c)));

        return { success: true, target: targetUpdated };
      },
      [reports, clusters]
    );

    // ============ UTILS: FIND NEAREST CLUSTER ============
    const findNearestCluster = useCallback(
      (lat, lng, maxDistanceMeters = 150) => {
        let best = null;
        let bestDist = Infinity;
        clusters.forEach((c) => {
          if (typeof c.lat !== 'number' || typeof c.lng !== 'number') return;
          const d = haversineDistance(lat, lng, c.lat, c.lng);
          if (d < bestDist) {
            bestDist = d;
            best = c;
          }
        });
        if (best && bestDist <= maxDistanceMeters) return { cluster: best, distance: Math.round(bestDist) };
        return null;
      },
      [clusters]
    );

  // ============ GET FUNCTIONS ============
  const getClusterById = useCallback(
    (id) => clusters.find((c) => c.id === id),
    [clusters]
  );

  const getCaseById = useCallback((id) => cases.find((c) => c.id === id), [cases]);

  const getSolutionById = useCallback(
    (id) => solutions.find((s) => s.id === id),
    [solutions]
  );

  const getExpertTasks = useCallback(
    (expertId) => expertTasks.filter((t) => t.expertId === expertId),
    [expertTasks]
  );

  const getFieldTasks = useCallback(
    (workerId) => fieldTasks.filter((t) => t.workerId === workerId),
    [fieldTasks]
  );

  const getUserById = useCallback(
    (id) => users.find((u) => u.id === id),
    [users]
  );

  const getClusterReportIds = useCallback(
    (clusterId) => reports.filter((r) => r.clusterId === clusterId).map((r) => r.id),
    [reports]
  );

  const getReportById = useCallback(
    (id) => reports.find((r) => r.id === id),
    [reports]
  );

  const value = {
    // State
    currentUser,
    users,
    clusters,
    reports,
    solutions,
    cases,
    expertTasks,
    fieldTasks,
    actionPlans,
    analytics,

    // Auth
    login,
    logout,
    register,

    // Reports
    submitReport,
    findNearestCluster,
    // Comments
    addComment,
    getCommentsForCluster,
    // Recommendations
    generateRecommendations,
    getRecommendationsForCluster,
    // Merge
    mergeClusters,
    updateClusterFromReport,
    getReportById,
    getClusterReportIds,

    // Solutions
    createSolution,
    updateSolutionStatus,

    // Cases
    updateCaseStatus,
    addCaseWorkDone,

    // Clusters
    updateClusterNotes,
    updateClusterSeverity,
    getClusterById,

    // Expert Tasks
    completeExpertTask,
    getExpertTasks,

    // Field Tasks
    completeFieldTask,
    updateFieldTaskPhotos,
    getFieldTasks,

    // Action Plans
    updateActionPlanStatus,

    // Gets
    getCaseById,
    getSolutionById,
    getUserById,
  };

  // Persist relevant parts of the store to localStorage whenever they change
  useEffect(() => {
    try {
      const toSave = {
        users,
        clusters,
        reports,
        solutions,
        cases,
        expertTasks,
        fieldTasks,
        actionPlans,
        comments,
        recommendations,
        // don't overwrite analytics; keep as demo seed in code
        currentUser,
      };
      localStorage.setItem("mockData", JSON.stringify(toSave));
    } catch (err) {
      console.warn("Failed to save mockData to localStorage:", err);
    }
  }, [users, clusters, reports, solutions, cases, expertTasks, fieldTasks, actionPlans, currentUser]);

  return (
    <MockDataContext.Provider value={value}>
      {children}
    </MockDataContext.Provider>
  );
}

export function useMockData() {
  const context = useContext(MockDataContext);
  if (!context) {
    throw new Error("useMockData must be used within MockDataProvider");
  }
  return context;
}
