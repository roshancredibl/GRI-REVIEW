import React from 'react';
import { useNavigate } from 'react-router-dom';

const TopicStandards2025: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  const handleStandardClick = (standardId: string) => {
    navigate(`/${standardId}`);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <button className="back-btn" onClick={handleBackClick}>← Back</button>
        <div className="page-title">Topic Standards 2025</div>
      </div>
      <div className="gri-standards-list">
        <div className="gri-standard-item" onClick={() => handleStandardClick('gri-101-biodiversity')}>
          <div className="gri-standard-content">
            <div className="gri-standard-title">GRI 101: Biodiversity 2024</div>
          </div>
          <div className="gri-standard-action">
            <button className="expand-btn">›</button>
          </div>
        </div>
        <div className="gri-standard-item" onClick={() => handleStandardClick('gri-102-climate')}>
          <div className="gri-standard-content">
            <div className="gri-standard-title">GRI 102: Climate Change 2025</div>
          </div>
          <div className="gri-standard-action">
            <button className="expand-btn">›</button>
          </div>
        </div>
        <div className="gri-standard-item" onClick={() => handleStandardClick('gri-103-energy')}>
          <div className="gri-standard-content">
            <div className="gri-standard-title">GRI 103: Energy 2025</div>
          </div>
          <div className="gri-standard-action">
            <button className="expand-btn">›</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicStandards2025;
