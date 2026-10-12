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

  // Format large distances cleanly
  const isKm = distanceMeters >= 1000;
  const formattedDistance = isKm
    ? (distanceMeters / 1000).toLocaleString(undefined, { maximumFractionDigits: 1 })
    : Math.round(distanceMeters).toLocaleString();
  const unitLabel = isKm ? 'km' : 'meters';

  // SVG Geometry constants
  const cx = 130;
  const cy = 132;
  const arcRadius = 90;
  const arcLength = Math.PI * arcRadius; // ~282.74 px
  const progressRatio = Math.min(clampedDist / 200, 1);
  const activeStrokeLength = arcLength * progressRatio;

  // Major ticks: 0, 50, 100, 150, 200
  const majorTicks = [
    { val: 0, label: '0' },
    { val: 50, label: '50' },
    { val: 100, label: '100' },
    { val: 150, label: '150' },
    { val: 200, label: '200' },
  ];

  // Minor precision ticks
  const minorTicks = [10, 20, 30, 40, 60, 70, 80, 90, 110, 120, 130, 140, 160, 170, 180, 190];

  return (
    <div className="flex flex-col items-center justify-center select-none w-full">
      {/* Clean Radial Arc Bar (No nested boxes, no outer glow/flame) */}
      <div className="relative w-full max-w-[270px] flex items-center justify-center">
        <svg
          viewBox="0 0 260 148"
          className="w-full h-auto overflow-visible select-none"
        >
          <defs>
            {/* Subtle glow filter strictly for the active arc stroke and needle tip */}
            <filter id="neonBarGlow" x="-15%" y="-15%" width="130%" height="130%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Neon Track Linear Gradient */}
            <linearGradient id="neonBarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#A8FF00" />
              <stop offset="60%" stopColor="#C2FF33" />
              <stop offset="100%" stopColor="#8AE000" />
            </linearGradient>

            {/* Needle Taper Gradient */}
            <linearGradient id="needleTaper" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#2D4D00" />
              <stop offset="50%" stopColor="#A8FF00" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>
          </defs>

          {/* Concentric Subtle Range Guide Arc */}
          <path
            d="M 64 132 A 66 66 0 0 1 196 132"
            fill="none"
            stroke="#A8FF00"
            strokeOpacity="0.08"
            strokeWidth="1"
            strokeDasharray="2 3"
          />

          {/* Inactive Base Arc Track */}
          <path
            d="M 40 132 A 90 90 0 0 1 220 132"
            fill="none"
            stroke="#1C1C1C"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Active Glowing Neon Proximity Arc Track */}
          <path
            d="M 40 132 A 90 90 0 0 1 220 132"
            fill="none"
            stroke="url(#neonBarGrad)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={`${activeStrokeLength} ${arcLength}`}
            filter="url(#neonBarGlow)"
            className="transition-all duration-700 ease-out"
          />

          {/* Minor Tick Marks (every 10m) */}
          {minorTicks.map((val) => {
            const fraction = val / 200;
            const angleRad = Math.PI * (1 - fraction);
            const cos = Math.cos(angleRad);
            const sin = Math.sin(angleRad);
            const isQuarter = val % 25 === 0;
            const rIn = isQuarter ? 84 : 86;
            const rOut = isQuarter ? 95 : 93;
            return (
              <line
                key={val}
                x1={cx + rIn * cos}
                y1={cy - rIn * sin}
                x2={cx + rOut * cos}
                y2={cy - rOut * sin}
                stroke={isQuarter ? '#A8FF00' : '#444444'}
                strokeOpacity={isQuarter ? 0.6 : 0.35}
                strokeWidth={isQuarter ? 1.5 : 1}
              />
            );
          })}

          {/* Major Tick Marks & Numbers */}
          {majorTicks.map(({ val, label }) => {
            const fraction = val / 200;
            const angleRad = Math.PI * (1 - fraction);
            const cos = Math.cos(angleRad);
            const sin = Math.sin(angleRad);
            const x1 = cx + 82 * cos;
            const y1 = cy - 82 * sin;
            const x2 = cx + 97 * cos;
            const y2 = cy - 97 * sin;
            const tx = cx + 68 * cos;
            const ty = cy - 68 * sin + 3;

            return (
              <g key={val}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#A8FF00"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
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

          {/* Precision Rotating Needle */}
          <g
            style={{
              transform: `rotate(${needleRotation}deg)`,
              transformOrigin: `${cx}px ${cy}px`,
              transition: 'transform 700ms cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {/* Needle Blade */}
            <path
              d={`M ${cx - 3} ${cy} L ${cx - 1} ${cy - 80} L ${cx + 1} ${cy - 80} L ${cx + 3} ${cy} Z`}
              fill="url(#needleTaper)"
            />

            {/* Glowing Pointer Diamond Tip */}
            <polygon
              points={`${cx},${cy - 88} ${cx - 3},${cy - 80} ${cx + 3},${cy - 80}`}
              fill="#A8FF00"
              filter="url(#neonBarGlow)"
            />

            {/* Counterbalance Tail */}
            <path
              d={`M ${cx - 2} ${cy} L ${cx - 1} ${cy + 11} L ${cx + 1} ${cy + 11} L ${cx + 2} ${cy} Z`}
              fill="#1C1C1C"
            />
          </g>

          {/* Center Hub */}
          <circle
            cx={cx}
            cy={cy}
            r="13"
            fill="#080808"
            stroke="#A8FF00"
            strokeWidth="1.5"
          />
          <circle
            cx={cx}
            cy={cy}
            r="8"
            fill="#141414"
            stroke="#333333"
            strokeWidth="1"
          />
          <circle
            cx={cx}
            cy={cy}
            r="3.5"
            fill="#A8FF00"
          />
        </svg>
      </div>

      {/* Hero Distance Readout (Pure High-Contrast Monochrome & Neon) */}
      <div className="text-center mt-2 w-full">
        <div className="flex items-baseline justify-center space-x-2">
          <span className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-white">
            {formattedDistance}
          </span>
          <span className="text-sm font-mono font-bold text-zinc-400 uppercase tracking-widest">
            {unitLabel}
          </span>
        </div>

        {/* Clean Status Pill */}
        <div className="mt-2 flex items-center justify-center">
          <span
            className={`text-xs px-3.5 py-1 rounded-full font-mono font-bold inline-flex items-center space-x-1.5 transition-all ${
              isWithinGeofence
                ? 'bg-[#A8FF00]/10 text-[#A8FF00] border border-[#A8FF00]/30'
                : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isWithinGeofence
                  ? 'bg-[#A8FF00] animate-pulse'
                  : 'bg-zinc-600'
              }`}
            />
            <span className="tracking-wide">
              {isWithinGeofence ? 'IN RANGE' : 'OUT OF RANGE'}
            </span>
          </span>
        </div>

        <p className="text-xs text-zinc-400 mt-2 truncate max-w-xs mx-auto px-2 font-mono">
          Nearest spot: <strong className="text-white">{placeName}</strong>
        </p>

        {/* Proximity Quick Actions if Outside Zone */}
        {!isWithinGeofence && (onSpawnNearbyBounties || onRelocateToBounty) && (
          <div className="mt-3 pt-3 border-t border-white/[0.08] flex items-center justify-center gap-2 px-2">
            {onSpawnNearbyBounties && (
              <button
                type="button"
                onClick={onSpawnNearbyBounties}
                className="py-1.5 px-3 rounded-full bg-[#A8FF00]/15 hover:bg-[#A8FF00]/25 text-[#A8FF00] border border-[#A8FF00]/30 text-[11px] font-bold font-mono flex items-center justify-center space-x-1.5 transition-all cursor-pointer shadow-sm"
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
                className="py-1.5 px-3 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 text-[11px] font-semibold font-mono flex items-center justify-center space-x-1.5 transition-all cursor-pointer shadow-sm"
                title="Jump directly inside geofence"
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
