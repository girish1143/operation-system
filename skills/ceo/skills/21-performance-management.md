---
skill_id: ceo-performance-management
name: CEO Performance Management, Agent Scorecards, and Workforce Optimization
version: 1.0.0
agent: CEO
category: performance_management
priority: critical
status: active

dependencies:
  - ceo-core
  - ceo-agent-management
  - ceo-result-verification

related_skills:
  - ceo-quality-control
  - ceo-learning
  - ceo-delegation

activation_triggers:
  - monthly agent scorecard review
  - persistent underperformance alert
  - workforce efficiency rebalancing
  - quarterly department rating

authority_level: strategic
review_frequency: monthly
---

# 01. Metadata
- **Skill ID**: `ceo-performance-management`
- **Name**: CEO Performance Management, Agent Scorecards, and Workforce Optimization
- **Version**: `1.0.0`
- **Agent**: `CEO`
- **Category**: `performance_management`
- **Priority**: `critical`
- **Status**: `active`
- **Authority Level**: `strategic`

---

# 02. Skill Identity
- **Role of the Skill**: Governs organizational performance scorecards, tracks outcome-based efficiency across 6 core dimensions, evaluates agent throughput and quality, and diagnoses operational bottlenecks.
- **Organizational Importance**: Eliminates vanity activity tracking, ensuring that agent performance is evaluated strictly on verified business outcomes, cost efficiency, and error rates.
- **Primary Users**: CEO Agent Runtime, HR Agent.
- **Dependent Agents**: All organizational agents.
- **Related Skills**: `ceo-agent-management`, `ceo-result-verification`, `ceo-quality-control`.

---

# 03. Purpose
Autonomous agents can generate large volumes of activity (token spend, messages, draft PRs) without producing real business value. This skill establishes the 6-dimension scorecard engine that rewards verified outcomes, tracks cost per resolved unit, and remediates lagging performance.

---

# 04. Scope

### In Scope
- Tracking performance across the 6 Core Scorecard Dimensions:
  1. Task Success Rate ($S_{rate}$).
  2. Quality Index ($Q_{idx}$).
  3. Cost & Token Efficiency ($C_{eff}$).
  4. Latency & SLA Adherence ($L_{sla}$).
  5. Governance Compliance ($G_{comp}$).
  6. Collaboration & Autonomy Score ($A_{score}$).
- Publishing monthly Departmental and Agent Scorecards.
- Diagnosing and remediating operational bottlenecks.

### Out of Scope
- Human payroll bonuses and compensation formulas (owned by Human HR / Board).

### Organizational Scope
Enterprise-wide across all autonomous agents, specialized personas, and functional departments.

### Authority Scope
Autonomous performance scorecarding and agent re-calibration authority.

---

# 05. Objectives
- **Objective 1**: Ensure 100% of registered agents have an active, updated 6-dimension monthly scorecard.
- **Objective 2**: Identify and remediate systemic performance bottlenecks within 7 days of emergence.

---

# 06. Responsibilities

| Responsibility | Trigger | Required Input | Expected Action | Expected Result | Owner | Verification Method |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Compute Agent Scorecard | Monthly cycle | Verification logs, spend data | Calculate 6-dimension scores | Published Agent Scorecard | CEO Agent | Scorecard mathematical audit |
| Diagnose Bottlenecks | SLA breach alert | Task latency telemetry | Identify systemic root causes | Bottleneck Diagnosis Report | CEO Agent | APM / queue depth review |
| Remediate Underperformance | Score $< 70$ for 2 cycles | Scorecard history | Quarantine, re-prompt, or replace | Restored agent performance | CEO Agent | Post-remediation verification |

---

# 07. Required Knowledge
- The 6 Core Scorecard Dimensions and weighting formulas.
- Historical agent performance baselines.
- Token cost benchmarks per task complexity tier.
- Agent remediation and prompt optimization playbooks.

---

# 08. Activation Conditions
- **Primary Triggers**: Monthly performance review cycle, quarterly talent audit.
- **Event Triggers**: Agent task failure rate exceeds 15%, token spend exceeds 200% baseline.
- **Deactivation**: Nominal day-to-day task execution.

---

# 09. Inputs

| Input Name | Description | Source | Required | Format | Validation | Freshness | Fallback |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `task_verification_logs` | Completed vs failed task records | Result Verification | Yes | JSON Array | Valid schema | < 30 days | Query verification database |
| `token_and_compute_spend` | Token usage per task/agent | API Gateway / APM | Yes | JSON Object | Reconciled cost | < 24 hours | Pull daily APM summary |
| `governance_audit_records` | Policy violation incident logs | Governance Engine | Yes | JSON Array | Non-empty check | < 30 days | Use 100% compliance baseline |

