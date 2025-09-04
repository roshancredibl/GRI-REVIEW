import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ReportId } from '../../../types/report.types';

// Interfaces for transition plan data
interface TransitionPlanOverview {
  description: string;
  timeframe: 'short_term' | 'medium_term' | 'long_term' | '';
  lastUpdated: string;
}

interface MitigationPolicy {
  id: string;
  type: 'energy_consumption' | 'land_use_change' | 'supplier_engagement' | 'circular_economy' | 'just_transition' | '';
  description: string;
  status: 'planned' | 'in_progress' | 'implemented' | 'under_review' | '';
  implementationDate: string;
}

interface GovernanceRole {
  id: string;
  role: string;
  responsibility: string;
  capability: string;
  qualifications: string;
}

interface StakeholderEngagement {
  id: string;
  type: 'employees' | 'community' | 'suppliers' | 'investors' | 'regulators' | '';
  description: string;
  frequency: string;
  lastEngagement: string;
}

interface TransitionRisk {
  id: string;
  category: 'policy_legal' | 'technology' | 'market' | 'reputation' | 'physical_acute' | 'physical_chronic' | '';
  description: string;
  impact: 'low' | 'medium' | 'high' | 'critical' | '';
  mitigation: string;
  tcfdTheme?: 'governance' | 'strategy' | 'risk_mgmt' | 'metrics_targets' | '';
  timeHorizon?: 'short' | 'medium' | 'long' | '';
  likelihood?: 'very_low' | 'low' | 'medium' | 'high' | 'very_high' | '';
  financialImpact?: string;
}

interface TransitionOpportunity {
  id: string;
  category: 'resource_efficiency' | 'energy_source' | 'products_services' | 'markets' | 'resilience' | '';
  description: string;
  potential: 'low' | 'medium' | 'high' | 'critical' | '';
  timeline: string;
  tcfdTheme?: 'governance' | 'strategy' | 'risk_mgmt' | 'metrics_targets' | '';
  timeHorizon?: 'short' | 'medium' | 'long' | '';
  likelihood?: 'very_low' | 'low' | 'medium' | 'high' | 'very_high' | '';
  financialImpact?: string;
}

// Interface for transition plan targets in question 1c
interface TransitionPlanTarget {
  id: string;
  category: 'ghg_emissions' | 'fossil_fuel_phaseout' | 'other_mitigation' | '';
  specificTargets: string;
  baseYear: string;
  standardsMethodologies: string;
  notesComments: string;
}

// Interface for Climate Risks and Opportunities Registry (CRROs)
interface CRRO {
  uniqueRefId: string;
  type: 'Risk' | 'Opportunity';
  category: 'Physical' | 'Transition';
  sector: string;
  riskTitle: string;
  activityName: string;
  isicCode: string;
  hazardDriver: string;
  tcfdTheme: string;
  timeHorizon: string;
  impactType: string;
  impactOnBusinessModel: string;
  geography: string;
  activityLinkage: string;
  likelihood: string;
  severity: string;
  financialImpact: string;
  source: string;
  lastUpdated: string;
  hasMitigationMeasures: string;
}

// Interface for CRRO Impact Assessment in question 2a
interface CRROImpactAssessment {
  id: string;
  crroTitle: string;
  impactOnPeople: string;
  impactOnEnvironment: string;
  considerationInAdaptationPlan: string;
}

// Interface for operation locations with community impact
interface OperationLocation {
  id: string;
  locationName: string;
  latitude: string;
  longitude: string;
  impactTypes: string[];
  agreementStatus: 'Yes' | 'No' | 'Partial' | '';
  agreementDescription: string;
  additionalNotes: string;
}

// InfoIcon component for guidance
const InfoIcon: React.FC<{ title: string; onClick?: () => void }> = ({ title, onClick }) => (
  <div 
    className="info-icon" 
    title={title}
    onClick={onClick}
    style={{ cursor: 'pointer', marginLeft: '8px' }}
  >
    i
  </div>
);

