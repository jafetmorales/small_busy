## Bebedio Alerts – Local Competitor & Opportunity Alert Service

Opinionated roadmap + architecture snapshot for the pivot. This file is your single source of truth so you do not lose track of intent while implementing features.

---

### 1. Product Summary
Deliver weekly (later optional daily) actionable alerts to local service businesses about:
1. Competitor changes (ratings, new entrants, offer / site content shifts, performance drops)
2. Own site health (mobile, speed, SEO deltas)
3. Emerging zip code / geo opportunities
4. Referral partner suggestions
5. Top prioritized action recommendations

Primary UX (MVP):
- Weekly email + lightweight dashboard page showing the latest alert and a short history list.

Why this product:
- High perceived ROI (save time; surface missed competitive moves)  
- Recurring data = compounding moat (historical change dataset)  
- Lower susceptibility to pure LLM commoditization (focus on proprietary monitoring + diffs)  
- Clear headline for cold outreach: "We watch your local competitors & opportunities so you can act first."  

### 2. Target Users & Pricing (Draft)
| Tier | Use Case | Key Limits | Price (draft) |
|------|----------|-----------|---------------|
| Trial | Evaluation | 1 location, weekly | 14 days (card optional) |
| Starter | Solo practice | 1 location, 5 competitors | $29/mo |
| Growth | Multi-location / agency light | 3 locations, 15 competitors, daily significant change alerts | $79/mo |
| Pro | Agencies | 10 locations, 50 competitors, webhooks, benchmarks | $179/mo |

Add‑ons later: Additional locations, benchmark pack, referral partner expansion, API token.

### 3. Core KPIs (Early)
- Trial Start Rate (from landing): > 8% of unique visitors
- Trial → Paid Conversion: > 20%
- Weekly Email Open Rate: > 35%
- 30‑Day Logo (gross) Churn: < 15%
- Avg Competitor Coverage: ≥ 4 per business

### 4. High-Level System Architecture (MVP)
```
Python Scrapers (cron / manual) --> Manifest JSON + Snapshots -->
POST /internal/intake/snapshot (Express) --> DB (Postgres/Supabase)
																		|--> Diff Engine (Python during scrape) writes change_events
Weekly Job (Node or Python) queries last 7 days --> Alert Composer --> Email (Mailgun/Resend)
React Client (dashboard) --> /api/alerts, /api/metrics, /api/competitors
Stripe <---> Subscription Webhook --> Plan enforcement middleware
```

### 5. Data Streams & Normalized Entities
**Streams:** competitor_profile, site_metric, site_content_section, rating_snapshot, zip_opportunity, referral_partner_snapshot.

**Tables (initial minimal set):**
- `businesses(id, name, website, owner_email, created_at, active)`
- `competitors(id, business_id, name, domain, phone, rating, first_seen_at, last_seen_at)`
- `competitor_snapshots(id, competitor_id, rating, raw_json, collected_at)`
- `metrics(id, business_id, key, latest_score, updated_at)`
- `metric_history(id, business_id, key, score, collected_at)`
- `zip_opportunities(id, business_id, zip, score, rank, reasons text[], collected_at)`
- `change_events(id, business_id, competitor_id?, type, field, old_value, new_value, diff_score, detected_at)`
- `alerts(id, business_id, period_start, period_end, payload_json, sent_at)`
- `subscriptions(id, business_id, plan_code, trial_end, status, renews_at)`
- `api_keys(id, business_id, token_hash, label, status, created_at, last_used_at)` (defer until needed)

### 6. Change Event Types (Examples)
`COMPETITOR_RATING_DELTA`, `COMPETITOR_NEW`, `SITE_SPEED_DROP`, `SITE_MOBILE_SCORE_CHANGE`, `SEO_SCORE_CHANGE`, `NEW_PAGE_DETECTED`, `PAGE_CONTENT_CHANGE`, `ZIP_OPPORTUNITY_RANK_CHANGE`.

### 7. Alert Payload (Shape Draft)
```json
{
	"business_id": "uuid",
	"period": {"start": "2025-08-01", "end": "2025-08-08"},
	"summary": {"competitor_changes": 3, "metric_improvements": 2, "opportunities": 2},
	"competitor_changes": [
		{"type": "COMPETITOR_RATING_DELTA", "name": "Fox Garden Dental", "old": 4.7, "new": 4.9, "detected_at": "..."}
	],
	"metrics": {"mobile_friendly": {"score": 50, "delta": -10}, "seo": {"score": 85, "delta": 0}},
	"zip_opportunities": [
		{"zip": "78247", "rank": 1, "score": 92, "reasons": ["High income", "Large market"]}
	],
	"referral_partners": [
		{"name": "Castle Hills Family Practice", "type": "Medical clinics", "opportunity_tag": "Cross-referral"}
	],
	"actions": [
		{"priority": 1, "description": "Improve mobile score (50→60) for bounce reduction"},
		{"priority": 2, "description": "Contact Castle Hills Family Practice re: referral"}
	]
}
```

