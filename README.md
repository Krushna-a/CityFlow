# 🌊 CityFlow — Flood Response Platform

A complete proof-of-concept for an intelligent flood incident response platform that connects citizens, experts, and government authorities in real-time. CityFlow demonstrates incident deduplication, collaborative discussion threads, AI-powered recommendations, and live case tracking.

**Status**: ✅ MVP Complete with localStorage demo
**Tech Stack**: React + Vite + Leaflet + Tailwind CSS
**Data**: Frontend-only (localStorage persistence)

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation
```bash
cd k:\flood-copy-final
npm install
npm run dev
```

Open browser at `http://localhost:5173`

---

## 📖 Documentation & Demo Guides

### For Demo Recording & Presentation
1. **[VIDEO_SCRIPT.md](./VIDEO_SCRIPT.md)** — Complete 10-minute demo script with timing
   - Problem statement & solution overview
   - Step-by-step walkthrough with voiceover
   - Key takeaways & roadmap
   - Production notes & variations

2. **[STORYBOARD.md](./STORYBOARD.md)** — Visual scene-by-scene breakdown
   - Layout mockups for each scene
   - Animation descriptions
   - Timing breakdown
   - Production specifications (colors, typography, etc.)

3. **[RECORDING_GUIDE.md](./RECORDING_GUIDE.md)** — Technical recording instructions
   - Pre-recording checklist
   - Scene-by-scene recording instructions
   - Audio & voiceover tips
   - Tool recommendations
   - File organization

### For Using the Demo
1. **[DEMO_FLOW.md](./DEMO_FLOW.md)** — Interactive demo walkthrough
   - User credentials
   - Complete workflow steps
   - Feature explanations
   - Testing tips
   - localStorage reference

---

## 🌊 Complete Citizen-to-Government Incident Response Workflow

### **The Problem**
When a city experiences heavy waterlogging or flooding, hundreds of citizens report scattered incidents. Each report creates confusion, delays, and duplicated efforts. Critical information gets lost across multiple channels.

### **Our Solution: One Unified Platform**

#### **Phase 1️⃣ — Citizens Report**
- 📱 Citizen witnesses waterlogging and immediately uploads photos/videos
- 🤖 AI analyzes image for severity, water depth, and risk factors
- ✅ Report submitted with GPS location

#### **Phase 2️⃣ — Automatic Clustering**
- 🎯 System automatically detects nearby incidents within 150m (Haversine distance)
- 🔗 Multiple reports from same location merged into **ONE unified cluster**
- ✨ Instead of 100+ scattered reports → 5-10 organized incident clusters

#### **Phase 3️⃣ — Expert Discussion & Validation**
- 💬 **Discussion Hub** opens for citizens, experts, and government officials
- 🏗️ Experts (civil engineers, hydrologists, drainage specialists) join and:
  - Review citizen photos and updates
  - Add technical insights and analysis
  - Suggest possible causes (drain blockage, slope issues, overflow capacity)
  - Recommend practical solutions (drain redesign, soak pits, trenching, outflow upgrades)
  - Validate cluster data accuracy
- 👥 Citizens continue sharing ground-reality observations
- ✓ Consensus builds around root causes and solutions

#### **Phase 4️⃣ — Government Action & Assignment**
- 🏛️ Government authorities review:
  - AI insights + cluster metrics
  - Expert recommendations
  - Citizen discussion threads
- 📋 Government creates formal **Case** and:
  - Assigns priority level (Pending → Under Review → Approved → In Progress → Completed)
  - Deploys field workers
  - Tracks work progress
- 👷 Field workers get tasks with GPS location, photos, and expert guidance

#### **Phase 5️⃣ — Live Status Updates**
- 📡 Every status change (Under Review → Approved, etc.) shared instantly with:
  - Citizens (transparency on action being taken)
  - Experts (monitoring implementation quality)
  - Government teams (coordination)
- 📸 Field workers upload work photos + progress updates
- ✅ Citizens see incident being resolved in real-time

### **Complete Communication Loop**
```
Citizen Reports 
    ↓
Automatic Clustering (150m radius dedup)
    ↓
Expert Discussion & Validation
    ↓
Government Case Creation & Prioritization
    ↓
Field Worker Assignment & Tracking
    ↓
Live Status Updates to All Stakeholders
    ↓
Incident Resolved ✓
```

### **Why This Works**
✅ **Eliminates Duplicates** — 100+ reports → 5-10 organized clusters  
✅ **Crowdsourced Intelligence** — Citizens + Experts + Government in one thread  
✅ **Expert Validation** — No blind spots, root causes identified  
✅ **Accountability** — Every step tracked and visible  
✅ **Fast Response** — From report to field worker in minutes, not weeks  
✅ **Transparency** — Citizens see their report driving action  
✅ **Data-Driven Decisions** — Metrics guide prioritization

---

## 🎯 Platform Features

### 1. **Automatic Incident Clustering** 🎯
- Haversine distance-based deduplication (150m radius)
- "Join or Create" modal for user decision
- Prevents duplicate reporting
- Reduces 100+ reports into 5-10 organized clusters

### 2. **Unified Discussion Hub** 💬
- Citizens, experts, and government in one thread
- Role-based badges (Citizen/Expert/Government/Field Worker)
- Real-time insights and ground updates
- Persistent comment history with timestamps

### 3. **Expert Validation** 🏗️
- Experts analyze cluster data and photos
- Technical recommendations based on severity and water depth
- Identifies root causes (drain blockage, slope issues, etc.)
- Suggests solutions (pumping, drain redesign, trenching, etc.)
- Priority-based recommendations (High/Medium/Low)

### 4. **Government Case Management** 🏛️
- Formal case creation linked to clusters
- Status workflow: Pending → Under Review → Approved → In Progress → Completed
- Priority assignment (Critical/High/Medium)
- Field worker assignment and task management
- Real-time status updates to all stakeholders

### 5. **Linked Citizen Reports** 👥
- All individual reports visible in one place
- Each report shows: ID, timestamp, severity, description, photos
- Transparent contribution tracking
- Ground-truth validation from multiple sources

### 6. **Field Work Tracking** 👷
- Field worker GPS assignment
- Photo documentation of work progress
- Task completion tracking
- Real-time updates visible to citizens and experts
- Before/after comparison

### 7. **Smart Map Interface** 📍
- Color-coded incident severity (Red/Yellow/Green)
- Interactive pins with incident summary
- Click-to-detail navigation
- Cluster location with GPS coordinates
- Zoom levels for city-wide or neighborhood view

### 8. **AI-Powered Insights** 🤖
- Image analysis: severity, water depth, confidence
- Rule-based recommendation engine
- Automatic severity scoring
- Risk assessment metrics

---

| Name | Email | Password | Role |
|------|-------|----------|------|
| Rajesh Kumar | rajesh.kumar@email.com | password123 | Citizen |
| Dr. Priya Sharma | priya.sharma@email.com | password123 | Expert |
| Govind Desai | govind.desai@email.com | password123 | Government |
| Amit Patel | amit.patel@email.com | password123 | Field Worker |

---

## 📱 App Structure

### Pages
- **Map.jsx** — Real-time incident map with pins
- **Report.jsx** — Citizen reporting interface with AI analysis
- **ClusterDetails.jsx** — Incident detail view with discussion, recommendations, linked reports
- **Login.jsx** / **Register.jsx** — Authentication
- **Community.jsx** — Collaboration space
- **ExpertDashboard.jsx** — Expert view & task management

### Components
- **JoinOrCreateModal.jsx** — Beautiful prompt for deduplication decision
- **Navbar.jsx** / **Footer.jsx** — Layout
- **Various pages** — Full app ecosystem

### Context
- **MockDataContext.jsx** — All state management & localStorage persistence
  - Functions: `submitReport`, `findNearestCluster`, `addComment`, `generateRecommendations`, `mergeClusters`, etc.
  - Data: users, clusters, reports, comments, recommendations, solutions, cases, tasks

---

## 🔄 Data Flow

```
User Reports Incident
    ↓
Check for Nearby Cluster (150m)
    ↓
Found? → Show Join/Create Modal
    ↓
User Chooses → Attach OR Create New
    ↓
Navigate to Cluster Detail
    ↓
User Can:
  • Read/Add Comments (Discussion)
  • View Linked Reports
  • Generate Recommendations
  • Merge (if admin)
```

---

## 💾 LocalStorage Structure

All demo data stored under `mockData` key:

```javascript
{
  "users": [...],
  "clusters": [...],
  "reports": [...],
  "comments": [...],
  "recommendations": [...],
  "solutions": [...],
  "cases": [...],
  "expertTasks": [...],
  "fieldTasks": [...],
  "actionPlans": [...],
  "currentUser": {...}
}
```

**To reset demo**: `localStorage.clear()` in browser console

---

## 🎮 Demo Scenarios - Complete Workflow

### **Scenario 1: Citizen Detects Waterlogging**
1. ✅ Rajesh Kumar (Citizen) witnesses heavy waterlogging on Bandra Link Road
2. 📱 Opens app → Report page → Uploads photo
3. 🤖 AI analyzes: "High severity, 2.4m water depth, 85% confidence"
4. 📍 Submits with GPS coordinates
5. ⚡ System detects 5 other reports within 150m → **Shows "Join existing cluster" modal**
6. ✅ Rajesh clicks "Join" → Report attached to cluster
7. 🎯 Navigates to Cluster Detail page

### **Scenario 2: Experts Validate & Discuss**
1. 🔍 Dr. Priya Sharma (Expert - Hydrology) checks cluster
2. 💬 Scrolls to "Discussion Hub"
3. 💡 Posts: *"This is classic drain blockage. The 2.4m depth combined with slope indicates northern outlet is clogged with debris. Need immediate pump deployment."*
4. 🏗️ Sarah Chen (Expert - Civil Engineer) adds: *"Recommend temporary pumping + permanent drain redesign. Cost est: ₹8.5L, Timeline: 45 days."*
5. 👥 Citizens respond with ground updates: *"Traffic stuck for 3 hours, nearby school closed, hospital access blocked"*
6. ✅ Experts reach consensus on root cause and solutions

### **Scenario 3: Government Reviews & Takes Action**
1. 🏛️ Govind Desai (Government Official) opens cluster
2. 📊 Reviews: citizen photos + expert analysis + linked reports
3. 📋 Creates formal "Case: Bandra Link Road Waterlogging"
4. ⚡ Updates status: **Pending → Under Review → Approved**
5. 👷 Assigns field worker: Amit Patel (Field Worker)
6. 📍 Provides task: "Install temporary pumps by EOD"
7. 📡 All stakeholders notified of status change

### **Scenario 4: Field Worker Updates Progress**
1. 👷 Amit Patel receives task with:
   - 📸 Expert photos showing clog location
   - 💡 Expert recommendations
   - 📍 GPS coordinates
2. ✅ Updates status: **Under Review → In Progress**
3. 📸 Takes photo of pumps installed
4. 📝 Posts update: *"Temporary pumps deployed. Water level dropping. Permanent drain work starts tomorrow."*
5. ✓ Completes task

### **Scenario 5: Citizens See Resolution**
1. 👁️ Rajesh gets notification: **"Status: Work in Progress"**
2. 📸 Views field worker photos showing pumps and progress
3. 💬 Sees expert notes on permanent solution timeline
4. ✅ Gets alert: **"Status: Completed"** with before/after photos
5. ⭐ Citizen confidence in system increases, more people report next time

### **Scenario 6: Government Merge Two Clusters**
1. 🏛️ Govind notices two nearby clusters from same event
2. 🔀 Merges smaller cluster into larger one
3. 📊 Reports, comments, recommendations all consolidate
4. ✅ Cleaner view, better tracking of unified incident response

---

## 🛠️ Project Architecture

### Frontend Tech
- **React** — UI framework
- **Vite** — Build tool (fast dev server, optimized production)
- **Leaflet** — Interactive maps
- **Tailwind CSS** — Styling
- **React Router** — Navigation
- **React Hot Toast** — Notifications
- **DiceBear API** — User avatars

### State Management
- **React Context** (useMockData hook)
- **localStorage** — Persistence

### Key Algorithms
- **Haversine Distance** — Geographic proximity for deduplication (150m radius)
- **Rule-Based Recommendations** — Severity + water depth → action suggestions

---

## 🚀 Roadmap

### Phase 1 (Current - MVP)
- ✅ Frontend with localStorage
- ✅ Deduplication logic (Haversine)
- ✅ Discussion threads
- ✅ Rule-based recommendations
- ✅ Join vs Create modal
- ✅ Linked reports aggregation
- ✅ Admin merge feature

### Phase 2 (6-12 months)
- 🔄 Backend infrastructure (Node.js + MongoDB)
- 🔄 Real authentication (JWT/OAuth)
- 🔄 Mobile apps (iOS/Android)
- 🔄 Advanced AI (Computer vision for image analysis)
- 🔄 Real-time WebSocket updates

### Phase 3 (12-24 months)
- 🔄 Predictive analytics (flood hotspot prediction)
- 🔄 IoT integration (drain/water sensors)
- 🔄 Municipal system integration
- 🔄 Multi-city deployment

### Phase 4 (2+ years)
- 🔄 Blockchain for transparency
- 🔄 Gamification (citizen engagement rewards)
- 🔄 International expansion
- 🔄 Climate & weather API integration

---

## 📊 Key Metrics (Expected)

