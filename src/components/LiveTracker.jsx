import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  MapPin, 
  Bus, 
  Navigation, 
  Clock, 
  Phone, 
  ShieldCheck, 
  Gauge, 
  CloudSun, 
  AlertCircle,
  Play,
  RotateCcw
} from 'lucide-react';
import { BUS_OPERATORS } from '../data/mockBuses';

export default function LiveTracker({ activeBooking }) {
  const [selectedBusId, setSelectedBusId] = useState(
    activeBooking?.busId || BUS_OPERATORS[0].id
  );

  const [progressPercent, setProgressPercent] = useState(52);
  const [currentSpeed, setCurrentSpeed] = useState(78);
  const [isSimulating, setIsSimulating] = useState(true);

  const busInfo = BUS_OPERATORS.find(b => b.id === selectedBusId) || BUS_OPERATORS[0];

  // Dynamic simulation of bus moving and speed variations
  useEffect(() => {
    let interval;
    if (isSimulating) {
      interval = setInterval(() => {
        setProgressPercent(prev => {
          if (prev >= 95) return 20; // loop back
          return prev + 1;
        });

        setCurrentSpeed(Math.floor(74 + Math.random() * 8));
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isSimulating]);

  return (
    <div className="live-tracker-container">
      <div className="tracker-header-row">
        <div>
          <div className="live-status-pill">
            <span className="live-pulse-dot"></span>
            <span>INDIAN HIGHWAY GPS RADAR • NH-44 LIVE</span>
          </div>
          <h2 className="page-heading">Live Highway Coach Radar</h2>
          <p className="page-subheading">
            Live satellite telemetry. Monitor real-time speed, upcoming toll plazas, and precise arrival estimations.
          </p>
        </div>

        {/* Bus Selector */}
        <div className="tracker-bus-selector">
          <label>Select Active Coach:</label>
          <select 
            value={selectedBusId}
            onChange={(e) => setSelectedBusId(e.target.value)}
            className="search-select"
          >
            {BUS_OPERATORS.map(b => (
              <option key={b.id} value={b.id}>
                {b.name} ({b.from} ➔ {b.to})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tracker Main Grid */}
      <div className="tracker-grid">
        
        {/* Left Column: Visual Radar Map & Timeline */}
        <div className="tracker-radar-panel glass-panel">
          <div className="radar-top-status">
            <div className="status-metric">
              <span className="metric-lbl">CURRENT HIGHWAY</span>
              <strong className="metric-val">National Highway 44 (NH 44)</strong>
            </div>

            <div className="status-metric">
              <span className="metric-lbl">ESTIMATED ARRIVAL</span>
              <strong className="metric-val text-accent">{busInfo.arrivalTime} (On Time)</strong>
            </div>

            <div className="status-metric">
              <span className="metric-lbl">CRUISING SPEED</span>
              <strong className="metric-val text-cyan">{currentSpeed} km/h</strong>
            </div>
          </div>

          {/* Interactive Visual Route Map */}
          <div className="route-map-canvas">
            <div className="map-overlay-grid"></div>

            {/* Route path line */}
            <div className="map-highway-line">
              <div 
                className="map-highway-progress"
                style={{ width: `${progressPercent}%` }}
              ></div>

              {/* Waypoint 1: Origin */}
              <div className="map-waypoint origin" style={{ left: '0%' }}>
                <div className="waypoint-pin active">
                  <MapPin size={16} />
                </div>
                <div className="waypoint-tooltip">
                  <strong>{busInfo.from} (KBS)</strong>
                  <span>Departed {busInfo.departureTime}</span>
                </div>
              </div>

              {/* Waypoint 2: Intermediate Plaza */}
              <div className="map-waypoint intermediate" style={{ left: '35%' }}>
                <div className="waypoint-pin passed">
                  <span className="dot-inner"></span>
                </div>
                <div className="waypoint-tooltip">
                  <strong>Kurnool Toll Plaza</strong>
                  <span>Passed at 02:45 AM</span>
                </div>
              </div>

              {/* Moving Bus Marker */}
              <div 
                className="map-bus-beacon"
                style={{ left: `${progressPercent}%` }}
              >
                <div className="radar-waves"></div>
                <div className="beacon-bus-card">
                  <Bus size={18} className="bus-beacon-icon" />
                  <span className="beacon-label">{currentSpeed} km/h</span>
                </div>
              </div>

              {/* Waypoint 3: Next Stop */}
              <div className="map-waypoint intermediate" style={{ left: '75%' }}>
                <div className="waypoint-pin upcoming">
                  <span className="dot-inner"></span>
                </div>
                <div className="waypoint-tooltip">
                  <strong>Jadcherla Food Plaza</strong>
                  <span>ETA in 22 mins</span>
                </div>
              </div>

              {/* Waypoint 4: Destination */}
              <div className="map-waypoint destination" style={{ left: '100%' }}>
                <div className="waypoint-pin destination-pin">
                  <MapPin size={16} />
                </div>
                <div className="waypoint-tooltip right-aligned">
                  <strong>{busInfo.to} Concourse</strong>
                  <span>Target: {busInfo.arrivalTime}</span>
                </div>
              </div>
            </div>

            {/* Simulation controls */}
            <div className="radar-controls-strip">
              <div className="controls-status">
                <span className="telemetry-dot"></span>
                <span>IRNSS / NavIC Telemetry Active: 120ms latency</span>
              </div>
              <div className="controls-btns">
                <button 
                  className="btn-secondary" 
                  onClick={() => setIsSimulating(!isSimulating)}
                >
                  {isSimulating ? 'Pause Simulation' : 'Resume Simulation'}
                </button>
                <button 
                  className="btn-secondary" 
                  onClick={() => setProgressPercent(20)}
                >
                  <RotateCcw size={14} />
                  <span>Reset Position</span>
                </button>
              </div>
            </div>
          </div>

          {/* Timeline Milestones */}
          <div className="milestones-timeline">
            <h4 className="milestones-title">Route Milestones & Journey Activity</h4>
            <div className="milestones-list">
              <div className="milestone-entry completed">
                <div className="milestone-time">{busInfo.departureTime}</div>
                <div className="milestone-badge"></div>
                <div className="milestone-desc">
                  <strong>Departed from {busInfo.from} Central Terminal</strong>
                  <span>On-time boarding verified by conductor.</span>
                </div>
              </div>

              <div className="milestone-entry active">
                <div className="milestone-time">Live</div>
                <div className="milestone-badge pulsing"></div>
                <div className="milestone-desc">
                  <strong>Cruising on NH-44 Expressway</strong>
                  <span>Express corridor clear, steady speed at {currentSpeed} km/h.</span>
                </div>
              </div>

              <div className="milestone-entry pending">
                <div className="milestone-time">{busInfo.arrivalTime}</div>
                <div className="milestone-badge"></div>
                <div className="milestone-desc">
                  <strong>Scheduled Arrival at {busInfo.to} Hub</strong>
                  <span>Arrival at platform bay on schedule.</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Driver & Coach Profile */}
        <div className="tracker-sidebar-column">
          
          {/* Driver Card */}
          <div className="driver-card glass-panel">
            <div className="driver-top-info">
              <div className="driver-avatar">
                <span>👨‍✈️</span>
              </div>
              <div className="driver-names">
                <h4>Captain R. Murugesan</h4>
                <div className="driver-rating">
                  <span>⭐ 4.9 Rating</span>
                  <span className="dot">•</span>
                  <span>16 yrs highway experience</span>
                </div>
              </div>
            </div>

            <div className="driver-stats-grid">
              <div className="driver-stat">
                <span className="stat-lbl">Coach Reg</span>
                <strong>KA-01-F-7892</strong>
              </div>
              <div className="driver-stat">
                <span className="stat-lbl">Safety Rating</span>
                <strong className="text-success">99.8% Punctual</strong>
              </div>
            </div>

            <div className="driver-contact-actions">
              <a href="tel:+9118001026664" className="btn-secondary w-full">
                <Phone size={15} />
                <span>Call Coach Crew</span>
              </a>
            </div>
          </div>

          {/* Vehicle Telemetry Specs */}
          <div className="telemetry-specs-card glass-panel">
            <h4>Telemetry & Cabin Diagnostics</h4>
            
            <div className="specs-list">
              <div className="spec-row">
                <span className="spec-name">AC Climate Temperature</span>
                <span className="spec-val">22.0 °C (Auto Inverter AC)</span>
              </div>
              <div className="spec-row">
                <span className="spec-name">Tubeless Tire Pressure</span>
                <span className="spec-val text-success">Optimal (125 PSI)</span>
              </div>
              <div className="spec-row">
                <span className="spec-name">Speed Governor</span>
                <span className="spec-val">Engaged (Max 80 km/h)</span>
              </div>
              <div className="spec-row">
                <span className="spec-name">NavIC / GPS Satellites</span>
                <span className="spec-val">14 Locked</span>
              </div>
              <div className="spec-row">
                <span className="spec-name">SOS & CCTV Emergency Link</span>
                <span className="spec-val text-success">Direct to Control Room</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
