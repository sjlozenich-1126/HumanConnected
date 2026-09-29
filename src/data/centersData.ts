import { CenterDetail, PlanItem } from '../types';

export const CENTERS_DATA: CenterDetail[] = [
  {
    id: 'immediate',
    number: '01',
    name: 'The Immediate Center',
    ancientName: 'Axial Pivot (Clock Center)',
    scale: 'Minute → Hour',
    domain: 'Biological / Ecological / Sensory Grounding',
    definition: 'Presence & Regulation',
    description:
      'The biological pivot of human experience. This is the center of being—the human equivalent of the "clock center" grounded in living biology rather than abstract ideology.',
    governs: [
      'Attention & Cognitive Focus',
      'Breath & Somatic Regulation',
      'Bodily State & Nervous System Equilibrium',
      'Immediate Needs & Sensory Reality',
      'The Next Step (Not the Next Abstract Plan)',
      'Micro-decisions under operational pressure',
    ],
    purpose: [
      'Regulate acute stress and physiological load',
      'Make decisive micro-actions aligned with current constraints',
      'Maintain situational awareness and present attunement',
      'Anchor high-stakes decisions in physical reality before scaling',
    ],
    counterpartInFC:
      'Axial Pivot: The Mechanism of Movement Balancing the Now With the Next. One hand marks the hour (vision and intention); the other marks the second (being and presence). Both meet at the center where trust balances movement.',
  },
  {
    id: 'transitional',
    number: '02',
    name: 'The Transitional Center',
    ancientName: 'Chronological Meridian (Temporal Center)',
    scale: 'Month → Month',
    domain: 'Ecological / Seasonal / Behavioral Cycles',
    definition: 'Rhythm & Adaptation',
    description:
      'The behavioral meridian of human progress. The counterpart to the 180° meridian where yesterday becomes tomorrow, grounded here in natural human cycles and seasonal realities.',
    governs: [
      'Habit Formation & Behavioral Cadence',
      'Routines & Operational Workflows',
      'Monthly Review & Strategic Recalibration',
      'Ecological & Seasonal Adaptation',
      'Sustainable Work-Rest Oscillations',
      'Reconciliation of Past Performance with Future Intention',
    ],
    purpose: [
      'Build dependable institutional consistency without burnout',
      'Adjust strategic posture as external seasons and cycles evolve',
      'Foster collective cohesion across recurring milestones',
      'Audit progress monthly against empirical baselines',
    ],
    counterpartInFC:
      'Chronological Meridian: Reconciliation point between what has been and what will be. Positioned equidistant from the International Date Line, balancing past and future in a liminal space of renewal.',
  },
  {
    id: 'generational',
    number: '03',
    name: 'The Generational Center',
    ancientName: 'Gravitational Center (Cosmic Center)',
    scale: 'Year → Year',
    domain: 'Biological / Environmental / Legacy Continuity',
    definition: 'Continuity & Legacy',
    description:
      'The continuity anchor of the Human Continuum. Like the sun governing tides and seasons without demanding noise, this center anchors long-arc stewardship, family lineages, and institutional permanence.',
    governs: [
      'Long-Arc Generational Missions (5–25+ Years)',
      'Legacy Architecture & Knowledge Preservation',
      'Environmental Stability & Biosphere Preservation',
      'Family Systems & Intergenerational Trust',
      'Passing Authoritative Knowledge Forward',
      'Alignment With Deep Planetary Cycles',
    ],
    purpose: [
      'Plant seeds for institutions and descendants whose shade we may never sit under',
      'Preserve the lineage of authority through archival integrity',
      'Ensure today’s financial and civic decisions endure for generations',
      'Maintain an unshakeable bond between truth and institutional trust',
    ],
    counterpartInFC:
      'Gravitational Center: An authority that governs by constancy, not by proximity. The radiant power that life revolves around; giving structure without interference, energy without dominion, direction without imposing an erratic path.',
  },
];

