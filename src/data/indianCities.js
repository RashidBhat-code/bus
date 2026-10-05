// Comprehensive Indian Cities & Transit Hubs Directory across All States & Union Territories

export const INDIAN_CITIES = [
  // --- SOUTH INDIA ---
  // Karnataka
  { name: "Bengaluru", state: "Karnataka", zone: "South", hub: "Majestic / Kempegowda KBS", popular: true },
  { name: "Mysuru", state: "Karnataka", zone: "South", hub: "Suburban Bus Stand", popular: true },
  { name: "Mangaluru", state: "Karnataka", zone: "South", hub: "KSRTC Bejai Terminal", popular: true },
  { name: "Hubballi-Dharwad", state: "Karnataka", zone: "South", hub: "Old Bus Stand / Hosur", popular: false },
  { name: "Belagavi", state: "Karnataka", zone: "South", hub: "Central Bus Stand", popular: false },
  { name: "Shimoga (Shivamogga)", state: "Karnataka", zone: "South", hub: "KSRTC Bus Station", popular: false },
  { name: "Udupi", state: "Karnataka", zone: "South", hub: "Service Bus Stand", popular: false },
  { name: "Hampi / Hospet", state: "Karnataka", zone: "South", hub: "Hospet Bus Stand", popular: true },
  { name: "Gokarna", state: "Karnataka", zone: "South", hub: "Gokarna Bus Stand", popular: true },
  { name: "Coorg (Madikeri)", state: "Karnataka", zone: "South", hub: "Madikeri KSRTC Stand", popular: true },
  { name: "Chikmagalur", state: "Karnataka", zone: "South", hub: "KSRTC Bus Depot", popular: true },
  { name: "Davangere", state: "Karnataka", zone: "South", hub: "Central Bus Stand", popular: false },
  { name: "Gulbarga (Kalaburagi)", state: "Karnataka", zone: "South", hub: "Central Bus Terminal", popular: false },

  // Telangana & Andhra Pradesh
  { name: "Hyderabad", state: "Telangana", zone: "South", hub: "MGBS / Ameerpet", popular: true },
  { name: "Warangal", state: "Telangana", zone: "South", hub: "Hanamkonda Bus Station", popular: false },
  { name: "Nizamabad", state: "Telangana", zone: "South", hub: "TSRTC Bus Stand", popular: false },
  { name: "Karimnagar", state: "Telangana", zone: "South", hub: "TSRTC Bus Station", popular: false },
  { name: "Khammam", state: "Telangana", zone: "South", hub: "New Bus Stand", popular: false },
  { name: "Vijayawada", state: "Andhra Pradesh", zone: "South", hub: "Pandit Nehru Bus Station", popular: true },
  { name: "Visakhapatnam", state: "Andhra Pradesh", zone: "South", hub: "Dwaraka Bus Station (RTC Complex)", popular: true },
  { name: "Tirupati", state: "Andhra Pradesh", zone: "South", hub: "Central Bus Station", popular: true },
  { name: "Guntur", state: "Andhra Pradesh", zone: "South", hub: "NTR Bus Station", popular: false },
  { name: "Kurnool", state: "Andhra Pradesh", zone: "South", hub: "APSRTC Bus Complex", popular: false },
  { name: "Rajahmundry", state: "Andhra Pradesh", zone: "South", hub: "Kotipalli Bus Stand", popular: false },
  { name: "Nellore", state: "Andhra Pradesh", zone: "South", hub: "Atmakur Bus Stand", popular: false },
  { name: "Anantapur", state: "Andhra Pradesh", zone: "South", hub: "APSRTC Bus Stand", popular: false },
  { name: "Kakinada", state: "Andhra Pradesh", zone: "South", hub: "Main Bus Station", popular: false },

  // Tamil Nadu
  { name: "Chennai", state: "Tamil Nadu", zone: "South", hub: "Koyambedu CMBT / Kilambakkam KCBT", popular: true },
  { name: "Coimbatore", state: "Tamil Nadu", zone: "South", hub: "Gandhipuram Bus Stand", popular: true },
  { name: "Madurai", state: "Tamil Nadu", zone: "South", hub: "Mattuthavani Integrated Bus Terminus", popular: true },
  { name: "Tiruchirappalli (Trichy)", state: "Tamil Nadu", zone: "South", hub: "Central Bus Stand", popular: false },
  { name: "Salem", state: "Tamil Nadu", zone: "South", hub: "New Bus Stand", popular: false },
  { name: "Ooty (Udhagamandalam)", state: "Tamil Nadu", zone: "South", hub: "Central Bus Stand", popular: true },
  { name: "Kodaikanal", state: "Tamil Nadu", zone: "South", hub: "Kodaikanal Bus Stand", popular: true },
  { name: "Kanyakumari", state: "Tamil Nadu", zone: "South", hub: "State Express Bus Stand", popular: true },
  { name: "Rameswaram", state: "Tamil Nadu", zone: "South", hub: "Municipal Bus Stand", popular: true },
  { name: "Tirunelveli", state: "Tamil Nadu", zone: "South", hub: "Vellore New Bus Stand", popular: false },
  { name: "Vellore", state: "Tamil Nadu", zone: "South", hub: "New Bus Stand", popular: false },
  { name: "Puducherry (Pondicherry)", state: "Puducherry", zone: "South", hub: "New Bus Stand", popular: true },

  // Kerala
  { name: "Kochi (Cochin)", state: "Kerala", zone: "South", hub: "Vyttila Mobility Hub", popular: true },
  { name: "Thiruvananthapuram (Trivandrum)", state: "Kerala", zone: "South", hub: "Thampanoor KSRTC Central", popular: true },
  { name: "Kozhikode (Calicut)", state: "Kerala", zone: "South", hub: "KSRTC Bus Terminal", popular: false },
  { name: "Munnar", state: "Kerala", zone: "South", hub: "Munnar KSRTC Depot", popular: true },
  { name: "Alappuzha (Alleppey)", state: "Kerala", zone: "South", hub: "KSRTC Boat Jetty Stand", popular: true },
  { name: "Wayanad (Kalpetta)", state: "Kerala", zone: "South", hub: "Kalpetta Bus Stand", popular: true },
  { name: "Thrissur", state: "Kerala", zone: "South", hub: "Shaktan Thampuran Bus Stand", popular: false },
  { name: "Kollam", state: "Kerala", zone: "South", hub: "KSRTC Bus Station", popular: false },
  { name: "Palakkad", state: "Kerala", zone: "South", hub: "KSRTC Terminal", popular: false },

  // --- WEST INDIA ---
  // Maharashtra
  { name: "Mumbai", state: "Maharashtra", zone: "West", hub: "Dadar / Borivali / Vashi", popular: true },
  { name: "Pune", state: "Maharashtra", zone: "West", hub: "Swargate / Wakad Hinjewadi", popular: true },
  { name: "Nagpur", state: "Maharashtra", zone: "West", hub: "Ganeshpeth Bus Stand", popular: true },
  { name: "Nashik", state: "Maharashtra", zone: "West", hub: "CBS Thakkar Bazaar", popular: true },
  { name: "Shirdi", state: "Maharashtra", zone: "West", hub: "Sai Nagar Bus Stand", popular: true },
  { name: "Aurangabad (Chhatrapati Sambhajinagar)", state: "Maharashtra", zone: "West", hub: "Central Bus Stand", popular: true },
  { name: "Kolhapur", state: "Maharashtra", zone: "West", hub: "CBS Bus Stand", popular: false },
  { name: "Mahabaleshwar", state: "Maharashtra", zone: "West", hub: "Mahabaleshwar ST Stand", popular: true },
  { name: "Solapur", state: "Maharashtra", zone: "West", hub: "Central Bus Stand", popular: false },
  { name: "Lonavala", state: "Maharashtra", zone: "West", hub: "Lonavala Bus Station", popular: true },
  { name: "Alibaug", state: "Maharashtra", zone: "West", hub: "Alibaug ST Stand", popular: false },
  { name: "Nanded", state: "Maharashtra", zone: "West", hub: "Central Bus Station", popular: false },
  { name: "Amravati", state: "Maharashtra", zone: "West", hub: "Amravati Bus Stand", popular: false },

  // Goa
  { name: "Goa (Panaji / Panjim)", state: "Goa", zone: "West", hub: "Kadamba Bus Terminal", popular: true },
  { name: "Goa (Madgaon / Margao)", state: "Goa", zone: "West", hub: "Margao KTC Bus Terminal", popular: true },
  { name: "Goa (Mapusa)", state: "Goa", zone: "West", hub: "Mapusa Bus Stand (North Goa)", popular: true },

  // Gujarat
  { name: "Ahmedabad", state: "Gujarat", zone: "West", hub: "Geeta Mandir Central Bus Stand", popular: true },
  { name: "Surat", state: "Gujarat", zone: "West", hub: "Central Bus Station", popular: true },
  { name: "Vadodara", state: "Gujarat", zone: "West", hub: "Central Bus Terminal", popular: false },
  { name: "Rajkot", state: "Gujarat", zone: "West", hub: "Shastri Maidan Bus Stand", popular: false },
  { name: "Bhavnagar", state: "Gujarat", zone: "West", hub: "GSRTC Bus Stand", popular: false },
  { name: "Jamnagar", state: "Gujarat", zone: "West", hub: "Central Bus Stand", popular: false },
  { name: "Bhuj (Kutch)", state: "Gujarat", zone: "West", hub: "Bhuj ST Bus Stand", popular: true },
  { name: "Dwarka", state: "Gujarat", zone: "West", hub: "Dwarka Bus Stand", popular: true },
  { name: "Somnath", state: "Gujarat", zone: "West", hub: "Somnath Temple Stand", popular: true },

  // --- NORTH INDIA ---
  // Delhi NCR
  { name: "Delhi", state: "Delhi NCR", zone: "North", hub: "Kashmiri Gate ISBT / Anand Vihar", popular: true },
  { name: "Noida", state: "Delhi NCR", zone: "North", hub: "Sector 37 Bus Stand", popular: false },
  { name: "Gurugram", state: "Delhi NCR", zone: "North", hub: "IFFCO Chowk / Rajiv Chowk", popular: true },
  { name: "Ghaziabad", state: "Delhi NCR", zone: "North", hub: "Old Bus Stand", popular: false },
  { name: "Faridabad", state: "Delhi NCR", zone: "North", hub: "Ballabhgarh Bus Terminal", popular: false },

  // Rajasthan
  { name: "Jaipur", state: "Rajasthan", zone: "North", hub: "Sindhi Camp Bus Station", popular: true },
  { name: "Udaipur", state: "Rajasthan", zone: "North", hub: "Udaipur City Bus Station", popular: true },
  { name: "Jodhpur", state: "Rajasthan", zone: "North", hub: "Paota Bus Stand", popular: true },
  { name: "Jaisalmer", state: "Rajasthan", zone: "North", hub: "Air Force Circle Stand", popular: true },
  { name: "Ajmer / Pushkar", state: "Rajasthan", zone: "North", hub: "RSRTC Bus Stand", popular: true },
  { name: "Bikaner", state: "Rajasthan", zone: "North", hub: "KEM Road Bus Stand", popular: false },
  { name: "Kota", state: "Rajasthan", zone: "North", hub: "Nayapura Bus Stand", popular: false },
  { name: "Mount Abu", state: "Rajasthan", zone: "North", hub: "Mount Abu Bus Depot", popular: true },

  // Uttar Pradesh
  { name: "Agra", state: "Uttar Pradesh", zone: "North", hub: "Idgah Bus Stand", popular: true },
  { name: "Lucknow", state: "Uttar Pradesh", zone: "North", hub: "Alambagh ISBT / Kaisarbagh", popular: true },
  { name: "Varanasi", state: "Uttar Pradesh", zone: "North", hub: "Cantt Railway Station Bus Stand", popular: true },
  { name: "Ayodhya", state: "Uttar Pradesh", zone: "North", hub: "Ayodhya Dham Bus Station", popular: true },
  { name: "Prayagraj (Allahabad)", state: "Uttar Pradesh", zone: "North", hub: "Civil Lines Bus Stand", popular: false },
  { name: "Kanpur", state: "Uttar Pradesh", zone: "North", hub: "Jhakarkati Bus Station", popular: false },
  { name: "Mathura / Vrindavan", state: "Uttar Pradesh", zone: "North", hub: "Old Bus Stand", popular: true },
  { name: "Gorakhpur", state: "Uttar Pradesh", zone: "North", hub: "Railway Station Bus Stand", popular: false },
  { name: "Bareilly", state: "Uttar Pradesh", zone: "North", hub: "Satellite Bus Station", popular: false },
  { name: "Meerut", state: "Uttar Pradesh", zone: "North", hub: "Bhaisali Bus Stand", popular: false },

  // Uttarakhand
  { name: "Dehradun", state: "Uttarakhand", zone: "North", hub: "ISBT Dehradun", popular: true },
  { name: "Rishikesh", state: "Uttarakhand", zone: "North", hub: "Rishikesh Bus Stand / Natraj Chowk", popular: true },
  { name: "Haridwar", state: "Uttarakhand", zone: "North", hub: "Haridwar Railway Station Stand", popular: true },
  { name: "Nainital", state: "Uttarakhand", zone: "North", hub: "Tallital Bus Station", popular: true },
  { name: "Mussoorie", state: "Uttarakhand", zone: "North", hub: "Library Bus Stand", popular: true },
  { name: "Haldwani", state: "Uttarakhand", zone: "North", hub: "Haldwani Bus Station", popular: false },

  // Himachal Pradesh
  { name: "Shimla", state: "Himachal Pradesh", zone: "North", hub: "ISBT Tutikandi", popular: true },
  { name: "Manali", state: "Himachal Pradesh", zone: "North", hub: "Private Bus Stand / Mall Road", popular: true },
  { name: "Dharamshala / McLeod Ganj", state: "Himachal Pradesh", zone: "North", hub: "HRTC Bus Station", popular: true },
  { name: "Kasol / Kullu", state: "Himachal Pradesh", zone: "North", hub: "Bhuntar / Kullu Stand", popular: true },
  { name: "Dalhousie", state: "Himachal Pradesh", zone: "North", hub: "Dalhousie Bus Stand", popular: false },

  // Punjab, Haryana & J&K
  { name: "Chandigarh", state: "Punjab/Haryana", zone: "North", hub: "ISBT Sector 43 / Sector 17", popular: true },
  { name: "Amritsar", state: "Punjab", zone: "North", hub: "Shaheed Madan Lal Dhingra ISBT", popular: true },
  { name: "Ludhiana", state: "Punjab", zone: "North", hub: "Amar Shaheed Sukhdev ISBT", popular: false },
  { name: "Jalandhar", state: "Punjab", zone: "North", hub: "Shaheed-E-Azam Bhagat Singh ISBT", popular: false },
  { name: "Jammu", state: "Jammu & Kashmir", zone: "North", hub: "General Bus Stand", popular: true },
  { name: "Katra (Vaishno Devi)", state: "Jammu & Kashmir", zone: "North", hub: "Katra Bus Stand", popular: true },
  { name: "Srinagar", state: "Jammu & Kashmir", zone: "North", hub: "TRC Tourist Reception Centre", popular: true },

  // --- CENTRAL INDIA ---
  // Madhya Pradesh & Chhattisgarh
  { name: "Bhopal", state: "Madhya Pradesh", zone: "Central", hub: "Kushabhau Thakre ISBT", popular: true },
  { name: "Indore", state: "Madhya Pradesh", zone: "Central", hub: "Sarwate Bus Stand / Vijay Nagar", popular: true },
  { name: "Gwalior", state: "Madhya Pradesh", zone: "Central", hub: "ISBT Gwalior", popular: false },
  { name: "Jabalpur", state: "Madhya Pradesh", zone: "Central", hub: "Deendayal ISBT", popular: false },
  { name: "Ujjain", state: "Madhya Pradesh", zone: "Central", hub: "Dewas Gate Bus Stand", popular: true },
  { name: "Raipur", state: "Chhattisgarh", zone: "Central", hub: "Sri Balaji Interstate Bus Stand", popular: true },
  { name: "Bilaspur", state: "Chhattisgarh", zone: "Central", hub: "High Court Bus Stand", popular: false },

  // --- EAST & NORTH-EAST INDIA ---
  // West Bengal
  { name: "Kolkata", state: "West Bengal", zone: "East", hub: "Esplanade / Babughat / Karunamoyee", popular: true },
  { name: "Siliguri", state: "West Bengal", zone: "East", hub: "Tenzing Norgay Central Bus Terminus", popular: true },
  { name: "Darjeeling", state: "West Bengal", zone: "East", hub: "Chauk Bazaar Bus Stand", popular: true },
  { name: "Digha", state: "West Bengal", zone: "East", hub: "Digha SBSTC Bus Stand", popular: true },
  { name: "Asansol", state: "West Bengal", zone: "East", hub: "City Bus Stand", popular: false },

  // Odisha
  { name: "Bhubaneswar", state: "Odisha", zone: "East", hub: "Baramunda ISBT", popular: true },
  { name: "Puri", state: "Odisha", zone: "East", hub: "Puri Bus Stand", popular: true },
  { name: "Cuttack", state: "Odisha", zone: "East", hub: "Badambadi Bus Stand", popular: false },
  { name: "Rourkela", state: "Odisha", zone: "East", hub: "Government Bus Stand", popular: false },

  // Bihar & Jharkhand
  { name: "Patna", state: "Bihar", zone: "East", hub: "Bairiya ISBT", popular: true },
  { name: "Gaya / Bodh Gaya", state: "Bihar", zone: "East", hub: "Gaya Bus Stand", popular: true },
  { name: "Muzaffarpur", state: "Bihar", zone: "East", hub: "Imlibatti Bus Stand", popular: false },
  { name: "Bhagalpur", state: "Bihar", zone: "East", hub: "Zero Mile Bus Stand", popular: false },
  { name: "Ranchi", state: "Jharkhand", zone: "East", hub: "Khadgarha Bus Stand", popular: true },
  { name: "Jamshedpur", state: "Jharkhand", zone: "East", hub: "Mango Bus Stand", popular: false },
  { name: "Dhanbad", state: "Jharkhand", zone: "East", hub: "Bartand Bus Stand", popular: false },

  // North-East
  { name: "Guwahati", state: "Assam", zone: "East", hub: "ISBT Betkuchi", popular: true },
  { name: "Shillong", state: "Meghalaya", zone: "East", hub: "Polo Grounds Bus Stand", popular: true },
  { name: "Gangtok", state: "Sikkim", zone: "East", hub: "Deorali SNT Bus Stand", popular: true },
  { name: "Agartala", state: "Tripura", zone: "East", hub: "Chandrapur ISBT", popular: false }
];

// Helper Lists
export const POPULAR_CITIES = INDIAN_CITIES.filter(c => c.popular).map(c => c.name);
export const ALL_CITY_NAMES = INDIAN_CITIES.map(c => c.name);

export const POPULAR_INDIAN_ROUTES = [
  { from: "Bengaluru", to: "Hyderabad" },
  { from: "Mumbai", to: "Goa (Panaji / Panjim)" },
  { from: "Delhi", to: "Manali" },
  { from: "Pune", to: "Mumbai" },
  { from: "Bengaluru", to: "Chennai" },
  { from: "Hyderabad", to: "Vijayawada" },
  { from: "Delhi", to: "Jaipur" },
  { from: "Chennai", to: "Coimbatore" },
  { from: "Mumbai", to: "Shirdi" },
  { from: "Kolkata", to: "Siliguri" },
  { from: "Bengaluru", to: "Gokarna" },
  { from: "Delhi", to: "Rishikesh" },
  { from: "Chandigarh", to: "Shimla" },
  { from: "Ahmedabad", to: "Udaipur" },
  { from: "Bhubaneswar", to: "Puri" }
];
