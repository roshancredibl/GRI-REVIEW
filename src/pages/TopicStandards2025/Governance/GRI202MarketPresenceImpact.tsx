import React, { useState, useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionnaireRenderer from '../../../esg/render/QuestionnaireRenderer';
import { loadQuestionnaireFromStem } from '../../../esg/parsers/ingestQuestionnaire';
import { Questionnaire, ParseError } from '../../../esg/models/questionnaire.types';
import { useGuidance } from '../../../hooks/useGuidance';
import GuidanceSidebar from '../../../components/GuidanceSidebar';

const GRI202MarketPresenceImpact: React.FC = () => {
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
        const result = await loadQuestionnaireFromStem('GRI202', 'GRI', '');
        
        if (result.questionnaire) {
          setQuestionnaire(result.questionnaire);
          setErrors(result.errors || []);
        } else {
          setLoadError('Failed to load questionnaire data');
        }
      } catch (error) {
        console.error('Error loading GRI202 questionnaire:', error);
        setLoadError(`Failed to load questionnaire: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    loadQuestionnaire();
  }, []);

  if (loadError) {
    return (
      <div className="page-container">
        <div className="page-header">
          <button className="back-btn" onClick={handleBackClick}>← Back</button>
          <div className="page-title">GRI 202: Market Presence Impact</div>
          <button className="download-gri-btn" onClick={() => console.log('Download GRI Standard - Placeholder')}>
            Download the GRI Standard
          </button>
        </div>
        <div className="error-container">
          <h2>Error Loading Questionnaire</h2>
          <p>{loadError}</p>
          <p>Please check if GRI202.json exists and is properly formatted.</p>
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="page-container">
      <div className="page-header">
        <button className="back-btn" onClick={handleBackClick}>← Back</button>
        <div className="page-title">GRI 202: Market Presence Impact</div>
        <button className="download-gri-btn" onClick={() => console.log('Download GRI Standard - Placeholder')}>
          Download the GRI Standard
        </button>
      </div>
      <div className="materials-page">
        <Suspense fallback={<div className="loading-indicator">Loading questionnaire...</div>}>
          {questionnaire ? (
            <QuestionnaireRenderer
              questionnaire={questionnaire}
              errors={errors}
              loading={loading}
              onGuidanceOpen={openGuidance}
            />
          ) : null}
        </Suspense>
      </div>
    </div>

    {/* Guidance Sidebar */}
    <GuidanceSidebar
      guidanceState={guidanceState}
      closeGuidance={closeGuidance}
      griStandard="GRI202"
    />
  </>
  );
};

export default GRI202MarketPresenceImpact;
