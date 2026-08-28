# Tequila Town Technology — Product Truth Sheets

Audit date: 2026-08-27. These notes come from the four repositories named in the investor-site brief. They are the guardrail for every claim and animation on the site.

## 1. Tequila Town Radar — ACQUIRE

Source commit: `8c0c1c3c098c94562ee669da686d6f08f2664a5e`

1. **What is it?** A React app that uses Gemini with Google Search grounding to discover likely Tequila Town ticket buyers, reject sellers and venues, score the fit, show evidence, and draft outreach.
2. **Who uses it?** Sales, partnerships, group-sales, concierge, and growth teams.
3. **What problem does it solve?** It turns broad web research into a short, ranked list of real buyer candidates with a reason to act.
4. **Most important screens:** operating-mode selector; scan controls; pipeline summary; evidence-rich lead cards; outreach drawer.
5. **Most important workflow:** choose a buyer mode and search area → search → reject non-buyers → verify evidence → score → rank → draft outreach.
6. **Inputs:** mode, geography, target group size, timeframe, result count, and prior lead names to exclude.
7. **Outputs:** buyer identity, buyer type, likely purchase mode, evidence URL and context, fit reasons, five score dimensions, offer type, contact path, hooks, next action, and outreach drafts.
8. **What the user does:** chooses a mode, sets the scan, reviews the proof and score, expands the scan, opens a lead, and copies outreach.
9. **What the system does:** creates mode-specific searches, uses Google Search through Gemini, applies buyer-only instructions, returns a structured result, and generates channel-specific outreach.
10. **Already working:** four acquisition modes; grounded search request; structured buyer records; evidence display; score display; ranked pipeline; email, LinkedIn, follow-up, and call drafts.
11. **Not fully production-connected:** no CRM persistence, outreach sending, authentication, deterministic scoring formula, deal tracking, or independent verification service. Scan status messages are staged UI copy. A Gemini key is required.
12. **Never imply:** that Radar contacts people by itself, guarantees buyer truth, reads private data, closes a booking, or has a live CRM connection.
13. **Best workflow to visualize:** a mixed candidate set passes through a buyer-only filter, evidence check, five-part score, ranked queue, and tailored outreach.
14. **Animation options:** (a) buyer-filter conveyor; (b) evidence dossier that assembles; (c) score-lens that separates buyer from seller; (d) four search-mode beams converging on a ranked queue; (e) lead card transforming into outreach.
15. **Chosen approach:** the **buyer gauntlet**. It explains the actual product fastest and avoids a fake radar, globe, or random scan effect.

## 2. Tequila Town App — EXPERIENCE

Source commit: `95650a64a13aa85927d157c8d76d422dcdc00317`

1. **What is it?** A mobile-first React guest experience with Supabase-backed identity, ticket claiming, QR actions, missions, points, passport progress, rewards, personalized content, and AI experience pages.
2. **Who uses it?** Tequila Town guests before, during, and after a visit.
3. **What problem does it solve?** It turns a passive visit into a guided, measurable journey that rewards participation and learns guest preferences.
4. **Most important screens:** ticket claim; home/festival map; experiences; mission detail; passport; profile; AI Portal; AI Bartender; AI Chef; Living Memory.
5. **Most important workflow:** claim ticket → enter → discover a room → start a mission → complete steps or scan → earn points and a stamp → receive a better next recommendation.
6. **Inputs:** authenticated guest, ticket or QR code, survey answers, mission steps, scans, preferences, and uploaded memory media.
7. **Outputs:** claimed ticket, access state, mission progress, points ledger, passport stamps, rewards, recommendations, AI guidance, and transformed memory assets.
8. **What the user does:** signs in, passes the age gate, claims a ticket, explores the map, joins missions, scans codes, completes steps, checks the passport, and uses AI experiences.
9. **What the system does:** validates identity, resolves hashed QR targets, enforces mission rules, saves progress, awards points idempotently, updates the profile, and returns experience actions.
10. **Already working:** route-rich guest UI; Supabase auth context; QR scanner; ticket-claim flow; mission start and completion functions; server-side step checks; points ledger; passport and reward UI; AI chat and Living Memory functions.
11. **Not fully production-connected:** the Tixr check is a placeholder until credentials exist; wallet passes are feature-gated off; much experience, mission, sponsor, drink, and shop content is local/static; Shop is marked coming soon.
12. **Never imply:** live Tixr validation, working Apple/Google Wallet passes, live inventory, universal personalization, or production readiness for every AI experience.
13. **Best workflow to visualize:** ticket claim unlocks the map; a mission begins; a real QR action completes it; the passport is stamped; points rise; the next room is personalized.
14. **Animation options:** (a) living venue map; (b) passport pages turning through the journey; (c) ticket physically unfolding into a path; (d) seven-step progress ribbon with a moving guest token; (e) mission object transforming into a stamp and recommendation.
15. **Chosen approach:** the **living journey map** with a ticket token, room activation, mission, stamp, points, and next recommendation. It shows the guest moving, not a decorative phone.

## 3. Tequila Town Agent Swarm — OPERATE

Source commit: `df79d75c2b542261b891bdef8807e984b8c198fe`

