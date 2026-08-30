---
skill_id: ceo-memory-management
name: CEO Organizational Memory Management, Namespaces, and Context Governance
version: 1.0.0
agent: CEO
category: memory_management
priority: critical
status: active

dependencies:
  - ceo-core
  - ceo-governance
  - ceo-security

related_skills:
  - ceo-learning
  - ceo-decision-making
  - ceo-result-verification

activation_triggers:
  - pre-decision context retrieval
  - post-decision memory commit
  - incident postmortem storage
  - quarterly memory consolidation

authority_level: strategic
review_frequency: quarterly
---

# 01. Metadata
- **Skill ID**: `ceo-memory-management`
- **Name**: CEO Organizational Memory Management, Namespaces, and Context Governance
- **Version**: `1.0.0`
- **Agent**: `CEO`
- **Category**: `memory_management`
- **Priority**: `critical`
- **Status**: `active`
- **Authority Level**: `strategic`

---

# 02. Skill Identity
- **Role of the Skill**: Governs the organizational memory architecture, memory namespaces (`strategy`, `decisions`, `policies`, `incidents`, `agents`), selective context retrieval, and institutional knowledge preservation.
- **Organizational Importance**: Ensures that the enterprise learns and compounds intelligence over time, preventing context pollution, repeated mistakes, and forgotten decisions.
- **Primary Users**: CEO Agent Runtime, Executive Memory Store.
- **Dependent Agents**: All organizational agents.
- **Related Skills**: `ceo-learning`, `ceo-decision-making`, `ceo-security`.

---

# 03. Purpose
Without structured memory management, AI agents suffer from amnesia across sessions or context window overflow from indiscriminate dumping. This skill provides the retrieval, indexing, sanitization, and commit rules that turn corporate data into long-term institutional intelligence.

---

# 04. Scope

### In Scope
- Governing the Master Corporate Memory Namespaces.
- Enforcing the Pre-Decision Retrieval and Post-Decision Commit protocols.
- Enforcing the Secret Sanitization Rule across all memory writes.
- Governing MCP Memory Tool interfaces (`store_memory`, `retrieve_memory`).

### Out of Scope
- Raw vector database infrastructure hosting and indexing tuning.

### Organizational Scope
Enterprise-wide across all strategic, operational, architectural, and financial memory stores.

### Authority Scope
Autonomous memory management, schema structuring, and curation authority.

---

# 05. Objectives
- **Objective 1**: 100% of executive decisions, verified outcomes, and incident postmortems committed to memory within 15 minutes.
- **Objective 2**: Zero credentials, private keys, or PII written into shared memory stores.

---

# 06. Responsibilities

| Responsibility | Trigger | Required Input | Expected Action | Expected Result | Owner | Verification Method |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Retrieve Strategic Context | Pre-decision trigger | Decision topic, query terms | Query relevant namespaces | Synthesized historical context | CEO Agent | Relevance check |
| Commit Executive Records | Decision / Postmortem finalized | Structured JSON artifact | Sanitize secrets; store in namespace | Immutable memory record | CEO Agent | Store confirmation check |
| Consolidate Memory | Quarterly cycle | Stale / redundant memory logs | Archive & synthesize knowledge | Clean, high-signal memory base | CEO Agent | Memory index audit |

---

# 07. Required Knowledge
- Master Memory Taxonomy and Namespace schemas.
- Relevance-based retrieval algorithms (Semantic + Keyword hybrid).
- Secret Sanitization filters and PII masking patterns.
- MCP memory tool specifications (`claude-flow`, Vector DB, JSON stores).

---

# 08. Activation Conditions
- **Primary Triggers**: Pre-decision analysis, post-decision finalization, incident postmortem completion.
- **Event Triggers**: Knowledge discovery request from any executive lead.
- **Deactivation**: Ephemeral, single-turn scratchpad calculations.

---

# 09. Inputs

| Input Name | Description | Source | Required | Format | Validation | Freshness | Fallback |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `memory_write_payload` | Structured record to be stored | Executive Skill | Yes | JSON Object | Schema check | Current | Reject malformed writes |
| `retrieval_query` | Search key and namespace target | Requesting Agent | Yes | String / Object | Non-empty | Current | Broaden search scope |
| `sanitization_status` | PII / Secret scanner output | Security Engine | Yes | Boolean | Must be TRUE | Real-time | Block write if unsanitized |

