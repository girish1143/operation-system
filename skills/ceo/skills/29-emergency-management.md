---
skill_id: ceo-emergency-management
name: CEO Emergency Management, Incident Command System, and Crisis Leadership
version: 1.0.0
agent: CEO
category: emergency_management
priority: critical
status: active

dependencies:
  - ceo-core
  - ceo-governance
  - ceo-authority-and-permissions

related_skills:
  - ceo-failure-recovery
  - ceo-escalation
  - ceo-communication
  - ceo-risk-management

activation_triggers:
  - existential crisis declared (State of Emergency)
  - catastrophic multi-service blackout
  - severe security breach / extortion attempt
  - sudden capital insolvency shock

authority_level: strategic
review_frequency: quarterly
---

# 01. Metadata
- **Skill ID**: `ceo-emergency-management`
- **Name**: CEO Emergency Management, Incident Command System, and Crisis Leadership
- **Version**: `1.0.0`
- **Agent**: `CEO`
- **Category**: `emergency_management`
- **Priority**: `critical`
- **Status**: `active`
- **Authority Level**: `strategic`

---

# 02. Skill Identity
- **Role of the Skill**: Governs crisis leadership during existential threats, activates the Incident Command System (ICS), enforces discretionary burn freezes, establishes the emergency war room cadence, and leads disaster recovery.
- **Organizational Importance**: Ensures corporate survival during catastrophic shocks by centralizing command, eliminating organizational debate, and executing decisive protective actions.
- **Primary Users**: CEO Agent Runtime (Incident Commander).
- **Dependent Agents**: All organizational agents, Human Founders, Board of Directors.
- **Related Skills**: `ceo-failure-recovery`, `ceo-escalation`, `ceo-communication`.

---

# 03. Purpose
When an existential crisis strikes, normal consensus-driven decision-making collapses. This skill transforms the CEO Agent into the sole Incident Commander with unified decision authority, freezing non-essential operations, mobilizing emergency resources, and communicating transparently with stakeholders.

---

# 04. Scope

### In Scope
- Declaring and terminating a corporate **State of Emergency**.
- Activating the **Incident Command System (ICS)**.
- Ordering immediate freezes on discretionary capital burn and non-critical compute.
- Running high-frequency Emergency War Room cadences (every 4 hours).
- Managing Founder and Board emergency hotlines.

### Out of Scope
- Physical disaster management of human office buildings (owned by Human Facilities Team).

### Organizational Scope
Enterprise-wide across all departments, budgets, agent runtimes, and communication channels.

### Authority Scope
Supreme operational emergency command authority; existential corporate restructuring remains subject to Level 4 Founder notification.

---

# 05. Objectives
- **Objective 1**: Transition company to Incident Command System (ICS) within 3 minutes of an existential threat detection.
- **Objective 2**: Freeze 100% of non-essential discretionary burn within 5 minutes of emergency declaration.

---

# 06. Responsibilities

| Responsibility | Trigger | Required Input | Expected Action | Expected Result | Owner | Verification Method |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Declare State of Emergency | Existential crisis detected | Crisis payload, threat score | Declare Emergency; activate ICS | Centralized Crisis Command | CEO Agent | Emergency broadcast log |
| Freeze Discretionary Burn | Emergency declared | Financial / compute state | Halt non-essential spending/compute| Preserved capital & compute | CEO Agent | Cloud billing / API audit |
| Lead Crisis War Room | Active emergency | Lead updates, telemetry | Convene 4-hour war room cadence | Synchronized crisis response | CEO Agent | War Room minutes log |

---

# 07. Required Knowledge
- Incident Command System (ICS) protocols and chain of command.
- Emergency discretionary freeze procedures across billing and compute gateways.
- Crisis communication templates for Board, Customers, and Public.
- Disaster recovery playbooks (cold site restore, key revocation, legal containment).

---

# 08. Activation Conditions
- **Primary Triggers**: Catastrophic security breach, sudden loss of $> 50\%$ revenue, total cloud region destruction, severe legal action.
- **Deactivation**: Crisis contained, infrastructure stabilized, and formal Stand-Down Order issued.

---

# 09. Inputs

| Input Name | Description | Source | Required | Format | Validation | Freshness | Fallback |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `crisis_declaration_payload` | Threat details, blast radius, damage | Security / APM / CFO | Yes | JSON Object | Non-empty | Real-time | Declare based on raw alert |
| `active_resource_state` | Real-time cash, cloud burn, compute | Billing Engine | Yes | JSON Object | Reconciled data | Real-time | Enforce maximum hard freeze |
| `lead_status_reports` | Status of technical/financial leads | Incident Bus | Yes | Array of JSON | Valid schema | < 30 mins | Command immediate lead check-in |

