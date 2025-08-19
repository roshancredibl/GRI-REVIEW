import React from 'react';
import { useNavigate } from 'react-router-dom';

const GRI103Energy: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/topic-standards-2025');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <button className="back-btn" onClick={handleBackClick}>← Back</button>
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
        
        <div className="section-header">
          <div className="section-title">Energy</div>
          <div className="gri-reference">GRI 103: Energy</div>
          <div className="main-heading">
            1. Energy consumption and efficiency
            <div className="info-icon">i</div>
          </div>
        </div>
        
        <div className="subsection">
          <div className="subsection-title">
            1.1 Total energy consumption from renewable and non-renewable sources.
            <div className="collaboration-icon">👥</div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Total energy consumption (MWh)</label>
              <input type="text" className="form-input" placeholder="Enter value" />
            </div>
            <div className="form-group">
              <label className="form-label">Energy Source</label>
              <select className="form-select">
                <option>Select Energy Source</option>
                <option>Renewable</option>
                <option>Non-renewable</option>
                <option>Mixed</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Energy Type</label>
              <select className="form-select">
                <option>Select Energy Type</option>
                <option>Electricity</option>
                <option>Natural Gas</option>
                <option>Solar</option>
                <option>Wind</option>
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

export default GRI103Energy;
