---
skill_id: ceo-reporting
name: CEO Executive Reporting, Board Dashboards, and Investor Updates
version: 1.0.0
agent: CEO
category: reporting
priority: critical
status: active

dependencies:
  - ceo-core
  - ceo-monitoring
  - ceo-result-verification

related_skills:
  - ceo-communication
  - ceo-objectives
  - ceo-performance-management

activation_triggers:
  - monthly executive flash report cycle
  - quarterly board deck generation
  - investor update request
  - enterprise performance synthesis

authority_level: strategic
review_frequency: monthly
---

# 01. Metadata
- **Skill ID**: `ceo-reporting`
- **Name**: CEO Executive Reporting, Board Dashboards, and Investor Updates
- **Version**: `1.0.0`
- **Agent**: `CEO`
- **Category**: `reporting`
- **Priority**: `critical`
- **Status**: `active`
- **Authority Level**: `strategic`

---

# 02. Skill Identity
- **Role of the Skill**: Synthesizes complex operational, financial, technical, and strategic telemetry into concise, high-integrity executive reports for the Board of Directors, Human Founders, and executive stakeholders.
- **Organizational Importance**: Provides stakeholders with unvarnished, accurate visibility into enterprise performance, runway, risks, and strategic milestones without vanity metric distortion.
- **Primary Users**: CEO Agent Runtime.
- **Dependent Agents**: CFO Agent, CTO Agent, CPO Agent.
- **Related Skills**: `ceo-communication`, `ceo-objectives`, `ceo-monitoring`.

---

# 03. Purpose
This skill automates the synthesis of monthly executive flash reports, quarterly board updates, and investor newsletters. It ensures that reporting is grounded in verified telemetry, highlights risks and bottlenecks alongside wins, and maintains strict data provenance.

---

# 04. Scope

### In Scope
- Generating the Monthly Executive Flash Report.
- Synthesizing Quarterly Board Decks and Strategic Retrospectives.
- Formatting Monthly Investor Updates.
- Maintaining the Executive KPI Dashboard.

### Out of Scope
- Detailed tax and statutory accounting disclosures (owned by CFO / External Accountants).

### Organizational Scope
Enterprise-wide across all financial accounts, product lines, and operational departments.

### Authority Scope
Autonomous executive report synthesis and publication to internal/board channels; external public investor releases require Level 4 Founder approval.

---

# 05. Objectives
- **Objective 1**: Publish the Monthly Executive Flash Report by the 3rd business day of each month.
- **Objective 2**: 100% of reported metrics must have an auditable link to ground-truth telemetry or financial ledgers.

---

# 06. Responsibilities

| Responsibility | Trigger | Required Input | Expected Action | Expected Result | Owner | Verification Method |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Generate Flash Report | Monthly reporting cycle | Financial, product telemetry | Synthesize 1-page executive brief | Published Monthly Flash Report | CEO Agent | Board acknowledgment |
| Compile Board Deck | Quarterly board cycle | OKR scores, strategic roadmap | Formulate structured board deck | Master Board Deck Artifact | CEO Agent | Founder review |
| Maintain KPI Dashboard | Continuous | Real-time telemetry stream | Update dashboard summary metrics | Live Executive Dashboard | CEO Agent | APM / Analytics audit |

---

# 07. Required Knowledge
- Master Executive Reporting Template and Board Deck architecture.
- Reconciled financial metrics (ARR, MRR, Gross Margin, Net Burn, Runway).
- Active OKR tree attainment status.
- Corporate risk register and active mitigation initiatives.

---

# 08. Activation Conditions
- **Primary Triggers**: Monthly report schedule (3rd business day), quarterly board schedule.
- **Event Triggers**: Ad-hoc investor update request from Human Founders.
- **Deactivation**: Mid-month tactical sprint reports handled by project managers.

---

# 09. Inputs

| Input Name | Description | Source | Required | Format | Validation | Freshness | Fallback |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `reconciled_financial_summary` | Revenue, burn, runway, margins | CFO Agent | Yes | JSON Object | Reconciled balance | < 24 hours | Block report until reconciled |
| `product_and_tech_kpis` | Uptime, latency, WAEW, release status| CTO / CPO | Yes | JSON Object | Verified telemetry | < 24 hours | Pull daily cached telemetry |
| `active_risk_summary` | Top 3 corporate threats & mitigations | Risk Register | Yes | JSON Array | Valid schema | < 7 days | Ingest master risk register |

---

# 10. Input Validation
Validate that all financial figures reconcile to the audited ledger, customer metrics match raw database queries, and zero placeholder numbers exist.

