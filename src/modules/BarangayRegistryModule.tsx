import { useState } from 'react';
import {
  Database,
  Users,
  Home,
  Building2,
  Building,
  Search,
  Plus,
  Filter,
  Heart,
  Accessibility,
  Baby,
  UserCog,
  Phone,
  MapPin,
  Layers,
  School,
  Cross,
  Anchor,
  Store,
  Landmark,
  Waves,
  Construction,
  Radio,
  Route,
  Droplets,
  CircleDollarSign,
} from 'lucide-react';
import { Card, RiskBadge, StatusPill, ProgressBar } from '@/components/ui';
import {
  barangayInhabitants,
  households,
  infrastructures,
  facilities,
  barangayList,
} from '@/data/mockData';
import type { LucideIcon } from 'lucide-react';

type Tab = 'inhabitants' | 'households' | 'infrastructure' | 'facilities';

const facilityIcons: Record<string, LucideIcon> = {
  school: School,
  health: Cross,
  evacuation: Building,
  government: Landmark,
  market: Store,
  port: Anchor,
};

const infraIcons: Record<string, LucideIcon> = {
  road: Route,
  bridge: Construction,
  tower: Radio,
  building: Building2,
  seawall: Waves,
  drainage: Droplets,
};

export function BarangayRegistryModule() {
  const [tab, setTab] = useState<Tab>('inhabitants');
  const [search, setSearch] = useState('');
  const [barangayFilter, setBarangayFilter] = useState('all');

  const filteredInhabitants = barangayInhabitants.filter((i) => {
    const matchesSearch = i.name.toLowerCase().includes(search.toLowerCase()) || i.contact.includes(search);
    const matchesBarangay = barangayFilter === 'all' || i.barangay === barangayFilter;
    return matchesSearch && matchesBarangay;
  });

  const filteredHouseholds = households.filter((h) => {
    const matchesSearch = h.head.toLowerCase().includes(search.toLowerCase()) || h.id.toLowerCase().includes(search.toLowerCase());
    const matchesBarangay = barangayFilter === 'all' || h.barangay === barangayFilter;
    return matchesSearch && matchesBarangay;
  });

  const filteredInfra = infrastructures.filter((i) => {
    const matchesSearch = i.name.toLowerCase().includes(search.toLowerCase());
    const matchesBarangay = barangayFilter === 'all' || i.barangay === barangayFilter;
    return matchesSearch && matchesBarangay;
  });

  const filteredFacilities = facilities.filter((f) => {
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase());
    const matchesBarangay = barangayFilter === 'all' || f.barangay === barangayFilter;
    return matchesSearch && matchesBarangay;
  });

  const vulnerableCount = barangayInhabitants.filter((i) => i.isVulnerable).length;
  const totalMembers = households.reduce((s, h) => s + h.members, 0);
  const destroyedInfra = infrastructures.filter((i) => i.condition === 'destroyed').length;
  const damagedInfra = infrastructures.filter((i) => i.condition === 'damaged').length;
  const evacCenterCount = facilities.filter((f) => f.isEvacCenter).length;

  const tabs: { key: Tab; label: string; icon: LucideIcon; count: number }[] = [
    { key: 'inhabitants', label: 'Registered Inhabitants', icon: Users, count: barangayInhabitants.length },
    { key: 'households', label: 'Household Types', icon: Home, count: households.length },
    { key: 'infrastructure', label: 'Infrastructure', icon: Construction, count: infrastructures.length },
    { key: 'facilities', label: 'Local Facilities', icon: Building, count: facilities.length },
  ];

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="stat-card">
          <div className="w-10 h-10 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mb-3">
            <Users className="w-5 h-5 text-primary-400" />
          </div>
          <p className="text-2xl font-bold text-white">{barangayInhabitants.length}</p>
          <p className="text-xs text-slate-500">Registered Persons</p>
        </div>
        <div className="stat-card">
          <div className="w-10 h-10 rounded-lg bg-danger-500/10 border border-danger-500/20 flex items-center justify-center mb-3">
            <Heart className="w-5 h-5 text-danger-400" />
          </div>
          <p className="text-2xl font-bold text-danger-400">{vulnerableCount}</p>
          <p className="text-xs text-slate-500">Vulnerable Pop.</p>
        </div>
        <div className="stat-card">
          <div className="w-10 h-10 rounded-lg bg-accent-500/10 border border-accent-500/20 flex items-center justify-center mb-3">
            <Home className="w-5 h-5 text-accent-400" />
          </div>
          <p className="text-2xl font-bold text-white">{households.length}</p>
          <p className="text-xs text-slate-500">Households</p>
        </div>
        <div className="stat-card">
          <div className="w-10 h-10 rounded-lg bg-warning-500/10 border border-warning-500/20 flex items-center justify-center mb-3">
            <Construction className="w-5 h-5 text-warning-400" />
          </div>
          <p className="text-2xl font-bold text-warning-400">{damagedInfra + destroyedInfra}</p>
          <p className="text-xs text-slate-500">Damaged Infra.</p>
        </div>
        <div className="stat-card">
          <div className="w-10 h-10 rounded-lg bg-success-500/10 border border-success-500/20 flex items-center justify-center mb-3">
            <Building className="w-5 h-5 text-success-400" />
          </div>
          <p className="text-2xl font-bold text-white">{facilities.length}</p>
          <p className="text-xs text-slate-500">Facilities</p>
        </div>
        <div className="stat-card">
          <div className="w-10 h-10 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mb-3">
            <Building className="w-5 h-5 text-primary-400" />
          </div>
          <p className="text-2xl font-bold text-white">{evacCenterCount}</p>
          <p className="text-xs text-slate-500">Evac Centers</p>
        </div>
      </div>

      {/* Main Registry Card */}
      <Card title="Barangay Registry & Database" subtitle="Multi-tab management system" icon={<Database className="w-4 h-4" />}
        action={
          <button className="btn btn-primary text-xs px-3 py-1.5">
            <Plus className="w-3.5 h-3.5" /> Add Record
          </button>
        }
      >
        {/* Tabs */}
        <div className="flex items-center gap-1 mb-4 overflow-x-auto pb-1">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.key}
                onClick={() => { setTab(t.key); setSearch(''); }}
                className={`tab-btn ${tab === t.key ? 'tab-btn-active' : 'tab-btn-inactive'} flex items-center gap-2`}
              >
                <Icon className="w-4 h-4" />
                {t.label}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${tab === t.key ? 'bg-white/20' : 'bg-slate-800'}`}>
                  {t.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Filter */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, ID, or contact..."
              className="w-full pl-10 pr-4 py-2 text-sm rounded-lg bg-slate-800/60 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-primary-500 transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <select
              value={barangayFilter}
              onChange={(e) => setBarangayFilter(e.target.value)}
              className="px-3 py-2 text-sm rounded-lg bg-slate-800/60 border border-slate-700 text-slate-200 focus:outline-none focus:border-primary-500 transition-colors"
            >
              <option value="all">All Barangays</option>
              {barangayList.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Tab Content */}
        {tab === 'inhabitants' && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-500 border-b border-slate-800">
                  <th className="text-left py-2 px-3 font-medium">ID</th>
                  <th className="text-left py-2 px-3 font-medium">Name</th>
                  <th className="text-center py-2 px-3 font-medium">Age</th>
                  <th className="text-center py-2 px-3 font-medium">Sex</th>
                  <th className="text-left py-2 px-3 font-medium">Barangay</th>
                  <th className="text-left py-2 px-3 font-medium">Household</th>
                  <th className="text-center py-2 px-3 font-medium">Vulnerable</th>
                  <th className="text-left py-2 px-3 font-medium">Contact</th>
                </tr>
              </thead>
              <tbody>
                {filteredInhabitants.map((inh) => (
                  <tr key={inh.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-3 font-mono text-xs text-slate-500">{inh.id}</td>
                    <td className="py-3 px-3 font-medium text-slate-200">{inh.name}</td>
                    <td className="py-3 px-3 text-center font-mono text-slate-300">{inh.age}</td>
                    <td className="py-3 px-3 text-center">
                      <span className={`text-xs font-bold ${inh.sex === 'M' ? 'text-primary-400' : 'text-danger-400'}`}>{inh.sex}</span>
                    </td>
                    <td className="py-3 px-3 text-slate-300">{inh.barangay}</td>
                    <td className="py-3 px-3 font-mono text-xs text-slate-400">{inh.householdId}</td>
                    <td className="py-3 px-3 text-center">
                      {inh.isVulnerable ? (
                        <span className="badge bg-danger-500/15 text-danger-400 border border-danger-500/30 text-[10px]">
                          {inh.vulnerabilityType}
                        </span>
                      ) : (
                        <span className="text-slate-600 text-xs">—</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-xs text-slate-400 font-mono">{inh.contact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'households' && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-500 border-b border-slate-800">
                  <th className="text-left py-2 px-3 font-medium">Household ID</th>
                  <th className="text-left py-2 px-3 font-medium">Head of Family</th>
                  <th className="text-left py-2 px-3 font-medium">Barangay</th>
                  <th className="text-center py-2 px-3 font-medium">Type</th>
                  <th className="text-center py-2 px-3 font-medium">Members</th>
                  <th className="text-center py-2 px-3 font-medium">Income</th>
                  <th className="text-center py-2 px-3 font-medium">Risk Zone</th>
                </tr>
              </thead>
              <tbody>
                {filteredHouseholds.map((hh) => (
                  <tr key={hh.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-3 font-mono text-xs text-slate-500">{hh.id}</td>
                    <td className="py-3 px-3 font-medium text-slate-200">{hh.head}</td>
                    <td className="py-3 px-3 text-slate-300">{hh.barangay}</td>
                    <td className="py-3 px-3 text-center">
                      <span className={`badge text-[10px] capitalize ${
                        hh.type === 'permanent' ? 'bg-success-500/15 text-success-400' :
                        hh.type === 'makeshift' ? 'bg-warning-500/15 text-warning-400' :
                        'bg-primary-500/15 text-primary-400'
                      }`}>
                        {hh.type}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center font-mono text-slate-300">{hh.members}</td>
                    <td className="py-3 px-3 text-center text-xs text-slate-400 capitalize">{hh.incomeBracket.replace('-', ' ')}</td>
                    <td className="py-3 px-3 text-center">
                      <RiskBadge level={hh.riskZone} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'infrastructure' && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-500 border-b border-slate-800">
                  <th className="text-left py-2 px-3 font-medium">ID</th>
                  <th className="text-left py-2 px-3 font-medium">Name</th>
                  <th className="text-center py-2 px-3 font-medium">Type</th>
                  <th className="text-left py-2 px-3 font-medium">Barangay</th>
                  <th className="text-center py-2 px-3 font-medium">Condition</th>
                  <th className="text-right py-2 px-3 font-medium">Value (PHP)</th>
                </tr>
              </thead>
              <tbody>
                {filteredInfra.map((inf) => {
                  const Icon = infraIcons[inf.type] ?? Building2;
                  return (
                    <tr key={inf.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 px-3 font-mono text-xs text-slate-500">{inf.id}</td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-slate-400" />
                          <span className="font-medium text-slate-200">{inf.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-center text-xs text-slate-400 capitalize">{inf.type}</td>
                      <td className="py-3 px-3 text-slate-300">{inf.barangay}</td>
                      <td className="py-3 px-3 text-center">
                        <StatusPill status={inf.condition} />
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-slate-300">
                        ₱{inf.value.toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'facilities' && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-500 border-b border-slate-800">
                  <th className="text-left py-2 px-3 font-medium">ID</th>
                  <th className="text-left py-2 px-3 font-medium">Facility Name</th>
                  <th className="text-center py-2 px-3 font-medium">Type</th>
                  <th className="text-left py-2 px-3 font-medium">Barangay</th>
                  <th className="text-center py-2 px-3 font-medium">Capacity</th>
                  <th className="text-center py-2 px-3 font-medium">Evac Center</th>
                  <th className="text-center py-2 px-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredFacilities.map((fac) => {
                  const Icon = facilityIcons[fac.type] ?? Building;
                  return (
                    <tr key={fac.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 px-3 font-mono text-xs text-slate-500">{fac.id}</td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-slate-400" />
                          <span className="font-medium text-slate-200">{fac.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-center text-xs text-slate-400 capitalize">{fac.type}</td>
                      <td className="py-3 px-3 text-slate-300">{fac.barangay}</td>
                      <td className="py-3 px-3 text-center font-mono text-slate-300">{fac.capacity ?? '—'}</td>
                      <td className="py-3 px-3 text-center">
                        {fac.isEvacCenter ? (
                          <span className="badge bg-primary-500/15 text-primary-400 text-[10px]">Yes</span>
                        ) : (
                          <span className="text-slate-600 text-xs">—</span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <StatusPill status={fac.status} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Vulnerable Population Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card title="Vulnerable Population" subtitle="Special needs registry by category" icon={<Accessibility className="w-4 h-4" />}>
          <div className="space-y-3">
            {[
              { label: 'Senior Citizens (60+)', count: barangayInhabitants.filter(i => i.vulnerabilityType?.includes('Senior')).length, icon: UserCog, color: 'text-warning-400' },
              { label: 'Children (under 12)', count: barangayInhabitants.filter(i => i.vulnerabilityType?.includes('Child') || i.vulnerabilityType?.includes('Toddler')).length, icon: Baby, color: 'text-accent-400' },
              { label: 'PWDs', count: barangayInhabitants.filter(i => i.vulnerabilityType?.includes('PWD')).length, icon: Accessibility, color: 'text-primary-400' },
              { label: 'Pregnant Women', count: barangayInhabitants.filter(i => i.vulnerabilityType?.includes('Pregnant')).length, icon: Heart, color: 'text-danger-400' },
            ].map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.label} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/40">
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${v.color}`} />
                    <span className="text-sm text-slate-300">{v.label}</span>
                  </div>
                  <span className="text-lg font-bold text-white">{v.count}</span>
                </div>
              );
            })}
          </div>
        </Card>

        <Card title="Household Composition" subtitle="By housing type" icon={<Home className="w-4 h-4" />}>
          <div className="space-y-3">
            {['permanent', 'makeshift', 'transient'].map((type) => {
              const count = households.filter(h => h.type === type).length;
              const pct = (count / households.length) * 100;
              return (
                <div key={type}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-slate-300 capitalize">{type}</span>
                    <span className="text-xs font-mono text-slate-400">{count} ({pct.toFixed(0)}%)</span>
                  </div>
                  <ProgressBar value={pct} color={type === 'permanent' ? 'success' : type === 'makeshift' ? 'warning' : 'primary'} height="h-2" />
                </div>
              );
            })}
            <div className="pt-3 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Total Household Members</span>
                <span className="text-lg font-bold text-white">{totalMembers}</span>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Infrastructure Value" subtitle="Total assessed value by condition" icon={<CircleDollarSign className="w-4 h-4" />}>
          <div className="space-y-3">
            {['good', 'damaged', 'destroyed'].map((cond) => {
              const items = infrastructures.filter(i => i.condition === cond);
              const value = items.reduce((s, i) => s + i.value, 0);
              const totalValue = infrastructures.reduce((s, i) => s + i.value, 0);
              const pct = (value / totalValue) * 100;
              const color = cond === 'good' ? 'success' : cond === 'damaged' ? 'warning' : 'danger';
              return (
                <div key={cond}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-slate-300 capitalize flex items-center gap-2">
                      <StatusPill status={cond} />
                    </span>
                    <span className="text-xs font-mono text-slate-400">₱{(value / 1000000).toFixed(1)}M</span>
                  </div>
                  <ProgressBar value={pct} color={color as 'success' | 'warning' | 'danger'} height="h-2" />
                </div>
              );
            })}
            <div className="pt-3 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Total Infrastructure Value</span>
                <span className="text-lg font-bold text-white">₱{(infrastructures.reduce((s, i) => s + i.value, 0) / 1000000).toFixed(1)}M</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
