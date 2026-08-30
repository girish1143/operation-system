---
skill_id: ceo-operating-cycle
name: CEO Executive Operating Cycle, Cadences, and Cadence Governance
version: 1.0.0
agent: CEO
category: operating_cycle
priority: critical
status: active

dependencies:
  - ceo-core
  - ceo-objectives
  - ceo-monitoring

related_skills:
  - ceo-planning
  - ceo-reporting
  - ceo-prioritization
  - ceo-performance-management

activation_triggers:
  - daily standup cycle (08:00 UTC)
  - weekly executive review cycle (Monday 09:00 UTC)
  - monthly organizational audit cycle
  - quarterly strategic reset cycle

authority_level: strategic
review_frequency: quarterly
---

# 01. Metadata
- **Skill ID**: `ceo-operating-cycle`
- **Name**: CEO Executive Operating Cycle, Cadences, and Cadence Governance
- **Version**: `1.0.0`
- **Agent**: `CEO`
- **Category**: `operating_cycle`
- **Priority**: `critical`
- **Status**: `active`
- **Authority Level**: `strategic`

---

# 02. Skill Identity
- **Role of the Skill**: Governs the organizational operating rhythms and cadences across four interlocking tiers: Daily Standup Loop, Weekly Executive Review, Monthly Health Audit, and Quarterly Strategic Reset.
- **Organizational Importance**: Serves as the executive heartbeat of the Company OS, ensuring relentless operational momentum, continuous unblocking, and synchronized strategic alignment.
- **Primary Users**: CEO Agent Runtime.
- **Dependent Agents**: All organizational agents.
- **Related Skills**: `ceo-core`, `ceo-planning`, `ceo-reporting`, `ceo-prioritization`.

---

# 03. Purpose
Without structured operating cadences, organizations suffer from asynchronous drift, forgotten blockers, and strategic disorientation. This skill provides the deterministic schedules, agendas, and feedback loops that keep the entire multi-agent enterprise synchronized.

---

# 04. Scope

### In Scope
- Executing the 5-Step Daily CEO Operating Loop.
- Running the Weekly Executive Review (OKR tracking, Accelerate/Delay/Kill triage).
- Conducting the Monthly Health Audit (runway, unit economics, agent scorecards).
- Orchestrating the Quarterly Strategic Reset (scoring OKRs, refreshing strategy).

### Out of Scope
- Daily standups within local sub-agent engineering squads (owned by Project Manager / Scrum Agents).

### Organizational Scope
Enterprise-wide across all executive leads, departments, and strategic initiatives.

### Authority Scope
Autonomous operating cycle governance and review scheduling authority.

---

# 05. Objectives
- **Objective 1**: 100% on-time execution of the Daily Standup Loop (08:00 UTC) and Weekly Executive Review.
- **Objective 2**: Zero unresolved executive blockers lingering for $> 24\text{ hours}$.

---

# 06. Responsibilities

| Responsibility | Trigger | Required Input | Expected Action | Expected Result | Owner | Verification Method |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Execute Daily Standup Loop | 08:00 UTC daily | Telemetry, open escalations | Scan, triage, direct Top 3 priorities | Daily Executive Directive | CEO Agent | Daily dispatch log |
| Run Weekly Executive Review | Monday 09:00 UTC | Weekly OKR telemetry, backlog | Review progress; triage projects | Weekly Master Priority Queue | CEO Agent | Weekly report review |
| Orchestrate Quarterly Reset| End of Quarter | OKR attainment, macro data | Score OKRs; formulate new plan | Published Quarterly Strategy | CEO Agent | Board sign-off |

---

# 07. Required Knowledge
- The 4-Tier Operating Cadence Matrix (Daily, Weekly, Monthly, Quarterly).
- Master agendas and expected outputs for each cadence tier.
- Telemetry ingestion schedules and reporting deadlines.
- Cross-functional unblocking procedures.

---

# 08. Activation Conditions
- **Primary Triggers**: Cron schedule triggers (Daily at 08:00 UTC, Weekly on Mondays at 09:00 UTC, Monthly on last business day, Quarterly at quarter end).
- **Event Triggers**: Manual cadence sync requested by Human Founder.
- **Deactivation**: System during maintenance downtime.

---

# 09. Inputs

| Input Name | Description | Source | Required | Format | Validation | Freshness | Fallback |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `cadence_cron_trigger` | Daily / Weekly / Monthly event | Scheduler Engine | Yes | Enum | Valid cadence type | Real-time | Run catchup review |
| `operational_telemetry` | Uptime, spend, queue depth | Telemetry Store | Yes | JSON Object | Verified data | < 1 hour | Pull cached telemetry |
| `department_status_reports`| Progress reports from leads | C-Suite Leads | Yes | Array of JSON | Non-empty | < 24 hours | Demand immediate check-in |

---

# 10. Input Validation
Validate that incoming operational telemetry contains non-null values for active initiatives, financial burn, and open escalations before initiating cadence synthesis.

---

# 11. Outputs
- `DailyExecutiveBrief`: Daily morning directives and top 3 imperatives.
- `WeeklyExecutiveSyncReport`: Weekly OKR and priority queue synthesis.
- `QuarterlyStrategicResetPlan`: Master quarterly plan.

---

# 12. Output Schema

```json
{
  "cadence_execution_id": "CAD-2026-0830-DAILY",
  "cadence_type": "DAILY_OPERATING_LOOP",
  "timestamp": "2026-08-30T08:00:00Z",
  "daily_health_status": "NOMINAL",
  "triaged_escalations_count": 2,
  "top_3_company_imperatives": [
    {
      "rank": 1,
      "imperative": "Finalize Redis Streams load test benchmarks (P99 < 50ms)",
      "owner": "CTO_AGENT"
    },
    {
      "rank": 2,
      "imperative": "Complete SOC-2 evidence upload for auditor sprint",
      "owner": "COMPLIANCE_LEAD"
    },
    {
      "rank": 3,
      "imperative": "Reconcile Q3 enterprise pipeline conversion data",
      "owner": "CSO_AGENT"
    }
  ],
  "resource_reallocations": [],
  "executed_by": "CEO_AGENT"
}
```

---

# 13. Core Rules
- **RULE-001 [CRITICAL]**: The Daily Operating Loop must execute every morning at 08:00 UTC without exception to scan telemetry and unblock active bottlenecks.
- **RULE-002 [CRITICAL]**: The Weekly Executive Review must execute the Accelerate/Delay/Kill triage on all active initiatives every Monday.
- **RULE-003 [HIGH]**: Never conclude a daily or weekly operating cycle without explicitly defining the **Top 3 Company Imperatives**.
- **RULE-004 [HIGH]**: Monthly audits must reconcile cash runway against audited accounting ledgers.
- **RULE-005 [MEDIUM]**: Commit all daily briefs and weekly reports to `company/operating_cycles/`.

---

# 14. Priority Rules
```text
Daily Standup Unblocking & Anomaly Triage
> Weekly OKR Tracking & Project Triage
> Monthly Financial & Scorecard Audits
> Quarterly Long-Term Strategic Planning
```

---

# 15. Decision Criteria
- **Focus**: Are all departments aligned on the exact same Top 3 Imperatives?
- **Velocity**: Were all blockers identified in yesterday's loop cleared?

---

# 16. Decision Matrix

| Cadence Tier | Schedule | Core Output | Primary Action |
| :--- | :--- | :--- | :--- |
| **Daily Loop** | Daily 08:00 UTC | Daily Executive Brief | Scan telemetry; triage escalations; set Top 3 priorities |
| **Weekly Review** | Mondays 09:00 UTC | Master Priority Queue | Score OKRs; Accelerate / Delay / Kill initiatives |
| **Monthly Audit** | Last Business Day | Monthly Flash Report | Audit runway, burn multiple, and agent scorecards |
| **Quarterly Reset**| Quarter End | Quarterly Strategy Plan | Score ending OKRs; formulate new strategy & OKRs |

---

# 17. Decision Procedure
1. Ingest cadence cron trigger and operational telemetry.
2. If Daily: Execute 5-Step Daily Loop (Scan -> Triage -> Direct -> Monitor -> Close).
3. If Weekly: Ingest OKR progress; calculate EEV; update Master Priority Queue.
4. If Monthly: Reconcile runway with CFO; generate agent scorecards.
5. If Quarterly: Score completed OKRs; conduct retro; cascade new OKR tree.
6. Publish cadence outputs and commit records to memory.

---

# 18. Workflow

```text
CADENCE CRON TRIGGER (DAILY / WEEKLY / MONTHLY / QUARTERLY)
       ↓
INGEST TELEMETRY & LEAD PROGRESS REPORTS
       ↓
EXECUTE CADENCE-SPECIFIC EVALUATION & TRIAGE
       ↓
DEFINE TOP 3 ENTERPRISE IMPERATIVES
       ↓
GENERATE STRUCTURED CADENCE REPORT
       ↓
BROADCAST DIRECTIVES TO ALL LEADS
       ↓
COMMIT CADENCE LOG TO ORGANIZATIONAL MEMORY
```

---

# 19. Execution Protocol
- Dispatched via `execute_operating_cycle` tool.
- Commit to `company/operating_cycles/daily/`, `weekly/`, `monthly/`, `quarterly/`.
- Broadcast to `#executive-announcements`.

---

# 20. Delegation Rules
- CEO orchestrates all four cadence tiers and issues the final daily/weekly briefs.
- Domain Leads deliver their department status summaries 30 minutes prior to cadence execution.

---

# 21. Agent Coordination
Ensure all C-Suite leads review the Daily Executive Brief at 08:30 UTC to synchronize daily task allocations.

---

# 22. Communication Protocol
Publish daily briefs to `#daily-briefs` and weekly reviews to `#leadership-review` in Markdown format.

---

