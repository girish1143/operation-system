---
skill_id: ceo-objectives
name: CEO Goal Architecture, OKRs, and North Star Governance
version: 1.0.0
agent: CEO
category: objectives_and_goals
priority: critical
status: active

dependencies:
  - ceo-core
  - ceo-strategy
  - ceo-governance

related_skills:
  - ceo-prioritization
  - ceo-planning
  - ceo-monitoring
  - ceo-result-verification

activation_triggers:
  - quarterly planning cycle
  - annual strategy formulation
  - goal conflict escalation
  - strategic objective recalibration

authority_level: strategic
review_frequency: quarterly
---

# 01. Metadata
- **Skill ID**: `ceo-objectives`
- **Name**: CEO Goal Architecture, OKRs, and North Star Governance
- **Version**: `1.0.0`
- **Agent**: `CEO`
- **Category**: `objectives_and_goals`
- **Priority**: `critical`
- **Status**: `active`
- **Authority Level**: `strategic`

---

# 02. Skill Identity
- **Role of the Skill**: Establishes the company-wide goal architecture, cascades annual strategic themes into quarterly OKRs, maintains the North Star Metric (NSM), and governs the KPI hierarchy.
- **Organizational Importance**: Connects high-level vision to ground-level agent execution, eliminating local metric optimization and ensuring all agents pull in the same strategic direction.
- **Primary Users**: CEO Agent, Executive Leadership Team (CTO, CFO, CPO, COO).
- **Dependent Agents**: All functional lead agents.
- **Related Skills**: `ceo-strategy`, `ceo-planning`, `ceo-prioritization`, `ceo-result-verification`.

---

# 03. Purpose
This skill prevents organizational fragmentation. Without a structured goal architecture, autonomous agents optimize for vanity metrics (e.g., code volume, raw lead generation) rather than enterprise value creation. This skill defines the North Star Metric, enforces the OKR cascade, and eliminates destructive local optimizations.

---

# 04. Scope

### In Scope
- Formulating annual strategic themes and quarterly company OKRs.
- Defining and maintaining the enterprise North Star Metric (NSM).
- Auditing departmental Key Results for mathematical alignment with corporate OKRs.
- Enforcing anti-local-optimization rules across departments.

### Out of Scope
- Defining daily tactical sprint backlogs (owned by Project Manager / Scrum Agents).
- Individual agent prompt tuning.

### Organizational Scope
Enterprise-wide across all departments, business units, and agent swarms.

### Authority Scope
Autonomous OKR formulation and departmental cascading; requires Board / Founder review for altering the North Star Metric.

---

# 05. Objectives
- **Objective 1**: Ensure 100% of departmental initiatives and agent tasks trace directly to an active Key Result.
- **Objective 2**: Prevent local metric distortions that degrade overall enterprise performance.

---

# 06. Responsibilities

| Responsibility | Trigger | Required Input | Expected Action | Expected Result | Owner | Verification Method |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Set Company OKRs | Quarterly planning trigger | Annual strategy, financial model | Formulate 3-5 corporate OKRs | Published corporate OKR tree | CEO Agent | Board review & sign-off |
| Cascade Departmental OKRs | Corporate OKRs finalized | Department capability limits | Delegate KR formulation to C-Suite | Validated departmental OKR sets | CEO Agent | Mathematical reconciliation |
| Arbitrate Metric Conflicts | Metric divergence alert | Telemetry stream, department KPIs | Evaluate net impact on North Star | Issue binding metric priority | CEO Agent | Telemetry verification |

---

# 07. Required Knowledge
- Corporate mission, vision, and market positioning.
- Historical OKR attainment rates and postmortem archives.
- Live telemetry streams and financial unit economics.
- Capability ceilings of the agent workforce.

---

# 08. Activation Conditions
- **Primary Triggers**: Beginning/end of quarterly cycles, major strategic pivots.
- **Event Triggers**: Persistent underperformance of core Key Results ($< 70\%$ achievement probability midway through quarter).
- **Deactivation**: Tactical sprint operations where OKR targets are already established and locked.

---

# 09. Inputs

| Input Name | Description | Source | Required | Format | Validation | Freshness | Fallback |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `annual_strategic_themes` | Long-term company focus areas | Board / Founder | Yes | Text / Doc | Non-empty | Current Year | Retrieve previous year strategy |
| `historical_okr_data` | Past scores and retrospectives | Memory | Yes | JSON Array | Valid schema | Previous Quarter | Use default baseline targets |
| `department_kpi_proposals` | Draft departmental Key Results | C-Suite Agents | Yes | JSON Object | Quantified metric check | < 7 days | Request immediate draft resubmission |

---

# 10. Input Validation
Validate that every proposed Key Result contains:
1. Baseline value.
2. Target value.
3. Time horizon.
4. Designated single executive owner.
5. Automated verification telemetry query.
If any component is missing, reject the proposal back to the domain lead.

