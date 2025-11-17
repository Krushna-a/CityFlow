# 🌊 CityFlow — Flood Response Platform - Demo Flow Guide

## Overview
This is a **frontend-only prototype** showcasing an incident deduplication, discussion, and recommendation system for flood management. All data is stored in localStorage for demo purposes.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation & Run
```bash
cd k:\flood-copy-final

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

Open your browser at `http://localhost:5173`

---

## 👤 Demo User Accounts

Use these credentials to log in:

| Name | Email | Password | Role |
|------|-------|----------|------|
| Rajesh Kumar | rajesh.kumar@email.com | password123 | Citizen |
| Dr. Priya Sharma | priya.sharma@email.com | password123 | Expert |
| Govind Desai | govind.desai@email.com | password123 | Government |
| Amit Patel | amit.patel@email.com | password123 | Field Worker |

---

## 📋 Complete Demo Flow

### Step 1: Login
1. Click **"Login"** on the home page
2. Enter credentials (e.g., `rajesh.kumar@email.com` / `password123`)
3. Click **"Sign In"**
4. You're now logged in as a citizen

### Step 2: View the Map
1. Click **"Map"** in the navigation
2. See existing flood incidents as colored pins:
   - 🔴 **Red** = High/Critical severity
   - 🟠 **Orange** = Medium severity
   - 🟢 **Green** = Low severity
3. Click on any pin to see a popup with:
   - Incident name
   - Location
   - Severity & report count
   - **"View Details"** button

### Step 3: Report a New Incident or Join Existing

#### Option A: Create a New Report (Near Existing Incident)
1. Click **"Report Incident"** button (bottom-right on map)
2. On the Report page:
   - **Upload Image**: Click the upload box and select an image
   - **GPS Location**: Auto-detected (you can see lat/lng)
   - **Timestamp**: Auto-filled
   - **Run AI Analysis**: Click "🤖 Run AI Analysis"
     - Simulates AI detection (1.5s)
     - Shows severity, water depth, confidence, detected features
   - **Add Notes**: Write optional description
3. Click **"Submit Report"**

#### Join vs. Create Modal
- If a nearby incident exists **within 150m**:
  - A **beautiful modal** appears showing:
    - The nearby cluster name & location
    - Severity badge & report count
    - Water depth & risk score
  - **Options**:
    - ✓ **Join This Discussion** — Your report attaches to the existing incident
    - **+ Create New Incident** — Ignore nearby incident, create a new one
    - **Cancel** — Go back to form

- If **NO nearby incident**:
  - Report is immediately submitted as a new incident
  - Automatic navigation to the cluster detail page

### Step 4: View Incident Details

After submitting a report, you're navigated to the **Cluster Details** page:

#### Main Sections (Left Column)

**📍 Cluster Location**
- Interactive map showing exact incident location
- Can zoom in/out

**📸 Citizen Media**
- Gallery of all images linked to this incident

**📊 Cluster Metrics**
- Total reports count
- Risk score percentage
- Water depth in meters
- Severity level

**💬 Discussion Thread**
- View all comments from citizens & experts
- **Add a Comment**: Type in the textarea and click "Post"
- Timestamps show when each comment was posted
- Shows commenter's name and role

**📋 Linked Reports**
- List all individual reports attached to this incident
- Shows:
  - Report ID & timestamp
  - Severity badge
  - Report description/caption
  - Photo thumbnail (if available)
- Click to see full details (expandable)

**💡 Recommendations**
- Initially empty ("No recommendations yet")
- Click **"Generate Recommendations"** to create AI-generated suggestions
- Recommendations are based on:
  - Water depth
  - Severity level
  - Pre-defined rule set
- Each recommendation shows:
  - Priority (High/Medium/Low)
  - Suggested action
  - Source (AI/rule-based)

#### Quick Actions (Right Column)

**"Add Report"** — Submit another report for the same location

**"Expert Review"** — Navigate to expert dashboard (links available)

#### Admin Actions (Right Column)

**"Merge Clusters"** (demo feature)
- Select another cluster from the dropdown
- Click "Merge" to combine two incidents
- Merges all reports, updates counts, removes source cluster
- Example use case: If two reports were accidentally created for the same location, admins can merge them

---

## 🎯 Key Features Demonstrated

### 1. **Incident Deduplication** (Haversine Distance)
- Reports within 150m of an existing incident trigger a "join or create" prompt
- Uses real geographic distance calculation
- Prevents duplicate incidents for the same problem

### 2. **Discussion Thread**
- Citizens & experts can comment on incidents
- Comments persist in localStorage
- Real-time feedback loop for situational awareness

### 3. **Rule-Based Recommendations**
- AI suggests actionable solutions based on severity & water depth:
  - **Critical/High + deep water**: Deploy pumps, block roads
  - **Medium depth**: Schedule drain cleaning
  - **Low**: Monitor and advise residents

### 4. **Linked Reports**
- Each incident aggregates multiple citizen reports
- Shows which reports belong to the same geographic cluster
- Displays report-specific severity, images, timestamps

### 5. **Admin Merge**
- Combine two similar incidents if they were mistakenly created separately
- Preserves all reports and updates aggregate counts

