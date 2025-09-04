import React from 'react';
import { useNavigate } from 'react-router-dom';

const GRI402Labor: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/topic-standards-2025/social');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <button className="back-btn" onClick={handleBackClick}>← Back</button>
        <div className="page-title">GRI 402: Labor</div>
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
          <div className="section-title">Labor</div>
          <div className="gri-reference">GRI 402: Labor</div>
          <div className="main-heading">
            1. Minimum notice periods regarding operational changes
            <div className="info-icon">i</div>
          </div>
        </div>
        
        <div className="subsection">
          <div className="subsection-title">
            1.1 Minimum notice periods regarding operational changes.
            <div className="collaboration-icon">👥</div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Notice Period (days)</label>
              <input type="text" className="form-input" placeholder="Enter days" />
            </div>
            <div className="form-group">
              <label className="form-label">Change Type</label>
              <input type="text" className="form-input" placeholder="Enter change type" />
            </div>
            <div className="form-group">
              <label className="form-label">Stakeholder Group</label>
              <select className="form-select">
                <option>Select Group</option>
                <option>Employees</option>
                <option>Trade Unions</option>
                <option>Local Communities</option>
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

export default GRI402Labor;
