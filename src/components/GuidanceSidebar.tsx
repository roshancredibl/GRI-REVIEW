import React from 'react';
import { GuidanceState } from '../hooks/useGuidance';
import { SDGGoal, getSDGsForGRI } from '../config/sdgMappings';

interface GuidanceSidebarProps {
  guidanceState: GuidanceState;
  closeGuidance: () => void;
  griStandard: string;
}

const GuidanceSidebar: React.FC<GuidanceSidebarProps> = ({
  guidanceState,
  closeGuidance,
  griStandard
}) => {
  const sdgGoals = getSDGsForGRI(griStandard);

  return (
    <div className={`guidance-sidebar ${guidanceState.isOpen ? 'open' : ''}`}>
      <div className="guidance-header">
        <div className="guidance-title">Guidance Information</div>
        <button className="close-guidance" onClick={closeGuidance}>×</button>
      </div>
      <div className="guidance-content">
        <div className="guidance-text">{guidanceState.guidanceText}</div>
        <div className="sdg-linkage-section">
          <h4>SDG Linkage</h4>
          <div className="sdg-linkage-content">
            {sdgGoals.map((sdg: SDGGoal) => (
              <div key={sdg.number} className="sdg-goal">
                <div className="sdg-number">{sdg.number}</div>
                <div className="sdg-title">{sdg.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidanceSidebar;