import { GovernancePolicy, PendingApproval, RiskLevel } from '../../types/index.js';
import { AuditLedger } from '../audit/auditLedger.js';

export class GovernanceEngine {
  private static policies = new Map<string, GovernancePolicy>();
  private static pendingApprovals = new Map<string, PendingApproval>();

  static initializeWithDefaults() {
    if (this.policies.size > 0) return;

    const initialPolicies: GovernancePolicy[] = [
      {
        id: 'POL-001',
        code: 'POL-CAPITAL-THRESHOLD',
        title: 'Capital Commitment & M&A Expenditure Limit',
        category: 'financial',
        description: 'Expenditures or capital commitments exceeding $100,000 USD require explicit Human Executive approval.',
        threshold: { metric: 'estimatedCostUsd', maxValue: 100000 },
        mandatoryApproval: true,
        status: 'active',
      },
      {
        id: 'POL-002',
        code: 'POL-PROD-DEPLOYMENT',
        title: 'Production Infrastructure & Database Schema Modification',
        category: 'operational',
        description: 'Any modification to live production clusters, IAM root access, or breaking schema migrations requires human gate sign-off.',
        mandatoryApproval: true,
        status: 'active',
      },
      {
        id: 'POL-003',
        code: 'POL-PII-PRIVACY-SHIELD',
        title: 'Customer PII & Sensitive Telemetry Masking',
        category: 'security',
        description: 'Customer PII must never be transmitted to external unvetted LLM models without cryptographic zero-retention tokens.',
        mandatoryApproval: true,
        status: 'active',
      },
      {
        id: 'POL-004',
        code: 'POL-AUTONOMY-CIRCUIT-BREAKER',
        title: 'Agentic Recursion & Loop Circuit Breaker',
        category: 'ai_ethics',
        description: 'Agent sub-delegation depth is capped at 4 hops. Any task exceeding 5 retries is halted and escalated to human supervision.',
        mandatoryApproval: false,
        status: 'active',
      },
    ];

    for (const p of initialPolicies) {
      this.policies.set(p.id, p);
    }

    // Initial pending approval example
    const defaultApproval: PendingApproval = {
      id: 'APPR-001',
      pipelineId: 'PIPE-MNA-001',
      taskId: 'TASK-MNA-07',
      agentId: 'exec.ceo',
      title: 'Authorize $95M Acquisition Letter of Intent (Acme Cloud Intelligence)',
      description: 'The Multi-Agent M&A analysis pipeline has verified valuation (22.4% IRR) and mitigated infrastructure risks. Human executive authorization required under POL-001.',
      riskLevel: 'critical',
      actionPayload: {
        targetCompany: 'Acme Cloud Intelligence Inc.',
        purchasePriceUsd: 95000000,
        structure: '$85M upfront cash + $10M retention milestones',
        paybackYears: 3.2,
      },
      requestedAt: '2026-08-28T14:15:00Z',
      status: 'pending',
    };
    this.pendingApprovals.set(defaultApproval.id, defaultApproval);
  }

  static getPolicies(): GovernancePolicy[] {
    this.initializeWithDefaults();
    return Array.from(this.policies.values());
  }

  static getPendingApprovals(): PendingApproval[] {
    this.initializeWithDefaults();
    return Array.from(this.pendingApprovals.values()).sort(
      (a, b) => new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime()
    );
  }

  static createApprovalRequest(request: Omit<PendingApproval, 'id' | 'requestedAt' | 'status'>): PendingApproval {
    this.initializeWithDefaults();
    const id = `APPR-${String(this.pendingApprovals.size + 1).padStart(3, '0')}`;
    const approval: PendingApproval = {
      ...request,
      id,
      requestedAt: new Date().toISOString(),
      status: 'pending',
    };
    this.pendingApprovals.set(id, approval);

    AuditLedger.log({
      eventType: 'APPROVAL_REQUESTED',
      agentId: request.agentId,
      pipelineId: request.pipelineId,
      taskId: request.taskId,
      action: `Approval requested: ${request.title}`,
      riskLevel: request.riskLevel,
      details: request.actionPayload,
    });

    return approval;
  }

  static resolveApproval(
    id: string,
    decision: 'approved' | 'rejected',
    decidedBy: string,
    reason: string
  ): PendingApproval | undefined {
    this.initializeWithDefaults();
    const app = this.pendingApprovals.get(id);
    if (!app) return undefined;

    app.status = decision;
    app.decidedBy = decidedBy;
    app.decisionReason = reason;
    this.pendingApprovals.set(id, app);

    AuditLedger.log({
      eventType: decision === 'approved' ? 'APPROVAL_GRANTED' : 'APPROVAL_REJECTED',
      agentId: app.agentId,
      pipelineId: app.pipelineId,
      taskId: app.taskId,
      action: `Human decision: ${decision.toUpperCase()} by ${decidedBy} (${reason})`,
      riskLevel: app.riskLevel,
      details: { approvalId: id, decidedBy, reason },
    });

    return app;
  }
}
