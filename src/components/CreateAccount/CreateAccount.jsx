import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import './CreateAccount.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import Hands from '../../assets/Hands.jpg';
import backArrow from '../../assets/left-arrow.png';
import working from '../../assets/working.png';
import talent from '../../assets/talent.png';
import profileIcon from '../../assets/user-avatar.png';
import GraphicandDesign from '../../assets/Graphic and Design.jpg';
import graphicDesign from '../../assets/graphic-design.png';
import writing from '../../assets/writing.png';
import translation from '../../assets/translation.png';
import digitalMarketing from '../../assets/social-media-marketing.png';
import logodesign from '../../assets/logodesign.png';
import tshirtdesign from '../../assets/tshirt.png';
import infographicdesign from '../../assets/infographics.png';
import blog from '../../assets/blog.png';

const categories = [
  { name: 'Graphic Design', icon: graphicDesign },
  { name: 'Logo Design', icon: logodesign },
  { name: 'T-shirt Design', icon: tshirtdesign },
  { name: 'Infographic Design', icon: infographicdesign },
  { name: 'Writing', icon: writing },
  { name: 'Blog Writer', icon: blog },
  {
    name: 'Translation & Editing',
    icon: translation,
    submenu: ['Document Translator', 'Literary Translator', 'Copy Editor'],
  },
  {
    name: 'Digital Marketing',
    icon: digitalMarketing,
    submenu: ['Social Media Manager', 'Content Creator', 'Social Media Strategist'],
  },
];

