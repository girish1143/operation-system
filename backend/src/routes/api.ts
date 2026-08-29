import { Router, Request, Response } from 'express';
import { ALL_100_AGENTS, AGENT_BY_ID } from '../core/agents/registry.js';
import { DOMAIN_SUPERVISORS, SUPERVISOR_BY_ID } from '../core/supervisors/supervisors.js';
import { AgentRuntime } from '../core/runtime/agentRuntime.js';
import { MemoryStore } from '../core/memory/memoryStore.js';
import { DiscussionEngine } from '../core/discussions/discussionEngine.js';
import { DecisionLearningEngine } from '../core/learning/decisionLearningEngine.js';
import { GovernanceEngine } from '../core/governance/governanceEngine.js';
import { AuditLedger } from '../core/audit/auditLedger.js';
import { PipelineEngine } from '../core/pipeline/pipelineEngine.js';
import { AuthEngine } from '../core/auth/authEngine.js';

const router = Router();

// ==========================================
// 1. SYSTEM HEALTH & ANALYTICS
// ==========================================
router.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: '100-Agent Company Operating System',
    agentsRegistered: ALL_100_AGENTS.length,
    supervisorsCount: DOMAIN_SUPERVISORS.length,
    version: '1.0.0',
  });
});

router.get('/analytics/summary', (_req: Request, res: Response) => {
  const pipelines = PipelineEngine.getAll();
  const memories = MemoryStore.getAll();
  const decisions = DecisionLearningEngine.getDecisions();
  const lessons = DecisionLearningEngine.getLessons();
  const approvals = GovernanceEngine.getPendingApprovals().filter((a) => a.status === 'pending');
  const audit = AuditLedger.getAll();

  const totalTasks = ALL_100_AGENTS.reduce((acc, a) => acc + a.metrics.tasksCompleted, 0);
  const avgAccuracy =
    ALL_100_AGENTS.reduce((acc, a) => acc + a.metrics.accuracyScore, 0) / ALL_100_AGENTS.length;

  res.json({
    totalAgents: ALL_100_AGENTS.length,
    supervisors: DOMAIN_SUPERVISORS.length,
    totalPipelines: pipelines.length,
    activePipelines: pipelines.filter((p) => p.status === 'running').length,
    completedPipelines: pipelines.filter((p) => p.status === 'completed').length,
    totalMemories: memories.length,
    validatedMemories: memories.filter((m) => m.isValidated).length,
    totalDecisions: decisions.length,
    pendingApprovalsCount: approvals.length,
    lessonsLearned: lessons.length,
    totalTasksExecuted: totalTasks,
    avgSystemAccuracy: Number(avgAccuracy.toFixed(1)),
    auditLogCount: audit.length,
  });
});

// ==========================================
// 2. AGENTS DIRECTORY & EXECUTION
// ==========================================
router.get('/agents', (req: Request, res: Response) => {
  const { category, supervisorId, search, riskLevel, autonomyLevel } = req.query;
  let results = [...ALL_100_AGENTS];

  if (category) {
    results = results.filter((a) => a.category === category);
  }
  if (supervisorId) {
    results = results.filter((a) => a.supervisorId === supervisorId);
  }
  if (riskLevel) {
    results = results.filter((a) => a.riskLevel === riskLevel);
  }
  if (autonomyLevel) {
    results = results.filter((a) => a.autonomyLevel === autonomyLevel);
  }
  if (search) {
    const q = String(search).toLowerCase();
    results = results.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.capabilities.some((c) => c.toLowerCase().includes(q))
    );
  }

  res.json({
    total: results.length,
    agents: results,
  });
});

router.get('/agents/:id', (req: Request, res: Response) => {
  const agent = AGENT_BY_ID.get(req.params.id);
  if (!agent) {
    res.status(404).json({ error: `Agent ${req.params.id} not found` });
    return;
  }
  const supervisor = SUPERVISOR_BY_ID.get(agent.supervisorId);
  res.json({
    ...agent,
    supervisorName: supervisor?.name,
  });
});

