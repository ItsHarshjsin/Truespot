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
              Verification
            </a>
            <a href="#automation" className="hover:text-white transition-colors">
              Deployments
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
        {/* ========================================================================= */}
        {/* ========================================================================= */}
        {/* 4. ORACLE EYE TOPOLOGY MAP (Cyera-Inspired Bold Headline Floating Pills)   */}
        {/* ========================================================================= */}
        <section id="simulator" className="py-10 sm:py-12 border-t border-white/[0.08]">
          {/* Centered Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-9">
            <div className="inline-flex items-center space-x-2 text-[10px] font-mono font-bold text-[#A8FF00] uppercase tracking-wider mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A8FF00]" />
              <span>Oracle Topology Network</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Cryptographic Reality Network
            </h2>
            <p className="text-xs text-zinc-400 mt-2 font-mono">
              Four hardware &amp; algorithmic proof vectors anchored directly to physical ground truth on Solana.
            </p>
          </div>

          {/* Connected Network Map Canvas */}
          <div className="max-w-5xl mx-auto rounded-2xl bg-[#090909] border border-white/[0.08] relative overflow-hidden p-6 sm:p-10 shadow-2xl">
            {/* Desktop & Tablet: Connected Oracle Eye Constellation Diagram */}
            <div className="relative min-h-[460px] hidden md:flex items-center justify-center">
              {/* Background Coordinate Grid, Oracle Eye Iris & Radiating Dashed Connectors */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 460" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <pattern id="diagGrid" width="28" height="28" patternUnits="userSpaceOnUse">
                    <path d="M 28 0 L 0 0 0 28" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.8" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#diagGrid)" />

                {/* THE ORACLE EYE: Iconic sweeping eyelid contours */}
                <path d="M 100 230 C 260 90, 540 90, 700 230" fill="none" stroke="#A8FF00" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="5 5" />
                <path d="M 100 230 C 260 370, 540 370, 700 230" fill="none" stroke="#A8FF00" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="5 5" />

                {/* Concentric Oracle Iris & Range Rings */}
                <circle cx="400" cy="230" r="140" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 4" fill="none" />
                <circle cx="400" cy="230" r="85" stroke="#A8FF00" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="4 4" fill="rgba(168,255,0,0.015)" />
                <circle cx="400" cy="230" r="45" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none" />

                {/* Dashed Connector Rays from Central POI to the 4 Satellite Headline Pills */}
                <line x1="400" y1="230" x2="210" y2="90" stroke="#A8FF00" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="400" y1="230" x2="590" y2="90" stroke="#A8FF00" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="400" y1="230" x2="210" y2="370" stroke="#A8FF00" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="400" y1="230" x2="590" y2="370" stroke="#A8FF00" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="4 4" />

                {/* Geometric Wireframe Crystals (Inspired by Cyera diagram aesthetic) */}
                <g transform="translate(45, 190) scale(0.65)" stroke="rgba(255,255,255,0.18)" fill="none" strokeWidth="1">
                  <polygon points="30,0 60,25 45,60 15,60 0,25" />
                  <line x1="30" y1="0" x2="30" y2="40" />
                  <line x1="60" y1="25" x2="30" y2="40" />
                  <line x1="45" y1="60" x2="30" y2="40" />
                  <line x1="15" y1="60" x2="30" y2="40" />
                  <line x1="0" y1="25" x2="30" y2="40" />
                </g>
                <g transform="translate(710, 175) scale(0.65)" stroke="rgba(168,255,0,0.22)" fill="none" strokeWidth="1">
                  <polygon points="30,0 60,25 45,60 15,60 0,25" />
                  <line x1="30" y1="0" x2="30" y2="40" />
                  <line x1="60" y1="25" x2="30" y2="40" />
                  <line x1="45" y1="60" x2="30" y2="40" />
                  <line x1="15" y1="60" x2="30" y2="40" />
                  <line x1="0" y1="25" x2="30" y2="40" />
                </g>
              </svg>

              {/* Central Physical POI Headline Pill (Oracle Eye Center) */}
              <div className="z-20 bg-[#0E0E0E] border-2 border-[#A8FF00] shadow-[0_0_35px_rgba(168,255,0,0.3)] rounded-full px-6 py-3.5 flex items-center space-x-3 cursor-default hover:scale-105 transition-transform">
                <div className="w-2.5 h-2.5 rounded-full bg-[#A8FF00] shadow-[0_0_12px_#A8FF00] animate-pulse" />
                <span className="text-sm md:text-base font-black text-white tracking-tight uppercase">
                  Physical Ground Truth
                </span>
                <span className="text-[10px] font-mono font-bold text-zinc-300 bg-white/[0.08] px-2.5 py-0.5 rounded-full border border-white/10">
                  37.7792° N, -122.4184° W
                </span>
              </div>

              {/* Node 01: Top-Left Headline Pill */}
              <div className="absolute top-8 left-6 md:top-10 md:left-12 z-10 bg-[#0E0E0E]/95 backdrop-blur-md border border-white/20 hover:border-[#A8FF00] shadow-[0_4px_25px_rgba(0,0,0,0.8)] rounded-full px-5 py-2.5 flex items-center space-x-2.5 hover:scale-105 transition-all cursor-default group">
                <div className="w-6 h-6 rounded-full bg-[#A8FF00]/15 flex items-center justify-center text-[#A8FF00] group-hover:bg-[#A8FF00] group-hover:text-black transition-colors">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs md:text-sm font-bold text-white tracking-wide">
                  200m Spatial Geofence
                </span>
                <span className="text-[10px] font-mono text-[#A8FF00] font-bold">≤ 200m</span>
              </div>

              {/* Node 02: Top-Right Headline Pill */}
              <div className="absolute top-8 right-6 md:top-10 md:right-12 z-10 bg-[#0E0E0E]/95 backdrop-blur-md border border-white/20 hover:border-[#A8FF00] shadow-[0_4px_25px_rgba(0,0,0,0.8)] rounded-full px-5 py-2.5 flex items-center space-x-2.5 hover:scale-105 transition-all cursor-default group">
                <div className="w-6 h-6 rounded-full bg-[#A8FF00]/15 flex items-center justify-center text-[#A8FF00] group-hover:bg-[#A8FF00] group-hover:text-black transition-colors">
                  <Activity className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs md:text-sm font-bold text-white tracking-wide">
                  8.4 Hz Hardware Tremor
                </span>
                <span className="text-[10px] font-mono text-[#A8FF00] font-bold">0.042g</span>
              </div>

              {/* Node 03: Bottom-Left Headline Pill */}
              <div className="absolute bottom-8 left-6 md:bottom-10 md:left-12 z-10 bg-[#0E0E0E]/95 backdrop-blur-md border border-white/20 hover:border-[#A8FF00] shadow-[0_4px_25px_rgba(0,0,0,0.8)] rounded-full px-5 py-2.5 flex items-center space-x-2.5 hover:scale-105 transition-all cursor-default group">
                <div className="w-6 h-6 rounded-full bg-[#A8FF00]/15 flex items-center justify-center text-[#A8FF00] group-hover:bg-[#A8FF00] group-hover:text-black transition-colors">
                  <Eye className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs md:text-sm font-bold text-white tracking-wide">
                  Gemini Vision Consensus
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">98.4%</span>
              </div>

              {/* Node 04: Bottom-Right Headline Pill */}
              <div className="absolute bottom-8 right-6 md:bottom-10 md:right-12 z-10 bg-[#0E0E0E]/95 backdrop-blur-md border border-white/20 hover:border-[#A8FF00] shadow-[0_4px_25px_rgba(0,0,0,0.8)] rounded-full px-5 py-2.5 flex items-center space-x-2.5 hover:scale-105 transition-all cursor-default group">
                <div className="w-6 h-6 rounded-full bg-[#A8FF00]/15 flex items-center justify-center text-[#A8FF00] group-hover:bg-[#A8FF00] group-hover:text-black transition-colors">
                  <Coins className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs md:text-sm font-bold text-white tracking-wide">
                  Anchor PDA Settlement
                </span>
                <span className="text-[10px] font-mono text-[#A8FF00] font-bold">97.5%</span>
              </div>
            </div>

            {/* Mobile View: Clean Connected Headline Stream */}
            <div className="md:hidden space-y-3">
              <div className="bg-[#111111] border-2 border-[#A8FF00] rounded-full px-5 py-3 text-center flex items-center justify-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#A8FF00]" />
                <span className="text-xs font-black text-white uppercase">Physical Ground Truth</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                <div className="bg-[#0E0E0E] border border-white/10 rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-[#A8FF00]" />
                    <span className="text-xs font-bold text-white">200m Spatial Geofence</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#A8FF00] font-bold">≤ 200m</span>
                </div>
                <div className="bg-[#0E0E0E] border border-white/10 rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-[#A8FF00]" />
                    <span className="text-xs font-bold text-white">8.4 Hz Hardware Tremor</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#A8FF00] font-bold">0.042g</span>
                </div>
                <div className="bg-[#0E0E0E] border border-white/10 rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4 text-[#A8FF00]" />
                    <span className="text-xs font-bold text-white">Gemini Vision Consensus</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">98.4%</span>
                </div>
                <div className="bg-[#0E0E0E] border border-white/10 rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Coins className="w-4 h-4 text-[#A8FF00]" />
                    <span className="text-xs font-bold text-white">Anchor PDA Settlement</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#A8FF00] font-bold">97.5%</span>
                </div>
              </div>
            </div>

            {/* Bottom Real-Time Telemetry Bar */}
            <div className="mt-5 pt-3.5 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[11px] text-zinc-500">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A8FF00]" />
                <span className="text-zinc-400">Cluster: Solana Devnet • Slot #{telemetrySlot.toLocaleString()}</span>
              </div>
              <div className="text-zinc-400">
                PDA Vault: <span className="text-white">TrueSpotEscrow1111111111111</span>
              </div>
              <span className="text-emerald-400 font-bold">● CRYPTOGRAPHICALLY_SEALED</span>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. DEPIN INDUSTRY DEPLOYMENTS (Cyera-Inspired 2x2 Bento Cards)            */}
        {/* ========================================================================= */}
        <section id="automation" className="py-10 sm:py-12 border-t border-white/[0.08]">
          {/* Centered Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-9">
            <div className="inline-flex items-center space-x-2 text-[10px] font-mono font-bold text-[#A8FF00] uppercase tracking-wider mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A8FF00]" />
              <span>Production Use Cases</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Deterministic Real-World Deployments
            </h2>
            <p className="text-xs text-zinc-400 mt-2 font-mono">
              Autonomous mobility, logistics, and infrastructure networks consuming verified physical truth.
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-6">
            {/* Streamlined 3-Stage Progress Strip (Compact, High-Signal) */}
            <div className="rounded-xl bg-[#090909] border border-white/[0.08] p-3 sm:p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
                <div className="flex items-center space-x-2.5 px-3 py-2 rounded-lg bg-[#050505] border border-white/[0.04]">
                  <span className="w-5 h-5 rounded-full bg-[#181818] border border-white/10 flex items-center justify-center text-[10px] text-[#A8FF00] font-bold">1</span>
                  <div className="min-w-0">
                    <span className="text-white font-bold block text-[11px] truncate">Escrow Vault Lock</span>
                    <span className="text-[10px] text-zinc-400">0.35 SOL Anchor PDA</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5 px-3 py-2 rounded-lg bg-[#050505] border border-white/[0.04]">
                  <span className="w-5 h-5 rounded-full bg-[#181818] border border-white/10 flex items-center justify-center text-[10px] text-[#A8FF00] font-bold">2</span>
                  <div className="min-w-0">
                    <span className="text-white font-bold block text-[11px] truncate">Telemetry Consensus</span>
                    <span className="text-[10px] text-[#A8FF00]">98.4% AI + 8.4 Hz Tremor</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5 px-3 py-2 rounded-lg bg-[#050505] border border-white/[0.04]">
                  <span className="w-5 h-5 rounded-full bg-[#181818] border border-white/10 flex items-center justify-center text-[10px] text-[#A8FF00] font-bold">3</span>
                  <div className="min-w-0">
                    <span className="text-white font-bold block text-[11px] truncate">Instant CPI Payout</span>
                    <span className="text-[10px] text-emerald-400 font-bold">0.341 SOL Delivered</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2x2 Bento Cards Grid (Cyera Card Style: Visual Top Banner + Clean Tags + Punchy Specs) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Card 1: Smart Mobility */}
              <div className="rounded-2xl bg-[#090909] border border-white/[0.08] hover:border-[#A8FF00]/40 transition-all overflow-hidden flex flex-col justify-between group shadow-xl">
                {/* Visual Header Banner (Cyera Style) */}
                <div className="h-28 bg-gradient-to-br from-emerald-950/40 via-[#0A1608] to-[#090909] border-b border-white/[0.06] p-4 flex items-start justify-between relative overflow-hidden">
                  <div className="absolute right-3 -bottom-2 text-white/[0.03] group-hover:text-[#A8FF00]/[0.06] transition-colors pointer-events-none">
                    <Zap className="w-24 h-24 stroke-[1]" />
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-[#A8FF00]/10 border border-[#A8FF00]/30 flex items-center justify-center text-[#A8FF00]">
                    <Zap className="w-4 h-4 text-[#A8FF00]" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    ● VERIFIED_ON_CHAIN
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-zinc-300 border border-white/[0.08] font-semibold">
                        Smart Mobility
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500">DePIN Fleet</span>
                    </div>
                    <h3 className="text-base font-bold text-white tracking-tight mb-1.5">
                      EV Supercharger Stall Clearance
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                      Physical stall occupancy and charger operational status verified before vehicle dispatch.
                    </p>
                  </div>

                  {/* Clean 3-Metric Chips Footer */}
                  <div className="grid grid-cols-3 gap-2 bg-[#050505] p-2.5 rounded-xl border border-white/[0.05] font-mono text-[11px] text-center">
                    <div>
                      <span className="text-[9px] text-zinc-500 block uppercase">Bounty</span>
                      <span className="text-[#A8FF00] font-bold">0.35 SOL</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-zinc-500 block uppercase">Proximity</span>
                      <span className="text-white font-bold">12.4m</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-zinc-500 block uppercase">Agreement</span>
                      <span className="text-emerald-400 font-bold">98.4%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Civic Infrastructure */}
              <div className="rounded-2xl bg-[#090909] border border-white/[0.08] hover:border-[#A8FF00]/40 transition-all overflow-hidden flex flex-col justify-between group shadow-xl">
                {/* Visual Header Banner (Cyera Style) */}
                <div className="h-28 bg-gradient-to-br from-amber-950/30 via-[#151206] to-[#090909] border-b border-white/[0.06] p-4 flex items-start justify-between relative overflow-hidden">
                  <div className="absolute right-3 -bottom-2 text-white/[0.03] group-hover:text-amber-400/[0.06] transition-colors pointer-events-none">
                    <AlertTriangle className="w-24 h-24 stroke-[1]" />
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
                    ● ESCROW_SETTLED
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-zinc-300 border border-white/[0.08] font-semibold">
                        Civic Infrastructure
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500">Public DAO</span>
                    </div>
                    <h3 className="text-base font-bold text-white tracking-tight mb-1.5">
                      Roadway Hazard Detour &amp; Clearance
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                      Roadway debris removal and lane clearance attested for autonomous municipal payouts.
                    </p>
                  </div>

                  {/* Clean 3-Metric Chips Footer */}
                  <div className="grid grid-cols-3 gap-2 bg-[#050505] p-2.5 rounded-xl border border-white/[0.05] font-mono text-[11px] text-center">
                    <div>
                      <span className="text-[9px] text-zinc-500 block uppercase">Bounty</span>
                      <span className="text-[#A8FF00] font-bold">0.45 SOL</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-zinc-500 block uppercase">Proximity</span>
                      <span className="text-white font-bold">18.1m</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-zinc-500 block uppercase">Agreement</span>
                      <span className="text-emerald-400 font-bold">99.1%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Autonomous Logistics */}
              <div className="rounded-2xl bg-[#090909] border border-white/[0.08] hover:border-[#A8FF00]/40 transition-all overflow-hidden flex flex-col justify-between group shadow-xl">
                {/* Visual Header Banner (Cyera Style) */}
                <div className="h-28 bg-gradient-to-br from-cyan-950/30 via-[#071317] to-[#090909] border-b border-white/[0.06] p-4 flex items-start justify-between relative overflow-hidden">
                  <div className="absolute right-3 -bottom-2 text-white/[0.03] group-hover:text-cyan-400/[0.06] transition-colors pointer-events-none">
                    <Lock className="w-24 h-24 stroke-[1]" />
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                    <Lock className="w-4 h-4 text-cyan-400" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                    ● SEALED_PROOF
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-zinc-300 border border-white/[0.08] font-semibold">
                        Autonomous Logistics
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500">Retail Supply</span>
                    </div>
                    <h3 className="text-base font-bold text-white tracking-tight mb-1.5">
                      Parcel Locker Bay Physical Integrity
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                      Smart locker door seals and drop-off custody confirmed for non-custodial insurance release.
                    </p>
                  </div>

                  {/* Clean 3-Metric Chips Footer */}
                  <div className="grid grid-cols-3 gap-2 bg-[#050505] p-2.5 rounded-xl border border-white/[0.05] font-mono text-[11px] text-center">
                    <div>
                      <span className="text-[9px] text-zinc-500 block uppercase">Bounty</span>
                      <span className="text-[#A8FF00] font-bold">0.30 SOL</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-zinc-500 block uppercase">Proximity</span>
                      <span className="text-white font-bold">8.6m</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-zinc-500 block uppercase">Agreement</span>
                      <span className="text-emerald-400 font-bold">97.8%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4: Micromobility */}
              <div className="rounded-2xl bg-[#090909] border border-white/[0.08] hover:border-[#A8FF00]/40 transition-all overflow-hidden flex flex-col justify-between group shadow-xl">
                {/* Visual Header Banner (Cyera Style) */}
                <div className="h-28 bg-gradient-to-br from-indigo-950/30 via-[#0e0c1a] to-[#090909] border-b border-white/[0.06] p-4 flex items-start justify-between relative overflow-hidden">
                  <div className="absolute right-3 -bottom-2 text-white/[0.03] group-hover:text-indigo-400/[0.06] transition-colors pointer-events-none">
                    <Coins className="w-24 h-24 stroke-[1]" />
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-indigo-400/10 border border-indigo-400/30 flex items-center justify-center text-indigo-400">
                    <Coins className="w-4 h-4 text-indigo-400" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                    ● DISPATCH_ACTIVE
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-zinc-300 border border-white/[0.08] font-semibold">
                        Micromobility
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500">Transit Fleet</span>
                    </div>
                    <h3 className="text-base font-bold text-white tracking-tight mb-1.5">
                      Bikeshare Hub Dock Availability
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                      Transit bike rack capacity and mechanical locks attested for dynamic rebalancing rewards.
                    </p>
                  </div>

                  {/* Clean 3-Metric Chips Footer */}
                  <div className="grid grid-cols-3 gap-2 bg-[#050505] p-2.5 rounded-xl border border-white/[0.05] font-mono text-[11px] text-center">
                    <div>
                      <span className="text-[9px] text-zinc-500 block uppercase">Bounty</span>
                      <span className="text-[#A8FF00] font-bold">0.50 SOL</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-zinc-500 block uppercase">Proximity</span>
                      <span className="text-white font-bold">15.2m</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-zinc-500 block uppercase">Agreement</span>
                      <span className="text-emerald-400 font-bold">98.9%</span>
                    </div>
                  </div>
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
