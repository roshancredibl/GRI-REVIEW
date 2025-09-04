import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ReportId } from '../../../types/report.types';
import InfoIcon from '../../../components/InfoIcon';

const GRI14MiningSectorEnvironmental: React.FC = () => {
  const navigate = useNavigate();
  const { reportId } = useParams<{ reportId: ReportId }>();

  const handleBackClick = () => {
    if (reportId) {
      navigate(`/gri/${reportId}/topic-standards-2025/environmental`);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <button className="back-btn" onClick={handleBackClick}>← Back</button>
        <div className="page-title">GRI 14: Mining Sector - Environmental Disclosures</div>
      </div>

      <div className="content-section">
        <div className="intro-text">
          <p>This section covers the mining sector-specific environmental disclosures. These requirements apply specifically to organizations in the mining sector and supplement the general environmental standards.</p>
        </div>

        {/* Mining Sector Environmental Disclosure 1 */}
        <div className="question-section">
          <div className="question-header">
            <h3>Disclosure 14-1-a: Land disturbed or rehabilitated</h3>
            <InfoIcon title="Report the number and percentage of sites where land disturbance or rehabilitation took place" onClick={() => {}} />
          </div>
          
          <div className="requirements-header">
            <strong>The organization shall:</strong>
          </div>

          {/* Requirement 1a */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">1a</div>
              <div className="sub-question-title">report the number and percentage of sites where land disturbance took place during the reporting period;</div>
              <InfoIcon title="This includes all sites where new land disturbance occurred for mining operations." onClick={() => {}} />
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
                  🏗️ Land Disturbance Sites
                  <InfoIcon title="Report sites where new land disturbance occurred during the reporting period." onClick={() => {}} />
                </h5>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    Total Number of Sites with Land Disturbance
                  </label>
                  <input
                    type="number"
                    className="form-input"
                    style={{ width: '100%', padding: '10px' }}
                    placeholder="Enter number of sites"
                    min="0"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    Total Number of Operational Sites
                  </label>
                  <input
                    type="number"
                    className="form-input"
                    style={{ width: '100%', padding: '10px' }}
                    placeholder="Enter total operational sites"
                    min="0"
                  />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Percentage of Sites with Land Disturbance (Auto-calculated)
                </label>
                <input
                  type="text"
                  className="form-input"
                  style={{ width: '100%', padding: '10px', backgroundColor: '#f8f9fa' }}
                  placeholder="Will be calculated automatically"
                  readOnly
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Additional Notes
                </label>
                <textarea
                  className="form-textarea"
                  rows={4}
                  placeholder="Provide any additional context about land disturbance activities, types of disturbance, or methodology used for calculation"
                  style={{ width: '100%' }}
                ></textarea>
              </div>
            </div>
          </div>

          {/* Requirement 1b */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">1b</div>
              <div className="sub-question-title">report the number and percentage of sites where land rehabilitation took place during the reporting period.</div>
              <InfoIcon title="This includes all sites where land rehabilitation or restoration activities occurred." onClick={() => {}} />
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
                  🌱 Land Rehabilitation Sites
                  <InfoIcon title="Report sites where land rehabilitation or restoration took place during the reporting period." onClick={() => {}} />
                </h5>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    Total Number of Sites with Land Rehabilitation
                  </label>
                  <input
                    type="number"
                    className="form-input"
                    style={{ width: '100%', padding: '10px' }}
                    placeholder="Enter number of sites"
                    min="0"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    Total Number of Sites Requiring Rehabilitation
                  </label>
                  <input
                    type="number"
                    className="form-input"
                    style={{ width: '100%', padding: '10px' }}
                    placeholder="Enter total sites requiring rehabilitation"
                    min="0"
                  />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Percentage of Sites with Land Rehabilitation (Auto-calculated)
                </label>
                <input
                  type="text"
                  className="form-input"
                  style={{ width: '100%', padding: '10px', backgroundColor: '#f8f9fa' }}
                  placeholder="Will be calculated automatically"
                  readOnly
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Rehabilitation Activities Description
                </label>
                <textarea
                  className="form-textarea"
                  rows={4}
                  placeholder="Describe the types of rehabilitation activities undertaken, methodologies used, success criteria, and any challenges encountered"
                  style={{ width: '100%' }}
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Mining Sector Environmental Disclosure 2 */}
        <div className="question-section">
          <div className="question-header">
            <h3>Disclosure 14-2-a: Mine closure</h3>
            <InfoIcon title="Report information about mine closure planning and implementation" onClick={() => {}} />
          </div>
          
          <div className="requirements-header">
            <strong>The organization shall:</strong>
          </div>

          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">2a</div>
              <div className="sub-question-title">report whether the organization has closure plans for each site and whether these closure plans are publicly available;</div>
              <InfoIcon title="This includes comprehensive mine closure planning and stakeholder accessibility." onClick={() => {}} />
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
                  📋 Mine Closure Planning
                  <InfoIcon title="Information about closure plans for each mining site and their public availability." onClick={() => {}} />
                </h5>
              </div>

              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
                  Does the organization have closure plans for each site?
                </label>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input type="radio" name="hasClosurePlans" value="yes" style={{ marginRight: '8px' }} />
                    <span>Yes, all sites have closure plans</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input type="radio" name="hasClosurePlans" value="partial" style={{ marginRight: '8px' }} />
                    <span>Some sites have closure plans</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input type="radio" name="hasClosurePlans" value="no" style={{ marginRight: '8px' }} />
                    <span>No closure plans exist</span>
                  </label>
                </div>
              </div>

              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
                  Are closure plans publicly available?
                </label>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input type="radio" name="publiclyAvailable" value="yes" style={{ marginRight: '8px' }} />
                    <span>Yes, all closure plans are publicly available</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input type="radio" name="publiclyAvailable" value="partial" style={{ marginRight: '8px' }} />
                    <span>Some closure plans are publicly available</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input type="radio" name="publiclyAvailable" value="no" style={{ marginRight: '8px' }} />
                    <span>No closure plans are publicly available</span>
                  </label>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Additional Details about Closure Planning
                </label>
                <textarea
                  className="form-textarea"
                  rows={5}
                  placeholder="Provide details about closure planning processes, stakeholder engagement, regulatory requirements, timelines, financial provisions, and how plans are made accessible to the public"
                  style={{ width: '100%' }}
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Mining Sector Environmental Disclosure 3 */}
        <div className="question-section">
          <div className="question-header">
            <h3>Disclosure 14-3-a: Waste and hazardous materials management</h3>
            <InfoIcon title="Report information about waste rock, overburden, tailings, and hazardous materials management" onClick={() => {}} />
          </div>
          
          <div className="requirements-header">
            <strong>The organization shall:</strong>
          </div>

          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">3a</div>
              <div className="sub-question-title">report the total weight or volume of overburden, waste rock, tailings, and sludges and their associated risks;</div>
              <InfoIcon title="This includes all mining waste materials and associated environmental risks." onClick={() => {}} />
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
                  ⚠️ Mining Waste and Hazardous Materials
                  <InfoIcon title="Comprehensive tracking of mining waste materials and associated environmental risks." onClick={() => {}} />
                </h5>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ 
                  width: '100%', 
                  borderCollapse: 'collapse',
                  fontSize: '12px',
                  marginBottom: '20px'
                }}>
                  <thead>
                    <tr style={{ background: '#f8f9fa' }}>
                      <th style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '150px' }}>Waste Type</th>
                      <th style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '120px' }}>Total Weight (tonnes)</th>
                      <th style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '120px' }}>Total Volume (m³)</th>
                      <th style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '200px' }}>Associated Risks</th>
                      <th style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'center', fontWeight: 'bold', minWidth: '200px' }}>Management Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    {['Overburden', 'Waste Rock', 'Tailings', 'Sludges', 'Other Mining Waste'].map((wasteType, index) => (
                      <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                        <td style={{ border: '1px solid #dee2e6', padding: '8px', fontWeight: 'bold', textAlign: 'center' }}>
                          {wasteType}
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
                            min="0"
                          />
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
                            min="0"
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
                            <option value="">Select Risk Level</option>
                            <option value="low">Low Risk</option>
                            <option value="medium">Medium Risk</option>
                            <option value="high">High Risk</option>
                            <option value="critical">Critical Risk</option>
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
                            placeholder="e.g., Disposal facility, recycling"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Risk Assessment Methodology and Additional Context
                </label>
                <textarea
                  className="form-textarea"
                  rows={4}
                  placeholder="Describe the methodology used for risk assessment, any specific environmental concerns, monitoring protocols, and additional context about waste management practices"
                  style={{ width: '100%' }}
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="save-section">
          <a href="#" className="attachments-link">
            <span>📎</span>
            <span>Attachments</span>
          </a>
          <button className="save-btn">Save Progress</button>
        </div>
      </div>
    </div>
  );
};

export default GRI14MiningSectorEnvironmental;