export const INITIAL_PLAN_ITEMS: PlanItem[] = [
  // Immediate Center items (Minute -> Hour)
  {
    id: 'p-imm-1',
    centerId: 'immediate',
    title: 'Somatic grounding & breath synchronization before council dispatch',
    timeframe: 'Next 30 min',
    category: 'Presence & Focus',
    completed: true,
    notes: 'Focus on diaphragmatic breathing and clear sensory perception.',
    createdAt: '2026-09-28T09:00:00Z',
  },
  {
    id: 'p-imm-2',
    centerId: 'immediate',
    title: 'Review CTS zero-trust node telemetry dispatch for anomaly isolation',
    timeframe: '10:00 – 11:15',
    category: 'Micro-Action',
    completed: false,
    notes: 'Coordinate with Zurich operations desk on cryptographic certificate refresh.',
    createdAt: '2026-09-28T09:30:00Z',
  },
  {
    id: 'p-imm-3',
    centerId: 'immediate',
    title: 'Bi-hourly sensory reset: 10-minute daylight walk and hydration check',
    timeframe: '14:00 – 14:15',
    category: 'Biological Care',
    completed: false,
    notes: 'Natural science baseline: maintain empirical bodily stamina.',
    createdAt: '2026-09-28T10:00:00Z',
  },

  // Transitional Center items (Month -> Month)
  {
    id: 'p-trn-1',
    centerId: 'transitional',
    title: 'October Equinox Calibration: Reconcile Q3 field outcomes with UN mission leads',
    timeframe: 'Month of October 2026',
    category: 'Seasonal Adaptation',
    completed: false,
    notes: 'Adjust humanitarian supply lines to winter alpine protocol.',
    createdAt: '2026-09-20T08:00:00Z',
  },
  {
    id: 'p-trn-2',
    centerId: 'transitional',
    title: 'Monthly Cadence Review: Fiducia Centrale Trust & Liquidity reserve alignment',
    timeframe: 'Last Thursday of Month',
    category: 'Cadence Audit',
    completed: true,
    notes: 'Validate reserve ratio against Swiss Archive benchmarked indices.',
    createdAt: '2026-09-15T11:00:00Z',
  },
  {
    id: 'p-trn-3',
    centerId: 'transitional',
    title: '30-Day Habit Architecture: 45-min daily deep archival synthesis sprint',
    timeframe: 'Ongoing 30-Day Cycle',
    category: 'Habit Architecture',
    completed: false,
    notes: 'Consistent quiet hours reserved before 09:00 CET.',
    createdAt: '2026-09-01T07:00:00Z',
  },

  // Generational Center items (Year -> Year)
  {
    id: 'p-gen-1',
    centerId: 'generational',
    title: 'Codex 2050: Complete unalterable deposit of Global Confidence Charters into Swiss Archives',
    timeframe: '2026 – 2030 Horizon',
    category: 'Archival Lineage',
    completed: false,
    notes: 'Physical vellum and cryptographically verified cold storage in Bern vault.',
    createdAt: '2026-01-10T12:00:00Z',
  },
  {
    id: 'p-gen-2',
    centerId: 'generational',
    title: 'Fellowship Endowment: Sponsor 25 interdisciplinary natural science apprentices',
    timeframe: '2026 – 2035 Horizon',
    category: 'Human Continuity',
    completed: false,
    notes: 'Ensure empirical biology and ecology lineages are passed forward to next generation.',
    createdAt: '2026-02-15T14:00:00Z',
  },
  {
    id: 'p-gen-3',
    centerId: 'generational',
    title: 'Planetary Biosphere Compact: Establish 12 borderless sovereign bio-monitoring sanctuaries',
    timeframe: '2026 – 2040 Horizon',
    category: 'Environmental Stability',
    completed: false,
    notes: 'Coordinated under World Systems Council treaty framework.',
    createdAt: '2026-03-01T16:00:00Z',
  },
];
