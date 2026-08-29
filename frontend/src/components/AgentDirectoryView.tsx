'use client';

import React, { useState, useMemo } from 'react';
import { AgentDefinition, AgentResult, RiskLevel } from '../types/companyOs';
import { executeAgent } from '../lib/api';

interface AgentDirectoryViewProps {
  agents: AgentDefinition[];
}

export const AgentDirectoryView: React.FC<AgentDirectoryViewProps> = ({ agents }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRisk, setSelectedRisk] = useState<string>('all');
  const [selectedAgent, setSelectedAgent] = useState<AgentDefinition | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Ad-hoc execution state in drawer
  const [playgroundGoal, setPlaygroundGoal] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState<AgentResult | null>(null);
  const [executionError, setExecutionError] = useState<string | null>(null);

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All 100 Agents' },
    { id: 'executive', label: 'Executive (1-10)' },
    { id: 'orchestration', label: 'Orchestration (11-20)' },
    { id: 'memory', label: 'Memory & Knowledge (21-30)' },
    { id: 'strategy', label: 'Strategy & Intel (31-40)' },
    { id: 'finance', label: 'Finance (41-50)' },
    { id: 'sales_marketing', label: 'Sales & Marketing (51-60)' },
    { id: 'product_engineering', label: 'Product & Eng (61-70)' },
    { id: 'operations', label: 'Operations & Supply (71-80)' },
    { id: 'people_hr', label: 'People & HR (81-87)' },
    { id: 'legal_governance', label: 'Legal & Security (88-95)' },
    { id: 'customer', label: 'Customer (96-100)' },
  ];

  const filteredAgents = useMemo(() => {
    return agents.filter((agent) => {
      const matchCat = selectedCategory === 'all' || agent.category === selectedCategory;
      const matchRisk = selectedRisk === 'all' || agent.riskLevel === selectedRisk;
      const q = searchTerm.toLowerCase();
      const matchSearch =
        !searchTerm ||
        agent.name.toLowerCase().includes(q) ||
        agent.title.toLowerCase().includes(q) ||
        agent.description.toLowerCase().includes(q) ||
        agent.capabilities.some((c) => c.toLowerCase().includes(q)) ||
        agent.tools.some((t) => t.toLowerCase().includes(q));

      return matchCat && matchRisk && matchSearch;
    });
  }, [agents, selectedCategory, selectedRisk, searchTerm]);

  const handleSelectAgent = (agent: AgentDefinition) => {
    setSelectedAgent(agent);
    setExecutionResult(null);
    setExecutionError(null);
    setPlaygroundGoal(`Analyze quarterly roadmap priorities and risk factors for ${agent.title}`);
  };

  const handleRunPlayground = async () => {
    if (!selectedAgent || !playgroundGoal.trim()) return;
    setIsExecuting(true);
    setExecutionError(null);
    setExecutionResult(null);

    try {
      const result = await executeAgent(selectedAgent.id, playgroundGoal);
      setExecutionResult(result);
    } catch (err: any) {
      setExecutionError(err.message || 'Execution error');
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Stats */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              100-Agent Organizational Directory
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold">
              {filteredAgents.length} / 100 Filtered
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            All 100 specialized cognitive roles with distinct capabilities, tools, permissions, and memory scopes.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${viewMode === 'grid'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
          >
            ▦ Grid
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${viewMode === 'table'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
          >
            ☰ Table
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="rounded-2xl bg-white border border-slate-200 p-4 space-y-3.5 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by agent name, role, capability, tool, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-2 text-slate-400 hover:text-slate-700 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          <select
            value={selectedRisk}
            onChange={(e) => setSelectedRisk(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-indigo-500 font-mono"
          >
            <option value="all">All Risk Levels</option>
            <option value="critical">Critical Risk</option>
            <option value="high">High Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="low">Low Risk</option>
          </select>
        </div>

        {/* Category Pill Filters */}
        <div className="flex space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-lg text-xs whitespace-nowrap transition-all ${selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white font-bold shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-200'
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Agents Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredAgents.map((agent) => {
            const isSelected = selectedAgent?.id === agent.id;
            const riskColors: Record<RiskLevel, string> = {
              critical: 'bg-rose-50 text-rose-800 border-rose-200',
              high: 'bg-amber-50 text-amber-800 border-amber-200',
              medium: 'bg-yellow-50 text-yellow-800 border-yellow-200',
              low: 'bg-emerald-50 text-emerald-800 border-emerald-200',
            };

            return (
              <div
                key={agent.id}
                onClick={() => handleSelectAgent(agent)}
                className={`cursor-pointer rounded-2xl p-4 transition-all duration-200 flex flex-col justify-between ${isSelected
                    ? 'bg-indigo-50/50 border-2 border-indigo-600 shadow-md scale-[1.02]'
                    : 'bg-white hover:bg-slate-50 border border-slate-200 hover:border-indigo-300 shadow-sm hover:shadow-md'
                  }`}
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-xl shadow-inner">
                        {agent.avatarIcon}
                      </div>
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <span className="text-[10px] font-mono text-indigo-600 font-bold">
                            #{agent.number}
                          </span>
                          <h3 className="text-sm font-bold text-slate-900 leading-tight">
                            {agent.name}
                          </h3>
                        </div>
                        <p className="text-[11px] text-slate-500 font-mono line-clamp-1">{agent.title}</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                    {agent.description}
                  </p>

                  {/* Capabilities Chips */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {agent.capabilities.slice(0, 2).map((cap, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        {cap.replace(/_/g, ' ')}
                      </span>
                    ))}
                    {agent.capabilities.length > 2 && (
                      <span className="text-[10px] font-mono text-slate-400 px-1 py-0.5">
                        +{agent.capabilities.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono">
                  <span className={`px-2 py-0.5 rounded border text-[10px] font-bold ${riskColors[agent.riskLevel]}`}>
                    {agent.riskLevel}
                  </span>
                  <span className="text-slate-500">
                    Accuracy: <strong className="text-indigo-600">{agent.metrics.accuracyScore}%</strong>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-mono border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Agent</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Supervisor</th>
                  <th className="px-4 py-3">Risk</th>
                  <th className="px-4 py-3">Autonomy</th>
                  <th className="px-4 py-3">Model</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAgents.map((agent) => (
                  <tr
                    key={agent.id}
                    onClick={() => handleSelectAgent(agent)}
                    className="hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3 font-mono text-slate-400">#{agent.number}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <span>{agent.avatarIcon}</span>
                        <div>
                          <div className="font-bold text-slate-900">{agent.name}</div>
                          <div className="text-[10px] text-slate-500 font-mono">{agent.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 capitalize text-slate-700">{agent.category.replace(/_/g, ' ')}</td>
                    <td className="px-4 py-3 font-mono text-slate-600">{agent.supervisorId}</td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {agent.riskLevel}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[11px] font-mono text-slate-600">
                      {agent.autonomyLevel.replace(/_/g, ' ')}
                    </td>
                    <td className="px-4 py-3 text-[11px] font-mono text-indigo-600 font-medium">
                      {agent.defaultModel.replace(/_/g, ' ')}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectAgent(agent);
                        }}
                        className="px-2.5 py-1 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 font-mono text-[10px] font-bold"
                      >
                        Inspect & Run
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Selected Agent Modal / Drawer */}
      {selectedAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-3xl shadow-sm">
                  {selectedAgent.avatarIcon}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold border border-indigo-200">
                      Role #{selectedAgent.number} • {selectedAgent.id}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      Level {selectedAgent.level}
                    </span>
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-900 mt-1">{selectedAgent.name}</h2>
                  <p className="text-xs text-slate-500 font-mono">{selectedAgent.title}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedAgent(null)}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            {/* Description & Supervisor */}
            <div>
              <h4 className="text-xs font-mono uppercase text-slate-400 font-bold">Mission & Role</h4>
              <p className="text-sm text-slate-700 mt-1 leading-relaxed">{selectedAgent.description}</p>
              <div className="mt-2 text-xs font-mono text-indigo-600">
                Supervisor: <strong>{selectedAgent.supervisorId}</strong>
              </div>
            </div>

            {/* Capabilities, Tools, Permissions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h5 className="text-xs font-bold text-slate-800">Capabilities</h5>
                <div className="flex flex-wrap gap-1">
                  {selectedAgent.capabilities.map((c, i) => (
                    <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-indigo-700 border border-indigo-200">
                      {c.replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h5 className="text-xs font-bold text-slate-800">Authorized Tools</h5>
                <div className="flex flex-wrap gap-1">
                  {selectedAgent.tools.map((t, i) => (
                    <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-blue-700 border border-blue-200">
                      🛠️ {t.replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h5 className="text-xs font-bold text-slate-800">Memory Scope</h5>
                <div className="flex flex-wrap gap-1">
                  {selectedAgent.memoryScope.map((m, i) => (
                    <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-purple-700 border border-purple-200">
                      🧠 {m.replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Execution Playground */}
            <div className="rounded-xl bg-slate-50 border border-indigo-200 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-indigo-800 uppercase font-mono flex items-center space-x-1.5">
                  <span>⚡</span>
                  <span>Agent Execution Playground</span>
                </h4>
                <span className="text-[10px] font-mono text-slate-500">
                  Model: <strong className="text-slate-800">{selectedAgent.defaultModel}</strong>
                </span>
              </div>

              <div>
                <label className="block text-[11px] text-slate-600 font-mono mb-1">
                  Direct Task Objective / Prompt:
                </label>
                <input
                  type="text"
                  value={playgroundGoal}
                  onChange={(e) => setPlaygroundGoal(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleRunPlayground}
                  disabled={isExecuting || !playgroundGoal.trim()}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/25 transition-all disabled:opacity-50 flex items-center space-x-2"
                >
                  {isExecuting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Executing Agentic Reasoning...</span>
                    </>
                  ) : (
                    <>
                      <span>▶</span>
                      <span>Execute Agent</span>
                    </>
                  )}
                </button>
              </div>

              {/* Execution Error */}
              {executionError && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono">
                  Error: {executionError}
                </div>
              )}

              {/* Execution Result */}
              {executionResult && (
                <div className="mt-4 p-4 rounded-xl bg-white border border-slate-200 space-y-3 shadow-sm animate-fade-in">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-bold text-emerald-700 font-mono">
                      ✓ Completed in {executionResult.latencyMs}ms ({executionResult.tokensUsed} tokens)
                    </span>
                    <span className="text-xs font-mono text-indigo-700 font-bold">
                      {(executionResult.confidence * 100).toFixed(0)}% Confidence
                    </span>
                  </div>

                  <div>
                    <h6 className="text-xs font-bold text-slate-800">Executive Summary</h6>
                    <p className="text-xs text-slate-700 mt-1">{executionResult.summary}</p>
                  </div>

                  {executionResult.findings.length > 0 && (
                    <div>
                      <h6 className="text-xs font-bold text-slate-800">Key Findings</h6>
                      <div className="space-y-1.5 mt-1">
                        {executionResult.findings.map((f, i) => (
                          <div key={i} className="text-xs text-slate-700 p-2.5 rounded bg-slate-50 border border-slate-200">
                            <strong className="text-indigo-700">{f.topic}:</strong> {f.summary} ({f.details})
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {executionResult.recommendations.length > 0 && (
                    <div>
                      <h6 className="text-xs font-bold text-slate-800">Recommendations</h6>
                      <ul className="list-disc list-inside text-xs text-slate-700 space-y-1 mt-1">
                        {executionResult.recommendations.map((r, i) => (
                          <li key={i}>
                            <strong>{r.action}</strong> — {r.rationale}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
