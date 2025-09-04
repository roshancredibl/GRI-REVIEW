import React from 'react';
import { useNavigate } from 'react-router-dom';

const Governance: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/gri/dashboard');
  };

  const handleStandardClick = (standardId: string) => {
    navigate(`/${standardId}`);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <button className="back-btn" onClick={handleBackClick}>← Back</button>
        <div className="page-title">Governance Standards</div>
      </div>
      <div className="gri-standards-list">
        <div className="gri-standard-item" onClick={() => handleStandardClick('gri-201-economic-performance')}>
          <div className="gri-standard-content">
            <div className="gri-standard-title">GRI 201: Economic Performance</div>
            <div className="gri-standard-description">Direct economic value generated and distributed</div>
          </div>
          <div className="gri-standard-action">
            <button className="expand-btn">›</button>
          </div>
        </div>
        
        <div className="gri-standard-item" onClick={() => handleStandardClick('gri-202-market-presence-impact')}>
          <div className="gri-standard-content">
            <div className="gri-standard-title">GRI 202: Market Presence Impact</div>
            <div className="gri-standard-description">Ratios of standard entry level wage by gender</div>
          </div>
          <div className="gri-standard-action">
            <button className="expand-btn">›</button>
          </div>
        </div>

        <div className="gri-standard-item" onClick={() => handleStandardClick('gri-203-indirect-economic-impacts')}>
          <div className="gri-standard-content">
            <div className="gri-standard-title">GRI 203: Indirect Economic Impacts</div>
            <div className="gri-standard-description">Infrastructure investments and services supported</div>
          </div>
          <div className="gri-standard-action">
            <button className="expand-btn">›</button>
          </div>
        </div>

        <div className="gri-standard-item" onClick={() => handleStandardClick('gri-204-procurement-practices')}>
          <div className="gri-standard-content">
            <div className="gri-standard-title">GRI 204: Procurement Practices</div>
            <div className="gri-standard-description">Proportion of spending on local suppliers</div>
          </div>
          <div className="gri-standard-action">
            <button className="expand-btn">›</button>
          </div>
        </div>

        <div className="gri-standard-item" onClick={() => handleStandardClick('gri-205-anti-corruption')}>
          <div className="gri-standard-content">
            <div className="gri-standard-title">GRI 205: Anti-corruption</div>
            <div className="gri-standard-description">Operations assessed for risks related to corruption</div>
          </div>
          <div className="gri-standard-action">
            <button className="expand-btn">›</button>
          </div>
        </div>

        <div className="gri-standard-item" onClick={() => handleStandardClick('gri-206-anti-competitive-behavior')}>
          <div className="gri-standard-content">
            <div className="gri-standard-title">GRI 206: Anti-competitive Behavior</div>
            <div className="gri-standard-description">Legal actions for anti-competitive behavior</div>
          </div>
          <div className="gri-standard-action">
            <button className="expand-btn">›</button>
          </div>
        </div>

        <div className="gri-standard-item" onClick={() => handleStandardClick('gri-207-tax')}>
          <div className="gri-standard-content">
            <div className="gri-standard-title">GRI 207: Tax</div>
            <div className="gri-standard-description">Tax governance, control, and risk management</div>
          </div>
          <div className="gri-standard-action">
            <button className="expand-btn">›</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Governance;
