// Comprehensive Indian Buses, Fleet Variety & Dynamic Route Generation
import { INDIAN_CITIES, POPULAR_CITIES } from './indianCities';

export { POPULAR_CITIES, INDIAN_CITIES };

export const BUS_OPERATORS = [
  {
    id: "bus-ind-101",
    name: "VRL Travels Multi-Axle I-Shift",
    operator: "VRL Logistics Ltd.",
    type: "Volvo 9600s AC Sleeper (2+1)",
    category: "sleeper",
    badge: "Flagship Luxury",
    hasWashroom: false,
    rating: 4.8,
    reviewsCount: 3420,
    from: "Bengaluru",
    to: "Hyderabad",
    departureTime: "09:30 PM",
    arrivalTime: "06:15 AM",
    duration: "8h 45m",
    price: 1250,
    originalPrice: 1550,
    availableSeatsCount: 14,
    liveTracking: true,
    isGovtRTC: false,
    amenities: [
      "Individual Private Curtains",
      "5G High-Speed Wi-Fi",
      "Sanitized Pillow & Warm Blanket",
      "220V Laptop & USB-C Sockets",
      "Bisleri Mineral Water Bottle",
      "Air Suspension & Climate Control",
      "Reading Lamp & SOS Button"
    ],
    boardingPoints: [
      { id: "bp-1", name: "Majestic (KBS) Anand Rao Circle", time: "09:30 PM", landmark: "Opp. SRS Travels Office" },
      { id: "bp-2", name: "Madiwala Silk Board Junction", time: "10:00 PM", landmark: "Near Total Mall Flyover" },
      { id: "bp-3", name: "Hebbal Esteem Mall Bus Bay", time: "10:45 PM", landmark: "Airport Expressway Flyover" }
    ],
    droppingPoints: [
      { id: "dp-1", name: "Ameerpet Metro Interchange", time: "05:45 AM", landmark: "Pillar No 1024, Main Road" },
      { id: "dp-2", name: "Gachibowli Outer Ring Road Hub", time: "06:15 AM", landmark: "Biodiversity Park Junction" }
    ],
    lowerDeck: [
      { id: "L1", number: "L1", type: "sleeper", deck: "lower", price: 1350, status: "available", isFemaleOnly: false },
      { id: "L2", number: "L2", type: "sleeper", deck: "lower", price: 1350, status: "booked", isFemaleOnly: false },
      { id: "L3", number: "L3", type: "sleeper", deck: "lower", price: 1250, status: "available", isFemaleOnly: true },
      { id: "L4", number: "L4", type: "sleeper", deck: "lower", price: 1250, status: "available", isFemaleOnly: true },
      { id: "L5", number: "L5", type: "sleeper", deck: "lower", price: 1250, status: "booked", isFemaleOnly: false },
      { id: "L6", number: "L6", type: "sleeper", deck: "lower", price: 1250, status: "available", isFemaleOnly: false },
      { id: "L7", number: "L7", type: "sleeper", deck: "lower", price: 1250, status: "available", isFemaleOnly: false },
      { id: "L8", number: "L8", type: "sleeper", deck: "lower", price: 1250, status: "booked", isFemaleOnly: false }
    ],
    upperDeck: [
      { id: "U1", number: "U1", type: "sleeper", deck: "upper", price: 1300, status: "available", isFemaleOnly: false },
      { id: "U2", number: "U2", type: "sleeper", deck: "upper", price: 1300, status: "available", isFemaleOnly: false },
      { id: "U3", number: "U3", type: "sleeper", deck: "upper", price: 1250, status: "booked", isFemaleOnly: false },
      { id: "U4", number: "U4", type: "sleeper", deck: "upper", price: 1250, status: "available", isFemaleOnly: true },
      { id: "U5", number: "U5", type: "sleeper", deck: "upper", price: 1250, status: "available", isFemaleOnly: false },
      { id: "U6", number: "U6", type: "sleeper", deck: "upper", price: 1250, status: "available", isFemaleOnly: false }
    ]
  },
  {
    id: "bus-ind-102",
    name: "Orange Tours BharatBenz (With Washroom)",
    operator: "Orange Tours & Travels",
    type: "BharatBenz Glider AC Sleeper (Washroom)",
    category: "sleeper",
    badge: "Toilet On Board 🚻",
    hasWashroom: true,
    rating: 4.9,
    reviewsCount: 2950,
    from: "Bengaluru",
    to: "Hyderabad",
    departureTime: "11:00 PM",
    arrivalTime: "07:30 AM",
    duration: "8h 30m",
    price: 1399,
    originalPrice: 1750,
    availableSeatsCount: 10,
    liveTracking: true,
    isGovtRTC: false,
    amenities: [
      "Hygienic Bio-Toilet Onboard",
      "German Air Suspension",
      "Personal 10-inch Touchscreen",
      "Packaged Drinking Water",
      "Clean Pillow & Woolen Blanket",
      "AIS-140 GPS Telemetry",
      "CCTV Surveillance"
    ],
    boardingPoints: [
      { id: "bp-1", name: "Anand Rao Circle (SRS Complex)", time: "11:00 PM", landmark: "Near Race Course Road" },
      { id: "bp-2", name: "Yeshwantpur Govardhan Theatre", time: "11:30 PM", landmark: "Near Metro Gate 2" }
    ],
    droppingPoints: [
      { id: "dp-1", name: "Kukatpally Y-Junction", time: "07:00 AM", landmark: "Near Metro Station" },
      { id: "dp-2", name: "Miyapur Allwyn X Road", time: "07:30 AM", landmark: "Opposite Talkies" }
    ],
    lowerDeck: [
      { id: "L1", number: "L1", type: "sleeper", deck: "lower", price: 1450, status: "available", isFemaleOnly: false },
      { id: "L2", number: "L2", type: "sleeper", deck: "lower", price: 1450, status: "booked", isFemaleOnly: false },
      { id: "L3", number: "L3", type: "sleeper", deck: "lower", price: 1399, status: "available", isFemaleOnly: true },
      { id: "L4", number: "L4", type: "sleeper", deck: "lower", price: 1399, status: "available", isFemaleOnly: true },
      { id: "L5", number: "L5", type: "sleeper", deck: "lower", price: 1399, status: "booked", isFemaleOnly: false },
      { id: "L6", number: "L6", type: "sleeper", deck: "lower", price: 1399, status: "available", isFemaleOnly: false }
    ],
    upperDeck: [
      { id: "U1", number: "U1", type: "sleeper", deck: "upper", price: 1450, status: "available", isFemaleOnly: false },
      { id: "U2", number: "U2", type: "sleeper", deck: "upper", price: 1450, status: "available", isFemaleOnly: false },
      { id: "U3", number: "U3", type: "sleeper", deck: "upper", price: 1399, status: "booked", isFemaleOnly: false },
      { id: "U4", number: "U4", type: "sleeper", deck: "upper", price: 1399, status: "available", isFemaleOnly: true }
    ]
  },
  {
    id: "bus-ind-103",
    name: "KSRTC Airavat Club Class Multi-Axle",
    operator: "Karnataka State Road Transport Corp",
    type: "Volvo 9600s Multi-Axle Semi-Sleeper (2+2)",
    category: "seater",
    badge: "Govt. Guaranteed 🏛️",
    hasWashroom: false,
    rating: 4.8,
    reviewsCount: 5120,
    from: "Bengaluru",
    to: "Hyderabad",
    departureTime: "08:00 PM",
    arrivalTime: "05:00 AM",
    duration: "9h 00m",
    price: 920,
    originalPrice: 1100,
    availableSeatsCount: 20,
    liveTracking: true,
    isGovtRTC: true,
    amenities: [
      "Government Safety & Reliability",
      "Spacious 140° Pushback Recliner",
      "Packaged Drinking Water",
      "Personal Reading Lights",
      "Smooth Air Suspension",
      "Trained Senior Drivers"
    ],
    boardingPoints: [
      { id: "bp-1", name: "Kempegowda Bus Station (Majestic)", time: "08:00 PM", landmark: "Terminal 2, Platform 14" },
      { id: "bp-2", name: "Shantinagar Bus Station", time: "08:30 PM", landmark: "Club Class Bay 1" }
    ],
    droppingPoints: [
      { id: "dp-1", name: "MGBS Central Bus Station (Imlibun)", time: "04:30 AM", landmark: "Platform 32" },
      { id: "dp-2", name: "JBS Jubilee Bus Station", time: "05:00 AM", landmark: "Secunderabad" }
    ],
    lowerDeck: [
      { id: "S1", number: "1A", type: "seater", deck: "lower", price: 920, status: "available", isFemaleOnly: false },
      { id: "S2", number: "1B", type: "seater", deck: "lower", price: 920, status: "available", isFemaleOnly: false },
      { id: "S3", number: "1C", type: "seater", deck: "lower", price: 920, status: "available", isFemaleOnly: false },
      { id: "S4", number: "1D", type: "seater", deck: "lower", price: 920, status: "available", isFemaleOnly: false },
      { id: "S5", number: "2A", type: "seater", deck: "lower", price: 920, status: "available", isFemaleOnly: true },
      { id: "S6", number: "2B", type: "seater", deck: "lower", price: 920, status: "available", isFemaleOnly: true },
      { id: "S7", number: "2C", type: "seater", deck: "lower", price: 920, status: "available", isFemaleOnly: false },
      { id: "S8", number: "2D", type: "seater", deck: "lower", price: 920, status: "available", isFemaleOnly: false }
    ],
    upperDeck: []
  },
  {
    id: "bus-ind-104",
    name: "Zingbus Electric Superfast",
    operator: "Zingbus India",
    type: "Zero Emission EV Executive (2+2)",
    category: "electric",
    badge: "100% Eco Green ⚡",
    hasWashroom: false,
    rating: 4.8,
    reviewsCount: 1840,
    from: "Bengaluru",
    to: "Hyderabad",
    departureTime: "06:30 AM",
    arrivalTime: "03:15 PM",
    duration: "8h 45m",
    price: 850,
    originalPrice: 1150,
    availableSeatsCount: 22,
    liveTracking: true,
    isGovtRTC: false,
    amenities: [
      "Ultra-Quiet EV Experience",
      "Ergonomic Calf-Rest Seats",
      "Complimentary Zing Snack Box",
      "65W USB Fast Charging",
      "GPS Highway Speed Radar",
      "Free Travel Insurance"
    ],
    boardingPoints: [
      { id: "bp-1", name: "Electronic City Phase 1 Toll", time: "06:30 AM", landmark: "Near HP Gate" },
      { id: "bp-2", name: "Hebbal Outer Ring Road", time: "07:15 AM", landmark: "Near Columbia Asia Hospital" }
    ],
    droppingPoints: [
      { id: "dp-1", name: "Aramghar Junction Toll Plaza", time: "02:45 PM", landmark: "Airport Expressway" },
      { id: "dp-2", name: "Mehdipatnam Bus Stand", time: "03:15 PM", landmark: "Near Pillar 48" }
    ],
    lowerDeck: [
      { id: "S1", number: "1A", type: "seater", deck: "lower", price: 890, status: "available", isFemaleOnly: false },
      { id: "S2", number: "1B", type: "seater", deck: "lower", price: 890, status: "available", isFemaleOnly: false },
      { id: "S3", number: "1C", type: "seater", deck: "lower", price: 890, status: "booked", isFemaleOnly: false },
      { id: "S4", number: "1D", type: "seater", deck: "lower", price: 890, status: "booked", isFemaleOnly: false },
      { id: "S5", number: "2A", type: "seater", deck: "lower", price: 850, status: "available", isFemaleOnly: true },
      { id: "S6", number: "2B", type: "seater", deck: "lower", price: 850, status: "available", isFemaleOnly: true },
      { id: "S7", number: "2C", type: "seater", deck: "lower", price: 850, status: "available", isFemaleOnly: false },
      { id: "S8", number: "2D", type: "seater", deck: "lower", price: 850, status: "available", isFemaleOnly: false }
    ],
    upperDeck: []
  },
  {
    id: "bus-ind-105",
    name: "IntrCity SmartBus Lounge & Washroom",
    operator: "IntrCity Mobility",
    type: "Mercedes-Benz Luxury Multi-Axle (Washroom)",
    category: "sleeper",
    badge: "Smart Lounge & Toilet 🛋️🚻",
    hasWashroom: true,
    rating: 4.9,
    reviewsCount: 4210,
    from: "Bengaluru",
    to: "Hyderabad",
    departureTime: "10:15 PM",
    arrivalTime: "07:00 AM",
    duration: "8h 45m",
    price: 1399,
    originalPrice: 1799,
    availableSeatsCount: 16,
    liveTracking: true,
    isGovtRTC: false,
    amenities: [
      "Boarding Lounge Access with WiFi",
      "Onboard Vacuum Bio-Toilet",
      "Captain-Assisted Luggage Handover",
      "Air Ionizer Cabin Purification",
      "Fresh Bed Linen & Pillow",
      "Unlimited 5G Wi-Fi",
      "Highway CCTV Security"
    ],
    boardingPoints: [
      { id: "bp-1", name: "IntrCity Smart Lounge (Majestic)", time: "10:15 PM", landmark: "Near Subedar Chatram Road" },
      { id: "bp-2", name: "Indiranagar 100ft Road Stop", time: "10:45 PM", landmark: "Near Domlur Flyover" }
    ],
    droppingPoints: [
      { id: "dp-1", name: "Lakdikapul Bus Stop", time: "06:30 AM", landmark: "Near Hotel Dwaraka" },
      { id: "dp-2", name: "Secunderabad Railway Station", time: "07:00 AM", landmark: "Opp. Clock Tower" }
    ],
    lowerDeck: [
      { id: "L1", number: "L1", type: "sleeper", deck: "lower", price: 1450, status: "available", isFemaleOnly: false },
      { id: "L2", number: "L2", type: "sleeper", deck: "lower", price: 1450, status: "available", isFemaleOnly: false },
      { id: "L3", number: "L3", type: "sleeper", deck: "lower", price: 1399, status: "available", isFemaleOnly: true },
      { id: "L4", number: "L4", type: "sleeper", deck: "lower", price: 1399, status: "available", isFemaleOnly: true }
    ],
    upperDeck: [
      { id: "U1", number: "U1", type: "sleeper", deck: "upper", price: 1450, status: "available", isFemaleOnly: false },
      { id: "U2", number: "U2", type: "sleeper", deck: "upper", price: 1450, status: "available", isFemaleOnly: false },
      { id: "U3", number: "U3", type: "sleeper", deck: "upper", price: 1399, status: "available", isFemaleOnly: false },
      { id: "U4", number: "U4", type: "sleeper", deck: "upper", price: 1399, status: "available", isFemaleOnly: true }
    ]
  },
  {
    id: "bus-ind-106",
    name: "SRS Travels Scania Metrolink HD",
    operator: "SRS Travels",
    type: "Scania Metrolink Multi-Axle Semi-Sleeper (2+2)",
    category: "seater",
    badge: "Popular Express",
    hasWashroom: false,
    rating: 4.6,
    reviewsCount: 2150,
    from: "Bengaluru",
    to: "Hyderabad",
    departureTime: "09:00 PM",
    arrivalTime: "05:45 AM",
    duration: "8h 45m",
    price: 890,
    originalPrice: 1150,
    availableSeatsCount: 24,
    liveTracking: true,
    isGovtRTC: false,
    amenities: [
      "Ergonomic Reclining Seats",
      "Calf Support & Leg Rest",
      "USB Charging Ports",
      "Complimentary Water Bottle",
      "Central Entertainment Screen"
    ],
    boardingPoints: [
      { id: "bp-1", name: "Kalasipalyam SRS Head Office", time: "09:00 PM", landmark: "Near City Market" },
      { id: "bp-2", name: "Yeshwantpur Toll Gate", time: "09:40 PM", landmark: "Near Metro" }
    ],
    droppingPoints: [
      { id: "dp-1", name: "Kacheguda Railway Station", time: "05:15 AM", landmark: "Main Entrance" },
      { id: "dp-2", name: "Ameerpet Metro Hub", time: "05:45 AM", landmark: "Opposite Big Bazaar" }
    ],
    lowerDeck: [
      { id: "S1", number: "1A", type: "seater", deck: "lower", price: 890, status: "available", isFemaleOnly: false },
      { id: "S2", number: "1B", type: "seater", deck: "lower", price: 890, status: "available", isFemaleOnly: false },
      { id: "S3", number: "1C", type: "seater", deck: "lower", price: 890, status: "available", isFemaleOnly: false },
      { id: "S4", number: "1D", type: "seater", deck: "lower", price: 890, status: "available", isFemaleOnly: false },
      { id: "S5", number: "2A", type: "seater", deck: "lower", price: 890, status: "available", isFemaleOnly: true },
      { id: "S6", number: "2B", type: "seater", deck: "lower", price: 890, status: "available", isFemaleOnly: true }
    ],
    upperDeck: []
  },
  {
    id: "bus-ind-107",
    name: "Royal Highway Non-AC Budget Sleeper",
    operator: "Royal Intercity Coach",
    type: "Ashok Leyland 2+1 Non-AC Sleeper (Budget)",
    category: "budget",
    badge: "Lowest Fare 🏷️",
    hasWashroom: false,
    rating: 4.4,
    reviewsCount: 1120,
    from: "Bengaluru",
    to: "Hyderabad",
    departureTime: "07:30 PM",
    arrivalTime: "05:00 AM",
    duration: "9h 30m",
    price: 650,
    originalPrice: 850,
    availableSeatsCount: 18,
    liveTracking: true,
    isGovtRTC: false,
    amenities: [
      "Comfortable Cushion Berths",
      "Reading Lamp & Mobile Charging",
      "Air Suspension",
      "Economical Budget Fare"
    ],
    boardingPoints: [
      { id: "bp-1", name: "Majestic Anand Rao Circle", time: "07:30 PM", landmark: "Platform 3" }
    ],
    droppingPoints: [
      { id: "dp-1", name: "Aramghar Junction", time: "04:30 AM", landmark: "Toll Point" },
      { id: "dp-2", name: "Secunderabad JBS", time: "05:00 AM", landmark: "Platform 2" }
    ],
    lowerDeck: [
      { id: "L1", number: "L1", type: "sleeper", deck: "lower", price: 650, status: "available", isFemaleOnly: false },
      { id: "L2", number: "L2", type: "sleeper", deck: "lower", price: 650, status: "available", isFemaleOnly: false },
      { id: "L3", number: "L3", type: "sleeper", deck: "lower", price: 650, status: "available", isFemaleOnly: true },
      { id: "L4", number: "L4", type: "sleeper", deck: "lower", price: 650, status: "available", isFemaleOnly: true }
    ],
    upperDeck: [
      { id: "U1", number: "U1", type: "sleeper", deck: "upper", price: 650, status: "available", isFemaleOnly: false },
      { id: "U2", number: "U2", type: "sleeper", deck: "upper", price: 650, status: "available", isFemaleOnly: false }
    ]
  },
  {
    id: "bus-ind-108",
    name: "MSRTC Shivneri Volvo AC",
    operator: "Maharashtra State Road Transport Corp",
    type: "Volvo B11R AC Executive Seater (2+2)",
    category: "seater",
    badge: "Govt. Guaranteed 🏛️",
    hasWashroom: false,
    rating: 4.8,
    reviewsCount: 3890,
    from: "Bengaluru",
    to: "Hyderabad",
    departureTime: "05:30 AM",
    arrivalTime: "02:45 PM",
    duration: "9h 15m",
    price: 950,
    originalPrice: 1200,
    availableSeatsCount: 26,
    liveTracking: true,
    isGovtRTC: true,
    amenities: [
      "Govt Punctuality & Safety",
      "Ergonomic Recliners",
      "Packaged Drinking Water",
      "AIS-140 GPS Compliance"
    ],
    boardingPoints: [
      { id: "bp-1", name: "Central Interstate Bus Station", time: "05:30 AM", landmark: "Platform 1" }
    ],
    droppingPoints: [
      { id: "dp-1", name: "Central Transit Interchange", time: "02:45 PM", landmark: "Main Bay" }
    ],
    lowerDeck: [
      { id: "S1", number: "1A", type: "seater", deck: "lower", price: 950, status: "available", isFemaleOnly: false },
      { id: "S2", number: "1B", type: "seater", deck: "lower", price: 950, status: "available", isFemaleOnly: false },
      { id: "S3", number: "1C", type: "seater", deck: "lower", price: 950, status: "available", isFemaleOnly: false },
      { id: "S4", number: "1D", type: "seater", deck: "lower", price: 950, status: "available", isFemaleOnly: false }
    ],
    upperDeck: []
  },
  {
    id: "bus-ind-109",
    name: "TSRTC Garuda Plus Multi-Axle Sleeper",
    operator: "Telangana State Road Transport Corp",
    type: "Volvo 9600s AC Sleeper (2+1)",
    category: "sleeper",
    badge: "Govt. Guaranteed 🏛️",
    hasWashroom: false,
    rating: 4.7,
    reviewsCount: 4670,
    from: "Bengaluru",
    to: "Hyderabad",
    departureTime: "10:30 PM",
    arrivalTime: "06:45 AM",
    duration: "8h 15m",
    price: 1180,
    originalPrice: 1400,
    availableSeatsCount: 16,
    liveTracking: true,
    isGovtRTC: true,
    amenities: [
      "State Transport Reliability & Trust",
      "Spacious 7-Foot Sleeper Berths",
      "Sealed Clean Bedroll & Pillow",
      "Individual Charging Plugs",
      "Electronic Highway Toll Pass"
    ],
    boardingPoints: [
      { id: "bp-1", name: "KBS Majestic Terminal 3", time: "10:30 PM", landmark: "Govt Deluxe Platform" },
      { id: "bp-2", name: "Hebbal Flyover TSRTC Bay", time: "11:15 PM", landmark: "Opposite Police Outpost" }
    ],
    droppingPoints: [
      { id: "dp-1", name: "Mahatma Gandhi Bus Station (MGBS)", time: "06:15 AM", landmark: "Platform 12" },
      { id: "dp-2", name: "Jubilee Bus Station (JBS)", time: "06:45 AM", landmark: "Secunderabad Central" }
    ],
    lowerDeck: [
      { id: "L1", number: "L1", type: "sleeper", deck: "lower", price: 1180, status: "available", isFemaleOnly: false },
      { id: "L2", number: "L2", type: "sleeper", deck: "lower", price: 1180, status: "available", isFemaleOnly: false },
      { id: "L3", number: "L3", type: "sleeper", deck: "lower", price: 1180, status: "available", isFemaleOnly: true },
      { id: "L4", number: "L4", type: "sleeper", deck: "lower", price: 1180, status: "available", isFemaleOnly: true }
    ],
    upperDeck: [
      { id: "U1", number: "U1", type: "sleeper", deck: "upper", price: 1150, status: "available", isFemaleOnly: false },
      { id: "U2", number: "U2", type: "sleeper", deck: "upper", price: 1150, status: "available", isFemaleOnly: false },
      { id: "U3", number: "U3", type: "sleeper", deck: "upper", price: 1150, status: "available", isFemaleOnly: false }
    ]
  },
  {
    id: "bus-ind-110",
    name: "Eicher Skyline Pro AC Semi-Sleeper",
    operator: "National Highway Express",
    type: "Eicher Skyline AC Semi-Sleeper (2+2)",
    category: "seater",
    badge: "Budget AC Comfort 🚌",
    hasWashroom: false,
    rating: 4.5,
    reviewsCount: 1650,
    from: "Bengaluru",
    to: "Hyderabad",
    departureTime: "01:30 PM",
    arrivalTime: "10:45 PM",
    duration: "9h 15m",
    price: 780,
    originalPrice: 990,
    availableSeatsCount: 28,
    liveTracking: true,
    isGovtRTC: false,
    amenities: [
      "Chilled Dual AC Climate Control",
      "135° Pushback Calf Rest",
      "USB Fast Mobile Charger",
      "Emergency Exit & Fire Suppression",
      "Clean Drinking Water"
    ],
    boardingPoints: [
      { id: "bp-1", name: "Anand Rao Circle Private Bay", time: "01:30 PM", landmark: "Opp. Petrol Pump" }
    ],
    droppingPoints: [
      { id: "dp-1", name: "Aramghar Ring Road", time: "10:15 PM", landmark: "Near Flyover" },
      { id: "dp-2", name: "Mehdipatnam Bus Station", time: "10:45 PM", landmark: "Bus Stop 3" }
    ],
    lowerDeck: [
      { id: "S1", number: "1A", type: "seater", deck: "lower", price: 780, status: "available", isFemaleOnly: false },
      { id: "S2", number: "1B", type: "seater", deck: "lower", price: 780, status: "available", isFemaleOnly: false },
      { id: "S3", number: "1C", type: "seater", deck: "lower", price: 780, status: "available", isFemaleOnly: false },
      { id: "S4", number: "1D", type: "seater", deck: "lower", price: 780, status: "available", isFemaleOnly: false }
    ],
    upperDeck: []
  },
  {
    id: "bus-ind-111",
    name: "Kallada G4 Scania Multi-Axle (With Washroom)",
    operator: "Kallada Tours & Travels",
    type: "Scania Metrolink HD AC Sleeper (Washroom)",
    category: "sleeper",
    badge: "Washroom & Pantry 🚻☕",
    hasWashroom: true,
    rating: 4.9,
    reviewsCount: 3100,
    from: "Bengaluru",
    to: "Hyderabad",
    departureTime: "11:45 PM",
    arrivalTime: "08:15 AM",
    duration: "8h 30m",
    price: 1480,
    originalPrice: 1850,
    availableSeatsCount: 12,
    liveTracking: true,
    isGovtRTC: false,
    amenities: [
      "Hygienic Vacuum Washroom / Restroom",
      "Onboard Hot Tea & Coffee Dispenser",
      "Swedish High-Deck Air Suspension",
      "Full Privacy Curtain Berths",
      "Individual LED Entertainment Screen",
      "5G Wi-Fi & 220V Laptop Outlet"
    ],
    boardingPoints: [
      { id: "bp-1", name: "Kallada Lounge Madiwala", time: "11:45 PM", landmark: "Silk Board Expressway" },
      { id: "bp-2", name: "Yeshwantpur Bus Terminal", time: "12:15 AM", landmark: "Near Platform 1" }
    ],
    droppingPoints: [
      { id: "dp-1", name: "Shamshabad Airport Road", time: "07:30 AM", landmark: "Near Outer Ring Road" },
      { id: "dp-2", name: "Ameerpet Metro Station", time: "08:15 AM", landmark: "Pillar 1018" }
    ],
    lowerDeck: [
      { id: "L1", number: "L1", type: "sleeper", deck: "lower", price: 1550, status: "available", isFemaleOnly: false },
      { id: "L2", number: "L2", type: "sleeper", deck: "lower", price: 1550, status: "available", isFemaleOnly: false },
      { id: "L3", number: "L3", type: "sleeper", deck: "lower", price: 1480, status: "available", isFemaleOnly: true },
      { id: "L4", number: "L4", type: "sleeper", deck: "lower", price: 1480, status: "available", isFemaleOnly: true }
    ],
    upperDeck: [
      { id: "U1", number: "U1", type: "sleeper", deck: "upper", price: 1550, status: "available", isFemaleOnly: false },
      { id: "U2", number: "U2", type: "sleeper", deck: "upper", price: 1480, status: "available", isFemaleOnly: false }
    ]
  },
  {
    id: "bus-ind-112",
    name: "FreshBus 100% Electric Intercity Express",
    operator: "FreshBus Electric Mobility",
    type: "Zero Emission EV Executive (2+2)",
    category: "electric",
    badge: "Clean Green EV ⚡",
    hasWashroom: false,
    rating: 4.9,
    reviewsCount: 2280,
    from: "Bengaluru",
    to: "Hyderabad",
    departureTime: "07:15 AM",
    arrivalTime: "03:45 PM",
    duration: "8h 30m",
    price: 899,
    originalPrice: 1200,
    availableSeatsCount: 24,
    liveTracking: true,
    isGovtRTC: false,
    amenities: [
      "Zero Tailpipe Emission 100% EV",
      "Whisper-Quiet Electric Drivetrain",
      "Ergonomic Italian Bucket Recliners",
      "Complimentary Eco Water Flask",
      "High-Speed In-Seat Type-C 65W PD",
      "Live Battery & GPS Telemetry"
    ],
    boardingPoints: [
      { id: "bp-1", name: "FreshBus EV Hub (Majestic)", time: "07:15 AM", landmark: "Opp. City Railway Gate" },
      { id: "bp-2", name: "Hebbal Esteem Mall Bay", time: "07:55 AM", landmark: "Highway Junction" }
    ],
    droppingPoints: [
      { id: "dp-1", name: "Gachibowli Bio-Diversity Park", time: "03:15 PM", landmark: "ORR Junction" },
      { id: "dp-2", name: "Hitec City Cyber Towers", time: "03:45 PM", landmark: "Opp. Metro Station" }
    ],
    lowerDeck: [
      { id: "S1", number: "1A", type: "seater", deck: "lower", price: 920, status: "available", isFemaleOnly: false },
      { id: "S2", number: "1B", type: "seater", deck: "lower", price: 920, status: "available", isFemaleOnly: false },
      { id: "S3", number: "1C", type: "seater", deck: "lower", price: 899, status: "available", isFemaleOnly: true },
      { id: "S4", number: "1D", type: "seater", deck: "lower", price: 899, status: "available", isFemaleOnly: true }
    ],
    upperDeck: []
  }
];

