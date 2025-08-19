import React, { useState, useEffect } from 'react';

interface SDGGoal {
  number: string;
  title: string;
}

interface GuidanceSidebarProps {
  isOpen: boolean;
  guidanceText: string;
  onClose: () => void;
}

const GuidanceSidebar: React.FC<GuidanceSidebarProps> = ({ isOpen, guidanceText, onClose }) => {
  const [sdgLinkage, setSdgLinkage] = useState<SDGGoal[]>([]);

  useEffect(() => {
    if (guidanceText) {
      const linkage = getSDGLinkage(guidanceText);
      setSdgLinkage(linkage);
    }
  }, [guidanceText]);

  const getSDGLinkage = (text: string): SDGGoal[] => {
    const sdgMapping: { [key: string]: SDGGoal[] } = {
      'biodiversity loss': [
        { number: '15', title: 'Life on Land' },
        { number: '14', title: 'Life Below Water' }
      ],
      'biodiversity': [
        { number: '15', title: 'Life on Land' },
        { number: '14', title: 'Life Below Water' }
      ],
      'ecosystem': [
        { number: '15', title: 'Life on Land' },
        { number: '14', title: 'Life Below Water' }
      ],
      'species': [
        { number: '15', title: 'Life on Land' },
        { number: '14', title: 'Life Below Water' }
      ],
      'habitat': [
        { number: '15', title: 'Life on Land' },
        { number: '14', title: 'Life Below Water' }
      ],
      'Access and Benefit Sharing Compliance Process': [
        { number: '15', title: 'Life on Land' },
        { number: '10', title: 'Reduced Inequalities' },
        { number: '16', title: 'Peace, Justice and Strong Institutions' }
      ],
      'access and benefit-sharing': [
        { number: '15', title: 'Life on Land' },
        { number: '10', title: 'Reduced Inequalities' },
        { number: '16', title: 'Peace, Justice and Strong Institutions' }
      ],
      'compliance': [
        { number: '16', title: 'Peace, Justice and Strong Institutions' },
        { number: '17', title: 'Partnerships for the Goals' }
      ],
      'training': [
        { number: '4', title: 'Quality Education' },
        { number: '8', title: 'Decent Work and Economic Growth' }
      ],
      'responsibility': [
        { number: '16', title: 'Peace, Justice and Strong Institutions' },
        { number: '12', title: 'Responsible Consumption and Production' }
      ],
      'organizational strategies': [
        { number: '12', title: 'Responsible Consumption and Production' },
        { number: '17', title: 'Partnerships for the Goals' }
      ],
      'operational policies': [
        { number: '12', title: 'Responsible Consumption and Production' },
        { number: '16', title: 'Peace, Justice and Strong Institutions' }
      ],
      'provider countries': [
        { number: '10', title: 'Reduced Inequalities' },
        { number: '17', title: 'Partnerships for the Goals' }
      ]
    };

    const matchedSDGs = new Set<string>();
    const uniqueSDGs: SDGGoal[] = [];

    for (const [keyword, sdgs] of Object.entries(sdgMapping)) {
      if (text.toLowerCase().includes(keyword.toLowerCase())) {
        sdgs.forEach(sdg => {
          const sdgKey = `${sdg.number}-${sdg.title}`;
          if (!matchedSDGs.has(sdgKey)) {
            matchedSDGs.add(sdgKey);
            uniqueSDGs.push(sdg);
          }
        });
      }
    }

    return uniqueSDGs;
  };

  return (
    <div className={`guidance-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="guidance-header">
        <div className="guidance-title">Guidance Information</div>
        <button className="close-guidance" onClick={onClose}>×</button>
      </div>
      <div className="guidance-content">
        <div className="guidance-text">{guidanceText}</div>
        <div className="sdg-linkage-section">
          <h4>SDG Linkage</h4>
          <div className="sdg-linkage-content">
            {sdgLinkage.length > 0 ? (
              sdgLinkage.map((sdg, index) => (
                <div key={index} className="sdg-goal">
                  <div className="sdg-number">{sdg.number}</div>
                  <div className="sdg-title">{sdg.title}</div>
                </div>
              ))
            ) : (
              <p style={{ color: '#666', fontStyle: 'italic' }}>
                No specific SDG linkage identified for this question.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidanceSidebar;
