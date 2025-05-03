import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ClientProfile.css';
import user from '../../assets/user.png';
import Skillspherelogo from '../../assets/skillspherelogo.png';
import SearchIcon from '../../assets/search.png';
import ProfilePic from '../../assets/user.png';
import NotificationIcon from '../../assets/notification.png';
import profileIcon from '../../assets/profileIcon.png';
import subscriptionIcon from '../../assets/subscriptionIcon.png';
import logoutIcon from '../../assets/logoutIcon.png';

const ProfilePage = () => {
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications] = useState([]);
  const notificationRef = useRef(null);
  const profileMenuRef = useRef(null);
  const navigate = useNavigate();

  const handleCoverPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverPhoto(URL.createObjectURL(file));
    }
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(URL.createObjectURL(file));
    }
  };

  const handleClickOutside = (event) => {
    if (notificationRef.current && !notificationRef.current.contains(event.target)) {
      setShowNotifications(false);
    }
    if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
      setShowProfileMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleSubscriptionClick = () => {
    navigate('/subscription');
  };

  const handleLogoutClick = () => {
    navigate('/');
  };

  const handleLogoClick = () => {
    navigate('/client-dashboard');
  };

  return (
    <div className="profile-page">
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
                  <li className="profile-item" onClick={handleSubscriptionClick}>
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

      <div className="profile-header">
        {coverPhoto ? (
          <img src={coverPhoto} alt="Cover" className="cover-photo" />
        ) : (
          <div className="add-cover-photo">
            <label htmlFor="coverPhotoInput" className="upload-button">
              Add cover photo
            </label>
            <input
              type="file"
              id="coverPhotoInput"
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleCoverPhotoChange}
            />
          </div>
        )}
        <div className="profile-info">
          <label htmlFor="profilePhotoInput" className="profile-picture-label">
            <img
              src={profilePhoto || user}
              alt="Profile"
              className="profile-picture"
            />
            {!profilePhoto && <div className="add-profile-photo-text">Add profile photo</div>}
          </label>
          <input
            type="file"
            id="profilePhotoInput"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleProfilePhotoChange}
          />
        </div>
      </div>

      <div className="profile-content">
        <h2 className="profile-name">Glyce Francine Malagum</h2>

        <div className="project-card">
          <div className="project-header">
            <span className="project-role">Content Writer</span>
            <span className="project-prce">$400 per month</span>
          </div>
          <p className="projct-description">
            Looking for a talented content writer to create engaging articles and blog posts. SEO knowledge is a plus.
          </p>
          <button className="dlete-button">Delete</button>
          <div className="divider" />
          <div className="project-header">
            <span className="project-role">Graphic Designer</span>
            <span className="project-price">$600 per month</span>
          </div>
          <p className="project-description">
            Seeking a creative graphic designer with experience in Adobe Suite. Must have a strong portfolio.
          </p>
          <button className="delete-button">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;