// Helper to look up city transit hubs
function getCityTransitHub(cityName) {
  const match = INDIAN_CITIES.find(c => c.name.toLowerCase() === cityName.toLowerCase());
  if (match) {
    return match.hub;
  }
  return `${cityName} Central Bus Stand`;
}

// Generate dynamic buses for ANY city, area or town across India
export function getBusesForRoute(fromCity, toCity) {
  const fromHub = getCityTransitHub(fromCity);
  const toHub = getCityTransitHub(toCity);

  return BUS_OPERATORS.map((bus, idx) => ({
    ...bus,
    id: `bus-dyn-${idx}-${fromCity.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 4)}-${toCity.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 4)}`,
    from: fromCity,
    to: toCity,
    boardingPoints: [
      { 
        id: `bp-1-${idx}`, 
        name: `${fromCity} (${fromHub})`, 
        time: bus.departureTime, 
        landmark: "Main Interstate Departure Platform" 
      },
      { 
        id: `bp-2-${idx}`, 
        name: `${fromCity} National Highway Bypass / Toll`, 
        time: bus.departureTime, 
        landmark: "Highway Flyover Passenger Bay" 
      }
    ],
    droppingPoints: [
      { 
        id: `dp-1-${idx}`, 
        name: `${toCity} (${toHub})`, 
        time: bus.arrivalTime, 
        landmark: "Central Arrival Concourse" 
      },
      { 
        id: `dp-2-${idx}`, 
        name: `${toCity} Bypass / Ring Road Transit Point`, 
        time: bus.arrivalTime, 
        landmark: "Outer Transit Circle" 
      }
    ]
  }));
}

