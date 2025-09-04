import React from 'react';
import { useNavigate } from 'react-router-dom';

const GRI13AgricultureAquacultureAndFishingSectors2022: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/sector-standards');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <button className="back-btn" onClick={handleBackClick}>← Back</button>
        <div className="page-title">GRI 13: Agriculture, Aquaculture and Fishing Sectors 2022</div>
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
          <div className="section-title">Agriculture, Aquaculture and Fishing Sectors</div>
          <div className="gri-reference">GRI 13: Agriculture, Aquaculture and Fishing Sectors 2022</div>
          <div className="main-heading">
            1. Agricultural sustainability and fishing practices
            <div className="info-icon">i</div>
          </div>
        </div>
        
        <div className="subsection">
          <div className="subsection-title">
            1.1 Sustainable farming and fishing practices.
            <div className="collaboration-icon">👥</div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Production Volume</label>
              <input type="text" className="form-input" placeholder="Enter volume" />
            </div>
            <div className="form-group">
              <label className="form-label">Sector Type</label>
              <select className="form-select">
                <option>Select Type</option>
                <option>Agriculture</option>
                <option>Aquaculture</option>
                <option>Fishing</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Sustainability Certification</label>
              <input type="text" className="form-input" placeholder="Enter certification" />
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

export default GRI13AgricultureAquacultureAndFishingSectors2022;
