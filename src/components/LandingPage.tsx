import React, { useState, useEffect } from 'react';
import {
  Shield,
  Zap,
  Radio,
  Check,
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
  MapPin,
  Camera,
  Coins,
  Flag,
  FileText,
  Sliders,
  ChevronRight,
  ExternalLink,
  Info,
  ShieldAlert,
  Bot,
  Copy,
  Terminal,
  CheckCheck,
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
  // SIMULATOR INTERACTIVE STATE (Map / Dynamic Sensor Visualizer)
  // -------------------------------------------------------------
  const [activeSimulatorTab, setActiveSimulatorTab] = useState<
    'truth' | 'hardware' | 'risk' | 'escrow' | 'agent'
  >('truth');

  // -------------------------------------------------------------
  // BLUEPRINT PIPELINE EXECUTION STATE
  // -------------------------------------------------------------
  const [selectedBountyId, setSelectedBountyId] = useState<number>(1);
  const [pipelineStep, setPipelineStep] = useState<number>(0);
  const [isSimulatingPipeline, setIsSimulatingPipeline] = useState<boolean>(false);

  const bountiesList = [
    {
      id: 1,
      title: 'EV Supercharger Stall Clearance',
      category: 'Smart Mobility',
      coords: '37.7792° N, -122.4184° W',
      perimeter: '12.4m / 200m',
      consensus: '98.4%',
      bountySol: '0.35 SOL',
      status: 'VERIFIED_ON_CHAIN',
      statusBadge: 'bg-[#A8FF00]/10 text-[#A8FF00] border-[#A8FF00]/30',
    },
    {
      id: 2,
      title: 'Infrastructure Hazard Detour',
      category: 'Public Works',
      coords: '37.7833° N, -122.4167° W',
      perimeter: '18.1m / 200m',
      consensus: '99.1%',
      bountySol: '0.45 SOL',
      status: 'ESCROW_LOCKED',
      statusBadge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    },
    {
      id: 3,
      title: 'Parcel Locker Bay Operational',
      category: 'Autonomous Logistics',
      coords: '37.7750° N, -122.4201° W',
      perimeter: '8.6m / 200m',
      consensus: '97.8%',
      bountySol: '0.30 SOL',
      status: 'CONSENSUS_PENDING',
      statusBadge: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    },
    {
      id: 4,
      title: 'Autonomous Bikeshare Dock Availability',
      category: 'Micromobility',
      coords: '37.7810° N, -122.4150° W',
      perimeter: '15.2m / 200m',
      consensus: '98.9%',
      bountySol: '0.50 SOL',
      status: 'DISPATCHED_ACTIVE',
      statusBadge: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
    },
  ];

  const handleRunPipelineSimulation = () => {
    if (isSimulatingPipeline) return;
    setIsSimulatingPipeline(true);
    setPipelineStep(1);
    setTimeout(() => {
      setPipelineStep(2);
      setTimeout(() => {
        setPipelineStep(3);
        setTimeout(() => {
          setIsSimulatingPipeline(false);
        }, 1500);
      }, 900);
    }, 900);
  };

  // -------------------------------------------------------------
  // DEVELOPER QUICKSTART TABS
  // -------------------------------------------------------------
  const [activeCodeTab, setActiveCodeTab] = useState<'sdk' | 'rust' | 'rest'>('sdk');
  const [codeCopied, setCodeCopied] = useState(false);

  const conciseSnippets = {
    sdk: `// 1. Submit query with locked Anchor PDA escrow
const task = await oracle.queries.create({
  location: { lat: 37.7792, lng: -122.4184, radiusMeters: 200 },
  question: "Is EV Charger Stall 4 available right now?",
  bountySol: 0.50,
  consensusModel: "GEMINI_2_5_FLASH"
});

// 2. Listen for cryptographic proof settlement
task.onSettled((proof) => {
  console.log("Ground truth confirmed:", proof.answer, proof.confidence);
});`,

    rust: `// Anchor CPI for autonomous Solana programs
pub fn execute_with_oracle(ctx: Context<Execute>) -> Result<()> {
    let proof = &ctx.accounts.truespot_attestation;
    
    // Require valid 200m geofence & >= 95% AI consensus
    require!(proof.distance_meters <= 200, OracleError::OutOfRange);
    require!(proof.confidence_score >= 9500, OracleError::LowConfidence);
    
    msg!("Physical reality verified on-chain. Settling contract.");
    Ok(())
}`,

    rest: `// POST https://truespot.network/api/v2/queries
{
  "location": { "lat": 37.7792, "lng": -122.4184, "radius_meters": 200 },
  "question": "Is EV Stall 4 unoccupied?",
  "amount_sol": 0.50
}

// 200 OK -> { "status": "SETTLED", "answer": "YES", "confidence": 0.984 }`,
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(conciseSnippets[activeCodeTab]);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  // -------------------------------------------------------------
  // LIVE TELEMETRY
  // -------------------------------------------------------------
  const [telemetrySlot, setTelemetrySlot] = useState(510206140);
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetrySlot((prev) => prev + 1);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] font-sans selection:bg-[#A8FF00]/20 selection:text-[#A8FF00] overflow-x-hidden relative">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] bg-[#A8FF00]/[0.025] blur-[150px] rounded-full" />
        <div className="absolute top-[1600px] left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[#A8FF00]/[0.015] blur-[160px] rounded-full" />
      </div>

      {/* Floating Header Navbar */}
      <header className="sticky top-0 left-0 right-0 z-50 h-16 bg-[#050505]/90 backdrop-blur-2xl border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Brand Logo - Navigates to Landing Page */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            title="TrueSpot"
          >
            <div className="w-8 h-8 rounded-xl bg-[#A8FF00] text-black flex items-center justify-center font-black group-hover:scale-105 transition-transform shadow-[0_0_20px_rgba(168,255,0,0.3)]">
              <Shield className="w-4.5 h-4.5 text-black stroke-[2.5]" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-base tracking-tight text-white">
                TrueSpot
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#111111] text-[#A8FF00] border border-[#A8FF00]/30 font-bold tracking-wider">
                ORACLE
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold text-zinc-400">
            <a href="#platform" className="hover:text-white transition-colors">
              Pillars
            </a>
            <a href="#simulator" className="hover:text-white transition-colors">
              Simulator
            </a>
            <a href="#automation" className="hover:text-white transition-colors">
              Automation
            </a>
            <a href="#comparison" className="hover:text-white transition-colors">
              Comparison
            </a>
            <a href="#developers" className="hover:text-white transition-colors">
              Developers
            </a>
            <button
              onClick={onOpenDocs}
              className="hover:text-white transition-colors cursor-pointer text-xs font-semibold text-zinc-400"
            >
              Docs
            </button>
          </nav>

          {/* Primary Action Button */}
          <button
            onClick={onLaunchProtocol}
            className="h-9 px-5 rounded-full bg-[#A8FF00] hover:bg-[#b8ff24] text-black font-extrabold text-xs transition-all flex items-center space-x-1.5 shadow-[0_0_20px_rgba(168,255,0,0.25)] hover:shadow-[0_0_30px_rgba(168,255,0,0.4)] cursor-pointer"
          >
            <span>Launch App</span>
            <ArrowRight className="w-3.5 h-3.5 text-black" />
          </button>
        </div>
      </header>

      {/* Main Container with Structured Section Padding */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-16">
        {/* ========================================================================= */}
        {/* 1. THE HERO SECTION                                                       */}
        {/* ========================================================================= */}
        <section className="mb-10 sm:mb-12 relative rounded-3xl overflow-hidden border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] via-[#080808] to-[#050505] p-6 sm:p-10 lg:p-12 shadow-2xl text-center">
          {/* Subtle Grid Blueprint in Background */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="hero-grid-pat" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.75" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hero-grid-pat)" />
            </svg>
          </div>

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#111111] border border-white/[0.08] text-[11px] font-mono text-zinc-300 mb-5">
              <span className="w-2 h-2 rounded-full bg-[#A8FF00] animate-pulse" />
              <span>Solana Devnet Cluster • Slot #{telemetrySlot.toLocaleString()}</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08] mb-5">
              Physical Ground Truth, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-[#A8FF00]">
                Attested On-Chain.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed mb-7">
              The decentralized physical oracle bringing hardware-attested sensor validation and multimodal AI consensus to smart contracts, prediction markets, and autonomous agents.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-8 w-full sm:w-auto">
              <button
                onClick={onLaunchProtocol}
                className="h-11 px-7 rounded-full bg-[#A8FF00] hover:bg-[#b8ff24] text-black font-extrabold text-xs flex items-center justify-center space-x-2 shadow-[0_0_25px_rgba(168,255,0,0.35)] transition-all cursor-pointer w-full sm:w-auto"
              >
                <span>Launch Protocol</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>

              <button
                onClick={onOpenDocs}
                className="h-11 px-6 rounded-full bg-transparent hover:bg-white/[0.04] text-zinc-300 hover:text-white border border-white/[0.1] hover:border-white/20 text-xs font-semibold transition-all cursor-pointer flex items-center justify-center space-x-2 w-full sm:w-auto"
              >
                <span>Read Documentation</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-500" />
              </button>
            </div>

            {/* 4 Protocol Benchmark Parameters */}
            <div className="w-full pt-6 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-6 font-mono text-xs">
              <div className="text-center">
                <span className="text-[10px] text-zinc-500 uppercase block font-bold mb-1">Devnet Finality</span>
                <strong className="text-white text-sm font-semibold">&lt; 400ms RPC</strong>
              </div>
              <div className="text-center">
                <span className="text-[10px] text-zinc-500 uppercase block font-bold mb-1">Geofence Radius</span>
                <strong className="text-white text-sm font-semibold">200 Meters</strong>
              </div>
              <div className="text-center">
                <span className="text-[10px] text-zinc-500 uppercase block font-bold mb-1">Vision Consensus</span>
                <strong className="text-[#A8FF00] text-sm font-semibold">Gemini 2.5</strong>
              </div>
              <div className="text-center">
                <span className="text-[10px] text-zinc-500 uppercase block font-bold mb-1">Escrow Split</span>
                <strong className="text-[#A8FF00] text-sm font-semibold">97.5% / 2.5%</strong>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. 4 ARCHITECTURAL PILLARS (Clean, Balanced Minimalist Grid)              */}
        {/* ========================================================================= */}
        <section id="platform" className="py-10 sm:py-12 border-t border-white/[0.08]">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-9">
            <div className="inline-flex items-center space-x-2 text-[10px] font-mono font-bold text-[#A8FF00] uppercase tracking-wider mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A8FF00]" />
              <span>Core Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Engineered for Physical Certainty
            </h2>
            <p className="text-xs text-zinc-400 mt-2">
              Four cryptographic pillars bridging off-chain reality with Solana smart contracts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Speed */}
            <div className="space-y-2.5 text-center flex flex-col items-center p-5 rounded-2xl bg-[#090909] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
              <div className="h-12 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-11 h-11 stroke-white/80 fill-none" strokeWidth="1.5">
                  <circle cx="20" cy="50" r="3" fill="white" />
                  <line x1="20" y1="50" x2="80" y2="20" strokeDasharray="3 3" />
                  <line x1="20" y1="50" x2="85" y2="40" />
                  <line x1="20" y1="50" x2="85" y2="60" />
                  <line x1="20" y1="50" x2="80" y2="80" strokeDasharray="3 3" />
                  <circle cx="80" cy="20" r="2" fill="white" />
                  <circle cx="85" cy="40" r="2" fill="white" />
                  <circle cx="85" cy="60" r="2" fill="white" />
                  <circle cx="80" cy="80" r="2" fill="white" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">Speed</h3>
                <span className="text-xs font-mono font-semibold text-[#A8FF00] block mt-0.5">
                  &lt;400ms RPC Finality
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed max-w-xs">
                Deploy physical verification queries in seconds with immediate decentralized dispatch to nearby spotters.
              </p>
            </div>

            {/* 2. Scale */}
            <div className="space-y-2.5 text-center flex flex-col items-center p-5 rounded-2xl bg-[#090909] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
              <div className="h-12 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-11 h-11 stroke-white/80 fill-none" strokeWidth="1.5">
                  <ellipse cx="50" cy="30" rx="35" ry="12" />
                  <ellipse cx="50" cy="50" rx="24" ry="8" strokeDasharray="3 3" />
                  <ellipse cx="50" cy="70" rx="14" ry="5" />
                  <line x1="15" y1="30" x2="50" y2="85" />
                  <line x1="85" y1="30" x2="50" y2="85" />
                  <circle cx="50" cy="85" r="2" fill="white" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">Scale</h3>
                <span className="text-xs font-mono font-semibold text-[#A8FF00] block mt-0.5">
                  200m Micro-Perimeter
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed max-w-xs">
                Mathematical Haversine boundary filtering coordinates anywhere on the globe with sub-meter precision.
              </p>
            </div>

            {/* 3. Trust */}
            <div className="space-y-2.5 text-center flex flex-col items-center p-5 rounded-2xl bg-[#090909] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
              <div className="h-12 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-11 h-11 stroke-white/80 fill-none" strokeWidth="1.5">
                  <polygon points="50,15 85,35 85,75 50,95 15,75 15,35" />
                  <line x1="50" y1="55" x2="50" y2="95" />
                  <line x1="50" y1="55" x2="15" y2="35" />
                  <line x1="50" y1="55" x2="85" y2="35" />
                  <line x1="50" y1="15" x2="50" y2="55" strokeDasharray="3 3" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">Trust</h3>
                <span className="text-xs font-mono font-semibold text-[#A8FF00] block mt-0.5">
                  98.4% AI Consensus
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed max-w-xs">
                Multimodal Gemini vision pipeline validating photographic evidence against query semantics.
              </p>
            </div>

            {/* 4. Outcomes */}
            <div className="space-y-2.5 text-center flex flex-col items-center p-5 rounded-2xl bg-[#090909] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
              <div className="h-12 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-11 h-11 stroke-white/80 fill-none" strokeWidth="1.5">
                  <circle cx="50" cy="50" r="18" />
                  <ellipse cx="50" cy="50" rx="38" ry="14" transform="rotate(-30 50 50)" strokeDasharray="3 3" />
                  <ellipse cx="50" cy="50" rx="38" ry="14" transform="rotate(30 50 50)" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">Outcomes</h3>
                <span className="text-xs font-mono font-semibold text-[#A8FF00] block mt-0.5">
                  Instant Settlement
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed max-w-xs">
                Autonomous Anchor PDA vaults releasing 97.5% SOL bounties instantly upon consensus without friction.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. ICONIC TRANSITION STATEMENT BANNER                                     */}
        {/* ========================================================================= */}
        <section className="py-10 sm:py-12 border-t border-white/[0.08]">
          <div className="relative rounded-2xl bg-[#090909] border border-white/[0.08] py-8 sm:py-10 px-6 sm:px-10 text-center overflow-hidden shadow-xl">
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-15">
              <svg width="600" height="300" viewBox="0 0 600 300" fill="none">
                <circle cx="300" cy="150" r="140" stroke="#A8FF00" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="300" cy="150" r="90" stroke="white" strokeWidth="1" />
                <path d="M 120 150 Q 300 40 480 150" stroke="white" strokeWidth="1" fill="none" />
                <path d="M 120 150 Q 300 260 480 150" stroke="white" strokeWidth="1" fill="none" />
              </svg>
            </div>

            <div className="relative z-10 max-w-3xl mx-auto space-y-2">
              <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                Smart contracts break at the physical edge.
              </h2>
              <p className="text-lg sm:text-2xl font-extrabold text-[#A8FF00] leading-tight">
                Physical reality requires hardware-attested truth.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. THE INTERACTIVE REALITY SIMULATOR (Tactical Map & Sensor Attestation)  */}
        {/* ========================================================================= */}
        <section id="simulator" className="py-10 sm:py-12 border-t border-white/[0.08]">
          {/* Centered Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-7 sm:mb-8">
            <div className="inline-flex items-center space-x-2 text-[10px] font-mono font-bold text-[#A8FF00] uppercase tracking-wider mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A8FF00]" />
              <span>Interactive Attestation Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Reality Verification Simulator
            </h2>
            <p className="text-xs text-zinc-400 mt-2 font-mono">
              Toggle between verification vectors to inspect live tactical radar mapping, sensor waveforms, and Anchor PDA settlements.
            </p>
          </div>

          {/* Simulator Container */}
          <div className="rounded-2xl bg-[#090909] border border-white/[0.08] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            {/* Top Multi-Stage Indicator */}
            <div className="w-full bg-[#141414] h-1.5 rounded-full overflow-hidden mb-6">
              <div
                className="h-full bg-gradient-to-r from-white via-[#A8FF00] to-emerald-400 transition-all duration-500 rounded-full"
                style={{
                  width:
                    activeSimulatorTab === 'truth'
                      ? '20%'
                      : activeSimulatorTab === 'hardware'
                      ? '45%'
                      : activeSimulatorTab === 'risk'
                      ? '70%'
                      : activeSimulatorTab === 'escrow'
                      ? '85%'
                      : '100%',
                }}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Dynamic Visual Engine (Map, Oscilloscope, Hash Shield, PDA Flow, Agent Pipeline) */}
              <div className="lg:col-span-6 bg-[#050505] border border-white/[0.08] rounded-xl p-5 flex flex-col justify-between min-h-[360px] relative overflow-hidden">
                {/* Visualizer Top Bar */}
                <div className="flex items-center justify-between font-mono text-[11px] pb-3 border-b border-white/[0.06] z-10">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-[#A8FF00] animate-pulse" />
                    <span className="text-white font-bold uppercase tracking-wider">
                      {activeSimulatorTab === 'truth' && 'Tactical Radar & Geofence Map'}
                      {activeSimulatorTab === 'hardware' && 'Biometric Oscilloscope Tremor'}
                      {activeSimulatorTab === 'risk' && 'Cryptographic Anti-Spoof Enclave'}
                      {activeSimulatorTab === 'escrow' && 'Anchor Program PDA Vault Flow'}
                      {activeSimulatorTab === 'agent' && 'Autonomous Agent Ground Feed'}
                    </span>
                  </div>
                  <span className="text-zinc-500">Live Telemetry</span>
                </div>

                {/* Dynamic Screen Content */}
                <div className="relative my-4 flex-1 flex items-center justify-center min-h-[220px]">
                  {/* TAB 1: TACTICAL RADAR GEOFENCE MAP */}
                  {activeSimulatorTab === 'truth' && (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <svg viewBox="0 0 320 220" className="w-full h-full">
                        <defs>
                          <radialGradient id="radarSweep" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#A8FF00" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#A8FF00" stopOpacity="0" />
                          </radialGradient>
                          <pattern id="tacticalGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
                          </pattern>
                        </defs>

                        {/* Grid Background */}
                        <rect width="100%" height="100%" fill="url(#tacticalGrid)" />

                        {/* Simulated Map Streets / Sector Lines */}
                        <path d="M 20 60 L 300 60 M 20 160 L 300 160 M 80 10 L 80 210 M 240 10 L 240 210" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="2 4" />

                        {/* Concentric Radar Rings */}
                        <circle cx="160" cy="110" r="30" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" />
                        <circle cx="160" cy="110" r="60" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" strokeDasharray="3 3" />
                        
                        {/* 200m GEOFENCE RING */}
                        <circle cx="160" cy="110" r="90" stroke="#A8FF00" strokeWidth="1.5" fill="none" className="animate-pulse" strokeDasharray="5 3" />
                        <text x="165" y="28" fill="#A8FF00" fontSize="8" fontFamily="monospace" fontWeight="bold">
                          200M GEOFENCE PERIMETER
                        </text>

                        {/* Rotating Radar Sweep Cone */}
                        <g transform="rotate(45 160 110)">
                          <path d="M 160 110 L 250 110 A 90 90 0 0 0 223 46 Z" fill="url(#radarSweep)" />
                          <line x1="160" y1="110" x2="250" y2="110" stroke="#A8FF00" strokeWidth="1.2" strokeOpacity="0.8" />
                        </g>

                        {/* Target EV Charger Pin */}
                        <circle cx="160" cy="110" r="5" fill="#A8FF00" />
                        <circle cx="160" cy="110" r="10" stroke="#A8FF00" strokeWidth="1" fill="none" opacity="0.6" />
                        <text x="160" y="128" fill="#FFFFFF" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                          EV STALL 4 [37.7792° N, -122.4184° W]
                        </text>

                        {/* Physical Spotter Node */}
                        <g transform="translate(178, 98)">
                          <circle cx="0" cy="0" r="3.5" fill="#38BDF8" className="animate-ping opacity-75" />
                          <circle cx="0" cy="0" r="3.5" fill="#38BDF8" />
                          <text x="6" y="-3" fill="#38BDF8" fontSize="7" fontFamily="monospace" fontWeight="bold">
                            SPOTTER (12.4m)
                          </text>
                        </g>

                        {/* Haversine Distance Line */}
                        <line x1="160" y1="110" x2="178" y2="98" stroke="#38BDF8" strokeWidth="1" strokeDasharray="2 2" />
                      </svg>
                    </div>
                  )}

                  {/* TAB 2: HARDWARE ACCELEROMETER OSCILLOSCOPE */}
                  {activeSimulatorTab === 'hardware' && (
                    <div className="w-full h-full flex flex-col justify-center">
                      <div className="relative w-full h-32 bg-[#090909] rounded-lg border border-white/[0.08] p-3 overflow-hidden">
                        {/* Oscilloscope Grid */}
                        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />

                        {/* Sine Wave Curve */}
                        <svg viewBox="0 0 300 100" className="w-full h-full relative z-10">
                          <path
                            d="M 0 50 Q 25 20, 50 50 T 100 50 T 150 50 T 200 50 T 250 50 T 300 50"
                            fill="none"
                            stroke="#A8FF00"
                            strokeWidth="2.5"
                          />
                          <path
                            d="M 0 50 Q 20 35, 40 50 T 80 50 T 120 50 T 160 50 T 200 50 T 240 50 T 280 50 T 300 50"
                            fill="none"
                            stroke="#38BDF8"
                            strokeWidth="1.2"
                            strokeOpacity="0.7"
                          />
                          <circle cx="200" cy="50" r="4" fill="#A8FF00" className="animate-ping" />
                        </svg>

                        <div className="absolute bottom-2 left-3 font-mono text-[9px] text-[#A8FF00] z-20 flex items-center space-x-3">
                          <span>8.4 Hz Micro-Tremor</span>
                          <span className="text-zinc-400">0.042g RMS</span>
                          <span className="text-white">Human Biometric Nonce Verified</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: CRYPTOGRAPHIC ANTI-SPOOF ENCLAVE */}
                  {activeSimulatorTab === 'risk' && (
                    <div className="w-full h-full flex flex-col justify-center space-y-2">
                      <div className="bg-[#090909] border border-white/[0.08] rounded-lg p-3 font-mono text-[11px] space-y-2">
                        <div className="flex items-center justify-between pb-1.5 border-b border-white/[0.05]">
                          <span className="text-zinc-400">EXIF SHA-256 Seal:</span>
                          <span className="text-[#A8FF00] font-bold truncate max-w-[180px]">e3b0c44298fc1c149afb...</span>
                        </div>
                        <div className="flex items-center justify-between pb-1.5 border-b border-white/[0.05]">
                          <span className="text-zinc-400">GPS Mock Provider Check:</span>
                          <span className="text-emerald-400 font-bold">PASSED (Hardware GPS Only)</span>
                        </div>
                        <div className="flex items-center justify-between pb-1.5 border-b border-white/[0.05]">
                          <span className="text-zinc-400">Synthetic Deepfake Score:</span>
                          <span className="text-emerald-400 font-bold">0.00% (Raw Sensor Match)</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-zinc-400">Security Enclave Status:</span>
                          <span className="text-[#A8FF00] font-bold">Hardware Keystore Signed</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: ANCHOR PDA ESCROW VAULT FLOW */}
                  {activeSimulatorTab === 'escrow' && (
                    <div className="w-full h-full flex flex-col justify-center">
                      <div className="bg-[#090909] border border-[#A8FF00]/30 rounded-lg p-4 font-mono text-xs space-y-3">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-zinc-400">Solana Program PDA:</span>
                          <span className="text-white font-bold">TrueSpotEscrow1111111111111</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/[0.06]">
                          <div className="bg-[#050505] p-2.5 rounded border border-[#A8FF00]/40">
                            <span className="text-[10px] text-zinc-400 block">Worker Settlement (97.5%)</span>
                            <span className="text-[#A8FF00] text-sm font-black">0.34125 SOL</span>
                            <span className="text-[9px] text-emerald-400 block mt-0.5">✓ Released Instantly</span>
                          </div>
                          <div className="bg-[#050505] p-2.5 rounded border border-white/[0.06]">
                            <span className="text-[10px] text-zinc-400 block">Protocol Reserve (2.5%)</span>
                            <span className="text-zinc-300 text-sm font-black">0.00875 SOL</span>
                            <span className="text-[9px] text-zinc-500 block mt-0.5">Treasury Pool</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 5: AUTONOMOUS AGENT INTEGRATION */}
                  {activeSimulatorTab === 'agent' && (
                    <div className="w-full h-full flex flex-col justify-center">
                      <div className="bg-[#090909] border border-white/[0.08] rounded-lg p-3 font-mono text-[11px] space-y-2">
                        <div className="flex items-center justify-between text-zinc-400 pb-1.5 border-b border-white/[0.05]">
                          <span>Agent Bus: ElizaOS / LangChain</span>
                          <span className="text-[#A8FF00]">FEED_ACTIVE</span>
                        </div>
                        <pre className="text-zinc-300 text-[10px] bg-[#050505] p-2 rounded overflow-x-auto">
{`{
  "reality_event": "STALL_UNOCCUPIED",
  "confidence": 0.984,
  "geofence_meters": 12.4,
  "decision": "DISPATCH_AUTONOMOUS_VEHICLE"
}`}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>

                {/* Telemetry Output Bar */}
                <div className="w-full bg-[#0E0E0E] border border-white/[0.05] rounded-lg p-2.5 font-mono text-[11px] space-y-1 z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Oracle Attestation:</span>
                    <strong className="text-[#A8FF00]">
                      {activeSimulatorTab === 'truth' && 'Haversine 12.4m < 200m • Gemini 98.4% Match'}
                      {activeSimulatorTab === 'hardware' && 'Physiological Hand Tremor Confirmed'}
                      {activeSimulatorTab === 'risk' && 'Zero Emulation • Cryptographic Nonce Sealed'}
                      {activeSimulatorTab === 'escrow' && 'Anchor CPI Vault Released (0.35 SOL)'}
                      {activeSimulatorTab === 'agent' && 'Physical Ground Truth Injected into Agent'}
                    </strong>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1 border-t border-white/[0.05]">
                    <span>Slot: #{telemetrySlot.toLocaleString()}</span>
                    <span>Devnet Finality: &lt;400ms</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Sleek Interactive Selector Stack */}
              <div className="lg:col-span-6 space-y-2.5">
                {[
                  {
                    id: 'truth',
                    num: '01',
                    title: 'Tactical Radar & Geofence Map',
                    subtitle: '200m circular Haversine perimeter & live spotter location',
                    icon: MapPin,
                    tag: '200m Radius',
                  },
                  {
                    id: 'hardware',
                    num: '02',
                    title: 'Hardware Sensor Tremor Proof',
                    subtitle: 'Accelerometer micro-tremor biometric proof of physical human',
                    icon: Activity,
                    tag: '0.042g Nonce',
                  },
                  {
                    id: 'risk',
                    num: '03',
                    title: 'Anti-Spoofing & EXIF Enclave',
                    subtitle: 'Cryptographic hash sealing against synthetic media & GPS fakes',
                    icon: Shield,
                    tag: 'SHA-256',
                  },
                  {
                    id: 'escrow',
                    num: '04',
                    title: 'Anchor PDA Escrow Settlement',
                    subtitle: 'Autonomous CPI split: 97.5% contributor payout / 2.5% protocol',
                    icon: Coins,
                    tag: '97.5% SOL',
                  },
                  {
                    id: 'agent',
                    num: '05',
                    title: 'Autonomous Agent Integration',
                    subtitle: 'Direct ground truth ingestion for ElizaOS & LangChain agents',
                    icon: Sparkles,
                    tag: 'Zero-Hallucination',
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSimulatorTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSimulatorTab(item.id as any)}
                      className={`w-full p-3.5 rounded-xl flex items-center justify-between text-left transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#151515] border border-[#A8FF00]/60 text-white shadow-[0_0_15px_rgba(168,255,0,0.12)]'
                          : 'bg-[#0E0E0E] text-zinc-400 hover:bg-[#121212] hover:text-white border border-white/[0.05]'
                      }`}
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <span
                          className={`font-mono text-xs font-bold shrink-0 ${
                            isActive ? 'text-[#A8FF00]' : 'text-zinc-600'
                          }`}
                        >
                          {item.num}
                        </span>
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            isActive
                              ? 'bg-[#A8FF00]/10 text-[#A8FF00] border border-[#A8FF00]/30'
                              : 'bg-white/[0.04] text-zinc-400 border border-white/[0.06]'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-bold block text-white truncate">
                            {item.title}
                          </span>
                          <span className="text-[10px] text-zinc-500 font-mono truncate block">
                            {item.subtitle}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded shrink-0 ml-2 font-bold ${
                          isActive
                            ? 'bg-[#A8FF00] text-black'
                            : 'bg-white/[0.04] text-zinc-400 border border-white/[0.06]'
                        }`}
                      >
                        {item.tag}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. BLUEPRINT AUTOMATION & REAL-TIME PROTOCOL ATTESTATION MATRIX          */}
        {/* ========================================================================= */}
        <section id="automation" className="py-10 sm:py-12 border-t border-white/[0.08]">
          {/* Centered Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-7 sm:mb-8">
            <div className="inline-flex items-center space-x-2 text-[10px] font-mono font-bold text-[#A8FF00] uppercase tracking-wider mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A8FF00]" />
              <span>Protocol Automation Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Deterministic Execution Blueprint
            </h2>
            <p className="text-xs text-zinc-400 mt-2 font-mono">
              Autonomous smart contract rules that ingest physical ground truth and release non-custodial SOL bounties upon cryptographic consensus.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Card: Active Attestation Stream */}
            <div className="lg:col-span-5 rounded-2xl bg-[#090909] border border-white/[0.08] p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-3 font-mono text-xs">
                  <div className="flex items-center space-x-2 text-white font-bold">
                    <Activity className="w-4 h-4 text-[#A8FF00]" />
                    <span>Live Attestation Bounties</span>
                  </div>
                  <span className="text-[10px] text-zinc-500">Auto-Dispatched</span>
                </div>

                <div className="space-y-2.5">
                  {bountiesList.map((bounty) => {
                    const isSelected = selectedBountyId === bounty.id;
                    return (
                      <div
                        key={bounty.id}
                        onClick={() => setSelectedBountyId(bounty.id)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#121212] border-[#A8FF00]/50 shadow-[0_0_15px_rgba(168,255,0,0.08)]'
                            : 'bg-[#050505] border-white/[0.05] hover:border-white/10'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-mono text-zinc-400">{bounty.category}</span>
                          <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${bounty.statusBadge}`}>
                            {bounty.status}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-white mb-2">{bounty.title}</h4>
                        <div className="flex items-center justify-between font-mono text-[11px] pt-1.5 border-t border-white/[0.04]">
                          <span className="text-zinc-400">{bounty.perimeter}</span>
                          <span className="text-[#A8FF00] font-bold">{bounty.bountySol}</span>
                          <span className="text-white font-semibold">{bounty.consensus}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.06] mt-3 flex items-center justify-between font-mono text-[10px] text-zinc-500">
                <span>Cluster: Solana Devnet</span>
                <span className="text-[#A8FF00] font-bold">Autonomous Settlement</span>
              </div>
            </div>

            {/* Right Card: 3-Stage Deterministic Verification Engine */}
            <div className="lg:col-span-7 rounded-2xl bg-[#090909] border border-white/[0.08] p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-4 font-mono text-xs">
                  <div className="flex items-center space-x-2 text-white font-bold">
                    <Shield className="w-4 h-4 text-[#A8FF00]" />
                    <span>3-Stage Attestation Pipeline</span>
                  </div>
                  <span className="text-[10px] text-[#A8FF00] font-semibold">
                    {isSimulatingPipeline ? `Executing Stage ${pipelineStep}/3...` : 'Ready to Attest'}
                  </span>
                </div>

                {/* 3 Pipeline Stages */}
                <div className="space-y-3">
                  {/* Stage 1: Geofence Lock */}
                  <div className={`p-3.5 rounded-xl border transition-all ${
                    pipelineStep >= 1 ? 'bg-[#121212] border-[#A8FF00]/50' : 'bg-[#050505] border-white/[0.05]'
                  }`}>
                    <div className="flex items-center justify-between font-mono text-xs mb-1">
                      <div className="flex items-center space-x-2 font-bold text-white">
                        <span className="w-5 h-5 rounded-full bg-[#181818] border border-white/10 flex items-center justify-center text-[10px] text-[#A8FF00]">1</span>
                        <span>Perimeter Geofence Lock</span>
                      </div>
                      <span className="text-[10px] text-zinc-400 font-mono">Haversine 200m</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 pl-7 leading-relaxed">
                      Mathematical validation ensuring the spotter’s GPS sensor is within the 200m perimeter barrier.
                    </p>
                  </div>

                  {/* Stage 2: Hardware Sensor & Gemini Consensus */}
                  <div className={`p-3.5 rounded-xl border transition-all ${
                    pipelineStep >= 2 ? 'bg-[#121212] border-[#A8FF00]/50' : 'bg-[#050505] border-white/[0.05]'
                  }`}>
                    <div className="flex items-center justify-between font-mono text-xs mb-1">
                      <div className="flex items-center space-x-2 font-bold text-white">
                        <span className="w-5 h-5 rounded-full bg-[#181818] border border-white/10 flex items-center justify-center text-[10px] text-[#A8FF00]">2</span>
                        <span>Sensor Proof &amp; Gemini 2.5 Consensus</span>
                      </div>
                      <span className="text-[10px] text-zinc-400 font-mono">0.042g + Multimodal</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 pl-7 leading-relaxed">
                      Biometric accelerometer tremor confirms live human presence while Gemini vision AI confirms visual match.
                    </p>
                  </div>

                  {/* Stage 3: Anchor PDA Escrow Settlement */}
                  <div className={`p-3.5 rounded-xl border transition-all ${
                    pipelineStep >= 3 ? 'bg-[#121212] border-[#A8FF00]/50' : 'bg-[#050505] border-white/[0.05]'
                  }`}>
                    <div className="flex items-center justify-between font-mono text-xs mb-1">
                      <div className="flex items-center space-x-2 font-bold text-white">
                        <span className="w-5 h-5 rounded-full bg-[#181818] border border-white/10 flex items-center justify-center text-[10px] text-[#A8FF00]">3</span>
                        <span>Anchor PDA Bounty Settlement</span>
                      </div>
                      <span className="text-[10px] text-[#A8FF00] font-mono font-bold">97.5% Payout</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 pl-7 leading-relaxed">
                      Non-custodial smart contract CPI unseals escrow and delivers bounty directly to authenticated worker wallet.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button & Live Status */}
              <div className="pt-4 border-t border-white/[0.06] mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={handleRunPipelineSimulation}
                  disabled={isSimulatingPipeline}
                  className="w-full sm:w-auto h-10 px-5 rounded-full bg-[#A8FF00] hover:bg-[#b8ff24] text-black font-extrabold text-xs flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(168,255,0,0.25)] transition-all cursor-pointer disabled:opacity-60"
                >
                  <Zap className="w-3.5 h-3.5 fill-black" />
                  <span>{isSimulatingPipeline ? 'Verifying Attestation...' : 'Simulate Protocol Attestation'}</span>
                </button>

                <div className="font-mono text-[11px] text-zinc-400 text-right">
                  {pipelineStep === 3 ? (
                    <span className="text-[#A8FF00] font-bold">✓ Attestation Sealed on Devnet</span>
                  ) : isSimulatingPipeline ? (
                    <span className="text-white font-semibold">Validating Stage {pipelineStep}...</span>
                  ) : (
                    <span>Ready for Attestation Dispatch</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. SIDE-BY-SIDE REALITY COMPARISON (Constrained Breadth & Balanced)       */}
        {/* ========================================================================= */}
        <section id="comparison" className="py-10 sm:py-12 border-t border-white/[0.08]">
          <div className="text-center max-w-2xl mx-auto mb-7 sm:mb-8">
            <span className="text-[10px] font-mono font-bold text-[#A8FF00] uppercase tracking-widest block mb-1">
              SECURITY AUDIT
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Smart Contracts Are Blind to Reality
            </h2>
            <p className="text-xs text-zinc-400 mt-2">
              Without physical attestations, on-chain execution relies on vulnerable off-chain trust assumptions.
            </p>
          </div>

          {/* Balanced Side-by-Side Dual Card Grid - max-w-4xl eliminates awkward lengthy gaps */}
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
            {/* Left Card: Blind Contract (Legacy) */}
            <div className="rounded-2xl bg-[#080808] border border-red-500/20 p-5 sm:p-6 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between font-mono text-xs pb-3 border-b border-red-500/10 mb-4">
                  <div className="flex items-center space-x-2 text-zinc-300 font-bold">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    <span>Blind Smart Contract</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/10 text-red-400 border border-red-500/30">
                    EXPOSED
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-start space-x-2.5 text-zinc-300">
                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span><strong>Zero Physical Awareness:</strong> Contracts cannot verify real-world hardware status or physical state.</span>
                  </div>
                  <div className="flex items-start space-x-2.5 text-zinc-300">
                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span><strong>Vulnerable to Spoofing:</strong> Exploitable by virtual GPS simulators, AI deepfakes, and forged data.</span>
                  </div>
                  <div className="flex items-start space-x-2.5 text-zinc-300">
                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span><strong>Dispute Limbo:</strong> Escrow deposits remain frozen in manual dispute arbitration indefinitely.</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-red-500/10">
                <div className="bg-red-950/20 border border-red-500/20 rounded-lg p-2.5 font-mono text-[11px] text-red-300">
                  <span className="font-bold block text-red-400 mb-0.5">Autonomous AI Agent Failure:</span>
                  Agent is blind to real-world status. Halting automated execution to prevent asset loss.
                </div>
              </div>
            </div>

            {/* Right Card: Verified by TrueSpot */}
            <div className="rounded-2xl bg-[#090909] border border-[#A8FF00]/40 p-5 sm:p-6 flex flex-col justify-between shadow-[0_0_35px_rgba(168,255,0,0.06)]">
              <div>
                <div className="flex items-center justify-between font-mono text-xs pb-3 border-b border-[#A8FF00]/15 mb-4">
                  <div className="flex items-center space-x-2 text-white font-bold">
                    <Shield className="w-4 h-4 text-[#A8FF00]" />
                    <span>Verified by TrueSpot</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#A8FF00]/10 text-[#A8FF00] border border-[#A8FF00]/30">
                    ATTESTED ON-CHAIN
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-start space-x-2.5 text-zinc-200">
                    <Check className="w-4 h-4 text-[#A8FF00] shrink-0 mt-0.5" />
                    <span><strong>200m Mathematical Geofence:</strong> Haversine coordinate validation with sub-meter precision.</span>
                  </div>
                  <div className="flex items-start space-x-2.5 text-zinc-200">
                    <Check className="w-4 h-4 text-[#A8FF00] shrink-0 mt-0.5" />
                    <span><strong>Hardware Tremor Proof:</strong> Biometric accelerometer nonces guarantee physical human presence.</span>
                  </div>
                  <div className="flex items-start space-x-2.5 text-zinc-200">
                    <Check className="w-4 h-4 text-[#A8FF00] shrink-0 mt-0.5" />
                    <span><strong>Instant Anchor Settlement:</strong> 97.5% SOL bounties released autonomously upon 98.4% consensus.</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#A8FF00]/15">
                <div className="bg-[#A8FF00]/[0.05] border border-[#A8FF00]/25 rounded-lg p-2.5 font-mono text-[11px] text-zinc-200">
                  <span className="font-bold block text-[#A8FF00] mb-0.5">Autonomous AI Agent Verified:</span>
                  Task executed with confirmed physical telemetry. Zero hallucination risk.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. DEVELOPER QUICKSTART HUB (Balanced Terminal Console)                  */}
        {/* ========================================================================= */}
        <section id="developers" className="py-10 sm:py-12 border-t border-white/[0.08]">
          <div className="text-center max-w-2xl mx-auto mb-7 sm:mb-8">
            <span className="text-[10px] font-mono font-bold text-[#A8FF00] uppercase tracking-widest block mb-1">
              DEVELOPER INTEGRATION
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Integrate Physical Ground Truth in 3 Lines
            </h2>
            <p className="text-xs text-zinc-400 mt-2">
              Connect your AI agents or Solana programs to physical reality with our lightweight TypeScript SDK or composable Anchor CPI instructions.
            </p>
          </div>

          {/* Unified Terminal Console - max-w-4xl eliminates awkward lengthy gaps */}
          <div className="max-w-4xl mx-auto bg-[#090909] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl">
            {/* Terminal Top Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between bg-[#111111] border-b border-white/[0.06] px-4 py-2.5 gap-2.5">
              <div className="flex items-center space-x-3">
                {/* Window Dots */}
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>

                {/* Tabs */}
                <div className="flex items-center space-x-1.5 pl-2">
                  <button
                    onClick={() => setActiveCodeTab('sdk')}
                    className={`px-3 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                      activeCodeTab === 'sdk'
                        ? 'bg-[#1C1C1C] text-white font-bold border border-white/10'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    TypeScript SDK
                  </button>
                  <button
                    onClick={() => setActiveCodeTab('rust')}
                    className={`px-3 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                      activeCodeTab === 'rust'
                        ? 'bg-[#1C1C1C] text-white font-bold border border-white/10'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Anchor CPI (Rust)
                  </button>
                  <button
                    onClick={() => setActiveCodeTab('rest')}
                    className={`px-3 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                      activeCodeTab === 'rest'
                        ? 'bg-[#1C1C1C] text-white font-bold border border-white/10'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    REST API v2
                  </button>
                </div>
              </div>

              {/* Install Command & Copy */}
              <div className="flex items-center space-x-2">
                <div className="bg-[#050505] border border-white/[0.06] rounded-lg px-2.5 py-1 font-mono text-[11px] text-zinc-300 flex items-center space-x-2">
                  <span className="text-[#A8FF00]">$ npm i @truespot/sdk</span>
                  <span className="text-zinc-600">v2.1.0</span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center space-x-1.5 text-[11px] font-mono text-zinc-400 hover:text-white px-2.5 py-1 rounded bg-[#181818] border border-white/[0.06] cursor-pointer transition-colors"
                >
                  {codeCopied ? (
                    <>
                      <Check className="w-3 h-3 text-[#A8FF00]" />
                      <span className="text-[#A8FF00]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Code Body */}
            <div className="p-5 font-mono text-xs leading-relaxed text-zinc-300 bg-[#060606] overflow-x-auto">
              <pre className="text-zinc-300 whitespace-pre font-mono">
                {conciseSnippets[activeCodeTab]}
              </pre>
            </div>

            {/* Terminal Bottom Integration Specs Strip */}
            <div className="flex flex-col sm:flex-row items-center justify-between bg-[#0C0C0C] border-t border-white/[0.06] px-5 py-3 gap-3 font-mono text-xs">
              <div className="flex items-center space-x-4 text-[11px] text-zinc-400">
                <div className="flex items-center space-x-1.5">
                  <CheckCheck className="w-3.5 h-3.5 text-[#A8FF00]" />
                  <span>&lt;400ms RPC</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCheck className="w-3.5 h-3.5 text-[#A8FF00]" />
                  <span>Anchor CPI Composable</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCheck className="w-3.5 h-3.5 text-[#A8FF00]" />
                  <span>Zero-Hallucination Feed</span>
                </div>
              </div>

              <button
                onClick={onOpenDocs}
                className="text-[#A8FF00] hover:text-white font-mono text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
              >
                <span>Read Complete Documentation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. MINIMALIST FOOTER                                                      */}
        {/* ========================================================================= */}
        <footer className="pt-8 sm:pt-10 border-t border-white/[0.08]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="w-8 h-8 rounded-xl bg-[#A8FF00] text-black flex items-center justify-center font-bold">
                <Shield className="w-4.5 h-4.5 text-black stroke-[2.5]" />
              </div>
              <span className="font-extrabold text-base tracking-tight text-white">
                TrueSpot
              </span>
            </div>

            <div className="flex items-center space-x-8 text-xs font-semibold text-zinc-400">
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
                Docs
              </button>
              <button
                onClick={onLaunchProtocol}
                className="text-[#A8FF00] hover:underline font-bold cursor-pointer"
              >
                Launch App →
              </button>
            </div>
          </div>

          <div className="mt-8 text-center text-xs font-mono text-zinc-600">
            © 2026 TrueSpot. Decentralized Ground Truth Architecture.
          </div>
        </footer>
      </main>
    </div>
  );
};