export const INITIAL_BOOKINGS = [
  {
    pnr: "IND-OB-892418-EXP",
    busId: "bus-ind-101",
    busName: "VRL Travels Multi-Axle I-Shift",
    operator: "VRL Logistics Ltd.",
    type: "Volvo 9600s AC Sleeper (2+1)",
    from: "Bengaluru",
    to: "Hyderabad",
    date: "2026-10-06",
    departureTime: "09:30 PM",
    arrivalTime: "06:15 AM",
    boardingPoint: "Majestic (KBS) Anand Rao Circle",
    droppingPoint: "Ameerpet Metro Interchange",
    seats: [
      { 
        seatNumber: "L1", 
        passengerName: "Rahul Sharma", 
        age: "28", 
        gender: "Male", 
        idProofType: "Aadhaar Card",
        idProofNumber: "XXXX-XXXX-4812",
        isIdVerified: true,
        price: 1350 
      },
      { 
        seatNumber: "L6", 
        passengerName: "Pooja Verma", 
        age: "26", 
        gender: "Female", 
        idProofType: "PAN Card",
        idProofNumber: "ABCDE1234F",
        isIdVerified: true,
        price: 1250 
      }
    ],
    contactInfo: {
      email: "rahul.sharma@example.com",
      phone: "+91 98765 43210",
      isPhoneVerified: true
    },
    totalAmount: 2600,
    status: "CONFIRMED",
    bookingDate: "2026-09-29 18:30",
    paymentMethod: "UPI (Google Pay - rahul@oksbi)",
    liveStatus: "Scheduled on time"
  }
];
