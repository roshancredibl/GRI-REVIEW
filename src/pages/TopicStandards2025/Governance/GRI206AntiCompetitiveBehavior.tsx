import React, { useState, useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionnaireRenderer from '../../../esg/render/QuestionnaireRenderer';
import { loadQuestionnaireFromStem } from '../../../esg/parsers/ingestQuestionnaire';
import { Questionnaire, ParseError } from '../../../esg/models/questionnaire.types';
import { useGuidance } from '../../../hooks/useGuidance';
import GuidanceSidebar from '../../../components/GuidanceSidebar';

const GRI206AntiCompetitiveBehavior: React.FC = () => {
  const navigate = useNavigate();
  const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(null);
  const [errors, setErrors] = useState<ParseError[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const { guidanceState, openGuidance, closeGuidance } = useGuidance();

  const handleBackClick = () => {
    navigate('/topic-standards-2025/governance');
  };

  useEffect(() => {
    const loadQuestionnaire = async () => {
      try {
        setLoading(true);
        setLoadError(null);
        // Load GRI206.json based on the component's stem name
        const result = await loadQuestionnaireFromStem('GRI206', 'GRI', '');
        setQuestionnaire(result.questionnaire);
        setErrors(result.errors);
        if (result.errors.length > 0) {
          console.warn(`Loaded GRI206 questionnaire with ${result.errors.length} errors`);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to load questionnaire';
        setLoadError(errorMessage);
        console.error('Failed to load GRI206 questionnaire:', error);
      } finally {
        setLoading(false);
      }
    };
    loadQuestionnaire();
  }, []);

  const handleAnswersChange = (answers: Record<string, any>) => {
    console.log('GRI206 answers updated:', answers);
    // Here you could save to localStorage, send to API, etc.
  };

  if (loadError) {
    return (
      <div className="page-container">
        <div className="page-header">
          <button className="back-btn" onClick={handleBackClick}>← Back</button>
          <div className="page-title">GRI 206: Anti-competitive Behavior</div>
          <button className="download-gri-btn" onClick={() => console.log('Download GRI Standard - Placeholder')}>
            Download the GRI Standard
          </button>
        </div>
        <div className="materials-page">
          <div className="error-container">
            <h3>Error Loading Questionnaire</h3>
            <p>{loadError}</p>
            <p>Please check if GRI206.json exists and is properly formatted.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="page-container">
      <div className="page-header">
        <button className="back-btn" onClick={handleBackClick}>← Back</button>
        <div className="page-title">GRI 206: Anti-competitive Behavior</div>
        <button className="download-gri-btn" onClick={() => console.log('Download GRI Standard - Placeholder')}>
          Download the GRI Standard
        </button>
      </div>
      <div className="materials-page">
        <div className="page-top-info">
          <div className="info-item"><span>👤</span><span>Assignee:</span></div>
          <div className="info-item"><span>👥</span><span>Contributor:</span></div>
          <div className="info-item"><span>📎</span><span>Attachments</span></div>
        </div>
        <Suspense fallback={<div className="loading-spinner">Loading questionnaire...</div>}>
          {questionnaire ? (
            <QuestionnaireRenderer
              questionnaire={questionnaire}
              errors={errors}
              loading={loading}
              onAnswersChange={handleAnswersChange}
              showSummary={true}
              onGuidanceOpen={openGuidance}
            />
          ) : loading ? (
            <div className="loading-container">
              <div className="loading-spinner">Loading GRI 206 questionnaire...</div>
            </div>
          ) : null}
        </Suspense>
      </div>
    </div>

      {/* Guidance Sidebar */}
  <GuidanceSidebar
    guidanceState={guidanceState}
    closeGuidance={closeGuidance}
    griStandard="GRI206"
  />
  </>
  );
};

export default GRI206AntiCompetitiveBehavior;