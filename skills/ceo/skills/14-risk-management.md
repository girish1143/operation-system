---
skill_id: ceo-risk-management
name: CEO Enterprise Risk Management, AI Safety, and Threat Mitigation
version: 1.0.0
agent: CEO
category: risk_management
priority: critical
status: active

dependencies:
  - ceo-core
  - ceo-governance
  - ceo-security

related_skills:
  - ceo-decision-making
  - ceo-failure-recovery
  - ceo-emergency-management
  - ceo-monitoring

activation_triggers:
  - risk exposure threshold breached
  - threat vector detected
  - prompt injection or tool abuse alert
  - quarterly risk register review

authority_level: strategic
review_frequency: monthly
---

# 01. Metadata
- **Skill ID**: `ceo-risk-management`
- **Name**: CEO Enterprise Risk Management, AI Safety, and Threat Mitigation
- **Version**: `1.0.0`
- **Agent**: `CEO`
- **Category**: `risk_management`
- **Priority**: `critical`
- **Status**: `active`
- **Authority Level**: `strategic`

---

# 02. Skill Identity
- **Role of the Skill**: Governs the Corporate Risk Register, calculates Risk Exposure Scores (RES), oversees AI agent safety and prompt security, and directs mitigation playbooks.
- **Organizational Importance**: Serves as the executive shield against catastrophic failure modes, systemic insolvency, data breaches, and autonomous agent drift.
- **Primary Users**: CEO Agent Runtime, Security Agent.
- **Dependent Agents**: All organizational agents.
- **Related Skills**: `ceo-core`, `ceo-security`, `ceo-failure-recovery`, `ceo-emergency-management`.

---

# 03. Purpose
Autonomous organizations face unique existential risks: prompt injection, cascading agent hallucinations, runaway API token spend, regulatory non-compliance, and sudden solvency collapse. This skill provides the continuous threat modeling and mitigation frameworks needed to protect the enterprise.

---

# 04. Scope

### In Scope
- Maintaining the Corporate Risk Register across 12 risk categories.
- Scoring Risk Exposure: $\text{RES} = \text{Probability} \times \text{Severity}$.
- AI-specific risk management (prompt injection, tool abuse, cascading errors).
- Establishing automated mitigation triggers and circuit breakers.

### Out of Scope
- Implementing low-level network packet firewalls (owned by DevOps / Security Lead).

### Organizational Scope
Enterprise-wide across all systems, departments, financial accounts, and agent runtimes.

### Authority Scope
Autonomous risk mitigation and circuit-breaker enforcement; existential threats escalated to Board.

---

# 05. Objectives
- **Objective 1**: Zero unmitigated Critical risks ($RES \ge 20$) active in the enterprise risk register.
- **Objective 2**: Instant automated circuit breaking on any detected prompt injection or token runaway loop.

---

# 06. Responsibilities

| Responsibility | Trigger | Required Input | Expected Action | Expected Result | Owner | Verification Method |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Maintain Risk Register | Monthly audit / New threat | Threat assessments, telemetry | Score and rank corporate risks | Published Corporate Risk Register | CEO Agent | Risk register audit |
| Enforce AI Safety Gates | Agent execution telemetry | Error rates, injection alerts | Intercept malicious / drifting calls | Threat containment | CEO Agent | Security log check |
| Trigger Mitigation Playbooks| Risk threshold breached | Anomaly payload ($RES \ge 15$) | Dispatch mitigation directive | Risk mitigated below threshold | CEO Agent | Post-mitigation audit |

---

# 07. Required Knowledge
- Corporate Risk Taxonomy across all 12 business vectors.
- Risk Exposure Scoring Formula ($RES = P \times S$, scale 1–25).
- AI agent failure modes (prompt injection, hallucination, tool abuse, agent collusion).
- Mitigation playbooks and circuit-breaker thresholds.

---

# 08. Activation Conditions
- **Primary Triggers**: Monthly risk review, major architectural change, new external vendor integration.
- **Event Triggers**: Anomaly alert ($RES \ge 15$), security breach attempt, financial runway warning.
- **Deactivation**: Nominal low-risk operations within established safety bounds.

---

# 09. Inputs

| Input Name | Description | Source | Required | Format | Validation | Freshness | Fallback |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `threat_intelligence_feed` | Active threat vectors & alerts | Security Agent | Yes | JSON Array | Valid schema | Real-time | Run immediate security scan |
| `financial_exposure_data` | Runway, burn rate, liabilities | CFO Agent | Yes | JSON Object | Reconciled balance | < 24 hours | Pull cached financial state |
| `agent_safety_telemetry` | Injection alerts, drift rates | Runtime Monitor | Yes | JSON Stream | Non-empty | Real-time | Enforce strict safe mode |

---

