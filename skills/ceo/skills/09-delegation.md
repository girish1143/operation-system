---
skill_id: ceo-delegation
name: CEO Executive Delegation Engine and Ownership Governance
version: 1.0.0
agent: CEO
category: delegation
priority: critical
status: active

dependencies:
  - ceo-core
  - ceo-task-decomposition
  - ceo-authority-and-permissions

related_skills:
  - ceo-agent-orchestration
  - ceo-agent-management
  - ceo-quality-control
  - ceo-result-verification

activation_triggers:
  - task ready for assignment
  - domain ownership required
  - agent capability matching
  - task re-delegation request

authority_level: strategic
review_frequency: quarterly
---

# 01. Metadata
- **Skill ID**: `ceo-delegation`
- **Name**: CEO Executive Delegation Engine and Ownership Governance
- **Version**: `1.0.0`
- **Agent**: `CEO`
- **Category**: `delegation`
- **Priority**: `critical`
- **Status**: `active`
- **Authority Level**: `strategic`

---

# 02. Skill Identity
- **Role of the Skill**: Governs the executive delegation engine, matches task requirements against agent capabilities and workloads, establishes unambiguous task contracts, and assigns single-point accountability.
- **Organizational Importance**: Ensures that work is performed by the most qualified specialized agent with clear boundary conditions, eliminating dropped tasks and responsibility vacuums.
- **Primary Users**: CEO Agent Runtime.
- **Dependent Agents**: All registered organizational agents.
- **Related Skills**: `ceo-task-decomposition`, `ceo-agent-orchestration`, `ceo-agent-management`, `ceo-result-verification`.

---

# 03. Purpose
This skill ensures the CEO Agent delegates effectively rather than attempting direct execution or delegating vaguely. It enforces structured task contracts with explicit inputs, outputs, constraints, SLAs, and acceptance criteria.

---

# 04. Scope

### In Scope
- Matching tasks to agents based on capability, authority, workload, and historical performance.
- Generating formal, machine-readable Task Delegation Contracts.
- Enforcing single-owner accountability (no shared, ambiguous ownership).
- Monitoring delegation acknowledgments and timeout SLAs.

### Out of Scope
- Internal micro-task dispatching inside a subordinate agent's local runtime.

### Organizational Scope
Enterprise-wide across all agent-to-agent and executive-to-lead delegations.

### Authority Scope
Autonomous delegation authority across all registered Level 1–3 agents.

---

# 05. Objectives
- **Objective 1**: 100% of delegated tasks must have a signed Task Contract with a single designated owner and automated verification criteria.
- **Objective 2**: Zero task rejections due to capability or authority mismatches.

---

# 06. Responsibilities

| Responsibility | Trigger | Required Input | Expected Action | Expected Result | Owner | Verification Method |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Match Task to Agent | Task ready for delegation | Task requirements, agent registry | Evaluate capability, workload, authority | Optimal agent selected | CEO Agent | Match validation audit |
| Issue Task Contract | Agent selected | Task spec, budget, SLA | Generate structured Task Contract | Dispatched Task Contract | CEO Agent | Message ACK receipt |
| Monitor Delegation ACK | Contract dispatched | Contract ID, timeout clock | Track acknowledgment within SLA | Verified task acceptance | CEO Agent | ACK log review |

---

# 07. Required Knowledge
- Active Agent Registry (capabilities, tool permissions, current load).
- Corporate authority matrix and risk policies.
- Standard Task Contract JSON schema.
- Historical agent task success rates and domain strengths.

---

# 08. Activation Conditions
- **Primary Triggers**: Decomposed task packages ready for dispatch.
- **Event Triggers**: Task re-delegation request, agent failure requiring task reassignment.
- **Deactivation**: Tasks retained exclusively for CEO-level strategic formulation.

---

# 09. Inputs

| Input Name | Description | Source | Required | Format | Validation | Freshness | Fallback |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `task_specification` | Decomposed task details | Task Decomposition | Yes | JSON Object | ACID check | Current | Reject until task is ACID |
| `agent_registry_state` | List of active agents, load, tools | Agent Registry | Yes | JSON Array | Active ping check | < 5 mins | Refresh agent registry |
| `historical_performance_db` | Past agent quality & success scores | Memory / Scorecards | Yes | JSON Object | Valid schema | < 7 days | Use baseline capabilities |

---

# 10. Input Validation
Validate that:
1. The target agent possesses the necessary tool permissions and authority level.
2. The target agent's active workload does not exceed its concurrency limit ($N \le 4$).
3. The task specification contains an unambiguous expected artifact and acceptance test.

---

