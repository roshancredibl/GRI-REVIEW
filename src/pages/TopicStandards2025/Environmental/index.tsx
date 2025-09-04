import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ReportId } from '../../../types/report.types';

const Environmental: React.FC = () => {
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
        <div className="page-title">Environmental Standards</div>
      </div>
      <div className="gri-standards-list">
        <div className="gri-standard-item" onClick={() => handleStandardClick('gri-301-materials')}>
          <div className="gri-standard-content">
            <div className="gri-standard-title">GRI 301: Materials</div>
            <div className="gri-standard-description">Materials used by weight or volume</div>
          </div>
          <div className="gri-standard-action">
            <button className="expand-btn">›</button>
          </div>
        </div>
        
        <div className="gri-standard-item" onClick={() => handleStandardClick('gri-302-energy')}>
          <div className="gri-standard-content">
            <div className="gri-standard-title">GRI 302: Energy</div>
            <div className="gri-standard-description">Energy consumption within the organization</div>
          </div>
          <div className="gri-standard-action">
            <button className="expand-btn">›</button>
          </div>
        </div>

        <div className="gri-standard-item" onClick={() => handleStandardClick('gri-303-water')}>
          <div className="gri-standard-content">
            <div className="gri-standard-title">GRI 303: Water</div>
            <div className="gri-standard-description">Water withdrawal, discharge and consumption</div>
          </div>
          <div className="gri-standard-action">
            <button className="expand-btn">›</button>
          </div>
        </div>

        <div className="gri-standard-item" onClick={() => handleStandardClick('gri-304-biodiversity')}>
          <div className="gri-standard-content">
            <div className="gri-standard-title">GRI 304: Biodiversity</div>
            <div className="gri-standard-description">Operational sites in or adjacent to protected areas</div>
          </div>
          <div className="gri-standard-action">
            <button className="expand-btn">›</button>
          </div>
        </div>

        <div className="gri-standard-item" onClick={() => handleStandardClick('gri-305-emission')}>
          <div className="gri-standard-content">
            <div className="gri-standard-title">GRI 305: Emission</div>
            <div className="gri-standard-description">Direct and indirect greenhouse gas emissions</div>
          </div>
          <div className="gri-standard-action">
            <button className="expand-btn">›</button>
          </div>
        </div>

        <div className="gri-standard-item" onClick={() => handleStandardClick('gri-306-waste')}>
          <div className="gri-standard-content">
            <div className="gri-standard-title">GRI 306: Waste</div>
            <div className="gri-standard-description">Waste generation and disposal methods</div>
          </div>
          <div className="gri-standard-action">
            <button className="expand-btn">›</button>
          </div>
        </div>

        <div className="gri-standard-item" onClick={() => handleStandardClick('gri-308-supplier-environmental-assessment')}>
          <div className="gri-standard-content">
            <div className="gri-standard-title">GRI 308: Supplier Environmental Assessment</div>
            <div className="gri-standard-description">Environmental screening of suppliers</div>
          </div>
          <div className="gri-standard-action">
            <button className="expand-btn">›</button>
          </div>
        </div>

        {/* 2024-2025 Updated Standards */}
        <div className="section-divider">
          <div className="section-title">Updated Standards 2024-2025</div>
        </div>

        <div className="gri-standard-item" onClick={() => handleStandardClick('gri-101-biodiversity')}>
          <div className="gri-standard-content">
            <div className="gri-standard-title">GRI 101: Biodiversity 2024</div>
            <div className="gri-standard-description">Updated biodiversity impacts and dependencies</div>
          </div>
          <div className="gri-standard-action">
            <button className="expand-btn">›</button>
          </div>
        </div>

        <div className="gri-standard-item" onClick={() => handleStandardClick('gri-102-climate')}>
          <div className="gri-standard-content">
            <div className="gri-standard-title">GRI 102: Climate Change 2025</div>
            <div className="gri-standard-description">Climate-related risks and opportunities</div>
          </div>
          <div className="gri-standard-action">
            <button className="expand-btn">›</button>
          </div>
        </div>

        <div className="gri-standard-item" onClick={() => handleStandardClick('gri-103-energy')}>
          <div className="gri-standard-content">
            <div className="gri-standard-title">GRI 103: Energy 2025</div>
            <div className="gri-standard-description">Updated energy consumption and efficiency</div>
          </div>
          <div className="gri-standard-action">
            <button className="expand-btn">›</button>
          </div>
        </div>

        {/* Mining Sector Specific Environmental Disclosures - Only visible for GRI-14 */}
        {reportId === 'GRI-14' && (
          <>
            <div className="section-divider">
              <div className="section-title">Mining Sector Specific Environmental Disclosures</div>
            </div>

            <div className="gri-standard-item" onClick={() => handleStandardClick('gri-14-mining-sector-environmental')}>
              <div className="gri-standard-content">
                <div className="gri-standard-title">GRI 14: Mining Sector - Environmental Disclosures</div>
                <div className="gri-standard-description">Land disturbance and rehabilitation, mine closure, waste and hazardous materials management</div>
              </div>
              <div className="gri-standard-action">
                <button className="expand-btn">›</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Environmental;
