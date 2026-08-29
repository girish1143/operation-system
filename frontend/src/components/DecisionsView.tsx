'use client';

import React, { useState } from 'react';
import { DecisionRecord } from '../types/companyOs';
import { recordDecisionOutcome } from '../lib/api';

interface DecisionsViewProps {
  decisions: DecisionRecord[];
  onRefresh: () => void;
}

export const DecisionsView: React.FC<DecisionsViewProps> = ({ decisions, onRefresh }) => {
  const [selectedDecision, setSelectedDecision] = useState<DecisionRecord | null>(
    decisions[0] || null
  );
  const [actualOutcome, setActualOutcome] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRecordOutcome = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDecision || !actualOutcome.trim()) return;
    setIsSubmitting(true);

    try {
      await recordDecisionOutcome(selectedDecision.id, actualOutcome);
      onRefresh();
      setActualOutcome('');
      alert('Outcome recorded! Autonomous learning loop updated institutional memory.');
    } catch (err: any) {
      alert(`Failed to record outcome: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Decision Memory (DEC-XXXX) & Traceability
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
              {decisions.length} Decisions Recorded
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Institutional memory of strategic decisions, rationale, empirical evidence, dissent, and real-world outcome feedback.
          </p>
        </div>
      </div>

      {/* Main Grid: Decision List & Detailed Decision Record Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Decision Cards List (1 Col) */}
        <div className="space-y-3">
          {decisions.map((dec) => {
            const isSelected = selectedDecision?.id === dec.id;
            return (
              <div
                key={dec.id}
                onClick={() => setSelectedDecision(dec)}
                className={`cursor-pointer p-4 rounded-2xl transition-all border ${
                  isSelected
                    ? 'bg-emerald-50/60 border-2 border-emerald-600 shadow-md'
                    : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-emerald-300 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    {dec.id}
                  </span>
                  <span className="text-[11px] font-mono text-emerald-700 font-bold">
                    {(dec.confidence * 100).toFixed(0)}% Conf
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 mt-2 line-clamp-2">
                  {dec.question}
                </h4>

                <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
                  {dec.decision}
                </p>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>{new Date(dec.timestamp).toLocaleDateString()}</span>
                  <span>{dec.participants.length} Agents</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Full Decision Record Inspector & Outcome Logger (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {selectedDecision ? (
            <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-6 shadow-sm">
              {/* Record Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                      DECISION RECORD: {selectedDecision.id}
                    </span>
                    {selectedDecision.pipelineId && (
                      <span className="text-xs font-mono text-slate-500">
                        Pipeline: {selectedDecision.pipelineId}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-2">
                    {selectedDecision.question}
                  </h3>
                </div>

                <div className="text-right">
                  <div className="text-xs font-mono text-emerald-700 font-bold">
                    {(selectedDecision.confidence * 100).toFixed(0)}% Confidence
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">
                    {new Date(selectedDecision.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Chosen Decision & Rationale */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase font-mono">
                  Synthesized Decision
                </h4>
                <p className="text-sm font-semibold text-slate-900 leading-relaxed">
                  {selectedDecision.decision}
                </p>
                <div className="pt-2 border-t border-slate-200 text-xs text-slate-600">
                  <strong className="text-slate-800 font-mono">Rationale: </strong>
                  {selectedDecision.rationale}
                </div>
              </div>

              {/* Evidence Matrix & Dissent */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Evidence */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <h5 className="font-bold text-slate-800 font-mono flex items-center space-x-1.5">
                    <span>📊</span>
                    <span>Empirical Evidence Base ({selectedDecision.evidence.length})</span>
                  </h5>
                  <div className="space-y-1.5 mt-2">
                    {selectedDecision.evidence.map((ev, i) => (
                      <div key={i} className="p-2 rounded bg-white border border-slate-200 text-slate-700">
                        <div className="font-bold text-indigo-700">{ev.sourceAgentId}: {ev.fact}</div>
                        <div className="text-[10px] text-slate-500 font-mono">Confidence: {(ev.confidence * 100).toFixed(0)}%</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dissent & Alternatives */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <h5 className="font-bold text-slate-800 font-mono flex items-center space-x-1.5">
                    <span>⚡</span>
                    <span>Dissent & Rejected Alternatives</span>
                  </h5>
                  <div className="space-y-1.5 mt-2">
                    {selectedDecision.dissentingViews.map((dis, i) => (
                      <div key={i} className="p-2 rounded bg-white border border-slate-200 text-slate-700">
                        <div className="font-bold text-rose-700">@{dis.agentId}:</div>
                        <div className="text-[11px] text-slate-600">{dis.objection}</div>
                      </div>
                    ))}
                    {selectedDecision.alternativesConsidered.map((alt, i) => (
                      <div key={i} className="p-2 rounded bg-white border border-slate-200 text-slate-700">
                        <div className="font-bold text-slate-800">Alt: {alt.option}</div>
                        <div className="text-[10px] text-slate-500">Rejected because: {alt.rejectionReason}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Expected Outcomes Hypothesis */}
              <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-200 space-y-2 text-xs">
                <h5 className="font-bold text-indigo-900 font-mono uppercase">
                  Predicted Outcome Hypothesis (Baseline):
                </h5>
                <pre className="text-xs font-mono text-indigo-900 overflow-x-auto">
                  {JSON.stringify(selectedDecision.expectedOutcomes, null, 2)}
                </pre>
              </div>

              {/* Real World Outcome Feedback Loop */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-base">📈</span>
                  <h5 className="font-bold text-slate-900 text-xs uppercase font-mono">
                    Record Observed Real-World Outcome (Organizational Learning Loop)
                  </h5>
                </div>
                <p className="text-xs text-slate-600">
                  Compare actual results against predictions to train future decision cycles.
                </p>

                {selectedDecision.actualOutcomes ? (
                  <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 font-medium">
                    Observed: {JSON.stringify(selectedDecision.actualOutcomes)}
                  </div>
                ) : (
                  <form onSubmit={handleRecordOutcome} className="space-y-2.5">
                    <textarea
                      rows={2}
                      placeholder="e.g., At 6 months post-acquisition, retention hit 94%, enterprise ACV grew 28% (beating 25% target), but cloud compute cost ran 15% higher than modeled."
                      value={actualOutcome}
                      onChange={(e) => setActualOutcome(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                    />
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isSubmitting || !actualOutcome.trim()}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/25 transition-all disabled:opacity-50"
                      >
                        {isSubmitting ? 'Recording Outcome...' : 'Submit Real-World Outcome'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl bg-white border border-slate-200 p-12 text-center text-slate-400 font-mono text-xs shadow-sm">
              Select a decision record to inspect full audit trail.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
