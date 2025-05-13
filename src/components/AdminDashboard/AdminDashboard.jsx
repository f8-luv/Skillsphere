import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import './AdminDashboard.css';
import Skillspherelogo from '../../assets/skillspherelogo.png';
import ProfilePic from '../../assets/user.png';
import NotificationIcon from '../../assets/notification.png';
import SearchIcon from '../../assets/search.png';
import profileIcon from '../../assets/profileIcon.png';
import logoutIcon from '../../assets/logoutIcon.png';
import ProfilePage from '../../components/ProfilePage/ProfilePage';
import contact from '../../assets/contact.png';
import chat from '../../assets/chat.png'; 

const AdminDashboard = () => {
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

  const jobs = [
    {
      title: 'Content Writer',
      price: '$400 per month',
      description: 'Looking for a talented content writer to create engaging articles and blog posts. SEO knowledge is a plus.',
    },
    {
      title: 'Graphic Designer',
      price: '$600 per month',
      description: 'Seeking a creative graphic designer with experience in Adobe Suite. Must have a strong portfolio.',
    },
  ];

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleLogoutClick = () => {
    navigate('/');
  };

  const handleLogoClick = () => {
    navigate('/admin-dashboard');
  };

  const renderDashboardView = () => (
    <main className="dashboard-main">
      <div className="dashboard-container">
        <div className="cards">
          <h2>Users</h2>
          <p>Total Users: 50</p>
          <div className="table">
            <div className="table-header">
              <span>Name</span>
              <span>Email</span>
              <span>Role</span>
            </div>
            <div className="table-row">
              <span>Janice Conde</span>
              <span><a href="mailto:conde@gmail.com">conde@gmail.com</a></span>
              <span>Freelancer</span>
            </div>
            <div className="table-row">
              <span>Francine Malagum</span>
              <span><a href="mailto:malagum@gmail.com">malagum@gmail.com</a></span>
              <span>Client</span>
            </div>
          </div>
          <div className="view-link">View</div>
        </div>

        <div className="cards">
          <h2>Jobs</h2>
          <p>Total Jobs: 150</p>
          <div className="table">
            <div className="table-header">
              <span>Title</span>
              <span>Client</span>
              <span>Status</span>
            </div>
            <div className="table-row">
              <span>Content Writer</span>
              <span>SkillSphere</span>
              <span>Open</span>
            </div>
            <div className="table-row">
              <span>Graphic Designer</span>
              <span>Amazon</span>
              <span>Closed</span>
            </div>
          </div>
          <div className="view-link">View</div>
        </div>
      </div>
    </main>
  );

  const renderUsers = () => (
    <div className="usercards-container">
      <div className="user-card">
        <img src={contact} alt="Janice" className="avatar" />
        <div className="user-info">
          <h3>Janice Virtudazo Conde</h3>
          <p>
            Looking for a talented content writer to create engaging articles and blog posts. SEO knowledge is a plus.
          </p>
          <div className="tags">
            <span>Logo design</span>
            <span>Blog Writer</span>
            <span>Copy Editor</span>
          </div>
          <button className="chat-button">Chat</button>
        </div>
      </div>

      <div className="user-card">
        <img src={contact} alt="Francine" className="avatar" />
        <div className="user-info">
          <h3>Francine Malagum</h3>
          <p>
            Seeking a creative graphic designer with experience in Adobe Suite. Must have a strong portfolio.
          </p>
          <button className="chat-button">Chat</button>
        </div>
      </div>

      <div className="view-more">View more</div>
    </div>
  );

  const renderJobs = () => (
    <div className="job-list-container">
      {jobs.map((job, index) => (
        <div className="job-card" key={index}>
          <div className="job-header">
            <strong className="job-title">{job.title}</strong>
            <strong className="job-price">{job.price}</strong>
          </div>
          <p className="job-description">{job.description}</p>
          <button className="delete-btton">Delete</button>
        </div>
      ))}
      <p className="view-more">View more</p>
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
          Start connecting with others
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
          <li className={`nav-item ${view === 'users' ? 'active' : ''}`} onClick={() => setView('users')}>
            Users
          </li>
          <li className={`nav-item ${view === 'jobs' ? 'active' : ''}`} onClick={() => setView('jobs')}>
            Jobs
          </li>
          <li className={`nav-item ${view === 'message' ? 'active' : ''}`} onClick={() => setView('message')}>
            Message
          </li>
        </ul>
      </nav>

      {view === 'dashboard' && renderDashboardView()}
      {view === 'users' && renderUsers()}
      {view === 'jobs' && renderJobs()}
      {view === 'message' && renderMessagesView()}

      <Routes>
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
};

export default AdminDashboard;