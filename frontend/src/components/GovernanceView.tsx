'use client';

import React, { useState } from 'react';
import { GovernancePolicy, PendingApproval } from '../types/companyOs';
import { resolveApproval } from '../lib/api';

interface GovernanceViewProps {
  policies: GovernancePolicy[];
  approvals: PendingApproval[];
  onRefresh: () => void;
}

export const GovernanceView: React.FC<GovernanceViewProps> = ({ policies, approvals, onRefresh }) => {
  const [activeSubTab, setActiveSubTab] = useState<'approvals' | 'policies' | 'autonomy'>('approvals');
  const [rejectReason, setRejectReason] = useState('');
  const [selectedRejectId, setSelectedRejectId] = useState<string | null>(null);

  const handleResolve = async (id: string, decision: 'approved' | 'rejected') => {
    try {
      await resolveApproval(
        id,
        decision,
        decision === 'approved' ? 'Approved after evidence review' : rejectReason || 'Rejected by Human Executive'
      );
      setSelectedRejectId(null);
      setRejectReason('');
      onRefresh();
    } catch (err: any) {
      alert(`Approval resolution error: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Governance, Risk & Human-In-The-Loop Control
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-amber-100 text-amber-800 border border-amber-200 font-bold">
              {approvals.filter((a) => a.status === 'pending').length} Pending Gate Actions
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Enforces autonomy boundaries, capital thresholds, policy compliance, and mandatory human authorization.
          </p>
        </div>

        {/* Subtab Toggle */}
        <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono">
          <button
            onClick={() => setActiveSubTab('approvals')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeSubTab === 'approvals' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Pending Inbox ({approvals.filter((a) => a.status === 'pending').length})
          </button>
          <button
            onClick={() => setActiveSubTab('policies')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeSubTab === 'policies' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Policy Rulebook ({policies.length})
          </button>
          <button
            onClick={() => setActiveSubTab('autonomy')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeSubTab === 'autonomy' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Autonomy Matrix
          </button>
        </div>
      </div>

      {/* SubTab 1: Pending Approvals Inbox */}
      {activeSubTab === 'approvals' && (
        <div className="space-y-4">
          {approvals.length === 0 ? (
            <div className="rounded-2xl bg-white border border-slate-200 p-12 text-center text-slate-400 font-mono text-xs shadow-sm">
              ✅ Zero pending approval requests. System operates within pre-authorized autonomy limits.
            </div>
          ) : (
            approvals.map((app) => (
              <div
                key={app.id}
                className="p-5 rounded-2xl bg-white border border-amber-300 hover:border-amber-400 shadow-sm space-y-4 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                      {app.id} • Action Gate
                    </span>
                    <span className="text-xs font-mono text-slate-500">Agent: @{app.agentId}</span>
                    <span className="text-xs font-mono text-slate-400">Pipeline: {app.pipelineId}</span>
                  </div>
                  <span
                    className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full font-bold self-start sm:self-center border ${
                      app.status === 'pending'
                        ? 'bg-amber-100 text-amber-800 border-amber-300 animate-pulse'
                        : app.status === 'approved'
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : 'bg-rose-100 text-rose-800 border-rose-300'
                    }`}
                  >
                    {app.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900">{app.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{app.description}</p>
                </div>

                {/* Payload parameters */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <h5 className="text-[11px] font-mono text-slate-300 uppercase font-bold">Action Payload:</h5>
                  <pre className="mt-1.5 text-xs font-mono text-cyan-300 overflow-x-auto">
                    {JSON.stringify(app.actionPayload, null, 2)}
                  </pre>
                </div>

                {/* Decision Actions */}
                {app.status === 'pending' && (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
                    <div className="text-[11px] font-mono text-slate-500">
                      Requested on {new Date(app.requestedAt).toLocaleString()}
                    </div>

                    <div className="flex items-center space-x-3">
                      {selectedRejectId === app.id ? (
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            placeholder="Rejection reason..."
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            className="bg-white border border-slate-300 rounded-lg px-3 py-1 text-xs text-slate-900"
                          />
                          <button
                            onClick={() => handleResolve(app.id, 'rejected')}
                            className="px-3 py-1 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white"
                          >
                            Confirm Reject
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setSelectedRejectId(app.id)}
                          className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-rose-700 hover:bg-rose-50 border border-rose-200 transition-colors"
                        >
                          ✕ Reject Action
                        </button>
                      )}

                      <button
                        onClick={() => handleResolve(app.id, 'approved')}
                        className="px-5 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30 transition-all flex items-center space-x-1.5"
                      >
                        <span>✓</span>
                        <span>Authorize & Proceed</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* SubTab 2: Governance Policy Rulebook */}
      {activeSubTab === 'policies' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {policies.map((pol) => (
            <div
              key={pol.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-bold border border-slate-200">
                  {pol.code}
                </span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                  {pol.category}
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-900">{pol.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{pol.description}</p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Mandatory Gate: {pol.mandatoryApproval ? 'YES (Level 3+)' : 'NO'}</span>
                <span className="text-emerald-700 font-bold">STATUS: ACTIVE</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SubTab 3: Autonomy Matrix */}
      {activeSubTab === 'autonomy' && (
        <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4 shadow-sm">
          <h3 className="text-base font-bold text-slate-900">5-Tier Agent Autonomy Classification Framework</h3>
          <p className="text-xs text-slate-500">
            Agents operate under strict autonomy boundaries based on task criticality, capital impact, and risk score.
          </p>

          <div className="space-y-3 mt-4">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start space-x-3">
              <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-slate-200 text-slate-800">Level 0</span>
              <div>
                <div className="text-xs font-bold text-slate-900">Observe & Ingest</div>
                <p className="text-xs text-slate-600 mt-0.5">Read-only data access. Ingests feeds, logs, and telemetry with zero active output.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start space-x-3">
              <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-blue-100 text-blue-800">Level 1</span>
              <div>
                <div className="text-xs font-bold text-slate-900">Recommend & Formulate</div>
                <p className="text-xs text-slate-600 mt-0.5">Performs research and generates advisory reports. Cannot invoke active modifying tools.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start space-x-3">
              <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-indigo-100 text-indigo-800">Level 2</span>
              <div>
                <div className="text-xs font-bold text-slate-900">Low-Risk Autonomous Execution</div>
                <p className="text-xs text-slate-600 mt-0.5">Autonomously executes internal analysis, query tools, data indexing, and drafts under $1,000 threshold.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 flex items-start space-x-3">
              <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-amber-100 text-amber-800">Level 3</span>
              <div>
                <div className="text-xs font-bold text-amber-900">Execute with Mandatory Human Approval</div>
                <p className="text-xs text-slate-700 mt-0.5">High-impact actions: Capital commitments &gt; $100k, production database changes, customer outreach, contract authorizations.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-purple-50/60 border border-purple-200 flex items-start space-x-3">
              <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-purple-100 text-purple-800">Level 4</span>
              <div>
                <div className="text-xs font-bold text-purple-900">High-Autonomy Supervisor Control</div>
                <p className="text-xs text-slate-700 mt-0.5">Master Orchestrator and Governance Agents authorized to re-route workflows, balance compute quotas, and trip emergency circuit breakers.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
