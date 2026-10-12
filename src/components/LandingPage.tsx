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
  // SIMULATOR INTERACTIVE STATE (Refined, Balanced, Distinctive)
  // -------------------------------------------------------------
  const [activeSimulatorTab, setActiveSimulatorTab] = useState<
    'truth' | 'hardware' | 'risk' | 'escrow' | 'agent'
  >('truth');

  // -------------------------------------------------------------
  // BLUEPRINT AUTOMATION TABLE (Balanced Proportions)
  // -------------------------------------------------------------
  const [automationRules, setAutomationRules] = useState([
    {
      id: 1,
      task: 'EV Supercharger Stall Clearance',
      perimeter: '12.4m',
      consensus: '98.4%',
      bounty: '0.35 SOL',
      active: true,
    },
    {
      id: 2,
      task: 'Infrastructure Safety Detour',
      perimeter: '18.1m',
      consensus: '99.1%',
      bounty: '0.45 SOL',
      active: true,
    },
    {
      id: 3,
      task: 'Parcel Locker Bay Operational',
      perimeter: '8.6m',
      consensus: '97.8%',
      bounty: '0.30 SOL',
      active: true,
    },
    {
      id: 4,
      task: 'Autonomous Bikeshare Dock',
      perimeter: '15.2m',
      consensus: '98.9%',
      bounty: '0.50 SOL',
      active: false,
    },
  ]);

  const toggleRule = (id: number) => {
    setAutomationRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r))
    );
  };

  // -------------------------------------------------------------
  // ONE-CLICK ACTIONS STACK STATE
  // -------------------------------------------------------------
  const [actionStatus, setActionStatus] = useState<string | null>(null);

  const handleTriggerAction = (name: string) => {
    setActionStatus(name);
    setTimeout(() => {
      setActionStatus(null);
    }, 2200);
  };

  // -------------------------------------------------------------
  // SIDE-BY-SIDE COMPARISON TOGGLE
  // -------------------------------------------------------------
  const [isVerified, setIsVerified] = useState(true);

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
        {/* 4. THE INTERACTIVE REALITY SIMULATOR                                      */}
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
              Click any verification pillar on the right to inspect real-time cryptographic attestation telemetry.
            </p>
          </div>

          {/* Simulator Container */}
          <div className="rounded-2xl bg-[#090909] border border-white/[0.08] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            {/* Top Multi-Stage Indicator */}
            <div className="w-full bg-[#141414] h-1.5 rounded-full overflow-hidden mb-8">
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
              {/* Left Column: Visual Holographic Wireframe Engine */}
              <div className="lg:col-span-6 bg-[#050505] border border-white/[0.06] rounded-xl p-6 flex flex-col items-center justify-between min-h-[340px]">
                {/* 3D Wireframe Cube with Radar Attestation */}
                <div className="relative w-44 h-44 flex items-center justify-center my-auto">
                  <svg viewBox="0 0 200 200" className="w-full h-full stroke-white/40 fill-none" strokeWidth="1.2">
                    {/* Isometric Cube Edges */}
                    <polygon points="100,30 165,65 165,135 100,170 35,135 35,65" />
                    <line x1="100" y1="100" x2="100" y2="170" />
                    <line x1="100" y1="100" x2="35" y2="65" />
                    <line x1="100" y1="100" x2="165" y2="65" />

                    {/* Dashed Inner Edges */}
                    <line x1="100" y1="30" x2="100" y2="100" strokeDasharray="3 3" />
                    <line x1="35" y1="135" x2="100" y2="100" strokeDasharray="3 3" />
                    <line x1="165" y1="135" x2="100" y2="100" strokeDasharray="3 3" />

                    {/* Vertices */}
                    <circle cx="100" cy="30" r="2" fill="white" />
                    <circle cx="165" cy="65" r="2" fill="white" />
                    <circle cx="165" cy="135" r="2" fill="white" />
                    <circle cx="100" cy="170" r="2" fill="white" />
                    <circle cx="35" cy="135" r="2" fill="white" />
                    <circle cx="35" cy="65" r="2" fill="white" />
                  </svg>

                  {/* Dynamic Glowing Accent Inside Cube */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      <polygon
                        points="95,85 110,80 115,115 100,120"
                        fill="#A8FF00"
                        className="animate-pulse opacity-85"
                      />
                      <polygon points="65,95 78,90 73,110 60,115" fill="#ffffff" className="opacity-75" />
                      <polygon points="130,85 145,95 138,115 125,105" fill="#A8FF00" className="opacity-80" />
                    </svg>
                  </div>
                </div>

                {/* Telemetry Output Bar */}
                <div className="w-full bg-[#0E0E0E] border border-white/[0.05] rounded-lg p-3 font-mono text-xs space-y-1 mt-4">
                  {activeSimulatorTab === 'truth' && (
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400">Observed Reality:</span>
                      <strong className="text-[#A8FF00]">STALL_UNOCCUPIED • GREEN_LED</strong>
                    </div>
                  )}
                  {activeSimulatorTab === 'hardware' && (
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400">Hardware Sensor Nonce:</span>
                      <strong className="text-[#A8FF00]">0.042g Tremor (Human Hand Valid)</strong>
                    </div>
                  )}
                  {activeSimulatorTab === 'risk' && (
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400">Anti-Spoofing Status:</span>
                      <strong className="text-white">EXIF Hash &amp; Geofence Verified</strong>
                    </div>
                  )}
                  {activeSimulatorTab === 'escrow' && (
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400">Anchor PDA Escrow:</span>
                      <strong className="text-[#A8FF00]">0.35 SOL (97.5% Worker Settlement)</strong>
                    </div>
                  )}
                  {activeSimulatorTab === 'agent' && (
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400">LangChain / ElizaOS:</span>
                      <strong className="text-emerald-400">Ground Truth Injected Directly</strong>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-1 border-t border-white/[0.05]">
                    <span>Geofence: 12.4m (&lt;200m Valid)</span>
                    <span className="text-zinc-400">Inference: Gemini 2.5 Flash</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Sleek Interactive Selector Stack */}
              <div className="lg:col-span-6 space-y-2.5">
                <button
                  onClick={() => setActiveSimulatorTab('truth')}
                  className={`w-full p-3.5 rounded-xl flex items-center justify-between text-left transition-all cursor-pointer ${
                    activeSimulatorTab === 'truth'
                      ? 'bg-[#151515] border border-[#A8FF00]/50 text-white shadow-[0_0_15px_rgba(168,255,0,0.1)]'
                      : 'bg-[#0E0E0E] text-zinc-400 hover:bg-[#121212] hover:text-white border border-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <CheckCircle2
                      className={`w-4 h-4 shrink-0 ${
                        activeSimulatorTab === 'truth' ? 'text-[#A8FF00]' : 'text-zinc-500'
                      }`}
                    />
                    <div>
                      <span className="text-xs font-bold block text-white">Ground Truth Observation</span>
                      <span className="text-[10px] text-zinc-500 font-mono">Multimodal AI semantic confirmation</span>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
                </button>

                <button
                  onClick={() => setActiveSimulatorTab('hardware')}
                  className={`w-full p-3.5 rounded-xl flex items-center justify-between text-left transition-all cursor-pointer ${
                    activeSimulatorTab === 'hardware'
                      ? 'bg-[#151515] border border-[#A8FF00]/50 text-white shadow-[0_0_15px_rgba(168,255,0,0.1)]'
                      : 'bg-[#0E0E0E] text-zinc-400 hover:bg-[#121212] hover:text-white border border-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Shield
                      className={`w-4 h-4 shrink-0 ${
                        activeSimulatorTab === 'hardware' ? 'text-[#A8FF00]' : 'text-zinc-500'
                      }`}
                    />
                    <div>
                      <span className="text-xs font-bold block text-white">Hardware Sensor Proof</span>
                      <span className="text-[10px] text-zinc-500 font-mono">Accelerometer micro-tremor nonces</span>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
                </button>

                <button
                  onClick={() => setActiveSimulatorTab('risk')}
                  className={`w-full p-3.5 rounded-xl flex items-center justify-between text-left transition-all cursor-pointer ${
                    activeSimulatorTab === 'risk'
                      ? 'bg-[#151515] border border-[#A8FF00]/50 text-white shadow-[0_0_15px_rgba(168,255,0,0.1)]'
                      : 'bg-[#0E0E0E] text-zinc-400 hover:bg-[#121212] hover:text-white border border-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Flag
                      className={`w-4 h-4 shrink-0 ${
                        activeSimulatorTab === 'risk' ? 'text-[#A8FF00]' : 'text-zinc-500'
                      }`}
                    />
                    <div>
                      <span className="text-xs font-bold block text-white">Anti-Spoofing &amp; Risk Guardrails</span>
                      <span className="text-[10px] text-zinc-500 font-mono">Anti-virtual camera &amp; EXIF hashing</span>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
                </button>

                <button
                  onClick={() => setActiveSimulatorTab('escrow')}
                  className={`w-full p-3.5 rounded-xl flex items-center justify-between text-left transition-all cursor-pointer ${
                    activeSimulatorTab === 'escrow'
                      ? 'bg-[#151515] border border-[#A8FF00]/50 text-white shadow-[0_0_15px_rgba(168,255,0,0.1)]'
                      : 'bg-[#0E0E0E] text-zinc-400 hover:bg-[#121212] hover:text-white border border-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Coins
                      className={`w-4 h-4 shrink-0 ${
                        activeSimulatorTab === 'escrow' ? 'text-[#A8FF00]' : 'text-zinc-500'
                      }`}
                    />
                    <div>
                      <span className="text-xs font-bold block text-white">Anchor PDA Escrow Settlement</span>
                      <span className="text-[10px] text-zinc-500 font-mono">97.5% worker / 2.5% treasury distribution</span>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
                </button>

                <button
                  onClick={() => setActiveSimulatorTab('agent')}
                  className={`w-full p-3.5 rounded-xl flex items-center justify-between text-left transition-all cursor-pointer ${
                    activeSimulatorTab === 'agent'
                      ? 'bg-[#151515] border border-[#A8FF00]/50 text-white shadow-[0_0_15px_rgba(168,255,0,0.1)]'
                      : 'bg-[#0E0E0E] text-zinc-400 hover:bg-[#121212] hover:text-white border border-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Sparkles
                      className={`w-4 h-4 shrink-0 ${
                        activeSimulatorTab === 'agent' ? 'text-[#A8FF00]' : 'text-zinc-500'
                      }`}
                    />
                    <div>
                      <span className="text-xs font-bold block text-white">Autonomous Agent Integration</span>
                      <span className="text-[10px] text-zinc-500 font-mono">Zero-hallucination ground truth feed</span>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. BLUEPRINT AUTOMATION & GUARDRAILS                                      */}
        {/* ========================================================================= */}
        <section id="automation" className="py-10 sm:py-12 border-t border-white/[0.08]">
          {/* Centered Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-7 sm:mb-8">
            <div className="inline-flex items-center space-x-2 text-[10px] font-mono font-bold text-[#A8FF00] uppercase tracking-wider mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A8FF00]" />
              <span>Protocol Actions &amp; Guardrails</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Deterministic Execution Blueprint
            </h2>
            <p className="text-xs text-zinc-400 mt-2 font-mono">
              Predefined smart contract rules that release non-custodial SOL bounties upon verified consensus.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* Card Left: Automation Table */}
            <div className="rounded-2xl bg-[#090909] border border-white/[0.08] p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-4">
                  <div className="flex items-center space-x-2 font-mono text-xs text-white font-bold">
                    <Activity className="w-4 h-4 text-[#A8FF00]" />
                    <span>Active Consensus Rules</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">Auto-Dispatch</span>
                </div>

                <div className="space-y-2">
                  {automationRules.map((rule) => (
                    <div
                      key={rule.id}
                      className="flex items-center justify-between text-xs py-2 px-3 rounded-lg bg-[#050505] border border-white/[0.05]"
                    >
                      <div className="flex items-center space-x-2.5 min-w-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#A8FF00] shrink-0" />
                        <span className="text-zinc-200 font-medium truncate">{rule.task}</span>
                      </div>

                      <div className="flex items-center space-x-3 shrink-0 ml-2 font-mono text-[11px]">
                        <span className="text-zinc-500">{rule.perimeter}</span>
                        <span className="text-white font-bold">{rule.consensus}</span>
                        <button
                          onClick={() => toggleRule(rule.id)}
                          className={`w-7 h-4 rounded-full transition-colors relative cursor-pointer ${
                            rule.active ? 'bg-[#A8FF00]' : 'bg-zinc-800'
                          }`}
                        >
                          <span
                            className={`w-3 h-3 rounded-full bg-black absolute top-0.5 transition-transform ${
                              rule.active ? 'left-3.5' : 'left-0.5'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.06] mt-4 flex items-center justify-between font-mono text-[11px]">
                <span className="text-zinc-500">Settlement Vaults: Anchor Program PDA</span>
                <span className="text-[#A8FF00] font-semibold">97.5% Contributor Release</span>
              </div>
            </div>

            {/* Card Right: Action Stack */}
            <div className="rounded-2xl bg-[#090909] border border-white/[0.08] p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-4">
                  <div className="flex items-center space-x-2 font-mono text-xs text-white font-bold">
                    <Shield className="w-4 h-4 text-[#A8FF00]" />
                    <span>Cryptographic Guardrails</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">One-Click Validation</span>
                </div>

                <div className="space-y-2">
                  {[
                    'Lock 200m Geofence Perimeter',
                    'Verify Gyroscopic Tremor Signature',
                    'Execute Gemini Multimodal Inference',
                    'Settle Anchor PDA Bounty (97.5%)',
                    'Broadcast Attestation Nonce to Devnet',
                  ].map((action, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleTriggerAction(action)}
                      className="w-full py-2.5 px-3 rounded-lg bg-[#050505] hover:bg-[#121212] border border-white/[0.05] hover:border-[#A8FF00]/40 text-left text-xs text-zinc-300 hover:text-white flex items-center justify-between transition-all cursor-pointer group"
                    >
                      <span className="font-medium">{action}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#A8FF00] group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.06] mt-4 flex items-center justify-between font-mono text-[11px]">
                <span className="text-zinc-500">Pipeline State:</span>
                <span className="text-[#A8FF00] font-bold">
                  {actionStatus ? `✓ ${actionStatus}` : 'Consensus Pipeline Ready'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. SIDE-BY-SIDE REALITY COMPARISON                                        */}
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
              Toggle below to inspect the difference between blind execution and TrueSpot attestation.
            </p>

            <div className="mt-4 inline-flex items-center p-1 rounded-full bg-[#0E0E0E] border border-white/[0.08]">
              <button
                onClick={() => setIsVerified(false)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                  !isVerified
                    ? 'bg-[#1C1C1C] text-white border border-white/10 shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Blind Contract (Legacy)
              </button>
              <button
                onClick={() => setIsVerified(true)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                  isVerified
                    ? 'bg-[#A8FF00] text-black shadow-[0_0_20px_rgba(168,255,0,0.3)]'
                    : 'text-zinc-400 hover:text-[#A8FF00]'
                }`}
              >
                <span>Verified by TrueSpot</span>
              </button>
            </div>
          </div>

          <div
            className={`rounded-2xl border transition-all duration-300 p-6 sm:p-8 ${
              isVerified
                ? 'bg-[#090909] border-[#A8FF00]/40 shadow-[0_0_35px_rgba(168,255,0,0.05)]'
                : 'bg-[#070707] border-red-500/20'
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {/* Left Column: Settlement Outcome */}
              <div className="bg-[#050505] p-5 rounded-xl border border-white/[0.06] space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-400 font-bold">SOLANA CONTRACT SETTLEMENT</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      isVerified
                        ? 'bg-[#A8FF00]/10 text-[#A8FF00] border border-[#A8FF00]/30'
                        : 'bg-red-500/10 text-red-400 border border-red-500/30'
                    }`}
                  >
                    {isVerified ? 'SETTLED VIA CONSENSUS' : 'REVERTED / EXPOSED'}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  {isVerified ? (
                    <>
                      <div className="flex items-center space-x-2 text-zinc-200">
                        <Check className="w-4 h-4 text-[#A8FF00] shrink-0" />
                        <span>Anchor PDA vault automatically unlocked upon consensus</span>
                      </div>
                      <div className="flex items-center space-x-2 text-zinc-200">
                        <Check className="w-4 h-4 text-[#A8FF00] shrink-0" />
                        <span>97.5% SOL transferred directly to authenticated worker</span>
                      </div>
                      <div className="flex items-center space-x-2 text-zinc-200">
                        <Check className="w-4 h-4 text-[#A8FF00] shrink-0" />
                        <span>Cryptographic nonce permanently sealed on Solana Devnet</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center space-x-2 text-red-400">
                        <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                        <span>Contract has zero physical sensor or location awareness</span>
                      </div>
                      <div className="flex items-center space-x-2 text-zinc-400">
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>Vulnerable to spoofed GPS, synthetic deepfakes, and claims</span>
                      </div>
                      <div className="flex items-center space-x-2 text-zinc-400">
                        <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                        <span>Bounty funds remain locked in dispute limbo indefinitely</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Right Column: AI Agent Status */}
              <div className="bg-[#050505] p-5 rounded-xl border border-white/[0.06] space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-400 font-bold">AUTONOMOUS AI AGENT STATUS</span>
                  <span className="text-[10px] text-zinc-500">LangChain / ElizaOS</span>
                </div>

                <div
                  className={`p-3.5 rounded-lg border text-xs leading-relaxed ${
                    isVerified
                      ? 'bg-[#A8FF00]/[0.04] border-[#A8FF00]/20 text-zinc-200'
                      : 'bg-red-950/[0.1] border-red-500/20 text-zinc-400'
                  }`}
                >
                  {isVerified ? (
                    <div>
                      <span className="text-[#A8FF00] font-bold block mb-1">
                        Agent: Ground truth verified via hardware sensors &amp; Gemini 2.5
                      </span>
                      Task executed with confirmed physical telemetry. Zero hallucination risk.
                    </div>
                  ) : (
                    <div>
                      <span className="text-red-400 font-bold block mb-1">
                        Agent: Cannot ascertain physical reality
                      </span>
                      Agent is blind to real-world status. Halting automated execution to prevent loss.
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 flex-wrap pt-1 text-[10px] font-mono">
                  <span
                    className={`px-2 py-0.5 rounded font-bold border ${
                      isVerified
                        ? 'bg-[#A8FF00]/10 text-[#A8FF00] border-[#A8FF00]/30'
                        : 'bg-white/[0.04] text-zinc-400 border-white/[0.06]'
                    }`}
                  >
                    Geofence: {isVerified ? 'Valid (12.4m)' : 'None'}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded font-bold border ${
                      isVerified
                        ? 'bg-[#A8FF00]/10 text-[#A8FF00] border-[#A8FF00]/30'
                        : 'bg-white/[0.04] text-zinc-400 border-white/[0.06]'
                    }`}
                  >
                    AI Vision: {isVerified ? '98.4%' : '0%'}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded font-bold border ${
                      isVerified
                        ? 'bg-[#A8FF00]/10 text-[#A8FF00] border-[#A8FF00]/30'
                        : 'bg-white/[0.04] text-zinc-400 border-white/[0.06]'
                    }`}
                  >
                    Anchor PDA: {isVerified ? 'Settled' : 'Reverted'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. DEVELOPER QUICKSTART HUB                                               */}
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: SDK Pitch & Setup */}
            <div className="lg:col-span-5 space-y-4">
              {/* Install Bar */}
              <div className="bg-[#090909] border border-white/[0.08] rounded-xl p-3 flex items-center justify-between font-mono text-xs text-zinc-300">
                <span className="text-[#A8FF00] font-semibold">$ npm i @truespot/sdk</span>
                <span className="text-[10px] text-zinc-500">v2.1.0</span>
              </div>

              <div className="space-y-2.5 font-mono text-xs text-zinc-300 pt-1">
                <div className="flex items-center space-x-2">
                  <CheckCheck className="w-3.5 h-3.5 text-[#A8FF00]" />
                  <span>Lightweight TypeScript SDK (`@truespot/sdk`)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCheck className="w-3.5 h-3.5 text-[#A8FF00]" />
                  <span>Composable Anchor CPI program calls</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCheck className="w-3.5 h-3.5 text-[#A8FF00]" />
                  <span>Open REST API v2 endpoints</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenDocs}
                  className="px-5 py-2.5 rounded-full bg-[#111111] hover:bg-[#181818] text-[#A8FF00] hover:text-white border border-white/[0.08] hover:border-[#A8FF00]/40 text-xs font-mono font-bold transition-all cursor-pointer flex items-center space-x-2"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>View Documentation</span>
                </button>
              </div>
            </div>

            {/* Right Column: Short Tabbed Terminal */}
            <div className="lg:col-span-7">
              <div className="bg-[#090909] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl">
                {/* Tabs Header */}
                <div className="flex items-center justify-between bg-[#111111] border-b border-white/[0.06] px-4 py-2">
                  <div className="flex items-center space-x-2">
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
                      Anchor (Rust)
                    </button>
                    <button
                      onClick={() => setActiveCodeTab('rest')}
                      className={`px-3 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                        activeCodeTab === 'rest'
                          ? 'bg-[#1C1C1C] text-white font-bold border border-white/10'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      REST API
                    </button>
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

                {/* Short Code Body */}
                <div className="p-4 font-mono text-xs leading-relaxed text-zinc-300">
                  <pre className="text-zinc-300 whitespace-pre font-mono">
                    {conciseSnippets[activeCodeTab]}
                  </pre>
                </div>
              </div>
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
