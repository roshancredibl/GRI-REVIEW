import React from 'react';
import { useNavigate } from 'react-router-dom';

const GRI11OilAndGasSector2021: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/sector-standards');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <button className="back-btn" onClick={handleBackClick}>← Back</button>
        <div className="page-title">GRI 11: Oil and Gas Sector 2021</div>
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
          <div className="section-title">Oil and Gas Sector</div>
          <div className="gri-reference">GRI 11: Oil and Gas Sector 2021</div>
          <div className="main-heading">
            1. Oil and gas sector specific disclosures
            <div className="info-icon">i</div>
          </div>
        </div>
        
        <div className="subsection">
          <div className="subsection-title">
            1.1 Greenhouse gas emissions from oil and gas operations.
            <div className="collaboration-icon">👥</div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Operation Type</label>
              <select className="form-select">
                <option>Select Type</option>
                <option>Upstream</option>
                <option>Downstream</option>
                <option>Midstream</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Emissions (tCO2e)</label>
              <input type="text" className="form-input" placeholder="Enter emissions" />
            </div>
            <div className="form-group">
              <label className="form-label">Asset Location</label>
              <input type="text" className="form-input" placeholder="Enter location" />
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

export default GRI11OilAndGasSector2021;
