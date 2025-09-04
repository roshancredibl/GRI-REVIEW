import React, { useState } from 'react';
import { Card as CardType } from '../models/questionnaire.types';
import Question from './Question';

interface CardProps {
  card: CardType;
  disabled?: boolean;
  onAnswersChange?: (cardId: string, questionAnswers: Record<string, Record<string, any>>) => void;
  initialAnswers?: Record<string, Record<string, any>>;
  onGuidanceOpen?: (text: string) => void;
}

const Card: React.FC<CardProps> = ({
  card,
  disabled = false,
  onAnswersChange,
  initialAnswers = {},
  onGuidanceOpen
}) => {
  const [questionAnswers, setQuestionAnswers] = useState<Record<string, Record<string, any>>>(initialAnswers);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleQuestionAnswerChange = (questionId: string, answers: Record<string, any>) => {
    const newQuestionAnswers = {
      ...questionAnswers,
      [questionId]: answers
    };
    setQuestionAnswers(newQuestionAnswers);
    onAnswersChange?.(getCardId(), newQuestionAnswers);
  };

  const getCardId = () => `${card.sequence}-${card.title}`;

  if (!card.isActive) {
    return null;
  }

  const shouldShowCard = card.isEnabledForFacility !== false;

  if (!shouldShowCard) {
    return null;
  }

  return (
    <div className="card-container">
      <div className="card-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="card-title-section">
          <h3 className="card-title">{card.title}</h3>
          <div className="card-metadata">
            <span className="card-standards">{card.standards}</span>
            {card.isEnabledForFacility === false && (
              <span className="facility-disabled-badge">Facility Disabled</span>
            )}
          </div>
        </div>
        <button 
          className="expand-btn"
          type="button"
          aria-expanded={isExpanded}
          aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${card.title}`}
        >
          {isExpanded ? '−' : '+'}
        </button>
      </div>
      
      {isExpanded && (
        <div className="card-content">
          <div className="card-description">
            <p>Standards: {card.standards}</p>
            <p>Questions: {card.questions.length}</p>
          </div>
          
          <div className="questions-list">
            {card.questions.map((question) => (
              <Question
                key={question.externalId}
                question={question}
                disabled={disabled}
                onAnswerChange={handleQuestionAnswerChange}
                initialAnswers={questionAnswers[question.externalId] || {}}
                onGuidanceOpen={onGuidanceOpen}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
