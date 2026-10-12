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
  MapPin,
  Camera,
  Server,
  FileCheck,
  Sliders,
  ChevronRight,
  ExternalLink,
  Info,
} from 'lucide-react';

interface LandingPageProps {
  onLaunchProtocol?: () => void;
  onOpenDocs?: () => void;
}

interface UseCasePreset {
  id: string;
  title: string;
  category: string;
  location: string;
  coords: string;
  question: string;
  bounty: number;
  answer: string;
  confidence: number;
  distance: string;
  gyro: string;
  hash: string;
  status: 'VERIFIED' | 'SETTLED';
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
  const [telemetrySlot, setTelemetrySlot] = useState(510204910);
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
    }, 600);
  };

  // -------------------------------------------------------------
  // PROBLEM / SOLUTION INTERACTIVE STATE
  // -------------------------------------------------------------
  const [isVerified, setIsVerified] = useState(true);

  // -------------------------------------------------------------
  // PLAYGROUND USE CASE SELECTOR
  // -------------------------------------------------------------
  const useCasePresets: UseCasePreset[] = [
    {
      id: 'ev-charger',
      title: 'EV Supercharger Availability',
      category: 'Smart Mobility & DePIN',
      location: 'Downtown Station • Stall 4',
      coords: '37.7792° N, 122.4184° W',
      question: 'Is Supercharger Stall 4 unoccupied and actively illuminated?',
      bounty: 0.35,
      answer: 'STALL_UNOCCUPIED • GREEN_BEACON_ACTIVE',
      confidence: 98.4,
      distance: '12.4m',
      gyro: '0.042g',
      hash: '5Kn7wVbN...9FgH1IjK',
      status: 'SETTLED',
    },
    {
      id: 'construction',
      title: 'Pedestrian Sidewalk Clearance',
      category: 'Urban Infrastructure',
      location: '5th & Market St Corridor',
      coords: '37.7841° N, 122.4068° W',
      question: 'Verify construction detour signage and pedestrian walkway clearance.',
      bounty: 0.45,
      answer: 'DETOUR_POSTED • SIDEWALK_OPEN',
      confidence: 99.1,
      distance: '18.1m',
      gyro: '0.038g',
      hash: '3Lm9zP2w...Ef8Gh0Ij',
      status: 'SETTLED',
    },
    {
      id: 'locker-hub',
      title: 'Autonomous Parcel Locker Bay',
      category: 'Supply Chain & Logistics',
      location: 'SoMa Parcel Hub Locker Bay',
      coords: '37.7765° N, 122.3991° W',
      question: 'Confirm outdoor parcel locker touchscreen is responsive and ready for dropoff.',
      bounty: 0.30,
      answer: 'TOUCHSCREEN_OPERATIONAL • READY',
      confidence: 97.8,
      distance: '8.6m',
      gyro: '0.045g',
      hash: '7Qw4vB8n...Ef0Gh2Ij',
      status: 'SETTLED',
    },
    {
      id: 'bikeshare',
      title: 'Bikeshare Docking Capacity',
      category: 'Autonomous Agents',
      location: 'Calaroga Bayfront Bike Dock',
      coords: '37.7812° N, 122.4110° W',
      question: 'Confirm at least 3 electric bikes are docked with functioning lock release LEDs.',
      bounty: 0.50,
      answer: '4_EBIKES_DOCKED • LEDS_CONFIRMED',
      confidence: 98.9,
      distance: '15.2m',
      gyro: '0.041g',
      hash: '8Yt2uP5w...Ef2Gh4Ij',
      status: 'SETTLED',
    },
  ];

  const [activeUseCase, setActiveUseCase] = useState<UseCasePreset>(useCasePresets[0]);

  // -------------------------------------------------------------
  // 4-STAGE PIPELINE INTERACTIVE SELECTOR
  // -------------------------------------------------------------
  const [activePipelineStep, setActivePipelineStep] = useState<number>(1);

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
  const [activeCodeTab, setActiveCodeTab] = useState<'request' | 'rust' | 'rest'>('request');
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
    lat: 37.7792, 
    lng: -122.4184, 
    radiusMeters: 200 
  },
  question: "Is EV Supercharger Stall #4 unoccupied and operational?",
  bountySol: 0.50,
  consensusModel: "GEMINI_2_5_FLASH",
  validitySeconds: 3600
});

