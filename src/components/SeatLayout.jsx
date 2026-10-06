import React, { useState } from 'react';
import { 
  Check, 
  MapPin, 
  User, 
  ShieldAlert, 
  Layers, 
  ArrowRight,
  Info
} from 'lucide-react';
import PlaneSeatLayout from './PlaneSeatLayout';

export default function SeatLayout({ 
  bus, 
  selectedSeats, 
  onToggleSeat, 
  onProceedToBooking,
  boardingPoint,
  setBoardingPoint,
  droppingPoint,
  setDroppingPoint,
  formatPrice
}) {
  // If this vehicle is a flight, render the dedicated Airplane Cabin Seatmap
  if (bus && (bus.mode === 'flights' || bus.category === 'flight')) {
    return (
      <PlaneSeatLayout 
        flight={bus}
        selectedSeats={selectedSeats}
        onToggleSeat={onToggleSeat}
        onProceedToBooking={onProceedToBooking}
        boardingPoint={boardingPoint}
        setBoardingPoint={setBoardingPoint}
        droppingPoint={droppingPoint}
        setDroppingPoint={setDroppingPoint}
        formatPrice={formatPrice}
      />
    );
  }

  const hasUpperDeck = bus.upperDeck && bus.upperDeck.length > 0;
  const [currentDeck, setCurrentDeck] = useState('lower');

  // Active seats to show based on selected deck tab
  const activeDeckSeats = currentDeck === 'lower' ? bus.lowerDeck : bus.upperDeck;

  const totalSeatsPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  return (
    <div className="seat-selection-container">
      <div className="seat-selection-header">
        <div>
          <h4 className="selection-title">Select Seats for {bus.name}</h4>
          <p className="selection-subtitle">
            Click on any available seat or sleeper berth to reserve. Pink seats are reserved for female passengers.
          </p>
        </div>

        {/* Deck Switcher for Sleeper Coaches */}
        {hasUpperDeck && (
          <div className="deck-switcher-tabs">
            <button 
              className={`deck-tab-btn ${currentDeck === 'lower' ? 'active' : ''}`}
              onClick={() => setCurrentDeck('lower')}
            >
              <Layers size={16} />
              <span>Lower Deck</span>
              <span className="deck-count">
                {bus.lowerDeck.filter(s => s.status === 'available').length} Available
              </span>
            </button>
            <button 
              className={`deck-tab-btn ${currentDeck === 'upper' ? 'active' : ''}`}
              onClick={() => setCurrentDeck('upper')}
            >
              <Layers size={16} />
              <span>Upper Deck</span>
              <span className="deck-count">
                {bus.upperDeck.filter(s => s.status === 'available').length} Available
              </span>
            </button>
          </div>
        )}
      </div>

      <div className="seat-layout-grid-wrapper">
        {/* Left Side: Bus Floor Plan */}
        <div className="bus-floor-chassis glass-panel">
          
          {/* Driver Cockpit Header */}
          <div className="bus-cockpit">
            <div className="steering-indicator">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v7" />
                <path d="M12 15v7" />
                <path d="M4.93 4.93l4.95 4.95" />
                <path d="M14.12 14.12l4.95 4.95" />
                <path d="M19.07 4.93l-4.95 4.95" />
                <path d="M9.88 14.12l-4.95 4.95" />
              </svg>
              <span>Driver Cockpit</span>
            </div>
            <div className="door-indicator">
              <span>Main Entry ➔</span>
            </div>
          </div>

          {/* Seat Grid */}
          <div className="seat-grid-matrix">
            {activeDeckSeats.map((seat) => {
              const isSelected = selectedSeats.some(s => s.id === seat.id);
              const isBooked = seat.status === 'booked';
              const isFemaleOnly = seat.isFemaleOnly;
              const isSleeper = seat.type === 'sleeper';

              let seatClass = 'seat-cell';
              if (isSleeper) seatClass += ' sleeper-cell';
              if (isBooked) seatClass += ' seat-booked';
              else if (isSelected) seatClass += ' seat-selected';
              else if (isFemaleOnly) seatClass += ' seat-female-reserved';
              else seatClass += ' seat-available';

              return (
                <button
                  key={seat.id}
                  type="button"
                  disabled={isBooked}
                  onClick={() => onToggleSeat(seat)}
                  className={seatClass}
                  title={`${seat.number} - ${formatPrice(seat.price)} (${seat.status}${isFemaleOnly ? ', Women Reserved' : ''})`}
                >
                  <div className="seat-pillow"></div>
                  <div className="seat-content-wrap">
                    <span className="seat-number">{seat.number}</span>
                    <span className="seat-price-tag">{formatPrice(seat.price)}</span>
                  </div>
                  {isSelected && (
                    <div className="seat-check-mark">
                      <Check size={12} strokeWidth={3} />
                    </div>
                  )}
                  {isFemaleOnly && !isSelected && !isBooked && (
                    <div className="female-dot" title="Female Reserved"></div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Visual Legend */}
          <div className="seat-legend-bar">
            <div className="legend-item">
              <span className="legend-box legend-available"></span>
              <span>Available</span>
            </div>
            <div className="legend-item">
              <span className="legend-box legend-selected"></span>
              <span>Selected</span>
            </div>
            <div className="legend-item">
              <span className="legend-box legend-female"></span>
              <span>Women Reserved</span>
            </div>
            <div className="legend-item">
              <span className="legend-box legend-booked"></span>
              <span>Booked</span>
            </div>
          </div>
        </div>

        {/* Right Side: Pickup/Drop Point & Cost Summary */}
        <div className="booking-sidebar-panel glass-panel">
          
          {/* Boarding Point Selector */}
          <div className="point-selector-group">
            <label className="point-label">
              <MapPin size={16} className="text-accent" />
              <span>Boarding Point</span>
            </label>
            <div className="point-options-list">
              {bus.boardingPoints.map((bp) => (
                <div 
                  key={bp.id} 
                  className={`point-option-card ${boardingPoint?.id === bp.id ? 'selected' : ''}`}
                  onClick={() => setBoardingPoint(bp)}
                >
                  <div className="point-time">{bp.time}</div>
                  <div className="point-details">
                    <strong>{bp.name}</strong>
                    <span className="point-landmark">{bp.landmark}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dropping Point Selector */}
          <div className="point-selector-group">
            <label className="point-label">
              <MapPin size={16} className="text-cyan" />
              <span>Dropping Point</span>
            </label>
            <div className="point-options-list">
              {bus.droppingPoints.map((dp) => (
                <div 
                  key={dp.id} 
                  className={`point-option-card ${droppingPoint?.id === dp.id ? 'selected' : ''}`}
                  onClick={() => setDroppingPoint(dp)}
                >
                  <div className="point-time">{dp.time}</div>
                  <div className="point-details">
                    <strong>{dp.name}</strong>
                    <span className="point-landmark">{dp.landmark}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Pricing Breakdown */}
          <div className="pricing-summary-card">
            <div className="summary-row">
              <span>Selected Seats ({selectedSeats.length}):</span>
              <strong>
                {selectedSeats.length > 0 
                  ? selectedSeats.map(s => s.number).join(', ') 
                  : 'None selected'}
              </strong>
            </div>
            <div className="summary-row">
              <span>Base Fare:</span>
              <span>{formatPrice(totalSeatsPrice)}</span>
            </div>
            <div className="summary-row">
              <span>Taxes & GST (5%):</span>
              <span>{formatPrice(totalSeatsPrice * 0.05)}</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total-row">
              <span>Total Estimated:</span>
              <span className="total-highlight">
                {formatPrice(totalSeatsPrice + (totalSeatsPrice * 0.05))}
              </span>
            </div>

            {/* Validation Notice */}
            {selectedSeats.length === 0 && (
              <div className="selection-notice warning">
                <Info size={16} />
                <span>Please select at least 1 seat to continue.</span>
              </div>
            )}
            {selectedSeats.length > 0 && (!boardingPoint || !droppingPoint) && (
              <div className="selection-notice warning">
                <Info size={16} />
                <span>Please pick both a boarding and dropping point.</span>
              </div>
            )}

            <button 
              className="btn-primary w-full proceed-booking-btn"
              disabled={selectedSeats.length === 0 || !boardingPoint || !droppingPoint}
              onClick={onProceedToBooking}
            >
              <span>Continue to Passenger Details</span>
              <ArrowRight size={18} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
