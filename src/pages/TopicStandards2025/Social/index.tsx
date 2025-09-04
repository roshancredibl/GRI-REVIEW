import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ReportId } from '../../../types/report.types';

const Social: React.FC = () => {
  const navigate = useNavigate();
  const { reportId } = useParams<{ reportId: ReportId }>();

  const handleBackClick = () => {
    if (reportId) {
      navigate(`/gri/${reportId}/dashboard`);
    }
  };

  const handleStandardClick = (standardId: string) => {
    if (reportId) {
      navigate(`/gri/${reportId}/${standardId}`);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <button className="back-btn" onClick={handleBackClick}>← Back</button>
        <div className="page-title">Social Standards</div>
      </div>
      <div className="gri-standards-list">
        <div className="gri-standard-item" onClick={() => handleStandardClick('gri-401-employment')}>
          <div className="gri-standard-content">
            <div className="gri-standard-title">GRI 401: Employment</div>
            <div className="gri-standard-description">New employee hires and employee turnover</div>
          </div>
          <div className="gri-standard-action">
            <button className="expand-btn">›</button>
          </div>
        </div>
        
        <div className="gri-standard-item" onClick={() => handleStandardClick('gri-402-labor')}>
          <div className="gri-standard-content">
            <div className="gri-standard-title">GRI 402: Labor</div>
            <div className="gri-standard-description">Minimum notice periods regarding operational changes</div>
          </div>
          <div className="gri-standard-action">
            <button className="expand-btn">›</button>
          </div>
        </div>

        <div className="gri-standard-item" onClick={() => handleStandardClick('gri-403-occupational-health-and-safety')}>
          <div className="gri-standard-content">
            <div className="gri-standard-title">GRI 403: Occupational Health and Safety</div>
            <div className="gri-standard-description">Occupational health and safety management system</div>
          </div>
          <div className="gri-standard-action">
            <button className="expand-btn">›</button>
          </div>
        </div>

        <div className="gri-standard-item" onClick={() => handleStandardClick('gri-404-training-and-education')}>
          <div className="gri-standard-content">
            <div className="gri-standard-title">GRI 404: Training and Education</div>
            <div className="gri-standard-description">Average hours of training per year per employee</div>
          </div>
          <div className="gri-standard-action">
            <button className="expand-btn">›</button>
          </div>
        </div>

        <div className="gri-standard-item" onClick={() => handleStandardClick('gri-405-diversity-and-equal-opportunity')}>
          <div className="gri-standard-content">
            <div className="gri-standard-title">GRI 405: Diversity and Equal Opportunity</div>
            <div className="gri-standard-description">Diversity of governance bodies and employees</div>
          </div>
          <div className="gri-standard-action">
            <button className="expand-btn">›</button>
          </div>
        </div>

        <div className="gri-standard-item" onClick={() => handleStandardClick('gri-406-non-discrimination')}>
          <div className="gri-standard-content">
            <div className="gri-standard-title">GRI 406: Non-discrimination</div>
            <div className="gri-standard-description">Incidents of discrimination and corrective actions taken</div>
          </div>
          <div className="gri-standard-action">
            <button className="expand-btn">›</button>
          </div>
        </div>

        <div className="gri-standard-item" onClick={() => handleStandardClick('gri-407-freedom-of-association-and-collective-bargaining')}>
          <div className="gri-standard-content">
            <div className="gri-standard-title">GRI 407: Freedom of Association and Collective Bargaining</div>
            <div className="gri-standard-description">Operations and suppliers in which the right to freedom of association and collective bargaining may be at risk</div>
          </div>
          <div className="gri-standard-action">
            <button className="expand-btn">›</button>
          </div>
        </div>

        <div className="gri-standard-item" onClick={() => handleStandardClick('gri-408-child-labor')}>
          <div className="gri-standard-content">
            <div className="gri-standard-title">GRI 408: Child Labor</div>
            <div className="gri-standard-description">Operations and suppliers at significant risk for incidents of child labor</div>
          </div>
          <div className="gri-standard-action">
            <button className="expand-btn">›</button>
          </div>
        </div>

        <div className="gri-standard-item" onClick={() => handleStandardClick('gri-409-forced-or-compulsory-labor')}>
          <div className="gri-standard-content">
            <div className="gri-standard-title">GRI 409: Forced or Compulsory Labor</div>
            <div className="gri-standard-description">Operations and suppliers at significant risk for incidents of forced or compulsory labor</div>
          </div>
          <div className="gri-standard-action">
            <button className="expand-btn">›</button>
          </div>
        </div>

        <div className="gri-standard-item" onClick={() => handleStandardClick('gri-410-security-practices')}>
          <div className="gri-standard-content">
            <div className="gri-standard-title">GRI 410: Security Practices</div>
            <div className="gri-standard-description">Security personnel trained in human rights policies or procedures</div>
          </div>
          <div className="gri-standard-action">
            <button className="expand-btn">›</button>
          </div>
        </div>

        <div className="gri-standard-item" onClick={() => handleStandardClick('gri-411-rights-of-indigenous-peoples')}>
          <div className="gri-standard-content">
            <div className="gri-standard-title">GRI 411: Rights of Indigenous Peoples</div>
            <div className="gri-standard-description">Incidents of violations involving rights of indigenous peoples</div>
          </div>
          <div className="gri-standard-action">
            <button className="expand-btn">›</button>
          </div>
        </div>

        <div className="gri-standard-item" onClick={() => handleStandardClick('gri-414-supplier-social-assessment')}>
          <div className="gri-standard-content">
            <div className="gri-standard-title">GRI 414: Supplier Social Assessment</div>
            <div className="gri-standard-description">New suppliers that were screened using social criteria</div>
          </div>
          <div className="gri-standard-action">
            <button className="expand-btn">›</button>
          </div>
        </div>

        <div className="gri-standard-item" onClick={() => handleStandardClick('gri-415-public-policy')}>
          <div className="gri-standard-content">
            <div className="gri-standard-title">GRI 415: Public Policy</div>
            <div className="gri-standard-description">Political contributions</div>
          </div>
          <div className="gri-standard-action">
            <button className="expand-btn">›</button>
          </div>
        </div>

        <div className="gri-standard-item" onClick={() => handleStandardClick('gri-416-customer-health-and-safety')}>
          <div className="gri-standard-content">
            <div className="gri-standard-title">GRI 416: Customer Health and Safety</div>
            <div className="gri-standard-description">Assessment of the health and safety impacts of product and service categories</div>
          </div>
          <div className="gri-standard-action">
            <button className="expand-btn">›</button>
          </div>
        </div>

        <div className="gri-standard-item" onClick={() => handleStandardClick('gri-417-marketing-and-labeling')}>
          <div className="gri-standard-content">
            <div className="gri-standard-title">GRI 417: Marketing and Labeling</div>
            <div className="gri-standard-description">Requirements for product and service information and labeling</div>
          </div>
          <div className="gri-standard-action">
            <button className="expand-btn">›</button>
          </div>
        </div>

        <div className="gri-standard-item" onClick={() => handleStandardClick('gri-418-customer-privacy')}>
          <div className="gri-standard-content">
            <div className="gri-standard-title">GRI 418: Customer Privacy</div>
            <div className="gri-standard-description">Substantiated complaints concerning breaches of customer privacy</div>
          </div>
          <div className="gri-standard-action">
            <button className="expand-btn">›</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Social;
