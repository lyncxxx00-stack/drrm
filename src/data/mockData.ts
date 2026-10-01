import type {
  KPI,
  ActiveThreat,
  RiskIndex,
  WeatherSnapshot,
  HourlyForecast,
  DailyForecast,
  WeatherAlert,
  BarangayDamageForecast,
  AIAnalysisResult,
  DroneImage,
  MapZone,
  SupplyItem,
  EvacCenter,
  EventLogEntry,
  SitRepSummary,
  BarangayInhabitant,
  Household,
  Infrastructure,
  Facility,
} from './types';

export const kpis: KPI[] = [
  {
    id: 'affected-families',
    label: 'Affected Families',
    value: 3847,
    unit: 'families',
    icon: 'Users',
    change: '+312',
    trend: 'up',
    severity: 'critical',
  },
  {
    id: 'affected-persons',
    label: 'Affected Persons',
    value: 19235,
    unit: 'persons',
    icon: 'UserCheck',
    change: '+1,560',
    trend: 'up',
    severity: 'critical',
  },
  {
    id: 'damaged-houses',
    label: 'Damaged Houses',
    value: 843,
    unit: 'houses',
    icon: 'Home',
    change: '+87',
    trend: 'up',
    severity: 'critical',
  },
  {
    id: 'blocked-roads',
    label: 'Blocked Roads',
    value: 27,
    unit: 'roads',
    icon: 'Road',
    change: '+5',
    trend: 'up',
    severity: 'warning',
  },
  {
    id: 'damaged-bridges',
    label: 'Damaged Bridges',
    value: 6,
    unit: 'bridges',
    icon: 'Construction',
    change: '+2',
    trend: 'up',
    severity: 'warning',
  },
  {
    id: 'damaged-towers',
    label: 'Downed Towers',
    value: 11,
    unit: 'towers',
    icon: 'Radio',
    change: '+3',
    trend: 'up',
    severity: 'warning',
  },
];

export const activeThreats: ActiveThreat[] = [
  {
    id: 'threat-1',
    type: 'Typhoon Signal No. 3',
    level: 'signal3',
    message: 'Typhoon "KANLAON" (Intensifying) — within 36-hour warning window. Sustained winds 130 km/h near center, gustiness up to 180 km/h. Borongan City and surrounding municipalities under Signal No. 3.',
    issuedAt: '2026-10-01T04:30:00',
    source: 'PAGASA Eastern Visayas',
  },
];

export const riskIndex: RiskIndex = {
  overall: 78,
  flood: 85,
  landslide: 62,
  stormSurge: 73,
  wind: 80,
};

export const weatherSnapshot: WeatherSnapshot = {
  condition: 'Heavy Rainfall with Strong Winds',
  temperature: 27,
  feelsLike: 32,
  humidity: 92,
  windSpeed: 65,
  windDirection: 'NE',
  rainfall: 45.5,
  pressure: 988,
  visibility: 2.5,
  uvIndex: 2,
  icon: 'CloudRain',
};

export const hourlyForecast: HourlyForecast[] = [
  { time: '10AM', temp: 28, condition: 'Heavy Rain', rainProbability: 85, windSpeed: 55, icon: 'CloudRain' },
  { time: '11AM', temp: 27, condition: 'Heavy Rain', rainProbability: 90, windSpeed: 62, icon: 'CloudRain' },
  { time: '12PM', temp: 27, condition: 'Storm', rainProbability: 95, windSpeed: 70, icon: 'CloudLightning' },
  { time: '1PM', temp: 26, condition: 'Storm', rainProbability: 95, windSpeed: 75, icon: 'CloudLightning' },
  { time: '2PM', temp: 26, condition: 'Storm', rainProbability: 92, windSpeed: 80, icon: 'CloudLightning' },
  { time: '3PM', temp: 25, condition: 'Heavy Rain', rainProbability: 88, windSpeed: 72, icon: 'CloudRain' },
  { time: '4PM', temp: 25, condition: 'Heavy Rain', rainProbability: 80, windSpeed: 65, icon: 'CloudRain' },
  { time: '5PM', temp: 25, condition: 'Rain', rainProbability: 70, windSpeed: 55, icon: 'CloudDrizzle' },
  { time: '6PM', temp: 24, condition: 'Rain', rainProbability: 65, windSpeed: 48, icon: 'CloudDrizzle' },
  { time: '7PM', temp: 24, condition: 'Light Rain', rainProbability: 55, windSpeed: 40, icon: 'CloudDrizzle' },
  { time: '8PM', temp: 24, condition: 'Light Rain', rainProbability: 45, windSpeed: 35, icon: 'Cloud' },
  { time: '9PM', temp: 23, condition: 'Cloudy', rainProbability: 30, windSpeed: 28, icon: 'Cloud' },
];

export const dailyForecast: DailyForecast[] = [
  { day: 'Today', date: 'Oct 1', high: 28, low: 23, condition: 'Typhoon', rainProbability: 95, windSpeed: 80, icon: 'CloudLightning' },
  { day: 'Thu', date: 'Oct 2', high: 29, low: 24, condition: 'Heavy Rain', rainProbability: 85, windSpeed: 55, icon: 'CloudRain' },
  { day: 'Fri', date: 'Oct 3', high: 30, low: 24, condition: 'Rain Showers', rainProbability: 70, windSpeed: 35, icon: 'CloudDrizzle' },
  { day: 'Sat', date: 'Oct 4', high: 31, low: 25, condition: 'Partly Cloudy', rainProbability: 40, windSpeed: 20, icon: 'CloudSun' },
  { day: 'Sun', date: 'Oct 5', high: 32, low: 26, condition: 'Partly Cloudy', rainProbability: 30, windSpeed: 18, icon: 'CloudSun' },
  { day: 'Mon', date: 'Oct 6', high: 33, low: 26, condition: 'Sunny', rainProbability: 15, windSpeed: 15, icon: 'Sun' },
  { day: 'Tue', date: 'Oct 7', high: 33, low: 27, condition: 'Sunny', rainProbability: 10, windSpeed: 12, icon: 'Sun' },
];

export const weatherAlerts: WeatherAlert[] = [
  {
    id: 'wa-1',
    severity: 'warning',
    title: 'Typhoon Warning Signal No. 3',
    area: 'Borongan City, Eastern Samar',
    description: 'Typhoon Kanlaon continues to intensify as it moves WNW toward Eastern Samar. Expect storm-force winds (100-130 km/h) and heavy to torrential rainfall (50-100 mm/hr). Storm surge of 2-3 meters possible in coastal barangays.',
    issuedAt: '2026-10-01 04:30',
    expiresAt: '2026-10-02 12:00',
  },
  {
    id: 'wa-2',
    severity: 'warning',
    title: 'Flood Warning',
    area: 'Borongan River Basin & Low-lying Barangays',
    description: 'Borongan River at critical level (8.2m, alert threshold 7.0m). Flooding expected in Brgy. Alang-alang, Maypangdan, and Camambaran within 6 hours. Residents advised to evacuate to designated centers.',
    issuedAt: '2026-10-01 05:15',
    expiresAt: '2026-10-02 06:00',
  },
  {
    id: 'wa-3',
    severity: 'watch',
    title: 'Landslide Watch',
    area: 'Upland Barangays: Taboc, Surok, San Mateo',
    description: 'Saturated soil conditions from continuous rainfall. Landslide risk elevated in mountainous areas. Monitor for cracks, soil movement, and unusual water flow.',
    issuedAt: '2026-10-01 03:00',
    expiresAt: '2026-10-03 00:00',
  },
  {
    id: 'wa-4',
    severity: 'advisory',
    title: 'Storm Surge Advisory',
    area: 'Coastal Barangays: Pina-asan, Sabang North, Sabang South',
    description: 'Coastal areas may experience storm surge of 1.5-2.5 meters above normal tide levels. Fishermen and coastal residents advised to seek higher ground.',
    issuedAt: '2026-10-01 02:00',
    expiresAt: '2026-10-02 00:00',
  },
];

export const barangayDamageForecast: BarangayDamageForecast[] = [
  { barangay: 'Alang-alang', expectedDamage: 'severe', floodDepth: 2.5, windSpeed: 120, rainfall: 85 },
  { barangay: 'Maypangdan', expectedDamage: 'severe', floodDepth: 2.1, windSpeed: 115, rainfall: 80 },
  { barangay: 'Camambaran', expectedDamage: 'high', floodDepth: 1.8, windSpeed: 110, rainfall: 75 },
  { barangay: 'Sabang North', expectedDamage: 'high', floodDepth: 1.5, windSpeed: 130, rainfall: 70 },
  { barangay: 'Sabang South', expectedDamage: 'high', floodDepth: 1.4, windSpeed: 128, rainfall: 68 },
  { barangay: 'Pina-asan', expectedDamage: 'high', floodDepth: 1.3, windSpeed: 125, rainfall: 65 },
  { barangay: 'Taboc', expectedDamage: 'moderate', floodDepth: 0.8, windSpeed: 95, rainfall: 55 },
  { barangay: 'Surok', expectedDamage: 'moderate', floodDepth: 0.6, windSpeed: 90, rainfall: 50 },
  { barangay: 'San Mateo', expectedDamage: 'moderate', floodDepth: 0.5, windSpeed: 85, rainfall: 45 },
  { barangay: 'Candorijan', expectedDamage: 'low', floodDepth: 0.2, windSpeed: 70, rainfall: 30 },
  { barangay: 'Balud', expectedDamage: 'low', floodDepth: 0.1, windSpeed: 65, rainfall: 25 },
  { barangay: 'Bato', expectedDamage: 'low', floodDepth: 0.1, windSpeed: 60, rainfall: 20 },
];

export const droneImages: { before: DroneImage; after: DroneImage }[] = [
  {
    before: {
      id: 'drone-before-1',
      label: 'Before — Brgy. Alang-alang',
      timestamp: '2026-09-28 09:00',
      url: 'https://images.pexels.com/photos/20286941/pexels-photo-20286941.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      area: 'Alang-alang Riverside Cluster',
    },
    after: {
      id: 'drone-after-1',
      label: 'After — Brgy. Alang-alang',
      timestamp: '2026-10-01 06:30',
      url: 'https://images.pexels.com/photos/6471927/pexels-photo-6471927.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      area: 'Alang-alang Riverside Cluster',
    },
  },
  {
    before: {
      id: 'drone-before-2',
      label: 'Before — Brgy. Maypangdan',
      timestamp: '2026-09-28 09:30',
      url: 'https://images.pexels.com/photos/13760469/pexels-photo-13760469.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      area: 'Maypangdan Coastal Sector',
    },
    after: {
      id: 'drone-after-2',
      label: 'After — Brgy. Maypangdan',
      timestamp: '2026-10-01 07:00',
      url: 'https://images.pexels.com/photos/14823614/pexels-photo-14823614.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      area: 'Maypangdan Coastal Sector',
    },
  },
];

export const aiAnalysisResult: AIAnalysisResult = {
  totalStructures: 1247,
  damagedStructures: 346,
  detections: [
    { id: 'det-roof', type: 'roof', label: 'Roof Damage', count: 198, confidence: 94.2, color: '#f59e0b' },
    { id: 'det-collapsed', type: 'collapsed', label: 'Collapsed Structures', count: 67, confidence: 97.8, color: '#ef4444' },
    { id: 'det-submerged', type: 'submerged', label: 'Submerged Areas', count: 54, confidence: 91.5, color: '#06b6d4' },
    { id: 'det-debris', type: 'debris', label: 'Debris Blockages', count: 89, confidence: 88.7, color: '#a78bfa' },
    { id: 'det-road', type: 'road_blocked', label: 'Road Blockages', count: 27, confidence: 95.3, color: '#f97316' },
  ],
  analysisTime: '4m 23s',
  modelVersion: 'DRRM-AI v3.2.1',
  coverageArea: 42.8,
};

export const mapZones: MapZone[] = [
  { id: 'zone-1', name: 'Alang-alang', type: 'critical', x: 15, y: 55, width: 18, height: 15, families: 487, houses: 143, infrastructure: { roads: 6, bridges: 2, towers: 3 }, evacuationNeeded: 380 },
  { id: 'zone-2', name: 'Maypangdan', type: 'critical', x: 36, y: 48, width: 16, height: 14, families: 392, houses: 98, infrastructure: { roads: 4, bridges: 1, towers: 2 }, evacuationNeeded: 310 },
  { id: 'zone-3', name: 'Camambaran', type: 'critical', x: 55, y: 60, width: 14, height: 12, families: 318, houses: 76, infrastructure: { roads: 3, bridges: 1, towers: 1 }, evacuationNeeded: 250 },
  { id: 'zone-4', name: 'Sabang North', type: 'critical', x: 72, y: 35, width: 12, height: 12, families: 276, houses: 84, infrastructure: { roads: 3, bridges: 0, towers: 2 }, evacuationNeeded: 220 },
  { id: 'zone-5', name: 'Sabang South', type: 'warning', x: 72, y: 50, width: 12, height: 10, families: 198, houses: 45, infrastructure: { roads: 2, bridges: 0, towers: 1 }, evacuationNeeded: 120 },
  { id: 'zone-6', name: 'Pina-asan', type: 'warning', x: 55, y: 38, width: 13, height: 10, families: 165, houses: 38, infrastructure: { roads: 1, bridges: 0, towers: 0 }, evacuationNeeded: 85 },
  { id: 'zone-7', name: 'Taboc', type: 'warning', x: 30, y: 25, width: 14, height: 10, families: 142, houses: 29, infrastructure: { roads: 2, bridges: 1, towers: 1 }, evacuationNeeded: 60 },
  { id: 'zone-8', name: 'Surok', type: 'warning', x: 50, y: 22, width: 12, height: 8, families: 98, houses: 18, infrastructure: { roads: 1, bridges: 0, towers: 0 }, evacuationNeeded: 35 },
  { id: 'zone-9', name: 'San Mateo', type: 'safe', x: 15, y: 18, width: 12, height: 10, families: 0, houses: 0, infrastructure: { roads: 0, bridges: 0, towers: 0 }, evacuationNeeded: 0 },
  { id: 'zone-10', name: 'Candorijan', type: 'safe', x: 80, y: 70, width: 12, height: 10, families: 0, houses: 0, infrastructure: { roads: 0, bridges: 0, towers: 0 }, evacuationNeeded: 0 },
  { id: 'zone-11', name: 'Balud', type: 'safe', x: 35, y: 72, width: 12, height: 10, families: 0, houses: 0, infrastructure: { roads: 0, bridges: 0, towers: 0 }, evacuationNeeded: 0 },
  { id: 'zone-12', name: 'Bato', type: 'safe', x: 5, y: 35, width: 10, height: 12, families: 0, houses: 0, infrastructure: { roads: 0, bridges: 0, towers: 0 }, evacuationNeeded: 0 },
];

