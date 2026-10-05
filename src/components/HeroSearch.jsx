import React, { useState } from 'react';
import { 
  Calendar, 
  ArrowLeftRight, 
  Search, 
  MapPin, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  Check, 
  Bus, 
  Compass, 
  CreditCard, 
  Smile, 
  Clock, 
  Star,
  ChevronRight,
  Navigation
} from 'lucide-react';
import CitySearchInput from './CitySearchInput';

export default function HeroSearch({ 
  searchParams, 
  setSearchParams, 
  onSearch 
}) {
  const [isSwapping, setIsSwapping] = useState(false);

  // Handle City Swap
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

  const scrollToSearch = () => {
    const el = document.getElementById('route-search-anchor');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Quick select an Indian route
  const selectPinRoute = (from, to) => {
    setSearchParams(prev => ({
      ...prev,
      from,
      to
    }));
    scrollToSearch();
  };

  return (
    <div className="camply-hero-wrapper">
      
      {/* ====================================================================
          1. HERO MAIN STAGE (Reference Video Frame 00:01 - 00:04)
          ==================================================================== */}
      <section className="camply-hero-banner">
        <div className="camply-hero-container">
          
          {/* Left Column: Heading, Doodles, Subtext, Dark CTA */}
          <div className="hero-left-editorial">
            
            {/* Playful Hand-Drawn Doodle SVG */}
            <div className="doodle-spark-top">
              <svg width="48" height="42" viewBox="0 0 48 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 32C14 18 28 8 44 4M24 16C28 24 36 32 44 38M8 12C12 8 18 6 22 8" stroke="#1665ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <h1 className="hero-punchy-title">
              Cabin In The Bus,<br />
              But In A <span className="title-highlight">Classy Way!</span>
            </h1>

            <p className="hero-editorial-sub">
              Now you can travel anywhere across 250+ Indian cities in high-speed, sanitized AC Sleeper & Seater coaches — and of course it's safe, punctual, and verified with us.
            </p>

            <div className="hero-editorial-cta-row">
              <button 
                type="button" 
                className="btn-dark-pill hero-cta-btn"
                onClick={scrollToSearch}
              >
                <span>Book Tickets</span>
                <ChevronRight size={18} />
              </button>

              <div className="hero-rating-pill">
                <div className="stars-cluster">
                  <Star size={14} className="star-filled" />
                  <Star size={14} className="star-filled" />
                  <Star size={14} className="star-filled" />
                  <Star size={14} className="star-filled" />
                  <Star size={14} className="star-filled" />
                </div>
                <span className="rating-num">4.8 / 5.0</span>
                <span className="rating-tag">• 80k+ Reviews</span>
              </div>
            </div>

          </div>

          {/* Right Column: Floating 3D Perspective Smartphone Mockup */}
          <div className="hero-right-phone-stage">
            <div className="floating-smartphone-frame">
              
              {/* Phone Speaker & Notch */}
              <div className="phone-notch-bar">
                <span className="phone-clock">09:41</span>
                <div className="phone-speaker-cut"></div>
                <span className="phone-signals">5G 📶</span>
              </div>

              {/* Inside Mobile App UI Screen */}
              <div className="phone-screen-content">
                
                {/* User Greeting Bar */}
                <div className="phone-app-header">
                  <div className="phone-user-wrap">
                    <img 
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" 
                      alt="User avatar" 
                      className="phone-avatar" 
                    />
                    <div>
                      <span className="phone-greeting">Hi, Rahul Sharma 👋</span>
                      <h4 className="phone-where-to">Where to travel next?</h4>
                    </div>
                  </div>
                  <div className="phone-bell-icon">🔔</div>
                </div>

                {/* Hero Mobile Story Card */}
                <div className="phone-story-card">
                  <div className="story-card-text">
                    <span className="story-badge">Flagship Volvo 9600s</span>
                    <h3>Bengaluru ➔ Hyderabad</h3>
                    <p>NH 44 Expressway • Overnight Luxury</p>
                    <span className="story-price-chip">₹1,250 / berth</span>
                  </div>
                </div>

                {/* Recommended Section Header */}
                <div className="phone-section-label-row">
                  <span className="section-label">Recommended Routes</span>
                  <span className="section-see-all">See All</span>
                </div>

                {/* Horizontal Scroll Mini Cards */}
                <div className="phone-horizontal-cards">
                  
                  <div 
                    className="phone-route-chip active"
                    onClick={() => selectPinRoute('Bengaluru', 'Hyderabad')}
                  >
                    <div className="chip-icon-top">🚌</div>
                    <span className="chip-route-title">BLR ➔ HYD</span>
                    <span className="chip-meta">Volvo AC Sleeper</span>
                    <span className="chip-price">₹1,250</span>
                  </div>

                  <div 
                    className="phone-route-chip"
                    onClick={() => selectPinRoute('Mumbai', 'Goa (Panaji / Panjim)')}
                  >
                    <div className="chip-icon-top">🌴</div>
                    <span className="chip-route-title">MUM ➔ GOA</span>
                    <span className="chip-meta">BharatBenz Glider</span>
                    <span className="chip-price">₹1,450</span>
                  </div>

                  <div 
                    className="phone-route-chip"
                    onClick={() => selectPinRoute('Delhi', 'Jaipur')}
                  >
                    <div className="chip-icon-top">⚡</div>
                    <span className="chip-route-title">DEL ➔ JAI</span>
                    <span className="chip-meta">Zingbus EV Express</span>
                    <span className="chip-price">₹850</span>
                  </div>

                </div>

                {/* My Active Schedule Card */}
                <div className="phone-schedule-card">
                  <div className="schedule-indicator-dot"></div>
                  <div className="schedule-info">
                    <span className="schedule-label">My Upcoming Journey</span>
                    <h5 className="schedule-title">Bengaluru ➔ Hyderabad • 09:30 PM</h5>
                    <span className="schedule-seat-tag">Seat L1 (Lower Sleeper) • Confirmed</span>
                  </div>
                  <div className="schedule-qr-mini">QR</div>
                </div>

                {/* Floating Bottom Nav inside Phone */}
                <div className="phone-bottom-nav">
                  <span className="nav-item active">🏠</span>
                  <span className="nav-item">🎟️</span>
                  <span className="nav-item">📍</span>
                  <span className="nav-item">👤</span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ====================================================================
          2. SIGNATURE ROYAL COBALT BLUE STATS RIBBON (Video Frame 00:04 - 00:06)
          ==================================================================== */}
      <section className="camply-stats-ribbon">
        <div className="stats-ribbon-grid">
          
          <div className="stat-ribbon-block">
            <h2 className="stat-big-number">10</h2>
            <div className="stat-label-wrap">
              <span className="stat-label-top">Years Of</span>
              <span className="stat-label-sub">Experience</span>
            </div>
          </div>

          <div className="stat-ribbon-divider"></div>

          <div className="stat-ribbon-block">
            <h2 className="stat-big-number">1K+</h2>
            <div className="stat-label-wrap">
              <span className="stat-label-top">Express Bus</span>
              <span className="stat-label-sub">Destinations</span>
            </div>
          </div>

          <div className="stat-ribbon-divider"></div>

          <div className="stat-ribbon-block">
            <h2 className="stat-big-number">80K</h2>
            <div className="stat-label-wrap">
              <span className="stat-label-top">Happy Highway</span>
              <span className="stat-label-sub">Customers</span>
            </div>
          </div>

          <div className="stat-ribbon-divider"></div>

          <div className="stat-ribbon-block">
            <h2 className="stat-big-number">4.8</h2>
            <div className="stat-label-wrap">
              <span className="stat-label-top">Overall</span>
              <span className="stat-label-sub">Rating</span>
            </div>
          </div>

        </div>
      </section>

      {/* ====================================================================
          3. "THAT'S THE WAY TO TRAVEL!" 4 BENEFITS SECTION (Video Frame 00:06)
          ==================================================================== */}
      <section className="camply-benefits-section">
        <div className="benefits-container">
          
          <div className="benefits-header-col">
            <h2 className="benefits-headline">That's The Way<br />To Travel!</h2>
            <p className="benefits-subtext">
              Try a variety of benefits when using our intercity express coaches across India.
            </p>
          </div>

          <div className="benefits-cards-grid">
            
            <div className="benefit-card">
              <div className="benefit-icon-badge bg-circle-blue">
                <span>🌍</span>
              </div>
              <h3 className="benefit-card-title">Lot Of Choices</h3>
              <p className="benefit-card-desc">
                We have 12+ luxury coach types operating with top Indian fleet partners like VRL, KSRTC, & Zingbus.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon-badge bg-circle-orange">
                <span>🧭</span>
              </div>
              <h3 className="benefit-card-title">Best Highway Captains</h3>
              <p className="benefit-card-desc">
                Our certified drivers and onboard crew are ready to guide you safely anytime & anywhere.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon-badge bg-circle-card">
                <span>💳</span>
              </div>
              <h3 className="benefit-card-title">Easy Instant Booking</h3>
              <p className="benefit-card-desc">
                With an easy, safe and fast ticket purchase process with instant UPI QR & Aadhaar verification.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon-badge bg-circle-shield">
                <span>🛡️</span>
              </div>
              <h3 className="benefit-card-title">Live AIS-140 GPS</h3>
              <p className="benefit-card-desc">
                Government-standard real-time NavIC highway radar to track your coach every single minute.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ====================================================================
          4. INTERACTIVE ROUTE MAP & SEARCH SECTION (Video Frame 00:07 - 00:09)
          ==================================================================== */}
      <section id="route-search-anchor" className="camply-map-search-section">
        <div className="map-search-container">
          
          <div className="map-search-split">
            
            {/* Left Dotted India Map with Interactive City Pins */}
            <div className="interactive-map-wrapper">
              <div className="dotted-map-canvas">
                
                {/* SVG Dotted India Route Grid */}
                <svg className="dotted-pattern-svg" width="100%" height="100%" viewBox="0 0 540 380" fill="none">
                  {/* Subtle decorative dot array simulating country map */}
                  <g opacity="0.35" fill="#1665ff">
                    <circle cx="270" cy="60" r="3" />
                    <circle cx="290" cy="70" r="3" />
                    <circle cx="260" cy="80" r="3" />
                    <circle cx="280" cy="90" r="3" />
                    <circle cx="310" cy="80" r="3" />
                    <circle cx="240" cy="110" r="3" />
                    <circle cx="260" cy="120" r="3" />
                    <circle cx="290" cy="130" r="3" />
                    <circle cx="320" cy="120" r="3" />
                    <circle cx="220" cy="140" r="3" />
                    <circle cx="250" cy="150" r="3" />
                    <circle cx="280" cy="160" r="3" />
                    <circle cx="310" cy="160" r="3" />
                    <circle cx="340" cy="150" r="3" />
                    <circle cx="200" cy="180" r="3" />
                    <circle cx="230" cy="190" r="3" />
                    <circle cx="260" cy="200" r="3" />
                    <circle cx="290" cy="200" r="3" />
                    <circle cx="320" cy="210" r="3" />
                    <circle cx="210" cy="230" r="3" />
                    <circle cx="240" cy="240" r="3" />
                    <circle cx="270" cy="250" r="3" />
                    <circle cx="300" cy="250" r="3" />
                    <circle cx="230" cy="280" r="3" />
                    <circle cx="260" cy="290" r="3" />
                    <circle cx="280" cy="300" r="3" />
                    <circle cx="260" cy="330" r="3" />
                    <circle cx="270" cy="350" r="3" />
                  </g>
                  {/* Subtle connecting highway paths */}
                  <path d="M260 80 L230 190 L260 290 L270 350" stroke="#1665ff" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
                  <path d="M230 190 L300 250 L260 290" stroke="#1665ff" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
                </svg>

                {/* Glowing Location Pins from the reference video */}
                <div 
                  className="map-pin-badge pin-delhi"
                  onClick={() => selectPinRoute('Delhi', 'Jaipur')}
                  title="Delhi Interstate Hub"
                >
                  <div className="pin-avatar-thumb">
                    <span>🏛️</span>
                  </div>
                  <span className="pin-label">Delhi</span>
                </div>

                <div 
                  className="map-pin-badge pin-mumbai"
                  onClick={() => selectPinRoute('Mumbai', 'Goa (Panaji / Panjim)')}
                  title="Mumbai Bypass Hub"
                >
                  <div className="pin-avatar-thumb">
                    <span>🏙️</span>
                  </div>
                  <span className="pin-label">Mumbai</span>
                </div>

                <div 
                  className="map-pin-badge pin-goa"
                  onClick={() => selectPinRoute('Mumbai', 'Goa (Panaji / Panjim)')}
                  title="Goa Coastal Hub"
                >
                  <div className="pin-avatar-thumb">
                    <span>🌴</span>
                  </div>
                  <span className="pin-label">Goa</span>
                </div>

                <div 
                  className="map-pin-badge pin-hyderabad"
                  onClick={() => selectPinRoute('Bengaluru', 'Hyderabad')}
                  title="Hyderabad IT Corridor"
                >
                  <div className="pin-avatar-thumb">
                    <span>🕌</span>
                  </div>
                  <span className="pin-label">Hyderabad</span>
                </div>

                <div 
                  className="map-pin-badge pin-bengaluru featured-pin"
                  onClick={() => selectPinRoute('Bengaluru', 'Hyderabad')}
                  title="Bengaluru Majestic KBS"
                >
                  <div className="pin-avatar-thumb">
                    <span>🚌</span>
                  </div>
                  <span className="pin-label">Bengaluru Hub</span>
                </div>

                <div 
                  className="map-pin-badge pin-chennai"
                  onClick={() => selectPinRoute('Chennai', 'Bengaluru')}
                  title="Chennai CMBT"
                >
                  <div className="pin-avatar-thumb">
                    <span>🌊</span>
                  </div>
                  <span className="pin-label">Chennai</span>
                </div>

              </div>
            </div>

            {/* Right Editorial Text & Floating Pill Search Bar */}
            <div className="map-search-right">
              
              <div className="map-search-text-block">
                <h2 className="map-title">
                  Starry Night, Highway Express, What Else Do You Need?
                </h2>
                <p className="map-subtitle">
                  Explore more than 250+ express destinations across India. Find your most comfortable sleeper berth and book instantly.
                </p>
              </div>

              {/* Clean White Floating Pill Search Bar (Reference Video Frame 00:08) */}
              <div className="camply-floating-search-bar">
                <form 
                  onSubmit={(e) => { e.preventDefault(); onSearch(); }} 
                  className="pill-search-form"
                >
                  <div className="pill-inputs-container">
                    
                    {/* Origin Input */}
                    <div className="pill-input-item">
                      <CitySearchInput 
                        label="From"
                        value={searchParams.from}
                        onChange={(city) => setSearchParams(prev => ({ ...prev, from: city }))}
                        placeholder="Choose Departure"
                        excludeCity={searchParams.to}
                        iconColor="text-primary-blue"
                      />
                    </div>

                    {/* Quick Swap Icon */}
                    <button 
                      type="button" 
                      className={`pill-swap-btn ${isSwapping ? 'spinning' : ''}`}
                      onClick={handleSwap}
                      title="Swap cities"
                    >
                      <ArrowLeftRight size={15} />
                    </button>

                    {/* Destination Input */}
                    <div className="pill-input-item">
                      <CitySearchInput 
                        label="To"
                        value={searchParams.to}
                        onChange={(city) => setSearchParams(prev => ({ ...prev, to: city }))}
                        placeholder="Choose Destination"
                        excludeCity={searchParams.from}
                        iconColor="text-cyan"
                      />
                    </div>

                    {/* Date Input */}
                    <div className="pill-input-item date-pill-item">
                      <div className="date-field-mini">
                        <label className="mini-label">
                          <Calendar size={13} className="text-primary-blue" />
                          <span>Date</span>
                        </label>
                        <input 
                          type="date"
                          value={searchParams.date}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={(e) => setSearchParams(prev => ({ ...prev, date: e.target.value }))}
                          className="mini-date-input"
                          required
                        />
                      </div>
                    </div>

                    {/* Category Select */}
                    <div className="pill-input-item cat-pill-item">
                      <div className="date-field-mini">
                        <label className="mini-label">
                          <Zap size={13} className="text-warning" />
                          <span>Class</span>
                        </label>
                        <select 
                          value={searchParams.busClass}
                          onChange={(e) => setSearchParams(prev => ({ ...prev, busClass: e.target.value }))}
                          className="mini-select-input"
                        >
                          <option value="ALL">All Categories</option>
                          <option value="SLEEPER">Volvo AC Sleeper</option>
                          <option value="WASHROOM">With Washroom 🚻</option>
                          <option value="EV">Electric EV ⚡</option>
                          <option value="SEATER">Semi-Sleeper</option>
                        </select>
                      </div>
                    </div>

                    {/* Round Dark Search Action Button */}
                    <button 
                      type="submit" 
                      className="pill-search-submit-circle"
                      title="Search available buses"
                    >
                      <Search size={20} />
                    </button>

                  </div>
                </form>
              </div>

              {/* Quick Route Shortcuts underneath */}
              <div className="camply-quick-pills-row">
                <span className="pills-label">Popular Corridors:</span>
                <button 
                  type="button" 
                  className="quick-route-bubble"
                  onClick={() => selectPinRoute('Bengaluru', 'Hyderabad')}
                >
                  Bengaluru ➔ Hyderabad
                </button>
                <button 
                  type="button" 
                  className="quick-route-bubble"
                  onClick={() => selectPinRoute('Mumbai', 'Goa (Panaji / Panjim)')}
                >
                  Mumbai ➔ Goa
                </button>
                <button 
                  type="button" 
                  className="quick-route-bubble"
                  onClick={() => selectPinRoute('Delhi', 'Jaipur')}
                >
                  Delhi ➔ Jaipur
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
