import React from 'react';
import { Sparkles, Navigation } from 'lucide-react';

interface AnalogProximityDialProps {
  distanceMeters: number;
  placeName: string;
  onRelocateToBounty?: () => void;
  onSpawnNearbyBounties?: () => void;
}

export const AnalogProximityDial: React.FC<AnalogProximityDialProps> = ({
  distanceMeters,
  placeName,
  onRelocateToBounty,
  onSpawnNearbyBounties,
}) => {
  // Clamp distance between 0 and 200 meters for gauge needle rotation (-90deg to +90deg)
  const clampedDist = Math.min(Math.max(distanceMeters, 0), 200);
  const needleRotation = -90 + (clampedDist / 200) * 180;
  const isWithinGeofence = distanceMeters <= 200;

  // Format large distances cleanly (pure monochrome / neon, zero blue)
  const isKm = distanceMeters >= 1000;
  const formattedDistance = isKm
    ? (distanceMeters / 1000).toLocaleString(undefined, { maximumFractionDigits: 1 })
    : Math.round(distanceMeters).toLocaleString();
  const unitLabel = isKm ? 'km' : 'meters';

  // SVG Geometry constants
  const cx = 140;
  const cy = 148;
  const arcRadius = 96;
  const arcLength = Math.PI * arcRadius; // ~301.59 px for 180deg semicircle
  const progressRatio = Math.min(clampedDist / 200, 1);
  const activeStrokeLength = arcLength * progressRatio;

  // Major ticks: 0m, 50m, 100m, 150m, 200m
  const majorTicks = [
    { val: 0, label: '0m' },
    { val: 50, label: '50m' },
    { val: 100, label: '100m' },
    { val: 150, label: '150m' },
    { val: 200, label: '200m' },
  ];

  // Minor ticks every 10m
  const minorTicks = [10, 20, 30, 40, 60, 70, 80, 90, 110, 120, 130, 140, 160, 170, 180, 190];

  return (
    <div className="flex flex-col items-center justify-center select-none w-full">
      {/* High-End Obsidian & Neon Radar Tachometer Housing */}
      <div className="relative w-full max-w-[320px] bg-black rounded-3xl border border-[#A8FF00]/30 p-3.5 shadow-[0_0_35px_rgba(168,255,0,0.12)]">
        
        {/* Inner Gauge Bezel Face */}
        <div className="relative rounded-2xl bg-[#050505] border border-white/[0.08] pt-3.5 pb-2 px-3 overflow-hidden shadow-inner flex flex-col items-center">
          
          {/* Subtle Cyber Radar Ambient Sheen */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              background: 'radial-gradient(circle at 50% 100%, rgba(168, 255, 0, 0.15) 0%, rgba(0, 0, 0, 0.8) 75%)',
            }}
          />

          {/* Top Status Bar Inside Gauge */}
          <div className="w-full flex items-center justify-between px-2 pb-1 z-10">
            <div className="flex items-center space-x-1.5 text-[10px] font-mono text-[#A8FF00]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A8FF00] animate-pulse shadow-[0_0_6px_#A8FF00]" />
              <span className="font-extrabold tracking-widest">PROXIMITY HUD</span>
            </div>
            <div className="text-[9px] font-mono font-bold text-zinc-500 tracking-wider">
              MAX 200M
            </div>
          </div>

          {/* SVG Semicircular Radial Tachometer Gauge */}
          <div className="relative w-full flex items-center justify-center -mb-2 mt-0.5 z-10">
            <svg
              viewBox="0 0 280 168"
              className="w-full h-auto max-h-[165px] overflow-visible"
            >
              <defs>
                {/* Glow Filter for Active Neon Arc & Needle */}
                <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Neon Track Linear Gradient */}
                <linearGradient id="neonTrackGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#A8FF00" />
                  <stop offset="50%" stopColor="#C6FF33" />
                  <stop offset="100%" stopColor="#7CD100" />
                </linearGradient>

                {/* Needle Taper Gradient */}
                <linearGradient id="needleGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#3C6600" />
                  <stop offset="40%" stopColor="#A8FF00" />
                  <stop offset="100%" stopColor="#FFFFFF" />
                </linearGradient>

                {/* Radial Face Shading */}
                <radialGradient id="faceMesh" cx="50%" cy="100%" r="80%">
                  <stop offset="0%" stopColor="#142200" stopOpacity="0.4" />
                  <stop offset="70%" stopColor="#080808" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#020202" stopOpacity="1" />
                </radialGradient>
              </defs>

              {/* Background Arc Face Shading */}
              <path
                d="M 44 148 A 96 96 0 0 1 236 148 Z"
                fill="url(#faceMesh)"
                opacity="0.9"
              />

              {/* Concentric Radar Grid Arcs */}
              <path
                d="M 72 148 A 68 68 0 0 1 208 148"
                fill="none"
                stroke="#A8FF00"
                strokeOpacity="0.1"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <path
                d="M 98 148 A 42 42 0 0 1 182 148"
                fill="none"
                stroke="#A8FF00"
                strokeOpacity="0.12"
                strokeWidth="1"
                strokeDasharray="2 3"
              />

              {/* Radar Radial Crosshair Spokes */}
              <line x1="140" y1="148" x2="140" y2="106" stroke="#A8FF00" strokeOpacity="0.15" strokeWidth="1" />
              <line x1="140" y1="148" x2="92" y2="100" stroke="#A8FF00" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="2 3" />
              <line x1="140" y1="148" x2="188" y2="100" stroke="#A8FF00" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="2 3" />

              {/* Inactive Base Arc Track */}
              <path
                d="M 44 148 A 96 96 0 0 1 236 148"
                fill="none"
                stroke="#181818"
                strokeWidth="6"
                strokeLinecap="round"
              />

              {/* Active Glowing Neon Proximity Arc Track */}
              <path
                d="M 44 148 A 96 96 0 0 1 236 148"
                fill="none"
                stroke="url(#neonTrackGrad)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${activeStrokeLength} ${arcLength}`}
                filter="url(#neonGlow)"
                className="transition-all duration-700 ease-out"
              />

              {/* Minor Precision Tick Lines (every 10m) */}
              {minorTicks.map((val) => {
                const fraction = val / 200;
                const angleRad = Math.PI * (1 - fraction);
                const cos = Math.cos(angleRad);
                const sin = Math.sin(angleRad);
                const isQuarter = val % 25 === 0;
                const rIn = isQuarter ? 89 : 91;
                const rOut = isQuarter ? 101 : 99;
                return (
                  <line
                    key={val}
                    x1={cx + rIn * cos}
                    y1={cy - rIn * sin}
                    x2={cx + rOut * cos}
                    y2={cy - rOut * sin}
                    stroke={isQuarter ? '#A8FF00' : 'rgba(255,255,255,0.22)'}
                    strokeOpacity={isQuarter ? 0.7 : 0.4}
                    strokeWidth={isQuarter ? 1.5 : 1}
                  />
                );
              })}

              {/* Major Tick Marks & Precision Curved Labels */}
              {majorTicks.map(({ val, label }) => {
                const fraction = val / 200;
                const angleRad = Math.PI * (1 - fraction);
                const cos = Math.cos(angleRad);
                const sin = Math.sin(angleRad);
                const x1 = cx + 87 * cos;
                const y1 = cy - 87 * sin;
                const x2 = cx + 103 * cos;
                const y2 = cy - 103 * sin;
                const tx = cx + 72 * cos;
                const ty = cy - 72 * sin + 3;

                return (
                  <g key={val}>
                    {/* Tick Notch */}
                    <line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#A8FF00"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      filter="url(#neonGlow)"
                    />
                    {/* Tick Label */}
                    <text
                      x={tx}
                      y={ty}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#A8FF00"
                      fontSize="9.5"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      {label}
                    </text>
                  </g>
                );
              })}

              {/* Central Geofence HUD Badge in Center Face */}
              <g transform="translate(100, 114)">
                <rect
                  x="0"
                  y="0"
                  width="80"
                  height="16"
                  rx="8"
                  fill="#000000"
                  stroke="#A8FF00"
                  strokeOpacity="0.35"
                  strokeWidth="1"
                />
                <circle
                  cx="12"
                  cy="8"
                  r="2.5"
                  fill={isWithinGeofence ? '#A8FF00' : '#71717A'}
                  className={isWithinGeofence ? 'animate-pulse' : ''}
                />
                <text
                  x="46"
                  y="9"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={isWithinGeofence ? '#A8FF00' : '#A1A1AA'}
                  fontSize="8"
                  fontFamily="monospace"
                  fontWeight="bold"
                  letterSpacing="0.5"
                >
                  {isWithinGeofence ? 'TARGET LOCK' : 'SCANNING'}
                </text>
              </g>

              {/* Precision Cybernetic Rotating Needle */}
              <g
                style={{
                  transform: `rotate(${needleRotation}deg)`,
                  transformOrigin: `${cx}px ${cy}px`,
                  transition: 'transform 700ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                {/* Needle Blade */}
                <path
                  d={`M ${cx - 3.5} ${cy} L ${cx - 1.2} ${cy - 86} L ${cx + 1.2} ${cy - 86} L ${cx + 3.5} ${cy} Z`}
                  fill="url(#needleGrad)"
                />

                {/* Needle Glowing Spine */}
                <line
                  x1={cx}
                  y1={cy}
                  x2={cx}
                  y2={cy - 88}
                  stroke="#A8FF00"
                  strokeWidth="1.5"
                  filter="url(#neonGlow)"
                />

                {/* Glowing Pointer Diamond Tip */}
                <polygon
                  points={`${cx},${cy - 95} ${cx - 3.5},${cy - 86} ${cx + 3.5},${cy - 86}`}
                  fill="#A8FF00"
                  filter="url(#neonGlow)"
                />

                {/* Counterbalance Tail */}
                <path
                  d={`M ${cx - 2.5} ${cy} L ${cx - 1.5} ${cy + 13} L ${cx + 1.5} ${cy + 13} L ${cx + 2.5} ${cy} Z`}
                  fill="#1C1C1C"
                />
              </g>

              {/* Obsidian Metallic Center Hub Cap */}
              {/* Outer Ring */}
              <circle
                cx={cx}
                cy={cy}
                r="16"
                fill="#050505"
                stroke="#A8FF00"
                strokeWidth="1.8"
                filter="url(#neonGlow)"
              />
              {/* Mid Knurled Ring */}
              <circle
                cx={cx}
                cy={cy}
                r="10"
                fill="#121212"
                stroke="#FFFFFF"
                strokeOpacity="0.2"
                strokeWidth="1"
              />
              {/* Center Emerald Core Jewel */}
              <circle
                cx={cx}
                cy={cy}
                r="5"
                fill="#A8FF00"
                filter="url(#neonGlow)"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Hero Large Numeric Distance Readout (Pure Black, White & Neon) */}
      <div className="text-center mt-3.5 w-full">
        <div className="flex items-baseline justify-center space-x-2">
          <span className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.12)]">
            {formattedDistance}
          </span>
          <span className="text-base sm:text-lg font-mono font-bold text-zinc-400 uppercase tracking-widest">
            {unitLabel}
          </span>
        </div>

        {/* Status Geofence Pill */}
        <div className="mt-2 flex items-center justify-center">
          <span
            className={`text-xs px-4 py-1.5 rounded-full font-mono font-bold inline-flex items-center space-x-2 transition-all ${
              isWithinGeofence
                ? 'bg-[#A8FF00]/10 text-[#A8FF00] border border-[#A8FF00]/40 shadow-[0_0_16px_rgba(168,255,0,0.22)]'
                : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isWithinGeofence
                  ? 'bg-[#A8FF00] animate-pulse shadow-[0_0_8px_#A8FF00]'
                  : 'bg-zinc-600'
              }`}
            />
            <span className="tracking-wide">
              {isWithinGeofence
                ? 'WITHIN 200M GEOFENCE'
                : isKm
                ? `OUTSIDE ZONE (${formattedDistance} km)`
                : 'OUTSIDE 200M ZONE'}
            </span>
          </span>
        </div>

        <p className="text-xs text-zinc-400 mt-2 truncate max-w-xs mx-auto px-2 font-mono">
          Nearest spot: <strong className="text-white">{placeName}</strong>
        </p>

        {/* Quick Proximity Helper Actions if Outside Zone (Pure Black & Neon) */}
        {!isWithinGeofence && (onSpawnNearbyBounties || onRelocateToBounty) && (
          <div className="mt-3 pt-3 border-t border-white/[0.08] flex items-center justify-center gap-2 px-2">
            {onSpawnNearbyBounties && (
              <button
                type="button"
                onClick={onSpawnNearbyBounties}
                className="py-1.5 px-3.5 rounded-full bg-[#A8FF00]/15 hover:bg-[#A8FF00]/25 text-[#A8FF00] border border-[#A8FF00]/30 text-[11px] font-bold font-mono flex items-center justify-center space-x-1.5 transition-all cursor-pointer shadow-[0_0_12px_rgba(168,255,0,0.1)] hover:shadow-[0_0_18px_rgba(168,255,0,0.25)]"
                title="Spawn test bounties near your device GPS"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#A8FF00]" />
                <span>Spawn at My GPS</span>
              </button>
            )}
            {onRelocateToBounty && (
              <button
                type="button"
                onClick={onRelocateToBounty}
                className="py-1.5 px-3.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/80 text-[11px] font-semibold font-mono flex items-center justify-center space-x-1.5 transition-all cursor-pointer shadow-sm hover:border-zinc-500"
                title="Jump directly inside 200m geofence"
              >
                <Navigation className="w-3.5 h-3.5 text-[#A8FF00]" />
                <span>Jump Inside (15m)</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
