import React from 'react';
import { useNavigate } from 'react-router-dom';

const GRI418CustomerPrivacy: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/topic-standards-2025/social');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <button className="back-btn" onClick={handleBackClick}>← Back</button>
        <div className="page-title">GRI 418: Customer Privacy</div>
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
          <div className="section-title">Customer Privacy</div>
          <div className="gri-reference">GRI 418: Customer Privacy</div>
          <div className="main-heading">
            1. Substantiated complaints concerning breaches of customer privacy
            <div className="info-icon">i</div>
          </div>
        </div>
        
        <div className="subsection">
          <div className="subsection-title">
            1.1 Total number of substantiated complaints concerning breaches of customer privacy and losses of customer data.
            <div className="collaboration-icon">👥</div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Complaint Type</label>
              <select className="form-select">
                <option>Select Type</option>
                <option>Privacy breach</option>
                <option>Data loss</option>
                <option>Unauthorized access</option>
                <option>Data misuse</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Number of Complaints</label>
              <input type="text" className="form-input" placeholder="Enter number" />
            </div>
            <div className="form-group">
              <label className="form-label">Resolution Status</label>
              <select className="form-select">
                <option>Select Status</option>
                <option>Resolved</option>
                <option>Under investigation</option>
                <option>Pending</option>
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

export default GRI418CustomerPrivacy;
