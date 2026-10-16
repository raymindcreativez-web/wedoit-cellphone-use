# Project Context

## Application Identity

- **Application Name**: Bantai - Project RAI (Rapid Advancement in Instruction)
- **Repository**: `raymindcreativez-web/wedoit-cellphone-use`
- **Internal System Code**: `wedoit-cellphone-use`
- **Version**: `1.1.0`
- **Status**: Production / Active
- **Maintainer / Organization**: wedoIT™ Solutions (`Developed by Sirmon™`) / RAYMIND Creativez
- **Target Audience / Deployment**: DepEd Educational Institutions / Classroom Teachers

---

# Purpose

## What problem does this application solve?

Unauthorized mobile device usage during class hours causes significant classroom disruption, reduces instructional focus, and impacts learner comprehension. Teachers frequently struggle to manage and record phone policy violations efficiently without losing valuable instructional time or relying on cumbersome physical logbooks.

**Bantai** (Tagalog for "Monitor" or "Guard") is an ultra-fast, zero-friction web application created under **Project RAI (Rapid Advancement in Instruction)**. It empowers educators to:

1. **Log Violations Instantly**: Enter student incidents in seconds from any smartphone, tablet, or classroom computer.
2. **Automate Adviser Identification**: Dynamically associate sections with their designated class advisers without manual lookup.
3. **Synchronize Directly to Cloud Sheets**: Automatically send incident records to a centralized Google Sheets spreadsheet via Google Apps Script for administrative oversight and parent conferences.
4. **Maintain a Distraction-Free Environment**: Support rapid consecutive data entry (with auto-focus) so teachers can immediately return their attention to instruction.

---

# Target Users

- **Classroom Teachers & Subject Instructors**: Quickly record phone policy infractions in real time during lessons.
- **Section & Grade Level Advisers**: Access centralized records to monitor student violation trends and conduct parent-teacher conferences.
- **Guidance Counselors & Prefects of Discipline**: Review empirical log history for formal student interventions and behavioral guidance.
- **School Heads & DepEd Coordinators**: Evaluate campus-wide cellphone policy compliance and correlate reduction in distractions with instructional gains under Project RAI.

---

# Core Features & Workflows

## 1. Onboarding & Welcome Portal
- Branded splash screen introducing **Project RAI** and the **Bantai** initiative.
- Clean backdrop with ambient animation and glassmorphism cards.
- Single-tap entry ("Open Tracker") into the active logging console.

## 2. Rapid Incident Logging Engine
- **Full Student Name Input**: Rapid text field with automatic cursor refocus after submission for seamless consecutive logging.
- **Cascading Grade & Section Selectors**: Select grade level (Grades 7 through 12) to dynamically load the corresponding section roster.
- **Auto-Populated Class Adviser**: Select a section to instantly populate the designated adviser's full name.
- **Contextual Incident Notes**: Optional notes field for specific details (e.g., confiscation until end-of-day, repeated violation, playing games during lecture).
- **Instant Validation & Feedback**: Inline animated status alerts (success/error banners) confirming local and cloud submission.

## 3. Real-Time Session Log Feed
- **Recent Violations Stream**: Live list of incidents logged during the active session.
- **Structured Metadata Badges**: Highlighting student name, grade, section, adviser name, and formatted timestamp (e.g., `Jul 24, 10:30 AM`).
- **Log Correction**: Individual delete button (hover-activated) allowing teachers to remove erroneous entries from the local feed.
- **Session Incident Counter**: Top-level badge displaying the total number of incidents recorded.

## 4. Cloud Synchronization
- Asynchronous POST requests dispatched to a dedicated Google Apps Script Web App endpoint.
- Operates under `mode: 'no-cors'` to ensure non-blocking delivery directly from browser clients into Google Sheets.

---

# School Data Schema & Roster

The application maintains an integrated roster of Grade Levels, Sections, and Class Advisers:

| Grade Level | Section Name | Designated Class Adviser | Track / Program |
| :--- | :--- | :--- | :--- |
| **Grade 7** | `SSC7` | Emie Joy L. Fabellore | Special Science Class (SSC) |
| | `Amethyst` | Emili Jun M. Galario | Regular Curriculum |
| | `Diamond` | Estephanie F. Morada | Regular Curriculum |
| | `Gold` | Mary Grace M. Ylagan | Regular Curriculum |
| **Grade 8** | `Faraday` | Clarise F. Panoy | Regular Curriculum |
| | `Einstein` | Jesibel F. Trogon | Regular Curriculum |
| | `Newton` | Lea T. Gregorio | Regular Curriculum |
| | `SSC8` | Veryl F. Fajarillo | Special Science Class (SSC) |
| **Grade 9** | `SSC9` | Edgie F. Servanez | Special Science Class (SSC) |
| | `Homer` | Faith F. Mangoba | Regular Curriculum |
| | `Shakespeare` | Geraldine C. Pampo | Regular Curriculum |
| | `Rizal` | Rio G. Cortez | Regular Curriculum |
| **Grade 10** | `Uranus` | Christian Jay V. Gaa | Regular Curriculum |
| | `SSC` | Elranie C. Faigao | Special Science Class (SSC) |
| | `Jupiter` | Helen Rose M. Anastacio | Regular Curriculum |
| | `Neptune` | Katherine G. Taborete | Regular Curriculum |
| **Grade 11** | `ACAD1` | Rea G. Cortez | Senior High - Academic Track |
| | `ACAD2` | Alvin F. Faa | Senior High - Academic Track |
| | `ACAD3` | Jonah F. Fajarillo | Senior High - Academic Track |
| **Grade 12** | `ABM` | Frank Jerico F. Machon | Senior High - Accountancy, Business and Management |
| | `HUMSS1` | Jeannie C. Perez | Senior High - Humanities and Social Sciences |
| | `HUMSS2` | Vincent F. Fallaria | Senior High - Humanities and Social Sciences |

---

# Data Contract & Cloud Payload

When an incident is recorded, the application emits a JSON payload structured as follows:

```json
{
  "id": "1721804249000",
  "studentId": "LRN-102938475610",
  "studentName": "Juan Dela Cruz",
  "grade": "Grade 10",
  "section": "SSC",
  "adviser": "Elranie C. Faigao",
  "occurrenceNumber": 2,
  "notes": "Using smartphone during math seatwork",
  "timestamp": "2026-07-24T02:37:29.000Z"
}
```

- **Target Webhook**: Google Apps Script Web App (`/exec`)
- **Configured Endpoint**: `https://script.google.com/macros/s/AKfycbxadSZUoa6e2MRyLF87PiAQwAdRfMT-jtx09OkoUxAuGNegqWLihNK3K2DTBbmDB7Xyhg/exec`

---

# Technology Stack

- **Architecture**: Zero-Build Single Page Application (`index.html`)
- **Frontend Framework**: React 18 (`react.production.min.js`, `react-dom.production.min.js`) via CDN
- **JSX Compilation**: In-browser transformation via Babel Standalone (`@babel/standalone`)
- **QR Code Scanning Engine**: `html5-qrcode` (v2.3.8 CDN) supporting real-time camera stream, image upload decoding, and manual identifier lookup
- **Styling & Design System**: Tailwind CSS (CDN) with custom theme extensions:
  - Custom brand colors (`brand-50` to `brand-700`)
  - Keyframe animations (`fadeIn`, pulsating ambient blurs, scan laser)
  - Styled WebKit custom scrollbars
- **Typography**: Inter (Google Fonts)
- **Local Persistence & Cache**: `localStorage` (`BANTAI_STUDENTS_V1` and `BANTAI_LOGS_V1`) for offline-first resilience
- **Backend / Storage**: Google Apps Script Web App (`doPost` / `doGet`) feeding a central Google Sheets database
- **Hosting / Distribution**: GitHub Pages / Static HTTP hosting