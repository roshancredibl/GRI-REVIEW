import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ReportId } from '../../../types/report.types';
import InfoIcon from '../../../components/InfoIcon';
import { useGuidance } from '../../../hooks/useGuidance';
import GuidanceSidebar from '../../../components/GuidanceSidebar';

// Interface for biodiversity goals/targets
interface BiodiversityGoalTarget {
  id: string;
  goalName: string;
  description: string;
  baseYear: number | '';
  targetYear: number | '';
  scientificConsensus: 'yes' | 'partial' | 'no' | '';
  sbtnAlignment: 'fully_aligned' | 'partially_aligned' | 'not_aligned' | '';
  category: 'conservation' | 'restoration' | 'sustainable_use' | 'impact_reduction' | 'other' | '';
  indicatorType: 'quantitative' | 'qualitative' | 'both' | '';
  indicators: string;
}

// Interface for biodiversity impact sites
interface BiodiversityImpactSite {
  id: string;
  siteIdentifier: string;
  sizeUnderRestoration: number | '';
  sizeRestored: number | '';
  hasBiodiversityPlan: boolean;
  biodiversityPlanFile: File | null;
  noPlanExplanation: string;
}

// Interface for biodiversity offsets
interface BiodiversityOffset {
  id: string;
  offsetIdentifier: string;
  goals: string;
  geographicLocation: string;
  goodPracticesCompliance: string[];
  goodPracticesOther: string;
  hasThirdPartyCertification: boolean;
  certificationFile: File | null;
  certificationDetails: string;
}

// Interface for individual offset measures in question 2a.iv
interface OffsetMeasure {
  id: string;
  description: string;
  location: string;
  complianceExplanation: string;
  certificationToggle: boolean;
  certificationFile: File | null;
}

// Interface for biodiversity management plan sites in question 2d
interface ManagementPlanSite {
  id: string;
  siteName: string;
  typeOfImpact: 'low' | 'medium' | 'high' | '';
  managementPlan: 'yes' | 'no' | '';
  remarks: string;
}

// Interface for biodiversity impact locations in question 5a
interface BiodiversityLocation {
  id: string;
  siteName: string;
  locationCoordinates: string;
  sizeHectares: number | '';
}

// Interface for ecologically sensitive areas assessment in question 5b
interface EcologicalSensitivityAssessment {
  id: string;
  siteReference: string; // Reference to site from 5a
  biodiversityImportance: {
    status: 'in' | 'near' | 'no' | '';
    distance: number | '';
  };
  highEcosystemIntegrity: {
    status: 'in' | 'near' | 'no' | '';
    distance: number | '';
  };
  rapidEcosystemDecline: {
    status: 'in' | 'near' | 'no' | '';
    distance: number | '';
  };
  highWaterRisks: {
    status: 'in' | 'near' | 'no' | '';
    distance: number | '';
  };
  ecosystemServicesImportance: {
    status: 'in' | 'near' | 'no' | '';
    distance: number | '';
  };
}

// Interface for site activities in question 5c
interface SiteActivity {
  id: string;
  siteReference: string; // Reference to site from 5a
  activities: string;
}

// Interface for supply chain products/services in question 5d
interface SupplyChainProduct {
  id: string;
  productService: string;
  countryJurisdiction: string;
  traceabilityLevel: 'national' | 'regional' | 'local' | 'specific_origin' | '';
}

// Interface for land and sea use change in question 6a
interface LandSeaUseChange {
  id: string;
  siteReference: string; // Reference to site from 5a
  // 6a i - Area converted since cut-off date
  sizeConvertedCutoff: number | '';
  cutoffReferenceDate: string;
  ecosystemTypeBeforeAfterCutoff: string;
  // 6a ii - Area converted during reporting period
  sizeConvertedReporting: number | '';
  ecosystemTypeBeforeAfterReporting: string;
}

// Interface for natural resources exploitation in question 6b
interface NaturalResourcesData {
  id: string;
  siteReference: string; // Reference to site from 5a
  // 6b i - Wild species harvested
  speciesType: string;
  quantity: number | '';
  extinctionRisk: string;
  // 6b ii - Water withdrawal and consumption
  waterWithdrawal: number | '';
  waterConsumption: number | '';
}

// Interface for pollution data in question 6c
interface PollutionData {
  id: string;
  siteReference: string; // Reference to site from 5a
  pollutantType: string;
  quantity: number | '';
}

// Interface for invasive alien species in question 6d
interface InvasiveSpeciesData {
  id: string;
  siteReference: string; // Reference to site from 5a
  description: string;
}

// Interface for supply chain breakdown in question 6e
interface SupplyChainBreakdown {
  id: string;
  productReference: string; // Reference to product from 5d
  // 1. Primary Data Availability
  primaryDataAvailable: 'yes' | 'no' | '';
  // 2. Estimation Methodology (shown only if primaryDataAvailable = 'no')
  estimationMethods: string[];
  estimationMethodsOther: string;
  // 3. Volume or Spend Data
  volume: number | '';
  volumeUnit: string;
  spendAmount: number | '';
  spendCurrency: string;
  // 4. Inputs and Outputs Estimated
  environmentalInputsOutputs: string[];
  environmentalInputsOutputsOther: string;
  // 5. Sourced Volume Deforestation-Free
  deforestationFreePercentage: number | '';
  // 6. Assessment Approaches
  assessmentMethods: string[];
  assessmentMethodsOther: string;
  assessmentDescription: string;
  // 7. Cut-off Date for Assessment
  cutoffDate: string;
  // 8. Additional Comments
  additionalComments: string;
}

// Interface for data source in question 6f
interface DataSource {
  id: string;
  sourceName: string;
  sourceType: string;
  date: string;
  documentation: File | null;
  link: string;
}

// Interface for revision history in question 6f
interface RevisionHistory {
  id: string;
  date: string;
  description: string;
  author: string;
}

// Interface for contextual information in question 6f
interface ContextualInformation {
  id: string;
  // 1. Standards Applied
  standardsApplied: string[];
  standardsAppliedOther: string;
  // 2. Methodologies Used
  methodologiesUsed: string[];
  methodologiesUsedOther: string;
  methodologiesDescription: string;
  // 3. Assumptions Made
  assumptionsMade: string;
  // 4. Data Sources and Evidence
  dataSources: DataSource[];
  // 5. Data Quality and Limitations
  dataQualityLimitations: string[];
  dataQualityLimitationsOther: string;
  dataQualityDescription: string;
  // 6. Stakeholder Engagement
  stakeholderEngagement: string[];
  stakeholderEngagementOther: string;
  stakeholderEngagementDescription: string;
  // 7. Revision History & Updates
  revisionHistory: RevisionHistory[];
  // 8. Additional Comments
  additionalComments: string;
}

// Interface for affected ecosystems in question 7a
interface AffectedEcosystem {
  id: string;
  siteReference: string; // Reference to site from 5a
  // 7a i - Ecosystem type for base year
  ecosystemTypeBaseYear: string;
  // 7a ii - Ecosystem size for base year
  ecosystemSizeBaseYear: number | '';
  // 7a iii - Ecosystem condition for base year and current period
  ecosystemConditionBaseYear: string;
  ecosystemConditionCurrentPeriod: string;
}

// Interface for biodiversity data compilation context in question 7b
interface BiodiversityDataContext {
  id: string;
  // 1. Applicable Standards
  applicableStandards: string[];
  applicableStandardsOther: string;
  // 2. Data Collection Methodologies
  dataCollectionMethodologies: string[];
  dataCollectionMethodologiesOther: string;
  dataCollectionDescription: string;
  // 3. Key Assumptions Made
  keyAssumptions: string;
  // 4. Data Sources & Evidence
  biodiversityDataSources: DataSource[];
  // 5. Data Quality and Limitations
  dataQualityLimitations: string[];
  dataQualityLimitationsOther: string;
  dataQualityDescription: string;
  // 6. Stakeholder Engagement
  stakeholderEngagement: string[];
  stakeholderEngagementOther: string;
  stakeholderEngagementDescription: string;
  // 7. Changes and Updates
  changesAndUpdates: RevisionHistory[];
  // 8. Additional Context
  additionalContext: string;
}

// Interface for ecosystem services and beneficiaries in question 8a
interface EcosystemServicesBeneficiaries {
  id: string;
  siteReference: string; // Reference to site from 5a
  ecosystemServices: string;
  beneficiaries: string;
  numberOfBeneficiaries: number | '';
  approachUsed: string[];
  approachUsedOther: string;
  approachDescription: string;
}

// Interface for ecosystem services impact assessment in question 8b
interface EcosystemServicesImpact {
  id: string;
  // 1. List of Ecosystem Services
  ecosystemServices: string[];
  ecosystemServicesOther: string;
  // 2. Description of Impact (per service)
  impactDescriptions: { [service: string]: string };
  // 3. Beneficiary Groups
  beneficiaryGroups: string[];
  beneficiaryGroupsOther: string;
  // 4. Positive or Negative Impact (per service-beneficiary pair)
  impactTypes: { [serviceAndBeneficiary: string]: 'positive' | 'neutral' | 'negative' | '' };
  // 5. Geographic Scope
  geographicScope: string;
  // 6. Evidence and Sources
  evidenceSources: string;
  evidenceDocuments: File | null;
  // 7. Mitigation or Enhancement Actions
  mitigationActions: string;
  // 8. Stakeholder Engagement
  stakeholderEngagementMethods: string[];
  stakeholderEngagementMethodsOther: string;
  stakeholderEngagementDescription: string;
  // 9. Additional Comments
  additionalComments: string;
}

// Interface for mitigation hierarchy actions
interface MitigationActions {
  avoidance: {
    description: string;
    methods: string[];
    methodsOther: string;
  };
  minimization: {
    description: string;
    supportingDocs: File | null;
  };
  restoration: {
    description: string;
    goals: string;
    stakeholderEngagement: string[];
    stakeholderOther: string;
    restorationPlans: File | null;
  };
  offsetting: {
    offsetMeasures: OffsetMeasure[];
  };
  transformative: {
    description: string;
    policyDocs: File | null;
  };
}

