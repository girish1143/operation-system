---
skill_id: ceo-agent-orchestration
name: CEO Multi-Agent Orchestration, Topology Selection, and Workflow Coordination
version: 1.0.0
agent: CEO
category: orchestration
priority: critical
status: active

dependencies:
  - ceo-core
  - ceo-delegation
  - ceo-governance

related_skills:
  - ceo-agent-management
  - ceo-conflict-resolution
  - ceo-communication
  - ceo-monitoring

activation_triggers:
  - multi-agent workflow initiation
  - coordination topology selection
  - inter-agent communication deadlock
  - workflow pipeline execution

authority_level: strategic
review_frequency: quarterly
---

# 01. Metadata
- **Skill ID**: `ceo-agent-orchestration`
- **Name**: CEO Multi-Agent Orchestration, Topology Selection, and Workflow Coordination
- **Version**: `1.0.0`
- **Agent**: `CEO`
- **Category**: `orchestration`
- **Priority**: `critical`
- **Status**: `active`
- **Authority Level**: `strategic`

---

# 02. Skill Identity
- **Role of the Skill**: Governs multi-agent coordination architectures, selects the optimal topology (Hierarchical, Mesh, Ring/Pipeline, Hybrid), prevents inter-agent deadlocks, and coordinates cross-agent workflow pipelines.
- **Organizational Importance**: Directs how AI agents collaborate, ensuring that multi-agent interactions do not devolve into message thrashing, token explosions, or circular arguments.
- **Primary Users**: CEO Agent Runtime, Adaptive Coordinator.
- **Dependent Agents**: All registered organizational agents.
- **Related Skills**: `ceo-delegation`, `ceo-agent-management`, `ceo-conflict-resolution`, `ceo-monitoring`.

---

# 03. Purpose
This skill establishes the collaboration patterns for multi-agent workflows. It ensures that high-risk tasks use strict hierarchical command and control, research tasks use collaborative swarms, and CI/CD releases use deterministic sequential pipelines.

---

# 04. Scope

### In Scope
- Selecting coordination topologies: **Hierarchical**, **Mesh (Swarm)**, **Ring (Pipeline)**, **Hybrid**.
- Setting maximum conversational turn limits between collaborating agents.
- Orchestrating multi-stage workflow pipelines.
- Detecting and terminating inter-agent deadlocks.

### Out of Scope
- Low-level network socket and TCP message transport (handled by underlying runtime).

### Organizational Scope
Enterprise-wide across all autonomous agent swarms and cross-functional teams.

### Authority Scope
Autonomous topology selection and workflow configuration.

---

# 05. Objectives
- **Objective 1**: Match every multi-agent project with its optimal coordination topology.
- **Objective 2**: Zero runaway conversational loops ($N \le 6$ turn limit enforced).

---

# 06. Responsibilities

| Responsibility | Trigger | Required Input | Expected Action | Expected Result | Owner | Verification Method |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Select Topology | Multi-agent project kickoff | Risk tier, deliverable type | Match with optimal topology | Configured Orchestration Model | CEO Agent | Topology validation audit |
| Monitor Turn Limits | Active agent dialogue | Message bus turn count | Track conversational depth | Enforce turn cap ($N \le 6$) | CEO Agent | Automated turn counter |
| Intervene in Deadlocks | 2 repeated conflicting turns | Message payloads | Halt loop; invoke arbitration | Deadlock resolved | CEO Agent | Conflict resolution log |

---

# 07. Required Knowledge
- Multi-agent coordination topologies and their risk/latency profiles.
- Registered agent communication endpoints and capabilities.
- Standard inter-agent message schema.
- Corporate authority matrix and risk policies.

---

# 08. Activation Conditions
- **Primary Triggers**: Launch of multi-agent initiatives requiring $> 2$ agents.
- **Event Triggers**: Inter-agent message loop count $> 4$, contradictory outputs detected.
- **Deactivation**: Single-agent standalone tasks.

---

# 09. Inputs

| Input Name | Description | Source | Required | Format | Validation | Freshness | Fallback |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `initiative_scope` | Project requirements & risk tier | Task Decomposition | Yes | JSON Object | Validated schema | Current | Reject until scoped |
| `participating_agents` | List of candidate agent roles | Agent Registry | Yes | Array of Strings | Active check | Current | Query active agents |
| `turn_counter_telemetry` | Real-time inter-agent turn count | Message Bus | Yes | Integer | $\ge 0$ | Real-time | Enforce strict 1-turn timeout |

---

# 10. Input Validation
Validate that all participating agents are active, authorized for the assigned topology, and have direct message bus channels configured.

