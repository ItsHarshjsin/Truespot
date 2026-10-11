import React, { useState } from 'react';
import { hybridStore } from '../utils/storage';
import {
  Settings,
  Database,
  Radio,
  MapPin,
  RefreshCw,
  Trash2,
  Check,
  Shield,
  Layers,
  Cpu,
  Lock,
} from 'lucide-react';

interface SettingsViewProps {
  userMode: 'maker' | 'spotter';
  onSwitchMode: (mode: 'maker' | 'spotter') => void;
  onResetDemoState: () => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'reward' | 'warning') => void;
  onOpenSupabaseModal?: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  userMode,
  onSwitchMode,
  onResetDemoState,
  onShowToast,
  onOpenSupabaseModal,
}) => {
  const [selectedCluster, setSelectedCluster] = useState<string>('devnet');
  const [defaultRole, setDefaultRole] = useState<'maker' | 'spotter'>(userMode);
  const [isWiping, setIsWiping] = useState<boolean>(false);
  const [confirmWipe, setConfirmWipe] = useState<boolean>(false);
  const [wipedSuccess, setWipedSuccess] = useState<boolean>(false);

  const handleSaveCluster = (cluster: string) => {
    setSelectedCluster(cluster);
    onShowToast('Cluster Changed', `RPC updated to Solana ${cluster}`, 'info');
  };

  const handleSaveDefaultRole = (mode: 'maker' | 'spotter') => {
    setDefaultRole(mode);
    localStorage.setItem('truespot_default_mode', mode);
    onSwitchMode(mode);
    onShowToast('Default Mode Saved', `Initial launch workspace set to ${mode} mode`, 'success');
  };

  const handleWipeAllDataToZero = async () => {
    if (!confirmWipe) {
      setConfirmWipe(true);
      return;
    }
    setIsWiping(true);
    setConfirmWipe(false);
    try {
      await hybridStore.wipeAllData();
      onResetDemoState();
      setWipedSuccess(true);
      onShowToast(
        'Protocol Data Reset to 0',
        'All bounties, reports, and escrow settlements purged in Supabase & local cache. Real-time sync active across all sessions.',
        'reward'
      );
      setTimeout(() => setWipedSuccess(false), 6000);
    } catch (err: any) {
      console.error('Wipe data error:', err);
      onShowToast('Reset Failed', err?.message || 'Failed to wipe protocol data', 'warning');
    } finally {
      setIsWiping(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-[#0B0B0B] border border-white/[0.08] rounded-[24px] p-6 sm:p-8 relative shadow-2xl">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#A8FF00]/10 border border-[#A8FF00]/30 flex items-center justify-center text-[#A8FF00]">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Protocol & Workspace Settings
            </h1>
            <p className="text-xs text-zinc-400">
              Manage network connections, default role behavior, database syncing, and demo ledger state.
            </p>
          </div>
        </div>
      </div>

      {/* Setting 1: Default Role Preference */}
      <div className="bg-[#0B0B0B] border border-white/[0.07] rounded-[24px] p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
          <div>
            <h2 className="text-sm font-bold text-white">Default Launch Workspace</h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Choose which mode TrueSpot opens when you visit the application or refresh.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <button
            type="button"
            onClick={() => handleSaveDefaultRole('maker')}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
              defaultRole === 'maker'
                ? 'bg-[#A8FF00]/10 border-[#A8FF00] text-white'
                : 'bg-[#121212] border-white/[0.06] text-zinc-400 hover:text-white'
            }`}
          >
            <div>
              <div className="font-bold text-xs text-white">Maker Mode (Default)</div>
              <div className="text-[11px] text-zinc-400">Query Studio, My Bounties & Review</div>
            </div>
            {defaultRole === 'maker' && <Check className="w-4 h-4 text-[#A8FF00]" />}
          </button>

          <button
            type="button"
            onClick={() => handleSaveDefaultRole('spotter')}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
              defaultRole === 'spotter'
                ? 'bg-[#A8FF00]/10 border-[#A8FF00] text-white'
                : 'bg-[#121212] border-white/[0.06] text-zinc-400 hover:text-white'
            }`}
          >
            <div>
              <div className="font-bold text-xs text-white">Spotter Mode (Default)</div>
              <div className="text-[11px] text-zinc-400">200m Radar, Submissions & Earnings</div>
            </div>
            {defaultRole === 'spotter' && <Check className="w-4 h-4 text-[#A8FF00]" />}
          </button>
        </div>
      </div>

      {/* Setting 2: Solana RPC Cluster */}
      <div className="bg-[#0B0B0B] border border-white/[0.07] rounded-[24px] p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
          <div>
            <h2 className="text-sm font-bold text-white">Solana RPC Endpoint</h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Select the active blockchain cluster for escrow PDAs and SPL Memo settlements.
            </p>
          </div>
          <span className="text-xs font-mono text-[#A8FF00]">Connected</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {[
            { id: 'devnet', label: 'Solana Devnet', url: 'https://api.devnet.solana.com' },
            { id: 'localhost', label: 'Local Validator', url: 'http://127.0.0.1:8899' },
            { id: 'testnet', label: 'Solana Testnet', url: 'https://api.testnet.solana.com' },
          ].map((cluster) => (
            <button
              key={cluster.id}
              type="button"
              onClick={() => handleSaveCluster(cluster.id)}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                selectedCluster === cluster.id
                  ? 'bg-[#A8FF00]/10 border-[#A8FF00]'
                  : 'bg-[#121212] border-white/[0.06] hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{cluster.label}</span>
                {selectedCluster === cluster.id && <Check className="w-3.5 h-3.5 text-[#A8FF00]" />}
              </div>
              <span className="text-[10px] font-mono text-zinc-400 truncate">{cluster.url}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Setting 3: Supabase & Storage Integrity */}
      <div className="bg-[#0B0B0B] border border-white/[0.07] rounded-[24px] p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
          <div>
            <h2 className="text-sm font-bold text-white">PostgreSQL & PostGIS Sync</h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Hybrid caching layer automatically synchronizes with Supabase when credentials are provided.
            </p>
          </div>
          <span className="text-xs font-mono text-zinc-300">
            {hybridStore.isConnectedToSupabase ? '🟢 Live PostGIS' : '🟡 In-Memory Local'}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
          <div className="text-xs text-zinc-400">
            Storage bucket: <code className="text-zinc-200 font-mono">truespot_evidence</code>
          </div>
          {onOpenSupabaseModal && (
            <button
              type="button"
              onClick={onOpenSupabaseModal}
              className="py-2 px-4 rounded-full bg-[#161616] hover:bg-[#202020] border border-white/10 text-xs font-semibold text-white transition-all cursor-pointer flex items-center space-x-1.5"
            >
              <Database className="w-3.5 h-3.5 text-[#A8FF00]" />
              <span>Configure Database Sync</span>
            </button>
          )}
        </div>
      </div>

      {/* Setting 4: Reset All Protocol Data to 0 (Supabase Real-Time Purge) */}
      <div className="bg-[#0B0B0B] border border-red-500/30 rounded-[24px] p-6 space-y-5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
              <Trash2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Reset All Protocol Data to 0
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                  Supabase Live Purge
                </span>
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Zero out all bounties, reports, and escrow settlements in Supabase and local cache in real time.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-zinc-400 shrink-0">
            {hybridStore.isConnectedToSupabase ? '🟢 Supabase Synced' : '🟡 Local Mode'}
          </span>
        </div>

        <div className="bg-[#121212]/90 border border-white/[0.06] rounded-xl p-4 text-xs space-y-2 text-zinc-300">
          <div className="font-semibold text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-red-400" />
            What happens when you reset data to 0:
          </div>
          <ul className="list-disc list-inside space-y-1 text-zinc-400 text-[11px] pl-1">
            <li><strong className="text-zinc-200">Supabase Bounties & Reports:</strong> Purged and cleared in the PostgreSQL database in real time.</li>
            <li><strong className="text-zinc-200">Real-Time Sync:</strong> Broadcasts immediately across all active browser tabs and Vercel visitors.</li>
            <li><strong className="text-zinc-200">Demo Wallets:</strong> Maker & Spotter balances reset to baseline 1.00 SOL; escrow balance set to 0.00 SOL.</li>
            <li><strong className="text-zinc-200">Radar & Explorer:</strong> Active nearby bounties, submissions, and review queues immediately drop to 0.</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
          {confirmWipe ? (
            <div className="flex flex-col sm:flex-row items-center gap-2 w-full justify-between">
              <span className="text-xs text-red-400 font-medium text-center sm:text-left">
                Are you sure? This will permanently wipe all Supabase bounties & reports to 0.
              </span>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setConfirmWipe(false)}
                  className="flex-1 sm:flex-none py-2.5 px-4 rounded-full bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-300 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleWipeAllDataToZero}
                  disabled={isWiping}
                  className="flex-1 sm:flex-none py-2.5 px-5 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-lg shadow-red-900/40 cursor-pointer flex items-center justify-center space-x-1.5"
                >
                  {isWiping ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Purging Supabase to 0...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Confirm Reset to 0</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <span className="text-xs text-zinc-400">
                {wipedSuccess ? '✅ All protocol data wiped to 0 in Supabase' : 'Clean slate protocol operation'}
              </span>
              <button
                type="button"
                onClick={handleWipeAllDataToZero}
                disabled={isWiping}
                className="py-2.5 px-5 rounded-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 hover:text-red-200 text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 shrink-0 shadow-lg"
              >
                {isWiping ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Purging Supabase to 0...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5 text-red-400" />
                    <span>Reset All Data to 0 (Clean Slate)</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