---

# 10. Input Validation
Validate that:
1. All memory writes specify a valid namespace target.
2. The payload is 100% sanitized of secrets and private keys.
3. Payloads contain structured metadata (timestamp, author, tags).

---

# 11. Outputs
- `MemoryCommitReceipt`: Confirmation of persistent storage.
- `SynthesizedContextPacket`: Extracted historical knowledge for prompt injection.

---

# 12. Output Schema

```json
{
  "memory_record": {
    "key": "company$decisions$CDR-2026-0830-05",
    "namespace": "company/decisions",
    "schema_version": "v1.0",
    "timestamp": "2026-08-30T21:00:00Z",
    "author": "CEO_AGENT",
    "tags": ["architecture", "redis_mesh", "scalability", "type_1"],
    "summary": "Approved migration from centralized coordinator to event-driven Redis Mesh to eliminate 1,200 msg/sec bottleneck.",
    "payload": {
      "decision_id": "CDR-2026-0830-05",
      "chosen_option": "Option B: Event-Driven Distributed Redis Mesh",
      "owner": "CTO_AGENT",
      "target_completion": "2026-09-20",
      "success_metrics": ["P99 < 50ms at 5,000 msg/sec"]
    }
  }
}
```

---

# 13. Core Rules
- **RULE-001 [CRITICAL]**: **Secret Sanitization Rule**: Never store secrets, passwords, private keys, API tokens, or unmasked customer PII in memory.
- **RULE-002 [CRITICAL]**: Before making any Level 3 or Level 4 decision, the CEO must execute a pre-decision retrieval query for historical context.
- **RULE-003 [HIGH]**: Never dump an entire memory namespace into the context window; use selective, relevance-based retrieval.
- **RULE-004 [HIGH]**: All major decisions, verified task outcomes, and incident postmortems must be committed to memory within 15 minutes.
- **RULE-005 [MEDIUM]**: Run quarterly memory consolidation sweeps to deprecate obsolete assumptions.

---

# 14. Priority Rules
```text
Secret Sanitization & PII Protection
> Memory Integrity & Namespace Validation
> Pre-Decision Context Retrieval
> Storage Execution Speed
```

---

# 15. Decision Criteria
- **Relevance**: Does this historical memory record directly inform the current strategic problem?
- **Recency vs. Validity**: Is the memory record current, or has the underlying assumption changed?

---

# 16. Decision Matrix

| Information Type | Target Namespace | Retention Policy |
| :--- | :--- | :--- |
| Core Strategy, Moats, Positioning | `company/strategy/` | Permanent (Versioned) |
| CEO Decision Records (CDRs) | `company/decisions/` | Permanent (Immutable) |
| Active and Historical OKRs | `company/objectives/` | Permanent |
| Incident Postmortems & Root Causes | `company/incidents/` | Permanent |
| Agent Performance Scorecards | `company/performance/`| 24 Months |
| Transient Debugging Logs | `company/scratchpad/` | 7 Days (Auto-purged) |

---

# 17. Decision Procedure
1. Ingest retrieval query or write payload.
2. If write: Run automated Secret Sanitizer scanner.
3. Validate namespace routing and schema compliance.
4. Execute `store_memory` or `retrieve_memory` via MCP tooling.
5. Verify persistence receipt and log transaction.

---

# 18. Workflow

```text
MEMORY OPERATION TRIGGER (READ / WRITE)
       ↓
[Write Operation] ──► RUN SECRET & PII SANITIZATION SCAN
       ↓ [Clean]
VALIDATE NAMESPACE & SCHEMA FORMAT
       ↓
EXECUTE MCP MEMORY TOOL (STORE / RETRIEVE)
       ↓
[Read Operation] ──► SYNTHESIZE CONTEXT & INJECT INTO PROMPT
       ↓ [Write Operation]
VERIFY COMMIT RECEIPT & LOG AUDIT TRAIL
```

---

# 19. Execution Protocol
- Store via `mcp__claude-flow__memory_usage` (or equivalent enterprise memory tool).
- Query using structured key patterns: `namespace$category$id`.
- Commit receipts logged in `company/audit/memory_ops.json`.

---

# 20. Delegation Rules
- CEO governs strategic, decision, and policy memory namespaces.
- CTO manages architectural RFC and technical memory.
- CFO manages financial and unit economics memory.

---

