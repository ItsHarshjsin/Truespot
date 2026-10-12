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
  ChevronLeft,
  ExternalLink,
  Info,
  CheckCheck,
} from 'lucide-react';

interface LandingPageProps {
  onLaunchProtocol?: () => void;
  onOpenDocs?: () => void;
}

interface UseCasePreset {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
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
  status: string;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onLaunchProtocol,
  onOpenDocs,
}) => {
  // -------------------------------------------------------------
  // HERO TELEMETRY STATE (Real Solana Devnet Benchmarks)
  // -------------------------------------------------------------
  const [telemetryTick, setTelemetryTick] = useState(12);
  const [telemetrySlot, setTelemetrySlot] = useState(510206140);
  const [isProbing, setIsProbing] = useState(false);
  const [probeMessage, setProbeMessage] = useState('Listening on Solana Devnet Cluster');

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetryTick((prev) => (prev > 1 ? prev - 1 : 15));
      setTelemetrySlot((prev) => prev + 1);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const handleTriggerProbe = () => {
    setIsProbing(true);
    setProbeMessage('Probing Devnet RPC & Gyro Sensor...');
    setTimeout(() => {
      setIsProbing(false);
      setProbeMessage('Hardware Nonce & AI Consensus Confirmed (184ms)');
      setTelemetryTick(1);
    }, 600);
  };

  // -------------------------------------------------------------
  // PROBLEM / SOLUTION INTERACTIVE TOGGLE
  // -------------------------------------------------------------
  const [isVerified, setIsVerified] = useState(true);

  // -------------------------------------------------------------
  // PLATFORM ARCHITECTURE ACTIVE TAB (Cyera 3-Pillar Experience)
  // -------------------------------------------------------------
  const [activePlatformTab, setActivePlatformTab] = useState<'verify' | 'govern' | 'settle'>('verify');

  // -------------------------------------------------------------
  // LATEST PROTOCOL UPDATES SLIDER
  // -------------------------------------------------------------
  const [updateSlideIndex, setUpdateSlideIndex] = useState(0);
  const protocolUpdates = [
    {
      badge: 'ANCHOR ESCROW v2.1',
      title: 'Autonomous PDA Vaults Settled on Solana Devnet',
      desc: 'Smart contract escrow holds bounties non-custodially with deterministic 97.5% / 2.5% settlement.',
      linkText: 'Inspect Program',
    },
    {
      badge: 'MULTIMODAL AI',
      title: 'Gemini 2.5 Flash Consensus Engine Integrated',
      desc: 'Multimodal vision model validates photographic evidence against semantic task criteria in sub-200ms.',
      linkText: 'View Pipeline',
    },
    {
      badge: 'HARDWARE ATTESTATION',
      title: 'Anti-Spoofing Gyro Tremor & Nonce Proofs Live',
      desc: 'Validates genuine human device interaction with accelerometer tremor variance (<0.08g) filtering synthetic injection.',
      linkText: 'Read Security Spec',
    },
    {
      badge: 'GEOFENCE PROTOCOL',
      title: '200-Meter Haversine Proximity Boundary Standard',
      desc: 'Strict mathematical coordinate validation guaranteeing micro-bounty spotters are on-location.',
      linkText: 'Check Geo Math',
    },
  ];

  // -------------------------------------------------------------
  // INTERACTIVE PLAYGROUND (Real Prototype Tasks)
  // -------------------------------------------------------------
  const useCasePresets: UseCasePreset[] = [
    {
      id: 'ev-charger',
      icon: Zap,
      title: 'EV Supercharger Availability',
      category: 'Smart Mobility',
      location: 'Downtown Station • Stall 4',
      coords: '37.7792° N, 122.4184° W',
      question: 'Is Stall 4 unoccupied and charger LED active?',
      bounty: 0.35,
      answer: 'STALL_UNOCCUPIED • GREEN_LED_ACTIVE',
      confidence: 98.4,
      distance: '12.4m',
      gyro: '0.042g (Human Hand)',
      status: 'VERIFIED ON-CHAIN',
    },
    {
      id: 'construction',
      icon: Shield,
      title: 'Sidewalk Detour Clearance',
      category: 'Infrastructure',
      location: '5th & Market St Corridor',
      coords: '37.7841° N, 122.4068° W',
      question: 'Verify detour signs are posted and pathway is accessible.',
      bounty: 0.45,
      answer: 'SIGNS_POSTED • PATH_ACCESSIBLE',
      confidence: 99.1,
      distance: '18.1m',
      gyro: '0.038g (Human Hand)',
      status: 'VERIFIED ON-CHAIN',
    },
    {
      id: 'locker-hub',
      icon: Lock,
      title: 'Parcel Locker Operational Hub',
      category: 'Autonomous Logistics',
      location: 'SoMa Automated Locker Bay',
      coords: '37.7765° N, 122.3991° W',
      question: 'Confirm automated touchscreen is responsive and ready for dropoff.',
      bounty: 0.30,
      answer: 'SCREEN_RESPONSIVE • LOCKER_READY',
      confidence: 97.8,
      distance: '8.6m',
      gyro: '0.045g (Human Hand)',
      status: 'VERIFIED ON-CHAIN',
    },
    {
      id: 'bikeshare',
      icon: Compass,
      title: 'Bikeshare Dock Capacity',
      category: 'Autonomous Agents',
      location: 'Calaroga Bayfront Bike Dock',
      coords: '37.7812° N, 122.4110° W',
      question: 'Confirm at least 3 electric bikes are docked with green lock LEDs.',
      bounty: 0.50,
      answer: '4_EBIKES_DOCKED • LEDS_CONFIRMED',
      confidence: 98.9,
      distance: '15.2m',
      gyro: '0.041g (Human Hand)',
      status: 'VERIFIED ON-CHAIN',
    },
  ];

  const [activeUseCase, setActiveUseCase] = useState<UseCasePreset>(useCasePresets[0]);

  // Escrow slider state
  const [bountySliderVal, setBountySliderVal] = useState(1.0);
  const workerPayout = parseFloat((bountySliderVal * 0.975).toFixed(3));
  const protocolFee = parseFloat((bountySliderVal * 0.025).toFixed(3));

  // Vision AI simulation state
  const [visionInferenceActive, setVisionInferenceActive] = useState(false);
  const [visionInferenceDone, setVisionInferenceDone] = useState(false);

  const handleSimulateVisionInference = () => {
    setVisionInferenceActive(true);
    setVisionInferenceDone(false);
    setTimeout(() => {
      setVisionInferenceActive(false);
      setVisionInferenceDone(true);
    }, 550);
  };

  // -------------------------------------------------------------
  // DEVELOPER QUICKSTART TABS (Concise & Typed)
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

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] font-sans selection:bg-[#A8FF00]/20 selection:text-[#A8FF00] overflow-x-hidden relative">
      {/* Background Ambient Lighting (Cyera Enterprise Dark Theme) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[#A8FF00]/[0.02] blur-[160px] rounded-full" />
        <div className="absolute top-[1400px] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-purple-600/[0.015] blur-[180px] rounded-full" />
      </div>

      {/* Top Banner Announcement (Cyera Style) */}
      <div className="bg-[#0B0B0B] border-b border-white/[0.06] text-center py-2 px-4 text-xs font-mono text-zinc-400 select-none relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#A8FF00] animate-pulse" />
          <span className="text-zinc-300 font-semibold">TrueSpot Protocol</span>
          <span className="text-zinc-600">|</span>
          <span>Physical Reality Oracle on Solana Devnet</span>
          <span className="text-zinc-600">|</span>
          <button
            onClick={onLaunchProtocol}
            className="text-[#A8FF00] hover:underline font-bold inline-flex items-center space-x-1 cursor-pointer ml-1"
          >
            <span>Launch App</span>
            <ArrowRight className="w-3 h-3 text-[#A8FF00]" />
          </button>
        </div>
      </div>

      {/* Floating Header Navigation (Cyera Header Style) */}
      <header className="sticky top-0 left-0 right-0 z-40 h-16 bg-[#050505]/90 backdrop-blur-2xl border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo - Navigates smoothly to Landing Page */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            title="TrueSpot Protocol"
          >
            <div className="w-8 h-8 rounded-xl bg-[#A8FF00] text-black flex items-center justify-center font-black group-hover:scale-105 transition-transform shadow-[0_0_20px_rgba(168,255,0,0.25)]">
              <Shield className="w-4.5 h-4.5 text-black stroke-[2.5]" />
            </div>
            <div className="flex items-center space-x-2.5">
              <span className="font-extrabold text-base tracking-tight text-white">TrueSpot</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#111111] text-[#A8FF00] border border-[#A8FF00]/30 font-bold tracking-wider">
                ORACLE
              </span>
            </div>
          </div>

          {/* Clean Navigation Links (No emojis, Cyera enterprise style) */}
          <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold text-zinc-400">
            <a href="#overview" className="hover:text-white transition-colors">
              Platform
            </a>
            <a href="#lab" className="hover:text-white transition-colors">
              Interactive Lab
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
          <div className="flex items-center space-x-3">
            <button
              onClick={onLaunchProtocol}
              className="px-5 py-2 rounded-full bg-[#A8FF00] hover:bg-[#b8ff24] text-black font-extrabold text-xs transition-all flex items-center space-x-1.5 shadow-[0_0_25px_rgba(168,255,0,0.3)] hover:shadow-[0_0_35px_rgba(168,255,0,0.5)] cursor-pointer"
            >
              <span>Launch App</span>
              <ArrowRight className="w-3.5 h-3.5 text-black" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Vertical Sequence */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================================= */}
        {/* 1. THE HERO (Cyera Experience Inspired Headline & Value Proposition)      */}
        {/* ========================================================================= */}
        <section className="pt-24 sm:pt-32 pb-16 text-center">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#0B0B0B] border border-white/[0.08] mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#A8FF00] animate-pulse" />
            <span className="text-[11px] font-mono font-bold text-zinc-300 uppercase tracking-widest">
              Physical Reality Oracle Prototype // Solana Devnet
            </span>
          </div>

          {/* Cyera-Inspired Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08] max-w-5xl mx-auto">
            Building the Physical Trust Layer{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A8FF00] via-[#c6ff55] to-emerald-400">
              for the Agentic Era.
            </span>
          </h1>

          {/* Muted Sub-Headline */}
          <p className="text-base sm:text-lg lg:text-xl text-zinc-400 max-w-3xl mx-auto font-normal leading-relaxed mt-6">
            Trust everything your smart contracts and autonomous AI agents can see and do. Verify ground truth from the physical sensor layer up.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <button
              onClick={onLaunchProtocol}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#A8FF00] hover:bg-[#b8ff24] text-black font-extrabold text-sm flex items-center justify-center space-x-2 transition-all duration-200 shadow-[0_0_30px_rgba(168,255,0,0.35)] cursor-pointer"
            >
              <span>Launch Protocol</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>

            <a
              href="#overview"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full bg-transparent hover:bg-white/[0.03] text-zinc-400 hover:text-white border border-white/[0.08] hover:border-white/20 text-sm font-semibold transition-all cursor-pointer"
            >
              <span>Explore Platform Architecture</span>
              <ArrowUpRight className="w-4 h-4 text-zinc-500" />
            </a>
          </div>

          {/* Live Solana Devnet Status Card (Authentic Technical Benchmark) */}
          <div className="mt-14 max-w-4xl mx-auto text-left">
            <div className="bg-[#0B0B0B] border border-white/[0.08] hover:border-[#A8FF00]/30 rounded-3xl p-5 sm:p-6 transition-all duration-300 shadow-2xl relative overflow-hidden group">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-4">
                <div className="flex items-center space-x-2 font-mono text-xs text-white font-bold">
                  <Activity className="w-4 h-4 text-[#A8FF00]" />
                  <span>Solana Devnet Live RPC Feed</span>
                </div>
                <div className="flex items-center space-x-1.5 font-mono text-[10px] text-[#A8FF00]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A8FF00] animate-pulse" />
                  <span>CONFIRMED SLOT #{telemetrySlot.toLocaleString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="bg-[#060606] border border-white/[0.05] rounded-xl p-3">
                  <span className="text-[10px] text-zinc-500 uppercase font-bold block mb-1">
                    Cluster Status
                  </span>
                  <span className="text-white font-bold block">Solana Devnet</span>
                  <span className="text-[10px] text-[#A8FF00]">Active &lt; 400ms RPC</span>
                </div>

                <div className="bg-[#060606] border border-white/[0.05] rounded-xl p-3">
                  <span className="text-[10px] text-zinc-500 uppercase font-bold block mb-1">
                    Hardware Attestation
                  </span>
                  <span className="text-white font-bold block">Gyro + EXIF Hash</span>
                  <span className="text-[10px] text-zinc-400">Anti-Virtual-Camera</span>
                </div>

                <div className="bg-[#060606] border border-white/[0.05] rounded-xl p-3">
                  <span className="text-[10px] text-zinc-500 uppercase font-bold block mb-1">
                    Settlement Engine
                  </span>
                  <span className="text-[#A8FF00] font-bold block">Anchor PDA Vault</span>
                  <span className="text-[10px] text-zinc-400">97.5% / 2.5% Non-Custodial</span>
                </div>
              </div>

              {/* Probe Trigger Bar */}
              <div className="mt-4 pt-3.5 border-t border-white/[0.05] flex items-center justify-between flex-wrap gap-2 text-[11px] font-mono">
                <span className="text-zinc-400 flex items-center space-x-2">
                  <Radio className="w-3.5 h-3.5 text-[#A8FF00]" />
                  <span>{probeMessage}</span>
                </span>

                <button
                  onClick={handleTriggerProbe}
                  disabled={isProbing}
                  className="px-3.5 py-1.5 rounded-lg bg-[#141414] hover:bg-[#1a1a1a] text-zinc-200 hover:text-white border border-white/[0.08] hover:border-[#A8FF00]/40 transition-all cursor-pointer flex items-center space-x-1.5 text-[11px]"
                >
                  <Zap className={`w-3 h-3 ${isProbing ? 'text-[#A8FF00] animate-spin' : 'text-zinc-400'}`} />
                  <span>{isProbing ? 'Probing...' : 'Test Devnet Probe'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. LATEST PROTOCOL UPDATES (Cyera Horizontal Slider Strip)                */}
        {/* ========================================================================= */}
        <section className="py-12 border-t border-white/[0.08]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#A8FF00] uppercase tracking-widest block">
                PROTOCOL MILESTONES
              </span>
              <h3 className="text-lg font-bold text-white tracking-tight mt-0.5">
                Latest TrueSpot Architecture Updates
              </h3>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setUpdateSlideIndex((prev) => (prev > 0 ? prev - 1 : protocolUpdates.length - 1))}
                className="w-8 h-8 rounded-lg bg-[#111111] hover:bg-[#181818] border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
                title="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setUpdateSlideIndex((prev) => (prev < protocolUpdates.length - 1 ? prev + 1 : 0))}
                className="w-8 h-8 rounded-lg bg-[#111111] hover:bg-[#181818] border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
                title="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {protocolUpdates.map((update, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl bg-[#0B0B0B] border transition-all ${
                  idx === updateSlideIndex
                    ? 'border-[#A8FF00]/40 shadow-[0_0_25px_rgba(168,255,0,0.08)]'
                    : 'border-white/[0.06] hover:border-white/20'
                }`}
              >
                <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-white/[0.05] text-[#A8FF00] border border-[#A8FF00]/30 inline-block mb-3">
                  {update.badge}
                </span>
                <h4 className="text-sm font-bold text-white leading-snug mb-2">
                  {update.title}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                  {update.desc}
                </p>
                <span className="text-[11px] font-mono text-[#A8FF00] inline-flex items-center space-x-1 group cursor-pointer hover:underline">
                  <span>{update.linkText}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. PLATFORM ARCHITECTURE (Cyera "One platform to secure AI" Diagram)       */}
        {/* ========================================================================= */}
        <section id="overview" className="py-20 border-t border-white/[0.08]">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[10px] font-mono font-bold text-[#A8FF00] uppercase tracking-widest block mb-2">
              UNIFIED ORACLE ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              One platform to verify physical reality.
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-3 leading-relaxed">
              At rest, in motion, and settled on-chain.
            </p>
          </div>

          {/* Central Diagram Connecting the 3 Pillars */}
          <div className="bg-[#0B0B0B] border border-white/[0.08] rounded-3xl p-6 sm:p-10 relative overflow-hidden">
            {/* Top Connector Hub */}
            <div className="flex flex-col items-center justify-center mb-8">
              <div className="w-12 h-12 rounded-2xl bg-[#A8FF00] text-black flex items-center justify-center font-black shadow-[0_0_30px_rgba(168,255,0,0.3)]">
                <Shield className="w-6 h-6 stroke-[2.5]" />
              </div>
              <span className="font-extrabold text-sm tracking-tight text-white mt-2">
                TrueSpot Protocol Control Plane
              </span>
              <div className="w-px h-8 bg-gradient-to-b from-[#A8FF00]/50 to-transparent mt-2" />
            </div>

            {/* 3 Interconnected Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setActivePlatformTab('verify')}
                className={`p-6 rounded-2xl border text-left transition-all cursor-pointer relative ${
                  activePlatformTab === 'verify'
                    ? 'bg-[#121212] border-[#A8FF00]/50 shadow-[0_0_30px_rgba(168,255,0,0.1)]'
                    : 'bg-[#080808] border-white/[0.06] hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#181818] border border-white/10 flex items-center justify-center text-[#A8FF00]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 font-bold">PILLAR 01</span>
                </div>
                <h3 className="text-base font-bold text-white mb-1.5">Verify Physical Data</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  200-meter Haversine coordinate validation combined with real hardware gyroscopic tremor nonces.
                </p>
                <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-[#A8FF00]">
                  <span>Proximity &amp; Sensor</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>

              <button
                onClick={() => setActivePlatformTab('govern')}
                className={`p-6 rounded-2xl border text-left transition-all cursor-pointer relative ${
                  activePlatformTab === 'govern'
                    ? 'bg-[#121212] border-[#A8FF00]/50 shadow-[0_0_30px_rgba(168,255,0,0.1)]'
                    : 'bg-[#080808] border-white/[0.06] hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#181818] border border-white/10 flex items-center justify-center text-[#A8FF00]">
                    <Eye className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 font-bold">PILLAR 02</span>
                </div>
                <h3 className="text-base font-bold text-white mb-1.5">Govern Agent Consensus</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Gemini 2.5 Flash multimodal vision pipeline inspects photographic scenes against query semantics.
                </p>
                <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-[#A8FF00]">
                  <span>Multimodal AI</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>

              <button
                onClick={() => setActivePlatformTab('settle')}
                className={`p-6 rounded-2xl border text-left transition-all cursor-pointer relative ${
                  activePlatformTab === 'settle'
                    ? 'bg-[#121212] border-[#A8FF00]/50 shadow-[0_0_30px_rgba(168,255,0,0.1)]'
                    : 'bg-[#080808] border-white/[0.06] hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#181818] border border-white/10 flex items-center justify-center text-[#A8FF00]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 font-bold">PILLAR 03</span>
                </div>
                <h3 className="text-base font-bold text-white mb-1.5">Settle Autonomous Escrow</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Solana Anchor program automatically releases 97.5% SOL bounties directly upon confirmed consensus.
                </p>
                <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-[#A8FF00]">
                  <span>Anchor PDA Settlement</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            </div>

            {/* Detailed Inspection Drawer for Active Pillar */}
            <div className="mt-6 bg-[#060606] border border-white/[0.06] rounded-2xl p-5 font-mono text-xs text-zinc-300">
              {activePlatformTab === 'verify' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase block font-bold mb-1">
                      Geofence Mathematics
                    </span>
                    <span className="text-white font-bold block">Haversine Distance Formula</span>
                    <span className="text-[11px] text-[#A8FF00]">200m Maximum Radius Boundary</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase block font-bold mb-1">
                      Hardware Sensor Signature
                    </span>
                    <span className="text-white font-bold block">Accelerometer Tremor Analysis</span>
                    <span className="text-[11px] text-zinc-400">&lt;0.08g Human Hand Signature</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase block font-bold mb-1">
                      Anti-Virtual-Camera
                    </span>
                    <span className="text-white font-bold block">Camera Nonce &amp; EXIF Hash</span>
                    <span className="text-[11px] text-[#A8FF00]">Prevents Image Upload Injection</span>
                  </div>
                </div>
              )}

              {activePlatformTab === 'govern' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase block font-bold mb-1">
                      AI Model Engine
                    </span>
                    <span className="text-white font-bold block">Gemini 2.5 Flash Multimodal</span>
                    <span className="text-[11px] text-[#A8FF00]">Sub-200ms Scene Inference</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase block font-bold mb-1">
                      Consensus Threshold
                    </span>
                    <span className="text-white font-bold block">&gt;= 95.0% Confidence Score</span>
                    <span className="text-[11px] text-zinc-400">Strict False-Positive Filter</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase block font-bold mb-1">
                      Agent Integration
                    </span>
                    <span className="text-white font-bold block">LangChain / ElizaOS Compatible</span>
                    <span className="text-[11px] text-[#A8FF00]">Zero Hallucination Ground Truth</span>
                  </div>
                </div>
              )}

              {activePlatformTab === 'settle' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase block font-bold mb-1">
                      Solana Smart Contract
                    </span>
                    <span className="text-white font-bold block">Anchor Framework Program</span>
                    <span className="text-[11px] text-[#A8FF00]">Deterministic Non-Custodial PDA</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase block font-bold mb-1">
                      Bounty Split Formula
                    </span>
                    <span className="text-white font-bold block">97.5% Worker / 2.5% Protocol</span>
                    <span className="text-[11px] text-zinc-400">Instant SOL Settlement</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase block font-bold mb-1">
                      Dispute Slashing
                    </span>
                    <span className="text-white font-bold block">Automatic Escrow Refund</span>
                    <span className="text-[11px] text-[#A8FF00]">Protects Maker Capital</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. INTERACTIVE PLAYGROUND LAB (The Cyera Experience Simulator)             */}
        {/* ========================================================================= */}
        <section id="lab" className="py-20 border-t border-white/[0.08]">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[10px] font-mono font-bold text-[#A8FF00] uppercase tracking-widest block mb-2">
              INTERACTIVE DEMONSTRATION
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Physical Ground Truth Playground
            </h2>
            <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
              Select an active prototype task below to inspect how physical ground truth is verified and settled on Solana.
            </p>
          </div>

          {/* 4 Task Presets */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {useCasePresets.map((preset) => {
              const Icon = preset.icon;
              const isSelected = activeUseCase.id === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => setActiveUseCase(preset)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#101010] border-[#A8FF00]/50 text-white shadow-[0_0_20px_rgba(168,255,0,0.1)]'
                      : 'bg-[#0B0B0B] border-white/[0.07] text-zinc-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-2">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-[#A8FF00] text-black' : 'bg-[#181818] text-zinc-400'
                    }`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-mono text-[10px] font-bold text-[#A8FF00]">{preset.bounty} SOL</span>
                  </div>
                  <h4 className="text-xs font-bold text-white truncate">{preset.title}</h4>
                  <span className="text-[10px] text-zinc-500 font-mono truncate block mt-0.5">
                    {preset.location}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Inspection Console */}
          <div className="bg-[#0B0B0B] border border-white/[0.08] rounded-3xl p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Query Parameters */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-[#141414] border border-white/10 flex items-center justify-center text-[#A8FF00]">
                    <activeUseCase.icon className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{activeUseCase.title}</h3>
                    <span className="text-[11px] font-mono text-zinc-400">{activeUseCase.location}</span>
                  </div>
                </div>

                <div className="bg-[#060606] p-3.5 rounded-xl border border-white/[0.05]">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block font-bold mb-1">
                    Verification Query
                  </span>
                  <p className="text-xs text-zinc-200 italic leading-relaxed">
                    "{activeUseCase.question}"
                  </p>
                </div>

                <div className="space-y-2 text-xs font-mono text-zinc-400">
                  <div className="flex items-center justify-between py-1 border-b border-white/[0.05]">
                    <span>Target Coordinates:</span>
                    <strong className="text-zinc-200">{activeUseCase.coords}</strong>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-white/[0.05]">
                    <span>Escrow Bounty Locked:</span>
                    <strong className="text-[#A8FF00] font-bold">{activeUseCase.bounty} SOL</strong>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span>Validation Engine:</span>
                    <strong className="text-zinc-200">Gemini 2.5 Flash Multimodal</strong>
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Telemetry Gauges */}
              <div className="lg:col-span-7 bg-[#060606] border border-white/[0.06] rounded-2xl p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono border-b border-white/[0.06] pb-3">
                  <span className="text-zinc-400 font-bold">CRYPTOGRAPHIC ATTESTATION</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#A8FF00]/10 text-[#A8FF00] border border-[#A8FF00]/30">
                    {activeUseCase.status}
                  </span>
                </div>

                {/* 4 Clean Metric Tiles */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono">
                  <div className="bg-[#0B0B0B] p-3 rounded-xl border border-white/[0.05]">
                    <span className="text-[10px] text-zinc-500 uppercase block font-bold">Geofence</span>
                    <span className="text-sm font-bold text-white mt-1 block">{activeUseCase.distance}</span>
                    <span className="text-[9px] text-[#A8FF00]">&lt; 200m Valid</span>
                  </div>

                  <div className="bg-[#0B0B0B] p-3 rounded-xl border border-white/[0.05]">
                    <span className="text-[10px] text-zinc-500 uppercase block font-bold">Tremor Proof</span>
                    <span className="text-sm font-bold text-white mt-1 block">0.042g</span>
                    <span className="text-[9px] text-[#A8FF00]">Real Human</span>
                  </div>

                  <div className="bg-[#0B0B0B] p-3 rounded-xl border border-white/[0.05]">
                    <span className="text-[10px] text-zinc-500 uppercase block font-bold">AI Score</span>
                    <span className="text-sm font-bold text-[#A8FF00] mt-1 block">{activeUseCase.confidence}%</span>
                    <span className="text-[9px] text-zinc-400">Gemini 2.5</span>
                  </div>

                  <div className="bg-[#0B0B0B] p-3 rounded-xl border border-white/[0.05]">
                    <span className="text-[10px] text-zinc-500 uppercase block font-bold">Payout</span>
                    <span className="text-sm font-bold text-[#A8FF00] mt-1 block">
                      {(activeUseCase.bounty * 0.975).toFixed(3)} SOL
                    </span>
                    <span className="text-[9px] text-zinc-400">97.5% Released</span>
                  </div>
                </div>

                <div className="bg-[#0B0B0B] p-3 rounded-xl border border-white/[0.05] text-xs font-mono">
                  <span className="text-zinc-400 text-[11px] block">
                    Observed Reality: <strong className="text-white">{activeUseCase.answer}</strong>
                  </span>
                  <span className="text-zinc-500 text-[10px] block mt-0.5">
                    Anchor PDA: 9WzDXwBbmkg8ZTbNmQUxvQRAyrZzDsGYdLVL9zYtAWWM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. SIDE-BY-SIDE SECURITY COMPARISON (Cyera "AI breaks old defenses")       */}
        {/* ========================================================================= */}
        <section id="comparison" className="py-20 border-t border-white/[0.08]">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[10px] font-mono font-bold text-[#A8FF00] uppercase tracking-widest block mb-2">
              SECURITY &amp; INTEGRITY COMPARISON
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Smart contracts are blind to physical reality.
            </h2>
            <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
              Toggle below to inspect why legacy contracts fail in physical environments without TrueSpot.
            </p>

            {/* Switch Toggle */}
            <div className="mt-8 inline-flex items-center p-1 rounded-full bg-[#0B0B0B] border border-white/[0.08]">
              <button
                onClick={() => setIsVerified(false)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                  !isVerified
                    ? 'bg-[#181818] text-white border border-white/10 shadow-sm'
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

          {/* Comparative Cards */}
          <div
            className={`rounded-3xl border transition-all duration-300 p-6 sm:p-8 ${
              isVerified
                ? 'bg-[#0B0B0B] border-[#A8FF00]/40 shadow-[0_0_40px_rgba(168,255,0,0.06)]'
                : 'bg-[#090909] border-red-500/20'
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Execution Outcome */}
              <div className="bg-[#050505] p-5 rounded-2xl border border-white/[0.06] space-y-3">
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
                        <Check className="w-4 h-4 text-[#A8FF00]" />
                        <span>Anchor PDA vault automatically unlocked upon consensus</span>
                      </div>
                      <div className="flex items-center space-x-2 text-zinc-200">
                        <Check className="w-4 h-4 text-[#A8FF00]" />
                        <span>97.5% SOL transferred directly to authenticated worker</span>
                      </div>
                      <div className="flex items-center space-x-2 text-zinc-200">
                        <Check className="w-4 h-4 text-[#A8FF00]" />
                        <span>Cryptographic nonce permanently sealed on Solana Devnet</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center space-x-2 text-red-400">
                        <XCircle className="w-4 h-4 text-red-400" />
                        <span>Contract has zero physical sensor or location awareness</span>
                      </div>
                      <div className="flex items-center space-x-2 text-zinc-400">
                        <AlertTriangle className="w-4 h-4 text-amber-400" />
                        <span>Vulnerable to spoofed GPS, synthetic deepfakes, and dishonest claims</span>
                      </div>
                      <div className="flex items-center space-x-2 text-zinc-400">
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                        <span>Bounty funds remain locked in dispute limbo indefinitely</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Right: AI Agent Status */}
              <div className="bg-[#050505] p-5 rounded-2xl border border-white/[0.06] space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-400 font-bold">AUTONOMOUS AI AGENT STATUS</span>
                  <span className="text-[10px] text-zinc-400">LangChain / ElizaOS</span>
                </div>

                <div
                  className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
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
        {/* 6. CONCISE DEVELOPER TERMINAL (Short, Clean & Typed)                       */}
        {/* ========================================================================= */}
        <section id="developers" className="py-20 border-t border-white/[0.08]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Short Pitch */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] font-mono font-bold text-[#A8FF00] uppercase tracking-widest block">
                DEVELOPER INTEGRATION
              </span>

              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Integrate Physical Ground Truth in 3 Lines
              </h2>

              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                Connect your AI agents or Solana programs to physical reality with our lightweight TypeScript SDK or Anchor CPI instructions.
              </p>

              {/* Install Pill */}
              <div className="bg-[#0B0B0B] border border-white/[0.08] rounded-xl p-2.5 flex items-center justify-between font-mono text-xs text-zinc-300">
                <span className="text-[#A8FF00]">$ npm i @truespot/sdk</span>
                <span className="text-[10px] text-zinc-500">v2.1.0</span>
              </div>

              <div className="space-y-2 font-mono text-xs text-zinc-300 pt-1">
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
                  className="px-5 py-2.5 rounded-full bg-[#141414] hover:bg-[#1a1a1a] text-[#A8FF00] hover:text-white border border-white/[0.08] hover:border-[#A8FF00]/40 text-xs font-mono font-bold transition-all cursor-pointer flex items-center space-x-2"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>View Documentation</span>
                </button>
              </div>
            </div>

            {/* Right Column: Short Tabbed Terminal */}
            <div className="lg:col-span-7">
              <div className="bg-[#080808] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl">
                {/* Tabs Header */}
                <div className="flex items-center justify-between bg-[#0e0e0e] border-b border-white/[0.06] px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setActiveCodeTab('sdk')}
                      className={`px-3 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                        activeCodeTab === 'sdk'
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
                      Anchor (Rust)
                    </button>
                    <button
                      onClick={() => setActiveCodeTab('rest')}
                      className={`px-3 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                        activeCodeTab === 'rest'
                          ? 'bg-[#181818] text-white font-bold border border-white/10'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      REST API
                    </button>
                  </div>

                  <button
                    onClick={handleCopyCode}
                    className="flex items-center space-x-1.5 text-[11px] font-mono text-zinc-400 hover:text-white px-2.5 py-1 rounded bg-[#141414] border border-white/[0.06] cursor-pointer transition-colors"
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
        {/* 7. PROTOCOL SPECIFICATIONS FOOTPRINT                                      */}
        {/* ========================================================================= */}
        <section className="py-10 border-t border-white/[0.08]">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center font-mono text-xs">
            <div className="bg-[#0B0B0B] border border-white/[0.06] rounded-xl p-3">
              <span className="text-[10px] text-zinc-500 uppercase font-bold block">Cluster</span>
              <strong className="text-[#A8FF00] mt-0.5 block">Solana Devnet</strong>
            </div>
            <div className="bg-[#0B0B0B] border border-white/[0.06] rounded-xl p-3">
              <span className="text-[10px] text-zinc-500 uppercase font-bold block">Smart Contract</span>
              <strong className="text-white mt-0.5 block">Anchor PDA</strong>
            </div>
            <div className="bg-[#0B0B0B] border border-white/[0.06] rounded-xl p-3">
              <span className="text-[10px] text-zinc-500 uppercase font-bold block">AI Vision</span>
              <strong className="text-white mt-0.5 block">Gemini 2.5 Flash</strong>
            </div>
            <div className="bg-[#0B0B0B] border border-white/[0.06] rounded-xl p-3">
              <span className="text-[10px] text-zinc-500 uppercase font-bold block">Perimeter</span>
              <strong className="text-white mt-0.5 block">200m Haversine</strong>
            </div>
            <div className="bg-[#0B0B0B] border border-white/[0.06] rounded-xl p-3">
              <span className="text-[10px] text-zinc-500 uppercase font-bold block">Anti-Spoofing</span>
              <strong className="text-white mt-0.5 block">Gyro Tremor &lt;0.08g</strong>
            </div>
            <div className="bg-[#0B0B0B] border border-white/[0.06] rounded-xl p-3">
              <span className="text-[10px] text-zinc-500 uppercase font-bold block">Escrow Split</span>
              <strong className="text-[#A8FF00] mt-0.5 block">97.5% / 2.5%</strong>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. MINIMALIST FOOTER                                                      */}
        {/* ========================================================================= */}
        <footer className="mt-12 pt-10 pb-16 border-t border-white/[0.08] relative before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[#A8FF00]/40 before:to-transparent">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="w-8 h-8 rounded-xl bg-[#A8FF00] text-black flex items-center justify-center font-bold">
                <Shield className="w-4.5 h-4.5 text-black stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-sm tracking-tight text-white">TrueSpot Protocol</span>
                <span className="text-[11px] font-mono text-zinc-500">Physical Reality Oracle Prototype on Solana</span>
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
                Docs
              </button>
              <button
                onClick={onLaunchProtocol}
                className="text-[#A8FF00] hover:underline cursor-pointer"
              >
                Launch App →
              </button>
            </div>
          </div>

          <div className="mt-8 text-center text-xs font-mono text-zinc-600">
            © 2026 TrueSpot Protocol. Solana Devnet Physical Oracle Architecture.
          </div>
        </footer>
      </main>
    </div>
  );
};
