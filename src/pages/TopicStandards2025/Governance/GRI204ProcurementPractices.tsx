import React from 'react';
import { useNavigate } from 'react-router-dom';

const GRI204ProcurementPractices: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/topic-standards-2025/governance');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <button className="back-btn" onClick={handleBackClick}>← Back</button>
        <div className="page-title">GRI 204: Procurement Practices</div>
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
          <div className="section-title">Procurement Practices</div>
          <div className="gri-reference">GRI 204: Procurement Practices</div>
          <div className="main-heading">
            1. Proportion of spending on local suppliers
            <div className="info-icon">i</div>
          </div>
        </div>
        
        <div className="subsection">
          <div className="subsection-title">
            1.1 Proportion of spending on local suppliers at significant locations of operation.
            <div className="collaboration-icon">👥</div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Location</label>
              <input type="text" className="form-input" placeholder="Enter location" />
            </div>
            <div className="form-group">
              <label className="form-label">Local Spending (%)</label>
              <input type="text" className="form-input" placeholder="Enter percentage" />
            </div>
            <div className="form-group">
              <label className="form-label">Total Spending</label>
              <input type="text" className="form-input" placeholder="Enter amount" />
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

export default GRI204ProcurementPractices;
