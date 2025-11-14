// src/shared/components/ui/Button.js
import React from 'react';

const Button = ({ children, onClick, variant = 'primary', type = 'button', fullWidth = false }) => {
  const getButtonStyle = () => {
    const baseStyle = {
      padding: '14px 20px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      width: fullWidth ? '100%' : 'auto',
      fontSize: '16px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      fontFamily: 'inherit'
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          background: 'linear-gradient(135deg, #800000, #990000)', // Maroon gradient
          color: 'white',
          boxShadow: '0 4px 15px rgba(128, 0, 0, 0.3)' // Maroon shadow
        };
      case 'text':
        return {
          ...baseStyle,
          background: 'none',
          color: '#800000', // Maroon color
          textDecoration: 'underline',
          boxShadow: 'none'
        };
      default:
        return baseStyle;
    }
  };

  const buttonStyle = getButtonStyle();

  return (
    <button 
      type={type} 
      onClick={onClick} 
      style={buttonStyle}
      onMouseOver={(e) => {
        if (variant === 'primary') {
          e.target.style.background = 'linear-gradient(135deg, #990000, #660000)'; // Darker maroon
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 6px 20px rgba(128, 0, 0, 0.4)';
        }
      }}
      onMouseOut={(e) => {
        if (variant === 'primary') {
          e.target.style.background = 'linear-gradient(135deg, #800000, #990000)'; // Original maroon
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 15px rgba(128, 0, 0, 0.3)';
        }
      }}
    >
      {children}
    </button>
  );
};

export default Button;