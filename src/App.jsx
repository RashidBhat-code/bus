import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSearch from './components/HeroSearch';
import FilterSidebar from './components/FilterSidebar';
import BusCard from './components/BusCard';
import BookingModal from './components/BookingModal';
import TicketModal from './components/TicketModal';
import MyBookings from './components/MyBookings';
import LiveTracker from './components/LiveTracker';
import OperatorAdmin from './components/OperatorAdmin';
import CamplySections from './components/CamplySections';
import { 
  BUS_OPERATORS, 
  POPULAR_CITIES, 
  INITIAL_BOOKINGS, 
  getBusesForRoute 
} from './data/mockBuses';
import { 
  subscribeToBuses, 
  subscribeToBookings, 
  saveBusToFirestore, 
  saveBookingToFirestore, 
  cancelBookingInFirestore, 
  resetAndSeedDatabase, 
  testFirestoreConnection 
} from './services/firebaseDb';
import './App.css';

const LOCAL_STORAGE_KEY = 'omnibus_india_bookings_v2';
const THEME_KEY = 'rashtrips_theme_v1';

export default function App() {
  // Navigation tab: 'search' | 'bookings' | 'tracker' | 'admin'
  const [activeTab, setActiveTab] = useState('search');

  // Enforce pure clean white RashTrips theme
  const [theme, setTheme] = useState('light');
  const [currency, setCurrency] = useState('INR');

  // Search parameters for India
  const [searchParams, setSearchParams] = useState({
    from: 'Bengaluru',
    to: 'Hyderabad',
    date: new Date().toISOString().split('T')[0],
    busClass: 'ALL'
  });

  // Active travel mode: 'flights' | 'buses' | 'trains'
  const [activeMode, setActiveMode] = useState('buses');

  // Master bus catalog
  const [allBuses, setAllBuses] = useState(BUS_OPERATORS);
  const [displayedBuses, setDisplayedBuses] = useState(BUS_OPERATORS);

  // Filters state (INR defaults)
  const initialFilters = {
    timeSlots: [],
    busTypes: [],
    maxPrice: 2000,
    minRating: 0,
    onlyLiveTracking: false
  };
  const [filters, setFilters] = useState(initialFilters);

  // Seat selection state
  const [expandedBusId, setExpandedBusId] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [boardingPoint, setBoardingPoint] = useState(null);
  const [droppingPoint, setDroppingPoint] = useState(null);

  // Modals state
  const [bookingBus, setBookingBus] = useState(null);
  const [ticketToView, setTicketToView] = useState(null);
  const [activeTrackerBooking, setActiveTrackerBooking] = useState(null);

  // Persisted Bookings list
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  // Firebase Firestore Database Status
  const [dbStatus, setDbStatus] = useState({
    connected: false,
    mode: 'connecting',
    error: null,
    lastSync: null
  });

  // Sync bookings to localStorage backup
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bookings));
    } catch (e) {
      console.error("Failed to save bookings to localStorage", e);
    }
  }, [bookings]);

  // Connect and sync with Firebase Firestore Realtime Database
  useEffect(() => {
    // 1. Connectivity test
    testFirestoreConnection().then(res => {
      if (res.success) {
        setDbStatus(prev => ({ 
          ...prev, 
          connected: true, 
          mode: 'connected', 
          error: null, 
          lastSync: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        }));
      } else {
        setDbStatus(prev => ({ ...prev, connected: false, mode: 'fallback', error: res.message }));
      }
    });

    // 2. Realtime subscription for Buses
    const unsubBuses = subscribeToBuses(
      (busesList) => {
        if (busesList && busesList.length > 0) {
          setAllBuses(busesList);
          setDbStatus(prev => ({ 
            ...prev, 
            connected: true, 
            mode: 'connected', 
            lastSync: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
          }));
        }
      },
      (err) => {
        console.warn('Realtime buses subscription notice:', err.message);
        setDbStatus(prev => ({ ...prev, mode: 'fallback', error: err.message }));
      }
    );

    // 3. Realtime subscription for Bookings
    const unsubBookings = subscribeToBookings(
      (bookingsList) => {
        if (bookingsList && bookingsList.length > 0) {
          setBookings(bookingsList);
          setDbStatus(prev => ({ 
            ...prev, 
            connected: true, 
            mode: 'connected', 
            lastSync: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
          }));
        }
      },
      (err) => {
        console.warn('Realtime bookings subscription notice:', err.message);
        setDbStatus(prev => ({ ...prev, mode: 'fallback', error: err.message }));
      }
    );

    return () => {
      unsubBuses();
      unsubBookings();
    };
  }, []);

  // Sync theme
  // Enforce pure clean light mode
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem(THEME_KEY, 'light');
    try {
      localStorage.removeItem('omnibus_theme_v2');
      localStorage.removeItem('omnibus_theme');
    } catch {}
  }, []);

  const toggleTheme = () => {};

  // Indian Rupee & Multi-Currency Formatter
  const formatPrice = (amountInInr) => {
    const num = Math.round(Number(amountInInr));
    switch (currency) {
      case 'USD':
        return `$${(num / 83.5).toFixed(2)}`;
      case 'EUR':
        return `€${((num / 83.5) * 0.92).toFixed(2)}`;
      case 'GBP':
        return `£${((num / 83.5) * 0.79).toFixed(2)}`;
      default:
        return `₹${num.toLocaleString('en-IN')}`;
    }
  };

  // Perform search
  const handleSearch = () => {
    const routes = getBusesForRoute(searchParams.from, searchParams.to);
    setAllBuses(routes);
    setExpandedBusId(null);
    setSelectedSeats([]);
  };

  // Filter application
  useEffect(() => {
    let result = [...allBuses];

    if (searchParams.busClass === 'SLEEPER') {
      result = result.filter(b => b.category === 'sleeper' || b.type.toLowerCase().includes('sleeper'));
    } else if (searchParams.busClass === 'WASHROOM') {
      result = result.filter(b => b.hasWashroom);
    } else if (searchParams.busClass === 'GOVT_RTC') {
      result = result.filter(b => b.isGovtRTC);
    } else if (searchParams.busClass === 'EV') {
      result = result.filter(b => b.category === 'electric' || b.type.toLowerCase().includes('ev') || b.type.toLowerCase().includes('electric'));
    } else if (searchParams.busClass === 'SEATER') {
      result = result.filter(b => b.category === 'seater' || b.type.toLowerCase().includes('seater'));
    } else if (searchParams.busClass === 'BUDGET') {
      result = result.filter(b => b.category === 'budget' || b.type.toLowerCase().includes('budget') || b.type.toLowerCase().includes('non-ac'));
    }

    if (filters.timeSlots.length > 0) {
      result = result.filter(bus => {
        const timeStr = bus.departureTime;
        const [timePart, meridiem] = timeStr.split(' ');
        let [hours] = timePart.split(':').map(Number);
        if (meridiem === 'PM' && hours < 12) hours += 12;
        if (meridiem === 'AM' && hours === 12) hours = 0;

        return filters.timeSlots.some(slot => {
          if (slot === 'early') return hours < 6;
          if (slot === 'morning') return hours >= 6 && hours < 12;
          if (slot === 'afternoon') return hours >= 12 && hours < 18;
          if (slot === 'night') return hours >= 18;
          return true;
        });
      });
    }

    if (filters.busTypes.length > 0) {
      result = result.filter(bus => {
        const t = bus.type.toLowerCase();
        return filters.busTypes.some(ft => {
          if (ft === 'washroom') return bus.hasWashroom;
          if (ft === 'govt') return bus.isGovtRTC;
          if (ft === 'sleeper') return bus.category === 'sleeper' || t.includes('sleeper');
          if (ft === 'seater') return bus.category === 'seater' || t.includes('seater') || t.includes('semi-sleeper');
          if (ft === 'electric') return bus.category === 'electric' || t.includes('electric') || t.includes('ev');
          if (ft === 'budget') return bus.category === 'budget' || t.includes('budget') || t.includes('non-ac');
          return true;
        });
      });
    }

    result = result.filter(b => b.price <= filters.maxPrice);

    if (filters.minRating > 0) {
      result = result.filter(b => b.rating >= filters.minRating);
    }

    if (filters.onlyLiveTracking) {
      result = result.filter(b => b.liveTracking);
    }

    setDisplayedBuses(result);
  }, [allBuses, filters, searchParams.busClass]);

  const handleToggleSeat = (seat) => {
    setSelectedSeats(prev => {
      const exists = prev.some(s => s.id === seat.id);
      if (exists) return prev.filter(s => s.id !== seat.id);
      return [...prev, seat];
    });
  };

  const handleToggleExpand = (bus) => {
    if (expandedBusId === bus.id) {
      setExpandedBusId(null);
      setSelectedSeats([]);
      setBoardingPoint(null);
      setDroppingPoint(null);
    } else {
      setExpandedBusId(bus.id);
      setSelectedSeats([]);
      setBoardingPoint(bus.boardingPoints[0] || null);
      setDroppingPoint(bus.droppingPoints[0] || null);
    }
  };

  const handleProceedToBooking = (bus) => {
    setBookingBus(bus);
  };

  const handleBookingSuccess = async (newBooking) => {
    // Instant optimistic UI update
    setBookings(prev => [newBooking, ...prev]);
    setBookingBus(null);
    setExpandedBusId(null);
    setSelectedSeats([]);
    setTicketToView(newBooking);

    // Save to Firebase Firestore Cloud DB
    try {
      await saveBookingToFirestore(newBooking);
    } catch (err) {
      console.warn("Saved locally, Firestore notice:", err.message);
    }
  };

  const handleCancelBooking = async (pnr) => {
    // Instant optimistic UI update
    setBookings(prev => prev.map(b => {
      if (b.pnr === pnr) {
        return { ...b, status: 'CANCELLED' };
      }
      return b;
    }));

    // Update in Firebase Firestore Cloud DB
    try {
      await cancelBookingInFirestore(pnr);
    } catch (err) {
      console.warn("Cancelled locally, Firestore notice:", err.message);
    }
  };

  const handleAddBus = async (bus) => {
    // Instant optimistic UI update
    setAllBuses(prev => [bus, ...prev]);

    // Save to Firebase Firestore Cloud DB
    try {
      await saveBusToFirestore(bus);
    } catch (err) {
      console.warn("Added locally, Firestore notice:", err.message);
    }
  };

  // Manual seed or refresh of Firestore
  const handleSeedCloudDatabase = async () => {
    try {
      setDbStatus(prev => ({ ...prev, mode: 'syncing' }));
      await resetAndSeedDatabase();
      setDbStatus(prev => ({ 
        ...prev, 
        connected: true, 
        mode: 'connected', 
        error: null,
        lastSync: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }));
      return { success: true };
    } catch (err) {
      console.error('Failed to seed cloud database:', err);
      setDbStatus(prev => ({ ...prev, mode: 'fallback', error: err.message }));
      return { success: false, error: err.message };
    }
  };

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        bookingsCount={bookings.filter(b => b.status === 'CONFIRMED').length}
        theme={theme}
        toggleTheme={toggleTheme}
        currency={currency}
        setCurrency={setCurrency}
        dbStatus={dbStatus}
        activeMode={activeMode}
        setActiveMode={setActiveMode}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {activeTab === 'search' && (
          <div className="search-tab-view">
            {/* RashTrips Hero & Search Widget */}
            <HeroSearch 
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              onSearch={handleSearch}
              activeMode={activeMode}
              setActiveMode={setActiveMode}
            />

            {/* Results & Filters Grid */}
            <section className="results-section">
              <div className="results-container-grid">
                
                {/* Left Sidebar Filter */}
                <FilterSidebar 
                  filters={filters}
                  setFilters={setFilters}
                  resetFilters={() => setFilters(initialFilters)}
                  formatPrice={formatPrice}
                  totalResultsCount={displayedBuses.length}
                />

                {/* Right Results Stream */}
                <div className="bus-results-stream">
                  <div className="results-header-banner glass-panel">
                    <div className="results-title-block">
                      <h2>Available Express Buses: {searchParams.from} ➔ {searchParams.to}</h2>
                      <span className="results-date-tag">Date: {searchParams.date}</span>
                    </div>

                    <div className="sort-hint-tag">
                      <span>🇮🇳 IRCTC & State Transport Linked</span>
                    </div>
                  </div>

                  {displayedBuses.length === 0 ? (
                    <div className="no-buses-found glass-panel">
                      <div className="no-buses-icon">🚌</div>
                      <h3>No buses matched your criteria</h3>
                      <p>Try resetting the price filter, adjusting departure time, or choosing another city pair.</p>
                      <button className="btn-secondary" onClick={() => setFilters(initialFilters)}>
                        Reset Filters
                      </button>
                    </div>
                  ) : (
                    <div className="buses-cards-list">
                      {displayedBuses.map((bus) => (
                        <BusCard 
                          key={bus.id}
                          bus={bus}
                          isSelected={expandedBusId === bus.id}
                          onToggleExpand={() => handleToggleExpand(bus)}
                          selectedSeats={expandedBusId === bus.id ? selectedSeats : []}
                          onToggleSeat={handleToggleSeat}
                          onProceedToBooking={() => handleProceedToBooking(bus)}
                          boardingPoint={boardingPoint}
                          setBoardingPoint={setBoardingPoint}
                          droppingPoint={droppingPoint}
                          setDroppingPoint={setDroppingPoint}
                          formatPrice={formatPrice}
                        />
                      ))}
                    </div>
                  )}

                </div>

              </div>
            </section>

            {/* Camply-Style Community, Testimonials, and FAQ Sections */}
            <CamplySections 
              onExploreClick={() => {
                const el = document.getElementById('route-search-anchor');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* My Bookings Tab */}
        {activeTab === 'bookings' && (
          <MyBookings 
            bookings={bookings}
            onViewTicket={(b) => setTicketToView(b)}
            onTrackBus={(b) => { setActiveTrackerBooking(b); setActiveTab('tracker'); }}
            onCancelBooking={handleCancelBooking}
            onBookNewTrip={() => setActiveTab('search')}
            formatPrice={formatPrice}
          />
        )}

        {/* Live Highway Radar Tab */}
        {activeTab === 'tracker' && (
          <LiveTracker activeBooking={activeTrackerBooking} />
        )}

        {/* Fleet Operator / Admin Portal Tab */}
        {activeTab === 'admin' && (
          <OperatorAdmin 
            buses={allBuses}
            onAddBus={handleAddBus}
            bookings={bookings}
            formatPrice={formatPrice}
            dbStatus={dbStatus}
            onSeedDatabase={handleSeedCloudDatabase}
          />
        )}
      </main>

      {/* Booking Checkout Modal */}
      {bookingBus && (
        <BookingModal 
          bus={bookingBus}
          selectedSeats={selectedSeats}
          boardingPoint={boardingPoint}
          droppingPoint={droppingPoint}
          searchDate={searchParams.date}
          onClose={() => setBookingBus(null)}
          onBookingSuccess={handleBookingSuccess}
          formatPrice={formatPrice}
          currency={currency}
        />
      )}

      {/* Confirmed E-Ticket Modal */}
      {ticketToView && (
        <TicketModal 
          booking={ticketToView}
          onClose={() => setTicketToView(null)}
          onTrackBus={(b) => { setActiveTrackerBooking(b); setActiveTab('tracker'); }}
          formatPrice={formatPrice}
        />
      )}


      {/* Signature RashTrips Travel Footer */}
      <footer className="rashtrips-footer no-print">
        <div className="rashtrips-footer-inner">
          
          {/* Left Brand Column */}
          <div className="footer-col-brand">
            <div className="footer-logo-wrap">
              <span className="footer-logo-text">Rash<strong>Trips</strong></span>
            </div>
            <p className="footer-brand-tagline">
              Travel smarter. Explore more. All in one place. India's premier multi-modal travel platform connecting Flights, Intercity Express Buses & Trains.
            </p>
          </div>

          {/* Links Columns */}
          <div className="footer-col-links">
            <h4 className="footer-col-heading">Company</h4>
            <ul className="footer-link-list">
              <li><button onClick={() => setActiveTab('search')}>About Us</button></li>
              <li><button onClick={() => setActiveTab('search')}>Flights</button></li>
              <li><button onClick={() => setActiveTab('search')}>Express Buses</button></li>
              <li><button onClick={() => setActiveTab('search')}>Trains</button></li>
            </ul>
          </div>

          <div className="footer-col-links">
            <h4 className="footer-col-heading">Travel Network</h4>
            <ul className="footer-link-list">
              <li><button onClick={() => setActiveTab('search')}>Volvo 9600s Sleepers</button></li>
              <li><button onClick={() => setActiveTab('search')}>Govt RTC Partners</button></li>
              <li><button onClick={() => setActiveTab('tracker')}>Live Highway Radar</button></li>
              <li><button onClick={() => setActiveTab('admin')}>Operator Dispatcher</button></li>
            </ul>
          </div>

          <div className="footer-col-links">
            <h4 className="footer-col-heading">Support</h4>
            <ul className="footer-link-list">
              <li><button onClick={() => setActiveTab('bookings')}>My Bookings</button></li>
              <li><button onClick={() => setActiveTab('bookings')}>E-Ticket Download</button></li>
              <li><button onClick={() => setActiveTab('bookings')}>Instant UPI Cancellation</button></li>
              <li><button onClick={() => setActiveTab('search')}>24/7 Helpline</button></li>
            </ul>
          </div>

          {/* Contact Info Column */}
          <div className="footer-col-contact">
            <h4 className="footer-col-heading">Passenger Helpline</h4>
            <p className="footer-contact-phone">1800-102-RASH (Toll-Free)</p>
            <p className="footer-contact-email">support@rashtrips.com</p>
            <div className="footer-social-icons">
              <span className="social-pill-icon" title="Instagram">📸</span>
              <span className="social-pill-icon" title="Twitter">🐦</span>
              <span className="social-pill-icon" title="Facebook">📘</span>
              <span className="social-pill-icon" title="YouTube">▶️</span>
            </div>
          </div>

        </div>

        <div className="footer-bottom-bar">
          <p className="copyright-text">Copyright © 2026 RashTrips Travel Mobility India Pvt Ltd. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
