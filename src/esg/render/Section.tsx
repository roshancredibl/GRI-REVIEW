import React, { useState } from 'react';
import { Section as SectionType } from '../models/questionnaire.types';
import Card from './Card';

interface SectionProps {
  section: SectionType;
  disabled?: boolean;
  onAnswersChange?: (sectionId: string, cardAnswers: Record<string, Record<string, Record<string, any>>>) => void;
  initialAnswers?: Record<string, Record<string, Record<string, any>>>;
  onGuidanceOpen?: (text: string) => void;
}

const Section: React.FC<SectionProps> = ({
  section,
  disabled = false,
  onAnswersChange,
  initialAnswers = {},
  onGuidanceOpen
}) => {
  const [cardAnswers, setCardAnswers] = useState<Record<string, Record<string, Record<string, any>>>>(initialAnswers);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleCardAnswersChange = (cardId: string, questionAnswers: Record<string, Record<string, any>>) => {
    const newCardAnswers = {
      ...cardAnswers,
      [cardId]: questionAnswers
    };
    setCardAnswers(newCardAnswers);
    onAnswersChange?.(section.externalId, newCardAnswers);
  };

  // Filter active cards
  const activeCards = section.cards.filter(card => card.isActive);

  if (activeCards.length === 0) {
    return (
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">{section.title}</h2>
        </div>
        <div className="section-content">
          <div className="no-content-notice">
            No active cards available for this section.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-container">
      <div className="section-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="section-title-area">
          <h2 className="section-title">{section.title}</h2>
          {section.description && (
            <p className="section-description">{section.description}</p>
          )}
          <div className="section-metadata">
            <span className="section-sequence">Section {section.sequence}</span>
            <span className="cards-count">{activeCards.length} cards</span>
          </div>
        </div>
        <button 
          className="section-expand-btn"
          type="button"
          aria-expanded={isExpanded}
          aria-label={`${isExpanded ? 'Collapse' : 'Expand'} section ${section.title}`}
        >
          {isExpanded ? '▼' : '▶'}
        </button>
      </div>

      {isExpanded && (
        <div className="section-content">
          {section.cards.length === 0 ? (
            <div className="empty-section">
              <p>No cards available in this section.</p>
            </div>
          ) : (
            <div className="cards-list">
              {activeCards.map((card) => (
                <Card
                  key={`${card.sequence}-${card.title}`}
                  card={card}
                  disabled={disabled}
                  onAnswersChange={handleCardAnswersChange}
                  initialAnswers={cardAnswers[`${card.sequence}-${card.title}`] || {}}
                  onGuidanceOpen={onGuidanceOpen}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Section;
