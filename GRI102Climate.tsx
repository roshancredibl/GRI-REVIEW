import React from 'react';
import { useNavigate } from 'react-router-dom';

const GRI102Climate: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/topic-standards-2025');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <button className="back-btn" onClick={handleBackClick}>← Back</button>
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
            1. Greenhouse gas emissions and climate risks
            <div className="info-icon">i</div>
          </div>
        </div>
        
        <div className="subsection">
          <div className="subsection-title">
            1.1 Total greenhouse gas emissions (Scope 1, 2, and 3) in metric tons of CO2 equivalent.
            <div className="collaboration-icon">👥</div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Total emissions (tCO2e)</label>
              <input type="text" className="form-input" placeholder="Enter value" />
            </div>
            <div className="form-group">
              <label className="form-label">Emission Scope</label>
              <select className="form-select">
                <option>Select Scope</option>
                <option>Scope 1</option>
                <option>Scope 2</option>
                <option>Scope 3</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Reporting Year</label>
              <select className="form-select">
                <option>Select Year</option>
                <option>2024</option>
                <option>2025</option>
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

export default GRI102Climate;
