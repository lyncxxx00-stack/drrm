import type { ReactNode } from 'react';
import { TrendingUp, TrendingDown, Minus, AlertTriangle, AlertCircle, Info, CheckCircle, XCircle } from 'lucide-react';
import type { RiskLevel } from '@/types';

export function severityColor(severity: 'normal' | 'warning' | 'critical'): string {
  switch (severity) {
    case 'critical': return 'text-danger-400 bg-danger-500/10 border-danger-500/30';
    case 'warning': return 'text-warning-400 bg-warning-500/10 border-warning-500/30';
    default: return 'text-success-400 bg-success-500/10 border-success-500/30';
  }
}

export function TrendIcon({ trend, className }: { trend: 'up' | 'down' | 'stable'; className?: string }) {
  if (trend === 'up') return <TrendingUp className={className ?? 'w-4 h-4'} />;
  if (trend === 'down') return <TrendingDown className={className ?? 'w-4 h-4'} />;
  return <Minus className={className ?? 'w-4 h-4'} />;
}

export function Card({
  children,
  className = '',
  title,
  subtitle,
  action,
  icon,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div className={`card card-hover ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            {icon && <span className="text-primary-400">{icon}</span>}
            <div>
              {title && <h3 className="text-sm font-semibold text-slate-100">{title}</h3>}
              {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
            </div>
          </div>
          {action}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

export function RiskBadge({ level, label }: { level: RiskLevel; label?: string }) {
  const config = {
    critical: { bg: 'bg-danger-500/15', text: 'text-danger-400', border: 'border-danger-500/30', dot: 'bg-danger-500' },
    warning: { bg: 'bg-warning-500/15', text: 'text-warning-400', border: 'border-warning-500/30', dot: 'bg-warning-500' },
    safe: { bg: 'bg-success-500/15', text: 'text-success-400', border: 'border-success-500/30', dot: 'bg-success-500' },
  };
  const c = config[level];
  const text = label ?? level.charAt(0).toUpperCase() + level.slice(1);
  return (
    <span className={`badge border ${c.bg} ${c.text} ${c.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot} animate-pulse`} />
      {text}
    </span>
  );
}

export function ProgressBar({
  value,
  max = 100,
  color = 'primary',
  height = 'h-2',
  showLabel = false,
}: {
  value: number;
  max?: number;
  color?: 'primary' | 'danger' | 'warning' | 'success' | 'accent';
  height?: string;
  showLabel?: boolean;
}) {
  const pct = Math.min(100, (value / max) * 100);
  const colors: Record<string, string> = {
    primary: 'bg-primary-500',
    danger: 'bg-danger-500',
    warning: 'bg-warning-500',
    success: 'bg-success-500',
    accent: 'bg-accent-500',
  };
  return (
    <div className="w-full">
      <div className={`w-full ${height} bg-slate-800 rounded-full overflow-hidden`}>
        <div
          className={`h-full ${colors[color]} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between mt-1 text-xs text-slate-500">
          <span>{value.toLocaleString()}</span>
          <span>{max.toLocaleString()}</span>
        </div>
      )}
    </div>
  );
}

