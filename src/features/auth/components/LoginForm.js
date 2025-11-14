// src/features/auth/components/LoginForm.js
import React, { useState } from 'react';
import Button from '../../../shared/components/ui/Button';
import UserTypeSelector from './UserTypeSelector';
import OTPScreen from './OTPScreen';
import ForgotPassword from './ForgotPassword';

const LoginForm = ({ onLogin, onUserTypeChange }) => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [userType, setUserType] = useState('student');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: '',
    studentId: ''  // Only student ID, no faculty/staff
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    if (onUserTypeChange) {
      onUserTypeChange(type);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isNewUser) {
      // Register logic - show OTP after registration
      setShowOtp(true);
    } else {
      // Login logic
      console.log('Logging in:', { email: formData.email, password: formData.password, userType });
      
      // 🔐 ROLE-BASED AUTHENTICATION
      if (userType === 'admin') {
        // Define admin roles with specific credentials
        const adminRoles = {
          'program-office': {
            email: 'programoffice@iba.edu.pk',
            password: 'IBAProgram2024',
            role: 'program-office'
          },
          'building-incharge': {
            email: 'buildingincharge@iba.edu.pk', 
            password: 'IBABuilding2024',
            role: 'building-incharge'
          }
        };
        
        // Check which role the credentials match
        let authenticatedRole = null;
        
        if (formData.email === adminRoles['program-office'].email && 
            formData.password === adminRoles['program-office'].password) {
          authenticatedRole = 'program-office';
        } else if (formData.email === adminRoles['building-incharge'].email && 
                  formData.password === adminRoles['building-incharge'].password) {
          authenticatedRole = 'building-incharge';
        }
        
        if (authenticatedRole) {
          if (onLogin) onLogin('admin', authenticatedRole); // Pass the specific role
        } else {
          alert('❌ Invalid admin credentials.\n\nProgram Office:\nEmail: programoffice@iba.edu.pk\nPassword: IBAProgram2024\n\nBuilding Incharge:\nEmail: buildingincharge@iba.edu.pk\nPassword: IBABuilding2024');
          return;
        }
      } else {
        // Student login - no restrictions for now
        if (onLogin) onLogin('student', 'student');
      }
    }
  };

  const handleOtpVerify = (otp) => {
    // OTP verification logic
    console.log('OTP Verified:', otp);
    setShowOtp(false);
    
    // After OTP verification, navigate to dashboard
    if (onLogin) {
      onLogin(userType, userType === 'admin' ? 'program-office' : 'student');
    }
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handlePasswordReset = (email) => {
    // Simulate sending reset code to email
    console.log('Password reset code sent to:', email);
    alert(`📧 Password reset code sent to ${email}\n\n(In real implementation, this would send an actual email)`);
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setShowOtp(false);
  };

  // If Forgot Password screen should be shown
  if (showForgotPassword) {
    return (
      <ForgotPassword 
        onResetPassword={handlePasswordReset}
        onBackToLogin={handleBackToLogin}
      />
    );
  }

  // If OTP screen should be shown
  if (showOtp) {
    return (
      <OTPScreen 
        email={formData.email}
        onVerify={handleOtpVerify}
        onResendOtp={() => console.log('Resend OTP')}
        onBack={handleBackToLogin}
      />
    );
  }

  return (
    <div className="auth-form">
      <h2>IBA Room Booking System</h2>
      
      {/* User Type Selection - Only Student & Admin */}
      <UserTypeSelector 
        selectedType={userType}
        onTypeChange={handleUserTypeChange}
      />

      <form onSubmit={handleSubmit}>
        {/* Show additional fields for new users */}
        {isNewUser && (
          <>
            <div className="form-group">
              <input 
                type="text" 
                name="fullName"
                placeholder="Full Name" 
                value={formData.fullName}
                onChange={handleInputChange}
                required 
              />
            </div>

            {/* Only show Student ID field for Student registration */}
            {userType === 'student' && (
              <div className="form-group">
                <input 
                  type="text" 
                  name="studentId"
                  placeholder="Student ID" 
                  value={formData.studentId}
                  onChange={handleInputChange}
                  required 
                />
              </div>
            )}

            {/* No faculty/staff fields - only Student and Admin */}
          </>
        )}

        {/* Common fields for both login and register */}
        <div className="form-group">
          <input 
            type="email" 
            name="email"
            placeholder="IBA Email Address" 
            value={formData.email}
            onChange={handleInputChange}
            required 
          />
        </div>

        <div className="form-group">
          <input 
            type="password" 
            name="password"
            placeholder="Password" 
            value={formData.password}
            onChange={handleInputChange}
            required 
          />
        </div>

        {/* Confirm Password only for registration */}
        {isNewUser && (
          <div className="form-group">
            <input 
              type="password" 
              name="confirmPassword"
              placeholder="Confirm Password" 
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required 
            />
          </div>
        )}

        {/* Forgot Password Link - Only show for login, not registration */}
        {!isNewUser && (
          <div className="forgot-password-link">
            <Button 
              type="button" 
              variant="text" 
              onClick={handleForgotPassword}
              style={{ fontSize: '14px', padding: '5px 0' }}
            >
              Forgot Password?
            </Button>
          </div>
        )}

        <Button type="submit" variant="primary" fullWidth>
          {isNewUser ? 'Register & Send OTP' : 'Login'}
        </Button>
      </form>

      {/* Toggle between Login and Register */}
      <div className="auth-toggle">
        <p>
          {isNewUser ? 'Already have an account?' : "Don't have an account?"}
          <Button 
            type="button" 
            variant="text" 
            onClick={() => setIsNewUser(!isNewUser)}
          >
            {isNewUser ? 'Login here' : 'Register here'}
          </Button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;