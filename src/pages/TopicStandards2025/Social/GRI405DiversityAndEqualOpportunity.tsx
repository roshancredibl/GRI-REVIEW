import React from 'react';
import { useNavigate } from 'react-router-dom';

const GRI405DiversityAndEqualOpportunity: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/topic-standards-2025/social');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <button className="back-btn" onClick={handleBackClick}>← Back</button>
        <div className="page-title">GRI 405: Diversity and Equal Opportunity</div>
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
          <div className="section-title">Diversity and Equal Opportunity</div>
          <div className="gri-reference">GRI 405: Diversity and Equal Opportunity</div>
          <div className="main-heading">
            1. Diversity of governance bodies and employees
            <div className="info-icon">i</div>
          </div>
        </div>
        
        <div className="subsection">
          <div className="subsection-title">
            1.1 Diversity of governance bodies and employees by gender, age group, and other indicators of diversity.
            <div className="collaboration-icon">👥</div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Governance Level</label>
              <select className="form-select">
                <option>Select Level</option>
                <option>Board of Directors</option>
                <option>Senior Management</option>
                <option>Middle Management</option>
                <option>All Employees</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Gender Distribution (%)</label>
              <input type="text" className="form-input" placeholder="Enter percentage" />
            </div>
            <div className="form-group">
              <label className="form-label">Age Group</label>
              <select className="form-select">
                <option>Select Age Group</option>
                <option>Under 30</option>
                <option>30-50</option>
                <option>Over 50</option>
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

export default GRI405DiversityAndEqualOpportunity;