1. **What is it?** A local FastAPI and Agency Swarm system with a master orchestrator, deterministic mission routing, 20 specialist agents plus the orchestrator, streaming execution, and a Tequila Town operations dashboard.
2. **Who uses it?** Tequila Town leadership, guest support, commerce, operations, analytics, sponsor, and creative teams.
3. **What problem does it solve?** It sends each mission to the specialist or group best able to do the work, instead of forcing one general chatbot to do everything.
4. **Most important screens:** Command Center; Mission Control; searchable Agent Swarm roster; four domain workspaces; Settings and readiness diagnostics.
5. **Most important workflow:** mission → classify and route → activate specialists → specialists work in parallel or hand off → outputs return → one usable result is delivered.
6. **Inputs:** mission title, description, mission type, files, provider keys, optional integrations, and Tequila Town operating context.
7. **Outputs:** routing decision, streamed specialist work, sponsor recaps, analysis, guest responses, operations help, documents, slides, images, and video.
8. **What the user does:** writes a mission, reviews the selected route, runs it, watches the stream, searches agents, and opens domain workspaces.
9. **What the system does:** deterministically matches mission keywords, sends work to the orchestrator and specialists, manages agent communication, checks readiness, and exposes dashboard/API routes.
10. **Already working:** 21-agent roster; real specialist instructions; FastAPI server; dashboard; deterministic routing; live Agency Swarm endpoints; streaming path; package and local launcher; starter Supabase schema.
11. **Not fully production-connected:** dashboard metrics are synthetic; mission history is not persisted; Supabase is schema-only; Tixr, CRM, sponsor, feedback, schedule, Slack/email, and storage integrations are not wired; live work needs a provider key; non-local exposure needs an app token.
12. **Never imply:** live event telemetry, persistent mission history, working production integrations, or autonomous final approval without people.
13. **Best workflow to visualize:** “Create a sponsor recap for last night” routes to Analytics, Sponsor Intelligence, Research, Docs, and Slides, then returns one executive result for human review.
14. **Animation options:** (a) mission brief splitting into specialist work orders; (b) orchestrator as a physical switchboard; (c) agent lanes building one artifact; (d) document assembly line; (e) live roster lighting only the required specialists.
15. **Chosen approach:** the **mission switchboard**. One concrete mission activates only the needed specialists, their evidence returns, and a finished recap emerges for a person to approve.

## 4. Tequila Town Control Center — CONTROL

Source commit: `d13e79e866cc33a1fddfe84f563ce2fb9a2113e0`

1. **What is it?** A local-first Next.js business intelligence dashboard that collects public sources, verifies mentions, measures public audience totals, extracts newsletter intelligence, manages tasks and reminders, and builds a daily brief.
2. **Who uses it?** A founder, operator, marketing lead, or executive who needs one trusted operating picture.
3. **What problem does it solve?** It reduces many noisy sources into verified, prioritized information and clear next actions.
4. **Most important screens:** Today/daily brief; Industry; Mentions; Newsletters; Audience; Tasks; Reminders; Settings.
5. **Most important workflow:** collect many sources → reject weak or wrong identity evidence → deduplicate → rank → summarize → show a short daily brief → turn an item into an action.
6. **Inputs:** websites, feeds, sitemaps, identity terms, handles, official domains, negative terms, social profiles, optional Gmail newsletters, optional AI provider, and optional connector-bridge summaries.
7. **Outputs:** verified reading queues, priority scores and reasons, daily brief, audience totals and growth, reminders, tasks, archives, and source-health state.
8. **What the user does:** configures sources, refreshes, reviews proof, sorts by priority or date, archives, saves reminders, reads Today, and acts on the highest-priority items.
9. **What the system does:** collects, canonicalizes, verifies identity from direct pages, rejects namesakes, deduplicates, applies local or AI ranking, stores durable snapshots, and creates the brief without recollecting on every view.
10. **Already working:** local launcher; persisted settings and SQLite data; Industry, Mention, Newsletter, and Audience collectors; verification rules; local/AI ranking; Today snapshot; task/reminder workflows; backup, diagnostics, and extensive tests.
11. **Not fully production-connected:** every fresh install is empty and generic; Tequila Town sources are not built in; private connector data needs a separate user-approved bridge; public platforms remain best-effort; AI and Gmail require user configuration; it is loopback-only by design.
12. **Never imply:** that Tequila Town ticket, revenue, VIP, sponsor, Radar, or Swarm feeds are connected today; that public search is complete; that unavailable metrics equal zero; or that AI output can bypass verification.
13. **Best workflow to visualize:** many Tequila Town signal types enter; source identity is checked; noise and repeats drop out; the strongest facts become a short executive brief with three next moves.
14. **Animation options:** (a) signal refinery; (b) bridge console with sources arriving as physical objects; (c) verification chamber; (d) priority stack collapsing into a brief; (e) ship-bridge map that turns alerts into decisions.
15. **Chosen approach:** the **signal refinery**. It makes verification and prioritization visible, ends with three decisions, and avoids another generic dashboard.

## Operating-system story

The site must keep this exact loop:

**ACQUIRE → EXPERIENCE → OPERATE → CONTROL → better ACQUIRE**

- Radar finds likely demand and prepares the first move.
- The App records what guests do and enjoy.
- Agent Swarm turns needs into coordinated work.
- Control Center checks the signals and ranks the next move.
- The next acquisition and guest cycle starts with better information.

The current products are not presented as one fully connected production stack. The investor story is that four real products exist, the workflows are credible, and funding connects them to real Tequila Town data and operations.
