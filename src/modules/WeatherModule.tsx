import {
  CloudRain,
  CloudLightning,
  CloudDrizzle,
  Cloud,
  CloudSun,
  Sun,
  Wind,
  Droplets,
  Gauge as GaugeIcon,
  Eye,
  Compass,
  Thermometer,
  AlertTriangle,
  AlertCircle,
  Info,
  MapPin,
  Waves,
  Zap,
} from 'lucide-react';
import { Card, ProgressBar, RiskBadge, Sparkline } from '@/components/ui';
import {
  weatherSnapshot,
  hourlyForecast,
  dailyForecast,
  weatherAlerts,
  barangayDamageForecast,
} from '@/data/mockData';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  CloudRain, CloudLightning, CloudDrizzle, Cloud, CloudSun, Sun,
};

const severityConfig = {
  warning: { bg: 'bg-danger-500/10', border: 'border-danger-700/40', text: 'text-danger-400', icon: AlertCircle, label: 'WARNING' },
  watch: { bg: 'bg-warning-500/10', border: 'border-warning-700/40', text: 'text-warning-400', icon: AlertTriangle, label: 'WATCH' },
  advisory: { bg: 'bg-primary-500/10', border: 'border-primary-700/40', text: 'text-primary-400', icon: Info, label: 'ADVISORY' },
};

const damageConfig = {
  severe: { color: 'text-danger-400', bg: 'bg-danger-500/15', bar: 'danger' as const },
  high: { color: 'text-warning-400', bg: 'bg-warning-500/15', bar: 'warning' as const },
  moderate: { color: 'text-primary-400', bg: 'bg-primary-500/15', bar: 'primary' as const },
  low: { color: 'text-success-400', bg: 'bg-success-500/15', bar: 'success' as const },
};

