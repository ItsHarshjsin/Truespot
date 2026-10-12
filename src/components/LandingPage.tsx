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
        {/* 4. FOUR PILLARS OF PHYSICAL PROOF (Dense Architectural Grid, Zero Toy Animations) */}
        {/* ========================================================================= */}
        <section id="simulator" className="py-10 sm:py-12 border-t border-white/[0.08]">
          {/* Centered Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-9">
            <div className="inline-flex items-center space-x-2 text-[10px] font-mono font-bold text-[#A8FF00] uppercase tracking-wider mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A8FF00]" />
              <span>Multi-Vector Physical Proof Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Cryptographic Reality Verification
            </h2>
            <p className="text-xs text-zinc-400 mt-2 font-mono">
              Four concurrent hardware and algorithmic checkpoints guaranteeing zero-hallucination ground truth on Solana.
            </p>
          </div>

          {/* Dense 2x2 Bento Architectural Grid - No animations, pure high-impact engineering specs */}
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {/* Pillar 01: Spatial Haversine Geofencing */}
            <div className="rounded-2xl bg-[#090909] border border-white/[0.08] p-5 sm:p-6 flex flex-col justify-between hover:border-[#A8FF00]/40 transition-colors">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
                  <div className="flex items-center space-x-2.5">
                    <span className="font-mono text-xs font-bold text-[#A8FF00]">01</span>
                    <div className="w-7 h-7 rounded-lg bg-[#A8FF00]/10 border border-[#A8FF00]/30 flex items-center justify-center text-[#A8FF00]">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Spatial Geofence Lock</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-zinc-300 border border-white/[0.08]">
                    Haversine ≤ 200m
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white mb-1.5">
                  Mathematical Perimeter Enforcement
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  Computes great-circle trajectory distance using native dual-frequency GNSS. Rejects virtual mock locations, simulated coordinates, and developer-mode telemetry injection.
                </p>
              </div>

              {/* Technical Specifications Panel */}
              <div className="bg-[#050505] rounded-xl border border-white/[0.06] p-3 font-mono text-[11px] space-y-2">
                <div className="flex items-center justify-between pb-1.5 border-b border-white/[0.04]">
                  <span className="text-zinc-500">Distance Formulation:</span>
                  <span className="text-zinc-200">2R · arcsin(√[sin²(Δφ/2) + ...])</span>
                </div>
                <div className="flex items-center justify-between pb-1.5 border-b border-white/[0.04]">
                  <span className="text-zinc-500">Perimeter Tolerance:</span>
                  <span className="text-[#A8FF00] font-bold">12.4m Actual (200m Max Barrier)</span>
                </div>
                <div className="flex items-center justify-between pb-1.5 border-b border-white/[0.04]">
                  <span className="text-zinc-500">Mock Location Guard:</span>
                  <span className="text-emerald-400 font-bold">HARDWARE_L1_L5_ONLY</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500">Anchor CPI Check:</span>
                  <span className="text-white font-bold">require!(distance &lt;= 200, OutOfRange)</span>
                </div>
              </div>
            </div>

            {/* Pillar 02: Hardware Accelerometer Tremor */}
            <div className="rounded-2xl bg-[#090909] border border-white/[0.08] p-5 sm:p-6 flex flex-col justify-between hover:border-[#A8FF00]/40 transition-colors">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
                  <div className="flex items-center space-x-2.5">
                    <span className="font-mono text-xs font-bold text-[#A8FF00]">02</span>
                    <div className="w-7 h-7 rounded-lg bg-[#A8FF00]/10 border border-[#A8FF00]/30 flex items-center justify-center text-[#A8FF00]">
                      <Activity className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Sensor Tremor Proof</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-zinc-300 border border-white/[0.08]">
                    8.4 Hz Micro-Nonce
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white mb-1.5">
                  Biometric Physical Human Validation
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  Analyzes 3-axis accelerometer and gyroscope vibrations at 100 Hz. Physiological human micro-tremors (8–12 Hz) cannot be spoofed by server racks, bot farms, or synthetic emulators.
                </p>
              </div>

              {/* Technical Specifications Panel */}
              <div className="bg-[#050505] rounded-xl border border-white/[0.06] p-3 font-mono text-[11px] space-y-2">
                <div className="flex items-center justify-between pb-1.5 border-b border-white/[0.04]">
                  <span className="text-zinc-500">Fourier Sampling Rate:</span>
                  <span className="text-zinc-200">100 Hz 3-Axis IMU Stream</span>
                </div>
                <div className="flex items-center justify-between pb-1.5 border-b border-white/[0.04]">
                  <span className="text-zinc-500">Tremor Oscillation:</span>
                  <span className="text-[#A8FF00] font-bold">8.4 Hz Peak (0.042g RMS)</span>
                </div>
                <div className="flex items-center justify-between pb-1.5 border-b border-white/[0.04]">
                  <span className="text-zinc-500">Secure Enclave Seal:</span>
                  <span className="text-emerald-400 font-bold">ED25519_HARDWARE_KEYSTORE</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500">Bot Emulation Test:</span>
                  <span className="text-white font-bold">ZERO_VIRTUAL_SENSOR_DETECTED</span>
                </div>
              </div>
            </div>

            {/* Pillar 03: Multimodal AI Consensus */}
            <div className="rounded-2xl bg-[#090909] border border-white/[0.08] p-5 sm:p-6 flex flex-col justify-between hover:border-[#A8FF00]/40 transition-colors">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
                  <div className="flex items-center space-x-2.5">
                    <span className="font-mono text-xs font-bold text-[#A8FF00]">03</span>
                    <div className="w-7 h-7 rounded-lg bg-[#A8FF00]/10 border border-[#A8FF00]/30 flex items-center justify-center text-[#A8FF00]">
                      <Eye className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Multimodal Consensus</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-zinc-300 border border-white/[0.08]">
                    ≥ 95.0% Agreement
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white mb-1.5">
                  Gemini 2.5 Vision &amp; EXIF Hash Enclave
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  High-speed multimodal AI parses physical visual evidence against bounty conditions. Concurrently verifies lens focal depth, lighting coherence, and SHA-256 raw sensor headers.
                </p>
              </div>

              {/* Technical Specifications Panel */}
              <div className="bg-[#050505] rounded-xl border border-white/[0.06] p-3 font-mono text-[11px] space-y-2">
                <div className="flex items-center justify-between pb-1.5 border-b border-white/[0.04]">
                  <span className="text-zinc-500">Inference Engine:</span>
                  <span className="text-zinc-200">Gemini 2.5 Flash Vision (&lt;500ms)</span>
                </div>
                <div className="flex items-center justify-between pb-1.5 border-b border-white/[0.04]">
                  <span className="text-zinc-500">Consensus Threshold:</span>
                  <span className="text-[#A8FF00] font-bold">98.4% Match (Floor: 95.0%)</span>
                </div>
                <div className="flex items-center justify-between pb-1.5 border-b border-white/[0.04]">
                  <span className="text-zinc-500">EXIF Integrity Digest:</span>
                  <span className="text-emerald-400 font-bold">SHA-256 RAW_PAYLOAD_SEALED</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500">Deepfake Probability:</span>
                  <span className="text-white font-bold">0.00% (Optical Liveness Verified)</span>
                </div>
              </div>
            </div>

            {/* Pillar 04: Autonomous Anchor PDA Settlement */}
            <div className="rounded-2xl bg-[#090909] border border-white/[0.08] p-5 sm:p-6 flex flex-col justify-between hover:border-[#A8FF00]/40 transition-colors">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
                  <div className="flex items-center space-x-2.5">
                    <span className="font-mono text-xs font-bold text-[#A8FF00]">04</span>
                    <div className="w-7 h-7 rounded-lg bg-[#A8FF00]/10 border border-[#A8FF00]/30 flex items-center justify-center text-[#A8FF00]">
                      <Coins className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Anchor PDA Escrow</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-zinc-300 border border-white/[0.08]">
                    97.5% SOL Payout
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white mb-1.5">
                  Autonomous Zero-Custody Settlement
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  Non-custodial Solana smart contracts hold deposits until physical truth is attested. Cross-Program Invocations (CPI) release funds instantly to workers with no human intermediaries.
                </p>
              </div>

              {/* Technical Specifications Panel */}
              <div className="bg-[#050505] rounded-xl border border-white/[0.06] p-3 font-mono text-[11px] space-y-2">
                <div className="flex items-center justify-between pb-1.5 border-b border-white/[0.04]">
                  <span className="text-zinc-500">Program PDA Account:</span>
                  <span className="text-zinc-200">TrueSpotEscrow1111111111111</span>
                </div>
                <div className="flex items-center justify-between pb-1.5 border-b border-white/[0.04]">
                  <span className="text-zinc-500">Fee Distribution:</span>
                  <span className="text-[#A8FF00] font-bold">97.5% Worker / 2.5% Protocol</span>
                </div>
                <div className="flex items-center justify-between pb-1.5 border-b border-white/[0.04]">
                  <span className="text-zinc-500">Settlement Speed:</span>
                  <span className="text-emerald-400 font-bold">&lt; 400ms Sub-Second Finality</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500">Execution Mechanism:</span>
                  <span className="text-white font-bold">CPI Vault Release (Zero Custody)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. PROTOCOL BLUEPRINT & DEPIN INDUSTRY DEPLOYMENTS (No Toy Simulator)     */}
        {/* ========================================================================= */}
        <section id="automation" className="py-10 sm:py-12 border-t border-white/[0.08]">
          {/* Centered Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-9">
            <div className="inline-flex items-center space-x-2 text-[10px] font-mono font-bold text-[#A8FF00] uppercase tracking-wider mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A8FF00]" />
              <span>Production Integration Blueprint</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Deterministic Real-World Deployments
            </h2>
            <p className="text-xs text-zinc-400 mt-2 font-mono">
              How decentralized physical networks, autonomous mobility fleets, and smart contracts consume TrueSpot ground truth.
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-6">
            {/* 3-Stage Architectural Pipeline Flow (Crisp horizontal progression card) */}
            <div className="rounded-2xl bg-[#090909] border border-white/[0.08] p-5 sm:p-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-5 font-mono text-xs">
                <div className="flex items-center space-x-2 text-white font-bold">
                  <Shield className="w-4 h-4 text-[#A8FF00]" />
                  <span>3-Stage Attestation Execution Flow</span>
                </div>
                <span className="text-[10px] text-[#A8FF00] font-semibold bg-[#A8FF00]/10 px-2.5 py-0.5 rounded-full border border-[#A8FF00]/30">
                  Devnet Cluster Active • Slot #{telemetrySlot.toLocaleString()}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Step 1 */}
                <div className="bg-[#050505] rounded-xl border border-white/[0.06] p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-[#A8FF00]">STAGE 01</span>
                      <span className="text-[10px] font-mono text-zinc-400">Anchor PDA</span>
                    </div>
                    <h4 className="text-xs font-bold text-white mb-1.5">On-Chain Escrow Lock</h4>
                    <p className="text-[11px] text-zinc-400 leading-relaxed mb-3">
                      Contract or AI agent specifies coordinates, bounty SOL, and radius. Funds lock in non-custodial PDA vault.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-white/[0.04] font-mono text-[10px] text-zinc-400 flex items-center justify-between">
                    <span>Deposit: 0.35 SOL</span>
                    <span className="text-emerald-400 font-bold">VAULT_LOCKED</span>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-[#050505] rounded-xl border border-white/[0.06] p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-[#A8FF00]">STAGE 02</span>
                      <span className="text-[10px] font-mono text-zinc-400">Telemetry Proof</span>
                    </div>
                    <h4 className="text-xs font-bold text-white mb-1.5">Multi-Vector Attestation</h4>
                    <p className="text-[11px] text-zinc-400 leading-relaxed mb-3">
                      Field spotter submits signed payload. Hardware validates 200m Haversine, 8.4 Hz tremor, and multimodal AI consensus.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-white/[0.04] font-mono text-[10px] text-zinc-400 flex items-center justify-between">
                    <span>Consensus: 98.4%</span>
                    <span className="text-[#A8FF00] font-bold">VERIFIED_HARDWARE</span>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-[#050505] rounded-xl border border-white/[0.06] p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-[#A8FF00]">STAGE 03</span>
                      <span className="text-[10px] font-mono text-zinc-400">CPI Execution</span>
                    </div>
                    <h4 className="text-xs font-bold text-white mb-1.5">Instant Non-Custodial Payout</h4>
                    <p className="text-[11px] text-zinc-400 leading-relaxed mb-3">
                      Solana runtime verifies state and executes CPI release. 97.5% delivered to spotter in &lt;400ms finality.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-white/[0.04] font-mono text-[10px] text-zinc-400 flex items-center justify-between">
                    <span>Payout: 0.34125 SOL</span>
                    <span className="text-emerald-400 font-bold">RELEASED_ON_CHAIN</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Real-World DePIN Industry Deployment Use Cases */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Use Case 1: EV Charging */}
              <div className="rounded-2xl bg-[#090909] border border-white/[0.08] p-5 flex flex-col justify-between hover:border-white/20 transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[10px] font-mono text-[#A8FF00] font-bold uppercase tracking-wider">
                      Smart Mobility • DePIN
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      VERIFIED_ON_CHAIN
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1.5">
                    EV Supercharger Stall Clearance &amp; Plaque Status
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    Autonomous navigation algorithms ingest physical stall availability to prevent electric vehicles from routing to ICE-blocked or inoperable charging bays.
                  </p>
                </div>
                <div className="bg-[#050505] rounded-xl border border-white/[0.06] p-3 font-mono text-[11px] grid grid-cols-3 gap-2 text-center">
                  <div>
                    <span className="text-[10px] text-zinc-500 block">Proximity</span>
                    <span className="text-white font-bold">12.4m / 200m</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 block">Bounty</span>
                    <span className="text-[#A8FF00] font-bold">0.35 SOL</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 block">Agreement</span>
                    <span className="text-emerald-400 font-bold">98.4% Match</span>
                  </div>
                </div>
              </div>

              {/* Use Case 2: Public Works */}
              <div className="rounded-2xl bg-[#090909] border border-white/[0.08] p-5 flex flex-col justify-between hover:border-white/20 transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[10px] font-mono text-[#A8FF00] font-bold uppercase tracking-wider">
                      Civic Infrastructure • DAO
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#A8FF00]/10 text-[#A8FF00] border border-[#A8FF00]/30">
                      ESCROW_SETTLED
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1.5">
                    Roadway Hazard Detour &amp; Lane Clearance Verification
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    Municipal infrastructure DAOs automatically disburse maintenance treasury payouts upon cryptographic proof that road obstructions have been cleared.
                  </p>
                </div>
                <div className="bg-[#050505] rounded-xl border border-white/[0.06] p-3 font-mono text-[11px] grid grid-cols-3 gap-2 text-center">
                  <div>
                    <span className="text-[10px] text-zinc-500 block">Proximity</span>
                    <span className="text-white font-bold">18.1m / 200m</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 block">Bounty</span>
                    <span className="text-[#A8FF00] font-bold">0.45 SOL</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 block">Agreement</span>
                    <span className="text-emerald-400 font-bold">99.1% Match</span>
                  </div>
                </div>
              </div>

              {/* Use Case 3: Autonomous Logistics */}
              <div className="rounded-2xl bg-[#090909] border border-white/[0.08] p-5 flex flex-col justify-between hover:border-white/20 transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[10px] font-mono text-[#A8FF00] font-bold uppercase tracking-wider">
                      Autonomous Logistics • Retail
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      SEALED_PROOF
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1.5">
                    Parcel Locker Bay Physical Integrity &amp; Drop-Off
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    Autonomous delivery networks confirm smart locker compartment seals and physical handoffs, triggering supply chain insurance release without manual audits.
                  </p>
                </div>
                <div className="bg-[#050505] rounded-xl border border-white/[0.06] p-3 font-mono text-[11px] grid grid-cols-3 gap-2 text-center">
                  <div>
                    <span className="text-[10px] text-zinc-500 block">Proximity</span>
                    <span className="text-white font-bold">8.6m / 200m</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 block">Bounty</span>
                    <span className="text-[#A8FF00] font-bold">0.30 SOL</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 block">Agreement</span>
                    <span className="text-emerald-400 font-bold">97.8% Match</span>
                  </div>
                </div>
              </div>

              {/* Use Case 4: Micromobility */}
              <div className="rounded-2xl bg-[#090909] border border-white/[0.08] p-5 flex flex-col justify-between hover:border-white/20 transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[10px] font-mono text-[#A8FF00] font-bold uppercase tracking-wider">
                      Micromobility • Fleet
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/30">
                      DISPATCH_ACTIVE
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1.5">
                    Autonomous Bikeshare Hub Dock Availability
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    Decentralized transit protocols verify real-world bike rack capacity and mechanical locks, dynamically incentivizing commuter rebalancing bounties in real time.
                  </p>
                </div>
                <div className="bg-[#050505] rounded-xl border border-white/[0.06] p-3 font-mono text-[11px] grid grid-cols-3 gap-2 text-center">
                  <div>
                    <span className="text-[10px] text-zinc-500 block">Proximity</span>
                    <span className="text-white font-bold">15.2m / 200m</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 block">Bounty</span>
                    <span className="text-[#A8FF00] font-bold">0.50 SOL</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 block">Agreement</span>
                    <span className="text-emerald-400 font-bold">98.9% Match</span>
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
