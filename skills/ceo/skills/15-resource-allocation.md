---
skill_id: ceo-resource-allocation
name: CEO Capital, Compute, and Capacity Resource Allocation
version: 1.0.0
agent: CEO
category: resource_allocation
priority: critical
status: active

dependencies:
  - ceo-core
  - ceo-objectives
  - ceo-prioritization

related_skills:
  - ceo-strategy
  - ceo-planning
  - ceo-monitoring
  - ceo-governance

activation_triggers:
  - quarterly budget formulation
  - compute quota exhaustion
  - capital expenditure request (> $1k)
  - resource contention alert

authority_level: strategic
review_frequency: monthly
---

# 01. Metadata
- **Skill ID**: `ceo-resource-allocation`
- **Name**: CEO Capital, Compute, and Capacity Resource Allocation
- **Version**: `1.0.0`
- **Agent**: `CEO`
- **Category**: `resource_allocation`
- **Priority**: `critical`
- **Status**: `active`
- **Authority Level**: `strategic`

---

# 02. Skill Identity
- **Role of the Skill**: Governs the strategic deployment of enterprise capital, LLM compute/token quotas, agent concurrency limits, and engineering attention across competing business initiatives.
- **Organizational Importance**: Ensures the enterprise achieves maximum ROI per dollar and token spent while preserving minimum 18-month cash runway reserves.
- **Primary Users**: CEO Agent Runtime, CFO Agent.
- **Dependent Agents**: All C-Suite Leads, Project Managers.
- **Related Skills**: `ceo-core`, `ceo-prioritization`, `ceo-planning`, `ceo-governance`.

---

# 03. Purpose
Unchecked autonomous agent organizations can burn thousands of dollars in compute, launch low-ROI marketing spend, or misallocate engineering bandwidth. This skill establishes hard resource rationing, budget caps, and opportunity-cost analysis.

---

# 04. Scope

### In Scope
- Allocating capital across departments (R&D, Product, GTM, Operations).
- Setting and enforcing LLM compute/token budgets per agent role.
- Governing discretionary spending approvals ($1k to $50k).
- Auditing monthly resource burn efficiency.

### Out of Scope
- Reconciling daily general ledger journal entries (owned by Operational CFO).

### Organizational Scope
Enterprise-wide across all capital pools, API accounts, cloud infrastructure, and human payroll budgets.

### Authority Scope
Autonomous spending approval up to $\$50,000$; CapEx $> \$50,000$ or equity allocation requires Level 4 Founder approval.

---

# 05. Objectives
- **Objective 1**: Maintain minimum 18 months of verified cash runway under baseline burn.
- **Objective 2**: Ensure $> 70\%$ of total corporate compute and budget directly funds P1 strategic initiatives.

---

# 06. Responsibilities

| Responsibility | Trigger | Required Input | Expected Action | Expected Result | Owner | Verification Method |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Allocate Quarterly Budgets | Quarterly planning cycle | Financial model, OKR tree | Distribute capital & compute quotas | Master Resource Allocation Plan | CEO Agent | CFO ledger reconciliation |
| Review CapEx Requests | Spending request ($> \$1k$) | Request spec, ROI model | Evaluate against EEV & budget limits | Approval / Rejection CDR | CEO Agent | Decision Record review |
| Enforce Compute Quotas | Real-time burn telemetry | Hourly token spend | Throttle / rebalance quota usage | Protection of compute budget | CEO Agent | APM telemetry audit |

---

# 07. Required Knowledge
- Corporate balance sheet, cash reserves, and net burn rate.
- Cloud infrastructure cost models (AWS, GCP, Anthropic, OpenAI API pricing).
- Priority queue allocations (P0–P4).
- Opportunity cost evaluation frameworks.

---

# 08. Activation Conditions
- **Primary Triggers**: Quarterly budgeting, monthly financial review.
- **Event Triggers**: Department spend exceeds monthly budget by $> 10\%$, compute quota alarm triggered.
- **Deactivation**: Nominal pre-approved operational spend within established department limits.

---

# 09. Inputs

| Input Name | Description | Source | Required | Format | Validation | Freshness | Fallback |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `cash_runway_telemetry` | Cash balance, monthly burn, runway | CFO Agent | Yes | JSON Object | Reconciled balance | < 24 hours | Block large CapEx decisions |
| `department_budget_requests`| Proposed spending & compute needs | C-Suite Leads | Yes | JSON Array | Itemized list | < 14 days | Request draft re-submission |
| `realtime_compute_burn` | Live token & cloud spend | Cloud / APM | Yes | JSON Stream | Non-empty | Real-time | Pull daily cached usage |

---

