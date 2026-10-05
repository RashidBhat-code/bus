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
  MessageSquare
} from 'lucide-react';

export default function CamplySections({ onExploreClick }) {
  // Testimonials Carousel State
  const testimonials = [
    {
      id: 1,
      quote: "Thanks to OmniBus I can now travel across South India comfortably overnight without booking trains months ahead!",
      name: "Wade Warren",
      role: "Frequent Highway Traveler",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      rating: 5
    },
    {
      id: 2,
      quote: "I think this is the cleanest Volvo sleeper service I have ever tried. Bedding was sanitized, sealed and pillows were warm.",
      name: "Theresa Jordan",
      role: "Tech Consultant • Bengaluru",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
      rating: 5
    },
    {
      id: 3,
      quote: "The live GPS telemetry radar saved me from standing at the bypass in the rain. Arrived exactly on the minute!",
      name: "James Wilson",
      role: "Architect • Mumbai",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      rating: 5
    },
    {
      id: 4,
      quote: "As a solo female traveler, the female-only reserved berths and verified Captain details gave me complete peace of mind.",
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
      question: "What is OmniBus Express?",
      answer: "OmniBus Express is India's premium intercity bus booking platform partnering with top state corporations (KSRTC, MSRTC, TSRTC) and private luxury multi-axle fleets (Volvo 9600s, Mercedes-Benz, Scania) with live telemetry and instant UPI ticketing."
    },
    {
      question: "How do I book tatkal and sleeper tickets?",
      answer: "Select your departure and arrival cities, pick your preferred date, choose between single or double berths, verify your Govt ID proof, and complete payment via instant UPI QR code or RuPay card."
    },
    {
      question: "What kind of safety, washroom, and hygiene services will I get?",
      answer: "Every AC sleeper coach features sanitized blankets, private curtains, onboard 5G Wi-Fi, 220V charging ports, and optional washroom onboard facilities marked with the 🚻 icon on the schedule."
    },
    {
      question: "Can I cancel my ticket and get an instant refund?",
      answer: "Yes! Simply navigate to the 'My Bookings' tab, locate your PNR, and click Cancel. Eligible refunds are automatically processed back to your original UPI account or card."
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
          1. COMMUNITY SECTION (Video frame 00:10)
          ==================================================================== */}
      <section className="camply-community-section">
        <div className="camply-community-container">
          <div className="community-left-text">
            <span className="community-tag">
              <Users size={15} /> 100,000+ Highway Yatris
            </span>
            <h2 className="community-headline">
              India's Highway Network Is Calling, No Need For Stalling.
            </h2>
            <p className="community-subtext">
              Want more fun journeys? Join our traveler community to get verified seatmate tips, highway dhaba recommendations, and instant tatkal seat alerts.
            </p>
            <div className="community-actions">
              <button className="btn-dark-pill" onClick={onExploreClick}>
                Join OmniBus Club
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
          2. TESTIMONIALS SECTION (Video frame 00:11 - 00:13)
          ==================================================================== */}
      <section className="camply-testimonials-section">
        <div className="testimonials-header-row">
          <div>
            <span className="section-small-badge">PASSENGER VOICES</span>
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
          3. FAQ & QUESTIONS SECTION (Video frame 00:14 - 00:15)
          ==================================================================== */}
      <section className="camply-faq-section">
        <div className="camply-faq-card">
          <div className="faq-grid-inner">
            
            {/* Left FAQ Intro & Newsletter Input */}
            <div className="faq-left-col">
              <span className="faq-doodle-spark">✦</span>
              <h2 className="faq-headline">
                Got A Question About OmniBus?
              </h2>
              <p className="faq-subtext">
                If there are questions you want to ask, our 24/7 highway support desk will answer all your inquiries.
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
                  <button type="submit" className="btn-dark-pill newsletter-btn">
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
