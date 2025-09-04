import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ReportId } from '../../types/report.types';

const UniversalStandards: React.FC = () => {
  const navigate = useNavigate();
  const { reportId } = useParams<{ reportId: ReportId }>();

  const handleBackClick = () => {
    if (reportId) {
      navigate(`/gri/${reportId}/dashboard`);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <button className="back-btn" onClick={handleBackClick}>← Back</button>
        <div className="page-title">Universal Standards</div>
      </div>
      <div className="gri-standards-list">
        <div className="gri-standard-item" onClick={() => reportId && navigate(`/gri/${reportId}/gri-2-general-disclosures`)}>
          <div className="gri-standard-content">
            <div className="gri-standard-title">GRI 2: General Disclosures</div>
            <div className="gri-standard-description">Basic information about the organization and its reporting practices, governance structure, strategy, and stakeholder engagement</div>
          </div>
          <div className="gri-standard-action">
            <button className="expand-btn">›</button>
          </div>
        </div>
        
        <div className="gri-standard-item" onClick={() => reportId && navigate(`/gri/${reportId}/gri-3-material-topic`)}>
          <div className="gri-standard-content">
            <div className="gri-standard-title">GRI 3: Material Topic</div>
            <div className="gri-standard-description">Process for determining material topics and managing material topics</div>
          </div>
          <div className="gri-standard-action">
            <button className="expand-btn">›</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversalStandards;
