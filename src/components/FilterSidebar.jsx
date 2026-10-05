import React from 'react';
import { 
  SlidersHorizontal, 
  RotateCcw, 
  Sun, 
  Sunrise, 
  Sunset, 
  Moon, 
  Star, 
  Wifi, 
  Zap, 
  Compass,
  IndianRupee,
  Building,
  Sparkles
} from 'lucide-react';

export default function FilterSidebar({ 
  filters, 
  setFilters, 
  resetFilters, 
  formatPrice, 
  totalResultsCount 
}) {
  const toggleTimeSlot = (slot) => {
    setFilters(prev => {
      const exists = prev.timeSlots.includes(slot);
      return {
        ...prev,
        timeSlots: exists 
          ? prev.timeSlots.filter(s => s !== slot)
          : [...prev.timeSlots, slot]
      };
    });
  };

  const toggleBusType = (type) => {
    setFilters(prev => {
      const exists = prev.busTypes.includes(type);
      return {
        ...prev,
        busTypes: exists 
          ? prev.busTypes.filter(t => t !== type)
          : [...prev.busTypes, type]
      };
    });
  };

  return (
    <aside className="filter-sidebar glass-panel">
      <div className="filter-header">
        <div className="filter-title-wrap">
          <SlidersHorizontal size={18} className="text-accent" />
          <h3>Filters</h3>
        </div>
        <button className="reset-filters-btn" onClick={resetFilters} title="Reset all filters">
          <RotateCcw size={14} />
          <span>Reset</span>
        </button>
      </div>

      <div className="results-count-strip">
        Showing <strong>{totalResultsCount}</strong> buses on this route
      </div>

      {/* Departure Time Slots */}
      <div className="filter-section">
        <h4 className="filter-heading">Departure Time</h4>
        <div className="time-slots-grid">
          <button 
            type="button"
            className={`time-slot-chip ${filters.timeSlots.includes('early') ? 'active' : ''}`}
            onClick={() => toggleTimeSlot('early')}
          >
            <Sunrise size={16} />
            <span>Before 6 AM</span>
          </button>

          <button 
            type="button"
            className={`time-slot-chip ${filters.timeSlots.includes('morning') ? 'active' : ''}`}
            onClick={() => toggleTimeSlot('morning')}
          >
            <Sun size={16} />
            <span>6 AM - 12 PM</span>
          </button>

          <button 
            type="button"
            className={`time-slot-chip ${filters.timeSlots.includes('afternoon') ? 'active' : ''}`}
            onClick={() => toggleTimeSlot('afternoon')}
          >
            <Sunset size={16} />
            <span>12 PM - 6 PM</span>
          </button>

          <button 
            type="button"
            className={`time-slot-chip ${filters.timeSlots.includes('night') ? 'active' : ''}`}
            onClick={() => toggleTimeSlot('night')}
          >
            <Moon size={16} />
            <span>After 6 PM (Night)</span>
          </button>
        </div>
      </div>

      {/* Coach Categories & Amenities */}
      <div className="filter-section">
        <h4 className="filter-heading">Bus Category & Amenities</h4>
        <div className="filter-checkbox-list">
          <label className="filter-checkbox-item">
            <input 
              type="checkbox" 
              checked={filters.busTypes.includes('washroom')}
              onChange={() => toggleBusType('washroom')}
            />
            <span className="checkbox-label-content">
              <strong>🚻 With Washroom / Toilet</strong>
            </span>
          </label>

          <label className="filter-checkbox-item">
            <input 
              type="checkbox" 
              checked={filters.busTypes.includes('govt')}
              onChange={() => toggleBusType('govt')}
            />
            <span className="checkbox-label-content">
              <strong>🏛️ Govt RTC (KSRTC / MSRTC / TSRTC)</strong>
            </span>
          </label>

          <label className="filter-checkbox-item">
            <input 
              type="checkbox" 
              checked={filters.busTypes.includes('sleeper')}
              onChange={() => toggleBusType('sleeper')}
            />
            <span>Volvo AC Sleeper (2+1)</span>
          </label>

          <label className="filter-checkbox-item">
            <input 
              type="checkbox" 
              checked={filters.busTypes.includes('seater')}
              onChange={() => toggleBusType('seater')}
            />
            <span>Multi-Axle Semi-Sleeper (2+2)</span>
          </label>

          <label className="filter-checkbox-item">
            <input 
              type="checkbox" 
              checked={filters.busTypes.includes('electric')}
              onChange={() => toggleBusType('electric')}
            />
            <span>100% Eco Electric Coach (EV) ⚡</span>
          </label>

          <label className="filter-checkbox-item">
            <input 
              type="checkbox" 
              checked={filters.busTypes.includes('budget')}
              onChange={() => toggleBusType('budget')}
            />
            <span>Budget Non-AC Sleeper 🏷️</span>
          </label>
        </div>
      </div>

      {/* Price Range Slider (Adapted for INR) */}
      <div className="filter-section">
        <div className="range-header">
          <h4 className="filter-heading">Max Ticket Fare</h4>
          <span className="current-range-value">{formatPrice(filters.maxPrice)}</span>
        </div>
        <input 
          type="range" 
          min="500" 
          max="2500" 
          step="50"
          value={filters.maxPrice}
          onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
          className="price-slider"
        />
        <div className="range-bounds">
          <span>{formatPrice(500)}</span>
          <span>{formatPrice(2500)}</span>
        </div>
      </div>

      {/* Operator Rating */}
      <div className="filter-section">
        <h4 className="filter-heading">Operator Rating</h4>
        <div className="rating-filter-options">
          {[0, 4.0, 4.5, 4.8].map(minRate => (
            <button
              key={minRate}
              type="button"
              className={`rating-pill-btn ${filters.minRating === minRate ? 'active' : ''}`}
              onClick={() => setFilters(prev => ({ ...prev, minRating: minRate }))}
            >
              {minRate === 0 ? (
                'All Ratings'
              ) : (
                <>
                  <Star size={13} fill="currentColor" /> {minRate}+
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Live GPS Tracking */}
      <div className="filter-section">
        <label className="filter-toggle-row">
          <div className="toggle-label-wrap">
            <Compass size={16} className="text-cyan" />
            <span>Only Live GPS Buses</span>
          </div>
          <input 
            type="checkbox" 
            checked={filters.onlyLiveTracking}
            onChange={(e) => setFilters(prev => ({ ...prev, onlyLiveTracking: e.target.checked }))}
            className="styled-toggle-checkbox"
          />
        </label>
      </div>
    </aside>
  );
}
