import React from 'react';
import { useNavigate } from 'react-router-dom';

const TopicStandards2025: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/topic-standards-2025/${categoryId}`);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <button className="back-btn" onClick={handleBackClick}>← Back</button>
        <div className="page-title">Topic Standards 2025</div>
      </div>
      <div className="gri-standards-list">
        <div className="gri-standard-item" onClick={() => handleCategoryClick('environmental')}>
          <div className="gri-standard-content">
            <div className="gri-standard-title">Environmental</div>
            <div className="gri-standard-description">Environmental impact standards including biodiversity, climate, energy, water, waste, and emissions</div>
          </div>
          <div className="gri-standard-action">
            <button className="expand-btn">›</button>
          </div>
        </div>
        <div className="gri-standard-item" onClick={() => handleCategoryClick('governance')}>
          <div className="gri-standard-content">
            <div className="gri-standard-title">Governance</div>
            <div className="gri-standard-description">Economic performance, anti-corruption, tax, procurement, and market presence standards</div>
          </div>
          <div className="gri-standard-action">
            <button className="expand-btn">›</button>
          </div>
        </div>
        <div className="gri-standard-item" onClick={() => handleCategoryClick('social')}>
          <div className="gri-standard-content">
            <div className="gri-standard-title">Social</div>
            <div className="gri-standard-description">Employment, health and safety, training, diversity, human rights, and community standards</div>
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
