# AI Changelog - Bantai (Project RAI)

## Version 1.2.0 - 2026-10-16 (PWA & Offline-First Production Release)

### Added
- **Progressive Web App (PWA) Architecture**:
  - Added `manifest.json` with standalone display mode, portrait lock, embedded SVG maskable icons, and Quick Scan home-screen shortcut (`?action=scan`).
  - Added `sw.js` Service Worker pre-caching the App Shell and all CDN dependencies (Tailwind, React 18, Babel, `html5-qrcode`).
  - Added `beforeinstallprompt` capture and native "Install App" button in both Welcome Screen and Tracker Header.
- **Persistent Outbox Sync Queue Engine (`BANTAI_SYNC_QUEUE_V1`)**:
  - Decoupled UI incident logging from network availability for zero-latency (<15ms) local commits.
  - Added automatic queue flushing on `online` event, `visibilitychange`, 30-second heartbeat, and manual "Sync Now" trigger.
  - Added smart queue cancellation when deleting an unsynced incident and automatic occurrence count recalculation.
- **Backend Idempotency & Batch Sync (`Code.gs`)**:
  - Added Column A `ID` deduplication in `saveIncident()` and atomic batch insertion in `saveBatchIncidents()`.
- **Classroom UX Enhancements**:
  - Added live Online/Offline/Queue status pill, per-record sync badges, search/grade filters, and Offline CSV Export.