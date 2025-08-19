import React from 'react';

const SupportButton: React.FC = () => {
  const handleSupportClick = () => {
    console.log('Support button clicked');
  };

  return (
    <button className="support-btn" onClick={handleSupportClick}>
      ?
    </button>
  );
};

export default SupportButton;
