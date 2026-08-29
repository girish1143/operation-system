'use client';

import React, { useState } from 'react';
import { AnalyticsSummary, UserProfile } from '../types/companyOs';

export type ActiveTab =
  | 'dashboard'
  | 'agents'
  | 'hierarchy'
  | 'pipelines'
  | 'discussions'
  | 'decisions'
  | 'memory'
  | 'governance'
  | 'audit'
  | 'learning'
  | 'auth';

interface NavigationProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  summary: AnalyticsSummary | null;
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
  onSignOut: () => void;
  onQuickPipeline: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
  summary,
  currentUser,
  onOpenAuth,
  onSignOut,
  onQuickPipeline,
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItems: { id: ActiveTab; label: string; icon: string; badge?: number }[] = [
    { id: 'dashboard', label: 'Executive Cockpit', icon: '⚡' },
    { id: 'agents', label: '100 Agents', icon: '🤖', badge: 100 },
    { id: 'hierarchy', label: 'Org Hierarchy', icon: '🏢' },
    { id: 'pipelines', label: 'Pipelines & DAG', icon: '🔀', badge: summary?.activePipelines },
    { id: 'discussions', label: 'Dialectic Room', icon: '💬' },
    { id: 'decisions', label: 'Decision Memory', icon: '⚖️' },
    { id: 'memory', label: 'Org Memory', icon: '🧠', badge: summary?.totalMemories },
    { id: 'governance', label: 'Governance & Gates', icon: '🛡️', badge: summary?.pendingApprovalsCount },
    { id: 'audit', label: 'Audit Ledger', icon: '📑' },
    { id: 'learning', label: 'Org Learning & Analytics', icon: '📈', badge: summary?.lessonsLearned },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-blue-500 to-cyan-500 p-0.5 shadow-md shadow-indigo-500/20">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center text-xl">
                🧠
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-black text-slate-900 text-lg tracking-tight">
                  COMPANY<span className="text-indigo-600">OS</span>
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold">
                  100-Agent Mesh
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono">Autonomous Enterprise Operating System</p>
            </div>
          </div>

          {/* Quick Metrics Ticker */}
          <div className="hidden lg:flex items-center space-x-6 text-xs font-mono">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-slate-500">Mesh Health:</span>
              <span className="text-emerald-700 font-bold">100% Online</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-slate-300">|</span>
              <span className="text-slate-500">Avg Accuracy:</span>
              <span className="text-indigo-600 font-bold">{summary?.avgSystemAccuracy || 97.5}%</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-slate-300">|</span>
              <span className="text-slate-500">Tasks Executed:</span>
              <span className="text-purple-700 font-bold">{summary?.totalTasksExecuted.toLocaleString() || '42,600+'}</span>
            </div>
          </div>

          {/* User Auth & Quick Action Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onQuickPipeline}
              className="hidden sm:inline-flex items-center justify-center px-3.5 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-md shadow-indigo-500/25 transition-all active:scale-95 space-x-1.5"
            >
              <span>🚀</span>
              <span>Launch Pipeline</span>
            </button>

            {/* Auth Button or User Profile Pill */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-1.5 pr-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all text-left shadow-sm"
                >
                  <div className="w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center text-sm">
                    {currentUser.avatar || '👤'}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 leading-tight">
                      {currentUser.name.split(' ')[0]}
                    </div>
                    <div className="text-[10px] text-indigo-600 font-mono leading-none">
                      {currentUser.role.split(' ')[0]}
                    </div>
                  </div>
                  <span className="text-slate-400 text-[10px]">▼</span>
                </button>

                {/* User Menu Dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-2xl p-2 space-y-1 z-50 animate-fade-in font-sans">
                    <div className="p-2.5 border-b border-slate-100">
                      <div className="text-xs font-bold text-slate-900">{currentUser.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{currentUser.email}</div>
                      <div className="text-[10px] text-indigo-700 font-mono mt-0.5">{currentUser.organization}</div>
                    </div>
                    <button
                      onClick={() => {
                        setActiveTab('auth');
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition-colors flex items-center space-x-2"
                    >
                      <span>👤</span>
                      <span>Account Profile</span>
                    </button>
                    <button
                      onClick={() => {
                        onSignOut();
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-bold text-rose-700 hover:bg-rose-50 rounded-xl transition-colors flex items-center space-x-2"
                    >
                      <span>🚪</span>
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white hover:bg-slate-50 text-indigo-700 border border-indigo-200 shadow-sm transition-all flex items-center space-x-1.5"
              >
                <span>🔐</span>
                <span>Sign In / Register</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation Ribbon */}
        <nav className="flex space-x-1 overflow-x-auto py-2 scrollbar-none border-t border-slate-100">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                      isActive
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