router.post('/agents/:id/execute', async (req: Request, res: Response) => {
  try {
    const { goal, inputData, constraints } = req.body;
    if (!goal) {
      res.status(400).json({ error: 'goal string is required' });
      return;
    }

    const result = await AgentRuntime.executeAgent(req.params.id, {
      taskId: `ADHOC-${Date.now()}`,
      goal,
      inputData: inputData || {},
      constraints: constraints || [],
    });

    AuditLedger.log({
      eventType: 'AGENT_ADHOC_EXECUTION',
      agentId: req.params.id,
      action: `Executed ad-hoc task: "${goal}"`,
      riskLevel: 'medium',
      details: { summary: result.summary, confidence: result.confidence },
    });

    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Execution error' });
  }
});

// ==========================================
// 3. DOMAIN SUPERVISORS & HIERARCHY
// ==========================================
router.get('/supervisors', (_req: Request, res: Response) => {
  const supervisorsWithAgents = DOMAIN_SUPERVISORS.map((s) => ({
    ...s,
    specialists: s.specialistIds.map((id) => AGENT_BY_ID.get(id)).filter(Boolean),
  }));
  res.json(supervisorsWithAgents);
});

// ==========================================
// 4. PIPELINE DAG & WORKFLOWS
// ==========================================
router.get('/pipelines', (_req: Request, res: Response) => {
  res.json(PipelineEngine.getAll());
});

router.get('/pipelines/:id', (req: Request, res: Response) => {
  const pipeline = PipelineEngine.getById(req.params.id);
  if (!pipeline) {
    res.status(404).json({ error: `Pipeline ${req.params.id} not found` });
    return;
  }
  res.json(pipeline);
});

router.post('/pipelines', (req: Request, res: Response) => {
  const { title, goal, category, initiator } = req.body;
  if (!title || !goal) {
    res.status(400).json({ error: 'title and goal are required' });
    return;
  }
  const pipeline = PipelineEngine.createPipeline({
    title,
    goal,
    category,
    initiator,
  });
  res.status(201).json(pipeline);
});

router.post('/pipelines/:id/run', async (req: Request, res: Response) => {
  try {
    const pipeline = await PipelineEngine.runPipeline(req.params.id);
    res.json(pipeline);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Pipeline execution failed' });
  }
});

// ==========================================
// 5. ORGANIZATIONAL MEMORY
// ==========================================
router.get('/memory', (req: Request, res: Response) => {
  const { type, scope, tag, searchTerm, minImportance } = req.query;
  const memories = MemoryStore.query({
    type: type as any,
    scope: scope as any,
    tag: tag ? String(tag) : undefined,
    searchTerm: searchTerm ? String(searchTerm) : undefined,
    minImportance: minImportance ? Number(minImportance) : undefined,
  });
  res.json(memories);
});

router.post('/memory', (req: Request, res: Response) => {
  const { type, title, content, sourceAgentId, scope, tags, importance, confidence } = req.body;
  if (!title || !content || !type) {
    res.status(400).json({ error: 'title, content, and type are required' });
    return;
  }

  const memory = MemoryStore.add({
    type,
    title,
    content,
    sourceAgentId: sourceAgentId || 'memory.manager',
    scope: scope || 'company_wide',
    tags: tags || [],
    importance: importance || 8,
    confidence: confidence || 0.95,
    isValidated: false,
  });

  AuditLedger.log({
    eventType: 'MEMORY_CREATED',
    agentId: memory.sourceAgentId,
    action: `Created memory "${memory.title}" (${memory.type})`,
    riskLevel: 'low',
    details: { memoryId: memory.id, scope: memory.scope },
  });

  res.status(201).json(memory);
});

router.post('/memory/:id/validate', (req: Request, res: Response) => {
  const { notes } = req.body;
  const mem = MemoryStore.validateMemory(req.params.id, notes || 'Validated by Memory Validation Agent');
  if (!mem) {
    res.status(404).json({ error: `Memory ${req.params.id} not found` });
    return;
  }
  res.json(mem);
});

// ==========================================
// 6. DISCUSSIONS & AGENT DEBATES
// ==========================================
router.get('/discussions', (_req: Request, res: Response) => {
  res.json(DiscussionEngine.getAll());
});

router.get('/discussions/:id', (req: Request, res: Response) => {
  const disc = DiscussionEngine.getById(req.params.id);
  if (!disc) {
    res.status(404).json({ error: `Discussion ${req.params.id} not found` });
    return;
  }
  res.json(disc);
});

