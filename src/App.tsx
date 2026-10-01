import { useState, useEffect } from 'react';
import type { ModuleKey } from '@/types';
import { Sidebar, TopBar, ThreatTicker } from '@/components/Layout';
import { CommandOverview } from '@/modules/CommandOverview';
import { WeatherModule } from '@/modules/WeatherModule';
import { DamageAssessmentModule } from '@/modules/DamageAssessmentModule';
import { RiskMapModule } from '@/modules/RiskMapModule';
import { ReliefOperationsModule } from '@/modules/ReliefOperationsModule';
import { SituationReportsModule } from '@/modules/SituationReportsModule';
import { BarangayRegistryModule } from '@/modules/BarangayRegistryModule';

const moduleTitles: Record<ModuleKey, string> = {
  overview: 'Command Overview',
  weather: 'Weather Forecast & Alerts',
  damage: 'Damage Assessment & AI Analysis',
  riskmap: 'Affected Areas Risk Map',
  relief: 'Relief Operations & Supply Logistics',
  sitrep: 'Situation Reports Generator',
  barangay: 'Barangay Registry & Database',
};

function App() {
  const [activeModule, setActiveModule] = useState<ModuleKey>('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const clock = document.getElementById('clock');
      if (clock) {
        clock.textContent = new Date().toLocaleTimeString('en-PH', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const renderModule = () => {
    switch (activeModule) {
      case 'overview':
        return <CommandOverview onNavigate={setActiveModule} />;
      case 'weather':
        return <WeatherModule />;
      case 'damage':
        return <DamageAssessmentModule />;
      case 'riskmap':
        return <RiskMapModule />;
      case 'relief':
        return <ReliefOperationsModule />;
      case 'sitrep':
        return <SituationReportsModule />;
      case 'barangay':
        return <BarangayRegistryModule />;
      default:
        return <CommandOverview onNavigate={setActiveModule} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-200">
      <Sidebar
        active={activeModule}
        onSelect={setActiveModule}
        collapsed={sidebarCollapsed}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar
          title={moduleTitles[activeModule]}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <ThreatTicker />

        <main className="flex-1 overflow-y-auto p-5">
          <div key={activeModule} className="max-w-[1600px] mx-auto">
            {renderModule()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
