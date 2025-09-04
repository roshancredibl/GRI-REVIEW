import { useState } from 'react';

export interface GuidanceState {
  isOpen: boolean;
  guidanceText: string;
}

export const useGuidance = () => {
  const [guidanceState, setGuidanceState] = useState<GuidanceState>({
    isOpen: false,
    guidanceText: ''
  });

  const openGuidance = (text: string) => {
    setGuidanceState({ isOpen: true, guidanceText: text });
  };

  const closeGuidance = () => {
    setGuidanceState({ isOpen: false, guidanceText: '' });
  };

  return {
    guidanceState,
    openGuidance,
    closeGuidance
  };
};