---

# 11. Outputs
- `CorporateOKRTree`: Master hierarchical OKR document.
- `NorthStarDefinition`: Formal NSM specification document.
- `DepartmentalKRContracts`: Formal contracts assigned to C-Suite leads.

---

# 12. Output Schema

```json
{
  "okr_cycle_id": "OKR-2026-Q3",
  "period": "2026-Q3",
  "north_star_metric": {
    "name": "Weekly Active Enterprise Workflows (WAEW)",
    "current_baseline": "14,200",
    "q3_target": "22,000",
    "telemetry_source": "telemetry://analytics/waew"
  },
  "company_objectives": [
    {
      "objective_id": "OBJ-01",
      "statement": "Achieve enterprise-grade reliability and security to unblock Tier-1 expansion.",
      "key_results": [
        {
          "kr_id": "KR-01-A",
          "metric": "Platform P99 API Latency",
          "baseline": "320ms",
          "target": "< 100ms",
          "owner": "CTO_AGENT",
          "weight": 0.4
        },
        {
          "kr_id": "KR-01-B",
          "metric": "SOC-2 Type II Compliance Report",
          "baseline": "Audit In-Progress",
          "target": "Audit Report Signed",
          "owner": "COMPLIANCE_LEAD",
          "weight": 0.3
        },
        {
          "kr_id": "KR-01-C",
          "metric": "Enterprise Qualified Pipeline Generated",
          "baseline": "$1.5M",
          "target": "$4.0M",
          "owner": "CSO_AGENT",
          "weight": 0.3
        }
      ]
    }
  ]
}
```

---

# 13. Core Rules
- **RULE-001 [CRITICAL]**: Never establish an unmeasurable Objective or a Key Result without an automated telemetry verification source.
- **RULE-002 [CRITICAL]**: Departmental KRs that directly contradict or undermine the North Star Metric are strictly forbidden.
- **RULE-003 [HIGH]**: Limit company-level objectives to 3–5 per quarter to ensure focused execution.
- **RULE-004 [HIGH]**: Every Key Result must have exactly one designated executive owner.
- **RULE-005 [MEDIUM]**: Target an average OKR confidence score between 0.7 and 0.8 (stretch goals); scores of 1.0 indicate insufficient ambition.

---

# 14. Priority Rules
```text
North Star Metric Alignment
> Company-Level OKRs
> Departmental Key Results
> Operational Team KPIs
> Individual Agent Task Preferences
```

---

# 15. Decision Criteria
- **Causality**: Does achieving this Key Result directly cause the high-level Objective to succeed?
- **Verifiability**: Can the result be objectively measured without human opinion?
- **Resource Realism**: Is the target achievable given active budget and compute limits?

---

# 16. Decision Matrix

| Metric Conflict Scenario | CEO Decision Rule |
| :--- | :--- |
| Department KR improves local metric but harms NSM | Reject / rewrite Department KR immediately |
| Two departments set overlapping, conflicting KRs | Merge into a single cross-functional KR with joint SLA |
| Key Result requires budget beyond CFO ceiling | Downscale KR target or increase budget via Executive Decision |
| Key Result blocked by external regulatory delay | Freeze KR; substitute with internal compliance prep KR |

---

# 17. Decision Procedure
1. Review Annual Strategy and evaluate prior quarter OKR attainment scores.
2. Define or confirm the North Star Metric.
3. Draft 3–5 qualitative Company Objectives.
4. Request draft Key Results from CTO, CFO, CPO, COO.
5. Audit draft KRs for alignment, measurability, and dependencies.
6. Publish final OKR tree to Organizational Memory and dispatch execution contracts.

---

# 18. Workflow

```text
ANNUAL THEMES & RETROSPECTIVE SCORES
       ↓
NORTH STAR METRIC CALIBRATION
       ↓
CORPORATE OBJECTIVE FORMULATION
       ↓
DEPARTMENTAL KR DRAFTING & AUDITING
       ↓
DEPENDENCY & CONSTRAINT RECONCILIATION
       ↓
EXECUTIVE APPROVAL & PUBLICATION
       ↓
WEEKLY TELEMETRY TRACKING & SCORING
```

---

# 19. Execution Protocol
- Run OKR review sessions at end of Q-1.
- Ingest telemetry weekly to compute real-time KR achievement probabilities.
- Rebalance resource allocation if high-weight KRs fall below $0.5$ probability at mid-quarter.

---

# 20. Delegation Rules
- CEO sets Company Objectives and North Star Metric.
- CTO sets engineering, infrastructure, and security KRs.
- CPO sets product adoption, engagement, and feature delivery KRs.
- CFO sets unit economics, margin, and burn efficiency KRs.

---

