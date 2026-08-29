import { DecisionRecord, OrganizationalLesson } from '../../types/index.js';
import { MemoryStore } from '../memory/memoryStore.js';
import { AuditLedger } from '../audit/auditLedger.js';

export class DecisionLearningEngine {
  private static decisions = new Map<string, DecisionRecord>();
  private static lessons: OrganizationalLesson[] = [];

  static initializeWithDefaults() {
    if (this.decisions.size > 0) return;

    const initialDecisions: DecisionRecord[] = [
      {
        id: 'DEC-0042',
        pipelineId: 'PIPE-MNA-001',
        question: 'Should the company acquire Acme Cloud Intelligence for $95M USD?',
        decision: 'Proceed with Conditional Acquisition Offer ($90M upfront + $10M earnouts)',
        status: 'pending_approval',
        participants: ['exec.ceo', 'exec.cfo', 'exec.chief_risk', 'exec.chief_strategy', 'finance.investment'],
        summaryRationale: 'Acme provides critical competitive IP in enterprise knowledge graph reasoning. Restructured deal structure protects downside against key talent flight and infrastructure migration overruns.',
        evidence: [
          {
            source: 'M&A Valuation Suite',
            type: 'data',
            content: 'DCF valuation justifies $95M-$105M with 22.4% post-adjustment IRR.',
            confidence: 0.96,
          },
          {
            source: 'Legal Corpus Database',
            type: 'document',
            content: 'Zero antitrust blockers and clear patent ownership chain.',
            confidence: 0.99,
          },
        ],
        alternativesConsidered: [
          {
            option: 'Build in-house',
            pros: ['Full internal IP control', 'Lower initial cash outlay'],
            cons: ['18-24 month time-to-market delay', 'High execution risk'],
          },
          {
            option: 'Commercial Partnership',
            pros: ['Zero CapEx'],
            cons: ['No exclusive moat', 'Margin leakage to partner'],
          },
        ],
        assumptions: [
          {
            statement: 'Key engineering personnel retention stays at 85%+ over 24 months.',
            sensitivity: 'high',
          },
        ],
        risks: [
          {
            category: 'Integration',
            description: 'Legacy architecture migration could take up to 2 quarters longer than anticipated.',
            severity: 'medium',
            likelihood: 'medium',
            mitigation: 'Ringfence legacy systems with transitional API facades.',
          },
        ],
        confidence: 0.96,
        humanApprovalRequired: true,
        expectedOutcome: {
          metrics: {
            arrExpansionUsd: 18000000,
            nrrTarget: '124%',
            grossMarginTarget: '80%',
            integrationTimeMonths: 6,
          },
          targetDate: '2027-08-30',
          description: 'Expected to add $18M in high-margin enterprise ARR within 12 months post-acquisition.',
        },
        createdAt: '2026-08-28T14:30:00Z',
      },
      {
        id: 'DEC-0040',
        pipelineId: 'PIPE-PRICING-001',
        question: 'Should we increase Enterprise Tier pricing by 18% with bundled AI Agent quota?',
        decision: 'Approved & Implemented Nationwide',
        status: 'implemented',
        participants: ['exec.cpo', 'finance.pricing', 'sales_marketing.sales_strategy', 'customer.retention'],
        summaryRationale: 'High willingness-to-pay identified in Enterprise cohorts with positive ROI proven across 500k automated agent tasks.',
        evidence: [
          {
            source: 'Customer WTP Conjoint Model',
            type: 'data',
            content: '82% of enterprise customers perceive ROI exceeding 5x current subscription fee.',
            confidence: 0.95,
          },
        ],
        alternativesConsidered: [
          {
            option: 'Pure Usage-based metering without base fee',
            pros: ['Low friction adoption'],
            cons: ['Higher revenue volatility'],
          },
        ],
        assumptions: [
          {
            statement: 'Customer churn rate will remain below 8.0%.',
            sensitivity: 'high',
          },
        ],
        risks: [
          {
            category: 'Customer Retention',
            description: 'Mid-market accounts may experience price shock.',
            severity: 'medium',
            likelihood: 'medium',
            mitigation: 'Provide 12-month grandfathering discounts for existing customers.',
          },
        ],
        confidence: 0.94,
        humanApprovalRequired: true,
        expectedOutcome: {
          metrics: {
            churnRatePercent: 8.0,
            arrGrowthPercent: 25.0,
          },
          targetDate: '2026-06-30',
          description: 'Expected ARR increase of 25% with churn capped at 8%.',
        },
        actualOutcome: {
          metrics: {
            churnRatePercent: 12.8,
            arrGrowthPercent: 21.4,
          },
          recordedDate: '2026-07-15',
          description: 'ARR increased by 21.4%, but churn spiked to 12.8% in the lower-tier Mid-Market tier.',
        },
        createdAt: '2026-01-10T10:00:00Z',
        approvedAt: '2026-01-12T15:00:00Z',
      },
    ];

    for (const d of initialDecisions) {
      this.decisions.set(d.id, d);
    }

    // Generate initial organizational learning lesson from DEC-0040 comparison
    const initialLesson: OrganizationalLesson = {
      id: 'LESSON-001',
      decisionId: 'DEC-0040',
      title: 'Pricing Elasticity Sensitivity in Mid-Market Enterprise Segments',
      domain: 'Finance & Pricing',
      expectedHypothesis: 'Predicted churn of <= 8.0% following 18% pricing increase.',
      actualOutcome: 'Actual churn was 12.8% due to price sensitivity in accounts under $50k ARR.',
      gapAnalysis: 'Pricing models grouped mid-market and enterprise together. Mid-market accounts lacked dedicated AI enablement teams to capture the bundled value.',
      validatedLesson: 'Tier price increases must be strictly bifurcated: Full value bundling for Large Enterprise ($100k+ ARR), and graduated usage add-ons for Mid-Market ($20k-$50k ARR).',
      storedMemoryId: 'MEM-005',
      importance: 9,
      createdAt: '2026-07-20T10:00:00Z',
    };
    this.lessons.push(initialLesson);
  }

