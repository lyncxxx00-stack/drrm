export type ModuleKey =
  | 'overview'
  | 'weather'
  | 'damage'
  | 'riskmap'
  | 'relief'
  | 'sitrep'
  | 'barangay';

export type RiskLevel = 'critical' | 'warning' | 'safe';

export interface KPI {
  id: string;
  label: string;
  value: number;
  unit?: string;
  icon: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  severity: 'normal' | 'warning' | 'critical';
}

export interface ActiveThreat {
  id: string;
  type: string;
  level: 'signal1' | 'signal2' | 'signal3' | 'signal4' | 'signal5';
  message: string;
  issuedAt: string;
  source: string;
}

export interface RiskIndex {
  overall: number;
  flood: number;
  landslide: number;
  stormSurge: number;
  wind: number;
}

export interface WeatherSnapshot {
  condition: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  rainfall: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  icon: string;
}

export interface HourlyForecast {
  time: string;
  temp: number;
  condition: string;
  rainProbability: number;
  windSpeed: number;
  icon: string;
}

export interface DailyForecast {
  day: string;
  date: string;
  high: number;
  low: number;
  condition: string;
  rainProbability: number;
  windSpeed: number;
  icon: string;
}

export interface WeatherAlert {
  id: string;
  severity: 'advisory' | 'watch' | 'warning';
  title: string;
  area: string;
  description: string;
  issuedAt: string;
  expiresAt: string;
}

export interface BarangayDamageForecast {
  barangay: string;
  expectedDamage: 'low' | 'moderate' | 'high' | 'severe';
  floodDepth: number;
  windSpeed: number;
  rainfall: number;
}

export interface DamageDetection {
  id: string;
  type: 'roof' | 'collapsed' | 'submerged' | 'debris' | 'road_blocked';
  label: string;
  count: number;
  confidence: number;
  color: string;
}

export interface DroneImage {
  id: string;
  label: string;
  timestamp: string;
  url: string;
  area: string;
}

export interface AIAnalysisResult {
  totalStructures: number;
  damagedStructures: number;
  detections: DamageDetection[];
  analysisTime: string;
  modelVersion: string;
  coverageArea: number;
}

export interface MapZone {
  id: string;
  name: string;
  type: RiskLevel;
  x: number;
  y: number;
  width: number;
  height: number;
  families: number;
  houses: number;
  infrastructure: {
    roads: number;
    bridges: number;
    towers: number;
  };
  evacuationNeeded: number;
}

export interface SupplyItem {
  id: string;
  name: string;
  category: 'food' | 'water' | 'kit' | 'medical';
  required: number;
  available: number;
  unit: string;
  status: 'sufficient' | 'low' | 'critical' | 'empty';
}

export interface EvacCenter {
  id: string;
  name: string;
  barangay: string;
  capacity: number;
  occupied: number;
  families: number;
  status: 'normal' | 'crowded' | 'full' | 'overflow';
}

export interface EventLogEntry {
  id: string;
  timestamp: string;
  category: 'alert' | 'damage' | 'relief' | 'weather' | 'evacuation' | 'system';
  message: string;
  severity: 'info' | 'warning' | 'critical';
}

export interface SitRepSummary {
  affectedFamilies: number;
  affectedPersons: number;
  displacedFamilies: number;
  displacedPersons: number;
  damagedHouses: { total: number; destroyed: number; major: number; minor: number };
  damagedInfrastructure: { roads: number; bridges: number; towers: number };
  evacuationCenters: number;
  evacuees: number;
  casualties: { dead: number; injured: number; missing: number };
}

export interface BarangayInhabitant {
  id: string;
  name: string;
  age: number;
  sex: 'M' | 'F';
  barangay: string;
  householdId: string;
  isVulnerable: boolean;
  vulnerabilityType?: string;
  contact: string;
}

export interface Household {
  id: string;
  head: string;
  barangay: string;
  type: 'permanent' | 'makeshift' | 'transient';
  members: number;
  incomeBracket: 'low' | 'lower-middle' | 'middle' | 'upper-middle' | 'high';
  riskZone: RiskLevel;
}

export interface Infrastructure {
  id: string;
  name: string;
  type: 'road' | 'bridge' | 'tower' | 'building' | 'seawall' | 'drainage';
  barangay: string;
  condition: 'good' | 'damaged' | 'destroyed';
  value: number;
}

export interface Facility {
  id: string;
  name: string;
  type: 'school' | 'health' | 'evacuation' | 'government' | 'market' | 'port';
  barangay: string;
  capacity?: number;
  isEvacCenter: boolean;
  status: 'operational' | 'damaged' | 'closed';
}
