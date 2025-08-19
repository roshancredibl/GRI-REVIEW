import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <nav className="sidebar" id="sidebar">
      <NavLink to="/" className="nav-item">
        <span>📊</span>
        <span>Dashboard</span>
      </NavLink>
      <NavLink to="/" className="nav-item">
        <span>📈</span>
        <span>Analytics</span>
      </NavLink>
      <NavLink to="/" className="nav-item active">
        <span>🌍</span>
        <span>ESG</span>
      </NavLink>
      <NavLink to="/" className="nav-item">
        <span>🏢</span>
        <span>Facilities</span>
      </NavLink>
      <NavLink to="/" className="nav-item">
        <span>🎯</span>
        <span>Projects & Goals</span>
      </NavLink>
      <NavLink to="/" className="nav-item">
        <span>💬</span>
        <span>Ask EVA</span>
      </NavLink>
      <NavLink to="/" className="nav-item">
        <span>📊</span>
        <span>Benchmarking</span>
      </NavLink>
      <NavLink to="/" className="nav-item">
        <span>🛒</span>
        <span>Value Chain Partners</span>
      </NavLink>
      <NavLink to="/" className="nav-item">
        <span>📄</span>
        <span>Reports</span>
      </NavLink>
      <NavLink to="/" className="nav-item">
        <span>📁</span>
        <span>Documents</span>
      </NavLink>
      <NavLink to="/" className="nav-item">
        <span>⚙️</span>
        <span>Automation</span>
      </NavLink>
      <NavLink to="/" className="nav-item">
        <span>🔧</span>
        <span>Settings</span>
      </NavLink>
    </nav>
  );
};

export default Sidebar;
