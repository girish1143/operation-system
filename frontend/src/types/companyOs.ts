export type AgentCategory =
  | 'executive'
  | 'orchestration'
  | 'memory'
  | 'strategy'
  | 'finance'
  | 'sales_marketing'
  | 'product_engineering'
  | 'operations'
  | 'people_hr'
  | 'legal_governance'
  | 'customer';

export type AutonomyLevel =
  | 'level_0_observe'
  | 'level_1_recommend'
  | 'level_2_low_risk_auto'
  | 'level_3_approval_required'
  | 'level_4_high_autonomy';

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export type AgentStatus = 'idle' | 'executing' | 'waiting_approval' | 'recovering' | 'offline';

export type ModelTier = 'fast_classifier' | 'reasoning_strategy' | 'code_optimizer' | 'private_secure';

export type MemoryScope =
  | 'company_wide'
  | 'executive'
  | 'finance'
  | 'strategy'
  | 'product'
  | 'engineering'
  | 'operations'
  | 'sales'
  | 'marketing'
  | 'hr'
  | 'legal'
  | 'security'
  | 'customer'
  | 'confidential';

export interface AgentDefinition {
  id: string;
  number: number;
  name: string;
  title: string;
  category: AgentCategory;
  supervisorId: string;
  supervisorName?: string;
  level: number;
  description: string;
  capabilities: string[];
  tools: string[];
  permissions: string[];
  memoryScope: MemoryScope[];
  riskLevel: RiskLevel;
  autonomyLevel: AutonomyLevel;
  defaultModel: ModelTier;
  status: AgentStatus;
  avatarIcon: string;
  metrics: {
    tasksCompleted: number;
    accuracyScore: number;
    avgLatencyMs: number;
    confidenceAvg: number;
  };
}

export interface DomainSupervisor {
  id: string;
  name: string;
  domain: string;
  level: number;
  description: string;
  specialistIds: string[];
  specialists?: AgentDefinition[];
}

export interface Finding {
  topic: string;
  summary: string;
  impact: 'positive' | 'neutral' | 'negative' | 'critical';
  details: string;
}

export interface Evidence {
  source: string;
  type: 'data' | 'benchmark' | 'document' | 'memory' | 'metric';
  content: string;
  confidence: number;
}

export interface Assumption {
  statement: string;
  sensitivity: 'low' | 'medium' | 'high';
  validationMethod?: string;
}

export interface Risk {
  category: string;
  description: string;
  severity: RiskLevel;
  likelihood: 'low' | 'medium' | 'high';
  mitigation: string;
}

export interface Recommendation {
  action: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  rationale: string;
  expectedOutcome: string;
}

export interface AgentResult {
  taskId: string;
  agentId: string;
  status: 'completed' | 'failed' | 'blocked' | 'waiting_approval';
  summary: string;
  findings: Finding[];
  evidence: Evidence[];
  assumptions: Assumption[];
  risks: Risk[];
  recommendations: Recommendation[];
  confidence: number;
  dependencies: string[];
  tokensUsed: number;
  latencyMs: number;
  modelUsed: string;
  createdAt: string;
}

export type MemoryType =
  | 'episodic'
  | 'semantic'
  | 'decision'
  | 'policy'
  | 'project'
  | 'conversation'
  | 'knowledge_graph';

export interface MemoryItem {
  id: string;
  type: MemoryType;
  title: string;
  content: string;
  sourceAgentId: string;
  scope: MemoryScope;
  tags: string[];
  importance: number;
  confidence: number;
  isValidated: boolean;
  validationNotes?: string;
  relatedDecisionId?: string;
  relatedEntities?: string[];
  createdAt: string;
  updatedAt: string;
}

export type DialecticActionType =
  | 'propose'
  | 'challenge'
  | 'support'
  | 'question'
  | 'request_evidence'
  | 'rebuttal'
  | 'revise'
  | 'resolve';

export interface DiscussionMessage {
  id: string;
  agentId: string;
  actionType: DialecticActionType;
  targetMessageId?: string;
  content: string;
  claim?: string;
  evidenceProvided?: string[];
  confidence: number;
  timestamp: string;
}

