import React, { useState } from 'react';
import { 
  Plane, 
  Bus, 
  Train, 
  MapPin, 
  Calendar, 
  Users, 
  ArrowLeftRight, 
  Search, 
  ShieldCheck, 
  Clock, 
  Headphones, 
  Zap, 
  ChevronRight, 
  Star,
  CheckCircle2,
  TrendingUp,
  Percent,
  Sparkles
} from 'lucide-react';
import CitySearchInput from './CitySearchInput';

export default function HeroSearch({ 
  searchParams, 
  setSearchParams, 
  onSearch,
  activeMode = 'buses',
  setActiveMode
}) {
  const [isSwapping, setIsSwapping] = useState(false);
  const [travelMode, setTravelMode] = useState(activeMode || 'buses'); // 'flights' | 'buses' | 'trains'

  // Handle City Swap with smooth animation
  const handleSwap = () => {
    setIsSwapping(true);
    const temp = searchParams.from;
    setSearchParams(prev => ({
      ...prev,
      from: prev.to,
      to: temp
    }));
    setTimeout(() => setIsSwapping(false), 300);
  };

  // Quick Date Chips
  const setQuickDate = (offsetDays) => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + offsetDays);
    const formatted = targetDate.toISOString().split('T')[0];
    setSearchParams(prev => ({ ...prev, date: formatted }));
  };

  const isToday = () => {
    const today = new Date().toISOString().split('T')[0];
    return searchParams.date === today;
  };

  const isTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return searchParams.date === tomorrow.toISOString().split('T')[0];
  };

  const handleModeChange = (mode) => {
    setTravelMode(mode);
    if (setActiveMode) setActiveMode(mode);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch();
    // Scroll smoothly to results
    const resultsAnchor = document.getElementById('search-results-anchor');
    if (resultsAnchor) {
      resultsAnchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="rashtrips-landing-wrapper">
      
      {/* ====================================================================
          1. HERO BANNER WITH SCENIC MULTI-MODAL BACKGROUND
          ==================================================================== */}
      <section className="rashtrips-hero-banner" style={{ backgroundImage: `url('/rashtrips-hero.jpg')` }}>
        <div className="hero-dark-overlay"></div>

        <div className="rashtrips-hero-content">
          
          {/* Left Column Grouping All Text and Badges (Matching Reference Image) */}
          <div className="hero-editorial-left-col">
            
            {/* Top Pill Kicker */}
            <div className="hero-kicker-row">
              <span className="hero-kicker-text">
                FLIGHTS &nbsp;•&nbsp; BUSES &nbsp;•&nbsp; TRAINS
              </span>
            </div>

            {/* Bold Main Headline */}
            <h1 className="hero-headline-title">
              Book Your Next<br />
              <span className="text-highlight-flight">Flight,</span> <span className="text-highlight-bus">Bus</span> or <span className="text-highlight-train">Train</span><br />
              with RashTrips
            </h1>

            {/* Subtitle */}
            <p className="hero-subtext">
              Travel smarter. Explore more. All in one place.
            </p>

            {/* Row of 3 Trust Badges (Round icon badges matching reference image) */}
            <div className="hero-trust-badges-row">
              
              {/* Fast & Easy */}
              <div className="trust-badge-card">
                <div className="trust-icon-circle">
                  <Plane size={18} className="trust-icon" />
                </div>
                <div className="trust-badge-text">
                  <strong className="badge-title">Fast & Easy</strong>
                  <span className="badge-desc">Book in minutes</span>
                </div>
              </div>

              {/* Secure Payments */}
              <div className="trust-badge-card">
                <div className="trust-icon-circle">
                  <ShieldCheck size={18} className="trust-icon" />
                </div>
                <div className="trust-badge-text">
                  <strong className="badge-title">Secure Payments</strong>
                  <span className="badge-desc">Your data, our priority</span>
                </div>
              </div>

              {/* 24/7 Support */}
              <div className="trust-badge-card">
                <div className="trust-icon-circle">
                  <Headphones size={18} className="trust-icon" />
                </div>
                <div className="trust-badge-text">
                  <strong className="badge-title">24/7 Support</strong>
                  <span className="badge-desc">We're always here</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ====================================================================
          2. FLOATING WHITE SEARCH CARD (SEAMLESSLY OVERLAPPING HERO BANNER)
          ==================================================================== */}
      <div className="search-widget-floating-container" id="search-widget-anchor">
        <div className="search-card-white-panel">
          
          {/* Multi-Modal Tabs (Flights, Buses, Trains) */}
          <div className="search-mode-tabs-bar">
            
            <button 
              type="button"
              className={`mode-tab-btn ${travelMode === 'flights' ? 'active' : ''}`}
              onClick={() => handleModeChange('flights')}
            >
              <Plane size={18} />
              <span>Flights</span>
            </button>

            <button 
              type="button"
              className={`mode-tab-btn ${travelMode === 'buses' ? 'active' : ''}`}
              onClick={() => handleModeChange('buses')}
            >
              <Bus size={18} />
              <span>Buses</span>
              <span className="mode-badge-live">Live</span>
            </button>

            <button 
              type="button"
              className={`mode-tab-btn ${travelMode === 'trains' ? 'active' : ''}`}
              onClick={() => handleModeChange('trains')}
            >
              <Train size={18} />
              <span>Trains</span>
            </button>

          </div>

          {/* Search Inputs Row */}
          <form onSubmit={handleSearchSubmit} className="search-form-horizontal">
            <div className="search-fields-flex-row">
              
              {/* Departure City / Origin */}
              <div className="search-input-box from-box">
                <CitySearchInput 
                  label="From"
                  value={searchParams.from}
                  onChange={(city) => setSearchParams(prev => ({ ...prev, from: city }))}
                  placeholder="Departure city"
                  excludeCity={searchParams.to}
                  iconColor="text-blue"
                />
              </div>

              {/* City Swap Button */}
              <button 
                type="button" 
                className={`swap-icon-btn ${isSwapping ? 'spinning' : ''}`}
                onClick={handleSwap}
                title="Swap Departure and Destination"
              >
                <ArrowLeftRight size={16} />
              </button>

              {/* Destination City */}
              <div className="search-input-box to-box">
                <CitySearchInput 
                  label="To"
                  value={searchParams.to}
                  onChange={(city) => setSearchParams(prev => ({ ...prev, to: city }))}
                  placeholder="Destination city"
                  excludeCity={searchParams.from}
                  iconColor="text-blue"
                />
              </div>

              {/* Departure Date */}
              <div className="search-input-box date-box">
                <label className="field-label-text">
                  <Calendar size={16} className="text-blue" />
                  <span>Departure Date</span>
                </label>
                <div className="input-inner-wrap">
                  <input 
                    type="date" 
                    value={searchParams.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setSearchParams(prev => ({ ...prev, date: e.target.value }))}
                    className="native-date-input"
                    required
                  />
                </div>
              </div>

              {/* Passengers & Coach Class */}
              <div className="search-input-box passengers-box">
                <label className="field-label-text">
                  <Users size={16} className="text-blue" />
                  <span>Passengers & Class</span>
                </label>
                <div className="input-inner-wrap">
                  <select 
                    value={searchParams.busClass || 'ALL'}
                    onChange={(e) => setSearchParams(prev => ({ ...prev, busClass: e.target.value }))}
                    className="category-dropdown-select"
                  >
                    <option value="ALL">1 Passenger • All Coaches</option>
                    <option value="SLEEPER">1 Passenger • AC Sleeper (2+1)</option>
                    <option value="WASHROOM">1 Passenger • With Washroom 🚻</option>
                    <option value="GOVT_RTC">1 Passenger • Govt RTC (KSRTC/MSRTC) 🏛️</option>
                    <option value="EV">1 Passenger • 100% Electric EV ⚡</option>
                    <option value="SEATER">1 Passenger • Semi-Sleeper (2+2)</option>
                    <option value="BUDGET">1 Passenger • Non-AC Budget 🏷️</option>
                  </select>
                </div>
              </div>

              {/* Vibrant Blue Search Button (Matching reference image) */}
              <div className="search-cta-box">
                <button type="submit" className="btn-rashtrips-search">
                  <Search size={18} />
                  <span>Search</span>
                </button>
              </div>

            </div>

            {/* Sub-bar: Dates & Quick Popular Routes across India */}
            <div className="search-sub-bar">
              <div className="quick-dates-group">
                <span className="sub-bar-label">Quick Dates:</span>
                <button 
                  type="button" 
                  className={`sub-date-chip ${isToday() ? 'active' : ''}`}
                  onClick={() => setQuickDate(0)}
                >
                  Today
                </button>
                <button 
                  type="button" 
                  className={`sub-date-chip ${isTomorrow() ? 'active' : ''}`}
                  onClick={() => setQuickDate(1)}
                >
                  Tomorrow
                </button>
                <button 
                  type="button" 
                  className="sub-date-chip"
                  onClick={() => setQuickDate(2)}
                >
                  Day After
                </button>
              </div>

              <div className="quick-routes-group">
                <span className="sub-bar-label">Popular Routes:</span>
                <button 
                  type="button" 
                  className="sub-route-chip"
                  onClick={() => setSearchParams(prev => ({ ...prev, from: 'Bengaluru', to: 'Hyderabad' }))}
                >
                  Bengaluru ➔ Hyderabad
                </button>
                <button 
                  type="button" 
                  className="sub-route-chip"
                  onClick={() => setSearchParams(prev => ({ ...prev, from: 'Mumbai', to: 'Goa (Panaji / Panjim)' }))}
                >
                  Mumbai ➔ Goa
                </button>
                <button 
                  type="button" 
                  className="sub-route-chip"
                  onClick={() => setSearchParams(prev => ({ ...prev, from: 'Delhi', to: 'Manali' }))}
                >
                  Delhi ➔ Manali
                </button>
                <button 
                  type="button" 
                  className="sub-route-chip"
                  onClick={() => setSearchParams(prev => ({ ...prev, from: 'Chennai', to: 'Coimbatore' }))}
                >
                  Chennai ➔ Coimbatore
                </button>
                <button 
                  type="button" 
                  className="sub-route-chip"
                  onClick={() => setSearchParams(prev => ({ ...prev, from: 'Pune', to: 'Mumbai' }))}
                >
                  Pune ➔ Mumbai
                </button>
                <button 
                  type="button" 
                  className="sub-route-chip"
                  onClick={() => setSearchParams(prev => ({ ...prev, from: 'Kolkata', to: 'Siliguri' }))}
                >
                  Kolkata ➔ Siliguri
                </button>
              </div>
            </div>

          </form>

        </div>
      </div>

      {/* ====================================================================
          3. "WHY CHOOSE RASHTRIPS?" SECTION (EXACTLY AS IN REFERENCE IMAGE)
          ==================================================================== */}
      <section className="why-choose-section" id="why-choose-anchor">
        <div className="why-choose-container">
          
          {/* Left Title Block */}
          <div className="why-choose-left-text">
            <span className="why-choose-kicker">WHY CHOOSE RASHTRIPS?</span>
            <h2 className="why-choose-title">Your Journey, Our Priority</h2>
            <p className="why-choose-desc">
              Whether it's a quick getaway or a long journey, we make booking tickets simple, safe and stress-free.
            </p>
          </div>

          {/* Right: 3 Feature Cards */}
          <div className="why-choose-cards-grid">
            
            {/* Card 1: Best Prices */}
            <div className="feature-white-card">
              <div className="feature-icon-bubble bubble-blue">
                <Plane size={22} className="feature-icon-svg" />
              </div>
              <h3 className="feature-card-title">Best Prices</h3>
              <p className="feature-card-desc">
                Get the most competitive fares across all transport modes.
              </p>
            </div>

            {/* Card 2: Trusted & Secure */}
            <div className="feature-white-card">
              <div className="feature-icon-bubble bubble-green">
                <ShieldCheck size={22} className="feature-icon-svg" />
              </div>
              <h3 className="feature-card-title">Trusted & Secure</h3>
              <p className="feature-card-desc">
                100% safe transactions with multiple payment options.
              </p>
            </div>

            {/* Card 3: Easy Booking */}
            <div className="feature-white-card">
              <div className="feature-icon-bubble bubble-purple">
                <Clock size={22} className="feature-icon-svg" />
              </div>
              <h3 className="feature-card-title">Easy Booking</h3>
              <p className="feature-card-desc">
                Book in just a few clicks from anywhere, anytime.
              </p>
            </div>

          </div>

        </div>

        {/* Bottom Decorative Wave Ribbon (Matching Reference Image) */}
        <div className="wave-footer-ribbon">
          <div className="wave-content-wrap">
            <div className="wave-left-quote">
              {/* Mountain Line Art Icon */}
              <svg className="mountain-svg" width="36" height="24" viewBox="0 0 36 24" fill="none">
                <path d="M2 22L12 6L18 14L24 4L34 22H2Z" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="handwritten-tagline">Same destination. Different stories.</span>
            </div>

            <button 
              type="button" 
              className="explore-more-link"
              onClick={() => {
                const el = document.getElementById('search-results-anchor');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>Explore More</span>
              <span className="arrow-sym">➔</span>
            </button>
          </div>
        </div>

      </section>

      {/* Scroll Anchor for search results */}
      <div id="search-results-anchor"></div>

    </div>
  );
}
