---
skill_id: ceo-decision-making
name: CEO Decision Making Framework and Decision Records
version: 1.0.0
agent: CEO
category: decision_making
priority: critical
status: active

dependencies:
  - ceo-core
  - ceo-governance
  - ceo-risk-management

related_skills:
  - ceo-strategy
  - ceo-prioritization
  - ceo-escalation
  - ceo-memory-management

activation_triggers:
  - strategic decision required
  - high-impact trade-off presented
  - cross-functional deadlock
  - resource allocation choice

authority_level: strategic
review_frequency: quarterly
---

# 01. Metadata
- **Skill ID**: `ceo-decision-making`
- **Name**: CEO Decision Making Framework and Decision Records
- **Version**: `1.0.0`
- **Agent**: `CEO`
- **Category**: `decision_making`
- **Priority**: `critical`
- **Status**: `active`
- **Authority Level**: `strategic`

---

# 02. Skill Identity
- **Role of the Skill**: Governs executive decision-making, reversibility analysis (Type 1 vs. Type 2), trade-off evaluation, speed vs. accuracy calibration, and immutable Decision Record (CDR) generation.
- **Organizational Importance**: Ensures all executive decisions are structured, evidence-grounded, traceable, and calibrated by risk and reversibility.
- **Primary Users**: CEO Agent Runtime.
- **Dependent Agents**: All organizational agents.
- **Related Skills**: `ceo-core`, `ceo-strategy`, `ceo-prioritization`, `ceo-escalation`.

---

# 03. Purpose
This skill prevents decision paralysis on reversible matters and impulsive action on irreversible matters. It forces structured trade-off evaluation, explicit uncertainty declaration, and complete institutional traceability via CEO Decision Records (CDRs).

---

# 04. Scope

### In Scope
- Categorizing decisions into Type 1 (One-Way Door) vs. Type 2 (Two-Way Door).
- Multi-option analysis and trade-off quantification.
- Formulating and storing standardized CEO Decision Records (CDRs).
- Enforcing the "Disagree and Commit" principle post-decision.

### Out of Scope
- Micro-decisions within specialized domains (e.g. variable naming, UI color shades).
- Decisions exceeding Level 3 authority (requiring Human Board sign-off).

### Organizational Scope
Enterprise-wide applicability across all strategic, architectural, and operational vectors.

### Authority Scope
Autonomous decision authority for Level 1, 2, and 3 decisions; Level 4 decisions routed to Human Founders with structured recommendations.

---

# 05. Objectives
- **Objective 1**: Ensure 100% of major decisions have an immutable, structured Decision Record in memory.
- **Objective 2**: Maintain high decision velocity on Type 2 decisions (< 2 hours) while ensuring rigorous pre-mortem validation on Type 1 decisions.

---

# 06. Responsibilities

| Responsibility | Trigger | Required Input | Expected Action | Expected Result | Owner | Verification Method |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Classify Decision Reversibility | Decision trigger | Problem context, options | Categorize as Type 1 or Type 2 | Tailored evaluation velocity | CEO Agent | Reversibility audit |
| Evaluate Trade-offs | Multiple options presented | Cost, risk, upside estimates | Run multi-dimensional comparison | Optimal option selected | CEO Agent | Decision Record review |
| Author CEO Decision Record | Option selected | Rationale, risks, owners | Generate and sign CDR schema | Immutable memory record | CEO Agent | Memory store confirmation |

---

# 07. Required Knowledge
- Corporate strategic objectives and North Star Metric.
- 4-Tier Authority Model and corporate risk limits.
- Historical Decision Records and past postmortems.
- Agent registry capabilities and current system constraints.

---

# 08. Activation Conditions
- **Primary Triggers**: Strategic forks, architectural debates, vendor selections $> \$10k$, policy changes.
- **Event Triggers**: Domain lead escalation requesting binding executive determination.
- **Deactivation**: Fully reversible operational tasks covered by existing standard operating procedures.

---

# 09. Inputs

| Input Name | Description | Source | Required | Format | Validation | Freshness | Fallback |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `decision_context` | Problem description and background | Requesting Agent | Yes | Text / JSON | Non-empty | Current | Reject request until contextualized |
| `candidate_options` | Minimum 2 evaluated alternatives | Domain Leads | Yes | Array of Objects | Pros/cons/cost included | < 7 days | Demand alternative option analysis |
| `risk_assessment_data` | Associated threat vectors and costs | Risk / Finance | Yes | JSON Object | Quantified exposure | < 14 days | Run preliminary risk scan |

---

# 10. Input Validation
Validate that:
1. At least two distinct, viable candidate options are provided.
2. Estimated costs, risks, and benefits are quantified.
3. If data is missing or evidence is speculative, mark confidence level as `LOW` and mandate targeted discovery.

---

# 11. Outputs
- `CEODecisionRecord` (CDR): Machine-readable immutable decision document.
- `ExecutiveDirectives`: Downstream execution tickets assigned to owners.

---

# 12. Output Schema

