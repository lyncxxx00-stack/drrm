import {
  Package,
  Wheat,
  Droplets,
  BriefcaseMedical,
  Box,
  Home,
  Users,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  Warehouse,
  Truck,
  MapPin,
} from 'lucide-react';
import { Card, ProgressBar, StatusPill } from '@/components/ui';
import { supplyItems, evacCenters } from '@/data/mockData';
import type { LucideIcon } from 'lucide-react';

const categoryIcons: Record<string, LucideIcon> = {
  food: Wheat,
  water: Droplets,
  kit: Box,
  medical: BriefcaseMedical,
};

const categoryColors: Record<string, string> = {
  food: 'text-warning-400',
  water: 'text-accent-400',
  kit: 'text-primary-400',
  medical: 'text-danger-400',
};

export function ReliefOperationsModule() {
  const totalRequired = supplyItems.reduce((s, i) => s + i.required, 0);
  const totalAvailable = supplyItems.reduce((s, i) => s + i.available, 0);
  const coveragePct = (totalAvailable / totalRequired) * 100;

  const criticalItems = supplyItems.filter((s) => s.status === 'critical');
  const lowItems = supplyItems.filter((s) => s.status === 'low');
  const sufficientItems = supplyItems.filter((s) => s.status === 'sufficient');

  const totalEvacCapacity = evacCenters.reduce((s, e) => s + e.capacity, 0);
  const totalEvacOccupied = evacCenters.reduce((s, e) => s + e.occupied, 0);
  const totalEvacFamilies = evacCenters.reduce((s, e) => s + e.families, 0);
  const fullCenters = evacCenters.filter((e) => e.status === 'full').length;

  const supplyByCategory = ['food', 'water', 'kit', 'medical'].map((cat) => {
    const items = supplyItems.filter((s) => s.category === cat);
    const req = items.reduce((s, i) => s + i.required, 0);
    const avail = items.reduce((s, i) => s + i.available, 0);
    return { category: cat, required: req, available: avail, pct: (avail / req) * 100 };
  });

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Top Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="w-10 h-10 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mb-3">
            <Package className="w-5 h-5 text-primary-400" />
          </div>
          <p className="text-2xl font-bold text-white">{coveragePct.toFixed(0)}%</p>
          <p className="text-xs text-slate-500">Overall Supply Coverage</p>
          <ProgressBar value={coveragePct} color={coveragePct < 50 ? 'danger' : coveragePct < 75 ? 'warning' : 'success'} height="h-1.5" />
        </div>
        <div className="stat-card">
          <div className="w-10 h-10 rounded-lg bg-danger-500/10 border border-danger-500/20 flex items-center justify-center mb-3">
            <AlertCircle className="w-5 h-5 text-danger-400" />
          </div>
          <p className="text-2xl font-bold text-danger-400">{criticalItems.length}</p>
          <p className="text-xs text-slate-500">Critical Shortfalls</p>
        </div>
        <div className="stat-card">
          <div className="w-10 h-10 rounded-lg bg-accent-500/10 border border-accent-500/20 flex items-center justify-center mb-3">
            <Home className="w-5 h-5 text-accent-400" />
          </div>
          <p className="text-2xl font-bold text-white">{evacCenters.length}</p>
          <p className="text-xs text-slate-500">Evacuation Centers</p>
          <p className="text-[10px] text-danger-400 mt-1">{fullCenters} at full capacity</p>
        </div>
        <div className="stat-card">
          <div className="w-10 h-10 rounded-lg bg-success-500/10 border border-success-500/20 flex items-center justify-center mb-3">
            <Users className="w-5 h-5 text-success-400" />
          </div>
          <p className="text-2xl font-bold text-white">{totalEvacOccupied.toLocaleString()}</p>
          <p className="text-xs text-slate-500">Total Evacuees</p>
          <p className="text-[10px] text-slate-500 mt-1">{totalEvacFamilies} families</p>
        </div>
      </div>

      {/* Supply by Category + Inventory Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card title="Supply Coverage by Category" subtitle="Required vs. available inventory" icon={<Warehouse className="w-4 h-4" />}>
          <div className="space-y-4">
            {supplyByCategory.map((cat) => {
              const Icon = categoryIcons[cat.category] ?? Package;
              const color = categoryColors[cat.category] ?? 'text-slate-400';
              return (
                <div key={cat.category}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-300 flex items-center gap-2 capitalize">
                      <Icon className={`w-4 h-4 ${color}`} /> {cat.category}
                    </span>
                    <span className={`text-xs font-mono ${cat.pct < 50 ? 'text-danger-400' : cat.pct < 75 ? 'text-warning-400' : 'text-success-400'}`}>
                      {cat.available.toLocaleString()}/{cat.required.toLocaleString()}
                    </span>
                  </div>
                  <ProgressBar
                    value={cat.available}
                    max={cat.required}
                    color={cat.pct < 50 ? 'danger' : cat.pct < 75 ? 'warning' : 'success'}
                    height="h-2.5"
                  />
                </div>
              );
            })}
            <div className="pt-3 border-t border-slate-800 grid grid-cols-3 gap-2 text-center">
              <div>
                <CheckCircle2 className="w-4 h-4 text-success-400 mx-auto mb-1" />
                <p className="text-sm font-bold text-success-400">{sufficientItems.length}</p>
                <p className="text-[10px] text-slate-500">Sufficient</p>
              </div>
              <div>
                <AlertTriangle className="w-4 h-4 text-warning-400 mx-auto mb-1" />
                <p className="text-sm font-bold text-warning-400">{lowItems.length}</p>
                <p className="text-[10px] text-slate-500">Low Stock</p>
              </div>
              <div>
                <AlertCircle className="w-4 h-4 text-danger-400 mx-auto mb-1" />
                <p className="text-sm font-bold text-danger-400">{criticalItems.length}</p>
                <p className="text-[10px] text-slate-500">Critical</p>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Supply Inventory Tracker" subtitle="Detailed stock levels and shortfalls" icon={<Package className="w-4 h-4" />} className="lg:col-span-2">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-500 border-b border-slate-800">
                  <th className="text-left py-2 px-3 font-medium">Item</th>
                  <th className="text-center py-2 px-3 font-medium">Category</th>
                  <th className="text-center py-2 px-3 font-medium">Required</th>
                  <th className="text-center py-2 px-3 font-medium">Available</th>
                  <th className="text-center py-2 px-3 font-medium">Shortfall</th>
                  <th className="text-left py-2 px-3 font-medium w-24">Coverage</th>
                  <th className="text-center py-2 px-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {supplyItems.map((item) => {
                  const shortfall = item.required - item.available;
                  const pct = (item.available / item.required) * 100;
                  const Icon = categoryIcons[item.category] ?? Package;
                  return (
                    <tr key={item.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <Icon className={`w-4 h-4 ${categoryColors[item.category]}`} />
                          <span className="font-medium text-slate-200">{item.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className="text-xs text-slate-400 capitalize">{item.category}</span>
                      </td>
                      <td className="py-3 px-3 text-center font-mono text-slate-300">{item.required.toLocaleString()}</td>
                      <td className="py-3 px-3 text-center font-mono text-slate-200">{item.available.toLocaleString()}</td>
                      <td className="py-3 px-3 text-center">
                        {shortfall > 0 ? (
                          <span className="font-mono text-danger-400 flex items-center justify-center gap-0.5">
                            <TrendingDown className="w-3 h-3" />
                            {shortfall.toLocaleString()}
                          </span>
                        ) : (
                          <span className="text-success-400">—</span>
                        )}
                      </td>
                      <td className="py-3 px-3">
                        <ProgressBar
                          value={pct}
                          color={pct < 50 ? 'danger' : pct < 75 ? 'warning' : 'success'}
                          height="h-1.5"
                        />
                      </td>
                      <td className="py-3 px-3 text-center">
                        <StatusPill status={item.status} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Evacuation Centers */}
      <Card title="Evacuation Center Occupancy" subtitle="Real-time shelter capacity tracking" icon={<Home className="w-4 h-4" />}>
        <div className="mb-4 p-4 rounded-xl bg-slate-800/40 border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-semibold text-slate-200">Citywide Occupancy Rate</p>
              <p className="text-xs text-slate-500">{totalEvacOccupied.toLocaleString()} of {totalEvacCapacity.toLocaleString()} capacity</p>
            </div>
            <p className={`text-2xl font-bold ${(totalEvacOccupied / totalEvacCapacity) > 0.8 ? 'text-danger-400' : (totalEvacOccupied / totalEvacCapacity) > 0.6 ? 'text-warning-400' : 'text-success-400'}`}>
              {((totalEvacOccupied / totalEvacCapacity) * 100).toFixed(1)}%
            </p>
          </div>
          <ProgressBar
            value={totalEvacOccupied}
            max={totalEvacCapacity}
            color={(totalEvacOccupied / totalEvacCapacity) > 0.8 ? 'danger' : (totalEvacOccupied / totalEvacCapacity) > 0.6 ? 'warning' : 'success'}
            height="h-3"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {evacCenters.map((center) => {
            const pct = (center.occupied / center.capacity) * 100;
            return (
              <div key={center.id} className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 hover:border-slate-700 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{center.name}</p>
                    <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" /> {center.barangay}
                    </p>
                  </div>
                  <StatusPill status={center.status} />
                </div>
                <div className="flex items-end justify-between mb-2">
                  <div>
                    <p className="text-xl font-bold text-white">{center.occupied}</p>
                    <p className="text-[10px] text-slate-500">of {center.capacity} capacity</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${pct > 90 ? 'text-danger-400' : pct > 70 ? 'text-warning-400' : 'text-success-400'}`}>
                      {pct.toFixed(0)}%
                    </p>
                    <p className="text-[10px] text-slate-500">{center.families} families</p>
                  </div>
                </div>
                <ProgressBar
                  value={center.occupied}
                  max={center.capacity}
                  color={pct > 90 ? 'danger' : pct > 70 ? 'warning' : 'success'}
                  height="h-2"
                />
              </div>
            );
          })}
        </div>
      </Card>

      {/* Critical Shortfall Alert */}
      {criticalItems.length > 0 && (
        <Card title="Critical Supply Shortfalls" subtitle="Items requiring immediate restocking" icon={<AlertCircle className="w-4 h-4" />}>
          <div className="space-y-2">
            {criticalItems.map((item) => {
              const shortfall = item.required - item.available;
              const Icon = categoryIcons[item.category] ?? Package;
              return (
                <div key={item.id} className="flex items-center gap-4 p-3 rounded-lg bg-danger-500/8 border border-danger-800/40">
                  <div className="w-10 h-10 rounded-lg bg-danger-500/15 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-danger-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white">{item.name}</p>
                    <p className="text-xs text-slate-400">
                      {item.available.toLocaleString()} {item.unit} available — need {shortfall.toLocaleString()} more
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-slate-500">Shortfall</p>
                    <p className="text-lg font-bold text-danger-400">{shortfall.toLocaleString()}</p>
                  </div>
                  <button className="btn btn-danger text-xs px-3 py-1.5 flex-shrink-0">
                    <Truck className="w-3.5 h-3.5" /> Request
                  </button>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}
