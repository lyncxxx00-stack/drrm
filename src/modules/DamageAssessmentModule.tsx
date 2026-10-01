import { useState } from 'react';
import {
  ScanEye,
  Home,
  Building2,
  Waves,
  Trash2,
  Route,
  Cpu,
  Clock,
  MapPin,
  Camera,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Database,
} from 'lucide-react';
import { Card, ProgressBar } from '@/components/ui';
import { droneImages, aiAnalysisResult } from '@/data/mockData';
import type { LucideIcon } from 'lucide-react';

const detectionIconMap: Record<string, LucideIcon> = {
  roof: Home,
  collapsed: Building2,
  submerged: Waves,
  debris: Trash2,
  road_blocked: Route,
};

export function DamageAssessmentModule() {
  const [activePair, setActivePair] = useState(0);
  const [showDetections, setShowDetections] = useState(true);
  const [scanning, setScanning] = useState(false);

  const currentPair = droneImages[activePair];

  const mockDetections = [
    { type: 'roof', x: 25, y: 30, w: 8, h: 6, label: 'Roof Damage', conf: 94 },
    { type: 'collapsed', x: 55, y: 45, w: 6, h: 5, label: 'Collapsed', conf: 97 },
    { type: 'submerged', x: 40, y: 60, w: 20, h: 8, label: 'Submerged', conf: 91 },
    { type: 'roof', x: 70, y: 25, w: 7, h: 5, label: 'Roof Damage', conf: 89 },
    { type: 'debris', x: 15, y: 50, w: 10, h: 4, label: 'Debris', conf: 85 },
    { type: 'submerged', x: 60, y: 65, w: 15, h: 6, label: 'Submerged', conf: 93 },
  ];

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => setScanning(false), 3000);
  };

  return (
    <div className="space-y-5 animate-fade-in">
      {/* AI Analysis Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card title="AI Analysis Summary" subtitle="Automated drone imagery analysis" icon={<Cpu className="w-4 h-4" />} className="lg:col-span-1">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent-500/20 to-primary-500/20 border border-accent-500/30 flex items-center justify-center">
                <ScanEye className="w-8 h-8 text-accent-400" />
              </div>
              <div>
                <p className="text-3xl font-bold text-white">{aiAnalysisResult.damagedStructures}</p>
                <p className="text-xs text-slate-400">Damaged out of {aiAnalysisResult.totalStructures} scanned</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="p-3 rounded-lg bg-slate-800/50 text-center">
                <Clock className="w-4 h-4 text-accent-400 mx-auto mb-1" />
                <p className="text-sm font-bold text-white">{aiAnalysisResult.analysisTime}</p>
                <p className="text-[10px] text-slate-500">Analysis Time</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-800/50 text-center">
                <MapPin className="w-4 h-4 text-primary-400 mx-auto mb-1" />
                <p className="text-sm font-bold text-white">{aiAnalysisResult.coverageArea}</p>
                <p className="text-[10px] text-slate-500">km² Covered</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-800/50 text-center">
                <Cpu className="w-4 h-4 text-success-400 mx-auto mb-1" />
                <p className="text-sm font-bold text-white">v3.2</p>
                <p className="text-[10px] text-slate-500">AI Model</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-slate-400">Damage Rate</span>
                <span className="font-mono text-danger-400">
                  {((aiAnalysisResult.damagedStructures / aiAnalysisResult.totalStructures) * 100).toFixed(1)}%
                </span>
              </div>
              <ProgressBar
                value={aiAnalysisResult.damagedStructures}
                max={aiAnalysisResult.totalStructures}
                color="danger"
                height="h-3"
              />
            </div>

            <div className="flex items-center gap-2 p-3 rounded-lg bg-success-500/10 border border-success-500/20">
              <CheckCircle2 className="w-4 h-4 text-success-400 flex-shrink-0" />
              <p className="text-xs text-slate-300">
                Analysis complete. Drone imagery processed through {aiAnalysisResult.modelVersion} deep learning model.
              </p>
            </div>
          </div>
        </Card>

        {/* Detection Breakdown */}
        <Card title="Automated Damage Detection" subtitle="Classification counts & confidence scores" icon={<Layers className="w-4 h-4" />} className="lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {aiAnalysisResult.detections.map((det) => {
              const Icon = detectionIconMap[det.type] ?? AlertTriangle;
              return (
                <div key={det.id} className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 hover:border-slate-700 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${det.color}20`, border: `1px solid ${det.color}40` }}>
                      <Icon className="w-5 h-5" style={{ color: det.color }} />
                    </div>
                    <span className="text-2xl font-bold text-white tabular-nums">{det.count}</span>
                  </div>
                  <p className="text-sm font-medium text-slate-200">{det.label}</p>
                  <div className="mt-2">
                    <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                      <span>Confidence</span>
                      <span style={{ color: det.color }}>{det.confidence}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${det.confidence}%`, backgroundColor: det.color }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Drone Imagery Comparison */}
      <Card
        title="Drone Imagery Comparison"
        subtitle="Before/after disaster analysis with AI overlay"
        icon={<Camera className="w-4 h-4" />}
        action={
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDetections(!showDetections)}
              className={`btn text-xs px-3 py-1.5 ${showDetections ? 'bg-accent-600 text-white' : 'btn-ghost'}`}
            >
              <Layers className="w-3.5 h-3.5" /> AI Overlay
            </button>
            <button
              onClick={handleScan}
              disabled={scanning}
              className="btn btn-primary text-xs px-3 py-1.5"
            >
              <Zap className="w-3.5 h-3.5" /> {scanning ? 'Scanning...' : 'Re-scan'}
            </button>
          </div>
        }
      >
        {/* Image selector */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          {droneImages.map((pair, i) => (
            <button
              key={i}
              onClick={() => setActivePair(i)}
              className={`flex-shrink-0 px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                activePair === i ? 'bg-primary-600 text-white' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              {pair.before.area}
            </button>
          ))}
        </div>

        {/* Before/After Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Before */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-success-400" /> BEFORE
              </span>
              <span className="text-[10px] text-slate-500 font-mono">{currentPair.before.timestamp}</span>
            </div>
            <div className="relative rounded-xl overflow-hidden border border-slate-800 aspect-video bg-slate-900">
              <img src={currentPair.before.url} alt="Before" className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 px-2 py-1 rounded bg-success-500/80 text-white text-[10px] font-bold backdrop-blur-sm">
                PRE-DISASTER
              </div>
            </div>
          </div>

          {/* After with detections */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-danger-400" /> AFTER
              </span>
              <span className="text-[10px] text-slate-500 font-mono">{currentPair.after.timestamp}</span>
            </div>
            <div className="relative rounded-xl overflow-hidden border border-slate-800 aspect-video bg-slate-900">
              <img src={currentPair.after.url} alt="After" className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 px-2 py-1 rounded bg-danger-500/80 text-white text-[10px] font-bold backdrop-blur-sm">
                POST-DISASTER
              </div>

              {/* AI Detection overlay */}
              {showDetections && mockDetections.map((det, i) => {
                const colors: Record<string, string> = {
                  roof: '#f59e0b',
                  collapsed: '#ef4444',
                  submerged: '#06b6d4',
                  debris: '#a78bfa',
                  road_blocked: '#f97316',
                };
                const c = colors[det.type] ?? '#ef4444';
                return (
                  <div
                    key={i}
                    className="absolute detect-box"
                    style={{
                      left: `${det.x}%`,
                      top: `${det.y}%`,
                      width: `${det.w}%`,
                      height: `${det.h}%`,
                      border: `2px solid ${c}`,
                      borderRadius: '4px',
                      boxShadow: `0 0 10px ${c}66, inset 0 0 10px ${c}22`,
                    }}
                  >
                    <div
                      className="absolute -top-6 left-0 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold whitespace-nowrap"
                      style={{ backgroundColor: c, color: '#000' }}
                    >
                      {det.label} {det.conf}%
                    </div>
                  </div>
                );
              })}

              {/* Scanning effect */}
              {scanning && (
                <>
                  <div className="absolute inset-0 bg-accent-500/10" />
                  <div className="scanline animate-scan" />
                </>
              )}

              {/* Grid overlay when detections are on */}
              {showDetections && !scanning && (
                <div className="absolute inset-0 pointer-events-none" style={{
                  backgroundImage: 'linear-gradient(rgba(6,182,212,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.15) 1px, transparent 1px)',
                  backgroundSize: '30px 30px',
                }} />
              )}
            </div>
          </div>
        </div>

        {/* Detection Legend */}
        {showDetections && (
          <div className="mt-4 pt-4 border-t border-slate-800">
            <p className="text-xs text-slate-500 mb-2">AI Detection Legend</p>
            <div className="flex flex-wrap gap-3">
              {aiAnalysisResult.detections.map((det) => (
                <div key={det.id} className="flex items-center gap-2 text-xs">
                  <span className="w-3 h-3 rounded" style={{ backgroundColor: det.color }} />
                  <span className="text-slate-300">{det.label}</span>
                  <span className="text-slate-600">({det.count})</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Model Info */}
      <Card title="AI Model Details" subtitle="Technical specifications of damage detection system" icon={<Database className="w-4 h-4" />}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Model Version', value: aiAnalysisResult.modelVersion, icon: Cpu },
            { label: 'Training Dataset', value: '1.2M drone images', icon: Database },
            { label: 'Avg. Confidence', value: `${(aiAnalysisResult.detections.reduce((s, d) => s + d.confidence, 0) / aiAnalysisResult.detections.length).toFixed(1)}%`, icon: CheckCircle2 },
            { label: 'Processing Speed', value: '0.8 sec/image', icon: Zap },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="p-4 rounded-xl bg-slate-800/40 border border-slate-800">
                <Icon className="w-5 h-5 text-accent-400 mb-2" />
                <p className="text-sm font-bold text-white">{item.value}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{item.label}</p>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
