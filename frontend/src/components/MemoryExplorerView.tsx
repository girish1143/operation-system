'use client';

import React, { useState } from 'react';
import { MemoryItem, MemoryTier } from '../types/companyOs';
import { addMemoryItem, validateMemoryItem } from '../lib/api';

interface MemoryExplorerViewProps {
  memories: MemoryItem[];
  onRefresh: () => void;
}

export const MemoryExplorerView: React.FC<MemoryExplorerViewProps> = ({
  memories,
  onRefresh,
}) => {
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Memory Item Form State
  const [tier, setTier] = useState<MemoryTier>('semantic');
  const [domain, setDomain] = useState('corporate_strategy');
  const [scope, setScope] = useState('company_wide');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [importance, setImportance] = useState(8);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tiers: { id: string; label: string; icon: string }[] = [
    { id: 'all', label: 'All Tiers', icon: '🧠' },
    { id: 'episodic', label: 'Episodic', icon: '⏱️' },
    { id: 'semantic', label: 'Semantic', icon: '📖' },
    { id: 'decision', label: 'Decision', icon: '⚖️' },
    { id: 'policy', label: 'Policy', icon: '📜' },
    { id: 'project', label: 'Project', icon: '📁' },
    { id: 'knowledge_graph', label: 'Knowledge Graph', icon: '🕸️' },
  ];

  const filteredMemories = memories.filter((mem) => {
    const matchTier = selectedTier === 'all' || mem.tier === selectedTier;
    const q = searchTerm.toLowerCase();
    const matchSearch =
      !searchTerm ||
      mem.title.toLowerCase().includes(q) ||
      mem.content.toLowerCase().includes(q) ||
      mem.tags.some((t) => t.toLowerCase().includes(q));

    return matchTier && matchSearch;
  });

  const handleCreateMemory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setIsSubmitting(true);

    try {
      await addMemoryItem({
        tier,
        domain,
        scope,
        title,
        content,
        importance,
        tags: ['user_injected', domain],
        provenance: {
          sourceAgentId: 'agent-021',
          createdTimestamp: new Date().toISOString(),
          verificationStatus: 'verified',
        },
      });

      setShowAddModal(false);
      setTitle('');
      setContent('');
      onRefresh();
    } catch (err: any) {
      alert(`Failed to add memory: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleValidate = async (id: string) => {
    try {
      await validateMemoryItem(id);
      onRefresh();
    } catch (err: any) {
      alert(`Validation error: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Multi-Tier Organizational Memory Store
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-purple-50 text-purple-700 border border-purple-200 font-bold">
              6 Memory Tiers
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Institutional knowledge repository supporting Episodic, Semantic, Decision, Policy, Project, and Knowledge Graph context.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-500/25 transition-all flex items-center space-x-1.5"
        >
          <span>➕</span>
          <span>Inject Memory Unit</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="rounded-2xl bg-white border border-slate-200 p-4 space-y-3 shadow-sm">
        <div className="relative">
          <input
            type="text"
            placeholder="Search organizational memory by title, concept, domain, or tag..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white transition-colors"
          />
        </div>

        {/* Tier Buttons */}
        <div className="flex space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
          {tiers.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTier(t.id)}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs whitespace-nowrap transition-all ${
                selectedTier === t.id
                  ? 'bg-purple-600 text-white font-bold shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-200'
              }`}
            >
              <span>{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Memory Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMemories.map((mem) => {
          const tierColors: Record<MemoryTier, string> = {
            episodic: 'bg-blue-50 text-blue-800 border-blue-200',
            semantic: 'bg-purple-50 text-purple-800 border-purple-200',
            decision: 'bg-emerald-50 text-emerald-800 border-emerald-200',
            policy: 'bg-amber-50 text-amber-800 border-amber-200',
            project: 'bg-indigo-50 text-indigo-800 border-indigo-200',
            knowledge_graph: 'bg-pink-50 text-pink-800 border-pink-200',
          };

          return (
            <div
              key={mem.id}
              className="p-5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-purple-300 transition-all shadow-sm flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border font-bold ${tierColors[mem.tier]}`}>
                    {mem.tier.replace(/_/g, ' ')}
                  </span>
                  <span className="text-[11px] font-mono text-purple-700 font-bold">
                    Imp: {mem.importance}/10
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 mt-2.5">{mem.title}</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{mem.content}</p>

                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {mem.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>Source: @{mem.provenance.sourceAgentId}</span>
                {mem.provenance.verificationStatus === 'verified' ? (
                  <span className="text-emerald-700 font-bold flex items-center space-x-1">
                    <span>✓</span>
                    <span>Verified</span>
                  </span>
                ) : (
                  <button
                    onClick={() => handleValidate(mem.id)}
                    className="text-purple-600 hover:text-purple-800 font-bold"
                  >
                    Validate Item
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Inject Memory Unit */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Inject Institutional Memory Unit</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateMemory} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-slate-600 mb-1">Memory Tier:</label>
                  <select
                    value={tier}
                    onChange={(e) => setTier(e.target.value as MemoryTier)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-purple-500 font-mono"
                  >
                    <option value="semantic">Semantic</option>
                    <option value="episodic">Episodic</option>
                    <option value="decision">Decision</option>
                    <option value="policy">Policy</option>
                    <option value="project">Project</option>
                    <option value="knowledge_graph">Knowledge Graph</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-600 mb-1">Domain:</label>
                  <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-600 mb-1">Title / Concept:</label>
                <input
                  type="text"
                  placeholder="e.g., Enterprise SLA Requirements for Cloud Tier 1"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-600 mb-1">Knowledge Content:</label>
                <textarea
                  rows={4}
                  placeholder="Document knowledge, policy, benchmark, or factual constraint..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-600 mb-1">
                  Importance Rating: ({importance}/10)
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={importance}
                  onChange={(e) => setImportance(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !title.trim() || !content.trim()}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-500/25 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving Memory...' : 'Commit to Memory'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
