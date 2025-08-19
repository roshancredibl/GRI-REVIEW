# GRI Framework Dashboard

A comprehensive React TypeScript application for managing GRI (Global Reporting Initiative) ESG reporting workflows. This application provides a professional interface for organizations to complete their GRI compliance questionnaires with guidance and SDG linkage features.

## Features

- **Multi-level Navigation**: Hierarchical page structure with proper routing
- **GRI Standards Coverage**: 
  - Universal Standards
  - Sector Standards  
  - Topic Standards 2025 (GRI 101: Biodiversity, GRI 102: Climate Change, GRI 103: Energy)
- **Interactive Guidance System**: Click "i" icons for detailed guidance on each question
- **SDG Linkage**: Automatic mapping of questions to relevant Sustainable Development Goals
- **Professional UI/UX**: Modern, responsive design with consistent styling
- **Form Management**: Comprehensive form elements for data collection
- **Access and Benefit Sharing Compliance**: Detailed questionnaire with sub-questions

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Application header
│   ├── Sidebar.tsx     # Navigation sidebar
│   ├── InfoIcon.tsx    # Guidance icon component
│   ├── GuidanceSidebar.tsx # Guidance information panel
│   └── SupportButton.tsx   # Support button
├── pages/              # Page components
│   ├── Dashboard.tsx   # Main dashboard
│   ├── UniversalStandards.tsx
│   ├── SectorStandards.tsx
│   ├── TopicStandards2025.tsx
│   ├── GRI101Biodiversity.tsx
│   ├── GRI102Climate.tsx
│   └── GRI103Energy.tsx
├── App.tsx             # Main application component
├── index.tsx           # Application entry point
└── index.css           # Global styles
```

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

## Installation

1. **Clone or download the project files** to your local machine

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (not recommended)

## Usage

### Navigation
- **Dashboard**: Main overview with three main sections
- **Universal Standards**: Core GRI standards for all organizations
- **Sector Standards**: Industry-specific standards
- **Topic Standards 2025**: Material topic standards including:
  - GRI 101: Biodiversity 2024
  - GRI 102: Climate Change 2025
  - GRI 103: Energy 2025

### Guidance System
- Click the "i" icon next to any question to open guidance information
- Guidance sidebar includes:
  - Detailed explanation of requirements
  - SDG linkage showing relevant Sustainable Development Goals
- Close guidance with the "×" button

### Form Features
- **Text Areas**: For detailed responses
- **Dropdowns**: For structured data selection
- **Number Inputs**: For quantitative data
- **Save Functionality**: Each section has save buttons
- **Attachments**: Links for document uploads

## Key Features Implemented

### 1. Access and Benefit Sharing Compliance (GRI 101-3)
- **Question 3a**: Compliance process with 4 sub-questions:
  - 3a i: Responsibility allocation across organizational levels
  - 3a ii: Identification of provider countries with regulations
  - 3a iii: Integration into organizational strategies and procedures
  - 3a iv: Training on regulations implementation
- **Question 3b**: Voluntary actions for access and benefit-sharing

### 2. SDG Linkage System
- Automatic detection of relevant SDGs based on question content
- Visual display with numbered badges and titles
- Covers SDGs 4, 8, 10, 12, 14, 15, 16, 17

### 3. Professional Styling
- Consistent color scheme and typography
- Responsive design for different screen sizes
- Smooth transitions and hover effects
- Professional form styling

## Technical Implementation

- **React 18** with TypeScript for type safety
- **React Router** for navigation and page routing
- **CSS Grid and Flexbox** for responsive layouts
- **State Management** with React hooks
- **Component-based Architecture** for maintainability

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Development Notes

- The application is built using Create React App with TypeScript
- All styling is done with CSS (no external UI libraries)
- The guidance system uses a sidebar that slides in from the right
- SDG linkage is calculated dynamically based on question content
- Form data is currently not persisted (would need backend integration)

## Future Enhancements

- Backend integration for data persistence
- User authentication and role-based access
- Export functionality for completed questionnaires
- Advanced form validation
- Multi-language support
- Integration with GRI reporting platforms

## Troubleshooting

If you encounter any issues:

1. **Port conflicts**: If port 3000 is in use, the app will automatically try the next available port
2. **Dependencies**: Run `npm install` if you see module not found errors
3. **TypeScript errors**: Ensure all dependencies are properly installed
4. **Build issues**: Clear node_modules and reinstall with `rm -rf node_modules && npm install`

## License

This project is for educational and development purposes. Please ensure compliance with GRI licensing requirements for production use.
