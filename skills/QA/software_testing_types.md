# Software Testing Types --- Comprehensive Reference

## 1. Overview

Software testing is the systematic process of evaluating software to
verify that it meets functional, non-functional, security, performance,
usability, reliability, compatibility, and business requirements.

This document provides a comprehensive classification of software
testing types that can be used by QA engineers, QA agents, developers,
automation engineers, security teams, performance teams, and release
teams.

------------------------------------------------------------------------

# 2. Testing Classification by Execution

## 2.1 Static Testing

Testing performed without executing the software.

### Types

-   Requirement review
-   Specification review
-   Design review
-   Architecture review
-   Code review
-   Peer review
-   Walkthrough
-   Inspection
-   Technical review
-   Static code analysis
-   Static security analysis
-   Documentation review

### Goal

Detect defects as early as possible before runtime execution.

------------------------------------------------------------------------

## 2.2 Dynamic Testing

Testing performed by executing the application or system.

### Types

-   Functional testing
-   Non-functional testing
-   Regression testing
-   Integration testing
-   System testing
-   Acceptance testing
-   Exploratory testing

------------------------------------------------------------------------

# 3. Testing by Test Level

## 3.1 Unit Testing

Tests the smallest independently testable component.

Examples: - Function - Method - Class - Module - Component

Focus: - Local logic - Input/output behavior - Edge cases - Error
handling

------------------------------------------------------------------------

## 3.2 Component Testing

Tests an individual software component, usually with dependencies
isolated or controlled.

Examples: - React component - Authentication module - Payment service -
Database repository

------------------------------------------------------------------------

## 3.3 Integration Testing

Tests interactions between two or more components.

### Types

-   Big-bang integration
-   Top-down integration
-   Bottom-up integration
-   Sandwich integration
-   Incremental integration
-   API integration testing
-   Database integration testing
-   Service-to-service integration testing
-   Third-party integration testing

------------------------------------------------------------------------

## 3.4 System Testing

Tests the complete integrated system against system requirements.

Examples: - End-to-end business workflows - Authentication - Checkout -
Order processing - Reporting - Notifications

------------------------------------------------------------------------

## 3.5 Acceptance Testing

Determines whether the system is acceptable for business or user use.

### Types

-   User Acceptance Testing (UAT)
-   Business Acceptance Testing (BAT)
-   Operational Acceptance Testing (OAT)
-   Contract Acceptance Testing
-   Regulatory Acceptance Testing
-   Alpha testing
-   Beta testing
-   Customer acceptance testing

------------------------------------------------------------------------

# 4. Functional Testing

Functional testing verifies what the software does.

## 4.1 Smoke Testing

A quick test of critical functionality after a build is deployed.

Purpose: - Determine whether the build is stable enough for deeper
testing.

Typical checks: - Application launches - Login works - Core API
responds - Critical pages load - Primary workflow works

------------------------------------------------------------------------

## 4.2 Sanity Testing

A focused test after a small change, bug fix, or build update.

Purpose: - Verify that the targeted functionality works. - Confirm that
the change did not introduce obvious related failures.

------------------------------------------------------------------------

## 4.3 Regression Testing

Ensures existing functionality continues to work after changes.

### Forms

-   Full regression
-   Partial regression
-   Targeted regression
-   Automated regression
-   Risk-based regression

------------------------------------------------------------------------

## 4.4 Retesting

Tests a previously failed defect after it has supposedly been fixed.

Difference:

**Retesting:** Verify the specific defect fix.

**Regression testing:** Verify that other existing functionality still
works.

------------------------------------------------------------------------

## 4.5 End-to-End Testing

Tests a complete real-world workflow from beginning to end.

Example:

User registration → Login → Product search → Cart → Payment → Order
confirmation → Email notification.

------------------------------------------------------------------------

## 4.6 Exploratory Testing

Testers simultaneously learn the system, design tests, and execute them.

Useful for: - Unknown risks - New features - Unusual workflows - Finding
defects not covered by scripted tests

------------------------------------------------------------------------

