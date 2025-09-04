import React, { useState, useEffect } from 'react';
import { Questionnaire, ParseError } from '../models/questionnaire.types';
import { getQuestionnaireSummary } from '../parsers/ingestQuestionnaire';
import Section from './Section';

interface QuestionnaireRendererProps {
  questionnaire: Questionnaire;
  errors?: ParseError[];
  disabled?: boolean;
  onAnswersChange?: (answers: Record<string, any>) => void;
  loading?: boolean;
  title?: string;
  showSummary?: boolean;
  onGuidanceOpen?: (text: string) => void;
}

const QuestionnaireRenderer: React.FC<QuestionnaireRendererProps> = ({
  questionnaire,
  errors = [],
  disabled = false,
  onAnswersChange,
  onGuidanceOpen,
  loading = false,
  title,
  showSummary = false
}) => {
  const [allAnswers, setAllAnswers] = useState<Record<string, any>>({});
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    onAnswersChange?.(allAnswers);
  }, [allAnswers, onAnswersChange]);

  const handleSectionAnswersChange = (sectionId: string, sectionAnswers: Record<string, any>) => {
    const newAnswers = {
      ...allAnswers,
      [sectionId]: sectionAnswers
    };
    setAllAnswers(newAnswers);
  };

  const summary = getQuestionnaireSummary(questionnaire);

  if (loading) {
    return (
      <div className="questionnaire-loading">
        <div className="loading-spinner">Loading questionnaire...</div>
      </div>
    );
  }

  return (
    <div className="questionnaire-container">
      {/* Header */}
      <div className="questionnaire-header">
        {title && <h1 className="questionnaire-title">{title}</h1>}
        
        {showSummary && (
          <div className="questionnaire-summary">
            <div className="summary-item">
              <span className="summary-label">Framework:</span>
              <span className="summary-value">{summary.reportType}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Sections:</span>
              <span className="summary-value">{summary.totalSections}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Cards:</span>
              <span className="summary-value">{summary.totalCards}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Questions:</span>
              <span className="summary-value">{summary.totalQuestions}</span>
            </div>
          </div>
        )}
        
        {/* Error reporting */}
        {errors.length > 0 && (
          <div className="questionnaire-errors">
            <button 
              className="errors-toggle"
              onClick={() => setShowErrors(!showErrors)}
              type="button"
            >
              ⚠️ {errors.length} parsing errors {showErrors ? '(hide)' : '(show)'}
            </button>
            
            {showErrors && (
              <div className="errors-list">
                {errors.map((error, index) => (
                  <div key={index} className="error-item">
                    <div className="error-location">
                      Row {error.rowIndex}
                      {error.questionExternalId && ` - Question ${error.questionExternalId}`}
                    </div>
                    <div className="error-reason">{error.reason}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="questionnaire-content">
        {questionnaire.sections.length === 0 ? (
          <div className="empty-questionnaire">
            <h2>No sections available</h2>
            <p>This questionnaire does not contain any valid sections.</p>
            {errors.length > 0 && (
              <p>Check the parsing errors above for more information.</p>
            )}
          </div>
        ) : (
          <div className="sections-list">
            {questionnaire.sections.map((section) => (
              <Section
                key={section.externalId}
                section={section}
                disabled={disabled}
                onAnswersChange={handleSectionAnswersChange}
                initialAnswers={allAnswers[section.externalId] || {}}
                onGuidanceOpen={onGuidanceOpen}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="questionnaire-footer">
        <div className="progress-info">
          Completed: 0 / {summary.totalQuestions} questions
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireRenderer;
