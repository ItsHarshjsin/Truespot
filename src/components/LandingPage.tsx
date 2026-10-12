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
    
    msg!("Physical reality verified onchain. Settling contract.");
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

  const tickerItems = [
    { label: 'Spatial Geofence', val: '200m Radius Locked', status: 'VERIFIED', color: 'text-[#A8FF00]' },
    { label: 'Hardware Enclave', val: '8.4 Hz Tremor Attested', status: 'SEALED', color: 'text-emerald-400' },
    { label: 'Gemini 2.5 Vision', val: '98.4% Spatial Consensus', status: 'CONFIRMED', color: 'text-[#A8FF00]' },
    { label: 'Anchor Escrow PDA', val: '0.35 SOL Settled', status: 'FINALIZED', color: 'text-cyan-400' },
    { label: 'Autonomous Fleet', val: 'EV Charger #402 Verified', status: 'ACTIVE', color: 'text-[#A8FF00]' },
    { label: 'Solana Devnet', val: '<400ms Sub-Second Slot', status: 'ONLINE', color: 'text-emerald-400' },
    { label: 'Drone Waypoint', val: 'Anti-Spoofing Variance 0.00%', status: 'AUTHENTIC', color: 'text-cyan-400' },
    { label: 'ElizaOS Agent', val: 'Autonomous Physical CPI', status: 'EXECUTED', color: 'text-[#A8FF00]' },
  ];

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
                Attested Onchain.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed mb-7">
              Smart contracts cannot see physical reality. TrueSpot connects GPS coordinates, camera feeds, and hardware sensors directly to Solana programs with cryptographic proof.
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
                <span className="text-[10px] text-zinc-500 uppercase block font-bold mb-1">Consensus Speed</span>
                <strong className="text-white text-sm font-semibold">&lt; 400ms Finality</strong>
              </div>
              <div className="text-center">
                <span className="text-[10px] text-zinc-500 uppercase block font-bold mb-1">Spatial Geofence</span>
                <strong className="text-white text-sm font-semibold">Sub-Meter GPS</strong>
              </div>
              <div className="text-center">
                <span className="text-[10px] text-zinc-500 uppercase block font-bold mb-1">Vision Engine</span>
                <strong className="text-[#A8FF00] text-sm font-semibold">Gemini 2.5 Flash</strong>
              </div>
              <div className="text-center">
                <span className="text-[10px] text-zinc-500 uppercase block font-bold mb-1">Smart Escrow</span>
                <strong className="text-[#A8FF00] text-sm font-semibold">97.5% Bounty Split</strong>
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
              <span>Protocol Pillars</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              How Physical Verification Works
            </h2>
            <p className="text-xs text-zinc-400 mt-2">
              Hardware sensor nonces, vision intelligence, and instant Solana escrow settlement.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* 1. Speed */}
            <div className="text-center flex flex-col items-center justify-between p-5 rounded-2xl bg-[#090909] border border-white/[0.06] hover:border-white/[0.12] transition-colors h-full">
              <div className="flex flex-col items-center space-y-2.5">
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
                    &lt; 400ms Finality
                  </span>
                </div>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed mt-3">
                Dispatch tasks to nearby hardware nodes in seconds and settle with sub-second Solana RPC confirmation.
              </p>
            </div>

            {/* 2. Precision */}
            <div className="text-center flex flex-col items-center justify-between p-5 rounded-2xl bg-[#090909] border border-white/[0.06] hover:border-white/[0.12] transition-colors h-full">
              <div className="flex flex-col items-center space-y-2.5">
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
                  <h3 className="text-base font-bold text-white tracking-tight">Precision</h3>
                  <span className="text-xs font-mono font-semibold text-[#A8FF00] block mt-0.5">
                    Haversine Geofence
                  </span>
                </div>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed mt-3">
                Sub-meter boundary validation. Accelerometer nonces reject spoofed GPS coordinates and virtual machine emulators.
              </p>
            </div>

            {/* 3. Intelligence */}
            <div className="text-center flex flex-col items-center justify-between p-5 rounded-2xl bg-[#090909] border border-white/[0.06] hover:border-white/[0.12] transition-colors h-full">
              <div className="flex flex-col items-center space-y-2.5">
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
                  <h3 className="text-base font-bold text-white tracking-tight">Intelligence</h3>
                  <span className="text-xs font-mono font-semibold text-[#A8FF00] block mt-0.5">
                    Gemini 2.5 Flash
                  </span>
                </div>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed mt-3">
                Gemini 2.5 Flash inspects camera frames against query parameters with sub-second latency and &gt;98% agreement.
              </p>
            </div>

            {/* 4. Settlement */}
            <div className="text-center flex flex-col items-center justify-between p-5 rounded-2xl bg-[#090909] border border-white/[0.06] hover:border-white/[0.12] transition-colors h-full">
              <div className="flex flex-col items-center space-y-2.5">
                <div className="h-12 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-11 h-11 stroke-white/80 fill-none" strokeWidth="1.5">
                    <circle cx="50" cy="50" r="18" />
                    <ellipse cx="50" cy="50" rx="38" ry="14" transform="rotate(-30 50 50)" strokeDasharray="3 3" />
                    <ellipse cx="50" cy="50" rx="38" ry="14" transform="rotate(30 50 50)" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">Settlement</h3>
                  <span className="text-xs font-mono font-semibold text-[#A8FF00] block mt-0.5">
                    Instant Anchor Escrow
                  </span>
                </div>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed mt-3">
                Anchor PDA vaults release 97.5% SOL bounties autonomously the instant cryptographic consensus finalizes.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. ICONIC TRANSITION STATEMENT BANNER                                     */}
        {/* ========================================================================= */}
        <section className="py-10 sm:py-12 border-t border-white/[0.08]">
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-2xl bg-[#090909] border border-white/[0.08] py-8 sm:py-10 px-6 sm:px-10 text-center overflow-hidden shadow-xl">
              <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-center">
                <svg width="600" height="240" viewBox="0 0 600 240" fill="none">
                  <defs>
                    <radialGradient id="bannerGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#A8FF00" stopOpacity="0.12" />
                      <stop offset="100%" stopColor="#A8FF00" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#bannerGlow)" />
                  <circle cx="300" cy="120" r="100" stroke="#A8FF00" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.35" />
                  <circle cx="300" cy="120" r="60" stroke="white" strokeWidth="0.8" strokeOpacity="0.1" />
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
              Sensor-to-Solana Verification
            </h2>
            <p className="text-xs text-zinc-400 mt-2">
              Physical sensor telemetry authenticated by hardware nonces before reaching Solana consensus.
            </p>
          </div>

          {/* Connected Network Map Canvas */}
          <div className="max-w-5xl mx-auto rounded-2xl bg-[#080808] border border-white/[0.08] relative overflow-hidden p-6 sm:p-10 shadow-2xl">
            {/* High-Tech Corner HUD Overlays (Low Transparency) */}
            <div className="absolute top-3 left-4 text-[9px] font-mono text-zinc-600 tracking-wider hidden sm:flex items-center space-x-1.5 select-none pointer-events-none z-10">
              <span className="text-[#A8FF00]/50 font-bold">┌</span>
              <span>SYS.TOPOLOGY // LAT: 37.7792° N  LON: -122.4184° W</span>
            </div>
            <div className="absolute top-3 right-4 text-[9px] font-mono text-zinc-600 tracking-wider hidden sm:flex items-center space-x-1.5 select-none pointer-events-none z-10">
              <span>CLUSTER: DEVNET-BETA // SLOT #{telemetrySlot.toLocaleString()}</span>
              <span className="text-[#A8FF00]/50 font-bold">┐</span>
            </div>
            <div className="absolute bottom-3 left-4 text-[9px] font-mono text-zinc-600 tracking-wider hidden sm:flex items-center space-x-1.5 select-none pointer-events-none z-10">
              <span className="text-[#A8FF00]/50 font-bold">└</span>
              <span>ED25519 HARDWARE NONCE // SUB-METER ACCURACY</span>
            </div>
            <div className="absolute bottom-3 right-4 text-[9px] font-mono text-zinc-600 tracking-wider hidden sm:flex items-center space-x-1.5 select-none pointer-events-none z-10">
              <span>ANCHOR PDA SETTLEMENT // FINALITY &lt;400ms</span>
              <span className="text-[#A8FF00]/50 font-bold">┘</span>
            </div>

            {/* Desktop & Tablet: Connected Constellation Diagram */}
            <div className="relative min-h-[480px] hidden md:flex items-center justify-center">
              {/* Background Coordinate Grid, Geodetic Radar Circles, Ghost Satellites & Radiating Dashed Streams */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 460" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <pattern id="topologyDiagGrid" width="28" height="28" patternUnits="userSpaceOnUse">
                    <path d="M 28 0 L 0 0 0 28" fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth="0.8" />
                  </pattern>

                  {/* Dot Matrix Fill Pattern for Space Filling */}
                  <pattern id="dotGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="0.75" fill="rgba(255,255,255,0.06)" />
                  </pattern>

                  {/* Atmospheric Radar Glow Behind Center */}
                  <radialGradient id="centerRadarGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#A8FF00" stopOpacity="0.14" />
                    <stop offset="50%" stopColor="#A8FF00" stopOpacity="0.03" />
                    <stop offset="100%" stopColor="#A8FF00" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Base Coordinate Grids */}
                <rect width="100%" height="100%" fill="url(#topologyDiagGrid)" />
                <rect width="100%" height="100%" fill="url(#dotGrid)" />

                {/* Ambient Center Radar Glow */}
                <circle cx="400" cy="230" r="220" fill="url(#centerRadarGlow)" />

                {/* Concentric Geodetic Range Rings (Centered at 400, 230) */}
                <circle cx="400" cy="230" r="65" stroke="rgba(168,255,0,0.2)" strokeWidth="1" strokeDasharray="3 3" fill="none" />
                <circle cx="400" cy="230" r="130" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" fill="none" />
                <circle cx="400" cy="230" r="195" stroke="rgba(168,255,0,0.14)" strokeWidth="1" strokeDasharray="4 6" fill="none" />
                <circle cx="400" cy="230" r="270" stroke="rgba(255,255,255,0.035)" strokeWidth="0.8" fill="none" />
                <circle cx="400" cy="230" r="345" stroke="rgba(255,255,255,0.02)" strokeWidth="0.8" strokeDasharray="2 4" fill="none" />

                {/* Radar Cross-Axes (Low Opacity) */}
                <line x1="50" y1="230" x2="750" y2="230" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" strokeDasharray="2 6" />
                <line x1="400" y1="20" x2="400" y2="440" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" strokeDasharray="2 6" />

                {/* Diagonal Ray Guides (Low Opacity) */}
                <line x1="400" y1="230" x2="70" y2="45" stroke="rgba(255,255,255,0.02)" strokeWidth="0.8" strokeDasharray="1 6" />
                <line x1="400" y1="230" x2="730" y2="45" stroke="rgba(255,255,255,0.02)" strokeWidth="0.8" strokeDasharray="1 6" />
                <line x1="400" y1="230" x2="70" y2="415" stroke="rgba(255,255,255,0.02)" strokeWidth="0.8" strokeDasharray="1 6" />
                <line x1="400" y1="230" x2="730" y2="415" stroke="rgba(255,255,255,0.02)" strokeWidth="0.8" strokeDasharray="1 6" />

                {/* Range Distance Monospace Markers (Low Opacity) */}
                <text x="406" y="172" fill="rgba(168,255,0,0.3)" fontSize="8" fontFamily="monospace">R: 50m</text>
                <text x="406" y="108" fill="rgba(255,255,255,0.18)" fontSize="8" fontFamily="monospace">R: 100m</text>
                <text x="406" y="42" fill="rgba(168,255,0,0.35)" fontSize="8" fontFamily="monospace">R: 200m GEOFENCE PERIMETER</text>

                {/* Micro Technical Grid Labels (Fills Ambient Canvas Space) */}
                <text x="210" y="44" fill="rgba(255,255,255,0.2)" fontSize="7" fontFamily="monospace">◇ FIX: 3D_GNSS_RTK</text>
                <text x="530" y="44" fill="rgba(255,255,255,0.2)" fontSize="7" fontFamily="monospace">◇ ENCLAVE: VALIDATED</text>
                <text x="175" y="426" fill="rgba(255,255,255,0.2)" fontSize="7" fontFamily="monospace">◇ ENGINE: GEMINI_2_5</text>
                <text x="545" y="426" fill="rgba(255,255,255,0.2)" fontSize="7" fontFamily="monospace">◇ CPI: SPL_ESCROW</text>

                {/* Degree Cardinal Ticks */}
                <text x="396" y="24" fill="rgba(255,255,255,0.2)" fontSize="7" fontFamily="monospace">0° N</text>
                <text x="752" y="233" fill="rgba(255,255,255,0.2)" fontSize="7" fontFamily="monospace">90° E</text>
                <text x="396" y="442" fill="rgba(255,255,255,0.2)" fontSize="7" fontFamily="monospace">180° S</text>
                <text x="30" y="233" fill="rgba(255,255,255,0.2)" fontSize="7" fontFamily="monospace">270° W</text>

                {/* Coordinate Crosshairs (+) */}
                <g stroke="rgba(255,255,255,0.15)" strokeWidth="0.8">
                  <path d="M 147 100 h 6 M 150 97 v 6" />
                  <path d="M 647 100 h 6 M 650 97 v 6" />
                  <path d="M 147 360 h 6 M 150 357 v 6" />
                  <path d="M 647 360 h 6 M 650 357 v 6" />
                  <path d="M 277 230 h 6 M 280 227 v 6" />
                  <path d="M 517 230 h 6 M 520 227 v 6" />
                </g>

                {/* Rotating Geodetic Radar Sweep Arc */}
                <circle cx="400" cy="230" r="195" fill="none" stroke="#A8FF00" strokeWidth="1.2" strokeOpacity="0.35" strokeDasharray="35 420" className="animate-radar-sweep" />

                {/* Micro Coordinate Dots on Radar Rings */}
                <g fill="rgba(255,255,255,0.22)">
                  <circle cx="400" cy="35" r="1.5" />
                  <circle cx="400" cy="425" r="1.5" />
                  <circle cx="205" cy="230" r="1.5" />
                  <circle cx="595" cy="230" r="1.5" />
                  <circle cx="262" cy="92" r="1.5" />
                  <circle cx="538" cy="92" r="1.5" />
                  <circle cx="262" cy="368" r="1.5" />
                  <circle cx="538" cy="368" r="1.5" />
                </g>

                {/* Low-Opacity Ghost Satellite & Telemetry Nodes (Positioned with clear negative space) */}
                {/* Ghost Satellite 1: GNSS (Above center-left) */}
                <circle cx="115" cy="185" r="2.5" fill="#A8FF00" fillOpacity="0.4" />
                <circle cx="115" cy="185" r="5" stroke="#A8FF00" strokeOpacity="0.2" fill="none" />
                <text x="125" y="188" fill="rgba(255,255,255,0.22)" fontSize="7.5" fontFamily="monospace">GNSS_L1/L5 // SAT_32 [0.8m ACC]</text>

                {/* Ghost Node 2: Solana RPC Devnet (Above center-right) */}
                <circle cx="685" cy="185" r="2.5" fill="#38bdf8" fillOpacity="0.4" />
                <circle cx="685" cy="185" r="5" stroke="#38bdf8" strokeOpacity="0.2" fill="none" />
                <text x="600" y="188" fill="rgba(255,255,255,0.22)" fontSize="7.5" fontFamily="monospace">SOLANA_DEVNET // 394ms</text>

                {/* Ghost Node 3: SGX Enclave (Top-center) */}
                <circle cx="275" cy="50" r="2" fill="#c084fc" fillOpacity="0.35" />
                <text x="285" y="53" fill="rgba(255,255,255,0.2)" fontSize="7.5" fontFamily="monospace">SGX_ENCLAVE // NONCE #9102</text>

                {/* Ghost Node 4: Escrow Vault PDA (Bottom-center) */}
                <circle cx="535" cy="425" r="2" fill="#34d399" fillOpacity="0.35" />
                <text x="440" y="428" fill="rgba(255,255,255,0.2)" fontSize="7.5" fontFamily="monospace">ESCROW_PDA // V2_ANCHOR</text>

                {/* Active Connection Streams (Seamlessly emerge from behind corner cards into center hub) */}
                {/* Path 1: Top-Left Card -> Center */}
                <line x1="140" y1="80" x2="400" y2="230" stroke="rgba(168,255,0,0.15)" strokeWidth="1" />
                <line x1="140" y1="80" x2="400" y2="230" stroke="#A8FF00" strokeWidth="1.5" strokeOpacity="0.65" className="animate-dash-stream" />

                {/* Path 2: Top-Right Card -> Center */}
                <line x1="660" y1="80" x2="400" y2="230" stroke="rgba(168,255,0,0.15)" strokeWidth="1" />
                <line x1="660" y1="80" x2="400" y2="230" stroke="#A8FF00" strokeWidth="1.5" strokeOpacity="0.65" className="animate-dash-stream" />

                {/* Path 3: Bottom-Left Card -> Center */}
                <line x1="140" y1="380" x2="400" y2="230" stroke="rgba(168,255,0,0.15)" strokeWidth="1" />
                <line x1="140" y1="380" x2="400" y2="230" stroke="#A8FF00" strokeWidth="1.5" strokeOpacity="0.65" className="animate-dash-stream" />

                {/* Path 4: Bottom-Right Card -> Center */}
                <line x1="660" y1="380" x2="400" y2="230" stroke="rgba(168,255,0,0.15)" strokeWidth="1" />
                <line x1="660" y1="380" x2="400" y2="230" stroke="#A8FF00" strokeWidth="1.5" strokeOpacity="0.65" className="animate-dash-stream" />
              </svg>

              {/* Floating Low-Transparency Background Telemetry Badge: Left Flank */}
              <div className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 hidden xl:flex flex-col space-y-1.5 pointer-events-none">
                <div className="px-2.5 py-1 rounded-full bg-[#111111]/85 backdrop-blur-md border border-white/[0.08] flex items-center space-x-2 text-[10px] font-mono shadow-xl">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A8FF00] animate-pulse" />
                  <span className="text-zinc-400">GNSS:</span>
                  <span className="text-white font-bold">0.8m ACC</span>
                </div>
                <div className="px-2 py-0.5 rounded bg-[#0D0D0D]/60 border border-white/[0.04] text-[9px] font-mono text-zinc-500 w-fit">
                  SAT_32 • LOCKED
                </div>
              </div>

              {/* Floating Low-Transparency Background Telemetry Badge: Right Flank */}
              <div className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 hidden xl:flex flex-col items-end space-y-1.5 pointer-events-none">
                <div className="px-2.5 py-1 rounded-full bg-[#111111]/85 backdrop-blur-md border border-white/[0.08] flex items-center space-x-2 text-[10px] font-mono shadow-xl">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-zinc-400">DEVNET:</span>
                  <span className="text-emerald-400 font-bold">&lt;400ms</span>
                </div>
                <div className="px-2 py-0.5 rounded bg-[#0D0D0D]/60 border border-white/[0.04] text-[9px] font-mono text-zinc-500 w-fit">
                  SLOT #{telemetrySlot.toLocaleString()}
                </div>
              </div>

              {/* Floating Low-Transparency Background Telemetry Badge: Top Flank */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 hidden lg:flex pointer-events-none">
                <div className="px-3 py-1 rounded-full bg-[#0D0D0D]/80 backdrop-blur-md border border-[#A8FF00]/25 flex items-center space-x-2 text-[10px] font-mono text-zinc-300 shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A8FF00]" />
                  <span className="text-zinc-400">TEE ENCLAVE:</span>
                  <span className="text-[#A8FF00] font-bold">Nonce #9102 Sealed</span>
                  <span className="text-[9px] text-zinc-500 font-normal border-l border-white/10 pl-2">8.4 Hz RMS</span>
                </div>
              </div>

              {/* Floating Low-Transparency Background Telemetry Badge: Bottom Flank */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden lg:flex pointer-events-none">
                <div className="px-3 py-1 rounded-full bg-[#0D0D0D]/80 backdrop-blur-md border border-cyan-500/25 flex items-center space-x-2 text-[10px] font-mono text-zinc-300 shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span className="text-zinc-400">ESCROW VAULT:</span>
                  <span className="text-cyan-400 font-bold">0.35 SOL Settled</span>
                  <span className="text-[9px] text-zinc-500 font-normal border-l border-white/10 pl-2">Anchor CPI</span>
                </div>
              </div>

              {/* Central Physical POI Headline Pill (Oracle Center) */}
              <div className="z-20 relative group cursor-default">
                {/* Ambient glow behind center */}
                <div className="absolute -inset-4 bg-[#A8FF00]/15 blur-2xl rounded-full pointer-events-none group-hover:bg-[#A8FF00]/25 transition-all" />

                <div className="relative bg-[#0C0C0C]/95 backdrop-blur-xl border-2 border-[#A8FF00] shadow-[0_0_35px_rgba(168,255,0,0.35)] rounded-full px-6 py-3.5 flex items-center space-x-3.5 group-hover:scale-105 transition-transform">
                  {/* Live radar beacon indicator with ping */}
                  <div className="relative flex items-center justify-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#A8FF00] shadow-[0_0_12px_#A8FF00]" />
                    <span className="absolute w-5 h-5 rounded-full border border-[#A8FF00]/60 animate-ping" />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[9px] font-mono font-bold text-[#A8FF00] uppercase tracking-widest leading-none mb-1">
                      Oracle Verification Core
                    </span>
                    <span className="text-sm md:text-base font-black text-white tracking-tight uppercase leading-none">
                      Physical Ground Truth
                    </span>
                  </div>

                  <div className="hidden sm:flex items-center space-x-2 pl-3 border-l border-white/10">
                    <span className="text-[10px] font-mono font-bold text-zinc-300 bg-white/[0.08] px-2.5 py-1 rounded-full border border-white/10">
                      37.7792° N, -122.4184° W
                    </span>
                    <span className="text-[9px] font-mono font-extrabold text-[#A8FF00] bg-[#A8FF00]/10 px-2 py-1 rounded-full border border-[#A8FF00]/25">
                      ±0.8m ACC
                    </span>
                  </div>
                </div>
              </div>

              {/* Node 01: Top-Left Card */}
              <div className="absolute top-6 left-5 md:top-8 md:left-10 z-10 bg-[#0D0D0D]/95 backdrop-blur-md border border-white/15 hover:border-[#A8FF00] shadow-[0_6px_25px_rgba(0,0,0,0.85)] rounded-2xl px-4.5 py-2.5 transition-all hover:scale-105 cursor-default group">
                <div className="flex items-center justify-between space-x-3 mb-1">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-semibold">
                    Vector 01 // Geodetic
                  </span>
                  <span className="text-[9px] font-mono text-[#A8FF00] font-bold bg-[#A8FF00]/10 px-1.5 py-0.5 rounded border border-[#A8FF00]/20">
                    ≤ 200m
                  </span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <div className="w-6 h-6 rounded-lg bg-[#A8FF00]/15 flex items-center justify-center text-[#A8FF00] group-hover:bg-[#A8FF00] group-hover:text-black transition-colors">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs md:text-sm font-bold text-white tracking-wide block leading-none">
                      200m Spatial Geofence
                    </span>
                    <span className="text-[9px] font-mono text-zinc-400 block mt-0.5">
                      Haversine Radius Locked
                    </span>
                  </div>
                </div>
              </div>

              {/* Node 02: Top-Right Card */}
              <div className="absolute top-6 right-5 md:top-8 md:right-10 z-10 bg-[#0D0D0D]/95 backdrop-blur-md border border-white/15 hover:border-[#A8FF00] shadow-[0_6px_25px_rgba(0,0,0,0.85)] rounded-2xl px-4.5 py-2.5 transition-all hover:scale-105 cursor-default group">
                <div className="flex items-center justify-between space-x-3 mb-1">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-semibold">
                    Vector 02 // Enclave Nonce
                  </span>
                  <span className="text-[9px] font-mono text-[#A8FF00] font-bold bg-[#A8FF00]/10 px-1.5 py-0.5 rounded border border-[#A8FF00]/20">
                    0.042g RMS
                  </span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <div className="w-6 h-6 rounded-lg bg-[#A8FF00]/15 flex items-center justify-center text-[#A8FF00] group-hover:bg-[#A8FF00] group-hover:text-black transition-colors">
                    <Activity className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs md:text-sm font-bold text-white tracking-wide block leading-none">
                      8.4 Hz Hardware Tremor
                    </span>
                    <span className="text-[9px] font-mono text-zinc-400 block mt-0.5">
                      Biometric Anti-Spoofing
                    </span>
                  </div>
                </div>
              </div>

              {/* Node 03: Bottom-Left Card */}
              <div className="absolute bottom-6 left-5 md:bottom-8 md:left-10 z-10 bg-[#0D0D0D]/95 backdrop-blur-md border border-white/15 hover:border-[#A8FF00] shadow-[0_6px_25px_rgba(0,0,0,0.85)] rounded-2xl px-4.5 py-2.5 transition-all hover:scale-105 cursor-default group">
                <div className="flex items-center justify-between space-x-3 mb-1">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-semibold">
                    Vector 03 // Vision Consensus
                  </span>
                  <span className="text-[9px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                    98.4% Conf
                  </span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <div className="w-6 h-6 rounded-lg bg-[#A8FF00]/15 flex items-center justify-center text-[#A8FF00] group-hover:bg-[#A8FF00] group-hover:text-black transition-colors">
                    <Eye className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs md:text-sm font-bold text-white tracking-wide block leading-none">
                      Gemini Vision Consensus
                    </span>
                    <span className="text-[9px] font-mono text-zinc-400 block mt-0.5">
                      Multimodal Frame Inspection
                    </span>
                  </div>
                </div>
              </div>

              {/* Node 04: Bottom-Right Card */}
              <div className="absolute bottom-6 right-5 md:bottom-8 md:right-10 z-10 bg-[#0D0D0D]/95 backdrop-blur-md border border-white/15 hover:border-[#A8FF00] shadow-[0_6px_25px_rgba(0,0,0,0.85)] rounded-2xl px-4.5 py-2.5 transition-all hover:scale-105 cursor-default group">
                <div className="flex items-center justify-between space-x-3 mb-1">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-semibold">
                    Vector 04 // Smart Escrow
                  </span>
                  <span className="text-[9px] font-mono text-[#A8FF00] font-bold bg-[#A8FF00]/10 px-1.5 py-0.5 rounded border border-[#A8FF00]/20">
                    97.5% SOL
                  </span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <div className="w-6 h-6 rounded-lg bg-[#A8FF00]/15 flex items-center justify-center text-[#A8FF00] group-hover:bg-[#A8FF00] group-hover:text-black transition-colors">
                    <Coins className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs md:text-sm font-bold text-white tracking-wide block leading-none">
                      Anchor PDA Settlement
                    </span>
                    <span className="text-[9px] font-mono text-zinc-400 block mt-0.5">
                      Sub-Second CPI Finality
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile View: High-Signal Connected Stream */}
            <div className="md:hidden space-y-3 pt-2">
              <div className="bg-[#111111] border-2 border-[#A8FF00] rounded-xl px-4 py-3 text-center flex flex-col items-center justify-center space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#A8FF00] animate-pulse" />
                  <span className="text-xs font-black text-white uppercase">Physical Ground Truth</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-400">37.7792° N, -122.4184° W • ±0.8m ACC</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <div className="bg-[#0E0E0E] border border-white/10 rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-[#A8FF00]" />
                    <div>
                      <span className="text-xs font-bold text-white block">200m Spatial Geofence</span>
                      <span className="text-[9px] font-mono text-zinc-500">Vector 01 // Geodetic</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-[#A8FF00] font-bold">≤ 200m</span>
                </div>

                <div className="bg-[#0E0E0E] border border-white/10 rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-[#A8FF00]" />
                    <div>
                      <span className="text-xs font-bold text-white block">8.4 Hz Hardware Tremor</span>
                      <span className="text-[9px] font-mono text-zinc-500">Vector 02 // Enclave</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-[#A8FF00] font-bold">0.042g</span>
                </div>

                <div className="bg-[#0E0E0E] border border-white/10 rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4 text-[#A8FF00]" />
                    <div>
                      <span className="text-xs font-bold text-white block">Gemini Vision Consensus</span>
                      <span className="text-[9px] font-mono text-zinc-500">Vector 03 // Multimodal</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">98.4%</span>
                </div>

                <div className="bg-[#0E0E0E] border border-white/10 rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Coins className="w-4 h-4 text-[#A8FF00]" />
                    <div>
                      <span className="text-xs font-bold text-white block">Anchor PDA Settlement</span>
                      <span className="text-[9px] font-mono text-zinc-500">Vector 04 // Smart Escrow</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-[#A8FF00] font-bold">97.5%</span>
                </div>
              </div>
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
              <span>Production Deployments</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Where TrueSpot Operates Today
            </h2>
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
                    <span className="text-white font-bold block text-[11px] truncate">Sensor + Vision Proof</span>
                    <span className="text-[10px] text-[#A8FF00]">98.4% AI + 8.4 Hz Tremor</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5 px-3 py-2 rounded-lg bg-[#050505] border border-white/[0.04]">
                  <span className="w-5 h-5 rounded-full bg-[#181818] border border-white/10 flex items-center justify-center text-[10px] text-[#A8FF00] font-bold">3</span>
                  <div className="min-w-0">
                    <span className="text-white font-bold block text-[11px] truncate">Instant CPI Settlement</span>
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
                    ● VERIFIED_ONCHAIN
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
                      Autonomous vehicles confirm charger stall availability and cable state before routing to park and charge.
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
        {/* 6. SIDE-BY-SIDE REALITY COMPARISON (Aligned to Max-W-5xl)                 */}
        {/* ========================================================================= */}
        <section id="comparison" className="py-10 sm:py-12 border-t border-white/[0.08]">
          <div className="text-center max-w-2xl mx-auto mb-7 sm:mb-8">
            <div className="inline-flex items-center space-x-2 text-[10px] font-mono font-bold text-[#A8FF00] uppercase tracking-wider mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A8FF00]" />
              <span>Security Audit</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Smart Contracts Are Blind to Reality
            </h2>
            <p className="text-xs text-zinc-400 mt-2">
              Without physical verification, onchain execution relies on vulnerable offchain trust assumptions.
            </p>
          </div>

          {/* Balanced Side-by-Side Dual Card Grid - max-w-5xl aligns with full page grid */}
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
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
                    ATTESTED ONCHAIN
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
                  Task executed onchain with confirmed physical telemetry. Zero hallucination risk.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. DEVELOPER QUICKSTART HUB (Aligned to Max-W-5xl)                       */}
        {/* ========================================================================= */}
        <section id="developers" className="py-10 sm:py-12 border-t border-white/[0.08]">
          <div className="text-center max-w-2xl mx-auto mb-7 sm:mb-8">
            <div className="inline-flex items-center space-x-2 text-[10px] font-mono font-bold text-[#A8FF00] uppercase tracking-wider mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A8FF00]" />
              <span>Developer Integration</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Integrate Physical Ground Truth in 3 Lines
            </h2>
            <p className="text-xs text-zinc-400 mt-2">
              Connect your AI agents or Solana programs to physical reality with our lightweight TypeScript SDK or composable Anchor CPI instructions.
            </p>
          </div>

          {/* Unified Terminal Console - max-w-5xl aligns with full page grid */}
          <div className="max-w-5xl mx-auto bg-[#090909] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl">
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
                  <span>Cryptographic Hardware Proof</span>
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
        {/* 8. LIVE ATTESTATION MARQUEE SWIPE (Continuous Smooth Stream)              */}
        {/* ========================================================================= */}
        <section className="pt-10 pb-4 overflow-hidden border-t border-white/[0.08]">
          <div className="marquee-mask overflow-hidden py-2">
            <div className="animate-marquee-swipe flex items-center gap-3">
              {[...tickerItems, ...tickerItems].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#0C0C0C] border border-white/[0.08] hover:border-[#A8FF00]/40 transition-colors shrink-0 group cursor-default"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A8FF00] animate-pulse" />
                  <span className="text-[11px] font-mono text-zinc-400 group-hover:text-zinc-300 transition-colors">
                    {item.label}:
                  </span>
                  <span className="text-[11px] font-mono font-bold text-white">
                    {item.val}
                  </span>
                  <span className={`text-[9px] font-mono font-extrabold px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] ${item.color}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 9. DEFINED ENTERPRISE FOOTER                                              */}
        {/* ========================================================================= */}
        <footer className="pt-10 pb-8 border-t border-white/[0.08]">
          <div className="max-w-7xl mx-auto">
            {/* Top Multi-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 pb-10 border-b border-white/[0.06]">
              {/* Brand & Devnet Status Column (Spans 2 columns on lg) */}
              <div className="lg:col-span-2 space-y-4">
                <div
                  className="flex items-center space-x-3 cursor-pointer group w-fit"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <div className="w-9 h-9 rounded-xl bg-[#A8FF00] text-black flex items-center justify-center font-bold shadow-[0_0_15px_rgba(168,255,0,0.3)] transition-transform group-hover:scale-105">
                    <Shield className="w-5 h-5 text-black stroke-[2.5]" />
                  </div>
                  <div>
                    <span className="font-black text-lg tracking-tight text-white block leading-none">
                      TrueSpot
                    </span>
                    <span className="text-[10px] font-mono text-[#A8FF00] uppercase tracking-wider font-semibold">
                      Physical DePIN Oracle
                    </span>
                  </div>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
                  Cryptographic verification bridging physical ground truth and autonomous onchain execution on Solana.
                </p>

                {/* Live Cluster Pill */}
                <div className="inline-flex items-center space-x-2.5 px-3 py-1.5 rounded-lg bg-[#0C0C0C] border border-white/[0.08] text-[11px] font-mono">
                  <span className="w-2 h-2 rounded-full bg-[#A8FF00] animate-pulse" />
                  <span className="text-zinc-400">Solana Devnet:</span>
                  <span className="text-white font-bold">Slot #{telemetrySlot.toLocaleString()}</span>
                </div>
              </div>

              {/* Column 1: Verification Core */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
                  Verification Core
                </h4>
                <ul className="space-y-2 text-xs text-zinc-400">
                  <li>
                    <a href="#simulator" className="hover:text-white transition-colors block">
                      Spatial Geofence
                    </a>
                  </li>
                  <li>
                    <a href="#simulator" className="hover:text-white transition-colors block">
                      Biometric Tremor
                    </a>
                  </li>
                  <li>
                    <a href="#simulator" className="hover:text-white transition-colors block">
                      Gemini 2.5 Vision
                    </a>
                  </li>
                  <li>
                    <a href="#simulator" className="hover:text-white transition-colors block">
                      Anchor Escrow PDA
                    </a>
                  </li>
                  <li>
                    <a href="#simulator" className="hover:text-white transition-colors block">
                      Network Topology
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 2: Developers */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
                  Developers
                </h4>
                <ul className="space-y-2 text-xs text-zinc-400">
                  <li>
                    <button onClick={onOpenDocs} className="hover:text-white transition-colors text-left cursor-pointer block">
                      Anchor CPI Program
                    </button>
                  </li>
                  <li>
                    <button onClick={onOpenDocs} className="hover:text-white transition-colors text-left cursor-pointer block">
                      TypeScript SDK
                    </button>
                  </li>
                  <li>
                    <button onClick={onOpenDocs} className="hover:text-white transition-colors text-left cursor-pointer block">
                      ElizaOS DePIN Action
                    </button>
                  </li>
                  <li>
                    <a
                      href="https://github.com/ItsHarshjsin/Truespot"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-white transition-colors flex items-center space-x-1"
                    >
                      <span>GitHub Repository</span>
                      <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://explorer.solana.com/?cluster=devnet"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-white transition-colors flex items-center space-x-1"
                    >
                      <span>Devnet Explorer</span>
                      <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 3: Deployments */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
                  Deployments
                </h4>
                <ul className="space-y-2 text-xs text-zinc-400">
                  <li>
                    <a href="#automation" className="hover:text-white transition-colors block">
                      Autonomous EV Fleet
                    </a>
                  </li>
                  <li>
                    <a href="#automation" className="hover:text-white transition-colors block">
                      Cold-Chain Logistics
                    </a>
                  </li>
                  <li>
                    <a href="#automation" className="hover:text-white transition-colors block">
                      Drone Waypoints
                    </a>
                  </li>
                  <li>
                    <a href="#automation" className="hover:text-white transition-colors block">
                      Decentralized Compute
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 4: Ecosystem & Quick Action */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
                  Ecosystem
                </h4>
                <ul className="space-y-2 text-xs text-zinc-400">
                  <li>
                    <a
                      href="https://x.com"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-white transition-colors flex items-center space-x-1"
                    >
                      <span>X (Twitter)</span>
                      <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                    </a>
                  </li>
                  <li>
                    <button onClick={onOpenDocs} className="hover:text-white transition-colors text-left cursor-pointer block">
                      Documentation
                    </button>
                  </li>
                  <li className="pt-2">
                    <button
                      onClick={onLaunchProtocol}
                      className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-[#A8FF00] text-black font-bold text-xs hover:bg-[#b8ff24] transition-all cursor-pointer shadow-[0_0_12px_rgba(168,255,0,0.25)]"
                    >
                      <span>Launch App</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar: Copyright & Back-to-Top */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[11px] text-zinc-500">
              <div className="flex items-center space-x-2">
                <span>© 2026 TrueSpot Protocol.</span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-400">Decentralized Physical Ground Truth Architecture.</span>
              </div>

              <div className="flex items-center space-x-6 text-zinc-400">
                <span className="text-emerald-400 font-medium">● Devnet Operational</span>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="hover:text-white transition-colors cursor-pointer flex items-center space-x-1 group"
                >
                  <span>Back to top</span>
                  <span className="group-hover:-translate-y-0.5 transition-transform">↑</span>
                </button>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};