const CreateAccount = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [step, setStep] = useState('create');
  const [birthDate, setBirthDate] = useState('');
  const [selected, setSelected] = useState([]);
  const submenuRef = useRef(null);
  const scrollRef = useRef(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 7;
  const itemWidth = 120; // approximate width per item incl. margin
  const maxPage = Math.floor(categories.length / itemsPerPage);

  const [experiences, setExperiences] = useState([
    { title: '', company: '', DateHired: '', DateEnded: '' },
  ]);

  const visibleCategories = categories.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setIsPasswordValid(value.length >= 8 && value.length <= 12);
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleBackClick = () => {
    if (step === 'job-dashboard') setStep('about');
    else if (step === 'about') setStep('profile');
    else if (step === 'profile') setStep('joinAs');
    else if (step === 'joinAs') setStep('create');
    else navigate('/');
  };

  const scrollToPage = (page) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: page * itemsPerPage * itemWidth,
        behavior: 'smooth',
      });
    }
  };

  const scrollLeft = () => {
    const newPage = Math.max(currentPage - 1, 0);
    setCurrentPage(newPage);
    scrollToPage(newPage);
  };

  const scrollRight = () => {
    const newPage = Math.min(currentPage + 1, maxPage);
    setCurrentPage(newPage);
    scrollToPage(newPage);
  };

  const handleChange = (index, field, value) => {
    const newExperiences = [...experiences];
    newExperiences[index][field] = value;
    setExperiences(newExperiences);
  };

  const addExperience = () => {
    setExperiences([...experiences, { title: '', company: '', DateHired: '', DateEnded: '' }]);
  };

  const removeExperience = (indexToRemove) => {
    const updated = experiences.filter((_, index) => index !== indexToRemove);
    setExperiences(updated);
  };

  const handleJoinClick = () => {
    if (isPasswordValid && password) setStep('joinAs');
  };

  const toggleSkill = (skill) => {
    setSelected((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (submenuRef.current && !submenuRef.current.contains(event.target)) {
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="account-container">
      {/* CREATE STEP */}
      {step === 'create' && (
        <>
          <div className="form-section">
            <div className="back-arrow-create">
              <img src={backArrow} alt="Back" className="back-arrow" onClick={handleBackClick} />
            </div>
            <h1 className="header-top">Create Account</h1>

            <div className="input-row">
              <input type="text" placeholder="First Name" />
              <input type="text" placeholder="Last Name" />
            </div>

            <input type="email" placeholder="Email" className="full-width" />

            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                className="full-width"
              />
              <button
                type="button"
                className="toggle-visibility"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              />
            </div>

            {!isPasswordValid && (
              <p className="error">Password must be 8–12 characters long</p>
            )}

            <p className="login-link">
              Already have an account?{' '}
              <Link to="/signin" className="login-link-text">Log in</Link>
            </p>

            <button className="join-btn" onClick={handleJoinClick}>Join</button>
          </div>

          <div className="img-section">
            <img src={Hands} alt="Hands illustration" />
          </div>
        </>
      )}

      {/* JOIN AS STEP */}
      {step === 'joinAs' && (
        <div className="joinas-content">
          <div className="back-arrow-joinas">
            <img src={backArrow} alt="Back" className="back-arrow" onClick={handleBackClick} />
          </div>
          <h2 className="joinas-title">Join as</h2>

          <div className="joinas-card-group">
            <div className="joinas-card" onClick={() => setStep('profile')}>
              <div className="joinas-card-content">
                <img src={working} alt="Find Work" className="joinas-icon" />
                <span className="joinas-text">Find Work</span>
              </div>
              <ArrowRight className="joinas-arrow" />
            </div>

            <div className="joinas-card" onClick={() => setStep('skillsphere')}>
              <div className="joinas-card-content">
                <img src={talent} alt="Find Talent" className="joinas-icon" />
                <span className="joinas-text">Find Talent</span>
              </div>
              <ArrowRight className="joinas-arrow" />
            </div>
          </div>
        </div>
      )}

      {/* SKILLSPHERE STEP */}
      {step === 'skillsphere' && (
        <div className="skill-sphere-container">
          <div className="left-picture">
            <img src={GraphicandDesign} alt="SkillSphere Showcase" />
          </div>
          <div className="right-content">
            <h1>SkillSphere</h1>
            <p>
              Welcome to the world's largest freelancing marketplace.<br />
              Turning dreams into reality.
            </p>
            <button className="nxt-bttn" onClick={() => navigate('/client-dashboard')}>
              Continue
            </button>
          </div>
        </div>
      )}

      {/* PROFILE STEP */}
      {step === 'profile' && (
        <div className="form-container">
          <div className="back-arrow-container">
            <img src={backArrow} alt="Back" className="back-arrow" onClick={handleBackClick} />
          </div>

          <div className="profile-image">
            <img src={profileIcon} alt="Profile Icon" />
          </div>

          <input
            type="text"
            placeholder="First name"
            className="frm-input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last name"
            className="frm-input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <button className="nxt-button" onClick={() => setStep('about')}>Next</button>
        </div>
      )}

          {/* ABOUT STEP */}
          {step === 'about' && (
            <div className="about-container">
              <h2 className="form-title">Tell us about yourself</h2>

              <label className="form-label">What do you do?</label>
              <textarea className="form-textarea" placeholder="e.g. Data Scientist" rows={2} />

              <label className="form-label">Describe yourself</label>
              <textarea
                className="form-textarea1"
                placeholder="Describe your top skills, strengths, and experiences"
                rows={4}
              />

              <h2 className="birth-header">Birthday</h2>
              <p className="birth-description">
                To use Freelancer, you must be 16 years of age or older...
              </p>

              <div className="input-wrapper">
                <input
                  type="date"
                  className="birth-input"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </div>

              <h2>Tell us your skills</h2>
              <p className="subtitle">This helps us recommend jobs for you.</p>

              
              <div className="category-box-container">
                <div className="category-box">
                  <h3 className="category-title">Category</h3>
                  <div className="category-scroll-wrapper">
                    {currentPage > 0 && (
                      <button className="scroll-arrow left" onClick={scrollLeft}>
                        <ChevronLeft />
                      </button>
                    )}
                    <div className="category-items-wrapper">
                      {visibleCategories.map((cat) => (
                        <div
                          key={cat.name}
                          className={`category-item ${selected.includes(cat.name) ? 'selected' : ''}`}
                          onClick={() => toggleSkill(cat.name)}
                        >
                          <div className="icon">
                            <img src={cat.icon} alt={cat.name} />
                          </div>
                          <div className="label">{cat.name}</div>
                        </div>
                      ))}
                    </div>
                    {currentPage < maxPage && (
                      <button className="scroll-arrow right" onClick={scrollRight}>
                        <ChevronRight />
                      </button>
                    )}
                  </div>
                </div>
              </div>

          <div className="selected-skills-box">
            <div className="skills-selected-count">{selected.length} skills selected</div>
            {selected.length > 0 ? (
              <div className="selected-skills-list">
                {selected.map((skill) => (
                  <div key={skill} className="selected-skill-pill">
                    {skill}
                    <span className="remove-skill" onClick={() => toggleSkill(skill)}>×</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="add-skill-icon">+</div>
            )}
          </div>

          <div className="experience-header-block">
          <h2 className="experience-header">Add Experience</h2>
          <p className="experience-subtitle">Add Work Experience</p>
         </div>

          
          <div className="experience-container">
            {experiences.map((exp, index) => (
              <div key={index}>
                <div className="experience-row">
                  <input
                    type="text"
                    placeholder="Enter position title"
                    value={exp.title}
                    onChange={(e) => handleChange(index, 'title', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Enter company name"
                    value={exp.company}
                    onChange={(e) => handleChange(index, 'company', e.target.value)}
                  />
                  <div className="date-wrapper">
                    <label htmlFor={`DateHired-${index}`} className="date-label">Date Hired</label>
                    <input
                      id={`DateHired-${index}`}
                      type="date"
                      value={exp.DateHired}
                      onChange={(e) => handleChange(index, 'DateHired', e.target.value)}
                    />
                  </div>
                  <div className="date-wrapper">
                    <label htmlFor={`DateEnded-${index}`} className="date-label">Date Ended</label>
                    <input
                      id={`DateEnded-${index}`}
                      type="date"
                      value={exp.endDate}
                      onChange={(e) => handleChange(index, 'DateEnded', e.target.value)}
                    />
                  </div>
                </div>
                {experiences.length > 1 && (
                  <p className="remove-button" onClick={() => removeExperience(index)}>
                    <span className="minus-icon">−</span> Remove experience
                  </p>
                )}
              </div>
            ))}

            <p className="add-more" onClick={addExperience}>
              <span className="plus-icon">＋</span> Add another experience
            </p>
          </div>

          <div className="buttons">
            <button className="bck-button" onClick={handleBackClick}>Back</button>
            <button className="nxt-button" onClick={() => navigate('/job-dashboard')}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateAccount;