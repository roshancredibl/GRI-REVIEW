import React from 'react';
import { useNavigate } from 'react-router-dom';

const GRI410SecurityPractices: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/topic-standards-2025/social');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <button className="back-btn" onClick={handleBackClick}>← Back</button>
        <div className="page-title">GRI 410: Security Practices</div>
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
          <div className="section-title">Security Practices</div>
          <div className="gri-reference">GRI 410: Security Practices</div>
          <div className="main-heading">
            1. Security personnel trained in human rights policies or procedures
            <div className="info-icon">i</div>
          </div>
        </div>
        
        <div className="subsection">
          <div className="subsection-title">
            1.1 Percentage of security personnel trained in the organization's human rights policies or procedures.
            <div className="collaboration-icon">👥</div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Security Personnel Type</label>
              <select className="form-select">
                <option>Select Type</option>
                <option>In-house security</option>
                <option>Third-party security</option>
                <option>Both</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Trained Personnel (%)</label>
              <input type="text" className="form-input" placeholder="Enter percentage" />
            </div>
            <div className="form-group">
              <label className="form-label">Training Type</label>
              <input type="text" className="form-input" placeholder="Enter training type" />
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

export default GRI410SecurityPractices;