- ⏱️ **Response Time**: Reduced by ~50%
- 💰 **Resource Optimization**: 30-40% cost savings
- 👥 **Citizen Engagement**: +60% participation
- 📈 **Data Quality**: +80% accuracy (with deduplication)
- 🎯 **Incident Resolution**: 2-3x faster

---

## 🔐 Security & Privacy (Production Notes)

- ⚠️ **Current MVP**: No real authentication (demo-level only)
- Location data is shown precisely (production: may need privacy controls)
- All data in browser localStorage (not encrypted in demo)
- Before production: Implement JWT auth, data encryption, role-based access control

---

## 🐛 Known Limitations (Frontend Demo)

- ❌ No real backend database
- ❌ AI analysis is mocked (random generation, not real ML)
- ❌ No image processing or computer vision
- ❌ No real-time sync between users
- ❌ No authentication enforcement
- ❌ Merge is immediate (no approval workflow)
- ❌ Recommendations are rule-based only (no LLM integration)

---

## 📁 Project Structure

```
flood-copy-final/
├── src/
│   ├── pages/
│   │   ├── Report.jsx          # Report form with join/create modal
│   │   ├── ClusterDetails.jsx  # Incident detail, discussion, recommendations
│   │   ├── Map.jsx             # Map view
│   │   ├── Login.jsx
│   │   ├── Community.jsx
│   │   └── (other pages...)
│   ├── components/
│   │   ├── JoinOrCreateModal.jsx  # Beautiful join/create decision modal
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── community/
│   ├── context/
│   │   └── MockDataContext.jsx    # All state & localStorage
│   ├── App.jsx
│   └── main.jsx
├── public/
├── server/
│   └── ws-demo.js              # WebSocket demo (optional)
├── DEMO_FLOW.md               # Interactive demo guide
├── VIDEO_SCRIPT.md            # 10-min demo video script
├── STORYBOARD.md              # Visual scene breakdown
├── RECORDING_GUIDE.md         # Recording instructions
├── vite.config.js
├── package.json
└── README.md (this file)
```

---

## 🎬 Creating a Demo Video

### Quick Start
1. Read **[VIDEO_SCRIPT.md](./VIDEO_SCRIPT.md)** (10-minute script with timing)
2. Review **[STORYBOARD.md](./STORYBOARD.md)** (visual breakdown)
3. Follow **[RECORDING_GUIDE.md](./RECORDING_GUIDE.md)** (technical instructions)

### Expected Duration
- Recording: 2-3 hours
- Editing: 3-4 hours
- **Total**: 5-7 hours for a polished 10-minute video

### Tools (Recommended)
- Screen Recording: OBS Studio (free), ScreenFlow (Mac), Camtasia (paid)
- Editing: DaVinci Resolve (free), Premiere Pro (paid)
- Audio: Audacity (free)
- Thumbnail: Canva (free)

---

## 🧪 Testing the Demo

### Test Deduplication
1. Go to Report page
2. GPS near Bandra cluster (19.0596, 72.8295)
3. Upload image, run AI, submit
4. Modal appears → Click "Join"
5. Verify report attached to cluster

### Test Discussion
1. On cluster detail page
2. Add comment and post
3. Refresh page (F5)
4. Comment persists (localStorage)

### Test Recommendations
1. Click "Generate Recommendations"
2. Verify suggestions appear based on severity
3. Refresh page
4. Recommendations persist

### Test Merge
1. On cluster detail
2. Admin Actions → Select target
3. Click Merge
4. Verify reports moved to target cluster

---

## 📞 Support & Contact

### Issues or Questions
- Check browser console for errors (F12 → Console)
- Clear localStorage if data corrupted: `localStorage.clear()`
- Restart dev server: `npm run dev`

### Repository
- GitHub: [Link to repo]
- Issues: [Link to issues page]
- Discussions: [Link to discussions]

---

## 📄 License

This project is provided as a proof-of-concept for demonstration and educational purposes.

---

## 🙏 Acknowledgments

- Leaflet for mapping
- Tailwind CSS for styling
- React community for ecosystem
- OpenStreetMap for map data

---

## 🌟 Next Steps

1. **For Demo Video**: Follow STORYBOARD.md + RECORDING_GUIDE.md
2. **For Backend**: Plan Node.js + MongoDB integration
3. **For Mobile**: Design React Native version
4. **For AI**: Integrate real ML models (image analysis, NLP)
5. **For Deployment**: Cloud infrastructure (AWS/GCP/Azure)

---

**Built with ❤️ for smarter, safer cities.**

