'use client';

import React, { useState } from 'react';
import { DomainSupervisor, AgentDefinition } from '../types/companyOs';

interface HierarchyViewProps {
  supervisors: DomainSupervisor[];
  agents: AgentDefinition[];
}

export const HierarchyView: React.FC<HierarchyViewProps> = ({ supervisors, agents }) => {
  const [selectedSupervisor, setSelectedSupervisor] = useState<DomainSupervisor | null>(null);

  const executiveAgents = agents.filter((a) => a.level === 1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Organizational Hierarchy & Supervisory Control
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold">
              5-Tier Architecture
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Human Executive $\rightarrow$ Executive C-Suite $\rightarrow$ 14 Domain Supervisors $\rightarrow$ 100 Specialist Agents $\rightarrow$ Tools & Memory.
          </p>
        </div>
      </div>

      {/* Level 0: Human Board / Executive */}
      <div className="p-5 rounded-2xl bg-white border-2 border-indigo-400 shadow-md text-center space-y-2 relative overflow-hidden">
        <div className="flex items-center justify-center space-x-2">
          <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-indigo-100 text-indigo-800 border border-indigo-200">
            LEVEL 0 • ULTIMATE GOVERNANCE
          </span>
        </div>
        <h3 className="text-lg font-black text-slate-900">Human Executive / Board of Directors</h3>
        <p className="text-xs text-slate-600 max-w-xl mx-auto">
          Defines company objectives, capital allocation constraints, ethical boundaries, and provides final sign-off on Level 3+ critical actions.
        </p>
      </div>

      {/* Level 1: C-Suite Officers */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
            LEVEL 1 • EXECUTIVE C-SUITE (10 ROLES)
          </span>
          <span className="text-xs text-slate-500 font-mono">Cross-functional Strategic Orchestration</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {executiveAgents.map((c) => (
            <div
              key={c.id}
              className="p-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-blue-400 transition-all shadow-sm flex items-center space-x-2.5"
            >
              <span className="text-xl">{c.avatarIcon}</span>
              <div>
                <div className="text-xs font-bold text-slate-900">{c.name}</div>
                <div className="text-[10px] text-blue-600 font-mono font-medium">{c.id}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Level 2: 14 Domain Supervisors */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800 border border-purple-200">
            LEVEL 2 • 14 DOMAIN SUPERVISORS
          </span>
          <span className="text-xs text-slate-500 font-mono">Decomposition, Allocation & Conflict Synthesis</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {supervisors.map((sup) => {
            const isSelected = selectedSupervisor?.id === sup.id;
            return (
              <div
                key={sup.id}
                onClick={() => setSelectedSupervisor(sup)}
                className={`cursor-pointer rounded-2xl p-4 transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-purple-50/60 border-2 border-purple-600 shadow-md'
                    : 'bg-white hover:bg-slate-50 border border-slate-200 hover:border-purple-300 shadow-sm hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold border border-slate-200">
                        {sup.domain}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 mt-2">{sup.name}</h4>
                      <p className="text-[11px] text-purple-700 font-mono font-medium">{sup.id}</p>
                    </div>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800 border border-purple-200">
                      {sup.specialistAgentIds.length} Agents
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">{sup.description}</p>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-500">Conflict Synthesis:</span>
                  <span className="text-emerald-700 font-bold">{sup.conflictResolutionPolicy.replace(/_/g, ' ')}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Level 3: Specialist Agents Drilldown */}
      {selectedSupervisor && (
        <div className="rounded-2xl bg-white border border-purple-200 p-6 space-y-4 shadow-lg animate-fade-in">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800 border border-purple-200">
                  SUPERVISOR ROSTER: {selectedSupervisor.name}
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  Domain: {selectedSupervisor.domain}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Specialist agents delegated and coordinated by this domain supervisor.
              </p>
            </div>

            <button
              onClick={() => setSelectedSupervisor(null)}
              className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 font-mono text-xs font-bold"
            >
              ✕ Close Roster
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {agents
              .filter((a) => selectedSupervisor.specialistAgentIds.includes(a.id))
              .map((agent) => (
                <div
                  key={agent.id}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{agent.avatarIcon}</span>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{agent.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono">#{agent.number} • {agent.id}</div>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-2">{agent.title}</p>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Level 4: Tools & Memory System */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
            LEVEL 4 • TOOLS & ORGANIZATIONAL MEMORY
          </span>
        </div>
        <h4 className="text-base font-bold text-slate-900">
          Enterprise Tool Registry & 6-Tier Memory Store
        </h4>
        <p className="text-xs text-slate-600 max-w-2xl mx-auto">
          Episodic, Semantic, Decision, Policy, Project, and Knowledge Graph Memory paired with RBAC Tool Sandboxes (`financial_ledger`, `m_and_a_valuation`, `legal_corpus`, `cve_nist`).
        </p>
      </div>
    </div>
  );
};
