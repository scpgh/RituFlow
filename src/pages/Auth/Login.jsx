import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';

export default function Login() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('enterprise'); // 'enterprise' or 'officer'
  const [mobileNumber, setMobileNumber] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [isError, setIsError] = useState(false);

  const handleSendOtp = () => {
    if (mobileNumber.length === 10) {
      setIsSending(true);
      setTimeout(() => {
        setIsSending(false);
        setShowOtp(true);
      }, 800);
    } else {
      setIsError(true);
      setTimeout(() => setIsError(false), 2000);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const nextDigits = [...otpDigits];
    nextDigits[index] = value;
    setOtpDigits(nextDigits);

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (userType === 'enterprise') {
      navigate('/enterprise/dashboard');
    } else {
      navigate('/officer/dashboard');
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md relative z-10">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <img src="/l2.png" alt="RituFlow Logo" className="w-20 h-20 object-contain mb-3" />
          <h1 className="font-headline-md text-headline-md font-outfit text-primary tracking-tight font-extrabold">RituFlow</h1>
          <p className="font-label-md text-label-md text-on-surface-variant mt-1">Rural Fintech</p>
        </div>

        {/* Card */}
        <div className="glass-card rounded-2xl shadow-xl p-8 border-l-4 border-primary">
          <div className="mb-8">
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Welcome to RituFlow AI</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Please authenticate to access your dashboard.</p>
          </div>

          <form className="space-y-6" onSubmit={handleLoginSubmit}>
            {/* User Type Selection */}
            <div className="space-y-2">
              <label className="font-label-md text-label-md text-on-surface-variant ml-1 font-semibold">Login as</label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-surface-container rounded-lg border border-outline-variant">
                <button
                  type="button"
                  onClick={() => setUserType('enterprise')}
                  className={`py-2 px-4 rounded-md text-label-md transition-all duration-200 ${
                    userType === 'enterprise'
                      ? 'bg-surface-container-lowest text-primary shadow-sm ring-1 ring-black/5 font-semibold'
                      : 'text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  Micro Enterprise
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('officer')}
                  className={`py-2 px-4 rounded-md text-label-md transition-all duration-200 ${
                    userType === 'officer'
                      ? 'bg-surface-container-lowest text-secondary shadow-sm ring-1 ring-black/5 font-semibold'
                      : 'text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  Field Officer
                </button>
              </div>
            </div>

            {/* Mobile Number Input */}
            <div className="space-y-2">
              <label className="font-label-md text-label-md text-on-surface-variant ml-1 font-semibold" htmlFor="mobile">Mobile Number</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-on-surface-variant font-medium">+91</span>
                </div>
                <input
                  id="mobile"
                  type="tel"
                  maxLength="10"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 10-digit number"
                  className={`w-full pl-12 pr-4 py-3 bg-surface border rounded-lg font-body-md focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all placeholder:text-on-surface-variant/50 ${
                    isError ? 'ring-2 ring-error border-error' : 'border-outline'
                  }`}
                />
              </div>
            </div>

            {/* Send OTP Button */}
            {!showOtp && (
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={isSending}
                className="w-full h-12 bg-primary text-on-primary font-label-md text-label-md rounded-lg shadow-md hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-2 font-bold"
              >
                {isSending ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send OTP</span>
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </>
                )}
              </button>
            )}

            {/* OTP Area (Hidden initially) */}
            {showOtp && (
              <div className="space-y-4 pt-2 border-t border-outline-variant animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="font-label-md text-label-md text-on-surface-variant font-semibold">Enter OTP</label>
                    <button type="button" className="text-label-sm text-secondary font-semibold hover:underline">Resend in 0:45</button>
                  </div>
                  <div className="flex justify-between gap-2">
                    {otpDigits.map((digit, idx) => (
                      <input
                        key={idx}
                        id={`otp-${idx}`}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        className="otp-input w-12 h-14 text-center text-xl font-bold bg-surface border border-outline rounded-lg focus:outline-none focus:border-secondary transition-all"
                      />
                    ))}
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full h-12 bg-secondary text-on-secondary font-label-md text-label-md rounded-lg shadow-md hover:bg-on-secondary-fixed-variant active:scale-[0.98] transition-all font-bold"
                >
                  Verify &amp; Login
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Footer Links */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="flex gap-6">
            <a className="text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <span className="w-1 h-1 bg-outline-variant rounded-full mt-2"></span>
            <a className="text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Support</a>
            <span className="w-1 h-1 bg-outline-variant rounded-full mt-2"></span>
            <a className="text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Terms</a>
          </div>
          <div className="flex items-center gap-2 px-4 py-1.5 bg-surface-container-high rounded-full border border-outline-variant/30">
            <span className="material-symbols-outlined text-[14px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
            <span className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Secure Government Grade Encryption</span>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