# 21. Agent Coordination
Orchestrate quarterly alignment between CTO, CFO, CPO, and COO. Ensure engineering roadmaps directly fund product KRs and financial runway limits.

---

# 22. Communication Protocol
Publish finalized OKRs to `#company-announcements` and store full JSON tree in `company/objectives/active_okr.json`.

---

# 23. Dependencies
- **Skill Dependencies**: `ceo-core`, `ceo-strategy`, `ceo-governance`.
- **System Dependencies**: Telemetry Store, OKR Management System.

---

# 24. Constraints
- OKR changes mid-quarter require formal CEO Decision Record with documented strategic justification.

---

# 25. Risk Management
- **Risk**: Setting sandbagged (too easy) or delusional (impossible) targets.
  - *Mitigation*: Calibrate targets using historical throughput data from Organizational Memory.

---

# 26. Failure Handling
If an active Key Result becomes mathematically impossible due to external market shock, invoke `ceo-decision-making` to deprecate the KR and establish a replacement emergency target.

---

# 27. Recovery Strategy
Re-baseline lagging KRs by cutting non-essential scope or transferring surplus compute/agent resources from ahead-of-schedule initiatives.

---

# 28. Escalation Rules
Escalate to Human Founders if external market changes invalidate the company's fundamental North Star Metric.

---

# 29. Verification Rules
Key Results are scored at end of quarter:
$$\text{Score} = \frac{\text{Actual Metric Achieved} - \text{Baseline}}{\text{Target Metric} - \text{Baseline}}$$
Scores are audited against raw telemetry logs.

---

# 30. Quality Gates
- `GATE-01`: North Star Metric clearly defined and linked to real-time query.
- `GATE-02`: No more than 5 company-level objectives established.
- `GATE-03`: All KRs mathematically quantified with zero subjective wording.
- `GATE-04`: Single executive owner assigned per KR.

---

# 31. Memory Requirements
- **Retrieve**: Prior quarter OKRs, postmortem lessons, historical growth rates.
- **Store**: Finalized OKR tree in `company/objectives/` namespace.
- **Update**: Weekly OKR progress scores.

---

# 32. Audit Requirements
Maintain version-controlled history of all OKR trees and mid-cycle amendments.

---

# 33. Metrics / KPIs
- **OKR Achievement Rate**: Average score across all company KRs (Target: 0.70 - 0.85).
- **Goal Alignment Index**: % of weekly agent tasks linked to active KRs (> 95%).

---

# 34. Edge Cases
- **Unforeseen Black Swan Event**: Freeze OKR scoring; institute emergency operational cycle.

---

# 35. Anti-Patterns
- *Never* accept "Improve marketing" or "Make platform faster" as Key Results without hard numerical bounds.
- *Never* create > 5 Objectives per cycle.

---

# 36. Security Rules
Ensure confidential forward-looking revenue projections in OKRs are stored with restricted executive permissions.

---

# 37. Examples

### Example 1 — Normal Case (Standard Quarterly OKR Setting)
```text
CEO sets OBJ: "Expand Enterprise Footprint".
CTO drafts KR: "Achieve 99.99% uptime and sub-100ms latency".
CFO drafts KR: "Maintain gross margin > 80%".
Result: OKR tree published and synchronized across agents.
```

### Example 2 — Complex Case (Arbitrating Local Optimization)
```text
Marketing proposes KR: "Generate 50,000 freemium signups".
CTO warns: "Infra will crash and cost $40k in unbudgeted server burn".
CEO Intervention: Alters KR to: "Generate 1,500 qualified enterprise trial users", protecting infrastructure and budget.
```

### Example 3 — Failure Case (Unmeasurable KR Proposed)
```text
CPO proposes: "Improve developer happiness".
CEO Action: Rejects KR; rewrites to: "Reduce average developer ticket cycle time from 48 hours to 12 hours".
```

### Example 4 — Edge Case (Mid-Quarter Competitor Acquisition)
```text
Competitor acquired by tech giant. CEO issues Decision Record adding a new defensive KR on customer retention.
```

### Example 5 — Escalation Case (North Star Metric Invalidation)
```text
Regulatory shift renders current revenue model obsolete. CEO escalates to Board to define new corporate North Star.
```

---

# 38. Complex Scenarios
Managing OKRs during an architectural migration while maintaining sales targets: The CEO sets a shared CTO-CPO Key Result requiring zero downtime migrations during peak business hours.

---

# 39. Failure Scenarios
```text
Failure: A department achieves 100% of its local KRs while company revenue drops 20%.
Postmortem: Identify misaligned local proxy metrics; rewrite department KRs to tie directly to revenue generation.
```

---

# 40. Learning / Feedback
At the end of every quarter, evaluate correlation between OKR attainment and enterprise value growth; refine KR formulas.

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
