import React from 'react';
import { useNavigate } from 'react-router-dom';

const UniversalStandards: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <button className="back-btn" onClick={handleBackClick}>← Back</button>
        <div className="page-title">Universal Standards</div>
      </div>
      <div className="questions-grid">
        <div className="question-card">
          <div className="question-number">1</div>
          <div className="question-title">General Disclosures</div>
          <div className="question-description">Basic information about the organization and its reporting practices.</div>
        </div>
        <div className="question-card">
          <div className="question-number">2</div>
          <div className="question-title">Material Topics</div>
          <div className="question-description">Process for determining material topics and their boundaries.</div>
        </div>
        <div className="question-card">
          <div className="question-number">3</div>
          <div className="question-title">Stakeholder Engagement</div>
          <div className="question-description">Approach to stakeholder engagement and identification of stakeholders.</div>
        </div>
        <div className="question-card">
          <div className="question-number">4</div>
          <div className="question-title">Reporting Practice</div>
          <div className="question-description">Information about the organization's reporting practices and policies.</div>
        </div>
        <div className="question-card">
          <div className="question-number">5</div>
          <div className="question-title">Governance</div>
          <div className="question-description">Governance structure and composition, including committees.</div>
        </div>
        <div className="question-card">
          <div className="question-number">6</div>
          <div className="question-title">Strategy and Analysis</div>
          <div className="question-description">Organization's strategy and analysis of sustainability performance.</div>
        </div>
      </div>
    </div>
  );
};

export default UniversalStandards;
