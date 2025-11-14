// src/features/auth/components/OTPScreen.js
import React, { useState } from 'react';
import Button from '../../../shared/components/ui/Button';
const OTPScreen = ({ email, onVerify, onResendOtp }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleOtpChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-focus next input
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`)?.focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    onVerify?.(otpString);
  };

  return (
    <div className="otp-screen">
      <h2>Verify Your Email</h2>
      <p>We sent a verification code to {email}</p>
      
      <form onSubmit={handleSubmit}>
        <div className="otp-inputs">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              className="otp-digit"
            />
          ))}
        </div>
        
        <Button type="submit" variant="primary" fullWidth>
          Verify OTP
        </Button>
        
        <div className="otp-actions">
          <Button type="button" variant="text" onClick={onResendOtp}>
            Resend OTP
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OTPScreen;