---
skill_id: ceo-quality-control
name: CEO Quality Control, Deliverable Standards, and Definition of Done
version: 1.0.0
agent: CEO
category: quality_control
priority: critical
status: active

dependencies:
  - ceo-core
  - ceo-governance
  - ceo-task-decomposition

related_skills:
  - ceo-result-verification
  - ceo-performance-management
  - ceo-learning

activation_triggers:
  - deliverable submitted for review
  - quality gate evaluation
  - artifact rejection event
  - definition of done audit

authority_level: strategic
review_frequency: quarterly
---

# 01. Metadata
- **Skill ID**: `ceo-quality-control`
- **Name**: CEO Quality Control, Deliverable Standards, and Definition of Done
- **Version**: `1.0.0`
- **Agent**: `CEO`
- **Category**: `quality_control`
- **Priority**: `critical`
- **Status**: `active`
- **Authority Level**: `strategic`

---

# 02. Skill Identity
- **Role of the Skill**: Enforces the Five Pillars of Executive Quality, governs the Definition of Done (DoD) for all corporate artifacts, gatekeeps deliverables, and enforces structured remediation protocols on rejected work.
- **Organizational Importance**: Prevents subpar, hallucinated, incomplete, or broken deliverables from entering production, ensuring uncompromising excellence across all software, models, and docs.
- **Primary Users**: CEO Agent Runtime, QA Agent.
- **Dependent Agents**: All organizational agents.
- **Related Skills**: `ceo-result-verification`, `ceo-performance-management`, `ceo-learning`.

---

# 03. Purpose
Autonomous agents often suffer from incomplete task execution, leaving placeholder comments, broken links, or hallucinated data. This skill provides the quality gatekeeping engine that systematically rejects substandard work and forces deterministic remediation.

---

# 04. Scope

### In Scope
- Enforcing the Five Pillars of Executive Quality:
  1. Accuracy & Factual Rigor.
  2. Completeness & Coherence.
  3. Strategic & Architectural Elegance.
  4. Deterministic Reproducibility.
  5. Actionability & Executive Clarity.
- Governing the Definition of Done (DoD) across all deliverable types.
- Gatekeeping artifact promotion to production.
- Issuing structured rejection and remediation directives.

### Out of Scope
- Direct line-level unit test writing (owned by QA Agent / Coder Agent).

### Organizational Scope
Enterprise-wide applicability across all code PRs, architectural RFCs, financial models, and strategic briefs.

### Authority Scope
Autonomous quality gatekeeping and artifact rejection authority.

---

# 05. Objectives
- **Objective 1**: Zero deliverables with placeholder comments, broken links, or unverified claims promoted to production.
- **Objective 2**: 100% of rejected deliverables returned to owners with line-level structured remediation instructions within 10 minutes.

---

# 06. Responsibilities

| Responsibility | Trigger | Required Input | Expected Action | Expected Result | Owner | Verification Method |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Gatekeep Deliverables | Deliverable submitted | Artifact payload, task contract | Evaluate against 5 Quality Pillars | Pass / Reject determination | CEO Agent | Quality gate audit |
| Enforce Definition of Done | PR / Doc review | Deliverable checklist | Verify all DoD items satisfied | Certified deliverable | CEO Agent | Automated DoD checker |
| Issue Remediation Notice | Deliverable fails gate | Defect log, line citations | Author structured rejection payload | Remediated artifact submitted | CEO Agent | Re-test verification |

---

# 07. Required Knowledge
- The Five Pillars of Executive Quality.
- Master Definition of Done (DoD) standards per deliverable type (Code, Spec, Financial Model, Policy).
- Automated linting, static analysis, and test coverage thresholds.
- Structured remediation schema.

---

# 08. Activation Conditions
- **Primary Triggers**: Submission of major project deliverables, C-Suite executive reviews.
- **Event Triggers**: Automated test suite failure, quality alert from QA Agent.
- **Deactivation**: Draft work-in-progress notes within an isolated agent sandbox.

---

# 09. Inputs

| Input Name | Description | Source | Required | Format | Validation | Freshness | Fallback |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `submitted_deliverable` | Final code, doc, or model artifact | Producing Agent | Yes | Artifact URI / Text | Non-empty | Current | Reject submission |
| `task_contract_spec` | Original Task Contract | Delegation Memory | Yes | JSON Object | Valid schema | Current | Pull task contract from memory |
| `automated_test_results`| CI/CD test and coverage report | QA / CI Engine | Yes | JSON Object | Pass / Fail logs | Current | Run immediate test runner |

