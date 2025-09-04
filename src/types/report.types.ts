export interface Report {
  id: string;
  name: string;
  dateCreated: string;
  period: string;
  status: 'Draft' | 'Published' | 'In Review';
  description?: string;
  organizationName?: string;
  organizationType?: string;
  sector?: string;
  reportingBoundary?: string;
  reportingFramework?: string;
}

export interface ReportAnswers {
  [questionnaireId: string]: {
    [questionId: string]: Record<string, any>;
  };
}

export interface ReportData {
  report: Report;
  answers: ReportAnswers;
  lastModified: string;
}

export type ReportId = 'GRI-11' | 'GRI-12' | 'GRI-13' | 'GRI-14';

export const REPORT_IDS: ReportId[] = ['GRI-11', 'GRI-12', 'GRI-13', 'GRI-14'];

export const DEFAULT_REPORTS: Record<ReportId, Report> = {
  'GRI-11': {
    id: 'GRI-11',
    name: 'GRI-11',
    dateCreated: '02 Jun, 2025',
    period: '2025',
    status: 'Draft',
    description: 'GRI Report Instance 11',
    organizationName: 'Sample Organization 11',
    organizationType: 'Public Company',
    sector: 'Technology',
    reportingBoundary: 'Legal Entity',
    reportingFramework: 'GRI Standards 2021'
  },
  'GRI-12': {
    id: 'GRI-12',
    name: 'GRI-12',
    dateCreated: '22 Aug, 2025',
    period: 'FY 2024 - 2025',
    status: 'Draft',
    description: 'GRI Report Instance 12',
    organizationName: 'Sample Organization 12',
    organizationType: 'Private Company',
    sector: 'Financial Services',
    reportingBoundary: 'Operational Control',
    reportingFramework: 'GRI Standards 2021'
  },
  'GRI-13': {
    id: 'GRI-13',
    name: 'GRI-13',
    dateCreated: '08 Apr, 2024',
    period: '2023',
    status: 'Draft',
    description: 'GRI Report Instance 13',
    organizationName: 'Sample Organization 13',
    organizationType: 'Non-Profit Organization',
    sector: 'Healthcare',
    reportingBoundary: 'Financial Control',
    reportingFramework: 'GRI Standards 2021'
  },
  'GRI-14': {
    id: 'GRI-14',
    name: 'GRI-14',
    dateCreated: '07 Apr, 2025',
    period: '2022',
    status: 'Draft',
    description: 'GRI Report Instance 14',
    organizationName: 'Sample Organization 14',
    organizationType: 'Academic Institution',
    sector: 'Energy Utilities',
    reportingBoundary: 'Equity Share',
    reportingFramework: 'GRI Standards 2021'
  }
};