## 4.7 Ad Hoc Testing

Informal testing without a predefined test case structure.

Purpose: - Quickly discover unexpected problems.

------------------------------------------------------------------------

## 4.8 Error Guessing

Uses tester experience to predict likely failure areas.

Examples: - Empty input - Null values - Duplicate submissions - Very
large input - Special characters - Invalid dates

------------------------------------------------------------------------

## 4.9 Scenario Testing

Tests realistic business scenarios rather than isolated functions.

------------------------------------------------------------------------

## 4.10 Workflow Testing

Validates multi-step workflows and transitions between states.

------------------------------------------------------------------------

# 5. UI and Frontend Testing

## 5.1 UI Testing

Verifies: - Buttons - Forms - Navigation - Labels - Modals - Tables -
Components - Visual states

------------------------------------------------------------------------

## 5.2 Visual Testing

Detects unintended visual changes.

Examples: - Layout shifts - Incorrect spacing - Font changes - Missing
icons - Incorrect colors - Component rendering differences

------------------------------------------------------------------------

## 5.3 Snapshot Testing

Compares a component's current rendered representation against an
approved snapshot.

------------------------------------------------------------------------

## 5.4 Cross-Browser Testing

Tests the application across browsers.

Examples: - Chrome - Firefox - Edge - Safari

------------------------------------------------------------------------

## 5.5 Responsive Testing

Tests behavior across: - Desktop - Laptop - Tablet - Mobile - Different
resolutions - Different orientations

------------------------------------------------------------------------

## 5.6 Accessibility Testing

Tests whether software can be used by people with disabilities.

Areas: - Keyboard navigation - Screen readers - Focus management - Color
contrast - Semantic HTML - ARIA - Alternative text - Form accessibility

------------------------------------------------------------------------

# 6. API Testing

API testing validates service interfaces without necessarily interacting
through the UI.

## Types

-   REST API testing
-   GraphQL testing
-   SOAP testing
-   WebSocket testing
-   Contract testing
-   Schema testing
-   Endpoint testing
-   Authentication testing
-   Authorization testing
-   Error-response testing
-   Rate-limit testing
-   API performance testing
-   API security testing
-   Data validation testing

### Validate

-   Status codes
-   Headers
-   Request body
-   Response body
-   Schema
-   Authentication
-   Authorization
-   Error handling
-   Idempotency
-   Pagination
-   Filtering
-   Sorting

------------------------------------------------------------------------

# 7. Database Testing

Database testing validates data storage and data integrity.

## Types

-   Database CRUD testing
-   Data integrity testing
-   Data consistency testing
-   Schema testing
-   Stored procedure testing
-   Trigger testing
-   View testing
-   Index testing
-   Constraint testing
-   Migration testing
-   Backup testing
-   Restore testing
-   Replication testing
-   Transaction testing
-   Concurrency testing

------------------------------------------------------------------------

# 8. Data Testing

## Types

-   Data validation
-   Data reconciliation
-   Data completeness
-   Data accuracy
-   Data consistency
-   Data transformation testing
-   ETL testing
-   ELT testing
-   Data pipeline testing
-   Data migration testing
-   Data quality testing
-   Data lineage validation

------------------------------------------------------------------------

# 9. Performance Testing

Performance testing determines how the system behaves under different
workloads.

## 9.1 Load Testing

Tests expected normal and peak workloads.

------------------------------------------------------------------------

## 9.2 Stress Testing

Pushes the system beyond expected capacity.

Goal: - Identify breaking points. - Observe failure behavior. - Verify
recovery.

------------------------------------------------------------------------

## 9.3 Spike Testing

Suddenly increases or decreases workload.

Example:

1,000 users → 100,000 users within seconds.

------------------------------------------------------------------------

## 9.4 Endurance Testing

Runs the system for an extended period.

Detects: - Memory leaks - Resource exhaustion - Performance
degradation - Connection leaks

------------------------------------------------------------------------

## 9.5 Volume Testing

Tests very large amounts of data.

------------------------------------------------------------------------

## 9.6 Scalability Testing

