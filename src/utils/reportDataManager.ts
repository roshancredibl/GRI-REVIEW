import { ReportData, ReportId, ReportAnswers, Report, DEFAULT_REPORTS } from '../types/report.types';

/**
 * Deep clone utility to ensure complete data isolation between report instances
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as unknown as T;
  }

  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as unknown as T;
  }

  if (typeof obj === 'object') {
    const clonedObj = {} as { [key: string]: any };
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone((obj as any)[key]);
      }
    }
    return clonedObj as T;
  }

  return obj;
}

/**
 * Storage keys for localStorage
 */
const STORAGE_KEY_PREFIX = 'gri_report_';

function getStorageKey(reportId: ReportId): string {
  return `${STORAGE_KEY_PREFIX}${reportId}`;
}

/**
 * Report Data Manager - handles CRUD operations for report instances
 */
export class ReportDataManager {
  /**
   * Get report data for a specific report ID
   */
  static getReportData(reportId: ReportId): ReportData {
    try {
      const storageKey = getStorageKey(reportId);
      const stored = localStorage.getItem(storageKey);
      
      if (stored) {
        const parsedData = JSON.parse(stored) as ReportData;
        // Ensure deep clone to prevent reference sharing
        return deepClone(parsedData);
      }
    } catch (error) {
      console.warn(`Failed to load stored data for ${reportId}:`, error);
    }

    // Return default data with deep clone
    return deepClone({
      report: DEFAULT_REPORTS[reportId],
      answers: {},
      lastModified: new Date().toISOString()
    });
  }

  /**
   * Save report data for a specific report ID
   */
  static saveReportData(reportId: ReportId, data: Partial<ReportData>): void {
    try {
      const current = this.getReportData(reportId);
      const updated: ReportData = {
        ...current,
        ...data,
        lastModified: new Date().toISOString()
      };

      const storageKey = getStorageKey(reportId);
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch (error) {
      console.error(`Failed to save data for ${reportId}:`, error);
    }
  }

  /**
   * Update report metadata
   */
  static updateReport(reportId: ReportId, reportUpdates: Partial<Report>): void {
    const current = this.getReportData(reportId);
    const updatedReport = {
      ...current.report,
      ...reportUpdates,
      id: reportId // Ensure ID cannot be changed
    };

    this.saveReportData(reportId, {
      report: updatedReport
    });
  }

  /**
   * Save questionnaire answers for a specific report and questionnaire
   */
  static saveQuestionnaireAnswers(
    reportId: ReportId, 
    questionnaireId: string, 
    answers: Record<string, any>
  ): void {
    const current = this.getReportData(reportId);
    const updatedAnswers = deepClone(current.answers);
    
    updatedAnswers[questionnaireId] = deepClone(answers);

    this.saveReportData(reportId, {
      answers: updatedAnswers
    });
  }

  /**
   * Get questionnaire answers for a specific report and questionnaire
   */
  static getQuestionnaireAnswers(
    reportId: ReportId, 
    questionnaireId: string
  ): Record<string, any> {
    const data = this.getReportData(reportId);
    return deepClone(data.answers[questionnaireId] || {});
  }

  /**
   * Get all report instances (for listing)
   */
  static getAllReports(): Report[] {
    return Object.values(DEFAULT_REPORTS).map(report => {
      const data = this.getReportData(report.id as ReportId);
      return deepClone(data.report);
    });
  }

  /**
   * Reset report data to defaults
   */
  static resetReportData(reportId: ReportId): void {
    try {
      const storageKey = getStorageKey(reportId);
      localStorage.removeItem(storageKey);
    } catch (error) {
      console.error(`Failed to reset data for ${reportId}:`, error);
    }
  }

  /**
   * Clear all report data
   */
  static clearAllReports(): void {
    Object.keys(DEFAULT_REPORTS).forEach(reportId => {
      this.resetReportData(reportId as ReportId);
    });
  }

  /**
   * Export report data for backup/sharing
   */
  static exportReportData(reportId: ReportId): string {
    const data = this.getReportData(reportId);
    return JSON.stringify(data, null, 2);
  }

  /**
   * Import report data from backup
   */
  static importReportData(reportId: ReportId, jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData) as ReportData;
      
      // Validate data structure
      if (!data.report || !data.report.id || data.report.id !== reportId) {
        throw new Error('Invalid report data or mismatched report ID');
      }

      this.saveReportData(reportId, data);
      return true;
    } catch (error) {
      console.error(`Failed to import data for ${reportId}:`, error);
      return false;
    }
  }
}
