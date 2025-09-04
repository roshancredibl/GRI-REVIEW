import React from 'react';
import { useNavigate } from 'react-router-dom';

const GRI207Tax: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/topic-standards-2025/governance');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <button className="back-btn" onClick={handleBackClick}>← Back</button>
        <div className="page-title">GRI 207: Tax</div>
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
          <div className="section-title">Tax</div>
          <div className="gri-reference">GRI 207: Tax</div>
          <div className="main-heading">
            1. Tax governance, control, and risk management
            <div className="info-icon">i</div>
          </div>
        </div>
        
        <div className="subsection">
          <div className="subsection-title">
            1.1 Tax governance, control, and risk management approach.
            <div className="collaboration-icon">👥</div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Tax Jurisdiction</label>
              <input type="text" className="form-input" placeholder="Enter jurisdiction" />
            </div>
            <div className="form-group">
              <label className="form-label">Tax Paid (millions)</label>
              <input type="text" className="form-input" placeholder="Enter amount" />
            </div>
            <div className="form-group">
              <label className="form-label">Tax Type</label>
              <select className="form-select">
                <option>Select Type</option>
                <option>Corporate Income Tax</option>
                <option>VAT/Sales Tax</option>
                <option>Property Tax</option>
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

export default GRI207Tax;
