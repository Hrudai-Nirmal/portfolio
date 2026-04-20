Project: Portfolio Website with Integrated "Ask Shadow" AI Chatbot

Quick Overview (for visitors)
- This is a personal developer portfolio built as a modern, responsive single-page experience.
- It introduces the developer, showcases selected projects, and provides direct contact options.
- An integrated AI assistant called "Ask Shadow" helps visitors get instant answers about the portfolio, skills, projects, and contact details.
- When opened, the chatbot appears in a right-side drawer while the main portfolio remains visible.
- The layout shifts to a 5:2 split (main content : chatbot), so users can read and ask questions at the same time.

General Outcomes (business and user impact)
- Faster information access: visitors can ask specific questions instead of scanning the full page.
- Better recruiter experience: key technical details can be surfaced quickly and consistently.
- Higher engagement potential: interactive Q&A keeps users on the site longer.
- Improved clarity of personal brand: chatbot responses reinforce project context, stack choices, and outcomes.
- Preserved browsing continuity: chat does not block the page; users can continue exploring while chatting.

Project Goals
- Build a polished personal portfolio with responsive, section-based navigation.
- Add a seamless AI support layer for real-time Q&A.
- Keep UX lightweight, visually clean, and non-disruptive across desktop and mobile.
- Ensure the implementation is maintainable and easy to extend.

Technical Description (for recruiters and technical reviewers)

Architecture and Stack
- Framework: Next.js (App Router) with React and TypeScript.
- Styling: Tailwind CSS with theme-aware color tokens and reusable utility classes.
- Component model: modular section components (`Hero`, `About`, `Projects`, `WhyWorkWithMe`, `Contact`, `Footer`) assembled in `src/app/page.tsx`.
- Navigation: custom `Navbar` with scroll-aware behavior and responsive dropdown transitions.

Chatbot Integration Design
- Chatbot provider is embedded via an iframe:
  - URL: https://udify.app/chatbot/RplHpzybhni9hA6p
  - Permissions: microphone access enabled for voice-capable interactions.
- Trigger entry point is labeled "Ask Shadow" in both desktop header and mobile dropdown.
- Chat open state is managed at page level (`src/app/page.tsx`) and passed to `Navbar` as props (`chatOpen`, `onToggleChat`) to keep behavior centralized.
- Drawer behavior:
  - Closed: single-column main layout.
  - Open: CSS grid switches to `grid-cols-[5fr_2fr]`.
  - Chat lives in a right-side `<aside>` with sticky full-height container.
  - Escape key support closes the chatbot for keyboard accessibility.
- Non-overlap requirement is satisfied by layout reflow rather than modal overlay, allowing simultaneous reading and chatting.

UX and Interaction Behavior
- Desktop header content transitions out on scroll and funnels into a compact dropdown trigger.
- "Ask Shadow" follows the same staggered transition pattern as other header actions for visual consistency.
- Mobile and scrolled desktop states both expose chatbot access via dropdown.
- Chat panel includes a clear close action and persistent header title for context.
- Main content remains visible and interactive while chatbot is open.

Performance and Maintainability Notes
- Integration is iframe-based, reducing complexity and isolating chatbot runtime from the app codebase.
- State lifting to page level avoids duplicated local state and keeps control flow explicit.
- Component boundaries remain clean: navigation triggers state; page owns layout and drawer rendering.
- Current approach is easy to replace with another chatbot provider by changing iframe source and metadata.

Accessibility and Usability Considerations
- Keyboard close path through Escape key.
- Semantic regioning through `<main>` and `<aside>`.
- Visible close button with explicit label.
- Layout preserves context, reducing cognitive switching compared with full-screen modals.

Current Limitations
- Chat content is third-party iframe content and follows provider-side accessibility/performance constraints.
- No analytics events are currently wired for chatbot open/close or engagement tracking.
- No server-side orchestration of chatbot responses; behavior is fully provider-managed.

Suggested Recruiter Q&A Topics this chatbot should answer well
- What technologies are used in this portfolio and why?
- How is the chatbot integrated without disrupting page UX?
- How does the 5:2 layout improve usability for project review?
- What frontend architecture decisions were made for maintainability?
- What tradeoffs come with iframe-based chatbot integration?
- What future improvements are planned (analytics, custom prompts, richer context ingestion)?

