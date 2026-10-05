import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { 
  X, 
  Printer, 
  Download, 
  Share2, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  Clock, 
  Bus, 
  User, 
  ShieldCheck, 
  Navigation,
  FileCheck,
  BadgeCheck,
  Smartphone
} from 'lucide-react';

export default function TicketModal({ 
  booking, 
  onClose, 
  onTrackBus, 
  formatPrice 
}) {
  const [qrDataUrl, setQrDataUrl] = useState('');

  useEffect(() => {
    if (booking) {
      const qrPayload = JSON.stringify({
        pnr: booking.pnr,
        bus: booking.busName,
        seats: booking.seats.map(s => s.seatNumber),
        date: booking.date,
        time: booking.departureTime,
        status: booking.status,
        verified: true,
        govtIdVerified: true
      });

      QRCode.toDataURL(qrPayload, {
        width: 180,
        margin: 1,
        color: {
          dark: '#0f172a',
          light: '#ffffff'
        }
      })
      .then(url => setQrDataUrl(url))
      .catch(err => console.error("Error generating QR code:", err));
    }
  }, [booking]);

  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  // Mask ID Number for privacy (e.g. 123456789012 -> •••• •••• 9012)
  const formatMaskedId = (type, number) => {
    if (!number) return 'Govt ID Verified';
    const clean = number.trim();
    if (clean.length <= 4) return clean;
    return `•••• •••• ${clean.slice(-4)}`;
  };

  return (
    <div className="modal-overlay ticket-modal-overlay" onClick={onClose}>
      <div className="modal-card ticket-modal-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Actions Bar */}
        <div className="ticket-actions-bar no-print">
          <div className="ticket-modal-title">
            <CheckCircle2 size={20} className="text-success" />
            <span>Booking Confirmed & Verified Successfully!</span>
          </div>

          <div className="ticket-action-btns">
            <button className="btn-secondary" onClick={handlePrint} title="Print or Save PDF">
              <Printer size={16} />
              <span>Print Boarding Pass</span>
            </button>
            <button 
              className="btn-primary" 
              onClick={() => { onClose(); onTrackBus(booking); }}
              title="Track live GPS status"
            >
              <Navigation size={16} />
              <span>Track Live GPS</span>
            </button>
            <button className="modal-close" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Printable Ticket Container */}
        <div className="printable-ticket" id="printable-boarding-pass">
          
          {/* Ticket Header */}
          <div className="ticket-header-strip">
            <div className="brand-badge-row">
              <div className="ticket-logo-mark">
                <Bus size={22} className="ticket-icon" />
                <span className="ticket-brand-name">Omni<strong>Bus</strong> India</span>
                <span className="e-pass-badge">Official MoRTH E-Ticket</span>
              </div>
              <div className="pnr-block">
                <span className="pnr-label">PNR / BOOKING REF</span>
                <strong className="pnr-code">{booking.pnr}</strong>
              </div>
            </div>

            <div className="ticket-status-row">
              <span className="badge badge-success confirmed-tag">
                <ShieldCheck size={14} /> {booking.status}
              </span>
              <span className="badge badge-verified-id">
                <BadgeCheck size={14} className="text-success" /> Verified Customer & Govt ID
              </span>
              <span className="booking-timestamp">Booked: {booking.bookingDate}</span>
            </div>
          </div>

          {/* Journey Overview Bar */}
          <div className="ticket-journey-banner">
            <div className="journey-station">
              <span className="station-type">ORIGIN</span>
              <h2 className="station-city">{booking.from}</h2>
              <span className="station-time">{booking.departureTime}</span>
            </div>

            <div className="journey-direction">
              <span className="journey-date-badge">
                <Calendar size={13} /> {booking.date}
              </span>
              <div className="journey-line">
                <span className="j-dot"></span>
                <span className="j-bar"></span>
                <Bus size={18} className="j-bus" />
                <span className="j-bar"></span>
                <span className="j-dot"></span>
              </div>
              <span className="j-duration">Direct Express</span>
            </div>

            <div className="journey-station text-right">
              <span className="station-type">DESTINATION</span>
              <h2 className="station-city">{booking.to}</h2>
              <span className="station-time">{booking.arrivalTime}</span>
            </div>
          </div>

          {/* Bus & Boarding Details Grid */}
          <div className="ticket-details-grid">
            <div className="detail-item">
              <span className="detail-lbl">Operator & Coach</span>
              <strong className="detail-val">{booking.busName}</strong>
              <span className="detail-sub">{booking.type}</span>
            </div>

            <div className="detail-item">
              <span className="detail-lbl">Boarding Point</span>
              <strong className="detail-val">{booking.boardingPoint}</strong>
              <span className="detail-sub">Report 15 mins prior ({booking.boardingTime || booking.departureTime})</span>
            </div>

            <div className="detail-item">
              <span className="detail-lbl">Dropping Point</span>
              <strong className="detail-val">{booking.droppingPoint}</strong>
              <span className="detail-sub">Estimated Arrival ({booking.droppingTime || booking.arrivalTime})</span>
            </div>

            <div className="detail-item">
              <span className="detail-lbl">Primary Contact & OTP Status</span>
              <strong className="detail-val">{booking.contactInfo.email}</strong>
              <span className="detail-sub verified-phone-sub">
                <Smartphone size={13} className="text-success" />
                <span>{booking.contactInfo.phone}</span>
                <span className="mini-verified-badge">✓ OTP Verified</span>
              </span>
            </div>
          </div>

          {/* Passengers Table & QR Code with Mandatory Govt ID */}
          <div className="ticket-passenger-qr-section">
            <div className="passengers-table-wrap">
              <div className="manifest-header-strip">
                <h4 className="sub-heading">Passenger Manifest & Govt ID Proof</h4>
                <span className="govt-compliant-tag">
                  <ShieldCheck size={13} /> MoRTH Compliant
                </span>
              </div>
              <table className="manifest-table">
                <thead>
                  <tr>
                    <th>Seat</th>
                    <th>Passenger Name</th>
                    <th>Age / Gender</th>
                    <th>Govt ID Proof</th>
                    <th>Status</th>
                    <th>Fare</th>
                  </tr>
                </thead>
                <tbody>
                  {booking.seats.map((seat, i) => (
                    <tr key={i}>
                      <td>
                        <span className="seat-badge-pill">{seat.seatNumber}</span>
                      </td>
                      <td>
                        <strong>{seat.passengerName}</strong>
                      </td>
                      <td>{seat.age} yrs • {seat.gender}</td>
                      <td>
                        <div className="id-proof-ticket-cell">
                          <span className="id-type-name">{seat.idProofType || 'Aadhaar Card'}</span>
                          <span className="id-masked-num">
                            {formatMaskedId(seat.idProofType, seat.idProofNumber)}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="verified-status-tag">
                          <BadgeCheck size={14} className="text-success" /> Verified
                        </span>
                      </td>
                      <td>{formatPrice(seat.price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="fare-summary-inline">
                <span>Total Amount Paid:</span>
                <strong className="paid-val">{formatPrice(booking.totalAmount)}</strong>
                <span className="payment-note">via {booking.paymentMethod}</span>
              </div>
            </div>

            {/* QR Code Container */}
            <div className="ticket-qr-container">
              {qrDataUrl ? (
                <img src={qrDataUrl} alt="Ticket QR Verification Code" className="qr-image" />
              ) : (
                <div className="qr-skeleton">Generating QR...</div>
              )}
              <span className="qr-caption">Scan for Digital Boarding Gate</span>
              <span className="qr-subcaption">AIS-140 & DigiLocker Linked</span>
            </div>
          </div>

          {/* Ticket Footer / Instructions */}
          <div className="ticket-footer-strip">
            <div className="ticket-guidelines-list">
              <p className="ticket-guideline">
                • <strong>Mandatory ID Proof:</strong> Each passenger must carry their physical or DigiLocker original 
                {booking.seats.map(s => ` ${s.idProofType || 'Govt ID'}`).slice(0, 2).join(' / ')} as verified above.
              </p>
              <p className="ticket-guideline">
                • <strong>Emergency Support:</strong> 24x7 India Highway Passenger Helpline: <strong>1800-102-OMNI</strong> / <strong>+91 80 4567 8900</strong>
              </p>
              <p className="ticket-guideline">
                • Free cancellation available up to 4 hours prior to scheduled departure time.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