export function Gauge({ value, label, size = 120 }: { value: number; label: string; size?: number }) {
  const clamped = Math.min(100, Math.max(0, value));
  const angle = (clamped / 100) * 180;
  const color = clamped >= 75 ? '#ef4444' : clamped >= 50 ? '#f59e0b' : '#22c55e';

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size / 2 + 8 }}>
        <svg width={size} height={size / 2 + 8} className="overflow-visible">
          <path
            d={`M ${size * 0.1} ${size / 2} A ${size * 0.4} ${size * 0.4} 0 0 1 ${size * 0.9} ${size / 2}`}
            fill="none"
            stroke="#1e293b"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d={`M ${size * 0.1} ${size / 2} A ${size * 0.4} ${size * 0.4} 0 0 1 ${size * 0.9} ${size / 2}`}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${(angle / 180) * Math.PI * size * 0.4} ${Math.PI * size * 0.4}`}
            style={{ transition: 'stroke-dasharray 0.8s ease-out', filter: `drop-shadow(0 0 6px ${color}88)` }}
          />
          <line
            x1={size / 2}
            y1={size / 2}
            x2={size / 2 + Math.sin((angle - 90) * Math.PI / 180) * size * 0.32}
            y2={size / 2 - Math.cos((angle - 90) * Math.PI / 180) * size * 0.32}
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            style={{ transition: 'all 0.8s ease-out' }}
          />
          <circle cx={size / 2} cy={size / 2} r="5" fill={color} />
        </svg>
      </div>
      <div className="text-center -mt-1">
        <span className="text-2xl font-bold" style={{ color }}>{clamped}</span>
        <span className="text-xs text-slate-500 block">{label}</span>
      </div>
    </div>
  );
}

export function SeverityIcon({ severity }: { severity: 'info' | 'warning' | 'critical' }) {
  if (severity === 'critical') return <AlertCircle className="w-4 h-4 text-danger-400" />;
  if (severity === 'warning') return <AlertTriangle className="w-4 h-4 text-warning-400" />;
  return <Info className="w-4 h-4 text-primary-400" />;
}

export function StatusPill({ status, label }: { status: string; label?: string }) {
  const map: Record<string, { bg: string; text: string; icon: ReactNode }> = {
    operational: { bg: 'bg-success-500/15', text: 'text-success-400', icon: <CheckCircle className="w-3 h-3" /> },
    good: { bg: 'bg-success-500/15', text: 'text-success-400', icon: <CheckCircle className="w-3 h-3" /> },
    sufficient: { bg: 'bg-success-500/15', text: 'text-success-400', icon: <CheckCircle className="w-3 h-3" /> },
    normal: { bg: 'bg-success-500/15', text: 'text-success-400', icon: <CheckCircle className="w-3 h-3" /> },
    low: { bg: 'bg-warning-500/15', text: 'text-warning-400', icon: <AlertTriangle className="w-3 h-3" /> },
    crowded: { bg: 'bg-warning-500/15', text: 'text-warning-400', icon: <AlertTriangle className="w-3 h-3" /> },
    damaged: { bg: 'bg-warning-500/15', text: 'text-warning-400', icon: <AlertTriangle className="w-3 h-3" /> },
    critical: { bg: 'bg-danger-500/15', text: 'text-danger-400', icon: <AlertCircle className="w-3 h-3" /> },
    full: { bg: 'bg-danger-500/15', text: 'text-danger-400', icon: <AlertCircle className="w-3 h-3" /> },
    closed: { bg: 'bg-slate-700', text: 'text-slate-400', icon: <XCircle className="w-3 h-3" /> },
    empty: { bg: 'bg-slate-700', text: 'text-slate-400', icon: <XCircle className="w-3 h-3" /> },
    destroyed: { bg: 'bg-danger-500/15', text: 'text-danger-400', icon: <XCircle className="w-3 h-3" /> },
    overflow: { bg: 'bg-danger-500/15', text: 'text-danger-400', icon: <AlertCircle className="w-3 h-3" /> },
  };
  const c = map[status] ?? map.normal;
  return (
    <span className={`badge ${c.bg} ${c.text}`}>
      {c.icon}
      {label ?? status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export function Sparkline({ data, color = '#3b82f6', height = 40, width = 120 }: { data: number[]; color?: string; height?: number; width?: number }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * height * 0.8 - height * 0.1;
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = `0,${height} ${points} ${width},${height}`;

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={`spark-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#spark-${color.replace('#', '')})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function EmptyState({ icon, message }: { icon?: ReactNode; message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-slate-500">
      {icon && <div className="mb-3 opacity-50">{icon}</div>}
      <p className="text-sm">{message}</p>
    </div>
  );
}
