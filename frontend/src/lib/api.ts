import {
  AgentDefinition,
  DomainSupervisor,
  AgentResult,
  Pipeline,
  MemoryItem,
  Discussion,
  DecisionRecord,
  OrganizationalLesson,
  GovernancePolicy,
  PendingApproval,
  AuditRecord,
  AnalyticsSummary,
  UserProfile,
  AuthResponse,
} from '../types/companyOs';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const TOKEN_KEY = 'companyos_auth_token';
const USER_KEY = 'companyos_auth_user';

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setAuthToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeAuthToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
}

export function getStoredUser(): UserProfile | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as UserProfile;
  } catch {
    return null;
  }
}

export function setStoredUser(user: UserProfile): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function removeStoredUser(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(USER_KEY);
}

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options?.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    cache: 'no-store',
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || `HTTP ${res.status}: Request failed`);
  }
  return data as T;
}

// ==========================================
// AUTHENTICATION APIs
// ==========================================
export async function signIn(email: string, password: string): Promise<AuthResponse> {
  const res = await request<AuthResponse>('/auth/signin', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  if (res.token) {
    setAuthToken(res.token);
    setStoredUser(res.user);
  }
  return res;
}

export async function signUp(params: {
  name: string;
  email: string;
  password: string;
  role?: UserProfile['role'];
  organization?: string;
}): Promise<AuthResponse> {
  const res = await request<AuthResponse>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(params),
  });
  if (res.token) {
    setAuthToken(res.token);
    setStoredUser(res.user);
  }
  return res;
}

export async function getMe(): Promise<{ user: UserProfile }> {
  return request<{ user: UserProfile }>('/auth/me');
}

export async function signOut(): Promise<void> {
  const token = getAuthToken();
  if (token) {
    try {
      await request('/auth/signout', {
        method: 'POST',
        body: JSON.stringify({ token }),
      });
    } catch (e) {
      console.warn('Signout server call warning:', e);
    }
  }
  removeAuthToken();
  removeStoredUser();
}

// ==========================================
// SYSTEM & ANALYTICS APIs
// ==========================================
export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  return request<AnalyticsSummary>('/analytics/summary');
}

export async function getAgents(filters?: {
  category?: string;
  supervisorId?: string;
  search?: string;
  riskLevel?: string;
  autonomyLevel?: string;
}): Promise<{ total: number; agents: AgentDefinition[] }> {
  const params = new URLSearchParams();
  if (filters?.category) params.append('category', filters.category);
  if (filters?.supervisorId) params.append('supervisorId', filters.supervisorId);
  if (filters?.search) params.append('search', filters.search);
  if (filters?.riskLevel) params.append('riskLevel', filters.riskLevel);
  if (filters?.autonomyLevel) params.append('autonomyLevel', filters.autonomyLevel);

  const qs = params.toString() ? `?${params.toString()}` : '';
  return request<{ total: number; agents: AgentDefinition[] }>(`/agents${qs}`);
}

export async function getAgentById(id: string): Promise<AgentDefinition> {
  return request<AgentDefinition>(`/agents/${id}`);
}

export async function executeAgent(id: string, prompt: string, context?: any): Promise<AgentResult> {
  return request<AgentResult>(`/agents/${id}/execute`, {
    method: 'POST',
    body: JSON.stringify({ prompt, context }),
  });
}

export async function getSupervisors(): Promise<DomainSupervisor[]> {
  return request<DomainSupervisor[]>('/supervisors');
}

export async function getPipelines(): Promise<Pipeline[]> {
  return request<Pipeline[]>('/pipelines');
}

export async function getPipelineById(id: string): Promise<Pipeline> {
  return request<Pipeline>(`/pipelines/${id}`);
}

export async function createPipeline(params: {
  title: string;
  goal: string;
  category?: string;
}): Promise<Pipeline> {
  return request<Pipeline>('/pipelines', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function runPipeline(id: string): Promise<Pipeline> {
  return request<Pipeline>(`/pipelines/${id}/run`, {
    method: 'POST',
  });
}

export async function getMemory(tier?: string, domain?: string, q?: string): Promise<MemoryItem[]> {
  const params = new URLSearchParams();
  if (tier) params.append('tier', tier);
  if (domain) params.append('domain', domain);
  if (q) params.append('q', q);
  const qs = params.toString() ? `?${params.toString()}` : '';
  return request<MemoryItem[]>(`/memory${qs}`);
}

export async function addMemoryItem(item: Partial<MemoryItem>): Promise<MemoryItem> {
  return request<MemoryItem>('/memory', {
    method: 'POST',
    body: JSON.stringify(item),
  });
}

export async function validateMemoryItem(id: string): Promise<MemoryItem> {
  return request<MemoryItem>(`/memory/${id}/validate`, {
    method: 'POST',
  });
}

export async function getDiscussions(): Promise<Discussion[]> {
  return request<Discussion[]>('/discussions');
}

export async function createDiscussion(params: {
  topic: string;
  participants: string[];
  roundsLimit?: number;
}): Promise<Discussion> {
  return request<Discussion>('/discussions', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function getDecisions(): Promise<DecisionRecord[]> {
  return request<DecisionRecord[]>('/decisions');
}

export async function recordDecisionOutcome(
  id: string,
  metrics: any,
  description?: string
): Promise<{ decision: DecisionRecord; lesson?: OrganizationalLesson }> {
  return request<{ decision: DecisionRecord; lesson?: OrganizationalLesson }>(`/decisions/${id}/outcome`, {
    method: 'POST',
    body: JSON.stringify({ metrics, description }),
  });
}

export async function getLessons(): Promise<OrganizationalLesson[]> {
  return request<OrganizationalLesson[]>('/learning/lessons');
}

export async function getPolicies(): Promise<GovernancePolicy[]> {
  return request<GovernancePolicy[]>('/governance/policies');
}

export async function getApprovals(): Promise<PendingApproval[]> {
  return request<PendingApproval[]>('/governance/approvals');
}

export async function resolveApproval(
  id: string,
  decision: 'approved' | 'rejected',
  reason?: string,
  decidedBy?: string
): Promise<PendingApproval> {
  return request<PendingApproval>(`/governance/approvals/${id}/resolve`, {
    method: 'POST',
    body: JSON.stringify({ decision, reason, decidedBy }),
  });
}

export async function getAuditLogs(limit = 100): Promise<AuditRecord[]> {
  return request<AuditRecord[]>(`/audit?limit=${limit}`);
}

export async function verifyAuditIntegrity(): Promise<{ isValid: boolean; checkedRecords: number }> {
  return request<{ isValid: boolean; checkedRecords: number }>('/audit/verify');
}
