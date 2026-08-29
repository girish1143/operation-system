import { MemoryItem, MemoryType, MemoryScope } from '../../types/index.js';

export class MemoryStore {
  private static memories = new Map<string, MemoryItem>();

  static initializeWithDefaults() {
    if (this.memories.size > 0) return;

    const initialMemories: MemoryItem[] = [
      {
        id: 'MEM-001',
        type: 'policy',
        title: 'POL-001: Capital Allocation & M&A Approval Thresholds',
        content: 'Any strategic investment or corporate acquisition exceeding $10,000,000 USD mandates formal CFO review, Chief Risk audit, and Level 3 Human Executive Board sign-off.',
        sourceAgentId: 'legal_governance.policy',
        scope: 'company_wide',
        tags: ['capital', 'm_and_a', 'governance', 'finance'],
        importance: 10,
        confidence: 1.0,
        isValidated: true,
        validationNotes: 'Ratified by Board of Directors and Legal Counsel.',
        createdAt: '2026-01-15T09:00:00Z',
        updatedAt: '2026-01-15T09:00:00Z',
      },
      {
        id: 'MEM-002',
        type: 'decision',
        title: 'DEC-0039: Enterprise Multi-Tenant Architecture Standard',
        content: 'Adopted unified event-driven microservices architecture with strict tenant schema isolation in PostgreSQL to guarantee SOC 2 Type II and HIPAA data isolation.',
        sourceAgentId: 'exec.cto',
        scope: 'engineering',
        tags: ['architecture', 'security', 'database', 'soc2'],
        importance: 9,
        confidence: 0.98,
        isValidated: true,
        relatedDecisionId: 'DEC-0039',
        createdAt: '2026-02-10T14:30:00Z',
        updatedAt: '2026-02-10T14:30:00Z',
      },
      {
        id: 'MEM-003',
        type: 'episodic',
        title: 'Post-Mortem: Q3 2025 Cloud Cost Overrun & Remediation',
        content: 'Identified that unmonitored LLM batch inference workloads caused a 34% temporary surge in GPU cloud spend. Implemented automated token throttling and Spot instance autoscaling via DevOps & Cost agents.',
        sourceAgentId: 'finance.cost',
        scope: 'operations',
        tags: ['finops', 'incident', 'gpu_compute', 'cost_savings'],
        importance: 8,
        confidence: 0.95,
        isValidated: true,
        createdAt: '2025-10-04T11:00:00Z',
        updatedAt: '2025-10-04T11:00:00Z',
      },
      {
        id: 'MEM-004',
        type: 'semantic',
        title: 'Institutional Definition: Rule of 40 & SaaS Efficiency Benchmarks',
        content: 'Company defines healthy SaaS efficiency as (YoY ARR Growth Rate % + Free Cash Flow Margin %) >= 40%. Premium valuations in our sector currently trade between 6.0x - 8.5x ARR for Rule-of-40 compliant companies.',
        sourceAgentId: 'finance.financial_analysis',
        scope: 'finance',
        tags: ['valuation', 'rule_of_40', 'metrics', 'benchmarks'],
        importance: 9,
        confidence: 0.99,
        isValidated: true,
        createdAt: '2026-03-01T10:00:00Z',
        updatedAt: '2026-03-01T10:00:00Z',
      },
      {
        id: 'MEM-005',
        type: 'decision',
        title: 'DEC-0041: Pricing Tier Restructuring & Value Metric Shift',
        content: 'Shifted core monetization from seat-based licenses to usage-based active AI agent task workflows. Resulted in a 22% increase in Net Revenue Retention (NRR).',
        sourceAgentId: 'finance.pricing',
        scope: 'sales',
        tags: ['pricing', 'nrr', 'plg', 'business_model'],
        importance: 9,
        confidence: 0.96,
        isValidated: true,
        relatedDecisionId: 'DEC-0041',
        createdAt: '2026-04-12T16:00:00Z',
        updatedAt: '2026-04-12T16:00:00Z',
      },
      {
        id: 'MEM-006',
        type: 'knowledge_graph',
        title: 'Entity Relational Topology: Enterprise SaaS Product Suite',
        content: 'Product Suite connects: Core OS Engine -> Workflow Automator -> Customer Intelligence Lake -> Data Governance Vault. Key dependencies: AWS US-East-1, GCP BigQuery, Stripe Billing API.',
        sourceAgentId: 'memory.knowledge_graph',
        scope: 'company_wide',
        tags: ['knowledge_graph', 'entities', 'dependencies'],
        importance: 8,
        confidence: 0.97,
        isValidated: true,
        relatedEntities: ['Core OS Engine', 'Workflow Automator', 'Customer Intelligence Lake', 'Stripe Billing'],
        createdAt: '2026-05-20T08:00:00Z',
        updatedAt: '2026-05-20T08:00:00Z',
      },
    ];

    for (const mem of initialMemories) {
      this.memories.set(mem.id, mem);
    }
  }

  static getAll(): MemoryItem[] {
    this.initializeWithDefaults();
    return Array.from(this.memories.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  static getById(id: string): MemoryItem | undefined {
    this.initializeWithDefaults();
    return this.memories.get(id);
  }

  static query(params: {
    type?: MemoryType;
    scope?: MemoryScope;
    tag?: string;
    searchTerm?: string;
    minImportance?: number;
  }): MemoryItem[] {
    this.initializeWithDefaults();
    let results = Array.from(this.memories.values());

    if (params.type) {
      results = results.filter((m) => m.type === params.type);
    }
    if (params.scope && params.scope !== 'company_wide') {
      results = results.filter((m) => m.scope === params.scope || m.scope === 'company_wide');
    }
    if (params.tag) {
      const t = params.tag.toLowerCase();
      results = results.filter((m) => m.tags.some((tag) => tag.toLowerCase().includes(t)));
    }
    if (params.searchTerm) {
      const st = params.searchTerm.toLowerCase();
      results = results.filter(
        (m) =>
          m.title.toLowerCase().includes(st) ||
          m.content.toLowerCase().includes(st) ||
          m.tags.some((t) => t.toLowerCase().includes(st))
      );
    }
    if (params.minImportance) {
      results = results.filter((m) => m.importance >= params.minImportance!);
    }

    return results;
  }

  static add(memory: Omit<MemoryItem, 'id' | 'createdAt' | 'updatedAt'>): MemoryItem {
    this.initializeWithDefaults();
    const id = `MEM-${String(this.memories.size + 1).padStart(3, '0')}`;
    const now = new Date().toISOString();
    const newMem: MemoryItem = {
      ...memory,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.memories.set(id, newMem);
    return newMem;
  }

  static validateMemory(id: string, notes: string): MemoryItem | undefined {
    const mem = this.memories.get(id);
    if (!mem) return undefined;
    mem.isValidated = true;
    mem.validationNotes = notes;
    mem.updatedAt = new Date().toISOString();
    this.memories.set(id, mem);
    return mem;
  }
}
