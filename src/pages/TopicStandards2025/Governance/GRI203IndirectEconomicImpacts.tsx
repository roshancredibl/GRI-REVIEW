import React, { useState, useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionnaireRenderer from '../../../esg/render/QuestionnaireRenderer';
import { loadQuestionnaireFromStem } from '../../../esg/parsers/ingestQuestionnaire';
import { Questionnaire, ParseError } from '../../../esg/models/questionnaire.types';
import { useGuidance } from '../../../hooks/useGuidance';
import GuidanceSidebar from '../../../components/GuidanceSidebar';

const GRI203IndirectEconomicImpacts: React.FC = () => {
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
        const result = await loadQuestionnaireFromStem('GRI203', 'GRI', '');
        
        if (result.questionnaire) {
          setQuestionnaire(result.questionnaire);
          setErrors(result.errors || []);
        } else {
          setLoadError('Failed to load questionnaire data');
        }
      } catch (error) {
        console.error('Error loading GRI203 questionnaire:', error);
        setLoadError(`Failed to load questionnaire: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    loadQuestionnaire();
  }, []);

  const handleAnswersChange = (answers: Record<string, any>) => {
    console.log('GRI203 answers updated:', answers);
    // Here you could save to localStorage, send to API, etc.
  };

  if (loadError) {
    return (
      <div className="page-container">
        <div className="page-header">
          <button className="back-btn" onClick={handleBackClick}>← Back</button>
          <div className="page-title">GRI 203: Indirect Economic Impacts</div>
          <button className="download-gri-btn" onClick={() => console.log('Download GRI Standard - Placeholder')}>
            Download the GRI Standard
          </button>
        </div>
        <div className="error-container">
          <h2>Error Loading Questionnaire</h2>
          <p>{loadError}</p>
          <p>Please check if GRI203.json exists and is properly formatted.</p>
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="page-container">
      <div className="page-header">
        <button className="back-btn" onClick={handleBackClick}>← Back</button>
        <div className="page-title">GRI 203: Indirect Economic Impacts</div>
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
              <div className="loading-spinner">Loading GRI 203 questionnaire...</div>
            </div>
          ) : null}
        </Suspense>
      </div>
    </div>

    {/* Guidance Sidebar */}
    <GuidanceSidebar
      guidanceState={guidanceState}
      closeGuidance={closeGuidance}
      griStandard="GRI203"
    />
  </>
  );
};

export default GRI203IndirectEconomicImpacts;
