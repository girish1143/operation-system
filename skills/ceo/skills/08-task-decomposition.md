---
skill_id: ceo-task-decomposition
name: CEO Strategic Task Decomposition and Workstream Structuring
version: 1.0.0
agent: CEO
category: task_decomposition
priority: critical
status: active

dependencies:
  - ceo-core
  - ceo-objectives
  - ceo-planning

related_skills:
  - ceo-delegation
  - ceo-agent-orchestration
  - ceo-quality-control
  - ceo-result-verification

activation_triggers:
  - strategic initiative approved
  - complex project kickoff
  - ambiguous mandate received
  - major workstream partitioning

authority_level: strategic
review_frequency: quarterly
---

# 01. Metadata
- **Skill ID**: `ceo-task-decomposition`
- **Name**: CEO Strategic Task Decomposition and Workstream Structuring
- **Version**: `1.0.0`
- **Agent**: `CEO`
- **Category**: `task_decomposition`
- **Priority**: `critical`
- **Status**: `active`
- **Authority Level**: `strategic`

---

# 02. Skill Identity
- **Role of the Skill**: Breaks down high-level strategic mandates into mutually exclusive, collectively exhaustive (MECE) workstreams, departmental initiatives, and atomic deliverables.
- **Organizational Importance**: Eliminates ambiguity, prevents overlapping agent efforts, and transforms complex abstract goals into deterministic, verifiable work packages.
- **Primary Users**: CEO Agent Runtime.
- **Dependent Agents**: All C-Suite Leads, Project Managers, Specialized Agents.
- **Related Skills**: `ceo-planning`, `ceo-delegation`, `ceo-agent-orchestration`, `ceo-quality-control`.

---

# 03. Purpose
Autonomous AI agents fail when given large, vague, or interconnected prompts. This skill provides the decomposition engine that converts strategic mandates into ACID tasks (Atomic, Constrained, Identifiable, Deterministic) with zero scope ambiguity.

---

# 04. Scope

### In Scope
- Decomposing company-level strategic mandates into multi-department workstreams.
- Structuring sub-tasks and atomic deliverable contracts.
- Defining interface boundaries and hand-off schemas between workstreams.
- Applying the MECE and ACID task quality frameworks.

### Out of Scope
- Decomposing individual software functions/classes (owned by Coder Agent / Tech Lead).
- Micro-story point estimation.

### Organizational Scope
Enterprise-wide applicability across all cross-functional initiatives.

### Authority Scope
Autonomous decomposition and workstream partitioning authority.

---

# 05. Objectives
- **Objective 1**: Ensure 100% of decomposed tasks satisfy the MECE and ACID criteria before delegation.
- **Objective 2**: Ensure zero overlapping or duplicate work packages across departmental agents.

---

# 06. Responsibilities

| Responsibility | Trigger | Required Input | Expected Action | Expected Result | Owner | Verification Method |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Decompose Strategic Mandate | Initiative approved | Mandate description, OKR link | Break down into MECE workstreams | Structured Workstream Hierarchy | CEO Agent | MECE audit |
| Define Atomic Deliverables | Workstreams defined | Technical & business constraints | Specify exact output artifact & schema | Structured Task Contracts | CEO Agent | ACID quality check |
| Define Hand-off Interfaces | Cross-agent dependency | Upstream/downstream agent roles | Specify contract schema and SLA | Clean interface contracts | CEO Agent | Interface validation |

---

# 07. Required Knowledge
- Corporate architecture, data models, and functional boundaries.
- Agent registry capabilities and specialization taxonomy.
- Standard artifact schemas (Markdown specs, PRs, financial models, policies).
- MECE structuring rules and ACID task criteria.

---

# 08. Activation Conditions
- **Primary Triggers**: Strategic initiative approval, complex multi-agent project launch.
- **Event Triggers**: Agent reports that a delegated task is too ambiguous or broad to execute.
- **Deactivation**: Single-domain atomic bug fixes or routine maintenance tasks.

---

# 09. Inputs

| Input Name | Description | Source | Required | Format | Validation | Freshness | Fallback |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `strategic_mandate` | High-level corporate initiative | CEO / Board | Yes | Structured Doc | Non-empty | Current | Reject until mandate clarified |
| `target_okr_link` | Associated Objective / KR | Objectives Store | Yes | String ID | Valid OKR ID | Current | Link to general company health |
| `agent_capability_matrix` | Available agent roles & tools | Agent Registry | Yes | JSON Object | Verified active | Current | Refresh agent registry |

---

# 10. Input Validation
Verify that the strategic mandate has a defined business objective, approved budget bounds, and measurable success criteria before initiating decomposition.

---

# 11. Outputs
- `DecomposedWorkstreamTree`: MECE structured initiative breakdown.
- `AtomicTaskPackages`: Individual task specifications ready for delegation.

