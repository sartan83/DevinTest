export interface ProspectInput {
  companyName: string;
  websiteUrl: string;
  industry?: string;
  country?: string;
  revenue?: string;
  employees?: string;
  knownInitiatives?: string;
  targetPersona?: string;
}

export interface CompanyInsight {
  overview: string;
  industry: string;
  operatingModel: string;
  strategicInitiatives: StrategicInitiative[];
  digitalTransformationPriorities: string[];
  softwareEngineeringSignals: string[];
  painPoints: string[];
  businessGoals: string[];
  executiveQuotes: ExecutiveQuote[];
  logoUrl?: string;
}

export interface StrategicInitiative {
  title: string;
  description: string;
  sourceUrl: string;
  sourceName: string;
  confidence: "High" | "Medium" | "Low";
}

export interface ExecutiveQuote {
  quote: string;
  speaker: string;
  role: string;
  sourceUrl: string;
}

export interface CognitionUseCase {
  title: string;
  sourceUrl: string;
  industry: string;
  customerName?: string;
  problemAddressed: string;
  devinCapability: string;
  outcome?: string;
  relevanceToProspect: string;
}

export interface ValueOpportunity {
  businessInitiative: string;
  whyItMatters: string;
  engineeringWork: string;
  howDevinHelps: string;
  relatedCognitionUseCase?: CognitionUseCase;
  expectedImpact: string;
  confidence: "High" | "Medium" | "Low";
  companySourceUrl: string;
  cognitionSourceUrl?: string;
}

export interface ROIAssumptions {
  numberOfDevelopers: number;
  fullyLoadedDeveloperCost: number;
  repetitiveWorkPercentage: number;
  productivityUplift: number;
  numberOfInitiatives: number;
  monthsAccelerated: number;
  monthlyBusinessValue: number;
  annualDevinInvestment: number;
}

export interface ROIResults {
  annualProductivityValue: number;
  projectAccelerationValue: number;
  totalEstimatedValue: number;
  roiMultiple: number;
  paybackPeriodMonths: number;
}

export interface PersonalizedUseCase {
  businessProblem: string;
  whyItMatters: string;
  howDevinHelps: string;
  expectedImpact: string;
  companySourceUrl: string;
  cognitionSourceUrl?: string;
}

export interface DiscoveryQuestion {
  question: string;
  category: "strategic" | "technical" | "roi";
}

export interface MicrositeData {
  prospect: ProspectInput;
  companyInsight: CompanyInsight;
  cognitionUseCases: CognitionUseCase[];
  valueOpportunities: ValueOpportunity[];
  roiAssumptions: ROIAssumptions;
  roiResults: ROIResults;
  personalizedUseCases: PersonalizedUseCase[];
  executiveNarrative: string;
  discoveryQuestions: DiscoveryQuestion[];
  companySources: SourceReference[];
  cognitionSources: SourceReference[];
  generatedAt: string;
}

export interface SourceReference {
  title: string;
  url: string;
  type: "company" | "cognition" | "assumption";
  description?: string;
}

export type GenerationStatus =
  | "idle"
  | "researching"
  | "mapping"
  | "calculating"
  | "generating"
  | "complete"
  | "error";

export interface GenerationProgress {
  status: GenerationStatus;
  message: string;
  percentage: number;
}
