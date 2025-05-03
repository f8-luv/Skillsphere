import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Contacts from './components/Contacts/Contacts';
import CreateAccount from './components/CreateAccount/CreateAccount';
import SignIn from './components/SignIn/SignIn';
import JobDashboard from './components/JobDashboard/JobDashboard';
import ProfilePage from './components/ProfilePage/ProfilePage';
import SubscriptionPage from './components/SubscriptionPage/SubscriptionPage';
import Admin from './components/Admin/Admin';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import ClientDashboard from './components/ClientDashboard/ClientDashboard';
import ClientProfile from './components/ClientPofile/ClientProfile';

const AppContent = () => {
  return (
    <Routes>
      <Route path="/" element={<><Hero /><About /><Contacts /></>} />
      <Route path="/signup" element={<CreateAccount />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/job-dashboard" element={<JobDashboard />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/subscription" element={<SubscriptionPage />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/client-dashboard" element={<ClientDashboard />} />
      <Route path="/client-profile" element={<ClientProfile />} />
    </Routes>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
