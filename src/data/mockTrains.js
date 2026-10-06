// Comprehensive Indian Express Trains Catalog & Train Seat/Berth Generator

const TRAIN_FLEETS = [
  {
    name: "Vande Bharat Express (20608)",
    trainNumber: "20608",
    type: "Semi-High Speed • 160 km/h",
    badge: "Fastest Express 🚄",
    classes: ["Executive Chair Car (EC)", "AC Chair Car (CC)"],
    amenities: [
      "180° Rotating Recliner Seats",
      "Automatic Sensor Doors",
      "Bio-Vacuum Toilets 🚻",
      "Hot Gourmet Rail Meals",
      "Free High-Speed Wi-Fi & Infotainment"
    ]
  },
  {
    name: "Rajdhani Superfast Express (12431)",
    trainNumber: "12431",
    type: "Flagship Superfast (All AC)",
    badge: "Premier AC Overnight 🌙",
    classes: ["1st AC (1A)", "2nd AC (2A)", "3rd AC (3A)"],
    amenities: [
      "Complimentary Gourmet Catering",
      "Pillow, Blanket & Fresh Bedroll",
      "Air-Conditioned Sealed Coach",
      "CCTV Surveillance & Security",
      "Dedicated Rail Coach Attendant"
    ]
  },
  {
    name: "Shatabdi Intercity Express (12007)",
    trainNumber: "12007",
    type: "High Speed Day Express",
    badge: "On-Time Pioneer ⏱️",
    classes: ["Executive Chair Car (EC)", "AC Chair Car (CC)"],
    amenities: [
      "Wide Panoramic Windows",
      "Morning Breakfast & Tea Service",
      "Individual Reading Lamps",
      "220V Mobile Charging Sockets",
      "Clean Bio-Toilets"
    ]
  },
  {
    name: "Tejas Corporate Express (82501)",
    trainNumber: "82501",
    type: "Smart Premium AC Express",
    badge: "Luxury Corporate Rail 💼",
    classes: ["Executive Class (EC)", "AC Chair Car (CC)"],
    amenities: [
      "Personal LCD Infotainment Screen",
      "Flight-Style Attendant Call Bell",
      "Modular Bio-Toilets with Sensors",
      "Complimentary Rail Travel Insurance",
      "On-Board Pantry Delicacies"
    ]
  }
];

// Generate Train Seating Layout (Coach layout with 2+2 Executive or Berths)
export function generateTrainSeatMap(basePrice = 1450) {
  const seats = [];

  // Coach C1: Rows 1 to 14
  // 2+2 layout: Window A, Aisle B | Aisle C, Window D
  for (let r = 1; r <= 14; r++) {
    ['A', 'B', 'C', 'D'].forEach(col => {
      const isWindow = col === 'A' || col === 'D';
      const isBooked = (r === 2 && col === 'A') || 
                       (r === 4 && col === 'C') || 
                       (r === 7 && col === 'B') || 
                       (r === 10 && col === 'D') || 
                       (r === 12 && col === 'A');

      const seatPrice = isWindow ? Math.round(basePrice + 100) : basePrice;

      seats.push({
        id: `train-${r}${col}`,
        number: `${r}${col}`,
        row: r,
        col: col,
        cabin: 'chair-car',
        type: isWindow ? 'window' : 'aisle',
        price: seatPrice,
        status: isBooked ? 'booked' : 'available',
        label: `Coach C1 • Row ${r} (${isWindow ? 'Window' : 'Aisle'})`
      });
    });
  }

  return seats;
}

export function getTrainsForRoute(fromCity = "Bengaluru", toCity = "Hyderabad") {
  const trainSchedules = [
    { fleetIdx: 0, dep: "05:45 AM", arr: "01:30 PM", dur: "7h 45m", price: 1465, orig: 1850 },
    { fleetIdx: 1, dep: "08:00 PM", arr: "06:15 AM", dur: "10h 15m", price: 1680, orig: 2100 },
    { fleetIdx: 2, dep: "02:30 PM", arr: "10:45 PM", dur: "8h 15m", price: 1390, orig: 1720 },
    { fleetIdx: 3, dep: "06:15 PM", arr: "03:00 AM", dur: "8h 45m", price: 1540, orig: 1950 }
  ];

  return trainSchedules.map((sch, i) => {
    const fleet = TRAIN_FLEETS[sch.fleetIdx];
    const seats = generateTrainSeatMap(sch.price);
    const availableCount = seats.filter(s => s.status === 'available').length;

    return {
      id: `train-ir-${fleet.trainNumber}`,
      mode: 'trains',
      category: 'train',
      name: fleet.name,
      operator: "Indian Railways (IRCTC)",
      trainNumber: fleet.trainNumber,
      type: fleet.type,
      badge: fleet.badge,
      hasWashroom: true,
      rating: +(4.6 + (i * 0.08)).toFixed(1),
      reviewsCount: 3100 + i * 500,
      from: fromCity,
      to: toCity,
      departureTime: sch.dep,
      arrivalTime: sch.arr,
      duration: sch.dur,
      price: sch.price,
      originalPrice: sch.orig,
      availableSeatsCount: availableCount,
      liveTracking: true,
      amenities: fleet.amenities,
      planeSeats: seats,
      lowerDeck: seats,
      upperDeck: [],
      boardingPoints: [
        { id: `bp-stn-${i}-1`, name: `${fromCity} Junction • Platform 1`, time: sch.dep, landmark: "Main Concourse & Waiting Lounge" },
        { id: `bp-stn-${i}-2`, name: `${fromCity} Cantt • Platform 2`, time: sch.dep, landmark: "East Gate Entrance" }
      ],
      droppingPoints: [
        { id: `dp-stn-${i}-1`, name: `${toCity} Central / Junction • Platform 4`, time: sch.arr, landmark: "Main Exit Gate & Metro Link" },
        { id: `dp-stn-${i}-2`, name: `${toCity} Secunderabad Terminal`, time: sch.arr, landmark: "Platform 10 Exit" }
      ]
    };
  });
}