# 21. Agent Coordination
Ensure all C-Suite agents query shared organizational memory before proposing new initiatives to avoid duplicate work.

---

# 22. Communication Protocol
Publish memory index updates to `#system-memory-sync` upon major quarterly consolidations.

---

# 23. Dependencies
- **Skill Dependencies**: `ceo-core`, `ceo-governance`, `ceo-security`.
- **System Dependencies**: MCP Memory Engine, PII Sanitizer.

---

# 24. Constraints
- Memory records cannot exceed 50KB per individual JSON document without chunked partitioning.

---

# 25. Risk Management
- **Risk**: Memory pollution (thousands of low-signal scratch logs degrading search relevance).
  - *Mitigation*: Strict 7-day auto-purge on all `scratchpad` namespace entries.

---

# 26. Failure Handling
If memory store is temporarily offline, write records to a local fallback append-only log file; sync back to memory store upon recovery.

---

# 27. Recovery Strategy
Re-index memory namespace from backup snapshot if corruption is detected.

---

# 28. Escalation Rules
Escalate to Security Agent immediately if an unredacted secret is detected in any memory store.

---

# 29. Verification Rules
Verification requires executing a read query immediately after writing to confirm deterministic key retrieval.

---

# 30. Quality Gates
- `GATE-01`: Zero secrets or PII detected.
- `GATE-02`: Valid namespace specified.
- `GATE-03`: Structured JSON metadata included.
- `GATE-04`: Read-after-write verification passed.

---

# 31. Memory Requirements
- **Retrieve**: Master namespace directory.
- **Store**: All executive decision records and postmortems.
- **Update**: Memory index pointers.
- **Ignore**: Sub-second telemetry noise.

---

# 32. Audit Requirements
Log all memory read and write operations with timestamp, agent ID, and namespace key.

---

# 33. Metrics / KPIs
- **Context Retrieval Precision**: % of retrieved memory records deemed relevant by executive decision models (> 90%).
- **Memory Write Latency**: Average time to persist a record (< 500ms).

---

# 34. Edge Cases
- **Conflicting Historical Memories**: E.g. 2024 decision contradicts 2026 strategy. Action: CEO prioritizes more recent decision and archives obsolete record with deprecation tag.

---

# 35. Anti-Patterns
- *Never* store raw database credentials or API keys in memory.
- *Never* dump 50 past documents into a prompt context when 1 summary record suffices.

---

# 36. Security Rules
Enforce role-based encryption on executive and financial memory namespaces.

---

# 37. Examples

### Example 1 — Normal Case (Storing a Decision Record)
```text
Input: Approved CDR-2026-0830-05.
Action: Sanitizer scans payload (0 secrets found); stored under `company/decisions/CDR-2026-0830-05`.
Receipt: Commit successful in 240ms.
```

### Example 2 — Complex Case (Pre-Decision Precedent Query)
```text
Task: CEO evaluating whether to change enterprise pricing.
Action: Queries `company/financials/` and `company/decisions/` for past pricing experiments.
Result: Retrieves 2025 experiment showing 15% churn increase when annual upfront payment was removed; informs decision.
```

### Example 3 — Failure Case (Secret Leak Blocked)
```text
Input: Agent attempts to store JSON containing `"api_key": "sk-live-94820"`.
Action: Sanitizer intercepts write; blocks operation; alerts Security Agent.
```

### Example 4 — Edge Case (Consolidating Redundant Memories)
```text
Action: Quarterly sweep combines 12 weekly sprint notes into a single Q3 engineering summary doc.
```

### Example 5 — Escalation Case (Memory Storage Corruption Alert)
```text
Event: Vector index fails checksum.
Action: CEO halts automated writes; initiates memory re-index from cold snapshot.
```

---

# 38. Complex Scenarios
Managing strategic context across multiple executive agent upgrades: CEO maintains versioned memory namespaces (`v1`, `v2`), migrating active decision graphs to the new schema while archiving historical records in read-only cold storage.

---

# 39. Failure Scenarios
```text
Failure: Context window overflow crashed the CEO Agent during a strategy session.
Postmortem: Enforce hard 4,000-token cap on retrieved memory context packets; mandate executive summaries over raw docs.
```

---

# 40. Learning / Feedback
Analyze memory search query hit rates quarterly; optimize tagging taxonomy to ensure rapid retrieval of critical historical decisions.

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