Implementation References (code locations)
- Page layout and chatbot drawer: `src/app/page.tsx`
- Navigation behavior and Ask Shadow trigger: `src/components/Navbar.tsx`
- Core section composition: `src/app/page.tsx`
- Base project details and stack summary: `README.md`

One-Line Portfolio Pitch
- A modern Next.js portfolio that pairs clean storytelling with an embedded AI assistant so recruiters and visitors can get precise answers instantly while browsing.

---

Project: Surface Defect Detection with Hybrid Routing Ensemble

Quick Overview (for visitors)
- This is a computer vision project focused on detecting and localizing surface defects in industrial-style images.
- It uses object detection to identify multiple defect classes and draw bounding boxes around defect regions.
- The system combines one strong generalist detector with multiple specialist detectors for targeted defect families.
- A routing mechanism lets the generalist decide when specialists should be activated.
- Final predictions are merged with class-aware suppression to reduce duplicate detections.

General Outcomes (business and user impact)
- Better detection quality than a single-model baseline through specialist + routing strategy.
- Stronger recall on difficult classes while preserving precision through post-processing controls.
- Reproducible experiment tracking via artifact-based configs, logs, and evaluation summaries.
- Easier model comparisons using saved mAP reports, prediction JSONs, and visual dashboards.
- Clear path to deployment-style evaluation through both multiclass and binary defect metrics.

Project Goals
- Maximize defect detection mAP/mAP@50 on held-out test data.
- Build a modular detection pipeline that supports both single and multi-model inference.
- Keep experimentation reproducible with versioned JSON configs and saved artifacts.
- Support class imbalance handling, specialist training, and routing-based inference optimization.

Technical Description (for recruiters and technical reviewers)

Architecture and Stack
- Framework: Python + PyTorch + TorchVision.
- Core detector family: Faster R-CNN with ResNet-50 FPN variants (`fpn`, `fpn_v2`, optional transformer-augmented variants).
- Evaluation: TorchMetrics `MeanAveragePrecision` (mAP, mAP@50, mAP@75).
- Data format: Pascal VOC XML annotations with auto-discovery and stratified disjoint splitting utilities.

Hybrid Detection System Design
- Generalist model is trained to detect all target defect classes.
- Specialist models are trained on class-group subsets for focused performance.
- Optional routing gate uses generalist confidence to decide specialist activation.
- Prediction merge stage applies class-aware NMS and optional cross-class suppression.
- Pipeline configs are externalized in artifact JSON files for reproducibility and easy A/B testing.

Training and Evaluation Workflow
- Generalist training and core utilities are handled in `Model.py`.
- Specialist orchestration and hybrid specialist training are handled in `train_specialists.py` and `train_specialist_hybrid_fasterrcnn.py`.
- Multi-model inference and routing execution are handled in `multi_pipeline_predict.py`.
- Evaluation includes:
  - full multiclass mAP (`evaluate_specialist_pipeline_map.py`)
  - binary defect-vs-background mAP (`evaluate_binary_defect_map.py`)
  - auxiliary cross-domain analysis on Severstal (`evaluate_severstal_hybrid.py`)

Measured Performance Highlights
- Routing schedule results (recorded in `artifacts/routing_schedule_16epoch_summary.json`):
  - Phase 1 (no routing): mAP 0.5859 | mAP@50 0.8725 | mAP@75 0.6318
  - Phase 2 (routing enabled): mAP 0.6445 | mAP@50 0.9147 | mAP@75 0.7139
- Specialist ensemble vs single baseline (recorded in `artifacts/specialist_best_vs_single_20260405.json`):
  - Hybrid ensemble: mAP 0.5896 | mAP@50 0.9068 | mAP@75 0.6034
  - Single baseline: mAP 0.5753 | mAP@50 0.8829 | mAP@75 0.5901
  - Gain: +0.0142 mAP, +0.0239 mAP@50, +0.0133 mAP@75

Data and Domain Scope
- Primary domain: `zhangyunsheng/defects-class-and-location` (10-class VOC-based detection setup).
- Additional datasets used for extension and robustness studies:
  - DAGM VOC conversion (`data/dagm_voc`)
  - Severstal steel defect dataset for out-of-domain benchmarking
- Cross-domain results indicate meaningful domain shift, highlighting adaptation opportunities.

