import React, { useState } from 'react';
import { 
  Ticket, 
  Calendar, 
  MapPin, 
  Clock, 
  Bus, 
  Navigation, 
  Eye, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle,
  ArrowRight
} from 'lucide-react';

export default function MyBookings({ 
  bookings, 
  onViewTicket, 
  onTrackBus, 
  onCancelBooking,
  onBookNewTrip,
  formatPrice 
}) {
  const [activeFilter, setActiveFilter] = useState('ALL'); // 'ALL' | 'ACTIVE' | 'CANCELLED'
  const [cancellingPnr, setCancellingPnr] = useState(null);

  const filteredBookings = bookings.filter(b => {
    if (activeFilter === 'ACTIVE') return b.status === 'CONFIRMED';
    if (activeFilter === 'CANCELLED') return b.status === 'CANCELLED';
    return true;
  });

  const handleConfirmCancel = (pnr) => {
    onCancelBooking(pnr);
    setCancellingPnr(null);
  };

  return (
    <div className="my-bookings-container">
      <div className="bookings-header-row">
        <div>
          <h2 className="page-heading">My Trips & Reservations</h2>
          <p className="page-subheading">
            Manage your booked coach tickets, print passes, track live bus status, or request instant refunds.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="bookings-filter-tabs">
          <button 
            className={`filter-tab ${activeFilter === 'ALL' ? 'active' : ''}`}
            onClick={() => setActiveFilter('ALL')}
          >
            All Bookings ({bookings.length})
          </button>
          <button 
            className={`filter-tab ${activeFilter === 'ACTIVE' ? 'active' : ''}`}
            onClick={() => setActiveFilter('ACTIVE')}
          >
            Confirmed ({bookings.filter(b => b.status === 'CONFIRMED').length})
          </button>
          <button 
            className={`filter-tab ${activeFilter === 'CANCELLED' ? 'active' : ''}`}
            onClick={() => setActiveFilter('CANCELLED')}
          >
            Cancelled ({bookings.filter(b => b.status === 'CANCELLED').length})
          </button>
        </div>
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="empty-bookings-card glass-panel">
          <div className="empty-icon-wrap">
            <Ticket size={48} className="text-muted" />
          </div>
          <h3>No bookings found</h3>
          <p>
            {activeFilter === 'ALL' 
              ? "You haven't reserved any bus tickets yet. Search routes and book your first journey!" 
              : `No ${activeFilter.toLowerCase()} tickets found in your history.`}
          </p>
          <button className="btn-primary" onClick={onBookNewTrip}>
            <span>Search & Book Buses</span>
            <ArrowRight size={16} />
          </button>
        </div>
      ) : (
        <div className="bookings-cards-grid">
          {filteredBookings.map((booking) => {
            const isCancelled = booking.status === 'CANCELLED';
            const isConfirmed = booking.status === 'CONFIRMED';

            return (
              <div key={booking.pnr} className={`booking-item-card glass-panel ${isCancelled ? 'cancelled-card' : ''}`}>
                
                {/* Header Strip */}
                <div className="booking-card-top">
                  <div className="booking-pnr-info">
                    <span className="pnr-title">PNR NUMBER</span>
                    <strong className="pnr-value">{booking.pnr}</strong>
                  </div>

                  <div className="booking-status-tag">
                    {isConfirmed && (
                      <span className="badge badge-success">
                        <CheckCircle2 size={13} /> Confirmed
                      </span>
                    )}
                    {isCancelled && (
                      <span className="badge badge-warning">
                        <XCircle size={13} /> Cancelled (Refunded)
                      </span>
                    )}
                  </div>
                </div>

                {/* Route Banner */}
                <div className="booking-route-strip">
                  <div className="route-point">
                    <span className="time">{booking.departureTime}</span>
                    <strong className="city">{booking.from}</strong>
                  </div>

                  <div className="route-arrow">
                    <div className="route-date">
                      <Calendar size={13} /> {booking.date}
                    </div>
                    <div className="route-line-visual">
                      <span className="dot"></span>
                      <span className="line"></span>
                      <Bus size={14} className="bus-ic" />
                      <span className="line"></span>
                      <span className="dot"></span>
                    </div>
                  </div>

                  <div className="route-point text-right">
                    <span className="time">{booking.arrivalTime}</span>
                    <strong className="city">{booking.to}</strong>
                  </div>
                </div>

                {/* Meta details */}
                <div className="booking-meta-row">
                  <div>
                    <span className="meta-label">Bus Operator</span>
                    <strong className="meta-value">{booking.busName}</strong>
                  </div>
                  <div>
                    <span className="meta-label">Seats Reserved</span>
                    <strong className="meta-value text-accent">
                      {booking.seats.map(s => s.seatNumber).join(', ')}
                    </strong>
                  </div>
                  <div>
                    <span className="meta-label">Total Amount</span>
                    <strong className="meta-value">{formatPrice(booking.totalAmount)}</strong>
                  </div>
                </div>

                {/* Actions */}
                <div className="booking-card-actions">
                  <button 
                    className="btn-secondary" 
                    onClick={() => onViewTicket(booking)}
                    title="View & Print E-Ticket"
                  >
                    <Eye size={15} />
                    <span>View Ticket</span>
                  </button>

                  {isConfirmed && (
                    <>
                      <button 
                        className="btn-outline" 
                        onClick={() => onTrackBus(booking)}
                        title="View Live GPS Status"
                      >
                        <Navigation size={15} />
                        <span>Live Track</span>
                      </button>

                      <button 
                        className="btn-cancel" 
                        onClick={() => setCancellingPnr(booking.pnr)}
                        title="Cancel this reservation"
                      >
                        Cancel Ticket
                      </button>
                    </>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {cancellingPnr && (
        <div className="modal-overlay" onClick={() => setCancellingPnr(null)}>
          <div className="modal-card cancel-confirm-modal glass-panel" onClick={(e) => e.stopPropagation()}>
            <div className="cancel-icon-warning">
              <AlertTriangle size={36} className="text-warning" />
            </div>
            <h3>Cancel Bus Reservation?</h3>
            <p>
              Are you sure you want to cancel booking <strong>{cancellingPnr}</strong>? 
              An instant 95% refund will be credited back to your original payment method within 2-4 hours.
            </p>
            <div className="cancel-modal-actions">
              <button className="btn-secondary" onClick={() => setCancellingPnr(null)}>
                Keep Reservation
              </button>
              <button className="btn-danger-action" onClick={() => handleConfirmCancel(cancellingPnr)}>
                Yes, Cancel & Refund
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
