import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Report, ReportId, ReportData } from '../types/report.types';
import { ReportDataManager } from '../utils/reportDataManager';

interface ReportContextValue {
  currentReportId: ReportId | null;
  currentReport: Report | null;
  setCurrentReport: (reportId: ReportId) => void;
  getReportData: (reportId: ReportId) => ReportData;
  updateReport: (reportId: ReportId, updates: Partial<Report>) => void;
  saveQuestionnaireAnswers: (reportId: ReportId, questionnaireId: string, answers: Record<string, any>) => void;
  getQuestionnaireAnswers: (reportId: ReportId, questionnaireId: string) => Record<string, any>;
  getAllReports: () => Report[];
  resetReportData: (reportId: ReportId) => void;
}

const ReportContext = createContext<ReportContextValue | undefined>(undefined);

export const useReportContext = () => {
  const context = useContext(ReportContext);
  if (!context) {
    throw new Error('useReportContext must be used within a ReportProvider');
  }
  return context;
};

interface ReportProviderProps {
  children: ReactNode;
}

export const ReportProvider: React.FC<ReportProviderProps> = ({ children }) => {
  const [currentReportId, setCurrentReportId] = useState<ReportId | null>(null);
  const [currentReport, setCurrentReportState] = useState<Report | null>(null);

  const setCurrentReport = useCallback((reportId: ReportId) => {
    const reportData = ReportDataManager.getReportData(reportId);
    setCurrentReportId(reportId);
    setCurrentReportState(reportData.report);
  }, []);

  const getReportData = useCallback((reportId: ReportId): ReportData => {
    return ReportDataManager.getReportData(reportId);
  }, []);

  const updateReport = useCallback((reportId: ReportId, updates: Partial<Report>) => {
    ReportDataManager.updateReport(reportId, updates);
    
    // Update current report state if it's the active one
    if (currentReportId === reportId) {
      const updatedData = ReportDataManager.getReportData(reportId);
      setCurrentReportState(updatedData.report);
    }
  }, [currentReportId]);

  const saveQuestionnaireAnswers = useCallback((
    reportId: ReportId, 
    questionnaireId: string, 
    answers: Record<string, any>
  ) => {
    ReportDataManager.saveQuestionnaireAnswers(reportId, questionnaireId, answers);
  }, []);

  const getQuestionnaireAnswers = useCallback((
    reportId: ReportId, 
    questionnaireId: string
  ): Record<string, any> => {
    return ReportDataManager.getQuestionnaireAnswers(reportId, questionnaireId);
  }, []);

  const getAllReports = useCallback((): Report[] => {
    return ReportDataManager.getAllReports();
  }, []);

  const resetReportData = useCallback((reportId: ReportId) => {
    ReportDataManager.resetReportData(reportId);
    
    // Update current report state if it's the active one
    if (currentReportId === reportId) {
      const resetData = ReportDataManager.getReportData(reportId);
      setCurrentReportState(resetData.report);
    }
  }, [currentReportId]);

  const value: ReportContextValue = {
    currentReportId,
    currentReport,
    setCurrentReport,
    getReportData,
    updateReport,
    saveQuestionnaireAnswers,
    getQuestionnaireAnswers,
    getAllReports,
    resetReportData
  };

  return (
    <ReportContext.Provider value={value}>
      {children}
    </ReportContext.Provider>
  );
};