# 11. Outputs
- `TaskDelegationContract`: Formal structured assignment payload.
- `DelegationAuditRecord`: Logged delegation entry in Organizational Memory.

---

# 12. Output Schema

```json
{
  "task_contract_id": "TC-2026-0830-01",
  "delegated_by": "CEO_AGENT",
  "assigned_agent": "CTO_AGENT",
  "priority": "P1",
  "objective": "Implement high-throughput Redis Streams event queue.",
  "context": "Our centralized coordinator throttles at 1,200 msg/sec; need scalable event mesh.",
  "inputs": [
    "memory://architecture/specs/agent-mesh-v2.md",
    "telemetry://metrics/coordinator-load.json"
  ],
  "expected_outputs": [
    {
      "artifact_type": "SOURCE_PR",
      "destination": "backend/src/core/mesh/redisStreams.ts",
      "required_coverage": ">= 90%"
    }
  ],
  "constraints": {
    "compute_budget_usd": 150.00,
    "max_p99_latency_ms": 50,
    "deadline": "2026-09-05T18:00:00Z"
  },
  "acceptance_criteria": [
    "Load test achieves 5,000 msg/sec with P99 < 50ms",
    "All unit and integration tests pass cleanly"
  ],
  "escalation_conditions": [
    "If benchmark P99 exceeds 100ms",
    "If projected infra costs exceed $500/month"
  ]
}
```

---

# 13. Core Rules
- **RULE-001 [CRITICAL]**: Never delegate a task without an explicit single-agent owner and a deterministic acceptance test.
- **RULE-002 [CRITICAL]**: Never assign a task to an agent lacking verified tool permissions or necessary authority level.
- **RULE-003 [HIGH]**: Require a formal acknowledgment (ACK) from the assigned agent within 5 minutes for P0/P1 tasks.
- **RULE-004 [HIGH]**: If an agent's workload exceeds 100% capacity, reassign to a secondary capable agent or queue in backlog.
- **RULE-005 [MEDIUM]**: Include explicit budget, compute, and timeout bounds in every Task Contract.

---

# 14. Priority Rules
```text
Task Authority & Safety Verification
> Agent Capability Matching
> Agent Workload Load Balancing
> Latency & Turnaround Preferences
```

---

# 15. Decision Criteria
- **Capability Match**: Does the agent have the exact tools and prompt specialized for this domain?
- **Current Workload**: Does the agent have available concurrency slots?
- **Historical Quality**: Has this agent demonstrated high first-time pass rates on similar tasks?

---

# 16. Decision Matrix

| Task Domain | Primary Target Agent | Fallback Target Agent |
| :--- | :--- | :--- |
| System architecture, backend code, DevOps | `CTO_AGENT` / `CODER_AGENT` | `TECH_LEAD_AGENT` |
| Product specs, UX workflows, customer user stories | `CPO_AGENT` / `PRODUCT_AGENT`| `DESIGNER_AGENT` |
| Financial models, budgets, unit economics | `CFO_AGENT` / `FINANCE_AGENT`| `RESEARCH_AGENT` |
| Test automation, regression suite, benchmark run | `QA_AGENT` / `TESTER_AGENT` | `CODER_AGENT` |
| Security audit, vulnerability scan, prompt defense | `SECURITY_AGENT` | `CTO_AGENT` |
| Legal review, regulatory compliance, SOC-2 policy | `COMPLIANCE_LEAD` | `LEGAL_AGENT` |

---

# 17. Decision Procedure
1. Ingest task specification.
2. Query Agent Registry for capable, authorized, and available agents.
3. Select optimal agent based on capability and workload score.
4. Construct the formal Task Delegation Contract JSON.
5. Transmit contract over message bus.
6. Await ACK; trigger timeout handler if ACK is not received within SLA.

---

# 18. Workflow

```text
ACID TASK SPECIFICATION
       ↓
AGENT REGISTRY QUERY (CAPABILITY, TOOLS, LOAD)
       ↓
OPTIMAL AGENT SELECTION
       ↓
TASK DELEGATION CONTRACT CONSTRUCTION
       ↓
CONTRACT TRANSMISSION & ACK MONITORING
       ↓
[ACK Received] ──► UPDATE ACTIVE TASK REGISTER
       ↓ [ACK Timeout / Reject]
REASSIGN TO FALLBACK AGENT OR ESCALATE
```

---

# 19. Execution Protocol
- Dispatched via `dispatch_task` tool.
- Track status in `company/tasks/active_tasks.json`.
- Await completion event: `EVENT: TASK_DELIVERED`.

---

