'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  AnalyticsSummary,
  AgentDefinition,
  DomainSupervisor,
  Pipeline,
  MemoryItem,
  Discussion,
  DecisionRecord,
  OrganizationalLesson,
  GovernancePolicy,
  PendingApproval,
  AuditRecord,
  UserProfile,
} from '../types/companyOs';
import {
  getAnalyticsSummary,
  getAgents,
  getSupervisors,
  getPipelines,
  getMemory,
  getDiscussions,
  getDecisions,
  getLessons,
  getPolicies,
  getApprovals,
  getAuditLogs,
  createPipeline,
  runPipeline,
  resolveApproval,
  getMe,
  signOut,
  getStoredUser,
} from '../lib/api';
import { Navigation, ActiveTab } from '../components/Navigation';
import { DashboardView } from '../components/DashboardView';
import { AgentDirectoryView } from '../components/AgentDirectoryView';
import { HierarchyView } from '../components/HierarchyView';
import { PipelineRunnerView } from '../components/PipelineRunnerView';
import { DiscussionRoomView } from '../components/DiscussionRoomView';
import { DecisionsView } from '../components/DecisionsView';
import { MemoryExplorerView } from '../components/MemoryExplorerView';
import { GovernanceView } from '../components/GovernanceView';
import { AuditLedgerView } from '../components/AuditLedgerView';
import { LearningAnalyticsView } from '../components/LearningAnalyticsView';
import { AuthModal } from '../components/AuthModal';
import { AuthView } from '../components/AuthView';

