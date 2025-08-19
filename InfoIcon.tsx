import React from 'react';

interface InfoIconProps {
  title: string;
  onClick: () => void;
}

const InfoIcon: React.FC<InfoIconProps> = ({ title, onClick }) => {
  return (
    <div 
      className="info-icon" 
      title={title}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      i
    </div>
  );
};

export default InfoIcon;
