import React, { useState, useEffect } from 'react';
import {
  Shield,
  ShieldCheck,
  Zap,
  Radio,
  Terminal,
  Cpu,
  Check,
  Copy,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Compass,
  Eye,
  Lock,
  Sparkles,
  Activity,
  Layers,
  FileCode,
  Globe,
  RefreshCw,
  Coins,
} from 'lucide-react';

interface LandingPageProps {
  onLaunchProtocol?: () => void;
  onOpenDocs?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onLaunchProtocol,
  onOpenDocs,
}) => {
  // -------------------------------------------------------------
  // HERO LIVE TELEMETRY STATE
  // -------------------------------------------------------------
  const [telemetryTick, setTelemetryTick] = useState(14);
  const [activeEscrows, setActiveEscrows] = useState(142.5);
  const [telemetrySlot, setTelemetrySlot] = useState(510201842);
  const [isProbing, setIsProbing] = useState(false);
  const [lastProbeSuccess, setLastProbeSuccess] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetryTick((prev) => (prev > 1 ? prev - 1 : 18));
      setTelemetrySlot((prev) => prev + 1);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const handleTriggerProbe = () => {
    setIsProbing(true);
    setLastProbeSuccess(false);
    setTimeout(() => {
      setIsProbing(false);
      setLastProbeSuccess(true);
      setActiveEscrows((prev) => parseFloat((prev + 0.35).toFixed(2)));
      setTelemetryTick(1);
    }, 700);
  };

  // -------------------------------------------------------------
  // PROBLEM / SOLUTION INTERACTIVE STATE
  // -------------------------------------------------------------
  const [isVerified, setIsVerified] = useState(false);

  // -------------------------------------------------------------
  // PROTOCOL STACK CARD 1: BOUNTY SLIDER
  // -------------------------------------------------------------
  const [bountySliderVal, setBountySliderVal] = useState(1.5);
  const workerPayout = parseFloat((bountySliderVal * 0.975).toFixed(3));
  const protocolFee = parseFloat((bountySliderVal * 0.025).toFixed(3));

  // -------------------------------------------------------------
  // PROTOCOL STACK CARD 2: RADAR PROBE
  // -------------------------------------------------------------
  const [radarHovered, setRadarHovered] = useState(false);
  const [radarPulseCount, setRadarPulseCount] = useState(3);

  // -------------------------------------------------------------
  // PROTOCOL STACK CARD 3: AI VISION INFERENCE MOCK
  // -------------------------------------------------------------
  const [visionInferenceActive, setVisionInferenceActive] = useState(false);
  const [visionInferenceDone, setVisionInferenceDone] = useState(false);

  const handleSimulateVisionInference = () => {
    setVisionInferenceActive(true);
    setVisionInferenceDone(false);
    setTimeout(() => {
      setVisionInferenceActive(false);
      setVisionInferenceDone(true);
    }, 600);
  };

  // -------------------------------------------------------------
  // DEVELOPER TERMINAL TABS
  // -------------------------------------------------------------
  const [activeCodeTab, setActiveCodeTab] = useState<'request' | 'response' | 'rust'>('request');
  const [codeCopied, setCodeCopied] = useState(false);

  const codeSnippets = {
    request: `// 1. Initialize TrueSpot Solana Oracle SDK
import { TrueSpotClient } from '@truespot/sdk';

const oracle = new TrueSpotClient({
  cluster: 'devnet',
  endpoint: 'https://api.devnet.solana.com'
});

// 2. Submit physical query with locked PDA escrow
const task = await oracle.queries.create({
  location: { 
    lat: 37.7785, 
    lng: -122.3999, 
    radiusMeters: 200 
  },
  question: "Is EV Supercharger Stall #4 unoccupied and operational?",
  bountySol: 0.50,
  consensusModel: "GEMINI_2_5_FLASH",
  validitySeconds: 3600
});

console.log("Anchor Escrow PDA Locked:", task.escrowPda);`,

    response: `{
  "query_id": "qry_3b99e71c04f826aa",
  "status": "SETTLED",
  "timestamp": "2026-10-12T08:15:20Z",
  "consensus_result": {
    "observed_answer": "YES_UNOCCUPIED_OPERATIONAL",
    "confidence_score": 0.984,
    "distance_meters": 14.2
  },
  "cryptographic_attestation": {
    "hardware_gyro_variance": "0.042g (HUMAN_VERIFIED)",
    "exif_sensor_hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4",
    "deepfake_detection_score": 0.008
  },
  "solana_settlement": {
    "vault_pda": "9WzDXwBbmkg8ZTbNmQUxvQRAyrZzDsGYdLVL9zYtAWWM",
    "payout_tx": "4Vx8pL1m6k2q9r2Qz7SettledYw3eA1Cd4EfG7HiJ",
    "payout_amount_sol": 0.4875,
    "treasury_fee_sol": 0.0125
  }
}`,

    rust: `// Anchor CPI Interface for Autonomous Solana Programs
use anchor_lang::prelude::*;
use truespot_oracle::cpi::accounts::VerifyGroundTruth;

#[program]
pub mod autonomous_agent_vault {
    use super::*;

    pub fn execute_with_physical_truth(
        ctx: Context<ExecuteAction>,
        expected_radius: u32,
    ) -> Result<()> {
        let attestation = &ctx.accounts.truespot_attestation;

        // 1. Cryptographically verify hardware geofence within 200m
        require!(
            attestation.distance_meters <= expected_radius,
            OracleError::OutsidePhysicalGeofence
        );

        // 2. Validate Gemini 2.5 Flash consensus confidence >= 95%
        require!(
            attestation.confidence_bps >= 9500,
            OracleError::InsufficientConsensusScore
        );

        msg!("Ground truth verified on-chain. Executing autonomous payout.");
        Ok(())
    }
}`
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippets[activeCodeTab]);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] font-sans selection:bg-[#A8FF00]/20 selection:text-[#A8FF00] overflow-x-hidden relative">
      {/* Background Ambient Lighting (Strictly pitch black with subtle green luminescence) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-[#A8FF00]/[0.025] blur-[140px] rounded-full" />
        <div className="absolute top-[1600px] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#A8FF00]/[0.018] blur-[160px] rounded-full" />
      </div>

      {/* Floating Glass Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#050505]/85 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 rounded-xl bg-[#A8FF00] text-black flex items-center justify-center font-black">
              <Shield className="w-4.5 h-4.5 text-black stroke-[2.5]" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-base tracking-tight text-white">TrueSpot</span>
              <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.05] text-zinc-400 border border-white/[0.08]">
                SOLANA DEPIN ORACLE
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold text-zinc-400">
            <a href="#problem-solution" className="hover:text-white transition-colors">
              Problem / Solution
            </a>
            <a href="#protocol-stack" className="hover:text-white transition-colors">
              Protocol Stack
            </a>
            <a href="#developer-terminal" className="hover:text-white transition-colors">
              Developer API
            </a>
          </nav>

          <div className="flex items-center space-x-3">
            <button
              onClick={onLaunchProtocol}
              className="px-4 py-1.5 rounded-full bg-[#A8FF00] hover:bg-[#b8ff24] text-black font-extrabold text-xs transition-all flex items-center space-x-1.5 shadow-none hover:shadow-[0_0_20px_rgba(168,255,0,0.3)] cursor-pointer"
            >
              <span>Launch App</span>
              <ArrowRight className="w-3.5 h-3.5 text-black" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Vertical Sequence */}
      <main className="relative z-10">
        {/* ========================================================================= */}
        {/* 1. THE HERO (Cinematic & Interactive)                                      */}
        {/* ========================================================================= */}
        <section className="pt-40 pb-28 px-6 text-center max-w-5xl mx-auto">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#0B0B0B] border border-white/[0.08] mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#A8FF00] animate-pulse" />
            <span className="text-[11px] font-mono font-bold text-zinc-300 uppercase tracking-widest">
              Physical Reality Oracle on Solana
            </span>
          </div>

          {/* Giant Tracking-Tight Headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.05] max-w-4xl mx-auto">
            Programmable <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-zinc-500">
              Physical Reality.
            </span>
          </h1>

          {/* Muted Sub-Headline */}
          <p className="text-base sm:text-lg lg:text-xl text-zinc-400 max-w-2xl mx-auto font-normal leading-relaxed mt-6">
            The decentralized oracle bringing cryptographically verified ground truth to Solana smart contracts and AI agents.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <button
              onClick={onLaunchProtocol}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#A8FF00] hover:bg-[#b8ff24] text-black font-extrabold text-sm flex items-center justify-center space-x-2 transition-all duration-200 hover:shadow-[0_0_35px_rgba(168,255,0,0.4)] cursor-pointer"
            >
              <span>Launch Protocol</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>

            <button
              onClick={onOpenDocs}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full bg-transparent hover:bg-white/[0.03] text-zinc-400 hover:text-white border border-white/[0.08] hover:border-white/20 text-sm font-semibold transition-all cursor-pointer"
            >
              <span>Read Documentation</span>
              <ArrowUpRight className="w-4 h-4 text-zinc-500" />
            </button>
          </div>

          {/* Playable Hero Telemetry Widget */}
          <div className="mt-20 w-full max-w-2xl mx-auto text-left">
            <div className="bg-[#0B0B0B] border border-white/[0.08] hover:border-[#A8FF00]/30 rounded-2xl p-5 sm:p-6 transition-all duration-300 shadow-2xl relative overflow-hidden group">
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <span className="ml-2 font-mono text-[11px] text-zinc-400">
                    node-cluster // devnet-oracle-v2
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A8FF00] animate-pulse" />
                  <span className="text-[10px] font-mono font-bold text-[#A8FF00] tracking-wider uppercase">
                    LIVE FEED
                  </span>
                </div>
              </div>

              {/* Flashing Monospace Telemetry Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="bg-[#060606] border border-white/[0.05] rounded-xl p-3">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-widest block font-bold mb-1">
                    Node State
                  </span>
                  <div className="flex items-center space-x-1.5 text-zinc-200">
                    <RefreshCw className={`w-3 h-3 text-[#A8FF00] ${isProbing ? 'animate-spin' : ''}`} />
                    <span className="font-bold text-white">Syncing Node...</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 mt-1 block">Slot #{telemetrySlot.toLocaleString()}</span>
                </div>

                <div className="bg-[#060606] border border-white/[0.05] rounded-xl p-3">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-widest block font-bold mb-1">
                    Latest Verified Proof
                  </span>
                  <div className="text-white font-bold flex items-center space-x-1.5">
                    <Activity className="w-3.5 h-3.5 text-[#A8FF00]" />
                    <span>{telemetryTick}s ago</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 mt-1 block">Latency: 184ms</span>
                </div>

                <div className="bg-[#060606] border border-white/[0.05] rounded-xl p-3">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-widest block font-bold mb-1">
                    Active Escrows
                  </span>
                  <div className="text-[#A8FF00] font-black text-sm flex items-center space-x-1">
                    <span>{activeEscrows.toFixed(2)}</span>
                    <span className="text-[10px] text-zinc-400 font-normal">SOL</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 mt-1 block">Anchor Program PDA</span>
                </div>
              </div>

              {/* Playable Probe Trigger Bar */}
              <div className="mt-4 pt-3.5 border-t border-white/[0.05] flex items-center justify-between flex-wrap gap-2 text-[11px] font-mono">
                <div className="text-zinc-400 flex items-center space-x-2">
                  <Radio className="w-3.5 h-3.5 text-[#A8FF00]" />
                  <span>
                    {lastProbeSuccess
                      ? '[ORACLE PROBE: 100% CONSENSUS CONFIRMED IN 184ms]'
                      : 'Attestation Engine: Standby'}
                  </span>
                </div>

                <button
                  onClick={handleTriggerProbe}
                  disabled={isProbing}
                  className="px-3 py-1 rounded-lg bg-[#141414] hover:bg-[#1a1a1a] text-zinc-300 hover:text-white border border-white/[0.08] hover:border-[#A8FF00]/40 transition-all cursor-pointer flex items-center space-x-1.5 text-[11px]"
                >
                  <Zap className={`w-3 h-3 ${isProbing ? 'text-[#A8FF00] animate-spin' : 'text-zinc-400'}`} />
                  <span>{isProbing ? 'Probing...' : 'Simulate Oracle Probe'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. THE INTERACTIVE PROBLEM / SOLUTION DEMO                                */}
        {/* ========================================================================= */}
        <section id="problem-solution" className="py-32 px-6 border-t border-white/[0.06] max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0B0B0B] border border-white/[0.08] mb-4">
              <span className="text-[10px] font-mono font-bold text-[#A8FF00] uppercase tracking-widest">
                PROBLEM & SOLUTION
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Smart Contracts Are Blind to the Real World
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-4 leading-relaxed">
              Without hardware-signed location proof and AI vision consensus, autonomous agents and on-chain prediction markets fail at the physical boundary.
            </p>

            {/* Playable Toggle Switch */}
            <div className="mt-8 inline-flex items-center p-1 rounded-full bg-[#0B0B0B] border border-white/[0.08] shadow-inner">
              <button
                onClick={() => setIsVerified(false)}
                className={`px-5 py-2 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                  !isVerified
                    ? 'bg-[#181818] text-white border border-white/10 shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Blind Contract (Legacy)
              </button>
              <button
                onClick={() => setIsVerified(true)}
                className={`px-5 py-2 rounded-full text-xs font-mono font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                  isVerified
                    ? 'bg-[#A8FF00] text-black shadow-[0_0_20px_rgba(168,255,0,0.3)]'
                    : 'text-zinc-400 hover:text-[#A8FF00]'
                }`}
              >
                <span>Verified by TrueSpot</span>
                <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
              </button>
            </div>
          </div>

          {/* Interactive Comparison Window */}
          <div
            className={`rounded-3xl border transition-all duration-300 p-6 sm:p-8 ${
              isVerified
                ? 'bg-[#0B0B0B] border-[#A8FF00]/40 shadow-[0_0_50px_rgba(168,255,0,0.06)]'
                : 'bg-[#090909] border-white/[0.08]'
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left Column: Smart Contract RPC Execution */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-400">INSTRUCTION SIMULATOR</span>
                  <span
                    className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                      isVerified
                        ? 'bg-[#A8FF00]/10 text-[#A8FF00] border border-[#A8FF00]/30'
                        : 'bg-red-500/10 text-red-400 border border-red-500/30'
                    }`}
                  >
                    {isVerified ? 'EXECUTION CONFIRMED' : 'TX EXECUTION FAILED'}
                  </span>
                </div>

                <div className="bg-[#050505] rounded-2xl p-5 border border-white/[0.06] font-mono text-xs space-y-2.5">
                  <div className="flex items-start space-x-2">
                    {isVerified ? (
                      <CheckCircle2 className="w-4 h-4 text-[#A8FF00] shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    )}
                    <span className="text-zinc-300">
                      Program: <span className="text-white">truespot_escrow_anchor::settle()</span>
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-black/60 border border-white/[0.04] text-[11px] leading-relaxed">
                    {isVerified ? (
                      <div className="text-zinc-300 space-y-1">
                        <p className="text-[#A8FF00] font-bold">
                          ✓ [SOLANA CONFIRMED] Anchor PDA Settled: 9WzDXw...AWWM
                        </p>
                        <p className="text-zinc-400">
                          - Geofence Distance: 14.2m (Target &lt; 200m)
                        </p>
                        <p className="text-zinc-400">
                          - Gemini 2.5 Consensus: 98.4% Match
                        </p>
                        <p className="text-zinc-400">
                          - Payout: 0.4875 SOL disbursed to worker
                        </p>
                      </div>
                    ) : (
                      <div className="text-red-400 space-y-1">
                        <p className="font-bold">
                          ✗ [RPC ERR 0x1402] Physical State Unresolved
                        </p>
                        <p className="text-zinc-400">
                          - Error: NO_HARDWARE_ATTESTATION
                        </p>
                        <p className="text-zinc-400">
                          - Reason: Smart contract has zero knowledge of stall occupancy
                        </p>
                        <p className="text-zinc-400">
                          - Execution halted. Funds frozen in limbo.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Autonomous AI Agent Reaction */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-400">AI AGENT EXECUTION LOG</span>
                  <span className="text-zinc-400 text-[10px]">LangChain / Eliza Agent</span>
                </div>

                <div className="bg-[#050505] rounded-2xl p-5 border border-white/[0.06] font-mono text-xs space-y-3">
                  <div className="text-zinc-400 text-[11px]">
                    User Prompt: <span className="text-white">"Check if Stall 4 EV charger is currently free."</span>
                  </div>

                  <div
                    className={`p-4 rounded-xl border transition-all text-xs leading-relaxed ${
                      isVerified
                        ? 'bg-[#A8FF00]/[0.03] border-[#A8FF00]/20 text-zinc-200'
                        : 'bg-red-950/[0.1] border-red-500/20 text-zinc-400'
                    }`}
                  >
                    {isVerified ? (
                      <div>
                        <span className="text-[#A8FF00] font-bold block mb-1">
                          Agent Status: Ground Truth Verified
                        </span>
                        "Cryptographic photo evidence confirmed. Hardware location within 14m. Gemini 2.5 consensus score 98.4%. Escrow 0.50 SOL successfully settled."
                      </div>
                    ) : (
                      <div>
                        <span className="text-red-400 font-bold block mb-1">
                          Agent Status: Hallucination Risk Blocked
                        </span>
                        "I cannot verify physical reality. I do not have real-time sensory ground truth for EV Stall 4. Transaction execution aborted."
                      </div>
                    )}
                  </div>

                  {/* Badges Strip */}
                  <div className="flex items-center gap-2 flex-wrap pt-1 text-[10px]">
                    <span
                      className={`px-2.5 py-1 rounded-full font-bold border transition-colors ${
                        isVerified
                          ? 'bg-[#A8FF00]/10 text-[#A8FF00] border-[#A8FF00]/30'
                          : 'bg-white/[0.04] text-zinc-400 border-white/[0.06]'
                      }`}
                    >
                      Geofence: {isVerified ? '✓ Valid (14m)' : '❌ None'}
                    </span>
                    <span
                      className={`px-2.5 py-1 rounded-full font-bold border transition-colors ${
                        isVerified
                          ? 'bg-[#A8FF00]/10 text-[#A8FF00] border-[#A8FF00]/30'
                          : 'bg-white/[0.04] text-zinc-400 border-white/[0.06]'
                      }`}
                    >
                      AI Consensus: {isVerified ? '✓ 98.4%' : '❌ 0%'}
                    </span>
                    <span
                      className={`px-2.5 py-1 rounded-full font-bold border transition-colors ${
                        isVerified
                          ? 'bg-[#A8FF00]/10 text-[#A8FF00] border-[#A8FF00]/30'
                          : 'bg-white/[0.04] text-zinc-400 border-white/[0.06]'
                      }`}
                    >
                      Anchor PDA: {isVerified ? '✓ Settled' : '❌ Reverted'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. THE PROTOCOL STACK (Vertical Bento Box)                                */}
        {/* ========================================================================= */}
        <section id="protocol-stack" className="py-32 px-6 border-t border-white/[0.06] max-w-5xl mx-auto space-y-24">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0B0B0B] border border-white/[0.08] mb-4">
              <span className="text-[10px] font-mono font-bold text-[#A8FF00] uppercase tracking-widest">
                PROTOCOL ARCHITECTURE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Engineered for Cryptographic Truth
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-4 leading-relaxed">
              Three autonomous verification layers working in lockstep to bridge physical observations into on-chain consensus.
            </p>
          </div>

          {/* CARD 1: DETERMINISTIC ESCROW (Playable Slider) */}
          <div className="bg-[#0B0B0B] border border-white/[0.08] hover:border-[#A8FF00]/30 rounded-3xl p-8 sm:p-12 transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-[#141414] border border-white/10 flex items-center justify-center text-[#A8FF00]">
                  <Lock className="w-5 h-5 text-[#A8FF00]" />
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  1. Deterministic Solana Escrow
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Every query locks funds in an autonomous Anchor PDA program. Upon cryptographic multi-party consensus, 97.5% settles instantly to field workers while 2.5% fuels protocol liquidity.
                </p>
                <div className="pt-2 text-xs font-mono text-zinc-400">
                  <span className="text-[#A8FF00] font-bold">Non-Custodial</span> • Zero Counterparty Risk • Instant Settlement
                </div>
              </div>

              {/* Playable Escrow Split Slider */}
              <div className="lg:col-span-6 bg-[#060606] border border-white/[0.06] rounded-2xl p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider">
                    Adjust Escrow Bounty
                  </span>
                  <div className="flex items-baseline space-x-1 font-mono">
                    <span className="text-2xl font-black text-[#A8FF00]">
                      {bountySliderVal.toFixed(2)}
                    </span>
                    <span className="text-xs font-bold text-zinc-400">SOL</span>
                  </div>
                </div>

                {/* Range Slider */}
                <input
                  type="range"
                  min="0.10"
                  max="10.00"
                  step="0.05"
                  value={bountySliderVal}
                  onChange={(e) => setBountySliderVal(parseFloat(e.target.value))}
                  className="w-full accent-[#A8FF00] bg-zinc-800 h-2 rounded-lg cursor-pointer"
                />

                {/* Split Bar Visualization */}
                <div className="space-y-2">
                  <div className="h-3 w-full rounded-full bg-zinc-900 overflow-hidden flex">
                    <div
                      style={{ width: '97.5%' }}
                      className="bg-[#A8FF00] h-full transition-all"
                      title="Worker Payout: 97.5%"
                    />
                    <div
                      style={{ width: '2.5%' }}
                      className="bg-zinc-600 h-full"
                      title="Protocol Fee: 2.5%"
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                    <span className="flex items-center space-x-1">
                      <span className="w-2 h-2 rounded-full bg-[#A8FF00]" />
                      <span>Worker Payout (97.5%): <strong className="text-white">{workerPayout} SOL</strong></span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span className="w-2 h-2 rounded-full bg-zinc-500" />
                      <span>Protocol Fee (2.5%): <strong className="text-zinc-300">{protocolFee} SOL</strong></span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 2: HARDWARE ATTESTATION (Playable 200m Radar) */}
          <div className="bg-[#0B0B0B] border border-white/[0.08] hover:border-[#A8FF00]/30 rounded-3xl p-8 sm:p-12 transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-[#141414] border border-white/10 flex items-center justify-center text-[#A8FF00]">
                  <Compass className="w-5 h-5 text-[#A8FF00]" />
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  2. Cryptographic Hardware Attestation
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  GPS coordinates validated via strict Haversine math inside a 200m perimeter, combined with gyroscopic micro-tremor variance (&lt;0.08g) proving a live human holding a genuine camera device.
                </p>
                <div className="pt-2 text-xs font-mono text-zinc-400">
                  <span className="text-[#A8FF00] font-bold">Anti-Spoofing</span> • EXIF SHA-256 Hashes • Zero Virtual Cam Emulation
                </div>
              </div>

              {/* Playable Radar Visual */}
              <div
                onMouseEnter={() => setRadarHovered(true)}
                onMouseLeave={() => setRadarHovered(false)}
                className="lg:col-span-6 bg-[#060606] border border-white/[0.06] rounded-2xl p-6 flex flex-col items-center justify-center min-h-[260px] relative overflow-hidden group cursor-pointer"
              >
                {/* Concentric Radar Rings */}
                <div className="relative w-44 h-44 flex items-center justify-center">
                  <div
                    className={`absolute inset-0 rounded-full border border-dashed transition-all duration-700 ${
                      radarHovered
                        ? 'border-[#A8FF00]/60 scale-110 shadow-[0_0_30px_rgba(168,255,0,0.15)]'
                        : 'border-white/10'
                    }`}
                  />
                  <div className="absolute inset-6 rounded-full border border-white/[0.07]" />
                  <div className="absolute inset-12 rounded-full border border-white/[0.08]" />

                  {/* Pulsing 200m Perimeter Beacon */}
                  <div className="w-4 h-4 rounded-full bg-[#A8FF00] relative flex items-center justify-center shadow-[0_0_15px_#A8FF00]">
                    <span className="absolute -inset-2 rounded-full bg-[#A8FF00]/30 animate-ping" />
                  </div>

                  {/* Crosshair Axes */}
                  <div className="absolute inset-x-0 h-px bg-white/[0.05]" />
                  <div className="absolute inset-y-0 w-px bg-white/[0.05]" />
                </div>

                {/* Radar Status Readout */}
                <div className="mt-4 text-center font-mono text-xs space-y-1">
                  <div className="text-white font-bold flex items-center justify-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A8FF00]" />
                    <span>200m Haversine Perimeter: {radarHovered ? 'LOCKED (14.2m)' : 'ACTIVE'}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    Gyro Variance: <span className="text-[#A8FF00]">0.042g VALID</span> • Accuracy: ±4.8m
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 3: AI VISION CONSENSUS (Playable Upload & Inference) */}
          <div className="bg-[#0B0B0B] border border-white/[0.08] hover:border-[#A8FF00]/30 rounded-3xl p-8 sm:p-12 transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-[#141414] border border-white/10 flex items-center justify-center text-[#A8FF00]">
                  <Eye className="w-5 h-5 text-[#A8FF00]" />
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  3. Dual-Model Vision Consensus
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Captured hardware evidence is evaluated in parallel by Gemini 2.5 Flash and open neural vision engines against the task query, returning deterministic JSON consensus scores in milliseconds.
                </p>
                <div className="pt-2 text-xs font-mono text-zinc-400">
                  <span className="text-[#A8FF00] font-bold">Deepfake Guard</span> • Semantic Verification • Hallucination Immunity
                </div>
              </div>

              {/* Playable Mock Upload & Inference Box */}
              <div
                onClick={handleSimulateVisionInference}
                className="lg:col-span-6 bg-[#060606] border border-dashed border-white/15 hover:border-[#A8FF00]/60 rounded-2xl p-6 transition-all cursor-pointer space-y-4 group"
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-400">GEMINI 2.5 FLASH INFERENCE MOCK</span>
                  <span className="text-[10px] text-[#A8FF00] font-bold">CLICK TO PROBE</span>
                </div>

                {visionInferenceActive ? (
                  <div className="py-8 text-center space-y-2">
                    <Sparkles className="w-6 h-6 text-[#A8FF00] animate-spin mx-auto" />
                    <p className="text-xs font-mono text-zinc-300">
                      Scanning photo evidence... analyzing scene consensus
                    </p>
                  </div>
                ) : (
                  <div className="bg-black/60 rounded-xl p-4 font-mono text-[11px] leading-relaxed text-zinc-300 border border-white/[0.04] space-y-1">
                    <p className="text-[#A8FF00] font-bold">
                      {visionInferenceDone ? '✓ INFERENCE RESOLVED (142ms)' : '{ // Standby: Click box to test Gemini 2.5 Flash }'}
                    </p>
                    <p className="text-zinc-400">"status": "ACCEPTED"</p>
                    <p className="text-zinc-400">"confidence_score": 0.984</p>
                    <p className="text-zinc-400">"observed_answer": "Stall 4 is unoccupied with active green LED"</p>
                    <p className="text-zinc-400">"deepfake_detection_score": 0.008</p>
                  </div>
                )}

                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-1">
                  <span>Confidence Threshold: &gt;95%</span>
                  <span className="text-[#A8FF00] font-bold">Consensus: 98.4% MATCH</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. THE DEVELOPER TERMINAL (Playable API)                                  */}
        {/* ========================================================================= */}
        <section id="developer-terminal" className="py-32 px-6 border-t border-white/[0.06] max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heavy Pitch & Spec */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0B0B0B] border border-white/[0.08]">
                <span className="text-[10px] font-mono font-bold text-[#A8FF00] uppercase tracking-widest">
                  DEVELOPER FIRST
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Built for Autonomous Agents
              </h2>

              <p className="text-zinc-400 text-sm leading-relaxed">
                Empower your AI agents, on-chain prediction markets, and DePIN networks to query verifiable physical ground truth with a single TypeScript SDK call or Anchor CPI instruction.
              </p>

              <div className="space-y-3 font-mono text-xs text-zinc-300">
                <div className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-[#A8FF00]" />
                  <span>Sub-second REST v2 & WebSocket feed</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-[#A8FF00]" />
                  <span>Anchor CPI composability for any Solana program</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-[#A8FF00]" />
                  <span>Hardware-signed zero-knowledge proofs</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenDocs}
                  className="px-6 py-3 rounded-full bg-[#141414] hover:bg-[#1a1a1a] text-[#A8FF00] hover:text-white border border-white/[0.08] hover:border-[#A8FF00]/40 text-xs font-mono font-bold transition-all cursor-pointer flex items-center space-x-2"
                >
                  <Terminal className="w-4 h-4" />
                  <span>Explore Developer Documentation →</span>
                </button>
              </div>
            </div>

            {/* Right Column: Interactive Code Terminal Window */}
            <div className="lg:col-span-7">
              <div className="bg-[#080808] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl">
                {/* Terminal Header & Tabs */}
                <div className="flex items-center justify-between bg-[#0e0e0e] border-b border-white/[0.06] px-4 py-2.5">
                  {/* macOS dots & tabs */}
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
                    </div>

                    <div className="flex items-center space-x-1 ml-2">
                      <button
                        onClick={() => setActiveCodeTab('request')}
                        className={`px-3 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                          activeCodeTab === 'request'
                            ? 'bg-[#181818] text-white font-bold border border-white/10'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        Request (TS)
                      </button>
                      <button
                        onClick={() => setActiveCodeTab('response')}
                        className={`px-3 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                          activeCodeTab === 'response'
                            ? 'bg-[#181818] text-white font-bold border border-white/10'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        Response (JSON)
                      </button>
                      <button
                        onClick={() => setActiveCodeTab('rust')}
                        className={`px-3 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                          activeCodeTab === 'rust'
                            ? 'bg-[#181818] text-white font-bold border border-white/10'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        On-Chain (Rust)
                      </button>
                    </div>
                  </div>

                  {/* Copy Button */}
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center space-x-1.5 text-[11px] font-mono text-zinc-400 hover:text-white px-2.5 py-1 rounded bg-[#141414] border border-white/[0.06] cursor-pointer transition-colors"
                  >
                    {codeCopied ? (
                      <>
                        <Check className="w-3 h-3 text-[#A8FF00]" />
                        <span className="text-[#A8FF00]">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Code Body */}
                <div className="p-5 overflow-x-auto max-h-[380px] font-mono text-xs leading-relaxed text-zinc-300">
                  <pre className="text-zinc-300 whitespace-pre font-mono">
                    {codeSnippets[activeCodeTab]}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. THE MINIMALIST FOOTER                                                   */}
        {/* ========================================================================= */}
        <footer className="mt-32 pt-16 pb-20 border-t border-white/[0.06] relative max-w-5xl mx-auto px-6 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[#A8FF00]/40 before:to-transparent">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-[#A8FF00] text-black flex items-center justify-center font-bold">
                <Shield className="w-4.5 h-4.5 text-black stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-sm tracking-tight text-white">TrueSpot Protocol</span>
                <span className="text-[11px] font-mono text-zinc-400">The Physical Reality Oracle on Solana</span>
              </div>
            </div>

            <div className="flex items-center space-x-8 text-xs font-mono font-semibold text-zinc-400">
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                X (Twitter)
              </a>
              <a
                href="https://github.com/ItsHarshjsin/Truespot"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                GitHub
              </a>
              <button
                onClick={onOpenDocs}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Documentation
              </button>
            </div>
          </div>

          <div className="mt-12 text-center text-xs font-mono text-zinc-400">
            © 2026 TrueSpot Protocol. Autonomous Solana Verification Network.
          </div>
        </footer>
      </main>
    </div>
  );
};