export interface Discussion {
  id: string;
  pipelineId?: string;
  topic: string;
  domain: string;
  participants: string[];
  status: 'active' | 'consensus_reached' | 'deadlocked' | 'escalated';
  messages: DiscussionMessage[];
  finalConsensus?: {
    summary: string;
    agreedRecommendations: string[];
    unresolvedDisagreements: string[];
    confidence: number;
  };
  createdAt: string;
}

export interface DecisionRecord {
  id: string;
  pipelineId: string;
  question: string;
  decision: string;
  status: 'draft' | 'pending_approval' | 'approved' | 'rejected' | 'implemented';
  participants: string[];
  summaryRationale: string;
  evidence: Evidence[];
  alternativesConsidered: { option: string; pros: string[]; cons: string[] }[];
  assumptions: Assumption[];
  risks: Risk[];
  confidence: number;
  humanApprovalRequired: boolean;
  approver?: string;
  approvalNotes?: string;
  expectedOutcome: {
    metrics: Record<string, any>;
    targetDate: string;
    description: string;
  };
  actualOutcome?: {
    metrics: Record<string, any>;
    recordedDate: string;
    description: string;
  };
  createdAt: string;
  approvedAt?: string;
}

export interface GovernancePolicy {
  id: string;
  code: string;
  title: string;
  category: 'financial' | 'security' | 'legal' | 'operational' | 'ai_ethics';
  description: string;
  threshold?: {
    metric: string;
    maxValue?: number;
    minValue?: number;
  };
  mandatoryApproval: boolean;
  status: 'active' | 'deprecated';
}

export interface PendingApproval {
  id: string;
  pipelineId: string;
  taskId: string;
  agentId: string;
  title: string;
  description: string;
  riskLevel: RiskLevel;
  actionPayload: Record<string, any>;
  requestedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  decidedBy?: string;
  decisionReason?: string;
}

export interface AuditRecord {
  id: string;
  timestamp: string;
  eventType: string;
  agentId: string;
  pipelineId?: string;
  taskId?: string;
  action: string;
  modelUsed?: string;
  memoryRetrieved?: string[];
  toolsCalled?: string[];
  riskLevel: RiskLevel;
  details: Record<string, any>;
  hash: string;
}

export type PipelineStatus = 'draft' | 'planning' | 'running' | 'waiting_approval' | 'completed' | 'failed' | 'cancelled';

export interface PipelineTaskNode {
  id: string;
  name: string;
  agentId: string;
  supervisorId: string;
  description: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'waiting_approval' | 'skipped';
  dependencies: string[];
  result?: AgentResult;
  error?: string;
  retryCount: number;
  maxRetries: number;
  startedAt?: string;
  completedAt?: string;
}

export interface Pipeline {
  id: string;
  title: string;
  goal: string;
  category: string;
  status: PipelineStatus;
  initiator: string;
  tasks: PipelineTaskNode[];
  activeTaskIds: string[];
  decisionId?: string;
  discussionId?: string;
  createdAt: string;
  completedAt?: string;
  executionMetrics: {
    totalTokens: number;
    totalCostUsd: number;
    totalLatencyMs: number;
  };
}

export interface OrganizationalLesson {
  id: string;
  decisionId: string;
  title: string;
  domain: string;
  expectedHypothesis: string;
  actualOutcome: string;
  gapAnalysis: string;
  validatedLesson: string;
  storedMemoryId: string;
  importance: number;
  createdAt: string;
}

export interface AnalyticsSummary {
  totalAgents: number;
  supervisors: number;
  totalPipelines: number;
  activePipelines: number;
  completedPipelines: number;
  totalMemories: number;
  validatedMemories: number;
  totalDecisions: number;
  pendingApprovalsCount: number;
  lessonsLearned: number;
  totalTasksExecuted: number;
  avgSystemAccuracy: number;
  auditLogCount: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'Executive Admin' | 'Domain Supervisor' | 'Systems Architect' | 'AI Auditor' | 'Operator';
  organization: string;
  avatar: string;
  createdAt: string;
  lastLoginAt?: string;
}

export interface AuthResponse {
  user: UserProfile;
  token: string;
}
