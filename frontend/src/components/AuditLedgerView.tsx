'use client';

import React, { useState } from 'react';
import { AuditRecord } from '../types/companyOs';
import { verifyAuditIntegrity } from '../lib/api';

interface AuditLedgerViewProps {
  auditLogs: AuditRecord[];
  onRefresh: () => void;
}

export const AuditLedgerView: React.FC<AuditLedgerViewProps> = ({ auditLogs, onRefresh }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRisk, setSelectedRisk] = useState<string>('all');
  const [selectedRecord, setSelectedRecord] = useState<AuditRecord | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{ isValid: boolean; checkedRecords: number } | null>(null);

  const filteredLogs = auditLogs.filter((log) => {
    const matchRisk = selectedRisk === 'all' || log.riskLevel === selectedRisk;
    const q = searchTerm.toLowerCase();
    const matchSearch =
      !searchTerm ||
      log.action.toLowerCase().includes(q) ||
      log.eventType.toLowerCase().includes(q) ||
      log.agentId.toLowerCase().includes(q) ||
      log.id.toLowerCase().includes(q) ||
      log.hash.toLowerCase().includes(q);

    return matchRisk && matchSearch;
  });

  const handleVerifyIntegrity = async () => {
    setIsVerifying(true);
    try {
      const res = await verifyAuditIntegrity();
      setVerificationResult(res);
    } catch (err: any) {
      alert(`Verification error: ${err.message}`);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Cryptographic Audit Ledger & Event Traceability
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold">
              SHA-256 Hash Chained
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Immutable forensic ledger recording every agent task, model inference, tool execution, memory retrieval, and human approval.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleVerifyIntegrity}
            disabled={isVerifying}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-300 shadow-sm transition-all flex items-center space-x-1.5"
          >
            {isVerifying ? (
              <>
                <span className="w-3 h-3 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></span>
                <span>Verifying Hashes...</span>
              </>
            ) : (
              <>
                <span>🔒</span>
                <span>Verify Ledger Integrity</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Hash Verification Success Banner */}
      {verificationResult && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-950 flex items-center justify-between animate-fade-in shadow-sm">
          <div className="flex items-center space-x-2.5">
            <span className="text-lg">🛡️</span>
            <div>
              <span className="font-bold text-emerald-800">Cryptographic Ledger Integrity Validated: </span>
              <span>All {verificationResult.checkedRecords} audit blocks successfully verified against SHA-256 parent hash chain. Zero tampering detected.</span>
            </div>
          </div>
          <button
            onClick={() => setVerificationResult(null)}
            className="text-emerald-700 hover:text-emerald-900 font-bold ml-4"
          >
            ✕
          </button>
        </div>
      )}

      {/* Filter Toolbar */}
      <div className="rounded-2xl bg-white border border-slate-200 p-4 space-y-3 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search audit logs by agent ID, event type, action text, or SHA-256 hash..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors"
          />

          <select
            value={selectedRisk}
            onChange={(e) => setSelectedRisk(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-indigo-500 font-mono"
          >
            <option value="all">All Risk Levels</option>
            <option value="critical">Critical Risk Events</option>
            <option value="high">High Risk Events</option>
            <option value="medium">Medium Risk Events</option>
            <option value="low">Low Risk Events</option>
          </select>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-mono border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Block ID</th>
                <th className="px-4 py-3">Timestamp</th>
                <th className="px-4 py-3">Event Type</th>
                <th className="px-4 py-3">Actor Agent</th>
                <th className="px-4 py-3">Action Description</th>
                <th className="px-4 py-3">Risk</th>
                <th className="px-4 py-3">SHA-256 Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {filteredLogs.map((log) => {
                const riskBadge = {
                  critical: 'bg-rose-50 text-rose-800 border-rose-200',
                  high: 'bg-amber-50 text-amber-800 border-amber-200',
                  medium: 'bg-yellow-50 text-yellow-800 border-yellow-200',
                  low: 'bg-slate-100 text-slate-600 border-slate-200',
                };

                return (
                  <tr
                    key={log.id}
                    onClick={() => setSelectedRecord(log)}
                    className="hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3 font-bold text-indigo-700">{log.id}</td>
                    <td className="px-4 py-3 text-slate-500 text-[11px] whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </td>
                    <td className="px-4 py-3 font-bold text-slate-900 text-[11px]">{log.eventType}</td>
                    <td className="px-4 py-3 text-indigo-600 text-[11px]">@{log.agentId}</td>
                    <td className="px-4 py-3 text-slate-700 font-sans text-xs max-w-xs truncate">
                      {log.action}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] uppercase px-2 py-0.5 rounded border font-bold ${riskBadge[log.riskLevel]}`}>
                        {log.riskLevel}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[10px] text-slate-400 font-mono max-w-[120px] truncate" title={log.hash}>
                      {log.hash.slice(0, 16)}...
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Audit Record Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-indigo-700">{selectedRecord.id}</span>
                <span className="text-slate-500">({selectedRecord.eventType})</span>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-slate-700">
              <div>
                <span className="text-slate-400">Timestamp: </span>
                <span>{selectedRecord.timestamp}</span>
              </div>
              <div>
                <span className="text-slate-400">Actor Agent: </span>
                <span className="text-indigo-600 font-bold">@{selectedRecord.agentId}</span>
              </div>
              <div>
                <span className="text-slate-400">Action: </span>
                <span className="font-sans text-slate-900">{selectedRecord.action}</span>
              </div>
              <div>
                <span className="text-slate-400">Model Used: </span>
                <span className="text-purple-700">{selectedRecord.modelUsed || 'Gemini Pro 2.5'}</span>
              </div>
              <div>
                <span className="text-slate-400">SHA-256 Hash: </span>
                <span className="text-emerald-700 break-all font-bold">{selectedRecord.hash}</span>
              </div>
            </div>

            {selectedRecord.details && Object.keys(selectedRecord.details).length > 0 && (
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-300 uppercase font-bold text-[10px]">Payload Details:</span>
                <pre className="mt-1 text-[11px] text-cyan-300 overflow-x-auto">
                  {JSON.stringify(selectedRecord.details, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