### 8. Implementation Phases (Detailed)
**Phase 1 (Days 1–3): Foundations**  
Migrations (tables above minimal subset).  
Internal intake endpoint `/internal/intake/snapshot` (static API key).  
Python export script posting normalized JSON + event list.  
Diff logic (hash previous snapshot; emit change_events).  

**Phase 2 (Days 4–6): Alert Delivery**  
Weekly cron/job script (Node or Python).  
Alert composer (assemble payload_json).  
Email sending (Resend/Mailgun) with basic template + open pixel.  
Dashboard route `/api/alerts/latest` + React page rendering sections.  

**Phase 3 (Days 7–10): Plans & Trials**  
Stripe products/plans, webhook handler (subscription + trial state).  
Middleware gating competitor count + locations.  
Landing signup form (collect business, email, website).  
On-demand initial scrape invocation for instant first alert (partial).  

**Phase 4 (Days 11–14): Enrichment & Opportunity**  
Zip opportunity computation ingestion.  
Referral partner suggestions integrated.  
Action ranking heuristic.  
Metrics trend sparkline (simple query).  

**Phase 5 (Post-MVP):**  
Daily critical change alerts (opt-in).  
Benchmark percentiles (nightly rollups).  
Webhook delivery (Pro).  
API token issuance & read-only endpoints.  
PDF weekly "Pulse" export (agency forward).  

### 9. Alert Email Content Structure
1. Header (Brand + Week Range)  
2. Quick Stats Row (Changes | Site Score Deltas | New Opportunity)  
3. Competitor Changes (top 3, link to dashboard for more)  
4. Site Health (table; highlight drops in red)  
5. Opportunities (zip + reason)  
6. Recommended Actions (1–3, prioritized)  
7. CTA (Upgrade / Manage Plan)  
8. Footer (compliance / unsubscribe)  

### 10. Cold Email Campaign (4000 Contacts)
Sequence (3 touches):  
**Day 0** – Value: "We watched 5 of your local competitors this week."  
**Day 4** – Proof: show anonymized rating delta + action snippet.  
**Day 9** – Scarcity: "Closing pilot spots."  
Unsubscribe link hitting a suppression table.

### 11. Tech Stack Notes
- Reuse existing Express server for intake + public API.  
- Supabase Postgres (RLS optional later; initial internal key).  
- Drizzle for schema & migrations (extend existing).  
- Python scripts become modular collectors; each returns standardized dict for aggregator.  
- Scheduling: start with external cron (Railway) or GitHub Action hitting a trigger endpoint.  
- Email provider: Resend (simple) or Mailgun (deliverability/routing).  

### 12. Initial Security / Compliance
- Store only public business data (phones, ratings).  
- Hash API keys; never log raw keys.  
- CAN-SPAM footer + suppression table for outreach.  
- Backoff / polite rate-limits on scrapes; respect robots.txt (or document exceptions).  

### 13. Future Moat Builders
- Historical distribution for percentile benchmarking.  
- Change anomaly detection (unexpected rating spike).  
- Cross-vertical normalized scoring (score_version field).  
- Partner graph (referral relationships).  
- ML classification of "meaningful" content changes vs noise.  

### 14. Deferred (Intentionally NOT in MVP)
- Full multi-seat organization management.  
- Real-time streaming alerts.  
- Advanced API write endpoints.  
- Long-form narrative LLM generation.  
- Complex role-based permissions.  

### 15. Running Task Checklist (Keep Updated)
- [ ] Phase 1 migrations committed
- [ ] Intake endpoint implemented
- [ ] Python diff exporter posting successfully (sample business)
- [ ] First change_event row visible
- [ ] Alert composer returns correct payload JSON (console test)
- [ ] Email send success (test inbox)
- [ ] Dashboard shows latest alert
- [ ] Stripe plans + webhook working in test mode
- [ ] Trial conversion flow tested
- [ ] Zip opportunities integrated
- [ ] Referral partner suggestions integrated

### 16. Quick Implementation Order (Copy/Paste Reference)
1. Migrations  
2. Intake route  
3. Python exporter  
4. Diff & change_events  
5. Alert composer  
6. Email service  
7. Dashboard page  
8. Stripe plans + trial logic  
9. Opportunities + referral partners  
10. Benchmarks (later)  

### 17. Sample Command Snippets (Placeholder)
Populate after implementing migrations & scripts.

---

Append updates below this line as architecture evolves.