Performance and Maintainability Notes
- Artifact-driven configs make experiments repeatable and easier to audit.
- Modular scripts separate training, multi-pipeline inference, and evaluation responsibilities.
- Routing and specialist groups can be tuned independently without rewriting the full pipeline.
- Visual output generation supports quick qualitative validation alongside metric reporting.

Current Limitations
- Domain shift remains significant on Severstal without dedicated adaptation.
- Performance can be sensitive to thresholds (routing gate, class score thresholds, suppression IoU).
- Large checkpoints and raw datasets are excluded from git for repository size practicality.

Suggested Recruiter Q&A Topics this project should answer well
- Why use a generalist + specialist routing strategy instead of a single detector?
- How does routing improve performance, and what are the tradeoffs?
- How is reproducibility handled across experiments?
- What methods were used to address class imbalance and hard classes?
- How does the model behave under domain shift (for example, on Severstal)?
- What are the next practical steps for production hardening?

Implementation References (code locations)
- Core training and baseline workflow: `Model.py`
- Specialist orchestration: `train_specialists.py`
- Specialist hybrid training: `train_specialist_hybrid_fasterrcnn.py`
- Routing + multi-model inference: `multi_pipeline_predict.py`
- Multiclass mAP evaluation: `evaluate_specialist_pipeline_map.py`
- Binary defect evaluation: `evaluate_binary_defect_map.py`
- Project summary and outcomes: `PROJECT_FULL_DESCRIPTION_AND_OUTCOMES.md`
- Training history and hyperparameters: `TRAINING_HISTORY_AND_HYPERPARAMETERS.md`

One-Line Portfolio Pitch
- A production-oriented surface defect detection pipeline that boosts object detection accuracy using a generalist-plus-specialist routing ensemble with reproducible, artifact-driven evaluation.

---

Project: MUSES (GuitarBud) - Role-Based Guitar Learning and Live Performance Platform

Quick Overview (for visitors)
- MUSES is a full-stack guitar learning and performance app built for both students and teachers.
- Students can search songs, open structured guitar lessons, practice with metronome and bar-based navigation, and purchase premium lessons.
- Teachers can create/edit lessons, attach media (backing tracks, YouTube), monetize content, and view basic lesson business analytics.
- Performers can build setlists, use a ChordPro song editor, and run live synchronized sessions with band members using a shareable code.
- The platform combines learning workflows (lesson discovery + guided practice) with real-time collaboration workflows (host/follow performance sessions).

General Outcomes (business and user impact)
- Multi-role product value: one platform supports both creators (teachers) and learners (students).
- Better learning continuity: lesson viewer combines chords, tabs/lyrics blocks, timing grid, and practice controls in one place.
- New monetization channel: teachers can publish paid lessons and track sales/revenue.
- Stronger rehearsal efficiency: live sessions keep bands synchronized on song order and scroll position.
- Practical retention loop: students can discover new lessons, buy access, and return for ongoing practice.

Project Goals
- Build a role-aware music education product with clear student and teacher flows.
- Provide a high-utility practice experience beyond static chord sheets.
- Enable teachers to publish, price, and manage guitar lessons with low operational friction.
- Add real-time session features for rehearsal/performance use cases.
- Keep the codebase modular enough to evolve into production-grade workflows.

Technical Description (for recruiters and technical reviewers)

Architecture and Stack
- Frontend: React 18 + Vite with modular feature components and CSS Modules.
- Backend: Express.js API with MongoDB as primary data store.
- Authentication: JWT-based auth with role-aware login (student/teacher), registration, and password reset.
- Realtime: WebSocket server (`ws`) for session creation, joining, synchronization, and teardown.
- Security/ops middleware: `helmet`, CORS allowlist patterns, request logging, and environment-driven config.

Role-Based Product Model
- Users can hold multiple roles under one account (`roles` array), then choose login role per session.
- Teacher role unlocks lesson authoring, monetization toggles, and dashboard analytics.
- Student role unlocks lesson browsing, purchase flow, and practice/consumption interfaces.
- Backend authorization is enforced per route for teacher-only and authenticated-only actions.

