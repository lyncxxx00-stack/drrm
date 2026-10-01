import {
  LayoutDashboard,
  CloudRain,
  ScanEye,
  Map,
  Package,
  FileText,
  Database,
  Shield,
  Radio,
  Activity,
} from 'lucide-react';
import type { ModuleKey } from '@/types';

interface SidebarProps {
  active: ModuleKey;
  onSelect: (key: ModuleKey) => void;
  collapsed: boolean;
}

const modules: { key: ModuleKey; label: string; icon: typeof LayoutDashboard; description: string }[] = [
  { key: 'overview', label: 'Command Overview', icon: LayoutDashboard, description: 'Executive Dashboard' },
  { key: 'weather', label: 'Weather & Alerts', icon: CloudRain, description: 'Forecast & Warnings' },
  { key: 'damage', label: 'Damage Assessment', icon: ScanEye, description: 'AI Drone Analysis' },
  { key: 'riskmap', label: 'Risk Map', icon: Map, description: 'GIS Zone Mapping' },
  { key: 'relief', label: 'Relief Operations', icon: Package, description: 'Supply & Logistics' },
  { key: 'sitrep', label: 'Situation Reports', icon: FileText, description: 'SITREP Generator' },
  { key: 'barangay', label: 'Barangay Registry', icon: Database, description: 'Database Management' },
];

export function Sidebar({ active, onSelect, collapsed }: SidebarProps) {
  return (
    <aside className={`${collapsed ? 'w-16' : 'w-64'} flex-shrink-0 border-r border-slate-800 bg-slate-950/80 backdrop-blur-md transition-all duration-300 flex flex-col z-30`}>
      <div className="flex items-center gap-3 px-4 h-16 border-b border-slate-800 flex-shrink-0">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary-500/20">
          <Shield className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-white whitespace-nowrap">DRRM Command</p>
            <p className="text-[10px] text-slate-500 whitespace-nowrap">Borongan City</p>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {modules.map((m) => {
          const Icon = m.icon;
          const isActive = active === m.key;
          return (
            <button
              key={m.key}
              onClick={() => onSelect(m.key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-all duration-200 group ${
                isActive
                  ? 'bg-primary-600/15 text-primary-400 border border-primary-600/30'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent'
              }`}
              title={m.label}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-primary-400' : ''}`} />
              {!collapsed && (
                <div className="text-left overflow-hidden">
                  <p className="text-sm font-medium whitespace-nowrap">{m.label}</p>
                  <p className="text-[10px] text-slate-600 whitespace-nowrap">{m.description}</p>
                </div>
              )}
              {isActive && !collapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 p-3 flex-shrink-0">
        <div className={`flex items-center gap-2 ${collapsed ? 'justify-center' : ''}`}>
          <div className="relative">
            <Radio className="w-4 h-4 text-success-400" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-success-500 animate-pulse-ring" />
          </div>
          {!collapsed && (
            <div>
              <p className="text-[10px] text-slate-500">System Status</p>
              <p className="text-xs font-medium text-success-400">All Systems Online</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

export function TopBar({ title, onToggleSidebar }: { title: string; onToggleSidebar: () => void }) {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-PH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md flex items-center justify-between px-4 flex-shrink-0 z-20">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 transition-colors"
          aria-label="Toggle sidebar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div>
          <h1 className="text-lg font-bold text-white">{title}</h1>
          <p className="text-[10px] text-slate-500 hidden sm:block">{dateStr}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
          <Activity className="w-4 h-4 text-danger-400 animate-pulse" />
          <span className="text-xs font-medium text-danger-400">RED STATUS</span>
          <span className="text-xs text-slate-600">|</span>
          <span className="text-xs font-mono text-slate-300" id="clock">{timeStr}</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-xs font-bold text-white">
            DC
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-medium text-slate-200">DRRM Operator</p>
            <p className="text-[10px] text-slate-500">City Government</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export function ThreatTicker() {
  const tickerItems = [
    'TYPHOON KANLAON — Signal No. 3 hoisted over Borongan City. Sustained winds 130 km/h, gustiness up to 180 km/h.',
    'FLOOD WARNING — Borongan River at critical level 8.2m. Evacuation ordered for Alang-alang, Maypangdan, Camambaran.',
    'STORM SURGE ADVISORY — Coastal barangays expect 1.5-2.5m surge. Seek higher ground immediately.',
    'PRE-EMPTIVE EVACUATION — 1,951 persons now in 8 evacuation centers. Capacity at 68%.',
    'LANDSLIDE WATCH — Upland barangays Taboc, Surok, San Mateo under monitoring.',
  ];

  return (
    <div className="h-10 bg-gradient-to-r from-danger-900/40 via-danger-800/30 to-danger-900/40 border-b border-danger-800/50 overflow-hidden flex items-center">
      <div className="flex-shrink-0 px-3 h-full flex items-center gap-2 bg-danger-600/20 border-r border-danger-800/50">
        <span className="w-2 h-2 rounded-full bg-danger-500 animate-blink" />
        <span className="text-xs font-bold text-danger-400 whitespace-nowrap tracking-wider">ACTIVE ALERTS</span>
      </div>
      <div className="overflow-hidden flex-1">
        <div className="ticker-track">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="text-xs text-slate-300 px-8 inline-flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-danger-500" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
