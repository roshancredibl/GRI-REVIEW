import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import UniversalStandards from './pages/UniversalStandards';
import SectorStandards from './pages/SectorStandards';
import TopicStandards2025 from './pages/TopicStandards2025';
import GRI101Biodiversity from './pages/GRI101Biodiversity';
import GRI102Climate from './pages/GRI102Climate';
import GRI103Energy from './pages/GRI103Energy';
import GuidanceSidebar from './components/GuidanceSidebar';
import SupportButton from './components/SupportButton';

function App() {
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/universal-standards" element={<UniversalStandards />} />
        <Route path="/sector-standards" element={<SectorStandards />} />
        <Route path="/topic-standards-2025" element={<TopicStandards2025 />} />
        <Route path="/gri-101-biodiversity" element={<GRI101Biodiversity />} />
        <Route path="/gri-102-climate" element={<GRI102Climate />} />
        <Route path="/gri-103-energy" element={<GRI103Energy />} />
      </Routes>
      <GuidanceSidebar isOpen={false} guidanceText="" onClose={() => {}} />
      <SupportButton />
    </div>
  );
}

export default App;
