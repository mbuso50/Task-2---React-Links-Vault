import React from 'react';
import './Button.css';

type ButtonProps = {
  text: string;
  onClick?: () => void;
  color?: string;
  hoverColor?: string;
  className?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const Button = ({
  text,
  onClick = () => { },
  color = '#471396',
  hoverColor = '#B13BFF',
  className = '',
  fullWidth = false,
  icon
}: ButtonProps) => {
  const buttonClasses = `button ${className} ${fullWidth ? 'full-width' : ''}`;
  const buttonStyle = {
    backgroundColor: color,
    '--hover-color': hoverColor
  } as React.CSSProperties;

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      style={buttonStyle}
    >
      {icon && <span className="button-icon">{icon}</span>}
      {text}
    </button>
  );
};

export default Button;