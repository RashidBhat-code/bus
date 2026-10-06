import React, { useState, useEffect } from 'react';
import { 
  Plane, 
  Bus, 
  Train, 
  User, 
  ShieldCheck, 
  HelpCircle, 
  X, 
  Ticket, 
  PhoneCall, 
  Database,
  Moon,
  Sun,
  LogIn,
  CheckCircle2,
  Navigation
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  bookingsCount, 
  theme, 
  toggleTheme, 
  currency, 
  setCurrency,
  dbStatus,
  activeMode = 'buses',
  setActiveMode
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [showHelpModal, setShowHelpModal] = useState(false);

  // Scroll detection for sticky navbar effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (mode) => {
    setActiveTab('search');
    if (setActiveMode) setActiveMode(mode);
    const searchCard = document.getElementById('search-widget-anchor');
    if (searchCard) {
      searchCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <>
      <header className={`rashtrips-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="rashtrips-nav-container">
          
          {/* Brand Logo: Airplane icon + RashTrips */}
          <div 
            className="rashtrips-logo" 
            onClick={() => { setActiveTab('search'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            role="button"
            tabIndex={0}
          >
            <div className="logo-icon-wrap">
              <Plane size={24} className="plane-logo-icon" />
            </div>
            <span className="logo-text">Rash<strong>Trips</strong></span>
          </div>

          {/* Center Navigation Links: Home, Flights, Buses, Trains, About */}
          <nav className="rashtrips-nav-menu">
            <button 
              type="button"
              className={`nav-menu-link ${activeTab === 'search' && activeMode === 'home' ? 'active' : ''}`}
              onClick={() => { setActiveTab('search'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              Home
            </button>

            <button 
              type="button"
              className={`nav-menu-link ${activeTab === 'search' && activeMode === 'flights' ? 'active' : ''}`}
              onClick={() => handleNavClick('flights')}
            >
              Flights
            </button>

            <button 
              type="button"
              className={`nav-menu-link ${activeTab === 'search' && activeMode === 'buses' ? 'active' : ''}`}
              onClick={() => handleNavClick('buses')}
            >
              Buses
              <span className="nav-hot-dot" title="Live Express Booking"></span>
            </button>

            <button 
              type="button"
              className={`nav-menu-link ${activeTab === 'search' && activeMode === 'trains' ? 'active' : ''}`}
              onClick={() => handleNavClick('trains')}
            >
              Trains
            </button>

            <button 
              type="button"
              className="nav-menu-link"
              onClick={() => {
                const el = document.getElementById('why-choose-anchor');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else setShowHelpModal(true);
              }}
            >
              About
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="rashtrips-nav-actions">
            
            {/* My Bookings Quick Access */}
            <button 
              type="button"
              className={`nav-bookings-btn ${activeTab === 'bookings' ? 'active' : ''}`}
              onClick={() => setActiveTab('bookings')}
              title="View your confirmed travel bookings"
            >
              <Ticket size={16} />
              <span>Bookings</span>
              {bookingsCount > 0 && (
                <span className="bookings-badge">{bookingsCount}</span>
              )}
            </button>

            {/* Live GPS Tracker button */}
            <button 
              type="button"
              className={`nav-tracker-btn ${activeTab === 'tracker' ? 'active' : ''}`}
              onClick={() => setActiveTab('tracker')}
              title="Track your bus/vehicle live on map"
            >
              <Navigation size={15} />
              <span>Radar</span>
            </button>

            {/* Operator Portal Link */}
            <button 
              type="button"
              className="nav-portal-link"
              onClick={() => setActiveTab('admin')}
              title="Fleet Operator Dispatcher Hub"
            >
              Portal
            </button>

            {/* Login button (Transparent pill with border) */}
            <button 
              type="button"
              className="btn-nav-login"
              onClick={() => { setAuthMode('login'); setShowAuthModal(true); }}
            >
              <User size={16} />
              <span>Login</span>
            </button>

            {/* Sign Up button (Vibrant blue solid button) */}
            <button 
              type="button"
              className="btn-nav-signup"
              onClick={() => { setAuthMode('signup'); setShowAuthModal(true); }}
            >
              Sign Up
            </button>

          </div>

        </div>
      </header>

      {/* Interactive Login & Sign Up Modal */}
      {showAuthModal && (
        <div className="modal-overlay" onClick={() => setShowAuthModal(false)}>
          <div className="modal-card auth-modal glass-panel" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-wrap">
                <div className="logo-icon-wrap auth-logo-icon">
                  <Plane size={20} className="plane-logo-icon" />
                </div>
                <div>
                  <h3>{authMode === 'login' ? 'Welcome Back to RashTrips' : 'Join RashTrips'}</h3>
                  <p className="modal-subtitle">Travel smarter. Explore more. All in one place.</p>
                </div>
              </div>
              <button className="modal-close" onClick={() => setShowAuthModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body auth-modal-body">
              <div className="auth-toggle-tabs">
                <button 
                  type="button" 
                  className={`auth-tab ${authMode === 'login' ? 'active' : ''}`}
                  onClick={() => setAuthMode('login')}
                >
                  Login
                </button>
                <button 
                  type="button" 
                  className={`auth-tab ${authMode === 'signup' ? 'active' : ''}`}
                  onClick={() => setAuthMode('signup')}
                >
                  Sign Up
                </button>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); setShowAuthModal(false); }} className="auth-form">
                {authMode === 'signup' && (
                  <div className="form-field-group">
                    <label>Full Name</label>
                    <input type="text" placeholder="e.g. Rahul Sharma" required />
                  </div>
                )}

                <div className="form-field-group">
                  <label>Mobile Number or Email</label>
                  <input type="text" placeholder="e.g. +91 98765 43210 or you@gmail.com" required />
                </div>

                <div className="form-field-group">
                  <label>Password</label>
                  <input type="password" placeholder="••••••••" required />
                </div>

                <button type="submit" className="btn-primary w-full auth-submit-btn">
                  {authMode === 'login' ? 'Log In to RashTrips' : 'Create Free Account'}
                </button>

                <div className="auth-footer-note">
                  <ShieldCheck size={14} className="text-success" />
                  <span>Your personal data and travel info are 100% encrypted & protected.</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 24x7 Customer Support Modal */}
      {showHelpModal && (
        <div className="modal-overlay" onClick={() => setShowHelpModal(false)}>
          <div className="modal-card glass-panel" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-wrap">
                <ShieldCheck className="text-accent" size={24} />
                <div>
                  <h3>RashTrips 24/7 Passenger Support</h3>
                  <p className="modal-subtitle">Dedicated assistance across Flights, Buses & Trains</p>
                </div>
              </div>
              <button className="modal-close" onClick={() => setShowHelpModal(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-body support-content">
              <div className="support-cards-grid">
                <div className="support-card">
                  <PhoneCall size={22} className="text-accent" />
                  <div>
                    <h4>National Toll-Free Helpline</h4>
                    <p>1800-102-RASH (1800 102 7274)</p>
                    <span className="badge badge-success">Available 24/7 in English & Hindi</span>
                  </div>
                </div>

                <div className="support-card">
                  <Ticket size={22} className="text-accent" />
                  <div>
                    <h4>E-Ticket & Instant UPI Refunds</h4>
                    <p>support@rashtrips.com</p>
                    <span className="badge badge-primary">Average resolution: 2 mins</span>
                  </div>
                </div>
              </div>

              <button className="btn-primary w-full" onClick={() => setShowHelpModal(false)}>
                Close & Return
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
