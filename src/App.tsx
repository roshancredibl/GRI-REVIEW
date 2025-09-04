import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import GRIReportsList from './pages/GRIReportsList';
import CreateNewReport from './pages/CreateNewReport';
import Dashboard from './pages/Dashboard';

// Main Category Pages
import UniversalStandards from './pages/UniversalStandards';
import Environmental from './pages/TopicStandards2025/Environmental';
import Governance from './pages/TopicStandards2025/Governance';
import Social from './pages/TopicStandards2025/Social';

// Universal Standards
import GRI2GeneralDisclosures from './pages/UniversalStandards/GRI2GeneralDisclosures';
import GRI3MaterialTopic from './pages/UniversalStandards/GRI3MaterialTopic';

// Environmental Standards
import GRI301Materials from './pages/TopicStandards2025/Environmental/GRI301Materials';
import GRI302Energy from './pages/TopicStandards2025/Environmental/GRI302Energy';
import GRI303Water from './pages/TopicStandards2025/Environmental/GRI303Water';
import GRI304Biodiversity from './pages/TopicStandards2025/Environmental/GRI304Biodiversity';
import GRI305Emission from './pages/TopicStandards2025/Environmental/GRI305Emission';
import GRI306Waste from './pages/TopicStandards2025/Environmental/GRI306Waste';
import GRI308SupplierEnvironmentalAssessment from './pages/TopicStandards2025/Environmental/GRI308SupplierEnvironmentalAssessment';
import GRI101Biodiversity from './pages/TopicStandards2025/Environmental/GRI101Biodiversity';
import GRI102Climate from './pages/TopicStandards2025/Environmental/GRI102Climate';
import GRI103Energy from './pages/TopicStandards2025/Environmental/GRI103Energy';

// Governance Standards
import GRI201EconomicPerformance from './pages/TopicStandards2025/Governance/GRI201EconomicPerformance';
import GRI202MarketPresenceImpact from './pages/TopicStandards2025/Governance/GRI202MarketPresenceImpact';
import GRI203IndirectEconomicImpacts from './pages/TopicStandards2025/Governance/GRI203IndirectEconomicImpacts';
import GRI204ProcurementPractices from './pages/TopicStandards2025/Governance/GRI204ProcurementPractices';
import GRI205AntiCorruption from './pages/TopicStandards2025/Governance/GRI205AntiCorruption';
import GRI206AntiCompetitiveBehavior from './pages/TopicStandards2025/Governance/GRI206AntiCompetitiveBehavior';
import GRI207Tax from './pages/TopicStandards2025/Governance/GRI207Tax';

// Social Standards
import GRI401Employment from './pages/TopicStandards2025/Social/GRI401Employment';
import GRI402Labor from './pages/TopicStandards2025/Social/GRI402Labor';
import GRI403OccupationalHealthAndSafety from './pages/TopicStandards2025/Social/GRI403OccupationalHealthAndSafety';
import GRI404TrainingAndEducation from './pages/TopicStandards2025/Social/GRI404TrainingAndEducation';
import GRI405DiversityAndEqualOpportunity from './pages/TopicStandards2025/Social/GRI405DiversityAndEqualOpportunity';
import GRI406NonDiscrimination from './pages/TopicStandards2025/Social/GRI406NonDiscrimination';
import GRI407FreedomOfAssociationAndCollectiveBargaining from './pages/TopicStandards2025/Social/GRI407FreedomOfAssociationAndCollectiveBargaining';
import GRI408ChildLabor from './pages/TopicStandards2025/Social/GRI408ChildLabor';
import GRI409ForcedOrCompulsoryLabor from './pages/TopicStandards2025/Social/GRI409ForcedOrCompulsoryLabor';
import GRI410SecurityPractices from './pages/TopicStandards2025/Social/GRI410SecurityPractices';
import GRI411RightsOfIndigenousPeoples from './pages/TopicStandards2025/Social/GRI411RightsOfIndigenousPeoples';
import GRI414SupplierSocialAssessment from './pages/TopicStandards2025/Social/GRI414SupplierSocialAssessment';
import GRI415PublicPolicy from './pages/TopicStandards2025/Social/GRI415PublicPolicy';
import GRI416CustomerHealthAndSafety from './pages/TopicStandards2025/Social/GRI416CustomerHealthAndSafety';
import GRI417MarketingAndLabeling from './pages/TopicStandards2025/Social/GRI417MarketingAndLabeling';
import GRI418CustomerPrivacy from './pages/TopicStandards2025/Social/GRI418CustomerPrivacy';



import SupportButton from './components/SupportButton';

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="App">
      <Header />
      {!isHomePage && <Sidebar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gri" element={<GRIReportsList />} />
        <Route path="/gri/create-new-report" element={<CreateNewReport />} />
        <Route path="/gri/dashboard" element={<Dashboard />} />
        <Route path="/universal-standards" element={<UniversalStandards />} />
        <Route path="/topic-standards-2025/environmental" element={<Environmental />} />
        <Route path="/topic-standards-2025/governance" element={<Governance />} />
        <Route path="/topic-standards-2025/social" element={<Social />} />
        
        {/* Universal Standards Routes */}
        <Route path="/gri-2-general-disclosures" element={<GRI2GeneralDisclosures />} />
        <Route path="/gri-3-material-topic" element={<GRI3MaterialTopic />} />
        
        {/* Environmental Standards Routes */}
        <Route path="/gri-301-materials" element={<GRI301Materials />} />
        <Route path="/gri-302-energy" element={<GRI302Energy />} />
        <Route path="/gri-303-water" element={<GRI303Water />} />
        <Route path="/gri-304-biodiversity" element={<GRI304Biodiversity />} />
        <Route path="/gri-305-emission" element={<GRI305Emission />} />
        <Route path="/gri-306-waste" element={<GRI306Waste />} />
        <Route path="/gri-308-supplier-environmental-assessment" element={<GRI308SupplierEnvironmentalAssessment />} />
        <Route path="/gri-101-biodiversity" element={<GRI101Biodiversity />} />
        <Route path="/gri-102-climate" element={<GRI102Climate />} />
        <Route path="/gri-103-energy" element={<GRI103Energy />} />
        
        {/* Governance Standards Routes */}
        <Route path="/gri-201-economic-performance" element={<GRI201EconomicPerformance />} />
        <Route path="/gri-202-market-presence-impact" element={<GRI202MarketPresenceImpact />} />
        <Route path="/gri-203-indirect-economic-impacts" element={<GRI203IndirectEconomicImpacts />} />
        <Route path="/gri-204-procurement-practices" element={<GRI204ProcurementPractices />} />
        <Route path="/gri-205-anti-corruption" element={<GRI205AntiCorruption />} />
        <Route path="/gri-206-anti-competitive-behavior" element={<GRI206AntiCompetitiveBehavior />} />
        <Route path="/gri-207-tax" element={<GRI207Tax />} />
        
        {/* Social Standards Routes */}
        <Route path="/gri-401-employment" element={<GRI401Employment />} />
        <Route path="/gri-402-labor" element={<GRI402Labor />} />
        <Route path="/gri-403-occupational-health-and-safety" element={<GRI403OccupationalHealthAndSafety />} />
        <Route path="/gri-404-training-and-education" element={<GRI404TrainingAndEducation />} />
        <Route path="/gri-405-diversity-and-equal-opportunity" element={<GRI405DiversityAndEqualOpportunity />} />
        <Route path="/gri-406-non-discrimination" element={<GRI406NonDiscrimination />} />
        <Route path="/gri-407-freedom-of-association-and-collective-bargaining" element={<GRI407FreedomOfAssociationAndCollectiveBargaining />} />
        <Route path="/gri-408-child-labor" element={<GRI408ChildLabor />} />
        <Route path="/gri-409-forced-or-compulsory-labor" element={<GRI409ForcedOrCompulsoryLabor />} />
        <Route path="/gri-410-security-practices" element={<GRI410SecurityPractices />} />
        <Route path="/gri-411-rights-of-indigenous-peoples" element={<GRI411RightsOfIndigenousPeoples />} />
        <Route path="/gri-414-supplier-social-assessment" element={<GRI414SupplierSocialAssessment />} />
        <Route path="/gri-415-public-policy" element={<GRI415PublicPolicy />} />
        <Route path="/gri-416-customer-health-and-safety" element={<GRI416CustomerHealthAndSafety />} />
        <Route path="/gri-417-marketing-and-labeling" element={<GRI417MarketingAndLabeling />} />
        <Route path="/gri-418-customer-privacy" element={<GRI418CustomerPrivacy />} />

      </Routes>
      {!isHomePage && <SupportButton />}
    </div>
  );
}

export default App;
