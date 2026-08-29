'use client';

import React from 'react';
import { OrganizationalLesson, AgentDefinition, AnalyticsSummary } from '../types/companyOs';

interface LearningAnalyticsViewProps {
  lessons: OrganizationalLesson[];
  agents: AgentDefinition[];
  summary: AnalyticsSummary | null;
}

export const LearningAnalyticsView: React.FC<LearningAnalyticsViewProps> = ({
  lessons,
  agents,
  summary,
}) => {
  const topAgents = [...agents]
    .sort((a, b) => b.metrics.tasksCompleted - a.metrics.tasksCompleted)
    .slice(0, 8);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Organizational Learning Loop & Systemic Intelligence
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-purple-50 text-purple-700 border border-purple-200 font-bold">
              Autonomous Knowledge Feedback
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            How Company OS gets smarter over time: Decision Hypotheses $\rightarrow$ Real-world Outcomes $\rightarrow$ Gap Analysis $\rightarrow$ Validated Lessons in Memory.
          </p>
        </div>
      </div>

      {/* Learning Loop Architecture Diagram Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white border border-purple-800/40 shadow-xl">
        <h3 className="text-xs font-bold text-purple-200 uppercase font-mono mb-4">
          Autonomous Organizational Learning Pipeline Architecture:
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-center text-xs">
          <div className="p-3 rounded-xl bg-white/10 border border-white/10 backdrop-blur">
            <span className="text-base">1️⃣</span>
            <div className="font-bold text-white mt-1">Decision</div>
            <p className="text-[10px] text-slate-300 mt-0.5">Strategic Action Plan</p>
          </div>
          <div className="p-3 rounded-xl bg-white/10 border border-white/10 backdrop-blur">
            <span className="text-base">2️⃣</span>
            <div className="font-bold text-cyan-300 mt-1">Hypothesis</div>
            <p className="text-[10px] text-slate-300 mt-0.5">Predicted Metrics</p>
          </div>
          <div className="p-3 rounded-xl bg-white/10 border border-white/10 backdrop-blur">
            <span className="text-base">3️⃣</span>
            <div className="font-bold text-indigo-300 mt-1">Real Outcome</div>
            <p className="text-[10px] text-slate-300 mt-0.5">Observed Data</p>
          </div>
          <div className="p-3 rounded-xl bg-white/10 border border-white/10 backdrop-blur">
            <span className="text-base">4️⃣</span>
            <div className="font-bold text-amber-300 mt-1">Gap Analysis</div>
            <p className="text-[10px] text-slate-300 mt-0.5">Error & Variance</p>
          </div>
          <div className="p-3 rounded-xl bg-white/10 border border-white/10 backdrop-blur">
            <span className="text-base">5️⃣</span>
            <div className="font-bold text-fuchsia-300 mt-1">Extract Lesson</div>
            <p className="text-[10px] text-slate-300 mt-0.5">Institutional Insight</p>
          </div>
          <div className="p-3 rounded-xl bg-white/10 border border-white/10 backdrop-blur">
            <span className="text-base">6️⃣</span>
            <div className="font-bold text-emerald-300 mt-1">Future Context</div>
            <p className="text-[10px] text-slate-300 mt-0.5">Informs Future Agents</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Validated Lessons & Agent Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Validated Organizational Lessons (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <span>📚</span>
                <span>Validated Institutional Lessons Repository ({lessons.length})</span>
              </h3>
              <span className="text-xs text-purple-700 font-mono font-medium">Stored in Semantic Memory</span>
            </div>

            <div className="mt-4 space-y-4">
              {lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="p-4 rounded-xl bg-slate-50 border border-purple-200 hover:border-purple-300 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800 border border-purple-200">
                        {lesson.id} • {lesson.domain}
                      </span>
                      <span className="text-xs font-mono text-slate-500">Ref: {lesson.decisionId}</span>
                    </div>
                    <span className="text-xs font-mono text-emerald-700 font-bold">
                      Importance {lesson.importance}/10
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900">{lesson.title}</h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-white border border-slate-200">
                      <span className="font-bold text-indigo-700 font-mono text-[10px] uppercase">Original Expected Hypothesis:</span>
                      <p className="text-slate-700 mt-1">{lesson.expectedHypothesis}</p>
                    </div>

                    <div className="p-3 rounded-lg bg-white border border-slate-200">
                      <span className="font-bold text-amber-800 font-mono text-[10px] uppercase">Observed Real-World Variance:</span>
                      <p className="text-slate-700 mt-1">{lesson.actualOutcome}</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-white border border-slate-200 text-xs">
                    <span className="font-bold text-slate-500 font-mono text-[10px] uppercase">Root-Cause Gap Analysis:</span>
                    <p className="text-slate-700 mt-0.5">{lesson.gapAnalysis}</p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-300 text-xs">
                    <span className="font-bold text-emerald-800 font-mono uppercase text-[10px] flex items-center space-x-1">
                      <span>✓</span>
                      <span>Validated Organizational Lesson Fed into Future Context:</span>
                    </span>
                    <p className="text-emerald-950 font-medium mt-1 leading-relaxed">{lesson.validatedLesson}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Top Agent Leaderboard (1 Col) */}
        <div className="space-y-4">
          <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
              <span>Agent Performance Pulse</span>
              <span className="text-xs text-indigo-600 font-mono">Leaderboard</span>
            </h3>

            <div className="mt-3 space-y-2.5">
              {topAgents.map((agent, rank) => (
                <div
                  key={agent.id}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2.5">
                    <span className="text-xs font-mono text-slate-400 font-bold w-4">#{rank + 1}</span>
                    <span className="text-lg">{agent.avatarIcon}</span>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{agent.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono">@{agent.id}</div>
                    </div>
                  </div>

                  <div className="text-right text-[11px] font-mono">
                    <div className="text-indigo-700 font-bold">{agent.metrics.accuracyScore}% Acc</div>
                    <div className="text-slate-500">{agent.metrics.tasksCompleted} Tasks</div>
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
