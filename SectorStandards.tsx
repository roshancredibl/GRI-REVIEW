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
      <div className="questions-grid">
        <div className="question-card">
          <div className="question-number">1</div>
          <div className="question-title">Oil and Gas Sector</div>
          <div className="question-description">Specific disclosures for oil and gas industry operations and impacts.</div>
        </div>
        <div className="question-card">
          <div className="question-number">2</div>
          <div className="question-title">Coal Sector</div>
          <div className="question-description">Disclosures specific to coal mining and processing operations.</div>
        </div>
        <div className="question-card">
          <div className="question-number">3</div>
          <div className="question-title">Agriculture, Aquaculture and Fishing</div>
          <div className="question-description">Standards for agricultural and fishing industry sustainability.</div>
        </div>
        <div className="question-card">
          <div className="question-number">4</div>
          <div className="question-title">Mining and Metals</div>
          <div className="question-description">Specific requirements for mining and metals processing.</div>
        </div>
        <div className="question-card">
          <div className="question-number">5</div>
          <div className="question-title">Financial Services</div>
          <div className="question-description">Banking, insurance, and investment services sector standards.</div>
        </div>
        <div className="question-card">
          <div className="question-number">6</div>
          <div className="question-title">Textiles and Apparel</div>
          <div className="question-description">Fashion and textile industry specific disclosures.</div>
        </div>
      </div>
    </div>
  );
};

export default SectorStandards;
