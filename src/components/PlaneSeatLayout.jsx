import React, { useState } from 'react';
import { 
  Check, 
  Plane, 
  ShieldCheck, 
  MapPin, 
  User, 
  ArrowRight, 
  Sparkles,
  Info,
  Luggage,
  Coffee
} from 'lucide-react';

export default function PlaneSeatLayout({ 
  flight, 
  selectedSeats, 
  onToggleSeat, 
  onProceedToBooking,
  boardingPoint,
  setBoardingPoint,
  droppingPoint,
  setDroppingPoint,
  formatPrice
}) {
  const seats = flight.planeSeats || flight.lowerDeck || [];

  // Group seats by row
  const rowsMap = {};
  seats.forEach(s => {
    if (!rowsMap[s.row]) rowsMap[s.row] = {};
    rowsMap[s.row][s.col] = s;
  });

  const rowNumbers = Object.keys(rowsMap).map(Number).sort((a, b) => a - b);
  const totalSeatsPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  return (
    <div className="airplane-seatmap-wrapper">
      
      {/* Flight Header Strip */}
      <div className="airplane-header-bar">
        <div className="plane-title-group">
          <div className="plane-icon-bubble">
            <Plane size={24} className="text-flight-blue" />
          </div>
          <div>
            <h4 className="flight-name-heading">{flight.name}</h4>
            <span className="aircraft-model-sub">
              {flight.aircraft || 'Airbus A321neo'} • Select Your Cabin Seats
            </span>
          </div>
        </div>

        <div className="flight-specs-pills">
          <span className="spec-pill">
            <Luggage size={14} /> {flight.baggage || '7kg Cabin • 15kg Check-in'}
          </span>
          <span className="spec-pill">
            <Coffee size={14} /> In-Flight Meal Available
          </span>
        </div>
      </div>

      <div className="airplane-main-split">
        
        {/* Left Side: Realistic Aircraft Fuselage & Cabin */}
        <div className="airplane-fuselage-card">
          
          {/* Aircraft Nose Cone & Cockpit */}
          <div className="aircraft-nose-cone">
            <div className="cockpit-windshield-graphic">
              <span className="cockpit-label">✈️ FLIGHT DECK / COCKPIT</span>
            </div>
            <div className="cockpit-pilots-row">
              <span className="pilot-tag">👨‍✈️ Captain</span>
              <span className="pilot-tag">👨‍✈️ First Officer</span>
            </div>
          </div>

          {/* Forward Galley & Lavatory */}
          <div className="aircraft-service-area">
            <span className="service-tag">🚪 Entry Door L1</span>
            <span className="service-tag">🚻 Lavatory</span>
            <span className="service-tag">☕ Forward Galley</span>
            <span className="service-tag">🚪 Entry Door R1</span>
          </div>

          {/* Column Header Indicators */}
          <div className="cabin-columns-indicator">
            <div className="col-group-left">
              <span className="col-letter">A 🪟</span>
              <span className="col-letter">B</span>
              <span className="col-letter">C 🚶</span>
            </div>
            <div className="aisle-spacer-head">
              <span className="aisle-text">AISLE</span>
            </div>
            <div className="col-group-right">
              <span className="col-letter">D 🚶</span>
              <span className="col-letter">E</span>
              <span className="col-letter">F 🪟</span>
            </div>
          </div>

          {/* Seat Grid inside Fuselage */}
          <div className="airplane-cabin-rows">
            {rowNumbers.map(r => {
              const rowSeats = rowsMap[r];
              const isBusiness = r <= 2;
              const isExitRow = r === 7;
              const isFrontRow = r === 3;

              return (
                <div key={r} className={`cabin-row-unit ${isBusiness ? 'business-row' : ''} ${isExitRow ? 'exit-row' : ''}`}>
                  
                  {/* Left Wing Indicator for Mid-Cabin Rows */}
                  {r === 6 && <div className="aircraft-wing wing-left">◀ WING</div>}

                  {/* Left Column Seats: A, B, C */}
                  <div className="seat-triple-cluster cluster-left">
                    {['A', 'B', 'C'].map(col => {
                      const seat = rowSeats[col];
                      if (!seat) {
                        return isBusiness ? <div key={col} className="seat-spacer-empty"></div> : null;
                      }

                      const isSelected = selectedSeats.some(s => s.id === seat.id);
                      const isBooked = seat.status === 'booked';

                      return (
                        <button
                          key={seat.id}
                          type="button"
                          disabled={isBooked}
                          onClick={() => onToggleSeat(seat)}
                          className={`plane-seat-btn ${seat.cabin} ${seat.type} ${isSelected ? 'selected' : ''} ${isBooked ? 'booked' : 'available'}`}
                          title={`${seat.number} (${seat.label || seat.type}) • ${formatPrice(seat.price)}`}
                        >
                          <span className="seat-headrest"></span>
                          <span className="seat-code">{seat.number}</span>
                          {isSelected && <Check size={12} className="seat-check-icon" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Center Aisle with Row Number */}
                  <div className="cabin-aisle-divider">
                    <span className="row-num-badge">{r}</span>
                  </div>

                  {/* Right Column Seats: D, E, F */}
                  <div className="seat-triple-cluster cluster-right">
                    {['D', 'E', 'F'].map(col => {
                      const seat = rowSeats[col];
                      if (!seat) {
                        return isBusiness ? <div key={col} className="seat-spacer-empty"></div> : null;
                      }

                      const isSelected = selectedSeats.some(s => s.id === seat.id);
                      const isBooked = seat.status === 'booked';

                      return (
                        <button
                          key={seat.id}
                          type="button"
                          disabled={isBooked}
                          onClick={() => onToggleSeat(seat)}
                          className={`plane-seat-btn ${seat.cabin} ${seat.type} ${isSelected ? 'selected' : ''} ${isBooked ? 'booked' : 'available'}`}
                          title={`${seat.number} (${seat.label || seat.type}) • ${formatPrice(seat.price)}`}
                        >
                          <span className="seat-headrest"></span>
                          <span className="seat-code">{seat.number}</span>
                          {isSelected && <Check size={12} className="seat-check-icon" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Right Wing Indicator for Mid-Cabin Rows */}
                  {r === 6 && <div className="aircraft-wing wing-right">WING ▶</div>}

                  {/* Exit Row Callout */}
                  {isExitRow && (
                    <div className="exit-row-banner">
                      <span>🚪 EMERGENCY EXIT ROW • EXTRA LEGROOM</span>
                    </div>
                  )}

                  {/* Front Row Callout */}
                  {isFrontRow && (
                    <div className="front-row-banner">
                      <span>✨ ECONOMY PREMIUM FRONT ROW</span>
                    </div>
                  )}

                </div>
              );
            })}
          </div>

          {/* Aft Galley & Lavatory */}
          <div className="aircraft-service-area aft-service">
            <span className="service-tag">🚻 Lavatory</span>
            <span className="service-tag">🍴 Aft Galley</span>
            <span className="service-tag">🚻 Lavatory</span>
          </div>

          {/* Plane Legend Bar */}
          <div className="airplane-legend-bar">
            <div className="plane-legend-item">
              <span className="legend-chip chip-available"></span>
              <span>Available</span>
            </div>
            <div className="plane-legend-item">
              <span className="legend-chip chip-selected"></span>
              <span>Selected</span>
            </div>
            <div className="plane-legend-item">
              <span className="legend-chip chip-business"></span>
              <span>Business Class</span>
            </div>
            <div className="plane-legend-item">
              <span className="legend-chip chip-booked"></span>
              <span>Occupied</span>
            </div>
            <div className="plane-legend-item">
              <span className="legend-type-hint">🪟 Window</span>
              <span className="legend-type-hint">🚶 Aisle</span>
            </div>
          </div>

        </div>

        {/* Right Side: Airport Terminal Selection & Passenger Pricing Summary */}
        <div className="airplane-sidebar-panel">
          
          {/* Terminal & Boarding Gate Selection */}
          <div className="airport-terminal-card">
            <h5 className="panel-box-title">
              <MapPin size={16} className="text-flight-blue" />
              <span>Airport Departure & Arrival Points</span>
            </h5>

            {/* Departure Gate */}
            <div className="terminal-field-group">
              <label className="terminal-field-label">Departure Gate & Terminal:</label>
              <div className="terminal-options-list">
                {flight.boardingPoints?.map(bp => (
                  <label 
                    key={bp.id} 
                    className={`terminal-radio-option ${(boardingPoint?.id === bp.id) ? 'selected' : ''}`}
                  >
                    <input 
                      type="radio" 
                      name="flight-boarding-point"
                      checked={boardingPoint?.id === bp.id}
                      onChange={() => setBoardingPoint(bp)}
                    />
                    <div className="terminal-opt-text">
                      <strong className="terminal-gate-name">{bp.name}</strong>
                      <span className="terminal-landmark">{bp.landmark}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Arrival Carousel */}
            <div className="terminal-field-group">
              <label className="terminal-field-label">Arrival Baggage & Exit Hub:</label>
              <div className="terminal-options-list">
                {flight.droppingPoints?.map(dp => (
                  <label 
                    key={dp.id} 
                    className={`terminal-radio-option ${(droppingPoint?.id === dp.id) ? 'selected' : ''}`}
                  >
                    <input 
                      type="radio" 
                      name="flight-dropping-point"
                      checked={droppingPoint?.id === dp.id}
                      onChange={() => setDroppingPoint(dp)}
                    />
                    <div className="terminal-opt-text">
                      <strong className="terminal-gate-name">{dp.name}</strong>
                      <span className="terminal-landmark">{dp.landmark}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Selected Flight Seats Summary */}
          <div className="flight-summary-card">
            <h5 className="panel-box-title">
              <Plane size={16} className="text-flight-blue" />
              <span>Selected Flight Seats ({selectedSeats.length})</span>
            </h5>

            {selectedSeats.length === 0 ? (
              <div className="no-seats-selected-box">
                <p className="no-seats-hint">Please choose your seats on the aircraft layout to continue.</p>
                <span className="window-aisle-tip">💡 Tip: Row A & F are Window seats; C & D are Aisle seats.</span>
              </div>
            ) : (
              <div className="selected-flight-seats-list">
                {selectedSeats.map(seat => (
                  <div key={seat.id} className="selected-flight-seat-pill">
                    <div className="seat-badge-code">
                      <strong>Seat {seat.number}</strong>
                      <span className="seat-type-tag">
                        {seat.cabin === 'business' ? '👑 Business' : (seat.type === 'window' ? '🪟 Window' : (seat.type === 'aisle' ? '🚶 Aisle' : 'Middle'))}
                      </span>
                    </div>
                    <span className="seat-fare-tag">{formatPrice(seat.price)}</span>
                  </div>
                ))}

                {/* Subtotal Calculation */}
                <div className="flight-fare-breakdown">
                  <div className="fare-row">
                    <span>Base Flight Fare:</span>
                    <span>{formatPrice(totalSeatsPrice)}</span>
                  </div>
                  <div className="fare-row">
                    <span>Aviation Fuel & Airport Taxes:</span>
                    <span className="text-free">Included (₹0)</span>
                  </div>
                  <div className="fare-row total-row">
                    <strong>Total Amount:</strong>
                    <strong className="total-fare-value">{formatPrice(totalSeatsPrice)}</strong>
                  </div>
                </div>

                <button 
                  type="button"
                  className="btn-proceed-flight-booking"
                  onClick={() => onProceedToBooking(flight)}
                >
                  <span>Continue to Passenger Verification</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
