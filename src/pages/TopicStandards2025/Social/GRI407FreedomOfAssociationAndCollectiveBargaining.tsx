import React from 'react';
import { useNavigate } from 'react-router-dom';

const GRI407FreedomOfAssociationAndCollectiveBargaining: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/topic-standards-2025/social');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <button className="back-btn" onClick={handleBackClick}>← Back</button>
        <div className="page-title">GRI 407: Freedom of Association and Collective Bargaining</div>
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
          <div className="section-title">Freedom of Association and Collective Bargaining</div>
          <div className="gri-reference">GRI 407: Freedom of Association and Collective Bargaining</div>
          <div className="main-heading">
            1. Operations and suppliers at risk for freedom of association rights
            <div className="info-icon">i</div>
          </div>
        </div>
        
        <div className="subsection">
          <div className="subsection-title">
            1.1 Operations and suppliers in which the right to freedom of association and collective bargaining may be at risk.
            <div className="collaboration-icon">👥</div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Operation/Supplier</label>
              <input type="text" className="form-input" placeholder="Enter operation or supplier" />
            </div>
            <div className="form-group">
              <label className="form-label">Risk Level</label>
              <select className="form-select">
                <option>Select Risk Level</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Mitigation Measures</label>
              <input type="text" className="form-input" placeholder="Enter measures taken" />
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

export default GRI407FreedomOfAssociationAndCollectiveBargaining;