Determines whether performance remains acceptable as resources or
workload increase.

------------------------------------------------------------------------

## 9.7 Capacity Testing

Determines the maximum sustainable workload under defined conditions.

------------------------------------------------------------------------

## 9.8 Concurrency Testing

Tests many simultaneous users, requests, transactions, or operations.

------------------------------------------------------------------------

## 9.9 Benchmark Testing

Measures performance against a defined baseline.

------------------------------------------------------------------------

## 9.10 Soak Testing

A long-running performance test intended to reveal stability and
resource problems.

------------------------------------------------------------------------

# 10. Security Testing

Security testing identifies vulnerabilities and verifies security
controls.

## Types

-   Vulnerability assessment
-   Penetration testing
-   Security regression testing
-   Authentication testing
-   Authorization testing
-   Session testing
-   Input validation testing
-   Encryption testing
-   Secrets-management testing
-   API security testing
-   Network security testing
-   Configuration security testing
-   Dependency security testing
-   Container security testing
-   Cloud security testing
-   Identity testing
-   Access-control testing
-   Security logging testing
-   Security monitoring testing

------------------------------------------------------------------------

## 10.1 Common Security Areas

### Authentication

-   Password policy
-   MFA
-   Account lockout
-   Session expiration
-   Token validation

### Authorization

-   Role-based access
-   Permission boundaries
-   Object-level authorization
-   Privilege escalation

### Input Security

-   Injection
-   Malicious payloads
-   File upload abuse
-   Path traversal
-   Command injection

### Session Security

-   Session fixation
-   Session hijacking
-   Cookie security
-   Token expiration

------------------------------------------------------------------------

# 11. Compatibility Testing

Tests whether software works correctly across different environments.

## Types

-   Browser compatibility
-   Operating system compatibility
-   Device compatibility
-   Hardware compatibility
-   Network compatibility
-   Database compatibility
-   Runtime compatibility
-   Version compatibility
-   Backward compatibility
-   Forward compatibility
-   Cloud compatibility

------------------------------------------------------------------------

# 12. Mobile Application Testing

## Types

-   Functional testing
-   UI testing
-   Device testing
-   OS-version testing
-   Network testing
-   Interrupt testing
-   Installation testing
-   Upgrade testing
-   Uninstallation testing
-   Battery testing
-   Memory testing
-   Storage testing
-   Permission testing
-   Notification testing
-   Localization testing
-   Offline testing
-   Background/foreground testing
-   Rotation testing
-   Touch and gesture testing

------------------------------------------------------------------------

# 13. Reliability and Resilience Testing

## 13.1 Reliability Testing

Measures whether software performs consistently over time.

------------------------------------------------------------------------

## 13.2 Recovery Testing

Verifies that the system recovers after failures.

Examples: - Server crash - Database failure - Network failure - Process
termination

------------------------------------------------------------------------

## 13.3 Failover Testing

Verifies automatic switching to a backup system.

------------------------------------------------------------------------

## 13.4 Fault Injection Testing

Intentionally introduces failures to validate system behavior.

------------------------------------------------------------------------

## 13.5 Chaos Testing

Introduces controlled failures into distributed systems to evaluate
resilience.

Examples: - Kill services - Add latency - Drop network traffic - Restart
instances - Exhaust selected resources

------------------------------------------------------------------------

## 13.6 Disaster Recovery Testing

Tests recovery from major infrastructure failures.

------------------------------------------------------------------------

## 13.7 Business Continuity Testing

Tests whether critical business operations can continue during
disruptions.

------------------------------------------------------------------------

# 14. Installation and Deployment Testing

## Types

-   Installation testing
-   Uninstallation testing
-   Upgrade testing
-   Downgrade testing
-   Patch testing
-   Deployment testing
-   Rollback testing
-   Configuration testing
-   Environment testing
-   Infrastructure testing
-   Release testing

------------------------------------------------------------------------

# 15. DevOps and CI/CD Testing

## Types

-   Pipeline validation
-   Build verification
-   Deployment verification
-   Infrastructure testing
-   Infrastructure-as-Code testing
-   Container testing
-   Kubernetes testing
-   Configuration testing
-   Environment validation
-   Automated regression testing
-   Release validation
-   Rollback validation
-   Post-deployment testing

------------------------------------------------------------------------

# 16. Cloud Testing

## Types

-   Cloud compatibility testing
-   Multi-region testing
-   Auto-scaling testing
-   Availability testing
-   Failover testing
-   Cloud security testing
-   IAM testing
-   Storage testing
-   Network testing
-   Cost-control validation
-   Disaster recovery testing

------------------------------------------------------------------------

# 17. Distributed Systems Testing

## Types

-   Service discovery testing
-   Distributed transaction testing
-   Event-driven testing
-   Message queue testing
-   Event ordering testing
-   Duplicate message testing
-   Retry testing
-   Timeout testing
-   Circuit breaker testing
-   Idempotency testing
-   Distributed consistency testing
-   Leader election testing
-   Partition testing

------------------------------------------------------------------------

# 18. Microservices Testing

## Testing Layers

1.  Unit testing
2.  Component testing
3.  API testing
4.  Contract testing
5.  Integration testing
6.  Service interaction testing
7.  End-to-end testing
8.  Resilience testing
9.  Observability testing

------------------------------------------------------------------------

# 19. Contract Testing

Validates that a service provider and consumer agree on an interface
contract.

Useful for: - Microservices - APIs - Event-driven systems

Validates: - Request structure - Response structure - Data types -
Required fields - Error behavior - Compatibility

------------------------------------------------------------------------

# 20. Localization and Internationalization Testing

## Localization Testing

Tests software for a specific locale.

Examples: - Language - Currency - Date format - Number format - Address
format - Time zone

## Internationalization Testing

Tests whether software can support multiple languages and locales
without architectural changes.

------------------------------------------------------------------------

# 21. Usability Testing

Evaluates how easily users can understand and operate the software.

Measures: - Learnability - Efficiency - Error rate - User satisfaction -
Discoverability - Navigation quality

------------------------------------------------------------------------

# 22. Accessibility Testing

A specialized usability and compliance area.

### Test

-   Keyboard-only operation
-   Screen reader compatibility
-   Focus order
-   Focus visibility
-   Semantic structure
-   Color contrast
-   Zoom
-   Text resizing
-   Captions
-   Alternative text

------------------------------------------------------------------------

# 23. Compliance Testing

Determines whether software follows applicable laws, regulations,
standards, contracts, or organizational controls.

Examples: - Privacy requirements - Financial controls - Industry
regulations - Accessibility standards - Internal security standards

------------------------------------------------------------------------

# 24. Recovery and Backup Testing

## Types

-   Backup validation
-   Restore testing
-   Point-in-time recovery testing
-   Database recovery testing
-   File recovery testing
-   Disaster recovery testing
-   Failover testing
-   Rollback testing

------------------------------------------------------------------------

# 25. Configuration Testing

Tests software under different configuration combinations.

Examples: - Environment variables - Feature flags - Database
configurations - Cache settings - API endpoints - Authentication
providers - Logging levels

------------------------------------------------------------------------

# 26. Exploratory and Experience-Based Testing

## Types

-   Exploratory testing
-   Ad hoc testing
-   Error guessing
-   Checklist-based testing
-   Session-based testing
-   Experience-based testing
-   Heuristic testing
-   Investigative testing

------------------------------------------------------------------------

# 27. Risk-Based Testing

Prioritizes testing based on risk.

Risk factors: - Business impact - Probability of failure - Security
impact - User impact - Technical complexity - Change size - Regulatory
importance

------------------------------------------------------------------------

# 28. Mutation Testing

Intentionally introduces small changes (mutants) into code to determine
whether the test suite detects them.

Purpose: - Measure test effectiveness. - Identify weak tests.

------------------------------------------------------------------------

# 29. Property-Based Testing

Tests general properties that should remain true across many generated
inputs.

Example:

For a sorting function:

`sort(sort(data)) == sort(data)`

------------------------------------------------------------------------

# 30. Fuzz Testing

Provides unexpected, malformed, random, or generated inputs to discover
crashes and robustness problems.

Useful for: - Parsers - APIs - File formats - Protocols -
Security-sensitive components

------------------------------------------------------------------------

# 31. AI/ML Software Testing

For systems containing machine-learning or generative-AI components.

## Types

-   Model functional testing
-   Dataset validation
-   Data drift testing
-   Model regression testing
-   Model performance testing
-   Bias evaluation
-   Robustness testing
-   Adversarial testing
-   Prompt testing
-   Prompt injection testing
-   Output validation
-   Hallucination evaluation
-   Safety evaluation
-   Toxicity evaluation
-   Grounding evaluation
-   Retrieval evaluation
-   RAG testing
-   Tool-use testing
-   Agent workflow testing
-   LLM evaluation
-   Model comparison testing
-   Guardrail testing
-   Determinism/reproducibility testing

------------------------------------------------------------------------

# 32. Agentic AI Testing

For systems containing autonomous or semi-autonomous agents.

## Types

-   Agent capability testing
-   Agent instruction testing
-   Tool-use testing
-   Planning testing
-   Task decomposition testing
-   Multi-agent coordination testing
-   Agent communication testing
-   Memory testing
-   Context management testing
-   State-management testing
-   Goal-alignment testing
-   Failure-recovery testing
-   Agent safety testing
-   Permission testing
-   Human-in-the-loop testing
-   Long-horizon task testing
-   Non-deterministic behavior testing
-   Agent regression testing
-   Cost testing
-   Token-usage testing
-   Latency testing
-   Evaluation-suite testing

------------------------------------------------------------------------

# 33. Database and Transaction Testing

## Types

-   ACID testing
-   Transaction rollback testing
-   Commit testing
-   Isolation testing
-   Deadlock testing
-   Race-condition testing
-   Locking testing
-   Concurrent transaction testing
-   Referential-integrity testing

------------------------------------------------------------------------

# 34. Network Testing

## Types

-   Connectivity testing
-   Latency testing
-   Bandwidth testing
-   Packet-loss testing
-   DNS testing
-   Proxy testing
-   Firewall testing
-   TLS testing
-   Load-balancer testing
-   Network-failure testing
-   Offline testing
-   Intermittent-connectivity testing

------------------------------------------------------------------------

# 35. Messaging and Event Testing

For Kafka, RabbitMQ, queues, streams, event buses, and similar systems.

## Types

-   Message delivery testing
-   Message ordering testing
-   Duplicate-message testing
-   Retry testing
-   Dead-letter testing
-   Consumer testing
-   Producer testing
-   Serialization testing
-   Schema compatibility testing
-   Event replay testing
-   Offset testing
-   Exactly-once/at-least-once behavior testing

------------------------------------------------------------------------

# 36. File and Storage Testing

## Types

-   File upload testing
-   File download testing
-   File format testing
-   File size testing
-   File corruption testing
-   Permission testing
-   Storage quota testing
-   Encryption testing
-   Backup testing
-   Recovery testing
-   Concurrent access testing

------------------------------------------------------------------------

# 37. Payment Testing

For financial and commerce systems.

## Types

-   Payment authorization testing
-   Payment capture testing
-   Refund testing
-   Partial refund testing
-   Cancellation testing
-   Failed-payment testing
-   Retry testing
-   Duplicate-payment testing
-   Idempotency testing
-   Webhook testing
-   Settlement testing
-   Currency testing
-   Tax testing
-   Fraud-control testing

Use sandbox/test environments and approved test payment instruments.

------------------------------------------------------------------------

# 38. Email, SMS, and Notification Testing

## Types

-   Delivery testing
-   Template testing
-   Content testing
-   Link testing
-   Attachment testing
-   Localization testing
-   Retry testing
-   Failure handling
-   Duplicate notification testing
-   Preference testing
-   Unsubscribe testing
-   Push-notification testing

------------------------------------------------------------------------

# 39. Logging and Observability Testing

## Types

-   Log generation testing
-   Log completeness testing
-   Structured logging testing
-   Correlation-ID testing
-   Trace testing
-   Metrics testing
-   Alert testing
-   Dashboard testing
-   Monitoring coverage testing
-   Sensitive-data exposure testing

------------------------------------------------------------------------

# 40. Maintainability Testing

Evaluates how easily software can be modified, debugged, and maintained.

Areas: - Code quality - Modularity - Documentation - Complexity -
Dependency management - Testability - Technical debt - Static analysis
results

------------------------------------------------------------------------

# 41. Portability Testing

Tests whether software can be moved between environments.

Examples: - Operating systems - Cloud providers - Hardware platforms -
Database engines - Runtime versions

------------------------------------------------------------------------

# 42. Interoperability Testing

Tests whether the software correctly interacts with external systems
using agreed protocols and data formats.

------------------------------------------------------------------------

# 43. Upgrade and Migration Testing

## Types

-   Version upgrade testing
-   Database migration testing
-   Schema migration testing
-   Data migration testing
-   Backward compatibility testing
-   Forward compatibility testing
-   Rollback testing
-   Zero-downtime migration testing

------------------------------------------------------------------------

# 44. Release Testing

Before production release, validate:

-   Critical workflows
-   Regression suite
-   Security checks
-   Performance thresholds
-   Deployment
-   Configuration
-   Monitoring
-   Rollback
-   Data migrations
-   Business acceptance

------------------------------------------------------------------------

# 45. Production Testing

Testing performed safely in production or production-like environments.

## Types

-   Smoke checks
-   Health checks
-   Synthetic monitoring
-   Canary testing
-   Blue-green validation
-   Feature-flag validation
-   Post-deployment validation
-   Real-user monitoring
-   Production observability validation

Production testing must be designed to avoid harming users or real data.

------------------------------------------------------------------------

# 46. Canary Testing

Releases a change to a small percentage of traffic before wider rollout.

Compare: - Error rate - Latency - Conversion - Resource usage - Business
metrics

------------------------------------------------------------------------

# 47. A/B Testing

Compares two or more variants with controlled user groups.

Common areas: - UI - Features - Pricing experiments - Recommendations -
User workflows

A/B testing is primarily an experimentation method, but requires strong
validation and statistical controls.

------------------------------------------------------------------------

# 48. Feature Flag Testing

Tests software behavior under different feature-flag combinations.

Test: - Enabled state - Disabled state - Partial rollout - User
targeting - Role targeting - Rollback - Configuration consistency

------------------------------------------------------------------------

# 49. Negative Testing

Provides invalid or unexpected inputs to verify correct error handling.

Examples: - Invalid credentials - Empty fields - Invalid formats -
Missing parameters - Unauthorized requests - Unsupported values

------------------------------------------------------------------------

# 50. Positive Testing

Provides valid expected inputs and verifies successful behavior.

------------------------------------------------------------------------

# 51. Boundary Value Testing

Tests values at and around boundaries.

Example:

If age must be 18--60:

-   17
-   18
-   19
-   59
-   60
-   61

------------------------------------------------------------------------

# 52. Equivalence Partitioning

Divides input data into classes expected to behave similarly.

Example:

Age: - Below minimum - Valid range - Above maximum

Test representative values from each class.

------------------------------------------------------------------------

# 53. Decision Table Testing

Tests combinations of conditions and expected outcomes.

Useful for: - Business rules - Pricing - Permissions - Eligibility -
Promotions

------------------------------------------------------------------------

# 54. State Transition Testing

Tests behavior as an object moves between states.

Example:

Order:

`Created → Paid → Processing → Shipped → Delivered`

Also test invalid transitions.

------------------------------------------------------------------------

# 55. Pairwise Testing

Tests combinations of parameters efficiently rather than testing every
possible combination.

Useful when there are many configuration variables.

------------------------------------------------------------------------

# 56. Cause-and-Effect Testing

Maps input conditions to expected outputs and uses those relationships
to derive test cases.

------------------------------------------------------------------------

# 57. GUI Automation Testing

Automates interaction with graphical interfaces.

Examples: - Browser automation - Desktop automation - Mobile UI
automation

------------------------------------------------------------------------

# 58. Test Automation Testing

## Automation Areas

-   Unit automation
-   API automation
-   UI automation
-   Integration automation
-   Regression automation
-   Performance automation
-   Security automation
-   Accessibility automation
-   Visual regression automation
-   Contract automation

------------------------------------------------------------------------

# 59. Test Infrastructure Testing

Tests the test environment itself.

Includes: - Test data generation - Test database setup - Mock services -
Service virtualization - Test containers - CI runners - Automation
framework - Test reporting - Test artifact storage

------------------------------------------------------------------------

# 60. Test Data Testing

## Types

-   Test data validity
-   Test data completeness
-   Test data uniqueness
-   Test data isolation
-   Synthetic data testing
-   Masked-data validation
-   Data refresh testing
-   Data reset testing
-   Test-data lifecycle testing

------------------------------------------------------------------------

# 61. Mocking and Service Virtualization Testing

Uses simulated dependencies to test systems when real dependencies are
unavailable, expensive, slow, or unsafe.

Examples: - Mock APIs - Stub services - Fake databases - Virtualized
third-party services

------------------------------------------------------------------------

# 62. Testing by Test Intent

  Category          Main Question
  ----------------- -------------------------------------
  Functional        Does it do what it should?
  Performance       Is it fast and scalable enough?
  Security          Is it protected against threats?
  Usability         Can users use it effectively?
  Reliability       Does it work consistently?
  Compatibility     Does it work across environments?
  Accessibility     Can users with disabilities use it?
  Maintainability   Can engineers change it safely?
  Recovery          Can it recover after failure?
  Compliance        Does it meet required rules?
  Resilience        Does it survive failures?

------------------------------------------------------------------------

# 63. Recommended QA Testing Pyramid

A mature testing strategy generally emphasizes cheaper tests at lower
layers and uses fewer expensive end-to-end tests.

``` text
                 /\
                /  \
               / E2E \
              /--------\
             / Integration \
            /--------------\
           /  API/Component  \
          /------------------\
         /    Unit Tests      \
        /----------------------\
```

The exact distribution should depend on the product architecture and
risk profile.

------------------------------------------------------------------------

# 64. Testing Lifecycle

``` text
Requirements
     ↓
Test Planning
     ↓
Risk Analysis
     ↓
Test Design
     ↓
Test Data Preparation
     ↓
Environment Preparation
     ↓
Test Execution
     ↓
Defect Detection
     ↓
Defect Triage
     ↓
Retesting
     ↓
Regression Testing
     ↓
Quality Evaluation
     ↓
Release Decision
     ↓
Production Validation
     ↓
Post-Release Monitoring
```

------------------------------------------------------------------------

# 65. Defect Lifecycle

``` text
New
 ↓
Triaged
 ↓
Assigned
 ↓
In Progress
 ↓
Fixed
 ↓
Ready for Retest
 ↓
Retested
 ├── Failed → Reopened
 └── Passed → Closed
```

Possible additional states: - Duplicate - Rejected - Won't Fix - Cannot
Reproduce - Deferred - Not a Bug

------------------------------------------------------------------------

# 66. QA Agent Testing Coverage

For an automated QA Agent, testing should be organized into these major
dimensions:

## Functional

-   Unit
-   Component
-   Integration
-   API
-   System
-   End-to-end
-   Acceptance
-   Regression
-   Smoke
-   Sanity

## Non-Functional

-   Performance
-   Scalability
-   Reliability
-   Availability
-   Usability
-   Accessibility
-   Compatibility
-   Maintainability

## Security

-   Authentication
-   Authorization
-   Input validation
-   Session security
-   Dependency security
-   API security
-   Configuration security

## Data

-   Database
-   Migration
-   Integrity
-   Consistency
-   ETL
-   Data quality

## Resilience

