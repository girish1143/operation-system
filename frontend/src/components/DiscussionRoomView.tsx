'use client';

import React, { useState } from 'react';
import { Discussion } from '../types/companyOs';
import { createDiscussion } from '../lib/api';

interface DiscussionRoomViewProps {
  discussions: Discussion[];
  onRefresh: () => void;
}

export const DiscussionRoomView: React.FC<DiscussionRoomViewProps> = ({
  discussions,
  onRefresh,
}) => {
  const [selectedDiscussionId, setSelectedDiscussionId] = useState<string>(
    discussions[0]?.id || ''
  );
  const [topic, setTopic] = useState('');
  const [selectedAgentIds, setSelectedAgentIds] = useState<string[]>([
    'agent-001',
    'agent-003',
    'agent-004',
    'agent-039',
  ]);
  const [isStarting, setIsStarting] = useState(false);

  const currentDiscussion =
    discussions.find((d) => d.id === selectedDiscussionId) || discussions[0];

  const handleStartDebate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setIsStarting(true);

    try {
      const created = await createDiscussion({
        topic,
        participants: selectedAgentIds,
        roundsLimit: 3,
      });

      setSelectedDiscussionId(created.id);
      onRefresh();
      setTopic('');
    } catch (err: any) {
      alert(`Dialectic initialization failed: ${err.message}`);
    } finally {
      setIsStarting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Dialectic Debate Room & Multi-Agent Deliberation
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-purple-50 text-purple-700 border border-purple-200 font-bold">
              Formal Dialectic Protocol
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Agents challenge assumptions, demand empirical evidence, provide rebuttals, and converge on robust consensus.
          </p>
        </div>

        {/* Discussion Selector */}
        <select
          value={currentDiscussion?.id || ''}
          onChange={(e) => setSelectedDiscussionId(e.target.value)}
          className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 font-mono shadow-sm focus:outline-none focus:border-indigo-500"
        >
          {discussions.map((d) => (
            <option key={d.id} value={d.id}>
              {d.id}: {d.topic.slice(0, 35)}... ({d.status})
            </option>
          ))}
        </select>
      </div>

      {/* Main Grid: Discussion Transcript & Live Debate Initiator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Debate Transcript Flow (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          {currentDiscussion ? (
            <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-6 shadow-sm">
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {currentDiscussion.id}
                    </span>
                    <span className="text-xs font-mono text-purple-700 font-bold">
                      Protocol: {currentDiscussion.protocol}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-1.5">
                    {currentDiscussion.topic}
                  </h3>
                </div>

                <span
                  className={`text-[10px] font-mono uppercase px-2.5 py-1 rounded-full font-bold border ${
                    currentDiscussion.status === 'resolved'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse'
                  }`}
                >
                  {currentDiscussion.status}
                </span>
              </div>

              {/* Debate Turn Stream */}
              <div className="space-y-4">
                {currentDiscussion.turns.map((turn, index) => {
                  const intentStyles: Record<string, { bg: string; border: string; badge: string }> = {
                    propose: {
                      bg: 'bg-blue-50/60',
                      border: 'border-blue-200',
                      badge: 'bg-blue-100 text-blue-800 border-blue-300',
                    },
                    challenge: {
                      bg: 'bg-rose-50/60',
                      border: 'border-rose-200',
                      badge: 'bg-rose-100 text-rose-800 border-rose-300',
                    },
                    request_evidence: {
                      bg: 'bg-amber-50/60',
                      border: 'border-amber-200',
                      badge: 'bg-amber-100 text-amber-800 border-amber-300',
                    },
                    rebuttal: {
                      bg: 'bg-purple-50/60',
                      border: 'border-purple-200',
                      badge: 'bg-purple-100 text-purple-800 border-purple-300',
                    },
                    revise: {
                      bg: 'bg-indigo-50/60',
                      border: 'border-indigo-200',
                      badge: 'bg-indigo-100 text-indigo-800 border-indigo-300',
                    },
                    support: {
                      bg: 'bg-emerald-50/60',
                      border: 'border-emerald-200',
                      badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
                    },
                    resolve: {
                      bg: 'bg-emerald-100/70',
                      border: 'border-emerald-300',
                      badge: 'bg-emerald-200 text-emerald-900 border-emerald-400',
                    },
                  };

                  const style =
                    intentStyles[turn.intent] || {
                      bg: 'bg-slate-50',
                      border: 'border-slate-200',
                      badge: 'bg-slate-100 text-slate-700 border-slate-200',
                    };

                  return (
                    <div
                      key={turn.id}
                      className={`p-4 rounded-xl border ${style.bg} ${style.border} space-y-2 transition-all`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="w-5 h-5 rounded-full bg-white border border-slate-200 flex items-center justify-center font-mono text-[10px] text-slate-700 font-bold shadow-sm">
                            {index + 1}
                          </span>
                          <span className="text-xs font-bold text-slate-900 font-mono">
                            @{turn.speakerAgentId}
                          </span>
                          {turn.targetAgentId && (
                            <span className="text-[11px] text-slate-500 font-mono">
                              → @{turn.targetAgentId}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border font-bold ${style.badge}`}>
                            {turn.intent.replace(/_/g, ' ')}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500">
                            {(turn.confidence * 100).toFixed(0)}% Conf
                          </span>
                        </div>
                      </div>

                      <div className="text-xs text-slate-800 leading-relaxed font-sans">
                        <strong>Claim: </strong>
                        {turn.claim}
                      </div>

                      {turn.evidenceRef && turn.evidenceRef.length > 0 && (
                        <div className="pt-2 border-t border-slate-200/60 text-[11px] font-mono text-indigo-700">
                          Empirical Evidence: {turn.evidenceRef.join(' • ')}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Consensus Resolution Box */}
              {currentDiscussion.consensus && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 space-y-2 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-emerald-800 uppercase flex items-center space-x-1.5">
                      <span>✓</span>
                      <span>Synthesized Dialectic Consensus</span>
                    </span>
                    <span className="text-xs font-mono text-emerald-800 font-bold">
                      Confidence: {(currentDiscussion.consensus.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                  <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                    {currentDiscussion.consensus.summary}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-2xl bg-white border border-slate-200 p-12 text-center text-slate-400 font-mono text-xs shadow-sm">
              Zero discussions recorded. Launch one below!
            </div>
          )}
        </div>

        {/* Right Column: Initiate New Dialectic Debate (1 Col) */}
        <div className="space-y-4">
          <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <span className="text-lg">⚔️</span>
              <h3 className="font-bold text-slate-900 text-sm">Initiate Multi-Agent Debate</h3>
            </div>
            <p className="text-xs text-slate-500">
              Submit a contentious strategic hypothesis. The Dialectic Engine will pit specialists against each other to rigorously test assumptions.
            </p>

            <form onSubmit={handleStartDebate} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-mono text-slate-600 mb-1">
                  Debate Topic / Proposition:
                </label>
                <textarea
                  rows={4}
                  placeholder="e.g., Should Company OS mandate 100% Rust rewrite for high-throughput inference proxy over Go?"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-600 mb-1">
                  Participating Agents:
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-700">
                  {['agent-001', 'agent-003', 'agent-004', 'agent-039', 'agent-066', 'agent-089'].map((id) => (
                    <label key={id} className="flex items-center space-x-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedAgentIds.includes(id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedAgentIds([...selectedAgentIds, id]);
                          } else {
                            setSelectedAgentIds(selectedAgentIds.filter((x) => x !== id));
                          }
                        }}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>@{id}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isStarting || !topic.trim()}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md shadow-purple-500/25 transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {isStarting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Deliberating Rounds...</span>
                  </>
                ) : (
                  <>
                    <span>💬</span>
                    <span>Start Dialectic Deliberation</span>
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