export function WeatherModule() {
  const tempData = hourlyForecast.map((h) => h.temp);
  const rainData = hourlyForecast.map((h) => h.rainProbability);
  const windData = hourlyForecast.map((h) => h.windSpeed);

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Current Weather Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-1" title="Current Conditions" subtitle="Borongan City, Eastern Samar" icon={<MapPin className="w-4 h-4" />}>
          <div className="flex items-center gap-5 mb-5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border border-slate-700">
              <CloudLightning className="w-10 h-10 text-warning-400" />
            </div>
            <div>
              <p className="text-4xl font-bold text-white">{weatherSnapshot.temperature}&deg;C</p>
              <p className="text-sm text-slate-400">{weatherSnapshot.condition}</p>
              <p className="text-xs text-slate-500 mt-1">Feels like {weatherSnapshot.feelsLike}&deg;C</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Droplets, label: 'Humidity', value: `${weatherSnapshot.humidity}%`, color: 'text-accent-400' },
              { icon: Wind, label: 'Wind Speed', value: `${weatherSnapshot.windSpeed} km/h`, color: 'text-primary-400' },
              { icon: Compass, label: 'Wind Direction', value: weatherSnapshot.windDirection, color: 'text-primary-400' },
              { icon: CloudRain, label: 'Rainfall', value: `${weatherSnapshot.rainfall} mm/hr`, color: 'text-accent-400' },
              { icon: GaugeIcon, label: 'Pressure', value: `${weatherSnapshot.pressure} hPa`, color: 'text-warning-400' },
              { icon: Eye, label: 'Visibility', value: `${weatherSnapshot.visibility} km`, color: 'text-slate-400' },
              { icon: Thermometer, label: 'UV Index', value: `${weatherSnapshot.uvIndex} / 11`, color: 'text-warning-400' },
              { icon: Zap, label: 'Storm Cell', value: 'Detected', color: 'text-danger-400' },
            ].map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.label} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-800/40">
                  <Icon className={`w-4 h-4 ${m.color} flex-shrink-0`} />
                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-500">{m.label}</p>
                    <p className="text-sm font-medium text-slate-200 truncate">{m.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Hourly Forecast */}
        <Card className="lg:col-span-2" title="24-Hour Hourly Forecast" subtitle="Hourly temperature, rainfall, and wind" icon={<CloudRain className="w-4 h-4" />}>
          {/* Temp + Rain Charts */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Thermometer className="w-3.5 h-3.5 text-warning-400" /> Temperature (&deg;C)
                </span>
                <span className="text-xs font-mono text-warning-400">Range {Math.min(...tempData)}-{Math.max(...tempData)}&deg;</span>
              </div>
              <Sparkline data={tempData} color="#f59e0b" width={320} height={60} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-accent-400" /> Rain Probability (%)
                </span>
                <span className="text-xs font-mono text-accent-400">Peak {Math.max(...rainData)}%</span>
              </div>
              <Sparkline data={rainData} color="#06b6d4" width={320} height={60} />
            </div>
          </div>

          {/* Hourly cards */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {hourlyForecast.map((h) => {
              const Icon = iconMap[h.icon] ?? Cloud;
              return (
                <div
                  key={h.time}
                  className="flex-shrink-0 w-20 p-3 rounded-lg bg-slate-800/40 border border-slate-800 hover:border-slate-700 transition-colors text-center"
                >
                  <p className="text-xs text-slate-500 font-medium">{h.time}</p>
                  <div className="my-2 flex justify-center">
                    <Icon className={`w-7 h-7 ${h.rainProbability > 80 ? 'text-danger-400' : h.rainProbability > 60 ? 'text-warning-400' : 'text-slate-400'}`} />
                  </div>
                  <p className="text-sm font-bold text-white">{h.temp}&deg;</p>
                  <p className="text-[10px] text-accent-400 mt-1">{h.rainProbability}%</p>
                  <p className="text-[10px] text-primary-400">{h.windSpeed}km/h</p>
                </div>
              );
            })}
          </div>

          {/* Wind trend */}
          <div className="mt-4 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <Wind className="w-3.5 h-3.5 text-primary-400" /> Wind Speed Trend (km/h)
              </span>
              <span className="text-xs font-mono text-danger-400">Peak {Math.max(...windData)} km/h</span>
            </div>
            <Sparkline data={windData} color="#3b82f6" width={660} height={50} />
          </div>
        </Card>
      </div>

      {/* 7-Day Outlook */}
      <Card title="7-Day Weather Outlook" subtitle="Extended forecast for Borongan City" icon={<CloudSun className="w-4 h-4" />}>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {dailyForecast.map((d, i) => {
            const Icon = iconMap[d.icon] ?? Cloud;
            const isToday = i === 0;
            return (
              <div
                key={d.day}
                className={`p-4 rounded-xl border text-center transition-all duration-200 ${
                  isToday
                    ? 'bg-primary-600/10 border-primary-600/30 shadow-lg shadow-primary-600/10'
                    : 'bg-slate-800/30 border-slate-800 hover:border-slate-700'
                }`}
              >
                <p className={`text-sm font-bold ${isToday ? 'text-primary-400' : 'text-slate-300'}`}>{d.day}</p>
                <p className="text-[10px] text-slate-500 mb-2">{d.date}</p>
                <div className="flex justify-center my-2">
                  <Icon className={`w-8 h-8 ${d.rainProbability > 70 ? 'text-danger-400' : d.rainProbability > 40 ? 'text-warning-400' : 'text-slate-400'}`} />
                </div>
                <p className="text-xs text-slate-400 mb-2 truncate">{d.condition}</p>
                <div className="flex justify-center gap-2 text-xs">
                  <span className="font-bold text-white">{d.high}&deg;</span>
                  <span className="text-slate-600">/</span>
                  <span className="text-slate-500">{d.low}&deg;</span>
                </div>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-center gap-1 text-[10px] text-accent-400">
                    <Droplets className="w-3 h-3" /> {d.rainProbability}%
                  </div>
                  <div className="flex items-center justify-center gap-1 text-[10px] text-primary-400">
                    <Wind className="w-3 h-3" /> {d.windSpeed} km/h
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Weather Alerts */}
      <Card title="Severe Weather Alerts" subtitle="Active warnings from PAGASA & AccuWeather" icon={<AlertTriangle className="w-4 h-4" />}>
        <div className="space-y-3">
          {weatherAlerts.map((alert) => {
            const cfg = severityConfig[alert.severity];
            const Icon = cfg.icon;
            return (
              <div key={alert.id} className={`p-4 rounded-xl border ${cfg.bg} ${cfg.border}`}>
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg ${cfg.bg} flex items-center justify-center flex-shrink-0 border ${cfg.border}`}>
                    <Icon className={`w-5 h-5 ${cfg.text}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-bold text-white">{alert.title}</h4>
                      <span className={`badge ${cfg.bg} ${cfg.text} border ${cfg.border} text-[10px]`}>
                        {cfg.label}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {alert.area}
                    </p>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">{alert.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-[10px] text-slate-500">
                      <span>Issued: {alert.issuedAt}</span>
                      <span>Expires: {alert.expiresAt}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Forecasted Damage by Barangay */}
      <Card title="Forecasted Damage by Barangay" subtitle="AI-projected impact assessment per zone" icon={<Waves className="w-4 h-4" />}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-500 border-b border-slate-800">
                <th className="text-left py-2 px-3 font-medium">Barangay</th>
                <th className="text-center py-2 px-3 font-medium">Expected Damage</th>
                <th className="text-center py-2 px-3 font-medium">Flood Depth (m)</th>
                <th className="text-center py-2 px-3 font-medium">Wind Speed (km/h)</th>
                <th className="text-center py-2 px-3 font-medium">Rainfall (mm/hr)</th>
                <th className="text-left py-2 px-3 font-medium w-32">Risk Level</th>
              </tr>
            </thead>
            <tbody>
              {barangayDamageForecast.map((b) => {
                const cfg = damageConfig[b.expectedDamage];
                return (
                  <tr key={b.barangay} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-3 font-medium text-slate-200">{b.barangay}</td>
                    <td className="py-3 px-3 text-center">
                      <span className={`badge ${cfg.bg} ${cfg.color} capitalize text-[10px]`}>
                        {b.expectedDamage}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center font-mono text-accent-400">{b.floodDepth.toFixed(1)}</td>
                    <td className="py-3 px-3 text-center font-mono text-primary-400">{b.windSpeed}</td>
                    <td className="py-3 px-3 text-center font-mono text-warning-400">{b.rainfall}</td>
                    <td className="py-3 px-3">
                      <ProgressBar
                        value={b.expectedDamage === 'severe' ? 95 : b.expectedDamage === 'high' ? 75 : b.expectedDamage === 'moderate' ? 50 : 25}
                        color={cfg.bar}
                        height="h-1.5"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
