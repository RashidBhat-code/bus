import React, { useState } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  CreditCard, 
  ShieldCheck, 
  QrCode, 
  Tag, 
  CheckCircle2, 
  Coffee, 
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Lock,
  Loader2,
  Smartphone,
  Building,
  KeyRound,
  FileCheck,
  AlertCircle,
  BadgeCheck,
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';

const ID_TYPES = [
  { id: 'AADHAAR', name: 'Aadhaar Card (UIDAI)', placeholder: '1234 5678 9012 (12 digits)', minLength: 12 },
  { id: 'PAN', name: 'PAN Card (Income Tax)', placeholder: 'ABCDE1234F (10 chars)', minLength: 10 },
  { id: 'DRIVING_LICENSE', name: 'Driving License (MoRTH)', placeholder: 'KA01-20220001234', minLength: 10 },
  { id: 'VOTER_ID', name: 'Voter ID (Election Commission)', placeholder: 'EPIC / ABC1234567', minLength: 10 },
  { id: 'PASSPORT', name: 'Indian Passport (Govt of India)', placeholder: 'A1234567 (8 chars)', minLength: 8 }
];

export default function BookingModal({ 
  bus, 
  selectedSeats, 
  boardingPoint, 
  droppingPoint, 
  searchDate, 
  onClose, 
  onBookingSuccess, 
  formatPrice, 
  currency 
}) {
  const [step, setStep] = useState('passengers'); // 'passengers' | 'payment'

  // Passenger data state: map for each seat with mandatory ID proof
  const [passengers, setPassengers] = useState(
    selectedSeats.map(seat => ({
      seatNumber: seat.number,
      seatPrice: seat.price,
      name: '',
      age: '',
      gender: seat.isFemaleOnly ? 'Female' : 'Male',
      idProofType: 'Aadhaar Card (UIDAI)',
      idProofNumber: '',
      isIdVerified: false
    }))
  );

  // Customer contact state
  const [contact, setContact] = useState({
    email: '',
    phone: ''
  });

  // Mobile OTP Verification State
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [smsNotification, setSmsNotification] = useState(null);
  const [otpError, setOtpError] = useState('');
  const [validationError, setValidationError] = useState('');

  // Indian Travel Add-ons (INR)
  const [addOns, setAddOns] = useState({
    insurance: true, // ₹35 per passenger
    snackBox: false, // ₹120 per passenger
    carbonOffset: false // ₹20
  });

  // Promo code
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoMessage, setPromoMessage] = useState(null);

  // Payment method: 'upi' | 'card' | 'netbanking'
  const [paymentMethod, setPaymentMethod] = useState('upi'); 
  const [upiId, setUpiId] = useState('');
  const [selectedBank, setSelectedBank] = useState('HDFC');
  const [cardData, setCardData] = useState({
    number: '4532 •••• •••• 8912',
    name: '',
    expiry: '12/28',
    cvv: '889'
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // Price calculations in INR
  const baseSeatsFare = selectedSeats.reduce((sum, s) => sum + s.price, 0);
  const insuranceCost = addOns.insurance ? 35 * selectedSeats.length : 0;
  const snackBoxCost = addOns.snackBox ? 120 * selectedSeats.length : 0;
  const carbonCost = addOns.carbonOffset ? 20 : 0;
  const addOnsTotal = insuranceCost + snackBoxCost + carbonCost;
  const taxAmount = (baseSeatsFare + addOnsTotal) * 0.05; // 5% GST
  const subTotal = baseSeatsFare + addOnsTotal + taxAmount;
  
  const discountTotal = discountPercent > 0 
    ? (baseSeatsFare * (discountPercent / 100)) 
    : discountAmount;

  const finalTotal = Math.max(0, subTotal - discountTotal);

  // Send OTP Function
  const handleSendOtp = () => {
    // Validate phone number
    const cleaned = contact.phone.replace(/[^0-9]/g, '');
    if (cleaned.length < 10) {
      setValidationError("Please enter a valid 10-digit Indian mobile number to verify.");
      return;
    }
    setValidationError('');
    setIsSendingOtp(true);
    setOtpError('');

    // Generate random 6 digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);

    setTimeout(() => {
      setIsSendingOtp(false);
      setShowOtpInput(true);
      setSmsNotification({
        sender: "RASHTRIPS-OTP",
        time: "Just now",
        message: `Your RashTrips India Passenger Verification OTP is ${code}. Valid for 10 minutes. Do not share with anyone.`
      });
    }, 700);
  };

  // Verify OTP
  const handleVerifyOtp = () => {
    if (enteredOtp.trim() === generatedOtp) {
      setIsPhoneVerified(true);
      setShowOtpInput(false);
      setOtpError('');
      setSmsNotification(null);
      setValidationError('');
    } else {
      setOtpError("Incorrect OTP entered. Please check the simulated SMS message or click 'Auto-fill Demo OTP'.");
    }
  };

  // Auto-fill Demo OTP
  const handleAutoFillOtp = () => {
    if (generatedOtp) {
      setEnteredOtp(generatedOtp);
      setTimeout(() => {
        setIsPhoneVerified(true);
        setShowOtpInput(false);
        setOtpError('');
        setSmsNotification(null);
        setValidationError('');
      }, 300);
    }
  };

  // Verify Passenger ID Proof
  const handleVerifyPassengerId = (index) => {
    const updated = [...passengers];
    const p = updated[index];
    if (!p.idProofNumber || p.idProofNumber.trim().length < 4) {
      setValidationError(`Please enter a valid ${p.idProofType} number for Passenger ${index + 1}.`);
      return;
    }
    p.isIdVerified = true;
    setPassengers(updated);
    setValidationError('');
  };

  // Apply promo
  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'INDIA15' || code === 'BUSPRO15') {
      setDiscountPercent(15);
      setDiscountAmount(0);
      setPromoMessage({ type: 'success', text: 'Shandaar! 15% discount applied.' });
    } else if (code === 'FIRSTBUS' || code === 'FIRSTTRIP') {
      setDiscountPercent(0);
      setDiscountAmount(150);
      setPromoMessage({ type: 'success', text: 'Success! ₹150 flat discount applied.' });
    } else if (code === 'VOLVO100') {
      setDiscountPercent(0);
      setDiscountAmount(100);
      setPromoMessage({ type: 'success', text: 'Special! ₹100 Volvo discount applied.' });
    } else {
      setPromoMessage({ type: 'error', text: 'Invalid promo code. Try "INDIA15" or "FIRSTBUS"' });
    }
  };

  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    if (field === 'idProofNumber') {
      updated[index].isIdVerified = value.trim().length >= 6;
    }
    setPassengers(updated);
  };

  const canProceedToPayment = () => {
    const allFilled = passengers.every(p => 
      p.name.trim() !== '' && 
      p.age !== '' && 
      p.idProofNumber.trim() !== ''
    );
    const contactValid = contact.email.trim() !== '' && contact.phone.trim() !== '';
    return allFilled && contactValid && isPhoneVerified;
  };

  const handleProceedClick = () => {
    if (!isPhoneVerified) {
      setValidationError("⚠️ Mandatory: Please verify your Indian mobile number via OTP before proceeding.");
      return;
    }
    const missingId = passengers.some(p => !p.idProofNumber || p.idProofNumber.trim() === '');
    if (missingId) {
      setValidationError("⚠️ Mandatory: Government ID Proof is required for all passengers under Indian Transport Regulations.");
      return;
    }
    setValidationError('');
    setStep('payment');
  };

  const handleCompletePayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);

      // Trigger Confetti Celebration
      confetti({
        particleCount: 140,
        spread: 80,
        origin: { y: 0.6 }
      });

      // Generate Indian PNR
      const pnrNumber = `IND-OB-${Math.floor(100000 + Math.random() * 900000)}-EXP`;

      let paymentDesc = 'UPI (Instant)';
      if (paymentMethod === 'upi') {
        paymentDesc = upiId ? `UPI (${upiId})` : 'UPI / Google Pay QR';
      } else if (paymentMethod === 'card') {
        paymentDesc = `RuPay/Card (ending ${cardData.number.slice(-4)})`;
      } else {
        paymentDesc = `Net Banking (${selectedBank} Bank)`;
      }

      const newBooking = {
        pnr: pnrNumber,
        busId: bus.id,
        busName: bus.name,
        operator: bus.operator,
        type: bus.type,
        from: bus.from,
        to: bus.to,
        date: searchDate,
        departureTime: bus.departureTime,
        arrivalTime: bus.arrivalTime,
        boardingPoint: boardingPoint ? boardingPoint.name : `${bus.from} Central Bus Stand`,
        boardingTime: boardingPoint ? boardingPoint.time : bus.departureTime,
        droppingPoint: droppingPoint ? droppingPoint.name : `${bus.to} Central Transit Interchange`,
        droppingTime: droppingPoint ? droppingPoint.time : bus.arrivalTime,
        seats: passengers.map(p => ({
          seatNumber: p.seatNumber,
          passengerName: p.name,
          age: p.age,
          gender: p.gender,
          idProofType: p.idProofType,
          idProofNumber: p.idProofNumber,
          isIdVerified: true,
          price: p.seatPrice
        })),
        contactInfo: {
          email: contact.email,
          phone: contact.phone,
          isPhoneVerified: true
        },
        addOns: {
          insurance: addOns.insurance,
          snackBox: addOns.snackBox,
          carbonOffset: addOns.carbonOffset
        },
        totalAmount: finalTotal,
        status: 'CONFIRMED',
        bookingDate: new Date().toLocaleString(),
        paymentMethod: paymentDesc,
        liveStatus: 'Scheduled on time'
      };

      onBookingSuccess(newBooking);
    }, 1800);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card booking-modal glass-panel" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <ShieldCheck size={22} className="text-accent" />
            <div>
              <h3>Secure Passenger Checkout & Govt ID Verification</h3>
              <p className="modal-subtitle">
                {bus.name} • {bus.from} ➔ {bus.to} • {searchDate}
              </p>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Stepper */}
        <div className="modal-stepper">
          <div className={`step-item ${step === 'passengers' ? 'active' : 'completed'}`}>
            <span className="step-circle">1</span>
            <span className="step-label">Yatri & Govt ID Proof</span>
          </div>
          <div className="step-connector"></div>
          <div className={`step-item ${step === 'payment' ? 'active' : ''}`}>
            <span className="step-circle">2</span>
            <span className="step-label">UPI & Payment</span>
          </div>
        </div>

        {/* SMS Notification Banner (Simulated live Indian SMS for OTP) */}
        {smsNotification && (
          <div className="sms-push-banner">
            <div className="sms-banner-header">
              <span className="sms-badge">📲 SIMULATED SMS • {smsNotification.sender}</span>
              <span className="sms-time">{smsNotification.time}</span>
            </div>
            <p className="sms-text">{smsNotification.message}</p>
            <div className="sms-quick-action">
              <button 
                type="button" 
                className="btn-quick-autofill"
                onClick={handleAutoFillOtp}
              >
                ⚡ 1-Click Auto-Fill Demo OTP ({generatedOtp})
              </button>
            </div>
          </div>
        )}

        {/* Validation Warning Alert */}
        {validationError && (
          <div className="validation-alert-banner">
            <AlertCircle size={18} className="text-warning" />
            <span>{validationError}</span>
          </div>
        )}

        <div className="modal-body booking-modal-content">
          {step === 'passengers' ? (
            <div className="passenger-step-content">
              
              {/* Customer Contact Verification Section */}
              <div className="contact-info-section glass-panel">
                <div className="section-header-row">
                  <h4 className="section-title">
                    <Smartphone size={18} className="text-accent" />
                    <span>Customer Details Verification (Mandatory)</span>
                  </h4>
                  {isPhoneVerified && (
                    <span className="verified-success-badge">
                      <BadgeCheck size={16} /> Verified via Mobile OTP
                    </span>
                  )}
                </div>

                <div className="contact-form-row">
                  <div className="form-field-group">
                    <label>Email ID for E-Ticket *</label>
                    <div className="input-with-icon">
                      <Mail size={16} />
                      <input 
                        type="email" 
                        placeholder="yourname@gmail.com"
                        value={contact.email}
                        onChange={(e) => setContact(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-field-group">
                    <label>
                      <span>Indian Mobile Number *</span>
                      {isPhoneVerified ? (
                        <span className="text-success verified-label">✓ Phone Verified</span>
                      ) : (
                        <span className="text-warning verified-label">⚠️ Verification Required</span>
                      )}
                    </label>
                    
                    <div className="phone-verification-wrap">
                      <div className="input-with-icon phone-input-box">
                        <span className="country-code">+91</span>
                        <input 
                          type="tel" 
                          placeholder="98765 43210"
                          value={contact.phone}
                          disabled={isPhoneVerified}
                          onChange={(e) => {
                            setContact(prev => ({ ...prev, phone: e.target.value }));
                            setIsPhoneVerified(false);
                            setShowOtpInput(false);
                          }}
                          required
                        />
                      </div>

                      {!isPhoneVerified ? (
                        <button 
                          type="button" 
                          className="btn-send-otp"
                          disabled={isSendingOtp}
                          onClick={handleSendOtp}
                        >
                          {isSendingOtp ? (
                            <>
                              <Loader2 size={14} className="spinner-icon" />
                              <span>Sending...</span>
                            </>
                          ) : (
                            <>
                              <Send size={14} />
                              <span>{showOtpInput ? 'Resend OTP' : 'Verify Mobile OTP'}</span>
                            </>
                          )}
                        </button>
                      ) : (
                        <div className="verified-pill">
                          <CheckCircle2 size={16} className="text-success" />
                          <span>OTP Verified</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* OTP Input Drawer */}
                {showOtpInput && !isPhoneVerified && (
                  <div className="otp-verification-drawer glass-panel">
                    <div className="otp-drawer-header">
                      <KeyRound size={16} className="text-accent" />
                      <span>Enter the 6-digit OTP sent to +91 {contact.phone}</span>
                    </div>

                    <div className="otp-input-action-row">
                      <input 
                        type="text" 
                        maxLength="6"
                        placeholder="e.g. 748291"
                        value={enteredOtp}
                        onChange={(e) => setEnteredOtp(e.target.value.replace(/[^0-9]/g, ''))}
                        className="otp-code-input"
                      />

                      <button 
                        type="button" 
                        className="btn-verify-otp-action"
                        onClick={handleVerifyOtp}
                      >
                        Verify Code
                      </button>

                      <button 
                        type="button" 
                        className="btn-auto-fill-otp"
                        onClick={handleAutoFillOtp}
                        title="Instant quick verification"
                      >
                        ⚡ Use Demo Code ({generatedOtp})
                      </button>
                    </div>

                    {otpError && (
                      <span className="otp-error-text">{otpError}</span>
                    )}
                  </div>
                )}
              </div>

              {/* Passenger Cards with Mandatory Govt ID Proof */}
              <div className="passengers-list-section">
                <div className="section-header-row">
                  <h4 className="section-title">
                    <User size={18} className="text-accent" />
                    <span>Passenger Manifest & Government ID Proof ({passengers.length} Yatri)</span>
                  </h4>
                  <span className="govt-rule-pill">
                    <ShieldCheck size={14} /> Mandatory as per MoRTH Indian Transit Guidelines
                  </span>
                </div>
                
                {passengers.map((passenger, idx) => (
                  <div key={passenger.seatNumber} className="passenger-input-card glass-panel">
                    <div className="passenger-card-top-bar">
                      <div className="passenger-seat-badge">
                        <span>Seat {passenger.seatNumber}</span>
                        <span className="seat-assigned-type">
                          {selectedSeats[idx]?.type === 'sleeper' ? 'AC Sleeper Berth' : 'Seater Recliner'}
                        </span>
                      </div>

                      {passenger.isIdVerified ? (
                        <span className="id-verified-pill text-success">
                          <BadgeCheck size={15} /> Govt ID Linked & Verified
                        </span>
                      ) : (
                        <span className="id-pending-pill text-warning">
                          <FileCheck size={14} /> Govt ID Required
                        </span>
                      )}
                    </div>

                    {/* Basic details row */}
                    <div className="passenger-form-row">
                      <div className="form-field-group name-field">
                        <label>Full Name (as on Govt ID) *</label>
                        <div className="input-with-icon">
                          <User size={16} />
                          <input 
                            type="text" 
                            placeholder="e.g. Rahul Sharma"
                            value={passenger.name}
                            onChange={(e) => handlePassengerChange(idx, 'name', e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-field-group age-field">
                        <label>Age *</label>
                        <input 
                          type="number" 
                          min="1" 
                          max="110" 
                          placeholder="Age"
                          value={passenger.age}
                          onChange={(e) => handlePassengerChange(idx, 'age', e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-field-group gender-field">
                        <label>Gender</label>
                        <select 
                          value={passenger.gender}
                          onChange={(e) => handlePassengerChange(idx, 'gender', e.target.value)}
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    {/* Government ID Proof Row */}
                    <div className="passenger-id-proof-box">
                      <div className="form-field-group id-type-field">
                        <label>
                          <FileCheck size={14} className="text-cyan" />
                          <span>Government ID Type *</span>
                        </label>
                        <select
                          value={passenger.idProofType}
                          onChange={(e) => handlePassengerChange(idx, 'idProofType', e.target.value)}
                          className="id-select"
                        >
                          {ID_TYPES.map(type => (
                            <option key={type.id} value={type.name}>
                              {type.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-field-group id-number-field">
                        <label>
                          <span>ID Card Number *</span>
                          <span className="id-sublabel">(Required for Boarding Security)</span>
                        </label>
                        <div className="id-input-with-verify">
                          <input 
                            type="text" 
                            placeholder={
                              passenger.idProofType.includes('Aadhaar') 
                                ? 'XXXX-XXXX-XXXX (12 digits)' 
                                : passenger.idProofType.includes('PAN') 
                                ? 'ABCDE1234F' 
                                : 'Enter Govt ID Number'
                            }
                            value={passenger.idProofNumber}
                            onChange={(e) => handlePassengerChange(idx, 'idProofNumber', e.target.value)}
                            required
                          />

                          <button 
                            type="button" 
                            className={`btn-verify-id ${passenger.isIdVerified ? 'verified' : ''}`}
                            onClick={() => handleVerifyPassengerId(idx)}
                          >
                            {passenger.isIdVerified ? (
                              <>
                                <CheckCircle2 size={14} />
                                <span>Verified</span>
                              </>
                            ) : (
                              <span>Verify</span>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Indian Add-ons Section */}
              <div className="addons-section">
                <h4 className="section-title">Recommended Add-ons for Indian Highways</h4>
                <div className="addons-grid">
                  <label className={`addon-card glass-panel ${addOns.insurance ? 'checked' : ''}`}>
                    <input 
                      type="checkbox" 
                      checked={addOns.insurance}
                      onChange={(e) => setAddOns(prev => ({ ...prev, insurance: e.target.checked }))}
                    />
                    <div className="addon-info">
                      <div className="addon-header-row">
                        <strong>Comprehensive Travel Insurance</strong>
                        <span className="addon-price">+{formatPrice(35)}/yatri</span>
                      </div>
                      <p>₹5 Lakh emergency medical coverage & baggage loss protection on national highways.</p>
                    </div>
                  </label>

                  <label className={`addon-card glass-panel ${addOns.snackBox ? 'checked' : ''}`}>
                    <input 
                      type="checkbox" 
                      checked={addOns.snackBox}
                      onChange={(e) => setAddOns(prev => ({ ...prev, snackBox: e.target.checked }))}
                    />
                    <div className="addon-info">
                      <div className="addon-header-row">
                        <strong>Desi Snack Box & Masala Chai</strong>
                        <span className="addon-price">+{formatPrice(120)}/yatri</span>
                      </div>
                      <p>Fresh samosa, roasted cashews, mineral water, and premium thermal cup chai.</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Navigation button */}
              <div className="modal-actions-row">
                <button type="button" className="btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn-primary" 
                  onClick={handleProceedClick}
                >
                  <span>Proceed to UPI & Payment</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ) : (
            <div className="payment-step-content">
              {/* Payment Left: Method Selection */}
              <div className="payment-methods-column">
                <h4 className="section-title">Select Indian Payment Option</h4>
                
                <div className="payment-tabs-bar">
                  <button 
                    type="button" 
                    className={`pay-tab ${paymentMethod === 'upi' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('upi')}
                  >
                    <Smartphone size={18} />
                    <span>UPI (GPay / PhonePe)</span>
                  </button>

                  <button 
                    type="button" 
                    className={`pay-tab ${paymentMethod === 'card' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <CreditCard size={18} />
                    <span>RuPay / Card</span>
                  </button>

                  <button 
                    type="button" 
                    className={`pay-tab ${paymentMethod === 'netbanking' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('netbanking')}
                  >
                    <Building size={18} />
                    <span>Net Banking</span>
                  </button>
                </div>

                {/* UPI Mode */}
                {paymentMethod === 'upi' && (
                  <div className="upi-qr-box glass-panel">
                    <div className="upi-apps-row">
                      <span className="upi-app-pill">Google Pay</span>
                      <span className="upi-app-pill">PhonePe</span>
                      <span className="upi-app-pill">Paytm</span>
                      <span className="upi-app-pill">BHIM UPI</span>
                    </div>

                    <div className="qr-visual-card">
                      <div className="qr-simulated-frame">
                        <QrCode size={130} className="text-accent" />
                      </div>
                      <p className="qr-instruction">
                        Scan with any UPI app to pay <strong>{formatPrice(finalTotal)}</strong> instantly.
                      </p>
                    </div>

                    <div className="upi-id-input-wrap">
                      <span className="or-divider-text">OR ENTER UPI VPA</span>
                      <div className="form-field-group">
                        <input 
                          type="text" 
                          placeholder="e.g. mobile@okhdfcbank or user@paytm"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Card Payment Form */}
                {paymentMethod === 'card' && (
                  <div className="card-form-box glass-panel">
                    <div className="form-field-group">
                      <label>Name on Card / RuPay</label>
                      <input 
                        type="text" 
                        placeholder="Rahul Sharma"
                        value={cardData.name}
                        onChange={(e) => setCardData(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>

                    <div className="form-field-group">
                      <label>Card Number (RuPay, Visa, Mastercard)</label>
                      <input 
                        type="text" 
                        placeholder="4532 •••• •••• 8912"
                        value={cardData.number}
                        onChange={(e) => setCardData(prev => ({ ...prev, number: e.target.value }))}
                      />
                    </div>

                    <div className="form-row-half">
                      <div className="form-field-group">
                        <label>Expiry Date</label>
                        <input 
                          type="text" 
                          placeholder="MM/YY"
                          value={cardData.expiry}
                          onChange={(e) => setCardData(prev => ({ ...prev, expiry: e.target.value }))}
                        />
                      </div>
                      <div className="form-field-group">
                        <label>Security CVV</label>
                        <input 
                          type="password" 
                          maxLength="4"
                          placeholder="•••"
                          value={cardData.cvv}
                          onChange={(e) => setCardData(prev => ({ ...prev, cvv: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="secure-badge-note">
                      <Lock size={14} className="text-success" />
                      <span>RBI 2FA Verified Secure Payment Gateway</span>
                    </div>
                  </div>
                )}

                {/* Net Banking */}
                {paymentMethod === 'netbanking' && (
                  <div className="card-form-box glass-panel">
                    <div className="form-field-group">
                      <label>Select Your Bank</label>
                      <select 
                        value={selectedBank} 
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="search-select"
                      >
                        <option value="HDFC">HDFC Bank</option>
                        <option value="SBI">State Bank of India (SBI)</option>
                        <option value="ICICI">ICICI Bank</option>
                        <option value="Axis">Axis Bank</option>
                        <option value="Kotak">Kotak Mahindra Bank</option>
                        <option value="PNB">Punjab National Bank</option>
                      </select>
                    </div>
                    <p className="support-subtitle">
                      You will be securely redirected to {selectedBank} NetBanking to authorize this transaction.
                    </p>
                  </div>
                )}

                {/* Promo Code Box */}
                <div className="promo-code-box glass-panel">
                  <div className="promo-input-row">
                    <Tag size={18} className="text-accent" />
                    <input 
                      type="text" 
                      placeholder="Promo Code (e.g. INDIA15)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <button type="button" className="btn-secondary apply-code-btn" onClick={handleApplyPromo}>
                      Apply
                    </button>
                  </div>
                  {promoMessage && (
                    <span className={`promo-feedback ${promoMessage.type}`}>
                      {promoMessage.text}
                    </span>
                  )}
                  <span className="promo-hint">Tip: Use promo code <strong>INDIA15</strong> for 15% off or <strong>FIRSTBUS</strong> for ₹150 off!</span>
                </div>
              </div>

              {/* Payment Right: Detailed Receipt */}
              <div className="payment-receipt-column glass-panel">
                <h4 className="receipt-title">Fare Summary</h4>
                
                <div className="trip-summary-snippet">
                  <strong>{bus.name}</strong>
                  <p>{bus.from} ➔ {bus.to}</p>
                  <p className="trip-date-snippet">{searchDate} • {bus.departureTime}</p>
                  <p className="boarding-snippet">
                    Boarding: {boardingPoint ? boardingPoint.name : `${bus.from} Central Bus Stand`}
                  </p>
                  <div className="verified-summary-chip">
                    <BadgeCheck size={14} className="text-success" />
                    <span>Customer & {passengers.length} Govt ID(s) Verified</span>
                  </div>
                </div>

                <div className="receipt-breakdown">
                  <div className="receipt-row">
                    <span>Base Seat Fare ({selectedSeats.length} seats):</span>
                    <span>{formatPrice(baseSeatsFare)}</span>
                  </div>

                  {addOns.insurance && (
                    <div className="receipt-row">
                      <span>Travel Insurance:</span>
                      <span>{formatPrice(insuranceCost)}</span>
                    </div>
                  )}

                  {addOns.snackBox && (
                    <div className="receipt-row">
                      <span>Desi Snack Box:</span>
                      <span>{formatPrice(snackBoxCost)}</span>
                    </div>
                  )}

                  <div className="receipt-row">
                    <span>GST (5%):</span>
                    <span>{formatPrice(taxAmount)}</span>
                  </div>

                  {discountTotal > 0 && (
                    <div className="receipt-row discount-row">
                      <span>Promo Discount:</span>
                      <span>-{formatPrice(discountTotal)}</span>
                    </div>
                  )}

                  <div className="receipt-divider"></div>

                  <div className="receipt-row grand-total-row">
                    <span>Total Amount Payable:</span>
                    <span className="grand-total-val">{formatPrice(finalTotal)}</span>
                  </div>
                </div>

                <div className="receipt-actions">
                  <button 
                    type="button" 
                    className="btn-secondary" 
                    disabled={isProcessing}
                    onClick={() => setStep('passengers')}
                  >
                    <ArrowLeft size={16} />
                    <span>Back</span>
                  </button>

                  <button 
                    type="button" 
                    className="btn-primary pay-now-btn"
                    disabled={isProcessing}
                    onClick={handleCompletePayment}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 size={18} className="spinner-icon" />
                        <span>Confirming UPI...</span>
                      </>
                    ) : (
                      <>
                        <Lock size={16} />
                        <span>Pay {formatPrice(finalTotal)}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
