import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReportContext } from '../contexts/ReportContext';
import { Report, ReportId } from '../types/report.types';

const GRIReportsList: React.FC = () => {
  const navigate = useNavigate();
  const { getAllReports } = useReportContext();
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    // Load all reports using the new data manager
    const allReports = getAllReports();
    setReports(allReports);
  }, [getAllReports]);

  const handleCreateNewReport = () => {
    navigate('/gri/create-new-report');
  };

  const handleViewReport = (reportId: string) => {
    // Navigate to the dashboard for the specific report using URL params
    navigate(`/gri/${reportId}/dashboard`);
  };

  const handleExportReport = (reportId: string) => {
    // Show popup message
    alert('Please find the attached sample .xml file which will be the final version for machine readable GRIs in the coming years');
    
    // Download the XBRL file
    const link = document.createElement('a');
    link.href = '/sample-gri-xbrl-report.xhtml';
    link.download = 'sample-gri-xbrl-report.xhtml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <main className="main-content">
      <div className="breadcrumb">
        <span className="breadcrumb-link" onClick={handleBackToHome}>ESG</span>
        <span className="breadcrumb-separator"> &gt; </span>
        <span className="breadcrumb-current">GRI</span>
      </div>
      
      <div className="gri-reports-header">
        <div className="gri-reports-title">
          <div className="gri-logo">GRI</div>
          <h1>Reports</h1>
        </div>
        <button className="create-report-btn" onClick={handleCreateNewReport}>
          + CREATE NEW REPORT
        </button>
      </div>

      <div className="reports-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date Created</th>
              <th>Period</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>
                  <span className="report-name">{report.name}</span>
                </td>
                <td>{report.dateCreated}</td>
                <td>{report.period}</td>
                <td>
                  <span className={`status-badge status-${report.status.toLowerCase().replace(' ', '-')}`}>
                    {report.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="action-btn view-btn" 
                      onClick={() => handleViewReport(report.id)}
                      title="View Report"
                    >
                      👁️
                    </button>
                    <button 
                      className="action-btn export-btn" 
                      onClick={() => handleExportReport(report.id)}
                      title="Export Report"
                    >
                      📤
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default GRIReportsList;
