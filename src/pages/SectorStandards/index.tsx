import React from 'react';
import { useNavigate } from 'react-router-dom';

const SectorStandards: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <button className="back-btn" onClick={handleBackClick}>← Back</button>
        <div className="page-title">Sector Standards</div>
      </div>
      <div className="gri-standards-list">
        <div className="gri-standard-item" onClick={() => navigate('/gri-11-oil-and-gas-sector-2021')}>
          <div className="gri-standard-content">
            <div className="gri-standard-title">GRI 11: Oil and Gas Sector 2021</div>
            <div className="gri-standard-description">Specific disclosures for oil and gas industry operations and impacts</div>
          </div>
          <div className="gri-standard-action">
            <button className="expand-btn">›</button>
          </div>
        </div>
        
        <div className="gri-standard-item" onClick={() => navigate('/gri-12-coal-sector-2022')}>
          <div className="gri-standard-content">
            <div className="gri-standard-title">GRI 12: Coal Sector 2022</div>
            <div className="gri-standard-description">Disclosures specific to coal mining and processing operations</div>
          </div>
          <div className="gri-standard-action">
            <button className="expand-btn">›</button>
          </div>
        </div>

        <div className="gri-standard-item" onClick={() => navigate('/gri-13-agriculture-aquaculture-and-fishing-sectors-2022')}>
          <div className="gri-standard-content">
            <div className="gri-standard-title">GRI 13: Agriculture, Aquaculture and Fishing Sectors 2022</div>
            <div className="gri-standard-description">Standards for agricultural and fishing industry sustainability</div>
          </div>
          <div className="gri-standard-action">
            <button className="expand-btn">›</button>
          </div>
        </div>

        <div className="gri-standard-item" onClick={() => navigate('/gri-14-mining-sector')}>
          <div className="gri-standard-content">
            <div className="gri-standard-title">GRI 14: Mining sector</div>
            <div className="gri-standard-description">Specific requirements for mining and metals processing</div>
          </div>
          <div className="gri-standard-action">
            <button className="expand-btn">›</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectorStandards;