### 6. **Persistent Storage**
- All data (clusters, reports, comments, recommendations) saved to localStorage
- Survives page refreshes
- **To reset demo**: Open browser DevTools → Application → LocalStorage → Clear all

---

## 📱 Workflow Examples

### Example 1: Multiple Citizens Report Same Location
1. **User A** reports flooding at Bandra Link Road
   - Creates new incident C-001
2. **User B** (nearby) reports the same location
   - Gets prompted: "Join Cluster C-001 or Create New?"
   - Chooses "Join This Discussion"
   - Their report attaches to C-001
   - C-001 now shows `2 reports`
3. In Cluster Details → "Linked Reports"
   - See both Report 1 (User A) and Report 2 (User B)
4. Both users comment in the discussion thread
5. Experts see aggregated incident with richer context

### Example 2: Expert Validation & Merge
1. **Expert (Dr. Priya)** logs in
2. Navigates to existing incident
3. Views discussion & linked reports
4. Generates recommendations
5. If discovers this is duplicate of another incident:
   - Goes to "Admin Actions"
   - Selects target cluster
   - Clicks "Merge"
   - All reports consolidate into target cluster

### Example 3: Timeline of Events
- **T=0**: Citizen reports waterlogging (creates C-001)
- **T+5min**: Second citizen reports nearby (joins C-001)
- **T+15min**: Third citizen comments asking for help
- **T+20min**: Expert generates recommendations
- **T+25min**: Recommendation suggests deploying pumps
- **T+30min**: Field worker updates cluster with action taken

---

## 🧪 Testing Tips

### Test Join/Create Modal
1. Go to Report page
2. GPS will be near one of the existing clusters (Bandra, Saki Naka, Andheri, Powai, Lower Parel)
3. Submit report
4. Modal appears → Test both "Join" and "Create New" paths

### Test Discussion
1. On a cluster detail page
2. Type a comment and post
3. Refresh page (F5)
4. Comment still appears (localStorage persisted)

### Test Recommendations
1. On cluster detail page
2. Click "Generate Recommendations"
3. See rule-based suggestions based on severity/water depth
4. Recommendations persist after refresh

### Test Linked Reports
1. Create multiple reports for the same location
2. View linked reports list
3. Verify all reports show in the list with correct metadata

### Test Merge
1. On a cluster detail
2. Use "Admin Actions" → "Merge Clusters"
3. Select another cluster
4. Confirm merge successful
5. Verify reports moved to target cluster

---

## 🗂️ Project Structure

```
src/
├── pages/
│   ├── Report.jsx              # Report form with join/create modal
│   ├── ClusterDetails.jsx      # Incident detail, discussion, recommendations
│   └── Map.jsx                 # Map view with incident pins
├── components/
│   └── JoinOrCreateModal.jsx   # Beautiful modal for join/create decision
├── context/
│   └── MockDataContext.jsx     # All state management & localStorage
└── (other pages & components)
```

---

## 🔄 Data Flow

```
User Reports Incident
    ↓
Check for Nearby Cluster (150m radius)
    ↓
Found? → Show Modal (Join vs Create)
    ↓
User Chooses Join → Attach to Cluster
User Chooses Create → Create New Cluster
    ↓
Navigate to Cluster Detail
    ↓
User Can:
  • Add Comments (Discussion)
  • View Linked Reports
  • Generate Recommendations
  • Merge (if admin)
```

---

## 💾 LocalStorage Keys

All demo data is stored under `mockData` key in localStorage:

```javascript
localStorage.getItem('mockData')
```

Contains:
- `users` — User accounts
- `clusters` — Incident clusters
- `reports` — Individual reports
- `comments` — Discussion comments
- `recommendations` — Generated suggestions
- `solutions`, `cases`, `expertTasks`, etc. — Other demo entities

---

## 🎨 UI Features

- **Modal prompts**: Beautiful join/create decision interface
- **Discussion threads**: Comment boxes with user roles
- **Recommendations panel**: Prioritized action items
- **Linked reports gallery**: Visual report cards
- **Admin merge UI**: Dropdown + merge button
- **Toast notifications**: Feedback for actions (react-hot-toast)

---

## 🚫 Limitations (Frontend Demo)

- ❌ No real backend/database
- ❌ AI analysis is mocked (random generation)
- ❌ No user authentication enforcement
- ❌ No LLM integration (recommendations are rule-based)
- ❌ No real image processing or geolocation
- ❌ Merge is immediate (no approval workflow)

---

## ✨ Next Steps (Production Ready)

1. **Backend**: Node.js + MongoDB for persistent data
2. **Real AI**: OpenAI/Hugging Face for image analysis & recommendations
3. **Authentication**: JWT or OAuth
4. **Real Maps**: Integrate Mapbox or Google Maps
5. **Notifications**: WebSockets for real-time updates
6. **Mobile**: React Native or PWA
7. **Analytics**: Track incident resolution rates, heatmaps
8. **Moderation**: Report flagging, expert approval workflows

---

## 📞 Support

For issues or questions:
- Check browser console for errors (F12 → Console)
- Clear localStorage if data seems corrupted: `localStorage.clear()`
- Restart dev server: `npm run dev`

Enjoy the demo! 🌊✨
