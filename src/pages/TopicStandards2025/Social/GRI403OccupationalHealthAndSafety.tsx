import React from 'react';
import { useNavigate } from 'react-router-dom';

const GRI403OccupationalHealthAndSafety: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/topic-standards-2025/social');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <button className="back-btn" onClick={handleBackClick}>← Back</button>
        <div className="page-title">GRI 403: Occupational Health and Safety</div>
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
          <div className="section-title">Occupational Health and Safety</div>
          <div className="gri-reference">GRI 403: Occupational Health and Safety</div>
          <div className="main-heading">
            1. Occupational health and safety management system
            <div className="info-icon">i</div>
          </div>
        </div>
        
        <div className="subsection">
          <div className="subsection-title">
            1.1 Occupational health and safety management system.
            <div className="collaboration-icon">👥</div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Safety Incidents</label>
              <input type="text" className="form-input" placeholder="Enter number" />
            </div>
            <div className="form-group">
              <label className="form-label">Incident Rate</label>
              <input type="text" className="form-input" placeholder="Enter rate" />
            </div>
            <div className="form-group">
              <label className="form-label">Management System</label>
              <select className="form-select">
                <option>Select System</option>
                <option>ISO 45001</option>
                <option>OHSAS 18001</option>
                <option>Other</option>
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

export default GRI403OccupationalHealthAndSafety;
