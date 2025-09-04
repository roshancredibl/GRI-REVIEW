import React from 'react';
import { useNavigate } from 'react-router-dom';

const GRI12CoalSector2022: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/sector-standards');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <button className="back-btn" onClick={handleBackClick}>← Back</button>
        <div className="page-title">GRI 12: Coal Sector 2022</div>
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
          <div className="section-title">Coal Sector</div>
          <div className="gri-reference">GRI 12: Coal Sector 2022</div>
          <div className="main-heading">
            1. Coal sector specific disclosures
            <div className="info-icon">i</div>
          </div>
        </div>
        
        <div className="subsection">
          <div className="subsection-title">
            1.1 Coal production and environmental impacts.
            <div className="collaboration-icon">👥</div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Coal Production (tonnes)</label>
              <input type="text" className="form-input" placeholder="Enter production" />
            </div>
            <div className="form-group">
              <label className="form-label">Mining Method</label>
              <select className="form-select">
                <option>Select Method</option>
                <option>Surface mining</option>
                <option>Underground mining</option>
                <option>Mountaintop removal</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Environmental Impact</label>
              <input type="text" className="form-input" placeholder="Enter impact description" />
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

export default GRI12CoalSector2022;
