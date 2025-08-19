import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleCardClick = (pageId: string) => {
    navigate(`/${pageId}`);
  };

  return (
    <main className="main-content" id="main-dashboard">
      <div className="breadcrumb">ESG &gt; GRI</div>
      
      <div className="cards-grid">
        <div className="card universal" onClick={() => handleCardClick('universal-standards')}>
          <div className="card-header">
            <div className="card-icon">📋</div>
            <div className="card-title">Universal Standards</div>
          </div>
          <div className="card-illustration">
            <div className="illustration-content">🌐📊</div>
          </div>
          <div className="card-description">
            Core GRI standards that apply to all organizations regardless of sector or size.
          </div>
          <div className="card-actions">
            <button className="enter-btn">ENTER</button>
          </div>
        </div>

        <div className="card sector" onClick={() => handleCardClick('sector-standards')}>
          <div className="card-header">
            <div className="card-icon">🏭</div>
            <div className="card-title">Sector Standards</div>
          </div>
          <div className="card-illustration">
            <div className="illustration-content">🏢🏭</div>
          </div>
          <div className="card-description">
            Industry-specific standards that address sector-specific impacts and topics.
          </div>
          <div className="card-actions">
            <button className="enter-btn">ENTER</button>
          </div>
        </div>

        <div className="card topic-2025" onClick={() => handleCardClick('topic-standards-2025')}>
          <div className="card-header">
            <div className="card-icon">📅</div>
            <div className="card-title">Topic Standards 2025</div>
          </div>
          <div className="card-illustration">
            <div className="illustration-content">📋✅</div>
          </div>
          <div className="card-description">
            Material topic standards for 2025 reporting period with updated requirements.
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
