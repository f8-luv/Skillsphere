import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';
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
    navigate('/job-dashboard');
  };

  return (
    <div className="profile-page">
      <nav className="tp-navbar">
        <div className="logo-sec">
          <img src={Skillspherelogo} alt="SkillSphere logo" className="logos-img" onClick={handleLogoClick}/>
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
        <h2 className="profile-name">Janice Virtudazo Conde</h2>

        <div className="skills-section">
          <h3 className="section-title">Skills</h3>
          <div className="skills-list">
            <span className="skill-tag">Logo design</span>
            <span className="skill-tag">Blog Writer</span>
            <span className="skill-tag">Copy Editor</span>
            <span className="skill-tag">Content Creator</span>
          </div>
        </div>

        <div className="experience-section">
          <h3 className="section-title">Experience</h3>
          <div className="experience-list">
            <div className="experience-item">
              <div className="experience-role">Content Creator</div>
              <div className="experience-year">2022-2023</div>
              <div className="experience-company">Multi Covenant</div>
            </div>
          </div>

          <button className="add-experience">+ Add experience</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;