-   Failure injection
-   Recovery
-   Failover
-   Disaster recovery
-   Chaos testing

## AI/Agent

-   Model behavior
-   Prompt behavior
-   Tool use
-   Memory
-   Context
-   RAG
-   Hallucination
-   Safety
-   Multi-agent coordination
-   Long-horizon execution

------------------------------------------------------------------------

# 67. Risk-Based Test Selection

Not every feature requires every testing type.

A QA system should select tests based on:

``` text
Business Risk
+
Technical Risk
+
Security Risk
+
Change Scope
+
User Impact
+
Failure Probability
+
Regulatory Impact
+
Dependency Complexity
=
Testing Priority
```

Example:

A payment service should receive significantly deeper security,
integration, failure, concurrency, data-integrity, and regression
testing than a low-risk informational page.

------------------------------------------------------------------------

# 68. Automated Test Decision Matrix

  -----------------------------------------------------------------------
  Change                              Recommended Tests
  ----------------------------------- -----------------------------------
  UI text change                      UI/smoke + visual check

  New function                        Unit + integration

  New API                             API + contract + security

  Database schema change              Migration + integration +
                                      regression

  Authentication change               Unit + API + security + E2E

  Payment change                      Unit + API + integration +
                                      security + failure + regression

  Performance-sensitive change        Unit + load + benchmark

  Infrastructure change               Deployment + smoke + resilience

  AI prompt/model change              Evaluation + regression + safety +
                                      task-specific tests

  Multi-agent workflow change         Agent workflow + tool-use +
                                      coordination + regression
  -----------------------------------------------------------------------

------------------------------------------------------------------------

# 69. Quality Gates

A release can use quality gates such as:

-   Critical tests passing
-   No unresolved critical defects
-   Security thresholds satisfied
-   Performance thresholds satisfied
-   Required regression tests passing
-   Accessibility requirements satisfied
-   Migration validated
-   Monitoring available
-   Rollback verified
-   Business acceptance completed

------------------------------------------------------------------------

# 70. Final Testing Taxonomy

A comprehensive software QA system can organize testing into:

``` text
Software Testing
│
├── Static Testing
│   ├── Reviews
│   ├── Inspections
│   └── Static Analysis
│
├── Functional Testing
│   ├── Unit
│   ├── Component
│   ├── Integration
│   ├── System
│   ├── E2E
│   ├── Acceptance
│   ├── Smoke
│   ├── Sanity
│   ├── Regression
│   └── Exploratory
│
├── Non-Functional Testing
│   ├── Performance
│   ├── Security
│   ├── Usability
│   ├── Accessibility
│   ├── Compatibility
│   ├── Reliability
│   ├── Scalability
│   └── Maintainability
│
├── Data Testing
│   ├── Database
│   ├── ETL/ELT
│   ├── Migration
│   └── Data Quality
│
├── Infrastructure Testing
│   ├── Deployment
│   ├── Cloud
│   ├── Network
│   ├── Container
│   └── Infrastructure-as-Code
│
├── Resilience Testing
│   ├── Recovery
│   ├── Failover
│   ├── Fault Injection
│   └── Chaos
│
├── Specialized Testing
│   ├── Mobile
│   ├── Payment
│   ├── Localization
│   ├── Messaging
│   └── Interoperability
│
└── AI/Agent Testing
    ├── Model Evaluation
    ├── Prompt Testing
    ├── RAG Testing
    ├── Tool Testing
    ├── Memory Testing
    ├── Safety Testing
    └── Multi-Agent Testing
```

------------------------------------------------------------------------

# 71. Core Principle

There is no universal requirement to execute every testing type for
every software release.

A strong QA strategy selects testing techniques based on:

1.  Product requirements
2.  Architecture
3.  Business risk
4.  User impact
5.  Security exposure
6.  Regulatory requirements
7.  Change scope
8.  Failure consequences
9.  System complexity
10. Production environment
11. Available test automation
12. Release timeline

The objective is not to maximize the number of tests.

The objective is to maximize **confidence in software quality relative
to risk and cost**.
