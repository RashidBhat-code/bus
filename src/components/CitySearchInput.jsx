import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Search, X, Check, Flame, ChevronDown } from 'lucide-react';
import { INDIAN_CITIES } from '../data/indianCities';

export default function CitySearchInput({
  label,
  value,
  onChange,
  placeholder = "Search city, state, or area...",
  excludeCity = "",
  iconColor = "text-accent"
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value || '');
  const [activeZone, setActiveZone] = useState('ALL'); // 'ALL' | 'POPULAR' | 'South' | 'North' | 'West' | 'East' | 'Central'
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Sync external value with local input
  useEffect(() => {
    setSearchTerm(value || '');
  }, [value]);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        // If user typed something but didn't select, keep the term as custom city
        if (searchTerm.trim() && searchTerm !== value) {
          onChange(searchTerm.trim());
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchTerm, value, onChange]);

  // Filter cities by search term and zone
  const filteredCities = INDIAN_CITIES.filter(city => {
    // Exclude the other city if selected
    if (excludeCity && city.name.toLowerCase() === excludeCity.toLowerCase()) {
      return false;
    }

    // Match zone
    if (activeZone === 'POPULAR' && !city.popular) return false;
    if (activeZone !== 'ALL' && activeZone !== 'POPULAR' && city.zone !== activeZone) return false;

    // Match search query (city name, state, or hub)
    if (!searchTerm.trim()) return true;
    const query = searchTerm.toLowerCase().trim();
    return (
      city.name.toLowerCase().includes(query) ||
      city.state.toLowerCase().includes(query) ||
      (city.hub && city.hub.toLowerCase().includes(query))
    );
  });

  const handleSelectCity = (cityName) => {
    onChange(cityName);
    setSearchTerm(cityName);
    setIsOpen(false);
  };

  const handleCustomSubmit = () => {
    if (searchTerm.trim()) {
      onChange(searchTerm.trim());
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCities.length > 0) {
        handleSelectCity(filteredCities[0].name);
      } else if (searchTerm.trim()) {
        handleCustomSubmit();
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const isExactMatch = INDIAN_CITIES.some(
    c => c.name.toLowerCase() === searchTerm.trim().toLowerCase()
  );

  return (
    <div className="city-search-container" ref={containerRef}>
      <label className="field-label">
        <MapPin size={16} className={iconColor} />
        <span>{label}</span>
      </label>

      <div className="input-wrapper city-input-wrapper">
        <input
          ref={inputRef}
          type="text"
          className="search-city-input"
          value={searchTerm}
          placeholder={placeholder}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />

        {searchTerm ? (
          <button
            type="button"
            className="clear-city-btn"
            onClick={(e) => {
              e.stopPropagation();
              setSearchTerm('');
              onChange('');
              inputRef.current?.focus();
            }}
            title="Clear search"
          >
            <X size={14} />
          </button>
        ) : (
          <button
            type="button"
            className="dropdown-chevron-btn"
            onClick={() => setIsOpen(!isOpen)}
          >
            <ChevronDown size={14} />
          </button>
        )}
      </div>

      {/* Auto-suggest dropdown */}
      {isOpen && (
        <div className="city-dropdown-menu glass-panel">
          {/* Quick Zone Navigation Filters */}
          <div className="zone-filter-tabs">
            <button
              type="button"
              className={`zone-tab ${activeZone === 'POPULAR' ? 'active' : ''}`}
              onClick={() => setActiveZone('POPULAR')}
            >
              <Flame size={12} className="text-accent" /> Popular
            </button>
            <button
              type="button"
              className={`zone-tab ${activeZone === 'ALL' ? 'active' : ''}`}
              onClick={() => setActiveZone('ALL')}
            >
              All India ({INDIAN_CITIES.length})
            </button>
            <button
              type="button"
              className={`zone-tab ${activeZone === 'South' ? 'active' : ''}`}
              onClick={() => setActiveZone('South')}
            >
              South
            </button>
            <button
              type="button"
              className={`zone-tab ${activeZone === 'North' ? 'active' : ''}`}
              onClick={() => setActiveZone('North')}
            >
              North
            </button>
            <button
              type="button"
              className={`zone-tab ${activeZone === 'West' ? 'active' : ''}`}
              onClick={() => setActiveZone('West')}
            >
              West
            </button>
            <button
              type="button"
              className={`zone-tab ${activeZone === 'East' ? 'active' : ''}`}
              onClick={() => setActiveZone('East')}
            >
              East
            </button>
            <button
              type="button"
              className={`zone-tab ${activeZone === 'Central' ? 'active' : ''}`}
              onClick={() => setActiveZone('Central')}
            >
              Central
            </button>
          </div>

          {/* Custom Area Option if typed and not exact match */}
          {searchTerm.trim() && !isExactMatch && (
            <div 
              className="custom-area-option"
              onClick={handleCustomSubmit}
            >
              <div className="custom-area-icon">📍</div>
              <div className="custom-area-info">
                <strong>Use "{searchTerm.trim()}" as custom area / town</strong>
                <span>Search interstate buses connecting to this location</span>
              </div>
              <span className="enter-key-badge">Enter ↵</span>
            </div>
          )}

          {/* Cities Suggestion List */}
          <div className="cities-scroll-list">
            {filteredCities.length === 0 ? (
              <div className="no-city-found">
                <p>No exact directory match for "{searchTerm}"</p>
                <button
                  type="button"
                  className="btn-use-custom"
                  onClick={handleCustomSubmit}
                >
                  Use "{searchTerm}" as search point
                </button>
              </div>
            ) : (
              filteredCities.map((city) => {
                const isSelected = value && value.toLowerCase() === city.name.toLowerCase();
                return (
                  <div
                    key={`${city.name}-${city.state}`}
                    className={`city-option-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSelectCity(city.name)}
                  >
                    <div className="city-item-left">
                      <div className="city-name-row">
                        <span className="city-name">{city.name}</span>
                        {city.popular && <span className="popular-badge">Popular</span>}
                        <span className="state-badge">{city.state}</span>
                      </div>
                      {city.hub && (
                        <span className="hub-hint">
                          Hub: {city.hub}
                        </span>
                      )}
                    </div>

                    {isSelected && (
                      <Check size={16} className="text-success check-icon" />
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
