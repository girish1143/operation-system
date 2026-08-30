---
skill_id: ceo-prioritization
name: CEO Enterprise Prioritization, Priority Queue, and Resource Rationing
version: 1.0.0
agent: CEO
category: prioritization
priority: critical
status: active

dependencies:
  - ceo-core
  - ceo-objectives
  - ceo-decision-making

related_skills:
  - ceo-strategy
  - ceo-planning
  - ceo-resource-allocation
  - ceo-task-decomposition

activation_triggers:
  - resource contention
  - backlog grooming
  - emergency incident (P0)
  - initiative prioritization review

authority_level: strategic
review_frequency: weekly
---

# 01. Metadata
- **Skill ID**: `ceo-prioritization`
- **Name**: CEO Enterprise Prioritization, Priority Queue, and Resource Rationing
- **Version**: `1.0.0`
- **Agent**: `CEO`
- **Category**: `prioritization`
- **Priority**: `critical`
- **Status**: `active`
- **Authority Level**: `strategic`

---

# 02. Skill Identity
- **Role of the Skill**: Governs the enterprise priority queue (P0 to P4), scores competing initiatives via Expected Enterprise Value (EEV), enforces the Accelerate/Delay/Kill triage cycle, and rations organizational attention.
- **Organizational Importance**: Eliminates organizational thrash and ensures scarce capital, compute, and talent focus exclusively on high-leverage outcomes.
- **Primary Users**: CEO Agent Runtime.
- **Dependent Agents**: All C-Suite leads and Project Managers.
- **Related Skills**: `ceo-core`, `ceo-objectives`, `ceo-resource-allocation`, `ceo-task-decomposition`.

---

# 03. Purpose
Without structured prioritization, organizations suffer from priority inflation where everything is urgent, leading to fragmented execution, burned-out resources, and missed deadlines. This skill enforces strict mathematical prioritization and ruthless triage.

---

# 04. Scope

### In Scope
- Maintaining the corporate P0–P4 priority taxonomy.
- Calculating Expected Enterprise Value (EEV) for competing initiatives.
- Enforcing weekly Accelerate, Delay, or Kill decisions on active projects.
- Resolving multi-departmental priority contention.

### Out of Scope
- Micro-prioritization of individual bug tickets within a sprint (owned by Project Manager / Dev Manager).

### Organizational Scope
Enterprise-wide across all strategic initiatives, R&D projects, and departmental pipelines.

### Authority Scope
Autonomous prioritization authority up to Level 3; killing core business lines requires Level 4 Human Founder review.

---

# 05. Objectives
- **Objective 1**: Maintain a strictly ordered corporate priority queue where no more than 3 initiatives hold P1 status simultaneously.
- **Objective 2**: Eliminate low-ROI initiatives promptly through weekly Kill/Delay audits.

---

# 06. Responsibilities

| Responsibility | Trigger | Required Input | Expected Action | Expected Result | Owner | Verification Method |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Maintain Priority Queue | Weekly executive cycle | Active initiative list, telemetry | Calculate EEV; rank P0–P4 | Published Master Priority Queue | CEO Agent | Queue audit |
| Handle P0 Interrupts | P0 Incident declared | Incident severity payload | Suspend lower priorities; route resources | Resource reallocation directive | CEO Agent | Immediate dispatch log |
| Execute Kill/Delay Triage | Weekly initiative review | Milestone progress, spend data | Classify as Accelerate, Delay, or Kill | Resource reclamation | CEO Agent | Postmortem & ledger audit |

---

# 07. Required Knowledge
- Active OKRs and strategic focus areas.
- Enterprise compute capacity and cash runway limits.
- Historical initiative ROI and throughput metrics.
- P0–P4 priority SLA definitions.

---

# 08. Activation Conditions
- **Primary Triggers**: Weekly executive review, monthly planning resets.
- **Event Triggers**: P0 existential threats, resource deadlocks, compute quota exhaustion.
- **Deactivation**: Nominal sprint execution within established priority bands.

---

# 09. Inputs

| Input Name | Description | Source | Required | Format | Validation | Freshness | Fallback |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `active_initiatives_list` | All active enterprise projects | Project Manager | Yes | JSON Array | Non-empty | < 7 days | Query active task database |
| `initiative_telemetry` | Spend, velocity, blocker data | Telemetry Store | Yes | JSON Object | Valid schema | < 24 hours | Pull cached project status |
| `resource_capacity_limits` | Compute, budget, agent headcount | CFO / CTO | Yes | JSON Object | Reconciled bounds | Current week | Use standard baseline limits |

---

# 10. Input Validation
Validate that every initiative contains:
1. Expected enterprise upside ($).
2. Resource burn rate ($/mo and token quotas).
3. Strategic alignment weight (1.0 - 5.0).
If inputs lack cost or upside estimates, assign lowest priority tier (P3) until data is provided.

---

# 11. Outputs
- `MasterPriorityQueue`: Ranked P0–P4 initiative list.
- `TriageDirectives`: Explicit Accelerate, Delay, or Kill orders.

---

# 12. Output Schema

```json
{
  "queue_id": "MPQ-2026-W35",
  "effective_date": "2026-08-30",
  "priority_allocations": {
    "P0_critical_incidents": [],
    "P1_strategic_core": [
      {
        "initiative_id": "INIT-REDIS-MESH",
        "title": "High-Throughput Multi-Agent Redis Mesh",
        "eev_score": 8.45,
        "owner": "CTO_AGENT",
        "resource_share": "45%"
      },
      {
        "initiative_id": "INIT-SOC2-COMPLIANCE",
        "title": "SOC-2 Type II Audit Finalization",
        "eev_score": 7.80,
        "owner": "COMPLIANCE_LEAD",
        "resource_share": "25%"
      }
    ],
    "P2_important_operational": [
      {
        "initiative_id": "INIT-DASHBOARD-V2",
        "title": "Next.js Executive Dashboard Refresh",
        "eev_score": 5.10,
        "owner": "CPO_AGENT",
        "resource_share": "20%"
      }
    ],
    "P3_tactical_backlog": [],
    "P4_deprioritized_or_killed": [
      {
        "initiative_id": "INIT-CRYPTO-PAYMENTS",
        "action": "KILLED",
        "rationale": "Low enterprise demand; regulatory friction; resources reclaimed for SOC-2."
      }
    ]
  }
}
```

---

# 13. Core Rules
- **RULE-001 [CRITICAL]**: P0 incidents immediately supersede all active work across all agents.
- **RULE-002 [CRITICAL]**: No more than THREE initiatives may hold P1 status at any single point in time.
- **RULE-003 [HIGH]**: Prioritization is governed strictly by Expected Enterprise Value (EEV), not by the loudest request.
- **RULE-004 [HIGH]**: Initiatives that fail hypothesis gates for 2 consecutive review cycles must be Delayed or Killed.
- **RULE-005 [MEDIUM]**: Reclaim 100% of compute and agent resources from killed initiatives within 1 hour.

---

# 14. Priority Rules
```text
P0: Existential Threat / Critical Outage (SLA: Immediate)
> P1: Strategic Core Initiatives (Max 3 active)
> P2: High-Value Departmental Operations
> P3: Tactical Backlog & Enhancements
> P4: Deprioritized / Killed (Zero Resource Allocation)
```

---

# 15. Decision Criteria
- **Expected Enterprise Value (EEV)** Formula:
$$\text{EEV} = \frac{(\text{Strategic Weight} \times 0.3) + (\text{Revenue Impact} \times 0.3) + (\text{Customer Retention} \times 0.2) + (\text{Moat Defensibility} \times 0.2)}{\text{Resource Cost} \times \text{Execution Risk} \times \text{Opportunity Cost}}$$

---

# 16. Decision Matrix

| Initiative State | EEV Trend | Action |
| :--- | :--- | :--- |
| Exceeding milestone; high ROI | Rising ($> 7.0$) | **ACCELERATE**: Allocate surplus compute/agents |
| Blocked by external dependency | Neutral | **DELAY**: Freeze burn; reassign active agents |
| Underperforming; low strategic ROI | Falling ($< 3.0$) | **KILL**: Terminate project; commit retro to memory |
| P0 Incident triggered | N/A | **INTERRUPT**: Divert all necessary agents to fix |

---

# 17. Decision Procedure
1. Ingest all active and proposed initiatives.
2. Validate cost, risk, and upside data.
3. Compute EEV scores for all items.
4. Apply priority ceiling constraints (max 3 P1s).
5. Categorize into P0–P4 tiers and Accelerate/Delay/Kill actions.
6. Publish Master Priority Queue and dispatch resource reallocations.

---

# 18. Workflow

```text
INITIATIVE PROPOSALS & ACTIVE PROJECTS
       ↓
DATA VALIDATION & EEV CALCULATION
       ↓
CAPACITY & CEILING CONSTRAINT CHECK (MAX 3 P1s)
       ↓
ACCELERATE / DELAY / KILL TRIAGE
       ↓
MASTER PRIORITY QUEUE GENERATION
       ↓
RESOURCE REALLOCATION DIRECTIVES DISPATCHED
       ↓
TELEMETRY MONITORING & WEEKLY RE-SCORE
```

---

# 19. Execution Protocol
- Run weekly on Monday at 09:00 UTC.
- Publish updated queue to `company/objectives/master_priority_queue.json`.
- Notify all agents of priority changes immediately.

---

# 20. Delegation Rules
- CEO retains authority over P0, P1, and Kill decisions.
- Delegate P2 and P3 scheduling to Department Leads (CTO/CPO/CFO).
- Delegate sprint-level ticket ordering to Project Managers.

---

# 21. Agent Coordination
Coordinate with CTO and CFO to ensure compute budgets and financial cash flows match the Master Priority Queue allocations.

---

# 22. Communication Protocol
Publish Master Priority Queue via structured JSON event: `EVENT: PRIORITY_QUEUE_UPDATED`.

---

# 23. Dependencies
- **Skill Dependencies**: `ceo-core`, `ceo-objectives`, `ceo-decision-making`.
- **System Dependencies**: Project Tracker, Resource Manager.

---

# 24. Constraints
- Cannot allocate $> 80\%$ of total company capacity to a single initiative without Founder approval.

---

# 25. Risk Management
- **Risk**: Priority thrashing (changing priorities daily causing restart overhead).
  - *Mitigation*: P1 priorities locked for minimum 2-week intervals unless a P0 incident occurs.

---

# 26. Failure Handling
If priority contention causes an agent deadlock, CEO steps in directly and issues a binding priority determination within 15 minutes.

---

# 27. Recovery Strategy
In the event of queue corruption, revert to the last approved weekly Master Priority Queue snapshot.

---

# 28. Escalation Rules
Escalate to Human Founders if a P1 initiative requires killing a core customer-facing feature with contractual revenue commitments.

---

# 29. Verification Rules
Verification requires auditing that active agent compute consumption matches the published priority percentage allocations ($\pm 5\%$).

---

# 30. Quality Gates
- `GATE-01`: EEV score calculated for every initiative.
- `GATE-02`: No more than 3 P1 initiatives active.
- `GATE-03`: Zero resources allocated to P4 items.
- `GATE-04`: Clear rationale provided for every Killed initiative.

---

# 31. Memory Requirements
- **Retrieve**: Past priority queues, project retrospectives.
- **Store**: `MasterPriorityQueue` in `company/objectives/` namespace.
- **Update**: EEV historical tracking models.

---

# 32. Audit Requirements
Log all priority reallocations and project terminations with timestamp and justification.

---

# 33. Metrics / KPIs
- **P1 Focus Ratio**: % of total agent compute dedicated to P1 initiatives (> 70%).
- **Queue Churn Rate**: Frequency of mid-cycle priority changes (< 1 per month).

---

# 34. Edge Cases
- **Simultaneous P0 and Board Review**: P0 incident resolution takes complete precedence over reporting.

---

# 35. Anti-Patterns
- *Never* label all tasks as "Urgent / P1".
- *Never* hesitate to kill a failing initiative due to sunk costs.

---

# 36. Security Rules
Do not disclose confidential P0 security remediation details on public agent channels.

---

# 37. Examples

### Example 1 — Normal Case (Enforcing 3 P1 Limit)
```text
Situation: Team proposes 5 P1 initiatives.
CEO Action: Ranks by EEV; demotes bottom 2 to P2; maintains focus on top 3.
```

### Example 2 — Complex Case (Killing a Failing Initiative)
```text
Situation: Project X spent $30k with 0 customer conversion over 3 months.
CEO Action: Issues Kill directive; moves engineers to P1 Redis Mesh; logs postmortem.
```

### Example 3 — Failure Case (Agent Working on P4 Backlog)
```text
Detection: Coder Agent active on P4 cosmetic task during P1 crunch.
Action: CEO halts task; reassigns agent to P1 test suite immediately.
```

### Example 4 — Edge Case (External API Outage)
```text
Event: Primary LLM API goes down.
Action: Elevate fallback model integration to P0; freeze feature work until resolved.
```

### Example 5 — Escalation Case (Killing Strategic Partner Feature)
```text
Action: Partner initiative fails viability; CEO compiles risk assessment and escalates to Founders before contract termination.
```

---

# 38. Complex Scenarios
When sales brings a massive deal demanding a custom feature that distracts from core architecture: The CEO calculates EEV, determines the custom feature destroys long-term enterprise value, and rejects the distraction, keeping engineering focused on the platform moat.

---

# 39. Failure Scenarios
```text
Failure: Priority thrashing caused engineering output to drop 40%.
Postmortem: Establish 2-week priority lock rule; prohibit mid-sprint priority changes without CEO Decision Record.
```

---

# 40. Learning / Feedback
Review quarterly project outcomes; compare initial EEV projections against realized business impact to improve scoring formulas.

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