# 10. Input Validation
Validate that every spending request includes:
1. Exact dollar amount requested.
2. Expected business ROI ($ or strategic metric).
3. Target departmental budget bucket.
4. Opportunity cost statement (what is delayed if approved).

---

# 11. Outputs
- `MasterResourceAllocation`: Corporate budget and quota distribution.
- `SpendingApprovalDecision`: Formal approval or rejection artifact.

---

# 12. Output Schema

```json
{
  "allocation_cycle_id": "MRA-2026-Q3",
  "total_monthly_budget_usd": 65000.00,
  "minimum_runway_target_months": 18,
  "projected_runway_months": 22.4,
  "department_allocations": {
    "engineering_and_infra": {
      "budget_usd": 35000.00,
      "token_quota_monthly": "400M tokens",
      "p1_share": "75%",
      "owner": "CTO_AGENT"
    },
    "product_and_design": {
      "budget_usd": 12000.00,
      "token_quota_monthly": "100M tokens",
      "p1_share": "70%",
      "owner": "CPO_AGENT"
    },
    "sales_and_marketing": {
      "budget_usd": 12000.00,
      "token_quota_monthly": "80M tokens",
      "p1_share": "60%",
      "owner": "CSO_AGENT"
    },
    "executive_reserve": {
      "budget_usd": 6000.00,
      "purpose": "Emergency unblocking and black-swan contingency",
      "owner": "CEO_AGENT"
    }
  }
}
```

---

# 13. Core Rules
- **RULE-001 [CRITICAL]**: Never authorize any expenditure or resource plan that reduces projected cash runway below 18 months without Level 4 Founder approval.
- **RULE-002 [CRITICAL]**: At least 70% of all allocated compute and capital must be dedicated to P1 strategic initiatives.
- **RULE-003 [HIGH]**: Autonomous spending by specialized agents is capped at $\$1,000$; spending between $\$1,000$ and $\$50,000$ requires CEO Decision Record.
- **RULE-004 [HIGH]**: Compute quotas are hard caps; exceeding a monthly token quota triggers automatic rate-limiting.
- **RULE-005 [MEDIUM]**: Rebalance unspent departmental budget surpluses at the end of every month.

---

# 14. Priority Rules
```text
Existential Runway Preservation (>= 18 Months)
> P0 Emergency Incident Spend
> P1 Strategic Initiative Funding
> Departmental Operational Maintenance
> Discretionary Experimental R&D
```

---

# 15. Decision Criteria
- **Efficiency Ratio**: $\frac{\text{Expected Enterprise Impact (\$) + Strategic Moat Gain}}{\text{Total Resource Cost (\$) + Token Overhead}}$.
- **Runway Sensitivity**: How does this spend impact runway months?

---

# 16. Decision Matrix

| Spend Request Type | Amount | Required Authority | CEO Action |
| :--- | :--- | :--- | :--- |
| Routine operational tool | $< \$1,000$ | Domain Lead (Level 2) | Auto-approved within budget |
| Major cloud compute / vendor | $\$1,000 – \$50,000$ | CEO Agent (Level 3) | Evaluate ROI & EEV; issue CDR |
| CapEx / M&A / Equity | $> \$50,000$ | Human Founder (Level 4) | Compile financial packet; escalate |
| Unbudgeted spend during cash crunch | Any | CEO Agent | Immediate rejection |

---

# 17. Decision Procedure
1. Ingest cash runway telemetry and budget proposals.
2. Verify total requested spend conforms to 18-month runway reserve.
3. Partition capital and token quotas according to P1–P4 priorities.
4. Publish `MasterResourceAllocation` to CFO and CTO.
5. Ingest real-time telemetry to enforce spending and token caps.

---

# 18. Workflow

```text
FINANCIAL RUNWAY TELEMETRY & BUDGET REQUESTS
       ↓
RUNWAY SAFETY AUDIT (>= 18 MONTHS BUFFER)
       ↓
PRIORITY WEIGHTING (70% P1 ALLOCATION)
       ↓
CAPITAL & COMPUTE QUOTA PARTITIONING
       ↓
EXECUTIVE APPROVAL & PUBLICATION
       ↓
REAL-TIME BURN MONITORING
       ↓
SURPLUS REBALANCING / CIRCUIT BREAKING
```

---

# 19. Execution Protocol
- Dispatched via `set_resource_allocation` tool.
- Track usage in `company/financials/budget_burn.json`.
- Enforce token limits at API gateway level.

---

# 20. Delegation Rules
- CEO sets corporate budget envelopes and approves requests $> \$1k$.
- CFO manages ledger reconciliations and tax administration.
- Domain Leads manage spending within their allocated departmental envelope.