export const supplyItems: SupplyItem[] = [
  { id: 'supply-rice', name: 'Rice (25kg sacks)', category: 'food', required: 1200, available: 850, unit: 'sacks', status: 'low' },
  { id: 'supply-packs', name: 'Family Food Packs', category: 'food', required: 3850, available: 2100, unit: 'packs', status: 'critical' },
  { id: 'supply-water', name: 'Water (5L bottles)', category: 'water', required: 6000, available: 4200, unit: 'bottles', status: 'low' },
  { id: 'supply-kits', name: 'Hygiene Kits', category: 'kit', required: 1800, available: 1450, unit: 'kits', status: 'low' },
  { id: 'supply-sleeping', name: 'Sleeping Kits', category: 'kit', required: 1500, available: 680, unit: 'kits', status: 'critical' },
  { id: 'supply-medical', name: 'Medical Supply Kits', category: 'medical', required: 500, available: 485, unit: 'kits', status: 'sufficient' },
  { id: 'supply-meds', name: 'Prescription Meds', category: 'medical', required: 350, available: 280, unit: 'kits', status: 'low' },
  { id: 'supply-candles', name: 'Candles & Lighters', category: 'kit', required: 2000, available: 1900, unit: 'sets', status: 'sufficient' },
  { id: 'supply-tents', name: 'Family Tents', category: 'kit', required: 400, available: 125, unit: 'tents', status: 'critical' },
  { id: 'supply-clothes', name: 'Clothing Bundles', category: 'kit', required: 1000, available: 750, unit: 'bundles', status: 'low' },
];

export const evacCenters: EvacCenter[] = [
  { id: 'ec-1', name: 'Borongan National High School', barangay: 'Alang-alang', capacity: 500, occupied: 478, families: 96, status: 'full' },
  { id: 'ec-2', name: 'Maypangdan Elementary School', barangay: 'Maypangdan', capacity: 300, occupied: 285, families: 57, status: 'full' },
  { id: 'ec-3', name: 'Camambaran Gymnasium', barangay: 'Camambaran', capacity: 400, occupied: 340, families: 68, status: 'crowded' },
  { id: 'ec-4', name: 'Sabang North Covered Court', barangay: 'Sabang North', capacity: 250, occupied: 195, families: 39, status: 'crowded' },
  { id: 'ec-5', name: 'Eastern Samar Sports Complex', barangay: 'Pina-asan', capacity: 800, occupied: 520, families: 104, status: 'normal' },
  { id: 'ec-6', name: 'Taboc Community Center', barangay: 'Taboc', capacity: 200, occupied: 88, families: 18, status: 'normal' },
  { id: 'ec-7', name: 'Surok Barangay Hall', barangay: 'Surok', capacity: 150, occupied: 45, families: 9, status: 'normal' },
  { id: 'ec-8', name: 'San Mateo Parish Hall', barangay: 'San Mateo', capacity: 180, occupied: 0, families: 0, status: 'normal' },
];

export const eventLog: EventLogEntry[] = [
  { id: 'ev-1', timestamp: '2026-10-01 06:45', category: 'alert', message: 'Typhoon Signal No. 3 hoisted over Borongan City and Eastern Samar', severity: 'critical' },
  { id: 'ev-2', timestamp: '2026-10-01 06:30', category: 'damage', message: 'Drone survey completed: 346 structures damaged in Alang-alang cluster', severity: 'critical' },
  { id: 'ev-3', timestamp: '2026-10-01 06:15', category: 'evacuation', message: 'Pre-emptive evacuation ordered for Brgy. Alang-alang, Maypangdan, Camambaran', severity: 'warning' },
  { id: 'ev-4', timestamp: '2026-10-01 05:45', category: 'damage', message: 'Borongan River Bridge #2 structural damage reported, closed to traffic', severity: 'critical' },
  { id: 'ev-5', timestamp: '2026-10-01 05:15', category: 'weather', message: 'Flood warning issued — Borongan River at 8.2m (critical: 7.0m)', severity: 'critical' },
  { id: 'ev-6', timestamp: '2026-10-01 04:30', category: 'alert', message: 'PAGASA issues Typhoon Warning Signal No. 3 for Eastern Visayas', severity: 'critical' },
  { id: 'ev-7', timestamp: '2026-10-01 03:50', category: 'relief', message: 'Relief goods pre-positioned at Eastern Samar Sports Complex (520 families served)', severity: 'info' },
  { id: 'ev-8', timestamp: '2026-10-01 03:00', category: 'weather', message: 'Landslide watch issued for upland barangays (Taboc, Surok, San Mateo)', severity: 'warning' },
  { id: 'ev-9', timestamp: '2026-10-01 02:00', category: 'alert', message: 'Storm surge advisory for coastal barangays — 1.5-2.5m above normal tide', severity: 'warning' },
  { id: 'ev-10', timestamp: '2026-10-01 01:30', category: 'system', message: 'DRRM Command Center activated to Red Status (full activation)', severity: 'info' },
  { id: 'ev-11', timestamp: '2026-09-30 22:00', category: 'weather', message: 'Typhoon Kanlaon enters Philippine Area of Responsibility (PAR)', severity: 'warning' },
  { id: 'ev-12', timestamp: '2026-09-30 18:00', category: 'system', message: 'Pre-disaster preparation meeting concluded — supplies checked, teams briefed', severity: 'info' },
];