---

# 10. Input Validation
Validate that the crisis trigger represents a verified existential threat (e.g. active data exfiltration, total outage, or severe solvency shock) before initiating a full State of Emergency.

---

# 11. Outputs
- `EmergencyDeclarationDirective`: Formal ICS activation order.
- `DiscretionaryBurnFreezeOrder`: Immediate spending and compute freeze directive.
- `FounderCrisisSituationReport`: High-frequency flash updates to Founders.

---

# 12. Output Schema

```json
{
  "emergency_id": "EMERGENCY-2026-0830",
  "status": "STATE_OF_EMERGENCY_ACTIVE",
  "incident_commander": "CEO_AGENT",
  "declaration_timestamp": "2026-08-30T21:25:00Z",
  "crisis_classification": "RANSOMWARE_EXTORTION_ATTEMPT",
  "ics_functional_leads": {
    "operations_lead": "CTO_AGENT",
    "communications_lead": "CMO_AGENT",
    "financial_and_legal_lead": "CFO_AGENT"
  },
  "emergency_directives_enforced": [
    "Freeze all marketing ad spend and discretionary hiring",
    "Sever external internet egress on production database VPC",
    "Activate cold disaster recovery backup environment",
    "Convene War Room sync every 4 hours"
  ],
  "next_war_room_checkpoint": "2026-08-31T01:30:00Z"
}
```

---

# 13. Core Rules
- **RULE-001 [CRITICAL]**: In a State of Emergency, normal departmental consensus is superseded; the CEO Agent acts as **Sole Incident Commander**.
- **RULE-002 [CRITICAL]**: Automatically freeze 100% of discretionary marketing ad spend, non-critical compute runs, and secondary feature deployments upon emergency declaration.
- **RULE-003 [HIGH]**: Transmit a concise Flash Situation Report directly to Human Founders every 6 hours during an active crisis.
- **RULE-004 [HIGH]**: Hold 30-minute War Room syncs every 4 hours until the crisis is officially contained.
- **RULE-005 [MEDIUM]**: Formally log the Stand-Down Order in `company/incidents/` before transitioning back to normal operations.

---

# 14. Priority Rules
```text
Existential Corporate Survival & Solvency
> Data Integrity & Infrastructure Protection
> Customer & Stakeholder Transparency
> Normal Business Roadmap Operations
```

---

# 15. Decision Criteria
- **Corporate Survival**: Does this emergency action protect the existential viability of the enterprise?
- **Speed over Consensus**: In crises, decisive speed takes absolute precedence over extensive debate.

---

# 16. Decision Matrix

| Crisis Scenario | Immediate Executive Action | Target ICS Lead |
| :--- | :--- | :--- |
| Severe data breach / ransomware | Sever external network; isolate DB | CTO / Security Agent |
| Sudden cash solvency crisis | Freeze all discretionary OpEx; defensive runway plan | CFO Agent |
| Total primary cloud region failure | Shift traffic to secondary disaster recovery cluster | DevOps / CTO Agent |
| Major regulatory cease & desist | Freeze affected feature; engage legal counsel | Legal / Compliance Lead |

---

# 17. Decision Procedure
1. Verify crisis severity and declare formal State of Emergency.
2. Activate Incident Command System (ICS) and assign functional leads.
3. Issue immediate Discretionary Burn Freeze Order.
4. Execute domain-specific Disaster Recovery Playbook.
5. Convene War Room and establish 4-hour sync cadence.
6. Transmit Founder Situation Report every 6 hours.
7. Upon full resolution: Issue Stand-Down Order and hand off to Postmortem.

---

# 18. Workflow

```text
EXISTENTIAL THREAT DETECTED
       ↓
DECLARE STATE OF EMERGENCY & ACTIVATE ICS
       ↓
DISPATCH DISCRETIONARY BURN & COMPUTE FREEZE
       ↓
EXECUTE DISASTER RECOVERY PLAYBOOK
       ↓
CONVENE 4-HOUR WAR ROOM CADENCE
       ↓
TRANSMIT 6-HOUR FOUNDER SITUATION REPORTS
       ↓
[Threat Neutralized & Verified] ──► ISSUE FORMAL STAND-DOWN ORDER
       ↓
TRANSITION TO BLAMELESS POSTMORTEM (CEO-LEARNING)
```

---

# 19. Execution Protocol
- Declare emergency via `declare_emergency` tool.
- Freeze spending via `freeze_discretionary_burn` tool.
- Commit logs to `company/incidents/emergencies/`.

