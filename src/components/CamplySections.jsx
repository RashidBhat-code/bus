import React, { useState } from 'react';
import { 
  Quote, 
  Star, 
  ChevronRight, 
  ArrowLeft, 
  ArrowRight, 
  Send, 
  CheckCircle2, 
  Users, 
  ShieldCheck, 
  Heart,
  MessageSquare,
  Plane,
  Bus,
  Train
} from 'lucide-react';

export default function CamplySections({ onExploreClick }) {
  // Testimonials Carousel State
  const testimonials = [
    {
      id: 1,
      quote: "Thanks to RashTrips I can now seamlessly book flights, express Volvo sleeper buses, and trains all in one sleek dashboard!",
      name: "Wade Warren",
      role: "Frequent Multi-Modal Traveler",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      rating: 5
    },
    {
      id: 2,
      quote: "The cleanest Volvo 9600s sleeper coach service. Bio-toilet onboard was hygienic, bedding was sealed and sanitized.",
      name: "Theresa Jordan",
      role: "Tech Consultant • Bengaluru",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
      rating: 5
    },
    {
      id: 3,
      quote: "The live telemetry radar saved me from waiting in the rain at the highway bypass. Coach arrived exactly on time!",
      name: "James Wilson",
      role: "Architect • Mumbai",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      rating: 5
    },
    {
      id: 4,
      quote: "The Govt ID proof verification and OTP flow gives real security. Booking is fast, safe, and transparent on RashTrips.",
      name: "Pooja Verma",
      role: "Travel Blogger • Hyderabad",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      rating: 5
    }
  ];

  const [testiIndex, setTestiIndex] = useState(0);

  const handleNextTesti = () => {
    setTestiIndex((prev) => (prev + 1) % (testimonials.length - 2));
  };

  const handlePrevTesti = () => {
    setTestiIndex((prev) => (prev === 0 ? testimonials.length - 3 : prev - 1));
  };

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(0);
  const [emailInput, setEmailInput] = useState('');
  const [emailSubscribed, setEmailSubscribed] = useState(false);

  const faqs = [
    {
      question: "What is RashTrips?",
      answer: "RashTrips is India's premier multi-modal travel ticketing platform connecting Flights, Intercity Luxury Buses (Volvo 9600s, BharatBenz, KSRTC, MSRTC, TSRTC), and Trains with live GPS telemetry, instant UPI checkout, and verified passenger ticketing."
    },
    {
      question: "How do I book bus tickets on RashTrips?",
      answer: "Enter your departure and destination cities (supporting all 100+ cities and areas across India), select your travel date and preferred coach category, pick your sleeper or recliner berths, verify your customer mobile via OTP, enter Govt ID proof, and pay securely via UPI."
    },
    {
      question: "What amenities are provided on RashTrips coaches?",
      answer: "Our partner fleets feature hygienic bio-washrooms on board (marked with 🚻), sanitized blankets, 220V laptop & 65W USB fast charging ports, 5G Wi-Fi, individual TV screens, and trained senior drivers."
    },
    {
      question: "Can I cancel my ticket and get an instant refund?",
      answer: "Yes! Navigate to the 'My Bookings' tab, find your PNR, and click Cancel Ticket. Instant refunds are credited directly back to your original UPI account (GPay, PhonePe, Paytm) or card."
    }
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setEmailSubscribed(true);
    setTimeout(() => {
      setEmailInput('');
      setEmailSubscribed(false);
    }, 4000);
  };

  return (
    <div className="camply-extra-sections">
      
      {/* ====================================================================
          1. COMMUNITY SECTION
          ==================================================================== */}
      <section className="camply-community-section">
        <div className="camply-community-container">
          <div className="community-left-text">
            <span className="community-tag">
              <Users size={15} /> 100,000+ Verified Travelers
            </span>
            <h2 className="community-headline">
              India's Travel Network Is Calling, No Need For Stalling.
            </h2>
            <p className="community-subtext">
              Looking for hassle-free journeys? Join the RashTrips traveler community for verified seatmate tips, highway rest-stop recommendations, and tatkal alerts across Flights, Buses & Trains.
            </p>
            <div className="community-actions">
              <button className="btn-rashtrips-pill" onClick={onExploreClick}>
                Explore RashTrips Network
              </button>
            </div>
          </div>

          <div className="community-right-visual">
            <div className="community-avatar-cloud">
              {/* Central Big Avatar */}
              <div className="avatar-bubble center-main">
                <img 
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=180&q=80" 
                  alt="Yatri Captain" 
                />
                <span className="bubble-tooltip left-tool">Joined from Pune!</span>
              </div>

              {/* Floating Orbit Bubbles */}
              <div className="avatar-bubble orbit-1">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80" 
                  alt="Passenger" 
                />
                <span className="bubble-badge">Booked L4 ✨</span>
              </div>

              <div className="avatar-bubble orbit-2">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" 
                  alt="Passenger" 
                />
                <span className="bubble-badge social-chip">@traveler</span>
              </div>

              <div className="avatar-bubble orbit-3">
                <img 
                  src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80" 
                  alt="Passenger" 
                />
                <span className="bubble-badge">Smooth ride! 🚌</span>
              </div>

              <div className="avatar-bubble orbit-4">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" 
                  alt="Passenger" 
                />
                <span className="bubble-badge">Clean AC cabin ❄️</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. TESTIMONIALS SECTION
          ==================================================================== */}
      <section className="camply-testimonials-section">
        <div className="testimonials-header-row">
          <div>
            <span className="section-small-badge">TRAVELER VOICES</span>
            <h2 className="camply-section-title">Satisfied Passengers Are Our Best Proof.</h2>
          </div>

          <div className="carousel-nav-arrows">
            <button 
              className="carousel-arrow-btn" 
              onClick={handlePrevTesti}
              title="Previous testimonials"
            >
              <ArrowLeft size={18} />
            </button>
            <button 
              className="carousel-arrow-btn" 
              onClick={handleNextTesti}
              title="Next testimonials"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="testimonials-cards-grid">
          {testimonials.slice(testiIndex, testiIndex + 3).map((item) => (
            <div key={item.id} className="camply-testi-card">
              <div className="quote-icon-badge">
                <Quote size={22} className="text-primary-blue" />
              </div>
              <p className="testi-quote-text">"{item.quote}"</p>
              
              <div className="testi-author-row">
                <img src={item.avatar} alt={item.name} className="testi-avatar" />
                <div className="testi-author-info">
                  <h4 className="testi-author-name">{item.name}</h4>
                  <span className="testi-author-role">{item.role}</span>
                  <div className="testi-stars">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} size={14} className="star-filled" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================================
          3. FAQ & QUESTIONS SECTION
          ==================================================================== */}
      <section className="camply-faq-section">
        <div className="camply-faq-card">
          <div className="faq-grid-inner">
            
            {/* Left FAQ Intro & Newsletter Input */}
            <div className="faq-left-col">
              <span className="faq-doodle-spark">✦</span>
              <h2 className="faq-headline">
                Got A Question About RashTrips?
              </h2>
              <p className="faq-subtext">
                If there are questions you want to ask, our 24/7 passenger support desk will answer all your inquiries.
              </p>

              <form onSubmit={handleSubscribe} className="faq-newsletter-form">
                <div className="faq-input-pill">
                  <input 
                    type="email" 
                    placeholder="Enter your email address..."
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    required
                  />
                  <button type="submit" className="btn-rashtrips-pill newsletter-btn">
                    {emailSubscribed ? 'Subscribed!' : 'Submit'}
                  </button>
                </div>
              </form>

              {emailSubscribed && (
                <div className="subscription-success-toast">
                  <CheckCircle2 size={16} /> Thank you! Our travel desk will keep you updated.
                </div>
              )}
            </div>

            {/* Right Accordion Questions */}
            <div className="faq-right-col">
              <div className="faq-accordion-list">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div 
                      key={idx} 
                      className={`faq-item-row ${isOpen ? 'open' : ''}`}
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    >
                      <div className="faq-question-wrap">
                        <span className="faq-question-text">{faq.question}</span>
                        <ChevronRight 
                          size={18} 
                          className={`faq-arrow-icon ${isOpen ? 'rotated' : ''}`} 
                        />
                      </div>
                      {isOpen && (
                        <div className="faq-answer-wrap">
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
