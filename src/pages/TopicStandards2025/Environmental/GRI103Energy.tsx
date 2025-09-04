import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InfoIcon from '../../../components/InfoIcon';

// Interface for energy targets
interface EnergyTarget {
  id: string;
  timeHorizon: 'Short-term' | 'Medium-term' | 'Long-term' | '';
  targetDescription: string;
  targetType: string;
  baselineYear: string;
  targetYear: string;
  progressStatus: string;
}

interface ContractualInstrument {
  id: string;
  instrumentType: string;
  amount: string;
  percentage: string;
  energySource: string;
}

interface ConversionFactor {
  id: string;
  factorType: string;
  value: string;
  source: string;
}

interface EnergyActivity {
  id: string;
  name: string;
  description: string;
}

interface EnergySource {
  id: string;
  name: string;
  type: 'renewable' | 'non-renewable' | '';
  description: string;
}

const GRI103Energy: React.FC = () => {
  const navigate = useNavigate();

  // State for energy targets dynamic table
  const [energyTargets, setEnergyTargets] = useState<EnergyTarget[]>([]);

  // State for policy coverage
  const [policyCoverage, setPolicyCoverage] = useState<string[]>([]);

  // State for stakeholder identification
  const [stakeholderTypes, setStakeholderTypes] = useState<string[]>([]);

  // State for question 1-b impacts
  const [impactTypes, setImpactTypes] = useState<string[]>([]);
  const [areaOfImpact, setAreaOfImpact] = useState<string[]>([]);

  // State for question 2e contractual instruments
  const [useContractualInstruments, setUseContractualInstruments] = useState<boolean>(false);
  const [contractualInstrumentTypes, setContractualInstrumentTypes] = useState<string[]>([]);
  const [contractualInstruments, setContractualInstruments] = useState<ContractualInstrument[]>([]);
  const [sellInstruments, setSellInstruments] = useState<boolean>(false);

  // State for question 2f conversion factors
  const [conversionFactors, setConversionFactors] = useState<ConversionFactor[]>([]);

  // State for dynamic energy activities
  const [energyActivities, setEnergyActivities] = useState<EnergyActivity[]>([
    { id: 'activity-1', name: 'Manufacturing Operations', description: 'Primary production activities including machinery and equipment operation' },
    { id: 'activity-2', name: 'Transportation & Logistics', description: 'Vehicle fleet operations and goods transportation' },
    { id: 'activity-3', name: 'Facility Operations', description: 'Building heating, cooling, lighting, and general facility management' }
  ]);

  // State for dynamic energy sources
  const [energySources, setEnergySources] = useState<EnergySource[]>([
    { id: 'source-1', name: 'Solar PV', type: 'renewable', description: 'Solar photovoltaic electricity generation' },
    { id: 'source-2', name: 'Wind Power', type: 'renewable', description: 'Wind turbine electricity generation' },
    { id: 'source-3', name: 'Natural Gas', type: 'non-renewable', description: 'Natural gas-fired electricity generation' }
  ]);

  // Energy targets management functions
  const addEnergyTarget = () => {
    const newTarget: EnergyTarget = {
      id: `target-${Date.now()}`,
      timeHorizon: '',
      targetDescription: '',
      targetType: '',
      baselineYear: '',
      targetYear: '',
      progressStatus: ''
    };
    setEnergyTargets([...energyTargets, newTarget]);
  };

  const removeEnergyTarget = (id: string) => {
    setEnergyTargets(energyTargets.filter(target => target.id !== id));
  };

  const updateEnergyTarget = (id: string, field: keyof EnergyTarget, value: string) => {
    setEnergyTargets(energyTargets.map(target =>
      target.id === id ? { ...target, [field]: value } : target
    ));
  };

  // Contractual instruments management functions
  const addContractualInstrument = () => {
    const newInstrument: ContractualInstrument = {
      id: `instrument-${Date.now()}`,
      instrumentType: '',
      amount: '',
      percentage: '',
      energySource: ''
    };
    setContractualInstruments([...contractualInstruments, newInstrument]);
  };

  const removeContractualInstrument = (id: string) => {
    setContractualInstruments(contractualInstruments.filter(instrument => instrument.id !== id));
  };

  const updateContractualInstrument = (id: string, field: keyof ContractualInstrument, value: string) => {
    setContractualInstruments(contractualInstruments.map(instrument =>
      instrument.id === id ? { ...instrument, [field]: value } : instrument
    ));
  };

  // Conversion factors management functions
  const addConversionFactor = () => {
    const newFactor: ConversionFactor = {
      id: `factor-${Date.now()}`,
      factorType: '',
      value: '',
      source: ''
    };
    setConversionFactors([...conversionFactors, newFactor]);
  };

  const removeConversionFactor = (id: string) => {
    setConversionFactors(conversionFactors.filter(factor => factor.id !== id));
  };

  const updateConversionFactor = (id: string, field: keyof ConversionFactor, value: string) => {
    setConversionFactors(conversionFactors.map(factor =>
      factor.id === id ? { ...factor, [field]: value } : factor
    ));
  };

  // Energy activities management functions
  const addEnergyActivity = () => {
    const newActivity: EnergyActivity = {
      id: `activity-${Date.now()}`,
      name: '',
      description: ''
    };
    setEnergyActivities([...energyActivities, newActivity]);
  };

  const removeEnergyActivity = (id: string) => {
    setEnergyActivities(energyActivities.filter(activity => activity.id !== id));
  };

  const updateEnergyActivity = (id: string, field: keyof EnergyActivity, value: string) => {
    setEnergyActivities(energyActivities.map(activity =>
      activity.id === id ? { ...activity, [field]: value } : activity
    ));
  };

  // Energy sources management functions
  const addEnergySource = () => {
    const newSource: EnergySource = {
      id: `source-${Date.now()}`,
      name: '',
      type: '',
      description: ''
    };
    setEnergySources([...energySources, newSource]);
  };

  const removeEnergySource = (id: string) => {
    setEnergySources(energySources.filter(source => source.id !== id));
  };

  const updateEnergySource = (id: string, field: keyof EnergySource, value: string) => {
    setEnergySources(energySources.map(source =>
      source.id === id ? { ...source, [field]: value } : source
    ));
  };

  // Policy coverage options
  const policyCoverageOptions = [
    'Energy efficiency initiatives',
    'Renewable energy procurement',
    'Supplier engagement on energy',
    'Just transition training',
    'Energy attribute certificates',
    'Energy management systems',
    'Green building standards',
    'Electric vehicle adoption',
    'Energy storage solutions',
    'Carbon pricing mechanisms'
  ];

  // Stakeholder type options
  const stakeholderOptions = [
    'Workers and trade unions',
    'Suppliers and vendors',
    'Local communities',
    'Regulatory authorities',
    'Industry associations',
    'NGOs and civil society',
    'Financial institutions',
    'Technology partners',
    'Customers and consumers',
    'Academic institutions'
  ];

  // Impact type options for question 1-b
  const impactTypeOptions = [
    'Economy',
    'Environment', 
    'People'
  ];

  // Area of impact options for question 1-b
  const areaOfImpactOptions = [
    'Self-generation facilities',
    'Purchased energy operations',
    'Suppliers and supply chain',
    'Workers and workforce',
    'Local communities',
    'Indigenous Peoples',
    'Natural ecosystems',
    'Water resources',
    'Air quality',
    'Land use and biodiversity',
    'Waste management',
    'Energy infrastructure'
  ];

  // Contractual instrument type options for question 2e
  const contractualInstrumentTypeOptions = [
    'Power Purchase Agreements (PPA)',
    'Renewable Energy Certificates (RECs)',
    'Energy Attribute Certificates (EACs)',
    'Green Tariffs',
    'Virtual Power Purchase Agreements (vPPA)',
    'Corporate PPAs',
    'Green bonds',
    'Guarantee of Origin (GO) certificates',
    'International REC (I-REC)',
    'Voluntary renewable energy certificates'
  ];

  // Energy source options for contractual instruments
  const energySourceOptions = [
    'Wind',
    'Solar photovoltaic',
    'Solar thermal',
    'Hydroelectric',
    'Geothermal',
    'Biomass',
    'Biogas',
    'Nuclear',
    'Natural gas',
    'Coal',
    'Oil',
    'Mixed/Grid average'
  ];

  const handleBackClick = () => {
    navigate('/topic-standards-2025/environmental');
  };

  return (
    <div className="page-container" id="gri-103-energy">
      <div className="page-header">
        <button type="button" className="back-btn" onClick={handleBackClick}>← Back</button>
        <div className="page-title">GRI 103: Energy 2025</div>
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
        
        {/* Complete GRI 103 Energy questionnaire content would go here */}
        <div className="section-header">
          <div className="main-heading">
            1. Energy policies and commitments
            <div className="info-icon" title="Energy policies and commitments are those that apply to the organization's activities and its upstream and downstream value chain.">i</div>
          </div>
        </div>

        <div className="question-section">
          <div className="requirements-header">
            <strong>The organization shall:</strong>
          </div>
          
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">1a</div>
              <div className="sub-question-title">describe how its energy-related policies and commitments contribute to energy consumption reduction, energy efficiency, and the transition to renewable energy sources;</div>
              <div className="info-icon" title="This requirement covers policies and commitments that apply to the organization's activities and its upstream and downstream value chain.">i</div>
            </div>

            <div style={{ 
              border: '1px solid #dee2e6', 
              borderRadius: '8px', 
              padding: '20px', 
              marginBottom: '20px',
              background: '#fff'
            }}>
              {/* Section 1: General Description of Policies */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#0066cc' }}>
                    📋 1. General Description of Energy Policies
                    <InfoIcon title="Describe how your energy-related policies and commitments contribute to reducing energy consumption, improving efficiency, and transitioning to renewables." onClick={() => {}} />
                  </h6>
                </div>
                <textarea 
                  className="form-textarea" 
                  rows={6}
                  style={{ width: '100%', marginBottom: '10px' }}
                  placeholder="Example: Our policies promote energy saving practices, renewable energy procurement, and supplier engagement for sustainable energy transitions..."
                ></textarea>
              </div>

              {/* Section 2: Policy Coverage */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#0066cc' }}>
                    ✅ 2. Policy Coverage Areas
                    <InfoIcon title="Select all areas covered by your energy-related policies and commitments." onClick={() => {}} />
                  </h6>
                </div>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                  gap: '12px',
                  marginBottom: '10px'
                }}>
                  {policyCoverageOptions.map((option) => (
                    <label key={option} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      padding: '8px',
                      borderRadius: '4px',
                      backgroundColor: policyCoverage.includes(option) ? '#e3f2fd' : '#f8f9fa',
                      border: `1px solid ${policyCoverage.includes(option) ? '#0066cc' : '#dee2e6'}`,
                      cursor: 'pointer'
                    }}>
                      <input 
                        type="checkbox"
                        checked={policyCoverage.includes(option)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setPolicyCoverage([...policyCoverage, option]);
                          } else {
                            setPolicyCoverage(policyCoverage.filter(item => item !== option));
                          }
                        }}
                        style={{ marginRight: '8px' }}
                      />
                      <span style={{ fontSize: '14px' }}>{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Section 3: Regulatory Alignment */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#0066cc' }}>
                    ⚖️ 3. Regulatory Alignment
                    <InfoIcon title="Describe how policies align with relevant country/industry energy regulations." onClick={() => {}} />
                  </h6>
                </div>
                <textarea 
                  className="form-textarea" 
                  rows={4}
                  style={{ width: '100%', marginBottom: '10px' }}
                  placeholder="Example: Aligned with EU Green Deal, India's National Solar Mission, and local building energy codes..."
                ></textarea>
              </div>

              {/* Section 4: Scientific Alignment */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#0066cc' }}>
                    🌡️ 4. Scientific Alignment (1.5°C Pathway)
                    <InfoIcon title="Explain how policies and commitments align with limiting global warming to 1.5°C." onClick={() => {}} />
                  </h6>
                </div>
                <textarea 
                  className="form-textarea" 
                  rows={4}
                  style={{ width: '100%', marginBottom: '10px' }}
                  placeholder="Example: Our targets align with IPCC 1.5°C pathways and Science Based Targets methodology..."
                ></textarea>
              </div>

              {/* Section 5: Energy Targets Overview */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#0066cc' }}>
                    🎯 5. Energy Targets Overview
                    <InfoIcon title="List short-, medium-, and long-term energy targets covering consumption, efficiency, and renewables." onClick={() => {}} />
                  </h6>
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                  <button 
                    onClick={addEnergyTarget}
                    style={{
                      backgroundColor: '#0066cc',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    + Add Energy Target
                  </button>
                </div>

                {energyTargets.length === 0 ? (
                  <div style={{
                    padding: '20px',
                    textAlign: 'center',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '6px',
                    border: '1px dashed #dee2e6',
                    color: '#666'
                  }}>
                    No energy targets added yet. Click "Add Energy Target" to get started.
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ 
                      width: '100%', 
                      borderCollapse: 'collapse',
                      fontSize: '12px',
                      marginBottom: '10px'
                    }}>
                      <thead>
                        <tr style={{ background: '#f8f9fa' }}>
                          <th style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '120px' }}>Time Horizon</th>
                          <th style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '200px' }}>Target Description</th>
                          <th style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '150px' }}>Type of Target</th>
                          <th style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '100px' }}>Baseline Year</th>
                          <th style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '100px' }}>Target Year</th>
                          <th style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '150px' }}>Progress Status/Notes</th>
                          <th style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '80px' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {energyTargets.map((target, index) => (
                          <tr key={target.id} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                            <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                              <select 
                                value={target.timeHorizon}
                                onChange={(e) => updateEnergyTarget(target.id, 'timeHorizon', e.target.value)}
                                style={{ width: '100%', border: 'none', background: 'transparent', fontSize: '11px', padding: '4px' }}
                              >
                                <option value="">Select</option>
                                <option value="Short-term">Short-term</option>
                                <option value="Medium-term">Medium-term</option>
                                <option value="Long-term">Long-term</option>
                              </select>
                            </td>
                            <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                              <textarea 
                                value={target.targetDescription}
                                onChange={(e) => updateEnergyTarget(target.id, 'targetDescription', e.target.value)}
                                style={{ width: '100%', border: 'none', background: 'transparent', fontSize: '11px', padding: '4px', minHeight: '40px', resize: 'vertical' }}
                                placeholder="Describe the target"
                              />
                            </td>
                            <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                              <input 
                                type="text"
                                value={target.targetType}
                                onChange={(e) => updateEnergyTarget(target.id, 'targetType', e.target.value)}
                                style={{ width: '100%', border: 'none', background: 'transparent', fontSize: '11px', padding: '4px' }}
                                placeholder="e.g., Consumption reduction"
                              />
                            </td>
                            <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                              <input 
                                type="text"
                                value={target.baselineYear}
                                onChange={(e) => updateEnergyTarget(target.id, 'baselineYear', e.target.value)}
                                style={{ width: '100%', border: 'none', background: 'transparent', fontSize: '11px', padding: '4px' }}
                                placeholder="YYYY"
                              />
                            </td>
                            <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                              <input 
                                type="text"
                                value={target.targetYear}
                                onChange={(e) => updateEnergyTarget(target.id, 'targetYear', e.target.value)}
                                style={{ width: '100%', border: 'none', background: 'transparent', fontSize: '11px', padding: '4px' }}
                                placeholder="YYYY"
                              />
                            </td>
                            <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                              <textarea 
                                value={target.progressStatus}
                                onChange={(e) => updateEnergyTarget(target.id, 'progressStatus', e.target.value)}
                                style={{ width: '100%', border: 'none', background: 'transparent', fontSize: '11px', padding: '4px', minHeight: '40px', resize: 'vertical' }}
                                placeholder="Progress notes"
                              />
                            </td>
                            <td style={{ border: '1px solid #dee2e6', padding: '4px', textAlign: 'center' }}>
                              <button 
                                onClick={() => removeEnergyTarget(target.id)}
                                style={{
                                  backgroundColor: '#dc3545',
                                  color: 'white',
                                  border: 'none',
                                  padding: '4px 8px',
                                  borderRadius: '3px',
                                  cursor: 'pointer',
                                  fontSize: '10px'
                                }}
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Section 6: Stakeholder Identification */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#0066cc' }}>
                    👥 6. Stakeholder Identification
                    <InfoIcon title="Describe processes for identifying key stakeholders related to energy policies." onClick={() => {}} />
                  </h6>
                </div>
                <textarea 
                  className="form-textarea" 
                  rows={4}
                  style={{ width: '100%', marginBottom: '15px' }}
                  placeholder="Example: Stakeholders identified through social impact assessments, supplier consultations, and community engagement..."
                ></textarea>
                
                <div style={{ marginBottom: '10px' }}>
                  <strong style={{ fontSize: '14px', color: '#495057' }}>Key Stakeholder Types (select all that apply):</strong>
                </div>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                  gap: '8px'
                }}>
                  {stakeholderOptions.map((option) => (
                    <label key={option} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      padding: '6px',
                      borderRadius: '4px',
                      backgroundColor: stakeholderTypes.includes(option) ? '#e8f5e8' : '#f8f9fa',
                      border: `1px solid ${stakeholderTypes.includes(option) ? '#28a745' : '#dee2e6'}`,
                      cursor: 'pointer',
                      fontSize: '13px'
                    }}>
                      <input 
                        type="checkbox"
                        checked={stakeholderTypes.includes(option)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setStakeholderTypes([...stakeholderTypes, option]);
                          } else {
                            setStakeholderTypes(stakeholderTypes.filter(item => item !== option));
                          }
                        }}
                        style={{ marginRight: '6px' }}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Section 7: Stakeholder Engagement */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#0066cc' }}>
                    🤝 7. Stakeholder Engagement
                    <InfoIcon title="Describe how engagement with stakeholders informs your energy policies." onClick={() => {}} />
                  </h6>
                </div>
                <textarea 
                  className="form-textarea" 
                  rows={4}
                  style={{ width: '100%', marginBottom: '10px' }}
                  placeholder="Example: Regular workshops with unions led to updated training programs, supplier surveys informed renewable procurement policies..."
                ></textarea>
              </div>

              {/* Section 8: Investments and Resources */}
              <div style={{ marginBottom: '15px' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#0066cc' }}>
                    💰 8. Investments and Resources
                    <InfoIcon title="Report investments allocated to energy reduction and renewable energy initiatives." onClick={() => {}} />
                  </h6>
                </div>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr 2fr', 
                  gap: '15px',
                  marginBottom: '15px'
                }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>Investment Amount:</label>
                    <input 
                      type="text"
                      className="form-input"
                      style={{ width: '100%', padding: '8px', fontSize: '14px' }}
                      placeholder="1,500,000"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>Currency:</label>
                    <select 
                      className="form-input"
                      style={{ width: '100%', padding: '8px', fontSize: '14px' }}
                    >
                      <option value="">Select currency</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                      <option value="INR">INR</option>
                      <option value="CNY">CNY</option>
                      <option value="JPY">JPY</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>Investment Description:</label>
                    <textarea 
                      className="form-textarea" 
                      rows={3}
                      style={{ width: '100%' }}
                      placeholder="Example: Investment of $1.5M in solar PV installations and energy efficiency upgrades in 2024..."
                    ></textarea>
                  </div>
                </div>
              </div>

              <div style={{ 
                fontSize: '12px', 
                color: '#666', 
                marginTop: '20px',
                padding: '15px',
                background: '#f8f9fa',
                borderRadius: '6px',
                border: '1px solid #dee2e6'
              }}>
                <p style={{ margin: '0 0 8px 0' }}>
                  <strong>Instructions:</strong> Complete all sections to provide a comprehensive overview of your energy-related policies and commitments.
                </p>
                <p style={{ margin: '0 0 8px 0' }}>
                  <strong>Targets:</strong> Include specific, measurable targets with clear timelines and progress indicators.
                </p>
                <p style={{ margin: 0 }}>
                  <strong>Stakeholder Engagement:</strong> Explain how stakeholder input has shaped your energy policies and implementation approach.
                </p>
              </div>
            </div>
          </div>

          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">1b</div>
              <div className="sub-question-title">describe the impacts on the economy, environment, and people that may result from its energy consumption and the transition to renewable energy sources.</div>
              <div className="info-icon" title="This requirement enables the organization to describe the impacts on the economy, environment, and people.">i</div>
            </div>

            <div style={{ 
              border: '1px solid #dee2e6', 
              borderRadius: '8px', 
              padding: '20px', 
              marginBottom: '20px',
              background: '#fff'
            }}>
              {/* Section 1: Impact Type */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#0066cc' }}>
                    🎯 1. Impact Category
                    <InfoIcon title="Select the category of impact from energy consumption and renewable transition." onClick={() => {}} />
                  </h6>
                </div>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
                  gap: '12px',
                  marginBottom: '10px'
                }}>
                  {impactTypeOptions.map((option) => (
                    <label key={option} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      padding: '12px',
                      borderRadius: '6px',
                      backgroundColor: impactTypes.includes(option) ? '#e3f2fd' : '#f8f9fa',
                      border: `2px solid ${impactTypes.includes(option) ? '#0066cc' : '#dee2e6'}`,
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}>
                      <input 
                        type="checkbox"
                        checked={impactTypes.includes(option)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setImpactTypes([...impactTypes, option]);
                          } else {
                            setImpactTypes(impactTypes.filter(item => item !== option));
                          }
                        }}
                        style={{ marginRight: '8px' }}
                      />
                      <span style={{ fontSize: '14px' }}>{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Section 2: Area of Impact */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#0066cc' }}>
                    🌍 2. Area of Impact
                    <InfoIcon title="Specify the affected area or stakeholder group from energy activities." onClick={() => {}} />
                  </h6>
                </div>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
                  gap: '10px',
                  marginBottom: '15px'
                }}>
                  {areaOfImpactOptions.map((option) => (
                    <label key={option} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      padding: '8px',
                      borderRadius: '4px',
                      backgroundColor: areaOfImpact.includes(option) ? '#f3e5f5' : '#f8f9fa',
                      border: `1px solid ${areaOfImpact.includes(option) ? '#6f42c1' : '#dee2e6'}`,
                      cursor: 'pointer'
                    }}>
                      <input 
                        type="checkbox"
                        checked={areaOfImpact.includes(option)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setAreaOfImpact([...areaOfImpact, option]);
                          } else {
                            setAreaOfImpact(areaOfImpact.filter(item => item !== option));
                          }
                        }}
                        style={{ marginRight: '8px' }}
                      />
                      <span style={{ fontSize: '13px' }}>{option}</span>
                    </label>
                  ))}
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>Other affected areas (specify):</label>
                  <input 
                    type="text"
                    className="form-input"
                    style={{ width: '100%', padding: '8px', fontSize: '14px' }}
                    placeholder="Specify any other affected areas or stakeholder groups..."
                  />
                </div>
              </div>

              {/* Section 3: Positive Impacts */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#28a745' }}>
                    ✅ 3. Positive Impacts
                    <InfoIcon title="Describe positive impacts on economy, environment, or people from energy activities." onClick={() => {}} />
                  </h6>
                </div>
                <textarea 
                  className="form-textarea" 
                  rows={5}
                  style={{ width: '100%', marginBottom: '10px' }}
                  placeholder="Example: Created 50 green jobs through solar installation; reduced CO2 emissions by 10%; improved air quality for local communities; skills training programs for workers transitioning from fossil fuel industries..."
                ></textarea>
              </div>

              {/* Section 4: Negative Impacts */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#dc3545' }}>
                    ⚠️ 4. Negative Impacts and Risks
                    <InfoIcon title="Describe negative impacts and risks from energy consumption and renewable transition." onClick={() => {}} />
                  </h6>
                </div>
                <textarea 
                  className="form-textarea" 
                  rows={5}
                  style={{ width: '100%', marginBottom: '10px' }}
                  placeholder="Example: Temporary job losses during coal plant transition; noise pollution from wind farms; land use conflicts with local communities; visual impact on landscapes; potential impact on bird migration routes..."
                ></textarea>
              </div>

              {/* Section 5: Management/Mitigation Actions */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#fd7e14' }}>
                    🛠️ 5. Management and Mitigation Actions
                    <InfoIcon title="Describe actions taken to manage or mitigate negative impacts from energy activities." onClick={() => {}} />
                  </h6>
                </div>
                <textarea 
                  className="form-textarea" 
                  rows={5}
                  style={{ width: '100%', marginBottom: '10px' }}
                  placeholder="Example: Supplier agreements enforce renewable sourcing requirements; bird deterrent systems installed on wind farms; just transition programs for displaced workers; community benefit funds established; regular environmental monitoring protocols..."
                ></textarea>
              </div>

              {/* Section 6: Stakeholder Engagement */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#17a2b8' }}>
                    🤝 6. Stakeholder Engagement
                    <InfoIcon title="Describe stakeholder groups engaged regarding these impacts and how their feedback influenced actions." onClick={() => {}} />
                  </h6>
                </div>
                <textarea 
                  className="form-textarea" 
                  rows={5}
                  style={{ width: '100%', marginBottom: '10px' }}
                  placeholder="Example: Held community consultations leading to revised land use plans; engaged trade unions in just transition planning; consulted Indigenous Peoples on renewable energy projects; supplier workshops on environmental requirements; regular meetings with environmental NGOs..."
                ></textarea>
              </div>

              {/* Section 7: Evidence/Documentation */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#6610f2' }}>
                    📄 7. Evidence and Documentation
                    <InfoIcon title="Upload supporting documentation such as impact studies or engagement reports." onClick={() => {}} />
                  </h6>
                </div>
                <div style={{ 
                  border: '2px dashed #dee2e6',
                  borderRadius: '6px',
                  padding: '20px',
                  textAlign: 'center',
                  backgroundColor: '#f8f9fa',
                  marginBottom: '15px'
                }}>
                  <div style={{ marginBottom: '10px', fontSize: '24px' }}>📎</div>
                  <input 
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                    style={{ marginBottom: '10px' }}
                  />
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    Upload impact studies, engagement reports, environmental assessments, or other supporting documents
                  </div>
                </div>
                <textarea 
                  className="form-textarea" 
                  rows={3}
                  style={{ width: '100%' }}
                  placeholder="Describe the uploaded documents and their relevance to the reported impacts..."
                ></textarea>
              </div>

              {/* Section 8: Additional Comments */}
              <div style={{ marginBottom: '15px' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#6c757d' }}>
                    💬 8. Additional Comments
                    <InfoIcon title="Any extra remarks or clarifications regarding impacts or management actions." onClick={() => {}} />
                  </h6>
                </div>
                <textarea 
                  className="form-textarea" 
                  rows={4}
                  style={{ width: '100%', marginBottom: '10px' }}
                  placeholder="Provide any additional context, future plans, lessons learned, or other relevant information regarding energy-related impacts..."
                ></textarea>
              </div>

              <div style={{ 
                fontSize: '12px', 
                color: '#666', 
                marginTop: '20px',
                padding: '15px',
                background: '#f8f9fa',
                borderRadius: '6px',
                border: '1px solid #dee2e6'
              }}>
                <p style={{ margin: '0 0 8px 0' }}>
                  <strong>Instructions:</strong> Complete all relevant sections to provide a comprehensive view of energy-related impacts on economy, environment, and people.
                </p>
                <p style={{ margin: '0 0 8px 0' }}>
                  <strong>Impact Assessment:</strong> Consider both direct and indirect impacts from current energy consumption and planned renewable energy transitions.
                </p>
                <p style={{ margin: 0 }}>
                  <strong>Stakeholder Focus:</strong> Ensure you address impacts on all relevant stakeholder groups including workers, communities, suppliers, and the environment.
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

        {/* Disclosure 103-2: Energy consumption and self-generation within the organization */}
        <div className="section-header">
          <div className="main-heading">
            2. Energy consumption and self-generation within the organization
            <div className="info-icon" title="Energy consumption and self-generation includes fuel consumption, purchased electricity, heating, cooling, and steam consumption, and self-generated renewable electricity, heating, cooling, and steam consumption within the organization, and self-generated electricity, heating, cooling, and steam sold by the organization.">i</div>
          </div>
        </div>
        
        <div className="question-section">
          <div className="requirements-header">
            <strong>The organization shall:</strong>
          </div>
          
          {/* Comprehensive Energy Consumption and Generation Tables (2a-2d) */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">2a-2c</div>
              <div className="sub-question-title">Energy Consumption within the Organization</div>
              <div className="info-icon" title="Report fuel consumption, purchased energy, and self-generated renewable energy consumption in joules, watt-hours, or multiples.">i</div>
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
                  ⚡ Energy Consumption within the Organization
                  <InfoIcon title="Report all energy consumption including fuel, purchased electricity/heating/cooling/steam, and self-generated renewable energy consumption." onClick={() => {}} />
                </h5>
              </div>

              {/* Activity Management Section */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#0066cc' }}>
                    🏭 Activity Management
                    <InfoIcon title="Define the activities where energy is consumed (e.g., manufacturing, transportation, facility operations)." onClick={() => {}} />
                  </h6>
                </div>

                <button 
                  onClick={addEnergyActivity}
                  style={{
                    backgroundColor: '#0066cc',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginBottom: '15px',
                    fontSize: '14px'
                  }}
                >
                  + Add Activity
                </button>

                {energyActivities.length === 0 ? (
                  <div style={{
                    padding: '20px',
                    textAlign: 'center',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '6px',
                    border: '1px dashed #dee2e6',
                    color: '#666'
                  }}>
                    No activities defined yet. Click "Add Activity" to get started.
                  </div>
                ) : (
                  <div style={{ display: 'grid', gap: '15px' }}>
                    {energyActivities.map((activity, index) => (
                      <div key={activity.id} style={{
                        padding: '15px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '6px',
                        border: '1px solid #dee2e6'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                          <span style={{ 
                            backgroundColor: '#0066cc', 
                            color: 'white', 
                            padding: '4px 8px', 
                            borderRadius: '50%', 
                            fontSize: '12px', 
                            fontWeight: 'bold',
                            minWidth: '24px',
                            textAlign: 'center',
                            marginRight: '10px'
                          }}>
                            {index + 1}
                          </span>
                          <input 
                            type="text"
                            value={activity.name}
                            onChange={(e) => updateEnergyActivity(activity.id, 'name', e.target.value)}
                            placeholder="Activity Name (e.g., Manufacturing Operations)"
                            style={{
                              flex: 1,
                              padding: '8px',
                              border: '1px solid #dee2e6',
                              borderRadius: '4px',
                              fontSize: '14px',
                              fontWeight: 'bold'
                            }}
                          />
                          <button 
                            onClick={() => removeEnergyActivity(activity.id)}
                            style={{
                              backgroundColor: '#dc3545',
                              color: 'white',
                              border: 'none',
                              padding: '6px 10px',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '12px',
                              marginLeft: '10px'
                            }}
                            title="Remove Activity"
                          >
                            ✕
                          </button>
                        </div>
                        <textarea 
                          value={activity.description}
                          onChange={(e) => updateEnergyActivity(activity.id, 'description', e.target.value)}
                          placeholder="Activity Description (e.g., Primary production activities including machinery and equipment operation)"
                          rows={2}
                          style={{
                            width: '100%',
                            padding: '8px',
                            border: '1px solid #dee2e6',
                            borderRadius: '4px',
                            fontSize: '13px',
                            resize: 'vertical'
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
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
                        textAlign: 'left', 
                        fontWeight: 'bold',
                        minWidth: '300px'
                      }}>
                        Category
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'center', 
                        fontWeight: 'bold',
                        minWidth: '150px'
                      }}>
                        Renewable Energy Source 1
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'center', 
                        fontWeight: 'bold',
                        minWidth: '150px'
                      }}>
                        Renewable Energy Source N
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'center', 
                        fontWeight: 'bold',
                        minWidth: '180px'
                      }}>
                        Non-renewable Energy Source 1
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'center', 
                        fontWeight: 'bold',
                        minWidth: '180px'
                      }}>
                        Non-renewable Energy Source N
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'center', 
                        fontWeight: 'bold',
                        minWidth: '120px'
                      }}>
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Fuel consumption (103-2-a) section */}
                    <tr style={{ backgroundColor: '#e3f2fd', fontWeight: 'bold' }}>
                      <td colSpan={6} style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '8px', 
                        textAlign: 'center',
                        backgroundColor: '#e3f2fd',
                        fontWeight: 'bold'
                      }}>
                        Fuel Consumption (103-2-a)
                      </td>
                    </tr>
                    {energyActivities.map((activity, index) => (
                      <tr key={`fuel-${activity.id}`} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                        <td style={{ border: '1px solid #dee2e6', padding: '8px', fontWeight: 'bold' }}>
                          Fuel consumption (103-2-a) - {activity.name || `Activity ${index + 1}`}
                        </td>
                        {Array.from({ length: 5 }, (_, cellIndex) => (
                          <td key={cellIndex} style={{ border: '1px solid #dee2e6', padding: '4px' }}>
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
                        ))}
                      </tr>
                    ))}
                    
                    {/* Fuel consumption total */}
                    <tr style={{ backgroundColor: '#bbdefb', fontWeight: 'bold' }}>
                      <td style={{ border: '1px solid #dee2e6', padding: '8px', fontWeight: 'bold' }}>
                        Fuel consumption (103-2-a) - Total
                      </td>
                      {Array.from({ length: 5 }, (_, cellIndex) => (
                        <td key={cellIndex} style={{ border: '1px solid #dee2e6', padding: '4px', backgroundColor: '#bbdefb' }}>
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
                      ))}
                    </tr>

                    {/* Purchased electricity consumption (103-2-b) section */}
                    <tr style={{ backgroundColor: '#f3e5f5', fontWeight: 'bold' }}>
                      <td colSpan={6} style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '8px', 
                        textAlign: 'center',
                        backgroundColor: '#f3e5f5',
                        fontWeight: 'bold'
                      }}>
                        Purchased Energy Consumption (103-2-b)
                      </td>
                    </tr>
                    {['Electricity', 'Heating', 'Cooling', 'Steam'].map((type, index) => (
                      <tr key={`purchased-${type}`} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                        <td style={{ border: '1px solid #dee2e6', padding: '8px', fontWeight: 'bold' }}>
                          Purchased {type.toLowerCase()} consumption (103-2-b) - {type}
                        </td>
                        {Array.from({ length: 5 }, (_, cellIndex) => (
                          <td key={cellIndex} style={{ border: '1px solid #dee2e6', padding: '4px' }}>
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
                        ))}
                      </tr>
                    ))}
                    
                    {/* Purchased consumption total */}
                    <tr style={{ backgroundColor: '#e1bee7', fontWeight: 'bold' }}>
                      <td style={{ border: '1px solid #dee2e6', padding: '8px', fontWeight: 'bold' }}>
                        Purchased electricity consumption (103-2-b) - Total
                      </td>
                      {Array.from({ length: 5 }, (_, cellIndex) => (
                        <td key={cellIndex} style={{ border: '1px solid #dee2e6', padding: '4px', backgroundColor: '#e1bee7' }}>
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
                      ))}
                    </tr>

                    {/* Self-generated renewable electricity consumption (103-2-c) section */}
                    <tr style={{ backgroundColor: '#e8f5e8', fontWeight: 'bold' }}>
                      <td colSpan={6} style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '8px', 
                        textAlign: 'center',
                        backgroundColor: '#e8f5e8',
                        fontWeight: 'bold'
                      }}>
                        Self-generated Renewable Energy Consumption (103-2-c)
                      </td>
                    </tr>
                    {['Electricity', 'Heating', 'Cooling', 'Steam'].flatMap(energyType => 
                      energyActivities.map((activity, activityIndex) => (
                        <tr key={`self-gen-${energyType}-${activity.id}`} style={{ backgroundColor: (energyActivities.length * ['Electricity', 'Heating', 'Cooling', 'Steam'].indexOf(energyType) + activityIndex) % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                          <td style={{ border: '1px solid #dee2e6', padding: '8px', fontWeight: 'bold' }}>
                            Self-generated renewable {energyType.toLowerCase()} consumption (103-2-c) - {energyType} - {activity.name || `Activity ${activityIndex + 1}`}
                          </td>
                        {Array.from({ length: 5 }, (_, cellIndex) => (
                          <td key={cellIndex} style={{ border: '1px solid #dee2e6', padding: '4px' }}>
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
                        ))}
                      </tr>
                    ))
                    )}
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
                  <strong>Instructions:</strong> Report all energy consumption in joules, watt-hours, or multiples. Include breakdown by renewable and non-renewable sources.
                </p>
                <p style={{ margin: 0 }}>
                  <strong>Activities:</strong> Specify the main activities where fuel and self-generated energy are consumed (e.g., manufacturing, transportation, heating).
                </p>
              </div>
            </div>
          </div>

          {/* Energy Sold Table (2d) */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">2d</div>
              <div className="sub-question-title">Self-generated Energy Sold</div>
              <div className="info-icon" title="Report self-generated electricity, heating, cooling, and steam sold in joules, watt-hours, or multiples.">i</div>
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
                  💰 Self-generated Energy Sold
                  <InfoIcon title="Report energy sold including renewable and non-renewable sources with breakdown by type." onClick={() => {}} />
                </h5>
              </div>

              {/* Energy Source Management Section */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#fd7e14' }}>
                    ⚡ Energy Source Management
                    <InfoIcon title="Define the energy sources for reporting sold energy (e.g., Solar PV, Wind Power, Natural Gas)." onClick={() => {}} />
                  </h6>
                </div>

                <button 
                  onClick={addEnergySource}
                  style={{
                    backgroundColor: '#fd7e14',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginBottom: '15px',
                    fontSize: '14px'
                  }}
                >
                  + Add Energy Source
                </button>

                {energySources.length === 0 ? (
                  <div style={{
                    padding: '20px',
                    textAlign: 'center',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '6px',
                    border: '1px dashed #dee2e6',
                    color: '#666'
                  }}>
                    No energy sources defined yet. Click "Add Energy Source" to get started.
                  </div>
                ) : (
                  <div style={{ display: 'grid', gap: '15px' }}>
                    {energySources.map((source, index) => (
                      <div key={source.id} style={{
                        padding: '15px',
                        backgroundColor: '#fff3e0',
                        borderRadius: '6px',
                        border: '1px solid #fd7e14'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                          <span style={{ 
                            backgroundColor: '#fd7e14', 
                            color: 'white', 
                            padding: '4px 8px', 
                            borderRadius: '50%', 
                            fontSize: '12px', 
                            fontWeight: 'bold',
                            minWidth: '24px',
                            textAlign: 'center',
                            marginRight: '10px'
                          }}>
                            {index + 1}
                          </span>
                          <input 
                            type="text"
                            value={source.name}
                            onChange={(e) => updateEnergySource(source.id, 'name', e.target.value)}
                            placeholder="Energy Source Name (e.g., Solar PV)"
                            style={{
                              flex: 1,
                              padding: '8px',
                              border: '1px solid #dee2e6',
                              borderRadius: '4px',
                              fontSize: '14px',
                              fontWeight: 'bold',
                              marginRight: '10px'
                            }}
                          />
                          <select
                            value={source.type}
                            onChange={(e) => updateEnergySource(source.id, 'type', e.target.value)}
                            style={{
                              padding: '8px',
                              border: '1px solid #dee2e6',
                              borderRadius: '4px',
                              fontSize: '14px',
                              minWidth: '150px',
                              marginRight: '10px'
                            }}
                          >
                            <option value="">Select Type</option>
                            <option value="renewable">Renewable</option>
                            <option value="non-renewable">Non-renewable</option>
                          </select>
                          <button 
                            onClick={() => removeEnergySource(source.id)}
                            style={{
                              backgroundColor: '#dc3545',
                              color: 'white',
                              border: 'none',
                              padding: '6px 10px',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                            title="Remove Energy Source"
                          >
                            ✕
                          </button>
                        </div>
                        <textarea 
                          value={source.description}
                          onChange={(e) => updateEnergySource(source.id, 'description', e.target.value)}
                          placeholder="Energy Source Description (e.g., Solar photovoltaic electricity generation)"
                          rows={2}
                          style={{
                            width: '100%',
                            padding: '8px',
                            border: '1px solid #dee2e6',
                            borderRadius: '4px',
                            fontSize: '13px',
                            resize: 'vertical'
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
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
                        textAlign: 'left', 
                        fontWeight: 'bold',
                        minWidth: '300px'
                      }}>
                        Category
                      </th>
                      {energySources.map((source) => (
                        <th key={source.id} style={{ 
                          border: '1px solid #dee2e6', 
                          padding: '12px', 
                          textAlign: 'center', 
                          fontWeight: 'bold',
                          minWidth: '150px',
                          backgroundColor: source.type === 'renewable' ? '#e8f5e8' : source.type === 'non-renewable' ? '#ffe8e8' : '#f8f9fa'
                        }}>
                          {source.name || `Source ${energySources.indexOf(source) + 1}`}
                          <br/>
                          <span style={{ fontSize: '10px', fontWeight: 'normal', fontStyle: 'italic' }}>
                            {source.type ? `(${source.type})` : '(undefined)'}
                          </span>
                        </th>
                      ))}
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'center', 
                        fontWeight: 'bold',
                        minWidth: '120px'
                      }}>
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {['Electricity', 'Heating', 'Cooling', 'Steam'].map((type, index) => (
                      <tr key={`sold-${type}`} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                        <td style={{ border: '1px solid #dee2e6', padding: '8px', fontWeight: 'bold' }}>
                          Self-generated {type.toLowerCase()} sold (103-2-d) - {type}
                        </td>
                        {energySources.map((source) => (
                          <td key={source.id} style={{ border: '1px solid #dee2e6', padding: '4px' }}>
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
                        ))}
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
                              padding: '4px',
                              fontWeight: 'bold'
                            }}
                            placeholder="Total"
                          />
                        </td>
                      </tr>
                    ))}
                    
                    {/* Total row */}
                    <tr style={{ backgroundColor: '#fff3e0', fontWeight: 'bold' }}>
                      <td style={{ border: '1px solid #dee2e6', padding: '8px', fontWeight: 'bold' }}>
                        Self-generated electricity sold (103-2-d) - Total
                      </td>
                      {energySources.map((source) => (
                        <td key={source.id} style={{ border: '1px solid #dee2e6', padding: '4px', backgroundColor: '#fff3e0' }}>
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
                      ))}
                      <td style={{ border: '1px solid #dee2e6', padding: '4px', backgroundColor: '#fff3e0' }}>
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
                          placeholder="Grand Total"
                        />
                      </td>
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
                  <strong>Instructions:</strong> Report all self-generated energy sold in joules, watt-hours, or multiples.
                </p>
                <p style={{ margin: 0 }}>
                  <strong>Note:</strong> When selling self-generated renewable electricity, report whether any linked contractual instruments were sold.
                </p>
              </div>
            </div>
          </div>

          {/* Comprehensive Contractual Instruments & Energy Data Methodologies (2e) */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">2e</div>
              <div className="sub-question-title">Contractual Instruments for Purchased Energy</div>
              <div className="info-icon" title="Report contractual instruments used for purchased energy and describe quality criteria adherence.">i</div>
            </div>

            <div style={{ 
              border: '1px solid #dee2e6', 
              borderRadius: '8px', 
              padding: '20px', 
              marginBottom: '20px',
              background: '#fff'
            }}>
              {/* Section 1: Use of Contractual Instruments */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#0066cc' }}>
                    📋 1. Use of Contractual Instruments
                    <InfoIcon title="Does your organization use contractual instruments to disclose purchased electricity, heating, cooling, steam?" onClick={() => {}} />
                  </h6>
                </div>
                <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      checked={useContractualInstruments === true}
                      onChange={() => setUseContractualInstruments(true)}
                      style={{ marginRight: '8px' }}
                    />
                    <span style={{ fontWeight: 'bold', color: '#28a745' }}>Yes</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      checked={useContractualInstruments === false}
                      onChange={() => setUseContractualInstruments(false)}
                      style={{ marginRight: '8px' }}
                    />
                    <span style={{ fontWeight: 'bold', color: '#dc3545' }}>No</span>
                  </label>
                </div>
              </div>

              {useContractualInstruments && (
                <>
                  {/* Section 2: Types of Contractual Instruments Used */}
                  <div style={{ marginBottom: '25px' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '15px',
                      paddingBottom: '8px',
                      borderBottom: '1px solid #dee2e6'
                    }}>
                      <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#6f42c1' }}>
                        ⚡ 2. Types of Contractual Instruments Used
                        <InfoIcon title="Select all types of contractual instruments used by your organization." onClick={() => {}} />
                      </h6>
                    </div>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                      gap: '10px',
                      marginBottom: '15px'
                    }}>
                      {contractualInstrumentTypeOptions.map((option) => (
                        <label key={option} style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '8px',
                          borderRadius: '4px',
                          backgroundColor: contractualInstrumentTypes.includes(option) ? '#f3e5f5' : '#f8f9fa',
                          border: `1px solid ${contractualInstrumentTypes.includes(option) ? '#6f42c1' : '#dee2e6'}`,
                          cursor: 'pointer'
                        }}>
                          <input
                            type="checkbox"
                            checked={contractualInstrumentTypes.includes(option)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setContractualInstrumentTypes([...contractualInstrumentTypes, option]);
                              } else {
                                setContractualInstrumentTypes(contractualInstrumentTypes.filter(item => item !== option));
                              }
                            }}
                            style={{ marginRight: '8px' }}
                          />
                          <span style={{ fontSize: '13px' }}>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Section 3: Breakdown of Purchased Electricity Covered */}
                  <div style={{ marginBottom: '25px' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '15px',
                      paddingBottom: '8px',
                      borderBottom: '1px solid #dee2e6'
                    }}>
                      <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#17a2b8' }}>
                        📊 3. Breakdown of Purchased Electricity Covered
                        <InfoIcon title="Enter amount and percentage of purchased electricity covered by each instrument." onClick={() => {}} />
                      </h6>
                    </div>

                    <button 
                      onClick={addContractualInstrument}
                      style={{
                        backgroundColor: '#17a2b8',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginBottom: '15px',
                        fontSize: '14px'
                      }}
                    >
                      + Add Contractual Instrument
                    </button>

                    {contractualInstruments.length === 0 ? (
                      <div style={{
                        padding: '20px',
                        textAlign: 'center',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '6px',
                        border: '1px dashed #dee2e6',
                        color: '#666'
                      }}>
                        No contractual instruments added yet. Click "Add Contractual Instrument" to get started.
                      </div>
                    ) : (
                      <div style={{ overflowX: 'auto' }}>
                        <table style={{ 
                          width: '100%', 
                          borderCollapse: 'collapse',
                          fontSize: '12px',
                          marginBottom: '10px'
                        }}>
                          <thead>
                            <tr style={{ background: '#f8f9fa' }}>
                              <th style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '200px' }}>Instrument Type</th>
                              <th style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '150px' }}>Amount (MWh or GJ)</th>
                              <th style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '120px' }}>Percentage (%)</th>
                              <th style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '150px' }}>Associated Energy Source</th>
                              <th style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '80px' }}>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {contractualInstruments.map((instrument, index) => (
                              <tr key={instrument.id} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                                <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                                  <select 
                                    value={instrument.instrumentType}
                                    onChange={(e) => updateContractualInstrument(instrument.id, 'instrumentType', e.target.value)}
                                    style={{ width: '100%', border: 'none', background: 'transparent', fontSize: '11px', padding: '4px' }}
                                  >
                                    <option value="">Select instrument type</option>
                                    {contractualInstrumentTypeOptions.map(option => (
                                      <option key={option} value={option}>{option}</option>
                                    ))}
                                  </select>
                                </td>
                                <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                                  <input 
                                    type="text"
                                    value={instrument.amount}
                                    onChange={(e) => updateContractualInstrument(instrument.id, 'amount', e.target.value)}
                                    style={{ width: '100%', border: 'none', background: 'transparent', fontSize: '11px', padding: '4px' }}
                                    placeholder="e.g., 1,000,000"
                                  />
                                </td>
                                <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                                  <input 
                                    type="text"
                                    value={instrument.percentage}
                                    onChange={(e) => updateContractualInstrument(instrument.id, 'percentage', e.target.value)}
                                    style={{ width: '100%', border: 'none', background: 'transparent', fontSize: '11px', padding: '4px' }}
                                    placeholder="e.g., 40"
                                  />
                                </td>
                                <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                                  <select 
                                    value={instrument.energySource}
                                    onChange={(e) => updateContractualInstrument(instrument.id, 'energySource', e.target.value)}
                                    style={{ width: '100%', border: 'none', background: 'transparent', fontSize: '11px', padding: '4px' }}
                                  >
                                    <option value="">Select energy source</option>
                                    {energySourceOptions.map(option => (
                                      <option key={option} value={option}>{option}</option>
                                    ))}
                                  </select>
                                </td>
                                <td style={{ border: '1px solid #dee2e6', padding: '4px', textAlign: 'center' }}>
                                  <button 
                                    onClick={() => removeContractualInstrument(instrument.id)}
                                    style={{
                                      backgroundColor: '#dc3545',
                                      color: 'white',
                                      border: 'none',
                                      padding: '4px 8px',
                                      borderRadius: '3px',
                                      cursor: 'pointer',
                                      fontSize: '10px'
                                    }}
                                  >
                                    Remove
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  {/* Section 4: Quality Criteria and Verification */}
                  <div style={{ marginBottom: '25px' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '15px',
                      paddingBottom: '8px',
                      borderBottom: '1px solid #dee2e6'
                    }}>
                      <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#28a745' }}>
                        ✅ 4. Quality Criteria and Verification
                        <InfoIcon title="Describe how adherence to quality criteria for accuracy and consistency is ensured." onClick={() => {}} />
                      </h6>
                    </div>
                    <textarea
                      className="form-textarea"
                      rows={4}
                      style={{ width: '100%', marginBottom: '10px' }}
                      placeholder="Example: Instruments matched hourly and from same grid region to ensure temporal and geographical alignment. All certificates verified through registry platforms..."
                    ></textarea>
                  </div>

                  {/* Section 5: Temporal and Physical Connection */}
                  <div style={{ marginBottom: '25px' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '15px',
                      paddingBottom: '8px',
                      borderBottom: '1px solid #dee2e6'
                    }}>
                      <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#fd7e14' }}>
                        🔗 5. Temporal and Physical Connection
                        <InfoIcon title="Explain how the temporal (timing) and physical (source location) connection between instruments and consumption is made." onClick={() => {}} />
                      </h6>
                    </div>
                    <textarea
                      className="form-textarea"
                      rows={4}
                      style={{ width: '100%', marginBottom: '10px' }}
                      placeholder="Example: Purchased from local utility grid matching consumption periods. Certificates sourced from same bidding zone/market region to ensure physical connection..."
                    ></textarea>
                  </div>

                  {/* Section 6: Sale or Transfer of Contractual Instruments */}
                  <div style={{ marginBottom: '25px' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '15px',
                      paddingBottom: '8px',
                      borderBottom: '1px solid #dee2e6'
                    }}>
                      <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#dc3545' }}>
                        💰 6. Sale or Transfer of Contractual Instruments
                        <InfoIcon title="Report if your organization sells or transfers contractual instruments linked to self-generated renewable electricity." onClick={() => {}} />
                      </h6>
                    </div>
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          checked={sellInstruments === true}
                          onChange={() => setSellInstruments(true)}
                          style={{ marginRight: '8px' }}
                        />
                        <span style={{ fontWeight: 'bold', color: '#28a745' }}>Yes</span>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          checked={sellInstruments === false}
                          onChange={() => setSellInstruments(false)}
                          style={{ marginRight: '8px' }}
                        />
                        <span style={{ fontWeight: 'bold', color: '#dc3545' }}>No</span>
                      </label>
                    </div>
                    {sellInstruments && (
                      <textarea
                        className="form-textarea"
                        rows={3}
                        style={{ width: '100%' }}
                        placeholder="Example: Sold RECs from 50 MW solar farm started 2023. Bundled certificates retained for corporate renewable energy reporting..."
                      ></textarea>
                    )}
                  </div>
                </>
              )}

              <div style={{
                fontSize: '12px',
                color: '#666',
                marginTop: '20px',
                padding: '15px',
                background: '#f8f9fa',
                borderRadius: '6px',
                border: '1px solid #dee2e6'
              }}>
                <p style={{ margin: '0 0 8px 0' }}>
                  <strong>Instructions:</strong> Complete all relevant sections to provide comprehensive information about contractual instruments used for purchased energy.
                </p>
                <p style={{ margin: '0 0 8px 0' }}>
                  <strong>Quality Criteria:</strong> Ensure contractual instruments convey GHG emission rate attributes and follow GHG Protocol Scope 2 Guidance.
                </p>
                <p style={{ margin: 0 }}>
                  <strong>Documentation:</strong> Maintain supporting documents and certificates for verification and audit purposes.
                </p>
              </div>
            </div>
          </div>

          {/* Standards and Methodologies (2f) */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">2f</div>
              <div className="sub-question-title">Standards, Methodologies & Conversion Factors</div>
              <div className="info-icon" title="Report standards, methodologies, assumptions, and calculation tools used for energy data compilation.">i</div>
            </div>

            <div style={{ 
              border: '1px solid #dee2e6', 
              borderRadius: '8px', 
              padding: '20px', 
              marginBottom: '20px',
              background: '#fff'
            }}>
              {/* Section 7: Standards and Methodologies Used */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#6610f2' }}>
                    📚 7. Standards and Methodologies Used
                    <InfoIcon title="Describe standards, methodologies, assumptions, and tools used in calculations." onClick={() => {}} />
                  </h6>
                </div>
                <textarea
                  className="form-textarea"
                  rows={5}
                  style={{ width: '100%', marginBottom: '10px' }}
                  placeholder="Example: Used IEA conversion factors and IPCC emission factors. GHG Protocol Scope 2 methodology applied for contractual instruments. Energy data compiled using internal metering systems cross-verified with utility bills..."
                ></textarea>
              </div>

              {/* Section 8: Conversion Factors Source */}
              <div style={{ marginBottom: '15px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#20c997' }}>
                    🔢 8. Conversion Factors Source
                    <InfoIcon title="List sources of emission and energy conversion factors used in calculations." onClick={() => {}} />
                  </h6>
                </div>

                <button 
                  onClick={addConversionFactor}
                  style={{
                    backgroundColor: '#20c997',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginBottom: '15px',
                    fontSize: '14px'
                  }}
                >
                  + Add Conversion Factor
                </button>

                {conversionFactors.length === 0 ? (
                  <div style={{
                    padding: '20px',
                    textAlign: 'center',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '6px',
                    border: '1px dashed #dee2e6',
                    color: '#666'
                  }}>
                    No conversion factors added yet. Click "Add Conversion Factor" to get started.
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ 
                      width: '100%', 
                      borderCollapse: 'collapse',
                      fontSize: '12px',
                      marginBottom: '10px'
                    }}>
                      <thead>
                        <tr style={{ background: '#f8f9fa' }}>
                          <th style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '200px' }}>Factor Type</th>
                          <th style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '150px' }}>Value</th>
                          <th style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '200px' }}>Source</th>
                          <th style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '80px' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {conversionFactors.map((factor, index) => (
                          <tr key={factor.id} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                            <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                              <input 
                                type="text"
                                value={factor.factorType}
                                onChange={(e) => updateConversionFactor(factor.id, 'factorType', e.target.value)}
                                style={{ width: '100%', border: 'none', background: 'transparent', fontSize: '11px', padding: '4px' }}
                                placeholder="e.g., CO2 emission factor for grid electricity"
                              />
                            </td>
                            <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                              <input 
                                type="text"
                                value={factor.value}
                                onChange={(e) => updateConversionFactor(factor.id, 'value', e.target.value)}
                                style={{ width: '100%', border: 'none', background: 'transparent', fontSize: '11px', padding: '4px' }}
                                placeholder="e.g., 0.4 tCO2/MWh"
                              />
                            </td>
                            <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                              <input 
                                type="text"
                                value={factor.source}
                                onChange={(e) => updateConversionFactor(factor.id, 'source', e.target.value)}
                                style={{ width: '100%', border: 'none', background: 'transparent', fontSize: '11px', padding: '4px' }}
                                placeholder="e.g., IEA 2024, IPCC Guidelines"
                              />
                            </td>
                            <td style={{ border: '1px solid #dee2e6', padding: '4px', textAlign: 'center' }}>
                              <button 
                                onClick={() => removeConversionFactor(factor.id)}
                                style={{
                                  backgroundColor: '#dc3545',
                                  color: 'white',
                                  border: 'none',
                                  padding: '4px 8px',
                                  borderRadius: '3px',
                                  cursor: 'pointer',
                                  fontSize: '10px'
                                }}
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div style={{
                fontSize: '12px',
                color: '#666',
                marginTop: '20px',
                padding: '15px',
                background: '#f8f9fa',
                borderRadius: '6px',
                border: '1px solid #dee2e6'
              }}>
                <p style={{ margin: '0 0 8px 0' }}>
                  <strong>Instructions:</strong> Provide comprehensive information about standards, methodologies, and conversion factors used for energy data compilation.
                </p>
                <p style={{ margin: '0 0 8px 0' }}>
                  <strong>Standards:</strong> Reference international standards like ISO 14001, GHG Protocol, IEA guidelines, or industry-specific standards.
                </p>
                <p style={{ margin: 0 }}>
                  <strong>Conversion Factors:</strong> Include source, vintage year, and rationale for factor selection. Document any local vs. global factors used.
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

        {/* Disclosure 103-3: Upstream and downstream energy consumption */}
        <div className="section-header">
          <div className="main-heading">
            3. Upstream and downstream energy consumption
            <div className="info-icon" title="Upstream and downstream energy consumption covers significant energy consumption in an organization's upstream and downstream value chain.">i</div>
          </div>
        </div>

        <div className="question-section">
          <div className="requirements-header">
            <strong>The organization shall:</strong>
          </div>
          
          {/* Requirement 3a */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">3a</div>
              <div className="sub-question-title">Value Chain Energy Consumption</div>
              <div className="info-icon" title="Report total significant energy consumption in upstream and downstream value chain in joules, watt-hours, or multiples.">i</div>
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
                  🔗 Value Chain Energy Consumption Categories
                  <InfoIcon title="Report energy consumption for significant upstream and downstream categories in your value chain." onClick={() => {}} />
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
                      <th style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '150px' }}>Category Type</th>
                      <th style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '250px' }}>Category Name</th>
                      <th style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '180px' }}>Energy Consumption</th>
                      <th style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '120px' }}>Unit</th>
                      <th style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '150px' }}>Energy Source<br/>(renewable/non-renewable)</th>
                      <th style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '200px' }}>Data Source / Estimation Method</th>
                      <th style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '150px' }}>Notes/Comments</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ backgroundColor: '#e3f2fd', fontWeight: 'bold' }}>
                      <td colSpan={6} style={{ border: '1px solid #dee2e6', padding: '8px', textAlign: 'center', backgroundColor: '#e3f2fd', fontWeight: 'bold' }}>
                        Upstream Categories
                      </td>
                    </tr>
                    {[
                      'Purchased goods and services',
                      'Capital goods', 
                      'Fuel- and energy-related activities',
                      'Upstream transportation and distribution',
                      'Waste generated in operations',
                      'Business travel',
                      'Employee commuting',
                      'Upstream leased assets'
                    ].map((category, index) => (
                      <tr key={`upstream-${category}`} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                        <td style={{ border: '1px solid #dee2e6', padding: '8px', fontWeight: 'bold', textAlign: 'center' }}>
                          Upstream Category
                        </td>
                        <td style={{ border: '1px solid #dee2e6', padding: '8px', fontWeight: 'bold' }}>
                          {category}
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
                            placeholder="Numeric input"
                          />
                        </td>
                        <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                          <select
                            style={{ 
                              width: '100%', 
                              border: 'none',
                              background: 'transparent',
                              fontSize: '11px',
                              padding: '4px'
                            }}
                          >
                            <option value="">Select Unit</option>
                            <option value="GJ">GJ (Gigajoules)</option>
                            <option value="MJ">MJ (Megajoules)</option>
                            <option value="MWh">MWh (Megawatt-hours)</option>
                            <option value="kWh">kWh (Kilowatt-hours)</option>
                            <option value="TJ">TJ (Terajoules)</option>
                            <option value="J">J (Joules)</option>
                            <option value="Wh">Wh (Watt-hours)</option>
                          </select>
                        </td>
                        <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                          <select
                            style={{ 
                              width: '100%', 
                              border: 'none',
                              background: 'transparent',
                              fontSize: '11px',
                              padding: '4px'
                            }}
                          >
                            <option value="">Select</option>
                            <option value="renewable">Renewable</option>
                            <option value="non-renewable">Non-renewable</option>
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
                              fontSize: '11px',
                              padding: '4px'
                            }}
                            placeholder="Text input"
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
                              fontSize: '11px',
                              padding: '4px'
                            }}
                            placeholder="Optional additional details"
                          />
                        </td>
                      </tr>
                    ))}

                    {/* Downstream Categories */}
                    <tr style={{ backgroundColor: '#f3e5f5', fontWeight: 'bold' }}>
                      <td colSpan={6} style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '8px', 
                        textAlign: 'center',
                        backgroundColor: '#f3e5f5',
                        fontWeight: 'bold'
                      }}>
                        Downstream Categories
                      </td>
                    </tr>
                    {[
                      'Downstream transportation and distribution',
                      'Processing of sold products',
                      'Use of sold products',
                      'End-of-life treatment of sold products',
                      'Downstream leased assets',
                      'Franchises',
                      'Investments'
                    ].map((category, index) => (
                      <tr key={`downstream-${category}`} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                        <td style={{ border: '1px solid #dee2e6', padding: '8px', fontWeight: 'bold', textAlign: 'center' }}>
                          Downstream Category
                        </td>
                        <td style={{ border: '1px solid #dee2e6', padding: '8px', fontWeight: 'bold' }}>
                          {category}
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
                            placeholder="Numeric input"
                          />
                        </td>
                        <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                          <select
                            style={{ 
                              width: '100%', 
                              border: 'none',
                              background: 'transparent',
                              fontSize: '11px',
                              padding: '4px'
                            }}
                          >
                            <option value="">Select Unit</option>
                            <option value="GJ">GJ (Gigajoules)</option>
                            <option value="MJ">MJ (Megajoules)</option>
                            <option value="MWh">MWh (Megawatt-hours)</option>
                            <option value="kWh">kWh (Kilowatt-hours)</option>
                            <option value="TJ">TJ (Terajoules)</option>
                            <option value="J">J (Joules)</option>
                            <option value="Wh">Wh (Watt-hours)</option>
                          </select>
                        </td>
                        <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                          <select
                            style={{ 
                              width: '100%', 
                              border: 'none',
                              background: 'transparent',
                              fontSize: '11px',
                              padding: '4px'
                            }}
                          >
                            <option value="">Select</option>
                            <option value="renewable">Renewable</option>
                            <option value="non-renewable">Non-renewable</option>
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
                              fontSize: '11px',
                              padding: '4px'
                            }}
                            placeholder="Text input"
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
                              fontSize: '11px',
                              padding: '4px'
                            }}
                            placeholder="Optional additional details"
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
                  <strong>Instructions:</strong> Report energy consumption in joules, watt-hours, or multiples for significant upstream and downstream categories.
                </p>
                <p style={{ margin: '0 0 8px 0' }}>
                  <strong>Category Selection:</strong> Focus on categories with the most significant energy consumption in your value chain.
                </p>
                <p style={{ margin: 0 }}>
                  <strong>Units:</strong> Ensure consistent units across all entries and specify the unit used (e.g., MWh, GJ, kWh).
                </p>
              </div>
            </div>
          </div>

          {/* Value Chain Standards and Methodologies (3b) */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">3b</div>
              <div className="sub-question-title">Value Chain Standards, Methodologies & Assumptions</div>
              <div className="info-icon" title="Report standards, methodologies, assumptions, and calculation tools used for value chain energy data compilation.">i</div>
            </div>

            <div style={{ 
              border: '1px solid #dee2e6', 
              borderRadius: '8px', 
              padding: '20px', 
              marginBottom: '20px',
              background: '#fff'
            }}>
              {/* Section 1: Standards and Methodologies Used */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#6610f2' }}>
                    📚 1. Standards and Methodologies Used
                    <InfoIcon title="Describe standards, methodologies, assumptions, and tools used for value chain energy calculations." onClick={() => {}} />
                  </h6>
                </div>
                <textarea
                  className="form-textarea"
                  rows={5}
                  style={{ width: '100%', marginBottom: '10px' }}
                  placeholder="Example: Used GHG Protocol Corporate Value Chain (Scope 3) Standard for categorization. Energy estimates based on spend-based and activity-based methods. EXIOBASE input-output model applied for purchased goods calculations..."
                ></textarea>
              </div>

              {/* Section 2: Conversion Factors Source */}
              <div style={{ marginBottom: '15px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#20c997' }}>
                    🔢 2. Conversion Factors & Data Sources
                    <InfoIcon title="List sources of energy and emission conversion factors used for value chain calculations." onClick={() => {}} />
                  </h6>
                </div>

                <button 
                  onClick={addConversionFactor}
                  style={{
                    backgroundColor: '#20c997',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginBottom: '15px',
                    fontSize: '14px'
                  }}
                >
                  + Add Conversion Factor
                </button>

                {conversionFactors.length === 0 ? (
                  <div style={{
                    padding: '20px',
                    textAlign: 'center',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '6px',
                    border: '1px dashed #dee2e6',
                    color: '#666'
                  }}>
                    No conversion factors added yet. Click "Add Conversion Factor" to get started.
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ 
                      width: '100%', 
                      borderCollapse: 'collapse',
                      fontSize: '12px',
                      marginBottom: '10px'
                    }}>
                      <thead>
                        <tr style={{ background: '#f8f9fa' }}>
                          <th style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '200px' }}>Factor Type</th>
                          <th style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '150px' }}>Value</th>
                          <th style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '200px' }}>Source</th>
                          <th style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '80px' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {conversionFactors.map((factor, index) => (
                          <tr key={factor.id} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                            <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                              <input 
                                type="text"
                                value={factor.factorType}
                                onChange={(e) => updateConversionFactor(factor.id, 'factorType', e.target.value)}
                                style={{ width: '100%', border: 'none', background: 'transparent', fontSize: '11px', padding: '4px' }}
                                placeholder="e.g., Energy intensity factor for purchased goods"
                              />
                            </td>
                            <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                              <input 
                                type="text"
                                value={factor.value}
                                onChange={(e) => updateConversionFactor(factor.id, 'value', e.target.value)}
                                style={{ width: '100%', border: 'none', background: 'transparent', fontSize: '11px', padding: '4px' }}
                                placeholder="e.g., 2.5 MJ/$"
                              />
                            </td>
                            <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                              <input 
                                type="text"
                                value={factor.source}
                                onChange={(e) => updateConversionFactor(factor.id, 'source', e.target.value)}
                                style={{ width: '100%', border: 'none', background: 'transparent', fontSize: '11px', padding: '4px' }}
                                placeholder="e.g., EXIOBASE 3.8, EPA 2024"
                              />
                            </td>
                            <td style={{ border: '1px solid #dee2e6', padding: '4px', textAlign: 'center' }}>
                              <button 
                                onClick={() => removeConversionFactor(factor.id)}
                                style={{
                                  backgroundColor: '#dc3545',
                                  color: 'white',
                                  border: 'none',
                                  padding: '4px 8px',
                                  borderRadius: '3px',
                                  cursor: 'pointer',
                                  fontSize: '10px'
                                }}
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div style={{
                fontSize: '12px',
                color: '#666',
                marginTop: '20px',
                padding: '15px',
                background: '#f8f9fa',
                borderRadius: '6px',
                border: '1px solid #dee2e6'
              }}>
                <p style={{ margin: '0 0 8px 0' }}>
                  <strong>Instructions:</strong> Provide comprehensive information about standards, methodologies, and conversion factors used for value chain energy data compilation.
                </p>
                <p style={{ margin: '0 0 8px 0' }}>
                  <strong>Value Chain Focus:</strong> Reference standards like GHG Protocol Scope 3, ISO 14064, or sector-specific guidelines for value chain reporting.
                </p>
                <p style={{ margin: 0 }}>
                  <strong>Data Quality:</strong> Document estimation methods, assumptions, and limitations for upstream and downstream energy calculations.
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

        {/* Disclosure 103-4: Energy intensity */}
        <div className="section-header">
          <div className="main-heading">
            4. Energy intensity
            <div className="info-icon" title="Energy intensity ratios are obtained by dividing the energy consumption (the numerator) by an organization-specific metric (the denominator).">i</div>
          </div>
        </div>

        <div className="question-section">
          <div className="requirements-header">
            <strong>The organization shall:</strong>
          </div>
          
          {/* Requirement 4a - Energy Intensity Ratios Table */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">4a</div>
              <div className="sub-question-title">Energy Intensity Ratios</div>
              <div className="info-icon" title="Report energy intensity ratio(s), including energy consumption (numerator) and organization-specific metric (denominator).">i</div>
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
                  📊 Energy Intensity Ratios
                  <InfoIcon title="Report energy intensity ratios showing energy consumption per organizational metric." onClick={() => {}} />
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
                        minWidth: '200px'
                      }}>
                        Energy consumption<br/>(joules, watt-hours, or multiples)
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'center', 
                        fontWeight: 'bold',
                        minWidth: '250px'
                      }}>
                        Scope(s) of energy consumption<br/>(within the organization, upstream and downstream in the value chain, or both)
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'center', 
                        fontWeight: 'bold',
                        minWidth: '200px'
                      }}>
                        Types of energy consumption<br/>(fuel, electricity, heating, cooling or steam)
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'center', 
                        fontWeight: 'bold',
                        minWidth: '200px'
                      }}>
                        Organization-specific metric
                      </th>
                      <th style={{ 
                        border: '1px solid #dee2e6', 
                        padding: '12px', 
                        textAlign: 'center', 
                        fontWeight: 'bold',
                        minWidth: '200px'
                      }}>
                        Energy intensity ratio
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5].map((row) => (
                      <tr key={row} style={{ backgroundColor: row % 2 === 0 ? '#f9f9f9' : '#fff' }}>
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
                            placeholder="e.g., 1,000,000 kWh"
                          />
                        </td>
                        <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                          <select
                            style={{ 
                              width: '100%', 
                              border: 'none',
                              background: 'transparent',
                              fontSize: '11px',
                              padding: '4px'
                            }}
                          >
                            <option value="">Select Scope</option>
                            <option value="within_org">Within the organization</option>
                            <option value="upstream">Upstream value chain</option>
                            <option value="downstream">Downstream value chain</option>
                            <option value="upstream_downstream">Upstream and downstream value chain</option>
                            <option value="org_upstream">Within organization and upstream</option>
                            <option value="org_downstream">Within organization and downstream</option>
                            <option value="all">All scopes</option>
                          </select>
                        </td>
                        <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                          <select
                            style={{ 
                              width: '100%', 
                              border: 'none',
                              background: 'transparent',
                              fontSize: '11px',
                              padding: '4px'
                            }}
                          >
                            <option value="">Select Type</option>
                            <option value="fuel">Fuel</option>
                            <option value="electricity">Electricity</option>
                            <option value="heating">Heating</option>
                            <option value="cooling">Cooling</option>
                            <option value="steam">Steam</option>
                            <option value="all_energy">All energy types</option>
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
                            placeholder="e.g., 100 FTE employees"
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
                            placeholder="e.g., 10,000 kWh per 100 FTE"
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
                  <strong>Instructions:</strong> Enter energy intensity ratios showing energy consumption (numerator) per organizational metric (denominator).
                </p>
                <p style={{ margin: '0 0 8px 0' }}>
                  <strong>Examples:</strong> 1,000,000 kWh (numerator) per 100 full-time equivalent employees (denominator) = 10,000 kWh per 100 FTE.
                </p>
                <p style={{ margin: 0 }}>
                  <strong>Scope:</strong> Clearly specify whether the energy consumption includes organizational boundaries, value chain, or both.
                </p>
              </div>
            </div>
          </div>

          {/* Comprehensive Energy Intensity Ratios (4b-4c) */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">4b-4c</div>
              <div className="sub-question-title">Energy Intensity Ratios - Detailed Analysis</div>
              <div className="info-icon" title="Comprehensive analysis of energy intensity ratios including scope, methodology, and organizational boundaries.">i</div>
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
                  📈 Energy Intensity Analysis & Methodology
                  <InfoIcon title="Detailed analysis of energy intensity ratios, scope, and calculation methodology." onClick={() => {}} />
                </h5>
              </div>

              {/* Section 1: Energy Consumption Scope */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#28a745' }}>
                    🌐 1. Energy Consumption Scope
                    <InfoIcon title="Select where energy consumption included in the ratio applies." onClick={() => {}} />
                  </h6>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
                  {[
                    { value: 'within_org', label: 'Within the Organization', desc: 'Direct operations and facilities under organizational control' },
                    { value: 'upstream', label: 'Upstream Value Chain', desc: 'Suppliers, procurement, and sourcing activities' },
                    { value: 'downstream', label: 'Downstream Value Chain', desc: 'Distribution, use of products, and end-of-life activities' },
                    { value: 'both', label: 'Both Value Chains', desc: 'Combined upstream and downstream activities' }
                  ].map((scope) => (
                    <label key={scope.value} style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      cursor: 'pointer', 
                      padding: '15px', 
                      border: '1px solid #dee2e6', 
                      borderRadius: '6px',
                      backgroundColor: '#f8f9fa'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                        <input type="checkbox" style={{ marginRight: '8px' }} />
                        <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{scope.label}</span>
                      </div>
                      <span style={{ fontSize: '12px', color: '#666', fontStyle: 'italic' }}>{scope.desc}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Section 2: Types of Energy Consumption */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#fd7e14' }}>
                    ⚡ 2. Types of Energy Consumption
                    <InfoIcon title="Select types of energy included in the intensity ratio calculations." onClick={() => {}} />
                  </h6>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
                  {[
                    'Fuel consumption',
                    'Electricity',
                    'Heating',
                    'Cooling',
                    'Steam',
                    'Compressed air',
                    'Other utilities'
                  ].map((energyType) => (
                    <label key={energyType} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '10px', border: '1px solid #dee2e6', borderRadius: '6px' }}>
                      <input type="checkbox" style={{ marginRight: '8px' }} />
                      <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{energyType}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Section 3: Energy Consumption Quantity */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#6f42c1' }}>
                    🔢 3. Energy Consumption Quantity
                    <InfoIcon title="Input total energy consumption (numerator) with unit selection." onClick={() => {}} />
                  </h6>
                </div>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '10px' }}>
                  <input
                    type="number"
                    className="form-input"
                    style={{ flex: 1, padding: '10px' }}
                    placeholder="1,000,000"
                  />
                  <select
                    style={{
                      padding: '10px',
                      border: '1px solid #dee2e6',
                      borderRadius: '4px',
                      minWidth: '150px'
                    }}
                  >
                    <option value="">Select Unit</option>
                    <option value="J">J (Joules)</option>
                    <option value="kJ">kJ (Kilojoules)</option>
                    <option value="MJ">MJ (Megajoules)</option>
                    <option value="GJ">GJ (Gigajoules)</option>
                    <option value="TJ">TJ (Terajoules)</option>
                    <option value="Wh">Wh (Watt-hours)</option>
                    <option value="kWh">kWh (Kilowatt-hours)</option>
                    <option value="MWh">MWh (Megawatt-hours)</option>
                    <option value="GWh">GWh (Gigawatt-hours)</option>
                  </select>
                </div>
              </div>

              {/* Section 4: Organization-Specific Metric */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#20c997' }}>
                    📏 4. Organization-Specific Metric
                    <InfoIcon title="Describe or select denominator (activity metric) used in the ratio." onClick={() => {}} />
                  </h6>
                </div>
                <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                  <select
                    style={{
                      flex: 1,
                      padding: '10px',
                      border: '1px solid #dee2e6',
                      borderRadius: '4px'
                    }}
                  >
                    <option value="">Select Common Metric</option>
                    <option value="fte_employees">Full-time equivalent employees</option>
                    <option value="headcount">Total headcount</option>
                    <option value="production_volume">Production volume</option>
                    <option value="revenue">Revenue</option>
                    <option value="floor_area">Floor area</option>
                    <option value="units_produced">Units produced</option>
                    <option value="hours_worked">Hours worked</option>
                    <option value="custom">Custom metric</option>
                  </select>
                </div>
                <textarea
                  className="form-textarea"
                  rows={3}
                  placeholder="Describe the specific metric used as denominator (e.g., Number of full-time equivalent employees across all operational sites)"
                  style={{ width: '100%' }}
                ></textarea>
              </div>

              {/* Section 5: Calculated Energy Intensity */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#dc3545' }}>
                    🧮 5. Calculated Energy Intensity
                    <InfoIcon title="Input energy intensity ratio (numerator / denominator)." onClick={() => {}} />
                  </h6>
                </div>
                <input
                  type="text"
                  className="form-input"
                  style={{ width: '100%', padding: '10px' }}
                  placeholder="e.g., 10,000 kWh per 100 FTE"
                />
              </div>

              {/* Section 6: Industry/Standard Alignment */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#17a2b8' }}>
                    📋 6. Industry/Standard Alignment
                    <InfoIcon title="Specify industry standards or recognized methodologies followed in calculating the ratio." onClick={() => {}} />
                  </h6>
                </div>
                <textarea
                  className="form-textarea"
                  rows={3}
                  placeholder="Specify any industry standards or recognized methodologies (e.g., ISO 50001 methodology, cement industry energy intensity standards, GRI guidelines)"
                  style={{ width: '100%' }}
                ></textarea>
              </div>

              {/* Section 7: Organizational Boundary */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#6610f2' }}>
                    🏢 7. Organizational Boundary
                    <InfoIcon title="Clarify organizational boundaries used for numerator and denominator." onClick={() => {}} />
                  </h6>
                </div>
                <textarea
                  className="form-textarea"
                  rows={3}
                  placeholder="Define site/business unit boundaries (e.g., Includes all manufacturing sites in Europe and North America, excludes joint ventures and associate companies)"
                  style={{ width: '100%' }}
                ></textarea>
              </div>

              {/* Section 8: Breakdown by Business Unit or Facility */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#e83e8c' }}>
                    🏭 8. Breakdown by Business Unit or Facility
                    <InfoIcon title="Enter breakdown of energy intensity ratios by business unit or facility." onClick={() => {}} />
                  </h6>
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
                        <th style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '200px' }}>Unit/Facility Name</th>
                        <th style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '180px' }}>Energy Consumption</th>
                        <th style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '150px' }}>Metric Used</th>
                        <th style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '200px' }}>Energy Intensity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3, 4, 5].map((row) => (
                        <tr key={row} style={{ backgroundColor: row % 2 === 0 ? '#f9f9f9' : '#fff' }}>
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
                              placeholder="e.g., Manufacturing Unit A"
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
                              placeholder="e.g., 500,000 kWh"
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
                              placeholder="e.g., 500 FTE"
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
                              placeholder="e.g., 1,000 kWh/FTE"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section 9: Additional Notes */}
              <div style={{ marginBottom: '15px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#6c757d' }}>
                    💬 9. Additional Notes
                    <InfoIcon title="Any additional remarks on calculation assumptions, data quality, or trends." onClick={() => {}} />
                  </h6>
                </div>
                <textarea
                  className="form-textarea"
                  rows={4}
                  placeholder="Additional remarks on calculation assumptions, data quality, or trends (e.g., Some data estimated due to missing metering at certain facilities; Energy intensity improved 15% compared to previous year)"
                  style={{ width: '100%' }}
                ></textarea>
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

        {/* Disclosure 103-5: Reduction in energy consumption */}
        <div className="section-header">
          <div className="main-heading">
            5. Reduction in energy consumption
            <div className="info-icon" title="Reduction in energy consumption refers to the amount of energy saved as a direct result of conservation and efficiency initiatives.">i</div>
          </div>
        </div>

        <div className="question-section">
          <div className="requirements-header">
            <strong>The organization shall:</strong>
          </div>
          
          {/* Comprehensive Energy Reduction Reporting (5a-5f) */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">5</div>
              <div className="sub-question-title">Reduction in Energy Consumption (GRI 103-5)</div>
              <div className="info-icon" title="Report comprehensive information about energy consumption reductions achieved, including methodologies, scope, and supporting data.">i</div>
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
                  📉 Energy Consumption Reduction Reporting
                  <InfoIcon title="Comprehensive reporting on energy consumption reductions achieved during the reporting period." onClick={() => {}} />
                </h5>
              </div>

              {/* Section 1: Total Energy Reduction Achieved */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#28a745' }}>
                    🎯 1. Total Energy Reduction Achieved
                    <InfoIcon title="Enter the total reduction in energy consumption achieved during the reporting period." onClick={() => {}} />
                  </h6>
                </div>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '10px' }}>
                  <input
                    type="number"
                    className="form-input"
                    style={{ flex: 1, padding: '10px' }}
                    placeholder="1,500,000"
                  />
                  <select
                    style={{
                      padding: '10px',
                      border: '1px solid #dee2e6',
                      borderRadius: '4px',
                      minWidth: '150px'
                    }}
                  >
                    <option value="">Select Unit</option>
                    <option value="J">J (Joules)</option>
                    <option value="kJ">kJ (Kilojoules)</option>
                    <option value="MJ">MJ (Megajoules)</option>
                    <option value="GJ">GJ (Gigajoules)</option>
                    <option value="TJ">TJ (Terajoules)</option>
                    <option value="Wh">Wh (Watt-hours)</option>
                    <option value="kWh">kWh (Kilowatt-hours)</option>
                    <option value="MWh">MWh (Megawatt-hours)</option>
                    <option value="GWh">GWh (Gigawatt-hours)</option>
                  </select>
                </div>
              </div>

              {/* Section 2: Reduction Due To */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#6f42c1' }}>
                    🔍 2. Reduction Due To
                    <InfoIcon title="Select causes for the energy reduction and provide specific descriptions." onClick={() => {}} />
                  </h6>
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
                    Conservation and Efficiency Initiatives:
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '10px', marginBottom: '15px' }}>
                    {[
                      'Equipment upgrades',
                      'Building retrofits',
                      'Process optimization',
                      'Energy management systems',
                      'Employee training',
                      'Behavioral changes',
                      'Lighting improvements',
                      'HVAC optimization'
                    ].map((initiative) => (
                      <label key={initiative} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <input type="checkbox" style={{ marginRight: '8px' }} />
                        <span style={{ fontSize: '14px' }}>{initiative}</span>
                      </label>
                    ))}
                  </div>
                  <textarea
                    className="form-textarea"
                    rows={3}
                    placeholder="Describe specific efficiency initiatives (e.g., Updated HVAC system with smart controls, LED lighting replacement, employee energy awareness program)"
                    style={{ width: '100%', marginBottom: '15px' }}
                  ></textarea>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
                    Other Factors:
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '15px' }}>
                    {[
                      'Production changes',
                      'Weather conditions',
                      'Economic factors',
                      'Operational adjustments',
                      'Market conditions',
                      'Regulatory requirements'
                    ].map((factor) => (
                      <label key={factor} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <input type="checkbox" style={{ marginRight: '8px' }} />
                        <span style={{ fontSize: '14px' }}>{factor}</span>
                      </label>
                    ))}
                  </div>
                  <textarea
                    className="form-textarea"
                    rows={3}
                    placeholder="Describe other factors contributing to reduction (e.g., Reduced production output due to market conditions, milder winter reducing heating needs)"
                    style={{ width: '100%' }}
                  ></textarea>
                </div>
              </div>

              {/* Section 3: Types of Energy Affected */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#fd7e14' }}>
                    ⚡ 3. Types of Energy Affected
                    <InfoIcon title="Select the types of energy consumption included in the reduction." onClick={() => {}} />
                  </h6>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
                  {[
                    'Fuel consumption',
                    'Electricity',
                    'Heating',
                    'Cooling',
                    'Steam',
                    'Compressed air',
                    'Other utilities'
                  ].map((energyType) => (
                    <label key={energyType} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '10px', border: '1px solid #dee2e6', borderRadius: '6px' }}>
                      <input type="checkbox" style={{ marginRight: '8px' }} />
                      <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{energyType}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Section 4: Reduction Scope */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#20c997' }}>
                    🌐 4. Reduction Scope
                    <InfoIcon title="Indicate where energy consumption reductions occurred within your operations or value chain." onClick={() => {}} />
                  </h6>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                  {[
                    { value: 'within_org', label: 'Within the Organization', desc: 'Direct operations and facilities' },
                    { value: 'upstream', label: 'Upstream Value Chain', desc: 'Suppliers and sourcing activities' },
                    { value: 'downstream', label: 'Downstream Value Chain', desc: 'Distribution and end-of-life' }
                  ].map((scope) => (
                    <label key={scope.value} style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      cursor: 'pointer', 
                      padding: '15px', 
                      border: '1px solid #dee2e6', 
                      borderRadius: '6px',
                      backgroundColor: '#f8f9fa'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                        <input type="checkbox" style={{ marginRight: '8px' }} />
                        <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{scope.label}</span>
                      </div>
                      <span style={{ fontSize: '12px', color: '#666', fontStyle: 'italic' }}>{scope.desc}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Section 5: Reduction by Value Chain Categories */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#dc3545' }}>
                    📊 5. Reduction by Value Chain Categories
                    <InfoIcon title="Enter breakdown of energy reduction by upstream and downstream categories." onClick={() => {}} />
                  </h6>
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
                        <th style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '250px' }}>Value Chain Category</th>
                        <th style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '150px' }}>Reduction Amount</th>
                        <th style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '100px' }}>Unit</th>
                        <th style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '200px' }}>Notes/Comments</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ backgroundColor: '#e3f2fd', fontWeight: 'bold' }}>
                        <td colSpan={4} style={{ border: '1px solid #dee2e6', padding: '8px', textAlign: 'center', backgroundColor: '#e3f2fd', fontWeight: 'bold' }}>
                          Upstream Categories
                        </td>
                      </tr>
                      {[
                        'Purchased goods and services',
                        'Capital goods',
                        'Fuel- and energy-related activities',
                        'Upstream transportation and distribution',
                        'Waste generated in operations',
                        'Business travel',
                        'Employee commuting',
                        'Upstream leased assets'
                      ].map((category, index) => (
                        <tr key={`upstream-${category}`} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                          <td style={{ border: '1px solid #dee2e6', padding: '8px', fontWeight: 'bold' }}>
                            {category}
                          </td>
                          <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                            <input 
                              type="number"
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
                              style={{ 
                                width: '100%', 
                                border: 'none',
                                background: 'transparent',
                                fontSize: '11px',
                                padding: '4px'
                              }}
                            >
                              <option value="">Unit</option>
                              <option value="kWh">kWh</option>
                              <option value="MWh">MWh</option>
                              <option value="GJ">GJ</option>
                              <option value="TJ">TJ</option>
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
                              placeholder="Optional notes"
                            />
                          </td>
                        </tr>
                      ))}

                      {/* Downstream Categories */}
                      <tr style={{ backgroundColor: '#f3e5f5', fontWeight: 'bold' }}>
                        <td colSpan={4} style={{ 
                          border: '1px solid #dee2e6', 
                          padding: '8px', 
                          textAlign: 'center',
                          backgroundColor: '#f3e5f5',
                          fontWeight: 'bold'
                        }}>
                          Downstream Categories
                        </td>
                      </tr>
                      {[
                        'Downstream transportation and distribution',
                        'Processing of sold products',
                        'Use of sold products',
                        'End-of-life treatment of sold products',
                        'Downstream leased assets',
                        'Franchises',
                        'Investments'
                      ].map((category, index) => (
                        <tr key={`downstream-${category}`} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                          <td style={{ border: '1px solid #dee2e6', padding: '8px', fontWeight: 'bold' }}>
                            {category}
                          </td>
                          <td style={{ border: '1px solid #dee2e6', padding: '4px' }}>
                            <input 
                              type="number"
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
                              style={{ 
                                width: '100%', 
                                border: 'none',
                                background: 'transparent',
                                fontSize: '11px',
                                padding: '4px'
                              }}
                            >
                              <option value="">Unit</option>
                              <option value="kWh">kWh</option>
                              <option value="MWh">MWh</option>
                              <option value="GJ">GJ</option>
                              <option value="TJ">TJ</option>
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
                              placeholder="Optional notes"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section 6: Measurement Methodology */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#17a2b8' }}>
                    📏 6. Measurement Methodology
                    <InfoIcon title="Select how the energy consumption reduction was measured or calculated." onClick={() => {}} />
                  </h6>
                </div>
                <div style={{ marginBottom: '15px' }}>
                  {[
                    { value: 'direct', label: 'Direct Measurement', desc: 'Metered data, actual measurements from monitoring systems' },
                    { value: 'estimated', label: 'Estimated', desc: 'Based on calculations using assumptions and proxies' },
                    { value: 'modeled', label: 'Modeled', desc: 'Using mathematical models or simulation tools' }
                  ].map((method) => (
                    <label key={method.value} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      cursor: 'pointer', 
                      marginBottom: '10px',
                      padding: '10px',
                      border: '1px solid #dee2e6',
                      borderRadius: '6px'
                    }}>
                      <input type="radio" name="measurementMethod" value={method.value} style={{ marginRight: '10px' }} />
                      <div>
                        <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{method.label}</div>
                        <div style={{ fontSize: '12px', color: '#666', fontStyle: 'italic' }}>{method.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
                <textarea
                  className="form-textarea"
                  rows={3}
                  placeholder="Describe the specific measurement approach (e.g., Direct measurement using smart meters with hourly data collection)"
                  style={{ width: '100%' }}
                ></textarea>
              </div>

              {/* Section 7: Estimation/Modeling Methods */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#6610f2' }}>
                    🧮 7. Estimation/Modeling Methods
                    <InfoIcon title="Describe estimation or modeling methodology if applicable (required if estimated or modeled was selected above)." onClick={() => {}} />
                  </h6>
                </div>
                <textarea
                  className="form-textarea"
                  rows={4}
                  placeholder="Describe estimation/modeling methodology if applicable (e.g., Used regression model based on historic consumption patterns, weather data, and production volumes to estimate baseline consumption)"
                  style={{ width: '100%' }}
                ></textarea>
              </div>

              {/* Section 8: Base Year / Baseline Used */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#e83e8c' }}>
                    📅 8. Base Year / Baseline Used
                    <InfoIcon title="Specify the base year and baseline energy consumption used for calculating reductions." onClick={() => {}} />
                  </h6>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Base Year:</label>
                    <input
                      type="number"
                      min="1990"
                      max="2030"
                      className="form-input"
                      style={{ width: '100%', padding: '10px' }}
                      placeholder="2019"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Base Year Energy Consumption:</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <input
                        type="number"
                        className="form-input"
                        style={{ flex: 1, padding: '10px' }}
                        placeholder="5,000,000"
                      />
                      <select
                        style={{
                          padding: '10px',
                          border: '1px solid #dee2e6',
                          borderRadius: '4px',
                          minWidth: '100px'
                        }}
                      >
                        <option value="kWh">kWh</option>
                        <option value="MWh">MWh</option>
                        <option value="GJ">GJ</option>
                        <option value="TJ">TJ</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Rationale for Base Year Selection:</label>
                  <textarea
                    className="form-textarea"
                    rows={3}
                    placeholder="Explain rationale for choosing this baseline (e.g., 2019 represents a normal operational year before COVID-19 impacts, with complete and reliable data available)"
                    style={{ width: '100%' }}
                  ></textarea>
                </div>
              </div>

              {/* Section 9: Standards, Methodologies, Tools */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#28a745' }}>
                    📋 9. Standards, Methodologies, Tools
                    <InfoIcon title="Describe standards, assumptions, and calculation tools used for energy reduction calculations." onClick={() => {}} />
                  </h6>
                </div>
                <textarea
                  className="form-textarea"
                  rows={4}
                  placeholder="Describe standards, methodologies, assumptions, and calculation tools used (e.g., Used GHG Protocol Scope 2 Guidance for electricity calculations; IEA electricity emission factors for grid electricity; ISO 50001 energy management methodology)"
                  style={{ width: '100%' }}
                ></textarea>
              </div>

              {/* Section 10: Changes vs Previous-period Methods */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#fd7e14' }}>
                    🔄 10. Changes vs Previous-period Methods
                    <InfoIcon title="Describe any changes in methods or standards since the last reporting period." onClick={() => {}} />
                  </h6>
                </div>
                <textarea
                  className="form-textarea"
                  rows={3}
                  placeholder="Describe any changes in methods or standards since last report (e.g., Updated emission factor for grid electricity to 2024 value; Changed from estimation to direct measurement for facility X)"
                  style={{ width: '100%' }}
                ></textarea>
              </div>

              {/* Section 11: Additional Comments */}
              <div style={{ marginBottom: '15px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <h6 style={{ margin: 0, display: 'flex', alignItems: 'center', color: '#6c757d' }}>
                    💬 11. Additional Comments
                    <InfoIcon title="Provide any extra context or clarifications regarding the energy consumption reduction." onClick={() => {}} />
                  </h6>
                </div>
                <textarea
                  className="form-textarea"
                  rows={4}
                  placeholder="Extra context or clarifications (e.g., Reduction includes both efficiency gains from equipment upgrades and behavioral changes from employee engagement programs. Weather normalization was applied to account for temperature variations.)"
                  style={{ width: '100%' }}
                ></textarea>
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
        
      </div>
    </div>
  );
};

export default GRI103Energy;

