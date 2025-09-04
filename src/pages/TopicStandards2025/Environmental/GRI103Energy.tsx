import React from 'react';
import { useNavigate } from 'react-router-dom';

const GRI103Energy: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/topic-standards-2025/environmental');
  };

  return (
    <div className="page-container" id="gri-103-energy">
      <div className="page-header">
        <button type="button" className="back-btn" onClick={handleBackClick}>← Back</button>
        <div className="page-title">GRI 103: Energy 2025</div>
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
        
        {/* Complete GRI 103 Energy questionnaire content would go here */}
        <div className="section-header">
          <div className="main-heading">
            1. Energy policies and commitments
            <div className="info-icon" title="Energy policies and commitments are those that apply to the organization's activities and its upstream and downstream value chain.">i</div>
          </div>
        </div>

        <div className="question-section">
          <div className="requirements-header">
            <strong>The organization shall:</strong>
          </div>
          
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">1a</div>
              <div className="sub-question-title">describe how its energy-related policies and commitments contribute to energy consumption reduction, energy efficiency, and the transition to renewable energy sources;</div>
              <div className="info-icon" title="This requirement covers policies and commitments that apply to the organization's activities and its upstream and downstream value chain.">i</div>
            </div>
            <textarea className="form-textarea" rows={6}></textarea>
          </div>

          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">1b</div>
              <div className="sub-question-title">describe the impacts on the economy, environment, and people that may result from its energy consumption and the transition to renewable energy sources.</div>
              <div className="info-icon" title="This requirement enables the organization to describe the impacts on the economy, environment, and people.">i</div>
            </div>
            <textarea className="form-textarea" rows={6}></textarea>
          </div>
          
          <div className="save-section">
            <a href="#" className="attachments-link">
              <span>📎</span>
              <span>Attachments</span>
            </a>
            <button type="button" className="save-btn">SAVE</button>
          </div>
        </div>

        {/* Disclosure 103-2: Energy consumption and self-generation within the organization */}
        <div className="section-header">
          <div className="main-heading">
            2. Energy consumption and self-generation within the organization
            <div className="info-icon" title="Energy consumption and self-generation includes fuel consumption, purchased electricity, heating, cooling, and steam consumption, and self-generated renewable electricity, heating, cooling, and steam consumption within the organization, and self-generated electricity, heating, cooling, and steam sold by the organization.">i</div>
          </div>
        </div>
        
        <div className="question-section">
          <div className="requirements-header">
            <strong>The organization shall:</strong>
          </div>
          
          {/* Requirement 2a */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">2a</div>
              <div className="sub-question-title">report total fuel consumption within the organization in joules, watt-hours, or multiples, and a breakdown of this total by:</div>
              <div className="info-icon" title="This requirement covers fuel consumption from fuels purchased by the organization and fuels self-generated, such as coal mined, oil and gas extracted, or biofuel produced.">i</div>
            </div>
            
            {/* Sub-question 2a-i */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">i</div>
                <div className="sub-question-title">renewable and non-renewable energy sources;</div>
                <div className="info-icon" title="Fuel consumption from renewable sources can include biofuels purchased or self-generated from biomass owned or controlled by the organization.">i</div>
              </div>
              <textarea className="form-textarea" rows={4}></textarea>
            </div>

            {/* Sub-question 2a-ii */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">ii</div>
                <div className="sub-question-title">each activity in which the fuel is consumed for each renewable and non-renewable energy source;</div>
                <div className="info-icon" title="This requirement aims to identify the main drivers of fuel consumption within the organization.">i</div>
              </div>
              <textarea className="form-textarea" rows={4}></textarea>
            </div>
          </div>

          {/* Requirement 2b */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">2b</div>
              <div className="sub-question-title">report total purchased electricity, heating, cooling, and steam consumption within the organization in joules, watt-hours, or multiples, and a breakdown of this total by:</div>
              <div className="info-icon" title="This requirement covers purchased electricity consumption from renewable and non-renewable energy sources.">i</div>
            </div>
            
            {/* Sub-question 2b-i */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">i</div>
                <div className="sub-question-title">renewable and non-renewable energy sources;</div>
                <div className="info-icon" title="Electricity consumption from renewable sources can include wind and solar. Electricity consumption from non-renewable sources can include coal, oil, and natural gas.">i</div>
              </div>
              <textarea className="form-textarea" rows={4}></textarea>
            </div>

            {/* Sub-question 2b-ii */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">ii</div>
                <div className="sub-question-title">electricity, heating, cooling, and steam consumption for each renewable and non-renewable energy source;</div>
                <div className="info-icon" title="Definitions of electricity, heating, cooling, and steam can include: Electricity used for operating machines, lighting, electric vehicle charging, or heating and cooling systems.">i</div>
              </div>
              <textarea className="form-textarea" rows={4}></textarea>
            </div>
          </div>

          {/* Requirement 2c */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">2c</div>
              <div className="sub-question-title">report total self-generated renewable electricity, heating, cooling, and steam consumption within the organization in joules, watt-hours, or multiples, and a breakdown of this total by electricity, heating, cooling, and steam consumption for each activity in which it is consumed for each renewable energy source;</div>
              <div className="info-icon" title="This requirement covers self-generated electricity consumption from renewable energy sources (e.g., wind, solar).">i</div>
            </div>
            <textarea className="form-textarea" rows={6}></textarea>
          </div>

          {/* Requirement 2d */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">2d</div>
              <div className="sub-question-title">report total self-generated electricity, heating, cooling, and steam sold in joules, watt-hours, or multiples, and a breakdown of this total by:</div>
              <div className="info-icon" title="When the organization sells self-generated renewable electricity, it should report whether it has sold off any linked contractual instruments.">i</div>
            </div>
            
            {/* Sub-question 2d-i */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">i</div>
                <div className="sub-question-title">renewable and non-renewable energy sources;</div>
                <div className="info-icon" title="When the organization sells self-generated renewable electricity, it should report whether it has sold off any linked contractual instruments.">i</div>
              </div>
              <textarea className="form-textarea" rows={4}></textarea>
            </div>

            {/* Sub-question 2d-ii */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">ii</div>
                <div className="sub-question-title">electricity, heating, cooling, and steam sold for each renewable and non-renewable energy source;</div>
                <div className="info-icon" title="When the organization sells self-generated renewable electricity, it should report whether it has sold off any linked contractual instruments.">i</div>
              </div>
              <textarea className="form-textarea" rows={4}></textarea>
            </div>
          </div>

          {/* Requirement 2e */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">2e</div>
              <div className="sub-question-title">report whether contractual instruments are used to disclose information on purchased electricity, heating, cooling, and steam consumption, and if so, describe how the contractual instruments adhere to quality criteria to ensure accuracy and consistency;</div>
              <div className="info-icon" title="The following quality criteria, built on the GHG Protocol Scope 2 Guidance, apply to contractual instruments (e.g., EACs): Contractual instruments must convey the GHG emission rate attribute associated with the electricity produced.">i</div>
            </div>
            <textarea className="form-textarea" rows={6}></textarea>
          </div>

          {/* Requirement 2f */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">2f</div>
              <div className="sub-question-title">report standards, methodologies, assumptions, and calculation tools used, including the source of the conversion factors used.</div>
              <div className="info-icon" title="The organization should explain why the standards, methodologies, assumptions, and calculation tools used were chosen.">i</div>
            </div>
            <textarea className="form-textarea" rows={6}></textarea>
          </div>

          <div className="save-section">
            <a href="#" className="attachments-link">
              <span>📎</span>
              <span>Attachments</span>
            </a>
            <button type="button" className="save-btn">SAVE</button>
          </div>
        </div>

        {/* Disclosure 103-3: Upstream and downstream energy consumption */}
        <div className="section-header">
          <div className="main-heading">
            3. Upstream and downstream energy consumption
            <div className="info-icon" title="Upstream and downstream energy consumption covers significant energy consumption in an organization's upstream and downstream value chain.">i</div>
          </div>
        </div>

        <div className="question-section">
          <div className="requirements-header">
            <strong>The organization shall:</strong>
          </div>
          
          {/* Requirement 3a */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">3a</div>
              <div className="sub-question-title">report total significant energy consumption in its upstream and downstream value chain in joules, watt-hours, or multiples, and list the upstream and downstream categories in which significant energy consumption occurs;</div>
              <div className="info-icon" title="To compile the information required under 103-3-a, the organization can use the following steps: Identify which activities in its upstream and downstream value chain have significant energy consumption.">i</div>
            </div>
            <textarea className="form-textarea" rows={6}></textarea>
          </div>

          {/* Requirement 3b */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">3b</div>
              <div className="sub-question-title">report standards, methodologies, assumptions, and calculation tools used, including the source of the conversion factors used.</div>
              <div className="info-icon" title="The organization should explain why the standards, methodologies, assumptions, and calculation tools used were chosen.">i</div>
            </div>
            <textarea className="form-textarea" rows={6}></textarea>
          </div>

          <div className="save-section">
            <a href="#" className="attachments-link">
              <span>📎</span>
              <span>Attachments</span>
            </a>
            <button type="button" className="save-btn">SAVE</button>
          </div>
        </div>

        {/* Disclosure 103-4: Energy intensity */}
        <div className="section-header">
          <div className="main-heading">
            4. Energy intensity
            <div className="info-icon" title="Energy intensity ratios are obtained by dividing the energy consumption (the numerator) by an organization-specific metric (the denominator).">i</div>
          </div>
        </div>

        <div className="question-section">
          <div className="requirements-header">
            <strong>The organization shall:</strong>
          </div>
          
          {/* Requirement 4a */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">4a</div>
              <div className="sub-question-title">report energy intensity ratio(s), including the energy consumption in joules, watt-hours, or multiples (the numerator) and the organization-specific metric (the denominator) chosen to calculate the ratio(s);</div>
              <div className="info-icon" title="Examples of energy intensity ratios can include: [amount of] fuel consumption within the organization in MWh (numerator) per 100 full-time equivalent employees (denominator).">i</div>
            </div>
            <textarea className="form-textarea" rows={6}></textarea>
          </div>

          {/* Requirement 4b */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">4b</div>
              <div className="sub-question-title">report whether the energy intensity ratio(s) include energy consumption within the organization, in its upstream and downstream value chain, or both;</div>
              <div className="info-icon" title="This requirement aims to report what the energy intensity ratio covers, allowing the organization to select the scope of the energy consumption data.">i</div>
            </div>
            <textarea className="form-textarea" rows={4}></textarea>
          </div>

          {/* Requirement 4c */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">4c</div>
              <div className="sub-question-title">report the types of energy consumption included in the energy intensity ratio(s), whether fuel, electricity, heating, cooling, or steam.</div>
            </div>
            <textarea className="form-textarea" rows={4}></textarea>
          </div>

          <div className="save-section">
            <a href="#" className="attachments-link">
              <span>📎</span>
              <span>Attachments</span>
            </a>
            <button type="button" className="save-btn">SAVE</button>
          </div>
        </div>

        {/* Disclosure 103-5: Reduction in energy consumption */}
        <div className="section-header">
          <div className="main-heading">
            5. Reduction in energy consumption
            <div className="info-icon" title="Reduction in energy consumption refers to the amount of energy saved as a direct result of conservation and efficiency initiatives.">i</div>
          </div>
        </div>

        <div className="question-section">
          <div className="requirements-header">
            <strong>The organization shall:</strong>
          </div>
          
          {/* Requirement 5a */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">5a</div>
              <div className="sub-question-title">report the reduction in energy consumption achieved in joules, watt-hours, or multiples, including whether and how it is due to:</div>
              <div className="info-icon" title="The reduction in energy consumption can be calculated by comparing the energy consumption in the reporting period to: energy consumption in the base year; or projected energy consumption in the absence of any reduction activity (baseline).">i</div>
            </div>
            
            {/* Sub-question 5a-i */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">i</div>
                <div className="sub-question-title">reductions from the organization's conservation and efficiency initiatives;</div>
              </div>
              <textarea className="form-textarea" rows={4}></textarea>
            </div>

            {/* Sub-question 5a-ii */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">ii</div>
                <div className="sub-question-title">other factors;</div>
              </div>
              <textarea className="form-textarea" rows={4}></textarea>
            </div>
          </div>

          {/* Requirement 5b */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">5b</div>
              <div className="sub-question-title">report the types of energy consumption included in the reduction, whether fuel, electricity, heating, cooling, or steam;</div>
              <div className="info-icon" title="The organization can provide a breakdown of the reduction in energy consumption by energy type: fuel, electricity, heating, cooling, and steam.">i</div>
            </div>
            <textarea className="form-textarea" rows={4}></textarea>
          </div>

          {/* Requirement 5c */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">5c</div>
              <div className="sub-question-title">report whether the reduction in energy consumption was achieved within the organization, in its upstream and downstream value chain, or both, and list the upstream and downstream categories in which reduction was achieved;</div>
              <div className="info-icon" title="This requirement aims to report what the energy consumption reduction covers, allowing the organization to select the scope of the energy consumption data included.">i</div>
            </div>
            <textarea className="form-textarea" rows={4}></textarea>
          </div>

          {/* Requirement 5d */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">5d</div>
              <div className="sub-question-title">report whether the reduction in energy consumption is estimated, modeled, or sourced from direct measurements and, if applicable, the estimations or modeling methods used;</div>
            </div>
            <textarea className="form-textarea" rows={4}></textarea>
          </div>

          {/* Requirement 5e */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">5e</div>
              <div className="sub-question-title">report the base year or baseline for calculating the reduction in energy consumption, including:</div>
            </div>
            
            {/* Sub-question 5e-i */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">i</div>
                <div className="sub-question-title">the rationale for choosing it;</div>
              </div>
              <textarea className="form-textarea" rows={4}></textarea>
            </div>

            {/* Sub-question 5e-ii */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">ii</div>
                <div className="sub-question-title">energy consumption in the base year or baseline;</div>
              </div>
              <textarea className="form-textarea" rows={4}></textarea>
            </div>
          </div>

          {/* Requirement 5f */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">5f</div>
              <div className="sub-question-title">report standards, methodologies, assumptions, and calculation tools used.</div>
              <div className="info-icon" title="The organization should explain why the standards, methodologies, assumptions, and calculation tools used were chosen.">i</div>
            </div>
            <textarea className="form-textarea" rows={6}></textarea>
          </div>
          
          <div className="save-section">
            <a href="#" className="attachments-link">
              <span>📎</span>
              <span>Attachments</span>
            </a>
            <button type="button" className="save-btn">SAVE</button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default GRI103Energy;
