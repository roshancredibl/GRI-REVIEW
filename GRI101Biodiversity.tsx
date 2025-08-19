import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InfoIcon from '../components/InfoIcon';

const GRI101Biodiversity: React.FC = () => {
  const navigate = useNavigate();
  const [guidanceState, setGuidanceState] = useState({
    isOpen: false,
    guidanceText: ''
  });

  const handleBackClick = () => {
    navigate('/topic-standards-2025');
  };

  const openGuidance = (text: string) => {
    setGuidanceState({ isOpen: true, guidanceText: text });
  };

  const closeGuidance = () => {
    setGuidanceState({ isOpen: false, guidanceText: '' });
  };

  return (
    <>
      <div className="page-container">
        <div className="page-header">
          <button className="back-btn" onClick={handleBackClick}>← Back</button>
          <div className="page-title">GRI 101: Biodiversity 2024</div>
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
            <div className="form-group">
              <label className="form-label">Response</label>
              <textarea className="form-textarea" placeholder="Describe your policies or commitments to halt and reverse biodiversity loss..."></textarea>
            </div>
            <div className="save-section">
              <button className="attachments-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <span>📎</span>
                <span>Attachments</span>
              </button>
              <button className="save-btn">SAVE</button>
            </div>
          </div>

          {/* Question 3a - Access and benefit-sharing compliance process */}
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
              The organization shall describe the process to ensure compliance with access and benefit-sharing (Access and Benefit Sharing Compliance Process) regulations and measures
            </div>
            
            {/* Sub-question 3a i */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">3a i</div>
                <div className="sub-question-title">Responsibility allocation across organizational levels</div>
                <InfoIcon 
                  title="Describe how your organization allocates responsibility to ensure compliance with Access and Benefit Sharing Compliance Process regulations and measures across different levels within the organization"
                  onClick={() => openGuidance("Describe how your organization allocates responsibility to ensure compliance with Access and Benefit Sharing Compliance Process regulations and measures across different levels within the organization")}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Responsibility Allocation</label>
                <textarea className="form-textarea" placeholder="Describe how responsibility for Access and Benefit Sharing Compliance Process compliance is allocated across different organizational levels..."></textarea>
              </div>
            </div>

            {/* Sub-question 3a ii */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">3a ii</div>
                <div className="sub-question-title">Identification of provider countries with Access and Benefit Sharing Compliance Process regulations</div>
                <InfoIcon 
                  title="Describe how your organization identifies which provider countries have access and benefit-sharing regulations and measures"
                  onClick={() => openGuidance("Describe how your organization identifies which provider countries have access and benefit-sharing regulations and measures")}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Provider Country Identification Process</label>
                <textarea className="form-textarea" placeholder="Describe your process for identifying provider countries with Access and Benefit Sharing Compliance Process regulations and measures..."></textarea>
              </div>
            </div>

            {/* Sub-question 3a iii */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">3a iii</div>
                <div className="sub-question-title">Integration into organizational strategies and procedures</div>
                <InfoIcon 
                  title="Describe how your organization integrates Access and Benefit Sharing Compliance Process regulations and measures into organizational strategies, operational policies, and operational procedures"
                  onClick={() => openGuidance("Describe how your organization integrates Access and Benefit Sharing Compliance Process regulations and measures into organizational strategies, operational policies, and operational procedures")}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Strategy Integration</label>
                <textarea className="form-textarea" placeholder="Describe how Access and Benefit Sharing Compliance Process regulations are integrated into organizational strategies..."></textarea>
              </div>
              <div className="form-group">
                <label className="form-label">Operational Policy Integration</label>
                <textarea className="form-textarea" placeholder="Describe how Access and Benefit Sharing Compliance Process regulations are integrated into operational policies..."></textarea>
              </div>
              <div className="form-group">
                <label className="form-label">Operational Procedure Integration</label>
                <textarea className="form-textarea" placeholder="Describe how Access and Benefit Sharing Compliance Process regulations are integrated into operational procedures..."></textarea>
              </div>
            </div>

            {/* Sub-question 3a iv */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">3a iv</div>
                <div className="sub-question-title">Training on Access and Benefit Sharing Compliance Process regulations implementation</div>
                <InfoIcon 
                  title="Describe what training your organization provides on implementing the Access and Benefit Sharing Compliance Process regulations and measures"
                  onClick={() => openGuidance("Describe what training your organization provides on implementing the Access and Benefit Sharing Compliance Process regulations and measures")}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Training Programs</label>
                <textarea className="form-textarea" placeholder="Describe the training programs provided on implementing Access and Benefit Sharing Compliance Process regulations and measures..."></textarea>
              </div>
              <div className="form-group">
                <label className="form-label">Training Frequency</label>
                <select className="form-select">
                  <option>Select frequency</option>
                  <option>Annually</option>
                  <option>Biannually</option>
                  <option>Quarterly</option>
                  <option>As needed</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Target Audience</label>
                <textarea className="form-textarea" placeholder="Describe who receives Access and Benefit Sharing Compliance Process training within your organization..."></textarea>
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
                title="Voluntary actions can include joint research projects, training, or knowledge sharing related to using genetic resources or associated traditional knowledge in research and innovation."
                onClick={() => openGuidance("Voluntary actions can include joint research projects, training, or knowledge sharing related to using genetic resources or associated traditional knowledge in research and innovation.")}
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
        </div>
      </div>

      {/* Guidance Sidebar */}
      <div className={`guidance-sidebar ${guidanceState.isOpen ? 'open' : ''}`}>
        <div className="guidance-header">
          <div className="guidance-title">Guidance Information</div>
          <button className="close-guidance" onClick={closeGuidance}>×</button>
        </div>
        <div className="guidance-content">
          <div className="guidance-text">{guidanceState.guidanceText}</div>
          <div className="sdg-linkage-section">
            <h4>SDG Linkage</h4>
            <div className="sdg-linkage-content">
              <div className="sdg-goal">
                <div className="sdg-number">15</div>
                <div className="sdg-title">Life on Land</div>
              </div>
              <div className="sdg-goal">
                <div className="sdg-number">14</div>
                <div className="sdg-title">Life Below Water</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GRI101Biodiversity;
