import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import './ClientDashboard.css';
import Skillspherelogo from '../../assets/skillspherelogo.png';
import ProfilePic from '../../assets/user.png';
import NotificationIcon from '../../assets/notification.png';
import SearchIcon from '../../assets/search.png';
import editIcon from '../../assets/edit.png';
import deleteIcon from '../../assets/delete.png';
import taskIcon from '../../assets/task.png';
import assign from '../../assets/assign.png';
import chat from '../../assets/chat.png';
import profileIcon from '../../assets/profileIcon.png';
import subscriptionIcon from '../../assets/subscriptionIcon.png';
import logoutIcon from '../../assets/logoutIcon.png';
import plus from '../../assets/plus.png';
import ProfilePage from '../../components/ProfilePage/ProfilePage';
import SubscriptionPage from '../../components/SubscriptionPage/SubscriptionPage';
import contact from '../../assets/contact.png';

const JobDashboard = () => {
  const [view, setView] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notificationRef = useRef(null);
  const profileMenuRef = useRef(null);
  const navigate = useNavigate();
  const notifications = [];

  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => navigate('/client-profile');
  const handleSubscriptionClick = () => navigate('/subscription');
  const handleLogoutClick = () => navigate('/');
  const handleLogoClick = () => navigate('/admin-dashboard');

  const renderDashboardView = () => (
    <div className="container">
      <div className="cards">
        <img src={contact} alt="Janice Virtudazo Conde" className="profile-pc" />
        <div className="card-content">
          <h2>Janice Virtudazo Conde</h2>
          <p>
            Looking for a talented content writer to create engaging articles and blog posts.
            SEO knowledge is a plus.
          </p>
          <div className="tags">
            <span className="tag">Logo design</span>
            <span className="tag">Blog Writer</span>
            <span className="tag">Copy Editor</span>
          </div>
          <button className="chat-button">Chat</button>
        </div>
      </div>

      <div className="cards">
        <img src={contact} alt="Francine Malagum" className="profile-pc" />
        <div className="card-content">
          <h2>Francine Malagum</h2>
          <p>
            Seeking a creative graphic designer with experience in Adobe Suite.
            Must have a strong portfolio.
          </p>
          <div className="tags">
            <span className="tag">Logo design</span>
            <span className="tag">Blog Writer</span>
            <span className="tag">Copy Editor</span>
          </div>
          <button className="chat-button">Chat</button>
        </div>
      </div>

      <a href="#" className="view-more">View more</a>
    </div>
  );

  const renderTasklistView = () => (
    <div className="task-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <span className="sidebar-title">Tasklist</span>
          <img src={plus} alt="Add" className="icon-btn" />
        </div>
      </div>
      <div className="main-content">
        <div className="top-actions">
          <img src={editIcon} alt="Edit" className="icon-btn" />
          <img src={assign} alt="Add User" className="icon-btn" />
          <img src={deleteIcon} alt="Delete" className="icon-btn" />
        </div>
        <div className="empty-task">
          <img src={taskIcon} alt="Tasks" className="task-icon" />
          <h4>No task yet</h4>
          <p>create and assign people to keep on track</p>
          <button className="create-btn">Create task</button>
        </div>
      </div>
    </div>
  );

  const renderProjectsView = () => (
    <div className="projects-container">
      <h2 className="projects-title">Projects</h2>
      <div className="projects-card">
        <h3 className="projects-card-title">Create a New Project</h3>
        <p className="projects-card-description">
          Millions of talented freelancers are ready to <br />
          help you do amazing things.
        </p>
      </div>
      <button className="projects-button">Post a project</button>
    </div>
  );

  const renderMessagesView = () => (
    <div className="messages-wrapper">
      <div className="sidebar">
        <div className="chats-header">
          <span className="chats-title">Chats</span>
        </div>
        <div className="search-wrapper">
          <img src={SearchIcon} alt="Search Icon" className="srch-icon" />
          <input type="text" placeholder="Search" className="search-bar" />
        </div>
        <div className="chats-request">Request</div>
        <p className="no-messages">No messages yet.</p>
      </div>
      <div className="message-welcome">
        <div className="message-icon">
          <img src={chat} alt="Chat Icon" />
        </div>
        <h2>Welcome to your messages</h2>
        <p>
          Start connecting with others by{' '}
          <span className="link-blue">browsing</span> or{' '}
          <span className="link-green">posting a project</span>.
        </p>
      </div>
    </div>
  );

  return (
    <div className="admin-dashboard">
      <nav className="top-navbar">
        <div className="logo-section">
          <img src={Skillspherelogo} alt="SkillSphere logo" className="logo-img" onClick={handleLogoClick} />
        </div>
        <div className="search-section">
          <img src={SearchIcon} alt="Search" className="search-icon" />
          <input type="text" placeholder="Search.." className="search-input" />
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

      <nav className="dashboard-nav">
        <ul className="nav-list">
          <li className={`nav-item ${view === 'dashboard' ? 'active' : ''}`} onClick={() => setView('dashboard')}>
            Dashboard
          </li>
          <li className={`nav-item ${view === 'tasklist' ? 'active' : ''}`} onClick={() => setView('tasklist')}>
            Tasklists
          </li>
          <li className={`nav-item ${view === 'projects' ? 'active' : ''}`} onClick={() => setView('projects')}>
            My Project
          </li>
          <li className={`nav-item ${view === 'messages' ? 'active' : ''}`} onClick={() => setView('messages')}>
            Messages
          </li>
        </ul>
      </nav>

      {view === 'dashboard' && renderDashboardView()}
      {view === 'tasklist' && renderTasklistView()}
      {view === 'projects' && renderProjectsView()}
      {view === 'messages' && renderMessagesView()}

      <Routes>
        <Route path="/client-profile" element={<ProfilePage />} />
        <Route path="/subscription" element={<SubscriptionPage />} />
      </Routes>
    </div>
  );
};

export default JobDashboard;