const GRI101Biodiversity: React.FC = () => {
  const navigate = useNavigate();
  const { reportId } = useParams<{ reportId: ReportId }>();
  const { guidanceState, openGuidance, closeGuidance } = useGuidance();
  const [priorDisclosure, setPriorDisclosure] = useState<string>('');
  
  // State for biodiversity goals/targets (question 1c)
  const [biodiversityGoals, setBiodiversityGoals] = useState<BiodiversityGoalTarget[]>([]);
  const [showSummaryView, setShowSummaryView] = useState<boolean>(false);

  // State for mitigation hierarchy actions (question 2a)
  const [mitigationActions, setMitigationActions] = useState<MitigationActions>({
    avoidance: { description: '', methods: [], methodsOther: '' },
    minimization: { description: '', supportingDocs: null },
    restoration: { description: '', goals: '', stakeholderEngagement: [], stakeholderOther: '', restorationPlans: null },
    offsetting: { offsetMeasures: [] },
    transformative: { description: '', policyDocs: null }
  });

  // State for biodiversity impact sites (question 2b)
  const [impactSites, setImpactSites] = useState<BiodiversityImpactSite[]>([]);

  // State for biodiversity offsets (question 2c)
  const [biodiversityOffsets, setBiodiversityOffsets] = useState<BiodiversityOffset[]>([]);

  // State for management plan sites (question 2d)
  const [managementPlanSites, setManagementPlanSites] = useState<ManagementPlanSite[]>([]);

  // State for biodiversity impact locations (question 5a)
  const [biodiversityLocations, setBiodiversityLocations] = useState<BiodiversityLocation[]>([]);

  // State for ecological sensitivity assessments (question 5b)
  const [ecologicalAssessments, setEcologicalAssessments] = useState<EcologicalSensitivityAssessment[]>([]);

  // State for site activities (question 5c)
  const [siteActivities, setSiteActivities] = useState<SiteActivity[]>([]);

  // State for supply chain products/services (question 5d)
  const [supplyChainProducts, setSupplyChainProducts] = useState<SupplyChainProduct[]>([]);
  
  // State for percentage calculation in 5a summary
  const [totalSitesCount, setTotalSitesCount] = useState<number | ''>('');

  // State for question 6a - Land and sea use change
  const [landSeaUseChange, setLandSeaUseChange] = useState<LandSeaUseChange[]>([]);
  
  // State for question 6b - Exploitation of natural resources
  const [naturalResourcesData, setNaturalResourcesData] = useState<NaturalResourcesData[]>([]);
  
  // State for question 6c - Pollution data
  const [pollutionData, setPollutionData] = useState<PollutionData[]>([]);
  
  // State for question 6d - Invasive alien species
  const [invasiveSpeciesData, setInvasiveSpeciesData] = useState<InvasiveSpeciesData[]>([]);
  
  // State for question 6e - Supply chain breakdown
  const [supplyChainBreakdown, setSupplyChainBreakdown] = useState<SupplyChainBreakdown[]>([]);
  
  // State for question 6f - Contextual information
  const [contextualInformation, setContextualInformation] = useState<ContextualInformation[]>([]);
  
  // State for question 7a - Affected ecosystems
  const [affectedEcosystems, setAffectedEcosystems] = useState<AffectedEcosystem[]>([]);
  
  // State for question 7b - Biodiversity data compilation context
  const [biodiversityDataContext, setBiodiversityDataContext] = useState<BiodiversityDataContext[]>([]);
  
  // State for question 8a - Ecosystem services and beneficiaries
  const [ecosystemServicesBeneficiaries, setEcosystemServicesBeneficiaries] = useState<EcosystemServicesBeneficiaries[]>([]);
  
  // State for question 8b - Ecosystem services impact assessment
  const [ecosystemServicesImpact, setEcosystemServicesImpact] = useState<EcosystemServicesImpact[]>([]);

  // Options for dropdowns
  const avoidanceMethods = [
    'Buffer zones',
    'Protected areas',
    'Alternative site selection',
    'Project redesign',
    'Timing adjustments',
    'Route optimization'
  ];

  const stakeholderEngagementTypes = [
    'Community consultation',
    'Indigenous partnerships',
    'NGO collaboration',
    'Expert consultation',
    'Regulatory engagement',
    'Academic partnerships'
  ];

  // Options for question 6e
  const estimationMethodsOptions = [
    'Multi-regional input-output (MRIO) models',
    'Lifecycle impact assessments',
    'Satellite monitoring',
    'Third-party databases',
    'Industry benchmarks',
    'Other'
  ];

  const environmentalInputsOutputsOptions = [
    'Water use',
    'Air emissions',
    'Land use change',
    'Biodiversity loss',
    'Deforestation',
    'Soil degradation',
    'Waste generation',
    'Other'
  ];

  const assessmentMethodsOptions = [
    'Certification schemes',
    'Supplier verification',
    'Sourcing from low-risk jurisdictions',
    'Satellite monitoring',
    'Third-party audits',
    'Blockchain traceability',
    'Other'
  ];

  const volumeUnits = [
    'tons',
    'kg',
    'liters',
    'cubic meters',
    'units',
    'hectares',
    'other'
  ];

  const currencies = [
    'USD',
    'EUR',
    'GBP',
    'JPY',
    'CAD',
    'AUD',
    'CHF',
    'CNY',
    'Other'
  ];

  // Options for question 6f - Contextual Information
  const standardsOptions = [
    'GRI 101: Biodiversity 2024',
    'ISO 14001',
    'TCFD (Task Force on Climate-related Financial Disclosures)',
    'TNFD (Taskforce on Nature-related Financial Disclosures)',
    'CDP (Carbon Disclosure Project)',
    'SBTN (Science Based Targets Network)',
    'Natural Capital Protocol',
    'CICES (Common International Classification of Ecosystem Services)',
    'Internal ESG Framework',
    'Other'
  ];

  const methodologiesOptions = [
    'Risk assessments',
    'Lifecycle assessments',
    'Input-output models',
    'Field surveys',
    'Remote sensing and satellite imagery',
    'Stakeholder consultations',
    'Desktop research and literature review',
    'Expert elicitation',
    'Spatial analysis and mapping',
    'Biodiversity footprinting',
    'Species abundance monitoring',
    'Habitat quality assessments',
    'Other'
  ];

  const dataQualityLimitationsOptions = [
    'Incomplete supplier data',
    'Estimation errors and uncertainties',
    'Limited geographic coverage',
    'Temporal data gaps',
    'Proxy data usage',
    'Lack of primary data',
    'Methodological limitations',
    'Data quality variations',
    'Sampling biases',
    'Measurement uncertainties',
    'Other'
  ];

  const stakeholderEngagementTypesForContextual = [
    'Supplier consultations',
    'Expert reviews',
    'Community feedback',
    'NGO partnerships',
    'Academic collaborations',
    'Government agency consultations',
    'Indigenous community engagement',
    'Local stakeholder workshops',
    'Online surveys and questionnaires',
    'Focus group discussions',
    'Other'
  ];

  // Options for ecosystem services identification approaches
  const ecosystemServicesApproaches = [
    'ENCORE tool',
    'Natural Capital Protocol',
    'TNFD LEAP approach',
    'WRI Corporate Ecosystem Services Review',
    'Stakeholder engagement',
    'Expert consultation',
    'Field surveys',
    'Scientific studies',
    'Ecosystem mapping',
    'Benefit-cost analysis',
    'Community consultation',
    'Other'
  ];

  // Options for ecosystem services categories (for 8b)
  const ecosystemServicesCategories = [
    'Provisioning - Fresh water',
    'Provisioning - Food production',
    'Provisioning - Raw materials',
    'Provisioning - Genetic resources',
    'Provisioning - Energy resources',
    'Regulating - Climate regulation',
    'Regulating - Water regulation',
    'Regulating - Flood control',
    'Regulating - Air quality regulation',
    'Regulating - Water purification',
    'Regulating - Disease control',
    'Regulating - Pollination',
    'Regulating - Soil formation',
    'Cultural - Recreation',
    'Cultural - Spiritual and religious',
    'Cultural - Educational',
    'Cultural - Aesthetic',
    'Cultural - Heritage',
    'Supporting - Nutrient cycling',
    'Supporting - Habitat provision',
    'Supporting - Biodiversity maintenance',
    'Other'
  ];

  // Options for beneficiary groups (for 8b)
  const beneficiaryGroupsOptions = [
    'Local communities',
    'Indigenous Peoples',
    'Farmers',
    'Fishing communities',
    'Urban populations',
    'Rural populations',
    'Women and children',
    'Vulnerable populations',
    'The organization itself',
    'Downstream communities',
    'Tourists and visitors',
    'Wildlife and ecosystems',
    'Future generations',
    'Government and public sector',
    'Private sector stakeholders',
    'Other'
  ];

  // Options for stakeholder engagement methods (for 8b)
  const stakeholderEngagementMethods8b = [
    'Community consultations',
    'Expert panels',
    'Focus group discussions',
    'Public meetings',
    'Surveys and questionnaires',
    'Workshops and seminars',
    'Stakeholder interviews',
    'Participatory mapping',
    'Scientific advisory boards',
    'Environmental impact assessments',
    'Social impact assessments',
    'Traditional knowledge consultations',
    'Online consultations',
    'Other'
  ];

  const sourceTypes = [
    'Database',
    'Field survey',
    'Scientific study',
    'Government report',
    'Third-party assessment',
    'Satellite imagery',
    'Monitoring system',
    'Certification body',
    'Academic research',
    'Industry report',
    'Other'
  ];

  const goodOffsetPractices = [
    'No net loss principle',
    'Like-for-like habitat exchange',
    'Additionality ensured',
    'Permanence guaranteed',
    'Local community involvement',
    'Scientific monitoring protocols'
  ];

  // Helper function to generate unique ID
  const generateUniqueId = (): string => {
    return `bg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  // Add new biodiversity goal/target
  const addBiodiversityGoal = () => {
    if (biodiversityGoals.length >= 15) {
      alert('Maximum 15 goals/targets allowed');
      return;
    }
    
    const newGoal: BiodiversityGoalTarget = {
      id: generateUniqueId(),
      goalName: '',
      description: '',
      baseYear: '',
      targetYear: '',
      scientificConsensus: '',
      sbtnAlignment: '',
      category: '',
      indicatorType: '',
      indicators: ''
    };
    
    setBiodiversityGoals([...biodiversityGoals, newGoal]);
  };

  // Remove biodiversity goal/target
  const removeBiodiversityGoal = (id: string) => {
    setBiodiversityGoals(biodiversityGoals.filter(goal => goal.id !== id));
  };

  // Update biodiversity goal/target
  const updateBiodiversityGoal = (id: string, field: keyof BiodiversityGoalTarget, value: any) => {
    setBiodiversityGoals(biodiversityGoals.map(goal => 
      goal.id === id ? { ...goal, [field]: value } : goal
    ));
  };

  // Move goal up/down for reordering
  const moveGoal = (index: number, direction: 'up' | 'down') => {
    const newGoals = [...biodiversityGoals];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < newGoals.length) {
      [newGoals[index], newGoals[targetIndex]] = [newGoals[targetIndex], newGoals[index]];
      setBiodiversityGoals(newGoals);
    }
  };

  // Validate target year against base year
  const validateTargetYear = (goal: BiodiversityGoalTarget): string | null => {
    if (goal.baseYear && goal.targetYear) {
      if (Number(goal.targetYear) <= Number(goal.baseYear)) {
        return 'Target year must be after base year';
      }
    }
    return null;
  };

  // Site management functions
  const addImpactSite = () => {
    const newSite: BiodiversityImpactSite = {
      id: generateUniqueId(),
      siteIdentifier: '',
      sizeUnderRestoration: '',
      sizeRestored: '',
      hasBiodiversityPlan: false,
      biodiversityPlanFile: null,
      noPlanExplanation: ''
    };
    setImpactSites([...impactSites, newSite]);
  };

  const removeImpactSite = (id: string) => {
    setImpactSites(impactSites.filter(site => site.id !== id));
  };

  const updateImpactSite = (id: string, field: keyof BiodiversityImpactSite, value: any) => {
    setImpactSites(impactSites.map(site => 
      site.id === id ? { ...site, [field]: value } : site
    ));
  };

  // Offset management functions
  const addBiodiversityOffset = () => {
    const newOffset: BiodiversityOffset = {
      id: generateUniqueId(),
      offsetIdentifier: '',
      goals: '',
      geographicLocation: '',
      goodPracticesCompliance: [],
      goodPracticesOther: '',
      hasThirdPartyCertification: false,
      certificationFile: null,
      certificationDetails: ''
    };
    setBiodiversityOffsets([...biodiversityOffsets, newOffset]);
  };

  const removeBiodiversityOffset = (id: string) => {
    setBiodiversityOffsets(biodiversityOffsets.filter(offset => offset.id !== id));
  };

  const updateBiodiversityOffset = (id: string, field: keyof BiodiversityOffset, value: any) => {
    setBiodiversityOffsets(biodiversityOffsets.map(offset => 
      offset.id === id ? { ...offset, [field]: value } : offset
    ));
  };

  // Mitigation actions update functions
  const updateMitigationAction = (section: keyof MitigationActions, field: string, value: any) => {
    setMitigationActions(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Checkbox handlers for multi-select arrays
  const handleCheckboxChange = (section: keyof MitigationActions, field: string, option: string, checked: boolean) => {
    const currentArray = (mitigationActions[section] as any)[field] || [];
    let newArray;
    
    if (checked) {
      newArray = [...currentArray, option];
    } else {
      newArray = currentArray.filter((item: string) => item !== option);
    }
    
    updateMitigationAction(section, field, newArray);
  };

  // Offset measures management functions for question 2a.iv
  const addOffsetMeasure = () => {
    const newOffsetMeasure: OffsetMeasure = {
      id: generateUniqueId(),
      description: '',
      location: '',
      complianceExplanation: '',
      certificationToggle: false,
      certificationFile: null
    };
    
    setMitigationActions(prev => ({
      ...prev,
      offsetting: {
        offsetMeasures: [...prev.offsetting.offsetMeasures, newOffsetMeasure]
      }
    }));
  };

  const removeOffsetMeasure = (id: string) => {
    setMitigationActions(prev => ({
      ...prev,
      offsetting: {
        offsetMeasures: prev.offsetting.offsetMeasures.filter(measure => measure.id !== id)
      }
    }));
  };

  const updateOffsetMeasure = (id: string, field: keyof OffsetMeasure, value: any) => {
    setMitigationActions(prev => ({
      ...prev,
      offsetting: {
        offsetMeasures: prev.offsetting.offsetMeasures.map(measure => 
          measure.id === id ? { ...measure, [field]: value } : measure
        )
      }
    }));
  };

  // Management plan sites functions for question 2d
  const addManagementPlanSite = () => {
    const newSite: ManagementPlanSite = {
      id: generateUniqueId(),
      siteName: '',
      typeOfImpact: '',
      managementPlan: '',
      remarks: ''
    };
    setManagementPlanSites([...managementPlanSites, newSite]);
  };

  const removeManagementPlanSite = (id: string) => {
    setManagementPlanSites(managementPlanSites.filter(site => site.id !== id));
  };

  const updateManagementPlanSite = (id: string, field: keyof ManagementPlanSite, value: any) => {
    setManagementPlanSites(managementPlanSites.map(site => 
      site.id === id ? { ...site, [field]: value } : site
    ));
  };

  // Biodiversity locations management functions for question 5a
  const addBiodiversityLocation = () => {
    const newLocation: BiodiversityLocation = {
      id: generateUniqueId(),
      siteName: '',
      locationCoordinates: '',
      sizeHectares: ''
    };
    setBiodiversityLocations([...biodiversityLocations, newLocation]);
  };

  const removeBiodiversityLocation = (id: string) => {
    setBiodiversityLocations(biodiversityLocations.filter(location => location.id !== id));
  };

  const updateBiodiversityLocation = (id: string, field: keyof BiodiversityLocation, value: any) => {
    setBiodiversityLocations(biodiversityLocations.map(location => 
      location.id === id ? { ...location, [field]: value } : location
    ));
  };

  // Ecological sensitivity assessments management functions for question 5b
  const addEcologicalAssessment = () => {
    const newAssessment: EcologicalSensitivityAssessment = {
      id: generateUniqueId(),
      siteReference: '',
      biodiversityImportance: { status: '', distance: '' },
      highEcosystemIntegrity: { status: '', distance: '' },
      rapidEcosystemDecline: { status: '', distance: '' },
      highWaterRisks: { status: '', distance: '' },
      ecosystemServicesImportance: { status: '', distance: '' }
    };
    setEcologicalAssessments([...ecologicalAssessments, newAssessment]);
  };

  const removeEcologicalAssessment = (id: string) => {
    setEcologicalAssessments(ecologicalAssessments.filter(assessment => assessment.id !== id));
  };

  const updateEcologicalAssessment = (id: string, category: keyof EcologicalSensitivityAssessment, field: string, value: any) => {
    setEcologicalAssessments(ecologicalAssessments.map(assessment => {
      if (assessment.id === id) {
        if (category === 'siteReference') {
          return { ...assessment, siteReference: value };
        } else {
          return {
            ...assessment,
            [category]: {
              ...(assessment[category] as any),
              [field]: value
            }
          };
        }
      }
      return assessment;
    }));
  };

  // Site activities management functions for question 5c
  const addSiteActivity = () => {
    const newActivity: SiteActivity = {
      id: generateUniqueId(),
      siteReference: '',
      activities: ''
    };
    setSiteActivities([...siteActivities, newActivity]);
  };

  const removeSiteActivity = (id: string) => {
    setSiteActivities(siteActivities.filter(activity => activity.id !== id));
  };

  const updateSiteActivity = (id: string, field: keyof SiteActivity, value: any) => {
    setSiteActivities(siteActivities.map(activity => 
      activity.id === id ? { ...activity, [field]: value } : activity
    ));
  };

  // Supply chain products management functions for question 5d
  const addSupplyChainProduct = () => {
    const newProduct: SupplyChainProduct = {
      id: generateUniqueId(),
      productService: '',
      countryJurisdiction: '',
      traceabilityLevel: ''
    };
    setSupplyChainProducts([...supplyChainProducts, newProduct]);
  };

  const removeSupplyChainProduct = (id: string) => {
    setSupplyChainProducts(supplyChainProducts.filter(product => product.id !== id));
  };

  const updateSupplyChainProduct = (id: string, field: keyof SupplyChainProduct, value: any) => {
    setSupplyChainProducts(supplyChainProducts.map(product => 
      product.id === id ? { ...product, [field]: value } : product
    ));
  };

  // Land and sea use change management functions for question 6a
  const addLandSeaUseChange = () => {
    const newEntry: LandSeaUseChange = {
      id: generateUniqueId(),
      siteReference: '',
      sizeConvertedCutoff: '',
      cutoffReferenceDate: '',
      ecosystemTypeBeforeAfterCutoff: '',
      sizeConvertedReporting: '',
      ecosystemTypeBeforeAfterReporting: ''
    };
    setLandSeaUseChange([...landSeaUseChange, newEntry]);
  };

  const removeLandSeaUseChange = (id: string) => {
    setLandSeaUseChange(landSeaUseChange.filter(entry => entry.id !== id));
  };

  const updateLandSeaUseChange = (id: string, field: keyof LandSeaUseChange, value: any) => {
    setLandSeaUseChange(landSeaUseChange.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  // Natural resources data management functions for question 6b
  const addNaturalResourcesData = () => {
    const newEntry: NaturalResourcesData = {
      id: generateUniqueId(),
      siteReference: '',
      speciesType: '',
      quantity: '',
      extinctionRisk: '',
      waterWithdrawal: '',
      waterConsumption: ''
    };
    setNaturalResourcesData([...naturalResourcesData, newEntry]);
  };

  const removeNaturalResourcesData = (id: string) => {
    setNaturalResourcesData(naturalResourcesData.filter(entry => entry.id !== id));
  };

  const updateNaturalResourcesData = (id: string, field: keyof NaturalResourcesData, value: any) => {
    setNaturalResourcesData(naturalResourcesData.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  // Pollution data management functions for question 6c
  const addPollutionData = () => {
    const newEntry: PollutionData = {
      id: generateUniqueId(),
      siteReference: '',
      pollutantType: '',
      quantity: ''
    };
    setPollutionData([...pollutionData, newEntry]);
  };

  const removePollutionData = (id: string) => {
    setPollutionData(pollutionData.filter(entry => entry.id !== id));
  };

  const updatePollutionData = (id: string, field: keyof PollutionData, value: any) => {
    setPollutionData(pollutionData.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  // Invasive species data management functions for question 6d
  const addInvasiveSpeciesData = () => {
    const newEntry: InvasiveSpeciesData = {
      id: generateUniqueId(),
      siteReference: '',
      description: ''
    };
    setInvasiveSpeciesData([...invasiveSpeciesData, newEntry]);
  };

  const removeInvasiveSpeciesData = (id: string) => {
    setInvasiveSpeciesData(invasiveSpeciesData.filter(entry => entry.id !== id));
  };

  const updateInvasiveSpeciesData = (id: string, field: keyof InvasiveSpeciesData, value: any) => {
    setInvasiveSpeciesData(invasiveSpeciesData.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  // Supply chain breakdown management functions for question 6e
  const addSupplyChainBreakdown = () => {
    const newEntry: SupplyChainBreakdown = {
      id: generateUniqueId(),
      productReference: '',
      primaryDataAvailable: '',
      estimationMethods: [],
      estimationMethodsOther: '',
      volume: '',
      volumeUnit: '',
      spendAmount: '',
      spendCurrency: 'USD',
      environmentalInputsOutputs: [],
      environmentalInputsOutputsOther: '',
      deforestationFreePercentage: '',
      assessmentMethods: [],
      assessmentMethodsOther: '',
      assessmentDescription: '',
      cutoffDate: '',
      additionalComments: ''
    };
    setSupplyChainBreakdown([...supplyChainBreakdown, newEntry]);
  };

  const removeSupplyChainBreakdown = (id: string) => {
    setSupplyChainBreakdown(supplyChainBreakdown.filter(entry => entry.id !== id));
  };

  const updateSupplyChainBreakdown = (id: string, field: keyof SupplyChainBreakdown, value: any) => {
    setSupplyChainBreakdown(supplyChainBreakdown.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  const handleSupplyChainCheckboxChange = (id: string, field: 'estimationMethods' | 'environmentalInputsOutputs' | 'assessmentMethods', option: string, checked: boolean) => {
    setSupplyChainBreakdown(supplyChainBreakdown.map(entry => {
      if (entry.id === id) {
        const currentArray = entry[field];
        if (checked) {
          return { ...entry, [field]: [...currentArray, option] };
        } else {
          return { ...entry, [field]: currentArray.filter(item => item !== option) };
        }
      }
      return entry;
    }));
  };

  // Contextual information management functions for question 6f
  const addContextualInformation = () => {
    const newEntry: ContextualInformation = {
      id: generateUniqueId(),
      standardsApplied: [],
      standardsAppliedOther: '',
      methodologiesUsed: [],
      methodologiesUsedOther: '',
      methodologiesDescription: '',
      assumptionsMade: '',
      dataSources: [],
      dataQualityLimitations: [],
      dataQualityLimitationsOther: '',
      dataQualityDescription: '',
      stakeholderEngagement: [],
      stakeholderEngagementOther: '',
      stakeholderEngagementDescription: '',
      revisionHistory: [],
      additionalComments: ''
    };
    setContextualInformation([...contextualInformation, newEntry]);
  };

  const removeContextualInformation = (id: string) => {
    setContextualInformation(contextualInformation.filter(entry => entry.id !== id));
  };

  const updateContextualInformation = (id: string, field: keyof ContextualInformation, value: any) => {
    setContextualInformation(contextualInformation.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  const handleContextualCheckboxChange = (id: string, field: 'standardsApplied' | 'methodologiesUsed' | 'dataQualityLimitations' | 'stakeholderEngagement', option: string, checked: boolean) => {
    setContextualInformation(contextualInformation.map(entry => {
      if (entry.id === id) {
        const currentArray = entry[field];
        if (checked) {
          return { ...entry, [field]: [...currentArray, option] };
        } else {
          return { ...entry, [field]: currentArray.filter(item => item !== option) };
        }
      }
      return entry;
    }));
  };

  // Data source management functions for question 6f
  const addDataSource = (contextualId: string) => {
    const newDataSource: DataSource = {
      id: generateUniqueId(),
      sourceName: '',
      sourceType: '',
      date: '',
      documentation: null,
      link: ''
    };
    setContextualInformation(contextualInformation.map(entry => {
      if (entry.id === contextualId) {
        return { ...entry, dataSources: [...entry.dataSources, newDataSource] };
      }
      return entry;
    }));
  };

  const removeDataSource = (contextualId: string, dataSourceId: string) => {
    setContextualInformation(contextualInformation.map(entry => {
      if (entry.id === contextualId) {
        return { ...entry, dataSources: entry.dataSources.filter(ds => ds.id !== dataSourceId) };
      }
      return entry;
    }));
  };

  const updateDataSource = (contextualId: string, dataSourceId: string, field: keyof DataSource, value: any) => {
    setContextualInformation(contextualInformation.map(entry => {
      if (entry.id === contextualId) {
        return {
          ...entry,
          dataSources: entry.dataSources.map(ds =>
            ds.id === dataSourceId ? { ...ds, [field]: value } : ds
          )
        };
      }
      return entry;
    }));
  };

  // Revision history management functions for question 6f
  const addRevisionHistory = (contextualId: string) => {
    const newRevision: RevisionHistory = {
      id: generateUniqueId(),
      date: new Date().toISOString().split('T')[0], // Today's date
      description: '',
      author: ''
    };
    setContextualInformation(contextualInformation.map(entry => {
      if (entry.id === contextualId) {
        return { ...entry, revisionHistory: [...entry.revisionHistory, newRevision] };
      }
      return entry;
    }));
  };

  const removeRevisionHistory = (contextualId: string, revisionId: string) => {
    setContextualInformation(contextualInformation.map(entry => {
      if (entry.id === contextualId) {
        return { ...entry, revisionHistory: entry.revisionHistory.filter(rh => rh.id !== revisionId) };
      }
      return entry;
    }));
  };

  const updateRevisionHistory = (contextualId: string, revisionId: string, field: keyof RevisionHistory, value: any) => {
    setContextualInformation(contextualInformation.map(entry => {
      if (entry.id === contextualId) {
        return {
          ...entry,
          revisionHistory: entry.revisionHistory.map(rh =>
            rh.id === revisionId ? { ...rh, [field]: value } : rh
          )
        };
      }
      return entry;
    }));
  };

  // Affected ecosystems management functions for question 7a
  const addAffectedEcosystem = () => {
    const newEntry: AffectedEcosystem = {
      id: generateUniqueId(),
      siteReference: '',
      ecosystemTypeBaseYear: '',
      ecosystemSizeBaseYear: '',
      ecosystemConditionBaseYear: '',
      ecosystemConditionCurrentPeriod: ''
    };
    setAffectedEcosystems([...affectedEcosystems, newEntry]);
  };

  const removeAffectedEcosystem = (id: string) => {
    setAffectedEcosystems(affectedEcosystems.filter(entry => entry.id !== id));
  };

  const updateAffectedEcosystem = (id: string, field: keyof AffectedEcosystem, value: any) => {
    setAffectedEcosystems(affectedEcosystems.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  // Biodiversity data context management functions for question 7b
  const addBiodiversityDataContext = () => {
    const newEntry: BiodiversityDataContext = {
      id: generateUniqueId(),
      applicableStandards: [],
      applicableStandardsOther: '',
      dataCollectionMethodologies: [],
      dataCollectionMethodologiesOther: '',
      dataCollectionDescription: '',
      keyAssumptions: '',
      biodiversityDataSources: [],
      dataQualityLimitations: [],
      dataQualityLimitationsOther: '',
      dataQualityDescription: '',
      stakeholderEngagement: [],
      stakeholderEngagementOther: '',
      stakeholderEngagementDescription: '',
      changesAndUpdates: [],
      additionalContext: ''
    };
    setBiodiversityDataContext([...biodiversityDataContext, newEntry]);
  };

  const removeBiodiversityDataContext = (id: string) => {
    setBiodiversityDataContext(biodiversityDataContext.filter(entry => entry.id !== id));
  };

  const updateBiodiversityDataContext = (id: string, field: keyof BiodiversityDataContext, value: any) => {
    setBiodiversityDataContext(biodiversityDataContext.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  const handleBiodiversityDataCheckboxChange = (id: string, field: 'applicableStandards' | 'dataCollectionMethodologies' | 'dataQualityLimitations' | 'stakeholderEngagement', option: string, checked: boolean) => {
    setBiodiversityDataContext(biodiversityDataContext.map(entry => {
      if (entry.id === id) {
        const currentArray = entry[field];
        if (checked) {
          return { ...entry, [field]: [...currentArray, option] };
        } else {
          return { ...entry, [field]: currentArray.filter(item => item !== option) };
        }
      }
      return entry;
    }));
  };

  // Biodiversity data source management functions for question 7b
  const addBiodiversityDataSource = (contextId: string) => {
    const newDataSource: DataSource = {
      id: generateUniqueId(),
      sourceName: '',
      sourceType: '',
      date: '',
      documentation: null,
      link: ''
    };
    setBiodiversityDataContext(biodiversityDataContext.map(entry => {
      if (entry.id === contextId) {
        return { ...entry, biodiversityDataSources: [...entry.biodiversityDataSources, newDataSource] };
      }
      return entry;
    }));
  };

  const removeBiodiversityDataSource = (contextId: string, dataSourceId: string) => {
    setBiodiversityDataContext(biodiversityDataContext.map(entry => {
      if (entry.id === contextId) {
        return { ...entry, biodiversityDataSources: entry.biodiversityDataSources.filter(ds => ds.id !== dataSourceId) };
      }
      return entry;
    }));
  };

  const updateBiodiversityDataSource = (contextId: string, dataSourceId: string, field: keyof DataSource, value: any) => {
    setBiodiversityDataContext(biodiversityDataContext.map(entry => {
      if (entry.id === contextId) {
        return {
          ...entry,
          biodiversityDataSources: entry.biodiversityDataSources.map(ds =>
            ds.id === dataSourceId ? { ...ds, [field]: value } : ds
          )
        };
      }
      return entry;
    }));
  };

  // Changes and updates management functions for question 7b
  const addChangesAndUpdates = (contextId: string) => {
    const newUpdate: RevisionHistory = {
      id: generateUniqueId(),
      date: new Date().toISOString().split('T')[0], // Today's date
      description: '',
      author: ''
    };
    setBiodiversityDataContext(biodiversityDataContext.map(entry => {
      if (entry.id === contextId) {
        return { ...entry, changesAndUpdates: [...entry.changesAndUpdates, newUpdate] };
      }
      return entry;
    }));
  };

  const removeChangesAndUpdates = (contextId: string, updateId: string) => {
    setBiodiversityDataContext(biodiversityDataContext.map(entry => {
      if (entry.id === contextId) {
        return { ...entry, changesAndUpdates: entry.changesAndUpdates.filter(cu => cu.id !== updateId) };
      }
      return entry;
    }));
  };

  const updateChangesAndUpdates = (contextId: string, updateId: string, field: keyof RevisionHistory, value: any) => {
    setBiodiversityDataContext(biodiversityDataContext.map(entry => {
      if (entry.id === contextId) {
        return {
          ...entry,
          changesAndUpdates: entry.changesAndUpdates.map(cu =>
            cu.id === updateId ? { ...cu, [field]: value } : cu
          )
        };
      }
      return entry;
    }));
  };

  // Ecosystem services and beneficiaries management functions for question 8a
  const addEcosystemServicesBeneficiaries = () => {
    const newEntry: EcosystemServicesBeneficiaries = {
      id: generateUniqueId(),
      siteReference: '',
      ecosystemServices: '',
      beneficiaries: '',
      numberOfBeneficiaries: '',
      approachUsed: [],
      approachUsedOther: '',
      approachDescription: ''
    };
    setEcosystemServicesBeneficiaries([...ecosystemServicesBeneficiaries, newEntry]);
  };

  const removeEcosystemServicesBeneficiaries = (id: string) => {
    setEcosystemServicesBeneficiaries(ecosystemServicesBeneficiaries.filter(entry => entry.id !== id));
  };

  const updateEcosystemServicesBeneficiaries = (id: string, field: keyof EcosystemServicesBeneficiaries, value: any) => {
    setEcosystemServicesBeneficiaries(ecosystemServicesBeneficiaries.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  const handleEcosystemServicesCheckboxChange = (id: string, option: string, checked: boolean) => {
    setEcosystemServicesBeneficiaries(ecosystemServicesBeneficiaries.map(entry => {
      if (entry.id === id) {
        const currentArray = entry.approachUsed;
        if (checked) {
          return { ...entry, approachUsed: [...currentArray, option] };
        } else {
          return { ...entry, approachUsed: currentArray.filter(item => item !== option) };
        }
      }
      return entry;
    }));
  };

  // Ecosystem services impact assessment management functions for question 8b
  const addEcosystemServicesImpact = () => {
    const newEntry: EcosystemServicesImpact = {
      id: generateUniqueId(),
      ecosystemServices: [],
      ecosystemServicesOther: '',
      impactDescriptions: {},
      beneficiaryGroups: [],
      beneficiaryGroupsOther: '',
      impactTypes: {},
      geographicScope: '',
      evidenceSources: '',
      evidenceDocuments: null,
      mitigationActions: '',
      stakeholderEngagementMethods: [],
      stakeholderEngagementMethodsOther: '',
      stakeholderEngagementDescription: '',
      additionalComments: ''
    };
    setEcosystemServicesImpact([...ecosystemServicesImpact, newEntry]);
  };

  const removeEcosystemServicesImpact = (id: string) => {
    setEcosystemServicesImpact(ecosystemServicesImpact.filter(entry => entry.id !== id));
  };

  const updateEcosystemServicesImpact = (id: string, field: keyof EcosystemServicesImpact, value: any) => {
    setEcosystemServicesImpact(ecosystemServicesImpact.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  const handleEcosystemServicesImpactCheckboxChange = (id: string, field: 'ecosystemServices' | 'beneficiaryGroups' | 'stakeholderEngagementMethods', option: string, checked: boolean) => {
    setEcosystemServicesImpact(ecosystemServicesImpact.map(entry => {
      if (entry.id === id) {
        const currentArray = entry[field] as string[];
        if (checked) {
          return { ...entry, [field]: [...currentArray, option] };
        } else {
          return { ...entry, [field]: currentArray.filter(item => item !== option) };
        }
      }
      return entry;
    }));
  };

  const updateImpactDescription = (id: string, service: string, description: string) => {
    setEcosystemServicesImpact(ecosystemServicesImpact.map(entry => {
      if (entry.id === id) {
        return {
          ...entry,
          impactDescriptions: {
            ...entry.impactDescriptions,
            [service]: description
          }
        };
      }
      return entry;
    }));
  };

  const updateImpactType = (id: string, serviceAndBeneficiary: string, impactType: 'positive' | 'neutral' | 'negative' | '') => {
    setEcosystemServicesImpact(ecosystemServicesImpact.map(entry => {
      if (entry.id === id) {
        return {
          ...entry,
          impactTypes: {
            ...entry.impactTypes,
            [serviceAndBeneficiary]: impactType
          }
        };
      }
      return entry;
    }));
  };

  const handleBackClick = () => {
    if (reportId) {
      navigate(`/gri/${reportId}/topic-standards-2025/environmental`);
    }
  };

  return (
    <>
      <div className="page-container">
        <div className="page-header">
          <button className="back-btn" onClick={handleBackClick}>← Back</button>
          <div className="page-title">GRI 101: Biodiversity 2024</div>
          <button className="download-gri-btn" onClick={() => console.log('Download GRI Standard - Placeholder')}>
            Download the GRI Standard
          </button>
        </div>
        <div className="materials-page">
          <div className="page-top-info">
            <div className="info-item">
              <span>👤</span>
              <span>Assignee:</span>
            </div>
            <div className="info-item">
              <span>👥</span>
              <span>Contributor:</span>
            </div>
            <div className="info-item">
              <span>📎</span>
              <span>Attachments</span>
            </div>
          </div>
          
          <div className="section-header">
            <div className="section-title">Biodiversity</div>
            <div className="gri-reference">GRI 101: Biodiversity</div>
            <div className="main-heading">
              1. Biodiversity impacts and dependencies
              <InfoIcon 
                title="Biodiversity impacts and dependencies refer to the effects of organizational activities on biological diversity and the organization's reliance on ecosystem services."
                onClick={() => openGuidance("Biodiversity impacts and dependencies refer to the effects of organizational activities on biological diversity and the organization's reliance on ecosystem services.")}
              />
            </div>
          </div>
          
          {/* Question 1a */}
          <div className="question-section">
            <div className="question-header">
              <div className="question-number">1a</div>
              <div className="question-title">Policies to halt and reverse biodiversity loss</div>
              <InfoIcon 
                title="The organization can provide a high-level description of its policies or commitments to halt and reverse biodiversity loss."
                onClick={() => openGuidance("The organization can provide a high-level description of its policies or commitments to halt and reverse biodiversity loss.")}
              />
              <div className="collaboration-icon">👥</div>
            </div>
            <div className="question-description">
              The organization shall describe its policies or commitments to halt and reverse biodiversity loss, and how these are informed by the 2050 Goals and 2030 Targets in the Kunming-Montreal Global Biodiversity Framework
            </div>
            
            {/* Conditional sub-question for prior disclosures */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-title">Prior Disclosure Reference</div>
              </div>
              <div className="question-description">
                Have you described your policies or commitments to halt and reverse biodiversity loss under Disclosure 2-23 in GRI 2: General Disclosures 2021 or under 3-3-c in GRI 3: Material Topics 2021?
              </div>
              <div className="form-group">
                <label className="form-label">Prior Disclosure</label>
                <select 
                  className="form-select" 
                  value={priorDisclosure}
                  onChange={(e) => setPriorDisclosure(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="yes">Yes - I can provide a reference</option>
                  <option value="no">No - I need to provide the information here</option>
                </select>
              </div>
              
              {/* Reference field for "Yes" answer */}
              {priorDisclosure === 'yes' && (
                <div className="form-group">
                  <label className="form-label">Reference to Prior Disclosure</label>
                  <textarea className="form-textarea" placeholder="Provide reference to where this information was previously disclosed..."></textarea>
                </div>
              )}
            </div>
            
            {/* Main response section - shown only if "No" is selected */}
            {priorDisclosure === 'no' && (
            <div>
              <div className="form-group">
                <label className="form-label">Response</label>
                <textarea className="form-textarea" placeholder="Describe your policies or commitments to halt and reverse biodiversity loss..."></textarea>
              </div>
              
              {/* Additional table for biodiversity goals and targets */}
              <div className="sub-question">
                <div className="sub-question-header">
                  <div className="sub-question-title">Biodiversity Goals and Targets Policy Assessment <span className="optional-tag">(Optional)</span></div>
                </div>
              <div className="table-container">
                <table className="form-table">
                  <thead>
                    <tr>
                      <th>Theme</th>
                      <th>Goal/Target Number</th>
                      <th>Description</th>
                      <th>Have you set policies for the same (Y/N)</th>
                      <th>Details of Policies on the same</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td rowSpan={4}>Goals for 2030</td>
                      <td>GOAL A</td>
                      <td>The integrity, connectivity and resilience of all ecosystems are maintained, enhanced, or restored, substantially increasing the area of natural ecosystems by 2050; Human-induced extinction of known threatened species is halted, extinction rate and risk reduced tenfold, and abundance of native wild species increased to healthy levels; Genetic diversity within populations of wild and domesticated species is maintained.</td>
                      <td>
                        <select className="form-select">
                          <option value="">Select</option>
                          <option value="Y">Yes</option>
                          <option value="N">No</option>
                        </select>
                      </td>
                      <td><textarea className="form-textarea" rows={2}></textarea></td>
                    </tr>
                    <tr>
                      <td>GOAL B</td>
                      <td>Biodiversity is sustainably used and managed and nature's contributions to people, including ecosystem functions and services, are valued, maintained and enhanced, with those currently in decline being restored, supporting sustainable development for present and future generations by 2050.</td>
                      <td>
                        <select className="form-select">
                          <option value="">Select</option>
                          <option value="Y">Yes</option>
                          <option value="N">No</option>
                        </select>
                      </td>
                      <td><textarea className="form-textarea" rows={2}></textarea></td>
                    </tr>
                    <tr>
                      <td>GOAL C</td>
                      <td>Monetary and non-monetary benefits from the utilization of genetic resources, digital sequence information and traditional knowledge are shared fairly and equitably, including with indigenous peoples and local communities, substantially increased by 2050 while protecting traditional knowledge, contributing to conservation and sustainable use, in accordance with international access and benefit-sharing instruments.</td>
                      <td>
                        <select className="form-select">
                          <option value="">Select</option>
                          <option value="Y">Yes</option>
                          <option value="N">No</option>
                        </select>
                      </td>
                      <td><textarea className="form-textarea" rows={2}></textarea></td>
                    </tr>
                    <tr>
                      <td>GOAL D</td>
                      <td>Adequate means of implementation (financial resources, capacity-building, cooperation, technology access and transfer) are secured and equitably accessible to all Parties, progressively closing the biodiversity finance gap of $700 billion per year by 2050, aligning financial flows with this Framework and the 2050 Vision for biodiversity.</td>
                      <td>
                        <select className="form-select">
                          <option value="">Select</option>
                          <option value="Y">Yes</option>
                          <option value="N">No</option>
                        </select>
                      </td>
                      <td><textarea className="form-textarea" rows={2}></textarea></td>
                    </tr>
                    <tr>
                      <td rowSpan={23}>Targets for 2050</td>
                      <td>TARGET 1</td>
                      <td>Ensure all areas are under participatory, integrated and biodiversity inclusive spatial planning and/or effective management addressing land- and sea-use change, to bring the loss of high biodiversity areas close to zero by 2030, respecting indigenous peoples' and local communities' rights.</td>
                      <td>
                        <select className="form-select">
                          <option value="">Select</option>
                          <option value="Y">Yes</option>
                          <option value="N">No</option>
                        </select>
                      </td>
                      <td><textarea className="form-textarea" rows={2}></textarea></td>
                    </tr>
                    <tr>
                      <td>TARGET 2</td>
                      <td>By 2030, at least 30% of degraded terrestrial, inland water, and marine and coastal ecosystems are under effective restoration, enhancing biodiversity, ecosystem functions, services, integrity and connectivity.</td>
                      <td>
                        <select className="form-select">
                          <option value="">Select</option>
                          <option value="Y">Yes</option>
                          <option value="N">No</option>
                        </select>
                      </td>
                      <td><textarea className="form-textarea" rows={2}></textarea></td>
                    </tr>
                    <tr>
                      <td>TARGET 3</td>
                      <td>By 2030, at least 30% of terrestrial, inland water, marine and coastal areas of high biodiversity and ecosystem importance are effectively conserved and managed through well-connected, equitably governed systems of protected areas and other measures, recognizing indigenous and traditional territories, integrated in wider landscapes and seascapes, ensuring sustainable use consistent with conservation outcomes.</td>
                      <td>
                        <select className="form-select">
                          <option value="">Select</option>
                          <option value="Y">Yes</option>
                          <option value="N">No</option>
                        </select>
                      </td>
                      <td><textarea className="form-textarea" rows={2}></textarea></td>
                    </tr>
                    <tr>
                      <td>TARGET 4</td>
                      <td>Ensure urgent management to halt human induced extinction of known threatened species, recover and conserve species, reduce extinction risk, maintain and restore genetic diversity, including effective management of human-wildlife interactions to minimize conflict.</td>
                      <td>
                        <select className="form-select">
                          <option value="">Select</option>
                          <option value="Y">Yes</option>
                          <option value="N">No</option>
                        </select>
                      </td>
                      <td><textarea className="form-textarea" rows={2}></textarea></td>
                    </tr>
                    <tr>
                      <td>TARGET 5</td>
                      <td>Ensure sustainable, safe and legal use, harvesting and trade of wild species, preventing overexploitation, minimizing impacts on non-target species and ecosystems, reducing pathogen spillover risk, applying ecosystem approach, respecting customary sustainable use by indigenous peoples and local communities.</td>
                      <td>
                        <select className="form-select">
                          <option value="">Select</option>
                          <option value="Y">Yes</option>
                          <option value="N">No</option>
                        </select>
                      </td>
                      <td><textarea className="form-textarea" rows={2}></textarea></td>
                    </tr>
                    <tr>
                      <td>TARGET 6</td>
                      <td>Eliminate, minimize, reduce or mitigate impacts of invasive alien species by identifying and managing introduction pathways, preventing priority invasive species establishment, reducing other invasive introductions by at least 50% by 2030, eradicating or controlling invasive species especially in priority sites.</td>
                      <td>
                        <select className="form-select">
                          <option value="">Select</option>
                          <option value="Y">Yes</option>
                          <option value="N">No</option>
                        </select>
                      </td>
                      <td><textarea className="form-textarea" rows={2}></textarea></td>
                    </tr>
                    <tr>
                      <td>TARGET 7</td>
                      <td>Reduce pollution risks and negative impacts from all sources to levels not harmful to biodiversity and ecosystem functions by 2030, including cutting excess nutrients lost by half, reducing risks from pesticides and highly hazardous chemicals by half, and preventing, reducing and working toward eliminating plastic pollution.</td>
                      <td>
                        <select className="form-select">
                          <option value="">Select</option>
                          <option value="Y">Yes</option>
                          <option value="N">No</option>
                        </select>
                      </td>
                      <td><textarea className="form-textarea" rows={2}></textarea></td>
                    </tr>
                    <tr>
                      <td>TARGET 8</td>
                      <td>Minimize impact of climate change and ocean acidification on biodiversity and increase resilience through mitigation, adaptation, disaster risk reduction, nature-based and ecosystem-based approaches, while minimizing negative and fostering positive climate action impacts on biodiversity.</td>
                      <td>
                        <select className="form-select">
                          <option value="">Select</option>
                          <option value="Y">Yes</option>
                          <option value="N">No</option>
                        </select>
                      </td>
                      <td><textarea className="form-textarea" rows={2}></textarea></td>
                    </tr>
                    <tr>
                      <td>TARGET 9</td>
                      <td>Ensure sustainable management and use of wild species providing social, economic and environmental benefits, especially for vulnerable and dependent people, including through sustainable biodiversity-based activities and protecting customary sustainable use.</td>
                      <td>
                        <select className="form-select">
                          <option value="">Select</option>
                          <option value="Y">Yes</option>
                          <option value="N">No</option>
                        </select>
                      </td>
                      <td><textarea className="form-textarea" rows={2}></textarea></td>
                    </tr>
                    <tr>
                      <td>TARGET 10</td>
                      <td>Ensure sustainable management of agriculture, aquaculture, fisheries and forestry through biodiversity-friendly practices including sustainable intensification and agroecological approaches, contributing to resilience, long-term productivity, food security, biodiversity conservation and ecosystem service maintenance.</td>
                      <td>
                        <select className="form-select">
                          <option value="">Select</option>
                          <option value="Y">Yes</option>
                          <option value="N">No</option>
                        </select>
                      </td>
                      <td><textarea className="form-textarea" rows={2}></textarea></td>
                    </tr>
                    <tr>
                      <td>TARGET 11</td>
                      <td>Restore, maintain and enhance nature's contributions including regulation of air, water, climate, soil health, pollination, disease risk reduction, protection from natural hazards, through nature-based or ecosystem-based approaches for people and nature's benefit.</td>
                      <td>
                        <select className="form-select">
                          <option value="">Select</option>
                          <option value="Y">Yes</option>
                          <option value="N">No</option>
                        </select>
                      </td>
                      <td><textarea className="form-textarea" rows={2}></textarea></td>
                    </tr>
                    <tr>
                      <td>TARGET 12</td>
                      <td>Significantly increase area, quality, connectivity, access to and benefits from green and blue spaces in urban and densely populated areas by mainstreaming biodiversity conservation and sustainable use, ensuring biodiversity-inclusive urban planning, enhancing native biodiversity, ecological connectivity, human health and well-being, contributing to sustainable urbanization.</td>
                      <td>
                        <select className="form-select">
                          <option value="">Select</option>
                          <option value="Y">Yes</option>
                          <option value="N">No</option>
                        </select>
                      </td>
                      <td><textarea className="form-textarea" rows={2}></textarea></td>
                    </tr>
                    <tr>
                      <td>TARGET 13</td>
                      <td>Take legal, policy, administrative and capacity-building measures to ensure fair and equitable sharing of benefits from genetic resources, digital sequence information and traditional knowledge, facilitating access and significantly increasing benefits shared by 2030.</td>
                      <td>
                        <select className="form-select">
                          <option value="">Select</option>
                          <option value="Y">Yes</option>
                          <option value="N">No</option>
                        </select>
                      </td>
                      <td><textarea className="form-textarea" rows={2}></textarea></td>
                    </tr>
                    <tr>
                      <td>TARGET 14</td>
                      <td>Integrate biodiversity and its values into policies, regulations, planning, development, poverty eradication, strategic environmental assessments and national accounting, progressively aligning public and private activities, fiscal and financial flows with the Framework's goals.</td>
                      <td>
                        <select className="form-select">
                          <option value="">Select</option>
                          <option value="Y">Yes</option>
                          <option value="N">No</option>
                        </select>
                      </td>
                      <td><textarea className="form-textarea" rows={2}></textarea></td>
                    </tr>
                    <tr>
                      <td>TARGET 15</td>
                      <td>Encourage and enable business, especially large and transnational companies and financial institutions, to monitor, assess, disclose risks, dependencies and impacts on biodiversity, provide consumer information for sustainable consumption, comply with access and benefit-sharing regulations, thereby reducing negative impacts, increasing positive impacts, and promoting sustainable production patterns.</td>
                      <td>
                        <select className="form-select">
                          <option value="">Select</option>
                          <option value="Y">Yes</option>
                          <option value="N">No</option>
                        </select>
                      </td>
                      <td><textarea className="form-textarea" rows={2}></textarea></td>
                    </tr>
                    <tr>
                      <td>TARGET 16</td>
                      <td>Enable people to make sustainable consumption choices by policy, legislative frameworks, education, access to information and alternatives, aiming to reduce global consumption footprint equitably by 2030, including halving food waste and significantly reducing overconsumption and waste generation.</td>
                      <td>
                        <select className="form-select">
                          <option value="">Select</option>
                          <option value="Y">Yes</option>
                          <option value="N">No</option>
                        </select>
                      </td>
                      <td><textarea className="form-textarea" rows={2}></textarea></td>
                    </tr>
                    <tr>
                      <td>TARGET 17</td>
                      <td>Establish, strengthen and implement biosafety measures and biotechnology handling and benefit distribution in all countries per Articles 8(g) and 19 of the Convention.</td>
                      <td>
                        <select className="form-select">
                          <option value="">Select</option>
                          <option value="Y">Yes</option>
                          <option value="N">No</option>
                        </select>
                      </td>
                      <td><textarea className="form-textarea" rows={2}></textarea></td>
                    </tr>
                    <tr>
                      <td>TARGET 18</td>
                      <td>Identify, eliminate, phase out or reform biodiversity-harmful incentives by 2025, reducing them by at least $500 billion per year by 2030, starting with the most harmful, while scaling up positive incentives for conservation and sustainable use.</td>
                      <td>
                        <select className="form-select">
                          <option value="">Select</option>
                          <option value="Y">Yes</option>
                          <option value="N">No</option>
                        </select>
                      </td>
                      <td><textarea className="form-textarea" rows={2}></textarea></td>
                    </tr>
                    <tr>
                      <td>TARGET 19</td>
                      <td>Substantially and progressively increase financial resources for biodiversity implementation to at least $200 billion per year by 2030 including increasing international aid to developing countries, domestic resource mobilization, leveraging private finance, innovative schemes, optimizing co-benefits of finance for biodiversity and climate crises, and enhancing collective actions and transparency.</td>
                      <td>
                        <select className="form-select">
                          <option value="">Select</option>
                          <option value="Y">Yes</option>
                          <option value="N">No</option>
                        </select>
                      </td>
                      <td><textarea className="form-textarea" rows={2}></textarea></td>
                    </tr>
                    <tr>
                      <td>TARGET 20</td>
                      <td>Strengthen capacity-building, technology transfer and scientific cooperation including joint research and monitoring, especially in developing countries, fostering innovation needed for effective biodiversity conservation and sustainable use.</td>
                      <td>
                        <select className="form-select">
                          <option value="">Select</option>
                          <option value="Y">Yes</option>
                          <option value="N">No</option>
                        </select>
                      </td>
                      <td><textarea className="form-textarea" rows={2}></textarea></td>
                    </tr>
                    <tr>
                      <td>TARGET 21</td>
                      <td>Ensure best available data, information and knowledge are accessible to decision makers, practitioners and public for effective biodiversity governance, participatory management, communication, education, monitoring and research, with traditional knowledge accessed only with free, prior and informed consent.</td>
                      <td>
                        <select className="form-select">
                          <option value="">Select</option>
                          <option value="Y">Yes</option>
                          <option value="N">No</option>
                        </select>
                      </td>
                      <td><textarea className="form-textarea" rows={2}></textarea></td>
                    </tr>
                    <tr>
                      <td>TARGET 22</td>
                      <td>Ensure full, equitable, inclusive, gender-responsive representation and participation in biodiversity decision-making and access to justice and information for indigenous peoples, local communities, women, girls, children, youth, persons with disabilities, and protect environmental human rights defenders.</td>
                      <td>
                        <select className="form-select">
                          <option value="">Select</option>
                          <option value="Y">Yes</option>
                          <option value="N">No</option>
                        </select>
                      </td>
                      <td><textarea className="form-textarea" rows={2}></textarea></td>
                    </tr>
                    <tr>
                      <td>TARGET 23</td>
                      <td>Ensure gender equality in Framework implementation through gender-responsive approaches enabling equal opportunity, capacity, rights, participation and leadership for all women and girls in biodiversity-related actions and decision-making.</td>
                      <td>
                        <select className="form-select">
                          <option value="">Select</option>
                          <option value="Y">Yes</option>
                          <option value="N">No</option>
                        </select>
                      </td>
                      <td><textarea className="form-textarea" rows={2}></textarea></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              </div>
            </div>
            )}
            
            <div className="save-section">
              <button className="attachments-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <span>📎</span>
                <span>Attachments</span>
              </button>
              <button className="save-btn">SAVE</button>
            </div>
          </div>

          {/* Question 1b */}
          <div className="question-section">
            <div className="question-header">
              <div className="question-number">1b</div>
              <div className="question-title">Extent of policy application</div>
              <InfoIcon 
                title="If the policies or commitments apply to all of the organization's activities and business relationships equally, a brief statement of this fact is sufficient to comply with the requirement. If the policies or commitments apply to only some of the organization's activities (e.g., they apply only to entities located in certain countries or to certain subsidiaries) or to some of its business relationships (e.g., they apply only to suppliers), then the organization should report to which activities and business relationships the policies or commitments apply. It can also explain why the policies or commitments are limited to these activities and business relationships"
                onClick={() => openGuidance("If the policies or commitments apply to all of the organization's activities and business relationships equally, a brief statement of this fact is sufficient to comply with the requirement. If the policies or commitments apply to only some of the organization's activities (e.g., they apply only to entities located in certain countries or to certain subsidiaries) or to some of its business relationships (e.g., they apply only to suppliers), then the organization should report to which activities and business relationships the policies or commitments apply. It can also explain why the policies or commitments are limited to these activities and business relationships")}
              />
              <div className="collaboration-icon">👥</div>
            </div>
            <div className="question-description">
              Report the extent to which these policies or commitments apply to the organization's activities and to its business relationships
            </div>
            <div className="form-group">
              <label className="form-label">Response</label>
              <textarea className="form-textarea" placeholder="Describe the extent to which your policies apply to activities and business relationships..."></textarea>
            </div>
            <div className="save-section">
              <button className="attachments-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <span>📎</span>
                <span>Attachments</span>
              </button>
              <button className="save-btn">SAVE</button>
            </div>
          </div>

          {/* Question 1c - Enhanced Multiple Goals/Targets */}
          <div className="question-section">
            <div className="question-header">
              <div className="question-number">1c</div>
              <div className="question-title">Goals and targets for biodiversity</div>
              <InfoIcon 
                title="To halt and reverse biodiversity loss, the organization may have goals and targets to achieve net positive impact, no net loss and net gain of biodiversity, or to contribute to nature positive goals. Maximum 15 goals/targets allowed. Each goal/target should align with Science-Based Targets for Nature (SBTN) framework."
                onClick={() => openGuidance("To halt and reverse biodiversity loss, the organization may have goals and targets to achieve net positive impact, no net loss and net gain of biodiversity, or to contribute to nature positive goals. Maximum 15 goals/targets allowed. Each goal/target should align with Science-Based Targets for Nature (SBTN) framework.")}
              />
              <div className="collaboration-icon">👥</div>
            </div>
            <div className="question-description">
              Report the goals and targets to halt and reverse biodiversity loss, whether they are informed by scientific consensus, the base year, and the indicators used to evaluate progress. Each goal/target must align with SBTN framework principles.
            </div>

            {/* Summary View Toggle */}
            <div style={{ marginBottom: '20px' }}>
              <button 
                type="button"
                className="save-btn"
                onClick={() => setShowSummaryView(!showSummaryView)}
                style={{ marginRight: '10px' }}
              >
                {showSummaryView ? 'Hide Summary' : 'Show Summary'} ({biodiversityGoals.length}/15)
              </button>
              
              <button 
                type="button"
                className="add-btn"
                onClick={addBiodiversityGoal}
                disabled={biodiversityGoals.length >= 15}
                style={{ 
                  opacity: biodiversityGoals.length >= 15 ? 0.5 : 1,
                  cursor: biodiversityGoals.length >= 15 ? 'not-allowed' : 'pointer'
                }}
              >
                + Add Goal/Target ({biodiversityGoals.length}/15)
              </button>
            </div>

            {/* Summary View */}
            {showSummaryView && biodiversityGoals.length > 0 && (
              <div style={{ 
                background: '#f8f9fa', 
                border: '1px solid #dee2e6', 
                borderRadius: '8px', 
                padding: '20px', 
                marginBottom: '20px' 
              }}>
                <h4>Summary of Biodiversity Goals/Targets</h4>
                <div className="table-container">
                  <table className="form-table" style={{ fontSize: '14px' }}>
                    <thead>
                      <tr>
                        <th>Goal/Target Name</th>
                        <th>Category</th>
                        <th>Base Year</th>
                        <th>Target Year</th>
                        <th>SBTN Alignment</th>
                        <th>Scientific Consensus</th>
                      </tr>
                    </thead>
                    <tbody>
                      {biodiversityGoals.map((goal, index) => (
                        <tr key={goal.id}>
                          <td>{goal.goalName || `Goal ${index + 1}`}</td>
                          <td>{goal.category?.replace('_', ' ') || '-'}</td>
                          <td>{goal.baseYear || '-'}</td>
                          <td>{goal.targetYear || '-'}</td>
                          <td>{goal.sbtnAlignment?.replace('_', ' ') || '-'}</td>
                          <td>{goal.scientificConsensus === 'yes' ? 'Yes' : goal.scientificConsensus === 'partial' ? 'Partial' : goal.scientificConsensus === 'no' ? 'No' : '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Goals/Targets List */}
            {biodiversityGoals.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px', 
                color: '#6c757d',
                border: '2px dashed #dee2e6',
                borderRadius: '8px'
              }}>
                <p>No biodiversity goals/targets added yet.</p>
                <p>Click "Add Goal/Target" to start building your biodiversity strategy.</p>
              </div>
            ) : (
              <div>
                {biodiversityGoals.map((goal, index) => (
                  <div key={goal.id} style={{ 
                    border: '1px solid #dee2e6', 
                    borderRadius: '8px', 
                    padding: '20px', 
                    marginBottom: '20px',
                    background: '#fff'
                  }}>
                    
                    {/* Goal Header with Controls */}
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '15px',
                      paddingBottom: '10px',
                      borderBottom: '1px solid #dee2e6'
                    }}>
                      <h5 style={{ margin: 0 }}>
                        Biodiversity Goal/Target #{index + 1}
                        {goal.goalName && ` - ${goal.goalName}`}
                      </h5>
                      <div style={{ display: 'flex', gap: '5px' }}>
                        <button 
                          type="button"
                          onClick={() => moveGoal(index, 'up')}
                          disabled={index === 0}
                          style={{ 
                            padding: '5px 10px', 
                            border: '1px solid #ccc', 
                            background: 'white',
                            cursor: index === 0 ? 'not-allowed' : 'pointer',
                            opacity: index === 0 ? 0.5 : 1
                          }}
                        >
                          ↑
                        </button>
                        <button 
                          type="button"
                          onClick={() => moveGoal(index, 'down')}
                          disabled={index === biodiversityGoals.length - 1}
                          style={{ 
                            padding: '5px 10px', 
                            border: '1px solid #ccc', 
                            background: 'white',
                            cursor: index === biodiversityGoals.length - 1 ? 'not-allowed' : 'pointer',
                            opacity: index === biodiversityGoals.length - 1 ? 0.5 : 1
                          }}
                        >
                          ↓
                        </button>
                        <button 
                          type="button"
                          onClick={() => removeBiodiversityGoal(goal.id)}
                          style={{ 
                            padding: '5px 10px', 
                            border: '1px solid #dc3545', 
                            background: '#dc3545',
                            color: 'white',
                            cursor: 'pointer'
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>

                    {/* Goal/Target Name and Description */}
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Goal/Target Name *</label>
                        <input 
                          type="text" 
                          className="form-input"
                          value={goal.goalName}
                          onChange={(e) => updateBiodiversityGoal(goal.id, 'goalName', e.target.value)}
                          placeholder="Enter goal/target name..."
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Category *</label>
                        <select 
                          className="form-select"
                          value={goal.category}
                          onChange={(e) => updateBiodiversityGoal(goal.id, 'category', e.target.value)}
                          required
                        >
                          <option value="">Select category</option>
                          <option value="conservation">Conservation</option>
                          <option value="restoration">Restoration</option>
                          <option value="sustainable_use">Sustainable Use</option>
                          <option value="impact_reduction">Impact Reduction</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Description *</label>
                      <textarea 
                        className="form-textarea" 
                        value={goal.description}
                        onChange={(e) => updateBiodiversityGoal(goal.id, 'description', e.target.value)}
                        placeholder="Describe your biodiversity goal/target..."
                        rows={3}
                        required
                      />
                    </div>

                    {/* Years and Validation */}
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Base Year *</label>
                        <input 
                          type="number" 
                          className="form-input"
                          value={goal.baseYear}
                          onChange={(e) => updateBiodiversityGoal(goal.id, 'baseYear', parseInt(e.target.value) || '')}
                          placeholder="e.g., 2020"
                          min="1900"
                          max={new Date().getFullYear()}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Target Year *</label>
                        <input 
                          type="number" 
                          className="form-input"
                          value={goal.targetYear}
                          onChange={(e) => updateBiodiversityGoal(goal.id, 'targetYear', parseInt(e.target.value) || '')}
                          placeholder="e.g., 2030"
                          min={goal.baseYear ? Number(goal.baseYear) + 1 : new Date().getFullYear()}
                          max="2100"
                          required
                        />
                        {validateTargetYear(goal) && (
                          <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
                            {validateTargetYear(goal)}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Scientific Consensus and SBTN Alignment */}
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Scientific Consensus *</label>
                        <select 
                          className="form-select"
                          value={goal.scientificConsensus}
                          onChange={(e) => updateBiodiversityGoal(goal.id, 'scientificConsensus', e.target.value)}
                          required
                        >
                          <option value="">Select option</option>
                          <option value="yes">Yes, informed by scientific consensus</option>
                          <option value="partial">Partially informed by scientific consensus</option>
                          <option value="no">No, not informed by scientific consensus</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">SBTN Alignment * 
                          <InfoIcon 
                            title="Science-Based Targets for Nature (SBTN) alignment ensures your goals follow scientifically-grounded methodologies for nature-positive outcomes."
                            onClick={() => openGuidance("Science-Based Targets for Nature (SBTN) alignment ensures your goals follow scientifically-grounded methodologies for nature-positive outcomes.")}
                          />
                        </label>
                        <select 
                          className="form-select"
                          value={goal.sbtnAlignment}
                          onChange={(e) => updateBiodiversityGoal(goal.id, 'sbtnAlignment', e.target.value)}
                          required
                          style={{ 
                            borderColor: !goal.sbtnAlignment || goal.sbtnAlignment === 'not_aligned' ? '#dc3545' : '#ced4da' 
                          }}
                        >
                          <option value="">Select SBTN alignment</option>
                          <option value="fully_aligned">Fully aligned with SBTN</option>
                          <option value="partially_aligned">Partially aligned with SBTN</option>
                          <option value="not_aligned">Not aligned with SBTN</option>
                        </select>
                        {goal.sbtnAlignment === 'not_aligned' && (
                          <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
                            ⚠️ SBTN alignment is required for robust biodiversity targets
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Indicators */}
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Indicator Type *</label>
                        <select 
                          className="form-select"
                          value={goal.indicatorType}
                          onChange={(e) => updateBiodiversityGoal(goal.id, 'indicatorType', e.target.value)}
                          required
                        >
                          <option value="">Select indicator type</option>
                          <option value="quantitative">Quantitative</option>
                          <option value="qualitative">Qualitative</option>
                          <option value="both">Both (Quantitative & Qualitative)</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Indicators Used to Evaluate Progress *</label>
                      <textarea 
                        className="form-textarea" 
                        value={goal.indicators}
                        onChange={(e) => updateBiodiversityGoal(goal.id, 'indicators', e.target.value)}
                        placeholder={
                          goal.indicatorType === 'quantitative' ? 
                          "e.g., Number of species protected, Hectares restored, % reduction in habitat loss..." :
                          goal.indicatorType === 'qualitative' ?
                          "e.g., Stakeholder engagement quality, Policy implementation status, Partnership effectiveness..." :
                          goal.indicatorType === 'both' ?
                          "Include both quantitative metrics (numbers, percentages) and qualitative assessments..." :
                          "Describe the specific indicators you will use to measure progress..."
                        }
                        rows={3}
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="save-section">
              <button className="attachments-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <span>📎</span>
                <span>Attachments</span>
              </button>
              <button className="save-btn">SAVE</button>
            </div>
          </div>

          {/* Question 2a - Enhanced Management of biodiversity impacts */}
          <div className="question-section">
            <div className="question-header">
              <div className="question-number">2a</div>
              <div className="question-title">Management of biodiversity impacts</div>
              <InfoIcon 
                title="Report how it applies the mitigation hierarchy by describing actions taken to avoid, minimize, restore, rehabilitate, and offset negative impacts on biodiversity"
                onClick={() => openGuidance("Report how it applies the mitigation hierarchy by describing actions taken to avoid, minimize, restore, rehabilitate, and offset negative impacts on biodiversity")}
              />
              <div className="collaboration-icon">👥</div>
            </div>
            <div className="question-description">
              Report how it applies the mitigation hierarchy by describing actions taken to avoid, minimize, restore, rehabilitate, and offset negative impacts on biodiversity
            </div>
            
            {/* 2a i - Avoidance of Negative Impacts */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">2a i</div>
                <div className="sub-question-title">Actions taken to avoid negative impacts</div>
                <InfoIcon 
                  title="Avoidance actions aim to anticipate and prevent negative impacts on biodiversity before actions or decisions leading to such impacts are taken. Organizations are expected to prioritize avoidance as the primary step in the mitigation hierarchy"
                  onClick={() => openGuidance("Avoidance actions aim to anticipate and prevent negative impacts on biodiversity before actions or decisions leading to such impacts are taken. Organizations are expected to prioritize avoidance as the primary step in the mitigation hierarchy")}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Description of Avoidance Actions *</label>
                <textarea 
                  className="form-textarea" 
                  value={mitigationActions.avoidance.description}
                  onChange={(e) => updateMitigationAction('avoidance', 'description', e.target.value)}
                  placeholder="Describe specific actions taken to avoid biodiversity impacts (e.g., alternative site selection, project redesign)..."
                  rows={4}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Avoidance Methods Applied</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginTop: '10px' }}>
                  {avoidanceMethods.map(method => (
                    <label key={method} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="checkbox"
                        checked={mitigationActions.avoidance.methods.includes(method)}
                        onChange={(e) => handleCheckboxChange('avoidance', 'methods', method, e.target.checked)}
                      />
                      <span style={{ fontSize: '14px' }}>{method}</span>
                    </label>
                  ))}
                </div>
                
                {mitigationActions.avoidance.methods.includes('Other') && (
                  <div style={{ marginTop: '10px' }}>
                    <input
                      type="text"
                      className="form-input"
                      value={mitigationActions.avoidance.methodsOther}
                      onChange={(e) => updateMitigationAction('avoidance', 'methodsOther', e.target.value)}
                      placeholder="Specify other avoidance methods..."
                    />
                  </div>
                )}
                
                <div style={{ marginTop: '10px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="checkbox"
                      checked={mitigationActions.avoidance.methods.includes('Other')}
                      onChange={(e) => handleCheckboxChange('avoidance', 'methods', 'Other', e.target.checked)}
                    />
                    <span style={{ fontSize: '14px' }}>Other (please specify)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* 2a ii - Minimization of Negative Impacts */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">2a ii</div>
                <div className="sub-question-title">Actions taken to minimize negative impacts</div>
                <InfoIcon 
                  title="Actions taken to minimize negative impacts on biodiversity aim to reduce the duration, intensity, and extent of impacts that cannot be completely avoided."
                  onClick={() => openGuidance("Actions taken to minimize negative impacts on biodiversity aim to reduce the duration, intensity, and extent of impacts that cannot be completely avoided.")}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Description of Minimization Actions *</label>
                <textarea 
                  className="form-textarea" 
                  value={mitigationActions.minimization.description}
                  onChange={(e) => updateMitigationAction('minimization', 'description', e.target.value)}
                  placeholder="Describe actions taken to minimize negative impacts (e.g., reduced footprint, timing adjustments)..."
                  rows={4}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Supporting Documentation</label>
                <input
                  type="file"
                  className="form-input"
                  onChange={(e) => updateMitigationAction('minimization', 'supportingDocs', e.target.files?.[0] || null)}
                  accept=".pdf,.doc,.docx,.txt"
                />
                <small style={{ color: '#6c757d', fontSize: '12px' }}>
                  Upload evidence reports or documentation (PDF, DOC, DOCX, TXT)
                </small>
              </div>
            </div>

            {/* 2a iii - Restoration and Rehabilitation */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">2a iii</div>
                <div className="sub-question-title">Actions taken to restore and rehabilitate affected ecosystems</div>
                <InfoIcon 
                  title="This covers actions taken to restore or rehabilitate ecosystems affected by the organization's activities."
                  onClick={() => openGuidance("This covers actions taken to restore or rehabilitate ecosystems affected by the organization's activities.")}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Description of Restoration Actions *</label>
                <textarea 
                  className="form-textarea" 
                  value={mitigationActions.restoration.description}
                  onChange={(e) => updateMitigationAction('restoration', 'description', e.target.value)}
                  placeholder="Describe restoration and rehabilitation actions taken..."
                  rows={3}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Restoration Goals *</label>
                <textarea 
                  className="form-textarea" 
                  value={mitigationActions.restoration.goals}
                  onChange={(e) => updateMitigationAction('restoration', 'goals', e.target.value)}
                  placeholder="Describe restoration goals and methods..."
                  rows={3}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Stakeholder Engagement Types</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginTop: '10px' }}>
                  {stakeholderEngagementTypes.map(type => (
                    <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="checkbox"
                        checked={mitigationActions.restoration.stakeholderEngagement.includes(type)}
                        onChange={(e) => handleCheckboxChange('restoration', 'stakeholderEngagement', type, e.target.checked)}
                      />
                      <span style={{ fontSize: '14px' }}>{type}</span>
                    </label>
                  ))}
                </div>
                
                {mitigationActions.restoration.stakeholderEngagement.includes('Other') && (
                  <div style={{ marginTop: '10px' }}>
                    <input
                      type="text"
                      className="form-input"
                      value={mitigationActions.restoration.stakeholderOther}
                      onChange={(e) => updateMitigationAction('restoration', 'stakeholderOther', e.target.value)}
                      placeholder="Specify other stakeholder engagement types..."
                    />
                  </div>
                )}
                
                <div style={{ marginTop: '10px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="checkbox"
                      checked={mitigationActions.restoration.stakeholderEngagement.includes('Other')}
                      onChange={(e) => handleCheckboxChange('restoration', 'stakeholderEngagement', 'Other', e.target.checked)}
                    />
                    <span style={{ fontSize: '14px' }}>Other (please specify)</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Restoration Plans</label>
                <input
                  type="file"
                  className="form-input"
                  onChange={(e) => updateMitigationAction('restoration', 'restorationPlans', e.target.files?.[0] || null)}
                  accept=".pdf,.doc,.docx"
                />
                <small style={{ color: '#6c757d', fontSize: '12px' }}>
                  Upload restoration plans or progress reports (PDF, DOC, DOCX)
                </small>
              </div>
            </div>

            {/* 2a iv - Offsetting Residual Negative Impacts - Dynamic Table */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">2a iv</div>
                <div className="sub-question-title">Actions taken to offset residual negative impacts</div>
                <InfoIcon 
                  title="Offsets are management interventions in areas not affected by the organization's activities. You can add multiple offset measures below."
                  onClick={() => openGuidance("Offsets are management interventions in areas not affected by the organization's activities. You can add multiple offset measures below.")}
                />
              </div>
              
              {/* Add Offset Measure Button */}
              <div style={{ marginBottom: '20px' }}>
                <button 
                  type="button"
                  className="add-btn"
                  onClick={addOffsetMeasure}
                >
                  + Add Offset Measure
                </button>
              </div>

              {/* Offset Measures Management */}
              {mitigationActions.offsetting.offsetMeasures.length === 0 ? (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '30px', 
                  color: '#6c757d',
                  border: '2px dashed #dee2e6',
                  borderRadius: '8px'
                }}>
                  <p>No offset measures added yet.</p>
                  <p>Click "Add Offset Measure" to start adding offset details.</p>
                </div>
              ) : (
                <div>
                  {mitigationActions.offsetting.offsetMeasures.map((measure, index) => (
                    <div key={measure.id} style={{ 
                      border: '1px solid #dee2e6', 
                      borderRadius: '8px', 
                      padding: '15px', 
                      marginBottom: '15px',
                      background: '#f8f9fa'
                    }}>
                      
                      {/* Measure Header */}
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        marginBottom: '15px',
                        paddingBottom: '10px',
                        borderBottom: '1px solid #dee2e6'
                      }}>
                        <h6 style={{ margin: 0, fontWeight: 'bold' }}>
                          Offset Measure #{index + 1}
                        </h6>
                        <button 
                          type="button"
                          onClick={() => removeOffsetMeasure(measure.id)}
                          style={{ 
                            padding: '5px 10px', 
                            border: '1px solid #dc3545', 
                            background: '#dc3545',
                            color: 'white',
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}
                        >
                          🗑️ Remove
                        </button>
                      </div>

                      {/* Measure Fields */}
                      <div className="form-group" style={{ marginBottom: '15px' }}>
                        <label className="form-label">Offset Goals *</label>
                        <textarea 
                          className="form-textarea" 
                          value={measure.description}
                          onChange={(e) => updateOffsetMeasure(measure.id, 'description', e.target.value)}
                          placeholder="Describe offset goals and actions for this measure..."
                          rows={3}
                          required
                        />
                      </div>

                      <div className="form-group" style={{ marginBottom: '15px' }}>
                        <label className="form-label">Geographic Location *</label>
                        <textarea 
                          className="form-textarea" 
                          value={measure.location}
                          onChange={(e) => updateOffsetMeasure(measure.id, 'location', e.target.value)}
                          placeholder="Describe the geographic location of this offset measure..."
                          rows={2}
                          required
                        />
                      </div>

                      <div className="form-group" style={{ marginBottom: '15px' }}>
                        <label className="form-label">Good Offset Practices Compliance *</label>
                        <textarea 
                          className="form-textarea" 
                          value={measure.complianceExplanation}
                          onChange={(e) => updateOffsetMeasure(measure.id, 'complianceExplanation', e.target.value)}
                          placeholder="Explain how good offset practices are met for this measure..."
                          rows={3}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Third-Party Certification/Verification</label>
                        <div style={{ marginBottom: '10px' }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <input
                              type="checkbox"
                              checked={measure.certificationToggle}
                              onChange={(e) => updateOffsetMeasure(measure.id, 'certificationToggle', e.target.checked)}
                            />
                            <span>Yes, this offset measure is certified or verified by a third party</span>
                          </label>
                        </div>
                        
                        {measure.certificationToggle && (
                          <div>
                            <input
                              type="file"
                              className="form-input"
                              onChange={(e) => updateOffsetMeasure(measure.id, 'certificationFile', e.target.files?.[0] || null)}
                              accept=".pdf,.doc,.docx"
                              style={{ marginBottom: '10px' }}
                            />
                            <small style={{ color: '#6c757d', fontSize: '12px', display: 'block' }}>
                              Upload certification documents for this measure (PDF, DOC, DOCX)
                            </small>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 2a v - Transformative and Additional Conservation Actions */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">2a v</div>
                <div className="sub-question-title">Transformative actions and additional conservation actions</div>
                <InfoIcon 
                  title="Transformative actions contribute to systemic change inside and outside the organization's value chain to generate positive impacts on biodiversity."
                  onClick={() => openGuidance("Transformative actions contribute to systemic change inside and outside the organization's value chain to generate positive impacts on biodiversity.")}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Transformative and Additional Conservation Actions *</label>
                <textarea 
                  className="form-textarea" 
                  value={mitigationActions.transformative.description}
                  onChange={(e) => updateMitigationAction('transformative', 'description', e.target.value)}
                  placeholder="Describe transformative systemic change actions and additional conservation activities beyond mitigation..."
                  rows={4}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Strategy or Policy Documents</label>
                <input
                  type="file"
                  className="form-input"
                  onChange={(e) => updateMitigationAction('transformative', 'policyDocs', e.target.files?.[0] || null)}
                  accept=".pdf,.doc,.docx"
                />
                <small style={{ color: '#6c757d', fontSize: '12px' }}>
                  Upload strategy or policy documents (PDF, DOC, DOCX)
                </small>
              </div>
            </div>

            <div className="save-section">
              <button className="attachments-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <span>📎</span>
                <span>Attachments</span>
              </button>
              <button className="save-btn">SAVE</button>
            </div>
          </div>

          {/* Question 2b - Enhanced Site-Level Detailed Reporting */}
          <div className="question-section">
            <div className="question-header">
              <div className="question-number">2b</div>
              <div className="question-title">Size of areas under restoration and rehabilitation</div>
              <InfoIcon 
                title="Report detailed information for each site with the most significant impacts on biodiversity, including restoration metrics and biodiversity management plans."
                onClick={() => openGuidance("Report detailed information for each site with the most significant impacts on biodiversity, including restoration metrics and biodiversity management plans.")}
              />
              <div className="collaboration-icon">👥</div>
            </div>
            <div className="question-description">
              With reference to 101-2-a-iii, report for each site with the most significant impacts on biodiversity
            </div>
            
            {/* Add Site Button */}
            <div style={{ marginBottom: '20px' }}>
              <button 
                type="button"
                className="add-btn"
                onClick={addImpactSite}
              >
                + Add Biodiversity Impact Site
              </button>
            </div>

            {/* Sites Management */}
            {impactSites.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px', 
                color: '#6c757d',
                border: '2px dashed #dee2e6',
                borderRadius: '8px'
              }}>
                <p>No biodiversity impact sites added yet.</p>
                <p>Click "Add Biodiversity Impact Site" to start reporting site-level details.</p>
              </div>
            ) : (
              <div>
                {impactSites.map((site, index) => (
                  <div key={site.id} style={{ 
                    border: '1px solid #dee2e6', 
                    borderRadius: '8px', 
                    padding: '20px', 
                    marginBottom: '20px',
                    background: '#fff'
                  }}>
                    
                    {/* Site Header */}
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '15px',
                      paddingBottom: '10px',
                      borderBottom: '1px solid #dee2e6'
                    }}>
                      <h5 style={{ margin: 0 }}>
                        Biodiversity Impact Site #{index + 1}
                        {site.siteIdentifier && ` - ${site.siteIdentifier}`}
                      </h5>
                      <button 
                        type="button"
                        onClick={() => removeImpactSite(site.id)}
                        style={{ 
                          padding: '5px 10px', 
                          border: '1px solid #dc3545', 
                          background: '#dc3545',
                          color: 'white',
                          cursor: 'pointer'
                        }}
                      >
                        🗑️ Remove
                      </button>
                    </div>

                    {/* Site Identifier */}
                    <div className="form-group">
                      <label className="form-label">Site Identifier *</label>
                      <input 
                        type="text" 
                        className="form-input"
                        value={site.siteIdentifier}
                        onChange={(e) => updateImpactSite(site.id, 'siteIdentifier', e.target.value)}
                        placeholder="Enter site name or identifier..."
                        required
                      />
                    </div>

                    {/* Restoration Areas */}
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Size of Area Under Restoration/Rehabilitation (hectares) *</label>
                        <input 
                          type="number" 
                          className="form-input"
                          value={site.sizeUnderRestoration}
                          onChange={(e) => updateImpactSite(site.id, 'sizeUnderRestoration', parseFloat(e.target.value) || '')}
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Size of Area Restored/Rehabilitated (hectares) *</label>
                        <input 
                          type="number" 
                          className="form-input"
                          value={site.sizeRestored}
                          onChange={(e) => updateImpactSite(site.id, 'sizeRestored', parseFloat(e.target.value) || '')}
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                          required
                        />
                      </div>
                    </div>

                    {/* Biodiversity Management Plan */}
                    <div className="form-group">
                      <label className="form-label">Biodiversity Management Plan</label>
                      <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <input
                            type="checkbox"
                            checked={site.hasBiodiversityPlan}
                            onChange={(e) => updateImpactSite(site.id, 'hasBiodiversityPlan', e.target.checked)}
                          />
                          <span>Yes, this site has a biodiversity management plan</span>
                        </label>
                      </div>
                      
                      {site.hasBiodiversityPlan ? (
                        <div>
                          <label className="form-label">Upload Biodiversity Management Plan</label>
                          <input
                            type="file"
                            className="form-input"
                            onChange={(e) => updateImpactSite(site.id, 'biodiversityPlanFile', e.target.files?.[0] || null)}
                            accept=".pdf,.doc,.docx"
                          />
                          <small style={{ color: '#6c757d', fontSize: '12px' }}>
                            Upload site-specific biodiversity management plan (PDF, DOC, DOCX)
                          </small>
                        </div>
                      ) : (
                        <div>
                          <label className="form-label">Explanation for No Management Plan *</label>
                          <textarea 
                            className="form-textarea" 
                            value={site.noPlanExplanation}
                            onChange={(e) => updateImpactSite(site.id, 'noPlanExplanation', e.target.value)}
                            placeholder="Explain why this site does not have a biodiversity management plan..."
                            rows={3}
                            required={!site.hasBiodiversityPlan}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="save-section">
              <button className="attachments-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <span>📎</span>
                <span>Attachments</span>
              </button>
              <button className="save-btn">SAVE</button>
            </div>
          </div>

          {/* Question 2c - Enhanced Offset-Level Detailed Reporting */}
          <div className="question-section">
            <div className="question-header">
              <div className="question-number">2c</div>
              <div className="question-title">Offset information</div>
              <InfoIcon 
                title="With reference to 101-2-a-iv, report detailed information for each biodiversity offset including goals, location, compliance practices, and third-party verification."
                onClick={() => openGuidance("With reference to 101-2-a-iv, report detailed information for each biodiversity offset including goals, location, compliance practices, and third-party verification.")}
              />
              <div className="collaboration-icon">👥</div>
            </div>
            <div className="question-description">
              With reference to 101-2-a-iv, report for each offset
            </div>
            
            {/* Add Offset Button */}
            <div style={{ marginBottom: '20px' }}>
              <button 
                type="button"
                className="add-btn"
                onClick={addBiodiversityOffset}
              >
                + Add Biodiversity Offset
              </button>
            </div>

            {/* Offsets Management */}
            {biodiversityOffsets.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px', 
                color: '#6c757d',
                border: '2px dashed #dee2e6',
                borderRadius: '8px'
              }}>
                <p>No biodiversity offsets added yet.</p>
                <p>Click "Add Biodiversity Offset" to start reporting offset-level details.</p>
              </div>
            ) : (
              <div>
                {biodiversityOffsets.map((offset, index) => (
                  <div key={offset.id} style={{ 
                    border: '1px solid #dee2e6', 
                    borderRadius: '8px', 
                    padding: '20px', 
                    marginBottom: '20px',
                    background: '#fff'
                  }}>
                    
                    {/* Offset Header */}
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '15px',
                      paddingBottom: '10px',
                      borderBottom: '1px solid #dee2e6'
                    }}>
                      <h5 style={{ margin: 0 }}>
                        Biodiversity Offset #{index + 1}
                        {offset.offsetIdentifier && ` - ${offset.offsetIdentifier}`}
                      </h5>
                      <button 
                        type="button"
                        onClick={() => removeBiodiversityOffset(offset.id)}
                        style={{ 
                          padding: '5px 10px', 
                          border: '1px solid #dc3545', 
                          background: '#dc3545',
                          color: 'white',
                          cursor: 'pointer'
                        }}
                      >
                        🗑️ Remove
                      </button>
                    </div>

                    {/* Offset Identifier */}
                    <div className="form-group">
                      <label className="form-label">Offset Identifier *</label>
                      <input 
                        type="text" 
                        className="form-input"
                        value={offset.offsetIdentifier}
                        onChange={(e) => updateBiodiversityOffset(offset.id, 'offsetIdentifier', e.target.value)}
                        placeholder="Enter offset name or identifier..."
                        required
                      />
                    </div>

                    {/* Offset Goals */}
                    <div className="form-group">
                      <label className="form-label">Goals of the Offset *</label>
                      <textarea 
                        className="form-textarea" 
                        value={offset.goals}
                        onChange={(e) => updateBiodiversityOffset(offset.id, 'goals', e.target.value)}
                        placeholder="Describe the goals and objectives of this offset (e.g., no net loss, net gain, specific species or ecosystem targets)..."
                        rows={4}
                        required
                      />
                    </div>

                    {/* Geographic Location */}
                    <div className="form-group">
                      <label className="form-label">Geographic Location *</label>
                      <textarea 
                        className="form-textarea" 
                        value={offset.geographicLocation}
                        onChange={(e) => updateBiodiversityOffset(offset.id, 'geographicLocation', e.target.value)}
                        placeholder="Describe the geographic location of the offset (country, region, coordinates if available)..."
                        rows={3}
                        required
                      />
                    </div>

                    {/* Good Offset Practices Compliance */}
                    <div className="form-group">
                      <label className="form-label">Principles of Good Offset Practices Compliance</label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '10px', marginTop: '10px' }}>
                        {goodOffsetPractices.map(practice => (
                          <label key={practice} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <input
                              type="checkbox"
                              checked={offset.goodPracticesCompliance.includes(practice)}
                              onChange={(e) => {
                                const currentCompliance = offset.goodPracticesCompliance;
                                let newCompliance;
                                if (e.target.checked) {
                                  newCompliance = [...currentCompliance, practice];
                                } else {
                                  newCompliance = currentCompliance.filter(item => item !== practice);
                                }
                                updateBiodiversityOffset(offset.id, 'goodPracticesCompliance', newCompliance);
                              }}
                            />
                            <span style={{ fontSize: '14px' }}>{practice}</span>
                          </label>
                        ))}
                      </div>
                      
                      {offset.goodPracticesCompliance.includes('Other') && (
                        <div style={{ marginTop: '10px' }}>
                          <input
                            type="text"
                            className="form-input"
                            value={offset.goodPracticesOther}
                            onChange={(e) => updateBiodiversityOffset(offset.id, 'goodPracticesOther', e.target.value)}
                            placeholder="Specify other good offset practices..."
                          />
                        </div>
                      )}
                      
                      <div style={{ marginTop: '10px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <input
                            type="checkbox"
                            checked={offset.goodPracticesCompliance.includes('Other')}
                            onChange={(e) => {
                              const currentCompliance = offset.goodPracticesCompliance;
                              let newCompliance;
                              if (e.target.checked) {
                                newCompliance = [...currentCompliance, 'Other'];
                              } else {
                                newCompliance = currentCompliance.filter(item => item !== 'Other');
                              }
                              updateBiodiversityOffset(offset.id, 'goodPracticesCompliance', newCompliance);
                            }}
                          />
                          <span style={{ fontSize: '14px' }}>Other (please specify)</span>
                        </label>
                      </div>
                    </div>

                    {/* Third-Party Certification */}
                    <div className="form-group">
                      <label className="form-label">Third-Party Certification or Verification</label>
                      <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <input
                            type="checkbox"
                            checked={offset.hasThirdPartyCertification}
                            onChange={(e) => updateBiodiversityOffset(offset.id, 'hasThirdPartyCertification', e.target.checked)}
                          />
                          <span>Yes, this offset is certified or verified by a third party</span>
                        </label>
                      </div>
                      
                      {offset.hasThirdPartyCertification ? (
                        <div>
                          <div style={{ marginBottom: '15px' }}>
                            <label className="form-label">Certification Details *</label>
                            <textarea 
                              className="form-textarea" 
                              value={offset.certificationDetails}
                              onChange={(e) => updateBiodiversityOffset(offset.id, 'certificationDetails', e.target.value)}
                              placeholder="Describe the certification or verification process, certifying body, and standards used..."
                              rows={3}
                              required={offset.hasThirdPartyCertification}
                            />
                          </div>
                          
                          <div>
                            <label className="form-label">Upload Certificate</label>
                            <input
                              type="file"
                              className="form-input"
                              onChange={(e) => updateBiodiversityOffset(offset.id, 'certificationFile', e.target.files?.[0] || null)}
                              accept=".pdf,.doc,.docx"
                            />
                            <small style={{ color: '#6c757d', fontSize: '12px' }}>
                              Upload certification documents (PDF, DOC, DOCX)
                            </small>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <small style={{ color: '#6c757d', fontSize: '12px' }}>
                            If no third-party certification exists, please explain in the goals section why verification was not obtained.
                          </small>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="save-section">
              <button className="attachments-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <span>📎</span>
                <span>Attachments</span>
              </button>
              <button className="save-btn">SAVE</button>
            </div>
          </div>

          {/* Question 2d - Enhanced Biodiversity Management Plans - Dynamic Table */}
          <div className="question-section">
            <div className="question-header">
              <div className="question-number">2d</div>
              <div className="question-title">Biodiversity management plans</div>
              <InfoIcon 
                title="List which of its sites with the most significant impacts on biodiversity have a biodiversity management plan and explain why the other sites do not have a management plan"
                onClick={() => openGuidance("List which of its sites with the most significant impacts on biodiversity have a biodiversity management plan and explain why the other sites do not have a management plan")}
              />
              <div className="collaboration-icon">👥</div>
            </div>
            <div className="question-description">
              List which of its sites with the most significant impacts on biodiversity have a biodiversity management plan and explain why the other sites do not have a management plan
            </div>

            {/* Add Site Button */}
            <div style={{ marginBottom: '20px' }}>
              <button 
                type="button"
                className="add-btn"
                onClick={addManagementPlanSite}
              >
                + Add Site
              </button>
            </div>

            {/* Sites Table */}
            {managementPlanSites.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '30px', 
                color: '#6c757d',
                border: '2px dashed #dee2e6',
                borderRadius: '8px'
              }}>
                <p>No sites added yet.</p>
                <p>Click "Add Site" to start reporting biodiversity management plan details.</p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ 
                  width: '100%', 
                  borderCollapse: 'collapse',
                  border: '1px solid #dee2e6',
                  backgroundColor: '#fff'
                }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8f9fa' }}>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'left',
                        fontWeight: 'bold'
                      }}>
                        Site Name
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'left',
                        fontWeight: 'bold'
                      }}>
                        Type of Impact
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'left',
                        fontWeight: 'bold'
                      }}>
                        Management Plan
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'left',
                        fontWeight: 'bold'
                      }}>
                        Remarks
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'center',
                        fontWeight: 'bold',
                        width: '80px'
                      }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {managementPlanSites.map((site, index) => (
                      <tr key={site.id}>
                        <td style={{ 
                          border: '1px solid #dee2e6', 
                          padding: '8px',
                          verticalAlign: 'top'
                        }}>
                          <input
                            type="text"
                            className="form-input"
                            value={site.siteName}
                            onChange={(e) => updateManagementPlanSite(site.id, 'siteName', e.target.value)}
                            placeholder="Enter site name..."
                            style={{ 
                              width: '100%', 
                              minWidth: '150px',
                              margin: 0
                            }}
                          />
                        </td>
                        <td style={{ 
                          border: '1px solid #dee2e6', 
                          padding: '8px',
                          verticalAlign: 'top'
                        }}>
                          <select
                            className="form-select"
                            value={site.typeOfImpact}
                            onChange={(e) => updateManagementPlanSite(site.id, 'typeOfImpact', e.target.value)}
                            style={{ 
                              width: '100%', 
                              minWidth: '130px',
                              margin: 0
                            }}
                          >
                            <option value="">Select impact</option>
                            <option value="low">Low Significance</option>
                            <option value="medium">Medium Significance</option>
                            <option value="high">High Significance</option>
                          </select>
                        </td>
                        <td style={{ 
                          border: '1px solid #dee2e6', 
                          padding: '8px',
                          verticalAlign: 'top'
                        }}>
                          <select
                            className="form-select"
                            value={site.managementPlan}
                            onChange={(e) => updateManagementPlanSite(site.id, 'managementPlan', e.target.value)}
                            style={{ 
                              width: '100%', 
                              minWidth: '100px',
                              margin: 0
                            }}
                          >
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                        </td>
                        <td style={{ 
                          border: '1px solid #dee2e6', 
                          padding: '8px',
                          verticalAlign: 'top'
                        }}>
                          <textarea
                            className="form-textarea"
                            value={site.remarks}
                            onChange={(e) => updateManagementPlanSite(site.id, 'remarks', e.target.value)}
                            placeholder="Enter remarks and description..."
                            rows={2}
                            style={{ 
                              width: '100%', 
                              minWidth: '200px',
                              margin: 0,
                              resize: 'vertical'
                            }}
                          />
                        </td>
                        <td style={{ 
                          border: '1px solid #dee2e6', 
                          padding: '8px',
                          textAlign: 'center',
                          verticalAlign: 'middle'
                        }}>
                          <button
                            type="button"
                            onClick={() => removeManagementPlanSite(site.id)}
                            style={{
                              padding: '4px 8px',
                              border: '1px solid #dc3545',
                              background: '#dc3545',
                              color: 'white',
                              cursor: 'pointer',
                              fontSize: '12px',
                              borderRadius: '4px'
                            }}
                            title="Remove site"
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="save-section">
              <button className="attachments-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <span>📎</span>
                <span>Attachments</span>
              </button>
              <button className="save-btn">SAVE</button>
            </div>
          </div>

          {/* Question 2e */}
          <div className="question-section">
            <div className="question-header">
              <div className="question-number">2e</div>
              <div className="question-title">Synergies and trade-offs with climate change</div>
              <InfoIcon 
                title="Describe how it enhances synergies and reduces trade-offs between actions taken to manage its biodiversity and climate change impacts"
                onClick={() => openGuidance("Describe how it enhances synergies and reduces trade-offs between actions taken to manage its biodiversity and climate change impacts")}
              />
              <div className="collaboration-icon">👥</div>
            </div>
            <div className="question-description">
              Describe how the organisation enhances synergies and reduces trade-offs between actions taken to manage its biodiversity and climate change impacts
            </div>
            <div className="form-group">
              <label className="form-label">Response</label>
              <textarea className="form-textarea" placeholder="Describe synergies and trade-offs with climate change..."></textarea>
            </div>
            <div className="save-section">
              <button className="attachments-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <span>📎</span>
                <span>Attachments</span>
              </button>
              <button className="save-btn">SAVE</button>
            </div>
          </div>

          {/* Question 2f */}
          <div className="question-section">
            <div className="question-header">
              <div className="question-number">2f</div>
              <div className="question-title">Stakeholder impact management</div>
              <InfoIcon 
                title="Describe how it ensures that the actions taken to manage its impacts on biodiversity avoid and minimize negative impacts and maximize positive impacts for stakeholders"
                onClick={() => openGuidance("Describe how it ensures that the actions taken to manage its impacts on biodiversity avoid and minimize negative impacts and maximize positive impacts for stakeholders")}
              />
              <div className="collaboration-icon">👥</div>
            </div>
            <div className="question-description">
              Describe how the organisation ensures that the actions taken to manage its impacts on biodiversity avoid and minimize negative impacts and maximize positive impacts for stakeholders
            </div>
            <div className="form-group">
              <label className="form-label">Response</label>
              <textarea className="form-textarea" placeholder="Describe stakeholder impact management..."></textarea>
            </div>
            <div className="save-section">
              <button className="attachments-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <span>📎</span>
                <span>Attachments</span>
              </button>
              <button className="save-btn">SAVE</button>
            </div>
          </div>

          {/* Question 3a - Enhanced Access and benefit-sharing compliance process */}
          <div className="question-section">
            <div className="question-header">
              <div className="question-number">3a</div>
              <div className="question-title">Access and benefit-sharing compliance process</div>
              <InfoIcon 
                title="Where Access and Benefit Sharing Compliance Process regulations and measures apply, the organization should describe: how it allocates responsibility to ensure compliance with Access and Benefit Sharing Compliance Process regulations and measures across different levels within the organization; how it identifies which provider countries have access and benefit-sharing regulations and measures; how it integrates Access and Benefit Sharing Compliance Process regulations and measures into organizational strategies, operational policies, and operational procedures; what training it provides on implementing the Access and Benefit Sharing Compliance Process regulations and measures."
                onClick={() => openGuidance("Where Access and Benefit Sharing Compliance Process regulations and measures apply, the organization should describe: how it allocates responsibility to ensure compliance with Access and Benefit Sharing Compliance Process regulations and measures across different levels within the organization; how it identifies which provider countries have access and benefit-sharing regulations and measures; how it integrates Access and Benefit Sharing Compliance Process regulations and measures into organizational strategies, operational policies, and operational procedures; what training it provides on implementing the Access and Benefit Sharing Compliance Process regulations and measures.")}
              />
              <div className="collaboration-icon">👥</div>
            </div>
            <div className="question-description">
              The organization shall describe the process to ensure compliance with access and benefit-sharing (ABS) regulations and measures
            </div>
            
            {/* A. Process Description for ABS Compliance */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-title">A. Process Description for ABS Compliance</div>
                <InfoIcon 
                  title="Provide a general overview or narrative input on your organization's ABS compliance process"
                  onClick={() => openGuidance("Provide a general overview or narrative input on your organization's ABS compliance process")}
                />
              </div>
              <div className="form-group">
                <label className="form-label">ABS Compliance Process Overview *</label>
                <textarea 
                  className="form-textarea" 
                  placeholder="Describe your organization's overall approach to ensuring compliance with access and benefit-sharing regulations and measures..."
                  rows={6}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Supporting Documentation</label>
                <input
                  type="file"
                  className="form-input"
                  accept=".pdf,.doc,.docx,.txt"
                />
                <small style={{ color: '#6c757d', fontSize: '12px' }}>
                  Upload ABS compliance manuals, flowcharts, or procedures (PDF, DOC, DOCX, TXT)
                </small>
              </div>
            </div>

            {/* B. Allocation of Responsibility Across Organization */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-title">B. Allocation of Responsibility Across Organization</div>
                <InfoIcon 
                  title="Define which roles/departments are responsible and hierarchical levels involved in ABS compliance"
                  onClick={() => openGuidance("Define which roles/departments are responsible and hierarchical levels involved in ABS compliance")}
                />
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <button 
                  type="button"
                  className="add-btn"
                  onClick={() => {
                    // Add responsibility allocation logic here
                    console.log('Add responsibility allocation');
                  }}
                >
                  + Add Responsibility Assignment
                </button>
              </div>

              {/* Interactive Table for Responsibility Allocation */}
              <div style={{ overflowX: 'auto' }}>
                <table style={{ 
                  width: '100%', 
                  borderCollapse: 'collapse',
                  border: '1px solid #dee2e6',
                  backgroundColor: '#fff'
                }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8f9fa' }}>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'left',
                        fontWeight: 'bold',
                        minWidth: '200px'
                      }}>
                        Organizational Level/Department *
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'left',
                        fontWeight: 'bold',
                        minWidth: '300px'
                      }}>
                        Role or Responsibility Description *
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'left',
                        fontWeight: 'bold',
                        minWidth: '200px'
                      }}>
                        Contact Person/Team
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'center',
                        fontWeight: 'bold',
                        width: '80px'
                      }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '8px',
                        verticalAlign: 'top'
                      }}>
                        <select
                          className="form-select"
                          style={{ 
                            width: '100%',
                            margin: 0
                          }}
                        >
                          <option value="">Select Level/Department</option>
                          <option value="board">Board of Directors</option>
                          <option value="executive">Executive Leadership</option>
                          <option value="legal">Legal Department</option>
                          <option value="compliance">Compliance Department</option>
                          <option value="rd">R&D Department</option>
                          <option value="procurement">Procurement</option>
                          <option value="sustainability">Sustainability Team</option>
                          <option value="operations">Operations</option>
                          <option value="other">Other</option>
                        </select>
                      </td>
                      <td style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '8px',
                        verticalAlign: 'top'
                      }}>
                        <textarea
                          className="form-textarea"
                          placeholder="Describe specific responsibilities and duties..."
                          rows={2}
                          style={{ 
                            width: '100%',
                            margin: 0,
                            resize: 'vertical'
                          }}
                        />
                      </td>
                      <td style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '8px',
                        verticalAlign: 'top'
                      }}>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="Name or team..."
                          style={{ 
                            width: '100%',
                            margin: 0
                          }}
                        />
                      </td>
                      <td style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '8px',
                        textAlign: 'center',
                        verticalAlign: 'middle'
                      }}>
                        <button
                          type="button"
                          style={{
                            padding: '4px 8px',
                            border: '1px solid #dc3545',
                            background: '#dc3545',
                            color: 'white',
                            cursor: 'pointer',
                            fontSize: '12px',
                            borderRadius: '4px'
                          }}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
            </div>

              <div className="form-group" style={{ marginTop: '20px' }}>
                <label className="form-label">Organizational Chart Upload</label>
                <input
                  type="file"
                  className="form-input"
                  accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                />
                <small style={{ color: '#6c757d', fontSize: '12px' }}>
                  Upload organizational chart showing ABS responsibility hierarchy (PDF, PNG, JPG, DOC, DOCX)
                </small>
              </div>
            </div>

            {/* C. Identification of Provider Countries with ABS Regulations */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-title">C. Identification of Provider Countries with ABS Regulations</div>
                <InfoIcon 
                  title="Methods to track or reference countries with ABS laws and maintain updated country lists"
                  onClick={() => openGuidance("Methods to track or reference countries with ABS laws and maintain updated country lists")}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Provider Countries with ABS Regulations *</label>
                <div style={{ 
                  border: '1px solid #ced4da', 
                  borderRadius: '4px', 
                  padding: '10px',
                  minHeight: '120px',
                  backgroundColor: '#fff'
                }}>
                  <div style={{ marginBottom: '10px', fontSize: '14px', color: '#6c757d' }}>
                    Select countries with ABS regulations that apply to your operations:
              </div>
                  
                  {/* Multi-select checkboxes for countries */}
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                    gap: '8px',
                    maxHeight: '200px',
                    overflowY: 'auto'
                  }}>
                    {[
                      'Australia', 'Brazil', 'Canada', 'Colombia', 'Costa Rica', 
                      'Ecuador', 'India', 'Indonesia', 'Malaysia', 'Mexico',
                      'Peru', 'Philippines', 'South Africa', 'Thailand', 'Venezuela'
                    ].map(country => (
                      <label key={country} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <input type="checkbox" />
                        <span style={{ fontSize: '13px' }}>{country}</span>
                      </label>
                    ))}
                  </div>
                  
                  <div style={{ marginTop: '10px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <input type="checkbox" />
                      <span style={{ fontSize: '13px' }}>Other (specify below)</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Additional Countries</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="List any additional countries not mentioned above..."
                />
              </div>

              <div className="form-group">
                <label className="form-label">Country Identification Methods *</label>
                <textarea 
                  className="form-textarea" 
                  placeholder="Describe your methods/processes to maintain updated country list (e.g., legal watch services, external databases, government resources, industry associations)..."
                  rows={4}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Reference Documents/Databases</label>
                <input
                  type="file"
                  className="form-input"
                  accept=".pdf,.doc,.docx,.xlsx,.csv"
                  multiple
                />
                <small style={{ color: '#6c757d', fontSize: '12px' }}>
                  Upload reference documents or database exports used for country identification
                </small>
              </div>
            </div>

            {/* D. Integration of ABS into Strategies, Policies, Procedures */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-title">D. Integration of ABS into Strategies, Policies, Procedures</div>
                <InfoIcon 
                  title="Description or selection of organizational documents and processes where ABS is integrated"
                  onClick={() => openGuidance("Description or selection of organizational documents and processes where ABS is integrated")}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Organizational Documents with ABS Integration *</label>
                <div style={{ 
                  border: '1px solid #ced4da', 
                  borderRadius: '4px', 
                  padding: '15px',
                  backgroundColor: '#fff'
                }}>
                  {[
                    { id: 'strategy', label: 'Corporate Strategy', desc: 'Overall business strategy and sustainability goals' },
                    { id: 'esg_policy', label: 'ESG Policy', desc: 'Environmental, Social, and Governance policies' },
                    { id: 'procurement', label: 'Procurement Procedures', desc: 'Supplier selection and sourcing guidelines' },
                    { id: 'research', label: 'Research Protocols', desc: 'R&D and innovation processes' },
                    { id: 'risk_management', label: 'Risk Management Framework', desc: 'Enterprise risk assessment and mitigation' },
                    { id: 'compliance', label: 'Compliance Manual', desc: 'Legal and regulatory compliance procedures' },
                    { id: 'supplier_code', label: 'Supplier Code of Conduct', desc: 'Third-party expectations and requirements' },
                    { id: 'due_diligence', label: 'Due Diligence Procedures', desc: 'Investment and partnership evaluation' }
                  ].map(item => (
                    <div key={item.id} style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <input type="checkbox" style={{ marginTop: '2px' }} />
                        <div>
                          <span style={{ fontWeight: '500', fontSize: '14px' }}>{item.label}</span>
                          <div style={{ fontSize: '12px', color: '#6c757d', marginTop: '2px' }}>{item.desc}</div>
              </div>
                      </label>
                      <div style={{ marginTop: '8px', marginLeft: '26px' }}>
                        <textarea
                          className="form-textarea"
                          placeholder={`Describe how ABS is integrated into ${item.label}...`}
                          rows={2}
                          style={{ fontSize: '13px' }}
                        />
                      </div>
                    </div>
                  ))}
                  
                  <div style={{ marginTop: '15px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input type="checkbox" />
                      <span style={{ fontWeight: '500', fontSize: '14px' }}>Other Documents (specify below)</span>
                    </label>
                    <div style={{ marginTop: '8px', marginLeft: '26px' }}>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Specify other organizational documents..."
                        style={{ fontSize: '13px' }}
                      />
                      <textarea
                        className="form-textarea"
                        placeholder="Describe ABS integration..."
                        rows={2}
                        style={{ fontSize: '13px', marginTop: '5px' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Policy Documents Upload</label>
                <input
                  type="file"
                  className="form-input"
                  accept=".pdf,.doc,.docx"
                  multiple
                />
                <small style={{ color: '#6c757d', fontSize: '12px' }}>
                  Upload policy documents that reference ABS compliance (PDF, DOC, DOCX)
                </small>
              </div>
            </div>

            {/* E. Training on ABS Implementation */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-title">E. Training on ABS Implementation</div>
                <InfoIcon 
                  title="Types of training, frequency, and target employees for ABS regulations and measures"
                  onClick={() => openGuidance("Types of training, frequency, and target employees for ABS regulations and measures")}
                />
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <button 
                  type="button"
                  className="add-btn"
                  onClick={() => {
                    // Add training program logic here
                    console.log('Add training program');
                  }}
                >
                  + Add Training Program
                </button>
              </div>

              {/* Interactive Table for Training Programs */}
              <div style={{ overflowX: 'auto' }}>
                <table style={{ 
                  width: '100%', 
                  borderCollapse: 'collapse',
                  border: '1px solid #dee2e6',
                  backgroundColor: '#fff'
                }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8f9fa' }}>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'left',
                        fontWeight: 'bold',
                        minWidth: '150px'
                      }}>
                        Training Type *
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'left',
                        fontWeight: 'bold',
                        minWidth: '120px'
                      }}>
                        Frequency *
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'left',
                        fontWeight: 'bold',
                        minWidth: '180px'
                      }}>
                        Target Audience *
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'left',
                        fontWeight: 'bold',
                        minWidth: '130px'
                      }}>
                        Provider
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'left',
                        fontWeight: 'bold',
                        minWidth: '100px'
                      }}>
                        Materials
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'center',
                        fontWeight: 'bold',
                        width: '80px'
                      }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '8px',
                        verticalAlign: 'top'
                      }}>
                        <select
                          className="form-select"
                          style={{ 
                            width: '100%',
                            margin: 0
                          }}
                        >
                          <option value="">Select Type</option>
                          <option value="awareness">General Awareness</option>
                          <option value="role_based">Role-Based Training</option>
                          <option value="legal_update">Legal Updates</option>
                          <option value="onboarding">New Employee Onboarding</option>
                          <option value="refresher">Refresher Training</option>
                          <option value="specialized">Specialized/Technical</option>
                          <option value="other">Other</option>
                </select>
                      </td>
                      <td style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '8px',
                        verticalAlign: 'top'
                      }}>
                        <select
                          className="form-select"
                          style={{ 
                            width: '100%',
                            margin: 0
                          }}
                        >
                          <option value="">Select Frequency</option>
                          <option value="annual">Annual</option>
                          <option value="biannual">Bi-annual</option>
                          <option value="quarterly">Quarterly</option>
                          <option value="onboarding">Upon Onboarding</option>
                          <option value="ad_hoc">Ad hoc/As needed</option>
                          <option value="continuous">Continuous</option>
                        </select>
                      </td>
                      <td style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '8px',
                        verticalAlign: 'top'
                      }}>
                        <textarea
                          className="form-textarea"
                          placeholder="Departments/roles (e.g., R&D, Legal, Procurement)..."
                          rows={2}
                          style={{ 
                            width: '100%',
                            margin: 0,
                            resize: 'vertical'
                          }}
                        />
                      </td>
                      <td style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '8px',
                        verticalAlign: 'top'
                      }}>
                        <select
                          className="form-select"
                          style={{ 
                            width: '100%',
                            margin: 0
                          }}
                        >
                          <option value="">Select Provider</option>
                          <option value="internal">Internal Team</option>
                          <option value="external">External Consultant</option>
                          <option value="legal_firm">Legal Firm</option>
                          <option value="training_org">Training Organization</option>
                          <option value="industry_assoc">Industry Association</option>
                          <option value="other">Other</option>
                        </select>
                      </td>
                      <td style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '8px',
                        verticalAlign: 'top'
                      }}>
                        <input
                          type="file"
                          className="form-input"
                          accept=".pdf,.doc,.docx,.ppt,.pptx"
                          style={{ 
                            width: '100%',
                            margin: 0,
                            fontSize: '11px'
                          }}
                        />
                      </td>
                      <td style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '8px',
                        textAlign: 'center',
                        verticalAlign: 'middle'
                      }}>
                        <button
                          type="button"
                          style={{
                            padding: '4px 8px',
                            border: '1px solid #dc3545',
                            background: '#dc3545',
                            color: 'white',
                            cursor: 'pointer',
                            fontSize: '12px',
                            borderRadius: '4px'
                          }}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="form-group" style={{ marginTop: '20px' }}>
                <label className="form-label">Overall Training Strategy</label>
                <textarea 
                  className="form-textarea" 
                  placeholder="Describe your overall approach to ABS training, including training effectiveness measurement and continuous improvement..."
                  rows={3}
                />
              </div>
            </div>

            <div className="save-section">
              <button className="attachments-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <span>📎</span>
                <span>Attachments</span>
              </button>
              <button className="save-btn">SAVE</button>
            </div>
          </div>

          {/* Question 3b */}
          <div className="question-section">
            <div className="question-header">
              <div className="question-number">3b</div>
              <div className="question-title">Voluntary actions for access and benefit-sharing</div>
              <InfoIcon 
                title="Examples of voluntary actions include joint research projects, training, or knowledge sharing related to using genetic resources or associated traditional knowledge in research and innovation. The ABS Clearing-House includes examples of good practices, codes of conduct, guidelines, and standards. The UN Nagoya Protocol lists examples of monetary and non-monetary benefits, which can inform the organization's voluntary actions. The organization can report how engagement with stakeholders, particularly indigenous Peoples and local communities, has informed its voluntary actions. If the organization has not taken any voluntary actions to advance access and fair and equitable benefit-sharing, a brief statement of this fact is sufficient to comply with the requirement."
                onClick={() => openGuidance("Examples of voluntary actions include joint research projects, training, or knowledge sharing related to using genetic resources or associated traditional knowledge in research and innovation. The ABS Clearing-House includes examples of good practices, codes of conduct, guidelines, and standards. The UN Nagoya Protocol lists examples of monetary and non-monetary benefits, which can inform the organization's voluntary actions. The organization can report how engagement with stakeholders, particularly indigenous Peoples and local communities, has informed its voluntary actions. If the organization has not taken any voluntary actions to advance access and fair and equitable benefit-sharing, a brief statement of this fact is sufficient to comply with the requirement.")}
              />
              <div className="collaboration-icon">👥</div>
            </div>
            <div className="question-description">
              The organization shall describe voluntary actions taken to advance access and benefit-sharing that are additional to legal obligations or when there are no regulations and measures
            </div>
            <div className="form-group">
              <label className="form-label">Response</label>
              <textarea className="form-textarea" placeholder="Describe voluntary actions taken to advance access and benefit-sharing that are additional to legal obligations..."></textarea>
            </div>
            <div className="save-section">
              <button className="attachments-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <span>📎</span>
                <span>Attachments</span>
              </button>
              <button className="save-btn">SAVE</button>
            </div>
          </div>

          {/* Question 4a - Enhanced Identification of biodiversity impacts */}
          <div className="question-section">
            <div className="question-header">
              <div className="question-number">4a</div>
              <div className="question-title">Identification of biodiversity impacts</div>
              <InfoIcon 
                title="The organization should describe the methods used and the assumptions made to determine which of its sites and which products and services in its supply chain have the most significant actual and potential impacts on biodiversity. It is up to the organization to set the threshold to determine which sites and which products and services in its supply chain have the most significant impacts on biodiversity. For example, the organization can determine that all of its sites have the most significant impacts on biodiversity, except for its headquarters. An organization that sources many products or services can determine to prioritize the products or services in its supply chain that are likely to have the most significant impacts on biodiversity and of which it sources a high volume or on which it spends a large amount. The organization should describe any limitations or exclusions, for example, whether it has excluded certain parts of its supply chain when identifying the impacts. The organization should describe the sources and the evidence it has used to identify the impacts. It should also explain whether and how it engages with stakeholders to identify impacts on biodiversity."
                onClick={() => openGuidance("The organization should describe the methods used and the assumptions made to determine which of its sites and which products and services in its supply chain have the most significant actual and potential impacts on biodiversity. It is up to the organization to set the threshold to determine which sites and which products and services in its supply chain have the most significant impacts on biodiversity. For example, the organization can determine that all of its sites have the most significant impacts on biodiversity, except for its headquarters. An organization that sources many products or services can determine to prioritize the products or services in its supply chain that are likely to have the most significant impacts on biodiversity and of which it sources a high volume or on which it spends a large amount. The organization should describe any limitations or exclusions, for example, whether it has excluded certain parts of its supply chain when identifying the impacts. The organization should describe the sources and the evidence it has used to identify the impacts. It should also explain whether and how it engages with stakeholders to identify impacts on biodiversity.")}
              />
              <div className="collaboration-icon">👥</div>
            </div>
            <div className="question-description">
              Explain how it has determined which of its sites and which products and services in its supply chain have the most significant actual and potential impacts on biodiversity.
            </div>

            {/* 1. Sites and Supply Chain Products/Services Identification */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-title">1. Sites and Supply Chain Products/Services Identification with significant biodiversity impacts</div>
                <InfoIcon 
                  title="List sites and supply chain products/services assessed for biodiversity impact"
                  onClick={() => openGuidance("List sites and supply chain products/services assessed for biodiversity impact")}
                />
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <button 
                  type="button"
                  className="add-btn"
                  onClick={() => {
                    console.log('Add site/product/service');
                  }}
                >
                  + Add Site/Product/Service
                </button>
              </div>

              {/* Interactive Table for Sites and Products/Services */}
              <div style={{ overflowX: 'auto' }}>
                <table style={{ 
                  width: '100%', 
                  borderCollapse: 'collapse',
                  border: '1px solid #dee2e6',
                  backgroundColor: '#fff'
                }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8f9fa' }}>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'left',
                        fontWeight: 'bold',
                        minWidth: '200px'
                      }}>
                        Site/Product/Service Name *
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'left',
                        fontWeight: 'bold',
                        minWidth: '150px'
                      }}>
                        Type *
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'left',
                        fontWeight: 'bold',
                        minWidth: '180px'
                      }}>
                        Volume/Spend/Size
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'left',
                        fontWeight: 'bold',
                        minWidth: '200px'
                      }}>
                        Biodiversity Significance
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'center',
                        fontWeight: 'bold',
                        width: '80px'
                      }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '8px',
                        verticalAlign: 'top'
                      }}>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="e.g., Factory A, Raw Material X"
                          style={{ 
                            width: '100%',
                            margin: 0
                          }}
                        />
                      </td>
                      <td style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '8px',
                        verticalAlign: 'top'
                      }}>
                        <select
                          className="form-select"
                          style={{ 
                            width: '100%',
                            margin: 0
                          }}
                        >
                          <option value="">Select Type</option>
                          <option value="site">Site/Facility</option>
                          <option value="product">Product</option>
                          <option value="service">Service</option>
                          <option value="raw_material">Raw Material</option>
                          <option value="supplier">Supplier/Vendor</option>
                        </select>
                      </td>
                      <td style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '8px',
                        verticalAlign: 'top'
                      }}>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="e.g., $1M annual, 500 hectares"
                          style={{ 
                            width: '100%',
                            margin: 0
                          }}
                        />
                      </td>
                      <td style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '8px',
                        verticalAlign: 'top'
                      }}>
                        <select
                          className="form-select"
                          style={{ 
                            width: '100%',
                            margin: 0
                          }}
                        >
                          <option value="">Select Significance</option>
                          <option value="high">High Impact</option>
                          <option value="medium">Medium Impact</option>
                          <option value="low">Low Impact</option>
                          <option value="potential">Potential Impact</option>
                        </select>
                      </td>
                      <td style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '8px',
                        textAlign: 'center',
                        verticalAlign: 'middle'
                      }}>
                        <button
                          type="button"
                          style={{
                            padding: '4px 8px',
                            border: '1px solid #dc3545',
                            background: '#dc3545',
                            color: 'white',
                            cursor: 'pointer',
                            fontSize: '12px',
                            borderRadius: '4px'
                          }}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 2. Methods Used */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-title">2. Methods Used</div>
                <InfoIcon 
                  title="Describe methods used to determine significance of impacts (e.g., risk assessments, spatial mapping, expert consultation)"
                  onClick={() => openGuidance("Describe methods used to determine significance of impacts (e.g., risk assessments, spatial mapping, expert consultation)")}
                />
              </div>
              
            <div className="form-group">
                <label className="form-label">Assessment Methods Applied *</label>
                <div style={{ 
                  border: '1px solid #ced4da', 
                  borderRadius: '4px', 
                  padding: '15px',
                  backgroundColor: '#fff'
                }}>
                  <div style={{ marginBottom: '10px', fontSize: '14px', color: '#6c757d' }}>
                    Select all methods used to assess biodiversity impacts:
            </div>
                  
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                    gap: '10px'
                  }}>
                    {[
                      'Biodiversity risk assessment',
                      'IBAT (Integrated Biodiversity Assessment Tool)',
                      'Spatial mapping/GIS analysis',
                      'Expert consultation/scientific advice',
                      'Stakeholder engagement',
                      'Environmental impact assessments',
                      'Supply chain risk screening',
                      'Lifecycle impact assessments',
                      'Biodiversity footprint analysis',
                      'Third-party audits/certifications',
                      'Literature review/scientific studies',
                      'Field surveys/site visits'
                    ].map(method => (
                      <label key={method} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input type="checkbox" />
                        <span style={{ fontSize: '14px' }}>{method}</span>
                      </label>
                    ))}
                  </div>
                  
                  <div style={{ marginTop: '15px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input type="checkbox" />
                      <span style={{ fontSize: '14px' }}>Other methods (specify below)</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Other Methods</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Specify any additional assessment methods used..."
                />
              </div>

              <div className="form-group">
                <label className="form-label">Detailed Description of Methods *</label>
                <textarea 
                  className="form-textarea" 
                  placeholder="Provide detailed description of how these methods were applied to determine biodiversity impact significance..."
                  rows={4}
                  required
                />
              </div>
            </div>

            {/* 3. Assumptions Made */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-title">3. Assumptions Made</div>
                <InfoIcon 
                  title="Describe assumptions made in determination (e.g., thresholds for significance, data sources)"
                  onClick={() => openGuidance("Describe assumptions made in determination (e.g., thresholds for significance, data sources)")}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Key Assumptions *</label>
                <textarea 
                  className="form-textarea" 
                  placeholder="Describe key assumptions made during the assessment process (e.g., data quality assumptions, temporal scope, geographic boundaries, impact categories considered)..."
                  rows={4}
                  required
                />
              </div>
            </div>

            {/* 4. Threshold Definition */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-title">4. Threshold Definition</div>
                <InfoIcon 
                  title="State criteria or threshold for determining significant sites/products (quantitative or qualitative)"
                  onClick={() => openGuidance("State criteria or threshold for determining significant sites/products (quantitative or qualitative)")}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Threshold Type *</label>
                <select className="form-select">
                  <option value="">Select threshold approach</option>
                  <option value="quantitative">Quantitative (numerical criteria)</option>
                  <option value="qualitative">Qualitative (descriptive criteria)</option>
                  <option value="mixed">Mixed (both quantitative and qualitative)</option>
                  <option value="precautionary">Precautionary (all sites/products)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Threshold Criteria *</label>
                <textarea 
                  className="form-textarea" 
                  placeholder="Define your specific criteria for determining significance (e.g., 'All sites except headquarters', 'Products above $1M annual spend', 'Sites within 10km of protected areas', 'High-risk commodity categories')..."
                  rows={3}
                  required
                />
              </div>
            </div>

            {/* 5. Limitations or Exclusions */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-title">5. Limitations or Exclusions</div>
                <InfoIcon 
                  title="Describe any parts of supply chain or sites excluded from assessment and why"
                  onClick={() => openGuidance("Describe any parts of supply chain or sites excluded from assessment and why")}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Exclusions Applied</label>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input type="checkbox" />
                    <span>Yes, certain sites/products/services were excluded from the assessment</span>
                  </label>
                </div>
                
                <textarea 
                  className="form-textarea" 
                  placeholder="Describe what was excluded and the rationale (e.g., 'Excluded small-volume suppliers representing <1% of spend due to resource constraints', 'Office locations excluded as they pose minimal direct biodiversity risk')..."
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Assessment Limitations</label>
                <textarea 
                  className="form-textarea" 
                  placeholder="Describe any limitations in your assessment approach (e.g., data availability, geographic scope, temporal coverage, methodological constraints)..."
                  rows={3}
                />
              </div>
            </div>

            {/* 6. Sources and Evidence Used */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-title">6. Sources and Evidence Used</div>
                <InfoIcon 
                  title="Reference data/sources used to identify impacts (e.g., biodiversity databases, audits, expert input)"
                  onClick={() => openGuidance("Reference data/sources used to identify impacts (e.g., biodiversity databases, audits, expert input)")}
                />
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <button 
                  type="button"
                  className="add-btn"
                  onClick={() => {
                    console.log('Add evidence source');
                  }}
                >
                  + Add Evidence Source
                </button>
              </div>

              {/* Interactive Table for Sources and Evidence */}
              <div style={{ overflowX: 'auto' }}>
                <table style={{ 
                  width: '100%', 
                  borderCollapse: 'collapse',
                  border: '1px solid #dee2e6',
                  backgroundColor: '#fff'
                }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8f9fa' }}>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'left',
                        fontWeight: 'bold',
                        minWidth: '200px'
                      }}>
                        Source Name *
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'left',
                        fontWeight: 'bold',
                        minWidth: '150px'
                      }}>
                        Source Type *
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'left',
                        fontWeight: 'bold',
                        minWidth: '120px'
                      }}>
                        Date
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'left',
                        fontWeight: 'bold',
                        minWidth: '150px'
                      }}>
                        Link/Reference
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'left',
                        fontWeight: 'bold',
                        minWidth: '100px'
                      }}>
                        Attachment
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'center',
                        fontWeight: 'bold',
                        width: '80px'
                      }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '8px',
                        verticalAlign: 'top'
                      }}>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="e.g., IBAT API, Internal Audit 2024"
                          style={{ 
                            width: '100%',
                            margin: 0
                          }}
                        />
                      </td>
                      <td style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '8px',
                        verticalAlign: 'top'
                      }}>
                        <select
                          className="form-select"
                          style={{ 
                            width: '100%',
                            margin: 0
                          }}
                        >
                          <option value="">Select Type</option>
                          <option value="database">Biodiversity Database</option>
                          <option value="scientific">Scientific Study</option>
                          <option value="audit">Internal Audit</option>
                          <option value="third_party">Third-party Assessment</option>
                          <option value="expert">Expert Consultation</option>
                          <option value="stakeholder">Stakeholder Input</option>
                          <option value="satellite">Satellite/Remote Sensing</option>
                          <option value="certification">Certification Body</option>
                          <option value="government">Government Data</option>
                          <option value="other">Other</option>
                        </select>
                      </td>
                      <td style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '8px',
                        verticalAlign: 'top'
                      }}>
                        <input
                          type="date"
                          className="form-input"
                          style={{ 
                            width: '100%',
                            margin: 0
                          }}
                        />
                      </td>
                      <td style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '8px',
                        verticalAlign: 'top'
                      }}>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="URL or reference"
                          style={{ 
                            width: '100%',
                            margin: 0
                          }}
                        />
                      </td>
                      <td style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '8px',
                        verticalAlign: 'top'
                      }}>
                        <input
                          type="file"
                          className="form-input"
                          accept=".pdf,.doc,.docx,.xlsx,.csv"
                          style={{ 
                            width: '100%',
                            margin: 0,
                            fontSize: '11px'
                          }}
                        />
                      </td>
                      <td style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '8px',
                        textAlign: 'center',
                        verticalAlign: 'middle'
                      }}>
                        <button
                          type="button"
                          style={{
                            padding: '4px 8px',
                            border: '1px solid #dc3545',
                            background: '#dc3545',
                            color: 'white',
                            cursor: 'pointer',
                            fontSize: '12px',
                            borderRadius: '4px'
                          }}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 7. Stakeholder Engagement on Biodiversity Impacts */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-title">7. Stakeholder Engagement on Biodiversity Impacts</div>
                <InfoIcon 
                  title="Describe if/how stakeholders were engaged (e.g., local communities, NGOs, suppliers)"
                  onClick={() => openGuidance("Describe if/how stakeholders were engaged (e.g., local communities, NGOs, suppliers)")}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Stakeholder Groups Engaged</label>
                <div style={{ 
                  border: '1px solid #ced4da', 
                  borderRadius: '4px', 
                  padding: '15px',
                  backgroundColor: '#fff'
                }}>
                  <div style={{ marginBottom: '10px', fontSize: '14px', color: '#6c757d' }}>
                    Select stakeholder groups engaged in biodiversity impact identification:
                  </div>
                  
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                    gap: '10px'
                  }}>
                    {[
                      'Local communities',
                      'Indigenous Peoples',
                      'Environmental NGOs',
                      'Conservation organizations',
                      'Academic researchers',
                      'Government agencies',
                      'Suppliers/vendors',
                      'Industry associations',
                      'Certification bodies',
                      'Local authorities',
                      'Scientific experts',
                      'International organizations'
                    ].map(stakeholder => (
                      <label key={stakeholder} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input type="checkbox" />
                        <span style={{ fontSize: '14px' }}>{stakeholder}</span>
                      </label>
                    ))}
                  </div>
                  
                  <div style={{ marginTop: '15px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input type="checkbox" />
                      <span style={{ fontSize: '14px' }}>Other stakeholders (specify below)</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Other Stakeholders</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Specify other stakeholder groups engaged..."
                />
              </div>

              <div className="form-group">
                <label className="form-label">Engagement Methods and Outcomes</label>
                <textarea 
                  className="form-textarea" 
                  placeholder="Describe how stakeholders were engaged and what insights were gained for biodiversity impact identification (e.g., consultation meetings, surveys, field visits, collaborative assessments)..."
                  rows={4}
                />
              </div>

              <div className="form-group">
                <label className="form-label">No Stakeholder Engagement</label>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input type="checkbox" />
                    <span>No stakeholder engagement was conducted for biodiversity impact identification</span>
                  </label>
                </div>
                <textarea 
                  className="form-textarea" 
                  placeholder="If no stakeholder engagement was conducted, explain the rationale and any plans for future engagement..."
                  rows={2}
                />
              </div>
            </div>

            <div className="save-section">
              <button className="attachments-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <span>📎</span>
                <span>Attachments</span>
              </button>
              <button className="save-btn">SAVE</button>
            </div>
          </div>

          {/* Question 5a - Enhanced Locations with biodiversity impacts */}
          <div className="question-section">
            <div className="question-header">
              <div className="question-number">5a</div>
              <div className="question-title">Locations with biodiversity impacts</div>
              <InfoIcon 
                title="The organization should use polygon outlines or maps to report on the location of its sites with the most significant impacts on biodiversity. A polygon is a geographic feature defined by a series of grid references, points, or vertices connected to form an enclosed shape. If available, the organization should also report the names and coordinates of its sites. Providing the coordinates for the sites of transport and fishing activities may not be possible. In these cases, the organization can report departure and arrival locations and transport routes for transport activities. For fishing activities, it can report FAO major fishing areas and subareas."
                onClick={() => openGuidance("The organization should use polygon outlines or maps to report on the location of its sites with the most significant impacts on biodiversity. A polygon is a geographic feature defined by a series of grid references, points, or vertices connected to form an enclosed shape. If available, the organization should also report the names and coordinates of its sites. Providing the coordinates for the sites of transport and fishing activities may not be possible. In these cases, the organization can report departure and arrival locations and transport routes for transport activities. For fishing activities, it can report FAO major fishing areas and subareas.")}
              />
              <div className="collaboration-icon">👥</div>
            </div>
            <div className="question-description">
              Report the location and size in hectares of its sites with the most significant impacts on biodiversity.
            </div>
            
            {/* Add Location Button */}
            <div style={{ marginBottom: '20px' }}>
              <button 
                type="button"
                className="add-btn"
                onClick={addBiodiversityLocation}
              >
                + ADD
              </button>
            </div>

            {/* Locations Management */}
            {biodiversityLocations.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px', 
                color: '#6c757d',
                border: '2px dashed #dee2e6',
                borderRadius: '8px'
              }}>
                <p>No biodiversity impact locations added yet.</p>
                <p>Click "ADD" to start reporting location details.</p>
              </div>
            ) : (
              <div>
                {biodiversityLocations.map((location, index) => (
                  <div key={location.id} style={{ 
                    border: '1px solid #dee2e6', 
                    borderRadius: '8px', 
                    padding: '20px', 
                    marginBottom: '20px',
                    background: '#fff'
                  }}>
                    
                    {/* Location Header */}
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '15px',
                      paddingBottom: '10px',
                      borderBottom: '1px solid #dee2e6'
                    }}>
                      <h5 style={{ margin: 0 }}>
                        Location #{index + 1}
                        {location.siteName && ` - ${location.siteName}`}
                      </h5>
                      <button 
                        type="button"
                        onClick={() => removeBiodiversityLocation(location.id)}
                        style={{ 
                          padding: '5px 10px', 
                          border: '1px solid #dc3545', 
                          background: '#dc3545',
                          color: 'white',
                          cursor: 'pointer'
                        }}
                      >
                        🗑️ Remove
                      </button>
                    </div>

                    {/* Location Fields */}
            <div className="form-row">
              <div className="form-group">
                        <label className="form-label">Site Name *</label>
                        <input 
                          type="text" 
                          className="form-input"
                          value={location.siteName}
                          onChange={(e) => updateBiodiversityLocation(location.id, 'siteName', e.target.value)}
                          placeholder="Enter site name..."
                          required
                        />
              </div>
              <div className="form-group">
                        <label className="form-label">Location / Coordinates *</label>
                        <input 
                          type="text" 
                          className="form-input"
                          value={location.locationCoordinates}
                          onChange={(e) => updateBiodiversityLocation(location.id, 'locationCoordinates', e.target.value)}
                          placeholder="e.g., 40.7128° N, 74.0060° W or City, Country"
                          required
                        />
              </div>
              <div className="form-group">
                        <label className="form-label">Size (hectares) *</label>
                        <input 
                          type="number" 
                          className="form-input"
                          value={location.sizeHectares}
                          onChange={(e) => updateBiodiversityLocation(location.id, 'sizeHectares', parseFloat(e.target.value) || '')}
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                          required
                        />
              </div>
            </div>
            </div>
                ))}
              </div>
            )}

            {/* Summary Section - Percentage Calculation */}
            <div style={{ 
              marginTop: '30px',
              padding: '20px',
              backgroundColor: '#f8f9fa',
              border: '1px solid #dee2e6',
              borderRadius: '8px'
            }}>
              <h5 style={{ marginBottom: '15px', color: '#495057' }}>
                Summary: Percentage of Sites in or near Ecologically Sensitive Areas
              </h5>
              
              {/* Guidance Information */}
              <div style={{ 
                backgroundColor: '#fff',
                padding: '15px',
                border: '1px solid #dee2e6',
                borderRadius: '4px',
                marginBottom: '20px'
              }}>
                <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#6c757d' }}>
                  The organization can also report the percentage of sites in or near ecologically sensitive areas. 
                  This information provides a high-level understanding of the significance of biodiversity across 
                  the organization's operations.
                </p>
                <p style={{ margin: '0', fontSize: '14px', color: '#6c757d' }}>
                  The percentage of sites in or near ecologically sensitive areas is calculated using the following formula:
                </p>
              </div>

              {/* Formula Display */}
              <div style={{ 
                backgroundColor: '#e3f2fd',
                padding: '20px',
                border: '2px solid #2196f3',
                borderRadius: '8px',
                textAlign: 'center',
                marginBottom: '25px'
              }}>
                <div style={{ 
                  fontSize: '16px', 
                  fontWeight: 'bold',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}>
                  <span>Percentage of sites in or near ecologically sensitive areas</span>
                  <span>=</span>
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderLeft: '2px solid #2196f3',
                    borderRight: '2px solid #2196f3',
                    padding: '10px',
                    backgroundColor: '#fff'
                  }}>
                    <span style={{ fontSize: '14px', borderBottom: '1px solid #000', paddingBottom: '5px', marginBottom: '5px' }}>
                      Number of sites in or near ecologically sensitive areas
                    </span>
                    <span style={{ fontSize: '14px' }}>
                      Total number of sites
                    </span>
                  </div>
                  <span>x 100</span>
                </div>
              </div>

              {/* Data Entry Section */}
              <div style={{ 
                backgroundColor: '#fff',
                padding: '20px',
                border: '1px solid #dee2e6',
                borderRadius: '8px',
                marginBottom: '20px'
              }}>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                  gap: '20px',
                  alignItems: 'end'
                }}>
                  {/* Sites in/near sensitive areas (auto-calculated) */}
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      fontWeight: 'bold',
                      fontSize: '14px',
                      color: '#495057'
                    }}>
                      Number of sites in or near ecologically sensitive areas
                    </label>
                    <input
                      type="number"
                      value={(() => {
                        // Count sites that are assessed as "in" or "near" in any ecological assessment
                        const sitesInOrNear = biodiversityLocations.filter(location => {
                          return ecologicalAssessments.some(assessment => 
                            assessment.siteReference === location.siteName &&
                            (assessment.biodiversityImportance.status === 'in' || assessment.biodiversityImportance.status === 'near' ||
                             assessment.highEcosystemIntegrity.status === 'in' || assessment.highEcosystemIntegrity.status === 'near' ||
                             assessment.rapidEcosystemDecline.status === 'in' || assessment.rapidEcosystemDecline.status === 'near' ||
                             assessment.highWaterRisks.status === 'in' || assessment.highWaterRisks.status === 'near' ||
                             assessment.ecosystemServicesImportance.status === 'in' || assessment.ecosystemServicesImportance.status === 'near')
                          );
                        }).length;
                        return sitesInOrNear;
                      })()}
                      readOnly
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '2px solid #007bff',
                        borderRadius: '4px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        backgroundColor: '#e3f2fd',
                        color: '#1565c0',
                        textAlign: 'center'
                      }}
                    />
                    <div style={{ fontSize: '12px', color: '#6c757d', marginTop: '5px' }}>
                      Auto-calculated from 5b assessments
                    </div>
                  </div>

                  {/* Total number of sites (manual entry) */}
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      fontWeight: 'bold',
                      fontSize: '14px',
                      color: '#495057'
                    }}>
                      Total number of sites *
                    </label>
                    <input
                      type="number"
                      value={totalSitesCount}
                      onChange={(e) => setTotalSitesCount(e.target.value === '' ? '' : Number(e.target.value))}
                      placeholder="Enter total number of sites"
                      min="0"
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ced4da',
                        borderRadius: '4px',
                        fontSize: '16px'
                      }}
                      required
                    />
                    <div style={{ fontSize: '12px', color: '#6c757d', marginTop: '5px' }}>
                      Include all organizational sites
                    </div>
                  </div>

                  {/* Calculated percentage (auto-fill) */}
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      fontWeight: 'bold',
                      fontSize: '14px',
                      color: '#495057'
                    }}>
                      Calculated Percentage
                    </label>
                    <input
                      type="text"
                      value={(() => {
                        const sitesInOrNear = biodiversityLocations.filter(location => {
                          return ecologicalAssessments.some(assessment => 
                            assessment.siteReference === location.siteName &&
                            (assessment.biodiversityImportance.status === 'in' || assessment.biodiversityImportance.status === 'near' ||
                             assessment.highEcosystemIntegrity.status === 'in' || assessment.highEcosystemIntegrity.status === 'near' ||
                             assessment.rapidEcosystemDecline.status === 'in' || assessment.rapidEcosystemDecline.status === 'near' ||
                             assessment.highWaterRisks.status === 'in' || assessment.highWaterRisks.status === 'near' ||
                             assessment.ecosystemServicesImportance.status === 'in' || assessment.ecosystemServicesImportance.status === 'near')
                          );
                        }).length;
                        
                        if (totalSitesCount && totalSitesCount > 0) {
                          const percentage = Math.round((sitesInOrNear / totalSitesCount) * 100);
                          return `${percentage}%`;
                        }
                        return totalSitesCount === 0 ? '0%' : 'Enter total sites to calculate';
                      })()}
                      readOnly
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '2px solid #dc3545',
                        borderRadius: '4px',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        backgroundColor: '#f8d7da',
                        color: '#721c24',
                        textAlign: 'center'
                      }}
                    />
                    <div style={{ fontSize: '12px', color: '#6c757d', marginTop: '5px' }}>
                      Auto-calculated result
                    </div>
                  </div>
                </div>
              </div>

              {/* Note Section */}
              <div style={{ 
                backgroundColor: '#fff3cd',
                border: '1px solid #ffeaa7',
                borderRadius: '4px',
                padding: '15px',
                fontSize: '13px',
                color: '#856404'
              }}>
                <p style={{ margin: '0 0 10px 0' }}>
                  <strong>Note:</strong> The number of sites in or near ecologically sensitive areas is automatically calculated 
                  based on sites that have been assessed in question 5b as being "In" or "Near" any of the five types of 
                  ecologically sensitive areas.
                </p>
                <p style={{ margin: '0' }}>
                  <strong>Requirements:</strong>
                </p>
                <ul style={{ margin: '5px 0 0 0', paddingLeft: '20px' }}>
                  <li>Complete the assessments in question 5b for accurate counting</li>
                  <li>Enter your organization's total number of sites to calculate the percentage</li>
                  <li>The percentage will automatically update as you modify the assessments</li>
                </ul>
              </div>
            </div>

            <div className="save-section">
              <button className="attachments-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <span>📎</span>
                <span>Attachments</span>
              </button>
              <button className="save-btn">SAVE</button>
            </div>
          </div>

          {/* Question 5b - Enhanced Ecologically sensitive areas assessment */}
          <div className="question-section">
            <div className="question-header">
              <div className="question-number">5b</div>
              <div className="question-title">Ecologically sensitive areas assessment</div>
              <InfoIcon 
                title="The Taskforce on Nature-related Financial Disclosures (TNFD) defines ecologically sensitive areas as areas of biodiversity importance, areas of high ecosystem integrity, areas of rapid decline in ecosystem integrity, areas of high physical water risks, and areas important for the delivery of ecosystem service benefits to Indigenous Peoples, local communities, and other stakeholders."
                onClick={() => openGuidance("The Taskforce on Nature-related Financial Disclosures (TNFD) defines ecologically sensitive areas as areas of biodiversity importance, areas of high ecosystem integrity, areas of rapid decline in ecosystem integrity, areas of high physical water risks, and areas important for the delivery of ecosystem service benefits to Indigenous Peoples, local communities, and other stakeholders.")}
              />
              <div className="collaboration-icon">👥</div>
            </div>
            <div className="question-description">
              For each site reported under 101-5-a, report whether it is in or near an ecologically sensitive area, the distance to these areas, and whether these are:
            </div>

            {/* Add Assessment Button */}
            <div style={{ marginBottom: '20px' }}>
              <button 
                type="button"
                className="add-btn"
                onClick={addEcologicalAssessment}
              >
                + Add Site Assessment
              </button>
            </div>

            {/* Ecological Assessments Management */}
            {ecologicalAssessments.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px', 
                color: '#6c757d',
                border: '2px dashed #dee2e6',
                borderRadius: '8px'
              }}>
                <p>No site assessments added yet.</p>
                <p>Click "Add Site Assessment" to assess sites for ecological sensitivity.</p>
              </div>
            ) : (
              <div>
                {ecologicalAssessments.map((assessment, index) => (
                  <div key={assessment.id} style={{ 
                    border: '1px solid #dee2e6', 
                    borderRadius: '8px', 
                    padding: '20px', 
                    marginBottom: '20px',
                    background: '#fff'
                  }}>
                    
                    {/* Assessment Header */}
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '15px',
                      paddingBottom: '10px',
                      borderBottom: '1px solid #dee2e6'
                    }}>
                      <h5 style={{ margin: 0 }}>
                        Site Assessment #{index + 1}
                        {assessment.siteReference && ` - ${assessment.siteReference}`}
                      </h5>
                      <button 
                        type="button"
                        onClick={() => removeEcologicalAssessment(assessment.id)}
                        style={{ 
                          padding: '5px 10px', 
                          border: '1px solid #dc3545', 
                          background: '#dc3545',
                          color: 'white',
                          cursor: 'pointer'
                        }}
                      >
                        🗑️ Remove
                      </button>
                    </div>

                    {/* Site Reference */}
                    <div className="form-group" style={{ marginBottom: '20px' }}>
                      <label className="form-label">Site Reference (from 5a) *</label>
                      <select 
                        className="form-select"
                        value={assessment.siteReference}
                        onChange={(e) => updateEcologicalAssessment(assessment.id, 'siteReference', '', e.target.value)}
                        required
                      >
                        <option value="">Select a site from 5a</option>
                        {biodiversityLocations.map((location) => (
                          <option key={location.id} value={location.siteName}>
                            {location.siteName} ({location.locationCoordinates})
                          </option>
                        ))}
                        <option value="other">Other/Manual Entry</option>
                      </select>
                      {assessment.siteReference === 'other' && (
                        <input
                          type="text"
                          className="form-input"
                          placeholder="Enter site name manually..."
                          style={{ marginTop: '10px' }}
                          onChange={(e) => updateEcologicalAssessment(assessment.id, 'siteReference', '', e.target.value)}
                        />
                      )}
                    </div>

                    {/* 5b i - Areas of biodiversity importance */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">5b i</div>
                <div className="sub-question-title">Areas of biodiversity importance</div>
                <InfoIcon 
                  title="The organization should specify whether the areas of biodiversity importance are: • protected through legal or other effective means; • scientifically recognized for their importance to biodiversity; • important for species; • important for ecosystems; or • important for ecological connectivity."
                  onClick={() => openGuidance("The organization should specify whether the areas of biodiversity importance are: • protected through legal or other effective means; • scientifically recognized for their importance to biodiversity; • important for species; • important for ecosystems; or • important for ecological connectivity.")}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">In/Near Sensitive Area</label>
                          <select 
                            className="form-select"
                            value={assessment.biodiversityImportance.status}
                            onChange={(e) => updateEcologicalAssessment(assessment.id, 'biodiversityImportance', 'status', e.target.value)}
                          >
                            <option value="">Select</option>
                            <option value="in">In</option>
                            <option value="near">Near</option>
                            <option value="no">No</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Distance to Area (km)</label>
                          <input 
                            type="number" 
                            className="form-input"
                            value={assessment.biodiversityImportance.distance}
                            onChange={(e) => updateEcologicalAssessment(assessment.id, 'biodiversityImportance', 'distance', parseFloat(e.target.value) || '')}
                            placeholder="0.0"
                            min="0"
                            step="0.1"
                          />
                </div>
              </div>
            </div>

                    {/* 5b ii - Areas of high ecosystem integrity */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">5b ii</div>
                <div className="sub-question-title">Areas of high ecosystem integrity</div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">In/Near Sensitive Area</label>
                          <select 
                            className="form-select"
                            value={assessment.highEcosystemIntegrity.status}
                            onChange={(e) => updateEcologicalAssessment(assessment.id, 'highEcosystemIntegrity', 'status', e.target.value)}
                          >
                            <option value="">Select</option>
                            <option value="in">In</option>
                            <option value="near">Near</option>
                            <option value="no">No</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Distance to Area (km)</label>
                          <input 
                            type="number" 
                            className="form-input"
                            value={assessment.highEcosystemIntegrity.distance}
                            onChange={(e) => updateEcologicalAssessment(assessment.id, 'highEcosystemIntegrity', 'distance', parseFloat(e.target.value) || '')}
                            placeholder="0.0"
                            min="0"
                            step="0.1"
                          />
                </div>
              </div>
            </div>

                    {/* 5b iii - Areas of rapid decline in ecosystem integrity */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">5b iii</div>
                <div className="sub-question-title">Areas of rapid decline in ecosystem integrity</div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">In/Near Sensitive Area</label>
                          <select 
                            className="form-select"
                            value={assessment.rapidEcosystemDecline.status}
                            onChange={(e) => updateEcologicalAssessment(assessment.id, 'rapidEcosystemDecline', 'status', e.target.value)}
                          >
                            <option value="">Select</option>
                            <option value="in">In</option>
                            <option value="near">Near</option>
                            <option value="no">No</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Distance to Area (km)</label>
                          <input 
                            type="number" 
                            className="form-input"
                            value={assessment.rapidEcosystemDecline.distance}
                            onChange={(e) => updateEcologicalAssessment(assessment.id, 'rapidEcosystemDecline', 'distance', parseFloat(e.target.value) || '')}
                            placeholder="0.0"
                            min="0"
                            step="0.1"
                          />
                </div>
              </div>
            </div>

                    {/* 5b iv - Areas of high physical water risks */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">5b iv</div>
                <div className="sub-question-title">Areas of high physical water risks</div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">In/Near Sensitive Area</label>
                          <select 
                            className="form-select"
                            value={assessment.highWaterRisks.status}
                            onChange={(e) => updateEcologicalAssessment(assessment.id, 'highWaterRisks', 'status', e.target.value)}
                          >
                            <option value="">Select</option>
                            <option value="in">In</option>
                            <option value="near">Near</option>
                            <option value="no">No</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Distance to Area (km)</label>
                          <input 
                            type="number" 
                            className="form-input"
                            value={assessment.highWaterRisks.distance}
                            onChange={(e) => updateEcologicalAssessment(assessment.id, 'highWaterRisks', 'distance', parseFloat(e.target.value) || '')}
                            placeholder="0.0"
                            min="0"
                            step="0.1"
                          />
                </div>
              </div>
            </div>

                    {/* 5b v - Areas important for ecosystem services */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">5b v</div>
                <div className="sub-question-title">Areas important for ecosystem services to Indigenous Peoples, local communities, and other stakeholders</div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">In/Near Sensitive Area</label>
                          <select 
                            className="form-select"
                            value={assessment.ecosystemServicesImportance.status}
                            onChange={(e) => updateEcologicalAssessment(assessment.id, 'ecosystemServicesImportance', 'status', e.target.value)}
                          >
                            <option value="">Select</option>
                            <option value="in">In</option>
                            <option value="near">Near</option>
                            <option value="no">No</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Distance to Area (km)</label>
                          <input 
                            type="number" 
                            className="form-input"
                            value={assessment.ecosystemServicesImportance.distance}
                            onChange={(e) => updateEcologicalAssessment(assessment.id, 'ecosystemServicesImportance', 'distance', parseFloat(e.target.value) || '')}
                            placeholder="0.0"
                            min="0"
                            step="0.1"
                          />
                </div>
              </div>
            </div>
                  </div>
                ))}
              </div>
            )}

            <div className="save-section">
              <button className="attachments-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <span>📎</span>
                <span>Attachments</span>
              </button>
              <button className="save-btn">SAVE</button>
            </div>
          </div>

          {/* Question 5c - Enhanced Activities at sites reported under 101-5-a */}
          <div className="question-section">
            <div className="question-header">
              <div className="question-number">5c</div>
              <div className="question-title">Activities at sites reported under 101-5-a</div>
              <InfoIcon 
                title="Report the activities that take place in each site reported under 101-5-a."
                onClick={() => openGuidance("Report the activities that take place in each site reported under 101-5-a.")}
              />
              <div className="collaboration-icon">👥</div>
            </div>
            <div className="question-description">
              Report the activities that take place in each site reported under 101-5-a.
            </div>
            
            {/* Add Site Activity Button */}
            <div style={{ marginBottom: '20px' }}>
              <button 
                type="button"
                className="add-btn"
                onClick={addSiteActivity}
              >
                + Add Site Activities
              </button>
            </div>

            {/* Site Activities Management */}
            {siteActivities.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px', 
                color: '#6c757d',
                border: '2px dashed #dee2e6',
                borderRadius: '8px'
              }}>
                <p>No site activities added yet.</p>
                <p>Click "Add Site Activities" to report activities for each site from 5a.</p>
              </div>
            ) : (
              <div>
                {siteActivities.map((activity, index) => (
                  <div key={activity.id} style={{ 
                    border: '1px solid #dee2e6', 
                    borderRadius: '8px', 
                    padding: '20px', 
                    marginBottom: '20px',
                    background: '#fff'
                  }}>
                    
                    {/* Activity Header */}
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '15px',
                      paddingBottom: '10px',
                      borderBottom: '1px solid #dee2e6'
                    }}>
                      <h5 style={{ margin: 0 }}>
                        Site Activities #{index + 1}
                        {activity.siteReference && ` - ${activity.siteReference}`}
                      </h5>
                      <button 
                        type="button"
                        onClick={() => removeSiteActivity(activity.id)}
                        style={{ 
                          padding: '5px 10px', 
                          border: '1px solid #dc3545', 
                          background: '#dc3545',
                          color: 'white',
                          cursor: 'pointer'
                        }}
                      >
                        🗑️ Remove
                      </button>
                    </div>

                    {/* Site Reference */}
                    <div className="form-group" style={{ marginBottom: '20px' }}>
                      <label className="form-label">Site Reference (from 5a) *</label>
                      <select 
                        className="form-select"
                        value={activity.siteReference}
                        onChange={(e) => updateSiteActivity(activity.id, 'siteReference', e.target.value)}
                        required
                      >
                        <option value="">Select a site from 5a</option>
                        {biodiversityLocations.map((location) => (
                          <option key={location.id} value={location.siteName}>
                            {location.siteName} ({location.locationCoordinates})
                          </option>
                        ))}
                        <option value="other">Other/Manual Entry</option>
                      </select>
                      {activity.siteReference === 'other' && (
                        <input
                          type="text"
                          className="form-input"
                          placeholder="Enter site name manually..."
                          style={{ marginTop: '10px' }}
                          onChange={(e) => updateSiteActivity(activity.id, 'siteReference', e.target.value)}
                        />
                      )}
                    </div>

                    {/* Activities Description */}
            <div className="form-group">
                      <label className="form-label">Activities Description *</label>
                      <textarea 
                        className="form-textarea" 
                        value={activity.activities}
                        onChange={(e) => updateSiteActivity(activity.id, 'activities', e.target.value)}
                        placeholder="Describe all activities that take place at this site (e.g., manufacturing, mining, agriculture, research, construction, transportation, waste management)..."
                        rows={5}
                        required
                      />
            </div>
                  </div>
                ))}
              </div>
            )}

            <div className="save-section">
              <button className="attachments-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <span>📎</span>
                <span>Attachments</span>
              </button>
              <button className="save-btn">SAVE</button>
            </div>
          </div>

          {/* Question 5d - Enhanced Products and services in the supply chain with most significant impacts */}
          <div className="question-section">
            <div className="question-header">
              <div className="question-number">5d</div>
              <div className="question-title">Products and services in the supply chain with most significant impacts</div>
              <InfoIcon 
                title="Where possible, the organization should also report the location within the country or jurisdiction (e.g., state, city, Exclusive Economic Zone) or a precise location, such as polygon outlines or maps. The organization can report departure and arrival locations and transport routes for transport activities. For fishing activities, it can report FAO major fishing areas and subareas. For each product and service with the most significant impacts on biodiversity, the organization should describe the level of traceability in place (national, regional, local, or specific point of origin) and can report volumes or spending. If available, it should also report information on ecologically sensitive areas required by 101-5-b for those products and services."
                onClick={() => openGuidance("Where possible, the organization should also report the location within the country or jurisdiction (e.g., state, city, Exclusive Economic Zone) or a precise location, such as polygon outlines or maps. The organization can report departure and arrival locations and transport routes for transport activities. For fishing activities, it can report FAO major fishing areas and subareas. For each product and service with the most significant impacts on biodiversity, the organization should describe the level of traceability in place (national, regional, local, or specific point of origin) and can report volumes or spending. If available, it should also report information on ecologically sensitive areas required by 101-5-b for those products and services.")}
              />
              <div className="collaboration-icon">👥</div>
            </div>
            <div className="question-description">
              Report the products and services in its supply chain with the most significant impacts on biodiversity and the countries or jurisdictions where associated activities take place.
            </div>
            
            {/* Add Product/Service Button */}
            <div style={{ marginBottom: '20px' }}>
              <button 
                type="button"
                className="add-btn"
                onClick={addSupplyChainProduct}
              >
                + ADD
              </button>
            </div>

            {/* Supply Chain Products Management */}
            {supplyChainProducts.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px', 
                color: '#6c757d',
                border: '2px dashed #dee2e6',
                borderRadius: '8px'
              }}>
                <p>No supply chain products/services added yet.</p>
                <p>Click "+ ADD" to start reporting products and services with significant biodiversity impacts.</p>
              </div>
            ) : (
              <div>
                {supplyChainProducts.map((product, index) => (
                  <div key={product.id} style={{ 
                    border: '1px solid #dee2e6', 
                    borderRadius: '8px', 
                    padding: '20px', 
                    marginBottom: '20px',
                    background: '#fff'
                  }}>
                    
                    {/* Product Header */}
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '15px',
                      paddingBottom: '10px',
                      borderBottom: '1px solid #dee2e6'
                    }}>
                      <h5 style={{ margin: 0 }}>
                        Product/Service #{index + 1}
                        {product.productService && ` - ${product.productService}`}
                      </h5>
                      <button 
                        type="button"
                        onClick={() => removeSupplyChainProduct(product.id)}
                        style={{ 
                          padding: '5px 10px', 
                          border: '1px solid #dc3545', 
                          background: '#dc3545',
                          color: 'white',
                          cursor: 'pointer'
                        }}
                      >
                        🗑️ Remove
                      </button>
                    </div>

                    {/* Product Fields */}
            <div className="form-row">
              <div className="form-group">
                        <label className="form-label">Product/Service *</label>
                        <input 
                          type="text" 
                          className="form-input"
                          value={product.productService}
                          onChange={(e) => updateSupplyChainProduct(product.id, 'productService', e.target.value)}
                          placeholder="e.g., Palm oil, Timber, Cotton, Beef, Soy, Mining materials..."
                          required
                        />
              </div>
              <div className="form-group">
                        <label className="form-label">Country / Jurisdiction *</label>
                        <input 
                          type="text" 
                          className="form-input"
                          value={product.countryJurisdiction}
                          onChange={(e) => updateSupplyChainProduct(product.id, 'countryJurisdiction', e.target.value)}
                          placeholder="e.g., Brazil, Indonesia, State of California, Exclusive Economic Zone..."
                          required
                        />
              </div>
              <div className="form-group">
                        <label className="form-label">Traceability Level *</label>
                        <select 
                          className="form-select"
                          value={product.traceabilityLevel}
                          onChange={(e) => updateSupplyChainProduct(product.id, 'traceabilityLevel', e.target.value)}
                          required
                        >
                          <option value="">Select traceability level</option>
                          <option value="national">National</option>
                          <option value="regional">Regional</option>
                          <option value="local">Local</option>
                          <option value="specific_origin">Specific Point of Origin</option>
                </select>
              </div>
            </div>
            </div>
                ))}
              </div>
            )}

            <div className="save-section">
              <button className="attachments-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <span>📎</span>
                <span>Attachments</span>
              </button>
              <button className="save-btn">SAVE</button>
            </div>
          </div>

          {/* Question 6a - Enhanced Dynamic Table */}
          <div className="question-section">
            <div className="question-header">
              <div className="question-number">6a</div>
              <div className="question-title">Land and sea use change</div>
              <InfoIcon 
                title="Report which ecosystem classification is used to identify the types of ecosystems converted. You can use biomes or ecosystem functional groups in the IUCN Global Ecosystem Typology, another global or national classification/register, or land-use classifications (e.g., Globio land-use categories) if ecosystem classifications cannot be used."
                onClick={() => openGuidance("Report which ecosystem classification is used to identify the types of ecosystems converted. You can use biomes or ecosystem functional groups in the IUCN Global Ecosystem Typology, another global or national classification/register, or land-use classifications (e.g., Globio land-use categories) if ecosystem classifications cannot be used.")}
              />
              <div className="collaboration-icon">👥</div>
            </div>
            <div className="question-description">
              For each site reported under 101-5-a where its activities lead or could lead to land and sea use change, report:
            </div>

            {/* Add Entry Button */}
            <div style={{ marginBottom: '20px' }}>
              <button 
                type="button"
                className="add-btn"
                onClick={addLandSeaUseChange}
              >
                + ADD SITE
              </button>
              </div>

            {/* Land Sea Use Change Management */}
            {landSeaUseChange.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px', 
                color: '#6c757d',
                border: '2px dashed #dee2e6',
                borderRadius: '8px'
              }}>
                <p>No land and sea use change data added yet.</p>
                <p>Click "+ ADD SITE" to start reporting data for sites with land and sea use change impacts.</p>
              </div>
            ) : (
              <div>
                {landSeaUseChange.map((entry, index) => (
                  <div key={entry.id} style={{ 
                    border: '1px solid #dee2e6', 
                    borderRadius: '8px', 
                    padding: '20px', 
                    marginBottom: '20px',
                    background: '#fff'
                  }}>
                    
                    {/* Entry Header */}
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '20px',
                      paddingBottom: '10px',
                      borderBottom: '1px solid #dee2e6'
                    }}>
                      <h5 style={{ margin: 0 }}>
                        Site #{index + 1}
                        {entry.siteReference && ` - ${entry.siteReference}`}
                      </h5>
                      <button 
                        type="button"
                        onClick={() => removeLandSeaUseChange(entry.id)}
                        style={{ 
                          padding: '5px 10px', 
                          border: '1px solid #dc3545', 
                          background: '#dc3545',
                          color: 'white',
                          cursor: 'pointer'
                        }}
                      >
                        🗑️ Remove
                      </button>
                    </div>

                    {/* Site Reference */}
                    <div className="form-group" style={{ marginBottom: '20px' }}>
                      <label className="form-label">Site Reference (from 5a) *</label>
                      <select 
                        className="form-select"
                        value={entry.siteReference}
                        onChange={(e) => updateLandSeaUseChange(entry.id, 'siteReference', e.target.value)}
                        required
                      >
                        <option value="">Select a site from 5a</option>
                        {biodiversityLocations.map(location => (
                          <option key={location.id} value={location.siteName}>
                            {location.siteName}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* 6a i - Area converted since cut-off date */}
                    <div style={{ 
                      backgroundColor: '#f8f9fa', 
                      padding: '15px', 
                      borderRadius: '6px', 
                      marginBottom: '20px' 
                    }}>
                      <h6 style={{ margin: '0 0 15px 0', color: '#495057' }}>
                        6a i - Area converted since cut-off/reference date
                      </h6>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Size converted (ha)</label>
                          <input 
                            type="number" 
                            className="form-input"
                            value={entry.sizeConvertedCutoff}
                            onChange={(e) => updateLandSeaUseChange(entry.id, 'sizeConvertedCutoff', e.target.value === '' ? '' : Number(e.target.value))}
                            placeholder="Enter hectares converted"
                            min="0"
                          />
                </div>
                <div className="form-group">
                  <label className="form-label">Cut-off / Reference date</label>
                          <input 
                            type="text" 
                            className="form-input"
                            value={entry.cutoffReferenceDate}
                            onChange={(e) => updateLandSeaUseChange(entry.id, 'cutoffReferenceDate', e.target.value)}
                            placeholder="e.g., January 1, 2020"
                          />
                </div>
                <div className="form-group">
                  <label className="form-label">Ecosystem type before → after</label>
                          <input 
                            type="text" 
                            className="form-input"
                            value={entry.ecosystemTypeBeforeAfterCutoff}
                            onChange={(e) => updateLandSeaUseChange(entry.id, 'ecosystemTypeBeforeAfterCutoff', e.target.value)}
                            placeholder="e.g., Tropical Forest → Agricultural Land"
                          />
                </div>
              </div>
            </div>

                    {/* 6a ii - Area converted during reporting period */}
                    <div style={{ 
                      backgroundColor: '#fff3cd', 
                      padding: '15px', 
                      borderRadius: '6px' 
                    }}>
                      <h6 style={{ margin: '0 0 15px 0', color: '#495057' }}>
                        6a ii - Area converted during reporting period between intensively used/modified ecosystems
                      </h6>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Size converted (ha)</label>
                          <input 
                            type="number" 
                            className="form-input"
                            value={entry.sizeConvertedReporting}
                            onChange={(e) => updateLandSeaUseChange(entry.id, 'sizeConvertedReporting', e.target.value === '' ? '' : Number(e.target.value))}
                            placeholder="Enter hectares converted"
                            min="0"
                          />
                </div>
                <div className="form-group">
                  <label className="form-label">Ecosystem type before → after</label>
                          <input 
                            type="text" 
                            className="form-input"
                            value={entry.ecosystemTypeBeforeAfterReporting}
                            onChange={(e) => updateLandSeaUseChange(entry.id, 'ecosystemTypeBeforeAfterReporting', e.target.value)}
                            placeholder="e.g., Agricultural Land → Urban Area"
                          />
                </div>
              </div>
            </div>
                  </div>
                ))}
              </div>
            )}

            <div className="save-section">
              <button className="attachments-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <span>📎</span>
                <span>Attachments</span>
              </button>
              <button className="save-btn">SAVE</button>
            </div>
          </div>

          {/* Question 6b - Enhanced Dynamic Table */}
          <div className="question-section">
            <div className="question-header">
              <div className="question-number">6b</div>
              <div className="question-title">Exploitation of natural resources</div>
              <InfoIcon 
                title="Report for each site where activities lead or could lead to the exploitation of natural resources."
                onClick={() => openGuidance("Report for each site where activities lead or could lead to the exploitation of natural resources.")}
              />
              <div className="collaboration-icon">👥</div>
            </div>
            <div className="question-description">
              For each site reported under 101-5-a where its activities lead or could lead to the exploitation of natural resources, report:
            </div>

            {/* Add Entry Button */}
            <div style={{ marginBottom: '20px' }}>
              <button 
                type="button"
                className="add-btn"
                onClick={addNaturalResourcesData}
              >
                + ADD SITE
              </button>
              </div>

            {/* Natural Resources Data Management */}
            {naturalResourcesData.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px', 
                color: '#6c757d',
                border: '2px dashed #dee2e6',
                borderRadius: '8px'
              }}>
                <p>No natural resources exploitation data added yet.</p>
                <p>Click "+ ADD SITE" to start reporting data for sites with natural resource exploitation.</p>
              </div>
            ) : (
              <div>
                {naturalResourcesData.map((entry, index) => (
                  <div key={entry.id} style={{ 
                    border: '1px solid #dee2e6', 
                    borderRadius: '8px', 
                    padding: '20px', 
                    marginBottom: '20px',
                    background: '#fff'
                  }}>
                    
                    {/* Entry Header */}
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '20px',
                      paddingBottom: '10px',
                      borderBottom: '1px solid #dee2e6'
                    }}>
                      <h5 style={{ margin: 0 }}>
                        Site #{index + 1}
                        {entry.siteReference && ` - ${entry.siteReference}`}
                      </h5>
                      <button 
                        type="button"
                        onClick={() => removeNaturalResourcesData(entry.id)}
                        style={{ 
                          padding: '5px 10px', 
                          border: '1px solid #dc3545', 
                          background: '#dc3545',
                          color: 'white',
                          cursor: 'pointer'
                        }}
                      >
                        🗑️ Remove
                      </button>
                    </div>

                    {/* Site Reference */}
                    <div className="form-group" style={{ marginBottom: '20px' }}>
                      <label className="form-label">Site Reference (from 5a) *</label>
                      <select 
                        className="form-select"
                        value={entry.siteReference}
                        onChange={(e) => updateNaturalResourcesData(entry.id, 'siteReference', e.target.value)}
                        required
                      >
                        <option value="">Select a site from 5a</option>
                        {biodiversityLocations.map(location => (
                          <option key={location.id} value={location.siteName}>
                            {location.siteName}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* 6b i - Wild species harvested */}
                    <div style={{ 
                      backgroundColor: '#e8f5e8', 
                      padding: '15px', 
                      borderRadius: '6px', 
                      marginBottom: '20px' 
                    }}>
                      <h6 style={{ margin: '0 0 15px 0', color: '#495057' }}>
                        6b i - Wild species harvested: quantity, type, and extinction risk
                      </h6>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Species / Type</label>
                          <input 
                            type="text" 
                            className="form-input"
                            value={entry.speciesType}
                            onChange={(e) => updateNaturalResourcesData(entry.id, 'speciesType', e.target.value)}
                            placeholder="e.g., Atlantic Salmon, Oak Trees, etc."
                          />
                </div>
                <div className="form-group">
                  <label className="form-label">Quantity</label>
                          <input 
                            type="number" 
                            className="form-input"
                            value={entry.quantity}
                            onChange={(e) => updateNaturalResourcesData(entry.id, 'quantity', e.target.value === '' ? '' : Number(e.target.value))}
                            placeholder="Enter quantity harvested"
                            min="0"
                          />
                </div>
                <div className="form-group">
                  <label className="form-label">Extinction risk</label>
                          <input 
                            type="text" 
                            className="form-input"
                            value={entry.extinctionRisk}
                            onChange={(e) => updateNaturalResourcesData(entry.id, 'extinctionRisk', e.target.value)}
                            placeholder="e.g., Vulnerable, Endangered, Least Concern"
                          />
                </div>
              </div>
            </div>

                    {/* 6b ii - Water withdrawal and consumption */}
                    <div style={{ 
                      backgroundColor: '#e3f2fd', 
                      padding: '15px', 
                      borderRadius: '6px' 
                    }}>
                      <h6 style={{ margin: '0 0 15px 0', color: '#495057' }}>
                        6b ii - Water withdrawal and water consumption (Ml)
                      </h6>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Water withdrawal (Ml)</label>
                          <input 
                            type="number" 
                            className="form-input"
                            value={entry.waterWithdrawal}
                            onChange={(e) => updateNaturalResourcesData(entry.id, 'waterWithdrawal', e.target.value === '' ? '' : Number(e.target.value))}
                            placeholder="Enter megaliters withdrawn"
                            min="0"
                            step="0.01"
                          />
                </div>
                <div className="form-group">
                  <label className="form-label">Water consumption (Ml)</label>
                          <input 
                            type="number" 
                            className="form-input"
                            value={entry.waterConsumption}
                            onChange={(e) => updateNaturalResourcesData(entry.id, 'waterConsumption', e.target.value === '' ? '' : Number(e.target.value))}
                            placeholder="Enter megaliters consumed"
                            min="0"
                            step="0.01"
                          />
                </div>
              </div>
            </div>
                  </div>
                ))}
              </div>
            )}

            <div className="save-section">
              <button className="attachments-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <span>📎</span>
                <span>Attachments</span>
              </button>
              <button className="save-btn">SAVE</button>
            </div>
          </div>

          {/* Question 6c - Enhanced Dynamic Table */}
          <div className="question-section">
            <div className="question-header">
              <div className="question-number">6c</div>
              <div className="question-title">Pollution: type and quantity of pollutants generated</div>
              <InfoIcon 
                title="Only report the type and quantity of pollutants that lead or could lead to the most significant impacts on biodiversity."
                onClick={() => openGuidance("Only report the type and quantity of pollutants that lead or could lead to the most significant impacts on biodiversity.")}
              />
              <div className="collaboration-icon">👥</div>
            </div>
            <div className="question-description">
              For each site reported under 101-5-a where its activities lead or could lead to pollution, report the quantity and the type of each pollutant generated.
            </div>

            {/* Add Entry Button */}
            <div style={{ marginBottom: '20px' }}>
              <button 
                type="button"
                className="add-btn"
                onClick={addPollutionData}
              >
                + ADD SITE
              </button>
            </div>

            {/* Pollution Data Management */}
            {pollutionData.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px', 
                color: '#6c757d',
                border: '2px dashed #dee2e6',
                borderRadius: '8px'
              }}>
                <p>No pollution data added yet.</p>
                <p>Click "+ ADD SITE" to start reporting pollutant data for sites with pollution impacts.</p>
              </div>
            ) : (
              <div>
                {pollutionData.map((entry, index) => (
                  <div key={entry.id} style={{ 
                    border: '1px solid #dee2e6', 
                    borderRadius: '8px', 
                    padding: '20px', 
                    marginBottom: '20px',
                    background: '#fff'
                  }}>
                    
                    {/* Entry Header */}
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '20px',
                      paddingBottom: '10px',
                      borderBottom: '1px solid #dee2e6'
                    }}>
                      <h5 style={{ margin: 0 }}>
                        Site #{index + 1}
                        {entry.siteReference && ` - ${entry.siteReference}`}
                      </h5>
                      <button 
                        type="button"
                        onClick={() => removePollutionData(entry.id)}
                        style={{ 
                          padding: '5px 10px', 
                          border: '1px solid #dc3545', 
                          background: '#dc3545',
                          color: 'white',
                          cursor: 'pointer'
                        }}
                      >
                        🗑️ Remove
                      </button>
                    </div>

                    {/* Site Reference */}
                    <div className="form-group" style={{ marginBottom: '20px' }}>
                      <label className="form-label">Site Reference (from 5a) *</label>
                      <select 
                        className="form-select"
                        value={entry.siteReference}
                        onChange={(e) => updatePollutionData(entry.id, 'siteReference', e.target.value)}
                        required
                      >
                        <option value="">Select a site from 5a</option>
                        {biodiversityLocations.map(location => (
                          <option key={location.id} value={location.siteName}>
                            {location.siteName}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Pollution Details */}
                    <div style={{ 
                      backgroundColor: '#fff5f5', 
                      padding: '15px', 
                      borderRadius: '6px' 
                    }}>
                      <h6 style={{ margin: '0 0 15px 0', color: '#495057' }}>
                        Pollutant Information
                      </h6>
            <div className="form-row">
              <div className="form-group">
                          <label className="form-label">Pollutant type *</label>
                          <input 
                            type="text" 
                            className="form-input"
                            value={entry.pollutantType}
                            onChange={(e) => updatePollutionData(entry.id, 'pollutantType', e.target.value)}
                            placeholder="e.g., Nitrogen compounds, Heavy metals, Plastics, etc."
                            required
                          />
              </div>
              <div className="form-group">
                          <label className="form-label">Quantity *</label>
                          <input 
                            type="number" 
                            className="form-input"
                            value={entry.quantity}
                            onChange={(e) => updatePollutionData(entry.id, 'quantity', e.target.value === '' ? '' : Number(e.target.value))}
                            placeholder="Enter quantity (specify units in pollutant type)"
                            min="0"
                            step="0.01"
                            required
                          />
              </div>
            </div>
                      <div style={{ 
                        fontSize: '12px', 
                        color: '#6c757d', 
                        marginTop: '10px',
                        padding: '8px',
                        backgroundColor: '#fff',
                        borderRadius: '4px',
                        border: '1px solid #dee2e6'
                      }}>
                        <strong>Note:</strong> Only report pollutants that lead or could lead to the most significant impacts on biodiversity. 
                        Include units in the pollutant type field (e.g., "Nitrogen compounds (kg/year)").
            </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="save-section">
              <button className="attachments-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <span>📎</span>
                <span>Attachments</span>
              </button>
              <button className="save-btn">SAVE</button>
            </div>
          </div>

          {/* Question 6d - Enhanced Dynamic Table */}
          <div className="question-section">
            <div className="question-header">
              <div className="question-number">6d</div>
              <div className="question-title">Introduction of invasive alien species</div>
              <InfoIcon 
                title="Non‑invasive alien species are not required under 101‑6‑d. Invasive alien species can be introduced accidentally (e.g., transport, discharge of ballast waters) or on purpose (e.g., pest control, horticulture, pets, zoos, aquaria). Report the species that are or may be introduced and pathways (e.g., shipping ballast, ornamental trade). National regulations define which species are considered invasive in a country. Global databases such as the Global Invasive Species Database and the Global Register of Introduced and Invasive Species provide information."
                onClick={() => openGuidance("Non‑invasive alien species are not required under 101‑6‑d. Invasive alien species can be introduced accidentally (e.g., transport, discharge of ballast waters) or on purpose (e.g., pest control, horticulture, pets, zoos, aquaria). Report the species that are or may be introduced and pathways (e.g., shipping ballast, ornamental trade). National regulations define which species are considered invasive in a country. Global databases such as the Global Invasive Species Database and the Global Register of Introduced and Invasive Species provide information.")}
              />
              <div className="collaboration-icon">👥</div>
            </div>
            <div className="question-description">
              For each site reported under 101-5-a where its activities lead or could lead to the introduction of invasive alien species, describe how invasive alien species are or may be introduced.
            </div>

            {/* Add Entry Button */}
            <div style={{ marginBottom: '20px' }}>
              <button 
                type="button"
                className="add-btn"
                onClick={addInvasiveSpeciesData}
              >
                + ADD SITE
              </button>
            </div>

            {/* Invasive Species Data Management */}
            {invasiveSpeciesData.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px', 
                color: '#6c757d',
                border: '2px dashed #dee2e6',
                borderRadius: '8px'
              }}>
                <p>No invasive alien species data added yet.</p>
                <p>Click "+ ADD SITE" to start reporting data for sites with invasive alien species risks.</p>
              </div>
            ) : (
              <div>
                {invasiveSpeciesData.map((entry, index) => (
                  <div key={entry.id} style={{ 
                    border: '1px solid #dee2e6', 
                    borderRadius: '8px', 
                    padding: '20px', 
                    marginBottom: '20px',
                    background: '#fff'
                  }}>
                    
                    {/* Entry Header */}
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '20px',
                      paddingBottom: '10px',
                      borderBottom: '1px solid #dee2e6'
                    }}>
                      <h5 style={{ margin: 0 }}>
                        Site #{index + 1}
                        {entry.siteReference && ` - ${entry.siteReference}`}
                      </h5>
                      <button 
                        type="button"
                        onClick={() => removeInvasiveSpeciesData(entry.id)}
                        style={{ 
                          padding: '5px 10px', 
                          border: '1px solid #dc3545', 
                          background: '#dc3545',
                          color: 'white',
                          cursor: 'pointer'
                        }}
                      >
                        🗑️ Remove
                      </button>
                    </div>

                    {/* Site Reference */}
                    <div className="form-group" style={{ marginBottom: '20px' }}>
                      <label className="form-label">Site Reference (from 5a) *</label>
                      <select 
                        className="form-select"
                        value={entry.siteReference}
                        onChange={(e) => updateInvasiveSpeciesData(entry.id, 'siteReference', e.target.value)}
                        required
                      >
                        <option value="">Select a site from 5a</option>
                        {biodiversityLocations.map(location => (
                          <option key={location.id} value={location.siteName}>
                            {location.siteName}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Invasive Species Description */}
                    <div style={{ 
                      backgroundColor: '#f0f8ff', 
                      padding: '15px', 
                      borderRadius: '6px' 
                    }}>
                      <h6 style={{ margin: '0 0 15px 0', color: '#495057' }}>
                        Description of Invasive Alien Species Introduction
                      </h6>
            <div className="form-group">
                        <label className="form-label">Description *</label>
                        <textarea 
                          className="form-textarea"
                          value={entry.description}
                          onChange={(e) => updateInvasiveSpeciesData(entry.id, 'description', e.target.value)}
                          placeholder="Describe how invasive alien species are or may be introduced at this site. Include species names, introduction pathways (accidental or intentional), and risk factors..."
                          rows={6}
                          required
                          style={{ minHeight: '120px' }}
                        />
            </div>
                      <div style={{ 
                        fontSize: '12px', 
                        color: '#6c757d', 
                        marginTop: '10px',
                        padding: '10px',
                        backgroundColor: '#fff',
                        borderRadius: '4px',
                        border: '1px solid #bee5eb'
                      }}>
                        <strong>Guidelines:</strong>
                        <ul style={{ margin: '5px 0 0 0', paddingLeft: '20px' }}>
                          <li>Include specific species names where known</li>
                          <li>Describe introduction pathways (e.g., shipping ballast, ornamental trade, transport)</li>
                          <li>Indicate whether introduction is accidental or intentional</li>
                          <li>Reference national regulations or global databases (Global Invasive Species Database, Global Register of Introduced and Invasive Species)</li>
                          <li>Note: Only invasive alien species are required (non-invasive alien species are excluded)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="save-section">
              <button className="attachments-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <span>📎</span>
                <span>Attachments</span>
              </button>
              <button className="save-btn">SAVE</button>
            </div>
          </div>

          {/* Question 6e - Enhanced Dynamic Table with 5d Linkage */}
          <div className="question-section">
            <div className="question-header">
              <div className="question-number">6e</div>
              <div className="question-title">Supply chain breakdown for 101-6 (by country/jurisdiction)</div>
              <InfoIcon 
                title="If primary data on direct drivers is not feasible to obtain from suppliers, estimate using multi‑regional input‑output (MRIO) models and lifecycle impact assessments together with spend/volume data. If the size of natural ecosystem converted cannot be reported for products in the supply chain, report for each product the percentage of sourced volume determined to be deforestation‑/conversion‑free and describe assessment methods used (e.g., monitoring, certification, sourcing from low‑risk jurisdictions, verified suppliers). To be deemed conversion‑ or deforestation‑free, products must be assessed as not causing or contributing to natural ecosystem conversion after an appropriate cut‑off date."
                onClick={() => openGuidance("If primary data on direct drivers is not feasible to obtain from suppliers, estimate using multi‑regional input‑output (MRIO) models and lifecycle impact assessments together with spend/volume data. If the size of natural ecosystem converted cannot be reported for products in the supply chain, report for each product the percentage of sourced volume determined to be deforestation‑/conversion‑free and describe assessment methods used (e.g., monitoring, certification, sourcing from low‑risk jurisdictions, verified suppliers). To be deemed conversion‑ or deforestation‑free, products must be assessed as not causing or contributing to natural ecosystem conversion after an appropriate cut‑off date.")}
              />
              <div className="collaboration-icon">👥</div>
            </div>
            <div className="question-description">
              For each product and service in its supply chain reported under 101-5-d, report the information required under 101-6-a, 101-6-b, 101-6-c, and 101-6-d, with a breakdown by country or jurisdiction.
            </div>

            {/* Base Product List Reference from 5d */}
            {supplyChainProducts.length > 0 && (
              <div style={{ 
                backgroundColor: '#e3f2fd', 
                padding: '15px', 
                borderRadius: '8px', 
                marginBottom: '20px',
                border: '1px solid #90caf9'
              }}>
                <h6 style={{ margin: '0 0 10px 0', color: '#1565c0' }}>
                  📋 Base Product List (from Question 5d)
                </h6>
                <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#424242' }}>
                  The following products/services are available for breakdown analysis:
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {supplyChainProducts.map(product => (
                    <span key={product.id} style={{ 
                      backgroundColor: '#fff', 
                      padding: '4px 8px', 
                      borderRadius: '4px',
                      fontSize: '12px',
                      border: '1px solid #e0e0e0'
                    }}>
                      {product.productService || 'Unnamed Product'}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Add Entry Button */}
            <div style={{ marginBottom: '20px' }}>
              <button 
                type="button"
                className="add-btn"
                onClick={addSupplyChainBreakdown}
                disabled={supplyChainProducts.length === 0}
              >
                + ADD PRODUCT BREAKDOWN
              </button>
              {supplyChainProducts.length === 0 && (
                <p style={{ fontSize: '12px', color: '#f44336', marginTop: '5px' }}>
                  Please add products in Question 5d before creating breakdowns.
                </p>
              )}
            </div>

            {/* Supply Chain Breakdown Management */}
            {supplyChainBreakdown.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px', 
                color: '#6c757d',
                border: '2px dashed #dee2e6',
                borderRadius: '8px'
              }}>
                <p>No supply chain breakdown data added yet.</p>
                <p>Click "+ ADD PRODUCT BREAKDOWN" to start reporting breakdown data for products from 5d.</p>
              </div>
            ) : (
              <div>
                {supplyChainBreakdown.map((entry, index) => (
                  <div key={entry.id} style={{ 
                    border: '1px solid #dee2e6', 
                    borderRadius: '12px', 
                    padding: '25px', 
                    marginBottom: '25px',
                    background: '#fff',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    
                    {/* Entry Header */}
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '25px',
                      paddingBottom: '15px',
                      borderBottom: '2px solid #e3f2fd'
                    }}>
                      <h5 style={{ margin: 0, color: '#1565c0' }}>
                        Product #{index + 1}
                        {entry.productReference && ` - ${entry.productReference}`}
                      </h5>
                      <button 
                        type="button"
                        onClick={() => removeSupplyChainBreakdown(entry.id)}
                        style={{ 
                          padding: '8px 12px', 
                          border: '1px solid #dc3545', 
                          background: '#dc3545',
                          color: 'white',
                          cursor: 'pointer',
                          borderRadius: '4px'
                        }}
                      >
                        🗑️ Remove
                      </button>
                    </div>

                    {/* Product Reference */}
                    <div className="form-group" style={{ marginBottom: '25px' }}>
                      <label className="form-label">Product Reference (from 5d) *</label>
                      <select 
                        className="form-select"
                        value={entry.productReference}
                        onChange={(e) => updateSupplyChainBreakdown(entry.id, 'productReference', e.target.value)}
                        required
                        style={{ fontWeight: 'bold', backgroundColor: '#f8f9fa' }}
                      >
                        <option value="">Select a product from 5d</option>
                        {supplyChainProducts.map(product => (
                          <option key={product.id} value={product.productService}>
                            {product.productService} ({product.countryJurisdiction})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Section 1: Primary Data Availability */}
                    <div style={{ 
                      backgroundColor: '#f8f9fa', 
                      padding: '20px', 
                      borderRadius: '8px', 
                      marginBottom: '20px' 
                    }}>
                      <h6 style={{ margin: '0 0 15px 0', color: '#495057' }}>
                        1. Primary Data Availability
                      </h6>
            <div className="form-group">
                        <label className="form-label">Is primary data on direct drivers from suppliers available? *</label>
                        <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <input 
                              type="radio" 
                              name={`primaryData_${entry.id}`}
                              value="yes"
                              checked={entry.primaryDataAvailable === 'yes'}
                              onChange={(e) => updateSupplyChainBreakdown(entry.id, 'primaryDataAvailable', e.target.value)}
                            />
                            Yes
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <input 
                              type="radio" 
                              name={`primaryData_${entry.id}`}
                              value="no"
                              checked={entry.primaryDataAvailable === 'no'}
                              onChange={(e) => updateSupplyChainBreakdown(entry.id, 'primaryDataAvailable', e.target.value)}
                            />
                            No
                          </label>
            </div>
                      </div>
                    </div>

                    {/* Conditional Section 2: Estimation Methodology (only if No) */}
                    {entry.primaryDataAvailable === 'no' && (
                      <div style={{ 
                        backgroundColor: '#fff3cd', 
                        padding: '20px', 
                        borderRadius: '8px', 
                        marginBottom: '20px' 
                      }}>
                        <h6 style={{ margin: '0 0 15px 0', color: '#495057' }}>
                          2. Estimation Methodology
                        </h6>
                        <div className="form-group">
                          <label className="form-label">Select estimation methods used for direct drivers in supply chain products:</label>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '10px', marginTop: '10px' }}>
                            {estimationMethodsOptions.map(method => (
                              <label key={method} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <input 
                                  type="checkbox"
                                  checked={entry.estimationMethods.includes(method)}
                                  onChange={(e) => handleSupplyChainCheckboxChange(entry.id, 'estimationMethods', method, e.target.checked)}
                                />
                                {method}
                              </label>
                            ))}
                          </div>
                          {entry.estimationMethods.includes('Other') && (
                            <input 
                              type="text" 
                              className="form-input"
                              value={entry.estimationMethodsOther}
                              onChange={(e) => updateSupplyChainBreakdown(entry.id, 'estimationMethodsOther', e.target.value)}
                              placeholder="Specify other estimation method..."
                              style={{ marginTop: '10px' }}
                            />
                          )}
                        </div>
                      </div>
                    )}

                    {/* Section 3: Volume or Spend Data */}
                    <div style={{ 
                      backgroundColor: '#e8f5e8', 
                      padding: '20px', 
                      borderRadius: '8px', 
                      marginBottom: '20px' 
                    }}>
                      <h6 style={{ margin: '0 0 15px 0', color: '#495057' }}>
                        3. Volume or Spend Data
                      </h6>
                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">Volume</label>
                          <input 
                            type="number" 
                            className="form-input"
                            value={entry.volume}
                            onChange={(e) => updateSupplyChainBreakdown(entry.id, 'volume', e.target.value === '' ? '' : Number(e.target.value))}
                            placeholder="Enter volume amount"
                            min="0"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Volume Unit</label>
                          <select 
                            className="form-select"
                            value={entry.volumeUnit}
                            onChange={(e) => updateSupplyChainBreakdown(entry.id, 'volumeUnit', e.target.value)}
                          >
                            <option value="">Select unit</option>
                            {volumeUnits.map(unit => (
                              <option key={unit} value={unit}>{unit}</option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Spend Amount</label>
                          <input 
                            type="number" 
                            className="form-input"
                            value={entry.spendAmount}
                            onChange={(e) => updateSupplyChainBreakdown(entry.id, 'spendAmount', e.target.value === '' ? '' : Number(e.target.value))}
                            placeholder="Enter spend amount"
                            min="0"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Currency</label>
                          <select 
                            className="form-select"
                            value={entry.spendCurrency}
                            onChange={(e) => updateSupplyChainBreakdown(entry.id, 'spendCurrency', e.target.value)}
                          >
                            {currencies.map(currency => (
                              <option key={currency} value={currency}>{currency}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Section 4: Inputs and Outputs Estimated */}
                    <div style={{ 
                      backgroundColor: '#fce4ec', 
                      padding: '20px', 
                      borderRadius: '8px', 
                      marginBottom: '20px' 
                    }}>
                      <h6 style={{ margin: '0 0 15px 0', color: '#495057' }}>
                        4. Environmental Inputs/Outputs Estimated
                      </h6>
                      <div className="form-group">
                        <label className="form-label">Types of environmental inputs/outputs estimated using models:</label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '10px', marginTop: '10px' }}>
                          {environmentalInputsOutputsOptions.map(option => (
                            <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <input 
                                type="checkbox"
                                checked={entry.environmentalInputsOutputs.includes(option)}
                                onChange={(e) => handleSupplyChainCheckboxChange(entry.id, 'environmentalInputsOutputs', option, e.target.checked)}
                              />
                              {option}
                            </label>
                          ))}
                        </div>
                        {entry.environmentalInputsOutputs.includes('Other') && (
                          <input 
                            type="text" 
                            className="form-input"
                            value={entry.environmentalInputsOutputsOther}
                            onChange={(e) => updateSupplyChainBreakdown(entry.id, 'environmentalInputsOutputsOther', e.target.value)}
                            placeholder="Specify other environmental inputs/outputs..."
                            style={{ marginTop: '10px' }}
                          />
                        )}
                      </div>
                    </div>

                    {/* Section 5: Sourced Volume Deforestation-Free */}
                    <div style={{ 
                      backgroundColor: '#e1f5fe', 
                      padding: '20px', 
                      borderRadius: '8px', 
                      marginBottom: '20px' 
                    }}>
                      <h6 style={{ margin: '0 0 15px 0', color: '#495057' }}>
                        5. Sourced Volume Deforestation-Free
                      </h6>
                      <div className="form-group">
                        <label className="form-label">Percentage of sourced volume determined as deforestation/conversion-free (%)</label>
                        <input 
                          type="number" 
                          className="form-input"
                          value={entry.deforestationFreePercentage}
                          onChange={(e) => updateSupplyChainBreakdown(entry.id, 'deforestationFreePercentage', e.target.value === '' ? '' : Number(e.target.value))}
                          placeholder="Enter percentage (0-100)"
                          min="0"
                          max="100"
                        />
                      </div>
                    </div>

                    {/* Section 6: Assessment Approaches */}
                    <div style={{ 
                      backgroundColor: '#f3e5f5', 
                      padding: '20px', 
                      borderRadius: '8px', 
                      marginBottom: '20px' 
                    }}>
                      <h6 style={{ margin: '0 0 15px 0', color: '#495057' }}>
                        6. Assessment Approaches
                      </h6>
                      <div className="form-group">
                        <label className="form-label">Methods used to determine deforestation/conversion-free status:</label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px', marginTop: '10px' }}>
                          {assessmentMethodsOptions.map(method => (
                            <label key={method} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <input 
                                type="checkbox"
                                checked={entry.assessmentMethods.includes(method)}
                                onChange={(e) => handleSupplyChainCheckboxChange(entry.id, 'assessmentMethods', method, e.target.checked)}
                              />
                              {method}
                            </label>
                          ))}
                        </div>
                        {entry.assessmentMethods.includes('Other') && (
                          <input 
                            type="text" 
                            className="form-input"
                            value={entry.assessmentMethodsOther}
                            onChange={(e) => updateSupplyChainBreakdown(entry.id, 'assessmentMethodsOther', e.target.value)}
                            placeholder="Specify other assessment method..."
                            style={{ marginTop: '10px' }}
                          />
                        )}
                      </div>
                      <div className="form-group" style={{ marginTop: '15px' }}>
                        <label className="form-label">Description of assessment approach</label>
                        <textarea 
                          className="form-textarea"
                          value={entry.assessmentDescription}
                          onChange={(e) => updateSupplyChainBreakdown(entry.id, 'assessmentDescription', e.target.value)}
                          placeholder="Describe the assessment approach in detail..."
                          rows={3}
                        />
                      </div>
                    </div>

                    {/* Section 7: Cut-off Date */}
                    <div style={{ 
                      backgroundColor: '#fff8e1', 
                      padding: '20px', 
                      borderRadius: '8px', 
                      marginBottom: '20px' 
                    }}>
                      <h6 style={{ margin: '0 0 15px 0', color: '#495057' }}>
                        7. Cut-off Date for Assessment
                      </h6>
                      <div className="form-group">
                        <label className="form-label">Cut-off date after which conversion/deforestation is considered</label>
                        <input 
                          type="date" 
                          className="form-input"
                          value={entry.cutoffDate}
                          onChange={(e) => updateSupplyChainBreakdown(entry.id, 'cutoffDate', e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Section 8: Additional Comments */}
                    <div style={{ 
                      backgroundColor: '#f5f5f5', 
                      padding: '20px', 
                      borderRadius: '8px' 
                    }}>
                      <h6 style={{ margin: '0 0 15px 0', color: '#495057' }}>
                        8. Additional Comments
                      </h6>
                      <div className="form-group">
                        <label className="form-label">Notes or clarifications regarding estimation methodology or data limitations</label>
                        <textarea 
                          className="form-textarea"
                          value={entry.additionalComments}
                          onChange={(e) => updateSupplyChainBreakdown(entry.id, 'additionalComments', e.target.value)}
                          placeholder="Enter any additional notes, clarifications, or limitations..."
                          rows={4}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="save-section">
              <button className="attachments-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <span>📎</span>
                <span>Attachments</span>
              </button>
              <button className="save-btn">SAVE</button>
            </div>
          </div>

          {/* Question 6f - Enhanced 8-Section Contextual Information */}
          <div className="question-section">
            <div className="question-header">
              <div className="question-number">6f</div>
              <div className="question-title">Contextual information, standards, methodologies, assumptions</div>
              <InfoIcon 
                title="Use primary data where possible. When primary data are unavailable, secondary or modeled data can be used but may be less accurate and may not reflect effectiveness of actions. Explain which information uses primary, secondary, or modeled data; limitations and datasets used; and any plans to improve accuracy."
                onClick={() => openGuidance("Use primary data where possible. When primary data are unavailable, secondary or modeled data can be used but may be less accurate and may not reflect effectiveness of actions. Explain which information uses primary, secondary, or modeled data; limitations and datasets used; and any plans to improve accuracy.")}
              />
              <div className="collaboration-icon">👥</div>
            </div>
            <div className="question-description">
              Report contextual information necessary to understand how the data has been compiled, including standards, methodologies, and assumptions used.
            </div>

            {/* Add Entry Button */}
            <div style={{ marginBottom: '20px' }}>
              <button 
                type="button"
                className="add-btn"
                onClick={addContextualInformation}
              >
                + ADD CONTEXTUAL INFORMATION
              </button>
            </div>

            {/* Contextual Information Management */}
            {contextualInformation.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px', 
                color: '#6c757d',
                border: '2px dashed #dee2e6',
                borderRadius: '8px'
              }}>
                <p>No contextual information added yet.</p>
                <p>Click "+ ADD CONTEXTUAL INFORMATION" to start documenting data compilation context.</p>
              </div>
            ) : (
              <div>
                {contextualInformation.map((entry, index) => (
                  <div key={entry.id} style={{ 
                    border: '1px solid #dee2e6', 
                    borderRadius: '12px', 
                    padding: '30px', 
                    marginBottom: '30px',
                    background: '#fff',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}>
                    
                    {/* Entry Header */}
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '30px',
                      paddingBottom: '15px',
                      borderBottom: '2px solid #e8f4fd'
                    }}>
                      <h5 style={{ margin: 0, color: '#0d47a1' }}>
                        Contextual Information #{index + 1}
                      </h5>
                      <button 
                        type="button"
                        onClick={() => removeContextualInformation(entry.id)}
                        style={{ 
                          padding: '8px 12px', 
                          border: '1px solid #dc3545', 
                          background: '#dc3545',
                          color: 'white',
                          cursor: 'pointer',
                          borderRadius: '4px'
                        }}
                      >
                        🗑️ Remove
                      </button>
                    </div>

                    {/* Section 1: Standards Applied */}
                    <div style={{ 
                      backgroundColor: '#f3e5f5', 
                      padding: '20px', 
                      borderRadius: '8px', 
                      marginBottom: '25px' 
                    }}>
                      <h6 style={{ margin: '0 0 15px 0', color: '#495057' }}>
                        1. Standards Applied
                      </h6>
            <div className="form-group">
                        <label className="form-label">International or internal standards used for data compilation:</label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '10px', marginTop: '10px' }}>
                          {standardsOptions.map(standard => (
                            <label key={standard} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <input 
                                type="checkbox"
                                checked={entry.standardsApplied.includes(standard)}
                                onChange={(e) => handleContextualCheckboxChange(entry.id, 'standardsApplied', standard, e.target.checked)}
                              />
                              {standard}
                            </label>
                          ))}
            </div>
                        {entry.standardsApplied.includes('Other') && (
                          <input 
                            type="text" 
                            className="form-input"
                            value={entry.standardsAppliedOther}
                            onChange={(e) => updateContextualInformation(entry.id, 'standardsAppliedOther', e.target.value)}
                            placeholder="Specify other standards..."
                            style={{ marginTop: '10px' }}
                          />
                        )}
                      </div>
                    </div>

                    {/* Section 2: Methodologies Used */}
                    <div style={{ 
                      backgroundColor: '#e8f5e8', 
                      padding: '20px', 
                      borderRadius: '8px', 
                      marginBottom: '25px' 
                    }}>
                      <h6 style={{ margin: '0 0 15px 0', color: '#495057' }}>
                        2. Methodologies Used
                      </h6>
                      <div className="form-group">
                        <label className="form-label">Methodologies employed to collect and analyze biodiversity data:</label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px', marginTop: '10px' }}>
                          {methodologiesOptions.map(methodology => (
                            <label key={methodology} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <input 
                                type="checkbox"
                                checked={entry.methodologiesUsed.includes(methodology)}
                                onChange={(e) => handleContextualCheckboxChange(entry.id, 'methodologiesUsed', methodology, e.target.checked)}
                              />
                              {methodology}
                            </label>
                          ))}
                        </div>
                        {entry.methodologiesUsed.includes('Other') && (
                          <input 
                            type="text" 
                            className="form-input"
                            value={entry.methodologiesUsedOther}
                            onChange={(e) => updateContextualInformation(entry.id, 'methodologiesUsedOther', e.target.value)}
                            placeholder="Specify other methodologies..."
                            style={{ marginTop: '10px' }}
                          />
                        )}
                      </div>
                      <div className="form-group" style={{ marginTop: '15px' }}>
                        <label className="form-label">Detailed description of methodologies</label>
                        <textarea 
                          className="form-textarea"
                          value={entry.methodologiesDescription}
                          onChange={(e) => updateContextualInformation(entry.id, 'methodologiesDescription', e.target.value)}
                          placeholder="Provide detailed description of methodologies used..."
                          rows={4}
                        />
                      </div>
                    </div>

                    {/* Section 3: Assumptions Made */}
                    <div style={{ 
                      backgroundColor: '#fff3cd', 
                      padding: '20px', 
                      borderRadius: '8px', 
                      marginBottom: '25px' 
                    }}>
                      <h6 style={{ margin: '0 0 15px 0', color: '#495057' }}>
                        3. Assumptions Made
                      </h6>
                      <div className="form-group">
                        <label className="form-label">Key assumptions or exclusions made during data collection and analysis</label>
                        <textarea 
                          className="form-textarea"
                          value={entry.assumptionsMade}
                          onChange={(e) => updateContextualInformation(entry.id, 'assumptionsMade', e.target.value)}
                          placeholder="List key assumptions such as use of proxy data, thresholds for materiality, excluded suppliers, etc..."
                          rows={5}
                        />
                      </div>
                    </div>

                    {/* Section 4: Data Sources and Evidence */}
                    <div style={{ 
                      backgroundColor: '#e3f2fd', 
                      padding: '20px', 
                      borderRadius: '8px', 
                      marginBottom: '25px' 
                    }}>
                      <h6 style={{ margin: '0 0 15px 0', color: '#495057' }}>
                        4. Data Sources and Evidence
                      </h6>
                      <div style={{ marginBottom: '15px' }}>
                        <button 
                          type="button"
                          onClick={() => addDataSource(entry.id)}
                          style={{ 
                            padding: '8px 16px', 
                            backgroundColor: '#2196f3', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '4px', 
                            cursor: 'pointer' 
                          }}
                        >
                          + Add Data Source
                        </button>
                      </div>
                      {entry.dataSources.length === 0 ? (
                        <p style={{ color: '#666', fontStyle: 'italic' }}>No data sources added yet.</p>
                      ) : (
                        <div>
                          {entry.dataSources.map((dataSource, dsIndex) => (
                            <div key={dataSource.id} style={{ 
                              backgroundColor: '#fff', 
                              padding: '15px', 
                              borderRadius: '6px', 
                              marginBottom: '15px',
                              border: '1px solid #e0e0e0'
                            }}>
                              <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center',
                                marginBottom: '15px'
                              }}>
                                <span style={{ margin: 0, fontWeight: 'bold' }}>Data Source #{dsIndex + 1}</span>
                                <button 
                                  type="button"
                                  onClick={() => removeDataSource(entry.id, dataSource.id)}
                                  style={{ 
                                    padding: '4px 8px', 
                                    backgroundColor: '#f44336', 
                                    color: 'white', 
                                    border: 'none', 
                                    borderRadius: '3px', 
                                    cursor: 'pointer',
                                    fontSize: '12px'
                                  }}
                                >
                                  Remove
                                </button>
                              </div>
                              <div className="form-row">
                                <div className="form-group">
                                  <label className="form-label">Source Name *</label>
                                  <input 
                                    type="text" 
                                    className="form-input"
                                    value={dataSource.sourceName}
                                    onChange={(e) => updateDataSource(entry.id, dataSource.id, 'sourceName', e.target.value)}
                                    placeholder="e.g., GBIF Database, Field Survey 2024"
                                  />
                                </div>
                                <div className="form-group">
                                  <label className="form-label">Source Type *</label>
                                  <select 
                                    className="form-select"
                                    value={dataSource.sourceType}
                                    onChange={(e) => updateDataSource(entry.id, dataSource.id, 'sourceType', e.target.value)}
                                  >
                                    <option value="">Select type</option>
                                    {sourceTypes.map(type => (
                                      <option key={type} value={type}>{type}</option>
                                    ))}
                                  </select>
                                </div>
                                <div className="form-group">
                                  <label className="form-label">Date</label>
                                  <input 
                                    type="date" 
                                    className="form-input"
                                    value={dataSource.date}
                                    onChange={(e) => updateDataSource(entry.id, dataSource.id, 'date', e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="form-row">
                                <div className="form-group">
                                  <label className="form-label">Documentation</label>
                                  <input 
                                    type="file" 
                                    className="form-input"
                                    onChange={(e) => updateDataSource(entry.id, dataSource.id, 'documentation', e.target.files?.[0] || null)}
                                  />
                                </div>
                                <div className="form-group">
                                  <label className="form-label">Link/Reference</label>
                                  <input 
                                    type="url" 
                                    className="form-input"
                                    value={dataSource.link}
                                    onChange={(e) => updateDataSource(entry.id, dataSource.id, 'link', e.target.value)}
                                    placeholder="https://..."
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Section 5: Data Quality and Limitations */}
                    <div style={{ 
                      backgroundColor: '#fce4ec', 
                      padding: '20px', 
                      borderRadius: '8px', 
                      marginBottom: '25px' 
                    }}>
                      <h6 style={{ margin: '0 0 15px 0', color: '#495057' }}>
                        5. Data Quality and Limitations
                      </h6>
                      <div className="form-group">
                        <label className="form-label">Known limitations, data gaps, or uncertainties:</label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px', marginTop: '10px' }}>
                          {dataQualityLimitationsOptions.map(limitation => (
                            <label key={limitation} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <input 
                                type="checkbox"
                                checked={entry.dataQualityLimitations.includes(limitation)}
                                onChange={(e) => handleContextualCheckboxChange(entry.id, 'dataQualityLimitations', limitation, e.target.checked)}
                              />
                              {limitation}
                            </label>
                          ))}
                        </div>
                        {entry.dataQualityLimitations.includes('Other') && (
                          <input 
                            type="text" 
                            className="form-input"
                            value={entry.dataQualityLimitationsOther}
                            onChange={(e) => updateContextualInformation(entry.id, 'dataQualityLimitationsOther', e.target.value)}
                            placeholder="Specify other limitations..."
                            style={{ marginTop: '10px' }}
                          />
                        )}
                      </div>
                      <div className="form-group" style={{ marginTop: '15px' }}>
                        <label className="form-label">Detailed description of data quality and limitations</label>
                        <textarea 
                          className="form-textarea"
                          value={entry.dataQualityDescription}
                          onChange={(e) => updateContextualInformation(entry.id, 'dataQualityDescription', e.target.value)}
                          placeholder="Provide detailed description of data quality issues, limitations, and mitigation measures..."
                          rows={4}
                        />
                      </div>
                    </div>

                    {/* Section 6: Stakeholder Engagement */}
                    <div style={{ 
                      backgroundColor: '#f0f8ff', 
                      padding: '20px', 
                      borderRadius: '8px', 
                      marginBottom: '25px' 
                    }}>
                      <h6 style={{ margin: '0 0 15px 0', color: '#495057' }}>
                        6. Stakeholder Engagement
                      </h6>
                      <div className="form-group">
                        <label className="form-label">How stakeholders were engaged regarding data compilation:</label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px', marginTop: '10px' }}>
                          {stakeholderEngagementTypesForContextual.map(engagement => (
                            <label key={engagement} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <input 
                                type="checkbox"
                                checked={entry.stakeholderEngagement.includes(engagement)}
                                onChange={(e) => handleContextualCheckboxChange(entry.id, 'stakeholderEngagement', engagement, e.target.checked)}
                              />
                              {engagement}
                            </label>
                          ))}
                        </div>
                        {entry.stakeholderEngagement.includes('Other') && (
                          <input 
                            type="text" 
                            className="form-input"
                            value={entry.stakeholderEngagementOther}
                            onChange={(e) => updateContextualInformation(entry.id, 'stakeholderEngagementOther', e.target.value)}
                            placeholder="Specify other engagement types..."
                            style={{ marginTop: '10px' }}
                          />
                        )}
                      </div>
                      <div className="form-group" style={{ marginTop: '15px' }}>
                        <label className="form-label">Description of stakeholder engagement</label>
                        <textarea 
                          className="form-textarea"
                          value={entry.stakeholderEngagementDescription}
                          onChange={(e) => updateContextualInformation(entry.id, 'stakeholderEngagementDescription', e.target.value)}
                          placeholder="Describe how stakeholders were engaged, their feedback, and how it influenced data compilation..."
                          rows={4}
                        />
                      </div>
                    </div>

                    {/* Section 7: Revision History & Updates */}
                    <div style={{ 
                      backgroundColor: '#fff8e1', 
                      padding: '20px', 
                      borderRadius: '8px', 
                      marginBottom: '25px' 
                    }}>
                      <h6 style={{ margin: '0 0 15px 0', color: '#495057' }}>
                        7. Revision History & Updates
                      </h6>
                      <div style={{ marginBottom: '15px' }}>
                        <button 
                          type="button"
                          onClick={() => addRevisionHistory(entry.id)}
                          style={{ 
                            padding: '8px 16px', 
                            backgroundColor: '#ff9800', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '4px', 
                            cursor: 'pointer' 
                          }}
                        >
                          + Add Revision
                        </button>
                      </div>
                      {entry.revisionHistory.length === 0 ? (
                        <p style={{ color: '#666', fontStyle: 'italic' }}>No revision history added yet.</p>
                      ) : (
                        <div>
                          {entry.revisionHistory.map((revision, revIndex) => (
                            <div key={revision.id} style={{ 
                              backgroundColor: '#fff', 
                              padding: '15px', 
                              borderRadius: '6px', 
                              marginBottom: '15px',
                              border: '1px solid #e0e0e0'
                            }}>
                              <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center',
                                marginBottom: '15px'
                              }}>
                                <span style={{ margin: 0, fontWeight: 'bold' }}>Revision #{revIndex + 1}</span>
                                <button 
                                  type="button"
                                  onClick={() => removeRevisionHistory(entry.id, revision.id)}
                                  style={{ 
                                    padding: '4px 8px', 
                                    backgroundColor: '#f44336', 
                                    color: 'white', 
                                    border: 'none', 
                                    borderRadius: '3px', 
                                    cursor: 'pointer',
                                    fontSize: '12px'
                                  }}
                                >
                                  Remove
                                </button>
                              </div>
                              <div className="form-row">
                                <div className="form-group">
                                  <label className="form-label">Date *</label>
                                  <input 
                                    type="date" 
                                    className="form-input"
                                    value={revision.date}
                                    onChange={(e) => updateRevisionHistory(entry.id, revision.id, 'date', e.target.value)}
                                  />
                                </div>
                                <div className="form-group">
                                  <label className="form-label">Author *</label>
                                  <input 
                                    type="text" 
                                    className="form-input"
                                    value={revision.author}
                                    onChange={(e) => updateRevisionHistory(entry.id, revision.id, 'author', e.target.value)}
                                    placeholder="e.g., John Smith, ESG Team"
                                  />
                                </div>
                              </div>
                              <div className="form-group">
                                <label className="form-label">Description *</label>
                                <textarea 
                                  className="form-textarea"
                                  value={revision.description}
                                  onChange={(e) => updateRevisionHistory(entry.id, revision.id, 'description', e.target.value)}
                                  placeholder="e.g., Updated methodology to include input-output models, Revised data sources to include new biodiversity database"
                                  rows={3}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Section 8: Additional Comments */}
                    <div style={{ 
                      backgroundColor: '#f5f5f5', 
                      padding: '20px', 
                      borderRadius: '8px' 
                    }}>
                      <h6 style={{ margin: '0 0 15px 0', color: '#495057' }}>
                        8. Additional Comments
                      </h6>
                      <div className="form-group">
                        <label className="form-label">Further information useful for understanding the data compilation</label>
                        <textarea 
                          className="form-textarea"
                          value={entry.additionalComments}
                          onChange={(e) => updateContextualInformation(entry.id, 'additionalComments', e.target.value)}
                          placeholder="Enter any additional contextual remarks, future improvement plans, or other relevant information..."
                          rows={5}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="save-section">
              <button className="attachments-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <span>📎</span>
                <span>Attachments</span>
              </button>
              <button className="save-btn">SAVE</button>
            </div>
          </div>

          {/* Question 7a - Enhanced Dynamic Table with 5a Linkage */}
          <div className="question-section">
            <div className="question-header">
              <div className="question-number">7a</div>
              <div className="question-title">Changes to the state of biodiversity - Affected or potentially affected ecosystems</div>
              <InfoIcon 
                title="For each site reported under 101-5-a, report information on affected or potentially affected ecosystems. Consider all ecosystem types in the area that is or could be affected by activities, including beyond sites if relevant. The state of the overall ecosystem beyond areas affected by the organization is not required. Report ecosystem type, size, and condition for base year and current reporting period."
                onClick={() => openGuidance("For each site reported under 101-5-a, report information on affected or potentially affected ecosystems. Consider all ecosystem types in the area that is or could be affected by activities, including beyond sites if relevant. The state of the overall ecosystem beyond areas affected by the organization is not required. Report ecosystem type, size, and condition for base year and current reporting period.")}
              />
              <div className="collaboration-icon">👥</div>
            </div>
            <div className="question-description">
              For each site reported under 101-5-a, report the following information on affected or potentially affected ecosystems
            </div>

            {/* Site Master Reference from 5a */}
            {biodiversityLocations.length > 0 && (
              <div style={{ 
                backgroundColor: '#e8f4fd', 
                padding: '15px', 
                borderRadius: '8px', 
                marginBottom: '20px',
                border: '1px solid #90caf9'
              }}>
                <h6 style={{ margin: '0 0 10px 0', color: '#1565c0' }}>
                  📍 Available Sites (from Question 5a)
                </h6>
                <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#424242' }}>
                  Report ecosystem information for the following sites:
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {biodiversityLocations.map(location => (
                    <span key={location.id} style={{ 
                      backgroundColor: '#fff', 
                      padding: '4px 8px', 
                      borderRadius: '4px',
                      fontSize: '12px',
                      border: '1px solid #e0e0e0'
                    }}>
                      {location.siteName || 'Unnamed Site'}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Add Entry Button */}
            <div style={{ marginBottom: '20px' }}>
              <button 
                type="button"
                className="add-btn"
                onClick={addAffectedEcosystem}
                disabled={biodiversityLocations.length === 0}
              >
                + ADD SITE ECOSYSTEM
              </button>
              {biodiversityLocations.length === 0 && (
                <p style={{ fontSize: '12px', color: '#f44336', marginTop: '5px' }}>
                  Please add sites in Question 5a before reporting ecosystem information.
                </p>
              )}
            </div>

            {/* Affected Ecosystems Management */}
            {affectedEcosystems.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px', 
                color: '#6c757d',
                border: '2px dashed #dee2e6',
                borderRadius: '8px'
              }}>
                <p>No affected ecosystem data added yet.</p>
                <p>Click "+ ADD SITE ECOSYSTEM" to start reporting ecosystem information for sites from 5a.</p>
              </div>
            ) : (
              <div>
                {affectedEcosystems.map((entry, index) => (
                  <div key={entry.id} style={{ 
                    border: '1px solid #dee2e6', 
                    borderRadius: '12px', 
                    padding: '25px', 
                    marginBottom: '25px',
                    background: '#fff',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    
                    {/* Entry Header */}
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '25px',
                      paddingBottom: '15px',
                      borderBottom: '2px solid #e8f4fd'
                    }}>
                      <h5 style={{ margin: 0, color: '#1565c0' }}>
                        Site #{index + 1}
                        {entry.siteReference && ` - ${entry.siteReference}`}
                      </h5>
                      <button 
                        type="button"
                        onClick={() => removeAffectedEcosystem(entry.id)}
                        style={{ 
                          padding: '8px 12px', 
                          border: '1px solid #dc3545', 
                          background: '#dc3545',
                          color: 'white',
                          cursor: 'pointer',
                          borderRadius: '4px'
                        }}
                      >
                        🗑️ Remove
                      </button>
                    </div>

                    {/* Site Reference */}
                    <div className="form-group" style={{ marginBottom: '25px' }}>
                      <label className="form-label">Site Reference (from 5a) *</label>
                      <select 
                        className="form-select"
                        value={entry.siteReference}
                        onChange={(e) => updateAffectedEcosystem(entry.id, 'siteReference', e.target.value)}
                        required
                        style={{ fontWeight: 'bold', backgroundColor: '#f8f9fa' }}
                      >
                        <option value="">Select a site from 5a</option>
                        {biodiversityLocations.map(location => (
                          <option key={location.id} value={location.siteName}>
                            {location.siteName} ({location.locationCoordinates})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* 7a i - Ecosystem type for base year */}
                    <div style={{ 
                      backgroundColor: '#f3e5f5', 
                      padding: '20px', 
                      borderRadius: '8px', 
                      marginBottom: '20px' 
                    }}>
                      <h6 style={{ margin: '0 0 15px 0', color: '#495057', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        7a i - The ecosystem type for the base year
                <InfoIcon 
                  title="Report which ecosystem classification is used to identify types of ecosystems. Can use biomes or ecosystem functional groups in the IUCN Global Ecosystem Typology. Alternatively, can report according to another global classification, national classification, or register. If ecosystem classifications cannot be used, can use land use classifications (e.g., Globio land use categories) instead."
                  onClick={() => openGuidance("Report which ecosystem classification is used to identify types of ecosystems. Can use biomes or ecosystem functional groups in the IUCN Global Ecosystem Typology. Alternatively, can report according to another global classification, national classification, or register. If ecosystem classifications cannot be used, can use land use classifications (e.g., Globio land use categories) instead.")}
                />
                      </h6>
              <div className="form-group">
                        <label className="form-label">Ecosystem Type (Base Year) *</label>
                        <textarea 
                          className="form-textarea"
                          value={entry.ecosystemTypeBaseYear}
                          onChange={(e) => updateAffectedEcosystem(entry.id, 'ecosystemTypeBaseYear', e.target.value)}
                          placeholder="Describe ecosystem type for base year (e.g., Tropical rainforest, Temperate grassland, Marine coastal ecosystem)..."
                          rows={4}
                          required
                        />
              </div>
            </div>

                    {/* 7a ii - Ecosystem size for base year */}
                    <div style={{ 
                      backgroundColor: '#e8f5e8', 
                      padding: '20px', 
                      borderRadius: '8px', 
                      marginBottom: '20px' 
                    }}>
                      <h6 style={{ margin: '0 0 15px 0', color: '#495057', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        7a ii - The ecosystem size in hectares for the base year
                <InfoIcon 
                  title="Ecosystem size, also referred to as ecosystem extent, is the area coverage of the ecosystem that is affected or potentially affected by the organization's activities. This is a fixed area over which the condition of the ecosystem is measured over time."
                  onClick={() => openGuidance("Ecosystem size, also referred to as ecosystem extent, is the area coverage of the ecosystem that is affected or potentially affected by the organization's activities. This is a fixed area over which the condition of the ecosystem is measured over time.")}
                />
                      </h6>
              <div className="form-group">
                        <label className="form-label">Ecosystem Size (Hectares - Base Year) *</label>
                        <input 
                          type="number" 
                          className="form-input"
                          value={entry.ecosystemSizeBaseYear}
                          onChange={(e) => updateAffectedEcosystem(entry.id, 'ecosystemSizeBaseYear', e.target.value === '' ? '' : Number(e.target.value))}
                          placeholder="Enter ecosystem size in hectares"
                          min="0"
                          step="0.01"
                          required
                        />
              </div>
            </div>

                    {/* 7a iii - Ecosystem condition for base year and current period */}
                    <div style={{ 
                      backgroundColor: '#fff3cd', 
                      padding: '20px', 
                      borderRadius: '8px' 
                    }}>
                      <h6 style={{ margin: '0 0 15px 0', color: '#495057', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        7a iii - The ecosystem condition for the base year and the current reporting period
                <InfoIcon 
                  title="Ecosystem condition is the quality of an ecosystem measured by its living and non-living characteristics against a reference condition. Living and non-living characteristics include: the ecosystem's composition, function, and structure; the landscape characteristics (e.g., connectivity); and the physical and chemical state characteristics (e.g., soil structure and soil nutrient levels). Ecosystem condition can also provide information on the ecosystem's capacity to supply ecosystem services now and in the future."
                  onClick={() => openGuidance("Ecosystem condition is the quality of an ecosystem measured by its living and non-living characteristics against a reference condition. Living and non-living characteristics include: the ecosystem's composition, function, and structure; the landscape characteristics (e.g., connectivity); and the physical and chemical state characteristics (e.g., soil structure and soil nutrient levels). Ecosystem condition can also provide information on the ecosystem's capacity to supply ecosystem services now and in the future.")}
                />
                      </h6>
                      <div className="form-group" style={{ marginBottom: '15px' }}>
                        <label className="form-label">Ecosystem Condition (Base Year) *</label>
                        <textarea 
                          className="form-textarea"
                          value={entry.ecosystemConditionBaseYear}
                          onChange={(e) => updateAffectedEcosystem(entry.id, 'ecosystemConditionBaseYear', e.target.value)}
                          placeholder="Describe ecosystem condition for base year (composition, function, structure, connectivity, physical/chemical characteristics)..."
                          rows={4}
                          required
                />
              </div>
              <div className="form-group">
                        <label className="form-label">Ecosystem Condition (Current Reporting Period) *</label>
                        <textarea 
                          className="form-textarea"
                          value={entry.ecosystemConditionCurrentPeriod}
                          onChange={(e) => updateAffectedEcosystem(entry.id, 'ecosystemConditionCurrentPeriod', e.target.value)}
                          placeholder="Describe ecosystem condition for current reporting period (changes in composition, function, structure, connectivity, physical/chemical characteristics)..."
                          rows={4}
                          required
                        />
              </div>
              </div>
                  </div>
                ))}
              </div>
            )}

              <div className="save-section">
                <button className="attachments-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <span>📎</span>
                  <span>Attachments</span>
                </button>
                <button className="save-btn">SAVE</button>
            </div>
          </div>

          {/* Question 7b - Enhanced 8-Section Biodiversity Data Compilation Context */}
          <div className="question-section">
            <div className="question-header">
              <div className="question-number">7b</div>
              <div className="question-title">Contextual information necessary to understand how the data has been compiled</div>
              <InfoIcon 
                title="Use primary data to report on direct drivers where possible (e.g., data collected through field surveys, eDNA, or derived from satellite imagery). When primary data is unavailable, can use secondary or modeled data. Should explain which information draws on primary, secondary, or modeled data, as well as any limitations of methodologies and data used. When reporting secondary or modeled data, should report which datasets it has used and if it plans to improve the accuracy of data."
                onClick={() => openGuidance("Use primary data to report on direct drivers where possible (e.g., data collected through field surveys, eDNA, or derived from satellite imagery). When primary data is unavailable, can use secondary or modeled data. Should explain which information draws on primary, secondary, or modeled data, as well as any limitations of methodologies and data used. When reporting secondary or modeled data, should report which datasets it has used and if it plans to improve the accuracy of data.")}
              />
              <div className="collaboration-icon">👥</div>
            </div>
            <div className="question-description">
              Report contextual information necessary to understand how the data has been compiled, including standards, methodologies, and assumptions used
            </div>

            {/* Add Entry Button */}
            <div style={{ marginBottom: '20px' }}>
              <button 
                type="button"
                className="add-btn"
                onClick={addBiodiversityDataContext}
              >
                + ADD DATA COMPILATION CONTEXT
              </button>
            </div>

            {/* Biodiversity Data Context Management */}
            {biodiversityDataContext.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px', 
                color: '#6c757d',
                border: '2px dashed #dee2e6',
                borderRadius: '8px'
              }}>
                <p>No biodiversity data compilation context added yet.</p>
                <p>Click "+ ADD DATA COMPILATION CONTEXT" to start documenting how biodiversity data has been compiled.</p>
              </div>
            ) : (
              <div>
                {biodiversityDataContext.map((entry, index) => (
                  <div key={entry.id} style={{ 
                    border: '1px solid #dee2e6', 
                    borderRadius: '12px', 
                    padding: '30px', 
                    marginBottom: '30px',
                    background: '#fff',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}>
                    
                    {/* Entry Header */}
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '30px',
                      paddingBottom: '15px',
                      borderBottom: '2px solid #e8f4fd'
                    }}>
                      <h5 style={{ margin: 0, color: '#0d47a1' }}>
                        Data Compilation Context #{index + 1}
                      </h5>
                      <button 
                        type="button"
                        onClick={() => removeBiodiversityDataContext(entry.id)}
                        style={{ 
                          padding: '8px 12px', 
                          border: '1px solid #dc3545', 
                          background: '#dc3545',
                          color: 'white',
                          cursor: 'pointer',
                          borderRadius: '4px'
                        }}
                      >
                        🗑️ Remove
                      </button>
                    </div>

                    {/* Section 1: Applicable Standards */}
                    <div style={{ 
                      backgroundColor: '#f3e5f5', 
                      padding: '20px', 
                      borderRadius: '8px', 
                      marginBottom: '25px' 
                    }}>
                      <h6 style={{ margin: '0 0 15px 0', color: '#495057' }}>
                        1. Applicable Standards
                      </h6>
            <div className="form-group">
                        <label className="form-label">Which reporting or environmental standards have you followed?</label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '10px', marginTop: '10px' }}>
                          {standardsOptions.map(standard => (
                            <label key={standard} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <input 
                                type="checkbox"
                                checked={entry.applicableStandards.includes(standard)}
                                onChange={(e) => handleBiodiversityDataCheckboxChange(entry.id, 'applicableStandards', standard, e.target.checked)}
                              />
                              {standard}
                            </label>
                          ))}
            </div>
                        {entry.applicableStandards.includes('Other') && (
                          <input 
                            type="text" 
                            className="form-input"
                            value={entry.applicableStandardsOther}
                            onChange={(e) => updateBiodiversityDataContext(entry.id, 'applicableStandardsOther', e.target.value)}
                            placeholder="Specify other standards..."
                            style={{ marginTop: '10px' }}
                          />
                        )}
                      </div>
                    </div>

                    {/* Section 2: Data Collection Methodologies */}
                    <div style={{ 
                      backgroundColor: '#e8f5e8', 
                      padding: '20px', 
                      borderRadius: '8px', 
                      marginBottom: '25px' 
                    }}>
                      <h6 style={{ margin: '0 0 15px 0', color: '#495057' }}>
                        2. Data Collection Methodologies
                      </h6>
            <div className="form-group">
                        <label className="form-label">How was the biodiversity data collected and analyzed?</label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px', marginTop: '10px' }}>
                          {methodologiesOptions.map(methodology => (
                            <label key={methodology} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <input 
                                type="checkbox"
                                checked={entry.dataCollectionMethodologies.includes(methodology)}
                                onChange={(e) => handleBiodiversityDataCheckboxChange(entry.id, 'dataCollectionMethodologies', methodology, e.target.checked)}
                              />
                              {methodology}
                            </label>
                          ))}
            </div>
                        {entry.dataCollectionMethodologies.includes('Other') && (
                          <input 
                            type="text" 
                            className="form-input"
                            value={entry.dataCollectionMethodologiesOther}
                            onChange={(e) => updateBiodiversityDataContext(entry.id, 'dataCollectionMethodologiesOther', e.target.value)}
                            placeholder="Specify other methodologies..."
                            style={{ marginTop: '10px' }}
                          />
                        )}
                      </div>
                      <div className="form-group" style={{ marginTop: '15px' }}>
                        <label className="form-label">Detailed description of data collection and analysis</label>
                        <textarea 
                          className="form-textarea"
                          value={entry.dataCollectionDescription}
                          onChange={(e) => updateBiodiversityDataContext(entry.id, 'dataCollectionDescription', e.target.value)}
                          placeholder="Provide detailed description of how biodiversity data was collected and analyzed..."
                          rows={4}
                        />
                      </div>
                    </div>

                    {/* Section 3: Key Assumptions Made */}
                    <div style={{ 
                      backgroundColor: '#fff3cd', 
                      padding: '20px', 
                      borderRadius: '8px', 
                      marginBottom: '25px' 
                    }}>
                      <h6 style={{ margin: '0 0 15px 0', color: '#495057' }}>
                        3. Key Assumptions Made
                      </h6>
            <div className="form-group">
                        <label className="form-label">Please list any important assumptions or limitations in the data</label>
                        <textarea 
                          className="form-textarea"
                          value={entry.keyAssumptions}
                          onChange={(e) => updateBiodiversityDataContext(entry.id, 'keyAssumptions', e.target.value)}
                          placeholder="List key assumptions such as use of proxy data, estimation methods, excluded suppliers, geographic limitations, temporal assumptions, etc..."
                          rows={5}
                        />
            </div>
                    </div>

                    {/* Section 4: Data Sources & Evidence */}
                    <div style={{ 
                      backgroundColor: '#e3f2fd', 
                      padding: '20px', 
                      borderRadius: '8px', 
                      marginBottom: '25px' 
                    }}>
                      <h6 style={{ margin: '0 0 15px 0', color: '#495057' }}>
                        4. Data Sources & Evidence
                      </h6>
                      <div style={{ marginBottom: '15px' }}>
                        <button 
                          type="button"
                          onClick={() => addBiodiversityDataSource(entry.id)}
                          style={{ 
                            padding: '8px 16px', 
                            backgroundColor: '#2196f3', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '4px', 
                            cursor: 'pointer' 
                          }}
                        >
                          + Add Data Source
                        </button>
                      </div>
                      {entry.biodiversityDataSources.length === 0 ? (
                        <p style={{ color: '#666', fontStyle: 'italic' }}>No data sources added yet.</p>
                      ) : (
                        <div>
                          {entry.biodiversityDataSources.map((dataSource, dsIndex) => (
                            <div key={dataSource.id} style={{ 
                              backgroundColor: '#fff', 
                              padding: '15px', 
                              borderRadius: '6px', 
                              marginBottom: '15px',
                              border: '1px solid #e0e0e0'
                            }}>
                              <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center',
                                marginBottom: '15px'
                              }}>
                                <span style={{ margin: 0, fontWeight: 'bold' }}>Data Source #{dsIndex + 1}</span>
                                <button 
                                  type="button"
                                  onClick={() => removeBiodiversityDataSource(entry.id, dataSource.id)}
                                  style={{ 
                                    padding: '4px 8px', 
                                    backgroundColor: '#f44336', 
                                    color: 'white', 
                                    border: 'none', 
                                    borderRadius: '3px', 
                                    cursor: 'pointer',
                                    fontSize: '12px'
                                  }}
                                >
                                  Remove
                                </button>
                              </div>
                              <div className="form-row">
                                <div className="form-group">
                                  <label className="form-label">Source Name *</label>
                                  <input 
                                    type="text" 
                                    className="form-input"
                                    value={dataSource.sourceName}
                                    onChange={(e) => updateBiodiversityDataSource(entry.id, dataSource.id, 'sourceName', e.target.value)}
                                    placeholder="e.g., GBIF Database, Field Survey 2024, Supplier Assessment"
                                  />
                                </div>
                                <div className="form-group">
                                  <label className="form-label">Source Type *</label>
                                  <select 
                                    className="form-select"
                                    value={dataSource.sourceType}
                                    onChange={(e) => updateBiodiversityDataSource(entry.id, dataSource.id, 'sourceType', e.target.value)}
                                  >
                                    <option value="">Select type</option>
                                    {sourceTypes.map(type => (
                                      <option key={type} value={type}>{type}</option>
                                    ))}
                                  </select>
                                </div>
                                <div className="form-group">
                                  <label className="form-label">Date</label>
                                  <input 
                                    type="date" 
                                    className="form-input"
                                    value={dataSource.date}
                                    onChange={(e) => updateBiodiversityDataSource(entry.id, dataSource.id, 'date', e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="form-row">
                                <div className="form-group">
                                  <label className="form-label">Documentation</label>
                                  <input 
                                    type="file" 
                                    className="form-input"
                                    onChange={(e) => updateBiodiversityDataSource(entry.id, dataSource.id, 'documentation', e.target.files?.[0] || null)}
                                  />
                                </div>
                                <div className="form-group">
                                  <label className="form-label">Link/Reference</label>
                                  <input 
                                    type="url" 
                                    className="form-input"
                                    value={dataSource.link}
                                    onChange={(e) => updateBiodiversityDataSource(entry.id, dataSource.id, 'link', e.target.value)}
                                    placeholder="https://..."
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Section 5: Data Quality and Limitations */}
                    <div style={{ 
                      backgroundColor: '#fce4ec', 
                      padding: '20px', 
                      borderRadius: '8px', 
                      marginBottom: '25px' 
                    }}>
                      <h6 style={{ margin: '0 0 15px 0', color: '#495057' }}>
                        5. Data Quality and Limitations
                      </h6>
                      <div className="form-group">
                        <label className="form-label">Are there any known gaps, uncertainties, or data quality issues?</label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px', marginTop: '10px' }}>
                          {dataQualityLimitationsOptions.map(limitation => (
                            <label key={limitation} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <input 
                                type="checkbox"
                                checked={entry.dataQualityLimitations.includes(limitation)}
                                onChange={(e) => handleBiodiversityDataCheckboxChange(entry.id, 'dataQualityLimitations', limitation, e.target.checked)}
                              />
                              {limitation}
                            </label>
                          ))}
                        </div>
                        {entry.dataQualityLimitations.includes('Other') && (
                          <input 
                            type="text" 
                            className="form-input"
                            value={entry.dataQualityLimitationsOther}
                            onChange={(e) => updateBiodiversityDataContext(entry.id, 'dataQualityLimitationsOther', e.target.value)}
                            placeholder="Specify other limitations..."
                            style={{ marginTop: '10px' }}
                          />
                        )}
                      </div>
                      <div className="form-group" style={{ marginTop: '15px' }}>
                        <label className="form-label">Detailed description of data quality and limitations</label>
                        <textarea 
                          className="form-textarea"
                          value={entry.dataQualityDescription}
                          onChange={(e) => updateBiodiversityDataContext(entry.id, 'dataQualityDescription', e.target.value)}
                          placeholder="Provide detailed description of data quality issues, limitations, and mitigation measures..."
                          rows={4}
                        />
                      </div>
                    </div>

                    {/* Section 6: Stakeholder Engagement */}
                    <div style={{ 
                      backgroundColor: '#f0f8ff', 
                      padding: '20px', 
                      borderRadius: '8px', 
                      marginBottom: '25px' 
                    }}>
                      <h6 style={{ margin: '0 0 15px 0', color: '#495057' }}>
                        6. Stakeholder Engagement
                      </h6>
                      <div className="form-group">
                        <label className="form-label">Did you engage with stakeholders for data validation or input?</label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px', marginTop: '10px' }}>
                          {stakeholderEngagementTypesForContextual.map(engagement => (
                            <label key={engagement} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <input 
                                type="checkbox"
                                checked={entry.stakeholderEngagement.includes(engagement)}
                                onChange={(e) => handleBiodiversityDataCheckboxChange(entry.id, 'stakeholderEngagement', engagement, e.target.checked)}
                              />
                              {engagement}
                            </label>
                          ))}
                        </div>
                        {entry.stakeholderEngagement.includes('Other') && (
                          <input 
                            type="text" 
                            className="form-input"
                            value={entry.stakeholderEngagementOther}
                            onChange={(e) => updateBiodiversityDataContext(entry.id, 'stakeholderEngagementOther', e.target.value)}
                            placeholder="Specify other engagement types..."
                            style={{ marginTop: '10px' }}
                          />
                        )}
                      </div>
                      <div className="form-group" style={{ marginTop: '15px' }}>
                        <label className="form-label">Description of stakeholder engagement</label>
                        <textarea 
                          className="form-textarea"
                          value={entry.stakeholderEngagementDescription}
                          onChange={(e) => updateBiodiversityDataContext(entry.id, 'stakeholderEngagementDescription', e.target.value)}
                          placeholder="Describe how stakeholders were engaged, their feedback, and how it influenced data compilation..."
                          rows={4}
                        />
                      </div>
                    </div>

                    {/* Section 7: Changes and Updates */}
                    <div style={{ 
                      backgroundColor: '#fff8e1', 
                      padding: '20px', 
                      borderRadius: '8px', 
                      marginBottom: '25px' 
                    }}>
                      <h6 style={{ margin: '0 0 15px 0', color: '#495057' }}>
                        7. Changes and Updates
                      </h6>
                      <div style={{ marginBottom: '15px' }}>
                        <button 
                          type="button"
                          onClick={() => addChangesAndUpdates(entry.id)}
                          style={{ 
                            padding: '8px 16px', 
                            backgroundColor: '#ff9800', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '4px', 
                            cursor: 'pointer' 
                          }}
                        >
                          + Add Change/Update
                        </button>
                      </div>
                      {entry.changesAndUpdates.length === 0 ? (
                        <p style={{ color: '#666', fontStyle: 'italic' }}>No changes or updates recorded yet.</p>
                      ) : (
                        <div>
                          {entry.changesAndUpdates.map((update, updateIndex) => (
                            <div key={update.id} style={{ 
                              backgroundColor: '#fff', 
                              padding: '15px', 
                              borderRadius: '6px', 
                              marginBottom: '15px',
                              border: '1px solid #e0e0e0'
                            }}>
                              <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center',
                                marginBottom: '15px'
                              }}>
                                <span style={{ margin: 0, fontWeight: 'bold' }}>Update #{updateIndex + 1}</span>
                                <button 
                                  type="button"
                                  onClick={() => removeChangesAndUpdates(entry.id, update.id)}
                                  style={{ 
                                    padding: '4px 8px', 
                                    backgroundColor: '#f44336', 
                                    color: 'white', 
                                    border: 'none', 
                                    borderRadius: '3px', 
                                    cursor: 'pointer',
                                    fontSize: '12px'
                                  }}
                                >
                                  Remove
                                </button>
                              </div>
                              <div className="form-row">
                                <div className="form-group">
                                  <label className="form-label">Date *</label>
                                  <input 
                                    type="date" 
                                    className="form-input"
                                    value={update.date}
                                    onChange={(e) => updateChangesAndUpdates(entry.id, update.id, 'date', e.target.value)}
                                  />
                                </div>
                                <div className="form-group">
                                  <label className="form-label">Author *</label>
                                  <input 
                                    type="text" 
                                    className="form-input"
                                    value={update.author}
                                    onChange={(e) => updateChangesAndUpdates(entry.id, update.id, 'author', e.target.value)}
                                    placeholder="e.g., John Smith, ESG Team"
                                  />
                                </div>
                              </div>
                              <div className="form-group">
                                <label className="form-label">Description *</label>
                                <textarea 
                                  className="form-textarea"
                                  value={update.description}
                                  onChange={(e) => updateChangesAndUpdates(entry.id, update.id, 'description', e.target.value)}
                                  placeholder="e.g., Updated methodology to include field surveys, Revised data sources to include new biodiversity database"
                                  rows={3}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Section 8: Additional Context */}
                    <div style={{ 
                      backgroundColor: '#f5f5f5', 
                      padding: '20px', 
                      borderRadius: '8px' 
                    }}>
                      <h6 style={{ margin: '0 0 15px 0', color: '#495057' }}>
                        8. Additional Context
                      </h6>
                      <div className="form-group">
                        <label className="form-label">Any other information important to understand the data compilation</label>
                        <textarea 
                          className="form-textarea"
                          value={entry.additionalContext}
                          onChange={(e) => updateBiodiversityDataContext(entry.id, 'additionalContext', e.target.value)}
                          placeholder="Enter any additional contextual information, narrative or supplementary info that helps understand how biodiversity data was compiled..."
                          rows={5}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="save-section">
              <button className="attachments-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <span>📎</span>
                <span>Attachments</span>
              </button>
              <button className="save-btn">SAVE</button>
            </div>
          </div>

          {/* Question 8a - Enhanced Dynamic Table with 5a Site Linkage */}
          <div className="question-section">
            <div className="question-header">
              <div className="question-number">8a</div>
              <div className="question-title">Ecosystem services - List of ecosystem services and beneficiaries</div>
              <InfoIcon 
                title="For each site reported under 101-5-a, list the ecosystem services and beneficiaries affected or potentially affected by the organization's activities. Beneficiaries can include Indigenous Peoples, local communities, and other organizations. The reporting organization can also be one of the beneficiaries. Can report the number of beneficiaries (e.g., 50 farmers located in the area). Should describe the approach used to identify ecosystem services, including stakeholder engagement and methodologies like ENCORE tool, Natural Capital Protocol, TNFD LEAP approach, or WRI Corporate Ecosystem Services Review."
                onClick={() => openGuidance("For each site reported under 101-5-a, list the ecosystem services and beneficiaries affected or potentially affected by the organization's activities. Beneficiaries can include Indigenous Peoples, local communities, and other organizations. The reporting organization can also be one of the beneficiaries. Can report the number of beneficiaries (e.g., 50 farmers located in the area). Should describe the approach used to identify ecosystem services, including stakeholder engagement and methodologies like ENCORE tool, Natural Capital Protocol, TNFD LEAP approach, or WRI Corporate Ecosystem Services Review.")}
              />
              <div className="collaboration-icon">👥</div>
            </div>
            <div className="question-description">
              For each site reported under 101-5-a, list the ecosystem services and beneficiaries affected or potentially affected by the organization's activities
            </div>

            {/* Site Master Reference from 5a */}
            {biodiversityLocations.length > 0 && (
              <div style={{ 
                backgroundColor: '#e8f4fd', 
                padding: '15px', 
                borderRadius: '8px', 
                marginBottom: '20px',
                border: '1px solid #90caf9'
              }}>
                <h6 style={{ margin: '0 0 10px 0', color: '#1565c0' }}>
                  📍 Available Sites (from Question 5a)
                </h6>
                <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#424242' }}>
                  Report ecosystem services and beneficiaries for the following sites:
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {biodiversityLocations.map(location => (
                    <span key={location.id} style={{ 
                      backgroundColor: '#fff', 
                      padding: '4px 8px', 
                      borderRadius: '4px',
                      fontSize: '12px',
                      border: '1px solid #e0e0e0'
                    }}>
                      {location.siteName || 'Unnamed Site'}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Add Entry Button */}
            <div style={{ marginBottom: '20px' }}>
              <button 
                type="button"
                className="add-btn"
                onClick={addEcosystemServicesBeneficiaries}
                disabled={biodiversityLocations.length === 0}
              >
                + ADD SITE ECOSYSTEM SERVICES
              </button>
              {biodiversityLocations.length === 0 && (
                <p style={{ fontSize: '12px', color: '#f44336', marginTop: '5px' }}>
                  Please add sites in Question 5a before reporting ecosystem services and beneficiaries.
                </p>
              )}
            </div>

            {/* Ecosystem Services and Beneficiaries Management */}
            {ecosystemServicesBeneficiaries.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px', 
                color: '#6c757d',
                border: '2px dashed #dee2e6',
                borderRadius: '8px'
              }}>
                <p>No ecosystem services and beneficiaries data added yet.</p>
                <p>Click "+ ADD SITE ECOSYSTEM SERVICES" to start reporting ecosystem services for sites from 5a.</p>
              </div>
            ) : (
              <div>
                {ecosystemServicesBeneficiaries.map((entry, index) => (
                  <div key={entry.id} style={{ 
                    border: '1px solid #dee2e6', 
                    borderRadius: '12px', 
                    padding: '25px', 
                    marginBottom: '25px',
                    background: '#fff',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    
                    {/* Entry Header */}
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '25px',
                      paddingBottom: '15px',
                      borderBottom: '2px solid #e8f4fd'
                    }}>
                      <h5 style={{ margin: 0, color: '#1565c0' }}>
                        Site #{index + 1}
                        {entry.siteReference && ` - ${entry.siteReference}`}
                      </h5>
                      <button 
                        type="button"
                        onClick={() => removeEcosystemServicesBeneficiaries(entry.id)}
                        style={{ 
                          padding: '8px 12px', 
                          border: '1px solid #dc3545', 
                          background: '#dc3545',
                          color: 'white',
                          cursor: 'pointer',
                          borderRadius: '4px'
                        }}
                      >
                        🗑️ Remove
                      </button>
                    </div>

                    {/* Site Reference */}
                    <div className="form-group" style={{ marginBottom: '25px' }}>
                      <label className="form-label">Site Reference (from 5a) *</label>
                      <select 
                        className="form-select"
                        value={entry.siteReference}
                        onChange={(e) => updateEcosystemServicesBeneficiaries(entry.id, 'siteReference', e.target.value)}
                        required
                        style={{ fontWeight: 'bold', backgroundColor: '#f8f9fa' }}
                      >
                        <option value="">Select a site from 5a</option>
                        {biodiversityLocations.map(location => (
                          <option key={location.id} value={location.siteName}>
                            {location.siteName} ({location.locationCoordinates})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Ecosystem Services */}
                    <div style={{ 
                      backgroundColor: '#e8f5e8', 
                      padding: '20px', 
                      borderRadius: '8px', 
                      marginBottom: '20px' 
                    }}>
                      <h6 style={{ margin: '0 0 15px 0', color: '#495057' }}>
                        Ecosystem Services Affected or Potentially Affected
                      </h6>
            <div className="form-group">
                        <label className="form-label">List of ecosystem services *</label>
                        <textarea 
                          className="form-textarea"
                          value={entry.ecosystemServices}
                          onChange={(e) => updateEcosystemServicesBeneficiaries(entry.id, 'ecosystemServices', e.target.value)}
                          placeholder="List ecosystem services affected (e.g., Water purification, Flood control, Food provisioning, Carbon storage, Pollination, Habitat provision, Recreation, Cultural services)..."
                          rows={5}
                          required
                        />
                      </div>
                    </div>

                    {/* Beneficiaries */}
                    <div style={{ 
                      backgroundColor: '#fff3cd', 
                      padding: '20px', 
                      borderRadius: '8px', 
                      marginBottom: '20px' 
                    }}>
                      <h6 style={{ margin: '0 0 15px 0', color: '#495057' }}>
                        Beneficiaries Affected or Potentially Affected
                      </h6>
                      <div className="form-group" style={{ marginBottom: '15px' }}>
                        <label className="form-label">Beneficiaries description *</label>
                        <textarea 
                          className="form-textarea"
                          value={entry.beneficiaries}
                          onChange={(e) => updateEcosystemServicesBeneficiaries(entry.id, 'beneficiaries', e.target.value)}
                          placeholder="Describe beneficiaries (e.g., Indigenous Peoples, local communities, farmers, fishing communities, urban populations, the organization itself, downstream communities)..."
                          rows={4}
                          required
                        />
            </div>
            <div className="form-group">
                        <label className="form-label">Number of beneficiaries (optional)</label>
                        <input 
                          type="number" 
                          className="form-input"
                          value={entry.numberOfBeneficiaries}
                          onChange={(e) => updateEcosystemServicesBeneficiaries(entry.id, 'numberOfBeneficiaries', e.target.value === '' ? '' : Number(e.target.value))}
                          placeholder="e.g., 500 farmers, 1200 community members"
                          min="0"
                        />
                      </div>
                    </div>

                    {/* Approach Used to Identify Ecosystem Services */}
                    <div style={{ 
                      backgroundColor: '#f3e5f5', 
                      padding: '20px', 
                      borderRadius: '8px' 
                    }}>
                      <h6 style={{ margin: '0 0 15px 0', color: '#495057' }}>
                        Approach Used to Identify Ecosystem Services
                      </h6>
                      <div className="form-group" style={{ marginBottom: '15px' }}>
                        <label className="form-label">Methodologies and tools used *</label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '10px', marginTop: '10px' }}>
                          {ecosystemServicesApproaches.map(approach => (
                            <label key={approach} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <input 
                                type="checkbox"
                                checked={entry.approachUsed.includes(approach)}
                                onChange={(e) => handleEcosystemServicesCheckboxChange(entry.id, approach, e.target.checked)}
                              />
                              {approach}
                            </label>
                          ))}
                        </div>
                        {entry.approachUsed.includes('Other') && (
                          <input 
                            type="text" 
                            className="form-input"
                            value={entry.approachUsedOther}
                            onChange={(e) => updateEcosystemServicesBeneficiaries(entry.id, 'approachUsedOther', e.target.value)}
                            placeholder="Specify other approaches..."
                            style={{ marginTop: '10px' }}
                          />
                        )}
            </div>
            <div className="form-group">
                        <label className="form-label">Detailed description of approach</label>
                        <textarea 
                          className="form-textarea"
                          value={entry.approachDescription}
                          onChange={(e) => updateEcosystemServicesBeneficiaries(entry.id, 'approachDescription', e.target.value)}
                          placeholder="Provide detailed description of how ecosystem services were identified, including stakeholder engagement process, data sources, and validation methods..."
                          rows={4}
                        />
            </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="save-section">
              <button className="attachments-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <span>📎</span>
                <span>Attachments</span>
              </button>
              <button className="save-btn">SAVE</button>
            </div>
          </div>

          {/* Question 8b - Enhanced 9-Section Dynamic Impact Assessment */}
          <div className="question-section">
            <div className="question-header">
              <div className="question-number">8b</div>
              <div className="question-title">How ecosystem services and beneficiaries are affected</div>
              <InfoIcon 
                title="Explain how the ecosystem services and beneficiaries are or could be affected by the organization's activities. Activities may lead to an increase or decrease in the quality and quantity of ecosystem services. For example, cutting trees in the forest has decreased food provisioning services, which has a negative impact on the local community that needs to find an alternative food source. In another example, switching to agroforestry has resulted in an increase in soil erosion control services, which has a positive impact on the local community that will face fewer risks from flooding."
                onClick={() => openGuidance("Explain how the ecosystem services and beneficiaries are or could be affected by the organization's activities. Activities may lead to an increase or decrease in the quality and quantity of ecosystem services. For example, cutting trees in the forest has decreased food provisioning services, which has a negative impact on the local community that needs to find an alternative food source. In another example, switching to agroforestry has resulted in an increase in soil erosion control services, which has a positive impact on the local community that will face fewer risks from flooding.")}
              />
              <div className="collaboration-icon">👥</div>
            </div>
            <div className="question-description">
              Explain how the ecosystem services and beneficiaries are or could be affected by the organization's activities
            </div>

            {/* Add Entry Button */}
            <div style={{ marginBottom: '20px' }}>
              <button 
                type="button"
                className="add-btn"
                onClick={addEcosystemServicesImpact}
              >
                + ADD IMPACT ASSESSMENT
              </button>
            </div>

            {/* Ecosystem Services Impact Assessment Management */}
            {ecosystemServicesImpact.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px', 
                color: '#6c757d',
                border: '2px dashed #dee2e6',
                borderRadius: '8px'
              }}>
                <p>No ecosystem services impact assessments added yet.</p>
                <p>Click "+ ADD IMPACT ASSESSMENT" to start analyzing how ecosystem services and beneficiaries are affected.</p>
              </div>
            ) : (
              <div>
                {ecosystemServicesImpact.map((entry, index) => (
                  <div key={entry.id} style={{ 
                    border: '1px solid #dee2e6', 
                    borderRadius: '12px', 
                    padding: '30px', 
                    marginBottom: '30px',
                    background: '#fff',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}>
                    
                    {/* Entry Header */}
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '30px',
                      paddingBottom: '15px',
                      borderBottom: '2px solid #e8f4fd'
                    }}>
                      <h5 style={{ margin: 0, color: '#0d47a1' }}>
                        Impact Assessment #{index + 1}
                      </h5>
                      <button 
                        type="button"
                        onClick={() => removeEcosystemServicesImpact(entry.id)}
                        style={{ 
                          padding: '8px 12px', 
                          border: '1px solid #dc3545', 
                          background: '#dc3545',
                          color: 'white',
                          cursor: 'pointer',
                          borderRadius: '4px'
                        }}
                      >
                        🗑️ Remove
                      </button>
                    </div>

                    {/* Section 1: List of Ecosystem Services */}
                    <div style={{ 
                      backgroundColor: '#e8f5e8', 
                      padding: '20px', 
                      borderRadius: '8px', 
                      marginBottom: '25px' 
                    }}>
                      <h6 style={{ margin: '0 0 15px 0', color: '#495057' }}>
                        1. List of Ecosystem Services
                      </h6>
            <div className="form-group">
                        <label className="form-label">Identify which ecosystem services may be affected by your activities *</label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '10px', marginTop: '10px' }}>
                          {ecosystemServicesCategories.map(service => (
                            <label key={service} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <input 
                                type="checkbox"
                                checked={entry.ecosystemServices.includes(service)}
                                onChange={(e) => handleEcosystemServicesImpactCheckboxChange(entry.id, 'ecosystemServices', service, e.target.checked)}
                              />
                              {service}
                            </label>
                          ))}
            </div>
                        {entry.ecosystemServices.includes('Other') && (
                          <input 
                            type="text" 
                            className="form-input"
                            value={entry.ecosystemServicesOther}
                            onChange={(e) => updateEcosystemServicesImpact(entry.id, 'ecosystemServicesOther', e.target.value)}
                            placeholder="Specify other ecosystem services..."
                            style={{ marginTop: '10px' }}
                          />
                        )}
                      </div>
                    </div>

                    {/* Section 2: Description of Impact */}
                    <div style={{ 
                      backgroundColor: '#fff3cd', 
                      padding: '20px', 
                      borderRadius: '8px', 
                      marginBottom: '25px' 
                    }}>
                      <h6 style={{ margin: '0 0 15px 0', color: '#495057' }}>
                        2. Description of Impact
                      </h6>
                      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
                        Describe how each selected ecosystem service is or could be affected by your activities.
                      </p>
                      {entry.ecosystemServices.length === 0 ? (
                        <p style={{ color: '#999', fontStyle: 'italic' }}>Please select ecosystem services above to provide impact descriptions.</p>
                      ) : (
                        entry.ecosystemServices.map(service => (
                          <div key={service} className="form-group" style={{ marginBottom: '15px' }}>
                            <label className="form-label">Impact on {service} *</label>
                            <textarea 
                              className="form-textarea"
                              value={entry.impactDescriptions[service] || ''}
                              onChange={(e) => updateImpactDescription(entry.id, service, e.target.value)}
                              placeholder={`e.g., ${service === 'Provisioning - Fresh water' ? 'Increased water use reduces water availability for local communities' : service === 'Regulating - Climate regulation' ? 'Deforestation reduces carbon sequestration capacity' : 'Describe the specific impact on ' + service + '...'}`}
                              rows={3}
                            />
                          </div>
                        ))
                      )}
                    </div>

                    {/* Section 3: Beneficiary Groups */}
                    <div style={{ 
                      backgroundColor: '#f3e5f5', 
                      padding: '20px', 
                      borderRadius: '8px', 
                      marginBottom: '25px' 
                    }}>
                      <h6 style={{ margin: '0 0 15px 0', color: '#495057' }}>
                        3. Beneficiary Groups
                      </h6>
                      <div className="form-group">
                        <label className="form-label">Identify who benefits from these ecosystem services *</label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minWidth(250px, 1fr))', gap: '10px', marginTop: '10px' }}>
                          {beneficiaryGroupsOptions.map(group => (
                            <label key={group} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <input 
                                type="checkbox"
                                checked={entry.beneficiaryGroups.includes(group)}
                                onChange={(e) => handleEcosystemServicesImpactCheckboxChange(entry.id, 'beneficiaryGroups', group, e.target.checked)}
                              />
                              {group}
                            </label>
                          ))}
                        </div>
                        {entry.beneficiaryGroups.includes('Other') && (
                          <input 
                            type="text" 
                            className="form-input"
                            value={entry.beneficiaryGroupsOther}
                            onChange={(e) => updateEcosystemServicesImpact(entry.id, 'beneficiaryGroupsOther', e.target.value)}
                            placeholder="Specify other beneficiary groups..."
                            style={{ marginTop: '10px' }}
                          />
                        )}
                      </div>
                    </div>

                    {/* Section 4: Positive or Negative Impact */}
                    <div style={{ 
                      backgroundColor: '#e3f2fd', 
                      padding: '20px', 
                      borderRadius: '8px', 
                      marginBottom: '25px' 
                    }}>
                      <h6 style={{ margin: '0 0 15px 0', color: '#495057' }}>
                        4. Positive or Negative Impact
                      </h6>
                      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
                        For each service-beneficiary combination, indicate whether the impact is positive, neutral, or negative.
                      </p>
                      {entry.ecosystemServices.length === 0 || entry.beneficiaryGroups.length === 0 ? (
                        <p style={{ color: '#999', fontStyle: 'italic' }}>Please select ecosystem services and beneficiary groups above to assess impact types.</p>
                      ) : (
                        <div style={{ display: 'grid', gap: '15px' }}>
                          {entry.ecosystemServices.map(service => 
                            entry.beneficiaryGroups.map(beneficiary => {
                              const key = `${service}|||${beneficiary}`;
                              return (
                                <div key={key} style={{ 
                                  backgroundColor: '#fff', 
                                  padding: '15px', 
                                  borderRadius: '6px',
                                  border: '1px solid #e0e0e0'
                                }}>
                                  <div style={{ marginBottom: '10px', fontWeight: 'bold', fontSize: '14px' }}>
                                    {service} → {beneficiary}
                                  </div>
                                  <select 
                                    className="form-select"
                                    value={entry.impactTypes[key] || ''}
                                    onChange={(e) => updateImpactType(entry.id, key, e.target.value as 'positive' | 'neutral' | 'negative' | '')}
                                    style={{ width: '200px' }}
                                  >
                                    <option value="">Select impact type</option>
                                    <option value="positive">Positive</option>
                                    <option value="neutral">Neutral</option>
                                    <option value="negative">Negative</option>
                                  </select>
                                </div>
                              );
                            })
                          )}
                        </div>
                      )}
                    </div>

                    {/* Section 5: Geographic Scope */}
                    <div style={{ 
                      backgroundColor: '#fce4ec', 
                      padding: '20px', 
                      borderRadius: '8px', 
                      marginBottom: '25px' 
                    }}>
                      <h6 style={{ margin: '0 0 15px 0', color: '#495057' }}>
                        5. Geographic Scope
                      </h6>
                      <div className="form-group">
                        <label className="form-label">Describe the geographic area where these impacts/beneficiaries are located *</label>
                        <textarea 
                          className="form-textarea"
                          value={entry.geographicScope}
                          onChange={(e) => updateEcosystemServicesImpact(entry.id, 'geographicScope', e.target.value)}
                          placeholder="e.g., Local watershed, Regional landscape, Within 50km radius of operations, Downstream river basin, Specific communities or ecosystems..."
                          rows={3}
                        />
                      </div>
                    </div>

                    {/* Section 6: Evidence and Sources */}
                    <div style={{ 
                      backgroundColor: '#fff8e1', 
                      padding: '20px', 
                      borderRadius: '8px', 
                      marginBottom: '25px' 
                    }}>
                      <h6 style={{ margin: '0 0 15px 0', color: '#495057' }}>
                        6. Evidence and Sources
                      </h6>
                      <div className="form-group" style={{ marginBottom: '15px' }}>
                        <label className="form-label">Provide data sources or studies supporting impact determination</label>
                        <textarea 
                          className="form-textarea"
                          value={entry.evidenceSources}
                          onChange={(e) => updateEcosystemServicesImpact(entry.id, 'evidenceSources', e.target.value)}
                          placeholder="Describe data sources, studies, assessments, or evidence supporting your impact analysis (e.g., Environmental impact assessments, Community surveys, Scientific studies, Monitoring data)..."
                          rows={4}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Upload supporting documentation (optional)</label>
                        <input 
                          type="file" 
                          className="form-input"
                          onChange={(e) => updateEcosystemServicesImpact(entry.id, 'evidenceDocuments', e.target.files?.[0] || null)}
                          accept=".pdf,.doc,.docx,.xls,.xlsx,.csv"
                        />
                      </div>
                    </div>

                    {/* Section 7: Mitigation or Enhancement Actions */}
                    <div style={{ 
                      backgroundColor: '#f0f8ff', 
                      padding: '20px', 
                      borderRadius: '8px', 
                      marginBottom: '25px' 
                    }}>
                      <h6 style={{ margin: '0 0 15px 0', color: '#495057' }}>
                        7. Mitigation or Enhancement Actions
                      </h6>
                      <div className="form-group">
                        <label className="form-label">Describe any measures taken to mitigate negative impacts or enhance positive ones</label>
                        <textarea 
                          className="form-textarea"
                          value={entry.mitigationActions}
                          onChange={(e) => updateEcosystemServicesImpact(entry.id, 'mitigationActions', e.target.value)}
                          placeholder="e.g., Water recycling systems, Habitat restoration programs, Community compensation schemes, Sustainable sourcing practices, Ecosystem-based solutions..."
                          rows={4}
                        />
                      </div>
                    </div>

                    {/* Section 8: Stakeholder Engagement */}
                    <div style={{ 
                      backgroundColor: '#f3f3f3', 
                      padding: '20px', 
                      borderRadius: '8px', 
                      marginBottom: '25px' 
                    }}>
                      <h6 style={{ margin: '0 0 15px 0', color: '#495057' }}>
                        8. Stakeholder Engagement
                      </h6>
                      <div className="form-group" style={{ marginBottom: '15px' }}>
                        <label className="form-label">Describe if/how stakeholders were consulted or involved in impact evaluations</label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '10px', marginTop: '10px' }}>
                          {stakeholderEngagementMethods8b.map(method => (
                            <label key={method} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <input 
                                type="checkbox"
                                checked={entry.stakeholderEngagementMethods.includes(method)}
                                onChange={(e) => handleEcosystemServicesImpactCheckboxChange(entry.id, 'stakeholderEngagementMethods', method, e.target.checked)}
                              />
                              {method}
                            </label>
                          ))}
                        </div>
                        {entry.stakeholderEngagementMethods.includes('Other') && (
                          <input 
                            type="text" 
                            className="form-input"
                            value={entry.stakeholderEngagementMethodsOther}
                            onChange={(e) => updateEcosystemServicesImpact(entry.id, 'stakeholderEngagementMethodsOther', e.target.value)}
                            placeholder="Specify other engagement methods..."
                            style={{ marginTop: '10px' }}
                          />
                        )}
                      </div>
                      <div className="form-group">
                        <label className="form-label">Detailed description of stakeholder engagement</label>
                        <textarea 
                          className="form-textarea"
                          value={entry.stakeholderEngagementDescription}
                          onChange={(e) => updateEcosystemServicesImpact(entry.id, 'stakeholderEngagementDescription', e.target.value)}
                          placeholder="Describe how stakeholders were engaged in impact evaluation, their input, and how it influenced the assessment..."
                          rows={4}
                        />
                      </div>
                    </div>

                    {/* Section 9: Additional Comments */}
                    <div style={{ 
                      backgroundColor: '#fafafa', 
                      padding: '20px', 
                      borderRadius: '8px' 
                    }}>
                      <h6 style={{ margin: '0 0 15px 0', color: '#495057' }}>
                        9. Additional Comments
                      </h6>
                      <div className="form-group">
                        <label className="form-label">Any other relevant information regarding ecosystem services and beneficiaries (optional)</label>
                        <textarea 
                          className="form-textarea"
                          value={entry.additionalComments}
                          onChange={(e) => updateEcosystemServicesImpact(entry.id, 'additionalComments', e.target.value)}
                          placeholder="Enter any additional contextual information, challenges, opportunities, or other relevant details..."
                          rows={4}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="save-section">
              <button className="attachments-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <span>📎</span>
                <span>Attachments</span>
              </button>
              <button className="save-btn">SAVE</button>
            </div>
          </div>

        </div>
      </div>

      {/* Guidance Sidebar */}
      <GuidanceSidebar
        guidanceState={guidanceState}
        closeGuidance={closeGuidance}
        griStandard="GRI101"
      />
    </>
  );
};

export default GRI101Biodiversity;
