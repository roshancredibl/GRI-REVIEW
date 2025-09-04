import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const [revisionPolicy, setRevisionPolicy] = useState('');
  const [changesSinceLastPeriod, setChangesSinceLastPeriod] = useState('');
  const [scienceAlignment, setScienceAlignment] = useState('');
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

  const handleBackClick = () => {
    navigate('/topic-standards-2025/environmental');
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
                  <InfoIcon title="Report total expenditure on implementing the transition plan" />
                </h5>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Total Expenditure</label>
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
                <div className="form-group">
                  <label className="form-label">% of Overall Budget</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    value={budgetPercentage}
                    onChange={(e) => setBudgetPercentage(e.target.value)}
                    placeholder="0" 
                    min="0" 
                    max="100" 
                    step="0.1"
                  />
                </div>
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
              <div className="sub-question-title">Business strategy integration</div>
              <div className="info-icon" title="The organization should report: whether and how the responsibility to manage climate change-related impacts is linked to performance assessments or incentive mechanisms.">i</div>
            </div>
            <textarea className="form-textarea" rows={4}></textarea>
          </div>

          {/* Requirement 1c */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">1c</div>
              <div className="sub-question-title">Targets to achieve the transition plan</div>
              <div className="info-icon" title="When reporting progress toward the targets, the organization should describe known barriers to target achievement and, if applicable, the role of locked-in GHG emissions.">i</div>
            </div>

            {/* Sub-question 1c i */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">i</div>
                <div className="sub-question-title">GHG emissions reduction targets</div>
                <div className="info-icon" title="GHG emissions reduction targets reported under Disclosure 102-4.">i</div>
              </div>
              <textarea className="form-textarea" rows={3}></textarea>
            </div>

            {/* Sub-question 1c ii */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">ii</div>
                <div className="sub-question-title">Fossil fuel phase-out targets</div>
                <div className="info-icon" title="Targets to phase out fossil fuels can include: renewable energy procurement targets; targets to phase out fossil fuel-based materials.">i</div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Phase-out targets</label>
                  <textarea className="form-textarea" rows={2}></textarea>
                </div>
                <div className="form-group">
                  <label className="form-label">Base year</label>
                  <input type="text" className="form-input" />
                </div>
              </div>
              <textarea className="form-textarea" rows={2} placeholder="Standards, methodologies, and assumptions"></textarea>
            </div>

            {/* Sub-question 1c iii */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">iii</div>
                <div className="sub-question-title">Other climate change mitigation targets</div>
                <div className="info-icon" title="Other climate change mitigation targets include any business, operational, engagement, and governance targets used to drive and monitor the progress of its transition plan.">i</div>
              </div>
              <textarea className="form-textarea" rows={4}></textarea>
            </div>
          </div>

          {/* Requirement 1d */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">1d</div>
              <div className="sub-question-title">Just transition principles and stakeholder engagement</div>
              <div className="info-icon" title="According to the International Labour Organization (ILO), a just transition involves greening the economy in a way that is as fair and inclusive as possible to everyone concerned.">i</div>
            </div>
            <textarea className="form-textarea" rows={4}></textarea>
          </div>

          {/* Requirement 1e */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">1e</div>
              <div className="sub-question-title">Impacts on people and environment</div>
              <div className="info-icon" title="Requirements 3-3-a and 3-3-d in GRI 3: Material Topics 2021 describe the organization's impacts and actions taken to manage them.">i</div>
            </div>

            {/* Sub-question 1e i */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">i</div>
                <div className="sub-question-title">Workers, local communities, and Indigenous Peoples</div>
                <div className="info-icon" title="An example of impacts on workers from implementing a transition plan is the termination of jobs following the reduction or phase-out of economic activities that produce high levels of GHG emissions.">i</div>
              </div>
              <textarea className="form-textarea" rows={3}></textarea>
            </div>

            {/* Sub-question 1e ii */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">ii</div>
                <div className="sub-question-title">Biodiversity impacts</div>
                <div className="info-icon" title="Actions to mitigate climate change can have positive impacts on biodiversity. For example, building offshore wind farms to transition to wind energy can act as refuges for fish and marine mammals.">i</div>
              </div>
              <textarea className="form-textarea" rows={3}></textarea>
            </div>
          </div>

          {/* Requirement 1f */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">1f</div>
              <div className="sub-question-title">Public policy activities consistency</div>
              <div className="info-icon" title="The organization should report: its stance on significant issues related to the transition plan, for example, phasing out fossil fuels, that are the focus of its participation in public policy development and lobbying.">i</div>
            </div>
            <textarea className="form-textarea" rows={4}></textarea>
          </div>

          {/* Requirement 1g */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">1g</div>
              <div className="sub-question-title">Absence of transition plan</div>
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
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">2a</div>
              <div className="sub-question-title">describe the impacts on people and the environment associated with its climate change-related risks and opportunities and how they were considered in the development of the adaptation plan</div>
              <div className="info-icon" title="Climate change-related risks can be classified as physical or transition risks.">i</div>
            </div>
            <textarea className="form-textarea" rows={4}></textarea>
          </div>

          {/* Requirement 2b */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">2b</div>
              <div className="sub-question-title">describe its adaptation plan, including</div>
              <div className="info-icon" title="Climate change mitigation and adaptation strategies are interconnected, with potential for synergies.">i</div>
            </div>

            {/* Sub-requirement 2b i */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">i</div>
                <div className="sub-question-title">policies and actions to adapt to climate change</div>
                <div className="info-icon" title="Actions to adapt to climate change may include working with suppliers to reduce reliance on depleting resources and climate-proofing new facilities.">i</div>
              </div>
              <textarea className="form-textarea" rows={3}></textarea>
            </div>

            {/* Sub-requirement 2b ii */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">ii</div>
                <div className="sub-question-title">the source of the climate change-related scenarios used, the temperature projection included in the scenarios, and the methodologies and assumptions used to develop the adaptation plan</div>
                <div className="info-icon" title="The climate change scenario analysis informs the development of the adaptation plan.">i</div>
              </div>
              <textarea className="form-textarea" rows={3}></textarea>
            </div>

            {/* Sub-requirement 2b iii */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">iii</div>
                <div className="sub-question-title">the total expenditure incurred by the implementation of the adaptation plan as monetary value and percentage of the total expenditure incurred in the reporting period</div>
                <div className="info-icon" title="The percentage of the total expenditure incurred by the implementation of the adaptation plan is calculated using the following formula: % = (Adaptation plan related expenditure / Total expenditure) × 100.">i</div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Monetary value</label>
                  <input type="text" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Percentage of total expenditure</label>
                  <input type="text" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Currency</label>
                  <select className="form-select">
                    <option>Select Currency</option>
                    <option>USD</option>
                    <option>EUR</option>
                    <option>GBP</option>
                    <option>JPY</option>
                    <option>INR</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Sub-requirement 2b iv */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">iv</div>
                <div className="sub-question-title">the governance bodies or individual roles responsible for overseeing and implementing the adaptation plan and their responsibilities</div>
                <div className="info-icon" title="The organization should report whether: the highest governance body is responsible for overseeing the adaptation plan and what this includes.">i</div>
              </div>
              <textarea className="form-textarea" rows={3}></textarea>
            </div>

            {/* Sub-requirement 2b v */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">v</div>
                <div className="sub-question-title">the targets to achieve the adaptation plan and progress toward them</div>
                <div className="info-icon" title="Targets to achieve the adaptation plan can include the number of sites assessed for physical risks, the number of sites for which adaptation plans are developed and implemented.">i</div>
              </div>
              <textarea className="form-textarea" rows={3}></textarea>
            </div>

            {/* Sub-requirement 2b vi */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">vi</div>
                <div className="sub-question-title">Just transition principles and stakeholder engagement</div>
                <div className="info-icon" title="The organization should report: how it identifies stakeholders, including whether it has performed a social impact assessment.">i</div>
              </div>
              <textarea className="form-textarea" rows={3}></textarea>
            </div>
          </div>

          {/* Requirement 2c */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">2c</div>
              <div className="sub-question-title">describe the impacts on people and the environment from implementing the adaptation plan and the actions taken to manage them, including for</div>
              <div className="info-icon" title="If an adaptation plan is well managed, it can translate into positive impacts such as economic development and the creation of decent work opportunities.">i</div>
            </div>

            {/* Sub-requirement 2c i */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">i</div>
                <div className="sub-question-title">workers, local communities, and Indigenous Peoples</div>
                <div className="info-icon" title="Examples of actions taken to manage impacts on workers, local communities, and Indigenous Peoples from implementing an adaptation plan are: supporting the adoption of formal conditions of work.">i</div>
              </div>
              <textarea className="form-textarea" rows={3}></textarea>
            </div>

            {/* Sub-requirement 2c ii */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">ii</div>
                <div className="sub-question-title">biodiversity</div>
                <div className="info-icon" title="Actions to adapt to climate change can have positive impacts on biodiversity. For example, planting mangroves can contribute to climate change adaptation by controlling floods and protecting biodiversity.">i</div>
              </div>
              <textarea className="form-textarea" rows={3}></textarea>
            </div>
          </div>

          {/* Requirement 2d */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">2d</div>
              <div className="sub-question-title">explain, in the absence of an adaptation plan, why it does not exist, and describe the steps being taken to develop it and the expected time frame</div>
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
              <div className="sub-question-title">report the total number of new employees recruited and a breakdown of this total by</div>
              <div className="info-icon" title="As a result of the organization's transition or adaptation efforts, workers may be recruited due to the development of new low-carbon-intensive products, services, and sites.">i</div>
            </div>

            {/* Sub-requirement 3a i */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">i</div>
                <div className="sub-question-title">gender</div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Male</label>
                  <input type="number" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Female</label>
                  <input type="number" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Other</label>
                  <input type="number" className="form-input" />
                </div>
              </div>
            </div>

            {/* Sub-requirement 3a ii */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">ii</div>
                <div className="sub-question-title">employee type</div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Full-time</label>
                  <input type="number" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Part-time</label>
                  <input type="number" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Contract</label>
                  <input type="number" className="form-input" />
                </div>
              </div>
            </div>
          </div>

          {/* Requirement 3b */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">3b</div>
              <div className="sub-question-title">report the total number of employees whose work was terminated and a breakdown of this total by</div>
              <div className="info-icon" title="Termination refers to the cessation of work initiated by the organization.">i</div>
            </div>

            {/* Sub-requirement 3b i */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">i</div>
                <div className="sub-question-title">gender</div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Male</label>
                  <input type="number" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Female</label>
                  <input type="number" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Other</label>
                  <input type="number" className="form-input" />
                </div>
              </div>
            </div>

            {/* Sub-requirement 3b ii */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">ii</div>
                <div className="sub-question-title">employee type</div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Full-time</label>
                  <input type="number" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Part-time</label>
                  <input type="number" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Contract</label>
                  <input type="number" className="form-input" />
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

        {/* Disclosure 102-5: Scope 1 GHG emissions */}
        <div className="section-header">
          <div className="main-heading">
            5. Scope 1 GHG emissions
            <div className="info-icon" title="Gross Scope 1 GHG emissions include those from energy consumption as reported under 103-2-a in GRI 103: Energy 2025.">i</div>
          </div>
        </div>

        <div className="question-section">
          {/* Requirement 5a */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">5a</div>
              <div className="sub-question-title">report gross Scope 1 GHG emissions in metric tons of CO₂ equivalent, and in the calculation</div>
              <div className="info-icon" title="Gross Scope 1 GHG emissions include the seven gases the Kyoto Protocol covers.">i</div>
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

        {/* Disclosure 102-6: Scope 2 GHG emissions */}
        <div className="section-header">
          <div className="main-heading">
            6. Scope 2 GHG emissions
            <div className="info-icon" title="There are two methods to calculate gross Scope 2 GHG emissions: A location-based method and a market-based method.">i</div>
          </div>
        </div>

        <div className="question-section">
          {/* Requirement 6a */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">6a</div>
              <div className="sub-question-title">report gross location-based and, if applicable, market-based Scope 2 GHG emissions in metric tons of CO₂ equivalent</div>
              <div className="info-icon" title="There are two methods to calculate gross Scope 2 GHG emissions: A location-based method, which reflects the average GHG emissions intensity of grids.">i</div>
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

        {/* Disclosure 102-7: Scope 3 GHG emissions */}
        <div className="section-header">
          <div className="main-heading">
            7. Scope 3 GHG emissions
            <div className="info-icon" title="The gross Scope 3 GHG emissions include GHG emissions for each of the following 15 upstream and downstream categories from the GHG Protocol Corporate Value Chain (Scope 3) Accounting and Reporting Standard.">i</div>
          </div>
        </div>

        <div className="question-section">
          {/* Requirement 7a */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">7a</div>
              <div className="sub-question-title">report gross Scope 3 GHG emissions in metric tons of CO₂ equivalent, and in the calculation</div>
              <div className="info-icon" title="The gross Scope 3 GHG emissions include GHG emissions for each of the following 15 upstream and downstream categories.">i</div>
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

        {/* Disclosure 102-8: GHG emissions intensity */}
        <div className="section-header">
          <div className="main-heading">
            8. GHG emissions intensity
            <div className="info-icon" title="GHG emissions intensity ratios are obtained by dividing the organization's gross GHG emissions (the numerator) by an organization-specific metric (the denominator).">i</div>
          </div>
        </div>

        <div className="question-section">
          {/* Requirement 8a */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">8a</div>
              <div className="sub-question-title">report GHG emissions intensity ratio(s), including the gross GHG emissions in metric tons of CO₂ equivalent (the numerator) and the organization-specific metric (the denominator) chosen to calculate the ratio(s)</div>
              <div className="info-icon" title="Examples of GHG emissions intensity ratios can include: [amount of] gross Scope 1 GHG emissions in metric tons of CO₂ equivalent.">i</div>
            </div>
            <textarea className="form-textarea" rows={6}></textarea>
          </div>

          {/* Requirement 8b */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">8b</div>
              <div className="sub-question-title">report the scope(s) of GHG emissions included in the intensity ratio(s), whether Scope 1, Scope 2, or Scope 3</div>
              <div className="info-icon" title="The organization can report GHG emissions intensity ratio(s) for Scope 1, Scope 2, or Scope 3 separately or combined for Scope 1 and Scope 2.">i</div>
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

        {/* Disclosure 102-9: GHG removals in the value chain */}
        <div className="section-header">
          <div className="main-heading">
            9. GHG removals in the value chain
            <div className="info-icon" title="This disclosure aims to increase transparency regarding the organization's GHG removals.">i</div>
          </div>
        </div>

        <div className="question-section">
          {/* Requirement 9a */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">9a</div>
              <div className="sub-question-title">report the total Scope 1 GHG removals in metric tons of CO₂ equivalent, excluding any GHG trades, and a breakdown of this total by each storage pool</div>
              <div className="info-icon" title="102-9-a excludes any GHG trades. GHG trades occur, for example, when a removal activity in the organization's value chain is sold as a carbon credit.">i</div>
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

        {/* Disclosure 102-10: Carbon credits */}
        <div className="section-header">
          <div className="main-heading">
            10. Carbon credits
            <div className="info-icon" title="This disclosure aims to increase transparency about the carbon credits canceled and their characteristics, including their purpose, quality, and the impacts associated with the underlying carbon credit projects.">i</div>
          </div>
        </div>

        <div className="question-section">
          {/* Requirement 10a */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">10a</div>
              <div className="sub-question-title">report the total amount of carbon credits canceled in metric tons of CO₂ equivalent and a breakdown of this total by removal or reduction projects</div>
              <div className="info-icon" title="A carbon credit is canceled when permanently removed from circulation in a registry account.">i</div>
            </div>
            <textarea className="form-textarea" rows={6}></textarea>
          </div>

          {/* Requirement 10b through 10e would be added here */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">10e</div>
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
