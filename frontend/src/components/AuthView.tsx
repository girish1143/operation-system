'use client';

import React, { useState } from 'react';
import { UserProfile } from '../types/companyOs';
import { signIn, signUp } from '../lib/api';

interface AuthViewProps {
  currentUser: UserProfile | null;
  onAuthSuccess: (user: UserProfile) => void;
  onSignOut: () => void;
}

export const AuthView: React.FC<AuthViewProps> = ({
  currentUser,
  onAuthSuccess,
  onSignOut,
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');

  // Sign In State
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  // Sign Up State
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpRole, setSignUpRole] = useState<UserProfile['role']>('Executive Admin');
  const [signUpOrg, setSignUpOrg] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');

  // Loading & Error State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInEmail.trim() || !signInPassword.trim()) {
      setError('Please provide both email and password');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await signIn(signInEmail, signInPassword);
      onAuthSuccess(res.user);
    } catch (err: any) {
      setError(err.message || 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpName.trim() || !signUpEmail.trim() || !signUpPassword.trim()) {
      setError('Please fill in all required fields');
      return;
    }
    if (signUpPassword !== signUpConfirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (signUpPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await signUp({
        name: signUpName,
        email: signUpEmail,
        password: signUpPassword,
        role: signUpRole,
        organization: signUpOrg || 'Company OS Enterprise',
      });
      onAuthSuccess(res.user);
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await signIn(email, 'password123');
      onAuthSuccess(res.user);
    } catch (err: any) {
      setError(err.message || 'Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  if (currentUser) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6 text-center">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-500 to-blue-500 mx-auto flex items-center justify-center text-4xl shadow-md shadow-indigo-500/20 text-white">
            {currentUser.avatar || '👤'}
          </div>

          <div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              {currentUser.role}
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-2">{currentUser.name}</h2>
            <p className="text-sm text-slate-500 font-mono mt-0.5">{currentUser.email}</p>
            <p className="text-xs text-slate-400 mt-1">Organization: {currentUser.organization}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-left p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 font-mono">User ID:</span>
              <div className="font-bold text-slate-800 font-mono">{currentUser.id}</div>
            </div>
            <div>
              <span className="text-slate-400 font-mono">Access Level:</span>
              <div className="font-bold text-emerald-700 font-mono">Full Enterprise Clearance</div>
            </div>
            <div>
              <span className="text-slate-400 font-mono">Member Since:</span>
              <div className="text-slate-700">{new Date(currentUser.createdAt).toLocaleDateString()}</div>
            </div>
            <div>
              <span className="text-slate-400 font-mono">Session:</span>
              <div className="text-indigo-700 font-mono font-bold">Active (Audit Logged)</div>
            </div>
          </div>

          <button
            onClick={onSignOut}
            className="px-6 py-2.5 rounded-xl text-xs font-bold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-all shadow-sm"
          >
            Sign Out of Session
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-6 animate-fade-in">
      <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-600 mx-auto flex items-center justify-center text-3xl shadow-md shadow-indigo-500/20 text-white">
            🧠
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Company<span className="text-indigo-600">OS</span> Authentication
          </h2>
          <p className="text-xs text-slate-500">
            Sign in to access the 100-Agent Orchestrator, Decision Memory, and Governance Gates.
          </p>

          {/* Mode Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold mt-4">
            <button
              onClick={() => {
                setMode('signin');
                setError(null);
              }}
              className={`flex-1 py-2 rounded-lg transition-all ${
                mode === 'signin'
                  ? 'bg-white text-slate-900 shadow-sm font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setMode('signup');
                setError(null);
              }}
              className={`flex-1 py-2 rounded-lg transition-all ${
                mode === 'signup'
                  ? 'bg-white text-slate-900 shadow-sm font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Create Account
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center space-x-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {mode === 'signin' ? (
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Enterprise Email
              </label>
              <input
                type="email"
                placeholder="name@companyos.ai"
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••••••"
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-md shadow-indigo-500/25 transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>🔐</span>
                  <span>Sign In</span>
                </>
              )}
            </button>

            {/* Quick Demo Logins */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <div className="text-[11px] font-mono text-slate-500 text-center font-bold uppercase">
                ⚡ 1-Click Executive Demo Access:
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('ceo@companyos.ai')}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-center transition-all group"
                >
                  <div className="text-lg group-hover:scale-110 transition-transform">👑</div>
                  <div className="text-[10px] font-bold text-slate-800 mt-1">CEO</div>
                  <div className="text-[9px] text-slate-500 font-mono">Alexandra</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('cfo@companyos.ai')}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-center transition-all group"
                >
                  <div className="text-lg group-hover:scale-110 transition-transform">📊</div>
                  <div className="text-[10px] font-bold text-slate-800 mt-1">CFO</div>
                  <div className="text-[9px] text-slate-500 font-mono">Marcus</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('governance@companyos.ai')}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-center transition-all group"
                >
                  <div className="text-lg group-hover:scale-110 transition-transform">🛡️</div>
                  <div className="text-[10px] font-bold text-slate-800 mt-1">Auditor</div>
                  <div className="text-[9px] text-slate-500 font-mono">Dr. Elena</div>
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* SIGN UP FORM */
          <form onSubmit={handleSignUp} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="e.g., Jonathan Mercer"
                value={signUpName}
                onChange={(e) => setSignUpName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Enterprise Email
              </label>
              <input
                type="email"
                placeholder="jonathan@enterprise.ai"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Role
                </label>
                <select
                  value={signUpRole}
                  onChange={(e) => setSignUpRole(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 font-mono"
                >
                  <option value="Executive Admin">Executive Admin</option>
                  <option value="Domain Supervisor">Domain Supervisor</option>
                  <option value="Systems Architect">Systems Architect</option>
                  <option value="AI Auditor">AI Auditor</option>
                  <option value="Operator">Operator</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Organization
                </label>
                <input
                  type="text"
                  placeholder="Acme Corp"
                  value={signUpOrg}
                  onChange={(e) => setSignUpOrg(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Min 6 chars"
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Confirm
                </label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  value={signUpConfirmPassword}
                  onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-md shadow-indigo-500/25 transition-all disabled:opacity-50 flex items-center justify-center space-x-2 mt-2"
            >
              {loading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Registering Account...</span>
                </>
              ) : (
                <>
                  <span>✨</span>
                  <span>Register & Sign In</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
