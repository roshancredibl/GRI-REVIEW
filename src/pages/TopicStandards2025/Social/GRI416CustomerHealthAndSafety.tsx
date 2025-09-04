import React from 'react';
import { useNavigate } from 'react-router-dom';

const GRI416CustomerHealthAndSafety: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/topic-standards-2025/social');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <button className="back-btn" onClick={handleBackClick}>← Back</button>
        <div className="page-title">GRI 416: Customer Health and Safety</div>
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
          <div className="section-title">Customer Health and Safety</div>
          <div className="gri-reference">GRI 416: Customer Health and Safety</div>
          <div className="main-heading">
            1. Assessment of the health and safety impacts of product and service categories
            <div className="info-icon">i</div>
          </div>
        </div>
        
        <div className="subsection">
          <div className="subsection-title">
            1.1 Percentage of significant product and service categories for which health and safety impacts are assessed for improvement.
            <div className="collaboration-icon">👥</div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Product/Service Category</label>
              <input type="text" className="form-input" placeholder="Enter category" />
            </div>
            <div className="form-group">
              <label className="form-label">Assessed (%)</label>
              <input type="text" className="form-input" placeholder="Enter percentage" />
            </div>
            <div className="form-group">
              <label className="form-label">Assessment Type</label>
              <select className="form-select">
                <option>Select Type</option>
                <option>Health impact</option>
                <option>Safety impact</option>
                <option>Both</option>
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

export default GRI416CustomerHealthAndSafety;
