'use client';

import React, { useState } from 'react';
import { Pipeline, PipelineTaskNode } from '../types/companyOs';
import { createPipeline, runPipeline } from '../lib/api';

interface PipelineRunnerViewProps {
  pipelines: Pipeline[];
  onRefresh: () => void;
  onSelectDecision: () => void;
  onSelectDiscussion: () => void;
}

export const PipelineRunnerView: React.FC<PipelineRunnerViewProps> = ({
  pipelines,
  onRefresh,
  onSelectDecision,
  onSelectDiscussion,
}) => {
  const [selectedPipelineId, setSelectedPipelineId] = useState<string>(
    pipelines[0]?.id || ''
  );
  const [selectedTask, setSelectedTask] = useState<PipelineTaskNode | null>(null);

  // New pipeline form
  const [newTitle, setNewTitle] = useState('');
  const [newGoal, setNewGoal] = useState('');
  const [newCategory, setNewCategory] = useState('Corporate Strategy & Operations');
  const [isCreating, setIsCreating] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const currentPipeline =
    pipelines.find((p) => p.id === selectedPipelineId) || pipelines[0];

  const handleCreateAndRun = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newGoal.trim()) return;
    setIsCreating(true);

    try {
      const created = await createPipeline({
        title: newTitle,
        goal: newGoal,
        category: newCategory,
      });

      setSelectedPipelineId(created.id);
      setIsCreating(false);
      setIsRunning(true);

      await runPipeline(created.id);
      setIsRunning(false);
      onRefresh();
      setNewTitle('');
      setNewGoal('');
    } catch (err: any) {
      alert(`Pipeline execution error: ${err.message}`);
      setIsCreating(false);
      setIsRunning(false);
    }
  };

  const handleRunExisting = async (pipelineId: string) => {
    setIsRunning(true);
    try {
      await runPipeline(pipelineId);
      onRefresh();
    } catch (err: any) {
      alert(`Execution error: ${err.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Agentic DAG Pipelines & Execution Graphs
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-blue-50 text-blue-700 border border-blue-200 font-bold">
              Topological Parallel Execution
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Dynamic task decomposition, dependency resolution, parallel execution, dialectic debate, and decision synthesis.
          </p>
        </div>

        {/* Pipeline Selector */}
        <div className="flex items-center space-x-2">
          <select
            value={currentPipeline?.id || ''}
            onChange={(e) => setSelectedPipelineId(e.target.value)}
            className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 font-mono shadow-sm focus:outline-none focus:border-indigo-500"
          >
            {pipelines.map((p) => (
              <option key={p.id} value={p.id}>
                {p.id}: {p.title.slice(0, 32)}... ({p.status})
              </option>
            ))}
          </select>

          {currentPipeline && currentPipeline.status !== 'completed' && (
            <button
              onClick={() => handleRunExisting(currentPipeline.id)}
              disabled={isRunning}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/25 transition-all disabled:opacity-50 flex items-center space-x-1.5"
            >
              {isRunning ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Executing DAG...</span>
                </>
              ) : (
                <>
                  <span>▶</span>
                  <span>Run Pipeline</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Visual DAG Graph & Custom Pipeline Creator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Interactive Task Graph (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          {currentPipeline ? (
            <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-6 shadow-sm">
              {/* Pipeline Meta Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {currentPipeline.id}
                    </span>
                    <span className="text-xs font-mono text-indigo-700 font-medium">
                      {currentPipeline.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">
                    {currentPipeline.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">{currentPipeline.goal}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <span
                    className={`text-xs font-mono uppercase px-3 py-1 rounded-full font-bold border ${
                      currentPipeline.status === 'completed'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : currentPipeline.status === 'running'
                        ? 'bg-blue-50 text-blue-700 border-blue-200 animate-pulse'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {currentPipeline.status}
                  </span>
                </div>
              </div>

              {/* Visual Task Graph (DAG Flow) */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase font-mono mb-3">
                  DAG Task Dependency Flow & Status:
                </h4>

                <div className="space-y-3">
                  {currentPipeline.tasks.map((task, idx) => {
                    const isSelected = selectedTask?.id === task.id;
                    const statusBadge = {
                      completed: 'bg-emerald-100 text-emerald-800 border-emerald-300',
                      running: 'bg-blue-100 text-blue-800 border-blue-300 animate-pulse',
                      pending: 'bg-slate-100 text-slate-600 border-slate-200',
                      failed: 'bg-rose-100 text-rose-800 border-rose-300',
                    };

                    return (
                      <div
                        key={task.id}
                        onClick={() => setSelectedTask(task)}
                        className={`cursor-pointer p-4 rounded-xl transition-all border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          isSelected
                            ? 'bg-indigo-50/60 border-2 border-indigo-600 shadow-md'
                            : 'bg-slate-50 hover:bg-indigo-50/30 border-slate-200 hover:border-indigo-300'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-mono text-xs font-bold text-slate-700 shadow-sm">
                            {idx + 1}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-bold text-slate-900">{task.name}</span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-indigo-700 border border-indigo-200">
                                @{task.agentId}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">{task.objective}</p>

                            {task.dependencies.length > 0 && (
                              <div className="mt-1.5 text-[10px] font-mono text-slate-400">
                                Depends on: {task.dependencies.join(', ')}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 self-end sm:self-center">
                          <span className={`text-[10px] uppercase font-mono px-2.5 py-0.5 rounded border font-bold ${statusBadge[task.status]}`}>
                            {task.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Associated Decision or Debate Banner */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                {currentPipeline.associatedDiscussionId && (
                  <button
                    onClick={onSelectDiscussion}
                    className="text-xs font-mono text-indigo-600 hover:text-indigo-800 font-bold flex items-center space-x-1"
                  >
                    <span>💬 View Dialectic Debate Transcript ({currentPipeline.associatedDiscussionId}) →</span>
                  </button>
                )}

                {currentPipeline.associatedDecisionId && (
                  <button
                    onClick={onSelectDecision}
                    className="text-xs font-mono text-emerald-600 hover:text-emerald-800 font-bold flex items-center space-x-1"
                  >
                    <span>⚖️ Inspect Decision Record ({currentPipeline.associatedDecisionId}) →</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl bg-white border border-slate-200 p-12 text-center text-slate-400 font-mono text-xs shadow-sm">
              Select or launch a pipeline to view task graph.
            </div>
          )}

          {/* Selected Task Inspection Drawer */}
          {selectedTask && selectedTask.result && (
            <div className="rounded-2xl bg-white border border-indigo-200 p-5 space-y-4 shadow-md animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                    Result Inspection: {selectedTask.name}
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    Agent: @{selectedTask.agentId}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="text-slate-400 hover:text-slate-700 text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              <div>
                <h5 className="text-xs font-bold text-slate-800">Agent Summary:</h5>
                <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                  {selectedTask.result.summary}
                </p>
              </div>

              {selectedTask.result.findings.length > 0 && (
                <div>
                  <h5 className="text-xs font-bold text-slate-800">Key Findings:</h5>
                  <div className="space-y-1.5 mt-1.5">
                    {selectedTask.result.findings.map((f, i) => (
                      <div key={i} className="text-xs text-slate-700 p-2.5 rounded bg-slate-50 border border-slate-200">
                        <strong className="text-indigo-700">{f.topic}:</strong> {f.summary} ({f.details})
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedTask.result.recommendations.length > 0 && (
                <div>
                  <h5 className="text-xs font-bold text-slate-800">Recommendations:</h5>
                  <ul className="list-disc list-inside text-xs text-slate-700 space-y-1 mt-1">
                    {selectedTask.result.recommendations.map((r, i) => (
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

        {/* Right Column: Custom Pipeline Creator (1 Col) */}
        <div className="space-y-4">
          <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <span className="text-lg">✨</span>
              <h3 className="font-bold text-slate-900 text-sm">Dynamic Goal Pipeline Creator</h3>
            </div>
            <p className="text-xs text-slate-500">
              Submit any high-level strategic, financial, or technical objective. Master Orchestrator Agent will automatically decompose it into a specialized multi-agent DAG.
            </p>

            <form onSubmit={handleCreateAndRun} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-mono text-slate-600 mb-1">
                  Pipeline Title:
                </label>
                <input
                  type="text"
                  placeholder="e.g., Enterprise Cloud Architecture Migration"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-600 mb-1">
                  Business / Technical Goal:
                </label>
                <textarea
                  rows={4}
                  placeholder="e.g., Evaluate microservices vs monolithic architecture for 5M DAU, compute cost projections, SOC 2 compliance, and hiring plan."
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-600 mb-1">
                  Category:
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 font-mono"
                >
                  <option value="Corporate Strategy & Operations">Corporate Strategy & Operations</option>
                  <option value="M&A & Corporate Strategy">M&A & Corporate Strategy</option>
                  <option value="Product & Technology">Product & Technology</option>
                  <option value="Cybersecurity & Governance">Cybersecurity & Governance</option>
                  <option value="Financial Planning & Valuation">Financial Planning & Valuation</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isCreating || isRunning || !newTitle.trim() || !newGoal.trim()}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-md shadow-indigo-500/25 transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {isCreating || isRunning ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Decomposing & Orchestrating DAG...</span>
                  </>
                ) : (
                  <>
                    <span>🚀</span>
                    <span>Decompose & Launch DAG</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
