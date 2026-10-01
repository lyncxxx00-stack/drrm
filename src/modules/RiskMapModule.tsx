import { useState } from 'react';
import {
  Map as MapIcon,
  Users,
  Home,
  Route,
  Construction,
  Radio,
  Layers,
  ZoomIn,
  ZoomOut,
  Navigation,
  AlertTriangle,
  ArrowRightCircle,
  Building2,
  Waves,
  Mountain,
  Wind,
} from 'lucide-react';
import { Card, RiskBadge, ProgressBar } from '@/components/ui';
import { mapZones } from '@/data/mockData';
import type { MapZone, RiskLevel } from '@/types';

const zoneColors: Record<RiskLevel, { fill: string; stroke: string; glow: string }> = {
  critical: { fill: 'rgba(239,68,68,0.25)', stroke: '#ef4444', glow: 'rgba(239,68,68,0.4)' },
  warning: { fill: 'rgba(245,158,11,0.22)', stroke: '#f59e0b', glow: 'rgba(245,158,11,0.35)' },
  safe: { fill: 'rgba(34,197,94,0.15)', stroke: '#22c55e', glow: 'rgba(34,197,94,0.25)' },
};

export function RiskMapModule() {
  const [selectedZone, setSelectedZone] = useState<MapZone | null>(mapZones[0]);
  const [filter, setFilter] = useState<RiskLevel | 'all'>('all');

  const filteredZones = filter === 'all' ? mapZones : mapZones.filter((z) => z.type === filter);
  const visibleZones = filter === 'all' ? mapZones : mapZones.filter((z) => z.type === filter);

  const criticalCount = mapZones.filter((z) => z.type === 'critical').length;
  const warningCount = mapZones.filter((z) => z.type === 'warning').length;
  const safeCount = mapZones.filter((z) => z.type === 'safe').length;

  const totalFamilies = mapZones.reduce((s, z) => s + z.families, 0);
  const totalHouses = mapZones.reduce((s, z) => s + z.houses, 0);
  const totalEvacNeeded = mapZones.reduce((s, z) => s + z.evacuationNeeded, 0);
  const totalRoads = mapZones.reduce((s, z) => s + z.infrastructure.roads, 0);
  const totalBridges = mapZones.reduce((s, z) => s + z.infrastructure.bridges, 0);
  const totalTowers = mapZones.reduce((s, z) => s + z.infrastructure.towers, 0);

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Zone Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <div className="stat-card">
          <div className="w-10 h-10 rounded-lg bg-danger-500/10 border border-danger-500/20 flex items-center justify-center mb-3">
            <AlertTriangle className="w-5 h-5 text-danger-400" />
          </div>
          <p className="text-2xl font-bold text-danger-400">{criticalCount}</p>
          <p className="text-xs text-slate-500">Critical Zones</p>
        </div>
        <div className="stat-card">
          <div className="w-10 h-10 rounded-lg bg-warning-500/10 border border-warning-500/20 flex items-center justify-center mb-3">
            <AlertTriangle className="w-5 h-5 text-warning-400" />
          </div>
          <p className="text-2xl font-bold text-warning-400">{warningCount}</p>
          <p className="text-xs text-slate-500">Warning Zones</p>
        </div>
        <div className="stat-card">
          <div className="w-10 h-10 rounded-lg bg-success-500/10 border border-success-500/20 flex items-center justify-center mb-3">
            <AlertTriangle className="w-5 h-5 text-success-400" />
          </div>
          <p className="text-2xl font-bold text-success-400">{safeCount}</p>
          <p className="text-xs text-slate-500">Safe Zones</p>
        </div>
        <div className="stat-card">
          <div className="w-10 h-10 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mb-3">
            <Users className="w-5 h-5 text-primary-400" />
          </div>
          <p className="text-2xl font-bold text-white">{totalFamilies.toLocaleString()}</p>
          <p className="text-xs text-slate-500">Affected Families</p>
        </div>
        <div className="stat-card">
          <div className="w-10 h-10 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mb-3">
            <Home className="w-5 h-5 text-primary-400" />
          </div>
          <p className="text-2xl font-bold text-white">{totalHouses}</p>
          <p className="text-xs text-slate-500">Damaged Houses</p>
        </div>
        <div className="stat-card">
          <div className="w-10 h-10 rounded-lg bg-accent-500/10 border border-accent-500/20 flex items-center justify-center mb-3">
            <ArrowRightCircle className="w-5 h-5 text-accent-400" />
          </div>
          <p className="text-2xl font-bold text-white">{totalEvacNeeded.toLocaleString()}</p>
          <p className="text-xs text-slate-500">Evacuation Needed</p>
        </div>
        <div className="stat-card">
          <div className="w-10 h-10 rounded-lg bg-warning-500/10 border border-warning-500/20 flex items-center justify-center mb-3">
            <Construction className="w-5 h-5 text-warning-400" />
          </div>
          <p className="text-2xl font-bold text-white">{totalRoads + totalBridges + totalTowers}</p>
          <p className="text-xs text-slate-500">Infra. Damaged</p>
        </div>
      </div>

      {/* Map + Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Interactive Map */}
        <Card
          className="lg:col-span-2"
          title="Interactive Risk Map"
          subtitle="Borongan City — GIS hazard zone overlay"
          icon={<MapIcon className="w-4 h-4" />}
          action={
            <div className="flex items-center gap-1">
              {(['all', 'critical', 'warning', 'safe'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`tab-btn text-[10px] px-2.5 py-1 ${filter === f ? 'tab-btn-active' : 'tab-btn-inactive'}`}
                >
                  {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          }
        >
          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 map-grid">
            {/* Topographic background simulation */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 75" preserveAspectRatio="none">
              {/* Coastline */}
              <path d="M 100,0 L 100,30 Q 85,35 80,40 Q 75,50 82,60 L 100,75 Z" fill="rgba(6,182,212,0.08)" stroke="rgba(6,182,212,0.2)" strokeWidth="0.3" />
              {/* River */}
              <path d="M 40,0 Q 38,15 45,25 Q 48,35 42,45 Q 38,55 45,65 L 48,75" fill="none" stroke="rgba(6,182,212,0.25)" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M 60,0 Q 58,10 62,20 Q 65,30 58,40 Q 55,50 62,60 L 65,75" fill="none" stroke="rgba(6,182,212,0.15)" strokeWidth="1" strokeLinecap="round" />
              {/* Contour lines (mountains/uplands) */}
              <ellipse cx="25" cy="15" rx="12" ry="7" fill="none" stroke="rgba(34,197,94,0.1)" strokeWidth="0.3" />
              <ellipse cx="25" cy="15" rx="8" ry="5" fill="none" stroke="rgba(34,197,94,0.12)" strokeWidth="0.3" />
              <ellipse cx="55" cy="18" rx="10" ry="5" fill="none" stroke="rgba(34,197,94,0.1)" strokeWidth="0.3" />
              <ellipse cx="55" cy="18" rx="6" ry="3" fill="none" stroke="rgba(34,197,94,0.12)" strokeWidth="0.3" />
            </svg>

            {/* Zone overlays */}
            {visibleZones.map((zone) => {
              const c = zoneColors[zone.type];
              const isSelected = selectedZone?.id === zone.id;
              return (
                <button
                  key={zone.id}
                  onClick={() => setSelectedZone(zone)}
                  className="absolute transition-all duration-200 group"
                  style={{
                    left: `${zone.x}%`,
                    top: `${zone.y}%`,
                    width: `${zone.width}%`,
                    height: `${zone.height}%`,
                    backgroundColor: c.fill,
                    border: `2px solid ${c.stroke}`,
                    borderRadius: '8px',
                    boxShadow: isSelected ? `0 0 20px ${c.glow}, inset 0 0 15px ${c.glow}` : `0 0 8px ${c.glow}`,
                    cursor: 'pointer',
                  }}
                >
                  {/* Pulse for critical zones */}
                  {zone.type === 'critical' && (
                    <span
                      className="absolute top-1 right-1 w-2 h-2 rounded-full animate-pulse-ring"
                      style={{ backgroundColor: c.stroke }}
                    />
                  )}

                  {/* Label */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-1">
                    <p className={`text-[10px] font-bold leading-tight text-center ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                      {zone.name}
                    </p>
                    {zone.families > 0 && (
                      <p className="text-[8px] text-slate-400 mt-0.5">
                        {zone.families} fam
                      </p>
                    )}
                  </div>
                </button>
              );
            })}

            {/* Map controls */}
            <div className="absolute top-3 right-3 flex flex-col gap-1">
              <button className="w-8 h-8 rounded-lg bg-slate-900/80 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                <ZoomIn className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-lg bg-slate-900/80 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                <ZoomOut className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-lg bg-slate-900/80 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                <Navigation className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-lg bg-slate-900/80 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                <Layers className="w-4 h-4" />
              </button>
            </div>

            {/* Compass */}
            <div className="absolute bottom-3 right-3 w-12 h-12 rounded-full bg-slate-900/80 border border-slate-700 flex items-center justify-center">
              <div className="text-center">
                <p className="text-[9px] font-bold text-danger-400">N</p>
                <div className="w-px h-4 bg-slate-600 mx-auto" />
              </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-3 left-3 p-2.5 rounded-lg bg-slate-900/90 border border-slate-700 backdrop-blur-sm">
              <p className="text-[9px] text-slate-500 mb-1.5 font-semibold uppercase">Legend</p>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[10px]">
                  <span className="w-3 h-3 rounded border-2 border-danger-500 bg-danger-500/25" />
                  <span className="text-slate-300">Critical</span>
                </div>
                <div className="flex items-center gap-2 text-[10px]">
                  <span className="w-3 h-3 rounded border-2 border-warning-500 bg-warning-500/22" />
                  <span className="text-slate-300">Warning</span>
                </div>
                <div className="flex items-center gap-2 text-[10px]">
                  <span className="w-3 h-3 rounded border-2 border-success-500 bg-success-500/15" />
                  <span className="text-slate-300">Safe</span>
                </div>
              </div>
            </div>

            {/* Scale bar */}
            <div className="absolute top-3 left-3 text-[9px] text-slate-500">
              <div className="flex items-center gap-1">
                <div className="h-0.5 w-8 bg-slate-600" />
                <span>1 km</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Zone Detail Panel */}
        <Card title="Zone Details" subtitle={selectedZone?.name ?? 'Select a zone'} icon={<MapIcon className="w-4 h-4" />}>
          {selectedZone ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedZone.name}</h3>
                  <p className="text-xs text-slate-500">Borongan City, Eastern Samar</p>
                </div>
                <RiskBadge level={selectedZone.type} />
              </div>

              {/* Population Impact */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-slate-800/50">
                  <Users className="w-4 h-4 text-primary-400 mb-1.5" />
                  <p className="text-xl font-bold text-white">{selectedZone.families}</p>
                  <p className="text-[10px] text-slate-500">Affected Families</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/50">
                  <Home className="w-4 h-4 text-danger-400 mb-1.5" />
                  <p className="text-xl font-bold text-white">{selectedZone.houses}</p>
                  <p className="text-[10px] text-slate-500">Damaged Houses</p>
                </div>
              </div>

              {/* Infrastructure Damage Breakdown */}
              <div className="pt-3 border-t border-slate-800">
                <p className="text-xs text-slate-400 mb-3">Infrastructure Damage</p>
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300 flex items-center gap-2">
                      <Route className="w-4 h-4 text-warning-400" /> Roads Blocked
                    </span>
                    <span className="text-sm font-bold text-warning-400">{selectedZone.infrastructure.roads}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300 flex items-center gap-2">
                      <Construction className="w-4 h-4 text-danger-400" /> Bridges Damaged
                    </span>
                    <span className="text-sm font-bold text-danger-400">{selectedZone.infrastructure.bridges}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300 flex items-center gap-2">
                      <Radio className="w-4 h-4 text-danger-400" /> Towers Downed
                    </span>
                    <span className="text-sm font-bold text-danger-400">{selectedZone.infrastructure.towers}</span>
                  </div>
                </div>
              </div>

              {/* Evacuation Projection */}
              <div className="pt-3 border-t border-slate-800">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-400">Evacuation Needed</span>
                  <span className="font-mono text-accent-400">{selectedZone.evacuationNeeded} persons</span>
                </div>
                <ProgressBar
                  value={selectedZone.evacuationNeeded}
                  max={totalEvacNeeded}
                  color="accent"
                  height="h-3"
                />
                <p className="text-[10px] text-slate-500 mt-1">
                  {((selectedZone.evacuationNeeded / totalEvacNeeded) * 100).toFixed(1)}% of citywide need
                </p>
              </div>

              {/* Hazard Types */}
              <div className="pt-3 border-t border-slate-800">
                <p className="text-xs text-slate-400 mb-2">Active Hazards</p>
                <div className="flex flex-wrap gap-2">
                  {selectedZone.type === 'critical' && (
                    <>
                      <span className="badge bg-danger-500/15 text-danger-400 border border-danger-500/30"><Waves className="w-3 h-3" /> Flooding</span>
                      <span className="badge bg-danger-500/15 text-danger-400 border border-danger-500/30"><Wind className="w-3 h-3" /> High Wind</span>
                      <span className="badge bg-warning-500/15 text-warning-400 border border-warning-500/30"><Building2 className="w-3 h-3" /> Structural</span>
                    </>
                  )}
                  {selectedZone.type === 'warning' && (
                    <>
                      <span className="badge bg-warning-500/15 text-warning-400 border border-warning-500/30"><Waves className="w-3 h-3" /> Flood Watch</span>
                      <span className="badge bg-warning-500/15 text-warning-400 border border-warning-500/30"><Mountain className="w-3 h-3" /> Landslide Watch</span>
                    </>
                  )}
                  {selectedZone.type === 'safe' && (
                    <span className="badge bg-success-500/15 text-success-400 border border-success-500/30">
                      <AlertTriangle className="w-3 h-3" /> No Active Hazards
                    </span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-500 text-center py-8">Click a zone on the map to view details</p>
          )}
        </Card>
      </div>

      {/* Zone List Table */}
      <Card title="All Zones Breakdown" subtitle="Complete infrastructure damage and evacuation data" icon={<Layers className="w-4 h-4" />}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-500 border-b border-slate-800">
                <th className="text-left py-2 px-3 font-medium">Barangay</th>
                <th className="text-center py-2 px-3 font-medium">Status</th>
                <th className="text-center py-2 px-3 font-medium">Families</th>
                <th className="text-center py-2 px-3 font-medium">Houses</th>
                <th className="text-center py-2 px-3 font-medium">Roads</th>
                <th className="text-center py-2 px-3 font-medium">Bridges</th>
                <th className="text-center py-2 px-3 font-medium">Towers</th>
                <th className="text-center py-2 px-3 font-medium">Evac. Needed</th>
              </tr>
            </thead>
            <tbody>
              {filteredZones.map((zone) => (
                <tr
                  key={zone.id}
                  onClick={() => setSelectedZone(zone)}
                  className={`border-b border-slate-800/50 cursor-pointer transition-colors ${
                    selectedZone?.id === zone.id ? 'bg-slate-800/50' : 'hover:bg-slate-800/30'
                  }`}
                >
                  <td className="py-3 px-3 font-medium text-slate-200">{zone.name}</td>
                  <td className="py-3 px-3 text-center">
                    <RiskBadge level={zone.type} />
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-slate-300">{zone.families}</td>
                  <td className="py-3 px-3 text-center font-mono text-danger-400">{zone.houses}</td>
                  <td className="py-3 px-3 text-center font-mono text-warning-400">{zone.infrastructure.roads}</td>
                  <td className="py-3 px-3 text-center font-mono text-danger-400">{zone.infrastructure.bridges}</td>
                  <td className="py-3 px-3 text-center font-mono text-danger-400">{zone.infrastructure.towers}</td>
                  <td className="py-3 px-3 text-center font-mono text-accent-400">{zone.evacuationNeeded}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