---

# 21. Agent Coordination
Coordinate bi-weekly sync between CFO (cash burn) and CTO (cloud/token burn) to ensure operational spend tracks the allocation model.

---

# 22. Communication Protocol
Publish monthly allocation tables to `#finance-announcements` and transmit quota configuration directly to the API Gateway.

---

# 23. Dependencies
- **Skill Dependencies**: `ceo-core`, `ceo-objectives`, `ceo-prioritization`.
- **System Dependencies**: Cloud Billing Telemetry, Financial Ledger.

---

# 24. Constraints
- The CEO cannot take on corporate debt or line of credit without Human Founder authorization.

---

# 25. Risk Management
- **Risk**: Compute costs explode due to rogue recursive agent loops.
  - *Mitigation*: Hard billing circuit-breaker that shuts down rogue agent instances when spend exceeds 200% hourly baseline.

---

# 26. Failure Handling
If monthly spend exceeds budget mid-cycle, execute the Burn Freeze Protocol: halt all discretionary experimental compute and freeze hiring.

---

# 27. Recovery Strategy
Reclaim unused token quotas from inactive agents and reallocate to bottlenecked P1 initiatives.

---

# 28. Escalation Rules
Escalate to Human Founders if projected runway drops below 14 months under any operating scenario.

---

# 29. Verification Rules
Resource allocation is verified by reconciling bank statements and cloud provider invoices against approved budget envelopes monthly.

---

# 30. Quality Gates
- `GATE-01`: 18-month runway buffer verified.
- `GATE-02`: At least 70% budget allocated to P1 initiatives.
- `GATE-03`: Hard token quotas configured for every agent.
- `GATE-04`: Single owner assigned per budget bucket.

---

# 31. Memory Requirements
- **Retrieve**: Past monthly burn rates, vendor contracts.
- **Store**: `MasterResourceAllocation` in `company/financials/`.
- **Update**: Monthly spend vs budget variance logs.

---

# 32. Audit Requirements
Maintain immutable records of all CapEx approvals and budget amendments.

---

# 33. Metrics / KPIs
- **Budget Variance**: % difference between planned vs actual monthly spend (< 5%).
- **Capital Efficiency (Burn Multiple)**: $\frac{\text{Net Burn}}{\text{Net New ARR}}$ (Target: $< 1.2$).

---

# 34. Edge Cases
- **Sudden Emergency Compute Demand for P0 Outage**: Draw immediately from Executive Reserve without waiting for standard monthly cycle.

---

# 35. Anti-Patterns
- *Never* allocate budget based on "who asked first."
- *Never* allow runway to drop below 18 months without alerting Founders.

---

# 36. Security Rules
Restrict access to banking credentials, wire transfer tools, and cap table data to Level 4 human-authorized channels.

---

# 37. Examples

### Example 1 — Normal Case (Quarterly Budgeting)
```text
CFO projects $65k/mo revenue; runway is 24 months.
CEO allocates $35k to Engineering (75% to P1 Redis Mesh), $12k to Product, $12k to GTM, $6k to Reserve.
Outcome: Budget balanced; runway maintained.
```

### Example 2 — Complex Case (CapEx Request for GPU Cluster)
```text
CTO requests $25k for dedicated GPU instance.
CEO calculates ROI: Saves $4k/mo in API costs -> 6.25 month payback.
Decision: Approved via CDR-2026-0830-15.
```

### Example 3 — Failure Case (Marketing Exceeds Budget)
```text
Detection: Marketing ad spend exceeds monthly allocation by 30%.
Action: Automatic spending circuit-breaker pauses ad accounts; CEO issues audit directive to CMO.
```

### Example 4 — Edge Case (Token Quota Exhaustion)
```text
QA Agent runs out of token quota during sprint crunch.
Action: CEO transfers 20M tokens from unused Marketing reserve to unblock QA.
```

### Example 5 — Escalation Case (Runway Alert)
```text
Runway drops to 13.8 months due to delayed enterprise renewal.
Action: CEO initiates defensive runway playbook; escalates to Founders with capital preservation options.
```

---

# 38. Complex Scenarios
Managing resources during a market downturn: CEO reduces overall monthly spend by 25%, protects core engineering capacity, freezes non-essential tooling, and extends cash runway from 16 to 26 months.

---

# 39. Failure Scenarios
```text
Failure: Unconstrained multi-agent testing drained $12,000 in API credits over a single weekend.
Postmortem: Implement hard $200/day circuit breakers per agent in the API Gateway.
```

---

# 40. Learning / Feedback
Review monthly unit economics; refine compute and capital allocation weights based on realized revenue returns.

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
