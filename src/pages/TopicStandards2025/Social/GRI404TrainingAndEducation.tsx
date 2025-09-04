import React from 'react';
import { useNavigate } from 'react-router-dom';

const GRI404TrainingAndEducation: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/topic-standards-2025/social');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <button className="back-btn" onClick={handleBackClick}>← Back</button>
        <div className="page-title">GRI 404: Training and Education</div>
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
          <div className="section-title">Training and Education</div>
          <div className="gri-reference">GRI 404: Training and Education</div>
          <div className="main-heading">
            1. Average hours of training per year per employee
            <div className="info-icon">i</div>
          </div>
        </div>
        
        <div className="subsection">
          <div className="subsection-title">
            1.1 Average hours of training per year per employee by gender and by employee category.
            <div className="collaboration-icon">👥</div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Employee Category</label>
              <input type="text" className="form-input" placeholder="Enter employee category" />
            </div>
            <div className="form-group">
              <label className="form-label">Training Hours</label>
              <input type="text" className="form-input" placeholder="Enter hours" />
            </div>
            <div className="form-group">
              <label className="form-label">Gender</label>
              <select className="form-select">
                <option>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Combined</option>
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

export default GRI404TrainingAndEducation;