Lesson and Content System
- Song metadata and lesson versions are stored separately (`songs`, `versions`) to support multiple teacher versions per song.
- Lessons support both raw ChordPro-style content and structured block content (`lyrics`/`tabs`).
- Musical metadata includes key, key quality, BPM, capo, time signature, optional backing track URL, and YouTube link.
- Public endpoints expose catalog/search and non-premium content; premium content uses access checks.
- Teacher tooling supports create/update/delete for songs and versions, including pricing controls.

Practice Experience Design
- Students can search songs, select versions, and open a rich lesson viewer.
- Viewer features include:
  - chord extraction + chord diagram rendering
  - metronome integration and BPM controls
  - bar/beat grid display with count-in bar and active-beat highlighting
  - autoscroll and bar-jump controls
  - embedded backing track and YouTube media
- Mobile-aware layout switches between list and lesson modes for smaller screens.

Monetization and Access Control
- Monetized lessons are listed in browse flow with filters/sorting and purchase indicators.
- Purchase records are stored in `purchases` and linked to user, version, teacher, and price.
- Access checks gate premium lesson content while still exposing preview-level metadata.
- "My Purchases" view gives students a personalized post-purchase lesson library.

Performance and Collaboration Features
- Setlist management supports create/edit/delete/reorder with local persistence and server sync.
- Song editor supports ChordPro authoring, chord preview, and reusable custom song library.
- Live session flow:
  - host creates a 6-character session code
  - participants join via code and receive synchronized state
  - host controls song index and scroll sync for followers
  - session lifecycle handles leave/end/disconnect cases
- This enables lightweight remote rehearsal coordination without adding heavy RTC infrastructure.

Performance and Maintainability Notes
- API surface is organized around clear domain boundaries: auth, songs/versions, lessons, purchases, setlists, sessions.
- Frontend is split into focused components (`Practice`, `LessonViewer`, `TeacherDashboard`, `Performance`, etc.).
- Persistent data is hybrid: server-backed core entities with local fallback for selected UX states.
- WebSocket logic uses explicit message types, making protocol behavior readable and extensible.

Current Limitations
- Payment is currently simulated (no production payment gateway integration yet).
- Rating model is aggregate-only and does not yet track per-user rating constraints.
- Session sync is intentionally lightweight and does not include advanced conflict recovery.
- Email verification/reset behavior is partially environment-dependent (SendGrid optional).

Suggested Recruiter Q&A Topics this project should answer well
- How does the system model multi-role accounts and role-specific capabilities?
- What design choices enable premium lesson monetization with access control?
- How does the lesson viewer improve practice quality versus static chord sheets?
- How is real-time state synchronization implemented for live performance sessions?
- What boundaries in the codebase make this app maintainable as features grow?
- What production hardening steps would come next (payments, analytics, observability, abuse controls)?

Implementation References (code locations)
- App shell and view routing: `frontend/src/App.jsx`
- Authentication and role flows: `frontend/src/components/Auth.jsx`
- Teacher authoring + analytics UI: `frontend/src/components/TeacherDashboard.jsx`
- Student practice and lesson rendering: `frontend/src/components/Practice.jsx`, `frontend/src/components/LessonViewer.jsx`
- Setlists, song editor, and live sessions UI: `frontend/src/components/Performance.jsx`
- API and WebSocket server: `backend/src/index.js`
- Setup and deployment baseline: `README.md`

One-Line Portfolio Pitch
- A full-stack, role-based guitar platform that unifies lesson publishing, premium content workflows, guided practice tools, and live synchronized performance sessions.

---

Project: Qrypt - Quantum-Inspired Secure Messaging Platform

Quick Overview (for visitors)
- Qrypt is a full-stack real-time messaging platform that combines standard chat UX with quantum key exchange simulation.
- Users can register/login, discover people, send/accept friend requests, and open one-to-one chat sessions.
- Messages are delivered live through WebSockets and stored for persistent conversation history.
- Each chat includes a BB84-inspired key generation flow so sessions can display quantum key readiness and key preview metadata.
- The product pairs practical messaging features (presence, history, friend graph) with advanced cryptography-inspired concepts.

General Outcomes (business and user impact)
- Stronger differentiation: adds a unique quantum-security narrative to a familiar chat product.
- Better communication continuity: users get both real-time delivery and persisted history across sessions.
- Faster relationship onboarding: built-in user search and friend request workflows reduce friction before chatting.
- Improved trust signals: online presence, last-seen metadata, and session-backed auth improve reliability perception.
- Platform-readiness: backend includes rate limiting and optional Redis scaling hooks for safer growth.

