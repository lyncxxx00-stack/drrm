import {
  Users,
  UserCheck,
  Home,
  Route,
  Construction,
  Radio,
  CloudRain,
  CloudLightning,
  Wind,
  Droplets,
  Eye,
  Gauge as GaugeIcon,
  Compass,
  Thermometer,
  Sun,
  AlertTriangle,
  ArrowRight,
  Activity,
  MapPin,
  TrendingUp,
} from 'lucide-react';
import { Card, Gauge, ProgressBar, RiskBadge, TrendIcon, severityColor, Sparkline } from '@/components/ui';
import {
  kpis,
  activeThreats,
  riskIndex,
  weatherSnapshot,
  hourlyForecast,
  mapZones,
  eventLog,
  evacCenters,
  supplyItems,
} from '@/data/mockData';
import type { ModuleKey } from '@/types';

const iconMap: Record<string, typeof Users> = {
  Users, UserCheck, Home, Route, Construction, Radio,
};

export function CommandOverview({ onNavigate }: { onNavigate: (m: ModuleKey) => void }) {
  const criticalBarangays = mapZones.filter((z) => z.type === 'critical');
  const warningBarangays = mapZones.filter((z) => z.type === 'warning');
  const safeBarangays = mapZones.filter((z) => z.type === 'safe');

  const totalEvacCapacity = evacCenters.reduce((s, e) => s + e.capacity, 0);
  const totalEvacOccupied = evacCenters.reduce((s, e) => s + e.occupied, 0);

  const criticalSupplies = supplyItems.filter((s) => s.status === 'critical');
  const lowSupplies = supplyItems.filter((s) => s.status === 'low');

  const tempTrend = hourlyForecast.map((h) => h.temp);
  const rainTrend = hourlyForecast.map((h) => h.rainProbability);

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Active Threat Banner */}
      {activeThreats.map((threat) => (
        <div
          key={threat.id}
          className="rounded-xl border border-danger-700/50 bg-gradient-to-r from-danger-900/40 via-danger-800/20 to-slate-900/40 p-5"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-danger-600/20 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-danger-400 animate-pulse" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-lg font-bold text-danger-400">{threat.type}</h2>
                <span className="badge bg-danger-600/20 text-danger-400 border border-danger-600/40">
                  ACTIVE
                </span>
                <span className="text-xs text-slate-500">
                  Issued: {new Date(threat.issuedAt).toLocaleString('en-PH', { dateStyle: 'medium', timeStyle: 'short' })}
                </span>
              </div>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">{threat.message}</p>
              <p className="text-xs text-slate-500 mt-2">
                Source: <span className="text-slate-400 font-medium">{threat.source}</span>
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpis.map((kpi) => {
          const Icon = iconMap[kpi.icon] ?? Users;
          return (
            <div key={kpi.id} className="stat-card group">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${severityColor(kpi.severity)}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-xs font-mono flex items-center gap-0.5 ${
                  kpi.trend === 'up' ? 'text-danger-400' : kpi.trend === 'down' ? 'text-success-400' : 'text-slate-500'
                }`}>
                  <TrendIcon trend={kpi.trend} className="w-3 h-3" />
                  {kpi.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-white tabular-nums">{kpi.value.toLocaleString()}</p>
              <p className="text-xs text-slate-500 mt-0.5">{kpi.label}</p>
            </div>
          );
        })}
      </div>

      {/* Risk Index + Weather Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card title="Citywide Risk Index" subtitle="Multi-hazard composite scoring" icon={<Activity className="w-4 h-4" />}>
          <div className="flex justify-center mb-4">
            <Gauge value={riskIndex.overall} label="Overall Risk Index" size={180} />
          </div>
          <div className="space-y-3">
            {[
              { label: 'Flood Risk', value: riskIndex.flood, color: 'danger' as const },
              { label: 'Landslide Risk', value: riskIndex.landslide, color: 'warning' as const },
              { label: 'Storm Surge', value: riskIndex.stormSurge, color: 'danger' as const },
              { label: 'Wind Damage', value: riskIndex.wind, color: 'warning' as const },
            ].map((r) => (
              <div key={r.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">{r.label}</span>
                  <span className={`font-mono font-semibold ${r.value >= 75 ? 'text-danger-400' : r.value >= 50 ? 'text-warning-400' : 'text-success-400'}`}>
                    {r.value}/100
                  </span>
                </div>
                <ProgressBar value={r.value} color={r.color} />
              </div>
            ))}
          </div>
        </Card>

        <Card title="Weather Snapshot" subtitle="Current conditions — Borongan City" icon={<CloudRain className="w-4 h-4" />} action={
          <button onClick={() => onNavigate('weather')} className="btn btn-ghost text-xs px-2 py-1">
            Details <ArrowRight className="w-3 h-3" />
          </button>
        }>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-xl bg-slate-800 flex items-center justify-center">
              <CloudLightning className="w-8 h-8 text-warning-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-white">{weatherSnapshot.temperature}&deg;C</p>
              <p className="text-xs text-slate-400">{weatherSnapshot.condition}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Feels like {weatherSnapshot.feelsLike}&deg;C</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            {[
              { icon: Droplets, label: 'Humidity', value: `${weatherSnapshot.humidity}%`, color: 'text-accent-400' },
              { icon: Wind, label: 'Wind', value: `${weatherSnapshot.windSpeed} km/h ${weatherSnapshot.windDirection}`, color: 'text-primary-400' },
              { icon: CloudRain, label: 'Rainfall', value: `${weatherSnapshot.rainfall} mm/hr`, color: 'text-accent-400' },
              { icon: GaugeIcon, label: 'Pressure', value: `${weatherSnapshot.pressure} hPa`, color: 'text-warning-400' },
              { icon: Eye, label: 'Visibility', value: `${weatherSnapshot.visibility} km`, color: 'text-slate-400' },
              { icon: Sun, label: 'UV Index', value: `${weatherSnapshot.uvIndex}`, color: 'text-warning-400' },
            ].map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.label} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/50">
                  <Icon className={`w-4 h-4 ${m.color} flex-shrink-0`} />
                  <div className="min-w-0">
                    <p className="text-slate-500 text-[10px]">{m.label}</p>
                    <p className="text-slate-200 font-medium truncate">{m.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card title="24-Hour Trends" subtitle="Temperature & rainfall probability" icon={<TrendingUp className="w-4 h-4" />}>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Thermometer className="w-3.5 h-3.5 text-warning-400" /> Temperature
                </span>
                <span className="text-xs font-mono text-warning-400">{Math.max(...tempTrend)}&deg;C max</span>
              </div>
              <Sparkline data={tempTrend} color="#f59e0b" width={280} height={50} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-accent-400" /> Rain Probability
                </span>
                <span className="text-xs font-mono text-accent-400">{Math.max(...rainTrend)}% peak</span>
              </div>
              <Sparkline data={rainTrend} color="#06b6d4" width={280} height={50} />
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <div className="text-center">
                <p className="text-lg font-bold text-danger-400">{Math.max(...hourlyForecast.map(h => h.windSpeed))}</p>
                <p className="text-[10px] text-slate-500">Peak Wind km/h</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-accent-400">{Math.max(...hourlyForecast.map(h => h.rainProbability))}%</p>
                <p className="text-[10px] text-slate-500">Max Rain Prob.</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-warning-400">12hr</p>
                <p className="text-[10px] text-slate-500">Forecast Window</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Critical Barangay Alerts + Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card
          title="Critical Barangay Alerts"
          subtitle="Zones requiring immediate action"
          icon={<MapPin className="w-4 h-4" />}
          className="lg:col-span-2"
          action={
            <button onClick={() => onNavigate('riskmap')} className="btn btn-ghost text-xs px-2 py-1">
              View Map <ArrowRight className="w-3 h-3" />
            </button>
          }
        >
          <div className="space-y-2.5">
            {criticalBarangays.map((zone) => (
              <div key={zone.id} className="flex items-center gap-4 p-3 rounded-lg bg-slate-800/40 border border-slate-800 hover:border-danger-800/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-danger-500/15 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-danger-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-white">{zone.name}</p>
                    <RiskBadge level={zone.type} />
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {zone.families} families</span>
                    <span className="flex items-center gap-1"><Home className="w-3 h-3" /> {zone.houses} houses</span>
                    <span className="flex items-center gap-1"><Route className="w-3 h-3" /> {zone.infrastructure.roads} roads blocked</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-slate-500">Evac Needed</p>
                  <p className="text-lg font-bold text-danger-400">{zone.evacuationNeeded}</p>
                </div>
              </div>
            ))}
            {warningBarangays.map((zone) => (
              <div key={zone.id} className="flex items-center gap-4 p-3 rounded-lg bg-slate-800/40 border border-slate-800 hover:border-warning-800/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-warning-500/15 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-warning-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-white">{zone.name}</p>
                    <RiskBadge level={zone.type} />
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {zone.families} families</span>
                    <span className="flex items-center gap-1"><Home className="w-3 h-3" /> {zone.houses} houses</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-slate-500">Evac Needed</p>
                  <p className="text-lg font-bold text-warning-400">{zone.evacuationNeeded}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Operational Summary" subtitle="Response at a glance" icon={<Activity className="w-4 h-4" />}>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-xs text-slate-400">Evacuation Center Occupancy</span>
                <span className="text-xs font-mono text-slate-300">
                  {totalEvacOccupied}/{totalEvacCapacity}
                </span>
              </div>
              <ProgressBar
                value={totalEvacOccupied}
                max={totalEvacCapacity}
                color={totalEvacOccupied / totalEvacCapacity > 0.8 ? 'danger' : totalEvacOccupied / totalEvacCapacity > 0.6 ? 'warning' : 'success'}
                showLabel
              />
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2">
              <div className="text-center p-3 rounded-lg bg-danger-500/10 border border-danger-500/20">
                <p className="text-xl font-bold text-danger-400">{criticalBarangays.length}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Critical Zones</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-warning-500/10 border border-warning-500/20">
                <p className="text-xl font-bold text-warning-400">{warningBarangays.length}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Warning Zones</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-success-500/10 border border-success-500/20">
                <p className="text-xl font-bold text-success-400">{safeBarangays.length}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Safe Zones</p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <p className="text-xs text-slate-400 mb-2">Supply Shortfalls</p>
              <div className="space-y-1.5">
                {criticalSupplies.map((s) => (
                  <div key={s.id} className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 truncate">{s.name}</span>
                    <span className="badge bg-danger-500/15 text-danger-400 border border-danger-500/30 text-[10px] px-2 py-0.5">
                      {s.available}/{s.required}
                    </span>
                  </div>
                ))}
                {lowSupplies.slice(0, 3).map((s) => (
                  <div key={s.id} className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 truncate">{s.name}</span>
                    <span className="badge bg-warning-500/15 text-warning-400 border border-warning-500/30 text-[10px] px-2 py-0.5">
                      {s.available}/{s.required}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => onNavigate('relief')} className="btn btn-primary w-full text-xs">
              Manage Relief Operations <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </Card>
      </div>

      {/* Recent Event Log */}
      <Card title="Recent Event Log" subtitle="Live situation timeline" icon={<Activity className="w-4 h-4" />} action={
        <button onClick={() => onNavigate('sitrep')} className="btn btn-ghost text-xs px-2 py-1">
          Full SITREP <ArrowRight className="w-3 h-3" />
        </button>
      }>
        <div className="space-y-0 max-h-72 overflow-y-auto">
          {eventLog.slice(0, 8).map((ev) => (
            <div key={ev.id} className="data-row group">
              <div className="flex items-center gap-3 min-w-0">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  ev.severity === 'critical' ? 'bg-danger-500' : ev.severity === 'warning' ? 'bg-warning-500' : 'bg-primary-500'
                }`} />
                <span className="text-xs font-mono text-slate-500 flex-shrink-0">{ev.timestamp}</span>
                <span className="text-xs text-slate-300 truncate">{ev.message}</span>
              </div>
              <span className={`badge text-[10px] flex-shrink-0 ${
                ev.severity === 'critical' ? 'bg-danger-500/15 text-danger-400' :
                ev.severity === 'warning' ? 'bg-warning-500/15 text-warning-400' :
                'bg-primary-500/15 text-primary-400'
              }`}>
                {ev.category}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
