import crypto from 'crypto';
import { AuditRecord, RiskLevel } from '../../types/index.js';

export class AuditLedger {
  private static ledger: AuditRecord[] = [];
  private static previousHash = '0000000000000000000000000000000000000000000000000000000000000000';
  private static initialized = false;

  static initializeWithDefaults() {
    if (this.initialized) return;
    this.initialized = true;

    this.rawInsert({
      eventType: 'SYSTEM_BOOTSTRAP',
      agentId: 'orchestration.master',
      action: 'Initialized 100-Agent Company Operating System runtime',
      riskLevel: 'low',
      details: { version: '1.0.0', agentsActive: 100, memoryTiers: 6 },
    });

    this.rawInsert({
      eventType: 'POLICY_LOADED',
      agentId: 'legal_governance.policy',
      action: 'Loaded enterprise governance rulebook and autonomy guardrails',
      riskLevel: 'medium',
      details: { policiesLoaded: 8, mandatoryApprovals: 4 },
    });

    this.rawInsert({
      eventType: 'MEMORY_INDEXED',
      agentId: 'memory.manager',
      action: 'Federated organizational memory vector index and knowledge graph',
      riskLevel: 'low',
      details: { memoryItems: 6, status: 'synced' },
    });
  }

  private static rawInsert(record: {
    eventType: string;
    agentId: string;
    action: string;
    pipelineId?: string;
    taskId?: string;
    modelUsed?: string;
    memoryRetrieved?: string[];
    toolsCalled?: string[];
    riskLevel?: RiskLevel;
    details?: Record<string, any>;
  }): AuditRecord {
    const id = `AUDIT-${String(this.ledger.length + 1).padStart(5, '0')}`;
    const timestamp = new Date().toISOString();
    const riskLevel: RiskLevel = record.riskLevel || 'low';
    const details = record.details || {};

    const rawPayload = `${id}|${timestamp}|${record.eventType}|${record.agentId}|${record.action}|${this.previousHash}`;
    const hash = crypto.createHash('sha256').update(rawPayload).digest('hex');

    const newRecord: AuditRecord = {
      id,
      timestamp,
      eventType: record.eventType,
      agentId: record.agentId,
      pipelineId: record.pipelineId,
      taskId: record.taskId,
      action: record.action,
      modelUsed: record.modelUsed || 'Gemini Pro 2.5',
      memoryRetrieved: record.memoryRetrieved,
      toolsCalled: record.toolsCalled,
      riskLevel,
      details,
      hash,
    };

    this.previousHash = hash;
    this.ledger.push(newRecord);
    return newRecord;
  }

  static log(record: {
    eventType: string;
    agentId: string;
    action: string;
    pipelineId?: string;
    taskId?: string;
    modelUsed?: string;
    memoryRetrieved?: string[];
    toolsCalled?: string[];
    riskLevel?: RiskLevel;
    details?: Record<string, any>;
  }): AuditRecord {
    this.initializeWithDefaults();
    return this.rawInsert(record);
  }

  static getAll(limit = 100): AuditRecord[] {
    this.initializeWithDefaults();
    return [...this.ledger].reverse().slice(0, limit);
  }

  static verifyIntegrity(): { isValid: boolean; checkedRecords: number } {
    this.initializeWithDefaults();
    let prev = '0000000000000000000000000000000000000000000000000000000000000000';
    for (const record of this.ledger) {
      const rawPayload = `${record.id}|${record.timestamp}|${record.eventType}|${record.agentId}|${record.action}|${prev}`;
      const recalculated = crypto.createHash('sha256').update(rawPayload).digest('hex');
      if (recalculated !== record.hash) {
        return { isValid: false, checkedRecords: this.ledger.length };
      }
      prev = record.hash;
    }
    return { isValid: true, checkedRecords: this.ledger.length };
  }
}