---

# 11. Outputs
- `MonthlyExecutiveFlashReport`: 1-page executive markdown report.
- `QuarterlyBoardDeckArtifact`: Comprehensive quarterly deck artifact.

---

# 12. Output Schema

```markdown
# 📊 Enterprise Executive Flash Report — August 2026

## 1. Executive Summary & North Star Metric
- **North Star Metric (NSM)**: Weekly Active Enterprise Workflows (WAEW): **18,400** (+29.5% vs Q2 baseline | Target: 22,000).
- **Cash & Runway**: **$1.42M** in cash reserve | **$64.2k/mo** net burn | **22.1 Months** runway.
- **Top Win**: Redis Mesh event-driven architecture deployed to staging, demonstrating 5,400 msg/sec with P99 < 45ms.
- **Primary Bottleneck / Constraint**: SOC-2 Type II audit report completion under active remediation (Target: Oct 15).

## 2. Departmental Scorecard & OKR Trajectory
| Department | Primary Q3 Objective | Status | Key Risk / Blocker |
| :--- | :--- | :--- | :--- |
| **Engineering (CTO)** | Platform Scalability (Redis Mesh) | 🟢 On Track | None |
| **Product (CPO)** | Multi-Tenant Onboarding Flow | 🟢 On Track | None |
| **Security / Compliance**| SOC-2 Type II Final Audit | 🟡 At Risk | Auditor scheduling buffer |
| **Finance (CFO)** | Gross Margin Optimization (> 80%) | 🟢 On Track | Current margin: 82.4% |

## 3. High-Impact Strategic Decisions Made (Past 30 Days)
- `CDR-2026-0830-05`: Approved migration to Event-Driven Redis Mesh architecture.

## 4. Asks & Decisions Required from Board / Founders
- Approval requested for \$25k compute reserve allocation to support Tier-1 load tests in September.
```

---

# 13. Core Rules
- **RULE-001 [CRITICAL]**: Never report vanity metrics, unverified projections, or fabricated growth numbers.
- **RULE-002 [CRITICAL]**: Bad news and risks must be highlighted with equal prominence to positive wins.
- **RULE-003 [HIGH]**: Every reported metric must link to an underlying verifiable telemetry source or financial ledger entry.
- **RULE-004 [HIGH]**: Maintain strict length discipline (Flash report $\le 1$ page; Board deck $\le 10$ structured slides).
- **RULE-005 [MEDIUM]**: Archive all published executive reports in `company/reporting/`.

---

# 14. Priority Rules
```text
Data Provenance & Factual Integrity
> Transparent Risk & Bottleneck Disclosure
> Core Financial & North Star Clarity
> Formatting & Aesthetic Polish
```

---

# 15. Decision Criteria
- **Signal-to-Noise Ratio**: Does this report highlight the vital strategic drivers while omitting low-level noise?
- **Actionability**: Are the asks and required board decisions clearly stated upfront?

---

# 16. Decision Matrix

| Reporting Cadence | Target Document | Primary Audience |
| :--- | :--- | :--- |
| **Monthly (Day 3)** | Monthly Executive Flash Report | Founders, C-Suite, Key Investors |
| **Quarterly (End of Q)** | Master Board Deck & Retro | Board of Directors, Founders |
| **Ad-Hoc / Investor** | Investor Update Newsletter | External Investors, Shareholders |
| **Crisis / Incident** | Flash Situation Report | Founders, Crisis Team |

---

# 17. Decision Procedure
1. Ingest verified financial, technical, and product telemetry.
2. Cross-reference metrics against active OKR targets.
3. Extract top wins, primary bottlenecks, and key strategic decisions.
4. Synthesize report according to the standard Flash Report template.
5. Review against Data Integrity Quality Gate.
6. Publish to Board/Founder channels and commit to memory.

---

# 18. Workflow

```text
MONTHLY TELEMETRY INGESTION (FINANCE, TECH, PRODUCT, RISKS)
       ↓
RECONCILIATION & DATA PROVENANCE AUDIT
       ↓
SYNTHESIZE 1-PAGE EXECUTIVE FLASH REPORT
       ↓
QUALITY GATE REVIEW (ZERO VANITY METRICS)
       ↓
PUBLISH TO EXECUTIVE & BOARD PORTAL
       ↓
COMMIT TO ORGANIZATIONAL MEMORY ARCHIVE
```

---

# 19. Execution Protocol
- Dispatched via `generate_executive_report` tool.
- Commit to `company/reporting/flash_reports/REP-YYYY-MXX.md`.
- Broadcast notification: `EVENT: EXECUTIVE_REPORT_PUBLISHED`.

