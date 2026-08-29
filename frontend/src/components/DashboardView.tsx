'use client';

import React from 'react';
import {
  AnalyticsSummary,
  Pipeline,
  PendingApproval,
  DecisionRecord,
  Discussion,
} from '../types/companyOs';
import { ActiveTab } from './Navigation';

interface DashboardViewProps {
  summary: AnalyticsSummary | null;
  pipelines: Pipeline[];
  approvals: PendingApproval[];
  decisions: DecisionRecord[];
  discussions: Discussion[];
  onNavigate: (tab: ActiveTab) => void;
  onLaunchPreset: (presetType: string) => void;
  onResolveApproval: (id: string, decision: 'approved' | 'rejected') => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  summary,
  pipelines,
  approvals,
  decisions,
  discussions,
  onNavigate,
  onLaunchPreset,
  onResolveApproval,
}) => {
  return (
    <div className="space-y-6">
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-slate-800 p-6 shadow-xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-950 text-emerald-400 border border-emerald-700/60 flex items-center space-x-1.5 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>SYSTEM ACTIVE • 100 SPECIALIST ROLES ONLINE</span>
              </span>
              <span className="text-xs text-slate-300 font-mono">14 Domain Supervisors</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 tracking-tight">
              Enterprise Multi-Agent Company Operating System
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl">
              Hierarchical orchestration, structured agent dialectics, multi-tier organizational memory, and human-governed decision intelligence.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => onLaunchPreset('mna')}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 shadow-md backdrop-blur transition-all"
            >
              🏢 Run M&A Analysis
            </button>
            <button
              onClick={() => onLaunchPreset('product')}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 shadow-md backdrop-blur transition-all"
            >
              🚀 Launch Product
            </button>
            <button
              onClick={() => onLaunchPreset('security')}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 shadow-md backdrop-blur transition-all"
            >
              🛡️ Security Audit
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div
          onClick={() => onNavigate('agents')}
          className="cursor-pointer group p-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-indigo-400 transition-all shadow-sm hover:shadow-md"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Specialists</span>
            <span className="text-base group-hover:scale-110 transition-transform">🤖</span>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2 group-hover:text-indigo-600 transition-colors">
            100
          </div>
          <div className="text-[11px] text-indigo-600 font-mono font-medium mt-1">11 Categories</div>
        </div>

        <div
          onClick={() => onNavigate('pipelines')}
          className="cursor-pointer group p-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-blue-400 transition-all shadow-sm hover:shadow-md"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Pipelines</span>
            <span className="text-base group-hover:scale-110 transition-transform">🔀</span>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2 group-hover:text-blue-600 transition-colors">
            {summary?.totalPipelines || pipelines.length}
          </div>
          <div className="text-[11px] text-blue-600 font-mono font-medium mt-1">
            {pipelines.filter((p) => p.status === 'completed').length} Completed
          </div>
        </div>

        <div
          onClick={() => onNavigate('decisions')}
          className="cursor-pointer group p-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-emerald-400 transition-all shadow-sm hover:shadow-md"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Decisions</span>
            <span className="text-base group-hover:scale-110 transition-transform">⚖️</span>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2 group-hover:text-emerald-600 transition-colors">
            {summary?.totalDecisions || decisions.length}
          </div>
          <div className="text-[11px] text-emerald-600 font-mono font-medium mt-1">Full Traceability</div>
        </div>

        <div
          onClick={() => onNavigate('memory')}
          className="cursor-pointer group p-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-purple-400 transition-all shadow-sm hover:shadow-md"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Memory Units</span>
            <span className="text-base group-hover:scale-110 transition-transform">🧠</span>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2 group-hover:text-purple-600 transition-colors">
            {summary?.totalMemories || 6}
          </div>
          <div className="text-[11px] text-purple-600 font-mono font-medium mt-1">6 Memory Tiers</div>
        </div>

        <div
          onClick={() => onNavigate('governance')}
          className="cursor-pointer group p-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-amber-400 transition-all shadow-sm hover:shadow-md"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Approvals</span>
            <span className="text-base group-hover:scale-110 transition-transform">🛡️</span>
          </div>
          <div className="text-2xl font-black text-amber-600 mt-2 group-hover:text-amber-700 transition-colors">
            {approvals.filter((a) => a.status === 'pending').length}
          </div>
          <div className="text-[11px] text-amber-700 font-mono font-medium mt-1">Human Gate Pending</div>
        </div>

        <div
          onClick={() => onNavigate('learning')}
          className="cursor-pointer group p-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-pink-400 transition-all shadow-sm hover:shadow-md"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Org Lessons</span>
            <span className="text-base group-hover:scale-110 transition-transform">📈</span>
          </div>
          <div className="text-2xl font-black text-pink-600 mt-2 group-hover:text-pink-700 transition-colors">
            {summary?.lessonsLearned || 1}
          </div>
          <div className="text-[11px] text-pink-700 font-mono font-medium mt-1">Learning Feedback Loop</div>
        </div>
      </div>

      {/* Main Grid: Pending Approvals & Active Pipelines */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Human Approvals Gate & Presets (1 Col) */}
        <div className="space-y-6">
          {/* Pending Human Approval Inbox */}
          <div className="rounded-2xl bg-white border border-amber-200 p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <span className="text-lg">🛡️</span>
                <h3 className="font-bold text-slate-900 text-sm">Human Approval Gate</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-amber-100 text-amber-800 font-bold border border-amber-200">
                {approvals.filter((a) => a.status === 'pending').length} Pending
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {approvals.filter((a) => a.status === 'pending').length === 0 ? (
                <div className="text-center py-6 text-slate-500 text-xs font-mono">
                  ✅ All high-risk agent actions reviewed and approved.
                </div>
              ) : (
                approvals
                  .filter((a) => a.status === 'pending')
                  .map((app) => (
                    <div
                      key={app.id}
                      className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 hover:border-amber-300 transition-all space-y-2.5"
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-xs font-bold text-amber-900">{app.title}</span>
                        <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-200 font-bold">
                          {app.riskLevel} Risk
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-2">{app.description}</p>

                      <div className="flex items-center justify-end space-x-2 pt-2 border-t border-amber-200/60">
                        <button
                          onClick={() => onResolveApproval(app.id, 'rejected')}
                          className="px-3 py-1 text-xs font-semibold rounded-lg text-rose-700 hover:bg-rose-100/80 border border-rose-200 transition-colors"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => onResolveApproval(app.id, 'approved')}
                          className="px-3.5 py-1 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm shadow-emerald-600/30 transition-all"
                        >
                          ✓ Authorize
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>

          {/* Quick Scenario Launcher */}
          <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <span className="text-lg">⚡</span>
              <h3 className="font-bold text-slate-900 text-sm">Autonomous Enterprise Scenarios</h3>
            </div>
            <div className="mt-4 space-y-2.5">
              <button
                onClick={() => onLaunchPreset('mna')}
                className="w-full text-left p-3.5 rounded-xl bg-slate-50 hover:bg-indigo-50/60 border border-slate-200 hover:border-indigo-300 transition-all group"
              >
                <div className="flex items-center justify-between text-xs font-bold text-slate-900 group-hover:text-indigo-700">
                  <span>🏢 $95M M&A Acquisition Analysis</span>
                  <span>→</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  CEO $\rightarrow$ DCF Valuation $\rightarrow$ Legal Audit $\rightarrow$ Retention Plan $\rightarrow$ DEC-0042
                </p>
              </button>

              <button
                onClick={() => onLaunchPreset('product')}
                className="w-full text-left p-3.5 rounded-xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200 hover:border-blue-300 transition-all group"
              >
                <div className="flex items-center justify-between text-xs font-bold text-slate-900 group-hover:text-blue-700">
                  <span>🚀 Next-Gen Product Launch</span>
                  <span>→</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  CPO $\rightarrow$ PRD Spec $\rightarrow$ Cloud Architecture $\rightarrow$ CAC Optimization
                </p>
              </button>

              <button
                onClick={() => onLaunchPreset('security')}
                className="w-full text-left p-3.5 rounded-xl bg-slate-50 hover:bg-purple-50/60 border border-slate-200 hover:border-purple-300 transition-all group"
              >
                <div className="flex items-center justify-between text-xs font-bold text-slate-900 group-hover:text-purple-700">
                  <span>🛡️ SOC 2 & GDPR Compliance Audit</span>
                  <span>→</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Security $\rightarrow$ Privacy PII $\rightarrow$ Compliance $\rightarrow$ Audit Ledger
                </p>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Active Pipelines & Recent Decisions (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active & Recent Multi-Agent Pipelines */}
          <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <span className="text-lg">🔀</span>
                <h3 className="font-bold text-slate-900 text-sm">Enterprise Multi-Agent Pipelines</h3>
              </div>
              <button
                onClick={() => onNavigate('pipelines')}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold font-mono"
              >
                View All Pipelines →
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {pipelines.slice(0, 3).map((pipe) => (
                <div
                  key={pipe.id}
                  className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 hover:border-indigo-300 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 font-semibold">
                          {pipe.id}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">{pipe.title}</h4>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{pipe.goal}</p>
                    </div>
                    <span
                      className={`text-[10px] font-mono uppercase px-2.5 py-1 rounded-full font-bold self-start sm:self-center border ${
                        pipe.status === 'completed'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : pipe.status === 'running'
                          ? 'bg-blue-50 text-blue-700 border-blue-200 animate-pulse'
                          : 'bg-slate-200 text-slate-700 border-slate-300'
                      }`}
                    >
                      {pipe.status}
                    </span>
                  </div>

                  {/* Task Step Progress Pills */}
                  <div className="mt-3 pt-3 border-t border-slate-200/80 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] text-slate-500 font-mono mr-1">DAG Tasks:</span>
                    {pipe.tasks.map((task) => (
                      <span
                        key={task.id}
                        title={`${task.name} (${task.agentId})`}
                        className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                          task.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold'
                            : task.status === 'running'
                            ? 'bg-blue-100 text-blue-800 border border-blue-300 font-semibold animate-pulse'
                            : 'bg-white text-slate-500 border border-slate-200'
                        }`}
                      >
                        ✓ {task.name.slice(0, 18)}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>Tokens: {pipe.executionMetrics.totalTokens.toLocaleString()}</span>
                    <span>Cost: ${pipe.executionMetrics.totalCostUsd.toFixed(4)} USD</span>
                    <span>Latency: {pipe.executionMetrics.totalLatencyMs}ms</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Decisions & Traceability Ticker */}
          <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <span className="text-lg">⚖️</span>
                <h3 className="font-bold text-slate-900 text-sm">Recent Strategic Decisions (Decision Memory)</h3>
              </div>
              <button
                onClick={() => onNavigate('decisions')}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold font-mono"
              >
                Decision Explorer →
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {decisions.slice(0, 2).map((dec) => (
                <div
                  key={dec.id}
                  className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold">
                        {dec.id}
                      </span>
                      <span className="text-xs font-bold text-slate-900">{dec.question}</span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-700 font-bold">
                      {(dec.confidence * 100).toFixed(0)}% Confidence
                    </span>
                  </div>
                  <p className="text-xs text-slate-700">
                    <span className="text-slate-500 font-semibold">Decision: </span>
                    {dec.decision}
                  </p>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-1 border-t border-slate-200">
                    <span>{dec.participants.length} Specialist Agents Participated</span>
                    <span>{dec.evidence.length} Verified Evidence Items</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