export const sitRepSummary: SitRepSummary = {
  affectedFamilies: 3847,
  affectedPersons: 19235,
  displacedFamilies: 1873,
  displacedPersons: 9365,
  damagedHouses: { total: 843, destroyed: 127, major: 298, minor: 418 },
  damagedInfrastructure: { roads: 27, bridges: 6, towers: 11 },
  evacuationCenters: 8,
  evacuees: 1951,
  casualties: { dead: 0, injured: 12, missing: 3 },
};

export const barangayInhabitants: BarangayInhabitant[] = [
  { id: 'inh-001', name: 'Juan Dela Cruz', age: 54, sex: 'M', barangay: 'Alang-alang', householdId: 'HH-001', isVulnerable: false, contact: '0917-555-0101' },
  { id: 'inh-002', name: 'Maria Dela Cruz', age: 52, sex: 'F', barangay: 'Alang-alang', householdId: 'HH-001', isVulnerable: true, vulnerabilityType: 'Senior Citizen', contact: '0917-555-0101' },
  { id: 'inh-003', name: 'Ana Dela Cruz', age: 12, sex: 'F', barangay: 'Alang-alang', householdId: 'HH-001', isVulnerable: true, vulnerabilityType: 'Child', contact: '0917-555-0101' },
  { id: 'inh-004', name: 'Pedro Reyes', age: 67, sex: 'M', barangay: 'Maypangdan', householdId: 'HH-002', isVulnerable: true, vulnerabilityType: 'Senior Citizen / PWD', contact: '0918-555-0202' },
  { id: 'inh-005', name: 'Linda Reyes', age: 64, sex: 'F', barangay: 'Maypangdan', householdId: 'HH-002', isVulnerable: true, vulnerabilityType: 'Senior Citizen', contact: '0918-555-0202' },
  { id: 'inh-006', name: 'Roberto Santos', age: 38, sex: 'M', barangay: 'Camambaran', householdId: 'HH-003', isVulnerable: false, contact: '0919-555-0303' },
  { id: 'inh-007', name: 'Carmen Santos', age: 35, sex: 'F', barangay: 'Camambaran', householdId: 'HH-003', isVulnerable: true, vulnerabilityType: 'Pregnant', contact: '0919-555-0303' },
  { id: 'inh-008', name: 'Jose Bautista', age: 71, sex: 'M', barangay: 'Sabang North', householdId: 'HH-004', isVulnerable: true, vulnerabilityType: 'Senior Citizen', contact: '0920-555-0404' },
  { id: 'inh-009', name: 'Rosa Bautista', age: 69, sex: 'F', barangay: 'Sabang North', householdId: 'HH-004', isVulnerable: true, vulnerabilityType: 'Senior Citizen', contact: '0920-555-0404' },
  { id: 'inh-010', name: 'Mark Aquino', age: 28, sex: 'M', barangay: 'Sabang South', householdId: 'HH-005', isVulnerable: false, contact: '0921-555-0505' },
  { id: 'inh-011', name: 'Grace Aquino', age: 26, sex: 'F', barangay: 'Sabang South', householdId: 'HH-005', isVulnerable: false, contact: '0921-555-0505' },
  { id: 'inh-012', name: 'Liza Aquino', age: 3, sex: 'F', barangay: 'Sabang South', householdId: 'HH-005', isVulnerable: true, vulnerabilityType: 'Toddler', contact: '0921-555-0505' },
  { id: 'inh-013', name: 'Fernando Lopez', age: 45, sex: 'M', barangay: 'Taboc', householdId: 'HH-006', isVulnerable: false, contact: '0922-555-0606' },
  { id: 'inh-014', name: 'Teresa Lopez', age: 43, sex: 'F', barangay: 'Taboc', householdId: 'HH-006', isVulnerable: true, vulnerabilityType: 'PWD (Visually Impaired)', contact: '0922-555-0606' },
  { id: 'inh-015', name: 'Eduard Mendiola', age: 30, sex: 'M', barangay: 'Surok', householdId: 'HH-007', isVulnerable: false, contact: '0923-555-0707' },
  { id: 'inh-016', name: 'Patricia Mendiola', age: 29, sex: 'F', barangay: 'Surok', householdId: 'HH-007', isVulnerable: false, contact: '0923-555-0707' },
];

