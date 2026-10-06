// Comprehensive Indian Domestic Flights Catalog & Dynamic Route Generator

const AIRLINE_FLEETS = [
  {
    airline: "IndiGo",
    code: "6E",
    aircraft: "Airbus A321neo",
    logoColor: "#002b82",
    baggage: "7kg Cabin • 15kg Check-in",
    amenities: [
      "In-Seat USB Power Ports",
      "IndiGo 6E Café Snacks",
      "99.2% On-Time Record",
      "Web Check-In Assistance",
      "AIS-140 Safe Flight Telemetry"
    ]
  },
  {
    airline: "Air India",
    code: "AI",
    aircraft: "Boeing 787-8 Dreamliner",
    logoColor: "#b91c1c",
    baggage: "8kg Cabin • 20kg Check-in",
    amenities: [
      "Complimentary Hot Meal & Drink",
      "Personal 11-inch HD Touchscreen",
      "Spacious 32-inch Seat Pitch",
      "High-Speed In-Flight Wi-Fi",
      "Maharaja Business Lounge Option"
    ]
  },
  {
    airline: "Vistara",
    code: "UK",
    aircraft: "Airbus A320neo",
    logoColor: "#581c87",
    baggage: "7kg Cabin • 15kg Check-in",
    amenities: [
      "Signature Gourmet Dining",
      "Complimentary Starbucks Coffee",
      "Mood Lighting & Quiet Cabin",
      "Wireless Device Streaming",
      "Priority Baggage Handling"
    ]
  },
  {
    airline: "Akasa Air",
    code: "QP",
    aircraft: "Boeing 737 MAX 8",
    logoColor: "#ea580c",
    baggage: "7kg Cabin • 15kg Check-in",
    amenities: [
      "Ultra-Quiet CFM LEAP-1B Engines",
      "Cafe Akasa Organic Meals",
      "Fast USB-A & USB-C Sockets",
      "Ergonomic Memory Foam Seats",
      "Pet-Friendly Cabin Travel"
    ]
  },
  {
    airline: "SpiceJet",
    code: "SG",
    aircraft: "Boeing 737-800",
    logoColor: "#dc2626",
    baggage: "7kg Cabin • 15kg Check-in",
    amenities: [
      "SpiceMax Extra Legroom Option",
      "Pre-booked Hot Meals",
      "SpiceScreen Entertainment",
      "Speedy Boarding Pass Delivery",
      "Dedicated Ground Crew"
    ]
  }
];

// Airport Codes for Major Indian Cities
const AIRPORT_INFO = {
  "Bengaluru": { code: "BLR", name: "Kempegowda International Airport", terminal: "Terminal 2" },
  "Hyderabad": { code: "HYD", name: "Rajiv Gandhi International Airport", terminal: "Terminal 1" },
  "Mumbai": { code: "BOM", name: "Chhatrapati Shivaji Maharaj Intl", terminal: "Terminal 2" },
  "Delhi": { code: "DEL", name: "Indira Gandhi International Airport", terminal: "Terminal 3" },
  "Chennai": { code: "MAA", name: "Chennai International Airport", terminal: "Terminal 1" },
  "Goa (Panaji / Panjim)": { code: "GOI", name: "Manohar International Airport (MOPA)", terminal: "Terminal 1" },
  "Pune": { code: "PNQ", name: "Pune International Airport", terminal: "New Terminal" },
  "Kolkata": { code: "CCU", name: "Netaji Subhash Chandra Bose Intl", terminal: "Terminal 2" },
  "Ahmedabad": { code: "AMD", name: "Sardar Vallabhbhai Patel Intl", terminal: "Terminal 1" },
  "Jaipur": { code: "JAI", name: "Jaipur International Airport", terminal: "Terminal 2" },
  "Kochi (Cochin)": { code: "COK", name: "Cochin International Airport", terminal: "Terminal 1" },
  "Manali": { code: "KUU", name: "Bhuntar Kullu-Manali Airport", terminal: "Domestic Terminal" }
};

// Generate realistic Aircraft Seating Map (Cockpit + Business Class 2+2 + Economy 3+3)
export function generateAirplaneSeatMap(basePrice = 3500) {
  const seats = [];

  // 1. Business Class: Rows 1 and 2 (2 + 2 layout: A, C | D, F)
  for (let r = 1; r <= 2; r++) {
    ['A', 'C', 'D', 'F'].forEach(col => {
      const isWindow = col === 'A' || col === 'F';
      const isBooked = (r === 1 && col === 'A') || (r === 2 && col === 'D');
      seats.push({
        id: `seat-${r}${col}`,
        number: `${r}${col}`,
        row: r,
        col: col,
        cabin: 'business',
        type: isWindow ? 'window' : 'aisle',
        extraLegroom: true,
        price: Math.round(basePrice * 2.1),
        status: isBooked ? 'booked' : 'available',
        label: `Business Class • ${isWindow ? 'Window' : 'Aisle'} Recliner`
      });
    });
  }

  // 2. Economy Class: Rows 3 to 12 (3 + 3 layout: A, B, C | Aisle | D, E, F)
  for (let r = 3; r <= 12; r++) {
    ['A', 'B', 'C', 'D', 'E', 'F'].forEach(col => {
      const isWindow = col === 'A' || col === 'F';
      const isAisle = col === 'C' || col === 'D';
      const isMiddle = col === 'B' || col === 'E';
      const isExtraLegroom = r === 3 || r === 7; // Row 3 (front) and Row 7 (emergency exit)
      
      // Random booked pattern
      const isBooked = (r === 4 && col === 'A') || 
                       (r === 5 && col === 'C') || 
                       (r === 6 && col === 'F') || 
                       (r === 8 && col === 'B') || 
                       (r === 9 && col === 'D') || 
                       (r === 11 && col === 'E');

      const seatPrice = isExtraLegroom 
        ? Math.round(basePrice + 450) 
        : (isWindow || isAisle ? Math.round(basePrice + 150) : basePrice);

      let typeStr = 'middle';
      if (isWindow) typeStr = 'window';
      else if (isAisle) typeStr = 'aisle';

      seats.push({
        id: `seat-${r}${col}`,
        number: `${r}${col}`,
        row: r,
        col: col,
        cabin: 'economy',
        type: typeStr,
        extraLegroom: isExtraLegroom,
        price: seatPrice,
        status: isBooked ? 'booked' : 'available',
        label: isExtraLegroom 
          ? `Economy • Row ${r} Extra Legroom (${typeStr.toUpperCase()})` 
          : `Economy Standard (${typeStr.toUpperCase()})`
      });
    });
  }

  return seats;
}

// Generate Flight Catalog for a Route
export function getFlightsForRoute(fromCity = "Bengaluru", toCity = "Hyderabad") {
  const origin = AIRPORT_INFO[fromCity] || { code: fromCity.slice(0, 3).toUpperCase(), name: `${fromCity} Domestic Airport`, terminal: "Terminal 1" };
  const dest = AIRPORT_INFO[toCity] || { code: toCity.slice(0, 3).toUpperCase(), name: `${toCity} Domestic Airport`, terminal: "Terminal 1" };

  const flightSchedules = [
    { num: 512, fleetIdx: 0, dep: "06:45 AM", arr: "07:55 AM", dur: "1h 10m", price: 3450, orig: 4200, badge: "Early Bird • Non-Stop ⚡" },
    { num: 804, fleetIdx: 1, dep: "09:30 AM", arr: "10:50 AM", dur: "1h 20m", price: 4190, orig: 4950, badge: "Full Service Meal 🍽️" },
    { num: 835, fleetIdx: 2, dep: "12:15 PM", arr: "01:30 PM", dur: "1h 15m", price: 4450, orig: 5300, badge: "Premium Airline ★" },
    { num: 1382, fleetIdx: 3, dep: "04:45 PM", arr: "06:00 PM", dur: "1h 15m", price: 3290, orig: 3900, badge: "Best Value 🏷️" },
    { num: 3011, fleetIdx: 4, dep: "08:15 PM", arr: "09:35 PM", dur: "1h 20m", price: 3650, orig: 4400, badge: "Evening Express 🌙" }
  ];

  return flightSchedules.map((sch, i) => {
    const fleet = AIRLINE_FLEETS[sch.fleetIdx];
    const flightNo = `${fleet.code}-${sch.num}`;
    const seats = generateAirplaneSeatMap(sch.price);
    const availableCount = seats.filter(s => s.status === 'available').length;

    return {
      id: `flight-${fleet.code.toLowerCase()}-${sch.num}`,
      mode: 'flights',
      category: 'flight',
      name: `${fleet.airline} ${flightNo}`,
      operator: `${fleet.airline} Flight Services`,
      flightNumber: flightNo,
      airline: fleet.airline,
      aircraft: fleet.aircraft,
      type: `${fleet.aircraft} • Non-Stop`,
      badge: sch.badge,
      hasWashroom: true,
      rating: +(4.6 + (i * 0.07)).toFixed(1),
      reviewsCount: 1850 + i * 420,
      from: fromCity,
      to: toCity,
      originAirport: origin,
      destAirport: dest,
      departureAirportCode: origin.code,
      arrivalAirportCode: dest.code,
      departureAirportName: origin.name,
      arrivalAirportName: dest.name,
      departureTime: sch.dep,
      arrivalTime: sch.arr,
      duration: sch.dur,
      price: sch.price,
      originalPrice: sch.orig,
      availableSeatsCount: availableCount,
      liveTracking: true,
      baggage: fleet.baggage,
      amenities: fleet.amenities,
      planeSeats: seats,
      // For universal compatibility with booking flow:
      lowerDeck: seats,
      upperDeck: [],
      boardingPoints: [
        { id: `bp-gate-${i}-1`, name: `${origin.terminal} • Boarding Gate ${12 + i}B`, time: sch.dep, landmark: `Security Check Area • ${origin.name}` },
        { id: `bp-gate-${i}-2`, name: `${origin.terminal} • Priority Gate ${14 + i}A`, time: sch.dep, landmark: `Near Airline Lounge • ${origin.name}` }
      ],
      droppingPoints: [
        { id: `dp-arr-${i}-1`, name: `${dest.terminal} • Baggage Carousel ${3 + (i % 4)}`, time: sch.arr, landmark: `Arrival Baggage Hall • ${dest.name}` },
        { id: `dp-arr-${i}-2`, name: `${dest.terminal} • Passenger Exit Hub`, time: sch.arr, landmark: `Pillar 8 • Airport Taxi Bay` }
      ]
    };
  });
}
