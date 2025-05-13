import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SubscriptionPage.css";
import Skillspherelogo from '../../assets/skillspherelogo.png';
import SearchIcon from '../../assets/search.png';
import ProfilePic from '../../assets/user.png';
import NotificationIcon from '../../assets/notification.png';
import profileIcon from '../../assets/profileIcon.png';
import subscriptionIcon from '../../assets/subscriptionIcon.png';
import logoutIcon from '../../assets/logoutIcon.png';

const SubscriptionPage = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications] = useState([]);
  const notificationRef = useRef(null);
  const profileMenuRef = useRef(null);
  const navigate = useNavigate();

  const [showGcashPayment, setShowGcashPayment] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('+63');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false); // State for showing payment success

  const handleClickOutside = (event) => {
    if (notificationRef.current && !notificationRef.current.contains(event.target)) {
      setShowNotifications(false);
    }
    if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
      setShowProfileMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLogoutClick = () => {
    navigate("/");
  };

  const handleLogoClick = () => {
    navigate('/job-dashboard');
  };

  const handlePayClick = (plan) => {
    setSelectedPlan(plan);
    setShowGcashPayment(true);
  };

  const handleGcashPay = () => {
    alert(`Payment for ${selectedPlan} plan initiated with GCash number: ${mobileNumber}`);
    setShowGcashPayment(false);
    setShowPaymentSuccess(true); 
  };

  return (
    <div className="subscription-page">
      <nav className="tp-navbar">
        <div className="logo-sec">
          <img src={Skillspherelogo} alt="SkillSphere logo" className="logos-img" onClick={handleLogoClick} />
        </div>
        <div className="searchsection">
          <img src={SearchIcon} alt="Search" className="searchicon" />
          <input type="text" placeholder="Search.." className="searchinput" />
        </div>
        <div className="icons-section">
          <div ref={notificationRef}>
            <img
              src={NotificationIcon}
              alt="Notifications"
              className="icon"
              onClick={() => setShowNotifications(!showNotifications)}
            />
            {showNotifications && (
              <div className="notification-dropdown">
                <h2 className="notifications-title">Notifications</h2>
                {notifications.length === 0 ? (
                  <div className="no-notifications">No notifications yet.</div>
                ) : (
                  notifications.map((notification, index) => (
                    <div key={index} className="notification-item">
                      {notification}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <div ref={profileMenuRef}>
            <img
              src={ProfilePic}
              alt="User Profile"
              className="profile-pic"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            />
            {showProfileMenu && (
              <div className="profile-menu">
                <h3 className="profile-title">My Profile</h3>
                <ul className="profile-list">
                  <li className="profile-item" onClick={handleProfileClick}>
                    <img src={profileIcon} alt="View Profile" className="profile-menu-icon" />
                    <span>View Profile</span>
                  </li>
                  <li className="profile-item">
                    <img src={subscriptionIcon} alt="Subscription" className="profile-menu-icon" />
                    <span>Subscription</span>
                  </li>
                  <li className="profile-item" onClick={handleLogoutClick}>
                    <img src={logoutIcon} alt="Log out" className="profile-menu-icon" />
                    <span>Log out</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>

      {showPaymentSuccess ? (
        <div className="payment-success-wrapper">
          <div className="payment-success-card">
            <h2 className="payment-success-title">Payment Successful</h2>
            <p className="payment-success-message">
              Thank you for your payment. Your transaction has been<br />
              successfully completed using GCash. You will receive a<br />
              confirmation email shortly.
            </p>

            <button className="go-home-button" onClick={() => navigate('/profile')}>
              Go to Profile
            </button>
          </div>
        </div>
      ) : (
        !showGcashPayment && (
          <div className="subscription-section">
            <h2>My Subscription</h2>
            <div className="plans">
              <div className="plan-card">
                <h3>Basic</h3>
                <p className="price">$3 per month</p>
                <p>Can apply to at least 5 jobs per week</p>
                <button onClick={() => handlePayClick("Basic")}>Pay</button>
              </div>

              <div className="plan-card">
                <h3>Standard</h3>
                <p className="price">$6 per month</p>
                <p>Can apply to at least 10 jobs per week</p>
                <button onClick={() => handlePayClick("Standard")}>Pay</button>
              </div>

              <div className="plan-card">
                <h3>Elite</h3>
                <p className="price">$12 per month</p>
                <p>Can apply to all jobs posted by clients</p>
                <button onClick={() => handlePayClick("Elite")}>Pay</button>
              </div>
            </div>
          </div>
        )
      )}

      {/* Gcash Payment Form */}
      {showGcashPayment && !showPaymentSuccess && (
        <div className="gcash-payment-wrapper">
          <div className="gcash-payment-card">
            <h2 className="plan-title">{selectedPlan}</h2>
            <h3 className="payment-method-title">Gcash Payment</h3>

            <label htmlFor="gcashNumber" className="input-label">
              GCash Mobile Number
            </label>
            <input
              id="gcashNumber"
              type="text"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="gcash-input"
            />

            <div className="pay-button-container">
              <button className="pay-button" onClick={handleGcashPay}>
                Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPage;