---

# 12. Output Schema

```json
{
  "decomposition_id": "DEC-2026-0830-01",
  "initiative_name": "Enterprise Multi-Tenancy Platform Launch",
  "target_okr_id": "OKR-2026-Q3-01",
  "workstreams": [
    {
      "workstream_id": "WS-01-INFRA",
      "lead_agent": "CTO_AGENT",
      "scope": "Database schema isolation, Redis message routing, and API gateway tenant middleware.",
      "atomic_tasks": [
        {
          "task_id": "TASK-INFRA-01",
          "title": "Implement PostgreSQL Row-Level Security Schema",
          "assigned_agent": "CODER_AGENT",
          "expected_artifact": "PR in backend/src/core/db/migrations",
          "acceptance_test": "Multi-tenant tenant_id isolation unit test suite passes"
        }
      ]
    },
    {
      "workstream_id": "WS-02-SECURITY",
      "lead_agent": "SECURITY_AGENT",
      "scope": "Tenant token signing, RBAC permissions, and SOC-2 audit logging.",
      "atomic_tasks": [
        {
          "task_id": "TASK-SEC-01",
          "title": "Author Tenant JWT Key Rotation Specification",
          "assigned_agent": "SECURITY_AGENT",
          "expected_artifact": "Markdown doc in docs/security/jwt-rotation.md",
          "acceptance_test": "Passes security review gate with 0 unmitigated risks"
        }
      ]
    }
  ]
}
```

---

# 13. Core Rules
- **RULE-001 [CRITICAL]**: All decompositions must be **MECE** (Mutually Exclusive, Collectively Exhaustive); no two tasks may have overlapping scope.
- **RULE-002 [CRITICAL]**: Every atomic task must pass the **ACID Test**:
  - **A**tomic: Independent execution by a single agent.
  - **C**onstrained: Explicit budget, compute, and time boundaries.
  - **I**dentifiable: Unique ID and single owner.
  - **D**eterministic: Explicit expected artifact and acceptance test.
- **RULE-003 [HIGH]**: Never decompose a project into tasks that require ongoing synchronous uncoordinated communication between agents.
- **RULE-004 [HIGH]**: Define explicit artifact schemas for every inter-workstream hand-off.
- **RULE-005 [MEDIUM]**: Limit decomposition hierarchy to maximum 3 tiers (Initiative -> Workstream -> Atomic Task).

---

# 14. Priority Rules
```text
Task Isolation & Independence (Acyclicity)
> Explicit Output Determinism
> Scope Non-Overlap (MECE)
> Granular Scheduling Precision
```

---

# 15. Decision Criteria
- **Task Granularity**: Is the task small enough to execute deterministically, but large enough to avoid micro-management overhead?
- **Interface Clarity**: Are inputs and outputs clearly separated by structured schemas?

---

# 16. Decision Matrix

| Task Characteristic | Decomposition Action |
| :--- | :--- |
| Requires multiple domain skills (e.g. Code + Legal) | Split into separate workstream tasks with interface hand-off |
| Task takes $> 3$ days for an agent to complete | Decompose into smaller milestone sub-tasks |
| Dependent on unbuilt upstream component | Create Mock Schema task to unblock downstream work |
| Ambiguous requirements | Commission preliminary Spike / Discovery task first |

---

# 17. Decision Procedure
1. Ingest strategic mandate and identify required functional domains.
2. Partition mandate into MECE workstreams.
3. Decompose each workstream into ACID atomic deliverables.
4. Define inter-task interfaces, hand-offs, and acceptance tests.
5. Validate full tree against ACID and MECE quality gates.
6. Hand off to `ceo-delegation`.

---

# 18. Workflow

```text
STRATEGIC MANDATE
       ↓
FUNCTIONAL DOMAIN IDENTIFICATION
       ↓
MECE WORKSTREAM PARTITIONING
       ↓
ACID ATOMIC TASK SCOPING
       ↓
INTERFACE & ARTIFACT SCHEMA DEFINITION
       ↓
QUALITY GATE VERIFICATION (MECE & ACID)
       ↓
FORWARD TO DELEGATION ENGINE
```

---

# 19. Execution Protocol
- Author decomposition trees using structured JSON format.
- Store decomposition spec in `company/initiatives/` namespace.
- Ensure every atomic task contains a direct verification test command.

---

# 20. Delegation Rules
- CEO owns initiative-to-workstream decomposition.
- Domain Leads (CTO, CPO) own workstream-to-ticket breakdown within their departmental backlogs.

---

# 21. Agent Coordination
Ensure that upstream delivering agents and downstream consuming agents agree on the exact artifact format before task execution commences.

---