export const households: Household[] = [
  { id: 'HH-001', head: 'Juan Dela Cruz', barangay: 'Alang-alang', type: 'permanent', members: 5, incomeBracket: 'low', riskZone: 'critical' },
  { id: 'HH-002', head: 'Pedro Reyes', barangay: 'Maypangdan', type: 'permanent', members: 2, incomeBracket: 'low', riskZone: 'critical' },
  { id: 'HH-003', head: 'Roberto Santos', barangay: 'Camambaran', type: 'permanent', members: 4, incomeBracket: 'lower-middle', riskZone: 'critical' },
  { id: 'HH-004', head: 'Jose Bautista', barangay: 'Sabang North', type: 'permanent', members: 2, incomeBracket: 'low', riskZone: 'critical' },
  { id: 'HH-005', head: 'Mark Aquino', barangay: 'Sabang South', type: 'makeshift', members: 3, incomeBracket: 'low', riskZone: 'warning' },
  { id: 'HH-006', head: 'Fernando Lopez', barangay: 'Taboc', type: 'permanent', members: 5, incomeBracket: 'lower-middle', riskZone: 'warning' },
  { id: 'HH-007', head: 'Eduard Mendiola', barangay: 'Surok', type: 'transient', members: 3, incomeBracket: 'middle', riskZone: 'warning' },
  { id: 'HH-008', head: 'Ariel Marquez', barangay: 'San Mateo', type: 'permanent', members: 6, incomeBracket: 'middle', riskZone: 'safe' },
  { id: 'HH-009', head: 'Daisy Fernando', barangay: 'Candorijan', type: 'permanent', members: 4, incomeBracket: 'lower-middle', riskZone: 'safe' },
  { id: 'HH-010', head: 'Norman Cabael', barangay: 'Balud', type: 'permanent', members: 5, incomeBracket: 'middle', riskZone: 'safe' },
  { id: 'HH-011', head: 'Lorenzo Abude', barangay: 'Bato', type: 'permanent', members: 3, incomeBracket: 'middle', riskZone: 'safe' },
  { id: 'HH-012', head: 'Vivian Dote', barangay: 'Alang-alang', type: 'makeshift', members: 6, incomeBracket: 'low', riskZone: 'critical' },
];