  static getDecisions(): DecisionRecord[] {
    this.initializeWithDefaults();
    return Array.from(this.decisions.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  static getDecisionById(id: string): DecisionRecord | undefined {
    this.initializeWithDefaults();
    return this.decisions.get(id);
  }

  static getLessons(): OrganizationalLesson[] {
    this.initializeWithDefaults();
    return [...this.lessons].reverse();
  }

  static createDecision(record: Omit<DecisionRecord, 'id' | 'createdAt'>): DecisionRecord {
    this.initializeWithDefaults();
    const id = `DEC-${String(this.decisions.size + 1).padStart(4, '0')}`;
    const newDecision: DecisionRecord = {
      ...record,
      id,
      createdAt: new Date().toISOString(),
    };
    this.decisions.set(id, newDecision);

    // Also store in Decision Memory
    MemoryStore.add({
      type: 'decision',
      title: `${id}: ${record.question}`,
      content: `Decision: ${record.decision}. Rationale: ${record.summaryRationale}`,
      sourceAgentId: record.participants[0] || 'exec.ceo',
      scope: 'company_wide',
      tags: ['decision', 'executive', 'governance'],
      importance: 9,
      confidence: record.confidence,
      isValidated: true,
      relatedDecisionId: id,
    });

    AuditLedger.log({
      eventType: 'DECISION_RECORDED',
      agentId: record.participants[0] || 'exec.ceo',
      pipelineId: record.pipelineId,
      action: `Recorded strategic decision ${id}: ${record.decision}`,
      riskLevel: 'high',
      details: { decisionId: id, question: record.question },
    });

    return newDecision;
  }

  static recordActualOutcome(
    decisionId: string,
    actualOutcome: {
      metrics: Record<string, any>;
      recordedDate: string;
      description: string;
    }
  ): { decision: DecisionRecord; lesson?: OrganizationalLesson } {
    this.initializeWithDefaults();
    const decision = this.decisions.get(decisionId);
    if (!decision) throw new Error(`Decision ${decisionId} not found`);

    decision.actualOutcome = actualOutcome;
    this.decisions.set(decisionId, decision);

    // Trigger Organizational Learning Loop: Compare Expected vs Actual
    let lesson: OrganizationalLesson | undefined;
    if (decision.expectedOutcome) {
      const id = `LESSON-${String(this.lessons.length + 1).padStart(3, '0')}`;
      const title = `Learning Extraction from ${decision.id}: ${decision.question.slice(0, 60)}...`;

      lesson = {
        id,
        decisionId,
        title,
        domain: 'Strategic Learning',
        expectedHypothesis: decision.expectedOutcome.description,
        actualOutcome: actualOutcome.description,
        gapAnalysis: `Compared expected metrics (${JSON.stringify(decision.expectedOutcome.metrics)}) with real-world observed metrics (${JSON.stringify(actualOutcome.metrics)}).`,
        validatedLesson: `Validated organizational insight: Calibration refined for future agentic forecasts on ${decision.question}.`,
        storedMemoryId: `MEM-LEARN-${id}`,
        importance: 9,
        createdAt: new Date().toISOString(),
      };
      this.lessons.push(lesson);

      // Save lesson into organizational memory
      const mem = MemoryStore.add({
        type: 'semantic',
        title: lesson.title,
        content: `ORGANIZATIONAL LESSON (${decisionId}): ${lesson.validatedLesson} (Gap Analysis: ${lesson.gapAnalysis})`,
        sourceAgentId: 'strategy.strategic_decision',
        scope: 'company_wide',
        tags: ['learning_loop', 'validated_lesson', 'organizational_memory'],
        importance: 9,
        confidence: 0.99,
        isValidated: true,
        validationNotes: 'Derived automatically via Decision Outcome Learning Loop.',
      });
      lesson.storedMemoryId = mem.id;
    }

    return { decision, lesson };
  }
}
