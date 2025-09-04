import React from 'react';
import { useNavigate } from 'react-router-dom';

const GRI14MiningSector: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/sector-standards');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <button className="back-btn" onClick={handleBackClick}>← Back</button>
        <div className="page-title">GRI 14: Mining sector</div>
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
          <div className="section-title">Mining Sector</div>
          <div className="gri-reference">GRI 14: Mining sector</div>
          <div className="main-heading">
            1. Mining sector specific disclosures
            <div className="info-icon">i</div>
          </div>
        </div>
        
        <div className="subsection">
          <div className="subsection-title">
            1.1 Mining operations and environmental restoration.
            <div className="collaboration-icon">👥</div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Mineral Type</label>
              <input type="text" className="form-input" placeholder="Enter mineral type" />
            </div>
            <div className="form-group">
              <label className="form-label">Production (tonnes)</label>
              <input type="text" className="form-input" placeholder="Enter production" />
            </div>
            <div className="form-group">
              <label className="form-label">Restoration Status</label>
              <select className="form-select">
                <option>Select Status</option>
                <option>Active mining</option>
                <option>Under restoration</option>
                <option>Completed restoration</option>
              </select>
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

export default GRI14MiningSector;
