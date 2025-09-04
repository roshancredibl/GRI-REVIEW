import React from 'react';
import { useNavigate } from 'react-router-dom';

const GRI411RightsOfIndigenousPeoples: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/topic-standards-2025/social');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <button className="back-btn" onClick={handleBackClick}>← Back</button>
        <div className="page-title">GRI 411: Rights of Indigenous Peoples</div>
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
          <div className="section-title">Rights of Indigenous Peoples</div>
          <div className="gri-reference">GRI 411: Rights of Indigenous Peoples</div>
          <div className="main-heading">
            1. Incidents of violations involving rights of indigenous peoples
            <div className="info-icon">i</div>
          </div>
        </div>
        
        <div className="subsection">
          <div className="subsection-title">
            1.1 Total number of incidents of violations involving rights of indigenous peoples and actions taken.
            <div className="collaboration-icon">👥</div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Incident Type</label>
              <input type="text" className="form-input" placeholder="Enter incident type" />
            </div>
            <div className="form-group">
              <label className="form-label">Number of Incidents</label>
              <input type="text" className="form-input" placeholder="Enter number" />
            </div>
            <div className="form-group">
              <label className="form-label">Actions Taken</label>
              <input type="text" className="form-input" placeholder="Enter actions taken" />
            </div>
          </div>
          
          <div className="form-actions">
            <button className="add-btn">+ADD</button>
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
  );
};

export default GRI411RightsOfIndigenousPeoples;