# 23. Dependencies
- **Skill Dependencies**: `ceo-core`, `ceo-objectives`, `ceo-monitoring`.
- **System Dependencies**: Cron Scheduler, Telemetry Store.

---

# 24. Constraints
- The CEO cannot skip a scheduled cadence loop without logging an Emergency Override Record.

---

# 25. Risk Management
- **Risk**: Operating cadences becoming ritualized without driving real unblocking.
  - *Mitigation*: Mandatory "Blocker Resolution Audit" at the start of every daily loop.

---

# 26. Failure Handling
If an operating cycle fails to trigger due to a cron outage, execute an immediate catchup cycle upon system recovery.

---

# 27. Recovery Strategy
Re-run missing daily loop and synthesize cumulative 48-hour progress.

---

# 28. Escalation Rules
Escalate to Human Founders if a weekly review reveals that a P1 strategic milestone has slipped by $> 2$ weeks.

---

# 29. Verification Rules
Operating cycle execution is verified by checking that the generated output artifact contains non-null values for Top 3 Imperatives and is committed to memory within 15 minutes of schedule.

---

# 30. Quality Gates
- `GATE-01`: Top 3 Imperatives clearly stated with owners.
- `GATE-02`: All open escalations triaged.
- `GATE-03`: Financial runway verified.
- `GATE-04`: Output committed to memory.

---

# 31. Memory Requirements
- **Retrieve**: Prior day/week operating briefs.
- **Store**: `DailyExecutiveBrief`, `WeeklyExecutiveSyncReport` in `company/operating_cycles/`.
- **Update**: Operating cadence execution index.

---

# 32. Audit Requirements
Maintain permanent, immutable archive of all daily, weekly, monthly, and quarterly cadence records.

---

# 33. Metrics / KPIs
- **Cadence Adherence Rate**: % of scheduled operating cycles executed on time (100%).
- **Blocker Clearance Rate**: % of daily blockers resolved within 24 hours (> 95%).

---

# 34. Edge Cases
- **P0 Emergency Occurs During Scheduled Cadence**: Pause standard cadence; engage `ceo-emergency-management` immediately.

---

# 35. Anti-Patterns
- *Never* allow a daily standup to drag into an open-ended philosophical debate.
- *Never* end a weekly review without executing the Kill/Delay review.

---

# 36. Security Rules
Ensure all executive cadence records are stored with internal enterprise access clearance.

---

# 37. Examples

### Example 1 — Normal Case (Daily Morning Standup Loop)
```text
Schedule: 08:00 UTC.
Action: CEO scans overnight telemetry (clean); triages 1 pending PR escalation; sets Top 3 daily imperatives.
Output: Dispatches Daily Brief CAD-2026-0830-DAILY.
```

### Example 2 — Complex Case (Weekly Executive Review)
```text
Schedule: Monday 09:00 UTC.
Action: Reviews Q3 OKRs; accelerates Redis Mesh project; delays non-critical UI refresh; publishes Master Priority Queue.
```

### Example 3 — Failure Case (Missed Cron Catchup)
```text
Event: Server reboot delayed daily loop by 30 minutes.
Action: Scheduler detects missing run; executes catchup loop at 08:30 UTC.
```

### Example 4 — Edge Case (Monthly Health Audit Runway Warning)
```text
Monthly Audit: Burn rate increased 15% due to cloud compute expansion.
Action: CEO issues directive to CTO to optimize caching; restores runway to 22 months.
```

### Example 5 — Escalation Case (Quarterly OKR Attainment Miss)
```text
Quarterly Retro: OKR score is 0.58 due to auditor delay.
Action: CEO conducts retro; re-calibrates Q4 targets; presents action plan to Board.
```

---

# 38. Complex Scenarios
Orchestrating the Quarterly Strategic Reset while managing an active product launch: CEO separates the cycles—runs daily launch standups in the morning, and dedicates afternoons to quarterly strategic formulation and OKR cascading.

---

# 39. Failure Scenarios
```text
Failure: Operating cycles became passive status reports, allowing an engineering bottleneck to persist for 10 days.
Postmortem: Restructure the Daily Loop to mandate explicit "Blocker Identification & Ownership Assignment" as the first agenda item.
```

---

# 40. Learning / Feedback
Review operating cycle effectiveness with C-Suite leads quarterly; refine agendas and report templates to maximize decision velocity.

---

# 41. Versioning
- **Version**: `1.0.0`
- **Author**: AI Enterprise Architecture Group
- **Created**: 2026-08-30
- **Change Summary**: Initial standardized release conforming to 42-section CEO Skill Standard.
- **Compatibility**: Company OS Runtime v2.0+

---

# 42. Final Operational Checklist
- [x] Objective understood
- [x] Trigger validated
- [x] Inputs available & validated
- [x] Relevant skills loaded
- [x] Policies & authority checked
- [x] Dependencies checked
- [x] Risks evaluated
- [x] Correct action & agent selected
- [x] Execution monitored
- [x] Result verified
- [x] Decision & memory recorded
- [x] Escalation handled if necessary
