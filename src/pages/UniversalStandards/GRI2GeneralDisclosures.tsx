import React, { useState, useEffect, Suspense } from 'react';
import QuestionnaireRenderer from '../../esg/render/QuestionnaireRenderer';
import { loadQuestionnaireFromStem } from '../../esg/parsers/ingestQuestionnaire';
import { Questionnaire, ParseError } from '../../esg/models/questionnaire.types';
import { useGuidance } from '../../hooks/useGuidance';
import { useReportPage } from '../../hooks/useReportPage';
import GuidanceSidebar from '../../components/GuidanceSidebar';

const GRI2GeneralDisclosures: React.FC = () => {
  const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(null);
  const [errors, setErrors] = useState<ParseError[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const { guidanceState, openGuidance, closeGuidance } = useGuidance();

  // Use the new report page hook for data isolation
  const { reportId, answers, saveAnswers, handleBackClick } = useReportPage({
    questionnaireId: 'GRI2',
    backPath: 'universal-standards'
  });

  useEffect(() => {
    const loadQuestionnaire = async () => {
      try {
        setLoading(true);
        setLoadError(null);
        
        const result = await loadQuestionnaireFromStem('GRI2', 'GRI', '');
        setQuestionnaire(result.questionnaire);
        setErrors(result.errors);
        
        if (result.errors.length > 0) {
          console.warn(`Loaded GRI2 questionnaire with ${result.errors.length} errors`);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to load questionnaire';
        setLoadError(errorMessage);
        console.error('Failed to load GRI2 questionnaire:', error);
      } finally {
        setLoading(false);
      }
    };

    loadQuestionnaire();
  }, []);

  const handleAnswersChange = (newAnswers: Record<string, any>) => {
    console.log(`GRI2 answers updated for report ${reportId}:`, newAnswers);
    saveAnswers(newAnswers);
  };

  if (loadError) {
    return (
      <div className="page-container">
        <div className="page-header">
          <button className="back-btn" onClick={handleBackClick}>← Back</button>
          <div className="page-title">GRI 2: General Disclosures</div>
          <button className="download-gri-btn" onClick={() => console.log('Download GRI Standard - Placeholder')}>
            Download the GRI Standard
          </button>
        </div>
        <div className="materials-page">
          <div className="error-container">
            <h2>Error Loading Questionnaire</h2>
            <p>{loadError}</p>
            <button onClick={() => window.location.reload()}>Retry</button>
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
        <div className="page-title">GRI 2: General Disclosures</div>
        <button className="download-gri-btn" onClick={() => console.log('Download GRI Standard - Placeholder')}>
          Download the GRI Standard
        </button>
      </div>
      
      <div className="materials-page">
        <div className="page-top-info">
          <div className="info-item">
            <span>👤</span>
            <span>Assignee:</span>
          </div>
          <div className="info-item">
            <span>👥</span>
            <span>Contributor:</span>
          </div>
          <div className="info-item">
            <span>📎</span>
            <span>Attachments</span>
          </div>
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
              initialAnswers={answers}
            />
          ) : loading ? (
            <div className="loading-container">
              <div className="loading-spinner">Loading GRI 2 questionnaire...</div>
            </div>
          ) : null}
        </Suspense>
      </div>
    </div>

      {/* Guidance Sidebar */}
  <GuidanceSidebar
    guidanceState={guidanceState}
    closeGuidance={closeGuidance}
    griStandard="GRI2"
  />
  </>
  );
};

export default GRI2GeneralDisclosures;