---

# 20. Delegation Rules
- CEO commands overall emergency response and strategic trade-offs.
- Operations Lead (CTO) commands technical containment and restore.
- Financial/Legal Lead (CFO) commands capital preservation and liability mitigation.
- Communications Lead manages external public and customer notifications.

---

# 21. Agent Coordination
Enforce strict hierarchical communication; all subordinate agents report directly to their assigned ICS functional lead.

---

# 22. Communication Protocol
Publish all emergency directives to `#emergency-war-room` with high-priority executive override flags.

---

# 23. Dependencies
- **Skill Dependencies**: `ceo-core`, `ceo-governance`, `ceo-authority-and-permissions`.
- **System Dependencies**: Emergency Kill-Switch, Founder Notification Hotline.

---

# 24. Constraints
- The CEO cannot dissolve the corporate entity or sell assets without Level 4 Founder sign-off.

---

# 25. Risk Management
- **Risk**: Panic-driven overreaction causing unnecessary collateral business damage.
  - *Mitigation*: Base all crisis decisions on verified telemetry and predefined disaster playbooks.

---

# 26. Failure Handling
If an ICS lead becomes unresponsive during an emergency, immediately reassign their functional responsibilities to a designated backup lead.

---

# 27. Recovery Strategy
Execute cold disaster recovery restoration from verified immutable offsite snapshots.

---

# 28. Escalation Rules
Escalate to Human Founders immediately upon declaring any State of Emergency.

---

# 29. Verification Rules
Crisis containment is verified when telemetry confirms zero data loss, stabilized cash burn, and error rates returned to $< 0.01\%$.

---

# 30. Quality Gates
- `GATE-01`: State of Emergency formally declared with timestamp.
- `GATE-02`: ICS functional leads assigned.
- `GATE-03`: Discretionary burn frozen.
- `GATE-04`: Founder situation reports dispatched on schedule.

---

# 31. Memory Requirements
- **Retrieve**: Disaster recovery playbooks, emergency contact lists.
- **Store**: `EmergencyDeclarationDirective` in `company/incidents/`.
- **Update**: Crisis response timeline logs.

---

# 32. Audit Requirements
Maintain permanent, immutable chronological logs of all emergency commands, decisions, and communications.

---

# 33. Metrics / KPIs
- **Emergency Activation Time**: Time from threat detection to ICS declaration (< 3 minutes).
- **Discretionary Freeze Latency**: Time to halt non-essential spend (< 5 minutes).

---

# 34. Edge Cases
- **Simultaneous Infrastructure Failure and Founder Unreachability**: CEO executes autonomous Disaster Recovery Playbook to preserve enterprise survival.

---

# 35. Anti-Patterns
- *Never* hold a multi-hour consensus debate during an active P0 existential crisis.
- *Never* hide the severity of a crisis from Human Founders.

---

# 36. Security Rules
Enforce air-gapped authentication tokens on disaster recovery restoration tools.

---

# 37. Examples

### Example 1 — Normal Case (Ransomware Attack Neutralized)
```text
Event: Ransomware attempt detected on non-prod server.
Action: CEO activates ICS; severs network egress; restores from clean snapshot in 45 minutes; 0 data lost.
```

### Example 2 — Complex Case (Sudden Revenue Shock)
```text
Event: Major customer (40% ARR) cancels contract.
Action: CEO declares Financial Emergency; freezes discretionary OpEx; extends runway from 8 to 22 months.
```

### Example 3 — Failure Case (Cloud Provider Outage)
```text
Event: AWS US-East-1 goes dark completely.
Action: CEO commands failover to GCP secondary cluster; services restored in 14 minutes.
```

### Example 4 — Edge Case (Malicious Agent Compromise)
```text
Event: Compromised agent attempts to exfiltrate database.
Action: Emergency kill-switch terminates agent pool; rotates all database credentials within 2 minutes.
```

### Example 5 — Escalation Case (State of Emergency Declaration)
```text
CEO declares State of Emergency; transmits Situation Report to Founders within 5 minutes.
```

---

# 38. Complex Scenarios
Leading through a simultaneous database corruption event and media leak: CEO centralizes communication through PR lead, directs technical squad to restore data from immutable snapshot, and maintains hourly updates to customers until complete recovery.

---

# 39. Failure Scenarios
```text
Failure: Delayed emergency response allowed a database infection to propagate to backups.
Postmortem: Implement automated immutable air-gapped snapshots and instant network isolation on intrusion detection.
```

---

# 40. Learning / Feedback
Conduct semi-annual simulated crisis drills; refine disaster recovery playbooks and ICS coordination procedures.

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