console.log("Anchor Escrow PDA Locked:", task.escrowPda);`,

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
}`,

    rest: `// Open Truth REST API v2 Endpoint
// POST https://truespot.network/api/v2/queries

// Request Body:
{
  "location": { "lat": 37.7792, "lng": -122.4184, "radius_meters": 200 },
  "question": "Is EV Stall 4 unoccupied?",
  "amount_sol": 0.50,
  "consensus_engine": "GEMINI_2_5_FLASH"
}

// Response (200 OK):
{
  "query_id": "qry_3b99e71c04f826aa",
  "status": "SETTLED",
  "consensus": {
    "answer": "YES_UNOCCUPIED",
    "confidence": 0.984,
    "distance_meters": 12.4
  },
  "solana_settlement": {
    "vault_pda": "9WzDXwBbmkg8ZTbNmQUxvQRAyrZzDsGYdLVL9zYtAWWM",
    "payout_tx": "4Vx8pL1m6k2q9r2Qz7SettledYw3eA1Cd4EfG7HiJ"
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[650px] bg-[#A8FF00]/[0.025] blur-[150px] rounded-full" />
        <div className="absolute top-[1800px] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#A8FF00]/[0.018] blur-[160px] rounded-full" />
        <div className="absolute top-[3400px] left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-[#A8FF00]/[0.015] blur-[170px] rounded-full" />
      </div>

      {/* Floating Glass Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#050505]/90 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-8 h-8 rounded-xl bg-[#A8FF00] text-black flex items-center justify-center font-black group-hover:scale-105 transition-transform">
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
            <a href="#playground" className="hover:text-white transition-colors">
              Live Playground
            </a>
            <a href="#pipeline" className="hover:text-white transition-colors">
              How It Works
            </a>
            <a href="#problem-solution" className="hover:text-white transition-colors">
              Comparison
            </a>
            <a href="#protocol-stack" className="hover:text-white transition-colors">
              Protocol Stack
            </a>
            <a href="#developer-terminal" className="hover:text-white transition-colors">
              Developers
            </a>
          </nav>

          <div className="flex items-center space-x-3">
            <button
              onClick={onLaunchProtocol}
              className="px-5 py-2 rounded-full bg-[#A8FF00] hover:bg-[#b8ff24] text-black font-extrabold text-xs transition-all flex items-center space-x-1.5 shadow-none hover:shadow-[0_0_25px_rgba(168,255,0,0.35)] cursor-pointer"
            >
              <span>Launch App</span>
              <ArrowRight className="w-3.5 h-3.5 text-black" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Vertical Sequence (Wide modern canvas max-w-7xl) */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================================= */}
        {/* 1. THE HERO (Cinematic, Wide & Interactive)                                */}
        {/* ========================================================================= */}
        <section className="pt-32 sm:pt-40 pb-20 text-center">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#0B0B0B] border border-white/[0.08] mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#A8FF00] animate-pulse" />
            <span className="text-[11px] font-mono font-bold text-zinc-300 uppercase tracking-widest">
              Solana Devnet DePIN Oracle // v2.1 Live
            </span>
          </div>

          {/* Giant Tracking-Tight Headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.05] max-w-5xl mx-auto">
            Programmable <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-zinc-400">
              Physical Reality.
            </span>
          </h1>

          {/* Muted Sub-Headline */}
          <p className="text-base sm:text-lg lg:text-xl text-zinc-400 max-w-3xl mx-auto font-normal leading-relaxed mt-6">
            The decentralized oracle bringing cryptographically verified ground truth to Solana smart contracts, prediction markets, and autonomous AI agents.
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
              <span>Explore Documentation</span>
              <ArrowUpRight className="w-4 h-4 text-zinc-500" />
            </button>
          </div>

          {/* High-Impact Protocol Telemetry Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-16 max-w-5xl mx-auto">
            <div className="bg-[#0B0B0B] border border-white/[0.08] hover:border-[#A8FF00]/30 rounded-2xl p-4 sm:p-5 text-center transition-colors">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono block">
                Total Verified Queries
              </span>
              <div className="flex items-baseline justify-center gap-1 mt-1.5 font-mono">
                <span className="text-2xl sm:text-3xl font-black text-[#A8FF00] leading-none">12,840</span>
                <span className="text-xs text-zinc-400 font-bold">+</span>
              </div>
            </div>

            <div className="bg-[#0B0B0B] border border-white/[0.08] hover:border-[#A8FF00]/30 rounded-2xl p-4 sm:p-5 text-center transition-colors">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono block">
                Median Settlement
              </span>
              <div className="flex items-baseline justify-center gap-1 mt-1.5 font-mono">
                <span className="text-2xl sm:text-3xl font-black text-white leading-none">3.8</span>
                <span className="text-xs text-zinc-400 font-bold">sec</span>
              </div>
            </div>

            <div className="bg-[#0B0B0B] border border-white/[0.08] hover:border-[#A8FF00]/30 rounded-2xl p-4 sm:p-5 text-center transition-colors">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono block">
                Haversine Precision
              </span>
              <div className="flex items-baseline justify-center gap-1 mt-1.5 font-mono">
                <span className="text-2xl sm:text-3xl font-black text-[#A8FF00] leading-none">200</span>
                <span className="text-xs text-zinc-400 font-bold">m</span>
              </div>
            </div>

            <div className="bg-[#0B0B0B] border border-white/[0.08] hover:border-[#A8FF00]/30 rounded-2xl p-4 sm:p-5 text-center transition-colors">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono block">
                Consensus Accuracy
              </span>
              <div className="flex items-baseline justify-center gap-1 mt-1.5 font-mono">
                <span className="text-2xl sm:text-3xl font-black text-white leading-none">99.8</span>
                <span className="text-xs text-[#A8FF00] font-bold">%</span>
              </div>
            </div>
          </div>

          {/* Interactive Live Telemetry Terminal Card */}
          <div className="mt-8 max-w-4xl mx-auto text-left">
            <div className="bg-[#0B0B0B] border border-white/[0.08] hover:border-[#A8FF00]/30 rounded-3xl p-5 sm:p-7 transition-all duration-300 shadow-2xl relative overflow-hidden group">
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <span className="ml-2 font-mono text-[11px] text-zinc-400">
                    node-cluster // solana-devnet-oracle-v2
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A8FF00] animate-pulse" />
                  <span className="text-[10px] font-mono font-bold text-[#A8FF00] tracking-wider uppercase">
                    ACTIVE STREAM
                  </span>
                </div>
              </div>

              {/* Monospace Telemetry Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 font-mono text-xs">
                <div className="bg-[#060606] border border-white/[0.05] rounded-xl p-3.5">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-widest block font-bold mb-1">
                    Solana Devnet Slot
                  </span>
                  <div className="flex items-center space-x-1.5 text-zinc-200">
                    <RefreshCw className={`w-3.5 h-3.5 text-[#A8FF00] ${isProbing ? 'animate-spin' : ''}`} />
                    <span className="font-bold text-white">#{telemetrySlot.toLocaleString()}</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 mt-1 block">Confirmed Finality</span>
                </div>

                <div className="bg-[#060606] border border-white/[0.05] rounded-xl p-3.5">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-widest block font-bold mb-1">
                    Recent Verification
                  </span>
                  <div className="text-white font-bold flex items-center space-x-1.5">
                    <Activity className="w-3.5 h-3.5 text-[#A8FF00]" />
                    <span>{telemetryTick}s ago</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 mt-1 block">Sub-400ms RPC</span>
                </div>

                <div className="bg-[#060606] border border-white/[0.05] rounded-xl p-3.5">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-widest block font-bold mb-1">
                    Active Escrow Pool
                  </span>
                  <div className="text-[#A8FF00] font-black text-sm flex items-center space-x-1">
                    <span>{activeEscrows.toFixed(2)}</span>
                    <span className="text-[10px] text-zinc-400 font-normal">SOL</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 mt-1 block">Anchor Program PDA</span>
                </div>
              </div>

              {/* Playable Probe Trigger Bar */}
              <div className="mt-4 pt-4 border-t border-white/[0.05] flex items-center justify-between flex-wrap gap-2 text-[11px] font-mono">
                <div className="text-zinc-400 flex items-center space-x-2">
                  <Radio className="w-3.5 h-3.5 text-[#A8FF00]" />
                  <span>
                    {lastProbeSuccess
                      ? '[ORACLE PROBE: 100% CONSENSUS CONFIRMED IN 184ms]'
                      : 'Attestation Engine: Listening on Solana Devnet'}
                  </span>
                </div>

                <button
                  onClick={handleTriggerProbe}
                  disabled={isProbing}
                  className="px-3.5 py-1.5 rounded-lg bg-[#141414] hover:bg-[#1a1a1a] text-zinc-200 hover:text-white border border-white/[0.08] hover:border-[#A8FF00]/40 transition-all cursor-pointer flex items-center space-x-1.5 text-[11px]"
                >
                  <Zap className={`w-3 h-3 ${isProbing ? 'text-[#A8FF00] animate-spin' : 'text-zinc-400'}`} />
                  <span>{isProbing ? 'Probing...' : 'Simulate Oracle Probe'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. INTERACTIVE PLAYGROUND (Real-World Physical Verification)              */}
        {/* ========================================================================= */}
        <section id="playground" className="py-20 border-t border-white/[0.08]">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0B0B0B] border border-white/[0.08] mb-4">
              <span className="text-[10px] font-mono font-bold text-[#A8FF00] uppercase tracking-widest">
                LIVE INTERACTIVE PLAYGROUND
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Test Real-World Ground Truth
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-4 leading-relaxed">
              Select an active on-chain truth verification task to inspect hardware geofence telemetry, gyroscopic tremor proof, and Gemini 2.5 Flash consensus.
            </p>
          </div>

          {/* Playground Case Study Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 mb-6">
            {useCasePresets.map((preset) => {
              const isSelected = activeUseCase.id === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => setActiveUseCase(preset)}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#101010] border-[#A8FF00]/40 text-white shadow-[0_0_20px_rgba(168,255,0,0.1)]'
                      : 'bg-[#0B0B0B] border-white/[0.07] text-zinc-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 mb-1">
                    <span>{preset.category}</span>
                    <span className="text-[#A8FF00] font-bold">{preset.bounty} SOL</span>
                  </div>
                  <h4 className="text-xs font-bold text-white truncate">{preset.title}</h4>
                  <span className="text-[10px] text-zinc-500 font-mono truncate block mt-0.5">
                    {preset.location}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Live Inspection Terminal Card */}
          <div className="bg-[#0B0B0B] border border-white/[0.08] rounded-3xl p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Query Specification */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#A8FF00]/10 text-[#A8FF00] border border-[#A8FF00]/30 text-[10px] font-mono font-bold">
                    ON-CHAIN QUERY
                  </span>
                  <span className="text-xs font-mono text-zinc-400">ID: {activeUseCase.hash.slice(0, 12)}...</span>
                </div>

                <h3 className="text-xl font-bold text-white">{activeUseCase.title}</h3>
                <p className="text-xs text-zinc-300 italic bg-[#060606] p-3 rounded-xl border border-white/[0.05]">
                  "{activeUseCase.question}"
                </p>

                <div className="space-y-2 text-xs font-mono text-zinc-400">
                  <div className="flex items-center justify-between py-1 border-b border-white/[0.05]">
                    <span className="flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#A8FF00]" />
                      <span>Target Location:</span>
                    </span>
                    <strong className="text-zinc-200">{activeUseCase.location}</strong>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-white/[0.05]">
                    <span>Coordinates:</span>
                    <strong className="text-zinc-200">{activeUseCase.coords}</strong>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-white/[0.05]">
                    <span>Locked Escrow:</span>
                    <strong className="text-[#A8FF00] font-bold">{activeUseCase.bounty} SOL (Anchor PDA)</strong>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span>Validation Engine:</span>
                    <strong className="text-zinc-200">Gemini 2.5 Flash Vision</strong>
                  </div>
                </div>
              </div>

              {/* Right Column: Cryptographic Ground Truth Proof */}
              <div className="lg:col-span-7 bg-[#060606] border border-white/[0.06] rounded-2xl p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono border-b border-white/[0.06] pb-3">
                  <span className="text-zinc-400">CRYPTOGRAPHIC PROOF ATTESTATION</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#A8FF00]/10 text-[#A8FF00] border border-[#A8FF00]/30">
                    STATUS: {activeUseCase.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono">
                  <div className="bg-[#0B0B0B] p-3 rounded-xl border border-white/[0.05]">
                    <span className="text-[10px] text-zinc-400 uppercase tracking-widest block font-bold">
                      Geofence Dist
                    </span>
                    <span className="text-sm font-bold text-white mt-1 block">
                      {activeUseCase.distance}
                    </span>
                    <span className="text-[9px] text-[#A8FF00]">&lt; 200m Haversine</span>
                  </div>

                  <div className="bg-[#0B0B0B] p-3 rounded-xl border border-white/[0.05]">
                    <span className="text-[10px] text-zinc-400 uppercase tracking-widest block font-bold">
                      Gyro Tremor
                    </span>
                    <span className="text-sm font-bold text-white mt-1 block">
                      {activeUseCase.gyro}
                    </span>
                    <span className="text-[9px] text-[#A8FF00]">Human Device</span>
                  </div>

                  <div className="bg-[#0B0B0B] p-3 rounded-xl border border-white/[0.05]">
                    <span className="text-[10px] text-zinc-400 uppercase tracking-widest block font-bold">
                      AI Consensus
                    </span>
                    <span className="text-sm font-bold text-[#A8FF00] mt-1 block">
                      {activeUseCase.confidence}%
                    </span>
                    <span className="text-[9px] text-zinc-400">Gemini 2.5 Flash</span>
                  </div>

                  <div className="bg-[#0B0B0B] p-3 rounded-xl border border-white/[0.05]">
                    <span className="text-[10px] text-zinc-400 uppercase tracking-widest block font-bold">
                      Worker Payout
                    </span>
                    <span className="text-sm font-bold text-[#A8FF00] mt-1 block">
                      {(activeUseCase.bounty * 0.975).toFixed(3)}
                    </span>
                    <span className="text-[9px] text-zinc-400">97.5% Settled</span>
                  </div>
                </div>

                <div className="bg-[#0B0B0B] p-3.5 rounded-xl border border-white/[0.05] text-xs font-mono space-y-1">
                  <div className="text-zinc-400 text-[11px]">
                    Observed Reality: <strong className="text-white">{activeUseCase.answer}</strong>
                  </div>
                  <div className="text-zinc-500 text-[10px] truncate">
                    On-Chain Escrow Signature: {activeUseCase.hash}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. 4-STAGE PIPELINE ARCHITECTURE (How It Works)                           */}
        {/* ========================================================================= */}
        <section id="pipeline" className="py-20 border-t border-white/[0.08]">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0B0B0B] border border-white/[0.08] mb-4">
              <span className="text-[10px] font-mono font-bold text-[#A8FF00] uppercase tracking-widest">
                VERIFICATION PIPELINE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              From Physical Ground to Solana State
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-4 leading-relaxed">
              Every truth verification is executed across 4 deterministic, non-custodial stages.
            </p>
          </div>

          {/* 4 Pipeline Stages Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div
              onClick={() => setActivePipelineStep(1)}
              className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                activePipelineStep === 1
                  ? 'bg-[#101010] border-[#A8FF00]/40 shadow-[0_0_25px_rgba(168,255,0,0.1)]'
                  : 'bg-[#0B0B0B] border-white/[0.07] hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-[#A8FF00]">PHASE 01</span>
                <Coins className="w-5 h-5 text-[#A8FF00]" />
              </div>
              <h4 className="text-base font-bold text-white mb-2">Escrow PDA Lock</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Task Maker creates verification request and locks SOL bounty into an autonomous Anchor PDA program.
              </p>
            </div>

            <div
              onClick={() => setActivePipelineStep(2)}
              className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                activePipelineStep === 2
                  ? 'bg-[#101010] border-[#A8FF00]/40 shadow-[0_0_25px_rgba(168,255,0,0.1)]'
                  : 'bg-[#0B0B0B] border-white/[0.07] hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-[#A8FF00]">PHASE 02</span>
                <Compass className="w-5 h-5 text-[#A8FF00]" />
              </div>
              <h4 className="text-base font-bold text-white mb-2">DePIN Swarm Dispatch</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Field contributors walk into target 200m Haversine perimeter, verified via live gyroscopic hardware sensors.
              </p>
            </div>

            <div
              onClick={() => setActivePipelineStep(3)}
              className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                activePipelineStep === 3
                  ? 'bg-[#101010] border-[#A8FF00]/40 shadow-[0_0_25px_rgba(168,255,0,0.1)]'
                  : 'bg-[#0B0B0B] border-white/[0.07] hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-[#A8FF00]">PHASE 03</span>
                <Eye className="w-5 h-5 text-[#A8FF00]" />
              </div>
              <h4 className="text-base font-bold text-white mb-2">Dual-AI Consensus</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Gemini 2.5 Flash and open neural models inspect cryptographic photo evidence against question semantics.
              </p>
            </div>

            <div
              onClick={() => setActivePipelineStep(4)}
              className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                activePipelineStep === 4
                  ? 'bg-[#101010] border-[#A8FF00]/40 shadow-[0_0_25px_rgba(168,255,0,0.1)]'
                  : 'bg-[#0B0B0B] border-white/[0.07] hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-[#A8FF00]">PHASE 04</span>
                <Lock className="w-5 h-5 text-[#A8FF00]" />
              </div>
              <h4 className="text-base font-bold text-white mb-2">Instant Settlement</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Anchor program validates multi-party consensus and settles 97.5% SOL instantly to the spotter's wallet.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. THE INTERACTIVE PROBLEM / SOLUTION DEMO                                */}
        {/* ========================================================================= */}
        <section id="problem-solution" className="py-20 border-t border-white/[0.08]">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0B0B0B] border border-white/[0.08] mb-4">
              <span className="text-[10px] font-mono font-bold text-[#A8FF00] uppercase tracking-widest">
                PROBLEM VS SOLUTION
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

                  <div className="p-3.5 rounded-xl bg-black/60 border border-white/[0.04] text-[11px] leading-relaxed">
                    {isVerified ? (
                      <div className="text-zinc-300 space-y-1">
                        <p className="text-[#A8FF00] font-bold">
                          ✓ [SOLANA CONFIRMED] Anchor PDA Settled: 9WzDXw...AWWM
                        </p>
                        <p className="text-zinc-400">
                          - Geofence Distance: 12.4m (Target &lt; 200m)
                        </p>
                        <p className="text-zinc-400">
                          - Gemini 2.5 Consensus: 98.4% Match
                        </p>
                        <p className="text-zinc-400">
                          - Payout: 0.4875 SOL disbursed to field contributor
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
                          - Reason: Smart contract has zero knowledge of real-world state
                        </p>
                        <p className="text-zinc-400">
                          - Execution halted. Funds frozen in dispute.
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
                        "Cryptographic photo evidence confirmed. Hardware location within 12.4m. Gemini 2.5 consensus score 98.4%. Escrow 0.50 SOL successfully settled."
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
                      Geofence: {isVerified ? '✓ Valid (12.4m)' : '❌ None'}
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
        {/* 5. THE PROTOCOL STACK (Vertical Bento Box)                                */}
        {/* ========================================================================= */}
        <section id="protocol-stack" className="py-20 border-t border-white/[0.08] space-y-16">
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

          {/* Bento Grid: 2 Large Cards + 2 Medium Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* CARD 1: DETERMINISTIC ESCROW (Playable Slider) */}
            <div className="bg-[#0B0B0B] border border-white/[0.08] hover:border-[#A8FF00]/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-[#141414] border border-white/10 flex items-center justify-center text-[#A8FF00]">
                  <Lock className="w-5 h-5 text-[#A8FF00]" />
                </div>
                <h3 className="text-xl font-black text-white tracking-tight">
                  1. Deterministic Solana Escrow
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  Every query locks funds in an autonomous Anchor PDA program. Upon cryptographic multi-party consensus, 97.5% settles instantly to field workers while 2.5% fuels protocol liquidity.
                </p>
              </div>

              {/* Playable Escrow Split Slider */}
              <div className="bg-[#060606] border border-white/[0.06] rounded-2xl p-5 mt-6 space-y-4">
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

                <input
                  type="range"
                  min="0.10"
                  max="10.00"
                  step="0.05"
                  value={bountySliderVal}
                  onChange={(e) => setBountySliderVal(parseFloat(e.target.value))}
                  className="w-full accent-[#A8FF00] bg-zinc-800 h-2 rounded-lg cursor-pointer"
                />

                <div className="space-y-1.5">
                  <div className="h-2.5 w-full rounded-full bg-zinc-900 overflow-hidden flex">
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
                    <span>Payout (97.5%): <strong className="text-white">{workerPayout} SOL</strong></span>
                    <span>Fee (2.5%): <strong className="text-zinc-300">{protocolFee} SOL</strong></span>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 2: HARDWARE ATTESTATION (Playable 200m Radar) */}
            <div className="bg-[#0B0B0B] border border-white/[0.08] hover:border-[#A8FF00]/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-[#141414] border border-white/10 flex items-center justify-center text-[#A8FF00]">
                  <Compass className="w-5 h-5 text-[#A8FF00]" />
                </div>
                <h3 className="text-xl font-black text-white tracking-tight">
                  2. Cryptographic Hardware Attestation
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  GPS coordinates validated via strict Haversine math inside a 200m perimeter, combined with gyroscopic micro-tremor variance (&lt;0.08g) proving a live human holding a genuine camera device.
                </p>
              </div>

              {/* Playable Radar Visual */}
              <div
                onMouseEnter={() => setRadarHovered(true)}
                onMouseLeave={() => setRadarHovered(false)}
                className="bg-[#060606] border border-white/[0.06] rounded-2xl p-5 mt-6 flex flex-col items-center justify-center min-h-[200px] relative overflow-hidden group cursor-pointer"
              >
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <div
                    className={`absolute inset-0 rounded-full border border-dashed transition-all duration-700 ${
                      radarHovered
                        ? 'border-[#A8FF00]/60 scale-110 shadow-[0_0_30px_rgba(168,255,0,0.15)]'
                        : 'border-white/10'
                    }`}
                  />
                  <div className="absolute inset-5 rounded-full border border-white/[0.07]" />
                  <div className="absolute inset-10 rounded-full border border-white/[0.08]" />

                  <div className="w-3.5 h-3.5 rounded-full bg-[#A8FF00] relative flex items-center justify-center shadow-[0_0_15px_#A8FF00]">
                    <span className="absolute -inset-2 rounded-full bg-[#A8FF00]/30 animate-ping" />
                  </div>

                  <div className="absolute inset-x-0 h-px bg-white/[0.05]" />
                  <div className="absolute inset-y-0 w-px bg-white/[0.05]" />
                </div>

                <div className="mt-3 text-center font-mono text-xs space-y-0.5">
                  <div className="text-white font-bold flex items-center justify-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A8FF00]" />
                    <span>200m Haversine Perimeter: {radarHovered ? 'LOCKED (12.4m)' : 'ACTIVE'}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    Gyro Variance: <span className="text-[#A8FF00]">0.042g VALID</span> • Accuracy: ±4.8m
                  </p>
                </div>
              </div>
            </div>

            {/* CARD 3: AI VISION CONSENSUS (Playable Upload & Inference) */}
            <div className="bg-[#0B0B0B] border border-white/[0.08] hover:border-[#A8FF00]/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-[#141414] border border-white/10 flex items-center justify-center text-[#A8FF00]">
                  <Eye className="w-5 h-5 text-[#A8FF00]" />
                </div>
                <h3 className="text-xl font-black text-white tracking-tight">
                  3. Dual-Model Vision Consensus
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  Captured hardware evidence is evaluated in parallel by Gemini 2.5 Flash and open neural vision engines against the task query, returning deterministic JSON consensus scores in milliseconds.
                </p>
              </div>

              {/* Playable Mock Inference Box */}
              <div
                onClick={handleSimulateVisionInference}
                className="bg-[#060606] border border-dashed border-white/15 hover:border-[#A8FF00]/60 rounded-2xl p-5 mt-6 transition-all cursor-pointer space-y-3"
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-400">GEMINI 2.5 FLASH INFERENCE</span>
                  <span className="text-[10px] text-[#A8FF00] font-bold">CLICK TO PROBE</span>
                </div>

                {visionInferenceActive ? (
                  <div className="py-6 text-center space-y-2">
                    <Sparkles className="w-5 h-5 text-[#A8FF00] animate-spin mx-auto" />
                    <p className="text-xs font-mono text-zinc-300">
                      Analyzing scene consensus...
                    </p>
                  </div>
                ) : (
                  <div className="bg-black/60 rounded-xl p-3.5 font-mono text-[11px] leading-relaxed text-zinc-300 border border-white/[0.04] space-y-1">
                    <p className="text-[#A8FF00] font-bold">
                      {visionInferenceDone ? '✓ INFERENCE RESOLVED (142ms)' : '{ // Standby: Click box to test Gemini 2.5 Flash }'}
                    </p>
                    <p className="text-zinc-400">"status": "ACCEPTED"</p>
                    <p className="text-zinc-400">"confidence_score": 0.984</p>
                    <p className="text-zinc-400">"observed_answer": "Stall 4 is unoccupied with active green LED"</p>
                  </div>
                )}
              </div>
            </div>

            {/* CARD 4: SYBIL RESISTANCE & SLASHING */}
            <div className="bg-[#0B0B0B] border border-white/[0.08] hover:border-[#A8FF00]/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-[#141414] border border-white/10 flex items-center justify-center text-[#A8FF00]">
                  <ShieldCheck className="w-5 h-5 text-[#A8FF00]" />
                </div>
                <h3 className="text-xl font-black text-white tracking-tight">
                  4. Sybil Resistance & Slashing
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  Bad-faith submitters attempting spoofed locations or synthetic photos are slashed via cryptographic stake penalties. Spotters build portable on-chain reputation scores.
                </p>
              </div>

              <div className="bg-[#060606] border border-white/[0.06] rounded-2xl p-5 mt-6 space-y-2.5 font-mono text-xs">
                <div className="flex items-center justify-between text-zinc-300 pb-2 border-b border-white/[0.05]">
                  <span>Reputation Multiplier:</span>
                  <strong className="text-[#A8FF00]">Tier 1 Spotter (98.4%)</strong>
                </div>
                <div className="flex items-center justify-between text-zinc-300 pb-2 border-b border-white/[0.05]">
                  <span>Malicious Submission Penalty:</span>
                  <strong className="text-red-400">100% Stake Slashing</strong>
                </div>
                <div className="flex items-center justify-between text-zinc-300">
                  <span>Sensor Hash Integrity:</span>
                  <strong className="text-zinc-200">SHA-256 Nonce Unique</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. THE DEVELOPER TERMINAL (Playable API)                                  */}
        {/* ========================================================================= */}
        <section id="developer-terminal" className="py-20 border-t border-white/[0.08]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
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
                        TypeScript SDK
                      </button>
                      <button
                        onClick={() => setActiveCodeTab('rust')}
                        className={`px-3 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                          activeCodeTab === 'rust'
                            ? 'bg-[#181818] text-white font-bold border border-white/10'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        Solana CPI (Rust)
                      </button>
                      <button
                        onClick={() => setActiveCodeTab('rest')}
                        className={`px-3 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                          activeCodeTab === 'rest'
                            ? 'bg-[#181818] text-white font-bold border border-white/10'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        REST API v2
                      </button>
                    </div>
                  </div>

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
                <div className="p-5 overflow-x-auto max-h-[360px] font-mono text-xs leading-relaxed text-zinc-300">
                  <pre className="text-zinc-300 whitespace-pre font-mono">
                    {codeSnippets[activeCodeTab]}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. PROTOCOL SPECIFICATIONS STRIP                                          */}
        {/* ========================================================================= */}
        <section className="py-12 border-t border-white/[0.08]">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center font-mono text-xs">
            <div className="bg-[#0B0B0B] border border-white/[0.06] rounded-xl p-3">
              <span className="text-[10px] text-zinc-400 uppercase tracking-widest block">Framework</span>
              <strong className="text-white mt-1 block">Anchor v0.30</strong>
            </div>
            <div className="bg-[#0B0B0B] border border-white/[0.06] rounded-xl p-3">
              <span className="text-[10px] text-zinc-400 uppercase tracking-widest block">Cluster</span>
              <strong className="text-[#A8FF00] mt-1 block">Solana Devnet</strong>
            </div>
            <div className="bg-[#0B0B0B] border border-white/[0.06] rounded-xl p-3">
              <span className="text-[10px] text-zinc-400 uppercase tracking-widest block">AI Consensus</span>
              <strong className="text-white mt-1 block">Gemini 2.5 Flash</strong>
            </div>
            <div className="bg-[#0B0B0B] border border-white/[0.06] rounded-xl p-3">
              <span className="text-[10px] text-zinc-400 uppercase tracking-widest block">Geofence Math</span>
              <strong className="text-white mt-1 block">Haversine 200m</strong>
            </div>
            <div className="bg-[#0B0B0B] border border-white/[0.06] rounded-xl p-3">
              <span className="text-[10px] text-zinc-400 uppercase tracking-widest block">Anti-Spoofing</span>
              <strong className="text-white mt-1 block">&lt;0.08g Gyro Tremor</strong>
            </div>
            <div className="bg-[#0B0B0B] border border-white/[0.06] rounded-xl p-3">
              <span className="text-[10px] text-zinc-400 uppercase tracking-widest block">Treasury Split</span>
              <strong className="text-[#A8FF00] mt-1 block">97.5% / 2.5%</strong>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. THE MINIMALIST FOOTER                                                  */}
        {/* ========================================================================= */}
        <footer className="mt-16 pt-12 pb-20 border-t border-white/[0.08] relative before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[#A8FF00]/40 before:to-transparent">
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
              <button
                onClick={onLaunchProtocol}
                className="text-[#A8FF00] hover:underline cursor-pointer"
              >
                Launch App →
              </button>
            </div>
          </div>

          <div className="mt-10 text-center text-xs font-mono text-zinc-400">
            © 2026 TrueSpot Protocol. Autonomous Solana Verification Network.
          </div>
        </footer>
      </main>
    </div>
  );
};
