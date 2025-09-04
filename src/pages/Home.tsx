import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleGRIClick = () => {
    navigate('/gri');
  };

  const frameworks = [
    {
      id: 'gri',
      title: 'GRI',
      fullName: 'Global Reporting Initiative Standards Framework',
      description: 'Report on the Global Reporting Initiative Standards framework.',
      icon: '📊',
      color: '#007bff',
      clickable: true
    },
    {
      id: 'brsr',
      title: 'BRSR',
      fullName: 'Business Responsibility and Sustainability Reporting Framework',
      description: 'Report on the Business Responsibility and Sustainability Reporting framework.',
      icon: '📋',
      color: '#6c757d',
      clickable: false
    },
    {
      id: 'tcfd',
      title: 'T.C.F.D',
      fullName: 'Task force on Climate-related Financial Disclosures',
      description: 'Task force on Climate-related Financial Disclosures.',
      icon: '🌡️',
      color: '#6c757d',
      clickable: false
    },
    {
      id: 'esrs',
      title: 'ESRS',
      fullName: 'European Sustainability Reporting Standards',
      description: 'Report on European Sustainability Reporting Standards.',
      icon: '🇪🇺',
      color: '#6c757d',
      clickable: false
    },
    {
      id: 'ecovadis',
      title: 'Ecovadis',
      fullName: 'EcoVadis Assessment',
      description: 'EcoVadis is a global assessment that rates businesses\' sustainability.',
      icon: '✅',
      color: '#6c757d',
      clickable: false
    },
    {
      id: 'djsi',
      title: 'DJSI',
      fullName: 'Dow Jones Sustainability Index',
      description: 'Dow Jones Sustainability Index - A global benchmark for corporate sustainability.',
      icon: '📈',
      color: '#6c757d',
      clickable: false
    }
  ];

  return (
    <div className="home-page-container">
      <div className="home-content">
        <div className="home-header">
          <div className="logo-section">
            <div className="app-logo">📊</div>
            <h1>ESG Reporting Frameworks</h1>
          </div>
          <p className="subtitle">Choose your sustainability reporting framework to get started</p>
        </div>
        
        <div className="frameworks-section">
          <div className="frameworks-grid">
            {frameworks.map((framework) => (
              <div 
                key={framework.id}
                className={`framework-card ${framework.clickable ? 'clickable' : 'disabled'}`}
                onClick={framework.clickable && framework.id === 'gri' ? handleGRIClick : undefined}
              >
                <div className="card-header">
                  <div className="framework-icon">
                    {framework.icon}
                  </div>
                  <h3 className="framework-title">{framework.title}</h3>
                </div>
                
                <div className="framework-content">
                  <p className="framework-full-name">{framework.fullName}</p>
                  <p className="framework-description">{framework.description}</p>
                </div>
                
                <div className="framework-action">
                  {framework.clickable ? (
                    <button className="enter-btn">
                      Get Started
                      <span className="btn-arrow">→</span>
                    </button>
                  ) : (
                    <span className="coming-soon">
                      <span className="coming-soon-icon">🚧</span>
                      Coming Soon
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
