import React from 'react';
import { useNavigate } from 'react-router-dom';

const GRI206AntiCompetitiveBehavior: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/topic-standards-2025/governance');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <button className="back-btn" onClick={handleBackClick}>← Back</button>
        <div className="page-title">GRI 206: Anti-competitive Behavior</div>
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
          <div className="section-title">Anti-competitive Behavior</div>
          <div className="gri-reference">GRI 206: Anti-competitive Behavior</div>
          <div className="main-heading">
            1. Legal actions for anti-competitive behavior
            <div className="info-icon">i</div>
          </div>
        </div>
        
        <div className="subsection">
          <div className="subsection-title">
            1.1 Legal actions for anti-competitive behavior, anti-trust, and monopoly practices.
            <div className="collaboration-icon">👥</div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Legal Action Type</label>
              <input type="text" className="form-input" placeholder="Enter action type" />
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select className="form-select">
                <option>Select Status</option>
                <option>Pending</option>
                <option>Ongoing</option>
                <option>Completed</option>
                <option>Dismissed</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Outcome</label>
              <input type="text" className="form-input" placeholder="Enter outcome" />
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

export default GRI206AntiCompetitiveBehavior;
