import React, { useState } from 'react';
import { 
  Bus, 
  Ticket, 
  MapPin, 
  ShieldCheck, 
  Moon, 
  Sun, 
  PhoneCall, 
  LayoutDashboard,
  HelpCircle,
  X,
  Database
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  bookingsCount, 
  theme, 
  toggleTheme, 
  currency, 
  setCurrency,
  dbStatus
}) {
  const [showHelpModal, setShowHelpModal] = useState(false);

  return (
    <>
      <header className="navbar-container camply-navbar">
        <div className="camply-nav-brand" onClick={() => setActiveTab('search')}>
          <div className="camply-logo-dot-wrap">
            <span className="brand-word">OmniBus</span>
            <span className="brand-dot">.</span>
          </div>
        </div>

        <nav className="camply-nav-links">
          <button 
            className={`camply-nav-btn ${activeTab === 'search' ? 'active' : ''}`}
            onClick={() => setActiveTab('search')}
          >
            <span>Home</span>
          </button>

          <button 
            className="camply-nav-btn"
            onClick={() => {
              setActiveTab('search');
              const el = document.getElementById('route-search-anchor');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span>Routes</span>
          </button>

          <button 
            className={`camply-nav-btn ${activeTab === 'tracker' ? 'active' : ''}`}
            onClick={() => setActiveTab('tracker')}
          >
            <span>Live Tracker</span>
            <span className="nav-live-dot"></span>
          </button>

          <button 
            className={`camply-nav-btn ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            <span>My Bookings</span>
            {bookingsCount > 0 && (
              <span className="nav-counter-pill">{bookingsCount}</span>
            )}
          </button>

          <button 
            className={`camply-nav-btn ${activeTab === 'admin' ? 'active' : ''}`}
            onClick={() => setActiveTab('admin')}
          >
            <span>Fleet Portal</span>
          </button>
        </nav>

        <div className="nav-actions">
          {/* Firebase Realtime Cloud Indicator */}
          <div 
            className={`firebase-nav-badge ${dbStatus?.mode || 'connected'}`}
            title={
              dbStatus?.mode === 'connected'
                ? `Firebase Firestore Online: bus-ticketing-7e4d1 (Realtime Synced ${dbStatus?.lastSync || 'now'})`
                : dbStatus?.mode === 'syncing'
                ? 'Syncing with Firebase Firestore...'
                : 'Using local cache (connect Firestore in console)'
            }
          >
            <span className="db-indicator-dot"></span>
            <Database size={13} className="db-icon" />
            <span className="db-text">
              {dbStatus?.mode === 'connected' ? 'Firebase Live' : dbStatus?.mode === 'syncing' ? 'Syncing...' : 'Local Mode'}
            </span>
          </div>

          {/* Currency Switcher */}
          <div className="currency-selector">
            <select 
              value={currency} 
              onChange={(e) => setCurrency(e.target.value)}
              className="currency-dropdown"
              title="Change currency"
            >
              <option value="INR">INR (₹)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>

          {/* Theme Toggle */}
          <button 
            className="theme-toggle-btn" 
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={18} className="sun-icon" /> : <Moon size={18} className="moon-icon" />}
          </button>

          {/* Dark Pill CTA like Login button in video */}
          <button 
            className="btn-dark-pill nav-portal-cta" 
            onClick={() => setActiveTab('admin')}
            title="Fleet Operator Dispatcher"
          >
            <span>Operator Hub</span>
          </button>

          {/* 24x7 Help Button */}
          <button 
            className="btn-help" 
            onClick={() => setShowHelpModal(true)}
            title="24/7 Passenger Support"
          >
            <HelpCircle size={18} />
          </button>
        </div>
      </header>

      {/* Support Modal */}
      {showHelpModal && (
        <div className="modal-overlay" onClick={() => setShowHelpModal(false)}>
          <div className="modal-card glass-panel" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-wrap">
                <ShieldCheck className="text-accent" size={24} />
                <h3>OmniBus Passenger Assistance</h3>
              </div>
              <button className="modal-close" onClick={() => setShowHelpModal(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-body support-content">
              <p className="support-subtitle">
                We are here 24 hours a day, 7 days a week to ensure your journey is safe, timely, and delightful.
              </p>

              <div className="support-cards-grid">
                <div className="support-card">
                  <PhoneCall size={22} className="text-accent" />
                  <div>
                    <h4>Emergency Helpline</h4>
                    <p>+1 (800) 555-OMNI (Toll-Free)</p>
                    <span className="badge badge-success">Available 24/7</span>
                  </div>
                </div>

                <div className="support-card">
                  <Ticket size={22} className="text-accent" />
                  <div>
                    <h4>Booking Inquiries & Refunds</h4>
                    <p>support@omnibus-express.com</p>
                    <span className="badge badge-primary">Average response: 3 mins</span>
                  </div>
                </div>
              </div>

              <div className="faq-box">
                <h4>Frequently Asked Questions</h4>
                <details className="faq-item">
                  <summary>How can I cancel my ticket?</summary>
                  <p>Go to "My Bookings" tab, select your confirmed ticket and click "Cancel Ticket". Instant refunds are processed according to the cancellation policy.</p>
                </details>
                <details className="faq-item">
                  <summary>Where can I track my bus?</summary>
                  <p>Click on "Live Tracker" in the navigation bar to see real-time GPS coordinates, speed, and estimated arrival time.</p>
                </details>
                <details className="faq-item">
                  <summary>Can women select female-reserved seats?</summary>
                  <p>Yes, seats highlighted with a pink badge are specially reserved for solo female travelers for maximum peace of mind.</p>
                </details>
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
