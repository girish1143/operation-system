import { Discussion, DiscussionMessage, DialecticActionType } from '../../types/index.js';
import { AGENT_BY_ID } from '../agents/registry.js';
import { MemoryStore } from '../memory/memoryStore.js';

export class DiscussionEngine {
  private static discussions = new Map<string, Discussion>();

  static initializeWithDefaults() {
    if (this.discussions.size > 0) return;

    const initialDebates: Discussion[] = [
      {
        id: 'DISC-001',
        pipelineId: 'PIPE-MNA-001',
        topic: 'Should the company acquire Acme Cloud Intelligence for $95M?',
        domain: 'Strategy & Finance',
        participants: ['exec.cfo', 'finance.investment', 'exec.chief_risk', 'exec.chief_strategy', 'exec.ceo'],
        status: 'consensus_reached',
        createdAt: '2026-08-28T14:00:00Z',
        messages: [
          {
            id: 'MSG-001',
            agentId: 'finance.investment',
            actionType: 'propose',
            content: 'Acquisition of Acme Cloud Intelligence is financially attractive at $95M valuation (6.3x ARR) with a 3.2-year payback period and 26.8% expected IRR.',
            claim: 'Target acquisition generates positive NPV and meets all hurdle rates.',
            confidence: 0.94,
            timestamp: '2026-08-28T14:00:30Z',
          },
          {
            id: 'MSG-002',
            agentId: 'exec.chief_risk',
            actionType: 'challenge',
            targetMessageId: 'MSG-001',
            content: 'Challenge: The valuation model fails to account for $6.5M in legacy infrastructure migration costs and employee retention packages for the core 14 AI engineers.',
            claim: 'Unmodeled integration and retention costs reduce true IRR to 18.2%.',
            evidenceProvided: ['MEM-003 Post-Mortem GPU spend', 'Historical tech-stack audit'],
            confidence: 0.96,
            timestamp: '2026-08-28T14:01:10Z',
          },
          {
            id: 'MSG-003',
            agentId: 'exec.cfo',
            actionType: 'request_evidence',
            targetMessageId: 'MSG-002',
            content: 'Requesting updated financial sensitivity scenario incorporating $6.5M earmarked retention/integration cap.',
            confidence: 0.98,
            timestamp: '2026-08-28T14:02:00Z',
          },
          {
            id: 'MSG-004',
            agentId: 'finance.investment',
            actionType: 'revise',
            targetMessageId: 'MSG-003',
            content: 'Recalculated: Incorporating $6.5M retention earnouts over 24 months, effective purchase price is $101.5M. IRR adjusts to 22.4%, which remains above the 15% corporate hurdle rate.',
            claim: 'Deal remains accretive post-integration adjustments.',
            confidence: 0.95,
            timestamp: '2026-08-28T14:02:50Z',
          },
          {
            id: 'MSG-005',
            agentId: 'exec.chief_strategy',
            actionType: 'support',
            targetMessageId: 'MSG-004',
            content: 'Support revised terms. Acme Cloud Intelligence provides strategic moat in enterprise graph memory, saving 18 months of in-house R&D.',
            confidence: 0.97,
            timestamp: '2026-08-28T14:03:30Z',
          },
          {
            id: 'MSG-006',
            agentId: 'exec.ceo',
            actionType: 'resolve',
            content: 'Consensus reached. Recommend Proceeding with Conditional Acquisition offer at $90M cash + $10M retention milestones, subject to final Human Board Approval.',
            confidence: 0.98,
            timestamp: '2026-08-28T14:04:15Z',
          },
        ],
        finalConsensus: {
          summary: 'Acquisition approved with restructured $90M base + $10M milestone earnout to mitigate integration and key personnel flight risks.',
          agreedRecommendations: [
            'Structure deal with 24-month retention vesting for key AI research staff.',
            'Gate post-close infrastructure migration under CTO and DevOps supervision.',
            'Escalate to Human Executive Board for formal authorization (DEC-0042).',
          ],
          unresolvedDisagreements: [],
          confidence: 0.97,
        },
      },
    ];

    for (const disc of initialDebates) {
      this.discussions.set(disc.id, disc);
    }
  }

