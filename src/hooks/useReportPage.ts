import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useReportContext } from '../contexts/ReportContext';
import { ReportId } from '../types/report.types';

interface UseReportPageProps {
  questionnaireId: string;
  backPath: string;
}

interface UseReportPageReturn {
  reportId: ReportId | undefined;
  currentReport: any;
  answers: Record<string, any>;
  saveAnswers: (answers: Record<string, any>) => void;
  navigate: ReturnType<typeof useNavigate>;
  handleBackClick: () => void;
}

export const useReportPage = ({ 
  questionnaireId, 
  backPath 
}: UseReportPageProps): UseReportPageReturn => {
  const { reportId } = useParams<{ reportId: ReportId }>();
  const navigate = useNavigate();
  const { 
    setCurrentReport, 
    currentReport, 
    saveQuestionnaireAnswers, 
    getQuestionnaireAnswers 
  } = useReportContext();
  
  const [answers, setAnswers] = useState<Record<string, any>>({});

  // Set current report when reportId changes
  useEffect(() => {
    if (reportId) {
      setCurrentReport(reportId);
      // Load existing answers for this questionnaire
      const existingAnswers = getQuestionnaireAnswers(reportId, questionnaireId);
      setAnswers(existingAnswers);
    }
  }, [reportId, setCurrentReport, getQuestionnaireAnswers, questionnaireId]);

  // Save answers function
  const saveAnswers = useCallback((newAnswers: Record<string, any>) => {
    if (reportId) {
      setAnswers(newAnswers);
      saveQuestionnaireAnswers(reportId, questionnaireId, newAnswers);
    }
  }, [reportId, questionnaireId, saveQuestionnaireAnswers]);

  // Back navigation
  const handleBackClick = useCallback(() => {
    if (reportId) {
      navigate(`/gri/${reportId}/${backPath}`);
    } else {
      navigate(`/${backPath}`);
    }
  }, [reportId, backPath, navigate]);

  return {
    reportId,
    currentReport,
    answers,
    saveAnswers,
    navigate,
    handleBackClick
  };
};
