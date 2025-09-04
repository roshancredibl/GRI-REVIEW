import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useReportContext } from '../contexts/ReportContext';
import { ReportId } from '../types/report.types';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { reportId } = useParams<{ reportId: ReportId }>();
  const { setCurrentReport, currentReport } = useReportContext();

  useEffect(() => {
    if (reportId) {
      setCurrentReport(reportId);
    }
  }, [reportId, setCurrentReport]);

  const currentReportName = currentReport?.name || 'GRI Report';

  const handleCardClick = (pageId: string) => {
    if (reportId) {
      navigate(`/gri/${reportId}/${pageId}`);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleBackToReports = () => {
    navigate('/gri');
  };

  return (
    <main className="main-content" id="main-dashboard">
      <div className="dashboard-header">
        <div className="breadcrumb">
          <span className="breadcrumb-link" onClick={handleBackToHome}>ESG</span>
          <span className="breadcrumb-separator"> &gt; </span>
          <span className="breadcrumb-current">{currentReportName}</span>
        </div>
        <button className="back-to-reports-btn" onClick={handleBackToReports}>
          ← Back to Reports
        </button>
      </div>
      
      <div className="esg-section">
        <div className="esg-cards-grid">
          <div className="card environmental" onClick={() => handleCardClick('topic-standards-2025/environmental')}>
            <div className="card-header environmental-header">
              <div className="card-icon">🌱</div>
              <div className="card-title">ENVIRONMENTAL</div>
            </div>
            <div className="card-illustration">
              <div className="illustration-content environmental-illustration">🌳🔄♻️</div>
            </div>
            <div className="card-description">
              Environmental criteria refers to an organization's environmental impacts & risk management practices.
            </div>
            <div className="card-actions">
              <button className="enter-btn">ENTER</button>
            </div>
          </div>

          <div className="card social" onClick={() => handleCardClick('topic-standards-2025/social')}>
            <div className="card-header social-header">
              <div className="card-icon">👥</div>
              <div className="card-title">SOCIAL</div>
            </div>
            <div className="card-illustration">
              <div className="illustration-content social-illustration">👨‍👩‍👧‍👦🤝💼</div>
            </div>
            <div className="card-description">
              Social criteria looks at how the company treats it's people, and concentrates on.
            </div>
            <div className="card-actions">
              <button className="enter-btn">ENTER</button>
            </div>
          </div>

          <div className="card governance" onClick={() => handleCardClick('topic-standards-2025/governance')}>
            <div className="card-header governance-header">
              <div className="card-icon">⚖️</div>
              <div className="card-title">GOVERNANCE</div>
            </div>
            <div className="card-illustration">
              <div className="illustration-content governance-illustration">🏛️⚖️📋</div>
            </div>
            <div className="card-description">
              Governance criteria examines how a corporation polices itself how the company is governed.
            </div>
            <div className="card-actions">
              <button className="enter-btn">ENTER</button>
            </div>
          </div>
        </div>
      </div>

      <div className="gri-section">
        <div className="card gri-card" onClick={() => handleCardClick('universal-standards')}>
          <div className="card-header gri-header">
            <div className="card-icon">📊</div>
            <div className="card-title">GRI</div>
          </div>
          <div className="card-illustration">
            <div className="illustration-content gri-illustration">📄📚📋</div>
          </div>
          <div className="card-description">
            General Disclosures, Material Topic
          </div>
          <div className="card-actions">
            <button className="enter-btn">ENTER</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
