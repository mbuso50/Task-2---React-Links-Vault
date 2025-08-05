import React from 'react';
import './Button.css';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  color?: string;
  hoverColor?: string; // Add hoverColor to props
  className?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick = () => { },
  color = '#471396',
  hoverColor = '#B13BFF', // Default hover color
  className = '',
  fullWidth = false,
  icon
}) => {
  return (
    <button
      className={`button ${className} ${fullWidth ? 'full-width' : ''}`}
      onClick={onClick}
      style={{
        backgroundColor: color,
        '--hover-color': hoverColor // CSS variable for hover state
      } as React.CSSProperties}
    >
      {icon && <span className="button-icon">{icon}</span>}
      {text}
    </button>
  );
};

export default Button;