const GRI102Climate: React.FC = () => {
  const navigate = useNavigate();
  const { reportId } = useParams<{ reportId: ReportId }>();

  // Initialize dynamic CRRO data with static data
  useEffect(() => {
    setDynamicCrroData(crroData);
  }, []);

  // State management for transition plan data
  const [transitionOverview, setTransitionOverview] = useState<TransitionPlanOverview>({
    description: '',
    timeframe: '',
    lastUpdated: ''
  });

  const [mitigationPolicies, setMitigationPolicies] = useState<MitigationPolicy[]>([]);
  const [governanceRoles, setGovernanceRoles] = useState<GovernanceRole[]>([]);
  const [stakeholderEngagements, setStakeholderEngagements] = useState<StakeholderEngagement[]>([]);
  const [transitionRisks, setTransitionRisks] = useState<TransitionRisk[]>([]);
  const [transitionOpportunities, setTransitionOpportunities] = useState<TransitionOpportunity[]>([]);
  const [transitionPlanTargets, setTransitionPlanTargets] = useState<TransitionPlanTarget[]>([]);
  const [crroImpactAssessments, setCrroImpactAssessments] = useState<CRROImpactAssessment[]>([]);
  const [dynamicCrroData, setDynamicCrroData] = useState<CRRO[]>([]);
  
  // State for adaptation plan (2b) - similar to transition plan but for adaptation
  const [adaptationOverview, setAdaptationOverview] = useState<TransitionPlanOverview>({
    description: '',
    timeframe: '',
    lastUpdated: ''
  });
  const [adaptationPolicies, setAdaptationPolicies] = useState<MitigationPolicy[]>([]);
  const [adaptationGovernanceRoles, setAdaptationGovernanceRoles] = useState<GovernanceRole[]>([]);
  const [adaptationStakeholderEngagements, setAdaptationStakeholderEngagements] = useState<StakeholderEngagement[]>([]);
  const [adaptationTargets, setAdaptationTargets] = useState<TransitionPlanTarget[]>([]);
  const [adaptationRevisionPolicy, setAdaptationRevisionPolicy] = useState('');
  const [adaptationChangesSinceLastPeriod, setAdaptationChangesSinceLastPeriod] = useState('');
  const [adaptationScienceAlignment, setAdaptationScienceAlignment] = useState('');
  const [adaptationPlanExpenditure, setAdaptationPlanExpenditure] = useState('');
  const [adaptationTotalExpenditure, setAdaptationTotalExpenditure] = useState('');
  const [adaptationExpenditureCurrency, setAdaptationExpenditureCurrency] = useState('');
  const [adaptationPeopleEnvironmentImpacts, setAdaptationPeopleEnvironmentImpacts] = useState('');

  // State for question 3g - New employees' pay vs cost-of-living
  const [reportingPeriodStart, setReportingPeriodStart] = useState('');
  const [reportingPeriodEnd, setReportingPeriodEnd] = useState('');
  const [totalNewEmployees, setTotalNewEmployees] = useState('');
  const [employeesAboveCostOfLiving, setEmployeesAboveCostOfLiving] = useState('');
  const [costOfLivingBasis, setCostOfLivingBasis] = useState('');
  const [actionsToAddressGaps, setActionsToAddressGaps] = useState('');
  const [payGapNotes, setPayGapNotes] = useState('');

  // State for questions 3h & 3i - Locations of operation and community agreements
  const [communityReportingPeriodStart, setCommunityReportingPeriodStart] = useState('');
  const [communityReportingPeriodEnd, setCommunityReportingPeriodEnd] = useState('');
  const [operationLocations, setOperationLocations] = useState<OperationLocation[]>([]);

  // State for question 3j - Contextual information for workforce reporting
  const [workforceReportingPeriodStart, setWorkforceReportingPeriodStart] = useState('');
  const [workforceReportingPeriodEnd, setWorkforceReportingPeriodEnd] = useState('');
  const [reportingUnit, setReportingUnit] = useState('');
  const [reportingUnitDefinition, setReportingUnitDefinition] = useState('');
  const [reportingFrequency, setReportingFrequency] = useState('');
  const [methodologyDescription, setMethodologyDescription] = useState('');
  const [assumptionsMade, setAssumptionsMade] = useState('');
  const [changesRestatements, setChangesRestatements] = useState('');
  const [workforceAdditionalNotes, setWorkforceAdditionalNotes] = useState('');

  // Question 5 - GHG Emissions Table Configuration
  const [baseYear, setBaseYear] = useState('');
  const [numberOfYears, setNumberOfYears] = useState(1);
  const [reportByGas, setReportByGas] = useState(false);

  // Generate periods for the table
  const generatePeriods = () => {
    if (!baseYear) return [];
    const periods = [];
    const baseYearNum = parseInt(baseYear);
    
    // Add base year
    periods.push({
      label: `Base year (${baseYear})`,
      year: baseYearNum,
      color: '#e3f2fd'
    });
    
    // Add intermediate years if any
    for (let i = 1; i < numberOfYears; i++) {
      const year = baseYearNum + i;
      periods.push({
        label: `Reporting period -${numberOfYears - i} (${year})`,
        year: year,
        color: i % 2 === 1 ? '#f3e5f5' : '#e8f5e8'
      });
    }
    
    // Add current period
    const currentYear = baseYearNum + numberOfYears;
    periods.push({
      label: `Reporting period (${currentYear})`,
      year: currentYear,
      color: '#fff3e0'
    });
    
    return periods;
  };

  const periods = generatePeriods();

  const [revisionPolicy, setRevisionPolicy] = useState('');
  const [changesSinceLastPeriod, setChangesSinceLastPeriod] = useState('');
  const [scienceAlignment, setScienceAlignment] = useState('');
  const [transitionPlanExpenditure, setTransitionPlanExpenditure] = useState('');
  const [totalExpenditure, setTotalExpenditure] = useState('');
  const [expenditureCurrency, setExpenditureCurrency] = useState('');
  const [budgetPercentage, setBudgetPercentage] = useState('');
  const [peopleEnvironmentImpacts, setPeopleEnvironmentImpacts] = useState('');

  // Helper functions
  const generateUniqueId = (): string => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Mitigation Policies functions
  const addMitigationPolicy = () => {
    const newPolicy: MitigationPolicy = {
      id: generateUniqueId(),
      type: '',
      description: '',
      status: '',
      implementationDate: ''
    };
    setMitigationPolicies([...mitigationPolicies, newPolicy]);
  };

  const removeMitigationPolicy = (id: string) => {
    setMitigationPolicies(mitigationPolicies.filter(policy => policy.id !== id));
  };

  const updateMitigationPolicy = (id: string, field: keyof MitigationPolicy, value: any) => {
    setMitigationPolicies(mitigationPolicies.map(policy => 
      policy.id === id ? { ...policy, [field]: value } : policy
    ));
  };

  // Governance Roles functions
  const addGovernanceRole = () => {
    const newRole: GovernanceRole = {
      id: generateUniqueId(),
      role: '',
      responsibility: '',
      capability: '',
      qualifications: ''
    };
    setGovernanceRoles([...governanceRoles, newRole]);
  };

  const removeGovernanceRole = (id: string) => {
    setGovernanceRoles(governanceRoles.filter(role => role.id !== id));
  };

  const updateGovernanceRole = (id: string, field: keyof GovernanceRole, value: any) => {
    setGovernanceRoles(governanceRoles.map(role => 
      role.id === id ? { ...role, [field]: value } : role
    ));
  };

  // Stakeholder Engagement functions
  const addStakeholderEngagement = () => {
    const newEngagement: StakeholderEngagement = {
      id: generateUniqueId(),
      type: '',
      description: '',
      frequency: '',
      lastEngagement: ''
    };
    setStakeholderEngagements([...stakeholderEngagements, newEngagement]);
  };

  const removeStakeholderEngagement = (id: string) => {
    setStakeholderEngagements(stakeholderEngagements.filter(engagement => engagement.id !== id));
  };

  const updateStakeholderEngagement = (id: string, field: keyof StakeholderEngagement, value: any) => {
    setStakeholderEngagements(stakeholderEngagements.map(engagement => 
      engagement.id === id ? { ...engagement, [field]: value } : engagement
    ));
  };

  // Transition Risks functions
  const addTransitionRisk = () => {
    const newRisk: TransitionRisk = {
      id: generateUniqueId(),
      category: '',
      description: '',
      impact: '',
      mitigation: '',
      tcfdTheme: '',
      timeHorizon: '',
      likelihood: '',
      financialImpact: ''
    };
    setTransitionRisks([...transitionRisks, newRisk]);
  };

  const removeTransitionRisk = (id: string) => {
    setTransitionRisks(transitionRisks.filter(risk => risk.id !== id));
  };

  const updateTransitionRisk = (id: string, field: keyof TransitionRisk, value: any) => {
    setTransitionRisks(transitionRisks.map(risk => 
      risk.id === id ? { ...risk, [field]: value } : risk
    ));
  };

  // Transition Opportunities functions
  const addTransitionOpportunity = () => {
    const newOpportunity: TransitionOpportunity = {
      id: generateUniqueId(),
      category: '',
      description: '',
      potential: '',
      timeline: '',
      tcfdTheme: '',
      timeHorizon: '',
      likelihood: '',
      financialImpact: ''
    };
    setTransitionOpportunities([...transitionOpportunities, newOpportunity]);
  };

  const removeTransitionOpportunity = (id: string) => {
    setTransitionOpportunities(transitionOpportunities.filter(opportunity => opportunity.id !== id));
  };

  const updateTransitionOpportunity = (id: string, field: keyof TransitionOpportunity, value: any) => {
    setTransitionOpportunities(transitionOpportunities.map(opportunity => 
      opportunity.id === id ? { ...opportunity, [field]: value } : opportunity
    ));
  };

  // Transition Plan Targets functions for question 1c
  const addTransitionPlanTarget = () => {
    const newTarget: TransitionPlanTarget = {
      id: generateUniqueId(),
      category: '',
      specificTargets: '',
      baseYear: '',
      standardsMethodologies: '',
      notesComments: ''
    };
    setTransitionPlanTargets([...transitionPlanTargets, newTarget]);
  };

  const removeTransitionPlanTarget = (id: string) => {
    setTransitionPlanTargets(transitionPlanTargets.filter(target => target.id !== id));
  };

  const updateTransitionPlanTarget = (id: string, field: keyof TransitionPlanTarget, value: any) => {
    setTransitionPlanTargets(transitionPlanTargets.map(target => 
      target.id === id ? { ...target, [field]: value } : target
    ));
  };

  // Options for standards and methodologies dropdown
  const standardsMethodologiesOptions = [
    'Science Based Targets initiative (SBTi)',
    'IPCC Guidelines for National Greenhouse Gas Inventories',
    'GHG Protocol Corporate Standard',
    'ISO 14064-1',
    'Task Force on Climate-related Financial Disclosures (TCFD)',
    'Paris Agreement goals',
    'Well-below 2°C pathway',
    '1.5°C pathway',
    'IEA Net Zero by 2050 Roadmap',
    'IRENA Global Energy Transformation',
    'Sectoral decarbonisation approach',
    'Other'
  ];

  // Climate Risks and Opportunities Registry (CRROs) Data
  const crroData: CRRO[] = [
    {
      uniqueRefId: "5996adcf-8283-41f9-8fd6-000f22038754",
      type: "Risk",
      category: "Physical",
      sector: "Power and Utilities",
      riskTitle: "Extreme weather events can disrupt public consultation platforms, affecting stakeholder engagement.",
      activityName: "Stakeholder engagement",
      isicCode: "8299",
      hazardDriver: "Extreme Weather",
      tcfdTheme: "Acute",
      timeHorizon: "Short term (0-3 yrs)",
      impactType: "Operations",
      impactOnBusinessModel: "Disruption in stakeholder engagement processes can lead to delays in project approvals and loss of trust.",
      geography: "",
      activityLinkage: "Stakeholder engagement",
      likelihood: "High",
      severity: "High",
      financialImpact: "Potential increase in costs due to delays and additional resources needed for recovery.",
      source: "Excel + Power and Utilities Analysis",
      lastUpdated: "2025-07-25T13:55:02.407Z",
      hasMitigationMeasures: "No"
    },
    {
      uniqueRefId: "6f579522-29c1-4cd4-bc25-8eb84477939e",
      type: "Risk",
      category: "Transition",
      sector: "Power and Utilities",
      riskTitle: "Policy uncertainty can affect the trust-building process with stakeholders.",
      activityName: "Stakeholder engagement",
      isicCode: "8299",
      hazardDriver: "Policy uncertainty",
      tcfdTheme: "Policy & Legal",
      timeHorizon: "Medium term (3-10 yrs)",
      impactType: "Strategic",
      impactOnBusinessModel: "Uncertainty in policy can lead to strategic misalignment and loss of stakeholder confidence.",
      geography: "",
      activityLinkage: "Stakeholder engagement",
      likelihood: "Medium",
      severity: "Medium",
      financialImpact: "Potential revenue loss due to decreased stakeholder support.",
      source: "Excel + Power and Utilities Analysis",
      lastUpdated: "2025-07-25T13:55:02.407Z",
      hasMitigationMeasures: "No"
    },
    {
      uniqueRefId: "6992d2eb-84dc-4281-ba10-e9acb558185e",
      type: "Risk",
      category: "Physical",
      sector: "Power and Utilities",
      riskTitle: "Extreme Rain & Flood can hinder ecological assessments, impacting project timelines.",
      activityName: "Environmental impact assessments",
      isicCode: "7490",
      hazardDriver: "Extreme Rain & Flood",
      tcfdTheme: "Acute",
      timeHorizon: "Short term (0-3 yrs)",
      impactType: "Operations",
      impactOnBusinessModel: "Delays in assessments can lead to project postponements and increased costs.",
      geography: "",
      activityLinkage: "Environmental impact assessments",
      likelihood: "High",
      severity: "High",
      financialImpact: "Increased operational costs due to extended timelines.",
      source: "Excel + Power and Utilities Analysis",
      lastUpdated: "2025-07-25T13:55:02.407Z",
      hasMitigationMeasures: "No"
    },
    {
      uniqueRefId: "904ed204-41da-4892-bb3d-d6353ac1e1f2",
      type: "Opportunity",
      category: "Transition",
      sector: "Power and Utilities",
      riskTitle: "Market pressure to adopt sustainable practices can drive demand for comprehensive impact assessments.",
      activityName: "Environmental impact assessments",
      isicCode: "7490",
      hazardDriver: "Market pressure to adopt sustainable business practices",
      tcfdTheme: "Market",
      timeHorizon: "Medium term (3-10 yrs)",
      impactType: "Market",
      impactOnBusinessModel: "Increased demand for assessments can enhance business opportunities and revenue streams.",
      geography: "",
      activityLinkage: "Environmental impact assessments",
      likelihood: "High",
      severity: "Medium",
      financialImpact: "Potential increase in revenue from new contracts.",
      source: "Excel + Power and Utilities Analysis",
      lastUpdated: "2025-07-25T13:55:02.407Z",
      hasMitigationMeasures: "No"
    },
    {
      uniqueRefId: "ef59d171-ea69-400c-ac2b-f7e84f296da7",
      type: "Risk",
      category: "Transition",
      sector: "Power and Utilities",
      riskTitle: "Increased monitoring and reporting requirements can strain resources and increase operational costs.",
      activityName: "Environmental impact assessments",
      isicCode: "7490",
      hazardDriver: "Increased monitoring and reporting requirements",
      tcfdTheme: "Market",
      timeHorizon: "Medium term (3-10 yrs)",
      impactType: "Financial",
      impactOnBusinessModel: "Additional compliance requirements can lead to increased operational complexity and costs.",
      geography: "",
      activityLinkage: "Environmental impact assessments",
      likelihood: "Medium",
      severity: "Medium",
      financialImpact: "Increased operational costs due to compliance.",
      source: "Excel + Power and Utilities Analysis",
      lastUpdated: "2025-07-25T13:55:02.407Z",
      hasMitigationMeasures: "No"
    }
  ];

  // Calculate percentage automatically
  const calculateExpenditurePercentage = (): string => {
    const transitionAmount = parseFloat(transitionPlanExpenditure) || 0;
    const totalAmount = parseFloat(totalExpenditure) || 0;
    
    if (totalAmount === 0) return '0';
    
    const percentage = (transitionAmount / totalAmount) * 100;
    return percentage.toFixed(2);
  };

  // CRRO Impact Assessment management functions for question 2a
  const addCrroImpactAssessment = () => {
    const newAssessment: CRROImpactAssessment = {
      id: generateUniqueId(),
      crroTitle: '',
      impactOnPeople: '',
      impactOnEnvironment: '',
      considerationInAdaptationPlan: ''
    };
    setCrroImpactAssessments([...crroImpactAssessments, newAssessment]);
  };

  const removeCrroImpactAssessment = (id: string) => {
    setCrroImpactAssessments(crroImpactAssessments.filter(assessment => assessment.id !== id));
  };

  const updateCrroImpactAssessment = (id: string, field: keyof CRROImpactAssessment, value: any) => {
    setCrroImpactAssessments(crroImpactAssessments.map(assessment => 
      assessment.id === id ? { ...assessment, [field]: value } : assessment
    ));
  };

  const prefillFromCrro = (crroTitle: string) => {
    const newAssessment: CRROImpactAssessment = {
      id: generateUniqueId(),
      crroTitle: crroTitle,
      impactOnPeople: '',
      impactOnEnvironment: '',
      considerationInAdaptationPlan: ''
    };
    setCrroImpactAssessments([...crroImpactAssessments, newAssessment]);
  };

  // CRRO Registry management functions for question 2a
  const addCrroEntry = () => {
    const newCrro: CRRO = {
      uniqueRefId: generateUniqueId(),
      type: 'Risk',
      category: 'Physical',
      sector: 'Power and Utilities',
      riskTitle: '',
      activityName: '',
      isicCode: '',
      hazardDriver: '',
      tcfdTheme: '',
      timeHorizon: '',
      impactType: '',
      impactOnBusinessModel: '',
      geography: '',
      activityLinkage: '',
      likelihood: '',
      severity: '',
      financialImpact: '',
      source: '',
      lastUpdated: new Date().toISOString(),
      hasMitigationMeasures: 'No'
    };
    setDynamicCrroData([...dynamicCrroData, newCrro]);
  };

  const removeCrroEntry = (uniqueRefId: string) => {
    setDynamicCrroData(dynamicCrroData.filter(crro => crro.uniqueRefId !== uniqueRefId));
  };

  const updateCrroEntry = (uniqueRefId: string, field: keyof CRRO, value: any) => {
    setDynamicCrroData(dynamicCrroData.map(crro => 
      crro.uniqueRefId === uniqueRefId ? { ...crro, [field]: value } : crro
    ));
  };

  // Adaptation Plan management functions for question 2b
  const addAdaptationPolicy = () => {
    const newPolicy: MitigationPolicy = {
      id: generateUniqueId(),
      type: '',
      description: '',
      status: '',
      implementationDate: ''
    };
    setAdaptationPolicies([...adaptationPolicies, newPolicy]);
  };

  const removeAdaptationPolicy = (id: string) => {
    setAdaptationPolicies(adaptationPolicies.filter(policy => policy.id !== id));
  };

  const updateAdaptationPolicy = (id: string, field: keyof MitigationPolicy, value: any) => {
    setAdaptationPolicies(adaptationPolicies.map(policy => 
      policy.id === id ? { ...policy, [field]: value } : policy
    ));
  };

  const addAdaptationGovernanceRole = () => {
    const newRole: GovernanceRole = {
      id: generateUniqueId(),
      role: '',
      responsibility: '',
      capability: '',
      qualifications: ''
    };
    setAdaptationGovernanceRoles([...adaptationGovernanceRoles, newRole]);
  };

  const removeAdaptationGovernanceRole = (id: string) => {
    setAdaptationGovernanceRoles(adaptationGovernanceRoles.filter(role => role.id !== id));
  };

  const updateAdaptationGovernanceRole = (id: string, field: keyof GovernanceRole, value: any) => {
    setAdaptationGovernanceRoles(adaptationGovernanceRoles.map(role => 
      role.id === id ? { ...role, [field]: value } : role
    ));
  };

  const addAdaptationStakeholderEngagement = () => {
    const newEngagement: StakeholderEngagement = {
      id: generateUniqueId(),
      type: '',
      description: '',
      frequency: '',
      lastEngagement: ''
    };
    setAdaptationStakeholderEngagements([...adaptationStakeholderEngagements, newEngagement]);
  };

  const removeAdaptationStakeholderEngagement = (id: string) => {
    setAdaptationStakeholderEngagements(adaptationStakeholderEngagements.filter(engagement => engagement.id !== id));
  };

  const updateAdaptationStakeholderEngagement = (id: string, field: keyof StakeholderEngagement, value: any) => {
    setAdaptationStakeholderEngagements(adaptationStakeholderEngagements.map(engagement => 
      engagement.id === id ? { ...engagement, [field]: value } : engagement
    ));
  };

  const addAdaptationTarget = () => {
    const newTarget: TransitionPlanTarget = {
      id: generateUniqueId(),
      category: '',
      specificTargets: '',
      baseYear: '',
      standardsMethodologies: '',
      notesComments: ''
    };
    setAdaptationTargets([...adaptationTargets, newTarget]);
  };

  const removeAdaptationTarget = (id: string) => {
    setAdaptationTargets(adaptationTargets.filter(target => target.id !== id));
  };

  const updateAdaptationTarget = (id: string, field: keyof TransitionPlanTarget, value: any) => {
    setAdaptationTargets(adaptationTargets.map(target => 
      target.id === id ? { ...target, [field]: value } : target
    ));
  };

  // Calculate adaptation plan expenditure percentage automatically
  const calculateAdaptationExpenditurePercentage = (): string => {
    const adaptationAmount = parseFloat(adaptationPlanExpenditure) || 0;
    const totalAmount = parseFloat(adaptationTotalExpenditure) || 0;
    
    if (totalAmount === 0) return '0';
    
    const percentage = (adaptationAmount / totalAmount) * 100;
    return percentage.toFixed(2);
  };

  // Function to calculate percentage of employees above cost of living
  const calculatePayAboveCostOfLivingPercentage = (): string => {
    const total = parseFloat(totalNewEmployees) || 0;
    const above = parseFloat(employeesAboveCostOfLiving) || 0;
    
    if (total === 0) return '0';
    
    const percentage = (above / total) * 100;
    return percentage.toFixed(1);
  };

  // Functions for managing operation locations (3h & 3i)
  const addOperationLocation = () => {
    const newLocation: OperationLocation = {
      id: Date.now().toString(),
      locationName: '',
      latitude: '',
      longitude: '',
      impactTypes: [],
      agreementStatus: '',
      agreementDescription: '',
      additionalNotes: ''
    };
    setOperationLocations([...operationLocations, newLocation]);
  };

  const removeOperationLocation = (id: string) => {
    setOperationLocations(operationLocations.filter(location => location.id !== id));
  };

  const updateOperationLocation = (id: string, field: keyof OperationLocation, value: any) => {
    setOperationLocations(operationLocations.map(location =>
      location.id === id ? { ...location, [field]: value } : location
    ));
  };

  const handleImpactTypeChange = (locationId: string, impactType: string, checked: boolean) => {
    const location = operationLocations.find(loc => loc.id === locationId);
    if (!location) return;

    let updatedImpactTypes;
    if (checked) {
      updatedImpactTypes = [...location.impactTypes, impactType];
    } else {
      updatedImpactTypes = location.impactTypes.filter(type => type !== impactType);
    }
    
    updateOperationLocation(locationId, 'impactTypes', updatedImpactTypes);
  };

  // Function to calculate percentage of locations with agreements
  const calculateAgreementPercentage = (): string => {
    const totalLocations = operationLocations.length;
    if (totalLocations === 0) return '0';
    
    const locationsWithAgreements = operationLocations.filter(
      location => location.agreementStatus === 'Yes' || location.agreementStatus === 'Partial'
    ).length;
    
    const percentage = (locationsWithAgreements / totalLocations) * 100;
    return percentage.toFixed(1);
  };

  const handleBackClick = () => {
    if (reportId) {
      navigate(`/gri/${reportId}/topic-standards-2025/environmental`);
    }
  };

  return (
    <div className="page-container" id="gri-102-climate">
      <div className="page-header">
        <button type="button" className="back-btn" onClick={handleBackClick}>← Back</button>
        <div className="page-title">GRI 102: Climate Change 2025</div>
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
          <div className="section-title">Climate Change</div>
          <div className="gri-reference">GRI 102: Climate Change</div>
          <div className="main-heading">
            1. Transition plan for climate change mitigation
            <div className="info-icon" title="This section covers the organization's comprehensive transition plan for climate change mitigation, including policies, actions, targets, governance, and impacts management aligned with limiting global warming to 1.5°C.">i</div>
          </div>
        </div>
        
        {/* Disclosure 102-1: Transition plan for climate change mitigation */}
        <div className="question-section">
          
          {/* Requirement 1a - Enhanced UI */}
          <div className="question-section">
            <div className="question-header">
              <div className="question-number">1a</div>
              <div className="question-title">Transition plan description</div>
              <InfoIcon 
                title="Examples of policies to mitigate climate change can include policies on: energy consumption; land use change, for example on deforestation; engaging with suppliers to reduce their GHG emissions; bioeconomy or circular economy; just transition and on human rights."
              />
              <div className="collaboration-icon">👥</div>
            </div>
            <div className="question-description">
              Describe the organization's transition plan for climate change mitigation, including policies, actions, targets, governance, and impacts management aligned with limiting global warming to 1.5°C.
          </div>
          
            {/* 1. Overview of Transition Plan */}
            <div style={{ 
              border: '1px solid #dee2e6', 
              borderRadius: '8px', 
              padding: '20px', 
              marginBottom: '20px',
              background: '#fff'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '15px',
                paddingBottom: '10px',
                borderBottom: '1px solid #dee2e6'
              }}>
                <h5 style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
                  📋 Overview of Transition Plan
                  <InfoIcon title="Provide a high-level description of your climate transition plan, including key policies to mitigate climate change." />
                </h5>
            </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Planning Timeframe</label>
                  <select 
                    className="form-select"
                    value={transitionOverview.timeframe}
                    onChange={(e) => setTransitionOverview({...transitionOverview, timeframe: e.target.value as any})}
                  >
                    <option value="">Select timeframe</option>
                    <option value="short_term">Short-term (1-3 years)</option>
                    <option value="medium_term">Medium-term (3-10 years)</option>
                    <option value="long_term">Long-term (10+ years)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Last Updated</label>
                  <input 
                    type="date" 
                    className="form-input"
                    value={transitionOverview.lastUpdated}
                    onChange={(e) => setTransitionOverview({...transitionOverview, lastUpdated: e.target.value})}
                  />
                </div>
          </div>

              <div className="form-group">
                <label className="form-label">Transition Plan Description *</label>
                <textarea 
                  className="form-textarea" 
                  rows={6}
                  value={transitionOverview.description}
                  onChange={(e) => setTransitionOverview({...transitionOverview, description: e.target.value})}
                  placeholder="E.g., We have policies addressing energy efficiency, supplier GHG reduction, circular economy initiatives, and just transition principles. Describe short-, medium-, and long-term actions here."
                />
            </div>
            </div>

            {/* 2. Climate Mitigation Policies */}
            <div style={{ 
              border: '1px solid #dee2e6', 
              borderRadius: '8px', 
              padding: '20px', 
              marginBottom: '20px',
              background: '#fff'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '15px',
                paddingBottom: '10px',
                borderBottom: '1px solid #dee2e6'
              }}>
                <h5 style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
                  🌱 Climate Mitigation Policies
                  <InfoIcon title="Select and describe key policies to mitigate climate change" />
                </h5>
                <button 
                  type="button" 
                  onClick={addMitigationPolicy}
                  style={{ 
                    padding: '8px 16px', 
                    border: '1px solid #28a745', 
                    background: '#28a745',
                    color: 'white',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  + Add Policy
                </button>
              </div>
              
              {mitigationPolicies.length === 0 ? (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '40px', 
                  color: '#6c757d',
                  border: '2px dashed #dee2e6',
                  borderRadius: '8px'
                }}>
                  <p>No mitigation policies added yet.</p>
                  <p>Click "Add Policy" to start defining your climate mitigation approach.</p>
                </div>
              ) : (
                <div>
                  {mitigationPolicies.map((policy, index) => (
                    <div key={policy.id} style={{ 
                      border: '1px solid #e9ecef', 
                      borderRadius: '6px', 
                      padding: '15px', 
                      marginBottom: '15px',
                      background: '#f8f9fa'
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        marginBottom: '10px'
                      }}>
                        <h6 style={{ margin: 0 }}>Policy #{index + 1}</h6>
                        <button 
                          type="button"
                          onClick={() => removeMitigationPolicy(policy.id)}
                          style={{ 
                            padding: '5px 10px', 
                            border: '1px solid #dc3545', 
                            background: '#dc3545',
                            color: 'white',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                      
          <div className="form-row">
            <div className="form-group">
                          <label className="form-label">Policy Type *</label>
                          <select 
                            className="form-select"
                            value={policy.type}
                            onChange={(e) => updateMitigationPolicy(policy.id, 'type', e.target.value)}
                          >
                            <option value="">Select policy type</option>
                            <option value="energy_consumption">Energy consumption</option>
                            <option value="land_use_change">Land use change (deforestation)</option>
                            <option value="supplier_engagement">Supplier engagement for GHG reduction</option>
                            <option value="circular_economy">Bioeconomy or circular economy</option>
                            <option value="just_transition">Just transition and human rights</option>
                          </select>
            </div>
            <div className="form-group">
                          <label className="form-label">Implementation Status</label>
                          <select 
                            className="form-select"
                            value={policy.status}
                            onChange={(e) => updateMitigationPolicy(policy.id, 'status', e.target.value)}
                          >
                            <option value="">Select status</option>
                            <option value="planned">Planned</option>
                            <option value="in_progress">In Progress</option>
                            <option value="implemented">Implemented</option>
                            <option value="under_review">Under Review</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">Implementation Date</label>
                          <input 
                            type="date" 
                            className="form-input"
                            value={policy.implementationDate}
                            onChange={(e) => updateMitigationPolicy(policy.id, 'implementationDate', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">Policy Description *</label>
                        <textarea 
                          className="form-textarea" 
                          rows={3}
                          value={policy.description}
                          onChange={(e) => updateMitigationPolicy(policy.id, 'description', e.target.value)}
                          placeholder="Describe the policy implementation approach, targets, and expected outcomes..."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 3. Revision Policy */}
            <div style={{ 
              border: '1px solid #dee2e6', 
              borderRadius: '8px', 
              padding: '20px', 
              marginBottom: '20px',
              background: '#fff'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                marginBottom: '15px',
                paddingBottom: '10px',
                borderBottom: '1px solid #dee2e6'
              }}>
                <h5 style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
                  🔄 Revision Policy
                  <InfoIcon title="Describe your policy for reviewing and revising the transition plan" />
                </h5>
              </div>
              
              <div className="form-group">
                <label className="form-label">Revision Policy Description</label>
                <textarea 
                  className="form-textarea" 
                  rows={4}
                  value={revisionPolicy}
                  onChange={(e) => setRevisionPolicy(e.target.value)}
                  placeholder="Describe frequency (e.g., annually), responsible teams, review criteria, and update procedures..."
                />
              </div>
            </div>

            {/* 4. Changes Since Last Period */}
            <div style={{ 
              border: '1px solid #dee2e6', 
              borderRadius: '8px', 
              padding: '20px', 
              marginBottom: '20px',
              background: '#fff'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                marginBottom: '15px',
                paddingBottom: '10px',
                borderBottom: '1px solid #dee2e6'
              }}>
                <h5 style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
                  📝 Changes Since Last Period
                  <InfoIcon title="Note any significant changes to the transition plan since the last reporting period" />
                </h5>
              </div>
              
              <div className="form-group">
                <label className="form-label">Significant Changes</label>
                <textarea 
                  className="form-textarea" 
                  rows={4}
                  value={changesSinceLastPeriod}
                  onChange={(e) => setChangesSinceLastPeriod(e.target.value)}
                  placeholder="E.g., updated targets, new policies, revised timelines, changed governance structure..."
                />
              </div>
            </div>

            {/* 5. Alignment with Science */}
            <div style={{ 
              border: '1px solid #dee2e6', 
              borderRadius: '8px', 
              padding: '20px', 
              marginBottom: '20px',
              background: '#fff'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                marginBottom: '15px',
                paddingBottom: '10px',
                borderBottom: '1px solid #dee2e6'
              }}>
                <h5 style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
                  🔬 Alignment with Science
                  <InfoIcon title="Explain how your transition plan aligns with latest scientific evidence (e.g., 1.5°C limit scenarios)" />
                </h5>
              </div>
              
              <div className="form-group">
                <label className="form-label">Scientific Alignment Description</label>
                <textarea 
                  className="form-textarea" 
                  rows={5}
                  value={scienceAlignment}
                  onChange={(e) => setScienceAlignment(e.target.value)}
                  placeholder="Describe source of climate scenarios, methodologies used, alignment with 1.5°C pathways, and scientific consensus basis..."
                />
              </div>
            </div>

            {/* 6. Governance */}
            <div style={{ 
              border: '1px solid #dee2e6', 
              borderRadius: '8px', 
              padding: '20px', 
              marginBottom: '20px',
              background: '#fff'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '15px',
                paddingBottom: '10px',
                borderBottom: '1px solid #dee2e6'
              }}>
                <h5 style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
                  👥 Governance Structure
                  <InfoIcon title="Identify governance bodies or roles overseeing and implementing the plan" />
                </h5>
                <button 
                  type="button" 
                  onClick={addGovernanceRole}
                  style={{ 
                    padding: '8px 16px', 
                    border: '1px solid #28a745', 
                    background: '#28a745',
                    color: 'white',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  + Add Role
                </button>
              </div>
              
              {governanceRoles.length === 0 ? (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '40px', 
                  color: '#6c757d',
                  border: '2px dashed #dee2e6',
                  borderRadius: '8px'
                }}>
                  <p>No governance roles defined yet.</p>
                  <p>Click "Add Role" to define the governance structure for your transition plan.</p>
                </div>
              ) : (
                <div>
                  {governanceRoles.map((role, index) => (
                    <div key={role.id} style={{ 
                      border: '1px solid #e9ecef', 
                      borderRadius: '6px', 
                      padding: '15px', 
                      marginBottom: '15px',
                      background: '#f8f9fa'
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        marginBottom: '10px'
                      }}>
                        <h6 style={{ margin: 0 }}>Governance Role #{index + 1}</h6>
                        <button 
                          type="button"
                          onClick={() => removeGovernanceRole(role.id)}
                          style={{ 
                            padding: '5px 10px', 
                            border: '1px solid #dc3545', 
                            background: '#dc3545',
                            color: 'white',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                      
                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">Role/Position *</label>
                          <input 
                            type="text" 
                            className="form-input"
                            value={role.role}
                            onChange={(e) => updateGovernanceRole(role.id, 'role', e.target.value)}
                            placeholder="e.g., Sustainability Committee, Climate Officer"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Capability/Expertise</label>
                          <input 
                            type="text" 
                            className="form-input"
                            value={role.capability}
                            onChange={(e) => updateGovernanceRole(role.id, 'capability', e.target.value)}
                            placeholder="e.g., Climate expertise, Risk management"
                          />
                        </div>
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">Responsibility *</label>
                        <textarea 
                          className="form-textarea" 
                          rows={2}
                          value={role.responsibility}
                          onChange={(e) => updateGovernanceRole(role.id, 'responsibility', e.target.value)}
                          placeholder="e.g., Strategic oversight, Implementation monitoring, Target setting"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">Qualifications</label>
                        <input 
                          type="text" 
                          className="form-input"
                          value={role.qualifications}
                          onChange={(e) => updateGovernanceRole(role.id, 'qualifications', e.target.value)}
                          placeholder="e.g., Professional certifications, relevant experience"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 7. Expenditure and Investment */}
            <div style={{ 
              border: '1px solid #dee2e6', 
              borderRadius: '8px', 
              padding: '20px', 
              marginBottom: '20px',
              background: '#fff'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                marginBottom: '15px',
                paddingBottom: '10px',
                borderBottom: '1px solid #dee2e6'
              }}>
                <h5 style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
                  💰 Expenditure and Investment
                  <InfoIcon title="Report expenditure on implementing the transition plan. The percentage is automatically calculated based on your inputs." />
                </h5>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Transition Plan Expenditure *</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    value={transitionPlanExpenditure}
                    onChange={(e) => setTransitionPlanExpenditure(e.target.value)}
                    placeholder="0"
                    min="0"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Total Expenditure *</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    value={totalExpenditure}
                    onChange={(e) => setTotalExpenditure(e.target.value)}
                    placeholder="0"
                    min="0"
                  />
            </div>
            <div className="form-group">
                <label className="form-label">Currency</label>
                  <select 
                    className="form-select"
                    value={expenditureCurrency}
                    onChange={(e) => setExpenditureCurrency(e.target.value)}
                  >
                    <option value="">Select Currency</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="JPY">JPY</option>
                    <option value="INR">INR</option>
              </select>
              </div>
              </div>

                <div className="form-group">
                <label className="form-label">Calculated Percentage (Auto-calculated)</label>
                  <input 
                  type="text" 
                    className="form-input" 
                  value={`${calculateExpenditurePercentage()}%`}
                  readOnly
                  style={{ 
                    backgroundColor: '#f8f9fa',
                    color: '#495057',
                    fontWeight: 'bold'
                  }}
                />
            </div>
          </div>
          
            {/* 8. Addressing People & Environment */}
            <div style={{ 
              border: '1px solid #dee2e6', 
              borderRadius: '8px', 
              padding: '20px', 
              marginBottom: '20px',
              background: '#fff'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                marginBottom: '15px',
                paddingBottom: '10px',
                borderBottom: '1px solid #dee2e6'
              }}>
                <h5 style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
                  🌍 People & Environment Impacts
                  <InfoIcon title="Describe how the plan addresses impacts on people (jobs, skills) and environment (biodiversity, land use)" />
                </h5>
            </div>
              
              <div className="form-group">
                <label className="form-label">Impact Management Description</label>
                <textarea 
                  className="form-textarea" 
                  rows={6}
                  value={peopleEnvironmentImpacts}
                  onChange={(e) => setPeopleEnvironmentImpacts(e.target.value)}
                  placeholder="Describe impacts on workers, communities, Indigenous Peoples, biodiversity, land use changes, and mitigation measures such as upskilling workers, managing land use change, biodiversity conservation strategies..."
                />
              </div>
          </div>

            {/* 9. Transition Risks and Opportunities */}
            <div style={{ 
              border: '1px solid #dee2e6', 
              borderRadius: '8px', 
              padding: '20px', 
              marginBottom: '20px',
              background: '#fff'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '15px',
                paddingBottom: '10px',
                borderBottom: '1px solid #dee2e6'
              }}>
                <h5 style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
                  ⚠️ Climate Risks and Opportunities Registry
                  <InfoIcon title="Comprehensive registry of climate transition risks and opportunities with detailed assessment parameters following TCFD framework" />
                </h5>
                <div>
                  <button 
                    type="button" 
                    onClick={addTransitionRisk}
                    style={{ 
                      padding: '8px 16px', 
                      border: '1px solid #dc3545', 
                      background: '#dc3545',
                      color: 'white',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginRight: '8px'
                    }}
                  >
                    + Add Risk
                  </button>
                  <button 
                    type="button" 
                    onClick={addTransitionOpportunity}
                    style={{ 
                      padding: '8px 16px', 
                      border: '1px solid #28a745', 
                      background: '#28a745',
                      color: 'white',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    + Add Opportunity
                  </button>
                </div>
              </div>
              
              {/* Summary Stats */}
              <div style={{ 
                display: 'flex', 
                gap: '20px', 
                marginBottom: '20px',
                padding: '15px',
                background: '#f8f9fa',
                borderRadius: '6px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc3545' }}>
                    {transitionRisks.length}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>Total Risks</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>
                    {transitionOpportunities.length}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>Total Opportunities</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffc107' }}>
                    {transitionRisks.filter(r => r.impact === 'high').length + transitionOpportunities.filter(o => o.potential === 'high').length}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>High Impact/Potential</div>
                </div>
              </div>

              {/* Risk and Opportunity Table */}
              {(transitionRisks.length === 0 && transitionOpportunities.length === 0) ? (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '40px', 
                  color: '#6c757d',
                  border: '2px dashed #dee2e6',
                  borderRadius: '8px'
                }}>
                  <p>No climate risks or opportunities identified yet.</p>
                  <p>Click "Add Risk" or "Add Opportunity" to start building your climate risk registry.</p>
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ 
                    width: '100%', 
                    borderCollapse: 'collapse',
                    fontSize: '14px'
                  }}>
                    <thead>
                      <tr style={{ background: '#f8f9fa' }}>
                        <th style={{ border: '1px solid #dee2e6', padding: '8px', textAlign: 'left', minWidth: '60px' }}>Type</th>
                        <th style={{ border: '1px solid #dee2e6', padding: '8px', textAlign: 'left', minWidth: '200px' }}>Risk/Opportunity Title</th>
                        <th style={{ border: '1px solid #dee2e6', padding: '8px', textAlign: 'left', minWidth: '120px' }}>Category</th>
                        <th style={{ border: '1px solid #dee2e6', padding: '8px', textAlign: 'left', minWidth: '100px' }}>TCFD Theme</th>
                        <th style={{ border: '1px solid #dee2e6', padding: '8px', textAlign: 'left', minWidth: '100px' }}>Time Horizon</th>
                        <th style={{ border: '1px solid #dee2e6', padding: '8px', textAlign: 'left', minWidth: '80px' }}>Likelihood</th>
                        <th style={{ border: '1px solid #dee2e6', padding: '8px', textAlign: 'left', minWidth: '100px' }}>Impact/Potential</th>
                        <th style={{ border: '1px solid #dee2e6', padding: '8px', textAlign: 'left', minWidth: '150px' }}>Financial Impact</th>
                        <th style={{ border: '1px solid #dee2e6', padding: '8px', textAlign: 'left', minWidth: '120px' }}>Mitigation/Response</th>
                        <th style={{ border: '1px solid #dee2e6', padding: '8px', textAlign: 'center', minWidth: '80px' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Render Risks */}
                      {transitionRisks.map((risk, index) => (
                        <tr key={risk.id} style={{ background: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                          <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                            <span style={{ 
                              background: '#dc3545', 
                              color: 'white', 
                              padding: '2px 6px', 
                              borderRadius: '4px', 
                              fontSize: '12px' 
                            }}>
                              🚨 Risk
                            </span>
                          </td>
                          <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                            <textarea 
                              className="form-textarea" 
                              style={{ 
                                width: '100%', 
                                minHeight: '60px', 
                                fontSize: '12px',
                                border: 'none',
                                background: 'transparent',
                                resize: 'vertical'
                              }}
                              value={risk.description}
                              onChange={(e) => updateTransitionRisk(risk.id, 'description', e.target.value)}
                              placeholder="Describe the climate risk..."
                            />
                          </td>
                          <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                            <select 
                              className="form-select"
                              style={{ width: '100%', fontSize: '12px' }}
                              value={risk.category}
                              onChange={(e) => updateTransitionRisk(risk.id, 'category', e.target.value)}
                            >
                              <option value="">Select</option>
                              <option value="policy_legal">Policy & Legal</option>
                              <option value="technology">Technology</option>
                              <option value="market">Market</option>
                              <option value="reputation">Reputation</option>
                              <option value="physical_acute">Physical Acute</option>
                              <option value="physical_chronic">Physical Chronic</option>
                            </select>
                          </td>
                          <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                            <select 
                              className="form-select"
                              style={{ width: '100%', fontSize: '12px' }}
                              value={risk.tcfdTheme || ''}
                              onChange={(e) => updateTransitionRisk(risk.id, 'tcfdTheme', e.target.value)}
                            >
                              <option value="">Select</option>
                              <option value="governance">Governance</option>
                              <option value="strategy">Strategy</option>
                              <option value="risk_mgmt">Risk Management</option>
                              <option value="metrics_targets">Metrics & Targets</option>
                            </select>
                          </td>
                          <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                            <select 
                              className="form-select"
                              style={{ width: '100%', fontSize: '12px' }}
                              value={risk.timeHorizon || ''}
                              onChange={(e) => updateTransitionRisk(risk.id, 'timeHorizon', e.target.value)}
                            >
                              <option value="">Select</option>
                              <option value="short">Short (0-3 yrs)</option>
                              <option value="medium">Medium (3-10 yrs)</option>
                              <option value="long">Long (10+ yrs)</option>
                            </select>
                          </td>
                          <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                            <select 
                              className="form-select"
                              style={{ width: '100%', fontSize: '12px' }}
                              value={risk.likelihood || ''}
                              onChange={(e) => updateTransitionRisk(risk.id, 'likelihood', e.target.value)}
                            >
                              <option value="">Select</option>
                              <option value="very_low">Very Low</option>
                              <option value="low">Low</option>
                              <option value="medium">Medium</option>
                              <option value="high">High</option>
                              <option value="very_high">Very High</option>
                            </select>
                          </td>
                          <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                            <select 
                              className="form-select"
                              style={{ width: '100%', fontSize: '12px' }}
                              value={risk.impact}
                              onChange={(e) => updateTransitionRisk(risk.id, 'impact', e.target.value)}
                            >
                              <option value="">Select</option>
                              <option value="low">Low</option>
                              <option value="medium">Medium</option>
                              <option value="high">High</option>
                              <option value="critical">Critical</option>
                            </select>
                          </td>
                          <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                            <textarea 
                              className="form-textarea" 
                              style={{ 
                                width: '100%', 
                                minHeight: '40px', 
                                fontSize: '12px',
                                border: 'none',
                                background: 'transparent',
                                resize: 'vertical'
                              }}
                              value={risk.financialImpact || ''}
                              onChange={(e) => updateTransitionRisk(risk.id, 'financialImpact', e.target.value)}
                              placeholder="$ impact estimate..."
                            />
                          </td>
                          <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                            <textarea 
                              className="form-textarea" 
                              style={{ 
                                width: '100%', 
                                minHeight: '40px', 
                                fontSize: '12px',
                                border: 'none',
                                background: 'transparent',
                                resize: 'vertical'
                              }}
                              value={risk.mitigation}
                              onChange={(e) => updateTransitionRisk(risk.id, 'mitigation', e.target.value)}
                              placeholder="Mitigation strategies..."
                            />
                          </td>
                          <td style={{ border: '1px solid #dee2e6', padding: '8px', textAlign: 'center' }}>
                            <button 
                              type="button"
                              onClick={() => removeTransitionRisk(risk.id)}
                              style={{ 
                                padding: '4px 8px', 
                                border: '1px solid #dc3545', 
                                background: '#dc3545',
                                color: 'white',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '12px'
                              }}
                            >
                              🗑️
                            </button>
                          </td>
                        </tr>
                      ))}
                      
                      {/* Render Opportunities */}
                      {transitionOpportunities.map((opportunity, index) => (
                        <tr key={opportunity.id} style={{ background: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                          <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                            <span style={{ 
                              background: '#28a745', 
                              color: 'white', 
                              padding: '2px 6px', 
                              borderRadius: '4px', 
                              fontSize: '12px' 
                            }}>
                              ✨ Opportunity
                            </span>
                          </td>
                          <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                            <textarea 
                              className="form-textarea" 
                              style={{ 
                                width: '100%', 
                                minHeight: '60px', 
                                fontSize: '12px',
                                border: 'none',
                                background: 'transparent',
                                resize: 'vertical'
                              }}
                              value={opportunity.description}
                              onChange={(e) => updateTransitionOpportunity(opportunity.id, 'description', e.target.value)}
                              placeholder="Describe the climate opportunity..."
                            />
                          </td>
                          <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                            <select 
                              className="form-select"
                              style={{ width: '100%', fontSize: '12px' }}
                              value={opportunity.category}
                              onChange={(e) => updateTransitionOpportunity(opportunity.id, 'category', e.target.value)}
                            >
                              <option value="">Select</option>
                              <option value="resource_efficiency">Resource Efficiency</option>
                              <option value="energy_source">Energy Source</option>
                              <option value="products_services">Products & Services</option>
                              <option value="markets">Markets</option>
                              <option value="resilience">Resilience</option>
                            </select>
                          </td>
                          <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                            <select 
                              className="form-select"
                              style={{ width: '100%', fontSize: '12px' }}
                              value={opportunity.tcfdTheme || ''}
                              onChange={(e) => updateTransitionOpportunity(opportunity.id, 'tcfdTheme', e.target.value)}
                            >
                              <option value="">Select</option>
                              <option value="governance">Governance</option>
                              <option value="strategy">Strategy</option>
                              <option value="risk_mgmt">Risk Management</option>
                              <option value="metrics_targets">Metrics & Targets</option>
                            </select>
                          </td>
                          <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                            <select 
                              className="form-select"
                              style={{ width: '100%', fontSize: '12px' }}
                              value={opportunity.timeHorizon || ''}
                              onChange={(e) => updateTransitionOpportunity(opportunity.id, 'timeHorizon', e.target.value)}
                            >
                              <option value="">Select</option>
                              <option value="short">Short (0-3 yrs)</option>
                              <option value="medium">Medium (3-10 yrs)</option>
                              <option value="long">Long (10+ yrs)</option>
                            </select>
                          </td>
                          <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                            <select 
                              className="form-select"
                              style={{ width: '100%', fontSize: '12px' }}
                              value={opportunity.likelihood || ''}
                              onChange={(e) => updateTransitionOpportunity(opportunity.id, 'likelihood', e.target.value)}
                            >
                              <option value="">Select</option>
                              <option value="very_low">Very Low</option>
                              <option value="low">Low</option>
                              <option value="medium">Medium</option>
                              <option value="high">High</option>
                              <option value="very_high">Very High</option>
                            </select>
                          </td>
                          <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                            <select 
                              className="form-select"
                              style={{ width: '100%', fontSize: '12px' }}
                              value={opportunity.potential}
                              onChange={(e) => updateTransitionOpportunity(opportunity.id, 'potential', e.target.value)}
                            >
                              <option value="">Select</option>
                              <option value="low">Low</option>
                              <option value="medium">Medium</option>
                              <option value="high">High</option>
                              <option value="critical">Critical</option>
                            </select>
                          </td>
                          <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                            <textarea 
                              className="form-textarea" 
                              style={{ 
                                width: '100%', 
                                minHeight: '40px', 
                                fontSize: '12px',
                                border: 'none',
                                background: 'transparent',
                                resize: 'vertical'
                              }}
                              value={opportunity.financialImpact || ''}
                              onChange={(e) => updateTransitionOpportunity(opportunity.id, 'financialImpact', e.target.value)}
                              placeholder="$ value estimate..."
                            />
                          </td>
                          <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                            <input 
                              type="text" 
                              className="form-input"
                              style={{ 
                                width: '100%', 
                                fontSize: '12px',
                                border: 'none',
                                background: 'transparent'
                              }}
                              value={opportunity.timeline}
                              onChange={(e) => updateTransitionOpportunity(opportunity.id, 'timeline', e.target.value)}
                              placeholder="Response strategy..."
                            />
                          </td>
                          <td style={{ border: '1px solid #dee2e6', padding: '8px', textAlign: 'center' }}>
                            <button 
                              type="button"
                              onClick={() => removeTransitionOpportunity(opportunity.id)}
                              style={{ 
                                padding: '4px 8px', 
                                border: '1px solid #dc3545', 
                                background: '#dc3545',
                                color: 'white',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '12px'
                              }}
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
            </div>

            {/* 10. Stakeholder Engagement */}
            <div style={{ 
              border: '1px solid #dee2e6', 
              borderRadius: '8px', 
              padding: '20px', 
              marginBottom: '20px',
              background: '#fff'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '15px',
                paddingBottom: '10px',
                borderBottom: '1px solid #dee2e6'
              }}>
                <h5 style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
                  🤝 Stakeholder Engagement
                  <InfoIcon title="Describe how stakeholders have been engaged in developing and implementing the plan" />
                </h5>
                <button 
                  type="button" 
                  onClick={addStakeholderEngagement}
                  style={{ 
                    padding: '8px 16px', 
                    border: '1px solid #28a745', 
                    background: '#28a745',
                    color: 'white',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  + Add Engagement
                </button>
              </div>
              
              {stakeholderEngagements.length === 0 ? (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '40px', 
                  color: '#6c757d',
                  border: '2px dashed #dee2e6',
                  borderRadius: '8px'
                }}>
                  <p>No stakeholder engagements defined yet.</p>
                  <p>Click "Add Engagement" to document your stakeholder consultation activities.</p>
                </div>
              ) : (
                <div>
                  {stakeholderEngagements.map((engagement, index) => (
                    <div key={engagement.id} style={{ 
                      border: '1px solid #e9ecef', 
                      borderRadius: '6px', 
                      padding: '15px', 
                      marginBottom: '15px',
                      background: '#f8f9fa'
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        marginBottom: '10px'
                      }}>
                        <h6 style={{ margin: 0 }}>Engagement #{index + 1}</h6>
                        <button 
                          type="button"
                          onClick={() => removeStakeholderEngagement(engagement.id)}
                          style={{ 
                            padding: '5px 10px', 
                            border: '1px solid #dc3545', 
                            background: '#dc3545',
                            color: 'white',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                      
                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">Stakeholder Type *</label>
                          <select 
                            className="form-select"
                            value={engagement.type}
                            onChange={(e) => updateStakeholderEngagement(engagement.id, 'type', e.target.value)}
                          >
                            <option value="">Select stakeholder type</option>
                            <option value="employees">Employees</option>
                            <option value="community">Local communities</option>
                            <option value="suppliers">Suppliers</option>
                            <option value="investors">Investors</option>
                            <option value="regulators">Regulators</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Frequency</label>
                          <input 
                            type="text" 
                            className="form-input"
                            value={engagement.frequency}
                            onChange={(e) => updateStakeholderEngagement(engagement.id, 'frequency', e.target.value)}
                            placeholder="e.g., Quarterly, Annual"
                          />
                        </div>
                      </div>
                      
                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">Last Engagement Date</label>
                          <input 
                            type="date" 
                            className="form-input"
                            value={engagement.lastEngagement}
                            onChange={(e) => updateStakeholderEngagement(engagement.id, 'lastEngagement', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">Engagement Description *</label>
                        <textarea 
                          className="form-textarea" 
                          rows={3}
                          value={engagement.description}
                          onChange={(e) => updateStakeholderEngagement(engagement.id, 'description', e.target.value)}
                          placeholder="Describe engagement activities, methods, outcomes, and feedback received..."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Save Section */}
            <div className="save-section">
              <a href="#" className="attachments-link">
                <span>📎</span>
                <span>Attachments</span>
              </a>
              <button type="button" className="save-btn">SAVE</button>
            </div>
          </div>
          
          {/* Requirement 1b */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">1b</div>
              <div className="sub-question-title">Describe how the transition plan is embedded in its business strategy of the organisation</div>
              <div className="info-icon" title="The organization should report: whether and how the responsibility to manage climate change-related impacts is linked to performance assessments or incentive mechanisms.">i</div>
            </div>
            <textarea className="form-textarea" rows={4}></textarea>
          </div>

          {/* Requirement 1c - Enhanced Dynamic Table Structure */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">1c</div>
              <div className="sub-question-title">Targets to achieve the transition plan</div>
              <InfoIcon 
                title="When reporting progress toward the targets, the organization should describe known barriers to target achievement and, if applicable, the role of locked-in GHG emissions. Use the dynamic table below to systematically capture your targets across different categories with proper base years and methodological foundations."
              />
            </div>

            {/* Dynamic Targets Table */}
            <div style={{ 
              border: '1px solid #dee2e6', 
              borderRadius: '8px', 
              padding: '20px', 
              marginBottom: '20px',
              background: '#fff'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '20px',
                paddingBottom: '10px',
                borderBottom: '1px solid #dee2e6'
              }}>
                <h5 style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
                  🎯 Transition Plan Targets Registry
                  <InfoIcon title="Define your targets across GHG emissions reduction, fossil fuel phase-out, and other climate mitigation categories. Each target should have clear base years and methodological frameworks." />
                </h5>
                <button 
                  type="button" 
                  onClick={addTransitionPlanTarget}
                  style={{ 
                    padding: '8px 16px', 
                    border: '1px solid #28a745', 
                    background: '#28a745',
                    color: 'white',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  + Add Target
                </button>
            </div>

              {/* Summary Stats */}
              <div style={{ 
                display: 'flex', 
                gap: '20px', 
                marginBottom: '20px',
                padding: '15px',
                background: '#f8f9fa',
                borderRadius: '6px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#28a745' }}>
                    {transitionPlanTargets.length}
              </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>Total Targets</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#dc3545' }}>
                    {transitionPlanTargets.filter(t => t.category === 'ghg_emissions').length}
                </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>GHG Targets</div>
              </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffc107' }}>
                    {transitionPlanTargets.filter(t => t.category === 'fossil_fuel_phaseout').length}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>Fossil Fuel Targets</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#17a2b8' }}>
                    {transitionPlanTargets.filter(t => t.category === 'other_mitigation').length}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>Other Targets</div>
                </div>
            </div>

              {/* Targets Table */}
              {transitionPlanTargets.length === 0 ? (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '40px', 
                  color: '#6c757d',
                  border: '2px dashed #dee2e6',
                  borderRadius: '8px'
                }}>
                  <p>No transition plan targets defined yet.</p>
                  <p>Click "+ Add Target" to start building your targets registry for GHG emissions reduction, fossil fuel phase-out, and other climate mitigation goals.</p>
              </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ 
                    width: '100%', 
                    borderCollapse: 'collapse',
                    fontSize: '14px'
                  }}>
                    <thead>
                      <tr style={{ background: '#f8f9fa' }}>
                        <th style={{ 
                          border: '1px solid #dee2e6', 
                          padding: '12px', 
                          textAlign: 'left', 
                          minWidth: '150px',
                          fontWeight: 'bold'
                        }}>
                          Target Category *
                        </th>
                        <th style={{ 
                          border: '1px solid #dee2e6', 
                          padding: '12px', 
                          textAlign: 'left', 
                          minWidth: '250px',
                          fontWeight: 'bold'
                        }}>
                          Specific Targets *
                        </th>
                        <th style={{ 
                          border: '1px solid #dee2e6', 
                          padding: '12px', 
                          textAlign: 'left', 
                          minWidth: '120px',
                          fontWeight: 'bold'
                        }}>
                          Base Year
                        </th>
                        <th style={{ 
                          border: '1px solid #dee2e6', 
                          padding: '12px', 
                          textAlign: 'left', 
                          minWidth: '200px',
                          fontWeight: 'bold'
                        }}>
                          Standards, Methodologies, Assumptions
                        </th>
                        <th style={{ 
                          border: '1px solid #dee2e6', 
                          padding: '12px', 
                          textAlign: 'left', 
                          minWidth: '180px',
                          fontWeight: 'bold'
                        }}>
                          Notes / Comments
                        </th>
                        <th style={{ 
                          border: '1px solid #dee2e6', 
                          padding: '12px', 
                          textAlign: 'center', 
                          minWidth: '80px',
                          fontWeight: 'bold'
                        }}>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {transitionPlanTargets.map((target, index) => (
                        <tr key={target.id} style={{ background: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                          <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                            <select 
                              className="form-select"
                              style={{ width: '100%', fontSize: '12px' }}
                              value={target.category}
                              onChange={(e) => updateTransitionPlanTarget(target.id, 'category', e.target.value)}
                            >
                              <option value="">Select Category</option>
                              <option value="ghg_emissions">GHG Emissions Reduction Targets</option>
                              <option value="fossil_fuel_phaseout">Fossil Fuel Phase-out Targets</option>
                              <option value="other_mitigation">Other Climate Mitigation Targets</option>
                            </select>
                          </td>
                          <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                            <textarea 
                              className="form-textarea" 
                              style={{ 
                                width: '100%', 
                                minHeight: '80px', 
                                fontSize: '12px',
                                border: 'none',
                                background: 'transparent',
                                resize: 'vertical'
                              }}
                              value={target.specificTargets}
                              onChange={(e) => updateTransitionPlanTarget(target.id, 'specificTargets', e.target.value)}
                              placeholder={
                                target.category === 'ghg_emissions' ? 
                                'e.g., Reduce absolute Scope 1 & 2 GHG emissions by 50% by 2030 from 2020 baseline; Achieve net-zero emissions by 2050' :
                                target.category === 'fossil_fuel_phaseout' ?
                                'e.g., 100% renewable energy procurement by 2025; Phase out coal-based materials by 2030' :
                                target.category === 'other_mitigation' ?
                                'e.g., Engage 80% of suppliers by spend on climate action by 2028; Implement circular economy practices across all facilities by 2026' :
                                'Describe specific, measurable targets with clear timelines...'
                              }
                            />
                          </td>
                          <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                            <input 
                              type="number" 
                              className="form-input"
                              style={{ 
                                width: '100%', 
                                fontSize: '12px',
                                border: 'none',
                                background: 'transparent'
                              }}
                              value={target.baseYear}
                              onChange={(e) => updateTransitionPlanTarget(target.id, 'baseYear', e.target.value)}
                              placeholder="e.g., 2020"
                              min="1990"
                              max="2030"
                            />
                          </td>
                          <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                            <select 
                              className="form-select"
                              style={{ width: '100%', fontSize: '12px', marginBottom: '5px' }}
                              value={standardsMethodologiesOptions.includes(target.standardsMethodologies) ? target.standardsMethodologies : 'Other'}
                              onChange={(e) => {
                                if (e.target.value === 'Other') {
                                  updateTransitionPlanTarget(target.id, 'standardsMethodologies', '');
                                } else {
                                  updateTransitionPlanTarget(target.id, 'standardsMethodologies', e.target.value);
                                }
                              }}
                            >
                              <option value="">Select Standard/Methodology</option>
                              {standardsMethodologiesOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                              ))}
                            </select>
                            {(!standardsMethodologiesOptions.includes(target.standardsMethodologies) || target.standardsMethodologies === '') && (
                              <textarea 
                                className="form-textarea" 
                                style={{ 
                                  width: '100%', 
                                  minHeight: '60px', 
                                  fontSize: '12px',
                                  border: 'none',
                                  background: 'transparent',
                                  resize: 'vertical'
                                }}
                                value={target.standardsMethodologies}
                                onChange={(e) => updateTransitionPlanTarget(target.id, 'standardsMethodologies', e.target.value)}
                                placeholder="Specify standards, methodologies, and key assumptions used..."
                              />
                            )}
                          </td>
                          <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                            <textarea 
                              className="form-textarea" 
                              style={{ 
                                width: '100%', 
                                minHeight: '60px', 
                                fontSize: '12px',
                                border: 'none',
                                background: 'transparent',
                                resize: 'vertical'
                              }}
                              value={target.notesComments}
                              onChange={(e) => updateTransitionPlanTarget(target.id, 'notesComments', e.target.value)}
                              placeholder="Additional context, barriers to achievement, locked-in emissions considerations, progress updates..."
                            />
                          </td>
                          <td style={{ border: '1px solid #dee2e6', padding: '8px', textAlign: 'center' }}>
                            <button 
                              type="button"
                              onClick={() => removeTransitionPlanTarget(target.id)}
                              style={{ 
                                padding: '4px 8px', 
                                border: '1px solid #dc3545', 
                                background: '#dc3545',
                                color: 'white',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '12px'
                              }}
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

              {/* Guidance Note */}
              <div style={{ 
                marginTop: '20px',
                padding: '15px',
                background: '#e8f4fd',
                borderRadius: '6px',
                border: '1px solid #bee5eb'
              }}>
                <h6 style={{ margin: '0 0 10px 0', color: '#0c5460' }}>📋 Guidance for Target Categories:</h6>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px', color: '#0c5460' }}>
                  <li><strong>GHG Emissions Reduction Targets:</strong> Include Scope 1, 2, and 3 targets as reported under Disclosure 102-4. Specify absolute or intensity-based reductions.</li>
                  <li><strong>Fossil Fuel Phase-out Targets:</strong> Include renewable energy procurement targets, targets to phase out fossil fuel-based materials, and energy transition milestones.</li>
                  <li><strong>Other Climate Mitigation Targets:</strong> Include business, operational, engagement, and governance targets that drive transition plan progress (e.g., supplier engagement, circular economy, nature-based solutions).</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Requirement 1d */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">1d</div>
              <div className="sub-question-title">Describe how the organisation's transition plan aligns with just transition principles</div>
              <div className="info-icon" title="According to the International Labour Organization (ILO), a just transition involves greening the economy in a way that is as fair and inclusive as possible to everyone concerned.">i</div>
            </div>
            <textarea className="form-textarea" rows={4}></textarea>
          </div>

          {/* Requirement 1e */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">1e</div>
              <div className="sub-question-title">Impacts on environment - Biodiversity impact</div>
                <div className="info-icon" title="Actions to mitigate climate change can have positive impacts on biodiversity. For example, building offshore wind farms to transition to wind energy can act as refuges for fish and marine mammals.">i</div>
              </div>
            <textarea className="form-textarea" rows={4}></textarea>
          </div>

          {/* Requirement 1f */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">1f</div>
              <div className="sub-question-title">Describe how the organisation's public policy activities, including lobbying activities, are consistent with the overall transition plan</div>
              <div className="info-icon" title="The organization should report: its stance on significant issues related to the transition plan, for example, phasing out fossil fuels, that are the focus of its participation in public policy development and lobbying.">i</div>
            </div>
            <textarea className="form-textarea" rows={4}></textarea>
          </div>

          {/* Requirement 1g */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">1g</div>
              <div className="sub-question-title">The organisation shall explain, in the absence of a transition plan, why it does not exist, and describe the steps being taken to develop it and the expected time frame</div>
              <div className="info-icon" title="Explain, in the absence of a transition plan, why it does not exist, and describe the steps being taken to develop it and the expected time frame.">i</div>
            </div>
            <textarea className="form-textarea" rows={4}></textarea>
          </div>
          
          <div className="save-section">
            <a href="#" className="attachments-link">
              <span>📎</span>
              <span>Attachments</span>
            </a>
            <button type="button" className="save-btn">SAVE</button>
          </div>
        </div>

        {/* Disclosure 102-2: Climate change adaptation plan */}
        <div className="section-header">
          <div className="main-heading">
            2. Climate change adaptation plan
            <div className="info-icon" title="This section covers the organization's climate change adaptation plan, including impacts assessment, policies and actions, expenditure, governance, targets, stakeholder engagement, and impact management for climate resilience.">i</div>
          </div>
        </div>

        <div className="question-section">
          {/* Question 2a - Enhanced with CRROs Registry and Impact Assessment */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">2a</div>
              <div className="sub-question-title">Describe the impacts on people and the environment associated with its climate change-related risks and opportunities and how they were considered in the development of the adaptation plan</div>
              <InfoIcon 
                title="Climate change-related risks can be classified as physical or transition risks. Use the CRROs registry below to identify relevant risks and opportunities, then assess their impacts on people and environment."
              />
            </div>

            {/* Part 1: Climate Risks and Opportunities Registry (CRROs) */}
            <div style={{ 
              border: '1px solid #dee2e6', 
              borderRadius: '8px', 
              padding: '20px', 
              marginBottom: '30px',
              background: '#fff'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '20px',
                paddingBottom: '10px',
                borderBottom: '1px solid #dee2e6'
              }}>
                <h5 style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
                  📊 Climate Risks and Opportunities Registry (CRROs)
                  <InfoIcon title="Reference registry of climate-related risks and opportunities for the Power and Utilities sector. Review these entries to identify relevant risks and opportunities for your impact assessment." />
                </h5>
                <button 
                  type="button" 
                  onClick={addCrroEntry}
                  style={{ 
                    padding: '8px 16px', 
                    border: '1px solid #28a745', 
                    background: '#28a745',
                    color: 'white',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  + Add Risk/Opportunity
                </button>
          </div>

              {/* Summary Stats */}
              <div style={{ 
                display: 'flex', 
                gap: '20px', 
                marginBottom: '20px',
                padding: '15px',
                background: '#f8f9fa',
                borderRadius: '6px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#28a745' }}>
                    {dynamicCrroData.length}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>Total CRROs</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#dc3545' }}>
                    {dynamicCrroData.filter(c => c.type === 'Risk').length}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>Risks</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#28a745' }}>
                    {dynamicCrroData.filter(c => c.type === 'Opportunity').length}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>Opportunities</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffc107' }}>
                    {dynamicCrroData.filter(c => c.category === 'Physical').length}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>Physical</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#17a2b8' }}>
                    {dynamicCrroData.filter(c => c.category === 'Transition').length}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>Transition</div>
                </div>
            </div>

              {/* CRROs Table */}
              <div style={{ overflowX: 'auto' }}>
                <table style={{ 
                  width: '100%', 
                  borderCollapse: 'collapse',
                  fontSize: '12px'
                }}>
                  <thead>
                    <tr style={{ background: '#f8f9fa' }}>
                      <th style={{ border: '1px solid #dee2e6', padding: '8px', textAlign: 'left', minWidth: '60px' }}>Type</th>
                      <th style={{ border: '1px solid #dee2e6', padding: '8px', textAlign: 'left', minWidth: '250px' }}>Risk/Opportunity Title</th>
                      <th style={{ border: '1px solid #dee2e6', padding: '8px', textAlign: 'left', minWidth: '100px' }}>Category</th>
                      <th style={{ border: '1px solid #dee2e6', padding: '8px', textAlign: 'left', minWidth: '120px' }}>Activity</th>
                      <th style={{ border: '1px solid #dee2e6', padding: '8px', textAlign: 'left', minWidth: '120px' }}>Hazard/Driver</th>
                      <th style={{ border: '1px solid #dee2e6', padding: '8px', textAlign: 'left', minWidth: '100px' }}>Time Horizon</th>
                      <th style={{ border: '1px solid #dee2e6', padding: '8px', textAlign: 'left', minWidth: '80px' }}>Likelihood</th>
                      <th style={{ border: '1px solid #dee2e6', padding: '8px', textAlign: 'left', minWidth: '80px' }}>Severity</th>
                      <th style={{ border: '1px solid #dee2e6', padding: '8px', textAlign: 'center', minWidth: '100px' }}>Add to Assessment</th>
                      <th style={{ border: '1px solid #dee2e6', padding: '8px', textAlign: 'center', minWidth: '80px' }}>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dynamicCrroData.map((crro, index) => (
                      <tr key={crro.uniqueRefId} style={{ background: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                        <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                          <select 
                            className="form-select"
                            style={{ 
                              width: '100%', 
                              fontSize: '10px',
                              padding: '2px 4px',
                              background: crro.type === 'Risk' ? '#dc3545' : '#28a745',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px'
                            }}
                            value={crro.type}
                            onChange={(e) => updateCrroEntry(crro.uniqueRefId, 'type', e.target.value)}
                          >
                            <option value="Risk">🚨 Risk</option>
                            <option value="Opportunity">✨ Opportunity</option>
                          </select>
                        </td>
                        <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                          <textarea 
                            className="form-textarea" 
                            style={{ 
                              width: '100%', 
                              minHeight: '60px', 
                              fontSize: '10px',
                              border: 'none',
                              background: 'transparent',
                              resize: 'vertical'
                            }}
                            value={crro.riskTitle}
                            onChange={(e) => updateCrroEntry(crro.uniqueRefId, 'riskTitle', e.target.value)}
                            placeholder="Enter risk/opportunity title..."
                          />
                        </td>
                        <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                          <select 
                            className="form-select"
                            style={{ 
                              width: '100%', 
                              fontSize: '10px',
                              padding: '2px 4px',
                              background: crro.category === 'Physical' ? '#ffc107' : '#17a2b8',
                              color: 'white',
                              border: 'none',
                              borderRadius: '3px'
                            }}
                            value={crro.category}
                            onChange={(e) => updateCrroEntry(crro.uniqueRefId, 'category', e.target.value)}
                          >
                            <option value="Physical">Physical</option>
                            <option value="Transition">Transition</option>
                          </select>
                        </td>
                        <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                          <input 
                            type="text" 
                            className="form-input"
                            style={{ 
                              width: '100%', 
                              fontSize: '10px',
                              border: 'none',
                              background: 'transparent'
                            }}
                            value={crro.activityName}
                            onChange={(e) => updateCrroEntry(crro.uniqueRefId, 'activityName', e.target.value)}
                            placeholder="Activity name..."
                          />
                        </td>
                        <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                          <input 
                            type="text" 
                            className="form-input"
                            style={{ 
                              width: '100%', 
                              fontSize: '10px',
                              border: 'none',
                              background: 'transparent'
                            }}
                            value={crro.hazardDriver}
                            onChange={(e) => updateCrroEntry(crro.uniqueRefId, 'hazardDriver', e.target.value)}
                            placeholder="Hazard/driver..."
                          />
                        </td>
                        <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                          <select 
                            className="form-select"
                            style={{ 
                              width: '100%', 
                              fontSize: '10px',
                              border: 'none',
                              background: 'transparent'
                            }}
                            value={crro.timeHorizon}
                            onChange={(e) => updateCrroEntry(crro.uniqueRefId, 'timeHorizon', e.target.value)}
                          >
                            <option value="">Select...</option>
                            <option value="Short term (0-3 yrs)">Short term (0-3 yrs)</option>
                            <option value="Medium term (3-10 yrs)">Medium term (3-10 yrs)</option>
                            <option value="Long term (10+ yrs)">Long term (10+ yrs)</option>
                          </select>
                        </td>
                        <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                          <select 
                            className="form-select"
                            style={{ 
                              width: '100%', 
                              fontSize: '10px',
                              border: 'none',
                              background: 'transparent'
                            }}
                            value={crro.likelihood}
                            onChange={(e) => updateCrroEntry(crro.uniqueRefId, 'likelihood', e.target.value)}
                          >
                            <option value="">Select...</option>
                            <option value="Very Low">Very Low</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Very High">Very High</option>
                          </select>
                        </td>
                        <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                          <select 
                            className="form-select"
                            style={{ 
                              width: '100%', 
                              fontSize: '10px',
                              border: 'none',
                              background: 'transparent'
                            }}
                            value={crro.severity}
                            onChange={(e) => updateCrroEntry(crro.uniqueRefId, 'severity', e.target.value)}
                          >
                            <option value="">Select...</option>
                            <option value="Very Low">Very Low</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Critical">Critical</option>
                          </select>
                        </td>
                        <td style={{ border: '1px solid #dee2e6', padding: '8px', textAlign: 'center' }}>
                          <button 
                            type="button"
                            onClick={() => prefillFromCrro(crro.riskTitle)}
                            style={{ 
                              padding: '4px 8px', 
                              border: '1px solid #28a745', 
                              background: '#28a745',
                              color: 'white',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '10px'
                            }}
                          >
                            ➕ Add
                          </button>
                        </td>
                        <td style={{ border: '1px solid #dee2e6', padding: '8px', textAlign: 'center' }}>
                          <button 
                            type="button"
                            onClick={() => removeCrroEntry(crro.uniqueRefId)}
                            style={{ 
                              padding: '4px 8px', 
                              border: '1px solid #dc3545', 
                              background: '#dc3545',
                              color: 'white',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '10px'
                            }}
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Part 2: Impact Assessment Table */}
            <div style={{ 
              border: '1px solid #dee2e6', 
              borderRadius: '8px', 
              padding: '20px', 
              marginBottom: '20px',
              background: '#fff'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '20px',
                paddingBottom: '10px',
                borderBottom: '1px solid #dee2e6'
              }}>
                <h5 style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
                  🎯 Impact Assessment - People and Environment
                  <InfoIcon title="Assess how each relevant climate risk or opportunity impacts people and the environment, and describe how these impacts were considered in your adaptation plan development." />
                </h5>
                <button 
                  type="button" 
                  onClick={addCrroImpactAssessment}
                  style={{ 
                    padding: '8px 16px', 
                    border: '1px solid #28a745', 
                    background: '#28a745',
                    color: 'white',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  + Add Assessment
                </button>
              </div>

              {/* Impact Assessment Table */}
              {crroImpactAssessments.length === 0 ? (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '40px', 
                  color: '#6c757d',
                  border: '2px dashed #dee2e6',
                  borderRadius: '8px'
                }}>
                  <p>No impact assessments added yet.</p>
                  <p>Use the "+ Add Assessment" button above or click "➕ Add" next to relevant CRROs to start your impact assessment.</p>
            </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ 
                    width: '100%', 
                    borderCollapse: 'collapse',
                    fontSize: '14px'
                  }}>
                    <thead>
                      <tr style={{ background: '#f8f9fa' }}>
                        <th style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'left', minWidth: '200px', fontWeight: 'bold' }}>
                          CRRO Title *
                        </th>
                        <th style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'left', minWidth: '200px', fontWeight: 'bold' }}>
                          Impact of CRROs on People *
                        </th>
                        <th style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'left', minWidth: '200px', fontWeight: 'bold' }}>
                          Impact of CRROs on Environment *
                        </th>
                        <th style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'left', minWidth: '200px', fontWeight: 'bold' }}>
                          Consideration of CRROs in Adaptation Plan *
                        </th>
                        <th style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'center', minWidth: '80px', fontWeight: 'bold' }}>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {crroImpactAssessments.map((assessment, index) => (
                        <tr key={assessment.id} style={{ background: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                          <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                            <select 
                              className="form-select"
                              style={{ width: '100%', fontSize: '12px', marginBottom: '5px' }}
                              value={assessment.crroTitle}
                              onChange={(e) => updateCrroImpactAssessment(assessment.id, 'crroTitle', e.target.value)}
                            >
                              <option value="">Select CRRO...</option>
                              {dynamicCrroData.map(crro => (
                                <option key={crro.uniqueRefId} value={crro.riskTitle}>
                                  {crro.type}: {crro.riskTitle.substring(0, 50)}...
                                </option>
                              ))}
                            </select>
                            {assessment.crroTitle && !dynamicCrroData.find(c => c.riskTitle === assessment.crroTitle) && (
                              <textarea 
                                className="form-textarea" 
                                style={{ 
                                  width: '100%', 
                                  minHeight: '60px', 
                                  fontSize: '12px',
                                  border: 'none',
                                  background: 'transparent',
                                  resize: 'vertical'
                                }}
                                value={assessment.crroTitle}
                                onChange={(e) => updateCrroImpactAssessment(assessment.id, 'crroTitle', e.target.value)}
                                placeholder="Enter custom CRRO title..."
                              />
                            )}
                          </td>
                          <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                            <textarea 
                              className="form-textarea" 
                              style={{ 
                                width: '100%', 
                                minHeight: '100px', 
                                fontSize: '12px',
                                border: 'none',
                                background: 'transparent',
                                resize: 'vertical'
                              }}
                              value={assessment.impactOnPeople}
                              onChange={(e) => updateCrroImpactAssessment(assessment.id, 'impactOnPeople', e.target.value)}
                              placeholder="e.g., Workers may face increased safety risks during extreme weather events; Communities may experience disrupted services; Indigenous Peoples may face impacts on traditional practices..."
                            />
                          </td>
                          <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                            <textarea 
                              className="form-textarea" 
                              style={{ 
                                width: '100%', 
                                minHeight: '100px', 
                                fontSize: '12px',
                                border: 'none',
                                background: 'transparent',
                                resize: 'vertical'
                              }}
                              value={assessment.impactOnEnvironment}
                              onChange={(e) => updateCrroImpactAssessment(assessment.id, 'impactOnEnvironment', e.target.value)}
                              placeholder="e.g., Ecosystem disruption from infrastructure damage; Increased emissions from backup generation; Habitat fragmentation; Water resource impacts; Biodiversity effects..."
                            />
                          </td>
                          <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                            <textarea 
                              className="form-textarea" 
                              style={{ 
                                width: '100%', 
                                minHeight: '100px', 
                                fontSize: '12px',
                                border: 'none',
                                background: 'transparent',
                                resize: 'vertical'
                              }}
                              value={assessment.considerationInAdaptationPlan}
                              onChange={(e) => updateCrroImpactAssessment(assessment.id, 'considerationInAdaptationPlan', e.target.value)}
                              placeholder="e.g., Infrastructure resilience measures implemented; Emergency response protocols developed; Stakeholder engagement processes enhanced; Environmental protection measures integrated..."
                            />
                          </td>
                          <td style={{ border: '1px solid #dee2e6', padding: '8px', textAlign: 'center' }}>
                            <button 
                              type="button"
                              onClick={() => removeCrroImpactAssessment(assessment.id)}
                              style={{ 
                                padding: '4px 8px', 
                                border: '1px solid #dc3545', 
                                background: '#dc3545',
                                color: 'white',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '12px'
                              }}
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

              {/* Guidance Note */}
              <div style={{ 
                marginTop: '20px',
                padding: '15px',
                background: '#e8f4fd',
                borderRadius: '6px',
                border: '1px solid #bee5eb'
              }}>
                <h6 style={{ margin: '0 0 10px 0', color: '#0c5460' }}>📋 Assessment Guidance:</h6>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px', color: '#0c5460' }}>
                  <li><strong>Impact on People:</strong> Consider workers, local communities, Indigenous Peoples, vulnerable populations, and stakeholders. Include safety, health, economic, and social impacts.</li>
                  <li><strong>Impact on Environment:</strong> Assess effects on biodiversity, ecosystems, water resources, air quality, soil, and climate. Include both direct and indirect environmental consequences.</li>
                  <li><strong>Adaptation Plan Consideration:</strong> Describe how these impacts influenced your adaptation strategy development, including specific measures, policies, or actions implemented.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Requirement 2b - Enhanced UI */}
          <div className="question-section">
            <div className="question-header">
              <div className="question-number">2b</div>
              <div className="question-title">Adaptation plan description</div>
              <InfoIcon 
                title="Examples of policies to adapt to climate change can include policies on: resilience building; infrastructure hardening; supply chain diversification; early warning systems; emergency preparedness; ecosystem-based adaptation; community resilience; water security; and stakeholder engagement for adaptation."
              />
              <div className="collaboration-icon">👥</div>
            </div>
            <div className="question-description">
              Describe the organization's adaptation plan for climate resilience, including policies, actions, scenarios, governance, expenditure, targets, and stakeholder engagement.
          </div>
          
            {/* 1. Overview of Adaptation Plan */}
            <div style={{ 
              border: '1px solid #dee2e6', 
              borderRadius: '8px', 
              padding: '20px', 
              marginBottom: '20px',
              background: '#fff'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '15px',
                paddingBottom: '10px',
                borderBottom: '1px solid #dee2e6'
              }}>
                <h5 style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
                  🛡️ Overview of Adaptation Plan
                  <InfoIcon title="Provide a high-level description of your climate adaptation plan, including key policies to adapt to climate change." />
                </h5>
            </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Planning Timeframe</label>
                  <select 
                    className="form-select"
                    value={adaptationOverview.timeframe}
                    onChange={(e) => setAdaptationOverview({...adaptationOverview, timeframe: e.target.value as any})}
                  >
                    <option value="">Select timeframe</option>
                    <option value="short_term">Short-term (1-3 years)</option>
                    <option value="medium_term">Medium-term (3-10 years)</option>
                    <option value="long_term">Long-term (10+ years)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Last Updated</label>
                  <input 
                    type="date" 
                    className="form-input"
                    value={adaptationOverview.lastUpdated}
                    onChange={(e) => setAdaptationOverview({...adaptationOverview, lastUpdated: e.target.value})}
                  />
                </div>
          </div>

                <div className="form-group">
                <label className="form-label">Adaptation Plan Description *</label>
                <textarea 
                  className="form-textarea" 
                  rows={6}
                  value={adaptationOverview.description}
                  onChange={(e) => setAdaptationOverview({...adaptationOverview, description: e.target.value})}
                  placeholder="E.g., We have policies addressing infrastructure resilience, emergency preparedness, supply chain diversification, and ecosystem-based adaptation. Describe short-, medium-, and long-term adaptation actions here."
                />
            </div>
            </div>

            {/* 2. Climate Adaptation Policies */}
            <div style={{ 
              border: '1px solid #dee2e6', 
              borderRadius: '8px', 
              padding: '20px', 
              marginBottom: '20px',
              background: '#fff'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '15px',
                paddingBottom: '10px',
                borderBottom: '1px solid #dee2e6'
              }}>
                <h5 style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
                  🌊 Climate Adaptation Policies
                  <InfoIcon title="Select and describe key policies to adapt to climate change" />
                </h5>
                <button 
                  type="button" 
                  onClick={addAdaptationPolicy}
                  style={{ 
                    padding: '8px 16px', 
                    border: '1px solid #28a745', 
                    background: '#28a745',
                    color: 'white',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  + Add Policy
                </button>
              </div>
              
              {adaptationPolicies.length === 0 ? (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '40px', 
                  color: '#6c757d',
                  border: '2px dashed #dee2e6',
                  borderRadius: '8px'
                }}>
                  <p>No adaptation policies added yet.</p>
                  <p>Click "Add Policy" to start defining your climate adaptation approach.</p>
                </div>
              ) : (
                <div>
                  {adaptationPolicies.map((policy, index) => (
                    <div key={policy.id} style={{ 
                      border: '1px solid #e9ecef', 
                      borderRadius: '6px', 
                      padding: '15px', 
                      marginBottom: '15px',
                      background: '#f8f9fa'
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        marginBottom: '10px'
                      }}>
                        <h6 style={{ margin: 0 }}>Policy #{index + 1}</h6>
                        <button 
                          type="button"
                          onClick={() => removeAdaptationPolicy(policy.id)}
                          style={{ 
                            padding: '5px 10px', 
                            border: '1px solid #dc3545', 
                            background: '#dc3545',
                            color: 'white',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                      
          <div className="form-row">
            <div className="form-group">
                          <label className="form-label">Policy Type *</label>
                          <select 
                            className="form-select"
                            value={policy.type}
                            onChange={(e) => updateAdaptationPolicy(policy.id, 'type', e.target.value)}
                          >
                            <option value="">Select policy type</option>
                            <option value="energy_consumption">Infrastructure resilience</option>
                            <option value="land_use_change">Emergency preparedness</option>
                            <option value="supplier_engagement">Supply chain diversification</option>
                            <option value="circular_economy">Ecosystem-based adaptation</option>
                            <option value="just_transition">Community resilience and engagement</option>
                  </select>
                </div>
            <div className="form-group">
                          <label className="form-label">Implementation Status</label>
                          <select 
                            className="form-select"
                            value={policy.status}
                            onChange={(e) => updateAdaptationPolicy(policy.id, 'status', e.target.value)}
                          >
                            <option value="">Select status</option>
                            <option value="planned">Planned</option>
                            <option value="in_progress">In Progress</option>
                            <option value="implemented">Implemented</option>
                            <option value="under_review">Under Review</option>
                          </select>
              </div>
            </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">Implementation Date</label>
                          <input 
                            type="date" 
                            className="form-input"
                            value={policy.implementationDate}
                            onChange={(e) => updateAdaptationPolicy(policy.id, 'implementationDate', e.target.value)}
                          />
              </div>
            </div>

                      <div className="form-group">
                        <label className="form-label">Policy Description *</label>
                        <textarea 
                          className="form-textarea" 
                          rows={3}
                          value={policy.description}
                          onChange={(e) => updateAdaptationPolicy(policy.id, 'description', e.target.value)}
                          placeholder="Describe the adaptation policy implementation approach, targets, and expected outcomes..."
                        />
              </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 3. Climate Scenarios and Methodologies */}
            <div style={{ 
              border: '1px solid #dee2e6', 
              borderRadius: '8px', 
              padding: '20px', 
              marginBottom: '20px',
              background: '#fff'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                marginBottom: '15px',
                paddingBottom: '10px',
                borderBottom: '1px solid #dee2e6'
              }}>
                <h5 style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
                  🌡️ Climate Scenarios and Methodologies
                  <InfoIcon title="Describe scenarios, temperature projections, and methodologies used to develop the adaptation plan" />
                </h5>
              </div>
              
              <div className="form-group">
                <label className="form-label">Climate Scenarios and Methodologies</label>
                <textarea 
                  className="form-textarea" 
                  rows={4}
                  value={adaptationScienceAlignment}
                  onChange={(e) => setAdaptationScienceAlignment(e.target.value)}
                  placeholder="Describe source of climate scenarios, temperature projections, methodologies and assumptions used to develop the adaptation plan..."
                />
            </div>
          </div>

            {/* 4. Expenditure and Investment */}
            <div style={{ 
              border: '1px solid #dee2e6', 
              borderRadius: '8px', 
              padding: '20px', 
              marginBottom: '20px',
              background: '#fff'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                marginBottom: '15px',
                paddingBottom: '10px',
                borderBottom: '1px solid #dee2e6'
              }}>
                <h5 style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
                  💰 Expenditure and Investment
                  <InfoIcon title="Report expenditure on implementing the adaptation plan. The percentage is automatically calculated based on your inputs." />
                </h5>
            </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Adaptation Plan Expenditure *</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    value={adaptationPlanExpenditure}
                    onChange={(e) => setAdaptationPlanExpenditure(e.target.value)}
                    placeholder="0"
                    min="0"
                  />
              </div>
                <div className="form-group">
                  <label className="form-label">Total Expenditure *</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    value={adaptationTotalExpenditure}
                    onChange={(e) => setAdaptationTotalExpenditure(e.target.value)}
                    placeholder="0"
                    min="0"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Currency</label>
                  <select 
                    className="form-select"
                    value={adaptationExpenditureCurrency}
                    onChange={(e) => setAdaptationExpenditureCurrency(e.target.value)}
                  >
                    <option value="">Select Currency</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="JPY">JPY</option>
                    <option value="INR">INR</option>
                  </select>
                </div>
            </div>

              <div className="form-group">
                <label className="form-label">Calculated Percentage (Auto-calculated)</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={`${calculateAdaptationExpenditurePercentage()}%`}
                  readOnly
                  style={{ 
                    backgroundColor: '#f8f9fa',
                    color: '#495057',
                    fontWeight: 'bold'
                  }}
                />
              </div>
            </div>

            {/* 5. Governance */}
            <div style={{ 
              border: '1px solid #dee2e6', 
              borderRadius: '8px', 
              padding: '20px', 
              marginBottom: '20px',
              background: '#fff'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '15px',
                paddingBottom: '10px',
                borderBottom: '1px solid #dee2e6'
              }}>
                <h5 style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
                  👥 Governance Structure
                  <InfoIcon title="Identify governance bodies or roles overseeing and implementing the adaptation plan" />
                </h5>
                <button 
                  type="button" 
                  onClick={addAdaptationGovernanceRole}
                  style={{ 
                    padding: '8px 16px', 
                    border: '1px solid #28a745', 
                    background: '#28a745',
                    color: 'white',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  + Add Role
                </button>
              </div>

              {adaptationGovernanceRoles.length === 0 ? (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '40px', 
                  color: '#6c757d',
                  border: '2px dashed #dee2e6',
                  borderRadius: '8px'
                }}>
                  <p>No governance roles defined yet.</p>
                  <p>Click "Add Role" to define the governance structure for your adaptation plan.</p>
            </div>
              ) : (
                <div>
                  {adaptationGovernanceRoles.map((role, index) => (
                    <div key={role.id} style={{ 
                      border: '1px solid #e9ecef', 
                      borderRadius: '6px', 
                      padding: '15px', 
                      marginBottom: '15px',
                      background: '#f8f9fa'
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        marginBottom: '10px'
                      }}>
                        <h6 style={{ margin: 0 }}>Governance Role #{index + 1}</h6>
                        <button 
                          type="button"
                          onClick={() => removeAdaptationGovernanceRole(role.id)}
                          style={{ 
                            padding: '5px 10px', 
                            border: '1px solid #dc3545', 
                            background: '#dc3545',
                            color: 'white',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          🗑️
                        </button>
            </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">Role/Position *</label>
                          <input 
                            type="text" 
                            className="form-input"
                            value={role.role}
                            onChange={(e) => updateAdaptationGovernanceRole(role.id, 'role', e.target.value)}
                            placeholder="e.g., Climate Resilience Committee, Adaptation Officer"
                          />
              </div>
                        <div className="form-group">
                          <label className="form-label">Capability/Expertise</label>
                          <input 
                            type="text" 
                            className="form-input"
                            value={role.capability}
                            onChange={(e) => updateAdaptationGovernanceRole(role.id, 'capability', e.target.value)}
                            placeholder="e.g., Climate resilience expertise, Emergency management"
                          />
          </div>
            </div>

                      <div className="form-group">
                        <label className="form-label">Responsibility *</label>
                        <textarea 
                          className="form-textarea" 
                          rows={2}
                          value={role.responsibility}
                          onChange={(e) => updateAdaptationGovernanceRole(role.id, 'responsibility', e.target.value)}
                          placeholder="e.g., Strategic oversight of adaptation, Implementation monitoring, Risk assessment"
                        />
              </div>
                      
                      <div className="form-group">
                        <label className="form-label">Qualifications</label>
                        <input 
                          type="text" 
                          className="form-input"
                          value={role.qualifications}
                          onChange={(e) => updateAdaptationGovernanceRole(role.id, 'qualifications', e.target.value)}
                          placeholder="e.g., Professional certifications, relevant experience"
                        />
            </div>
                    </div>
                  ))}
                </div>
              )}
          </div>

            {/* 6. Adaptation Targets */}
            <div style={{ 
              border: '1px solid #dee2e6', 
              borderRadius: '8px', 
              padding: '20px', 
              marginBottom: '20px',
              background: '#fff'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '20px',
                paddingBottom: '10px',
                borderBottom: '1px solid #dee2e6'
              }}>
                <h5 style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
                  🎯 Adaptation Plan Targets Registry
                  <InfoIcon title="Define your targets to achieve the adaptation plan across different categories. Each target should have clear base years and methodological frameworks." />
                </h5>
                <button 
                  type="button" 
                  onClick={addAdaptationTarget}
                  style={{ 
                    padding: '8px 16px', 
                    border: '1px solid #28a745', 
                    background: '#28a745',
                    color: 'white',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  + Add Target
                </button>
            </div>

              {adaptationTargets.length === 0 ? (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '40px', 
                  color: '#6c757d',
                  border: '2px dashed #dee2e6',
                  borderRadius: '8px'
                }}>
                  <p>No adaptation targets defined yet.</p>
                  <p>Click "+ Add Target" to start building your targets registry for adaptation plan achievements.</p>
              </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ 
                    width: '100%', 
                    borderCollapse: 'collapse',
                    fontSize: '14px'
                  }}>
                    <thead>
                      <tr style={{ background: '#f8f9fa' }}>
                        <th style={{ 
                          border: '1px solid #dee2e6', 
                          padding: '12px', 
                          textAlign: 'left', 
                          minWidth: '150px',
                          fontWeight: 'bold'
                        }}>
                          Target Category *
                        </th>
                        <th style={{ 
                          border: '1px solid #dee2e6', 
                          padding: '12px', 
                          textAlign: 'left', 
                          minWidth: '250px',
                          fontWeight: 'bold'
                        }}>
                          Specific Targets *
                        </th>
                        <th style={{ 
                          border: '1px solid #dee2e6', 
                          padding: '12px', 
                          textAlign: 'left', 
                          minWidth: '120px',
                          fontWeight: 'bold'
                        }}>
                          Base Year
                        </th>
                        <th style={{ 
                          border: '1px solid #dee2e6', 
                          padding: '12px', 
                          textAlign: 'left', 
                          minWidth: '200px',
                          fontWeight: 'bold'
                        }}>
                          Standards, Methodologies, Assumptions
                        </th>
                        <th style={{ 
                          border: '1px solid #dee2e6', 
                          padding: '12px', 
                          textAlign: 'left', 
                          minWidth: '180px',
                          fontWeight: 'bold'
                        }}>
                          Notes / Comments
                        </th>
                        <th style={{ 
                          border: '1px solid #dee2e6', 
                          padding: '12px', 
                          textAlign: 'center', 
                          minWidth: '80px',
                          fontWeight: 'bold'
                        }}>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {adaptationTargets.map((target, index) => (
                        <tr key={target.id} style={{ background: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                          <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                            <select 
                              className="form-select"
                              style={{ width: '100%', fontSize: '12px' }}
                              value={target.category}
                              onChange={(e) => updateAdaptationTarget(target.id, 'category', e.target.value)}
                            >
                              <option value="">Select Category</option>
                              <option value="ghg_emissions">Infrastructure Resilience Targets</option>
                              <option value="fossil_fuel_phaseout">Emergency Preparedness Targets</option>
                              <option value="other_mitigation">Other Adaptation Targets</option>
                            </select>
                          </td>
                          <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                            <textarea 
                              className="form-textarea" 
                              style={{ 
                                width: '100%', 
                                minHeight: '80px', 
                                fontSize: '12px',
                                border: 'none',
                                background: 'transparent',
                                resize: 'vertical'
                              }}
                              value={target.specificTargets}
                              onChange={(e) => updateAdaptationTarget(target.id, 'specificTargets', e.target.value)}
                              placeholder={
                                target.category === 'ghg_emissions' ? 
                                'e.g., Upgrade 100% of critical infrastructure to withstand extreme weather events by 2030; Implement resilient backup systems across all facilities' :
                                target.category === 'fossil_fuel_phaseout' ?
                                'e.g., Develop emergency response plans for all sites by 2025; Establish early warning systems for climate risks by 2026' :
                                target.category === 'other_mitigation' ?
                                'e.g., Diversify supply chain to reduce climate risks by 80% by 2028; Implement ecosystem-based adaptation across 50% of sites by 2027' :
                                'Describe specific, measurable adaptation targets with clear timelines...'
                              }
                            />
                          </td>
                          <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                            <input 
                              type="number" 
                              className="form-input"
                              style={{ 
                                width: '100%', 
                                fontSize: '12px',
                                border: 'none',
                                background: 'transparent'
                              }}
                              value={target.baseYear}
                              onChange={(e) => updateAdaptationTarget(target.id, 'baseYear', e.target.value)}
                              placeholder="e.g., 2020"
                              min="1990"
                              max="2030"
                            />
                          </td>
                          <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                            <select 
                              className="form-select"
                              style={{ width: '100%', fontSize: '12px', marginBottom: '5px' }}
                              value={standardsMethodologiesOptions.includes(target.standardsMethodologies) ? target.standardsMethodologies : 'Other'}
                              onChange={(e) => {
                                if (e.target.value === 'Other') {
                                  updateAdaptationTarget(target.id, 'standardsMethodologies', '');
                                } else {
                                  updateAdaptationTarget(target.id, 'standardsMethodologies', e.target.value);
                                }
                              }}
                            >
                              <option value="">Select Standard/Methodology</option>
                              {standardsMethodologiesOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                              ))}
                            </select>
                            {(!standardsMethodologiesOptions.includes(target.standardsMethodologies) || target.standardsMethodologies === '') && (
                              <textarea 
                                className="form-textarea" 
                                style={{ 
                                  width: '100%', 
                                  minHeight: '60px', 
                                  fontSize: '12px',
                                  border: 'none',
                                  background: 'transparent',
                                  resize: 'vertical'
                                }}
                                value={target.standardsMethodologies}
                                onChange={(e) => updateAdaptationTarget(target.id, 'standardsMethodologies', e.target.value)}
                                placeholder="Specify standards, methodologies, and key assumptions used..."
                              />
                            )}
                          </td>
                          <td style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                            <textarea 
                              className="form-textarea" 
                              style={{ 
                                width: '100%', 
                                minHeight: '60px', 
                                fontSize: '12px',
                                border: 'none',
                                background: 'transparent',
                                resize: 'vertical'
                              }}
                              value={target.notesComments}
                              onChange={(e) => updateAdaptationTarget(target.id, 'notesComments', e.target.value)}
                              placeholder="Additional context, barriers to achievement, progress updates, adaptation co-benefits..."
                            />
                          </td>
                          <td style={{ border: '1px solid #dee2e6', padding: '8px', textAlign: 'center' }}>
                            <button 
                              type="button"
                              onClick={() => removeAdaptationTarget(target.id)}
                              style={{ 
                                padding: '4px 8px', 
                                border: '1px solid #dc3545', 
                                background: '#dc3545',
                                color: 'white',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '12px'
                              }}
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
            </div>

            {/* 7. Stakeholder Engagement */}
            <div style={{ 
              border: '1px solid #dee2e6', 
              borderRadius: '8px', 
              padding: '20px', 
              marginBottom: '20px',
              background: '#fff'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '15px',
                paddingBottom: '10px',
                borderBottom: '1px solid #dee2e6'
              }}>
                <h5 style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
                  🤝 Stakeholder Engagement
                  <InfoIcon title="Describe how stakeholders have been engaged in developing and implementing the adaptation plan" />
                </h5>
                <button 
                  type="button" 
                  onClick={addAdaptationStakeholderEngagement}
                  style={{ 
                    padding: '8px 16px', 
                    border: '1px solid #28a745', 
                    background: '#28a745',
                    color: 'white',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  + Add Engagement
                </button>
              </div>
              
              {adaptationStakeholderEngagements.length === 0 ? (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '40px', 
                  color: '#6c757d',
                  border: '2px dashed #dee2e6',
                  borderRadius: '8px'
                }}>
                  <p>No stakeholder engagements defined yet.</p>
                  <p>Click "Add Engagement" to document your stakeholder consultation activities for adaptation planning.</p>
                </div>
              ) : (
                <div>
                  {adaptationStakeholderEngagements.map((engagement, index) => (
                    <div key={engagement.id} style={{ 
                      border: '1px solid #e9ecef', 
                      borderRadius: '6px', 
                      padding: '15px', 
                      marginBottom: '15px',
                      background: '#f8f9fa'
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        marginBottom: '10px'
                      }}>
                        <h6 style={{ margin: 0 }}>Engagement #{index + 1}</h6>
                        <button 
                          type="button"
                          onClick={() => removeAdaptationStakeholderEngagement(engagement.id)}
                          style={{ 
                            padding: '5px 10px', 
                            border: '1px solid #dc3545', 
                            background: '#dc3545',
                            color: 'white',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                      
              <div className="form-row">
                <div className="form-group">
                          <label className="form-label">Stakeholder Type *</label>
                          <select 
                            className="form-select"
                            value={engagement.type}
                            onChange={(e) => updateAdaptationStakeholderEngagement(engagement.id, 'type', e.target.value)}
                          >
                            <option value="">Select stakeholder type</option>
                            <option value="employees">Employees</option>
                            <option value="community">Local communities</option>
                            <option value="suppliers">Suppliers</option>
                            <option value="investors">Investors</option>
                            <option value="regulators">Regulators</option>
                          </select>
                </div>
                <div className="form-group">
                          <label className="form-label">Frequency</label>
                          <input 
                            type="text" 
                            className="form-input"
                            value={engagement.frequency}
                            onChange={(e) => updateAdaptationStakeholderEngagement(engagement.id, 'frequency', e.target.value)}
                            placeholder="e.g., Quarterly, Annual"
                          />
              </div>
            </div>

              <div className="form-row">
                <div className="form-group">
                          <label className="form-label">Last Engagement Date</label>
                          <input 
                            type="date" 
                            className="form-input"
                            value={engagement.lastEngagement}
                            onChange={(e) => updateAdaptationStakeholderEngagement(engagement.id, 'lastEngagement', e.target.value)}
                          />
                </div>
                      </div>
                      
                <div className="form-group">
                        <label className="form-label">Engagement Description *</label>
                        <textarea 
                          className="form-textarea" 
                          rows={3}
                          value={engagement.description}
                          onChange={(e) => updateAdaptationStakeholderEngagement(engagement.id, 'description', e.target.value)}
                          placeholder="Describe engagement activities for adaptation planning, methods, outcomes, and feedback received..."
                        />
                </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 8. People & Environment Impacts */}
            <div style={{ 
              border: '1px solid #dee2e6', 
              borderRadius: '8px', 
              padding: '20px', 
              marginBottom: '20px',
              background: '#fff'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                marginBottom: '15px',
                paddingBottom: '10px',
                borderBottom: '1px solid #dee2e6'
              }}>
                <h5 style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
                  🌍 People & Environment Impacts
                  <InfoIcon title="Describe how the adaptation plan addresses impacts on people (jobs, skills) and environment (biodiversity, land use)" />
                </h5>
            </div>
              
                <div className="form-group">
                <label className="form-label">Impact Management Description</label>
                <textarea 
                  className="form-textarea" 
                  rows={6}
                  value={adaptationPeopleEnvironmentImpacts}
                  onChange={(e) => setAdaptationPeopleEnvironmentImpacts(e.target.value)}
                  placeholder="Describe impacts on workers, communities, Indigenous Peoples, biodiversity, land use changes, and adaptation measures such as resilience building, emergency preparedness, ecosystem protection strategies..."
                />
                </div>
              </div>
            
            {/* Save Section */}
            <div className="save-section">
              <a href="#" className="attachments-link">
                <span>📎</span>
                <span>Attachments</span>
              </a>
              <button type="button" className="save-btn">SAVE</button>
            </div>
          </div>

          {/* Requirement 2c */}
            <div className="sub-question">
              <div className="sub-question-header">
              <div className="sub-question-number">2c</div>
              <div className="sub-question-title">Describe the impacts on people and the environment (including biodiversity) from implementing the adaptation plan and the actions taken to manage them</div>
              <div className="info-icon" title="Actions to adapt to climate change can have positive impacts on biodiversity. For example, planting mangroves can contribute to climate change adaptation by controlling floods and protecting biodiversity. If an adaptation plan is well managed, it can translate into positive impacts such as economic development and the creation of decent work opportunities.">i</div>
              </div>
            <textarea className="form-textarea" rows={4}></textarea>
          </div>

          {/* Requirement 2d */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">2d</div>
              <div className="sub-question-title">The organisation shall explain, in the absence of an adaptation plan, why it does not exist, and describe the steps being taken to develop it and the expected time frame</div>
              <div className="info-icon" title="Explain, in the absence of an adaptation plan, why it does not exist, and describe the steps being taken to develop it and the expected time frame.">i</div>
            </div>
            <textarea className="form-textarea" rows={4}></textarea>
          </div>

          <div className="save-section">
            <a href="#" className="attachments-link">
              <span>📎</span>
              <span>Attachments</span>
            </a>
            <button type="button" className="save-btn">SAVE</button>
          </div>
        </div>

        {/* Disclosure 102-3: Just transition */}
        <div className="section-header">
          <div className="main-heading">
            3. Just transition
            <div className="info-icon" title="This disclosure describes the impacts of the organization's transition or adaptation efforts on workers, local communities, and Indigenous Peoples.">i</div>
          </div>
        </div>

        <div className="question-section">

          {/* Requirement 3a */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">3a</div>
              <div className="sub-question-title">Just transition metrics - employee and worker details</div>
              <div className="info-icon" title="Report the impacts of transition or adaptation efforts on workers broken down by gender categories.">i</div>
            </div>

          <div style={{ 
            border: '1px solid #dee2e6', 
            borderRadius: '8px', 
            padding: '20px', 
            marginBottom: '30px',
            background: '#fff'
          }}>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ 
                width: '100%', 
                borderCollapse: 'collapse',
                fontSize: '14px',
                marginBottom: '10px'
              }}>
                <thead>
                  <tr style={{ background: '#f8f9fa' }}>
                    <th style={{ 
                      border: '1px solid #dee2e6', 
                      padding: '12px', 
                      textAlign: 'left', 
                      fontWeight: 'bold',
                      minWidth: '250px'
                    }}>
                      Metric
                    </th>
                    <th style={{ 
                      border: '1px solid #dee2e6', 
                      padding: '12px', 
                      textAlign: 'center', 
                      fontWeight: 'bold',
                      minWidth: '100px'
                    }}>
                      Men
                    </th>
                    <th style={{ 
                      border: '1px solid #dee2e6', 
                      padding: '12px', 
                      textAlign: 'center', 
                      fontWeight: 'bold',
                      minWidth: '100px'
                    }}>
                      Women
                    </th>
                    <th style={{ 
                      border: '1px solid #dee2e6', 
                      padding: '12px', 
                      textAlign: 'center', 
                      fontWeight: 'bold',
                      minWidth: '100px'
                    }}>
                      Other*
                    </th>
                    <th style={{ 
                      border: '1px solid #dee2e6', 
                      padding: '12px', 
                      textAlign: 'center', 
                      fontWeight: 'bold',
                      minWidth: '120px'
                    }}>
                      Not disclosed**
                    </th>
                    <th style={{ 
                      border: '1px solid #dee2e6', 
                      padding: '12px', 
                      textAlign: 'center', 
                      fontWeight: 'bold',
                      minWidth: '100px'
                    }}>
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ 
                      border: '1px solid #dee2e6', 
                      padding: '10px',
                      fontWeight: '500'
                    }}>
                      Number of new employees recruited<br/>
                      <span style={{ fontSize: '12px', color: '#666' }}>(102-3-a-i)</span>
                    </td>
                    {['Men', 'Women', 'Other', 'Not disclosed', 'Total'].map((column, idx) => (
                      <td key={column} style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                        <input 
                          type="number" 
                          className="form-input"
                          style={{ 
                            width: '100%', 
                            border: 'none',
                            background: 'transparent',
                            textAlign: 'center',
                            fontWeight: idx === 4 ? 'bold' : 'normal'
                          }}
                          placeholder="0"
                          readOnly={idx === 4}
                        />
                      </td>
                    ))}
                  </tr>
                  <tr style={{ background: '#f9f9f9' }}>
                    <td style={{ 
                      border: '1px solid #dee2e6', 
                      padding: '10px',
                      fontWeight: '500'
                    }}>
                      Number of new workers who are not employees recruited<br/>
                      <span style={{ fontSize: '12px', color: '#666' }}>(102-3-a)</span>
                    </td>
                    {['Men', 'Women', 'Other', 'Not disclosed', 'Total'].map((column, idx) => (
                      <td key={column} style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                        <input 
                          type="number" 
                          className="form-input"
                          style={{ 
                            width: '100%', 
                            border: 'none',
                            background: 'transparent',
                            textAlign: 'center',
                            fontWeight: idx === 4 ? 'bold' : 'normal'
                          }}
                          placeholder="0"
                          readOnly={idx === 4}
                        />
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td style={{ 
                      border: '1px solid #dee2e6', 
                      padding: '10px',
                      fontWeight: '500'
                    }}>
                      Number of employees whose work was terminated<br/>
                      <span style={{ fontSize: '12px', color: '#666' }}>(102-3-b-i)</span>
                    </td>
                    {['Men', 'Women', 'Other', 'Not disclosed', 'Total'].map((column, idx) => (
                      <td key={column} style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                        <input 
                          type="number" 
                          className="form-input"
                          style={{ 
                            width: '100%', 
                            border: 'none',
                            background: 'transparent',
                            textAlign: 'center',
                            fontWeight: idx === 4 ? 'bold' : 'normal'
                          }}
                          placeholder="0"
                          readOnly={idx === 4}
                        />
                      </td>
                    ))}
                  </tr>
                  <tr style={{ background: '#f9f9f9' }}>
                    <td style={{ 
                      border: '1px solid #dee2e6', 
                      padding: '10px',
                      fontWeight: '500'
                    }}>
                      Number of workers who are not employees whose work was terminated<br/>
                      <span style={{ fontSize: '12px', color: '#666' }}>(102-3-f)</span>
                    </td>
                    {['Men', 'Women', 'Other', 'Not disclosed', 'Total'].map((column, idx) => (
                      <td key={column} style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                        <input 
                          type="number" 
                          className="form-input"
                          style={{ 
                            width: '100%', 
                            border: 'none',
                            background: 'transparent',
                            textAlign: 'center',
                            fontWeight: idx === 4 ? 'bold' : 'normal'
                          }}
                          placeholder="0"
                          readOnly={idx === 4}
                        />
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td style={{ 
                      border: '1px solid #dee2e6', 
                      padding: '10px',
                      fontWeight: '500'
                    }}>
                      Number of redeployed employees<br/>
                      <span style={{ fontSize: '12px', color: '#666' }}>(102-3-c-i)</span>
                    </td>
                    {['Men', 'Women', 'Other', 'Not disclosed', 'Total'].map((column, idx) => (
                      <td key={column} style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                        <input 
                          type="number" 
                          className="form-input"
                          style={{ 
                            width: '100%', 
                            border: 'none',
                            background: 'transparent',
                            textAlign: 'center',
                            fontWeight: idx === 4 ? 'bold' : 'normal'
                          }}
                          placeholder="0"
                          readOnly={idx === 4}
                        />
                      </td>
                    ))}
                  </tr>
                  <tr style={{ background: '#f9f9f9' }}>
                    <td style={{ 
                      border: '1px solid #dee2e6', 
                      padding: '10px',
                      fontWeight: '500'
                    }}>
                      Number of employees who received training for up- and re-skilling<br/>
                      <span style={{ fontSize: '12px', color: '#666' }}>(102-3-d-i)</span>
                    </td>
                    {['Men', 'Women', 'Other', 'Not disclosed', 'Total'].map((column, idx) => (
                      <td key={column} style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                        <input 
                          type="number" 
                          className="form-input"
                          style={{ 
                            width: '100%', 
                            border: 'none',
                            background: 'transparent',
                            textAlign: 'center',
                            fontWeight: idx === 4 ? 'bold' : 'normal'
                          }}
                          placeholder="0"
                          readOnly={idx === 4}
                        />
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
              </div>

            <div style={{ 
              fontSize: '12px', 
              color: '#666', 
              marginTop: '10px',
              padding: '10px',
              background: '#f8f9fa',
              borderRadius: '4px'
            }}>
              <p style={{ margin: '0 0 5px 0' }}>
                <strong>*</strong> Other refers to individuals who identify as neither male nor female.
              </p>
              <p style={{ margin: 0 }}>
                <strong>**</strong> Not disclosed refers to individuals who choose not to disclose their gender identity.
              </p>
                </div>
                </div>
                </div>

          {/* Requirement 3b */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">3b</div>
              <div className="sub-question-title">Just transition metrics - employee details</div>
              <div className="info-icon" title="Report the impacts of transition or adaptation efforts on employees broken down by employment type categories.">i</div>
            </div>

          <div style={{ 
            border: '1px solid #dee2e6', 
            borderRadius: '8px', 
            padding: '20px', 
            marginBottom: '20px',
            background: '#fff'
          }}>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ 
                width: '100%', 
                borderCollapse: 'collapse',
                fontSize: '14px',
                marginBottom: '10px'
              }}>
                <thead>
                  <tr style={{ background: '#f8f9fa' }}>
                    <th style={{ 
                      border: '1px solid #dee2e6', 
                      padding: '12px', 
                      textAlign: 'left', 
                      fontWeight: 'bold',
                      minWidth: '200px'
                    }}>
                      Metric
                    </th>
                    <th style={{ 
                      border: '1px solid #dee2e6', 
                      padding: '12px', 
                      textAlign: 'center', 
                      fontWeight: 'bold',
                      minWidth: '110px'
                    }}>
                      Permanent employees
                    </th>
                    <th style={{ 
                      border: '1px solid #dee2e6', 
                      padding: '12px', 
                      textAlign: 'center', 
                      fontWeight: 'bold',
                      minWidth: '110px'
                    }}>
                      Temporary employees
                    </th>
                    <th style={{ 
                      border: '1px solid #dee2e6', 
                      padding: '12px', 
                      textAlign: 'center', 
                      fontWeight: 'bold',
                      minWidth: '130px'
                    }}>
                      Non-guaranteed hours employees
                    </th>
                    <th style={{ 
                      border: '1px solid #dee2e6', 
                      padding: '12px', 
                      textAlign: 'center', 
                      fontWeight: 'bold',
                      minWidth: '110px'
                    }}>
                      Full-time employees
                    </th>
                    <th style={{ 
                      border: '1px solid #dee2e6', 
                      padding: '12px', 
                      textAlign: 'center', 
                      fontWeight: 'bold',
                      minWidth: '110px'
                    }}>
                      Part-time employees
                    </th>
                    <th style={{ 
                      border: '1px solid #dee2e6', 
                      padding: '12px', 
                      textAlign: 'center', 
                      fontWeight: 'bold',
                      minWidth: '100px'
                    }}>
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ 
                      border: '1px solid #dee2e6', 
                      padding: '10px',
                      fontWeight: '500'
                    }}>
                      Number of new employees recruited<br/>
                      <span style={{ fontSize: '12px', color: '#666' }}>(102-3-a-ii)</span>
                    </td>
                    {['Permanent', 'Temporary', 'Non-guaranteed', 'Full-time', 'Part-time', 'Total'].map((column, idx) => (
                      <td key={column} style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                        <input 
                          type="number" 
                          className="form-input"
                          style={{ 
                            width: '100%', 
                            border: 'none',
                            background: 'transparent',
                            textAlign: 'center',
                            fontWeight: idx === 5 ? 'bold' : 'normal'
                          }}
                          placeholder="0"
                          readOnly={idx === 5}
                        />
                      </td>
                    ))}
                  </tr>
                  <tr style={{ background: '#f9f9f9' }}>
                    <td style={{ 
                      border: '1px solid #dee2e6', 
                      padding: '10px',
                      fontWeight: '500'
                    }}>
                      Number of employees whose work was terminated<br/>
                      <span style={{ fontSize: '12px', color: '#666' }}>(102-3-b-ii)</span>
                    </td>
                    {['Permanent', 'Temporary', 'Non-guaranteed', 'Full-time', 'Part-time', 'Total'].map((column, idx) => (
                      <td key={column} style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                        <input 
                          type="number" 
                          className="form-input"
                          style={{ 
                            width: '100%', 
                            border: 'none',
                            background: 'transparent',
                            textAlign: 'center',
                            fontWeight: idx === 5 ? 'bold' : 'normal'
                          }}
                          placeholder="0"
                          readOnly={idx === 5}
                        />
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td style={{ 
                      border: '1px solid #dee2e6', 
                      padding: '10px',
                      fontWeight: '500'
                    }}>
                      Number of redeployed employees<br/>
                      <span style={{ fontSize: '12px', color: '#666' }}>(102-3-c-ii)</span>
                    </td>
                    {['Permanent', 'Temporary', 'Non-guaranteed', 'Full-time', 'Part-time', 'Total'].map((column, idx) => (
                      <td key={column} style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                        <input 
                          type="number" 
                          className="form-input"
                          style={{ 
                            width: '100%', 
                            border: 'none',
                            background: 'transparent',
                            textAlign: 'center',
                            fontWeight: idx === 5 ? 'bold' : 'normal'
                          }}
                          placeholder="0"
                          readOnly={idx === 5}
                        />
                      </td>
                    ))}
                  </tr>
                  <tr style={{ background: '#f9f9f9' }}>
                    <td style={{ 
                      border: '1px solid #dee2e6', 
                      padding: '10px',
                      fontWeight: '500'
                    }}>
                      Number of employees who received training for up- and re-skilling<br/>
                      <span style={{ fontSize: '12px', color: '#666' }}>(102-3-d-ii)</span>
                    </td>
                    {['Permanent', 'Temporary', 'Non-guaranteed', 'Full-time', 'Part-time', 'Total'].map((column, idx) => (
                      <td key={column} style={{ border: '1px solid #dee2e6', padding: '8px' }}>
                        <input 
                          type="number" 
                          className="form-input"
                          style={{ 
                            width: '100%', 
                            border: 'none',
                            background: 'transparent',
                            textAlign: 'center',
                            fontWeight: idx === 5 ? 'bold' : 'normal'
                          }}
                          placeholder="0"
                          readOnly={idx === 5}
                        />
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
              </div>
            </div>

          {/* Requirement 3g */}
            <div className="sub-question">
              <div className="sub-question-header">
              <div className="sub-question-number">3g</div>
              <div className="sub-question-title">report the total number and percentage of new employees recruited whose basic pay is at or above the cost-of-living estimate, and describe actions taken or commitments made to address any gaps between basic pay and the cost-of-living estimate for workers reported under 102-3-a and 102-3-e</div>
              <div className="info-icon" title="Cost-of-living estimate should be based on credible external sources or internal calculations that consider local living costs. This disclosure helps assess whether new employee compensation meets basic living standards.">i</div>
              </div>

            <div style={{ 
              border: '1px solid #dee2e6', 
              borderRadius: '8px', 
              padding: '20px', 
              marginBottom: '20px',
              background: '#fff'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                marginBottom: '20px',
                paddingBottom: '10px',
                borderBottom: '1px solid #dee2e6'
              }}>
                <h5 style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
                  💰 New Employees' Pay vs Cost-of-Living Analysis
                  <InfoIcon title="Report data on how new employee compensation compares to cost-of-living estimates and actions taken to address pay gaps." />
                </h5>
                </div>

              {/* Reporting Period */}
              <div style={{ marginBottom: '20px' }}>
                <h6 style={{ 
                  margin: '0 0 10px 0', 
                  fontWeight: 'bold', 
                  color: '#495057' 
                }}>
                  📅 Reporting Period
                </h6>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <label className="form-label">Start Date</label>
                    <input 
                      type="date" 
                      className="form-input"
                      value={reportingPeriodStart}
                      onChange={(e) => setReportingPeriodStart(e.target.value)}
                      required
                    />
                </div>
                  <div style={{ flex: 1 }}>
                    <label className="form-label">End Date</label>
                    <input 
                      type="date" 
                      className="form-input"
                      value={reportingPeriodEnd}
                      onChange={(e) => setReportingPeriodEnd(e.target.value)}
                      required
                    />
                </div>
              </div>
              </div>

              {/* Employee Numbers and Calculations */}
              <div style={{ marginBottom: '20px' }}>
                <h6 style={{ 
                  margin: '0 0 10px 0', 
                  fontWeight: 'bold', 
                  color: '#495057' 
                }}>
                  👥 Employee Numbers & Pay Analysis
                </h6>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '15px' 
                }}>
                  <div>
                    <label className="form-label">
                      Total Number of New Employees Recruited *
                      <span style={{ fontSize: '12px', color: '#666', fontWeight: 'normal' }}>
                        <br/>Enter total count of new hires during the reporting period
                      </span>
                    </label>
                    <input 
                      type="number" 
                      className="form-input"
                      value={totalNewEmployees}
                      onChange={(e) => setTotalNewEmployees(e.target.value)}
                      min="0"
                      placeholder="e.g., 150"
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">
                      Number with Pay ≥ Cost-of-Living Estimate *
                      <span style={{ fontSize: '12px', color: '#666', fontWeight: 'normal' }}>
                        <br/>Count of new hires whose basic pay meets or exceeds cost-of-living
                      </span>
                    </label>
                    <input 
                      type="number" 
                      className="form-input"
                      value={employeesAboveCostOfLiving}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 0;
                        const total = parseInt(totalNewEmployees) || 0;
                        if (value <= total) {
                          setEmployeesAboveCostOfLiving(e.target.value);
                        }
                      }}
                      min="0"
                      max={totalNewEmployees || undefined}
                      placeholder="e.g., 90"
                      required
                    />
                    {parseInt(employeesAboveCostOfLiving) > parseInt(totalNewEmployees) && (
                      <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
                        ⚠️ Cannot exceed total number of new employees
                      </div>
                    )}
            </div>
          </div>

                {/* Auto-calculated percentage */}
                <div style={{ marginTop: '15px' }}>
                  <label className="form-label">
                    Percentage of New Employees ≥ Cost-of-Living (Auto-calculated)
                  </label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={`${calculatePayAboveCostOfLivingPercentage()}%`}
                    readOnly
                    style={{ 
                      backgroundColor: '#e8f5e8',
                      fontWeight: 'bold',
                      color: '#155724'
                    }}
                  />
                </div>
              </div>

              {/* Cost-of-Living Estimate Basis */}
              <div style={{ marginBottom: '20px' }}>
                <h6 style={{ 
                  margin: '0 0 10px 0', 
                  fontWeight: 'bold', 
                  color: '#495057' 
                }}>
                  📊 Cost-of-Living Estimate Basis
                </h6>
                <label className="form-label">
                  Describe the basis for the cost-of-living estimate used *
                  <span style={{ fontSize: '12px', color: '#666', fontWeight: 'normal' }}>
                    <br/>e.g., external index, internal calculation, government data
                  </span>
                </label>
                <textarea 
                  className="form-textarea" 
                  rows={4}
                  value={costOfLivingBasis}
                  onChange={(e) => setCostOfLivingBasis(e.target.value)}
                  placeholder="Based on local government inflation-adjusted living wage index..."
                  required
                />
              </div>

              {/* Actions to Address Pay Gaps */}
              <div style={{ marginBottom: '20px' }}>
                <h6 style={{ 
                  margin: '0 0 10px 0', 
                  fontWeight: 'bold', 
                  color: '#495057' 
                }}>
                  🎯 Actions to Address Pay Gaps
                </h6>
                <label className="form-label">
                  Describe actions taken or commitments made to address gaps between basic pay and cost-of-living estimate
                  <span style={{ fontSize: '12px', color: '#666', fontWeight: 'normal' }}>
                    <br/>Include specific measures, timelines, and target improvements
                  </span>
                </label>
                <textarea 
                  className="form-textarea" 
                  rows={4}
                  value={actionsToAddressGaps}
                  onChange={(e) => setActionsToAddressGaps(e.target.value)}
                  placeholder="Implemented minimum wage increase effective 01-Jan-2025; Conducting salary review for all positions below cost-of-living threshold..."
                />
              </div>

              {/* Notes / Additional Information */}
              <div style={{ marginBottom: '10px' }}>
                <h6 style={{ 
                  margin: '0 0 10px 0', 
                  fontWeight: 'bold', 
                  color: '#495057' 
                }}>
                  📝 Notes / Additional Information
                </h6>
                <label className="form-label">
                  Any clarifications, limitations, or additional context regarding the data reported
                  <span style={{ fontSize: '12px', color: '#666', fontWeight: 'normal' }}>
                    <br/>Optional field for important disclaimers or methodological notes
                  </span>
                </label>
                <textarea 
                  className="form-textarea" 
                  rows={3}
                  value={payGapNotes}
                  onChange={(e) => setPayGapNotes(e.target.value)}
                  placeholder="Data excludes temporary contract workers; Cost-of-living estimates updated quarterly..."
                />
              </div>

              {/* Summary Box */}
              {totalNewEmployees && employeesAboveCostOfLiving && (
                <div style={{ 
                  backgroundColor: '#f8f9fa',
                  border: '1px solid #dee2e6',
                  borderRadius: '6px',
                  padding: '15px',
                  marginTop: '15px'
                }}>
                  <h6 style={{ margin: '0 0 10px 0', color: '#495057' }}>📈 Summary Statistics</h6>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', fontSize: '14px' }}>
                    <div>
                      <strong>Total New Employees:</strong><br/>
                      <span style={{ fontSize: '18px', color: '#007bff' }}>{totalNewEmployees}</span>
                    </div>
                    <div>
                      <strong>Above Cost-of-Living:</strong><br/>
                      <span style={{ fontSize: '18px', color: '#28a745' }}>{employeesAboveCostOfLiving}</span>
                    </div>
                    <div>
                      <strong>Percentage:</strong><br/>
                      <span style={{ fontSize: '18px', color: '#17a2b8' }}>{calculatePayAboveCostOfLivingPercentage()}%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Requirement 3h */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">3h</div>
              <div className="sub-question-title">list the locations of operation where the organization has impacts on local communities and Indigenous Peoples</div>
              <div className="info-icon" title="Report locations where your operations affect local communities or Indigenous Peoples through social, economic, or environmental impacts.">i</div>
            </div>

            <div style={{ 
              border: '1px solid #dee2e6', 
              borderRadius: '8px', 
              padding: '20px', 
              marginBottom: '20px',
              background: '#fff'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                marginBottom: '20px',
                paddingBottom: '10px',
                borderBottom: '1px solid #dee2e6'
              }}>
                <h5 style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
                  🌍 Locations of Operation with Community Impact
                  <InfoIcon title="Document locations where your organization's operations impact local communities and Indigenous Peoples." />
                </h5>
              </div>

              {/* Reporting Period */}
              <div style={{ marginBottom: '20px' }}>
                <h6 style={{ 
                  margin: '0 0 10px 0', 
                  fontWeight: 'bold', 
                  color: '#495057' 
                }}>
                  📅 Reporting Period
                </h6>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <label className="form-label">Start Date</label>
                    <input 
                      type="date" 
                      className="form-input"
                      value={communityReportingPeriodStart}
                      onChange={(e) => setCommunityReportingPeriodStart(e.target.value)}
                      required
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label className="form-label">End Date</label>
                    <input 
                      type="date" 
                      className="form-input"
                      value={communityReportingPeriodEnd}
                      onChange={(e) => setCommunityReportingPeriodEnd(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Locations Table */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '15px'
                }}>
                  <h6 style={{ 
                    margin: 0, 
                    fontWeight: 'bold', 
                    color: '#495057' 
                  }}>
                    📍 Operation Locations with Community Impact
                  </h6>
                  <button 
                    type="button"
                    onClick={addOperationLocation}
                    style={{
                      backgroundColor: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '8px 16px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    ➕ Add Location
                  </button>
                </div>

                {operationLocations.length === 0 ? (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '40px', 
                    color: '#6c757d',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    border: '2px dashed #dee2e6'
                  }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏭</div>
                    <h6 style={{ margin: '0 0 8px 0' }}>No locations added yet</h6>
                    <p style={{ margin: 0, fontSize: '14px' }}>
                      Click "Add Location" to start documenting operation locations with community impact
                    </p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {operationLocations.map((location, index) => (
                      <div key={location.id} style={{ 
                        border: '1px solid #dee2e6',
                        borderRadius: '8px',
                        padding: '20px',
                        backgroundColor: '#f8f9fa'
                      }}>
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'flex-start',
                          marginBottom: '15px'
                        }}>
                          <h6 style={{ margin: 0, color: '#495057' }}>
                            📍 Location {index + 1}
                          </h6>
                          <button 
                            type="button"
                            onClick={() => removeOperationLocation(location.id)}
                            style={{
                              backgroundColor: '#dc3545',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              padding: '4px 8px',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                          >
                            🗑️ Remove
                          </button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                          <div>
                            <label className="form-label">Location Name *</label>
                            <input 
                              type="text" 
                              className="form-input"
                              value={location.locationName}
                              onChange={(e) => updateOperationLocation(location.id, 'locationName', e.target.value)}
                              placeholder="e.g., Factory A, Mine B, Regional Office C"
                              required
                            />
                          </div>
                          <div>
                            <label className="form-label">Latitude (Optional)</label>
                            <input 
                              type="text" 
                              className="form-input"
                              value={location.latitude}
                              onChange={(e) => updateOperationLocation(location.id, 'latitude', e.target.value)}
                              placeholder="e.g., 40.7128"
                            />
                          </div>
                          <div>
                            <label className="form-label">Longitude (Optional)</label>
                            <input 
                              type="text" 
                              className="form-input"
                              value={location.longitude}
                              onChange={(e) => updateOperationLocation(location.id, 'longitude', e.target.value)}
                              placeholder="e.g., -74.0060"
                            />
                          </div>
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                          <label className="form-label">Type of Impact *</label>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginTop: '8px' }}>
                            {['Employment opportunities', 'Land use changes', 'Cultural heritage impact', 'Environmental changes', 'Economic development', 'Infrastructure development', 'Resource extraction', 'Community displacement', 'Other'].map(impactType => (
                              <label key={impactType} style={{ display: 'flex', alignItems: 'center', fontSize: '14px' }}>
                                <input 
                                  type="checkbox"
                                  checked={location.impactTypes.includes(impactType)}
                                  onChange={(e) => handleImpactTypeChange(location.id, impactType, e.target.checked)}
                                  style={{ marginRight: '8px' }}
                                />
                                {impactType}
                              </label>
                            ))}
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '15px', marginBottom: '15px' }}>
                          <div>
                            <label className="form-label">Agreement Status *</label>
                            <select 
                              className="form-input"
                              value={location.agreementStatus}
                              onChange={(e) => updateOperationLocation(location.id, 'agreementStatus', e.target.value)}
                              required
                            >
                              <option value="">Select status</option>
                              <option value="Yes">Yes - Agreement reached</option>
                              <option value="Partial">Partial - Agreement in progress</option>
                              <option value="No">No - No agreement</option>
                            </select>
                          </div>
                          <div>
                            <label className="form-label">Agreement Description</label>
                            <textarea 
                              className="form-textarea" 
                              rows={3}
                              value={location.agreementDescription}
                              onChange={(e) => updateOperationLocation(location.id, 'agreementDescription', e.target.value)}
                              placeholder="Describe the terms or nature of safeguarding agreements..."
                            />
                          </div>
                        </div>

                        <div>
                          <label className="form-label">Additional Notes</label>
                          <textarea 
                            className="form-textarea" 
                            rows={2}
                            value={location.additionalNotes}
                            onChange={(e) => updateOperationLocation(location.id, 'additionalNotes', e.target.value)}
                            placeholder="Any other relevant information about location-level impacts..."
                          />
                        </div>

                        <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#e9ecef', borderRadius: '4px' }}>
                          <div style={{ fontSize: '12px', color: '#6c757d' }}>
                            📎 <strong>Evidence Documents:</strong> Use the attachments section below to upload agreements, MOUs, or meeting minutes for this location.
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Requirement 3i */}
            <div className="sub-question">
              <div className="sub-question-header">
              <div className="sub-question-number">3i</div>
              <div className="sub-question-title">report the percentage of locations of operation listed under 102-3-h in which an agreement has been reached with affected or potentially affected local communities or Indigenous Peoples to safeguard their interests</div>
              <div className="info-icon" title="Auto-calculated based on agreement status reported in 3h. Includes both 'Yes' and 'Partial' agreement statuses.">i</div>
              </div>

            <div style={{ 
              border: '1px solid #dee2e6', 
              borderRadius: '8px', 
              padding: '20px', 
              marginBottom: '20px',
              background: '#fff'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                marginBottom: '20px',
                paddingBottom: '10px',
                borderBottom: '1px solid #dee2e6'
              }}>
                <h5 style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
                  📊 Community Agreement Coverage Analysis
                  <InfoIcon title="Percentage calculation of locations with safeguarding agreements based on data from question 3h." />
                </h5>
                </div>

              {operationLocations.length === 0 ? (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '40px', 
                  color: '#6c757d',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  border: '2px dashed #dee2e6'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
                  <h6 style={{ margin: '0 0 8px 0' }}>No location data available</h6>
                  <p style={{ margin: 0, fontSize: '14px' }}>
                    Add locations in question 3h to calculate agreement coverage percentage
                  </p>
                </div>
              ) : (
                <div>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr 1fr', 
                    gap: '20px',
                    marginBottom: '20px'
                  }}>
                    <div style={{ 
                      textAlign: 'center',
                      padding: '20px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '8px',
                      border: '1px solid #dee2e6'
                    }}>
                      <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff' }}>
                        {operationLocations.length}
                      </div>
                      <div style={{ fontSize: '14px', color: '#6c757d' }}>
                        Total Locations
                      </div>
                    </div>
                    <div style={{ 
                      textAlign: 'center',
                      padding: '20px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '8px',
                      border: '1px solid #dee2e6'
                    }}>
                      <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>
                        {operationLocations.filter(loc => loc.agreementStatus === 'Yes' || loc.agreementStatus === 'Partial').length}
                      </div>
                      <div style={{ fontSize: '14px', color: '#6c757d' }}>
                        With Agreements
                      </div>
                    </div>
                    <div style={{ 
                      textAlign: 'center',
                      padding: '20px',
                      backgroundColor: '#e8f5e8',
                      borderRadius: '8px',
                      border: '2px solid #28a745'
                    }}>
                      <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#155724' }}>
                        {calculateAgreementPercentage()}%
                      </div>
                      <div style={{ fontSize: '14px', color: '#155724' }}>
                        Agreement Coverage
                </div>
              </div>
            </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label className="form-label">
                      Percentage of Locations with Agreements (Auto-calculated)
                    </label>
                    <input 
                      type="text" 
                      className="form-input"
                      value={`${calculateAgreementPercentage()}%`}
                      readOnly
                      style={{ 
                        backgroundColor: '#e8f5e8',
                        fontWeight: 'bold',
                        color: '#155724',
                        fontSize: '18px',
                        textAlign: 'center'
                      }}
                    />
                    <div style={{ fontSize: '12px', color: '#6c757d', marginTop: '5px' }}>
                      ℹ️ Calculation includes locations with "Yes" or "Partial" agreement status
                    </div>
                  </div>

                  {/* Breakdown by Agreement Status */}
                  <div style={{ 
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #dee2e6',
                    borderRadius: '6px',
                    padding: '15px'
                  }}>
                    <h6 style={{ margin: '0 0 10px 0', color: '#495057' }}>📈 Agreement Status Breakdown</h6>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', fontSize: '14px' }}>
                      <div>
                        <strong>✅ Agreements Reached:</strong><br/>
                        <span style={{ fontSize: '16px', color: '#28a745' }}>
                          {operationLocations.filter(loc => loc.agreementStatus === 'Yes').length} locations
                        </span>
                      </div>
                      <div>
                        <strong>🔄 Partial Agreements:</strong><br/>
                        <span style={{ fontSize: '16px', color: '#ffc107' }}>
                          {operationLocations.filter(loc => loc.agreementStatus === 'Partial').length} locations
                        </span>
                      </div>
                      <div>
                        <strong>❌ No Agreements:</strong><br/>
                        <span style={{ fontSize: '16px', color: '#dc3545' }}>
                          {operationLocations.filter(loc => loc.agreementStatus === 'No').length} locations
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Requirement 3j */}
            <div className="sub-question">
              <div className="sub-question-header">
              <div className="sub-question-number">3j</div>
              <div className="sub-question-title">report contextual information necessary to understand the data reported under 102-3 and describe the methodologies and assumptions used to compile the data, including whether the numbers are reported: i. in head count, full-time equivalent (FTE), or using another methodology; ii. at the end of the reporting period, as an average across the reporting period, or using another methodology</div>
              <div className="info-icon" title="Provide methodological context to help stakeholders understand how workforce data in 102-3 was compiled, including measurement units and timing approaches.">i</div>
              </div>

            <div style={{ 
              border: '1px solid #dee2e6', 
              borderRadius: '8px', 
              padding: '20px', 
              marginBottom: '20px',
              background: '#fff'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                marginBottom: '20px',
                paddingBottom: '10px',
                borderBottom: '1px solid #dee2e6'
              }}>
                <h5 style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
                  📊 Contextual Information for Workforce Data Reporting
                  <InfoIcon title="Document methodologies, assumptions, and contextual information necessary to understand the workforce data reported under 102-3." />
                </h5>
                </div>

              {/* Reporting Period */}
              <div style={{ marginBottom: '20px' }}>
                <h6 style={{ 
                  margin: '0 0 10px 0', 
                  fontWeight: 'bold', 
                  color: '#495057' 
                }}>
                  📅 Reporting Period
                </h6>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <label className="form-label">Start Date *</label>
                    <input 
                      type="date" 
                      className="form-input"
                      value={workforceReportingPeriodStart}
                      onChange={(e) => setWorkforceReportingPeriodStart(e.target.value)}
                      required
                    />
                </div>
                  <div style={{ flex: 1 }}>
                    <label className="form-label">End Date *</label>
                    <input 
                      type="date" 
                      className="form-input"
                      value={workforceReportingPeriodEnd}
                      onChange={(e) => setWorkforceReportingPeriodEnd(e.target.value)}
                      required
                    />
                </div>
              </div>
              </div>

              {/* Reporting Unit and Definition */}
              <div style={{ marginBottom: '20px' }}>
                <h6 style={{ 
                  margin: '0 0 10px 0', 
                  fontWeight: 'bold', 
                  color: '#495057' 
                }}>
                  📏 Measurement Unit and Definition
                </h6>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '15px' }}>
                  <div>
                    <label className="form-label">Reporting Unit *</label>
                    <select 
                      className="form-input"
                      value={reportingUnit}
                      onChange={(e) => setReportingUnit(e.target.value)}
                      required
                    >
                      <option value="">Select reporting unit</option>
                      <option value="headcount">Headcount</option>
                      <option value="fte">Full-Time Equivalent (FTE)</option>
                      <option value="other">Other (specify in definition)</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">
                      Definition of Reporting Unit *
                      <span style={{ fontSize: '12px', color: '#666', fontWeight: 'normal' }}>
                        <br/>Describe the methodology or precise definition of the chosen reporting unit
                      </span>
                    </label>
                    <textarea 
                      className="form-textarea" 
                      rows={3}
                      value={reportingUnitDefinition}
                      onChange={(e) => setReportingUnitDefinition(e.target.value)}
                      placeholder="e.g., FTE calculated as total hours worked / standard full-time hours (2,080 hours annually)"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Reporting Frequency */}
              <div style={{ marginBottom: '20px' }}>
                <h6 style={{ 
                  margin: '0 0 10px 0', 
                  fontWeight: 'bold', 
                  color: '#495057' 
                }}>
                  ⏱️ Reporting Frequency and Timing
                </h6>
                <div>
                  <label className="form-label">
                    Reporting Frequency *
                    <span style={{ fontSize: '12px', color: '#666', fontWeight: 'normal' }}>
                      <br/>Indicate how workforce data is reported (timing methodology)
                    </span>
                  </label>
                  <select 
                    className="form-input"
                    value={reportingFrequency}
                    onChange={(e) => setReportingFrequency(e.target.value)}
                    required
                    style={{ maxWidth: '400px' }}
                  >
                    <option value="">Select reporting frequency</option>
                    <option value="period_end">At the end of the reporting period</option>
                    <option value="average_period">Average across the reporting period</option>
                    <option value="monthly_average">Monthly average</option>
                    <option value="quarterly_average">Quarterly average</option>
                    <option value="other">Other (specify in methodology description)</option>
                  </select>
                </div>
              </div>

              {/* Methodology Description */}
              <div style={{ marginBottom: '20px' }}>
                <h6 style={{ 
                  margin: '0 0 10px 0', 
                  fontWeight: 'bold', 
                  color: '#495057' 
                }}>
                  🔍 Methodology Description
                </h6>
                <label className="form-label">
                  Explain methodologies used to compile workforce data *
                  <span style={{ fontSize: '12px', color: '#666', fontWeight: 'normal' }}>
                    <br/>Include data sources, calculation methods, systems used
                  </span>
                </label>
                <textarea 
                  className="form-textarea" 
                  rows={4}
                  value={methodologyDescription}
                  onChange={(e) => setMethodologyDescription(e.target.value)}
                  placeholder="e.g., Using HRIS system data extracted monthly, combined with payroll records for verification. Contract workers tracked separately through vendor management system..."
                  required
                />
              </div>

              {/* Assumptions Made */}
              <div style={{ marginBottom: '20px' }}>
                <h6 style={{ 
                  margin: '0 0 10px 0', 
                  fontWeight: 'bold', 
                  color: '#495057' 
                }}>
                  💭 Key Assumptions
                </h6>
                <label className="form-label">
                  List any assumptions used in compiling or interpreting workforce data
                  <span style={{ fontSize: '12px', color: '#666', fontWeight: 'normal' }}>
                    <br/>Include exclusions, estimation methods, data limitations
                  </span>
                </label>
                <textarea 
                  className="form-textarea" 
                  rows={4}
                  value={assumptionsMade}
                  onChange={(e) => setAssumptionsMade(e.target.value)}
                  placeholder="e.g., Employees on unpaid leave excluded from counts; Interns counted as temporary employees; Remote workers included based on primary work location..."
                />
              </div>

              {/* Changes or Restatements */}
              <div style={{ marginBottom: '20px' }}>
                <h6 style={{ 
                  margin: '0 0 10px 0', 
                  fontWeight: 'bold', 
                  color: '#495057' 
                }}>
                  🔄 Changes and Restatements
                </h6>
                <label className="form-label">
                  Describe any changes from previous reporting periods in methodologies or assumptions
                  <span style={{ fontSize: '12px', color: '#666', fontWeight: 'normal' }}>
                    <br/>Include reasons for changes and impact on comparability
                  </span>
                </label>
                <textarea 
                  className="form-textarea" 
                  rows={3}
                  value={changesRestatements}
                  onChange={(e) => setChangesRestatements(e.target.value)}
                  placeholder="e.g., Changed from headcount to FTE methodology for better comparability with industry standards. Previous year data restated using new methodology..."
                />
              </div>

              {/* Additional Notes */}
              <div style={{ marginBottom: '10px' }}>
                <h6 style={{ 
                  margin: '0 0 10px 0', 
                  fontWeight: 'bold', 
                  color: '#495057' 
                }}>
                  📝 Additional Contextual Information
                </h6>
                <label className="form-label">
                  Any other contextual information relevant to understanding the workforce data reported
                  <span style={{ fontSize: '12px', color: '#666', fontWeight: 'normal' }}>
                    <br/>Optional field for additional context, scope clarifications, or special circumstances
                  </span>
                </label>
                <textarea 
                  className="form-textarea" 
                  rows={3}
                  value={workforceAdditionalNotes}
                  onChange={(e) => setWorkforceAdditionalNotes(e.target.value)}
                  placeholder="e.g., Includes contract and temporary workers in addition to permanent employees; Workforce data excludes joint venture employees..."
                />
              </div>

              {/* Summary Information Box */}
              {reportingUnit && reportingFrequency && (
                <div style={{ 
                  backgroundColor: '#f8f9fa',
                  border: '1px solid #dee2e6',
                  borderRadius: '6px',
                  padding: '15px',
                  marginTop: '15px'
                }}>
                  <h6 style={{ margin: '0 0 10px 0', color: '#495057' }}>📋 Reporting Summary</h6>
                  <div style={{ fontSize: '14px', lineHeight: '1.5' }}>
                    <p style={{ margin: '0 0 8px 0' }}>
                      <strong>Unit of Measurement:</strong> {reportingUnit === 'headcount' ? 'Headcount' : reportingUnit === 'fte' ? 'Full-Time Equivalent (FTE)' : 'Other methodology'}
                    </p>
                    <p style={{ margin: '0 0 8px 0' }}>
                      <strong>Reporting Timing:</strong> {
                        reportingFrequency === 'period_end' ? 'At the end of reporting period' :
                        reportingFrequency === 'average_period' ? 'Average across reporting period' :
                        reportingFrequency === 'monthly_average' ? 'Monthly average' :
                        reportingFrequency === 'quarterly_average' ? 'Quarterly average' :
                        'Other methodology'
                      }
                    </p>
                    <p style={{ margin: 0 }}>
                      <strong>Reporting Period:</strong> {workforceReportingPeriodStart && workforceReportingPeriodEnd ? `${workforceReportingPeriodStart} to ${workforceReportingPeriodEnd}` : 'Not specified'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="save-section">
            <a href="#" className="attachments-link">
              <span>📎</span>
              <span>Attachments</span>
            </a>
            <button type="button" className="save-btn">SAVE</button>
          </div>
        </div>

        {/* Disclosure 102-4: GHG emissions reduction targets and progress */}
        <div className="section-header">
          <div className="main-heading">
            4. GHG emissions reduction targets and progress
            <div className="info-icon" title="The GHG emissions reduction targets reported under this disclosure are used to report the targets to achieve the transition plan under 102-1-f.">i</div>
          </div>
        </div>

        <div className="question-section">
          {/* Requirement 4a */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">4a</div>
              <div className="sub-question-title">report short-, medium-, and long-term gross Scope 1, Scope 2, and Scope 3 GHG emissions reduction targets in metric tons of CO₂ equivalent and as a percentage of base year emissions</div>
              <div className="info-icon" title="The organization should ensure consistency between Scope 3 categories covered by the target and Scope 3 categories covered by Disclosure102-7.">i</div>
            </div>

            <div style={{ 
              border: '1px solid #dee2e6', 
              borderRadius: '8px', 
              padding: '20px', 
              marginBottom: '20px',
              background: '#fff'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                marginBottom: '20px',
                paddingBottom: '10px',
                borderBottom: '1px solid #dee2e6'
              }}>
                <h5 style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
                  🎯 GHG Emissions Reduction Targets
                  <InfoIcon title="Report targets in metric tons of CO₂ equivalent and as percentage of base year emissions for different scopes and timeframes." />
                </h5>
          </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ 
                  width: '100%', 
                  borderCollapse: 'collapse',
                  fontSize: '12px',
                  marginBottom: '10px'
                }}>
                  <thead>
                    <tr style={{ background: '#f8f9fa' }}>
                      <th rowSpan={2} style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'center', 
                        fontWeight: 'bold',
                        minWidth: '120px',
                        verticalAlign: 'middle'
                      }}>
                        GHG emissions reduction targets
                      </th>
                      <th colSpan={3} style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'center', 
                        fontWeight: 'bold',
                        backgroundColor: '#e3f2fd'
                      }}>
                        Information on target
                      </th>
                      <th colSpan={2} style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'center', 
                        fontWeight: 'bold',
                        backgroundColor: '#f3e5f5'
                      }}>
                        Information on progress
                      </th>
                      <th colSpan={6} style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'center', 
                        fontWeight: 'bold',
                        backgroundColor: '#e8f5e8'
                      }}>
                        Information on how the target was set
                      </th>
                    </tr>
                    <tr style={{ background: '#f8f9fa' }}>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '8px', 
                        textAlign: 'center', 
                        fontWeight: 'bold',
                        minWidth: '80px',
                        backgroundColor: '#e3f2fd'
                      }}>
                        Target year<br/>
                        <span style={{ fontSize: '10px', color: '#666' }}>(102-4-a-i)</span>
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '8px', 
                        textAlign: 'center', 
                        fontWeight: 'bold',
                        minWidth: '80px',
                        backgroundColor: '#e3f2fd'
                      }}>
                        Target emissions<br/>(%)<br/>
                        <span style={{ fontSize: '10px', color: '#666' }}>(102-4-a)</span>
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '8px', 
                        textAlign: 'center', 
                        fontWeight: 'bold',
                        minWidth: '100px',
                        backgroundColor: '#e3f2fd'
                      }}>
                        Target emissions<br/>(tCO₂e)<br/>
                        <span style={{ fontSize: '10px', color: '#666' }}>(102-4-a)</span>
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '8px', 
                        textAlign: 'center', 
                        fontWeight: 'bold',
                        minWidth: '80px',
                        backgroundColor: '#f3e5f5'
                      }}>
                        Progress<br/>(%)<br/>
                        <span style={{ fontSize: '10px', color: '#666' }}>(102-4-a)</span>
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '8px', 
                        textAlign: 'center', 
                        fontWeight: 'bold',
                        minWidth: '100px',
                        backgroundColor: '#f3e5f5'
                      }}>
                        Progress<br/>(tCO₂e)<br/>
                        <span style={{ fontSize: '10px', color: '#666' }}>(102-4-a)</span>
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '8px', 
                        textAlign: 'center', 
                        fontWeight: 'bold',
                        minWidth: '80px',
                        backgroundColor: '#e8f5e8'
                      }}>
                        Base year<br/>
                        <span style={{ fontSize: '10px', color: '#666' }}>(102-4-a-i)</span>
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '8px', 
                        textAlign: 'center', 
                        fontWeight: 'bold',
                        minWidth: '100px',
                        backgroundColor: '#e8f5e8'
                      }}>
                        Base year emissions<br/>(tCO₂e)<br/>
                        <span style={{ fontSize: '10px', color: '#666' }}>(102-4-a-i)</span>
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '8px', 
                        textAlign: 'center', 
                        fontWeight: 'bold',
                        minWidth: '120px',
                        backgroundColor: '#e8f5e8'
                      }}>
                        Biogenic CO₂ emissions included in the target<br/>(yes/no)<br/>
                        <span style={{ fontSize: '10px', color: '#666' }}>(102-4-a)</span>
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '8px', 
                        textAlign: 'center', 
                        fontWeight: 'bold',
                        minWidth: '100px',
                        backgroundColor: '#e8f5e8'
                      }}>
                        Gases covered<br/>
                        <span style={{ fontSize: '10px', color: '#666' }}>(102-4-a)</span>
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '8px', 
                        textAlign: 'center', 
                        fontWeight: 'bold',
                        minWidth: '120px',
                        backgroundColor: '#e8f5e8'
                      }}>
                        Scope 3 categories covered<br/>
                        <span style={{ fontSize: '10px', color: '#666' }}>(102-4-a)</span>
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '8px', 
                        textAlign: 'center', 
                        fontWeight: 'bold',
                        minWidth: '120px',
                        backgroundColor: '#e8f5e8'
                      }}>
                        Percentage of emissions included within each Scope*
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {['Scope 1 target', 'Scope 2 target, location-based', 'Scope 2 target, market-based', 'Scope 3 target', 'Scope 1 and 2 target', 'Scope 1, 2 and 3 target'].map((targetType, index) => (
                      <tr key={targetType} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                        <td style={{ 
                          border: '1px solid #dee2e6', 
                          padding: '10px',
                          fontWeight: '500',
                          textAlign: 'left'
                        }}>
                          {targetType}<br/>
                          <span style={{ fontSize: '10px', color: '#666' }}>(102-4-a-i)</span>
                        </td>
                        {Array.from({ length: 11 }, (_, cellIndex) => (
                          <td key={cellIndex} style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                            {cellIndex === 7 ? (
                              // Biogenic CO₂ emissions yes/no dropdown
                              <select 
                                className="form-input"
                                style={{ 
                                  width: '100%', 
                                  border: 'none',
                                  background: 'transparent',
                                  fontSize: '11px'
                                }}
                              >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                              </select>
                            ) : cellIndex === 8 ? (
                              // Gases covered multi-select
                              <div style={{ position: 'relative' }}>
                                <select 
                                  multiple
                                  className="form-input"
                                  style={{ 
                                    width: '100%', 
                                    border: 'none',
                                    background: 'transparent',
                                    fontSize: '10px',
                                    minHeight: '60px'
                                  }}
                                  title="Hold Ctrl/Cmd to select multiple gases"
                                >
                                  <option value="co2">CO₂ (Carbon Dioxide)</option>
                                  <option value="ch4">CH₄ (Methane)</option>
                                  <option value="n2o">N₂O (Nitrous Oxide)</option>
                                  <option value="hfcs">HFCs (Hydrofluorocarbons)</option>
                                  <option value="pfcs">PFCs (Perfluorocarbons)</option>
                                  <option value="sf6">SF₆ (Sulfur Hexafluoride)</option>
                                  <option value="nf3">NF₃ (Nitrogen Trifluoride)</option>
                                  <option value="all_kyoto">All Kyoto Protocol gases</option>
                                </select>
                                <div style={{ 
                                  position: 'absolute', 
                                  bottom: '2px', 
                                  right: '2px', 
                                  fontSize: '8px', 
                                  color: '#666',
                                  backgroundColor: 'rgba(255,255,255,0.8)',
                                  padding: '1px 2px',
                                  borderRadius: '2px'
                                }}>
                                  Multi
          </div>
        </div>
                            ) : cellIndex === 9 ? (
                              // Scope 3 categories covered multi-select
                              <div style={{ position: 'relative' }}>
                                <select 
                                  multiple
                                  className="form-input"
                                  style={{ 
                                    width: '100%', 
                                    border: 'none',
                                    background: 'transparent',
                                    fontSize: '10px',
                                    minHeight: '60px'
                                  }}
                                  title="Hold Ctrl/Cmd to select multiple Scope 3 categories"
                                >
                                  <option value="cat1">1. Purchased goods and services</option>
                                  <option value="cat2">2. Capital goods</option>
                                  <option value="cat3">3. Fuel- and energy-related activities</option>
                                  <option value="cat4">4. Upstream transportation and distribution</option>
                                  <option value="cat5">5. Waste generated in operations</option>
                                  <option value="cat6">6. Business travel</option>
                                  <option value="cat7">7. Employee commuting</option>
                                  <option value="cat8">8. Upstream leased assets</option>
                                  <option value="cat9">9. Downstream transportation and distribution</option>
                                  <option value="cat10">10. Processing of sold products</option>
                                  <option value="cat11">11. Use of sold products</option>
                                  <option value="cat12">12. End-of-life treatment of sold products</option>
                                  <option value="cat13">13. Downstream leased assets</option>
                                  <option value="cat14">14. Franchises</option>
                                  <option value="cat15">15. Investments</option>
                                </select>
                                <div style={{ 
                                  position: 'absolute', 
                                  bottom: '2px', 
                                  right: '2px', 
                                  fontSize: '8px', 
                                  color: '#666',
                                  backgroundColor: 'rgba(255,255,255,0.8)',
                                  padding: '1px 2px',
                                  borderRadius: '2px'
                                }}>
                                  Multi
          </div>
                              </div>
                            ) : (
                              <input 
                                type={cellIndex === 0 || cellIndex === 5 ? "number" : "text"}
                                className="form-input"
                                style={{ 
                                  width: '100%', 
                                  border: 'none',
                                  background: 'transparent',
                                  textAlign: 'center',
                                  fontSize: '11px',
                                  padding: '4px'
                                }}
                                placeholder={
                                  cellIndex === 0 ? "YYYY" :
                                  cellIndex === 1 || cellIndex === 3 || cellIndex === 10 ? "%" :
                                  cellIndex === 2 || cellIndex === 4 || cellIndex === 6 ? "tCO₂e" :
                                  cellIndex === 5 ? "YYYY" : ""
                                }
                              />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
        </div>

              <div style={{ 
                fontSize: '12px', 
                color: '#666', 
                marginTop: '15px',
                padding: '10px',
                background: '#f8f9fa',
                borderRadius: '4px'
              }}>
                <p style={{ margin: '0 0 8px 0' }}>
                  <strong>Note:</strong> Report targets for short-term (1-5 years), medium-term (5-10 years), and long-term (10+ years) periods.
                </p>
                <p style={{ margin: '0 0 8px 0' }}>
                  <strong>Scope 3 Categories:</strong> Ensure consistency with categories covered in Disclosure 102-7.
                </p>
                <p style={{ margin: '0 0 8px 0' }}>
                  <strong>Gases Covered:</strong> Multi-select dropdown with all seven Kyoto Protocol gases (CO₂, CH₄, N₂O, HFCs, PFCs, SF₆, NF₃, All Kyoto gases).
                </p>
                <p style={{ margin: '0 0 8px 0' }}>
                  <strong>Scope 3 Categories:</strong> Multi-select dropdown with all 15 GHG Protocol categories. Select applicable categories for each target.
                </p>
                <p style={{ margin: 0 }}>
                  <strong>Multi-Select Instructions:</strong> Hold Ctrl (PC) or Cmd (Mac) while clicking to select multiple options in dropdown columns.
                </p>
            </div>
            </div>
          </div>

          <div className="save-section">
            <a href="#" className="attachments-link">
              <span>📎</span>
              <span>Attachments</span>
            </a>
            <button type="button" className="save-btn">SAVE</button>
          </div>
        </div>

        {/* Disclosure 102-5, 102-6, 102-7: GHG Emissions (Scope 1, 2, and 3) */}
        <div className="section-header">
          <div className="main-heading">
            5. GHG Emissions (Scope 1, Scope 2, and Scope 3)
            <div className="info-icon" title="Comprehensive reporting of gross GHG emissions across all scopes including the 15 Scope 3 categories from the GHG Protocol Corporate Value Chain Accounting and Reporting Standard.">i</div>
          </div>
        </div>

        <div className="question-section">
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">{reportByGas ? '5a & 5b' : '5a'}</div>
              <div className="sub-question-title">
                {reportByGas ? 
                  'report gross GHG emissions - both summary format and detailed breakdown by greenhouse gas' :
                  'report gross Scope 1, Scope 2, and Scope 3 GHG emissions in metric tons of CO₂ equivalent across reporting periods'
                }
              </div>
              <div className="info-icon" title={reportByGas ? 
                "When selecting 'Yes (By Gas)', both the comprehensive summary table (5a) and the detailed gas breakdown table (5b) are shown for complete reporting." :
                "Include emissions and biogenic CO₂ data for base year and up to three reporting periods. Scope 2 should include both location-based and market-based methods where applicable."
              }>i</div>
            </div>

            <div style={{ 
              border: '1px solid #dee2e6', 
              borderRadius: '8px', 
              padding: '20px', 
              marginBottom: '20px',
              background: '#fff'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                marginBottom: '20px',
                paddingBottom: '10px',
                borderBottom: '1px solid #dee2e6'
              }}>
                <h5 style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
                  📊 Comprehensive GHG Emissions Reporting
                  <InfoIcon title="Report emissions data across all scopes with base year and multiple reporting periods for trend analysis." />
                </h5>
        </div>

              {/* Table Configuration Inputs */}
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '20px',
                marginBottom: '20px',
                padding: '15px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #dee2e6'
              }}>
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '5px', 
                    fontWeight: 'bold',
                    fontSize: '14px',
                    color: '#495057'
                  }}>
                    Base Year
                  </label>
                  <input
                    type="number"
                    value={baseYear}
                    onChange={(e) => setBaseYear(e.target.value)}
                    placeholder="e.g., 2020"
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #ced4da',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  />
                </div>
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '5px', 
                    fontWeight: 'bold',
                    fontSize: '14px',
                    color: '#495057'
                  }}>
                    Number of Past Years Data Available
                  </label>
                  <select
                    value={numberOfYears}
                    onChange={(e) => setNumberOfYears(parseInt(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #ced4da',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  >
                    <option value={1}>1 Year (Base year + Current period)</option>
                    <option value={2}>2 Years (Base year + 1 past year + Current period)</option>
                    <option value={3}>3 Years (Base year + 2 past years + Current period)</option>
                    <option value={4}>4 Years (Base year + 3 past years + Current period)</option>
                  </select>
                </div>
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '5px', 
                    fontWeight: 'bold',
                    fontSize: '14px',
                    color: '#495057'
                  }}>
                    Report Emissions by Greenhouse Gas?
                  </label>
                  <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginTop: '8px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', fontSize: '14px' }}>
                      <input
                        type="radio"
                        name="reportByGas"
                        checked={!reportByGas}
                        onChange={() => setReportByGas(false)}
                        style={{ marginRight: '5px' }}
                      />
                      No (Show Only 5a Summary)
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', fontSize: '14px' }}>
                      <input
                        type="radio"
                        name="reportByGas"
                        checked={reportByGas}
                        onChange={() => setReportByGas(true)}
                        style={{ marginRight: '5px' }}
                      />
                      Yes (Show Both 5a & 5b)
                    </label>
                  </div>
          </div>
        </div>

              <div style={{ overflowX: 'auto' }}>
                {/* Summary Table (5a) - Always show */}
                <div style={{ marginBottom: reportByGas ? '30px' : '0' }}>
                  <h6 style={{ 
                    margin: '0 0 15px 0', 
                    padding: '10px 15px',
                    backgroundColor: '#e3f2fd',
                    borderRadius: '6px',
                    border: '1px solid #dee2e6',
                    fontWeight: 'bold',
                    color: '#495057'
                  }}>
                    📊 Question 5a: Summary Emissions Table
                  </h6>
                  <table style={{ 
                    width: '100%', 
                    borderCollapse: 'collapse',
                    fontSize: '12px',
                    marginBottom: '10px'
                  }}>
                    <thead>
                      <tr style={{ background: '#f8f9fa' }}>
                        <th rowSpan={2} style={{ 
                          border: '1px solid #dee2e6', 
                          padding: '12px', 
                          textAlign: 'left', 
                          fontWeight: 'bold',
                          minWidth: '250px',
                          verticalAlign: 'middle'
                        }}>
                          Scope 1, Scope 2, and Scope 3 GHG emissions
                        </th>
                      {periods.length > 0 ? periods.map((period, index) => (
                        <th key={index} colSpan={2} style={{ 
                          border: '1px solid #dee2e6', 
                          padding: '8px', 
                          textAlign: 'center', 
                          fontWeight: 'bold',
                          backgroundColor: period.color
                        }}>
                          {period.label}
                        </th>
                      )) : (
                        <th colSpan={2} style={{ 
                          border: '1px solid #dee2e6', 
                          padding: '8px', 
                          textAlign: 'center', 
                          fontWeight: 'bold',
                          backgroundColor: '#f8f9fa'
                        }}>
                          Please configure base year above
                        </th>
                      )}
                    </tr>
                    <tr style={{ background: '#f8f9fa' }}>
                      {periods.length > 0 ? periods.map((period, index) => (
                        <React.Fragment key={index}>
                          <th style={{ 
                            border: '1px solid #dee2e6', 
                            padding: '6px', 
                            textAlign: 'center', 
                            fontWeight: 'bold',
                            minWidth: '120px',
                            backgroundColor: period.color
                          }}>
                            Emissions (mtCO₂e)
                          </th>
                          <th style={{ 
                            border: '1px solid #dee2e6', 
                            padding: '6px', 
                            textAlign: 'center', 
                            fontWeight: 'bold',
                            minWidth: '120px',
                            backgroundColor: period.color
                          }}>
                            Biogenic CO₂ emissions (metric tons)
                          </th>
                        </React.Fragment>
                      )) : (
                        <>
                          <th style={{ 
                            border: '1px solid #dee2e6', 
                            padding: '6px', 
                            textAlign: 'center', 
                            fontWeight: 'bold',
                            backgroundColor: '#f8f9fa'
                          }}>
                            Emissions (mtCO₂e)
                          </th>
                          <th style={{ 
                            border: '1px solid #dee2e6', 
                            padding: '6px', 
                            textAlign: 'center', 
                            fontWeight: 'bold',
                            backgroundColor: '#f8f9fa'
                          }}>
                            Biogenic CO₂ emissions (metric tons)
                          </th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Scope 1 */}
                    <tr>
                      <td style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '8px',
                        fontWeight: 'bold',
                        textAlign: 'left'
                      }}>
                        Scope 1 GHG emissions (102-5-a; 102-5-c)
                      </td>
                      {periods.length > 0 ? periods.map((period, periodIndex) => (
                        <React.Fragment key={periodIndex}>
                          <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                            <input 
                              type="text"
                              className="form-input"
                              style={{ 
                                width: '100%', 
                                border: 'none',
                                background: 'transparent',
                                textAlign: 'center',
                                fontSize: '11px',
                                padding: '4px'
                              }}
                              placeholder=""
                            />
                          </td>
                          <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                            <input 
                              type="text"
                              className="form-input"
                              style={{ 
                                width: '100%', 
                                border: 'none',
                                background: 'transparent',
                                textAlign: 'center',
                                fontSize: '11px',
                                padding: '4px'
                              }}
                              placeholder=""
                            />
                          </td>
                        </React.Fragment>
                      )) : (
                        <>
                          <td style={{ border: '1px solid #dee2e6', padding: '4px', backgroundColor: '#f8f9fa' }}></td>
                          <td style={{ border: '1px solid #dee2e6', padding: '4px', backgroundColor: '#f8f9fa' }}></td>
                        </>
                      )}
                    </tr>
                    
                    {/* Scope 2 Header */}
                    <tr style={{ backgroundColor: '#f5f5f5' }}>
                      <td style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '8px',
                        fontWeight: 'bold',
                        textAlign: 'left'
                      }}>
                        Scope 2 GHG emissions (102-6-a; 102-6-c)
                      </td>
                      {periods.length > 0 ? periods.map((period, periodIndex) => (
                        <React.Fragment key={periodIndex}>
                          <td style={{ border: '1px solid #dee2e6', backgroundColor: '#f5f5f5' }}></td>
                          <td style={{ border: '1px solid #dee2e6', backgroundColor: '#f5f5f5' }}></td>
                        </React.Fragment>
                      )) : (
                        <>
                          <td style={{ border: '1px solid #dee2e6', backgroundColor: '#f5f5f5' }}></td>
                          <td style={{ border: '1px solid #dee2e6', backgroundColor: '#f5f5f5' }}></td>
                        </>
                      )}
                    </tr>
                    
                    {/* Location-based */}
                    <tr>
                      <td style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '8px',
                        paddingLeft: '20px',
                        textAlign: 'left'
                      }}>
                        - Location-based
                      </td>
                      {periods.length > 0 ? periods.map((period, periodIndex) => (
                        <React.Fragment key={periodIndex}>
                          <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                            <input 
                              type="text"
                              className="form-input"
                              style={{ 
                                width: '100%', 
                                border: 'none',
                                background: 'transparent',
                                textAlign: 'center',
                                fontSize: '11px',
                                padding: '4px'
                              }}
                              placeholder=""
                            />
                          </td>
                          <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                            <input 
                              type="text"
                              className="form-input"
                              style={{ 
                                width: '100%', 
                                border: 'none',
                                background: 'transparent',
                                textAlign: 'center',
                                fontSize: '11px',
                                padding: '4px'
                              }}
                              placeholder=""
                            />
                          </td>
                        </React.Fragment>
                      )) : (
                        <>
                          <td style={{ border: '1px solid #dee2e6', padding: '4px', backgroundColor: '#f8f9fa' }}></td>
                          <td style={{ border: '1px solid #dee2e6', padding: '4px', backgroundColor: '#f8f9fa' }}></td>
                        </>
                      )}
                    </tr>
                    
                    {/* Market-based */}
                    <tr style={{ backgroundColor: '#f9f9f9' }}>
                      <td style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '8px',
                        paddingLeft: '20px',
                        textAlign: 'left'
                      }}>
                        - Market-based
                      </td>
                      {periods.length > 0 ? periods.map((period, periodIndex) => (
                        <React.Fragment key={periodIndex}>
                          <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                            <input 
                              type="text"
                              className="form-input"
                              style={{ 
                                width: '100%', 
                                border: 'none',
                                background: 'transparent',
                                textAlign: 'center',
                                fontSize: '11px',
                                padding: '4px'
                              }}
                              placeholder=""
                            />
                          </td>
                          <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                            <input 
                              type="text"
                              className="form-input"
                              style={{ 
                                width: '100%', 
                                border: 'none',
                                background: 'transparent',
                                textAlign: 'center',
                                fontSize: '11px',
                                padding: '4px'
                              }}
                              placeholder=""
                            />
                          </td>
                        </React.Fragment>
                      )) : (
                        <>
                          <td style={{ border: '1px solid #dee2e6', padding: '4px', backgroundColor: '#f8f9fa' }}></td>
                          <td style={{ border: '1px solid #dee2e6', padding: '4px', backgroundColor: '#f8f9fa' }}></td>
                        </>
                      )}
                    </tr>
                    
                    {/* Scope 3 Header */}
                    <tr style={{ backgroundColor: '#f5f5f5' }}>
                      <td style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '8px',
                        fontWeight: 'bold',
                        textAlign: 'left'
                      }}>
                        Scope 3 GHG emissions (102-7-a; 102-7-c)
                      </td>
                      {periods.length > 0 ? periods.map((period, periodIndex) => (
                        <React.Fragment key={periodIndex}>
                          <td style={{ border: '1px solid #dee2e6', backgroundColor: '#f5f5f5' }}></td>
                          <td style={{ border: '1px solid #dee2e6', backgroundColor: '#f5f5f5' }}></td>
                        </React.Fragment>
                      )) : (
                        <>
                          <td style={{ border: '1px solid #dee2e6', backgroundColor: '#f5f5f5' }}></td>
                          <td style={{ border: '1px solid #dee2e6', backgroundColor: '#f5f5f5' }}></td>
                        </>
                      )}
                    </tr>
                    
                    {/* Scope 3 Categories 1-15 */}
                    {[
                      'Category 1: Purchased goods and services (102-7-b)',
                      'Category 2: Capital goods (102-7-b)',
                      'Category 3: Fuel- and energy-related activities (not in Scope 1 or 2) (102-7-b)',
                      'Category 4: Upstream transportation and distribution (102-7-b)',
                      'Category 5: Waste generated in operations (102-7-b)',
                      'Category 6: Business travel (102-7-b)',
                      'Category 7: Employee commuting (102-7-b)',
                      'Category 8: Upstream leased assets (102-7-b)',
                      'Category 9: Downstream transportation and distribution (102-7-b)',
                      'Category 10: Processing of sold products (102-7-b)',
                      'Category 11: Use of sold products (102-7-b)',
                      'Category 12: End-of-life treatment of sold products (102-7-b)',
                      'Category 13: Downstream leased assets (102-7-b)',
                      'Category 14: Franchises (102-7-b)',
                      'Category 15: Investments (102-7-b)'
                    ].map((category, index) => (
                      <tr key={category} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                        <td style={{ 
                          border: '1px solid #dee2e6', 
                          padding: '8px',
                          textAlign: 'left'
                        }}>
                          {category}
                        </td>
                        {periods.length > 0 ? periods.map((period, periodIndex) => (
                          <React.Fragment key={periodIndex}>
                            <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                              <input 
                                type="text"
                                className="form-input"
                                style={{ 
                                  width: '100%', 
                                  border: 'none',
                                  background: 'transparent',
                                  textAlign: 'center',
                                  fontSize: '11px',
                                  padding: '4px'
                                }}
                                placeholder=""
                              />
                            </td>
                            <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                              <input 
                                type="text"
                                className="form-input"
                                style={{ 
                                  width: '100%', 
                                  border: 'none',
                                  background: 'transparent',
                                  textAlign: 'center',
                                  fontSize: '11px',
                                  padding: '4px'
                                }}
                                placeholder=""
                              />
                            </td>
                          </React.Fragment>
                        )) : (
                          <>
                            <td style={{ border: '1px solid #dee2e6', padding: '4px', backgroundColor: '#f8f9fa' }}></td>
                            <td style={{ border: '1px solid #dee2e6', padding: '4px', backgroundColor: '#f8f9fa' }}></td>
                          </>
                        )}
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
                
                {/* By Gas Table (5b) - Show only when user selects "Yes (By Gas)" */}
                {reportByGas && (
                  <div style={{ marginTop: '30px' }}>
                    <h6 style={{ 
                      margin: '0 0 15px 0', 
                      padding: '10px 15px',
                      backgroundColor: '#f3e5f5',
                      borderRadius: '6px',
                      border: '1px solid #dee2e6',
                      fontWeight: 'bold',
                      color: '#495057'
                    }}>
                      ⚗️ Question 5b: Emissions by Greenhouse Gas
                    </h6>
                    <table style={{ 
                      width: '100%', 
                      borderCollapse: 'collapse',
                      fontSize: '12px',
                      marginBottom: '10px'
                    }}>
                    <thead>
                      <tr style={{ background: '#f8f9fa' }}>
                        <th rowSpan={2} style={{ 
                          border: '1px solid #dee2e6', 
                          padding: '12px', 
                          textAlign: 'left', 
                          fontWeight: 'bold',
                          minWidth: '250px',
                          verticalAlign: 'middle'
                        }}>
                          Emissions
                        </th>
                        <th rowSpan={2} style={{ 
                          border: '1px solid #dee2e6', 
                          padding: '12px', 
                          textAlign: 'center', 
                          fontWeight: 'bold',
                          minWidth: '100px',
                          verticalAlign: 'middle'
                        }}>
                          Gas
                        </th>
                        {periods.length > 0 ? periods.map((period, index) => (
                          <th key={index} colSpan={2} style={{ 
                            border: '1px solid #dee2e6', 
                            padding: '8px', 
                            textAlign: 'center', 
                            fontWeight: 'bold',
                            backgroundColor: period.color
                          }}>
                            {period.label}
                          </th>
                        )) : (
                          <th colSpan={2} style={{ 
                            border: '1px solid #dee2e6', 
                            padding: '8px', 
                            textAlign: 'center', 
                            fontWeight: 'bold',
                            backgroundColor: '#f8f9fa'
                          }}>
                            Please configure base year above
                          </th>
                        )}
                      </tr>
                      <tr style={{ background: '#f8f9fa' }}>
                        {periods.length > 0 ? periods.map((period, index) => (
                          <React.Fragment key={index}>
                            <th style={{ 
                              border: '1px solid #dee2e6', 
                              padding: '6px', 
                              textAlign: 'center', 
                              fontWeight: 'bold',
                              minWidth: '120px',
                              backgroundColor: period.color
                            }}>
                              Emissions (metric tons)
                            </th>
                            <th style={{ 
                              border: '1px solid #dee2e6', 
                              padding: '6px', 
                              textAlign: 'center', 
                              fontWeight: 'bold',
                              minWidth: '120px',
                              backgroundColor: period.color
                            }}>
                              Emissions (mtCO₂e)
                            </th>
                          </React.Fragment>
                        )) : (
                          <>
                            <th style={{ 
                              border: '1px solid #dee2e6', 
                              padding: '6px', 
                              textAlign: 'center', 
                              fontWeight: 'bold',
                              backgroundColor: '#f8f9fa'
                            }}>
                              Emissions (metric tons)
                            </th>
                            <th style={{ 
                              border: '1px solid #dee2e6', 
                              padding: '6px', 
                              textAlign: 'center', 
                              fontWeight: 'bold',
                              backgroundColor: '#f8f9fa'
                            }}>
                              Emissions (mtCO₂e)
                            </th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {/* Scope 1 by Gas */}
                      {['CO₂', 'CH₄', 'N₂O', 'HFCs', 'PFCs', 'SF₆', 'NF₃'].map((gas, index) => (
                        <tr key={`scope1-${gas}`} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                          <td style={{ 
                            border: '1px solid #dee2e6', 
                            padding: '8px',
                            textAlign: 'left'
                          }}>
                            Scope 1 GHG emissions (102-5-b)
                          </td>
                          <td style={{ 
                            border: '1px solid #dee2e6', 
                            padding: '8px',
                            textAlign: 'center',
                            fontWeight: 'bold'
                          }}>
                            {gas}
                          </td>
                          {periods.length > 0 ? periods.map((period, periodIndex) => (
                            <React.Fragment key={periodIndex}>
                              <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                                <input 
                                  type="text"
                                  className="form-input"
                                  style={{ 
                                    width: '100%', 
                                    border: 'none',
                                    background: 'transparent',
                                    textAlign: 'center',
                                    fontSize: '11px',
                                    padding: '4px'
                                  }}
                                  placeholder=""
                                />
                              </td>
                              <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                                <input 
                                  type="text"
                                  className="form-input"
                                  style={{ 
                                    width: '100%', 
                                    border: 'none',
                                    background: 'transparent',
                                    textAlign: 'center',
                                    fontSize: '11px',
                                    padding: '4px'
                                  }}
                                  placeholder=""
                                />
                              </td>
                            </React.Fragment>
                          )) : (
                            <>
                              <td style={{ border: '1px solid #dee2e6', padding: '4px', backgroundColor: '#f8f9fa' }}></td>
                              <td style={{ border: '1px solid #dee2e6', padding: '4px', backgroundColor: '#f8f9fa' }}></td>
                            </>
                          )}
                        </tr>
                      ))}
                      
                      {/* Total Scope 1 */}
                      <tr style={{ backgroundColor: '#e3f2fd', fontWeight: 'bold' }}>
                        <td style={{ 
                          border: '1px solid #dee2e6', 
                          padding: '8px',
                          textAlign: 'left',
                          fontWeight: 'bold'
                        }}>
                          Total Scope 1 GHG emissions (102-5-a)
                        </td>
                        <td style={{ 
                          border: '1px solid #dee2e6', 
                          padding: '8px',
                          textAlign: 'center'
                        }}>
                          -
                        </td>
                        {periods.length > 0 ? periods.map((period, periodIndex) => (
                          <React.Fragment key={periodIndex}>
                            <td style={{ border: '1px solid #dee2e6', padding: '4px', backgroundColor: '#e3f2fd' }}>
                              <input 
                                type="text"
                                className="form-input"
                                style={{ 
                                  width: '100%', 
                                  border: 'none',
                                  background: 'transparent',
                                  textAlign: 'center',
                                  fontSize: '11px',
                                  padding: '4px',
                                  fontWeight: 'bold'
                                }}
                                placeholder=""
                              />
                            </td>
                            <td style={{ border: '1px solid #dee2e6', padding: '4px', backgroundColor: '#e3f2fd' }}>
                              <input 
                                type="text"
                                className="form-input"
                                style={{ 
                                  width: '100%', 
                                  border: 'none',
                                  background: 'transparent',
                                  textAlign: 'center',
                                  fontSize: '11px',
                                  padding: '4px',
                                  fontWeight: 'bold'
                                }}
                                placeholder=""
                              />
                            </td>
                          </React.Fragment>
                        )) : (
                          <>
                            <td style={{ border: '1px solid #dee2e6', padding: '4px', backgroundColor: '#e3f2fd' }}></td>
                            <td style={{ border: '1px solid #dee2e6', padding: '4px', backgroundColor: '#e3f2fd' }}></td>
                          </>
                        )}
                      </tr>
                      
                      {/* Scope 2 Location-based by Gas */}
                      {['CO₂', 'CH₄', 'N₂O'].map((gas, index) => (
                        <tr key={`scope2-location-${gas}`} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                          <td style={{ 
                            border: '1px solid #dee2e6', 
                            padding: '8px',
                            textAlign: 'left'
                          }}>
                            Scope 2 GHG emissions (location-based) (102-6-b)
                          </td>
                          <td style={{ 
                            border: '1px solid #dee2e6', 
                            padding: '8px',
                            textAlign: 'center',
                            fontWeight: 'bold'
                          }}>
                            {gas}
                          </td>
                          {periods.length > 0 ? periods.map((period, periodIndex) => (
                            <React.Fragment key={periodIndex}>
                              <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                                <input 
                                  type="text"
                                  className="form-input"
                                  style={{ 
                                    width: '100%', 
                                    border: 'none',
                                    background: 'transparent',
                                    textAlign: 'center',
                                    fontSize: '11px',
                                    padding: '4px'
                                  }}
                                  placeholder=""
                                />
                              </td>
                              <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                                <input 
                                  type="text"
                                  className="form-input"
                                  style={{ 
                                    width: '100%', 
                                    border: 'none',
                                    background: 'transparent',
                                    textAlign: 'center',
                                    fontSize: '11px',
                                    padding: '4px'
                                  }}
                                  placeholder=""
                                />
                              </td>
                            </React.Fragment>
                          )) : (
                            <>
                              <td style={{ border: '1px solid #dee2e6', padding: '4px', backgroundColor: '#f8f9fa' }}></td>
                              <td style={{ border: '1px solid #dee2e6', padding: '4px', backgroundColor: '#f8f9fa' }}></td>
                            </>
                          )}
                        </tr>
                      ))}
                      
                      {/* Total Scope 2 Location-based */}
                      <tr style={{ backgroundColor: '#f3e5f5', fontWeight: 'bold' }}>
                        <td style={{ 
                          border: '1px solid #dee2e6', 
                          padding: '8px',
                          textAlign: 'left',
                          fontWeight: 'bold'
                        }}>
                          Total Scope 2 GHG emissions (location-based) (102-6-a)
                        </td>
                        <td style={{ 
                          border: '1px solid #dee2e6', 
                          padding: '8px',
                          textAlign: 'center'
                        }}>
                          -
                        </td>
                        {periods.length > 0 ? periods.map((period, periodIndex) => (
                          <React.Fragment key={periodIndex}>
                            <td style={{ border: '1px solid #dee2e6', padding: '4px', backgroundColor: '#f3e5f5' }}>
                              <input 
                                type="text"
                                className="form-input"
                                style={{ 
                                  width: '100%', 
                                  border: 'none',
                                  background: 'transparent',
                                  textAlign: 'center',
                                  fontSize: '11px',
                                  padding: '4px',
                                  fontWeight: 'bold'
                                }}
                                placeholder=""
                              />
                            </td>
                            <td style={{ border: '1px solid #dee2e6', padding: '4px', backgroundColor: '#f3e5f5' }}>
                              <input 
                                type="text"
                                className="form-input"
                                style={{ 
                                  width: '100%', 
                                  border: 'none',
                                  background: 'transparent',
                                  textAlign: 'center',
                                  fontSize: '11px',
                                  padding: '4px',
                                  fontWeight: 'bold'
                                }}
                                placeholder=""
                              />
                            </td>
                          </React.Fragment>
                        )) : (
                          <>
                            <td style={{ border: '1px solid #dee2e6', padding: '4px', backgroundColor: '#f3e5f5' }}></td>
                            <td style={{ border: '1px solid #dee2e6', padding: '4px', backgroundColor: '#f3e5f5' }}></td>
                          </>
                        )}
                      </tr>
                      
                      {/* Scope 2 Market-based by Gas */}
                      {['CO₂', 'CH₄', 'N₂O'].map((gas, index) => (
                        <tr key={`scope2-market-${gas}`} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                          <td style={{ 
                            border: '1px solid #dee2e6', 
                            padding: '8px',
                            textAlign: 'left'
                          }}>
                            Scope 2 GHG emissions (market-based) (102-6-b)
                          </td>
                          <td style={{ 
                            border: '1px solid #dee2e6', 
                            padding: '8px',
                            textAlign: 'center',
                            fontWeight: 'bold'
                          }}>
                            {gas}
                          </td>
                          {periods.length > 0 ? periods.map((period, periodIndex) => (
                            <React.Fragment key={periodIndex}>
                              <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                                <input 
                                  type="text"
                                  className="form-input"
                                  style={{ 
                                    width: '100%', 
                                    border: 'none',
                                    background: 'transparent',
                                    textAlign: 'center',
                                    fontSize: '11px',
                                    padding: '4px'
                                  }}
                                  placeholder=""
                                />
                              </td>
                              <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                                <input 
                                  type="text"
                                  className="form-input"
                                  style={{ 
                                    width: '100%', 
                                    border: 'none',
                                    background: 'transparent',
                                    textAlign: 'center',
                                    fontSize: '11px',
                                    padding: '4px'
                                  }}
                                  placeholder=""
                                />
                              </td>
                            </React.Fragment>
                          )) : (
                            <>
                              <td style={{ border: '1px solid #dee2e6', padding: '4px', backgroundColor: '#f8f9fa' }}></td>
                              <td style={{ border: '1px solid #dee2e6', padding: '4px', backgroundColor: '#f8f9fa' }}></td>
                            </>
                          )}
                        </tr>
                      ))}
                      
                      {/* Total Scope 2 Market-based */}
                      <tr style={{ backgroundColor: '#e8f5e8', fontWeight: 'bold' }}>
                        <td style={{ 
                          border: '1px solid #dee2e6', 
                          padding: '8px',
                          textAlign: 'left',
                          fontWeight: 'bold'
                        }}>
                          Total Scope 2 GHG emissions (market-based) (102-6-a)
                        </td>
                        <td style={{ 
                          border: '1px solid #dee2e6', 
                          padding: '8px',
                          textAlign: 'center'
                        }}>
                          -
                        </td>
                        {periods.length > 0 ? periods.map((period, periodIndex) => (
                          <React.Fragment key={periodIndex}>
                            <td style={{ border: '1px solid #dee2e6', padding: '4px', backgroundColor: '#e8f5e8' }}>
                              <input 
                                type="text"
                                className="form-input"
                                style={{ 
                                  width: '100%', 
                                  border: 'none',
                                  background: 'transparent',
                                  textAlign: 'center',
                                  fontSize: '11px',
                                  padding: '4px',
                                  fontWeight: 'bold'
                                }}
                                placeholder=""
                              />
                            </td>
                            <td style={{ border: '1px solid #dee2e6', padding: '4px', backgroundColor: '#e8f5e8' }}>
                              <input 
                                type="text"
                                className="form-input"
                                style={{ 
                                  width: '100%', 
                                  border: 'none',
                                  background: 'transparent',
                                  textAlign: 'center',
                                  fontSize: '11px',
                                  padding: '4px',
                                  fontWeight: 'bold'
                                }}
                                placeholder=""
                              />
                            </td>
                          </React.Fragment>
                        )) : (
                          <>
                            <td style={{ border: '1px solid #dee2e6', padding: '4px', backgroundColor: '#e8f5e8' }}></td>
                            <td style={{ border: '1px solid #dee2e6', padding: '4px', backgroundColor: '#e8f5e8' }}></td>
                          </>
                        )}
                      </tr>
                    </tbody>
                    </table>
                  </div>
                )}
                
                <div style={{ 
                  fontSize: '12px', 
                  color: '#666', 
                  marginTop: '15px',
                  padding: '10px',
                  background: '#f8f9fa',
                  borderRadius: '4px'
                }}>
                  {!reportByGas ? (
                    <>
                      <p style={{ margin: '0 0 8px 0' }}>
                        <strong>Instructions:</strong> Report emissions in metric tons of CO₂ equivalent (mtCO₂e) and biogenic CO₂ emissions in metric tons.
                      </p>
                      <p style={{ margin: '0 0 8px 0' }}>
                        <strong>Scope 2:</strong> Include both location-based and market-based calculations where applicable.
                      </p>
                      <p style={{ margin: 0 }}>
                        <strong>Scope 3:</strong> Report for all applicable categories from the 15 GHG Protocol Corporate Value Chain categories.
                      </p>
                    </>
                  ) : (
                    <>
                      <p style={{ margin: '0 0 8px 0' }}>
                        <strong>Complete Reporting Instructions:</strong> Both summary and detailed gas breakdown tables are provided for comprehensive emissions reporting.
                      </p>
                      <p style={{ margin: '0 0 8px 0' }}>
                        <strong>Table 5a (Summary):</strong> Report total emissions in mtCO₂e and biogenic CO₂ for all scopes including 15 Scope 3 categories.
                      </p>
                      <p style={{ margin: '0 0 8px 0' }}>
                        <strong>Table 5b (By Gas):</strong> Report individual gas emissions for Scope 1 (7 gases) and Scope 2 (3 gases, both location-based and market-based).
                      </p>
                      <p style={{ margin: 0 }}>
                        <strong>Data Format:</strong> Fill both tables for complete GHG Protocol compliance and comprehensive disclosure.
                      </p>
                    </>
                  )}
            </div>
              </div>
            </div>
          </div>

          <div className="save-section">
            <a href="#" className="attachments-link">
              <span>📎</span>
              <span>Attachments</span>
            </a>
            <button type="button" className="save-btn">SAVE</button>
          </div>
        </div>

        {/* Disclosure 102-8: GHG emissions intensity */}
        <div className="section-header">
          <div className="main-heading">
            6. GHG emissions intensity
            <div className="info-icon" title="GHG emissions intensity ratios are obtained by dividing the organization's gross GHG emissions (the numerator) by an organization-specific metric (the denominator).">i</div>
          </div>
        </div>

        <div className="question-section">
          {/* Requirement 6a */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">6a</div>
              <div className="sub-question-title">report GHG emissions intensity ratio(s), including the gross GHG emissions in metric tons of CO₂ equivalent (the numerator) and the organization-specific metric (the denominator) chosen to calculate the ratio(s)</div>
              <div className="info-icon" title="Examples of GHG emissions intensity ratios can include: [amount of] gross Scope 1 GHG emissions in metric tons of CO₂ equivalent.">i</div>
            </div>

            <div style={{ 
              border: '1px solid #dee2e6', 
              borderRadius: '8px', 
              padding: '20px', 
              marginBottom: '20px',
              background: '#fff'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                marginBottom: '20px',
                paddingBottom: '10px',
                borderBottom: '1px solid #dee2e6'
              }}>
                <h5 style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
                  📊 GHG Emissions Intensity Ratios
                  <InfoIcon title="Report emissions intensity ratios for different scopes and organization-specific metrics." />
                </h5>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ 
                  width: '100%', 
                  borderCollapse: 'collapse',
                  fontSize: '12px',
                  marginBottom: '10px'
                }}>
                  <thead>
                    <tr style={{ background: '#f8f9fa' }}>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'center', 
                        fontWeight: 'bold',
                        minWidth: '150px'
                      }}>
                        Scope(s) of GHG emissions
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'center', 
                        fontWeight: 'bold',
                        minWidth: '120px'
                      }}>
                        Emissions (tCO₂e)
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'center', 
                        fontWeight: 'bold',
                        minWidth: '150px'
                      }}>
                        Organization-specific Metric
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'center', 
                        fontWeight: 'bold',
                        minWidth: '100px'
                      }}>
                        Metric Value
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'center', 
                        fontWeight: 'bold',
                        minWidth: '120px'
                      }}>
                        Intensity Ratio
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'center', 
                        fontWeight: 'bold',
                        minWidth: '100px'
                      }}>
                        Unit
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {['Scope 1', 'Scope 2 (location-based)', 'Scope 2 (market-based)', 'Scope 3', 'Total (Scope 1 + 2)', 'Total (Scope 1 + 2 + 3)'].map((scope, index) => (
                      <tr key={scope} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                        <td style={{ 
                          border: '1px solid #dee2e6', 
                          padding: '8px',
                          fontWeight: 'bold',
                          textAlign: 'left'
                        }}>
                          {scope}
                        </td>
                        <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                          <input 
                            type="text"
                            className="form-input"
                            style={{ 
                              width: '100%', 
                              border: 'none',
                              background: 'transparent',
                              textAlign: 'center',
                              fontSize: '11px',
                              padding: '4px'
                            }}
                            placeholder="0"
                          />
                        </td>
                        <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                          <select 
                            className="form-input"
                            style={{ 
                              width: '100%', 
                              border: 'none',
                              background: 'transparent',
                              fontSize: '11px',
                              padding: '4px'
                            }}
                          >
                            <option value="">Select metric</option>
                            <option value="revenue">Revenue (USD)</option>
                            <option value="production">Production volume</option>
                            <option value="employees">Number of employees</option>
                            <option value="floor_area">Floor area (m²)</option>
                            <option value="units_sold">Units sold</option>
                            <option value="energy_consumed">Energy consumed</option>
                            <option value="other">Other (specify)</option>
                          </select>
                        </td>
                        <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                          <input 
                            type="text"
                            className="form-input"
                            style={{ 
                              width: '100%', 
                              border: 'none',
                              background: 'transparent',
                              textAlign: 'center',
                              fontSize: '11px',
                              padding: '4px'
                            }}
                            placeholder="0"
                          />
                        </td>
                        <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                          <input 
                            type="text"
                            className="form-input"
                            style={{ 
                              width: '100%', 
                              border: 'none',
                              background: 'transparent',
                              textAlign: 'center',
                              fontSize: '11px',
                              padding: '4px'
                            }}
                            placeholder="0.00"
                          />
                        </td>
                        <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                          <input 
                            type="text"
                            className="form-input"
                            style={{ 
                              width: '100%', 
                              border: 'none',
                              background: 'transparent',
                              textAlign: 'center',
                              fontSize: '11px',
                              padding: '4px'
                            }}
                            placeholder="tCO₂e/unit"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ 
                fontSize: '12px', 
                color: '#666', 
                marginTop: '15px',
                padding: '10px',
                background: '#f8f9fa',
                borderRadius: '4px'
              }}>
                <p style={{ margin: '0 0 8px 0' }}>
                  <strong>Instructions:</strong> Calculate intensity ratios by dividing GHG emissions by organization-specific metrics.
                </p>
                <p style={{ margin: '0 0 8px 0' }}>
                  <strong>Organization-specific Metric:</strong> Choose metrics relevant to your industry (e.g., revenue, production volume, employees, floor area).
                </p>
                <p style={{ margin: 0 }}>
                  <strong>Intensity Ratio:</strong> Express as tCO₂e per unit of the chosen metric (e.g., tCO₂e/USD million, tCO₂e/employee).
                </p>
              </div>
            </div>
          </div>

          <div className="save-section">
            <a href="#" className="attachments-link">
              <span>📎</span>
              <span>Attachments</span>
            </a>
            <button type="button" className="save-btn">SAVE</button>
          </div>
        </div>

        {/* Disclosure 102-9: GHG removals in the value chain */}
        <div className="section-header">
          <div className="main-heading">
            7. GHG removals in the value chain
            <div className="info-icon" title="This disclosure aims to increase transparency regarding the organization's GHG removals.">i</div>
          </div>
        </div>

        <div className="question-section">
          {/* Requirement 7a */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">7a</div>
              <div className="sub-question-title">report the total Scope 1 GHG removals in metric tons of CO₂ equivalent, excluding any GHG trades, and a breakdown of this total by each storage pool</div>
              <div className="info-icon" title="102-9-a excludes any GHG trades. GHG trades occur, for example, when a removal activity in the organization's value chain is sold as a carbon credit.">i</div>
            </div>

            <div style={{ 
              border: '1px solid #dee2e6', 
              borderRadius: '8px', 
              padding: '20px', 
              marginBottom: '20px',
              background: '#fff'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                marginBottom: '20px',
                paddingBottom: '10px',
                borderBottom: '1px solid #dee2e6'
              }}>
                <h5 style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
                  🌱 GHG Removals in the Value Chain
                  <InfoIcon title="Report total GHG removals broken down by storage pools and removal methods." />
                </h5>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ 
                  width: '100%', 
                  borderCollapse: 'collapse',
                  fontSize: '12px',
                  marginBottom: '10px'
                }}>
                  <thead>
                    <tr style={{ background: '#f8f9fa' }}>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'center', 
                        fontWeight: 'bold',
                        minWidth: '150px'
                      }}>
                        Storage Pool / Removal Method
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'center', 
                        fontWeight: 'bold',
                        minWidth: '120px'
                      }}>
                        GHG Removals (tCO₂e)
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'center', 
                        fontWeight: 'bold',
                        minWidth: '150px'
                      }}>
                        Location/Project Description
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'center', 
                        fontWeight: 'bold',
                        minWidth: '120px'
                      }}>
                        Verification Status
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'center', 
                        fontWeight: 'bold',
                        minWidth: '100px'
                      }}>
                        Monitoring Period
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'center', 
                        fontWeight: 'bold',
                        minWidth: '120px'
                      }}>
                        Permanence Period
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      'Forest and land use',
                      'Soil carbon',
                      'Biomass carbon',
                      'Geological storage',
                      'Direct air capture and storage (DACS)',
                      'Bioenergy with carbon capture and storage (BECCS)',
                      'Enhanced weathering',
                      'Blue carbon (marine ecosystems)',
                      'Other (specify)'
                    ].map((pool, index) => (
                      <tr key={pool} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                        <td style={{ 
                          border: '1px solid #dee2e6', 
                          padding: '8px',
                          fontWeight: 'bold',
                          textAlign: 'left'
                        }}>
                          {pool}
                        </td>
                        <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                          <input 
                            type="text"
                            className="form-input"
                            style={{ 
                              width: '100%', 
                              border: 'none',
                              background: 'transparent',
                              textAlign: 'center',
                              fontSize: '11px',
                              padding: '4px'
                            }}
                            placeholder="0"
                          />
                        </td>
                        <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                          <input 
                            type="text"
                            className="form-input"
                            style={{ 
                              width: '100%', 
                              border: 'none',
                              background: 'transparent',
                              textAlign: 'center',
                              fontSize: '11px',
                              padding: '4px'
                            }}
                            placeholder="Project location/description"
                          />
                        </td>
                        <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                          <select 
                            className="form-input"
                            style={{ 
                              width: '100%', 
                              border: 'none',
                              background: 'transparent',
                              fontSize: '11px',
                              padding: '4px'
                            }}
                          >
                            <option value="">Select status</option>
                            <option value="verified">Third-party verified</option>
                            <option value="self_reported">Self-reported</option>
                            <option value="pending">Verification pending</option>
                            <option value="not_verified">Not verified</option>
                          </select>
                        </td>
                        <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                          <input 
                            type="text"
                            className="form-input"
                            style={{ 
                              width: '100%', 
                              border: 'none',
                              background: 'transparent',
                              textAlign: 'center',
                              fontSize: '11px',
                              padding: '4px'
                            }}
                            placeholder="Years"
                          />
                        </td>
                        <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                          <input 
                            type="text"
                            className="form-input"
                            style={{ 
                              width: '100%', 
                              border: 'none',
                              background: 'transparent',
                              textAlign: 'center',
                              fontSize: '11px',
                              padding: '4px'
                            }}
                            placeholder="Years"
                          />
                        </td>
                      </tr>
                    ))}
                    
                    {/* Total row */}
                    <tr style={{ backgroundColor: '#e8f5e8', fontWeight: 'bold' }}>
                      <td style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '8px',
                        fontWeight: 'bold',
                        textAlign: 'left'
                      }}>
                        Total Scope 1 GHG Removals
                      </td>
                      <td style={{ border: '1px solid #dee2e6', padding: '4px', backgroundColor: '#e8f5e8' }}>
                        <input 
                          type="text"
                          className="form-input"
                          style={{ 
                            width: '100%', 
                            border: 'none',
                            background: 'transparent',
                            textAlign: 'center',
                            fontSize: '11px',
                            padding: '4px',
                            fontWeight: 'bold'
                          }}
                          placeholder="Total"
                        />
                      </td>
                      <td style={{ border: '1px solid #dee2e6', padding: '4px', backgroundColor: '#e8f5e8' }}></td>
                      <td style={{ border: '1px solid #dee2e6', padding: '4px', backgroundColor: '#e8f5e8' }}></td>
                      <td style={{ border: '1px solid #dee2e6', padding: '4px', backgroundColor: '#e8f5e8' }}></td>
                      <td style={{ border: '1px solid #dee2e6', padding: '4px', backgroundColor: '#e8f5e8' }}></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ 
                fontSize: '12px', 
                color: '#666', 
                marginTop: '15px',
                padding: '10px',
                background: '#f8f9fa',
                borderRadius: '4px'
              }}>
                <p style={{ margin: '0 0 8px 0' }}>
                  <strong>Instructions:</strong> Report GHG removals by storage pool excluding any GHG trades (e.g., carbon credits sold).
                </p>
                <p style={{ margin: '0 0 8px 0' }}>
                  <strong>Storage Pools:</strong> Include all relevant carbon storage mechanisms (forest, soil, geological, technological).
                </p>
                <p style={{ margin: 0 }}>
                  <strong>Verification:</strong> Indicate the verification status and permanence period for each removal method.
                </p>
              </div>
            </div>
          </div>

          <div className="save-section">
            <a href="#" className="attachments-link">
              <span>📎</span>
              <span>Attachments</span>
            </a>
            <button type="button" className="save-btn">SAVE</button>
          </div>
        </div>

        {/* Disclosure 102-10: Carbon credits */}
        <div className="section-header">
          <div className="main-heading">
            8. Carbon credits
            <div className="info-icon" title="This disclosure aims to increase transparency about the carbon credits canceled and their characteristics, including their purpose, quality, and the impacts associated with the underlying carbon credit projects.">i</div>
          </div>
        </div>

        <div className="question-section">
          {/* Requirement 8a */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">8a</div>
              <div className="sub-question-title">report the total amount of carbon credits canceled in metric tons of CO₂ equivalent and a breakdown of this total by removal or reduction projects</div>
              <div className="info-icon" title="A carbon credit is canceled when permanently removed from circulation in a registry account.">i</div>
            </div>

            <div style={{ 
              border: '1px solid #dee2e6', 
              borderRadius: '8px', 
              padding: '20px', 
              marginBottom: '20px',
              background: '#fff'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                marginBottom: '20px',
                paddingBottom: '10px',
                borderBottom: '1px solid #dee2e6'
              }}>
                <h5 style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
                  💳 Carbon Credits Canceled
                  <InfoIcon title="Report carbon credits canceled with detailed characteristics and project information." />
                </h5>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ 
                  width: '100%', 
                  borderCollapse: 'collapse',
                  fontSize: '12px',
                  marginBottom: '10px'
                }}>
                  <thead>
                    <tr style={{ background: '#f8f9fa' }}>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'center', 
                        fontWeight: 'bold',
                        minWidth: '150px'
                      }}>
                        Project Type
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'center', 
                        fontWeight: 'bold',
                        minWidth: '120px'
                      }}>
                        Credits Canceled (tCO₂e)
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'center', 
                        fontWeight: 'bold',
                        minWidth: '120px'
                      }}>
                        Registry/Standard
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'center', 
                        fontWeight: 'bold',
                        minWidth: '120px'
                      }}>
                        Vintage Year
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'center', 
                        fontWeight: 'bold',
                        minWidth: '100px'
                      }}>
                        Purpose
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'center', 
                        fontWeight: 'bold',
                        minWidth: '150px'
                      }}>
                        Project Location
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'center', 
                        fontWeight: 'bold',
                        minWidth: '120px'
                      }}>
                        Third-party Verification
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {['Renewable energy projects', 'Forest conservation (REDD+)', 'Afforestation/Reforestation', 'Soil carbon sequestration', 'Methane capture and destruction', 'Direct air capture and storage', 'Industrial emissions reduction', 'Energy efficiency projects', 'Clean cookstoves', 'Other reduction projects', 'Other removal projects'].map((projectType, index) => (
                      <tr key={projectType} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                        <td style={{ border: '1px solid #dee2e6', padding: '8px', fontWeight: 'bold', textAlign: 'left' }}>{projectType}</td>
                        <td style={{ border: '1px solid #dee2e6', padding: '4px' }}><input type="text" className="form-input" style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center', fontSize: '11px', padding: '4px' }} placeholder="0" /></td>
                        <td style={{ border: '1px solid #dee2e6', padding: '4px' }}><select className="form-input" style={{ width: '100%', border: 'none', background: 'transparent', fontSize: '11px', padding: '4px' }}><option value="">Select registry</option><option value="vcs">VCS (Verra)</option><option value="gold_standard">Gold Standard</option><option value="car">Climate Action Reserve</option><option value="cdm">CDM</option><option value="ji">Joint Implementation</option><option value="regional">Regional registry</option><option value="other">Other</option></select></td>
                        <td style={{ border: '1px solid #dee2e6', padding: '4px' }}><input type="text" className="form-input" style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center', fontSize: '11px', padding: '4px' }} placeholder="YYYY" /></td>
                        <td style={{ border: '1px solid #dee2e6', padding: '4px' }}><select className="form-input" style={{ width: '100%', border: 'none', background: 'transparent', fontSize: '11px', padding: '4px' }}><option value="">Select purpose</option><option value="offsetting">Offsetting</option><option value="compensation">Compensation</option><option value="neutrality">Neutrality claims</option><option value="voluntary">Voluntary action</option><option value="compliance">Compliance</option><option value="other">Other</option></select></td>
                        <td style={{ border: '1px solid #dee2e6', padding: '4px' }}><input type="text" className="form-input" style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center', fontSize: '11px', padding: '4px' }} placeholder="Country/Region" /></td>
                        <td style={{ border: '1px solid #dee2e6', padding: '4px' }}><select className="form-input" style={{ width: '100%', border: 'none', background: 'transparent', fontSize: '11px', padding: '4px' }}><option value="">Select status</option><option value="verified">Verified</option><option value="not_verified">Not verified</option><option value="pending">Verification pending</option></select></td>
                      </tr>
                    ))}
                    
                    {/* Total row */}
                    <tr style={{ backgroundColor: '#fff3e0', fontWeight: 'bold' }}>
                      <td style={{ border: '1px solid #dee2e6', padding: '8px', fontWeight: 'bold', textAlign: 'left' }}>Total Carbon Credits Canceled</td>
                      <td style={{ border: '1px solid #dee2e6', padding: '4px', backgroundColor: '#fff3e0' }}><input type="text" className="form-input" style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center', fontSize: '11px', padding: '4px', fontWeight: 'bold' }} placeholder="Total" /></td>
                      <td style={{ border: '1px solid #dee2e6', padding: '4px', backgroundColor: '#fff3e0' }}></td>
                      <td style={{ border: '1px solid #dee2e6', padding: '4px', backgroundColor: '#fff3e0' }}></td>
                      <td style={{ border: '1px solid #dee2e6', padding: '4px', backgroundColor: '#fff3e0' }}></td>
                      <td style={{ border: '1px solid #dee2e6', padding: '4px', backgroundColor: '#fff3e0' }}></td>
                      <td style={{ border: '1px solid #dee2e6', padding: '4px', backgroundColor: '#fff3e0' }}></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ 
                fontSize: '12px', 
                color: '#666', 
                marginTop: '15px',
                padding: '10px',
                background: '#f8f9fa',
                borderRadius: '4px'
              }}>
                <p style={{ margin: '0 0 8px 0' }}>
                  <strong>Instructions:</strong> Report all carbon credits canceled (permanently removed from circulation) during the reporting period.
                </p>
                <p style={{ margin: '0 0 8px 0' }}>
                  <strong>Project Types:</strong> Distinguish between removal projects (sequestration) and reduction projects (emission avoidance).
                </p>
                <p style={{ margin: 0 }}>
                  <strong>Quality Indicators:</strong> Include vintage year, registry/standard, verification status, and project location for transparency.
                </p>
              </div>
            </div>
          </div>

          {/* Requirement 8b */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">8b</div>
              <div className="sub-question-title">describe the impacts on people and the environment from projects where carbon credits are purchased and how the organization continuously monitors and evaluates them</div>
              <div className="info-icon" title="This requirement covers impacts on people and the environment from carbon credit projects purchased in the reporting period, whether canceled or not.">i</div>
            </div>
            <textarea className="form-textarea" rows={6}></textarea>
          </div>

          <div className="save-section">
            <a href="#" className="attachments-link">
              <span>📎</span>
              <span>Attachments</span>
            </a>
            <button type="button" className="save-btn">SAVE</button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default GRI102Climate;