Project Goals
- Build a production-style messaging foundation with auth, friends, chats, and real-time updates.
- Integrate BB84 simulation into chat sessions without harming core UX simplicity.
- Keep the architecture modular so frontend and backend can deploy independently.
- Support scalability paths (Redis-backed presence/message queue) while preserving local-dev simplicity.
- Maintain clear API boundaries and predictable state synchronization across REST + sockets.

Technical Description (for recruiters and technical reviewers)

Architecture and Stack
- Frontend: React + Vite SPA (`src/`) with modular components for auth, dashboard, and chat workspace.
- Backend: Flask REST API + Flask-SocketIO (`backend/app.py`) for combined request/response and realtime transport.
- Database: MongoDB collections for users, sessions, chats, and messages.
- Quantum layer: Qiskit + Aer simulator for BB84-style key generation/rotation.
- Runtime options: Redis optional for distributed presence + rate counter storage, with in-memory fallback.

Realtime Messaging and Presence Design
- Token-authenticated Socket.IO connection joins user-specific and chat-specific rooms.
- Event model includes chat join/leave, message send, chat updates, key updates, and presence heartbeats.
- Presence tracks online state + last seen with TTL semantics, then broadcasts updates to relevant contacts.
- Message flow supports immediate socket fan-out and durable storage for later retrieval.
- Frontend merges socket-delivered messages with REST-loaded history using message-id deduplication.

Security and Session Model
- Auth flow supports register/login/me/logout with server-side session token persistence.
- Passwords are hashed (`werkzeug.security`) before storage.
- API and socket routes use scoped rate limiting (IP/user/socket paths) with retry-after semantics.
- CORS origin normalization supports controlled multi-origin deployment.
- Profile updates support display name and bounded profile-image payload validation.

Quantum Integration Workflow
- Per-chat key generation is exposed through `POST /api/quantum/session`.
- Backend computes BB84-style simulation results and stores key metadata on chat documents.
- Chat list/header surfaces key status (`ready`/`missing`), key length, updated timestamp, and preview.
- Socket event `quantum_key_updated` keeps both participants synchronized after rotation.
- Current implementation demonstrates key exchange mechanics while leaving payload encryption as a future hardening step.

Performance and Maintainability Notes
- Clear split between REST endpoints (bootstrap/query/update) and socket events (live sync).
- Redis integration is optional, enabling simple local setup and scalable deployment configuration.
- Frontend state management is centralized in `App.jsx`, with feature components kept focused and reusable.
- Deterministic chat IDs and sorted chat timelines simplify synchronization logic.
- Environment-driven URLs/configs make frontend/backend deployment decoupled and portable.

Current Limitations
- Chat payloads are not end-to-end encrypted yet; quantum keys are shown but not used for content encryption.
- Group chats are not implemented; current model is one-to-one sessions.
- Advanced security controls (MFA, device management, anomaly detection) are not yet included.
- Observability and test coverage need expansion before production-level rollout.

Suggested Recruiter Q&A Topics this project should answer well
- How is BB84 simulation integrated into a practical messaging architecture?
- What tradeoffs were made between security realism and product usability?
- How do REST and Socket.IO responsibilities split across the system?
- How does Redis improve presence and scaling behavior compared with in-memory fallback?
- What steps are needed to move from simulated key exchange to true E2E encrypted messaging?
- Which backend safeguards are already present (rate limiting, auth/session controls) and what remains?

Implementation References (code locations)
- Backend API + socket server + quantum flow: `backend/app.py`
- Python dependencies and runtime stack: `backend/requirements.txt`
- Frontend app state orchestration: `src/App.jsx`
- Chat workspace rendering: `src/components/Chat.jsx`
- Dashboard and search/friend interactions: `src/components/Dashboard.jsx`
- Auth UI flow: `src/components/Login.jsx`
- API client layer: `src/lib/api.js`
- Socket client setup: `src/lib/socket.js`
- Project setup and endpoint summary: `README.md`

One-Line Portfolio Pitch
- A full-stack real-time messenger that blends practical chat engineering with BB84-based quantum key simulation to showcase secure-system thinking end to end.