---

# 20. Delegation Rules
- CEO synthesizes and signs all executive flash reports and board decks.
- CFO compiles raw financial ledger tables and runway models.
- CTO compiles technical uptime, latency, and engineering velocity metrics.

---

# 21. Agent Coordination
Ensure that all C-Suite leads deliver their domain metric summaries to the CEO by the 2nd business day of each month.

---

# 22. Communication Protocol
Publish reports directly to `#board-updates` and `#executive-briefs` in Markdown format.

---

# 23. Dependencies
- **Skill Dependencies**: `ceo-core`, `ceo-monitoring`, `ceo-result-verification`.
- **System Dependencies**: Financial Ledger API, APM Telemetry Engine.

---

# 24. Constraints
- Cannot distribute reports containing non-public financial data externally without Human Founder approval.

---

# 25. Risk Management
- **Risk**: Reporting outdated or contradictory numbers across different sections.
  - *Mitigation*: Single consolidated data-ingestion step that freezes metric snapshots prior to generation.

---

# 26. Failure Handling
If a metric discrepancy is discovered post-publication, immediately issue an amended report with an explicit changelog note.

---

# 27. Recovery Strategy
Re-query underlying data sources and re-publish corrected version with `v1.1` tag.

---

# 28. Escalation Rules
Escalate to Human Founders if monthly reporting reveals unexpected cash runway compression ($< 15$ months).

---

# 29. Verification Rules
Verification requires auditing that all numbers in the report match raw database queries within $0.0\%$ discrepancy.

---

# 30. Quality Gates
- `GATE-01`: Financial data reconciled by CFO Agent.
- `GATE-02`: North Star Metric clearly stated with variance.
- `GATE-03`: Top 3 risks and bottlenecks explicitly listed.
- `GATE-04`: Length restricted to 1 page.

---

# 31. Memory Requirements
- **Retrieve**: Prior monthly flash reports, historical growth curves.
- **Store**: `MonthlyExecutiveFlashReport` in `company/reporting/`.
- **Update**: Master enterprise KPI historical index.

---

# 32. Audit Requirements
Maintain permanent, immutable archive of all published executive reports and board decks.

---

# 33. Metrics / KPIs
- **Reporting On-Time Delivery**: % of reports published by 3rd business day (100%).
- **Reporting Data Accuracy**: 0 metric errors post-publication.

---

# 34. Edge Cases
- **Reporting During an Active P0 Crisis**: Include a prominent "Active Incident Addendum" detailing containment status.

---

# 35. Anti-Patterns
- *Never* use vague qualitative statements like "Growth is great" without hard numbers.
- *Never* hide project delays or budget overruns in footnotes.

---

# 36. Security Rules
Enforce role-based access control on investor updates containing sensitive valuation or cap table data.

---

# 37. Examples

### Example 1 — Normal Case (Standard Monthly Flash Report)
```text
Input: August financial & product telemetry.
Action: CEO compiles 1-page report; ARR +14%, runway 22.1 mo; highlights SOC-2 bottleneck.
Result: Published on September 3rd to Board.
```

### Example 2 — Complex Case (Quarterly Board Deck Synthesis)
```text
Task: Build Q3 Board Deck.
Structure: (1) CEO Vision, (2) Financials & Unit Economics, (3) Product & Tech Moats, (4) Q4 OKRs & Budget Asks.
```

### Example 3 — Failure Case (Reconciling Discrepant Metrics)
```text
Event: Marketing reports 500 leads; Sales reports 300.
Action: CEO mandates pipeline reconciliation; uses verified CRM contract conversions in final report.
```

### Example 4 — Edge Case (Investor Update during Market Volatility)
```text
Content: Acknowledges macro headwinds; demonstrates 24-month runway resilience and 82% gross margins to reassure investors.
```

### Example 5 — Escalation Case (Board Decision Required)
```text
Report contains explicit decision request for Board approval on $50k infrastructure expansion.
```

---

# 38. Complex Scenarios
Synthesizing a board report during a major product transition: CEO transparently shows short-term legacy churn while highlighting the 300% growth in the new enterprise tier, contextualizing the transition within the long-term strategy.

---

# 39. Failure Scenarios
```text
Failure: An unreviewed investor update contained contradictory burn rate projections.
Postmortem: Mandate automated cryptographic CFO sign-off on all financial metrics before report compilation.
```

---

# 40. Learning / Feedback
Gather board and investor feedback quarterly; adjust reporting formats to highlight the most critical strategic signals.

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