  static getAll(): Discussion[] {
    this.initializeWithDefaults();
    return Array.from(this.discussions.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  static getById(id: string): Discussion | undefined {
    this.initializeWithDefaults();
    return this.discussions.get(id);
  }

  static async createAndRunDebate(params: {
    topic: string;
    domain: string;
    participantIds: string[];
    pipelineId?: string;
  }): Promise<Discussion> {
    this.initializeWithDefaults();
    const id = `DISC-${String(this.discussions.size + 1).padStart(3, '0')}`;
    const now = new Date().toISOString();

    const participants = params.participantIds.length > 0
      ? params.participantIds
      : ['exec.ceo', 'exec.cfo', 'exec.chief_risk', 'exec.chief_strategy'];

    const firstAgent = AGENT_BY_ID.get(participants[0]) || AGENT_BY_ID.get('exec.ceo')!;
    const secondAgent = AGENT_BY_ID.get(participants[1]) || AGENT_BY_ID.get('exec.chief_risk')!;
    const thirdAgent = AGENT_BY_ID.get(participants[2]) || AGENT_BY_ID.get('exec.cfo')!;
    const leadAgent = AGENT_BY_ID.get(participants[participants.length - 1]) || AGENT_BY_ID.get('exec.ceo')!;

    const messages: DiscussionMessage[] = [
      {
        id: `MSG-${Date.now()}-1`,
        agentId: firstAgent.id,
        actionType: 'propose',
        content: `Proposed baseline course of action regarding "${params.topic}": Align corporate focus to execute high-impact milestones while maintaining capital discipline.`,
        claim: `Execution delivers strategic competitive advantage and adheres to domain benchmarks.`,
        confidence: 0.94,
        timestamp: new Date(Date.now() - 30000).toISOString(),
      },
      {
        id: `MSG-${Date.now()}-2`,
        agentId: secondAgent.id,
        actionType: 'challenge',
        targetMessageId: `MSG-${Date.now()}-1`,
        content: `Challenge from ${secondAgent.name}: Highlight critical risk exposures, capacity bottlenecks, and regulatory guardrails before commitment.`,
        claim: `Operational risk requires tighter SLA definitions and fallback checkpoints.`,
        confidence: 0.96,
        timestamp: new Date(Date.now() - 20000).toISOString(),
      },
      {
        id: `MSG-${Date.now()}-3`,
        agentId: thirdAgent.id,
        actionType: 'revise',
        targetMessageId: `MSG-${Date.now()}-2`,
        content: `Synthesis and Mitigation: Proposed phased rollout with strict quarterly KPIs, automated circuit breakers, and dedicated resource buffers.`,
        claim: `Phased execution mitigates 85%+ of identified downside risk.`,
        confidence: 0.95,
        timestamp: new Date(Date.now() - 10000).toISOString(),
      },
      {
        id: `MSG-${Date.now()}-4`,
        agentId: leadAgent.id,
        actionType: 'resolve',
        content: `Consensus Reached under ${leadAgent.name}: Proceed with structured phased execution, mandatory audit logging, and supervisory check-ins.`,
        confidence: 0.98,
        timestamp: now,
      },
    ];

    const discussion: Discussion = {
      id,
      pipelineId: params.pipelineId,
      topic: params.topic,
      domain: params.domain,
      participants: participants,
      status: 'consensus_reached',
      messages,
      finalConsensus: {
        summary: `Multi-agent consensus achieved on "${params.topic}". Action plan synthesized across ${participants.length} specialist viewpoints.`,
        agreedRecommendations: [
          'Adopt phased milestone gates with automated telemetry monitoring.',
          'Enforce strict governance policy checks prior to capital deployment.',
          'Record rationale and predicted metrics into Decision Memory.',
        ],
        unresolvedDisagreements: [],
        confidence: 0.96,
      },
      createdAt: now,
    };

    this.discussions.set(id, discussion);

    // Save debate transcript to conversation memory
    MemoryStore.add({
      type: 'conversation',
      title: `Agent Debate Record: ${params.topic}`,
      content: `Participants: ${participants.join(', ')}. Consensus: ${discussion.finalConsensus?.summary}`,
      sourceAgentId: leadAgent.id,
      scope: 'company_wide',
      tags: ['discussion', 'dialectics', params.domain.toLowerCase()],
      importance: 8,
      confidence: 0.96,
      isValidated: true,
      validationNotes: 'Recorded directly from structured agent dialectic session.',
    });

    return discussion;
  }
}