# 22. Communication Protocol
Publish decomposition trees to domain leads via `EVENT: INITIATIVE_DECOMPOSED` with linked specification schemas.

---

# 23. Dependencies
- **Skill Dependencies**: `ceo-core`, `ceo-objectives`, `ceo-planning`.
- **System Dependencies**: Task Decomposition Parser, Agent Registry.

---

# 24. Constraints
- Cannot decompose a mandate into more than 20 atomic tasks simultaneously without hierarchical lead grouping.

---

# 25. Risk Management
- **Risk**: Decomposed tasks omit a critical integration step (Non-exhaustive).
  - *Mitigation*: Mandatory Integration & System Verification task appended to every workstream tree.

---

# 26. Failure Handling
If an agent reports that a task is unsolvable or overloaded, recall the task and apply recursive decomposition to break it into smaller sub-units.

---

# 27. Recovery Strategy
Re-combine failed sub-tasks and re-partition using alternative architectural boundaries (e.g., partition by data entity rather than functional layer).

---

# 28. Escalation Rules
Escalate to CEO if two domain leads dispute the ownership boundary of a decomposed workstream.

---

# 29. Verification Rules
Verification requires checking that all atomic tasks produce artifacts that successfully compile, pass unit tests, and satisfy the workstream acceptance criteria.

---

# 30. Quality Gates
- `GATE-01`: Full MECE validation passed.
- `GATE-02`: All tasks pass the ACID test.
- `GATE-03`: Explicit artifact destination defined for every task.
- `GATE-04`: Verification test command provided for every deliverable.

---

# 31. Memory Requirements
- **Retrieve**: Similar past project decomposition trees.
- **Store**: Active decomposition models in `company/initiatives/`.
- **Update**: Reusable decomposition templates.

---

# 32. Audit Requirements
Maintain version history of all decomposition trees and scope adjustments.

---

# 33. Metrics / KPIs
- **Decomposition Accuracy**: % of atomic tasks completed without requiring scope redefinition (> 90%).
- **Interface Contract Pass Rate**: % of cross-workstream hand-offs succeeding on first attempt (> 95%).

---

# 34. Edge Cases
- **Completely Novel R&D Initiative with Unknown Architecture**: Decompose into a 3-day Timeboxed Exploration Spike before building execution tree.

---

# 35. Anti-Patterns
- *Never* delegate a vague, multi-month goal as a single monolithic task.
- *Never* create tasks with overlapping, duplicate file edit ownership.

---

# 36. Security Rules
Ensure tasks handling sensitive customer data or private keys are partitioned into isolated, security-cleared workstreams.

---

# 37. Examples

### Example 1 — Normal Case (Decomposing a Feature Initiative)
```text
Mandate: "Add User Role-Based Access Control (RBAC)".
Workstream 1: Backend schema migration & JWT claims (CTO).
Workstream 2: Frontend permission gates & UI views (CPO).
Workstream 3: Security penetration test (Security Agent).
Result: 3 clean, non-overlapping ACID task packages.
```

### Example 2 — Complex Case (Cross-Functional Platform Launch)
```text
Mandate: "Launch Sovereign VPC Deployment Tier".
Workstreams:
- WS-1: Terraform infrastructure modules (DevOps).
- WS-2: Local model inference containerization (CTO).
- WS-3: SOC-2 Sovereign VPC compliance docs (Compliance).
- WS-4: Enterprise pricing and sales collateral (CFO/CSO).
```

### Example 3 — Failure Case (Resolving Scope Overlap)
```text
Detection: Coder Agent and Security Agent both assigned to edit `auth.ts`.
Action: Split into Task A (Coder builds middleware interface) and Task B (Security injects token validator).
```

### Example 4 — Edge Case (High-Uncertainty Spike)
```text
Mandate: "Investigate migrating from REST to gRPC".
Action: Decompose as single atomic 48-hour Spike deliverable: "Benchmark report with 2 endpoints".
```

### Example 5 — Escalation Case (Workstream Boundary Dispute)
```text
Dispute: CTO and CPO argue over who owns API schema design.
CEO Ruling: CPO defines payload data requirements; CTO defines technical API protocol and schema structure.
```

---

# 38. Complex Scenarios
Decomposing a live database migration with zero downtime: CEO structures the work into 4 sequential ACID tasks: (1) Dual-writing middleware, (2) Backfill script, (3) Read-switching verification, (4) Deprecation cleanup.

---

# 39. Failure Scenarios
```text
Failure: Decomposed task was too broad; agent generated 4,000 lines of unreviewable code.
Postmortem: Enforce rule: No task may encompass more than 3 source files or 300 lines of diff.
```

---

# 40. Learning / Feedback
Analyze post-project task rework rates; refine workstream partitioning templates in Organizational Memory.

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