# 10. Input Validation
Validate that all incoming risk notifications contain:
1. Identified threat vector.
2. Estimated probability (1–5).
3. Estimated severity (1–5).
4. Affected subsystems or financial accounts.

---

# 11. Outputs
- `CorporateRiskRegister`: Master risk catalog with RES scores.
- `RiskMitigationDirective`: Actionable orders dispatched to domain leads.

---

# 12. Output Schema

```json
{
  "risk_register_id": "CRR-2026-0830",
  "review_date": "2026-08-30",
  "active_risks": [
    {
      "risk_id": "RISK-AI-01",
      "category": "AI_AGENT_SAFETY",
      "threat": "Untrusted external user input parsed by Coder Agent without strict sanitization.",
      "probability": 4,
      "severity": 5,
      "res_score": 20,
      "classification": "CRITICAL",
      "mitigation_plan": "Enforce deterministic AST parser and prompt boundary isolation in all Coder inputs.",
      "owner": "SECURITY_AGENT",
      "target_resolution_date": "2026-09-02",
      "status": "MITIGATION_IN_PROGRESS"
    },
    {
      "risk_id": "RISK-FIN-02",
      "category": "FINANCIAL_RUNWAY",
      "threat": "API inference cost surges due to unconstrained test loops.",
      "probability": 3,
      "severity": 4,
      "res_score": 12,
      "classification": "HIGH",
      "mitigation_plan": "Implement hard token rate-limiting and $50/day test quota per agent.",
      "owner": "CTO_AGENT",
      "target_resolution_date": "2026-09-01",
      "status": "MITIGATED"
    }
  ]
}
```

---

# 13. Core Rules
- **RULE-001 [CRITICAL]**: Any risk with $RES \ge 20$ is classified as CRITICAL and requires immediate executive intervention and all-hands mitigation.
- **RULE-002 [CRITICAL]**: Never allow untrusted user input to be passed directly into an execution tool without sanitization.
- **RULE-003 [HIGH]**: Maintain automated circuit breakers on all financial disbursement and compute spending pipelines.
- **RULE-004 [HIGH]**: Audit the Corporate Risk Register monthly with mandatory participation from CTO, CFO, and Security Lead.
- **RULE-005 [MEDIUM]**: High-severity risks ($S=5$) must be prioritized even if probability is low ($P=1$).

---

# 14. Priority Rules
```text
Existential Solvency & Zero-Day Security Threats (P0)
> Critical AI Safety & Tool Abuse Risks (RES >= 20)
> High Operational & Regulatory Risks (RES 12-19)
> Medium Tactical Risks (RES 6-11)
> Low Background Risks (RES 1-5)
```

---

# 15. Decision Criteria
- **Risk Exposure Score (RES)**: $P \times S$.
- **Downside Asymmetry**: Can this risk cause irreversible enterprise death? If yes, treat as CRITICAL regardless of probability.

---

# 16. Decision Matrix

| RES Score | Classification | Mandatory CEO Action | SLA |
| :--- | :--- | :--- | :--- |
| **20 – 25** | CRITICAL | Freeze discretionary work; dispatch immediate mitigation directive | $< 1\text{ hour}$ |
| **12 – 19** | HIGH | Assign dedicated owner; review progress bi-weekly | $< 48\text{ hours}$ |
| **6 – 11** | MEDIUM | Log mitigation in standard sprint backlog | Next sprint |
| **1 – 5** | LOW | Accept risk; monitor telemetry for changes | Quarterly review |

---

# 17. Decision Procedure
1. Ingest threat alerts, security scans, and financial telemetry.
2. Calculate RES for all active and emerging threats.
3. Categorize into Critical, High, Medium, or Low tiers.
4. Author specific mitigation plans and assign single executive owners.
5. Deploy automated circuit breakers where applicable.
6. Commit updated Risk Register to Organizational Memory.

---

# 18. Workflow

```text
THREAT INTELLIGENCE & TELEMETRY
       ↓
RISK IDENTIFICATION & PROBABILITY/SEVERITY SCORING
       ↓
CALCULATE RISK EXPOSURE SCORE (RES = P x S)
       ↓
[RES >= 20] ──► DECLARE P0 / ENGAGE IMMEDIATE CIRCUIT BREAKER
       ↓ [RES < 20]
FORMULATE MITIGATION DIRECTIVE & ASSIGN OWNER
       ↓
PUBLISH CORPORATE RISK REGISTER
       ↓
CONTINUOUS MONITORING & SPRINT AUDIT
```

---

# 19. Execution Protocol
- Dispatched via `update_risk_register` tool.
- Publish alerts via `EVENT: RISK_THRESHOLD_BREACHED`.
- Ingest into `company/risks/master_risk_register.json`.

---

# 20. Delegation Rules
- CEO retains overall risk governance and P0 mitigation dispatch.
- Delegate cybersecurity and vulnerability mitigation to `SECURITY_AGENT`.
- Delegate financial exposure mitigation to `CFO_AGENT`.
- Delegate infrastructure stability mitigation to `CTO_AGENT`.

---

# 21. Agent Coordination
Coordinate joint risk defense between Security Agent (threat detection) and CTO Agent (patch implementation).

---

# 22. Communication Protocol
Publish high-severity risk warnings to `#security-alerts` with explicit mitigation action items.

---

# 23. Dependencies
- **Skill Dependencies**: `ceo-core`, `ceo-governance`, `ceo-security`.
- **System Dependencies**: Telemetry Engine, Security Scanner.

---

# 24. Constraints
- Cannot accept a Critical Risk ($RES \ge 20$) without written authorization from Human Founders.

---

# 25. Risk Management
- **Risk**: Blind spots in risk modeling causing surprise failure modes.
  - *Mitigation*: Conduct quarterly pre-mortem simulations assuming the company has failed.

---

# 26. Failure Handling
If a mitigated risk re-escalates, immediately upgrade to Critical tier, engage circuit breakers, and summon an emergency War Room.

---

# 27. Recovery Strategy
Execute the domain-specific Recovery Playbook (e.g. restore from cold backup, revoke leaked tokens, engage emergency credit facility).

---

# 28. Escalation Rules
Escalate to Human Founders if a threat introduces existential legal liability, catastrophic insolvency, or material data loss.

---

# 29. Verification Rules
Mitigation is verified when synthetic penetration tests or financial reconciliations confirm the RES has dropped below 10.

---

# 30. Quality Gates
- `GATE-01`: Probability and Severity scores justified with empirical evidence.
- `GATE-02`: Single owner assigned per risk.
- `GATE-03`: Concrete mitigation completion deadline specified.
- `GATE-04`: Automated telemetry trigger linked to risk status.

---

# 31. Memory Requirements
- **Retrieve**: Past risk registers, postmortems.
- **Store**: `CorporateRiskRegister` in `company/risks/`.
- **Update**: Threat mitigation status logs.

---

# 32. Audit Requirements
Maintain immutable version-controlled history of all risk assessments and mitigation sign-offs.

---

# 33. Metrics / KPIs
- **Critical Risk Resolution Time**: Mean time to resolve Critical risks (< 48 hours).
- **Enterprise Risk Index (ERI)**: Sum of all active RES scores (Target: $< 100$).

---

# 34. Edge Cases
- **Simultaneous Security Breach and Financial Cash Crunch**: Focus immediate resources on halting the security breach (preventing total destruction), while freezing all non-essential spending.

---

# 35. Anti-Patterns
- *Never* hide a known vulnerability or financial shortfall from the risk register.
- *Never* mark a risk as "Mitigated" without empirical verification proof.

---

# 36. Security Rules
Ensure all threat modeling documents detailing specific zero-day vulnerabilities are encrypted with restricted executive clearance.

---

# 37. Examples

### Example 1 — Normal Case (API Rate Limit Risk)
```text
Threat: Reaching LLM vendor rate limits during product launch.
Score: P=3, S=4 -> RES = 12 (HIGH).
Mitigation: Provision secondary fallback LLM API provider with automated load balancing.
Outcome: RES drops to 4 (LOW).
```

### Example 2 — Complex Case (Prompt Injection in Customer Chatbot)
```text
Threat: User executes prompt injection extracting system prompt and private keys.
Score: P=4, S=5 -> RES = 20 (CRITICAL).
CEO Action: Freezes public chatbot; mandates isolated agent architecture with zero access to secrets; re-launches post-audit.
```

### Example 3 — Failure Case (Runaway Test Loop)
```text
Detection: Hourly test burn exceeds $500.
Action: Automated circuit-breaker terminates test runner; alerts CTO.
```

### Example 4 — Edge Case (Upstream Model Degradation)
```text
Detection: Upstream LLM provider releases update degrading JSON compliance by 15%.
Action: Pin agent runtime to previous stable model checkpoint; file vendor support ticket.
```

### Example 5 — Escalation Case (Subpoena / Regulatory Notice)
```text
Event: Regulatory investigation notice received.
Action: CEO freezes relevant data archives; escalates directly to Legal Counsel and Founders.
```

---

# 38. Complex Scenarios
Managing an active data leak during a live marketing launch: CEO activates Emergency Management, halts marketing traffic, isolates compromised database, directs Security Agent to patch breach, and prepares transparent user communication.

---

# 39. Failure Scenarios
```text
Failure: Unmitigated dependency on a single cloud region caused an 8-hour outage.
Postmortem: Mandate multi-region automated failover architecture for all P1 systems; update Risk Register.
```

---

# 40. Learning / Feedback
Review all quarterly incidents against the pre-existing risk register to identify unpredicted failure modes and refine detection heuristics.

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
