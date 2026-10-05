import React, { useState } from 'react';
import { 
  MapPin, 
  Calendar, 
  ArrowLeftRight, 
  Search, 
  ShieldCheck, 
  Sparkles, 
  Wifi, 
  Clock, 
  TrendingUp,
  Zap
} from 'lucide-react';
import Bus3DHero from './Bus3DHero';
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

  return (
    <section className="hero-search-section">
      
      {/* 3D Animated Hero Stage */}
      <Bus3DHero />

      <div className="hero-content-overlay">
        <div className="hero-badge-wrap">
          <span className="hero-pill-badge">
            <span className="india-flag-icon">🇮🇳</span> India's #1 Luxury Intercity Bus & Sleeper Reservation
          </span>
        </div>

        <h1 className="hero-headline">
          Experience Pure Luxury on <span className="text-gradient">Indian Highways</span>
        </h1>
        <p className="hero-subtext">
          Reserve Volvo 9600s AC Sleepers, BharatBenz Glider (Washroom Onboard), KSRTC/MSRTC Govt RTCs & 100% Electric EV Express across all Indian cities and areas.
        </p>

        {/* Search Box Card */}
        <div className="search-box-card glass-panel search-box-3d">
          <form onSubmit={(e) => { e.preventDefault(); onSearch(); }} className="search-form">
            <div className="search-inputs-grid">
              
              {/* Origin City / Area Auto-Complete */}
              <CitySearchInput 
                label="Leaving From (Any City / Area)"
                value={searchParams.from}
                onChange={(city) => setSearchParams(prev => ({ ...prev, from: city }))}
                placeholder="Type any city, town, or area..."
                excludeCity={searchParams.to}
                iconColor="text-accent"
              />

              {/* Swap Button */}
              <button 
                type="button" 
                className={`swap-cities-btn ${isSwapping ? 'spinning' : ''}`}
                onClick={handleSwap}
                title="Swap Origin and Destination"
              >
                <ArrowLeftRight size={18} />
              </button>

              {/* Destination City / Area Auto-Complete */}
              <CitySearchInput 
                label="Going To (Any Destination)"
                value={searchParams.to}
                onChange={(city) => setSearchParams(prev => ({ ...prev, to: city }))}
                placeholder="Type destination city or town..."
                excludeCity={searchParams.from}
                iconColor="text-cyan"
              />

              {/* Date */}
              <div className="search-field-group">
                <label className="field-label">
                  <Calendar size={16} className="text-accent" />
                  <span>Journey Date</span>
                </label>
                <div className="input-wrapper">
                  <input 
                    type="date" 
                    value={searchParams.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setSearchParams(prev => ({ ...prev, date: e.target.value }))}
                    className="search-date-input"
                    required
                  />
                </div>
              </div>

              {/* Bus Category Preference */}
              <div className="search-field-group">
                <label className="field-label">
                  <Zap size={16} className="text-warning" />
                  <span>Coach Category</span>
                </label>
                <div className="input-wrapper">
                  <select 
                    value={searchParams.busClass}
                    onChange={(e) => setSearchParams(prev => ({ ...prev, busClass: e.target.value }))}
                    className="search-select"
                  >
                    <option value="ALL">All Categories (12+ Varieties)</option>
                    <option value="SLEEPER">Volvo AC Sleeper (2+1)</option>
                    <option value="WASHROOM">With Washroom / Toilet 🚻</option>
                    <option value="GOVT_RTC">Govt RTC Buses (KSRTC/MSRTC) 🏛️</option>
                    <option value="EV">100% Electric EV Express ⚡</option>
                    <option value="SEATER">Multi-Axle Semi-Sleeper (2+2)</option>
                    <option value="BUDGET">Budget Non-AC Sleeper 🏷️</option>
                  </select>
                </div>
              </div>

              {/* Search CTA */}
              <div className="search-btn-wrapper">
                <button type="submit" className="btn-primary search-submit-btn">
                  <Search size={18} />
                  <span>Search Buses</span>
                </button>
              </div>

            </div>

            {/* Quick dates & popular Indian pairs */}
            <div className="search-bar-footer">
              <div className="date-chips-wrap">
                <span className="chips-label">Dates:</span>
                <button 
                  type="button" 
                  className={`date-chip ${isToday() ? 'active' : ''}`}
                  onClick={() => setQuickDate(0)}
                >
                  Today
                </button>
                <button 
                  type="button" 
                  className={`date-chip ${isTomorrow() ? 'active' : ''}`}
                  onClick={() => setQuickDate(1)}
                >
                  Tomorrow
                </button>
                <button 
                  type="button" 
                  className="date-chip"
                  onClick={() => setQuickDate(2)}
                >
                  Day After
                </button>
              </div>

              <div className="popular-pair-chips">
                <span className="chips-label">Popular Routes:</span>
                <button 
                  type="button" 
                  className="route-quick-chip"
                  onClick={() => setSearchParams(prev => ({ ...prev, from: 'Bengaluru', to: 'Hyderabad' }))}
                >
                  Bengaluru ➔ Hyderabad
                </button>
                <button 
                  type="button" 
                  className="route-quick-chip"
                  onClick={() => setSearchParams(prev => ({ ...prev, from: 'Mumbai', to: 'Goa (Panaji / Panjim)' }))}
                >
                  Mumbai ➔ Goa
                </button>
                <button 
                  type="button" 
                  className="route-quick-chip"
                  onClick={() => setSearchParams(prev => ({ ...prev, from: 'Delhi', to: 'Manali' }))}
                >
                  Delhi ➔ Manali
                </button>
                <button 
                  type="button" 
                  className="route-quick-chip"
                  onClick={() => setSearchParams(prev => ({ ...prev, from: 'Pune', to: 'Mumbai' }))}
                >
                  Pune ➔ Mumbai
                </button>
                <button 
                  type="button" 
                  className="route-quick-chip"
                  onClick={() => setSearchParams(prev => ({ ...prev, from: 'Chennai', to: 'Coimbatore' }))}
                >
                  Chennai ➔ Coimbatore
                </button>
                <button 
                  type="button" 
                  className="route-quick-chip"
                  onClick={() => setSearchParams(prev => ({ ...prev, from: 'Kolkata', to: 'Siliguri' }))}
                >
                  Kolkata ➔ Siliguri
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Feature Highlights Grid */}
        <div className="hero-features-strip">
          <div className="feature-pill">
            <ShieldCheck size={18} className="feature-icon text-success" />
            <div>
              <strong>Sanitized Sleeper Berths</strong>
              <span>Clean linen & reading lamp</span>
            </div>
          </div>
          <div className="feature-pill">
            <Clock size={18} className="feature-icon text-cyan" />
            <div>
              <strong>On-Time Highway Express</strong>
              <span>99.2% punctual departures</span>
            </div>
          </div>
          <div className="feature-pill">
            <TrendingUp size={18} className="feature-icon text-accent" />
            <div>
              <strong>Instant UPI Refund</strong>
              <span>Direct to your GPay / PhonePe</span>
            </div>
          </div>
          <div className="feature-pill">
            <Wifi size={18} className="feature-icon text-warning" />
            <div>
              <strong>Free 5G & Power Outlets</strong>
              <span>220V laptop & USB-C ports</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