export const infrastructures: Infrastructure[] = [
  { id: 'INF-001', name: 'Borongan River Bridge #1', type: 'bridge', barangay: 'Alang-alang', condition: 'damaged', value: 8500000 },
  { id: 'INF-002', name: 'Borongan River Bridge #2', type: 'bridge', barangay: 'Alang-alang', condition: 'destroyed', value: 9200000 },
  { id: 'INF-003', name: 'Alang-alang Provincial Road', type: 'road', barangay: 'Alang-alang', condition: 'damaged', value: 3500000 },
  { id: 'INF-004', name: 'Maypangdan Coastal Road', type: 'road', barangay: 'Maypangdan', condition: 'damaged', value: 2800000 },
  { id: 'INF-005', name: 'Cell Tower TC-014', type: 'tower', barangay: 'Maypangdan', condition: 'destroyed', value: 4500000 },
  { id: 'INF-006', name: 'Camambaran Spillway', type: 'road', barangay: 'Camambaran', condition: 'damaged', value: 1500000 },
  { id: 'INF-007', name: 'Sabang North Seawall', type: 'seawall', barangay: 'Sabang North', condition: 'damaged', value: 12000000 },
  { id: 'INF-008', name: 'Cell Tower TC-021', type: 'tower', barangay: 'Sabang North', condition: 'destroyed', value: 4200000 },
  { id: 'INF-009', name: 'Pina-asan Drainage System', type: 'drainage', barangay: 'Pina-asan', condition: 'damaged', value: 2200000 },
  { id: 'INF-010', name: 'Taboc-Hilltop Access Road', type: 'road', barangay: 'Taboc', condition: 'damaged', value: 1800000 },
  { id: 'INF-011', name: 'Surok Barangay Health Station', type: 'building', barangay: 'Surok', condition: 'good', value: 3500000 },
  { id: 'INF-012', name: 'San Mateo Bridge', type: 'bridge', barangay: 'San Mateo', condition: 'good', value: 6500000 },
];

export const facilities: Facility[] = [
  { id: 'FAC-001', name: 'Borongan National High School', type: 'school', barangay: 'Alang-alang', capacity: 500, isEvacCenter: true, status: 'operational' },
  { id: 'FAC-002', name: 'Maypangdan Elementary School', type: 'school', barangay: 'Maypangdan', capacity: 300, isEvacCenter: true, status: 'operational' },
  { id: 'FAC-003', name: 'Camambaran Gymnasium', type: 'evacuation', barangay: 'Camambaran', capacity: 400, isEvacCenter: true, status: 'operational' },
  { id: 'FAC-004', name: 'Sabang North Covered Court', type: 'evacuation', barangay: 'Sabang North', capacity: 250, isEvacCenter: true, status: 'damaged' },
  { id: 'FAC-005', name: 'Eastern Samar Sports Complex', type: 'evacuation', barangay: 'Pina-asan', capacity: 800, isEvacCenter: true, status: 'operational' },
  { id: 'FAC-006', name: 'Eastern Samar Provincial Hospital', type: 'health', barangay: 'Pina-asan', capacity: 200, isEvacCenter: false, status: 'operational' },
  { id: 'FAC-007', name: 'Borongan City Hall', type: 'government', barangay: 'Alang-alang', isEvacCenter: false, status: 'operational' },
  { id: 'FAC-008', name: 'Borongan Public Market', type: 'market', barangay: 'Alang-alang', isEvacCenter: false, status: 'operational' },
  { id: 'FAC-009', name: 'Borongan Port', type: 'port', barangay: 'Sabang South', isEvacCenter: false, status: 'closed' },
  { id: 'FAC-010', name: 'Taboc Community Center', type: 'evacuation', barangay: 'Taboc', capacity: 200, isEvacCenter: true, status: 'operational' },
  { id: 'FAC-011', name: 'Surok Barangay Hall', type: 'evacuation', barangay: 'Surok', capacity: 150, isEvacCenter: true, status: 'operational' },
  { id: 'FAC-012', name: 'San Mateo Parish Hall', type: 'evacuation', barangay: 'San Mateo', capacity: 180, isEvacCenter: true, status: 'operational' },
];

export const barangayList = [
  'Alang-alang', 'Maypangdan', 'Camambaran', 'Sabang North', 'Sabang South',
  'Pina-asan', 'Taboc', 'Surok', 'San Mateo', 'Candorijan', 'Balud', 'Bato',
];
