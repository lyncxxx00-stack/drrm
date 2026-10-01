import {
  FileText,
  Users,
  Home,
  Route,
  Construction,
  Radio,
  Building2,
  Heart,
  Activity,
  Package,
  AlertTriangle,
  CloudRain,
  Download,
  Printer,
  Calendar,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { Card, ProgressBar, SeverityIcon } from '@/components/ui';
import { sitRepSummary, eventLog, supplyItems, evacCenters, weatherAlerts } from '@/data/mockData';

export function SituationReportsModule() {
  const totalRequired = supplyItems.reduce((s, i) => s + i.required, 0);
  const totalAvailable = supplyItems.reduce((s, i) => s + i.available, 0);
  const supplyCoverage = ((totalAvailable / totalRequired) * 100).toFixed(0);

  const totalEvacCapacity = evacCenters.reduce((s, e) => s + e.capacity, 0);
  const totalEvacOccupied = evacCenters.reduce((s, e) => s + e.occupied, 0);

  const reportDate = new Date().toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' });
  const reportTime = new Date().toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit', hour12: true });

  const sitrepNumber = '07';
  const reportingPeriod = '06:00, 30 September 2026 — 06:00, 01 October 2026';

  return (
    <div className="space-y-5 animate-fade-in">
      {/* SITREP Header */}
      <Card title="Situation Report Generator" subtitle={`SITREP No. ${sitrepNumber} — Typhoon Kanlaon Response`} icon={<FileText className="w-4 h-4" />}
        action={
          <div className="flex items-center gap-2">
            <button className="btn btn-ghost text-xs px-3 py-1.5">
              <Printer className="w-3.5 h-3.5" /> Print
            </button>
            <button className="btn btn-primary text-xs px-3 py-1.5">
              <Download className="w-3.5 h-3.5" /> Export PDF
            </button>
          </div>
        }
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
          <div className="p-3 rounded-lg bg-slate-800/40">
            <Calendar className="w-4 h-4 text-primary-400 mb-1.5" />
            <p className="text-sm font-bold text-white">{reportDate}</p>
            <p className="text-[10px] text-slate-500">Report Date</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-800/40">
            <Clock className="w-4 h-4 text-primary-400 mb-1.5" />
            <p className="text-sm font-bold text-white">{reportTime}</p>
            <p className="text-[10px] text-slate-500">As of Time</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-800/40">
            <Activity className="w-4 h-4 text-danger-400 mb-1.5" />
            <p className="text-sm font-bold text-danger-400">RED STATUS</p>
            <p className="text-[10px] text-slate-500">Activation Level</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-800/40">
            <FileText className="w-4 h-4 text-accent-400 mb-1.5" />
            <p className="text-sm font-bold text-white">SITREP #{sitrepNumber}</p>
            <p className="text-[10px] text-slate-500">Report Number</p>
          </div>
        </div>
        <div className="p-3 rounded-lg bg-primary-500/8 border border-primary-700/20">
          <p className="text-xs text-slate-400">Reporting Period</p>
          <p className="text-sm font-medium text-slate-200">{reportingPeriod}</p>
        </div>
      </Card>

      {/* Population Impact */}
      <Card title="I. Population Impact" subtitle="Affected and displaced population summary" icon={<Users className="w-4 h-4" />}>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {[
            { label: 'Affected Families', value: sitRepSummary.affectedFamilies, icon: Users, color: 'text-danger-400' },
            { label: 'Affected Persons', value: sitRepSummary.affectedPersons, icon: Users, color: 'text-danger-400' },
            { label: 'Displaced Families', value: sitRepSummary.displacedFamilies, icon: Home, color: 'text-warning-400' },
            { label: 'Displaced Persons', value: sitRepSummary.displacedPersons, icon: Home, color: 'text-warning-400' },
            { label: 'In Evac Centers', value: sitRepSummary.evacuees, icon: Building2, color: 'text-accent-400' },
            { label: 'Evac Centers Open', value: sitRepSummary.evacuationCenters, icon: Building2, color: 'text-primary-400' },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="p-4 rounded-xl bg-slate-800/40 border border-slate-800">
                <Icon className={`w-5 h-5 ${stat.color} mb-2`} />
                <p className="text-xl font-bold text-white tabular-nums">{stat.value.toLocaleString()}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Infrastructure Damage + Casualties */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card title="II. Infrastructure Damage" subtitle="Houses and critical infrastructure" icon={<Construction className="w-4 h-4" />} className="lg:col-span-2">
          <div className="space-y-4">
            {/* Houses */}
            <div>
              <p className="text-xs text-slate-400 mb-3 flex items-center gap-2">
                <Home className="w-4 h-4 text-danger-400" /> Damaged Houses
              </p>
              <div className="grid grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-slate-800/50 text-center">
                  <p className="text-lg font-bold text-danger-400">{sitRepSummary.damagedHouses.total}</p>
                  <p className="text-[10px] text-slate-500">Total</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/50 text-center">
                  <p className="text-lg font-bold text-danger-400">{sitRepSummary.damagedHouses.destroyed}</p>
                  <p className="text-[10px] text-slate-500">Destroyed</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/50 text-center">
                  <p className="text-lg font-bold text-warning-400">{sitRepSummary.damagedHouses.major}</p>
                  <p className="text-[10px] text-slate-500">Major</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/50 text-center">
                  <p className="text-lg font-bold text-warning-400">{sitRepSummary.damagedHouses.minor}</p>
                  <p className="text-[10px] text-slate-500">Minor</p>
                </div>
              </div>
            </div>
            {/* Infrastructure */}
            <div className="pt-3 border-t border-slate-800">
              <p className="text-xs text-slate-400 mb-3 flex items-center gap-2">
                <Route className="w-4 h-4 text-warning-400" /> Critical Infrastructure
              </p>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-slate-800/50 flex items-center gap-3">
                  <Route className="w-5 h-5 text-warning-400" />
                  <div>
                    <p className="text-lg font-bold text-white">{sitRepSummary.damagedInfrastructure.roads}</p>
                    <p className="text-[10px] text-slate-500">Roads Blocked</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/50 flex items-center gap-3">
                  <Construction className="w-5 h-5 text-danger-400" />
                  <div>
                    <p className="text-lg font-bold text-white">{sitRepSummary.damagedInfrastructure.bridges}</p>
                    <p className="text-[10px] text-slate-500">Bridges Damaged</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/50 flex items-center gap-3">
                  <Radio className="w-5 h-5 text-danger-400" />
                  <div>
                    <p className="text-lg font-bold text-white">{sitRepSummary.damagedInfrastructure.towers}</p>
                    <p className="text-[10px] text-slate-500">Towers Downed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card title="III. Casualties" subtitle="Human impact summary" icon={<Heart className="w-4 h-4" />}>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-danger-500/10 border border-danger-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-danger-500/20 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-danger-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-200">Dead</p>
                  <p className="text-[10px] text-slate-500">Confirmed casualties</p>
                </div>
              </div>
              <p className="text-3xl font-bold text-danger-400">{sitRepSummary.casualties.dead}</p>
            </div>
            <div className="p-4 rounded-lg bg-warning-500/10 border border-warning-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-warning-500/20 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-warning-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-200">Injured</p>
                  <p className="text-[10px] text-slate-500">Receiving treatment</p>
                </div>
              </div>
              <p className="text-3xl font-bold text-warning-400">{sitRepSummary.casualties.injured}</p>
            </div>
            <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center">
                  <Users className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-200">Missing</p>
                  <p className="text-[10px] text-slate-500">Search ongoing</p>
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-300">{sitRepSummary.casualties.missing}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Supply Coverage + Active Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card title="IV. Supply Coverage" subtitle="Relief goods inventory status" icon={<Package className="w-4 h-4" />}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-200">Overall Coverage</p>
                <p className="text-xs text-slate-500">{totalAvailable.toLocaleString()} of {totalRequired.toLocaleString()} units</p>
              </div>
              <p className={`text-3xl font-bold ${parseInt(supplyCoverage) < 50 ? 'text-danger-400' : parseInt(supplyCoverage) < 75 ? 'text-warning-400' : 'text-success-400'}`}>
                {supplyCoverage}%
              </p>
            </div>
            <ProgressBar
              value={parseInt(supplyCoverage)}
              color={parseInt(supplyCoverage) < 50 ? 'danger' : parseInt(supplyCoverage) < 75 ? 'warning' : 'success'}
              height="h-3"
            />
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="text-center p-3 rounded-lg bg-slate-800/50">
                <p className="text-lg font-bold text-danger-400">{supplyItems.filter(s => s.status === 'critical').length}</p>
                <p className="text-[10px] text-slate-500">Critical Items</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-slate-800/50">
                <p className="text-lg font-bold text-warning-400">{supplyItems.filter(s => s.status === 'low').length}</p>
                <p className="text-[10px] text-slate-500">Low Stock</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-slate-800/50">
                <p className="text-lg font-bold text-success-400">{supplyItems.filter(s => s.status === 'sufficient').length}</p>
                <p className="text-[10px] text-slate-500">Sufficient</p>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-800">
              <p className="text-xs text-slate-400 mb-1">Evacuation Center Occupancy</p>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-200">{totalEvacOccupied.toLocaleString()} / {totalEvacCapacity.toLocaleString()}</span>
                <span className="text-sm font-bold text-warning-400">{((totalEvacOccupied / totalEvacCapacity) * 100).toFixed(0)}%</span>
              </div>
              <ProgressBar value={totalEvacOccupied} max={totalEvacCapacity} color="warning" height="h-2" />
            </div>
          </div>
        </Card>

        <Card title="V. Active Alerts" subtitle="Current weather warnings and advisories" icon={<CloudRain className="w-4 h-4" />}>
          <div className="space-y-2">
            {weatherAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-slate-800">
                <SeverityIcon severity={alert.severity === 'warning' ? 'critical' : alert.severity === 'watch' ? 'warning' : 'info'} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-200">{alert.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{alert.area}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Automated Event Log / Timeline */}
      <Card title="VI. Event Log & Timeline" subtitle="Chronological record of disaster events and response actions" icon={<Activity className="w-4 h-4" />}>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-800" />
          <div className="space-y-3">
            {eventLog.map((ev) => (
              <div key={ev.id} className="relative flex gap-4 group">
                <div className={`absolute left-3.5 w-3 h-3 rounded-full border-2 ${
                  ev.severity === 'critical' ? 'bg-danger-500 border-danger-400' :
                  ev.severity === 'warning' ? 'bg-warning-500 border-warning-400' :
                  'bg-primary-500 border-primary-400'
                }`} />
                <div className="ml-10 flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs font-mono text-slate-500">{ev.timestamp}</span>
                    <span className={`badge text-[9px] ${
                      ev.category === 'alert' ? 'bg-danger-500/15 text-danger-400' :
                      ev.category === 'damage' ? 'bg-warning-500/15 text-warning-400' :
                      ev.category === 'weather' ? 'bg-accent-500/15 text-accent-400' :
                      ev.category === 'evacuation' ? 'bg-primary-500/15 text-primary-400' :
                      ev.category === 'relief' ? 'bg-success-500/15 text-success-400' :
                      'bg-slate-700 text-slate-400'
                    }`}>
                      {ev.category}
                    </span>
                  </div>
                  <p className={`text-sm mt-1 ${
                    ev.severity === 'critical' ? 'text-slate-200 font-medium' : 'text-slate-300'
                  }`}>
                    {ev.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Generated Report Preview */}
      <Card title="Generated SITREP Summary" subtitle="Auto-formatted narrative report" icon={<CheckCircle2 className="w-4 h-4" />}>
        <div className="p-5 rounded-xl bg-slate-800/30 border border-slate-800 font-mono text-sm leading-relaxed text-slate-300 space-y-3">
          <p className="font-bold text-white text-center text-base">REPUBLIC OF THE PHILIPPINES</p>
          <p className="text-center text-slate-400">City Government of Borongan — DRRM Office</p>
          <p className="text-center text-slate-400">SITUATION REPORT NO. {sitrepNumber}</p>
          <p className="text-center text-xs text-slate-500 mt-2">Typhoon "KANLAON" — {reportDate}, {reportTime}</p>
          <div className="border-t border-slate-800 pt-3 mt-4">
            <p className="font-semibold text-slate-200">A. SITUATION OVERVIEW</p>
            <p className="mt-1">Typhoon "Kanlaon" (Intensifying) has affected a total of <strong className="text-danger-400">{sitRepSummary.affectedFamilies.toLocaleString()} families</strong> ({sitRepSummary.affectedPersons.toLocaleString()} persons) across Borongan City as of {reportTime}. {sitRepSummary.displacedFamilies.toLocaleString()} families ({sitRepSummary.displacedPersons.toLocaleString()} persons) are currently displaced, with {sitRepSummary.evacuees.toLocaleString()} individuals sheltered in {sitRepSummary.evacuationCenters} evacuation centers.</p>
          </div>
          <div className="border-t border-slate-800 pt-3">
            <p className="font-semibold text-slate-200">B. DAMAGE ASSESSMENT</p>
            <p className="mt-1">A total of <strong className="text-danger-400">{sitRepSummary.damagedHouses.total} houses</strong> have been damaged ({sitRepSummary.damagedHouses.destroyed} destroyed, {sitRepSummary.damagedHouses.major} major, {sitRepSummary.damagedHouses.minor} minor). Critical infrastructure damage includes {sitRepSummary.damagedInfrastructure.roads} blocked roads, {sitRepSummary.damagedInfrastructure.bridges} damaged bridges, and {sitRepSummary.damagedInfrastructure.towers} downed communication towers.</p>
          </div>
          <div className="border-t border-slate-800 pt-3">
            <p className="font-semibold text-slate-200">C. CASUALTIES</p>
            <p className="mt-1"><strong className="text-danger-400">{sitRepSummary.casualties.dead} dead</strong>, {sitRepSummary.casualties.injured} injured, {sitRepSummary.casualties.missing} missing. Search and rescue operations ongoing for missing persons.</p>
          </div>
          <div className="border-t border-slate-800 pt-3">
            <p className="font-semibold text-slate-200">D. RELIEF OPERATIONS</p>
            <p className="mt-1">Relief supply coverage at <strong className="text-warning-400">{supplyCoverage}%</strong> of total requirements. {supplyItems.filter(s => s.status === 'critical').length} critical shortfalls identified. Family food packs and sleeping kits are the most urgent needs. Evacuation center occupancy at {((totalEvacOccupied / totalEvacCapacity) * 100).toFixed(0)}% citywide.</p>
          </div>
          <div className="border-t border-slate-800 pt-3">
            <p className="font-semibold text-slate-200">E. ACTIVE WARNINGS</p>
            <p className="mt-1">{weatherAlerts.length} active weather alerts remain in effect. Typhoon Warning Signal No. 3 is hoisted over Borongan City and Eastern Samar. Flood and storm surge warnings active for low-lying and coastal barangays.</p>
          </div>
          <div className="border-t border-slate-800 pt-3">
            <p className="text-xs text-slate-500 italic">— End of SITREP No. {sitrepNumber} —</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