---

# 10. Input Validation
Validate that the submitted deliverable is accompanied by a passing CI/CD test report, verified coverage percentage, and source-checked citations before initiating executive review.

---

# 11. Outputs
- `QualityGateCertificate`: Passed review token allowing promotion.
- `QualityRejectionNotice`: Line-level remediation directive.

---

# 12. Output Schema

```json
{
  "quality_evaluation_id": "QE-2026-0830-01",
  "task_contract_id": "TC-2026-0830-01",
  "evaluated_agent": "CODER_AGENT",
  "artifact_type": "SOURCE_CODE_PR",
  "status": "REJECTED",
  "evaluated_pillars": {
    "accuracy_and_factual_rigor": "PASS",
    "completeness_and_coherence": "FAIL",
    "architectural_elegance": "PASS",
    "deterministic_reproducibility": "PASS",
    "actionability_and_clarity": "PASS"
  },
  "defects_identified": [
    {
      "file": "backend/src/core/mesh/redisStreams.ts",
      "line_number": 142,
      "defect_type": "INCOMPLETE_IMPLEMENTATION",
      "description": "Found placeholder comment: '// TODO: Implement Dead Letter Queue retry logic'.",
      "remediation_required": "Implement full DLQ exponential backoff retry handler with test coverage."
    }
  ],
  "remediation_sla_hours": 12,
  "reviewed_by": "CEO_AGENT"
}
```

---

# 13. Core Rules
- **RULE-001 [CRITICAL]**: Never approve a deliverable containing placeholder comments (`TODO`, `FIXME`, `TBD`), stubbed functions, or fake data.
- **RULE-002 [CRITICAL]**: All production code deliverables must maintain $\ge 90\%$ verified unit test coverage.
- **RULE-003 [HIGH]**: Reject deliverables immediately upon finding any single critical defect; do not perform partial approvals on broken artifacts.
- **RULE-004 [HIGH]**: Every rejection must provide line-specific citations and exact instructions on how to achieve compliance.
- **RULE-005 [MEDIUM]**: Track agent first-time pass rates to identify systemic quality deficits.

---

# 14. Priority Rules
```text
Zero-Defect Quality Standards
> Definition of Done Enforcement
> Five Pillars Compliance
> Delivery Schedule Pressure
```

---

# 15. Decision Criteria
- **Completeness**: Are all edge cases, error states, and retry handlers fully implemented?
- **Factual Accuracy**: Are all claims, formulas, and data models verifiable against ground truth?

---

# 16. Decision Matrix

| Deliverable Defect | Severity | Action |
| :--- | :--- | :--- |
| Placeholder comment / stubbed code | High | **REJECT**: Issue QualityRejectionNotice; enforce remediation |
| Test coverage $< 90\%$ | Medium | **REJECT**: Mandate additional test cases before merge |
| Markdown doc with broken links | Low | **REJECT**: Require link validation sweep |
| All 5 Pillars and DoD satisfied | Pass | **APPROVE**: Issue QualityGateCertificate; allow promotion |

---

# 17. Decision Procedure
1. Ingest submitted deliverable and associated Task Contract.
2. Run automated static checks (placeholders, linting, test coverage).
3. Evaluate deliverable against the Five Pillars of Executive Quality.
4. If defects are found, generate `QualityRejectionNotice` with line citations.
5. If clean, generate `QualityGateCertificate` and forward to `ceo-result-verification`.

---

# 18. Workflow

```text
DELIVERABLE SUBMITTED
       ↓
AUTOMATED STATIC AUDIT (LINT, COVERAGE, PLACEHOLDERS)
       ↓
FIVE PILLARS OF EXECUTIVE QUALITY EVALUATION
       ↓
DEFINITION OF DONE (DoD) CHECKLIST VERIFICATION
       ↓
[Defects Found] ──► ISSUE QUALITY REJECTION NOTICE & REMEDIATION SLA
       ↓ [Zero Defects]
ISSUE QUALITY GATE CERTIFICATE
       ↓
FORWARD TO RESULT VERIFICATION ENGINE
```

---

# 19. Execution Protocol
- Run audit via `evaluate_quality_gate` tool.
- Publish certificate to `company/quality/certificates/`.
- Log rejections in `company/quality/rejections/`.

---

# 20. Delegation Rules
- CEO sets quality standards and gatekeeps executive deliverables.
- QA Agent executes automated test suites and regression runs.
- Domain Leads enforce departmental DoD before submitting work to CEO.