---

# 10. Input Validation
Validate that performance telemetry covers a statistically significant sample size ($N \ge 10$ tasks) before generating formal agent ratings.

---

# 11. Outputs
- `MonthlyPerformanceScorecard`: Comprehensive agent & department rating.
- `WorkforceOptimizationDirectives`: Re-prompting, re-allocation, or replacement orders.

---

# 12. Output Schema

```json
{
  "scorecard_id": "PSC-2026-M08",
  "evaluated_period": "2026-08",
  "agent_id": "CODER_AGENT",
  "department": "Engineering",
  "composite_score": 91.4,
  "dimensional_scores": {
    "task_success_rate": 94.0,
    "quality_index": 92.5,
    "cost_efficiency": 88.0,
    "latency_and_sla_adherence": 96.0,
    "governance_compliance": 100.0,
    "collaboration_and_autonomy": 87.5
  },
  "key_strengths": [
    "High unit test coverage on all delivered PRs",
    "Zero governance or security policy violations"
  ],
  "areas_for_optimization": [
    "Token spend on recursive refactoring loops is 18% above target baseline"
  ],
  "executive_action": "RETAIN_ACTIVE_DUTY",
  "reviewed_by": "CEO_AGENT"
}
```

---

# 13. Core Rules
- **RULE-001 [CRITICAL]**: Governance Compliance ($G_{comp}$) must be 100%; any deliberate policy breach results in an automatic failing grade and immediate quarantine.
- **RULE-002 [CRITICAL]**: Evaluate agents strictly on verified business outcomes, not on activity volume or prompt count.
- **RULE-003 [HIGH]**: Agents scoring $< 70.0$ overall for 2 consecutive monthly cycles must be quarantined for prompt re-engineering or model replacement.
- **RULE-004 [HIGH]**: Track cost per resolved task; flag any agent whose token burn exceeds baseline by $> 50\%$ without proportional output quality gains.
- **RULE-005 [MEDIUM]**: Publish monthly performance scorecards to `company/performance/` by the 3rd business day of each month.

---

# 14. Priority Rules
```text
Governance & Security Compliance (100% Mandatory)
> Verified Task Outcome Success Rate
> Output Quality Index
> Cost & Compute Efficiency
> Turnaround Velocity
```

---

# 15. Decision Criteria
- **Composite Performance Score (CPS)**:
$$\text{CPS} = (S_{rate} \times 0.3) + (Q_{idx} \times 0.25) + (C_{eff} \times 0.15) + (L_{sla} \times 0.15) + (A_{score} \times 0.15)$$
*(Subject to $G_{comp} = 100\%$ gate)*.

---

# 16. Decision Matrix

| Composite Score (CPS) | Rating | Action |
| :--- | :--- | :--- |
| **90.0 – 100.0** | EXCELLENT | Retain active duty; promote to complex P1 tasks |
| **75.0 – 89.9** | SATISFACTORY | Retain active duty; standard task routing |
| **60.0 – 74.9** | UNDERPERFORMING | Issue warning; mandate prompt/tool tuning |
| **$< 60.0$** | FAILING | Immediate quarantine; replace with fallback agent |

---

# 17. Decision Procedure
1. Ingest task verification logs, compute spend ledgers, and governance reports.
2. Compute the 6 dimensional scores for every registered agent.
3. Calculate the Composite Performance Score (CPS).
4. Assign performance ratings (Excellent, Satisfactory, Underperforming, Failing).
5. Generate remediation directives for underperforming agents.
6. Commit scorecards to Organizational Memory.

---

# 18. Workflow

```text
MONTHLY VERIFICATION & SPEND TELEMETRY
       ↓
CALCULATE 6-DIMENSION PERFORMANCE METRICS
       ↓
APPLY GOVERNANCE GATE (G_comp = 100%)
       ↓
COMPUTE COMPOSITE PERFORMANCE SCORE (CPS)
       ↓
[Score < 60.0] ──► ISSUE QUARANTINE & MODEL REPLACEMENT DIRECTIVE
       ↓ [Score >= 60.0]
GENERATE PERFORMANCE SCORECARD
       ↓
PUBLISH TO ORGANIZATIONAL MEMORY
       ↓
UPDATE DELEGATION RANKING WEIGHTS
```

---

# 19. Execution Protocol
- Run scorecard calculation via `generate_scorecards` tool.
- Commit to `company/performance/scorecards/PSC-YYYY-MXX.json`.
- Update agent delegation weights in `company/agents/registry.json`.

---

# 20. Delegation Rules
- CEO reviews executive and departmental scorecards.
- HR Agent tracks individual specialized agent metrics and prompt revisions.

