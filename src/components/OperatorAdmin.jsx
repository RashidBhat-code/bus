import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  PlusCircle, 
  IndianRupee, 
  Users, 
  Bus, 
  TrendingUp, 
  Check, 
  AlertCircle,
  Database,
  RefreshCw
} from 'lucide-react';
import { POPULAR_CITIES } from '../data/mockBuses';

export default function OperatorAdmin({ 
  buses, 
  onAddBus, 
  bookings, 
  formatPrice,
  dbStatus,
  onSeedDatabase
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedMsg, setSeedMsg] = useState(null);

  const handleSeed = async () => {
    if (!onSeedDatabase) return;
    setIsSeeding(true);
    setSeedMsg(null);
    try {
      const res = await onSeedDatabase();
      if (res?.success) {
        setSeedMsg({ type: 'success', text: '✅ Firebase Firestore synchronized with all Indian express routes and bookings!' });
      } else {
        setSeedMsg({ type: 'error', text: `⚠️ Cloud Sync note: ${res?.error || 'Make sure Firestore is enabled in Firebase console'}` });
      }
    } catch (err) {
      setSeedMsg({ type: 'error', text: `⚠️ Sync error: ${err.message}` });
    } finally {
      setIsSeeding(false);
      setTimeout(() => setSeedMsg(null), 6000);
    }
  };

  // New bus form state for India
  const [newBus, setNewBus] = useState({
    name: '',
    operator: 'RashTrips Express Superfast',
    type: 'Volvo B11R AC Sleeper (2+1)',
    from: 'Bengaluru',
    to: 'Hyderabad',
    departureTime: '10:00 PM',
    arrivalTime: '06:30 AM',
    duration: '8h 30m',
    price: 1150,
    availableSeatsCount: 20,
    badge: 'Newly Scheduled',
    rating: 4.8,
    reviewsCount: 1,
    liveTracking: true
  });

  const [formSuccess, setFormSuccess] = useState(false);

  // Calculate fleet stats
  const totalBookingsCount = bookings.length;
  const totalRevenue = bookings
    .filter(b => b.status === 'CONFIRMED')
    .reduce((sum, b) => sum + (b.totalAmount || 0), 0);
  
  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newBus.name.trim()) return;

    // Create lower deck seats template
    const lowerDeck = Array.from({ length: 14 }, (_, i) => ({
      id: `L${i + 1}`,
      number: `L${i + 1}`,
      type: newBus.type.includes('Sleeper') ? 'sleeper' : 'seater',
      deck: 'lower',
      price: newBus.price,
      status: 'available',
      isFemaleOnly: i === 2 || i === 3
    }));

    const busToAdd = {
      ...newBus,
      id: `bus-admin-${Date.now()}`,
      originalPrice: Math.round(newBus.price * 1.3),
      amenities: [
        '5G Wi-Fi', 
        'Charging Ports', 
        'Sanitized Blanket', 
        'Air Conditioning', 
        'GPS Live Telemetry'
      ],
      boardingPoints: [
        { id: 'bp-1', name: `${newBus.from} Central Intercity Terminal`, time: newBus.departureTime, landmark: 'Terminal Concourse Bay 1' }
      ],
      droppingPoints: [
        { id: 'dp-1', name: `${newBus.to} Bypass Transit Hub`, time: newBus.arrivalTime, landmark: 'Platform A' }
      ],
      lowerDeck,
      upperDeck: []
    };

    onAddBus(busToAdd);
    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      setShowAddForm(false);
      setNewBus({
        name: '',
        operator: 'RashTrips Express Superfast',
        type: 'Volvo B11R AC Sleeper (2+1)',
        from: 'Bengaluru',
        to: 'Hyderabad',
        departureTime: '10:00 PM',
        arrivalTime: '06:30 AM',
        duration: '8h 30m',
        price: 1150,
        availableSeatsCount: 20,
        badge: 'Newly Scheduled',
        rating: 4.8,
        reviewsCount: 1,
        liveTracking: true
      });
    }, 1200);
  };

  return (
    <div className="admin-portal-container">
      <div className="admin-header-row">
        <div>
          <h2 className="page-heading">India Fleet Portal & Route Dispatcher</h2>
          <p className="page-subheading">
            Deploy interstate routes, monitor real-time UPI ticket sales, and track national fleet occupancy.
          </p>
        </div>

        <button 
          className="btn-primary"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <PlusCircle size={18} />
          <span>{showAddForm ? 'Close Add Form' : 'Deploy New Route'}</span>
        </button>
      </div>
 
      {/* Firebase Cloud Firestore Control Banner */}
      <div className="firebase-admin-card glass-panel">
        <div className="firebase-admin-left">
          <div className="firebase-icon-badge">
            <Database size={24} className="text-accent" />
          </div>
          <div className="firebase-meta-wrap">
            <div className="firebase-title-row">
              <h4>Firebase Cloud Database</h4>
              <span className={`db-status-pill ${dbStatus?.mode || 'connected'}`}>
                <span className="db-indicator-dot"></span>
                {dbStatus?.mode === 'connected' ? 'Cloud Connected & Live' : dbStatus?.mode === 'syncing' ? 'Syncing...' : 'Local Cache Mode'}
              </span>
            </div>
            <p className="firebase-meta-text">
              Project: <code>bus-ticketing-7e4d1</code> • Active Buses: <strong>{buses.length}</strong> • Bookings: <strong>{bookings.length}</strong>
              {dbStatus?.lastSync && <span> • Last Sync: {dbStatus.lastSync}</span>}
            </p>
          </div>
        </div>

        <div className="firebase-admin-actions">
          <button 
            type="button"
            className="btn-seed-db"
            onClick={handleSeed}
            disabled={isSeeding}
            title="Push initial bus routes and sample bookings to Firebase Firestore"
          >
            <RefreshCw size={15} className={isSeeding ? 'spin-icon' : ''} />
            <span>{isSeeding ? 'Syncing Firestore...' : 'Sync / Seed Cloud DB'}</span>
          </button>
        </div>
      </div>

      {seedMsg && (
        <div className={`seed-alert ${seedMsg.type} glass-panel`}>
          {seedMsg.text}
        </div>
      )}

      {/* Analytics KPI Row */}
      <div className="admin-kpi-grid">
        <div className="kpi-card glass-panel">
          <div className="kpi-icon-wrap bg-accent-glow">
            <span className="text-accent" style={{ fontSize: '1.4rem', fontWeight: 800 }}>₹</span>
          </div>
          <div>
            <span className="kpi-title">Gross Indian Ticket Revenue</span>
            <h3 className="kpi-value">{formatPrice(totalRevenue)}</h3>
            <span className="kpi-hint text-success">+24.6% festival rush surge</span>
          </div>
        </div>

        <div className="kpi-card glass-panel">
          <div className="kpi-icon-wrap bg-cyan-glow">
            <Users size={22} className="text-cyan" />
          </div>
          <div>
            <span className="kpi-title">Confirmed Yatris</span>
            <h3 className="kpi-value">{totalBookingsCount} Passengers</h3>
            <span className="kpi-hint text-cyan">Live synced</span>
          </div>
        </div>

        <div className="kpi-card glass-panel">
          <div className="kpi-icon-wrap bg-amber-glow">
            <Bus size={22} className="text-warning" />
          </div>
          <div>
            <span className="kpi-title">Active Coaches in India</span>
            <h3 className="kpi-value">{buses.length} Coaches</h3>
            <span className="kpi-hint text-success">100% AIS-140 GPS Compliant</span>
          </div>
        </div>

        <div className="kpi-card glass-panel">
          <div className="kpi-icon-wrap bg-emerald-glow">
            <TrendingUp size={22} className="text-success" />
          </div>
          <div>
            <span className="kpi-title">Fleet Occupancy Rate</span>
            <h3 className="kpi-value">89.2%</h3>
            <span className="kpi-hint text-success">Interstate corridors full</span>
          </div>
        </div>
      </div>

      {/* Add New Bus Schedule Drawer */}
      {showAddForm && (
        <div className="add-bus-drawer glass-panel">
          <h3 className="drawer-title">Schedule New Interstate Route</h3>
          <p className="drawer-sub">
            Fill in the route details below to make this coach instantly bookable for passengers.
          </p>

          <form onSubmit={handleAddSubmit} className="admin-form">
            <div className="form-fields-grid">
              
              <div className="form-field-group">
                <label>Coach / Service Name *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Royal Deccan Volvo B11R"
                  value={newBus.name}
                  onChange={(e) => setNewBus(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              <div className="form-field-group">
                <label>Coach Model & Category</label>
                <select 
                  value={newBus.type}
                  onChange={(e) => setNewBus(prev => ({ ...prev, type: e.target.value }))}
                >
                  <option value="Volvo B11R AC Sleeper (2+1)">Volvo B11R AC Sleeper (2+1)</option>
                  <option value="BharatBenz Glider AC Sleeper">BharatBenz Glider AC Sleeper</option>
                  <option value="Scania Multi-Axle Semi-Sleeper">Scania Multi-Axle Semi-Sleeper</option>
                  <option value="Zero Emission EV Intercity Express">Zero Emission EV Intercity Express</option>
                </select>
              </div>

              <div className="form-field-group">
                <label>Departure City</label>
                <select 
                  value={newBus.from}
                  onChange={(e) => setNewBus(prev => ({ ...prev, from: e.target.value }))}
                >
                  {POPULAR_CITIES.map(c => (
                    <option key={`admin-from-${c}`} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="form-field-group">
                <label>Destination City</label>
                <select 
                  value={newBus.to}
                  onChange={(e) => setNewBus(prev => ({ ...prev, to: e.target.value }))}
                >
                  {POPULAR_CITIES.map(c => (
                    <option key={`admin-to-${c}`} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="form-field-group">
                <label>Departure Time</label>
                <input 
                  type="text" 
                  placeholder="e.g. 09:30 PM"
                  value={newBus.departureTime}
                  onChange={(e) => setNewBus(prev => ({ ...prev, departureTime: e.target.value }))}
                  required
                />
              </div>

              <div className="form-field-group">
                <label>Arrival Time</label>
                <input 
                  type="text" 
                  placeholder="e.g. 06:15 AM"
                  value={newBus.arrivalTime}
                  onChange={(e) => setNewBus(prev => ({ ...prev, arrivalTime: e.target.value }))}
                  required
                />
              </div>

              <div className="form-field-group">
                <label>Duration</label>
                <input 
                  type="text" 
                  placeholder="e.g. 8h 45m"
                  value={newBus.duration}
                  onChange={(e) => setNewBus(prev => ({ ...prev, duration: e.target.value }))}
                  required
                />
              </div>

              <div className="form-field-group">
                <label>Base Seat Fare (₹ INR)</label>
                <input 
                  type="number" 
                  min="300" 
                  max="5000" 
                  value={newBus.price}
                  onChange={(e) => setNewBus(prev => ({ ...prev, price: Number(e.target.value) }))}
                  required
                />
              </div>

            </div>

            <div className="form-submit-row">
              {formSuccess ? (
                <div className="success-inline">
                  <Check size={18} className="text-success" />
                  <span>Route added to active interstate network!</span>
                </div>
              ) : (
                <button type="submit" className="btn-primary">
                  <PlusCircle size={18} />
                  <span>Publish Schedule to Live Fleet</span>
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Fleet Inventory Table */}
      <div className="fleet-table-card glass-panel">
        <h3 className="table-heading">Active Interstate Coaches ({buses.length})</h3>
        
        <div className="table-responsive">
          <table className="fleet-table">
            <thead>
              <tr>
                <th>Coach Service</th>
                <th>Route Corridor</th>
                <th>Category</th>
                <th>Departure - Arrival</th>
                <th>Base Fare</th>
                <th>Seats Available</th>
                <th>AIS-140 GPS</th>
              </tr>
            </thead>
            <tbody>
              {buses.map((bus) => (
                <tr key={bus.id}>
                  <td>
                    <strong>{bus.name}</strong>
                    <span className="table-sub">{bus.operator}</span>
                  </td>
                  <td>
                    <span className="route-text">{bus.from} ➔ {bus.to}</span>
                  </td>
                  <td>
                    <span className="badge badge-primary">{bus.type.split(' ')[0]}</span>
                  </td>
                  <td>
                    <div className="table-time-cell">
                      <span>{bus.departureTime}</span>
                      <span className="time-sep">to</span>
                      <span>{bus.arrivalTime}</span>
                    </div>
                  </td>
                  <td>
                    <strong className="text-accent">{formatPrice(bus.price)}</strong>
                  </td>
                  <td>
                    <span className="badge badge-success">{bus.availableSeatsCount} Berths</span>
                  </td>
                  <td>
                    <span className="badge badge-success">
                      <span className="live-dot-inline"></span> NavIC Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