---

# 21. Agent Coordination
Ensure QA Agent runs synthetic load and fuzz tests on code deliverables before CEO final gatekeeping.

---

# 22. Communication Protocol
Transmit rejection notices directly to the producing agent via high-priority message: `DEFECT: QUALITY_GATE_FAILED`.

---

# 23. Dependencies
- **Skill Dependencies**: `ceo-core`, `ceo-governance`, `ceo-task-decomposition`.
- **System Dependencies**: CI/CD Test Engine, Static Analyzer.

---

# 24. Constraints
- No deliverable can bypass the quality gate without a formal CEO Executive Override Record.

---

# 25. Risk Management
- **Risk**: Quality gate bottleneck slowing down company velocity.
  - *Mitigation*: Automate 80% of quality checks via deterministic scripts; CEO focuses on architectural and strategic quality.

---

# 26. Failure Handling
If an agent fails quality gates on the same task 3 consecutive times, quarantine the agent and reassign the task to a senior fallback agent.

---

# 27. Recovery Strategy
Re-assign task with explicit reference examples demonstrating the required quality bar.

---

# 28. Escalation Rules
Escalate to CTO if a domain agent repeatedly produces broken code that fails static compilation gates.

---

# 29. Verification Rules
Verification requires re-running automated test suites and confirming that all items cited in the rejection notice have been resolved.

---

# 30. Quality Gates
- `GATE-01`: Zero placeholder comments (`TODO`/`FIXME`).
- `GATE-02`: Unit test coverage $\ge 90\%$.
- `GATE-03`: Factual claims cited with empirical evidence.
- `GATE-04`: Clean compilation and zero linting warnings.

---

# 31. Memory Requirements
- **Retrieve**: Quality standard checklists, common failure patterns.
- **Store**: `QualityGateCertificate` in `company/quality/`.
- **Update**: Agent first-time pass rate scorecards.

---

# 32. Audit Requirements
Maintain immutable records of all submitted artifacts, evaluations, rejection notices, and certificates.

---

# 33. Metrics / KPIs
- **First-Time Quality Pass Rate**: % of deliverables passing quality gates on first attempt (> 85%).
- **Rework Cycle Time**: Average hours to remediate a rejected deliverable (< 8 hours).

---

# 34. Edge Cases
- **Emergency Hotfix during P0 Outage**: Execute abbreviated Emergency Quality Gate (functional correctness + regression test only); full DoD enforced post-incident.

---

# 35. Anti-Patterns
- *Never* approve a pull request with "I'll add the tests in a follow-up PR."
- *Never* accept a strategic brief with unsourced statistics.

---

# 36. Security Rules
Run automated SAST vulnerability scanners on all code artifacts before issuing quality certificates.

---

# 37. Examples

### Example 1 — Normal Case (Clean Code PR Approved)
```text
PR: Implemented Redis Streams queue.
Checks: 94.2% test coverage; 0 placeholders; clean lint.
Action: QualityGateCertificate issued; promoted to deployment.
```

### Example 2 — Complex Case (Rejecting Document with Unsourced Claims)
```text
Deliverable: Market Strategy Brief.
Defect: Claims "Competitor churn is 40%" without primary source citation.
Action: REJECTED; author required to link primary survey data or mark as assumption.
```

### Example 3 — Failure Case (Placeholder Code Caught)
```text
Deliverable: OAuth middleware.
Defect: `// TODO: handle expired token case`.
Action: REJECTED; line-specific remediation issued; SLA 6 hours.
```

### Example 4 — Edge Case (Financial Model Rejection)
```text
Deliverable: Q3 cash flow model.
Defect: Balance sheet formula does not reconcile to 0.
Action: REJECTED; returned to CFO Agent for formula correction.
```

### Example 5 — Escalation Case (Persistent Failure)
```text
Agent fails quality gate 3 times on same task.
Action: CEO quarantines agent; reassigns task to Tech Lead.
```

---

# 38. Complex Scenarios
Enforcing quality across a multi-component microservice launch: CEO mandates that all 4 microservices pass individual quality gates, followed by a joint integration test suite, before issuing the platform release certificate.

---

# 39. Failure Scenarios
```text
Failure: A broken deliverable with stubbed error handling passed into production and caused a crash.
Postmortem: Update static analysis gate to parse AST for empty `catch` blocks and throw fatal review errors.
```

---

# 40. Learning / Feedback
Analyze recurring rejection reasons monthly; update Task Contract prompt templates to provide clearer guardrails.

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
