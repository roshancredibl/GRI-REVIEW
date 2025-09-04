import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ReportFormData {
  name: string;
  description: string;
  reportingPeriod: string;
  organizationName: string;
  organizationType: string;
  sector: string;
  reportingBoundary: string;
  reportingFramework: string;
}

const CreateNewReport: React.FC = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<ReportFormData>({
    name: '',
    description: '',
    reportingPeriod: '',
    organizationName: '',
    organizationType: '',
    sector: '',
    reportingBoundary: '',
    reportingFramework: 'GRI Standards 2021'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const organizationTypes = [
    'Public Company',
    'Private Company',
    'Non-Profit Organization',
    'Government Agency',
    'International Organization',
    'Academic Institution'
  ];

  const sectors = [
    'Agriculture, Aquaculture and Fishing',
    'Mining',
    'Oil and Gas',
    'Coal',
    'Construction and Real Estate',
    'Food and Beverage Products',
    'Textiles and Apparel',
    'Financial Services',
    'Technology',
    'Healthcare',
    'Energy Utilities',
    'Water Utilities',
    'Other'
  ];

  const reportingBoundaries = [
    'Legal Entity',
    'Operational Control',
    'Financial Control',
    'Equity Share',
    'Other'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCancel = () => {
    navigate('/gri');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleBackToReports = () => {
    navigate('/gri');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call to create report
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For new reports, we'll redirect to the first available report instance
      // In a real app, you might create a new report ID here
      navigate('/gri/GRI-11/dashboard');
    } catch (error) {
      console.error('Error creating report:', error);
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return formData.name.trim() !== '' && 
           formData.organizationName.trim() !== '' && 
           formData.reportingPeriod !== '' &&
           formData.organizationType !== '' &&
           formData.sector !== '';
  };

  return (
    <main className="main-content">
      <div className="breadcrumb">
        <span className="breadcrumb-link" onClick={handleBackToHome}>ESG</span>
        <span className="breadcrumb-separator"> &gt; </span>
        <span className="breadcrumb-link" onClick={handleBackToReports}>GRI</span>
        <span className="breadcrumb-separator"> &gt; </span>
        <span className="breadcrumb-current">Create New Report</span>
      </div>
      
      <div className="create-report-header">
        <h1>Create New GRI Report</h1>
        <p>Set up your sustainability report based on GRI Standards framework</p>
      </div>

      <form className="report-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Report Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="e.g., Sustainability Report 2025"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Report Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Provide a brief description of this sustainability report..."
            rows={3}
          />
        </div>

        <div className="form-group">
          <label htmlFor="organizationName">Organization Name *</label>
          <input
            type="text"
            id="organizationName"
            name="organizationName"
            value={formData.organizationName}
            onChange={handleInputChange}
            placeholder="Enter your organization name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="reportingPeriod">Reporting Period *</label>
          <select
            id="reportingPeriod"
            name="reportingPeriod"
            value={formData.reportingPeriod}
            onChange={handleInputChange}
            required
          >
            <option value="">Select reporting period</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="FY 2024-2025">FY 2024-2025</option>
            <option value="FY 2023-2024">FY 2023-2024</option>
            <option value="custom">Custom Period</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="organizationType">Organization Type *</label>
          <select
            id="organizationType"
            name="organizationType"
            value={formData.organizationType}
            onChange={handleInputChange}
            required
          >
            <option value="">Select organization type</option>
            {organizationTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="sector">Primary Sector *</label>
          <select
            id="sector"
            name="sector"
            value={formData.sector}
            onChange={handleInputChange}
            required
          >
            <option value="">Select primary sector</option>
            {sectors.map(sector => (
              <option key={sector} value={sector}>{sector}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="reportingBoundary">Reporting Boundary</label>
          <select
            id="reportingBoundary"
            name="reportingBoundary"
            value={formData.reportingBoundary}
            onChange={handleInputChange}
          >
            <option value="">Select reporting boundary</option>
            {reportingBoundaries.map(boundary => (
              <option key={boundary} value={boundary}>{boundary}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="reportingFramework">Reporting Framework</label>
          <select
            id="reportingFramework"
            name="reportingFramework"
            value={formData.reportingFramework}
            onChange={handleInputChange}
          >
            <option value="GRI Standards 2021">GRI Standards 2021</option>
            <option value="GRI Standards 2016">GRI Standards 2016</option>
          </select>
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            className="btn-secondary" 
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn-primary"
            disabled={!isFormValid() || isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Report'}
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateNewReport;
