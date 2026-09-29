export type LibraryId = 'L1' | 'L2' | 'L3' | 'L4' | 'L5';

export interface LibraryDetail {
  id: LibraryId;
  number: string;
  name: string;
  subtitle: string;
  scienceType: string;
  institutions: string[];
  headquartersName: string;
  lesson: string;
  shortDescription: string;
  disciplines: { name: string; teaches: string }[];
  keyQuestions?: string[];
  fullText: string[];
  principles: string[];
  imagePlaceholder?: string;
}

export type CenterId = 'immediate' | 'transitional' | 'generational';

export interface CenterDetail {
  id: CenterId;
  number: string;
  name: string;
  ancientName: string;
  scale: string;
  domain: string;
  definition: string;
  description: string;
  governs: string[];
  purpose: string[];
  counterpartInFC: string;
}

export interface PlanItem {
  id: string;
  centerId: CenterId;
  title: string;
  timeframe: string;
  category: string;
  completed: boolean;
  notes?: string;
  createdAt: string;
}

export interface ProjectUpdate {
  id: string;
  timestamp: string;
  author: string;
  institution: string;
  headline: string;
  details: string;
  milestone?: string;
  phase: string;
}

export interface ProjectMilestone {
  id: string;
  title: string;
  targetDate: string;
  quarter: string;
  status: 'completed' | 'in_progress' | 'upcoming';
  description?: string;
}

export interface Project {
  id: string;
  title: string;
  leadInstitution: string;
  partnerInstitutions: string[];
  libraryLevel: LibraryId;
  summary: string;
  fullOverview: string;
  progressPercent: number;
  status: 'Operational' | 'Active Deployment' | 'System Verification' | 'Archival Milestone';
  image: string;
  leadSteward: string;
  updates: ProjectUpdate[];
  metrics: { label: string; value: string }[];
  startDate: string;
  targetCompletionDate: string;
  durationLabel: string;
  currentPhase: string;
  totalPhases: number;
  currentPhaseNumber: number;
  milestones: ProjectMilestone[];
  horizonCategory: 'Near Horizon (1–2 Yrs)' | 'Transitional (2–4 Yrs)' | 'Generational Arc (5+ Yrs)';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  modelUsed?: string;
}

export interface InternalDispatch {
  id: string;
  sender: string;
  senderTitle: string;
  senderOrg: string;
  recipient: string;
  subject: string;
  timestamp: string;
  category: 'Directive' | 'Diplomatic' | 'Archival' | 'Field Report';
  read: boolean;
  starred: boolean;
  content: string;
  classification: 'RESTRICTED - INTERNAL' | 'COUNCIL CONFIDENTIAL' | 'ARCHIVAL OPEN' | 'STABILIZATION MEMO';
}

export interface TrainingModule {
  id: string;
  libraryLevel: LibraryId;
  code: string;
  title: string;
  subtitle: string;
  durationMinutes: number;
  overview: string;
  syllabus: { title: string; summary: string }[];
  reflectionPrompt: string;
  certificationTitle: string;
  completed?: boolean;
}

export interface DocumentResource {
  id: string;
  code: string;
  title: string;
  category: 'Charter' | 'Whitepaper' | 'Technical Blueprint' | 'Archival Lineage' | 'Field Protocol';
  institution: string;
  libraryLevel: LibraryId;
  publicationDate: string;
  description: string;
  pageCount: number;
  fileSize: string;
}

export interface MemberProfile {
  id: string;
  name: string;
  title: string;
  institution: string;
  libraryLevel: LibraryId;
  primaryCenter: CenterId;
  location: string;
  bio: string;
  focusArea: string;
  email: string;
  avatarSeed: string;
  verified: boolean;
}

export interface UserCurrentProfile {
  name: string;
  title: string;
  institution: string;
  primaryLibrary: LibraryId;
  primaryCenter: CenterId;
  bio: string;
  location: string;
  email: string;
  securityClearance: string;
  avatarUrl?: string;
}
