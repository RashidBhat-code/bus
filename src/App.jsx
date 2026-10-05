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
import HindiSongsSection from './components/HindiSongsSection';
import GlobalMusicBar from './components/GlobalMusicBar';
import { 
  BUS_OPERATORS, 
  POPULAR_CITIES, 
  INITIAL_BOOKINGS, 
  getBusesForRoute 
} from './data/mockBuses';
import { HINDI_90S_SONGS } from './data/hindiSongs90s';
import { 
  startSongPlayback, 
  stopSongPlayback, 
  setMasterVolume 
} from './utils/audioEngine';
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
const THEME_KEY = 'omnibus_theme_v2';

export default function App() {
  // Navigation tab: 'search' | 'bookings' | 'tracker' | 'admin'
  const [activeTab, setActiveTab] = useState('search');

  // Theme & Currency
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(THEME_KEY) || 'dark';
  });
  const [currency, setCurrency] = useState('INR');

  // Search parameters for India
  const [searchParams, setSearchParams] = useState({
    from: 'Bengaluru',
    to: 'Hyderabad',
    date: new Date().toISOString().split('T')[0],
    busClass: 'ALL'
  });

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

  // =========================================================================
  // PERSISTENT 90s HINDI SONGS MUSIC STATE (Does NOT stop during view changes)
  // =========================================================================
  const [currentSong, setCurrentSong] = useState(HINDI_90S_SONGS[0]);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioVolume, setAudioVolume] = useState(0.8);
  const [audioProgressSec, setAudioProgressSec] = useState(0);

  const handlePlaySong = (song) => {
    setCurrentSong(song);
    setIsAudioPlaying(true);
    setAudioProgressSec(0);
    startSongPlayback(song, (sec) => {
      setAudioProgressSec(Math.round(sec));
    });
  };

  const handlePauseSong = () => {
    setIsAudioPlaying(false);
    stopSongPlayback();
  };

  const handleTogglePlay = () => {
    if (isAudioPlaying) {
      handlePauseSong();
    } else {
      handlePlaySong(currentSong);
    }
  };

  const handleNextSong = () => {
    const currentIndex = HINDI_90S_SONGS.findIndex(s => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % HINDI_90S_SONGS.length;
    handlePlaySong(HINDI_90S_SONGS[nextIndex]);
  };

  const handlePrevSong = () => {
    const currentIndex = HINDI_90S_SONGS.findIndex(s => s.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + HINDI_90S_SONGS.length) % HINDI_90S_SONGS.length;
    handlePlaySong(HINDI_90S_SONGS[prevIndex]);
  };

  const handleVolumeChange = (vol) => {
    setAudioVolume(vol);
    setMasterVolume(vol);
  };

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      stopSongPlayback();
    };
  }, []);

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
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

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
      />

      {/* Main Content Area */}
      <main className="main-content">
        {activeTab === 'search' && (
          <div className="search-tab-view">
            {/* 3D Animated Hero & Search Bar */}
            <HeroSearch 
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              onSearch={handleSearch}
            />

            {/* 📻 Dedicated 90s Bollywood Hindi Songs Highway Radio Section */}
            <HindiSongsSection 
              currentSong={currentSong}
              isPlaying={isAudioPlaying}
              onPlaySong={handlePlaySong}
              onPauseSong={handlePauseSong}
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

      {/* 🎵 Global Persistent 90s Music Player Bar (Continuous across all views) */}
      <GlobalMusicBar 
        currentSong={currentSong}
        isPlaying={isAudioPlaying}
        onTogglePlay={handleTogglePlay}
        onNextSong={handleNextSong}
        onPrevSong={handlePrevSong}
        volume={audioVolume}
        onVolumeChange={handleVolumeChange}
        progressSec={audioProgressSec}
      />

      {/* Global App Footer */}
      <footer className="app-footer glass-panel no-print">
        <div className="footer-content">
          <div className="footer-left">
            <span className="footer-brand">Omni<strong>Bus</strong> India Express</span>
            <span className="footer-copy">© 2026 OmniBus Mobility India Pvt Ltd. Partnered with KSRTC, TSRTC, MSRTC & Top Fleets.</span>
          </div>
          <div className="footer-links">
            <button className="footer-link-btn" onClick={() => setActiveTab('search')}>Book Buses</button>
            <button className="footer-link-btn" onClick={() => setActiveTab('bookings')}>Manage Bookings</button>
            <button className="footer-link-btn" onClick={() => setActiveTab('tracker')}>Live GPS Radar</button>
            <button className="footer-link-btn" onClick={() => setActiveTab('admin')}>Operator Portal</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
