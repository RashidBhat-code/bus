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
  Droplets,
  Plane,
  Train,
  Luggage
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
  const isFlight = bus.mode === 'flights' || bus.category === 'flight';
  const isTrain = bus.mode === 'trains' || bus.category === 'train';

  return (
    <div className={`bus-result-card glass-panel ${isSelected ? 'card-expanded' : ''} ${isFlight ? 'flight-result-card' : ''}`}>
      {/* Top Banner Badge if present */}
      {bus.badge && (
        <div className={`bus-highlight-strip ${isFlight ? 'strip-flight' : ''} ${bus.hasWashroom ? 'strip-washroom' : ''} ${bus.isGovtRTC ? 'strip-govtrtc' : ''} ${bus.category === 'electric' ? 'strip-electric' : ''}`}>
          <span className="strip-text">{bus.badge}</span>
        </div>
      )}

      {/* Main Bus/Flight/Train Header & Summary */}
      <div className="bus-card-main-grid">
        
        {/* Left Column: Operator & Travel Info */}
        <div className="bus-operator-info">
          <div className="operator-header">
            <h3 className="bus-title">{bus.name}</h3>
            {isFlight ? (
              <span className="verified-tag flight-verified" title="DGCA Certified Indian Airline">
                <Plane size={13} className="text-flight-blue" /> DGCA Certified Airline
              </span>
            ) : isTrain ? (
              <span className="govt-rtc-tag" title="Official Indian Railways / IRCTC Partner">
                <Train size={13} /> IRCTC Rail Partner
              </span>
            ) : bus.isGovtRTC ? (
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
              <span>{bus.rating ? bus.rating.toFixed(1) : '4.8'}</span>
            </div>
            <span className="reviews-count">({bus.reviewsCount ? bus.reviewsCount.toLocaleString() : '1,200'} reviews)</span>
          </div>

          <div className="amenities-icons-list">
            {isFlight && bus.baggage && (
              <span className="amenity-chip highlight-baggage" title={bus.baggage}>
                <Luggage size={14} /> {bus.baggage}
              </span>
            )}
            {bus.hasWashroom && (
              <span className="amenity-chip highlight-washroom" title="Bio-Toilet / Washroom Available Onboard">
                <span className="amenity-emoji">🚻</span> Washroom
              </span>
            )}
            {bus.category === 'electric' && (
              <span className="amenity-chip highlight-ev" title="100% Zero Emission Electric Coach">
                <Zap size={14} className="text-success" /> EV Green
              </span>
            )}
            <span className="amenity-chip" title="Fast Charging"><Zap size={14} /> Charging</span>
            <span className="amenity-chip" title="Realtime GPS Telemetry"><Compass size={14} /> Live Telemetry</span>
          </div>
        </div>

        {/* Center Column: Departure, Duration Timeline, Arrival */}
        <div className="bus-timing-schedule">
          <div className="time-block departure">
            <span className="time-main">{bus.departureTime}</span>
            <span className="city-name">
              {bus.departureAirportCode ? `${bus.departureAirportCode} - ${bus.from}` : bus.from}
            </span>
            <span className="stop-hint">{bus.boardingPoints?.[0]?.name.slice(0, 26)}...</span>
          </div>

          <div className="duration-timeline">
            <span className="duration-label">{bus.duration}</span>
            <div className="timeline-graphic">
              <span className="timeline-dot start"></span>
              <span className="timeline-line"></span>
              <span className="timeline-bus-icon">
                {isFlight ? '✈️' : isTrain ? '🚆' : '🚌'}
              </span>
              <span className="timeline-line"></span>
              <span className="timeline-dot end"></span>
            </div>
            <span className="route-type-label">
              {isFlight ? 'Non-Stop Flight' : isTrain ? 'Superfast Rail' : 'Direct Highway Express'}
            </span>
          </div>

          <div className="time-block arrival">
            <span className="time-main">{bus.arrivalTime}</span>
            <span className="city-name">
              {bus.arrivalAirportCode ? `${bus.arrivalAirportCode} - ${bus.to}` : bus.to}
            </span>
            <span className="stop-hint">{bus.droppingPoints?.[0]?.name.slice(0, 26)}...</span>
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
              {bus.availableSeatsCount} seats available
            </span>
          </div>

          <button 
            className={`btn-select-seats ${isSelected ? 'active' : ''}`}
            onClick={onToggleExpand}
          >
            <span>
              {isSelected 
                ? (isFlight ? 'Close Cabin Seats' : isTrain ? 'Close Rail Berths' : 'Close Seat Map')
                : (isFlight ? 'Select Flight Seats ✈️' : isTrain ? 'Select Train Seats 🚆' : 'Select Seats')}
            </span>
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