router.post('/discussions/run', async (req: Request, res: Response) => {
  try {
    const { topic, domain, participantIds, pipelineId } = req.body;
    if (!topic) {
      res.status(400).json({ error: 'topic is required' });
      return;
    }
    const discussion = await DiscussionEngine.createAndRunDebate({
      topic,
      domain: domain || 'Cross-Functional Strategy',
      participantIds: participantIds || [],
      pipelineId,
    });
    res.status(201).json(discussion);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Discussion failed' });
  }
});

// ==========================================
// 7. DECISION MEMORY & ORGANIZATIONAL LEARNING
// ==========================================
router.get('/decisions', (_req: Request, res: Response) => {
  res.json(DecisionLearningEngine.getDecisions());
});

router.get('/decisions/:id', (req: Request, res: Response) => {
  const decision = DecisionLearningEngine.getDecisionById(req.params.id);
  if (!decision) {
    res.status(404).json({ error: `Decision ${req.params.id} not found` });
    return;
  }
  res.json(decision);
});

router.post('/decisions/:id/outcome', (req: Request, res: Response) => {
  try {
    const { metrics, recordedDate, description } = req.body;
    if (!description || !metrics) {
      res.status(400).json({ error: 'description and metrics are required' });
      return;
    }
    const result = DecisionLearningEngine.recordActualOutcome(req.params.id, {
      metrics,
      recordedDate: recordedDate || new Date().toISOString().split('T')[0],
      description,
    });
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Outcome logging failed' });
  }
});

router.get('/learning/lessons', (_req: Request, res: Response) => {
  res.json(DecisionLearningEngine.getLessons());
});

// ==========================================
// 8. GOVERNANCE & APPROVALS
// ==========================================
router.get('/governance/policies', (_req: Request, res: Response) => {
  res.json(GovernanceEngine.getPolicies());
});

router.get('/governance/approvals', (_req: Request, res: Response) => {
  res.json(GovernanceEngine.getPendingApprovals());
});

router.post('/governance/approvals/:id/resolve', (req: Request, res: Response) => {
  const { decision, decidedBy, reason } = req.body;
  if (!decision || !['approved', 'rejected'].includes(decision)) {
    res.status(400).json({ error: 'decision must be "approved" or "rejected"' });
    return;
  }
  const result = GovernanceEngine.resolveApproval(
    req.params.id,
    decision,
    decidedBy || 'Human Executive Board',
    reason || 'Approved after reviewing evidence and risk mitigations'
  );
  if (!result) {
    res.status(404).json({ error: `Approval ${req.params.id} not found` });
    return;
  }
  res.json(result);
});

// ==========================================
// 9. AUDIT LEDGER
// ==========================================
router.get('/audit', (req: Request, res: Response) => {
  const limit = req.query.limit ? Number(req.query.limit) : 100;
  res.json(AuditLedger.getAll(limit));
});

router.get('/audit/verify', (_req: Request, res: Response) => {
  res.json(AuditLedger.verifyIntegrity());
});

// ==========================================
// 10. AUTHENTICATION & ACCESS CONTROL
// ==========================================
router.post('/auth/signup', (req: Request, res: Response) => {
  try {
    const { name, email, password, role, organization } = req.body;
    const result = AuthEngine.signup({ name, email, password, role, organization });
    res.status(201).json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Signup failed' });
  }
});

router.post('/auth/signin', (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }
    const result = AuthEngine.signin(email, password);
    res.json(result);
  } catch (err: any) {
    res.status(401).json({ error: err.message || 'Authentication failed' });
  }
});

router.get('/auth/me', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : (req.query.token as string);

  if (!token) {
    res.status(401).json({ error: 'No authorization token provided' });
    return;
  }

  const user = AuthEngine.getUserByToken(token);
  if (!user) {
    res.status(401).json({ error: 'Invalid or expired session token' });
    return;
  }

  res.json({ user });
});

router.post('/auth/signout', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : (req.body.token as string);

  if (token) {
    AuthEngine.signout(token);
  }
  res.json({ success: true, message: 'Signed out successfully' });
});

export default router;
