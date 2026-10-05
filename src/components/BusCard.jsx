import React from 'react';
import { 
  Star, 
  Clock, 
  MapPin, 
  Wifi, 
  Zap, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  Compass,
  CheckCircle,
  Tv,
  Coffee,
  Sparkles,
  Building,
  Droplets
} from 'lucide-react';
import SeatLayout from './SeatLayout';

export default function BusCard({ 
  bus, 
  isSelected, 
  onToggleExpand, 
  selectedSeats, 
  onToggleSeat, 
  onProceedToBooking,
  boardingPoint,
  setBoardingPoint,
  droppingPoint,
  setDroppingPoint,
  formatPrice
}) {
  const isFewSeatsLeft = bus.availableSeatsCount <= 10;

  return (
    <div className={`bus-result-card glass-panel ${isSelected ? 'card-expanded' : ''}`}>
      {/* Top Banner Badge if present */}
      {bus.badge && (
        <div className={`bus-highlight-strip ${bus.hasWashroom ? 'strip-washroom' : ''} ${bus.isGovtRTC ? 'strip-govtrtc' : ''} ${bus.category === 'electric' ? 'strip-electric' : ''}`}>
          <span className="strip-text">{bus.badge}</span>
        </div>
      )}

      {/* Main Bus Header & Summary */}
      <div className="bus-card-main-grid">
        
        {/* Left Column: Operator & Bus Info */}
        <div className="bus-operator-info">
          <div className="operator-header">
            <h3 className="bus-title">{bus.name}</h3>
            {bus.isGovtRTC ? (
              <span className="govt-rtc-tag" title="Official State Road Transport Corporation">
                <Building size={13} /> Govt RTC
              </span>
            ) : (
              <span className="verified-tag" title="Verified Fleet Partner">
                <ShieldCheck size={14} className="text-success" /> Verified Fleet
              </span>
            )}
          </div>
          <span className="bus-type-label">{bus.type}</span>
          
          <div className="bus-ratings-wrap">
            <div className="rating-badge">
              <Star size={14} fill="currentColor" strokeWidth={0} />
              <span>{bus.rating.toFixed(1)}</span>
            </div>
            <span className="reviews-count">({bus.reviewsCount.toLocaleString()} reviews)</span>
          </div>

          <div className="amenities-icons-list">
            {bus.hasWashroom && (
              <span className="amenity-chip highlight-washroom" title="Hygienic Bio-Toilet / Washroom Onboard">
                <span className="amenity-emoji">🚻</span> Washroom
              </span>
            )}
            {bus.category === 'electric' && (
              <span className="amenity-chip highlight-ev" title="100% Zero Emission Electric Coach">
                <Zap size={14} className="text-success" /> EV Green
              </span>
            )}
            <span className="amenity-chip" title="High-Speed 5G Wi-Fi"><Wifi size={14} /> Wi-Fi</span>
            <span className="amenity-chip" title="USB & Fast Charging"><Zap size={14} /> Charging</span>
            <span className="amenity-chip" title="Live Highway GPS"><Compass size={14} /> Live GPS</span>
          </div>
        </div>

        {/* Center Column: Departure, Duration Timeline, Arrival */}
        <div className="bus-timing-schedule">
          <div className="time-block departure">
            <span className="time-main">{bus.departureTime}</span>
            <span className="city-name">{bus.from}</span>
            <span className="stop-hint">{bus.boardingPoints[0]?.name.slice(0, 24)}...</span>
          </div>

          <div className="duration-timeline">
            <span className="duration-label">{bus.duration}</span>
            <div className="timeline-graphic">
              <span className="timeline-dot start"></span>
              <span className="timeline-line"></span>
              <span className="timeline-bus-icon">🚌</span>
              <span className="timeline-line"></span>
              <span className="timeline-dot end"></span>
            </div>
            <span className="route-type-label">Direct Express</span>
          </div>

          <div className="time-block arrival">
            <span className="time-main">{bus.arrivalTime}</span>
            <span className="city-name">{bus.to}</span>
            <span className="stop-hint">{bus.droppingPoints[0]?.name.slice(0, 24)}...</span>
          </div>
        </div>

        {/* Right Column: Pricing & Action Button */}
        <div className="bus-pricing-action">
          <div className="price-tag-wrap">
            <span className="price-starting-text">Starting from</span>
            <div className="price-numbers">
              {bus.originalPrice && (
                <span className="price-original">{formatPrice(bus.originalPrice)}</span>
              )}
              <span className="price-actual">{formatPrice(bus.price)}</span>
            </div>
            {bus.originalPrice && (
              <span className="badge badge-success discount-badge">
                Save {formatPrice(bus.originalPrice - bus.price)}
              </span>
            )}
          </div>

          <div className="seats-available-info">
            <span className={`seats-left-badge ${isFewSeatsLeft ? 'few-left' : 'plenty-left'}`}>
              {bus.availableSeatsCount} seats left
            </span>
          </div>

          <button 
            className={`btn-select-seats ${isSelected ? 'active' : ''}`}
            onClick={onToggleExpand}
          >
            <span>{isSelected ? 'Close Seat Map' : 'Select Seats'}</span>
            {isSelected ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>

      </div>

      {/* Expanded Seat Layout Container */}
      {isSelected && (
        <div className="expanded-seat-drawer">
          <SeatLayout 
            bus={bus}
            selectedSeats={selectedSeats}
            onToggleSeat={onToggleSeat}
            onProceedToBooking={onProceedToBooking}
            boardingPoint={boardingPoint}
            setBoardingPoint={setBoardingPoint}
            droppingPoint={droppingPoint}
            setDroppingPoint={setDroppingPoint}
            formatPrice={formatPrice}
          />
        </div>
      )}
    </div>
  );
}