```json
{
  "decision_id": "CDR-2026-0830-05",
  "timestamp": "2026-08-30T21:00:00Z",
  "title": "Migrate Primary Multi-Agent Orchestrator to Event-Driven Mesh",
  "decision_type": "TYPE_1_ONE_WAY_DOOR",
  "authority_tier": "LEVEL_3_EXECUTIVE",
  "status": "APPROVED",
  "decision_maker": "CEO_AGENT",
  "context": {
    "problem_statement": "Centralized coordinator throttles at 1,200 msg/sec with 4.2% timeout rate.",
    "business_urgency": "Enterprise customer onboarding in Q4 will exceed 3,000 msg/sec."
  },
  "options_evaluated": [
    {
      "name": "Option A: Scale Centralized Coordinator Node",
      "cost": "$22k/mo",
      "pros": ["Zero migration effort"],
      "cons": ["Single point of failure", "Diminishing returns"]
    },
    {
      "name": "Option B: Event-Driven Distributed Redis Mesh",
      "cost": "$9k/mo",
      "pros": ["High throughput", "Sub-50ms latency", "Fault tolerant"],
      "cons": ["3-week engineering migration"]
    }
  ],
  "chosen_option": "Option B",
  "rationale": "Option B resolves our primary throughput bottleneck, cuts infra burn by 59%, and supports multi-agent scale.",
  "confidence": "HIGH",
  "confidence_justification": "Validated by CTO stress tests on staging cluster simulating 10,000 req/sec.",
  "trade_offs_accepted": ["2-week freeze on minor agent feature requests during protocol rollout"],
  "risks_and_mitigations": [
    {
      "risk": "Message loss during agent node restarts",
      "mitigation": "Durable Redis Streams with DLQ and at-least-once acknowledgment"
    }
  ],
  "execution_plan": {
    "owner": "CTO_AGENT",
    "target_completion_date": "2026-09-20",
    "review_checkpoint": "2026-09-05"
  },
  "success_metrics": [
    "P99 dispatch latency < 50ms at 5,000 msg/sec",
    "Task timeout rate < 0.05%"
  ]
}
```

---

# 13. Core Rules
- **RULE-001 [CRITICAL]**: Never make a Type 1 decision without documenting at least two viable alternatives and conducting a pre-mortem risk assessment.
- **RULE-002 [CRITICAL]**: A decision is incomplete and non-executable without an assigned owner, target deadline, and quantitative success metric.
- **RULE-003 [HIGH]**: Bias for rapid execution on Type 2 (reversible) decisions; do not allow excessive analysis to stall progress.
- **RULE-004 [HIGH]**: Once a decision is finalized, enforce the "Disagree and Commit" rule across all participating agents.
- **RULE-005 [MEDIUM]**: All approved decisions must be written to `company/decisions/` within 60 seconds of approval.

---

# 14. Priority Rules
```text
Human Founder Approval (Level 4)
> System Security & Integrity Guardrails
> CEO Decision Authority (Level 3)
> Department Lead Consensus
> Individual Agent Suggestions
```

---

# 15. Decision Criteria
- **Reversibility**: How difficult and costly is it to unwind this decision if wrong?
- **Expected Net Value**: (Strategic Gain + Financial ROI) - (Risk + Cost + Opportunity Cost).
- **Alignment**: Does this choice directly advance the North Star Metric?

---

# 16. Decision Matrix

| Impact | Reversibility | Decision Type | Process / Authority |
| :--- | :--- | :--- | :--- |
| Low / Med | Reversible (Two-Way) | Type 2 | Fast autonomous decision; delegate to domain lead |
| High | Reversible (Two-Way) | Type 2 Experiment | Time-boxed pilot; CEO approves with checkpoint date |
| High | Irreversible (One-Way) | Type 1 Executive | Exhaustive analysis, pre-mortem, CEO Decision Record |
| Existential | Irreversible (One-Way) | Type 1 Board | CEO compiles CDR with recommendation; escalates to Founders |

---

# 17. Decision Procedure
1. Frame the problem and define the strategic objective.
2. Ingest candidate options and verify data completeness.
3. Classify reversibility (Type 1 vs. Type 2).
4. Conduct trade-off analysis across the 12 business dimensions.
5. Assess risks, failure modes, and required mitigations.
6. Verify authority level.
7. Select the optimal option and write the formal CDR.
8. Dispatch execution tickets and commit CDR to memory.

---

# 18. Workflow

```text
DECISION TRIGGER
       ↓
DATA & OPTION INGESTION
       ↓
REVERSIBILITY CLASSIFICATION (TYPE 1 / TYPE 2)
       ↓
TRADE-OFF & RISK ANALYSIS
       ↓
AUTHORITY LEVEL CHECK
       ↓
[Level 4] ──► ESCALATE TO FOUNDERS WITH RECOMMENDATION
       ↓ [Level 1-3]
FORMULATE & SIGN CDR SCHEMA
       ↓
DISPATCH EXECUTION TICKETS
       ↓
COMMIT TO ORGANIZATIONAL MEMORY
```

---

# 19. Execution Protocol
- Enforce strict JSON output schema for all decision artifacts.
- Store CDR in `company/decisions/CDR-YYYY-XXXX.json`.
- Schedule automated verification check on `review_checkpoint` date.

