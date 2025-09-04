import React from 'react';
import InfoIcon from '../components/InfoIcon';
import { useGuidance } from '../hooks/useGuidance';
import GuidanceSidebar from '../components/GuidanceSidebar';

/**
 * Higher-order component that adds standardized guidance functionality to any GRI page
 * Usage: export default withGuidance(YourComponent, "GRI###");
 */
export function withGuidance<T extends object>(
  Component: React.ComponentType<T>, 
  griStandard: string
) {
  return function WrappedComponent(props: T) {
    const { guidanceState, openGuidance, closeGuidance } = useGuidance();
    
    return (
      <>
        <Component {...props} openGuidance={openGuidance} />
        <GuidanceSidebar
          guidanceState={guidanceState}
          closeGuidance={closeGuidance}
          griStandard={griStandard}
        />
      </>
    );
  };
}

/**
 * Template for adding guidance system to any existing GRI page
 * Copy and paste this template and replace the placeholders
 */
export const GRI_PAGE_TEMPLATE = `
// 1. Add these imports at the top
import InfoIcon from '../../../components/InfoIcon'; // Adjust path as needed
import { useGuidance } from '../../../hooks/useGuidance';
import GuidanceSidebar from '../../../components/GuidanceSidebar';

// 2. Add this hook in your component
const { guidanceState, openGuidance, closeGuidance } = useGuidance();

// 3. Replace static <div className="info-icon">i</div> with:
<InfoIcon 
  title="Your guidance text here"
  onClick={() => openGuidance("Your guidance text here")}
/>

// 4. Wrap your return statement with React Fragment and add sidebar:
return (
  <>
    <div className="page-container">
      {/* Your existing content */}
    </div>

    {/* Guidance Sidebar */}
    <GuidanceSidebar
      guidanceState={guidanceState}
      closeGuidance={closeGuidance}
      griStandard="GRI###" // Replace with your GRI number
    />
  </>
);
`;

/**
 * Quick setup function for adding guidance to static pages
 */
export interface GuidancePageProps {
  children: React.ReactNode;
  griStandard: string;
}

export const GuidancePage: React.FC<GuidancePageProps> = ({ children, griStandard }) => {
  const { guidanceState, openGuidance, closeGuidance } = useGuidance();
  
  return (
    <>
      {children}
      <GuidanceSidebar
        guidanceState={guidanceState}
        closeGuidance={closeGuidance}
        griStandard={griStandard}
      />
    </>
  );
};