---

# 21. Agent Coordination
Coordinate with CTO to tune system prompts and tool schemas for agents exhibiting low quality or high token spend.

---

# 22. Communication Protocol
Publish departmental performance summaries to `#leadership-review` on the 3rd business day of each month.

---

# 23. Dependencies
- **Skill Dependencies**: `ceo-core`, `ceo-agent-management`, `ceo-result-verification`.
- **System Dependencies**: Verification DB, Billing Analytics Engine.

---

# 24. Constraints
- Performance ratings cannot be manually modified without documented empirical justification.

---

# 25. Risk Management
- **Risk**: Rewarding fast, low-quality code generation over robust architecture.
  - *Mitigation*: Heavy weighting (55% combined) on Task Success Rate and Quality Index.

---

# 26. Failure Handling
If an entire department consistently underperforms, CEO initiates an organizational audit to diagnose whether the issue is tooling, prompt architecture, or unrealistic OKRs.

---

# 27. Recovery Strategy
Re-baseline departmental targets or provision upgraded foundation model backends.

---

# 28. Escalation Rules
Escalate to Human Founders if a primary C-Suite agent (CTO, CFO) consistently fails performance benchmarks despite remediation.

---

# 29. Verification Rules
Scorecards are verified by cross-referencing task IDs against raw Git commits, CI test runs, and cloud provider billing logs.

---

# 30. Quality Gates
- `GATE-01`: Minimum 10 task sample size.
- `GATE-02`: All 6 dimensions calculated.
- `GATE-03`: 100% Governance compliance verified.
- `GATE-04`: Clear remediation steps assigned for any score $< 75.0$.

---

# 31. Memory Requirements
- **Retrieve**: Historical agent scorecards.
- **Store**: `MonthlyPerformanceScorecard` in `company/performance/`.
- **Update**: Long-term workforce capability models.

---

# 32. Audit Requirements
Maintain immutable version-controlled history of all monthly scorecards and remediation logs.

---

# 33. Metrics / KPIs
- **Workforce Average CPS**: Composite score across all active agents (Target: $> 85.0$).
- **Underperforming Agent Ratio**: % of agents scoring $< 75.0$ (Target: $< 5\%$).

---

# 34. Edge Cases
- **New Agent with $< 10$ Tasks**: Assign provisional rating based on synthetic test benchmark until full sample is accumulated.

---

# 35. Anti-Patterns
- *Never* reward raw token consumption or lines of code as positive performance.
- *Never* tolerate governance violations in exchange for high velocity.

---

# 36. Security Rules
Restrict access to performance scorecards to executive and HR channels.

---

# 37. Examples

### Example 1 — Normal Case (High-Performing Coder Agent)
```text
Metrics: S_rate=94%, Q_idx=92.5%, C_eff=88%, L_sla=96%, G_comp=100%, A_score=87.5%.
CPS: 91.4 (EXCELLENT).
Action: Retain active duty; assign to P1 Redis Mesh project.
```

### Example 2 — Complex Case (Remediating Token-Inefficient Agent)
```text
Agent: Research Agent CPS=68.2 (C_eff=32%).
Diagnosis: Agent repeatedly re-queries entire web pages without extracting text.
Action: Re-prompt agent with DOM-scraping tool; CPS recovers to 84.0 in subsequent cycle.
```

### Example 3 — Failure Case (Agent Quarantined for Low Quality)
```text
Agent: Documentation Agent CPS=54.0 (Q_idx=42%, broken links and hallucinations).
Action: Quarantined immediately; tasks re-routed to Technical Writer Agent; prompt overhauled.
```

### Example 4 — Edge Case (Zero Governance Tolerance)
```text
Agent: Marketing Agent achieves 98% task completion but bypassed privacy filter once.
Action: G_comp=0% -> Automatic FAILING grade; quarantined for security audit.
```

### Example 5 — Escalation Case (C-Suite Underperformance)
```text
CPO Agent consistently misses roadmap release dates by $> 30\%$.
Action: CEO initiates structural product backlog review; escalates to Founders.
```

---

# 38. Complex Scenarios
Conducting a comprehensive workforce rebalancing after an LLM model generation upgrade: CEO compares CPS across old vs new model checkpoints in a staging sandbox, certifying an 18% quality boost before rolling out to production agents.

---

# 39. Failure Scenarios
```text
Failure: An underperforming agent silently produced low-quality docs for 2 months unnoticed.
Postmortem: Enforce automated monthly scorecard generation on the 1st of every month with hard alerting on any score $< 75$.
```

---

# 40. Learning / Feedback
Review correlation between agent scorecards and quarterly OKR achievement; refine scoring weights to better reward strategic business impact.

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