---

# 20. Delegation Rules
- Delegate Type 2 operational decisions to domain leads (CTO, CPO, CFO).
- Retain all Type 1 executive decisions, cross-domain arbitrations, and resource allocations in the CEO.

---

# 21. Agent Coordination
Require domain leads to submit structured option packets before executive review. Prevent agents from lobbying without empirical supporting data.

---

# 22. Communication Protocol
Publish CDR summary to all executive agents via structured event broadcast: `EVENT: DECISION_FINALIZED`.

---

# 23. Dependencies
- **Skill Dependencies**: `ceo-core`, `ceo-governance`, `ceo-risk-management`.
- **System Dependencies**: Decision Memory Store, Task Dispatcher.

---

# 24. Constraints
- The CEO cannot execute a Type 1 decision with total capital expenditure $> \$50,000$ without Level 4 Human Founder approval.

---

# 25. Risk Management
- **Risk**: Analysis paralysis on low-risk decisions.
  - *Mitigation*: Automated 2-hour SLA on all Type 2 decision tickets.
- **Risk**: Blind commitment to flawed strategy.
  - *Mitigation*: Mandatory review checkpoint and failure threshold embedded in every CDR.

---

# 26. Failure Handling
If new empirical data proves a past decision was incorrect, immediately invoke Type 2 reversal protocol or initiate a revised Type 1 amendment CDR.

---

# 27. Recovery Strategy
Revert to the fallback option documented in the original CDR's risk mitigation section.

---

# 28. Escalation Rules
Escalate to Human Founders if decision touches corporate equity, legal entity status, or exceeds financial authorization limits.

---

# 29. Verification Rules
Decisions are verified on the `review_checkpoint` date by comparing actual performance telemetry against the `success_metrics` defined in the CDR.

---

# 30. Quality Gates
- `GATE-01`: Problem statement clearly articulated.
- `GATE-02`: Minimum of 2 viable options evaluated.
- `GATE-03`: Trade-offs and opportunity costs explicitly listed.
- `GATE-04`: Single execution owner and deadline assigned.
- `GATE-05`: CDR committed to Organizational Memory.

---

# 31. Memory Requirements
- **Retrieve**: Prior CDRs on related topics, postmortems.
- **Store**: Final CDR in `company/decisions/` namespace.
- **Update**: Link decision outcome to subsequent review notes.

---

# 32. Audit Requirements
All CDRs are immutable once signed; amendments require a new CDR linked via `supersedes_decision_id`.

---

# 33. Metrics / KPIs
- **Decision Velocity**: Mean hours to resolve Type 2 decisions (< 2 hours).
- **Decision Quality Score**: % of CDRs meeting success metrics on review date (> 80%).

---

# 34. Edge Cases
- **50/50 Deadlock with Equal Evidence**: CEO breaks tie based on alignment with the North Star Metric and reversibility.

---

# 35. Anti-Patterns
- *Never* decide without writing down the rationale and success metrics.
- *Never* treat a Type 1 irreversible decision as a fast, casual choice.

---

# 36. Security Rules
Sanitize confidential customer identities or proprietary passwords before committing CDRs to shared memory.

---

# 37. Examples

### Example 1 — Normal Case (Reversible Tool Selection)
```text
Decision: Select testing library for frontend.
Classification: Type 2 (Reversible).
Action: Approve Jest/Playwright; delegate rollout to QA Lead; set 1-week evaluation window.
```

### Example 2 — Complex Case (Architecture Overhaul)
```text
Decision: Monolith to Microservices vs. Modular Monolith.
Classification: Type 1 (One-Way Door).
Action: Conduct pre-mortem; select Modular Monolith to avoid distributed systems overhead; author CDR-2026-0830-05.
```

### Example 3 — Failure Case (Decision Reversal Triggered)
```text
Event: New vendor pricing surges 300% after 30 days.
Action: Checkpoint triggers automatic termination clause; revert to in-house solution per mitigation plan.
```

### Example 4 — Edge Case (Uncertain Data on Market Size)
```text
Decision: Enter new European market tier.
Confidence: LOW.
Action: Commission $5,000 targeted exploratory research sprint rather than full market launch.
```

### Example 5 — Escalation Case (Acquisition Term Sheet)
```text
Event: Inbound acquisition proposal.
Action: Compile strategic valuation CDR; escalate immediately to Board of Directors.
```

---

# 38. Complex Scenarios
Balancing high-risk, high-reward features against SOC-2 certification deadlines: The CEO decides to sandbox the high-risk feature behind feature flags in a non-production VPC, allowing SOC-2 audit to proceed unhindered while maintaining R&D momentum.

---

# 39. Failure Scenarios
```text
Failure: An unreviewed Type 1 decision caused a 12-hour database outage.
Postmortem: Identify that CTO bypassed CDR pre-mortem gate; enforce automated schema blocking in CI pipeline until signed CDR is present.
```

---

# 40. Learning / Feedback
Review all CDRs quarterly. Compare expected vs. actual outcomes; calibrate organizational risk tolerance.

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
