import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';
import HandsImage from '../../assets/Hands.jpg';
import BackArrow from '../../assets/left-arrow.png';

const SignIn = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetError, setResetError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginEmail && password) {
      navigate('/job-dashboard');
    } else {
      setErrorMessage('Please enter both email and password');
    }
  };

  const handleBack = () => {
    if (step === 'emailReset') setStep('login');
    else if (step === 'passwordSent') setStep('emailReset');
    else if (step === 'passwordReset') setStep('passwordSent');
    else navigate('/');
  };

  const handleSubmitReset = (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      setResetError('Please fill in both password fields');
    } else if (newPassword !== confirmPassword) {
      setResetError('Passwords do not match');
    } else {
      setSuccess(true);
    }
  };

  return (
    <>
      {/* LOGIN STEP */}
      {step === 'login' && (
        <div className="login-container">
          <img src={BackArrow} alt="Back" className="back-arrow" onClick={handleBack} />
          <div className="form-box">
            <h1>Log In</h1>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="Email"
                className="inputs"
              />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="inputs"
              />
              <div className="form-options">
                <div className="remember-me">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <span>Remember me</span>
                </div>
                <span className="forgot-password" onClick={() => setStep('emailReset')}>
                  Forgot Password?
                </span>
              </div>

              {errorMessage && <div className="error-message">{errorMessage}</div>}
              <button type="submit" className="login-button">Log In</button>
            </form>
          </div>
          <div className="login-image">
            <img src={HandsImage} alt="Hands working on laptop" className="hands-image" />
          </div>
        </div>
      )}

      {/* EMAIL RESET STEP */}
      {step === 'emailReset' && (
        <div className="login-container">
          <img src={BackArrow} alt="Back" className="back-arrow" onClick={handleBack} />
          <div className="email-form-box">
            <h2>Reset your password</h2>
            <p>Enter your SkillSphere.com email address so we can reset your password.</p>
            <input
              type="email"
              placeholder="Enter Email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="email-inputs"
            />
            <button onClick={() => setStep('passwordSent')} className="next-btn">Next</button>
          </div>
          <div className="imagesection" />
        </div>
      )}

      {/* PASSWORD SENT STEP */}
      {step === 'passwordSent' && (
        <div className="sent-container">
          <img src={BackArrow} alt="Back" className="back-arrow-button" onClick={handleBack} />
          <div className="sent-form-section">
            <h1 className="sent-header">Password Sent</h1>
            <p className="sent-message">
              An email has been sent to {resetEmail || 'your email address'}. If this email address is
              registered to SkillSphere.com, you'll receive instructions on how to set a new password.
            </p>
            <div className="email-input-container">
              <input
                type="email"
                className="email-input"
                placeholder="Enter Email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
              />
            </div>
            <div className="resend-link-container">
              <span className="resend-link" onClick={() => alert('Email resent successfully!')}>
                Didn't get an email?
              </span>
            </div>
            <button className="next-button" onClick={() => setStep('passwordReset')}>Next</button>
          </div>
          <div className="image-section">
            <img src={HandsImage} alt="Workspace with laptop" className="hands-image" />
          </div>
        </div>
      )}

      {/* PASSWORD RESET STEP */}
      {step === 'passwordReset' && (
        <div className="reset-container">
          <img src={BackArrow} alt="Back" className="back-arrow-button" onClick={handleBack} />
          <div className="form-box">
            <h2>Reset the user account password</h2>
            {success ? (
              <div className="success-message">
                <p>Password has been successfully reset.</p>
                <button onClick={() => setStep('login')}>Return to Login</button>
              </div>
            ) : (
              <form onSubmit={handleSubmitReset}>
                <div className="input-group">
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                {resetError && <div className="error-message">{resetError}</div>}
                <button type="submit" className="confirm-button">Confirm</button>
              </form>
            )}
          </div>
          <div className="image-box" />
        </div>
      )}
    </>
  );
};

export default SignIn;