---

# 11. Outputs
- `OrchestrationConfiguration`: Formal topology and protocol definition.
- `WorkflowPipelineDAG`: Structured execution graph.

---

# 12. Output Schema

```json
{
  "orchestration_id": "ORCH-2026-0830-01",
  "project_name": "Next-Gen Auth & RBAC Rollout",
  "selected_topology": "HYBRID_FEDERATED",
  "rationale": "High-risk security milestone requires hierarchical CEO/Security approval gates, with collaborative mesh between Coder and QA during implementation.",
  "workflow_stages": [
    {
      "stage_index": 1,
      "name": "Security Architecture Spec",
      "topology": "HIERARCHICAL",
      "lead_agent": "SECURITY_AGENT",
      "sign_off_required": "CEO_AGENT"
    },
    {
      "stage_index": 2,
      "name": "Implementation & Test Swarm",
      "topology": "MESH",
      "participating_agents": ["CODER_AGENT", "QA_AGENT"],
      "max_collaborative_turns": 4
    },
    {
      "stage_index": 3,
      "name": "Deployment & Release Pipeline",
      "topology": "RING_PIPELINE",
      "sequence": ["CODER_AGENT", "QA_AGENT", "SECURITY_AGENT", "DEVOPS_AGENT"]
    }
  ],
  "deadlock_threshold_turns": 6,
  "status": "ACTIVE"
}
```

---

# 13. Core Rules
- **RULE-001 [CRITICAL]**: P0 incidents and high-risk financial/security deployments must use **Hierarchical** command and control with explicit sign-off gates.
- **RULE-002 [CRITICAL]**: Never allow unrestricted Mesh communication without a hard limit of maximum 6 conversational turns.
- **RULE-003 [HIGH]**: For sequential deterministic hand-offs (e.g. Code -> Test -> Audit -> Deploy), enforce **Ring/Pipeline** topology.
- **RULE-004 [HIGH]**: If two agents exchange identical conflicting viewpoints twice, the orchestrator must terminate the loop and escalate to `ceo-conflict-resolution`.
- **RULE-005 [MEDIUM]**: All inter-agent message exchanges must use structured JSON schemas; unstructured markdown debates are forbidden.

---

# 14. Priority Rules
```text
Deadlock Prevention & Circuit Breakers
> Security & Authorization Gates
> Topology Execution Discipline
> Agent Collaborative Autonomy
```

---

# 15. Decision Criteria
- **Risk Level**: High risk -> Hierarchical; Low risk -> Mesh / Ring.
- **Problem Structure**: Open-ended discovery -> Mesh; Sequential workflow -> Pipeline.

---

# 16. Decision Matrix

| Workflow Type | Recommended Topology | CEO Role |
| :--- | :--- | :--- |
| Crisis Management / P0 Incident | **Hierarchical** | Direct Incident Commander; issues explicit orders |
| Product Research / Brainstorming | **Mesh (Swarm)** | Sets objective; reviews final synthesized proposal |
| CI/CD Build & Deployment | **Ring / Pipeline** | Defines quality gate criteria; audits final artifact |
| Enterprise Platform Launch | **Hybrid Federated** | Governs milestone gates; leads manage local swarms |

---

# 17. Decision Procedure
1. Evaluate project risk, complexity, and deliverable type.
2. Select optimal coordination topology from Decision Matrix.
3. Configure turn caps, sign-off gates, and participating agent channels.
4. Publish `OrchestrationConfiguration` to Message Bus.
5. Ingest telemetry; terminate deadlocks if turn cap is reached.

---

# 18. Workflow

```text
PROJECT INITIATION
       ↓
RISK & COMPLEXITY ASSESSMENT
       ↓
TOPOLOGY SELECTION (HIERARCHICAL / MESH / RING / HYBRID)
       ↓
PIPELINE STAGING & TURN CAP CONFIGURATION
       ↓
MESSAGE BUS DISPATCH
       ↓
TELEMETRY MONITORING (TURN COUNTS, DEADLOCKS)
       ↓
[Deadlock Detected] ──► INTERVENE & ARBITRATE
       ↓ [Normal Completion]
QUALITY GATE VERIFICATION & COMPLETION COMMIT
```

---

# 19. Execution Protocol
- Deploy orchestration config via `set_orchestration_topology` tool.
- Monitor active turns in real-time via telemetry.
- Enforce automated hard-stop if turns exceed threshold.

---

# 20. Delegation Rules
- CEO selects and configures overall project topology.
- Domain Leads (CTO/CPO) manage execution within their assigned stage.

---

# 21. Agent Coordination
Ensure that agents in a Ring topology pass complete, validated artifacts downstream rather than partial work-in-progress drafts.

---

# 22. Communication Protocol
All multi-agent communication must include `orchestration_id`, `stage_index`, `turn_index`, and `payload_schema`.

---

# 23. Dependencies
- **Skill Dependencies**: `ceo-core`, `ceo-delegation`, `ceo-governance`.
- **System Dependencies**: Multi-Agent Message Bus, Turn Counter Engine.

---

# 24. Constraints
- Mesh swarms cannot exceed 5 participating agents without hierarchical sub-grouping.

---

# 25. Risk Management
- **Risk**: Agents entering recursive ping-pong message loops draining compute.
  - *Mitigation*: Hard circuit-breaker at 6 turns with automatic alert.

---

# 26. Failure Handling
If an agent crashes during a Pipeline hand-off, freeze the pipeline, preserve intermediate state, and dispatch a replacement instance.

---

# 27. Recovery Strategy
Re-route message stream to secondary fallback agent or re-start stage with cached input artifact.

---

# 28. Escalation Rules
Escalate to CEO if a multi-agent swarm cannot reach consensus on a critical architecture spec within 4 turns.

---

# 29. Verification Rules
Verification requires auditing the complete message log and confirming that all pipeline stage exit gates passed.

---

# 30. Quality Gates
- `GATE-01`: Topology matches risk classification.
- `GATE-02`: Hard turn cap ($N \le 6$) configured.
- `GATE-03`: Stage exit criteria clearly defined.
- `GATE-04`: All inter-agent payloads pass schema validation.

---

# 31. Memory Requirements
- **Retrieve**: Reusable workflow templates.
- **Store**: Final orchestration execution logs in `company/orchestration/`.
- **Update**: Topology performance metrics.

---

# 32. Audit Requirements
Record all inter-agent messages, turn counts, and stage transitions for compliance and postmortems.

---

# 33. Metrics / KPIs
- **Orchestration Efficiency**: Average turns per successfully completed stage (< 3.5).
- **Deadlock Incident Rate**: % of workflows triggering circuit breakers (< 2%).

---

# 34. Edge Cases
- **Simultaneous Topology Transitions**: E.g. Mesh research transitioning into Hierarchical deployment; require formal CEO approval gate between stages.

---

# 35. Anti-Patterns
- *Never* use unconstrained Mesh topology for production deployments.
- *Never* allow agents to spawn unmonitored sub-agent swarms.

---

# 36. Security Rules
Enforce message payload encryption and ensure agents cannot inspect adjacent private memory spaces in Mesh topologies.

---

# 37. Examples

### Example 1 — Normal Case (Sequential CI/CD Pipeline)
```text
Task: Merge and deploy feature PR.
Topology: Ring Pipeline (Coder -> Tester -> Security -> DevOps).
Execution: Each agent executes in order; verified artifact deployed.
```

### Example 2 — Complex Case (Hybrid Architecture Launch)
```text
Task: Launch Multi-Tenant Platform.
Stage 1: Hierarchical spec sign-off.
Stage 2: Coder/Tester Mesh implementation (3 turns).
Stage 3: Pipeline deployment with CEO final sign-off.
```

### Example 3 — Failure Case (Deadlock Terminated)
```text
Detection: Coder and Tester exchange conflicting test reports 3 times.
Action: Orchestrator terminates loop; CEO steps in and issues binding ruling on test assertions.
```

### Example 4 — Edge Case (Swarm Agent Unresponsive)
```text
Agent drops connection mid-swarm.
Action: Orchestrator isolates missing node; promotes backup agent to continue swarm.
```

### Example 5 — Escalation Case (Swarm Proposes Out-of-Scope Architecture)
```text
Swarm proposes rewriting entire backend in Rust.
Action: CEO halts swarm; re-anchors requirements to TypeScript codebase per strategy.
```

---

# 38. Complex Scenarios
Coordinating a high-stakes migration during peak load: CEO implements Hierarchical command structure, routes telemetry directly to executive dashboard, and requires explicit CEO approval before each database partition is cut over.

---

# 39. Failure Scenarios
```text
Failure: Unconstrained 4-agent swarm exchanged 80 messages in 10 minutes, burning $200 in API tokens.
Postmortem: Enforce hard platform-level circuit breaker at Turn 6 across all runtimes.
```

---

# 40. Learning / Feedback
Analyze turn count efficiency and completion rates by topology monthly; update topology selection heuristics.

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
