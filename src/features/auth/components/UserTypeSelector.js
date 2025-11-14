// src/features/auth/components/UserTypeSelector.js
import React from 'react';

const UserTypeSelector = ({ selectedType, onTypeChange }) => {
  const userTypeOptions = [
    { 
      value: 'student', 
      label: 'Student'
    },
    { 
      value: 'admin', 
      label: 'Admin'
    }
  ];

  return (
    <div className="user-type-selector">
      <label>Select User Type:</label>
      <div className="user-type-buttons">
        {userTypeOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`user-type-btn ${selectedType === option.value ? 'selected' : ''}`}
            onClick={() => onTypeChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserTypeSelector;