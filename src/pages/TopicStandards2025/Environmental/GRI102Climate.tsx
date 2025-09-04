import React from 'react';
import { useNavigate } from 'react-router-dom';

const GRI102Climate: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/topic-standards-2025/environmental');
  };

  return (
    <div className="page-container" id="gri-102-climate">
      <div className="page-header">
        <button type="button" className="back-btn" onClick={handleBackClick}>← Back</button>
        <div className="page-title">GRI 102: Climate Change 2025</div>
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
        
        <div className="section-header">
          <div className="section-title">Climate Change</div>
          <div className="gri-reference">GRI 102: Climate Change</div>
          <div className="main-heading">
            1. Transition plan for climate change mitigation
            <div className="info-icon" title="This section covers the organization's comprehensive transition plan for climate change mitigation, including policies, actions, targets, governance, and impacts management aligned with limiting global warming to 1.5°C.">i</div>
          </div>
        </div>
        
        {/* Disclosure 102-1: Transition plan for climate change mitigation */}
        <div className="question-section">
          
          {/* Requirement 1a */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">1a</div>
              <div className="sub-question-title">Transition plan description</div>
              <div className="info-icon" title="Examples of policies to mitigate climate change can include policies on: energy consumption; land use change, for example on deforestation; engaging with suppliers to reduce their GHG emissions; bioeconomy or circular economy; just transition and on human rights.">i</div>
            </div>
            <textarea className="form-textarea" rows={4}></textarea>
          </div>
          
          {/* Requirement 1b */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">1b</div>
              <div className="sub-question-title">Alignment with scientific evidence</div>
              <div className="info-icon" title="When describing how the transition plan aligns with the latest scientific evidence on the global effort needed to limit global warming to 1.5°C, the organization should report how it is aligned with the mitigation hierarchy.">i</div>
            </div>
            <textarea className="form-textarea" rows={4}></textarea>
          </div>

          {/* Requirement 1c */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">1c</div>
              <div className="sub-question-title">Total expenditure</div>
              <div className="info-icon" title="The percentage of the total expenditure incurred by the implementation of the transition plan is calculated using the following formula: % = (Transition plan expenditure / Total expenditure) × 100.">i</div>
            </div>
          <div className="form-row">
            <div className="form-group">
                <label className="form-label">Monetary value</label>
                <input type="text" className="form-input" />
            </div>
            <div className="form-group">
                <label className="form-label">Percentage of total expenditure</label>
                <input type="text" className="form-input" />
            </div>
            <div className="form-group">
                <label className="form-label">Currency</label>
              <select className="form-select">
                  <option>Select Currency</option>
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                  <option>JPY</option>
                  <option>INR</option>
              </select>
              </div>
            </div>
          </div>
          
          {/* Requirement 1d */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">1d</div>
              <div className="sub-question-title">Governance bodies and responsibilities</div>
              <div className="info-icon" title="The organization should report whether: the highest governance body is responsible for overseeing the transition plan and what this includes, for example, approving, reviewing, and monitoring the plan, ensuring that it aligns with just transition principles.">i</div>
            </div>
            <textarea className="form-textarea" rows={4}></textarea>
          </div>

          {/* Requirement 1e */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">1e</div>
              <div className="sub-question-title">Business strategy integration</div>
              <div className="info-icon" title="The organization should report: whether and how the responsibility to manage climate change-related impacts is linked to performance assessments or incentive mechanisms.">i</div>
            </div>
            <textarea className="form-textarea" rows={4}></textarea>
          </div>

          {/* Requirement 1f */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">1f</div>
              <div className="sub-question-title">Targets to achieve the transition plan</div>
              <div className="info-icon" title="When reporting progress toward the targets, the organization should describe known barriers to target achievement and, if applicable, the role of locked-in GHG emissions.">i</div>
            </div>

            {/* Sub-question 1f i */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">i</div>
                <div className="sub-question-title">GHG emissions reduction targets</div>
                <div className="info-icon" title="GHG emissions reduction targets reported under Disclosure 102-4.">i</div>
              </div>
              <textarea className="form-textarea" rows={3}></textarea>
            </div>

            {/* Sub-question 1f ii */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">ii</div>
                <div className="sub-question-title">Fossil fuel phase-out targets</div>
                <div className="info-icon" title="Targets to phase out fossil fuels can include: renewable energy procurement targets; targets to phase out fossil fuel-based materials.">i</div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Phase-out targets</label>
                  <textarea className="form-textarea" rows={2}></textarea>
                </div>
                <div className="form-group">
                  <label className="form-label">Base year</label>
                  <input type="text" className="form-input" />
                </div>
              </div>
              <textarea className="form-textarea" rows={2} placeholder="Standards, methodologies, and assumptions"></textarea>
            </div>

            {/* Sub-question 1f iii */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">iii</div>
                <div className="sub-question-title">Other climate change mitigation targets</div>
                <div className="info-icon" title="Other climate change mitigation targets include any business, operational, engagement, and governance targets used to drive and monitor the progress of its transition plan.">i</div>
              </div>
              <textarea className="form-textarea" rows={4}></textarea>
            </div>
          </div>

          {/* Requirement 1g */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">1g</div>
              <div className="sub-question-title">Just transition principles and stakeholder engagement</div>
              <div className="info-icon" title="According to the International Labour Organization (ILO), a just transition involves greening the economy in a way that is as fair and inclusive as possible to everyone concerned.">i</div>
            </div>
            <textarea className="form-textarea" rows={4}></textarea>
          </div>

          {/* Requirement 1h */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">1h</div>
              <div className="sub-question-title">Impacts on people and environment</div>
              <div className="info-icon" title="Requirements 3-3-a and 3-3-d in GRI 3: Material Topics 2021 describe the organization's impacts and actions taken to manage them.">i</div>
            </div>

            {/* Sub-question 1h i */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">i</div>
                <div className="sub-question-title">Workers, local communities, and Indigenous Peoples</div>
                <div className="info-icon" title="An example of impacts on workers from implementing a transition plan is the termination of jobs following the reduction or phase-out of economic activities that produce high levels of GHG emissions.">i</div>
              </div>
              <textarea className="form-textarea" rows={3}></textarea>
            </div>

            {/* Sub-question 1h ii */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">ii</div>
                <div className="sub-question-title">Biodiversity impacts</div>
                <div className="info-icon" title="Actions to mitigate climate change can have positive impacts on biodiversity. For example, building offshore wind farms to transition to wind energy can act as refuges for fish and marine mammals.">i</div>
              </div>
              <textarea className="form-textarea" rows={3}></textarea>
            </div>
          </div>

          {/* Requirement 1i */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">1i</div>
              <div className="sub-question-title">Public policy activities consistency</div>
              <div className="info-icon" title="The organization should report: its stance on significant issues related to the transition plan, for example, phasing out fossil fuels, that are the focus of its participation in public policy development and lobbying.">i</div>
            </div>
            <textarea className="form-textarea" rows={4}></textarea>
          </div>

          {/* Requirement 1j */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">1j</div>
              <div className="sub-question-title">Absence of transition plan</div>
              <div className="info-icon" title="Explain, in the absence of a transition plan, why it does not exist, and describe the steps being taken to develop it and the expected time frame.">i</div>
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

        {/* Disclosure 102-2: Climate change adaptation plan */}
        <div className="section-header">
          <div className="main-heading">
            2. Climate change adaptation plan
            <div className="info-icon" title="This section covers the organization's climate change adaptation plan, including impacts assessment, policies and actions, expenditure, governance, targets, stakeholder engagement, and impact management for climate resilience.">i</div>
          </div>
        </div>

        <div className="question-section">
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">2a</div>
              <div className="sub-question-title">describe the impacts on people and the environment associated with its climate change-related risks and opportunities and how they were considered in the development of the adaptation plan</div>
              <div className="info-icon" title="Climate change-related risks can be classified as physical or transition risks.">i</div>
            </div>
            <textarea className="form-textarea" rows={4}></textarea>
          </div>

          {/* Requirement 2b */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">2b</div>
              <div className="sub-question-title">describe its adaptation plan, including</div>
              <div className="info-icon" title="Climate change mitigation and adaptation strategies are interconnected, with potential for synergies.">i</div>
            </div>

            {/* Sub-requirement 2b i */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">i</div>
                <div className="sub-question-title">policies and actions to adapt to climate change</div>
                <div className="info-icon" title="Actions to adapt to climate change may include working with suppliers to reduce reliance on depleting resources and climate-proofing new facilities.">i</div>
              </div>
              <textarea className="form-textarea" rows={3}></textarea>
            </div>

            {/* Sub-requirement 2b ii */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">ii</div>
                <div className="sub-question-title">the source of the climate change-related scenarios used, the temperature projection included in the scenarios, and the methodologies and assumptions used to develop the adaptation plan</div>
                <div className="info-icon" title="The climate change scenario analysis informs the development of the adaptation plan.">i</div>
              </div>
              <textarea className="form-textarea" rows={3}></textarea>
            </div>

            {/* Sub-requirement 2b iii */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">iii</div>
                <div className="sub-question-title">the total expenditure incurred by the implementation of the adaptation plan as monetary value and percentage of the total expenditure incurred in the reporting period</div>
                <div className="info-icon" title="The percentage of the total expenditure incurred by the implementation of the adaptation plan is calculated using the following formula: % = (Adaptation plan related expenditure / Total expenditure) × 100.">i</div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Monetary value</label>
                  <input type="text" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Percentage of total expenditure</label>
                  <input type="text" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Currency</label>
                  <select className="form-select">
                    <option>Select Currency</option>
                    <option>USD</option>
                    <option>EUR</option>
                    <option>GBP</option>
                    <option>JPY</option>
                    <option>INR</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Sub-requirement 2b iv */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">iv</div>
                <div className="sub-question-title">the governance bodies or individual roles responsible for overseeing and implementing the adaptation plan and their responsibilities</div>
                <div className="info-icon" title="The organization should report whether: the highest governance body is responsible for overseeing the adaptation plan and what this includes.">i</div>
              </div>
              <textarea className="form-textarea" rows={3}></textarea>
            </div>

            {/* Sub-requirement 2b v */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">v</div>
                <div className="sub-question-title">the targets to achieve the adaptation plan and progress toward them</div>
                <div className="info-icon" title="Targets to achieve the adaptation plan can include the number of sites assessed for physical risks, the number of sites for which adaptation plans are developed and implemented.">i</div>
              </div>
              <textarea className="form-textarea" rows={3}></textarea>
            </div>

            {/* Sub-requirement 2b vi */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">vi</div>
                <div className="sub-question-title">Just transition principles and stakeholder engagement</div>
                <div className="info-icon" title="The organization should report: how it identifies stakeholders, including whether it has performed a social impact assessment.">i</div>
              </div>
              <textarea className="form-textarea" rows={3}></textarea>
            </div>
          </div>

          {/* Requirement 2c */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">2c</div>
              <div className="sub-question-title">describe the impacts on people and the environment from implementing the adaptation plan and the actions taken to manage them, including for</div>
              <div className="info-icon" title="If an adaptation plan is well managed, it can translate into positive impacts such as economic development and the creation of decent work opportunities.">i</div>
            </div>

            {/* Sub-requirement 2c i */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">i</div>
                <div className="sub-question-title">workers, local communities, and Indigenous Peoples</div>
                <div className="info-icon" title="Examples of actions taken to manage impacts on workers, local communities, and Indigenous Peoples from implementing an adaptation plan are: supporting the adoption of formal conditions of work.">i</div>
              </div>
              <textarea className="form-textarea" rows={3}></textarea>
            </div>

            {/* Sub-requirement 2c ii */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">ii</div>
                <div className="sub-question-title">biodiversity</div>
                <div className="info-icon" title="Actions to adapt to climate change can have positive impacts on biodiversity. For example, planting mangroves can contribute to climate change adaptation by controlling floods and protecting biodiversity.">i</div>
              </div>
              <textarea className="form-textarea" rows={3}></textarea>
            </div>
          </div>

          {/* Requirement 2d */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">2d</div>
              <div className="sub-question-title">explain, in the absence of an adaptation plan, why it does not exist, and describe the steps being taken to develop it and the expected time frame</div>
              <div className="info-icon" title="Explain, in the absence of an adaptation plan, why it does not exist, and describe the steps being taken to develop it and the expected time frame.">i</div>
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

        {/* Disclosure 102-3: Just transition */}
        <div className="section-header">
          <div className="main-heading">
            3. Just transition
            <div className="info-icon" title="This disclosure describes the impacts of the organization's transition or adaptation efforts on workers, local communities, and Indigenous Peoples.">i</div>
          </div>
        </div>

        <div className="question-section">

          {/* Requirement 3a */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">3a</div>
              <div className="sub-question-title">report the total number of new employees recruited and a breakdown of this total by</div>
              <div className="info-icon" title="As a result of the organization's transition or adaptation efforts, workers may be recruited due to the development of new low-carbon-intensive products, services, and sites.">i</div>
            </div>

            {/* Sub-requirement 3a i */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">i</div>
                <div className="sub-question-title">gender</div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Male</label>
                  <input type="number" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Female</label>
                  <input type="number" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Other</label>
                  <input type="number" className="form-input" />
                </div>
              </div>
            </div>

            {/* Sub-requirement 3a ii */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">ii</div>
                <div className="sub-question-title">employee type</div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Full-time</label>
                  <input type="number" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Part-time</label>
                  <input type="number" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Contract</label>
                  <input type="number" className="form-input" />
                </div>
              </div>
            </div>
          </div>

          {/* Requirement 3b */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">3b</div>
              <div className="sub-question-title">report the total number of employees whose work was terminated and a breakdown of this total by</div>
              <div className="info-icon" title="Termination refers to the cessation of work initiated by the organization.">i</div>
            </div>

            {/* Sub-requirement 3b i */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">i</div>
                <div className="sub-question-title">gender</div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Male</label>
                  <input type="number" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Female</label>
                  <input type="number" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Other</label>
                  <input type="number" className="form-input" />
                </div>
              </div>
            </div>

            {/* Sub-requirement 3b ii */}
            <div className="sub-question">
              <div className="sub-question-header">
                <div className="sub-question-number">ii</div>
                <div className="sub-question-title">employee type</div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Full-time</label>
                  <input type="number" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Part-time</label>
                  <input type="number" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Contract</label>
                  <input type="number" className="form-input" />
                </div>
              </div>
            </div>
          </div>

          <div className="save-section">
            <a href="#" className="attachments-link">
              <span>📎</span>
              <span>Attachments</span>
            </a>
            <button type="button" className="save-btn">SAVE</button>
          </div>
        </div>

        {/* Disclosure 102-4: GHG emissions reduction targets and progress */}
        <div className="section-header">
          <div className="main-heading">
            4. GHG emissions reduction targets and progress
            <div className="info-icon" title="The GHG emissions reduction targets reported under this disclosure are used to report the targets to achieve the transition plan under 102-1-f.">i</div>
          </div>
        </div>

        <div className="question-section">
          {/* Requirement 4a */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">4a</div>
              <div className="sub-question-title">report short-, medium-, and long-term gross Scope 1, Scope 2, and Scope 3 GHG emissions reduction targets in metric tons of CO₂ equivalent and as a percentage of base year emissions</div>
              <div className="info-icon" title="The organization should ensure consistency between Scope 3 categories covered by the target and Scope 3 categories covered by Disclosure102-7.">i</div>
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

        {/* Disclosure 102-5: Scope 1 GHG emissions */}
        <div className="section-header">
          <div className="main-heading">
            5. Scope 1 GHG emissions
            <div className="info-icon" title="Gross Scope 1 GHG emissions include those from energy consumption as reported under 103-2-a in GRI 103: Energy 2025.">i</div>
          </div>
        </div>

        <div className="question-section">
          {/* Requirement 5a */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">5a</div>
              <div className="sub-question-title">report gross Scope 1 GHG emissions in metric tons of CO₂ equivalent, and in the calculation</div>
              <div className="info-icon" title="Gross Scope 1 GHG emissions include the seven gases the Kyoto Protocol covers.">i</div>
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

        {/* Disclosure 102-6: Scope 2 GHG emissions */}
        <div className="section-header">
          <div className="main-heading">
            6. Scope 2 GHG emissions
            <div className="info-icon" title="There are two methods to calculate gross Scope 2 GHG emissions: A location-based method and a market-based method.">i</div>
          </div>
        </div>

        <div className="question-section">
          {/* Requirement 6a */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">6a</div>
              <div className="sub-question-title">report gross location-based and, if applicable, market-based Scope 2 GHG emissions in metric tons of CO₂ equivalent</div>
              <div className="info-icon" title="There are two methods to calculate gross Scope 2 GHG emissions: A location-based method, which reflects the average GHG emissions intensity of grids.">i</div>
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

        {/* Disclosure 102-7: Scope 3 GHG emissions */}
        <div className="section-header">
          <div className="main-heading">
            7. Scope 3 GHG emissions
            <div className="info-icon" title="The gross Scope 3 GHG emissions include GHG emissions for each of the following 15 upstream and downstream categories from the GHG Protocol Corporate Value Chain (Scope 3) Accounting and Reporting Standard.">i</div>
          </div>
        </div>

        <div className="question-section">
          {/* Requirement 7a */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">7a</div>
              <div className="sub-question-title">report gross Scope 3 GHG emissions in metric tons of CO₂ equivalent, and in the calculation</div>
              <div className="info-icon" title="The gross Scope 3 GHG emissions include GHG emissions for each of the following 15 upstream and downstream categories.">i</div>
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

        {/* Disclosure 102-8: GHG emissions intensity */}
        <div className="section-header">
          <div className="main-heading">
            8. GHG emissions intensity
            <div className="info-icon" title="GHG emissions intensity ratios are obtained by dividing the organization's gross GHG emissions (the numerator) by an organization-specific metric (the denominator).">i</div>
          </div>
        </div>

        <div className="question-section">
          {/* Requirement 8a */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">8a</div>
              <div className="sub-question-title">report GHG emissions intensity ratio(s), including the gross GHG emissions in metric tons of CO₂ equivalent (the numerator) and the organization-specific metric (the denominator) chosen to calculate the ratio(s)</div>
              <div className="info-icon" title="Examples of GHG emissions intensity ratios can include: [amount of] gross Scope 1 GHG emissions in metric tons of CO₂ equivalent.">i</div>
            </div>
            <textarea className="form-textarea" rows={6}></textarea>
          </div>

          {/* Requirement 8b */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">8b</div>
              <div className="sub-question-title">report the scope(s) of GHG emissions included in the intensity ratio(s), whether Scope 1, Scope 2, or Scope 3</div>
              <div className="info-icon" title="The organization can report GHG emissions intensity ratio(s) for Scope 1, Scope 2, or Scope 3 separately or combined for Scope 1 and Scope 2.">i</div>
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

        {/* Disclosure 102-9: GHG removals in the value chain */}
        <div className="section-header">
          <div className="main-heading">
            9. GHG removals in the value chain
            <div className="info-icon" title="This disclosure aims to increase transparency regarding the organization's GHG removals.">i</div>
          </div>
        </div>

        <div className="question-section">
          {/* Requirement 9a */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">9a</div>
              <div className="sub-question-title">report the total Scope 1 GHG removals in metric tons of CO₂ equivalent, excluding any GHG trades, and a breakdown of this total by each storage pool</div>
              <div className="info-icon" title="102-9-a excludes any GHG trades. GHG trades occur, for example, when a removal activity in the organization's value chain is sold as a carbon credit.">i</div>
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

        {/* Disclosure 102-10: Carbon credits */}
        <div className="section-header">
          <div className="main-heading">
            10. Carbon credits
            <div className="info-icon" title="This disclosure aims to increase transparency about the carbon credits canceled and their characteristics, including their purpose, quality, and the impacts associated with the underlying carbon credit projects.">i</div>
          </div>
        </div>

        <div className="question-section">
          {/* Requirement 10a */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">10a</div>
              <div className="sub-question-title">report the total amount of carbon credits canceled in metric tons of CO₂ equivalent and a breakdown of this total by removal or reduction projects</div>
              <div className="info-icon" title="A carbon credit is canceled when permanently removed from circulation in a registry account.">i</div>
            </div>
            <textarea className="form-textarea" rows={6}></textarea>
          </div>

          {/* Requirement 10b through 10e would be added here */}
          <div className="sub-question">
            <div className="sub-question-header">
              <div className="sub-question-number">10e</div>
              <div className="sub-question-title">describe the impacts on people and the environment from projects where carbon credits are purchased and how the organization continuously monitors and evaluates them</div>
              <div className="info-icon" title="This requirement covers impacts on people and the environment from carbon credit projects purchased in the reporting period, whether canceled or not.">i</div>
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

export default GRI102Climate;