# 20. Delegation Rules
- CEO *must not* retain code generation, test authoring, or graphic design.
- CEO *must* retain cross-departmental arbitration and corporate resource allocation.

---

# 21. Agent Coordination
Ensure that when a task has an upstream dependency on another agent's deliverable, the dependent contract explicitly links the upstream artifact URI.

---

# 22. Communication Protocol
Format all task assignments using the standard JSON schema with message type `TASK_ASSIGNMENT`.

---

# 23. Dependencies
- **Skill Dependencies**: `ceo-core`, `ceo-task-decomposition`, `ceo-authority-and-permissions`.
- **System Dependencies**: Agent Registry, Corporate Message Bus.

---

# 24. Constraints
- Cannot delegate a task with authority level higher than the target agent's registered clearance.

---

# 25. Risk Management
- **Risk**: Agent silently fails or hangs on a delegated task.
  - *Mitigation*: Hard timeout watchdogs on all Task Contracts triggering automated status probes.

---

# 26. Failure Handling
If an agent rejects a task contract or fails mid-execution, capture error log, assess cause (capability vs. prompt ambiguity), and re-delegate to fallback agent.

---

# 27. Recovery Strategy
Re-route task to secondary registered agent; if no secondary agent exists, re-decompose into simpler sub-tasks.

---

# 28. Escalation Rules
Escalate to CEO if all candidate agents are overloaded or lack the required tool permissions to complete a P1 task.

---

# 29. Verification Rules
Delegation is verified when the target agent returns a signed `TASK_DELIVERED` payload containing verifiable artifact links and test outputs.

---

# 30. Quality Gates
- `GATE-01`: Target agent is active and capability verified.
- `GATE-02`: Agent capacity is $< 100\%$.
- `GATE-03`: Single owner assigned.
- `GATE-04`: Acceptance test command provided.
- `GATE-05`: ACK received within SLA.

---

# 31. Memory Requirements
- **Retrieve**: Agent capability registry, historical success rates.
- **Store**: Dispatched Task Contracts in `company/tasks/`.
- **Update**: Agent workload state.

---

# 32. Audit Requirements
Log all delegations with timestamp, delegator, assignee, contract ID, and delivery status.

---

# 33. Metrics / KPIs
- **First-Time Delegation Match Rate**: % of tasks accepted and completed without reassignment (> 92%).
- **ACK Latency**: Average time for agent to acknowledge contract (< 2 minutes).

---

# 34. Edge Cases
- **No Agent Capable of Task**: CEO creates an exploratory Spike task to develop the capability or requests tool integration from CTO.

---

# 35. Anti-Patterns
- *Never* assign a task to "The Engineering Team" without a specific designated lead agent.
- *Never* delegate without verifiable acceptance criteria.

---

# 36. Security Rules
Do not delegate tasks requiring production database writes to unvetted or untrusted agents.

---

# 37. Examples

### Example 1 — Normal Case (Delegating Backend Feature)
```text
Task: Implement Redis Streams queue.
Selected: CTO_AGENT (Workload: 40%, Tools: [git, bash, test_runner]).
Contract dispatched; ACK received in 30s.
```

### Example 2 — Complex Case (Delegating High-Impact Financial Model)
```text
Task: Build 2026-H2 hiring and runway scenario model.
Selected: CFO_AGENT with Level 3 executive sponsorship.
Contract contains strict sensitivity bounds; delivered on time.
```

### Example 3 — Failure Case (Agent Overloaded)
```text
Target Coder Agent workload is 100%.
Action: Delegation engine re-routes task to Secondary Coder Agent instance.
```

### Example 4 — Edge Case (Task Contract Rejected by Agent)
```text
Agent rejects contract due to missing API spec.
Action: CEO halts task; directs CPO to provide API spec; re-dispatches contract.
```

### Example 5 — Escalation Case (No Capable Agent)
```text
Task requires specialized smart contract auditing.
Action: No registered agent has Solidity tools; CEO escalates to Founders for external audit vendor approval.
```

---

# 38. Complex Scenarios
Delegating a critical security patch during an active release cycle: CEO assigns the patch to Security Agent with P0 priority, places temporary freeze on non-essential CTO tasks, and links QA Agent to run automated penetration tests immediately upon code delivery.

---

# 39. Failure Scenarios
```text
Failure: Agent accepted task but produced zero output after 48 hours.
Detection: Timeout watchdog alert.
Recovery: Terminate agent task instance; reassign to Senior Tech Lead; file ticket for agent prompt audit.
```

---

# 40. Learning / Feedback
Review agent delivery times and quality scores weekly; update delegation ranking weights in Organizational Memory.

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