export default function CompanyOsApp() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [loading, setLoading] = useState(true);

  // Authentication State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Core Company OS state
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [agents, setAgents] = useState<AgentDefinition[]>([]);
  const [supervisors, setSupervisors] = useState<DomainSupervisor[]>([]);
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [memories, setMemories] = useState<MemoryItem[]>([]);
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [decisions, setDecisions] = useState<DecisionRecord[]>([]);
  const [lessons, setLessons] = useState<OrganizationalLesson[]>([]);
  const [policies, setPolicies] = useState<GovernancePolicy[]>([]);
  const [approvals, setApprovals] = useState<PendingApproval[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditRecord[]>([]);

  // Check auth session on startup
  useEffect(() => {
    const cachedUser = getStoredUser();
    if (cachedUser) {
      setCurrentUser(cachedUser);
    }
    getMe()
      .then((res) => {
        if (res.user) setCurrentUser(res.user);
      })
      .catch(() => {
        // Token invalid or unauthenticated guest mode
      });
  }, []);

  const loadData = useCallback(async () => {
    try {
      const [
        sumData,
        agentsData,
        supData,
        pipeData,
        memData,
        discData,
        decData,
        lessData,
        polData,
        apprData,
        auditData,
      ] = await Promise.all([
        getAnalyticsSummary().catch(() => null),
        getAgents().catch(() => ({ total: 0, agents: [] })),
        getSupervisors().catch(() => []),
        getPipelines().catch(() => []),
        getMemory().catch(() => []),
        getDiscussions().catch(() => []),
        getDecisions().catch(() => []),
        getLessons().catch(() => []),
        getPolicies().catch(() => []),
        getApprovals().catch(() => []),
        getAuditLogs(100).catch(() => []),
      ]);

      if (sumData) setSummary(sumData);
      setAgents(agentsData.agents || []);
      setSupervisors(supData);
      setPipelines(pipeData);
      setMemories(memData);
      setDiscussions(discData);
      setDecisions(decData);
      setLessons(lessData);
      setPolicies(polData);
      setApprovals(apprData);
      setAuditLogs(auditData);
    } catch (err) {
      console.error('Error loading Company OS telemetry:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 8000); // Polling for background activity
    return () => clearInterval(interval);
  }, [loadData]);

  const handleSignOut = async () => {
    await signOut();
    setCurrentUser(null);
    setActiveTab('dashboard');
    loadData();
  };

  // Quick Preset Pipeline Launcher
  const handleLaunchPreset = async (presetType: string) => {
    try {
      let title = '';
      let goal = '';
      let category = '';

      if (presetType === 'mna') {
        title = 'Acquisition Feasibility: Apex Robotics ($120M)';
        goal = 'Evaluate strategic fit, technical IP moat, financial payback, and human talent retention for acquiring Apex Robotics for $120M.';
        category = 'M&A & Corporate Strategy';
      } else if (presetType === 'product') {
        title = 'Autonomous Agent Workflow Orchestrator v2.0';
        goal = 'Define product specifications, event-driven cloud architecture, and GTM pricing for next-gen Autonomous Workflow Orchestrator.';
        category = 'Product & Technology';
      } else {
        title = 'Comprehensive SOC 2 Type II & GDPR Privacy Audit';
        goal = 'Audit enterprise software bill of materials, IAM least-privilege tokens, customer PII masking, and data retention policies.';
        category = 'Cybersecurity & Governance';
      }

      const created = await createPipeline({ title, goal, category });
      await runPipeline(created.id);
      await loadData();
      setActiveTab('pipelines');
    } catch (err: any) {
      alert(`Preset launch failed: ${err.message}`);
    }
  };

  const handleResolveApproval = async (id: string, decision: 'approved' | 'rejected') => {
    try {
      await resolveApproval(
        id,
        decision,
        decision === 'approved' ? 'Authorized by Executive Board' : 'Rejected by Executive Board',
        currentUser ? `${currentUser.name} (${currentUser.role})` : 'Executive Admin'
      );
      await loadData();
    } catch (err: any) {
      alert(`Failed to resolve approval: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        summary={summary}
        currentUser={currentUser}
        onOpenAuth={() => setShowAuthModal(true)}
        onSignOut={handleSignOut}
        onQuickPipeline={() => setActiveTab('pipelines')}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-mono text-indigo-700 font-bold animate-pulse">
              Initializing 100-Agent Mesh & Organizational Memory...
            </p>
          </div>
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <DashboardView
                summary={summary}
                pipelines={pipelines}
                approvals={approvals}
                decisions={decisions}
                discussions={discussions}
                onNavigate={(t) => setActiveTab(t)}
                onLaunchPreset={handleLaunchPreset}
                onResolveApproval={handleResolveApproval}
              />
            )}

            {activeTab === 'agents' && <AgentDirectoryView agents={agents} />}

            {activeTab === 'hierarchy' && (
              <HierarchyView supervisors={supervisors} agents={agents} />
            )}

            {activeTab === 'pipelines' && (
              <PipelineRunnerView
                pipelines={pipelines}
                onRefresh={loadData}
                onSelectDecision={() => setActiveTab('decisions')}
                onSelectDiscussion={() => setActiveTab('discussions')}
              />
            )}

            {activeTab === 'discussions' && (
              <DiscussionRoomView discussions={discussions} onRefresh={loadData} />
            )}

            {activeTab === 'decisions' && (
              <DecisionsView decisions={decisions} onRefresh={loadData} />
            )}

            {activeTab === 'memory' && (
              <MemoryExplorerView memories={memories} onRefresh={loadData} />
            )}

            {activeTab === 'governance' && (
              <GovernanceView
                policies={policies}
                approvals={approvals}
                onRefresh={loadData}
              />
            )}

            {activeTab === 'audit' && (
              <AuditLedgerView auditLogs={auditLogs} onRefresh={loadData} />
            )}

            {activeTab === 'learning' && (
              <LearningAnalyticsView
                lessons={lessons}
                agents={agents}
                summary={summary}
              />
            )}

            {activeTab === 'auth' && (
              <AuthView
                currentUser={currentUser}
                onAuthSuccess={(user) => {
                  setCurrentUser(user);
                  setActiveTab('dashboard');
                  loadData();
                }}
                onSignOut={handleSignOut}
              />
            )}
          </>
        )}
      </main>

      {/* Auth Modal Trigger */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={(user) => {
          setCurrentUser(user);
          loadData();
        }}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 text-xs font-mono text-slate-500 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-bold text-slate-800">100-Agent Company OS v1.0.0</span>
            <span>•</span>
            <span>Decoupled Multi-Agent Runtime</span>
          </div>
          <div>
            {currentUser ? (
              <span className="text-emerald-700 font-bold">
                Logged in as {currentUser.name} ({currentUser.role})
              </span>
            ) : (
              <span>Guest Session • Prioritizing Governance & Reliability</span>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
